/**
 * AGENT 1: DEEP INSPECTOR
 * Extracts HTML, CSS, computed styles, assets, and screenshots from a target URL.
 *
 * Deviations from the original spec, and why:
 *  - Stylesheets are fetched via a separate APIRequestContext, NOT page.goto().
 *    Navigating the inspected page to a .css URL destroys the DOM we are measuring.
 *  - waitUntil is 'domcontentloaded' + settle, not 'networkidle'. Commercial storefronts
 *    keep analytics/chat sockets open forever, so networkidle never fires.
 *  - The computed-style tree is pruned: invisible nodes, and subtrees of repeated
 *    siblings beyond REPEAT_SAMPLE, are skipped. An unpruned depth-12 dump of a
 *    Shopify homepage is ~400MB of JSON and is unusable downstream.
 */
import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const MAX_DEPTH = 14;
const REPEAT_SAMPLE = 3; // keep full detail for first N identical-class siblings

/* ── style properties we capture per element ───────────────────────────── */
const PROPS = {
  layout: ['display', 'position', 'top', 'left', 'right', 'bottom', 'zIndex',
    'flexDirection', 'flexWrap', 'justifyContent', 'alignItems', 'alignContent',
    'gap', 'rowGap', 'columnGap', 'flex', 'flexGrow', 'flexShrink', 'flexBasis',
    'gridTemplateColumns', 'gridTemplateRows', 'gridTemplateAreas',
    'gridColumn', 'gridRow', 'gridAutoFlow',
    'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
    'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
    'width', 'height', 'maxWidth', 'minHeight', 'boxSizing', 'aspectRatio'],
  visual: ['backgroundColor', 'backgroundImage', 'backgroundSize', 'backgroundPosition',
    'backgroundRepeat', 'color', 'opacity', 'borderRadius', 'borderTopWidth',
    'borderTopStyle', 'borderTopColor', 'borderBottomWidth', 'borderBottomColor',
    'boxShadow', 'overflow', 'overflowX', 'overflowY', 'mixBlendMode'],
  typography: ['fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'lineHeight',
    'letterSpacing', 'textAlign', 'textTransform', 'textDecorationLine', 'whiteSpace'],
  effects: ['transform', 'transformOrigin', 'transition', 'animationName',
    'animationDuration', 'animationTimingFunction', 'filter', 'backdropFilter'],
};

/* ── in-page extraction: runs inside the browser ───────────────────────── */
/* eslint-disable no-undef */
function domExtractor(cfg) {
  const { PROPS, MAX_DEPTH, REPEAT_SAMPLE } = cfg;
  const pick = (cs, list) => {
    const o = {};
    for (const p of list) {
      const v = cs[p];
      if (v !== '' && v != null) o[p] = v;
    }
    return o;
  };

  let nodeCount = 0;

  function walk(el, depth) {
    if (depth > MAX_DEPTH) return null;
    if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE'].includes(el.tagName)) return null;

    const cs = getComputedStyle(el);
    if (cs.display === 'none') return null;

    const rect = el.getBoundingClientRect();
    nodeCount++;

    // pseudo-elements: only record when they actually render something
    const pseudo = {};
    for (const which of ['::before', '::after']) {
      const ps = getComputedStyle(el, which);
      if (ps.content && ps.content !== 'none' && ps.content !== 'normal') {
        pseudo[which] = {
          content: ps.content, display: ps.display, position: ps.position,
          width: ps.width, height: ps.height,
          backgroundColor: ps.backgroundColor, backgroundImage: ps.backgroundImage,
          borderRadius: ps.borderRadius, transform: ps.transform,
        };
      }
    }

    // direct text content only (not descendants')
    const ownText = Array.from(el.childNodes)
      .filter((n) => n.nodeType === 3)
      .map((n) => n.textContent.trim())
      .filter(Boolean)
      .join(' ') || null;

    const attrs = {};
    for (const a of el.attributes) {
      if (a.name === 'class' || a.name === 'style') continue;
      attrs[a.name] = a.value.length > 300 ? a.value.slice(0, 300) + '…' : a.value;
    }

    // prune repeated siblings: keep full detail for the first REPEAT_SAMPLE
    // children sharing a class signature, collapse the rest to a stub.
    const kids = [];
    const seen = new Map();
    for (const child of el.children) {
      const sig = child.tagName + '.' + child.className;
      const n = (seen.get(sig) || 0) + 1;
      seen.set(sig, n);
      if (n > REPEAT_SAMPLE) {
        kids.push({ tag: child.tagName.toLowerCase(), repeatOf: sig, collapsed: true });
        continue;
      }
      const r = walk(child, depth + 1);
      if (r) kids.push(r);
    }

    return {
      tag: el.tagName.toLowerCase(),
      id: el.id || null,
      classes: typeof el.className === 'string'
        ? el.className.split(/\s+/).filter(Boolean) : [],
      attrs,
      text: ownText,
      inlineStyle: el.getAttribute('style') || null,
      box: {
        w: +rect.width.toFixed(1), h: +rect.height.toFixed(1),
        x: +rect.left.toFixed(1),
        y: +(rect.top + window.scrollY).toFixed(1), // document-absolute
      },
      layout: pick(cs, PROPS.layout),
      visual: pick(cs, PROPS.visual),
      typography: pick(cs, PROPS.typography),
      effects: pick(cs, PROPS.effects),
      cursor: cs.cursor,
      pseudo: Object.keys(pseudo).length ? pseudo : undefined,
      children: kids,
    };
  }

  const tree = walk(document.body, 0);

  /* CSS custom properties from :root */
  const rootCS = getComputedStyle(document.documentElement);
  const variables = {};
  for (let i = 0; i < rootCS.length; i++) {
    const n = rootCS[i];
    if (n.startsWith('--')) variables[n] = rootCS.getPropertyValue(n).trim();
  }

  /* stylesheet rules — same-origin readable ones inline, cross-origin flagged */
  const stylesheets = [];
  const mediaQueries = new Set();
  const keyframes = {};
  const fontFaces = [];

  for (let i = 0; i < document.styleSheets.length; i++) {
    const sheet = document.styleSheets[i];
    try {
      const rules = Array.from(sheet.cssRules || []);
      const collected = [];
      const visit = (rule, media) => {
        if (rule.type === 4) { // @media
          mediaQueries.add(rule.media.mediaText);
          Array.from(rule.cssRules).forEach((r) => visit(r, rule.media.mediaText));
        } else if (rule.type === 7) { // @keyframes
          keyframes[rule.name] = rule.cssText;
        } else if (rule.type === 5) { // @font-face
          fontFaces.push(rule.cssText);
        } else if (rule.selectorText) {
          collected.push({ selector: rule.selectorText, css: rule.cssText, media: media || null });
        }
      };
      rules.forEach((r) => visit(r, null));
      stylesheets.push({ href: sheet.href || 'inline', readable: true, ruleCount: collected.length, rules: collected });
    } catch {
      stylesheets.push({ href: sheet.href, readable: false, reason: 'cross-origin (CORS)' });
    }
  }

  /* asset inventory */
  const images = Array.from(document.querySelectorAll('img')).map((im) => ({
    src: im.currentSrc || im.src, srcset: im.getAttribute('srcset'),
    alt: im.alt, w: im.naturalWidth, h: im.naturalHeight,
    loading: im.getAttribute('loading'),
    displayW: +im.getBoundingClientRect().width.toFixed(0),
  }));

  const bgImages = [];
  document.querySelectorAll('*').forEach((el) => {
    const bi = getComputedStyle(el).backgroundImage;
    if (bi && bi !== 'none' && bi.includes('url(')) {
      bgImages.push({
        selector: el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') +
          (typeof el.className === 'string' && el.className ? '.' + el.className.split(/\s+/).filter(Boolean).join('.') : ''),
        image: bi.slice(0, 500),
      });
    }
  });

  const svgs = Array.from(document.querySelectorAll('svg')).slice(0, 60).map((s) => ({
    viewBox: s.getAttribute('viewBox'),
    cls: s.getAttribute('class'),
    markup: s.outerHTML.length < 3000 ? s.outerHTML : s.outerHTML.slice(0, 3000) + '…',
  }));

  /* fonts actually in use */
  const usedFonts = new Set();
  document.querySelectorAll('*').forEach((el) => usedFonts.add(getComputedStyle(el).fontFamily));

  return {
    tree,
    nodeCount,
    variables,
    stylesheets,
    mediaQueries: Array.from(mediaQueries),
    keyframes,
    fontFaces,
    assets: { images, bgImages, svgs, usedFonts: Array.from(usedFonts) },
    meta: {
      title: document.title,
      lang: document.documentElement.lang,
      dir: document.documentElement.dir || 'ltr',
      viewport: document.querySelector('meta[name=viewport]')?.content,
      docHeight: document.documentElement.scrollHeight,
      generator: document.querySelector('meta[name=generator]')?.content,
    },
  };
}
/* eslint-enable no-undef */

/* ── helpers ───────────────────────────────────────────────────────────── */
async function settle(page, ms = 2500) {
  await page.waitForTimeout(ms);
}

async function dismissOverlays(page) {
  const candidates = [
    'button:has-text("Accept")', 'button:has-text("Agree")',
    'button:has-text("Close")', '[aria-label="Close"]',
    'button:has-text("No thanks")', 'button:has-text("Continue")',
    '.needsclick button[aria-label*="lose"]',
  ];
  for (const sel of candidates) {
    try {
      const el = page.locator(sel).first();
      if (await el.isVisible({ timeout: 700 })) {
        await el.click({ timeout: 1500 });
        await page.waitForTimeout(400);
      }
    } catch { /* not present — fine */ }
  }
}

/** Scroll the page in steps so lazy-loaded sections and IO-triggered animations fire. */
async function fullScroll(page) {
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.8);
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 220));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 500));
  });
}

/* ── main ──────────────────────────────────────────────────────────────── */
export async function inspect(target, outDir) {
  const { name, url } = target;
  const dirs = {
    root: outDir,
    html: path.join(outDir, 'html'),
    css: path.join(outDir, 'css'),
    assets: path.join(outDir, 'assets'),
    shots: path.join(outDir, 'screenshots', name),
  };
  for (const d of Object.values(dirs)) await fs.mkdir(d, { recursive: true });

  // phlur.com sits behind a Cloudflare bot challenge. Headless Chromium gets served
  // "Just a moment..." forever; real Chrome under xvfb passes. Run this via xvfb-run.
  const browser = await chromium.launch({
    headless: false,
    channel: 'chrome',
    args: ['--disable-blink-features=AutomationControlled', '--no-sandbox',
      '--disable-dev-shm-usage'],
  });
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    locale: 'en-US',
    timezoneId: 'America/New_York',
  });
  await ctx.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
  });
  const page = await ctx.newPage();

  const netLog = [];
  page.on('response', (r) => {
    const ct = r.headers()['content-type'] || '';
    if (/css|font|image/.test(ct)) {
      netLog.push({ url: r.url(), type: ct.split(';')[0], status: r.status() });
    }
  });

  console.log(`  → navigating ${url}`);
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

  // wait out the Cloudflare interstitial before measuring anything
  for (let i = 0; i < 10; i++) {
    await page.waitForTimeout(4000);
    const t = await page.title();
    if (!/just a moment|attention required|verify you are human/i.test(t)) break;
    if (i === 9) throw new Error(`Cloudflare challenge did not clear for ${url}`);
  }
  await settle(page, 3000);
  await dismissOverlays(page);
  await fullScroll(page);
  await settle(page, 1200);

  /* 1. raw HTML */
  const rawHTML = await page.content();
  await fs.writeFile(path.join(dirs.html, `${name}.html`), rawHTML);

  /* 2. the big in-page extraction */
  console.log('  → extracting DOM + computed styles');
  const data = await page.evaluate(domExtractor, { PROPS, MAX_DEPTH, REPEAT_SAMPLE });

  /* 3. fetch cross-origin stylesheets over HTTP (NOT via page.goto) */
  console.log('  → downloading stylesheets');
  const api = ctx.request;
  const cssTexts = [];
  for (const s of data.stylesheets) {
    if (s.readable || !s.href) continue;
    try {
      const res = await api.get(s.href, { timeout: 20000 });
      if (res.ok()) cssTexts.push({ href: s.href, content: await res.text() });
    } catch (e) {
      cssTexts.push({ href: s.href, error: e.message });
    }
  }
  // also capture any stylesheet seen on the wire that the DOM didn't list
  for (const r of netLog.filter((n) => n.type === 'text/css')) {
    if (cssTexts.some((c) => c.href === r.url)) continue;
    try {
      const res = await api.get(r.url, { timeout: 20000 });
      if (res.ok()) cssTexts.push({ href: r.url, content: await res.text() });
    } catch { /* skip */ }
  }

  const combined = cssTexts
    .filter((c) => c.content)
    .map((c) => `/* ═══ ${c.href} ═══ */\n${c.content}`)
    .join('\n\n');
  await fs.writeFile(path.join(dirs.css, `${name}-external.css`), combined);

  // inline <style> blocks
  const inlineCSS = await page.evaluate(() =>
    Array.from(document.querySelectorAll('style')).map((s) => s.textContent).join('\n\n/* ── */\n\n'));
  await fs.writeFile(path.join(dirs.css, `${name}-inline.css`), inlineCSS);

  /* 4. screenshots */
  console.log('  → screenshots');
  const shots = {};
  await page.screenshot({ path: path.join(dirs.shots, 'full.png'), fullPage: true });
  shots.full = path.join(dirs.shots, 'full.png');

  // section screenshots, driven by top-level landmark children
  const sectionSelectors = await page.evaluate(() => {
    const out = [];
    const main = document.querySelector('main') || document.body;
    let i = 0;
    for (const el of main.children) {
      const r = el.getBoundingClientRect();
      if (r.height < 80) continue;
      // give it a stable handle
      const handle = `data-inspect-section-${i}`;
      el.setAttribute(handle, '1');
      out.push({ sel: `[${handle}]`, idx: i, h: Math.round(r.height), cls: (el.className || '').slice(0, 80), tag: el.tagName.toLowerCase() });
      i++;
    }
    return out;
  });

  shots.sections = [];
  for (const s of sectionSelectors.slice(0, 20)) {
    const file = path.join(dirs.shots, `section-${String(s.idx).padStart(2, '0')}.png`);
    try {
      await page.locator(s.sel).first().scrollIntoViewIfNeeded({ timeout: 5000 });
      await page.waitForTimeout(350);
      await page.locator(s.sel).first().screenshot({ path: file, timeout: 15000 });
      shots.sections.push({ ...s, file });
    } catch (e) {
      shots.sections.push({ ...s, error: e.message.split('\n')[0] });
    }
  }

  // header + footer explicitly
  for (const [key, sel] of [['header', 'header'], ['footer', 'footer']]) {
    try {
      const f = path.join(dirs.shots, `${key}.png`);
      await page.locator(sel).first().screenshot({ path: f, timeout: 10000 });
      shots[key] = f;
    } catch { /* absent */ }
  }

  /* 5. responsive captures */
  shots.responsive = {};
  for (const vp of [{ n: 'mobile', w: 390, h: 844 }, { n: 'tablet', w: 768, h: 1024 }]) {
    await page.setViewportSize({ width: vp.w, height: vp.h });
    await page.waitForTimeout(900);
    await fullScroll(page);
    const f = path.join(dirs.shots, `${vp.n}.png`);
    await page.screenshot({ path: f, fullPage: true });
    shots.responsive[vp.n] = f;
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(600);

  /* 6. interaction states — hover on the primary CTA + nav */
  const hoverStates = [];
  for (const sel of ['a[href*="product"]', 'button', 'nav a']) {
    try {
      const el = page.locator(sel).first();
      if (!(await el.isVisible({ timeout: 1000 }))) continue;
      const before = await el.evaluate((n) => {
        const c = getComputedStyle(n);
        return { bg: c.backgroundColor, color: c.color, transform: c.transform, borderColor: c.borderColor, opacity: c.opacity, textDecoration: c.textDecorationLine };
      });
      await el.hover({ timeout: 3000 });
      await page.waitForTimeout(500);
      const after = await el.evaluate((n) => {
        const c = getComputedStyle(n);
        return { bg: c.backgroundColor, color: c.color, transform: c.transform, borderColor: c.borderColor, opacity: c.opacity, textDecoration: c.textDecorationLine };
      });
      hoverStates.push({ selector: sel, before, after, changed: JSON.stringify(before) !== JSON.stringify(after) });
    } catch { /* skip */ }
  }

  await browser.close();

  /* 7. persist */
  const bundle = { ...data, shots, hoverStates, network: netLog, url, name };
  await fs.writeFile(path.join(dirs.root, `${name}.dom.json`), JSON.stringify(data.tree, null, 1));
  await fs.writeFile(path.join(dirs.css, `${name}-variables.json`), JSON.stringify(data.variables, null, 2));
  await fs.writeFile(path.join(dirs.css, `${name}-media-queries.json`), JSON.stringify(data.mediaQueries, null, 2));
  await fs.writeFile(path.join(dirs.css, `${name}-keyframes.json`), JSON.stringify(data.keyframes, null, 2));
  await fs.writeFile(path.join(dirs.assets, `${name}-assets.json`), JSON.stringify(data.assets, null, 2));
  await fs.writeFile(path.join(dirs.root, `${name}.meta.json`), JSON.stringify({
    meta: data.meta, nodeCount: data.nodeCount, shots, hoverStates,
    fontFaces: data.fontFaces, mediaQueries: data.mediaQueries,
    stylesheetSummary: data.stylesheets.map(({ href, readable, ruleCount, reason }) => ({ href, readable, ruleCount, reason })),
  }, null, 2));

  console.log(`  ✓ ${name}: ${data.nodeCount} nodes, ${data.stylesheets.length} sheets, ` +
    `${data.assets.images.length} imgs, ${shots.sections.length} sections`);

  return bundle;
}
