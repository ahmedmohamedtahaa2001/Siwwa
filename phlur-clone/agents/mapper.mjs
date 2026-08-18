/**
 * AGENT 3: INTELLIGENT MAPPER
 * Measures the exact geometry of the components we intend to rebuild, then maps
 * each onto a Siwa design-system component, recording every rule override.
 *
 * Target library is the Siwa Shopify design system (siwa-design-system/DESIGN.md),
 * whose specified components are:
 *   button-primary/secondary/ghost, input-field, checkbox, badge-stamp,
 *   product-card, primary-nav, footer, modal/drawer, dark-cta-strip,
 *   feature-row, product-grid, hero-section, price-display, toast
 */
import fs from 'node:fs/promises';
import path from 'node:path';

function* walk(node) {
  if (!node || node.collapsed) return;
  yield node;
  for (const c of node.children || []) yield* walk(c);
}

const num = (v) => { const n = parseFloat(v); return Number.isNaN(n) ? null : n; };

/** Find the first node matching a predicate, plus its measured box + styles. */
function findAll(tree, pred) {
  return [...walk(tree)].filter(pred);
}

const cls = (n) => (n.classes || []).join(' ');
const txt = (n) => (n.text || '').trim();

/* ── measure the concrete pieces we need to rebuild ────────────────────── */
export async function measure(pageName, inspectionDir) {
  const tree = JSON.parse(await fs.readFile(path.join(inspectionDir, `${pageName}.dom.json`), 'utf8'));
  const M = {};

  /* -- primary CTA button (the white "SHOP NOW" in the hero) ------------ */
  const buttonish = findAll(tree, (n) =>
    (n.tag === 'a' || n.tag === 'button') &&
    n.box?.h >= 28 && n.box?.h <= 70 && n.box?.w >= 70 &&
    n.visual?.backgroundColor && n.visual.backgroundColor !== 'rgba(0, 0, 0, 0)');

  M.buttons = buttonish.slice(0, 8).map((n) => ({
    text: txt(n) || (n.attrs?.['aria-label'] ?? ''),
    w: n.box.w, h: n.box.h,
    bg: n.visual.backgroundColor,
    color: n.visual.color,
    radius: n.visual.borderRadius,
    border: `${n.visual.borderTopWidth} ${n.visual.borderTopStyle} ${n.visual.borderTopColor}`,
    padding: [n.layout.paddingTop, n.layout.paddingRight, n.layout.paddingBottom, n.layout.paddingLeft].join(' '),
    font: n.typography?.fontFamily?.split(',')[0].replace(/["']/g, ''),
    fontSize: n.typography?.fontSize,
    fontWeight: n.typography?.fontWeight,
    letterSpacing: n.typography?.letterSpacing,
    textTransform: n.typography?.textTransform,
    transition: n.effects?.transition?.slice(0, 60),
  }));

  /* -- badge stamps ("NEW", "BESTSELLER", "$20 CREDIT") ----------------- */
  const badges = findAll(tree, (n) => {
    const t = txt(n);
    return t && t.length < 22 && n.box?.h >= 16 && n.box?.h <= 34 &&
      n.typography?.textTransform === 'uppercase' &&
      n.visual?.backgroundColor && n.visual.backgroundColor !== 'rgba(0, 0, 0, 0)' &&
      n.box.w < 160;
  });
  M.badges = badges.slice(0, 6).map((n) => ({
    text: txt(n), w: n.box.w, h: n.box.h,
    bg: n.visual.backgroundColor, color: n.visual.color,
    radius: n.visual.borderRadius,
    padding: [n.layout.paddingTop, n.layout.paddingRight, n.layout.paddingBottom, n.layout.paddingLeft].join(' '),
    fontSize: n.typography.fontSize, fontWeight: n.typography.fontWeight,
    letterSpacing: n.typography.letterSpacing,
    font: n.typography.fontFamily?.split(',')[0].replace(/["']/g, ''),
  }));

  /* -- product card ------------------------------------------------------ */
  const cards = findAll(tree, (n) => /card-wrapper|product-card|card__/.test(cls(n)) && n.box?.w > 150);
  const card = cards[0];
  if (card) {
    const kids = [...walk(card)];
    const img = kids.find((k) => k.tag === 'img');
    const heading = kids.find((k) => /^h[1-6]$/.test(k.tag) && txt(k)) ||
      kids.find((k) => k.typography?.textTransform === 'uppercase' && txt(k));
    const sub = kids.find((k) => txt(k) && k !== heading && k.typography?.textTransform !== 'uppercase');
    M.productCard = {
      w: card.box.w, h: card.box.h,
      bg: card.visual?.backgroundColor, radius: card.visual?.borderRadius,
      shadow: card.visual?.boxShadow,
      imageBox: img ? { w: img.box.w, h: img.box.h, ratio: +(img.box.w / img.box.h).toFixed(3) } : null,
      imageWrapperBg: kids.find((k) => k.visual?.backgroundColor &&
        k.visual.backgroundColor !== 'rgba(0, 0, 0, 0)')?.visual.backgroundColor,
      title: heading ? {
        text: txt(heading), fontSize: heading.typography?.fontSize,
        weight: heading.typography?.fontWeight,
        transform: heading.typography?.textTransform,
        letterSpacing: heading.typography?.letterSpacing,
        font: heading.typography?.fontFamily?.split(',')[0].replace(/["']/g, ''),
        marginTop: heading.layout?.marginTop,
      } : null,
      subtitle: sub ? {
        text: txt(sub), fontSize: sub.typography?.fontSize,
        color: sub.visual?.color, weight: sub.typography?.fontWeight,
      } : null,
      instances: cards.length,
    };
  }

  /* -- product grid / carousel container -------------------------------- */
  const grids = findAll(tree, (n) =>
    (n.layout?.display === 'grid' || n.layout?.display === 'flex') &&
    (n.children || []).length >= 3 && n.box?.w > 600);
  M.grid = grids.slice(0, 4).map((n) => ({
    display: n.layout.display,
    cols: n.layout.gridTemplateColumns?.slice(0, 80),
    gap: n.layout.gap || n.layout.columnGap,
    w: n.box.w,
    children: (n.children || []).length,
    overflow: n.layout?.overflowX || n.visual?.overflowX,
  }));

  /* -- hero banner ------------------------------------------------------- */
  const hero = findAll(tree, (n) => /banner/.test(cls(n)) && n.box?.h > 400)[0];
  if (hero) {
    const kids = [...walk(hero)];
    const h1 = kids.find((k) => /^h[1-2]$/.test(k.tag) && txt(k));
    const cta = kids.find((k) => (k.tag === 'a' || k.tag === 'button') &&
      k.visual?.backgroundColor !== 'rgba(0, 0, 0, 0)' && k.box?.h > 25);
    const content = kids.find((k) => /banner__box|banner__content/.test(cls(k)));
    M.hero = {
      h: hero.box.h, w: hero.box.w,
      bg: hero.visual?.backgroundColor,
      heading: h1 ? {
        text: txt(h1), fontSize: h1.typography?.fontSize,
        weight: h1.typography?.fontWeight, transform: h1.typography?.textTransform,
        letterSpacing: h1.typography?.letterSpacing, color: h1.visual?.color,
        font: h1.typography?.fontFamily?.split(',')[0].replace(/["']/g, ''),
        lineHeight: h1.typography?.lineHeight,
      } : null,
      cta: cta ? { text: txt(cta), w: cta.box.w, h: cta.box.h, bg: cta.visual.backgroundColor, color: cta.visual.color, radius: cta.visual.borderRadius } : null,
      contentBox: content ? {
        align: content.layout?.alignItems, justify: content.layout?.justifyContent,
        padding: [content.layout?.paddingTop, content.layout?.paddingRight, content.layout?.paddingBottom, content.layout?.paddingLeft].join(' '),
        position: content.layout?.position,
        w: content.box?.w,
      } : null,
      ctaCount: kids.filter((k) => (k.tag === 'a' || k.tag === 'button') &&
        k.visual?.backgroundColor !== 'rgba(0, 0, 0, 0)' && k.box?.h > 25).length,
    };
  }

  /* -- header / nav ------------------------------------------------------ */
  const header = findAll(tree, (n) => n.tag === 'header' || /header__inner|site-header/.test(cls(n)))[0];
  if (header) {
    const links = [...walk(header)].filter((k) => k.tag === 'a' && txt(k));
    M.header = {
      h: header.box?.h, bg: header.visual?.backgroundColor,
      position: header.layout?.position,
      padding: [header.layout?.paddingTop, header.layout?.paddingRight, header.layout?.paddingBottom, header.layout?.paddingLeft].join(' '),
      links: links.slice(0, 12).map((l) => ({
        text: txt(l), href: l.attrs?.href,
        fontSize: l.typography?.fontSize, transform: l.typography?.textTransform,
        letterSpacing: l.typography?.letterSpacing, weight: l.typography?.fontWeight,
      })),
    };
  }

  /* -- page container width --------------------------------------------- */
  const widths = new Map();
  for (const n of walk(tree)) {
    const mw = n.layout?.maxWidth;
    if (mw && mw !== 'none' && num(mw) > 600) widths.set(mw, (widths.get(mw) || 0) + 1);
  }
  M.container = [...widths.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5)
    .map(([value, count]) => ({ value, count }));

  return M;
}

/* ── Siwa mapping + override ledger ────────────────────────────────────── */

/** Siwa tokens, parsed from the real token file so we never hardcode hex here. */
export async function loadSiwaTokens(tokensCssPath) {
  const css = await fs.readFile(tokensCssPath, 'utf8');
  const tokens = {};
  for (const m of css.matchAll(/^\s*(--[\w-]+):\s*([^;]+);/gm)) {
    tokens[m[1]] = m[2].trim().replace(/\s+/g, ' ');
  }
  return tokens;
}

/**
 * Decide, per property, whether Phlur's measured value can be expressed with a
 * Siwa token or requires an override. Returns the value to emit + a ledger entry.
 */
export function reconcile(measurements, tokens) {
  const overrides = [];
  const note = (component, property, phlur, siwa, rule, resolution) =>
    overrides.push({ component, property, phlur, siwa, siwaRule: rule, resolution });

  /* geometry: Phlur 0px == Siwa rounded-none. No conflict. */
  const compat = [];
  compat.push({ property: 'border-radius', phlur: '0px', siwa: 'var(--rounded-none)', status: 'COMPATIBLE' });
  compat.push({ property: 'box-shadow', phlur: 'none (except drawer scrim)', siwa: 'none except modal', status: 'COMPATIBLE' });

  /* palette: Phlur greys are achromatic; Siwa neutrals are warm. */
  note('global', 'background', '#fafafa (achromatic, s=0)',
    `${tokens['--colors-background']} (warm, s≈30)`, 'Foundation: warm family only',
    'EMIT PHLUR — user chose Phlur fidelity. Warm equivalent kept in a swap layer.');
  note('global', 'surface', '#f5f5f5 (achromatic)', tokens['--colors-surface'],
    'Foundation: warm family only', 'EMIT PHLUR');
  note('global', 'text', '#000000', tokens['--colors-text'],
    'Foundation: --colors-text is #1b2724', 'EMIT PHLUR');

  /* spacing base */
  note('global', 'spacing base unit', '5px / 10px grid', '4px grid',
    'Foundation: 4px base, no arbitrary values',
    'EMIT PHLUR — 5px scale added as --phlur-space-* alongside Siwa --spacing-*');

  /* type */
  note('global', 'font-family (display)', 'aktiv-grotesk-extended (licensed)',
    tokens['--font-display-latin'], 'Principle 4: the serif speaks',
    'SUBSTITUTE — cannot redistribute a licensed webfont. Inter w600 + 0.64px tracking ' +
    'uppercase is the closest metric match already licensed to you.');
  note('global', 'font-family (body)', 'ABCRepro-Regular (licensed)',
    tokens['--font-ui-latin'], 'Foundation: Latin UI = Inter',
    'SUBSTITUTE — Inter. Same reason.');

  /* CTA density */
  if (measurements.hero?.ctaCount > 1) {
    note('hero-section', 'CTA count per fold', `${measurements.hero.ctaCount}`, '1 gold CTA per fold',
      'Principle 1: one offering per fold', 'EMIT PHLUR');
  }

  /* RTL */
  note('global', 'direction', 'LTR only, physical properties', 'logical properties throughout',
    'Rule 2: physical direction properties are a build error',
    'SIWA WINS — I emit logical properties regardless. This is free: it costs nothing ' +
    'visually in LTR and is the only way the sections work in Arabic.');

  return { overrides, compat };
}
