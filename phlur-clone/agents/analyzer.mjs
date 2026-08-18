/**
 * AGENT 2: ADVANCED ANALYZER
 * Turns the raw computed-style dump into a design system: palette, type scale,
 * spacing scale, layout strategy, component inventory, breakpoints.
 */
import fs from 'node:fs/promises';
import path from 'node:path';

/* ── colour utils ──────────────────────────────────────────────────────── */
const parseRGB = (s) => {
  if (!s) return null;
  const m = s.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const p = m[1].split(/[,/]/).map((x) => parseFloat(x.trim()));
  const [r, g, b] = p;
  const a = p.length > 3 ? p[3] : 1;
  if ([r, g, b].some(Number.isNaN)) return null;
  return { r, g, b, a };
};
const toHex = (c) => '#' + [c.r, c.g, c.b].map((x) =>
  Math.round(x).toString(16).padStart(2, '0')).join('');
const luminance = (c) => {
  const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
};
const contrast = (a, b) => {
  const l1 = luminance(a), l2 = luminance(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};
/** saturation in HSL terms — used to prove "is this palette warm or cool?" */
const hsl = (c) => {
  const r = c.r / 255, g = c.g / 255, b = c.b / 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
  let h = 0;
  if (d) {
    if (mx === r) h = ((g - b) / d) % 6;
    else if (mx === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60; if (h < 0) h += 360;
  }
  const l = (mx + mn) / 2;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  return { h, s: +(s * 100).toFixed(1), l: +(l * 100).toFixed(1) };
};

/* ── tree walk ─────────────────────────────────────────────────────────── */
function* walk(node, depth = 0, parent = null) {
  if (!node || node.collapsed) return;
  yield { node, depth, parent };
  for (const c of node.children || []) yield* walk(c, depth + 1, node);
}

const px = (v) => {
  if (!v) return null;
  const n = parseFloat(v);
  return Number.isNaN(n) ? null : n;
};

/* ── analysis passes ───────────────────────────────────────────────────── */

function colorPalette(tree) {
  const bg = new Map(), fg = new Map(), bd = new Map();
  const bump = (m, k, area) => m.set(k, (m.get(k) || 0) + area);

  for (const { node } of walk(tree)) {
    const area = Math.max(1, (node.box?.w || 0) * (node.box?.h || 0));
    const b = parseRGB(node.visual?.backgroundColor);
    if (b && b.a > 0.05) bump(bg, toHex(b), area);
    const f = parseRGB(node.typography ? node.visual?.color : null);
    if (f && node.text) bump(fg, toHex(f), (node.text.length || 1) * 40);
    const bc = parseRGB(node.visual?.borderTopColor);
    if (bc && bc.a > 0.05 && px(node.visual?.borderTopWidth) > 0) bump(bd, toHex(bc), area);
  }

  const rank = (m) => [...m.entries()].sort((a, b) => b[1] - a[1])
    .slice(0, 14)
    .map(([hex, weight]) => {
      const c = parseRGB(`rgb(${parseInt(hex.slice(1, 3), 16)},${parseInt(hex.slice(3, 5), 16)},${parseInt(hex.slice(5, 7), 16)})`);
      return { hex, weight: Math.round(weight), ...hsl(c) };
    });

  return { backgrounds: rank(bg), text: rank(fg), borders: rank(bd) };
}

function typographyScale(tree) {
  const styles = new Map();
  for (const { node } of walk(tree)) {
    const t = node.typography;
    if (!t?.fontSize || !node.text) continue;
    const key = [t.fontFamily, t.fontSize, t.fontWeight, t.letterSpacing, t.textTransform].join('|');
    if (!styles.has(key)) {
      styles.set(key, {
        fontFamily: (t.fontFamily || '').split(',')[0].replace(/["']/g, ''),
        fontSize: t.fontSize,
        px: px(t.fontSize),
        fontWeight: t.fontWeight,
        lineHeight: t.lineHeight,
        letterSpacing: t.letterSpacing,
        textTransform: t.textTransform,
        count: 0, samples: [], tags: new Set(),
      });
    }
    const s = styles.get(key);
    s.count++;
    s.tags.add(node.tag);
    if (s.samples.length < 3) s.samples.push(node.text.slice(0, 46));
  }
  return [...styles.values()]
    .map((s) => ({ ...s, tags: [...s.tags] }))
    .sort((a, b) => (b.px || 0) - (a.px || 0));
}

function spacingScale(tree) {
  const hits = new Map();
  const add = (v) => {
    const n = px(v);
    if (n == null || n === 0 || n > 400) return;
    hits.set(n, (hits.get(n) || 0) + 1);
  };
  for (const { node } of walk(tree)) {
    const l = node.layout || {};
    ['marginTop', 'marginBottom', 'paddingTop', 'paddingBottom',
      'paddingLeft', 'paddingRight', 'gap', 'rowGap', 'columnGap'].forEach((k) => add(l[k]));
  }
  const sorted = [...hits.entries()].sort((a, b) => b[1] - a[1]);
  const top = sorted.slice(0, 22).sort((a, b) => a[0] - b[0]);
  // infer the base unit: the GCD-ish modulus most values agree with
  const bases = [4, 5, 8, 10, 12];
  const fit = bases.map((b) => ({
    base: b,
    agreement: +(sorted.filter(([v]) => v % b === 0).reduce((s, [, c]) => s + c, 0) /
      sorted.reduce((s, [, c]) => s + c, 0)).toFixed(3),
  })).sort((a, b) => b.agreement - a.agreement);
  return { scale: top.map(([v, c]) => ({ px: v, uses: c })), baseUnitFit: fit };
}

function shapeAndElevation(tree) {
  const radii = new Map(), shadows = new Map();
  for (const { node } of walk(tree)) {
    const r = node.visual?.borderRadius;
    if (r && r !== '0px') radii.set(r, (radii.get(r) || 0) + 1);
    else if (r === '0px') radii.set('0px', (radii.get('0px') || 0) + 1);
    const s = node.visual?.boxShadow;
    if (s && s !== 'none') shadows.set(s.slice(0, 70), (shadows.get(s.slice(0, 70)) || 0) + 1);
  }
  return {
    radii: [...radii.entries()].sort((a, b) => b[1] - a[1]).map(([v, c]) => ({ value: v, count: c })),
    shadows: [...shadows.entries()].sort((a, b) => b[1] - a[1]).map(([v, c]) => ({ value: v, count: c })),
  };
}

function layoutStrategy(tree) {
  const display = new Map(), grids = new Map();
  let maxWidths = new Map();
  for (const { node } of walk(tree)) {
    const d = node.layout?.display;
    if (d) display.set(d, (display.get(d) || 0) + 1);
    const gt = node.layout?.gridTemplateColumns;
    if (gt && gt !== 'none') grids.set(gt.slice(0, 90), (grids.get(gt.slice(0, 90)) || 0) + 1);
    const mw = node.layout?.maxWidth;
    if (mw && mw !== 'none') maxWidths.set(mw, (maxWidths.get(mw) || 0) + 1);
  }
  const srt = (m, n = 12) => [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, n)
    .map(([value, count]) => ({ value, count }));
  return { display: srt(display), gridTemplates: srt(grids), maxWidths: srt(maxWidths) };
}

/** Identify page sections and what kind of block each is. */
function sectionInventory(tree) {
  const out = [];
  for (const { node } of walk(tree)) {
    const cls = (node.classes || []).join(' ');
    if (!/shopify-section/.test(cls)) continue;
    const kids = [...walk(node)];
    const imgs = kids.filter((k) => k.node.tag === 'img').length;
    const headings = kids.filter((k) => /^h[1-3]$/.test(k.node.tag) && k.node.text)
      .map((k) => k.node.text);
    const links = kids.filter((k) => k.node.tag === 'a').length;
    const buttons = kids.filter((k) => k.node.tag === 'button' ||
      /button|btn/.test((k.node.classes || []).join(' '))).length;
    // classify
    let kind = 'generic';
    if (/banner/.test(cls)) kind = 'hero-banner';
    else if (/featured-collection/.test(cls)) kind = 'product-carousel';
    else if (/collection-list/.test(cls)) kind = 'collection-grid';
    else if (/footer/.test(cls)) kind = 'footer';
    else if (/header/.test(cls)) kind = 'header';
    else if (imgs > 3 && links > 3) kind = 'product-carousel';
    out.push({
      classes: cls, kind,
      height: node.box?.h, width: node.box?.w, y: node.box?.y,
      bg: node.visual?.backgroundColor,
      images: imgs, links, buttons,
      headings: headings.slice(0, 3),
      descendants: kids.length,
    });
  }
  return out.sort((a, b) => (a.y || 0) - (b.y || 0));
}

/** Detect repeated card-like structures = the reusable components. */
function componentInventory(tree) {
  const sigs = new Map();
  for (const { node, parent } of walk(tree)) {
    if (!parent || !node.classes?.length) continue;
    const sig = node.tag + '.' + node.classes.slice(0, 3).join('.');
    if (!sigs.has(sig)) sigs.set(sig, { sig, count: 0, boxes: [], sample: null });
    const e = sigs.get(sig);
    e.count++;
    if (node.box?.w) e.boxes.push([node.box.w, node.box.h]);
    if (!e.sample) e.sample = node;
  }
  return [...sigs.values()]
    .filter((e) => e.count >= 3 && e.boxes.length >= 3)
    .map((e) => {
      const w = e.boxes.map((b) => b[0]), h = e.boxes.map((b) => b[1]);
      const uniformW = new Set(w.map((x) => Math.round(x))).size <= 2;
      const kids = [...walk(e.sample)];
      return {
        signature: e.sig, instances: e.count,
        avgW: +(w.reduce((a, b) => a + b, 0) / w.length).toFixed(0),
        avgH: +(h.reduce((a, b) => a + b, 0) / h.length).toFixed(0),
        uniformWidth: uniformW,
        hasImage: kids.some((k) => k.node.tag === 'img'),
        hasHeading: kids.some((k) => /^h[1-6]$/.test(k.node.tag)),
        hasLink: kids.some((k) => k.node.tag === 'a'),
        radius: e.sample.visual?.borderRadius,
        bg: e.sample.visual?.backgroundColor,
      };
    })
    .filter((c) => c.hasImage || c.hasHeading)
    .sort((a, b) => b.instances - a.instances)
    .slice(0, 25);
}

function breakpoints(mediaQueries) {
  const set = new Map();
  for (const mq of mediaQueries) {
    for (const m of mq.matchAll(/\((min|max)-width:\s*([\d.]+)(px|em|rem)\)/g)) {
      const val = m[3] === 'px' ? +m[2] : +m[2] * 16;
      const k = `${m[1]}-${Math.round(val)}`;
      set.set(k, (set.get(k) || 0) + 1);
    }
  }
  return [...set.entries()]
    .map(([k, c]) => ({ type: k.split('-')[0], px: +k.split('-')[1], uses: c }))
    .sort((a, b) => a.px - b.px);
}

/* ── entry ─────────────────────────────────────────────────────────────── */
export async function analyze(pageName, inspectionDir) {
  const tree = JSON.parse(await fs.readFile(path.join(inspectionDir, `${pageName}.dom.json`), 'utf8'));
  const meta = JSON.parse(await fs.readFile(path.join(inspectionDir, `${pageName}.meta.json`), 'utf8'));

  const palette = colorPalette(tree);
  const warmth = (() => {
    // a hue between ~20 and ~60 is "warm"; near-zero saturation is neutral
    const chromatic = palette.backgrounds.filter((c) => c.s > 8);
    const warm = chromatic.filter((c) => c.h >= 15 && c.h <= 65).length;
    const cool = chromatic.filter((c) => c.h > 150 && c.h < 280).length;
    return { chromaticBackgrounds: chromatic.length, warm, cool, verdict: cool > warm ? 'cool-leaning' : warm > cool ? 'warm-leaning' : 'neutral/achromatic' };
  })();

  const result = {
    page: pageName,
    designSystem: {
      palette,
      warmth,
      typography: typographyScale(tree),
      spacing: spacingScale(tree),
      shape: shapeAndElevation(tree),
      breakpoints: breakpoints(meta.mediaQueries || []),
      fontFaces: (meta.fontFaces || []).map((f) => {
        const fam = f.match(/font-family:\s*([^;]+)/)?.[1];
        const src = f.match(/url\(([^)]+)\)/)?.[1];
        const wt = f.match(/font-weight:\s*([^;]+)/)?.[1];
        return { family: fam?.replace(/["']/g, ''), weight: wt, src: src?.slice(0, 120) };
      }),
    },
    layout: layoutStrategy(tree),
    sections: sectionInventory(tree),
    components: componentInventory(tree),
  };

  return result;
}
