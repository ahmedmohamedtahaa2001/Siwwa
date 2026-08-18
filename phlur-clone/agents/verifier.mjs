/**
 * AGENT 5b: VISUAL VERIFIER
 * Renders the generated components in a real browser and compares the resulting
 * geometry against the values measured off phlur.com.
 *
 * Why geometry and not pixels: phlur.com's photography and its two webfonts
 * (aktiv-grotesk-extended, ABCRepro) are licensed and are not reproduced here,
 * so a pixel diff would measure asset substitution, not layout fidelity.
 * Box dimensions, spacing, type metrics and colour ARE reproducible, so those
 * are what get scored.
 */
import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

/** Build a static harness whose markup mirrors what the Liquid snippets emit. */
export async function makeHarness(genDir, outFile) {
  const assets = path.join(genDir, 'assets');
  const read = (f) => fs.readFile(path.join(assets, f), 'utf8');
  const css = (await Promise.all([
    'phlur-siwa-tokens.css', 'component-button.css', 'component-badge-stamp.css',
    'component-product-card.css', 'section-hero-banner.css',
    'section-product-carousel.css', 'section-collection-grid.css',
    'section-editorial.css', 'section-site-header.css', 'section-site-footer.css',
  ].map(read))).join('\n');

  // A neutral placeholder standing in for licensed product photography.
  const ph = (w, h, fill = '%23e8e8e8') =>
    `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'%3E%3Crect width='100%25' height='100%25' fill='${fill}'/%3E%3C/svg%3E`;

  const card = (title, sub, badge) => `
    <a class="pl-card" href="#">
      <div class="pl-card__media">
        ${badge ? `<span class="pl-badge-slot"><span class="pl-badge pl-badge--default">${badge}</span></span>` : ''}
        <img class="pl-card__image" src="${ph(600, 600)}" alt="">
      </div>
      <div class="pl-card__body">
        <h3 class="pl-card__title">${title}</h3>
        <p class="pl-card__subtitle">${sub}</p>
        <p class="pl-card__price">$96</p>
      </div>
    </a>`;

  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>phlur-clone harness</title>
<style>
*,*::before,*::after{box-sizing:border-box}
body{margin:0;font-family:Inter,system-ui,sans-serif;background:var(--pl-bg)}
.visually-hidden{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
${css}
</style></head>
<body>

<div class="pl-announce">Complimentary shipping on orders over $75</div>

<header class="pl-header">
  <div class="pl-header__inner">
    <nav class="pl-header__nav" aria-label="Primary">
      <a href="#">Missing Person</a><a href="#">Vanilla Skin</a>
      <a href="#">Father Figure</a><a href="#">Beach Skin</a>
    </nav>
    <button class="pl-header__actions pl-header__burger" type="button" aria-label="Open menu">&#9776;</button>
    <a class="pl-header__logo" href="#">SIWA</a>
    <div class="pl-header__actions"><a href="#">Search</a><a href="#">Account</a><a href="#">Cart (0)</a></div>
  </div>
</header>

<section class="pl-hero" id="hero">
  <div class="pl-hero__media"><img src="${ph(2880, 1246, '%23594028')}" alt=""></div>
  <div class="pl-hero__scrim" aria-hidden="true"></div>
  <div class="pl-hero__content">
    <h2 class="pl-hero__heading">Vanilla Canyon</h2>
    <p class="pl-hero__subheading">A soulful vanilla that wears like the freedom of the open road</p>
    <a class="pl-button pl-button--inverse" href="#" id="hero-cta">Shop now</a>
  </div>
</section>

<section class="pl-carousel" id="carousel">
  <div class="pl-carousel__inner">
    <div class="pl-carousel__head">
      <h2 class="pl-carousel__title">Bestsellers</h2>
      <a class="pl-carousel__link" href="#">Shop All</a>
    </div>
    <ul class="pl-carousel__track" role="list">
      <li class="pl-carousel__item">${card('Mini Perfume Set', '4 x 7mL Eau de Parfum', 'New')}</li>
      <li class="pl-carousel__item">${card('Vanilla &amp; Cream', 'Hair &amp; Body Mist Duo', 'Bestseller')}</li>
      <li class="pl-carousel__item">${card('Discovery Set', '8 x 2mL Samples', '$20 Credit')}</li>
      <li class="pl-carousel__item">${card('Island Escape', 'Travel Size Body Mist Trio', 'New')}</li>
      <li class="pl-carousel__item">${card('Missing Person', '100mL Eau de Parfum', '')}</li>
    </ul>
  </div>
</section>

<section class="pl-editorial"><div class="pl-editorial__inner">
  <blockquote class="pl-editorial__quote">Modern fragrances inspired by memory.</blockquote>
  <p class="pl-editorial__attribution">Siwa Fragrances</p>
</div></section>

<section class="pl-grid-section" id="collgrid"><div class="pl-grid-section__inner">
  <h2 class="pl-grid-section__title">Featured Collections</h2>
  <div class="pl-grid pl-grid--3">
    <a class="pl-tile" href="#"><img src="${ph(900, 1200)}" alt=""><span class="pl-tile__label">Perfumes</span></a>
    <a class="pl-tile" href="#"><img src="${ph(900, 1200)}" alt=""><span class="pl-tile__label">Body Mist</span></a>
    <a class="pl-tile" href="#"><img src="${ph(900, 1200)}" alt=""><span class="pl-tile__label">Gifts</span></a>
  </div>
</div></section>

<footer class="pl-footer">
  <div class="pl-footer__inner">
    <div><h2 class="pl-footer__title">Stay in touch</h2>
      <div class="pl-footer__signup"><input type="email" placeholder="Email address">
      <button class="pl-button pl-button--ghost" type="submit">Sign up</button></div></div>
    <div><h2 class="pl-footer__title">Shop</h2><ul class="pl-footer__list" role="list">
      <li><a href="#">Perfumes</a></li><li><a href="#">Body</a></li><li><a href="#">Gifts</a></li></ul></div>
    <div><h2 class="pl-footer__title">About</h2><ul class="pl-footer__list" role="list">
      <li><a href="#">Our story</a></li><li><a href="#">Ingredients</a></li></ul></div>
    <div><h2 class="pl-footer__title">Help</h2><ul class="pl-footer__list" role="list">
      <li><a href="#">Contact</a></li><li><a href="#">Shipping</a></li></ul></div>
  </div>
  <div class="pl-footer__bottom"><span>&copy; 2026 Siwa</span><span>All rights reserved</span></div>
</footer>

</body></html>`;

  await fs.writeFile(outFile, html);
  return outFile;
}

/* ── scoring ───────────────────────────────────────────────────────────── */
const within = (actual, expected, tolPct) => {
  if (expected == null || actual == null) return null;
  if (expected === 0) return actual === 0;
  return Math.abs(actual - expected) / Math.abs(expected) <= tolPct;
};

export async function verify(harnessFile, measurements, outDir) {
  const M = measurements.home;
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto('file://' + harnessFile, { waitUntil: 'load' });
  await page.waitForTimeout(600);

  const probe = await page.evaluate(() => {
    const g = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const c = getComputedStyle(el);
      return {
        w: +r.width.toFixed(1), h: +r.height.toFixed(1),
        bg: c.backgroundColor, color: c.color,
        radius: c.borderRadius, shadow: c.boxShadow,
        fontSize: c.fontSize, fontWeight: c.fontWeight,
        letterSpacing: c.letterSpacing, textTransform: c.textTransform,
        lineHeight: c.lineHeight,
        padInline: [c.paddingLeft, c.paddingRight].join(' '),
        gap: c.gap || c.columnGap,
      };
    };
    return {
      heroCta: g('#hero-cta'),
      hero: g('#hero'),
      heroHeading: g('.pl-hero__heading'),
      badge: g('.pl-badge'),
      card: g('.pl-carousel__item .pl-card'),
      cardMedia: g('.pl-card__media'),
      cardTitle: g('.pl-card__title'),
      cardSubtitle: g('.pl-card__subtitle'),
      track: g('.pl-carousel__track'),
      sectionTitle: g('.pl-carousel__title'),
      header: g('.pl-header'),
      announce: g('.pl-announce'),
      inner: g('.pl-carousel__inner'),
    };
  });

  await page.screenshot({ path: path.join(outDir, 'harness-full.png'), fullPage: true });
  for (const [id, sel] of [['hero', '#hero'], ['carousel', '#carousel'], ['collgrid', '#collgrid']]) {
    try {
      await page.locator(sel).screenshot({ path: path.join(outDir, `harness-${id}.png`) });
    } catch { /* skip */ }
  }

  await browser.close();

  /* ── build the comparison table ─────────────────────────────────────── */
  const btn = M.buttons.find((b) => /shop now/i.test(b.text)) || M.buttons[0];
  const badge = M.badges[0];
  const card = M.productCard;
  const hero = M.hero;

  const checks = [
    ['hero height', probe.hero?.h, hero?.h, 0.03],
    ['hero heading font-size', parseFloat(probe.heroHeading?.fontSize), parseFloat(hero?.heading?.fontSize), 0.01],
    ['hero heading line-height', parseFloat(probe.heroHeading?.lineHeight), parseFloat(hero?.heading?.lineHeight), 0.02],
    ['hero heading tracking', parseFloat(probe.heroHeading?.letterSpacing), parseFloat(hero?.heading?.letterSpacing), 0.05],
    ['CTA width', probe.heroCta?.w, btn?.w, 0.06],
    ['CTA height', probe.heroCta?.h, btn?.h, 0.02],
    ['CTA font-size', parseFloat(probe.heroCta?.fontSize), parseFloat(btn?.fontSize), 0.01],
    ['CTA tracking', parseFloat(probe.heroCta?.letterSpacing), parseFloat(btn?.letterSpacing), 0.05],
    ['badge height', probe.badge?.h, badge?.h, 0.06],
    ['badge font-size', parseFloat(probe.badge?.fontSize), parseFloat(badge?.fontSize), 0.01],
    ['badge tracking', parseFloat(probe.badge?.letterSpacing), parseFloat(badge?.letterSpacing), 0.05],
    ['card width', probe.card?.w, card?.w, 0.02],
    ['card media ratio', probe.cardMedia ? +(probe.cardMedia.w / probe.cardMedia.h).toFixed(3) : null, card?.imageBox?.ratio, 0.02],
    ['card title font-size', parseFloat(probe.cardTitle?.fontSize), 14, 0.01],
    ['card title tracking', parseFloat(probe.cardTitle?.letterSpacing), 0.64, 0.06],
    ['carousel gap', parseFloat(probe.track?.gap), 20, 0.01],
    ['content container width', probe.inner?.w, 1265, 0.02],
    ['header height', probe.header?.h, M.header?.h, 0.03],
    ['announcement height', probe.announce?.h, 36, 0.06],
  ];

  const results = checks.map(([name, actual, expected, tol]) => ({
    name,
    actual: actual == null || Number.isNaN(actual) ? null : +(+actual).toFixed(2),
    expected: expected == null ? null : +(+expected).toFixed(2),
    tolerance: `±${(tol * 100).toFixed(0)}%`,
    delta: actual != null && expected ? +(actual - expected).toFixed(2) : null,
    pass: within(actual, expected, tol),
  }));

  /* categorical (non-numeric) checks */
  const cat = [
    { name: 'card radius = 0', actual: probe.card?.radius, expected: '0px', pass: probe.card?.radius === '0px' },
    { name: 'card shadow = none', actual: probe.card?.shadow, expected: 'none', pass: probe.card?.shadow === 'none' },
    { name: 'CTA radius = 0', actual: probe.heroCta?.radius, expected: '0px', pass: probe.heroCta?.radius === '0px' },
    { name: 'badge radius = 0', actual: probe.badge?.radius, expected: '0px', pass: probe.badge?.radius === '0px' },
    { name: 'card title uppercase', actual: probe.cardTitle?.textTransform, expected: 'uppercase', pass: probe.cardTitle?.textTransform === 'uppercase' },
    { name: 'hero heading uppercase', actual: probe.heroHeading?.textTransform, expected: 'uppercase', pass: probe.heroHeading?.textTransform === 'uppercase' },
    { name: 'CTA uppercase', actual: probe.heroCta?.textTransform, expected: 'uppercase', pass: probe.heroCta?.textTransform === 'uppercase' },
  ];

  const all = [...results, ...cat];
  const scored = all.filter((r) => r.pass !== null);
  const passed = scored.filter((r) => r.pass).length;
  const score = scored.length ? passed / scored.length : 0;

  return { probe, results, categorical: cat, score, passed, total: scored.length };
}
