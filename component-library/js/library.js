/* ============================================================
   SIWA COMPONENT LIBRARY
   Tokens: Planning/DesignSystem.md · Data: product-data/product-data.json
   Patterns: 13-INSPIRATION-DIRECTION (Amouage/Widian/Kahina/Fueguia/Snif)
             14-TACTICAL-REFERENCES (Oakcha/Skylar — mechanics only)
   ============================================================ */
(() => {
  'use strict';

  // Image base — pages outside component-library/ set window.SIWA_IMG_BASE before load.
  const IMG = window.SIWA_IMG_BASE || 'img/';

  /* Second product image, for the card's hover swap. A merchant setting in
     Shopify (the theme reads product.images[1]); here it is a config map a
     page overrides with window.SIWA_IMG_ALT before load, exactly as it does
     with SIWA_IMG_BASE. Only 2 of 56 products carry a second frame —
     a photography brief, not a code fix (feature-doc B-06). Source of the
     two that do: ../instagram-assets/. */
  const IMG_ALT = window.SIWA_IMG_ALT || { 'mawj': 'mawj-2.jpg', 'coco-woods': 'coco-woods-2.jpg' };

  const P = window.SIWA_PRODUCTS || [];
  const byHandle = h => P.find(p => p.handle === h) || P[0];
  const withImg = P.filter(p => p.img);
  const inspired = P.filter(p => p.kind === 'inspired_by' && p.house);
  const originals = P.filter(p => p.kind === 'siwa_owned');
  const withNotes = P.filter(p => Object.keys(p.notes || {}).length);
  const layering = P.filter(p => /^layering/i.test(p.title));

  /* ---------- locale ---------- */
  let LOCALE = 'en';
  const AR_DIGITS = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
  const T = {
    en: { add:'Add to bag', adding:'Adding…', added:'Added', failed:'Try again', soldOut:'Sold out',
          buy:'Buy now', notify:'Notify me', from:'From', bag:'Your bag', checkout:'Checkout', subtotal:'Subtotal',
          empty:'Your bag is empty', reviews:'reviews', size:'Size', inspiredBy:'Inspired by',
          retail:'Original retail', story:'The story', persona:'Persona', top:'Top notes',
          heart:'Heart notes', base:'Base notes', shopAll:'Shop all', wishlist:'Wishlist',
          freeShip:'away from free shipping', freeShipOK:'You have free shipping' },
    ar: { add:'أضف إلى الحقيبة', adding:'جارٍ الإضافة…', added:'تمت الإضافة', failed:'حاول مرة أخرى',
          soldOut:'نفدت الكمية', buy:'اشترِ الآن', notify:'أعلمني', from:'من', bag:'حقيبتك', checkout:'إتمام الشراء',
          subtotal:'المجموع', empty:'حقيبتك فارغة', reviews:'تقييم', size:'الحجم',
          inspiredBy:'مستوحى من', retail:'سعر الأصلي', story:'القصة', persona:'الشخصية',
          top:'النوتات العليا', heart:'نوتات القلب', base:'النوتات الأساسية', shopAll:'تسوق الكل',
          wishlist:'المفضلة', freeShip:'يفصلك عن الشحن المجاني', freeShipOK:'لديك شحن مجاني' }
  };
  /* Falls back rather than throwing: pages share one locale key in
     localStorage and a page that hands over an unknown value must not take
     the whole library down with it. */
  const t = k => (T[LOCALE] || T.en)[k] || k;
  /* Arabic-Indic numerals, including the group and decimal marks — ٤٫٩٩,
     not ٤.٩٩. Anything else leaves a Latin punctuation mark inside an
     Arabic number. */
  const digits = s => LOCALE === 'ar'
    ? String(s).replace(/,/g, '٬').replace(/\./g, '٫').replace(/\d/g, d => AR_DIGITS[+d])
    : String(s);
  const money = n => {
    const v = digits(Math.round(n).toLocaleString(LOCALE === 'ar' ? 'en-US' : 'en-US'));
    return LOCALE === 'ar' ? `${v} ج.م` : `LE ${v}`;
  };
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  /* ---------- svg ---------- */
  const ICON = {
    star: '<path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4 6.2 20.5l1.1-6.5L2.6 9.4l6.5-.9z"/>',
    bottle: '<path d="M9 2h6v3.5l1.6 2.2c.6.8.9 1.7.9 2.7V21a1 1 0 0 1-1 1H7.5a1 1 0 0 1-1-1V10.4c0-1 .3-1.9.9-2.7L9 5.5z" fill="none" stroke="currentColor" stroke-width="1.2"/>',
    zoom: '<circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M20 20l-3.5-3.5M11 8v6M8 11h6" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/>',
    search: '<circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M20 20l-3.6-3.6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    bag: '<path d="M6 8h12l-1 12H7L6 8z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 8V6a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" stroke-width="1.5"/>',
    heart: '<path d="M12 20s-7-4.6-7-9.3A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.7C19 15.4 12 20 12 20z"/>',
    bell: '<path d="M12 3a6 6 0 0 0-6 6c0 4-1.5 5.5-2 6h16c-.5-.5-2-2-2-6a6 6 0 0 0-6-6z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M10 19a2 2 0 0 0 4 0" fill="none" stroke="currentColor" stroke-width="1.4"/>',
    close: '<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    burger: '<path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    play: '<path d="M9 7.5v9l7.5-4.5z"/>', check: '<path d="M4 12.5l5 5L20 6.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    leaf: '<path d="M20 4C10 4 4 9 4 16c0 2 .6 3.4.6 3.4S8 12 18 9c0 0-6 3.4-8.6 10.6C14 21 20 17 20 4z"/>',
    drop: '<path d="M12 3s6 6.7 6 10.6A6 6 0 0 1 6 13.6C6 9.7 12 3 12 3z"/>',
    wood: '<path d="M4 6h16v3H4zM4 11h16v3H4zM4 16h16v3H4z" opacity=".9"/>'
  };
  const svg = (name, cls, box = 24) =>
    `<svg viewBox="0 0 ${box} ${box}" class="${cls || ''}" aria-hidden="true" focusable="false">${ICON[name]}</svg>`;

  /* ============================ PRIMITIVES ============================ */

  /* The rating line is two groups, not one run of inline items: the score
     sits at the start and the review count at the end, so `.rating-line--split`
     can push them apart on the product card. 4.98★ from 1,212 reviews is the
     store's strongest asset — DIRECTION.md Part 1 §2.1 keeps it loud. */
  function Stars(rating, opts = {}) {
    const { size = '', showCount = false, count = 0, cls = '', countLabel } = opts;
    let s = `<span class="stars ${size}" role="img" aria-label="${digits(rating)} out of 5">`;
    for (let i = 1; i <= 5; i++) {
      const full = rating >= i - 0.25;
      s += `<svg viewBox="0 0 24 24" class="${full ? 'star-full' : 'star-empty'}" aria-hidden="true">${ICON.star}</svg>`;
    }
    s += '</span>';
    if (!showCount) return s;
    return `<span class="rating-line ${cls}"><span class="rating-line__score">${s}<b>${digits(rating.toFixed(2))}</b></span>` +
           `<span class="count">(${digits(count)} ${esc(countLabel || t('reviews'))})</span></span>`;
  }

  function StarsInput(id) {
    let s = `<span class="stars stars--lg stars--input" data-starinput="${id}" role="radiogroup" aria-label="Rate this product">`;
    for (let i = 1; i <= 5; i++)
      s += `<button type="button" role="radio" aria-checked="false" aria-label="${i} star${i > 1 ? 's' : ''}" data-v="${i}">
        <svg viewBox="0 0 24 24" class="star-empty" aria-hidden="true">${ICON.star}</svg></button>`;
    return s + '</span>';
  }

  const Badge = (text, variant) => `<span class="badge badge--${variant}">${esc(text)}</span>`;

  /* ============================ PRODUCT ============================ */

  /* `labels` lets a page whose copy lives in its own config layer supply the
     strings rather than inherit the library's — the config file stays the
     single owner of every word on that page (Law 1). */
  function Price(p, o = {}) {
    if (p.min !== p.max)
      return `<span class="price"><span class="from">${esc(o.from || t('from'))}</span>${money(p.min)}</span>`;
    const was = p.onSale ? `<span class="was">${money(p.max * 1.22)}</span>` : '';
    return `<span class="price">${money(p.min)}${was}</span>`;
  }

  /**
   * Product media block.
   *   hover  {Boolean} second image, crossfaded on hover where one exists.
   *                    Matches the live store's own behaviour — a pointer-fine
   *                    crossfade, not a swap (02-DESIGN-SYSTEM §"Hover").
   *   badges {Boolean|String} true = derive from stock/sale/register;
   *                    a string is used verbatim, so a page can pass its own.
   *   wish   {Boolean} save-to-wishlist control (C-05)
   *   wished {Boolean} its pressed state
   *   extra  {String}  additional overlay markup (page-level affordances)
   *   images {Array}   [primary, secondary] resolved URLs, for pages whose
   *                    art direction lives outside the catalogue. Bypasses
   *                    SIWA_IMG_BASE and the hover map entirely.
   *   alt    {String}  overrides the derived alt text
   */
  function ProductImage(p, opts = {}) {
    const { zoom = true, badges = true, wish = false, wished = false, hover = false,
            extra = '', href = '', images = null, linkAttrs = '' } = opts;
    const alt = esc(opts.alt !== undefined ? opts.alt : (LOCALE === 'ar'
      ? `${p.title} — سيوة للعطور، إكستريه دو بارفان`
      : `${p.title} — Siwa Fragrances extrait de parfum`));
    const srcA = images ? images[0] : (p.img ? IMG + p.img : null);
    const srcB = images ? images[1]
      : (hover && p.img && IMG_ALT[p.handle] ? IMG + IMG_ALT[p.handle] : null);
    const alt2 = srcB || null;
    let media = srcA
      ? `<img class="pimg__img pimg__img--a" src="${esc(srcA)}" alt="${alt}" loading="lazy" width="800" height="1000">`
        + (srcB ? `<img class="pimg__img pimg__img--b" src="${esc(srcB)}" alt="" aria-hidden="true" loading="lazy" width="800" height="1000">` : '')
      : `<div class="pimg__ph">${svg('bottle')}</div>`;
    /* The image links to the product, but the title link beside it already
       carries that destination — so this one is hidden from assistive tech
       and out of the tab order rather than repeating it. Badges and the
       wishlist control stay OUTSIDE it: they are not part of the link, and
       a button inside an anchor is invalid. */
    if (href) media = `<a class="pimg__link" href="${href}"${linkAttrs ? ' ' + linkAttrs : ''} tabindex="-1" aria-hidden="true">${media}</a>`;
    let b = '';
    if (typeof badges === 'string') {
      b = badges ? `<div class="pimg__badges">${badges}</div>` : '';
    } else if (badges) {
      const arr = [];
      if (p.soldOut) arr.push(Badge(t('soldOut'), 'soldout'));
      if (p.onSale) arr.push(Badge(LOCALE === 'ar' ? 'تخفيض' : 'Sale', 'sale'));
      if (p.kind === 'siwa_owned' && /mawj|marasi/i.test(p.title)) arr.push(Badge(LOCALE === 'ar' ? 'أصيل' : 'Siwan', 'authentic'));
      if (arr.length) b = `<div class="pimg__badges">${arr.join('')}</div>`;
    }
    const w = wish
      ? `<button class="wish" type="button" aria-pressed="${wished}" aria-label="${esc(opts.wishLabel || (LOCALE === 'ar' ? 'حفظ' : 'Save'))}: ${esc(p.title)}" data-wish="${p.handle}">${svg('heart')}</button>`
      : '';
    const z = zoom && srcA ? `<button class="pimg__zoombtn" aria-label="Zoom image" data-lightbox="${esc(srcA)}">${svg('zoom')}</button>` : '';
    return `<div class="pimg ${zoom ? 'pimg--zoom' : ''} ${alt2 ? 'pimg--swap' : ''}">${media}${b}${w}${z}${extra}</div>`;
  }

  /**
   * THE UNIFIED PRODUCT CARD — client spec, 2026-08-13.
   *
   *   badges · two images (hover swap)
   *   ├ title
   *   ├ sub          "Inspired by X" / "Siwa original creation"
   *   ├ notes
   *   ├ rating-line  flex: [stars + score] ......... [(n reviews)]
   *   └ foot         flex: [price] ................. [CTA]
   *
   * It is the ONLY product card in the project. Every page composes this —
   * the five layout styles (editorial/compact/hero/vintage) are CSS skins
   * over this one structure, passed as `modifier`, never a second card.
   *
   * Everything a merchant could want to change is an option, defaulted from
   * the catalogue rather than written into the markup (Law 1). Options:
   *   modifier {String}  pcard--editorial | --compact | --hero | --vintage
   *   href     {String}  product URL
   *   heading  {String}  h2 | h3 — keeps the page outline sane
   *   cta      {String}  add | buy | notify | none. Default: stock-resolved.
   *   ctaLabel {String}  overrides the locale string
   *   ctaBlock {Boolean} full-width CTA under the foot's own row
   *   ctaIcon  {String}  icon name to lead the CTA with
   *   sub / notes        {String} override the derived lines
   *   subHtml / notesHtml{String} pre-built markup for either line
   *   reserveNotes {Boolean} hold the notes slot when a product has none, so
   *                     rows still align across a rail (24 of 56 have none)
   *   badges   {Boolean|String}  see ProductImage
   *   wish, wished, hover, zoom, mediaExtra  see ProductImage
   *   priceHtml  {String} the price markup, for a page that formats money
   *                     its own way (currency word, numeral system)
   *   priceExtra {String} markup after the price (e.g. retail contrast)
   *   labels   {Object}  {from, reviews, new} — strings the card renders for
   *                     itself, when the page's config layer owns its copy
   *   linkAttrs {String} extra attributes for the product links, so a page
   *                     can hook them (e.g. data-open-product)
   *   section, index, reveal, attrs  page-level hooks
   */
  function ProductCard(p, opts = {}) {
    const {
      modifier = '', href = '#ProductCard', heading = 'h3',
      hover = true, zoom = false, badges = true, wish = false, wished = false,
      reserveNotes = false, cta, ctaLabel, ctaBlock = false, ctaIcon = null,
      priceExtra = '', mediaExtra = '', bodyExtra = '', before = '', titleAr = '',
      section = '', index = null, reveal = false, attrs = '', labels = {}, linkAttrs = ''
    } = opts;

    /* "Inspired by" frames the claim; the house IS the claim, so it gets
       its own element and carries the weight (.pcard__house). Nothing
       here becomes content: the phrase is still the translated string and
       the house is still the product record — only the <span> is new, and
       a span is structural. A caller passing `sub` as plain text is
       unaffected and still escaped whole, because only this default path
       knows which half of the line is the house. */
    const subInner = opts.sub !== undefined ? esc(opts.sub)
      : (p.kind === 'inspired_by' && p.house
          ? `${esc(t('inspiredBy'))} <span class="pcard__house">${esc(p.house)}</span>`
          : esc(LOCALE === 'ar' ? 'إبداع سيوة الأصلي' : 'Siwa original creation'));
    const sub = opts.subHtml !== undefined ? opts.subHtml
      : `<p class="pcard__sub">${subInner}</p>`;

    const notesText = opts.notes !== undefined ? opts.notes
      : (p.accords || (p.notes && p.notes.top ? `${p.notes.top} · ${p.notes.heart || ''}`.replace(/ · $/, '') : ''));
    const notes = opts.notesHtml !== undefined ? opts.notesHtml
      : notesText ? `<p class="pcard__notes">${esc(notesText)}</p>`
      : reserveNotes ? '<p class="pcard__notes pcard__notes--empty" aria-hidden="true">&nbsp;</p>' : '';

    /* CTA. Sold out never dead-ends — it collects the back-in-stock
       signal instead (D-04). A caller may force any of the three. */
    const kind = cta || (p.soldOut ? 'notify' : 'add');
    const label = ctaLabel !== undefined ? ctaLabel
      : kind === 'notify' ? t('notify') : kind === 'buy' ? t('buy') : t('add');
    const icon = ctaIcon ? svg(ctaIcon) : '';
    const block = ctaBlock ? ' btn--block pcard__cta--block' : '';
    const action = kind === 'none' ? ''
      : kind === 'notify'
        ? `<button type="button" class="btn btn--secondary btn--sm pcard__cta${block}" data-notify="${esc(p.handle)}">${icon}${esc(label)}</button>`
      : kind === 'buy'
        ? `<button type="button" class="btn btn--sm pcard__cta${block}" data-buy="${esc(p.handle)}">${icon}${esc(label)}</button>`
        : `<button type="button" class="btn btn--sm atc pcard__cta${block}" data-atc="${esc(p.handle)}" data-add="${esc(p.handle)}" data-from="${esc(section)}">${icon}${esc(label)}</button>`;

    const media = ProductImage(p, {
      zoom, wish, wished, hover, badges, extra: mediaExtra, href,
      images: opts.images, alt: opts.alt, wishLabel: opts.wishLabel, linkAttrs
    });

    return `<article class="pcard ${modifier} ${p.soldOut ? 'pcard--soldout' : ''}"
      data-handle="${esc(p.handle)}"${section ? ` data-section="${esc(section)}"` : ''}${index !== null ? ` data-index="${index}"` : ''}${reveal ? ' data-reveal' : ''}${attrs ? ' ' + attrs : ''}>
      ${before}${media}
      <div class="pcard__body">
        <${heading} class="pcard__title"><a href="${href}"${linkAttrs ? ' ' + linkAttrs : ''}>${esc(p.title)}</a>${titleAr
          ? `<span class="pcard__title-ar" lang="ar" dir="rtl">${esc(titleAr)}</span>` : ''}</${heading}>
        ${sub}
        ${notes}
        ${bodyExtra}
      </div>
      ${p.reviews
        ? Stars(p.rating, { showCount: true, count: p.reviews, countLabel: labels.reviews,
                            cls: 'rating-line--split pcard__rating' })
        : `<span class="rating-line pcard__rating count">${esc(labels.new || (LOCALE === 'ar' ? 'جديد' : 'New'))}</span>`}
      <div class="pcard__foot">${opts.priceHtml !== undefined ? opts.priceHtml : Price(p, { from: labels.from })}${priceExtra}${action}</div>
    </article>`;
  }

  const ProductGrid = (list, opts) => `<div class="pgrid">${list.map(p => ProductCard(p, opts)).join('')}</div>`;

  const SkeletonCard = () => `<article class="pcard" aria-hidden="true">
    <div class="skeleton" style="aspect-ratio:4/5"></div>
    <div class="skeleton" style="height:12px;width:55%"></div>
    <div class="skeleton" style="height:16px;width:80%"></div>
    <div class="skeleton" style="height:12px;width:40%"></div>
    <div class="pcard__foot"><div class="skeleton" style="height:16px;width:70px"></div><div class="skeleton" style="height:32px;width:96px"></div></div>
  </article>`;

  function VariantSelector(p, name) {
    return `<fieldset style="border:0;padding:0;margin:0">
      <legend class="lbl" style="margin-bottom:8px">${t('size')}</legend>
      <div class="variants">${p.variants.map((v, i) => `
        <label class="variant">
          <input type="radio" name="${name}" value="${esc(v.t)}" ${i === 0 && v.a ? 'checked' : ''} ${v.a ? '' : 'disabled'}>
          <span>${digits(v.t.replace(/\s*ml/i, ''))} ml <em class="v-price" style="font-style:normal">${money(v.p)}</em></span>
        </label>`).join('')}</div>
    </fieldset>`;
  }

  function NotePyramid(p) {
    const tiers = [
      { k: 'top', icon: 'leaf', label: t('top') },
      { k: 'heart', icon: 'drop', label: t('heart') },
      { k: 'base', icon: 'wood', label: t('base') }
    ].filter(x => p.notes[x.k]);
    if (!tiers.length) return `<p class="pcard__sub">No structured notes — 38 of 56 products are in this state (03-DATA-SCHEMA §3).</p>`;
    return `<div class="pyramid">${tiers.map((x, i) => `
      <div class="pyramid__tier">
        <div class="pyramid__dot" style="color:var(--primary)">${svg(x.icon)}</div>
        <div><p class="pyramid__label">${x.label}</p><p class="pyramid__val">${esc(p.notes[x.k])}</p></div>
      </div>${i < tiers.length - 1 ? '<div class="pyramid__rule"></div>' : ''}`).join('')}</div>`;
  }

  function IntensityScale(level = 2) {
    const labels = LOCALE === 'ar' ? ['خفيف', 'واضح', 'قوي'] : ['Subtle', 'Distinct', 'Powerful'];
    return `<div class="scale">
      <p class="lbl">${LOCALE === 'ar' ? 'قوة الانتشار' : 'Sillage'}</p>
      <div class="scale__track" role="img" aria-label="${LOCALE === 'ar' ? `قوة الانتشار: ${labels[level - 1]} — ${digits(level)} من ${digits(3)}` : `Sillage: ${labels[level - 1]} — ${level} of 3`}">
        ${[1, 2, 3].map(i => `<i class="scale__step ${i <= level ? 'on' : ''}"></i>`).join('')}
      </div>
      <div class="scale__labels">${labels.map((l, i) => `<span class="${i + 1 === level ? 'on' : ''}">${l}</span>`).join('')}</div>
    </div>`;
  }

  function InspiredByBlock(p) {
    if (!p.house) return '';
    return `<div class="inspired">
      <span class="inspired__label">${t('inspiredBy')}</span>
      <span class="inspired__house">${esc(p.house)} — ${esc(p.original)}</span>
      <span class="inspired__retail">· ${t('retail')} ≈ ${money(p.originalPrice)}</span>
      <span class="inspired__note">${LOCALE === 'ar'
        ? 'تفسير مستقل من سيوة. غير تابع لدار العطور المذكورة.'
        : 'An independent Siwa interpretation. Not the original, and not affiliated with the house named.'}</span>
    </div>`;
  }

  const ProductStoryBlock = p => `<div class="story vintage-surface"><span class="edge-wear"></span>
    <p class="story__eyebrow">${t('story')}</p>
    <p class="story__quote">${LOCALE === 'ar' ? 'ليست كل الأمواج تُطارَد. بعضها يُرتدى.' : 'Not all waves are meant to be chased. Some are meant to be worn.'}</p>
    <p style="color:var(--text-secondary-aa);margin-bottom:12px">${esc(p.body)}</p>
    <span class="stamp">${LOCALE === 'ar' ? 'قُطِّر في سيوة' : 'Distilled in Siwa'} · ${digits('2026')}</span></div>`;

  const PersonaBlock = () => `<div class="persona vintage-surface"><span class="edge-wear"></span>
    <p class="story__eyebrow">${t('persona')}</p>
    <h4 class="persona__name">${LOCALE === 'ar' ? 'الرحّالة' : 'The Nomad'}</h4>
    <p style="color:var(--text-secondary-aa)">${LOCALE === 'ar'
      ? 'يتحرك بخفة ووضوح. لا ينتظر أن يُلاحَظ.'
      : 'Moves with lightness and clarity. Does not wait to be noticed — decides when they are.'}</p></div>`;

  /* ============================ COMMERCE ============================ */

  const CART = [];
  function AddToCartButton(handle, cls = '') {
    return `<button class="btn atc ${cls}" data-atc="${handle}" data-state="idle">${t('add')}</button>`;
  }

  function cartHTML() {
    const sub = CART.reduce((s, l) => s + l.price * l.qty, 0);
    const THRESHOLD = 1500;
    const remain = Math.max(0, THRESHOLD - sub);
    const body = CART.length ? CART.map(l => {
      const p = byHandle(l.handle);
      return `<div class="line">
        <div class="line__img">${p.img ? `<img src="${IMG}${p.img}" alt="">` : ''}</div>
        <div><p class="line__t">${esc(p.title)}</p><p class="line__v">${digits(l.size)}</p>
          <div class="qty"><button data-q="-1" data-h="${l.handle}" aria-label="Decrease">−</button><span>${digits(l.qty)}</span><button data-q="1" data-h="${l.handle}" aria-label="Increase">+</button></div>
        </div>
        <div class="price">${money(l.price * l.qty)}</div></div>`;
    }).join('') : `<p class="pcard__sub">${t('empty')}</p>`;
    return { body, sub, remain, THRESHOLD };
  }

  function renderCart() {
    const { body, sub, remain, THRESHOLD } = cartHTML();
    const el = document.getElementById('cartBody');
    if (!el) return;
    el.innerHTML = body;
    document.getElementById('cartSub').textContent = money(sub);
    const pct = Math.min(100, (sub / THRESHOLD) * 100);
    document.getElementById('shipFill').style.width = pct + '%';
    document.getElementById('shipTxt').textContent = remain > 0 ? `${money(remain)} ${t('freeShip')}` : t('freeShipOK');
    document.querySelectorAll('[data-cartcount]').forEach(n => {
      const q = CART.reduce((s, l) => s + l.qty, 0);
      n.textContent = digits(q); n.style.display = q ? '' : 'none';
    });
  }

  function addToCart(handle) {
    const p = byHandle(handle);
    const v = p.variants.find(x => x.a) || p.variants[0];
    const line = CART.find(l => l.handle === handle);
    if (line) line.qty++;
    else CART.push({ handle, size: v.t, price: v.p, qty: 1 });
    renderCart();
  }

  const CartDrawer = () => `
    <div class="drawer-scrim" data-closecart></div>
    <aside class="drawer" id="cartDrawer" role="dialog" aria-modal="true" aria-labelledby="cartTitle" tabindex="-1">
      <div class="drawer__head">
        <h2 class="drawer__title" id="cartTitle">${t('bag')}</h2>
        <button class="iconbtn" data-closecart aria-label="Close bag">${svg('close')}</button>
      </div>
      <div class="drawer__body" id="cartBody"></div>
      <div class="drawer__foot">
        <div class="freeship"><span id="shipTxt"></span><div class="freeship__bar"><i class="freeship__fill" id="shipFill" style="width:0"></i></div></div>
        <div class="row" style="justify-content:space-between"><span class="lbl">${t('subtotal')}</span><b class="price" id="cartSub">${money(0)}</b></div>
        <button class="btn btn--block btn--lg">${t('checkout')}</button>
      </div>
    </aside>`;

  /* ============================ NAVIGATION ============================ */

  const NAV_EN = ['Shop all', 'Original Creations', 'For Him', 'For Her', 'Layering', 'The Oasis'];
  const NAV_AR = ['تسوق الكل', 'إبداعات سيوة', 'له', 'لها', 'الطبقات', 'الواحة'];

  const Header = () => `<header class="hdr">
    <div class="hdr__ann">${LOCALE === 'ar' ? 'اكتشف شخصيتك · شحن مجاني للطلبات فوق ١٥٠٠ ج.م' : 'Explore your Persona · Free shipping over LE 1,500'}</div>
    <div class="hdr__bar">
      <button class="iconbtn hdr__burger" aria-label="Open menu">${svg('burger')}</button>
      <a class="hdr__mark" href="#Header"><span>SIWA</span><span class="ar">سيوة</span></a>
      <nav class="hdr__nav" aria-label="Primary">
        ${(LOCALE === 'ar' ? NAV_AR : NAV_EN).map((n, i) => `<a href="#Header" ${i === 0 ? 'aria-current="page"' : ''}>${n}</a>`).join('')}
      </nav>
      <div class="hdr__tools">
        ${LanguageToggle()}
        <button class="iconbtn" aria-label="Search">${svg('search')}</button>
        <button class="iconbtn cartdot" data-opencart aria-label="Open bag">${svg('bag')}<span data-cartcount style="display:none">0</span></button>
      </div>
    </div></header>`;

  const Footer = () => {
    const cols = LOCALE === 'ar'
      ? [['تسوق', ['كل العطور', 'إبداعات سيوة', 'الطبقات', 'الهدايا']],
         ['الدار', ['الواحة', 'المكونات', 'الحرفة', 'الدار']],
         ['المساعدة', ['الشحن', 'الإرجاع', 'اتصل بنا', 'الأسئلة']],
         ['تابعنا', ['إنستجرام', 'تيك توك', 'فيسبوك', 'واتساب']]]
      : [['Shop', ['All fragrances', 'Original Creations', 'Layering', 'Gifting']],
         ['The House', ['The Oasis', 'The Ingredients', 'The Craft', 'The House']],
         ['Help', ['Shipping', 'Returns', 'Contact', 'FAQ']],
         ['Follow', ['Instagram', 'TikTok', 'Facebook', 'WhatsApp']]];
    return `<footer class="ftr"><div class="ftr__grid">
      ${cols.map(([h, items]) => `<div><h4>${h}</h4><ul>${items.map(i => `<li><a href="#Footer">${i}</a></li>`).join('')}</ul></div>`).join('')}
    </div><div class="ftr__base"><span>© ${digits('2026')} Siwa Fragrances · سيوة</span><span>${LOCALE === 'ar' ? 'صُنع في مصر' : 'Made in Egypt'}</span></div></footer>`;
  };

  const LanguageToggle = () => `<div class="langtog" role="group" aria-label="Language">
      <button data-loc="en" aria-pressed="${LOCALE === 'en'}">EN</button>
      <button data-loc="ar" aria-pressed="${LOCALE === 'ar'}" lang="ar">ع</button>
    </div>`;

  function FilterBar() {
    const axes = LOCALE === 'ar'
      ? [['النوع', ['أصلي', 'مستوحى']], ['العائلة', ['فانيليا', 'خشبي', 'زهري', 'حمضي', 'جورماند']],
         ['لمن', ['له', 'لها', 'للجنسين']], ['الحجم', ['٣٠', '٥٠', '١٠٠']]]
      : [['Line', [['Originals', originals.length], ['Inspired by', inspired.length]]],
         ['Family', [['Vanilla', 14], ['Woody', 9], ['Floral', 7], ['Citrus', 5], ['Gourmand', 11]]],
         ['House', [['Kayali', 5], ['Parfums de Marly', 3], ['Louis Vuitton', 4], ['Chanel', 2]]],
         ['For', [['Him', 28], ['Her', 25], ['Unisex', 4]]],
         ['Size', [['30 ml', 44], ['50 ml', 47], ['100 ml', 44]]],
         ['Sillage', [['Subtle', 8], ['Distinct', 26], ['Powerful', 22]]],
         ['Availability', [['In stock', 46], ['Sold out', 10]]],
         ['Price', [['Under 600', 12], ['600–1200', 28], ['1200+', 16]]]];
    return `<div class="filters">${axes.map(([legend, opts]) => `
      <div class="filters__row"><span class="filters__legend">${legend}</span>
        ${opts.map(o => {
          const [label, n] = Array.isArray(o) ? o : [o, null];
          return `<button class="chip" aria-pressed="false">${esc(label)}${n !== null ? ` <span class="n">${digits(n)}</span>` : ''}</button>`;
        }).join('')}
      </div>`).join('')}
      <div class="filters__row"><span class="filters__legend"></span>
        <button class="btn btn--tertiary btn--sm">${LOCALE === 'ar' ? 'مسح الكل' : 'Clear all'}</button></div>
    </div>`;
  }

  const Search = () => `<div class="search" style="max-width:520px">
      <label class="field"><span class="lbl">${LOCALE === 'ar' ? 'ابحث' : 'Predictive search'}</span>
        <input class="input" type="search" id="siwaSearch" placeholder="${LOCALE === 'ar' ? 'جرّب «موج»…' : 'Try “vanilla”, “Mawj”, “Kayali”…'}"
               role="combobox" aria-expanded="false" aria-controls="searchResults" aria-autocomplete="list" autocomplete="off">
      </label>
      <div class="search__results" id="searchResults" role="listbox" hidden></div>
    </div>`;

  /* ============================ SOCIAL PROOF ============================ */

  function ReviewSummary(p) {
    const dist = [Math.round(p.reviews * 0.94), Math.round(p.reviews * 0.05), Math.round(p.reviews * 0.01), 0, 0];
    return `<div class="rsummary">
      <div class="rsummary__top">
        <span class="rsummary__avg">${digits(p.rating.toFixed(2))}</span>
        ${Stars(p.rating, { size: 'stars--lg' })}
        <span class="pcard__sub">${digits(p.reviews)} ${t('reviews')}</span>
      </div>
      <div class="rbars">${dist.map((n, i) => {
        const stars = 5 - i, pct = p.reviews ? (n / p.reviews) * 100 : 0;
        return `<div class="rbar"><span>${digits(stars)} ★</span><span class="rbar__track"><i class="rbar__fill" style="width:${pct}%"></i></span><span>${digits(n)}</span></div>`;
      }).join('')}</div>
      <div class="callout"><b>Data note.</b> Siwa's real distribution is 804 of 820 at 5★ with none below 4★ under <code>autopublish:false</code> (06-REVIEWS §4). Histogram above is derived from that shape.</div>
    </div>`;
  }

  // Monogram: never mix scripts — an Arabic name gets Arabic initials, a Latin name Latin ones.
  const monogram = name => {
    const s = String(name).trim();
    const arabic = /[؀-ۿ]/.test(s[0] || '');
    const parts = s.split(/\s+/).filter(w => arabic ? /[؀-ۿ]/.test(w[0]) : /[A-Za-z]/.test(w[0]));
    if (!parts.length) return '·';
    const ini = parts.slice(0, 2).map(w => w[0]).join('');
    return arabic ? ini : ini.toUpperCase();
  };

  function ReviewCard(q, opts = {}) {
    const ar = /[؀-ۿ]/.test(q.b);
    const photos = opts.photos ? `<div class="rcard__photos">${withImg.slice(0, 2).map(p =>
      `<img src="${IMG}${p.img}" alt="Customer photo">`).join('')}</div>` : '';
    return `<article class="rcard">
      <div class="rcard__top">
        <span class="rcard__mono" aria-hidden="true">${esc(monogram(q.a))}</span>
        <span class="rcard__who">
          <span class="rcard__name">${esc(q.a)}</span>
          <span class="rcard__meta">${LOCALE === 'ar' ? 'شراء موثق' : 'Verified purchase'} · ${digits('50')} ml</span>
        </span>
        ${Stars(q.r)}
      </div>
      <p class="rcard__quote" ${ar ? 'lang="ar" dir="rtl"' : ''}>${esc(q.b)}</p>
      ${photos}
      <div class="rcard__foot">
        <button class="rcard__helpful">${LOCALE === 'ar' ? 'مفيد' : 'Helpful'} (${digits(opts.helpful ?? 4)})</button>
        <span class="rcard__meta">${digits(opts.day ?? 12)} ${LOCALE === 'ar' ? 'يوليو' : 'Jul'} ${digits('2026')}</span>
      </div>
    </article>`;
  }

  function ReviewList(p, opts = {}) {
    const qs = (p.quotes.length ? p.quotes : byHandle('mawj').quotes).slice(0, opts.limit || 4);
    if (opts.empty) return `<div class="rl__grid" style="grid-template-columns:1fr">
      <div class="rcard rcard--empty">${LOCALE === 'ar' ? 'لا توجد تقييمات بعد. كن أول من يكتب.' : 'No reviews yet. Be the first to write one.'}
      <div class="row" style="justify-content:center;margin-top:12px">${StarsInput('empty')}</div></div></div>`;
    const sorts = LOCALE === 'ar' ? ['الأحدث', 'الأعلى', 'مع صور'] : ['Recent', 'Top rated', 'With photos'];
    return `<div>
      <div class="rl__bar">
        <span class="rl__count">${digits(p.reviews)}<span>${LOCALE === 'ar' ? 'تقييم' : 'reviews'} · ${digits(p.rating.toFixed(2))}★</span></span>
        <div class="seg" role="group" aria-label="${LOCALE === 'ar' ? 'ترتيب' : 'Sort reviews'}">
          ${sorts.map((s, i) => `<button aria-pressed="${i === (opts.sort || 0)}">${s}</button>`).join('')}
        </div>
      </div>
      <div class="rl__grid">${qs.map((q, i) =>
        ReviewCard(q, { ...opts, helpful: [23, 11, 7, 4, 2, 1][i] ?? 1, day: [12, 9, 4, 2, 1, 1][i] ?? 1 })).join('')}</div>
      <div class="row" style="margin-top:16px;justify-content:center">
        <button class="btn btn--secondary">${LOCALE === 'ar' ? 'عرض المزيد' : 'Load 20 more'}</button></div>
    </div>`;
  }

  /* ============================ DISCOVERY ============================ */

  const QUIZ = [
    { q: { en: 'Where does this scent belong?', ar: 'أين ينتمي هذا العطر؟' },
      o: { en: ['A long evening', 'Daily wear', 'The heat of summer', 'Cold weather'], ar: ['أمسية طويلة', 'كل يوم', 'حرّ الصيف', 'الطقس البارد'] } },
    { q: { en: 'Which trail do you want to leave?', ar: 'أي أثر تريد أن تترك؟' },
      o: { en: ['Barely there', 'Noticed up close', 'Fills the room', 'Unmistakable'], ar: ['خفيف جداً', 'قريب', 'يملأ الغرفة', 'لا يُخطأ'] } },
    { q: { en: 'Pick the note you reach for.', ar: 'اختر النوتة التي تفضلها.' },
      o: { en: ['Vanilla & amber', 'Salt & citrus', 'Oud & wood', 'Rose & powder'], ar: ['فانيليا وعنبر', 'ملح وحمضيات', 'عود وخشب', 'ورد وبودرة'] } },
    { q: { en: 'Do you layer?', ar: 'هل تُطبّق الطبقات؟' },
      o: { en: ['Always — build me a pair', 'Sometimes', 'Never — one scent only'], ar: ['دائماً — اقترح لي ثنائياً', 'أحياناً', 'أبداً — عطر واحد'] } }
  ];
  let quizStep = 0;

  function ScentQuiz() {
    const s = QUIZ[quizStep];
    const pct = ((quizStep) / QUIZ.length) * 100;
    return `<div class="quiz" id="quizBox">
      <div class="quiz__prog"><i style="width:${pct}%"></i></div>
      <p class="quiz__step">${LOCALE === 'ar' ? 'سؤال' : 'Step'} ${digits(quizStep + 1)} / ${digits(QUIZ.length)}</p>
      <h3 class="quiz__q">${s.q[LOCALE]}</h3>
      <div class="quiz__opts">${s.o[LOCALE].map((o, i) => `
        <label class="qopt"><input type="radio" name="q${quizStep}" value="${i}"><span>${o}</span></label>`).join('')}</div>
      <div class="row">
        <button class="btn btn--secondary" data-quiz="back" ${quizStep === 0 ? 'disabled' : ''}>${LOCALE === 'ar' ? 'رجوع' : 'Back'}</button>
        <button class="btn" data-quiz="next">${quizStep === QUIZ.length - 1 ? (LOCALE === 'ar' ? 'أرني النتائج' : 'See my results') : (LOCALE === 'ar' ? 'التالي' : 'Next')}</button>
      </div>
      <p class="field__hint">${LOCALE === 'ar' ? 'مبني على بنية اختبار Skylar — يعيد عطراً أو ثنائي طبقات.' : 'Skylar architecture (doc 14 §4.2A) — returns a scent or a layering pair.'}</p>
    </div>`;
  }

  const QuizResults = () => {
    const pair = layering.slice(0, 2);
    return `<div class="col" style="gap:24px">
      ${PersonaBlock()}
      <div>
        <p class="lbl" style="margin-bottom:8px">${LOCALE === 'ar' ? 'ثنائي الطبقات المقترح' : 'Your suggested layering pair'}</p>
        <div class="pgrid" style="grid-template-columns:repeat(2,1fr);max-width:520px">${pair.map(p => ProductCard(p)).join('')}</div>
      </div>
      <div class="row"><button class="btn btn--lg">${LOCALE === 'ar' ? 'أضف الثنائي — وفّر ١٥٪' : 'Add the pair — save 15%'}</button>
      <button class="btn btn--tertiary" data-quiz="restart">${LOCALE === 'ar' ? 'إعادة الاختبار' : 'Retake quiz'}</button></div>
    </div>`;
  };

  function ComparisonTable(opts = {}) {
    const n = opts.cols || 3;
    // Prefer products that actually carry structured notes, so the notes rows
    // demonstrate the component rather than the 38/56 data gap.
    const pool = [...withNotes].sort((a, b) => (b.img ? 1 : 0) - (a.img ? 1 : 0) || b.reviews - a.reviews);
    const rows = pool.slice(0, n);
    // Only crown a winner when it is unique — a tie makes the callout meaningless.
    const uniqueBest = (vals, pick) => {
      const w = pick(vals);
      return vals.filter(v => v === w).length === 1 ? w : null;
    };
    const cheapest = uniqueBest(rows.map(p => p.min), a => Math.min(...a));
    const best = uniqueBest(rows.map(p => p.rating), a => Math.max(...a));
    const most = uniqueBest(rows.map(p => p.reviews), a => Math.max(...a));
    // Real note data is inconsistent — 12 products hold tier labels, others hold prose.
    const note = v => { const s = String(v || '—'); return s.length > 46 ? esc(s.slice(0, 44).trim()) + '…' : esc(s); };
    const F = [
      [LOCALE === 'ar' ? 'السعر' : 'Price', p => `<span class="price">${money(p.min)}</span>`,
        p => cheapest !== null && p.min === cheapest, LOCALE === 'ar' ? 'الأفضل سعراً' : 'Best value'],
      [LOCALE === 'ar' ? 'التقييم' : 'Rating', p => Stars(p.rating, { showCount: true, count: p.reviews }),
        p => best !== null && p.rating === best, LOCALE === 'ar' ? 'الأعلى' : 'Highest'],
      [LOCALE === 'ar' ? 'التقييمات' : 'Reviews', p => digits(p.reviews),
        p => most !== null && p.reviews === most, LOCALE === 'ar' ? 'الأكثر' : 'Most reviewed'],
      [t('top'), p => note(p.notes.top), () => false, ''],
      [t('heart'), p => note(p.notes.heart), () => false, ''],
      [t('base'), p => note(p.notes.base), () => false, ''],
      [LOCALE === 'ar' ? 'قوة الانتشار' : 'Sillage', (p, i) => [LOCALE === 'ar' ? 'واضح' : 'Distinct', LOCALE === 'ar' ? 'قوي' : 'Powerful', LOCALE === 'ar' ? 'خفيف' : 'Subtle'][i], () => false, ''],
      [LOCALE === 'ar' ? 'التوفر' : 'Stock', p => p.soldOut ? Badge(t('soldOut'), 'soldout') : Badge(LOCALE === 'ar' ? 'متوفر' : 'In stock', 'stock'), () => false, ''],
      ['', p => p.soldOut ? `<button class="btn btn--secondary btn--sm">${t('notify')}</button>` : `<button class="btn btn--sm atc" data-atc="${p.handle}">${t('add')}</button>`, () => false, '']
    ];
    return `<div class="cmp2"><table>
      <thead><tr><th></th>${rows.map(p => `<th scope="col"><span class="cmp2__ph">
        ${ProductImage(p, { zoom: false, badges: false })}<b>${esc(p.title)}</b>
        <span class="rcard__meta">${esc(p.house || (LOCALE === 'ar' ? 'أصلي' : 'Siwa original'))}</span></span></th>`).join('')}</tr></thead>
      <tbody>${F.map(([label, fn, isBest, bestLabel]) => `<tr>
        <th scope="row">${label}</th>
        ${rows.map((p, i) => {
          const win = isBest(p);
          return `<td class="${win ? 'best' : ''}" ${win ? `data-best="${bestLabel}"` : ''}>${fn(p, i)}</td>`;
        }).join('')}</tr>`).join('')}</tbody>
    </table></div>`;
  }

  /* ============================ CONTENT ============================ */

  const HeroSection = () => {
    const p = byHandle('mawj');
    return `<section class="hero">
      <div class="hero__media"><img src="${IMG}${p.img}" alt="Mawj on a salt ledge above the sea" loading="lazy"></div>
      <div class="hero__scrim" aria-hidden="true"></div>
      <div class="hero__body">
        <span class="stamp" style="color:var(--on-dark);border-color:rgba(212,207,194,.5)">${LOCALE === 'ar' ? 'الواحة' : 'The Oasis'}</span>
        <h2 class="hero__ttl">${LOCALE === 'ar' ? 'موج' : 'Mawj'}</h2>
        <p style="max-width:44ch;color:var(--on-dark)">${LOCALE === 'ar' ? 'ليست كل الأمواج تُطارَد. بعضها يُرتدى.' : 'Not all waves are meant to be chased. Some are meant to be worn.'}</p>
        <div class="row"><a class="btn btn--lg" href="#HeroSection">${LOCALE === 'ar' ? 'اكتشف' : 'Discover'}</a>
        <a class="btn btn--lg btn--secondary" style="--btn-fg:var(--on-dark);--btn-bd:rgba(212,207,194,.5)" href="#HeroSection">${t('shopAll')}</a></div>
      </div></section>`;
  };

  const ImageWithText = () => {
    const p = byHandle('coco-woods');
    return `<div class="iwt">
      <div>${ProductImage(p, { zoom: false, badges: false })}</div>
      <div class="col" style="gap:12px">
        <p class="story__eyebrow">${LOCALE === 'ar' ? 'الحرفة' : 'The Craft'}</p>
        <h3 style="font:400 var(--t-display-lg)/var(--lh-display-lg) var(--font-display);color:var(--heading)">${LOCALE === 'ar' ? 'من الواحة' : 'From the oasis'}</h3>
        <p style="color:var(--text-secondary-aa)">${LOCALE === 'ar'
          ? 'يبني أهل سيوة من الكرشيف — طين وملح من البحيرات. نفس المادة التي بُنيت منها قلعة شالي.'
          : 'Siwans build in kershef — clay and salt quarried from the lakes. The same material Shali Fortress is built from, insulating against 50 °C heat.'}</p>
        <div class="row"><a class="btn btn--secondary" href="#ImageWithText">${LOCALE === 'ar' ? 'اقرأ القصة' : 'Read the story'}</a></div>
      </div></div>`;
  };

  const CollectionGrid = () => {
    const tiles = LOCALE === 'ar'
      ? [['مجموعة الواحة', 'إبداعات سيوة الأصلية'], ['مجموعة الملح', 'عطور بحرية'], ['الطبقات', 'صُممت للمزج']]
      : [['The Oasis Collection', 'Siwa original creations'], ['The Salt Collection', 'Marine & mineral'], ['Layering', 'Built to be combined']];
    return `<div class="cgrid">${tiles.map(([h, s], i) => `
      <a class="ctile" href="#CollectionGrid">
        ${withImg[i] ? `<img src="${IMG}${withImg[i].img}" alt="" loading="lazy">` : ''}
        <div class="ctile__cap"><h4>${h}</h4><p>${s}</p></div></a>`).join('')}</div>`;
  };

  const FeaturedCollection = () => `<div class="col" style="gap:16px">
      <div class="row" style="justify-content:space-between">
        <h3 style="font:400 var(--t-display-lg)/var(--lh-display-lg) var(--font-display);color:var(--heading)">${LOCALE === 'ar' ? 'الأكثر مبيعاً' : 'Best sellers'}</h3>
        <a class="btn btn--tertiary" href="#FeaturedCollection">${t('shopAll')} →</a></div>
      ${ProductGrid(P.slice(0, 4))}</div>`;

  const VideoEmbed = () => `<div class="vembed">
      <img src="${IMG}tobacco-vanilla.jpg" alt="" loading="lazy">
      <button aria-label="Play product film">${svg('play')}</button>
    </div><p class="field__hint" style="margin-top:8px">Facade pattern — the iframe is only injected on click, so no third-party script loads on page view.</p>`;

  const LayeringSuggestions = () => {
    const base = byHandle('layering-vanilla');
    const partners = layering.filter(p => p.handle !== base.handle).slice(0, 3);
    return `<div class="col" style="gap:16px">
      <div class="callout"><b>${esc(base.title)}</b> is Siwa's #1 product by reviews (${digits(base.reviews)} @ ${digits(base.rating.toFixed(2))}★) and ships with no layering guidance today.</div>
      <p class="lbl">${LOCALE === 'ar' ? 'يُمزج جيداً مع' : 'Layers well with'}</p>
      <div class="pgrid" style="grid-template-columns:repeat(3,1fr)">${partners.map(p => ProductCard(p)).join('')}</div>
      <div class="row"><button class="btn btn--lg">${LOCALE === 'ar' ? 'أضف الثنائي' : 'Add both — save 15%'}</button></div></div>`;
  };

  function BundleBuilder() {
    const pool = P.filter(p => !p.soldOut).slice(0, 8);
    return `<div class="col" style="gap:16px" id="bundleBox">
      <div class="row" style="justify-content:space-between;align-items:flex-start">
        <div><p class="lbl">${LOCALE === 'ar' ? 'اختر ٣ بحجم ١٠ مل' : 'Pick any three 10 ml'}</p>
          <p class="pcard__sub" id="bundleCount">${digits(0)} / ${digits(3)}</p></div>
        <div class="bundle__slots" id="bundleSlots">
          ${[0, 1, 2].map(i => `<div class="bundle__slot" data-slot="${i}">${digits(i + 1)}</div>`).join('')}
        </div></div>
      <div class="pgrid">${pool.map(p => `
        <label class="pick">
          <input type="checkbox" data-bundle="${p.handle}">
          ${ProductCard(p)}
          <span class="pick__box">${svg('check', '', 24)}</span>
        </label>`).join('')}</div>
      <div class="row" style="justify-content:space-between">
        <span class="price" id="bundlePrice">${money(1150)}</span>
        <button class="btn btn--lg" id="bundleCta" disabled>${LOCALE === 'ar' ? 'أضف مجموعة الاكتشاف' : 'Add discovery set'}</button></div>
      <p class="field__hint">Snif pattern (doc 13 §2.5): 3 × 10 ml as one SKU. Siwa's entry is a 30 ml with no trial tier today.</p></div>`;
  }

  const Wishlist = () => `<div class="col" style="gap:12px">
      <p class="lbl">${t('wishlist')} · <span id="wishCount">${digits(0)}</span></p>
      ${ProductGrid(P.slice(4, 8), { wish: true })}
      <p class="field__hint">State persists to <code>localStorage</code>; hearts are <code>aria-pressed</code> toggles.</p></div>`;

  function GiftCard(o = {}) {
    const to = o.to || '', from = o.from || '', msg = o.msg || '';
    return `<div class="giftcard" id="giftPreview"><span class="giftcard__rule"></span>
      <div class="giftcard__head">
        <span class="giftcard__mark">SIWA<span class="ar" lang="ar" dir="rtl">سيوة</span></span>
        <span class="stamp">${LOCALE === 'ar' ? 'هدية' : 'A gift'}</span>
      </div>
      <div>
        <p class="giftcard__to">${LOCALE === 'ar' ? 'إلى' : 'To'}<b id="gpTo">${esc(to) || (LOCALE === 'ar' ? '—' : '—')}</b></p>
        <p class="giftcard__msg ${msg ? '' : 'placeholder'}" id="gpMsg">${esc(msg) ||
          (LOCALE === 'ar' ? 'ستظهر رسالتك هنا، مطبوعة على بطاقة مغلّفة داخل الصندوق.'
                           : 'Your message appears here, printed on a card enclosed in the box.')}</p>
      </div>
      <p class="giftcard__from">${LOCALE === 'ar' ? 'من' : 'From'}<b id="gpFrom">${esc(from) || '—'}</b></p>
    </div>`;
  }

  const GiftMessage = (o = {}) => `<div class="gift">
      <div class="gift__fields">
        <label class="gift__switch">
          <span><b>${LOCALE === 'ar' ? 'هذه هدية' : 'This is a gift'}</b>
          <small>${LOCALE === 'ar' ? 'بطاقة مطبوعة مجاناً، بدون أسعار في الصندوق' : 'Free printed card. No prices in the box.'}</small></span>
          <span class="switch"><input type="checkbox" id="giftOn" ${o.on ? 'checked' : ''}><i></i></span>
        </label>
        <div class="gift__fields" id="giftFields" ${o.on ? '' : 'hidden'}>
          <div class="gift__row">
            <div class="field"><label for="gTo">${LOCALE === 'ar' ? 'إلى' : 'To'}</label>
              <input class="input" id="gTo" value="${esc(o.to || '')}" placeholder="${LOCALE === 'ar' ? 'الاسم' : 'Recipient'}"></div>
            <div class="field"><label for="gFrom">${LOCALE === 'ar' ? 'من' : 'From'}</label>
              <input class="input" id="gFrom" value="${esc(o.from || '')}" placeholder="${LOCALE === 'ar' ? 'اسمك' : 'Your name'}"></div>
          </div>
          <div class="field"><label for="gMsg">${LOCALE === 'ar' ? 'الرسالة' : 'Message'}</label>
            <textarea class="textarea" id="gMsg" maxlength="200" aria-describedby="gCount"
              ${o.err ? 'aria-invalid="true"' : ''}>${esc(o.msg || '')}</textarea>
            <span class="meter ${o.err ? 'over' : ''}"><i id="gMeter" style="width:${((o.msg || '').length / 200) * 100}%"></i></span>
            ${o.err ? `<span class="field__err">${LOCALE === 'ar' ? 'تجاوزت الحد' : 'Message is over the 200-character limit'}</span>`
                    : `<span class="field__hint" id="gCount">${digits((o.msg || '').length)} / ${digits(200)}</span>`}
          </div>
        </div>
      </div>
      ${GiftCard(o)}
    </div>`;

  const ReferralWidget = () => `<div class="referral vintage-surface" style="max-width:520px"><span class="edge-wear"></span>
      <p class="story__eyebrow">${LOCALE === 'ar' ? 'ادعُ صديقاً' : 'Refer a friend'}</p>
      <p style="color:var(--text-secondary-aa)">${LOCALE === 'ar' ? 'امنح ١٠٠ ج.م، واحصل على ١٠٠ ج.م.' : 'Give LE 100, get LE 100.'}</p>
      <div class="referral__code"><input class="input" value="SIWA-MAWJ-2026" readonly aria-label="Your referral code">
        <button class="btn btn--secondary" data-copy="SIWA-MAWJ-2026">${LOCALE === 'ar' ? 'نسخ' : 'Copy'}</button></div></div>`;

  const CountdownTimer = () => `<div class="col" style="gap:8px">
      <p class="lbl">${LOCALE === 'ar' ? 'ينتهي العرض خلال' : 'Offer ends in'}</p>
      <div class="countdown" id="cd" role="timer" aria-live="off">
        ${['days', 'hrs', 'min', 'sec'].map(u => `<div class="cd__unit"><div class="cd__n" data-cd="${u}">${digits('00')}</div><div class="cd__l">${u}</div></div>`).join('')}
      </div>
      <p class="field__hint">Uses a fixed target date passed in — never <code>Date.now()</code> at render time in SSR.</p></div>`;

  /* ============================ REGISTRY ============================ */

  const R = [
    ['Button','Primitives','P0','Icon, typography tokens',4,'Used everywhere - build first', () => `
      <div class="col"><span class="lbl">Variants</span><div class="row">
        <button class="btn">Primary</button><button class="btn btn--secondary">Secondary</button>
        <button class="btn btn--tertiary">Tertiary</button><button class="btn btn--dark">Dark strip</button>
        <button class="btn btn--danger">Destructive</button></div></div>
      <div class="col"><span class="lbl">Sizes</span><div class="row">
        <button class="btn btn--sm">Small</button><button class="btn">Medium</button><button class="btn btn--lg">Large</button></div></div>
      <div class="col"><span class="lbl">States</span><div class="row">
        <button class="btn">Default</button><button class="btn" disabled>Disabled</button>
        <button class="btn" data-state="loading"><span class="spinner"></span> Loading</button>
        <button class="btn btn--block" style="max-width:280px">Full width</button></div></div>
      <div class="callout callout--warn"><b>Contrast correction.</b> The spec sets <code>button-primary</code> to white on <code>--primary</code> = <b class="fail">3.48:1</b>, below the 4.5:1 AA floor for 13px labels. This library ships <code>--on-primary: #212012</code> (ink on gold) = <b class="pass">4.72:1</b>.</div>`],

    ['Badge','Primitives','P0','Typography, color tokens',3,'Sale/sold-out/authentic variants', () => `
      <div class="row">${Badge('Sale','sale')}${Badge('Sold out','soldout')}${Badge('In stock','stock')}${Badge('New drop','new')}${Badge('Gourmand','tag')}${Badge('أصيل · Siwan','authentic')}</div>
      <div class="callout"><b>Cultural Accent boundary.</b> <code>badge--authentic</code> is the only badge drawing on the Cultural Accent Set (<code>--date-red</code>), and only for the ~2 SKUs with genuine Arabic naming. Everything else uses UI Chrome (DesignSystem §2).</div>`],

    ['StarRating','Primitives','P0','Icon',4,'Display + interactive modes', () => `
      <div class="col"><span class="lbl">Display</span>
        <div class="row">${Stars(4.98,{size:'stars--lg'})}${Stars(4.98,{showCount:true,count:1212})}${Stars(3)}</div></div>
      <div class="col"><span class="lbl">Interactive (write a review)</span>${StarsInput('demo')}</div>`],

    ['ProductCard','Product','P0','Button, Badge, StarRating, Image, PriceDisplay',16,'Most critical component', () => `
      <div class="pgrid" style="grid-template-columns:repeat(3,1fr)">
        ${ProductCard(byHandle('mawj'))}${ProductCard(byHandle('coco-woods'))}${ProductCard(byHandle('citrine'))}</div>
      <div class="callout">The one product card in the project — badges · two images (hover swap) · title · sub · notes · rating line (stars | reviews) · foot (price | CTA). Every page composes it; the five layout styles below are CSS skins over this same structure. Left to right: an Original with imagery, an inspired-by with imagery, and a fully sold-out SKU. 50 of 56 real products have exactly one image and <code>null</code> alt text (08-ASSETS) — the placeholder state is the common case, not the exception, and the hover swap exists on the 2 products that carry a second frame.</div>`],

    ['ProductGrid','Product','P0','ProductCard, Skeleton',8,'Responsive columns', () => `
      ${ProductGrid(P.slice(0,4))}
      <div class="col"><span class="lbl">Loading state</span>
        <div class="pgrid">${SkeletonCard()}${SkeletonCard()}${SkeletonCard()}${SkeletonCard()}</div></div>
      <div class="callout">4 / 3 / 2 / 1 columns at 1440 / 1200 / 768 / 480 per DesignSystem §5.</div>`],

    ['ProductImage','Product','P0','Image, Modal (lightbox)',12,'Zoom + gallery', () => {
      const p = byHandle('coco-woods');
      return `<div class="gallery" style="max-width:520px">
        <div class="gallery__thumbs">
          ${['coco-woods.jpg','coco-woods-2.jpg','mawj.jpg'].map((f,i)=>`
            <button class="gallery__thumb" aria-current="${i===0}" data-gal="${IMG}${f}"><img src="${IMG}${f}" alt="View ${i+1}"></button>`).join('')}
        </div>
        <div id="galMain">${ProductImage(p,{wish:true})}</div>
      </div>
      <div class="callout">Click the magnifier to open the lightbox — <code>Esc</code> closes, focus returns to the trigger.</div>`;
    }],

    ['VariantSelector','Product','P0','Radio, Badge',10,'Size selector with badges', () => {
      const p = byHandle('coco-woods');
      return `<div style="max-width:520px">${VariantSelector(p,'demoVar')}</div>
      <div class="callout"><b>Dirty data warning.</b> Real option names split <code>size</code> (44) / <code>Size</code> (9) plus one-offs including the typo <code>Layerng Pistachio</code>; values mix <code>50 ml</code> and <code>50ML</code> (00-OVERVIEW §4.2). This component normalises on render — the data still needs fixing upstream.</div>`;
    }],

    ['PriceDisplay','Product','P0','Typography, locale',6,'EN/AR number formatting', () => `
      <div class="row" style="gap:32px">
        <div class="col"><span class="lbl">Single price</span>${Price(byHandle('mawj'))}</div>
        <div class="col"><span class="lbl">Range</span>${Price(byHandle('coco-woods'))}</div>
        <div class="col"><span class="lbl">On sale</span>${Price(byHandle('belle-riche'))}</div></div>
      <div class="callout">Money format is <code>LE {amount}</code> in EN and <code>{٠١٢} ج.م</code> in AR with Arabic-Indic digits. Toggle the language in the top bar to see it switch. Price always uses <code>--ink</code>, never gold (DesignSystem §4).</div>`],

    ['AddToCartButton','Commerce','P0','Button, CartContext',8,'All states (loading/success/error)', () => `
      <div class="row">
        ${AddToCartButton('mawj')}
        <button class="btn atc" data-state="loading"><span class="spinner"></span> ${t('adding')}</button>
        <button class="btn atc" data-state="success">${svg('check')} ${t('added')}</button>
        <button class="btn atc" data-state="error">${t('failed')}</button>
        <button class="btn btn--secondary">${t('notify')}</button></div>
      <div class="callout">Click the live button — it runs idle → loading → success and pushes into the cart drawer. Sold-out SKUs swap to <b>Notify me</b>: 10 products are fully out and reviews contain <i>"always sold out"</i> (06-REVIEWS §6).</div>`],

    ['CartDrawer','Commerce','P0','Drawer, CartLineItem, Button',20,'Slide-out cart', () => `
      <div class="row"><button class="btn" data-opencart>Open the bag</button>
      <button class="btn btn--secondary" data-seed>Add 2 items first</button></div>
      <div class="callout">Focus is trapped while open, <code>Esc</code> closes, and the free-shipping meter tracks the real 1,500 EGP threshold from the announcement bar. In RTL the drawer flies in from the left.</div>`],

    ['Header','Navigation','P0','Link, Button, Search, locale toggle',24,'Primary nav + mobile', () => `
      <div class="demo--flush" style="border:1px solid var(--hairline);border-radius:var(--r-md);overflow:hidden">${Header()}</div>
      <div class="callout">Nav uses Amouage's dual track (doc 13 §2.1): commerce categories plus <b>The Oasis</b> as a separate story entry. The wordmark is bilingual — <code>SIWA سيوة</code> — because the bottles already are.</div>`],

    ['Footer','Navigation','P0','Link, locale',12,'4-column layout', () => `
      <div style="border-radius:var(--r-md);overflow:hidden">${Footer()}</div>
      <div class="callout">Column 2 uses Fueguia's four-pillar naming (doc 13 §2.4): The Oasis · The Ingredients · The Craft · The House.</div>`],

    ['NotePyramid','Product','P0','Typography, metafield data',10,'Visual notes display', () => `
      <div style="max-width:520px">${NotePyramid(byHandle('caramel-vanigliato'))}</div>
      <div class="callout">Modelled on Siwa's own <code>coco-woods</code> Instagram post — a finished notes diagram and the highest-engagement asset in the set. Only <b>18 of 56</b> products currently hold parseable notes across 13 different tier-label spellings (03-DATA-SCHEMA §3).</div>`],

    ['ReviewSummary','Social Proof','P0','StarRating, typography',8,'Aggregate rating', () => `
      <div style="max-width:560px">${ReviewSummary(byHandle('layering-vanilla'))}</div>`],

    ['ReviewList','Social Proof','P0','Review, Select (sort), Button',16,'Full review display', () => `
      <div style="max-width:640px">${ReviewList(byHandle('layering-vanilla'))}</div>
      <div class="callout">These are real captured reviews. Arabic bodies are detected and rendered <code>dir="rtl"</code> with the Arabic UI face at 1.7 leading, regardless of page locale.</div>`],

    ['FilterBar','Navigation','P1','Checkbox, Drawer (mobile), tags',20,'8 filter axes', () => `
      ${FilterBar()}
      <div class="callout"><b>House facet needs a data migration.</b> Oakcha's Brand facet lists 28 houses with counts (doc 14 §3.2). Siwa's <code>vendor</code> mixes house and fragrance in one string — <code>Bleu De Chanel L'exclusif</code> — so it must be split into house + fragrance first or the facet becomes ~40 single-item entries.</div>`],

    ['IntensityScale','Product','P1','Typography, metafield data',8,'Oakcha pattern', () => `
      <div class="row" style="gap:32px;align-items:flex-start">
        <div style="min-width:200px">${IntensityScale(1)}</div>
        <div style="min-width:200px">${IntensityScale(2)}</div>
        <div style="min-width:200px">${IntensityScale(3)}</div></div>
      <div class="callout">Oakcha's three-step Subtle / Distinct / Powerful. Siwa's descriptions mention longevity on 2 of 56 products — this is new metafield data, not something to parse out of <code>body_html</code>.</div>`],

    ['LayeringSuggestions','Product','P1','ProductCard, Button, bundling logic',12,'Cross-sell Layering line', LayeringSuggestions],

    ['InspiredByBlock','Product','P1','PriceDisplay, metafield data, Badge',10,'Price-contrast merchandising', () => `
      <div class="col" style="max-width:640px">
        ${InspiredByBlock(byHandle('layering-vanilla'))}
        ${InspiredByBlock(byHandle('lady-killer'))}</div>
      <div class="callout callout--warn"><b>Two blockers before this ships.</b> (1) The retail figures here are <b>illustrative placeholders</b> — doc 14 §3.2 requires sourced, dated prices. (2) Making the dupe claim louder is a legal-posture decision, not a UX one; the block works without the retail line. Renders on the 40 inspired-by SKUs only — <b>never</b> on the 16 Originals.</div>`],

    ['BundleBuilder','Commerce','P1','ProductCard, Checkbox, state management',24,'Pick-3 discovery set', BundleBuilder],

    ['ScentQuiz','Discovery','P1','Radio, Button, progress, routing',32,'Multi-step quiz', () => `
      <div style="max-width:640px">${ScentQuiz()}</div>
      <div class="callout">"Explore your Persona" is already the most-repeated line on the live site and points at nothing (07-COPY-CONTENT §12.1). The final question routes to a layering pair — Skylar's distinguishing output.</div>`],

    ['QuizResults','Discovery','P1','ProductGrid, PersonaCard, Button',16,'Quiz → products', QuizResults],

    ['ProductStoryBlock','Product','P1','Typography, locale, metafield data',10,'Story before notes', () => `
      <div style="max-width:640px">${ProductStoryBlock(byHandle('mawj'))}</div>
      <div class="callout">D.S. & Durga's ordering — story above notes. Rendered on a <code>vintage-surface</code>: paper grain at 4%, corner vignette at 12%, edge-wear rule. Body copy stays at AA contrast, so it uses the darkened <code>--text-secondary-aa</code>, not raw Zinc Blend (2.35:1).</div>`],

    ['PersonaBlock','Product','P1','Typography, metafield data',8,'Quiz personality on PDP', () => `
      <div style="max-width:520px">${PersonaBlock()}</div>
      <div class="callout">Archetype naming follows Okhtein's model — Goddess · Poet · Muse · Heir · Nomad (doc 11 §3). Skylar's "Core Scents" tier structure is taken; its wording is not.</div>`],

    ['Search','Navigation','P1','Input, Modal, autocomplete API',24,'Predictive search', () => `
      ${Search()}
      <div class="callout">Live over all 56 products — matches title, house and notes. Full <code>combobox</code> semantics: ↑/↓ to move, Enter to select, Esc to dismiss.</div>`],

    ['Wishlist','Commerce','P1','ProductGrid, state, localStorage',16,'Saved products', Wishlist],

    ['LanguageToggle','Navigation','P2','Button, LocaleContext',6,'EN ⇄ AR', () => `
      <div class="row">${LanguageToggle()}</div>
      <div class="callout"><b>This is the one that changes everything else.</b> It flips <code>dir</code>, swaps to Aref Ruqaa + IBM Plex Sans Arabic, loosens body leading to 1.7, mirrors the grid and drawer, and switches numerals to Arabic-Indic. Every component on this page re-renders. The bottles are already bilingual (<code>SIWA FRAGRANCES / موج / EXTRAIT DE PARFUM</code>) — the website is the only place Arabic was dropped.</div>`],

    ['ImageWithText','Content','P2','Image, Button, Typography',10,'Story sections', ImageWithText],
    ['CollectionGrid','Content','P2','Image, Link, Grid',12,'Narrative collections', () => `
      ${CollectionGrid()}
      <div class="callout">Amouage's narrative collection naming (doc 13 §2.1) replacing <code>perfumes</code> / <code>new-drops</code>.</div>`],
    ['HeroSection','Content','P2','Typography, Image, Button, locale',14,'Homepage hero', () => `
      ${HeroSection()}
      <div class="callout">The scrim direction flips in RTL so the text always sits on the dark side. Real campaign photography from the brand's own Instagram — the asset set the live site never uses.</div>`],
    ['FeaturedCollection','Content','P2','ProductGrid, Button',10,'Collection showcase', FeaturedCollection],

    ['ReferralWidget','Marketing','P3','Input, Button, share API',12,'Refer-a-friend', () => `
      ${ReferralWidget()}
      <div class="callout">Snif Society / Skylar "Give $20, Get $20". Siwa's only retention mechanic today is a 50 EGP newsletter popup.</div>`],
    ['ComparisonTable','Discovery','P3','ProductCard, state',20,'Advanced feature', () => `
      ${ComparisonTable()}
      <div class="callout">Scrolls horizontally inside its own container; the row header column is a <code>th[scope=row]</code> so screen readers announce each cell's axis.</div>`],
    ['GiftMessage','Commerce','P3','Textarea, Checkbox',8,'Gift options', () => `
      ${GiftMessage()}
      <div class="callout">Snif's to / from / message fields (doc 13 §2.5). Character counter is wired via <code>aria-describedby</code>.</div>`],
    ['VideoEmbed','Content','P3','iframe, thumbnail',6,'Product videos', VideoEmbed],
    ['CountdownTimer','Marketing','P3','Typography, date math',10,'Limited offers', CountdownTimer]
  ];

  /* ============================ VARIANTS ============================
     Five variants per component. Each entry returns [label, html] pairs.
     ================================================================== */

  const pA = () => byHandle('mawj'), pB = () => byHandle('coco-woods'), pOut = () => byHandle('citrine');
  const q1 = () => byHandle('layering-vanilla').quotes[0];
  const qAr = () => byHandle('layering-vanilla').quotes.find(x => /[؀-ۿ]/.test(x.b)) || q1();

  const VARIANTS = {
    Button: () => [
      ['Primary', `<button class="btn">${t('add')}</button>`],
      ['Secondary', `<button class="btn btn--secondary">${t('notify')}</button>`],
      ['Tertiary', `<button class="btn btn--tertiary">${t('shopAll')} →</button>`],
      ['On dark', `<div style="background:var(--surface-dark);padding:12px"><button class="btn btn--dark">${t('checkout')}</button></div>`],
      ['Destructive', `<button class="btn btn--danger">${LOCALE === 'ar' ? 'إزالة' : 'Remove'}</button>`]
    ],
    Badge: () => [
      ['Sale', Badge(LOCALE === 'ar' ? 'تخفيض' : 'Sale', 'sale')],
      ['Sold out', Badge(t('soldOut'), 'soldout')],
      ['In stock', Badge(LOCALE === 'ar' ? 'متوفر' : 'In stock', 'stock')],
      ['New drop', Badge(LOCALE === 'ar' ? 'جديد' : 'New drop', 'new')],
      ['Authentic — Cultural', Badge('أصيل · Siwan', 'authentic')]
    ],
    StarRating: () => [
      ['Small', Stars(4.98)],
      ['Large', Stars(4.98, { size: 'stars--lg' })],
      ['With count', Stars(4.98, { showCount: true, count: 1212 })],
      ['Partial', Stars(3)],
      ['Interactive', StarsInput('v')]
    ],
    ProductCard: () => [
      ['Default — hover swaps the image', ProductCard(pA())],
      ['Inspired-by', ProductCard(pB())],
      ['Sold out → Notify me', ProductCard(pOut())],
      ['Buy now CTA', ProductCard(byHandle('belle-riche'), { cta: 'buy' })],
      ['With wishlist', ProductCard(byHandle('pink-allure'), { wish: true })]
    ],
    ProductGrid: () => [
      ['4-up', `<div class="pgrid" style="grid-template-columns:repeat(4,1fr)">${P.slice(0, 4).map(p => ProductCard(p)).join('')}</div>`],
      ['3-up', `<div class="pgrid" style="grid-template-columns:repeat(3,1fr)">${P.slice(0, 3).map(p => ProductCard(p)).join('')}</div>`],
      ['2-up', `<div class="pgrid" style="grid-template-columns:repeat(2,1fr)">${P.slice(0, 2).map(p => ProductCard(p)).join('')}</div>`],
      ['Loading', `<div class="pgrid" style="grid-template-columns:repeat(2,1fr)">${SkeletonCard()}${SkeletonCard()}</div>`],
      ['Empty', `<div class="rcard rcard--empty">${LOCALE === 'ar' ? 'لا نتائج مطابقة' : 'No products match these filters'}<div class="row" style="justify-content:center;margin-top:12px"><button class="btn btn--secondary btn--sm">${LOCALE === 'ar' ? 'مسح' : 'Clear filters'}</button></div></div>`]
    ],
    ProductImage: () => [
      ['Default', ProductImage(pA(), { zoom: false })],
      ['Zoom on hover', ProductImage(pB())],
      ['With wishlist', ProductImage(byHandle('pink-allure'), { wish: true })],
      ['No image (50/56)', ProductImage(byHandle('hot-vanilla'), { zoom: false })],
      ['Sold out', `<div class="pcard--soldout">${ProductImage(pOut(), { zoom: false })}</div>`]
    ],
    VariantSelector: () => [
      ['Default', VariantSelector(pA(), 'v1')],
      ['With prices', VariantSelector(pB(), 'v2')],
      ['Some disabled', VariantSelector({ variants: [{ t: '30 ml', p: 450, a: true }, { t: '50 ml', p: 650, a: false }, { t: '100 ml', p: 1000, a: true }] }, 'v3')],
      ['All sold out', VariantSelector({ variants: pOut().variants.map(v => ({ ...v, a: false })) }, 'v4')],
      ['Single size', VariantSelector({ variants: [{ t: '125 ml', p: 550, a: true }] }, 'v5')]
    ],
    PriceDisplay: () => [
      ['Single', Price(pA())],
      ['Range', Price(pB())],
      ['On sale', Price(byHandle('belle-riche'))],
      ['Per-ml unit', `<span class="price">${money(650)}<span class="from">${digits('13')}/ml</span></span>`],
      ['Free', `<span class="price">${LOCALE === 'ar' ? 'مجاناً' : 'Free'}<span class="was">${money(350)}</span></span>`]
    ],
    AddToCartButton: () => [
      ['Idle', AddToCartButton('mawj')],
      ['Loading', `<button class="btn atc" data-state="loading"><span class="spinner"></span> ${t('adding')}</button>`],
      ['Success', `<button class="btn atc" data-state="success">${svg('check')} ${t('added')}</button>`],
      ['Error', `<button class="btn atc" data-state="error">${t('failed')}</button>`],
      ['Sold out', `<button class="btn btn--secondary">${t('notify')}</button>`]
    ],
    CartDrawer: () => [
      ['Empty', `<div class="drawer__body" style="position:static;transform:none;padding:0"><p class="pcard__sub">${t('empty')}</p></div>`],
      ['One line', `<div class="line"><div class="line__img"><img src="${IMG}mawj.jpg" alt=""></div><div><p class="line__t">Mawj</p><p class="line__v">${digits('50')} ml</p><div class="qty"><button>−</button><span>${digits(1)}</span><button>+</button></div></div><div class="price">${money(800)}</div></div>`],
      ['Progress to free ship', `<div class="freeship">${money(700)} ${t('freeShip')}<div class="freeship__bar"><i class="freeship__fill" style="width:53%"></i></div></div>`],
      ['Free shipping met', `<div class="freeship">${t('freeShipOK')}<div class="freeship__bar"><i class="freeship__fill" style="width:100%"></i></div></div>`],
      ['Open the live drawer', `<button class="btn" data-opencart>${t('bag')}</button>`]
    ],
    Header: () => [
      ['Full', Header()],
      ['Announcement only', `<div class="hdr"><div class="hdr__ann">${LOCALE === 'ar' ? 'شحن مجاني فوق ١٥٠٠ ج.م' : 'Free shipping over LE 1,500'}</div></div>`],
      ['Compact / scrolled', `<div class="hdr"><div class="hdr__bar" style="height:52px"><a class="hdr__mark" href="#Header"><span>SIWA</span></a><div class="hdr__tools" style="margin-inline-start:auto">${LanguageToggle()}<button class="iconbtn">${svg('bag')}</button></div></div></div>`],
      ['Mobile', `<div style="max-width:380px;border:1px solid var(--hairline)"><div class="hdr"><div class="hdr__bar" style="padding-inline:12px;gap:8px"><button class="iconbtn" style="display:grid">${svg('burger')}</button><a class="hdr__mark" href="#Header" style="font-size:18px"><span>SIWA</span></a><div class="hdr__tools" style="margin-inline-start:auto"><button class="iconbtn">${svg('bag')}</button></div></div></div></div>`],
      ['Nav only', `<nav class="hdr__nav" style="margin:0;flex-wrap:wrap">${(LOCALE === 'ar' ? NAV_AR : NAV_EN).map((n, i) => `<a href="#Header" ${i === 0 ? 'aria-current="page"' : ''}>${n}</a>`).join('')}</nav>`]
    ],
    Footer: () => [
      ['Full 4-column', Footer()],
      ['Two column', `<footer class="ftr" style="padding:24px"><div class="ftr__grid" style="grid-template-columns:repeat(2,1fr)"><div><h4>Shop</h4><ul><li><a href="#Footer">All fragrances</a></li><li><a href="#Footer">Layering</a></li></ul></div><div><h4>The House</h4><ul><li><a href="#Footer">The Oasis</a></li><li><a href="#Footer">The Craft</a></li></ul></div></div></footer>`],
      ['Minimal bar', `<footer class="ftr" style="padding:16px 24px"><div class="ftr__base" style="margin:0;border:0;padding:0"><span>© ${digits('2026')} Siwa · سيوة</span><span>${LOCALE === 'ar' ? 'صُنع في مصر' : 'Made in Egypt'}</span></div></footer>`],
      ['With newsletter', `<footer class="ftr" style="padding:24px"><div style="max-width:420px"><h4>${LOCALE === 'ar' ? 'النشرة' : 'Newsletter'}</h4><div class="row" style="flex-wrap:nowrap"><input class="input" placeholder="${LOCALE === 'ar' ? 'بريدك' : 'Email'}" style="background:transparent;color:var(--on-dark);border-color:rgba(212,207,194,.4)"><button class="btn">${LOCALE === 'ar' ? 'اشترك' : 'Join'}</button></div></div></footer>`],
      ['Social row', `<footer class="ftr" style="padding:20px 24px"><div class="row" style="justify-content:center;gap:24px">${['Instagram', 'TikTok', 'Facebook', 'WhatsApp'].map(s => `<a href="#Footer">${s}</a>`).join('')}</div></footer>`]
    ],
    NotePyramid: () => [
      ['Three tiers', NotePyramid(byHandle('caramel-vanigliato'))],
      ['Two tiers', NotePyramid({ notes: { top: 'Bergamot', base: 'Cedar & musk' } })],
      ['Accords only', `<p class="pcard__notes">${esc(byHandle('sundaze').accords || 'Tropical Fruit • Creamy Solar Florals • Warm Bourbon Vanilla')}</p>`],
      ['Inline compact', `<div class="row" style="gap:6px">${['Caramel', 'Honey', 'Vanilla'].map(n => Badge(n, 'tag')).join('')}</div>`],
      ['No data (38/56)', NotePyramid({ notes: {} })]
    ],
    ReviewSummary: () => [
      ['Full', ReviewSummary(byHandle('layering-vanilla'))],
      ['Compact', `<div class="rsummary__top">${Stars(4.98, { size: 'stars--lg' })}<span class="rsummary__avg" style="font-size:22px">${digits('4.98')}</span><span class="pcard__sub">${digits(1212)}</span></div>`],
      ['Inline badge', Stars(4.98, { showCount: true, count: 1212 })],
      ['Single review', `<div class="rsummary__top"><span class="rsummary__avg">${digits('5.00')}</span>${Stars(5)}<span class="pcard__sub">${digits(1)} ${t('reviews')}</span></div>`],
      ['No reviews', `<p class="pcard__sub">${LOCALE === 'ar' ? 'لا تقييمات بعد' : 'No reviews yet'} — soiree, sundaze</p>`]
    ],
    ReviewList: () => [
      ['Card (default)', ReviewList(byHandle('layering-vanilla'), { limit: 2 })],
      ['With photos', `<div class="rl__grid" style="grid-template-columns:1fr">${ReviewCard(q1(), { photos: true })}</div>`],
      ['Arabic RTL', `<div class="rl__grid" style="grid-template-columns:1fr">${ReviewCard(qAr())}</div>`],
      ['Sorted — top rated', ReviewList(byHandle('mawj'), { limit: 2, sort: 1 })],
      ['Empty', ReviewList(byHandle('mawj'), { empty: true })]
    ],
    FilterBar: () => [
      ['Chips inactive', `<div class="filters__row">${['Vanilla', 'Woody', 'Floral'].map(c => `<button class="chip" aria-pressed="false">${c} <span class="n">${digits(9)}</span></button>`).join('')}</div>`],
      ['Applied', `<div class="filters__row">${[['Vanilla', true], ['Woody', false], ['Floral', true]].map(([c, on]) => `<button class="chip" aria-pressed="${on}">${c} <span class="n">${digits(9)}</span></button>`).join('')}<button class="btn btn--tertiary btn--sm">${LOCALE === 'ar' ? 'مسح' : 'Clear'}</button></div>`],
      ['House facet', `<div class="filters__row">${[['Kayali', 5], ['Parfums de Marly', 3], ['Louis Vuitton', 4]].map(([c, n]) => `<button class="chip" aria-pressed="false">${c} <span class="n">${digits(n)}</span></button>`).join('')}</div>`],
      ['All 8 axes', FilterBar()],
      ['No results', `<div class="rcard rcard--empty">${LOCALE === 'ar' ? 'لا نتائج' : 'No products match'} — ${LOCALE === 'ar' ? 'جرّب إزالة فلتر' : 'try removing a filter'}</div>`]
    ],
    IntensityScale: () => [
      ['Subtle', IntensityScale(1)], ['Distinct', IntensityScale(2)], ['Powerful', IntensityScale(3)],
      ['With longevity', `${IntensityScale(3)}<div class="scale" style="margin-top:12px"><p class="lbl">${LOCALE === 'ar' ? 'الثبات' : 'Longevity'}</p><div class="scale__track">${[1, 2, 3].map(i => `<i class="scale__step ${i <= 3 ? 'on' : ''}"></i>`).join('')}</div><div class="scale__labels"><span>6h</span><span>9h</span><span class="on">12h+</span></div></div>`],
      ['No data', `<p class="pcard__sub">${LOCALE === 'ar' ? 'لا بيانات' : 'Not rated'} — 54 of 56 products</p>`]
    ],
    LayeringSuggestions: () => [
      ['Pair', `<div class="pgrid" style="grid-template-columns:repeat(2,1fr)">${layering.slice(0, 2).map(p => ProductCard(p)).join('')}</div>`],
      ['Trio', `<div class="pgrid" style="grid-template-columns:repeat(3,1fr)">${layering.slice(0, 3).map(p => ProductCard(p)).join('')}</div>`],
      ['With discount CTA', `<div class="row"><button class="btn btn--lg">${LOCALE === 'ar' ? 'أضف الثنائي — وفّر ١٥٪' : 'Add both — save 15%'}</button></div>`],
      ['Partner sold out', `<div class="pgrid" style="grid-template-columns:1fr">${ProductCard(pOut())}</div>`],
      ['Inline suggestion', `<div class="callout">${LOCALE === 'ar' ? 'يُمزج جيداً مع' : 'Layers well with'} <b>Layering Apple</b> — ${money(1150)}</div>`]
    ],
    InspiredByBlock: () => [
      ['Full (with retail)', InspiredByBlock(byHandle('layering-vanilla'))],
      ['Legal-safe (no price)', `<div class="inspired"><span class="inspired__label">${t('inspiredBy')}</span><span class="inspired__house">Kayali — Vanilla 28</span><span class="inspired__note">${LOCALE === 'ar' ? 'تفسير مستقل من سيوة.' : 'An independent Siwa interpretation. Not affiliated with the house named.'}</span></div>`],
      ['Compact', `<p class="pcard__sub">${t('inspiredBy')} <span class="pcard__house">Parfums de Marly — Layton</span></p>`],
      ['Original (renders nothing)', `<p class="pcard__sub">${LOCALE === 'ar' ? 'إبداع سيوة الأصلي — لا يُعرض هذا المكوّن' : 'Siwa original creation — this component does not render'}</p>`],
      ['With badge', `<div class="row">${Badge(LOCALE === 'ar' ? 'مستوحى' : 'Inspired by', 'new')}${Badge('أصيل · Siwan', 'authentic')}</div>`]
    ],
    BundleBuilder: () => [
      ['Empty slots', `<div class="bundle__slots">${[1, 2, 3].map(i => `<div class="bundle__slot">${digits(i)}</div>`).join('')}</div>`],
      ['Partial', `<div class="bundle__slots"><div class="bundle__slot filled"><img src="${IMG}mawj.jpg" alt=""></div><div class="bundle__slot">${digits(2)}</div><div class="bundle__slot">${digits(3)}</div></div>`],
      ['Complete', `<div class="bundle__slots">${withImg.slice(0, 3).map(p => `<div class="bundle__slot filled"><img src="${IMG}${p.img}" alt=""></div>`).join('')}</div><div class="row" style="margin-top:12px"><span class="price">${money(1150)}</span><button class="btn btn--sm">${LOCALE === 'ar' ? 'أضف' : 'Add set'}</button></div>`],
      ['CTA disabled', `<button class="btn btn--lg" disabled>${LOCALE === 'ar' ? 'اختر ٣' : 'Pick 3 to continue'}</button>`],
      ['Full builder', BundleBuilder()]
    ],
    ScentQuiz: () => [
      ['Step 1', `<div class="quiz"><div class="quiz__prog"><i style="width:0%"></i></div><p class="quiz__step">${LOCALE === 'ar' ? 'سؤال' : 'Step'} ${digits(1)} / ${digits(4)}</p><h3 class="quiz__q">${QUIZ[0].q[LOCALE]}</h3><div class="quiz__opts">${QUIZ[0].o[LOCALE].slice(0, 2).map(o => `<label class="qopt"><input type="radio" name="vq1"><span>${o}</span></label>`).join('')}</div></div>`],
      ['Mid progress', `<div class="quiz"><div class="quiz__prog"><i style="width:50%"></i></div><p class="quiz__step">${LOCALE === 'ar' ? 'سؤال' : 'Step'} ${digits(3)} / ${digits(4)}</p><h3 class="quiz__q">${QUIZ[2].q[LOCALE]}</h3></div>`],
      ['Option selected', `<div class="quiz__opts" style="grid-template-columns:1fr"><label class="qopt"><input type="radio" name="vq2" checked><span>${QUIZ[0].o[LOCALE][0]}</span></label></div>`],
      ['Final step', `<div class="quiz"><div class="quiz__prog"><i style="width:75%"></i></div><h3 class="quiz__q">${QUIZ[3].q[LOCALE]}</h3><div class="row"><button class="btn">${LOCALE === 'ar' ? 'أرني النتائج' : 'See my results'}</button></div></div>`],
      ['Live quiz', `<div>${ScentQuiz()}</div>`]
    ],
    QuizResults: () => [
      ['Persona', PersonaBlock()],
      ['Layering pair', `<div class="pgrid" style="grid-template-columns:repeat(2,1fr)">${layering.slice(0, 2).map(p => ProductCard(p)).join('')}</div>`],
      ['Single match', `<div class="pgrid" style="grid-template-columns:1fr;max-width:260px">${ProductCard(pA())}</div>`],
      ['No match', `<div class="rcard rcard--empty">${LOCALE === 'ar' ? 'لم نجد تطابقاً — جرّب مرة أخرى' : 'No confident match — try the quiz again'}</div>`],
      ['Actions', `<div class="row"><button class="btn">${LOCALE === 'ar' ? 'أضف الثنائي' : 'Add the pair'}</button><button class="btn btn--tertiary" data-quiz="restart">${LOCALE === 'ar' ? 'إعادة' : 'Retake'}</button></div>`]
    ],
    ProductStoryBlock: () => [
      ['Vintage surface', ProductStoryBlock(pA())],
      ['Plain', `<div class="story"><p class="story__eyebrow">${t('story')}</p><p class="story__quote">${LOCALE === 'ar' ? 'ليست كل الأمواج تُطارَد.' : 'Not all waves are meant to be chased.'}</p></div>`],
      ['With stamp only', `<span class="stamp">${LOCALE === 'ar' ? 'قُطِّر في سيوة' : 'Distilled in Siwa'} · ${digits('0114')}</span>`],
      ['Pull-quote', `<div class="vintage-surface"><span class="edge-wear"></span><p class="story__quote" style="margin:0">${LOCALE === 'ar' ? 'لغز في الرمال' : 'A riddle in the sands'}</p></div>`],
      ['Compact', `<div class="story"><p class="story__eyebrow">${t('story')}</p><p style="color:var(--text-secondary-aa);font-size:var(--t-body-sm)">${esc(pA().body.slice(0, 120))}…</p></div>`]
    ],
    PersonaBlock: () => [
      ['The Nomad', PersonaBlock()],
      ['The Poet', `<div class="persona vintage-surface"><span class="edge-wear"></span><p class="story__eyebrow">${t('persona')}</p><h4 class="persona__name">${LOCALE === 'ar' ? 'الشاعر' : 'The Poet'}</h4><p style="color:var(--text-secondary-aa)">${LOCALE === 'ar' ? 'يقرأ الغرفة قبل أن يتكلم.' : 'Reads the room before speaking.'}</p></div>`],
      ['The Muse', `<div class="persona vintage-surface"><span class="edge-wear"></span><p class="story__eyebrow">${t('persona')}</p><h4 class="persona__name">${LOCALE === 'ar' ? 'الملهمة' : 'The Muse'}</h4></div>`],
      ['Compact', `<p class="story__eyebrow">${t('persona')}</p><h4 class="persona__name">${LOCALE === 'ar' ? 'الرحّالة' : 'The Nomad'}</h4>`],
      ['With CTA', `<div class="persona vintage-surface"><span class="edge-wear"></span><h4 class="persona__name">${LOCALE === 'ar' ? 'الرحّالة' : 'The Nomad'}</h4><div class="row" style="margin-top:8px"><button class="btn btn--sm btn--secondary">${LOCALE === 'ar' ? 'اكتشف شخصيتك' : 'Find your Persona'}</button></div></div>`]
    ],
    Search: () => [
      ['Idle', `<label class="field"><input class="input" placeholder="${LOCALE === 'ar' ? 'ابحث…' : 'Search…'}"></label>`],
      ['With results', `<div class="search__results" style="position:static;max-height:none">${P.slice(0, 3).map(p => `<button class="search__item">${p.img ? `<img src="${IMG}${p.img}" alt="">` : '<span style="width:40px"></span>'}<span><b style="display:block;font-weight:500">${esc(p.title)}</b><small style="color:var(--text-secondary-aa)">${esc(p.house || 'Siwa original')}</small></span><span class="price">${money(p.min)}</span></button>`).join('')}</div>`],
      ['No results', `<div class="search__results" style="position:static"><p class="search__empty">${LOCALE === 'ar' ? 'لا نتائج' : 'No matches'} — "oud vanilla xyz"</p></div>`],
      ['Recent searches', `<div class="search__results" style="position:static"><div style="padding:12px"><p class="lbl" style="margin-bottom:8px">${LOCALE === 'ar' ? 'بحث سابق' : 'Recent'}</p><div class="row">${['Mawj', 'Vanilla', 'Kayali'].map(s => `<button class="chip">${s}</button>`).join('')}</div></div></div>`],
      ['Live search', Search()]
    ],
    Wishlist: () => [
      ['Empty', `<div class="rcard rcard--empty">${LOCALE === 'ar' ? 'قائمتك فارغة' : 'Nothing saved yet'}</div>`],
      ['Heart off', `<div style="position:relative;width:180px">${ProductImage(pA(), { zoom: false, wish: true })}</div>`],
      ['Heart on', `<div style="position:relative;width:180px">${ProductImage(pB(), { zoom: false, badges: false }).replace('</div>', `<button class="wish" aria-pressed="true">${svg('heart')}</button></div>`)}</div>`],
      ['Saved grid', `<div class="pgrid" style="grid-template-columns:repeat(2,1fr)">${P.slice(4, 6).map(p => ProductCard(p, { wish: true })).join('')}</div>`],
      ['With count', `<p class="lbl">${t('wishlist')} · ${digits(3)}</p><div class="row"><button class="btn btn--secondary btn--sm">${LOCALE === 'ar' ? 'شارك' : 'Share list'}</button></div>`]
    ],
    LanguageToggle: () => [
      ['EN active', `<div class="langtog"><button aria-pressed="true">EN</button><button aria-pressed="false" lang="ar">ع</button></div>`],
      ['AR active', `<div class="langtog"><button aria-pressed="false">EN</button><button aria-pressed="true" lang="ar">ع</button></div>`],
      ['Live toggle', LanguageToggle()],
      ['In header', `<div class="hdr"><div class="hdr__bar" style="height:52px"><a class="hdr__mark"><span>SIWA</span></a><div class="hdr__tools" style="margin-inline-start:auto">${LanguageToggle()}</div></div></div>`],
      ['Text link', `<button class="btn btn--tertiary">${LOCALE === 'ar' ? 'English' : 'العربية'}</button>`]
    ],
    ImageWithText: () => [
      ['Image left', ImageWithText()],
      ['Image right', `<div class="iwt iwt--rev">${ImageWithText().replace('<div class="iwt">', '').replace(/<\/div>$/, '')}</div>`],
      ['Stacked', `<div class="iwt" style="grid-template-columns:1fr;max-width:340px">${ProductImage(pB(), { zoom: false, badges: false })}<div><p class="story__eyebrow">${LOCALE === 'ar' ? 'الحرفة' : 'The Craft'}</p><p style="color:var(--text-secondary-aa)">${LOCALE === 'ar' ? 'من الواحة' : 'From the oasis'}</p></div></div>`],
      ['With stamp', `<div class="vintage-surface"><span class="edge-wear"></span><span class="stamp">${LOCALE === 'ar' ? 'كرشيف' : 'Kershef'}</span><p style="margin-top:8px;color:var(--text-secondary-aa)">${LOCALE === 'ar' ? 'طين وملح من البحيرات' : 'Clay and salt from the lakes'}</p></div>`],
      ['Text only', `<div><p class="story__eyebrow">${LOCALE === 'ar' ? 'الواحة' : 'The Oasis'}</p><p class="story__quote" style="font-size:26px">${LOCALE === 'ar' ? 'لغز في الرمال' : 'A riddle in the sands'}</p></div>`]
    ],
    CollectionGrid: () => [
      ['3-up', CollectionGrid()],
      ['2-up', `<div class="cgrid" style="grid-template-columns:repeat(2,1fr)">${withImg.slice(0, 2).map((p, i) => `<a class="ctile"><img src="${IMG}${p.img}" alt=""><div class="ctile__cap"><h4>${['The Oasis', 'The Salt'][i]}</h4></div></a>`).join('')}</div>`],
      ['Single feature', `<a class="ctile" style="aspect-ratio:16/9;display:block"><img src="${IMG}${withImg[0].img}" alt=""><div class="ctile__cap"><h4>${LOCALE === 'ar' ? 'مجموعة الواحة' : 'The Oasis Collection'}</h4></div></a>`],
      ['No caption', `<div class="cgrid" style="grid-template-columns:repeat(3,1fr)">${withImg.slice(0, 3).map(p => `<a class="ctile"><img src="${IMG}${p.img}" alt=""></a>`).join('')}</div>`],
      ['Text tiles', `<div class="cgrid" style="grid-template-columns:repeat(3,1fr)">${['The Oasis', 'The Salt', 'Layering'].map(n => `<a class="ctile" style="aspect-ratio:3/4;display:grid;place-items:center;background:var(--surface-card)"><h4 style="font:400 20px/1.2 var(--font-display);color:var(--heading)">${n}</h4></a>`).join('')}</div>`]
    ],
    HeroSection: () => [
      ['Default', HeroSection()],
      ['Centered', `<section class="hero" style="min-height:320px"><div class="hero__media"><img src="${IMG}${withImg[1].img}" alt=""></div><div class="hero__scrim" style="background:rgba(33,32,18,.5)"></div><div class="hero__body" style="max-width:none;text-align:center;justify-items:center;margin-inline:auto"><h2 class="hero__ttl" style="font-size:40px">${LOCALE === 'ar' ? 'الواحة' : 'The Oasis'}</h2></div></section>`],
      ['Minimal / no image', `<section class="hero" style="min-height:240px;background:var(--surface-dark)"><div class="hero__body"><h2 class="hero__ttl" style="font-size:36px">${LOCALE === 'ar' ? 'اكتشف شخصيتك' : 'Explore your Persona'}</h2></div></section>`],
      ['Short banner', `<section class="hero" style="min-height:160px"><div class="hero__media"><img src="${IMG}${withImg[2].img}" alt=""></div><div class="hero__scrim"></div><div class="hero__body" style="padding:16px 24px"><h2 class="hero__ttl" style="font-size:24px">${LOCALE === 'ar' ? 'الطبقات' : 'Layering'}</h2></div></section>`],
      ['With stamp', `<section class="hero" style="min-height:220px"><div class="hero__media"><img src="${IMG}${withImg[0].img}" alt=""></div><div class="hero__scrim"></div><div class="hero__body"><span class="stamp" style="color:var(--on-dark);border-color:rgba(212,207,194,.5)">${LOCALE === 'ar' ? 'قُطِّر في سيوة' : 'Distilled in Siwa'}</span></div></section>`]
    ],
    FeaturedCollection: () => [
      ['4-up with CTA', FeaturedCollection()],
      ['3-up', `<div class="pgrid" style="grid-template-columns:repeat(3,1fr)">${P.slice(0, 3).map(p => ProductCard(p)).join('')}</div>`],
      ['Header only', `<div class="row" style="justify-content:space-between"><h3 style="font:400 var(--t-display-lg)/1.2 var(--font-display);color:var(--heading)">${LOCALE === 'ar' ? 'الأكثر مبيعاً' : 'Best sellers'}</h3><a class="btn btn--tertiary">${t('shopAll')} →</a></div>`],
      ['Loading', `<div class="pgrid" style="grid-template-columns:repeat(3,1fr)">${SkeletonCard()}${SkeletonCard()}${SkeletonCard()}</div>`],
      ['Empty', `<div class="rcard rcard--empty">${LOCALE === 'ar' ? 'المجموعة فارغة' : 'This collection is empty'}</div>`]
    ],
    ReferralWidget: () => [
      ['Default', ReferralWidget()],
      ['Copied', `<div class="referral"><div class="referral__code"><input class="input" value="SIWA-MAWJ-2026" readonly><button class="btn" data-state="success">${svg('check')} ${LOCALE === 'ar' ? 'نُسخ' : 'Copied'}</button></div></div>`],
      ['Compact', `<div class="row"><input class="input" value="SIWA-MAWJ-2026" readonly style="max-width:200px"><button class="btn btn--sm btn--secondary">${LOCALE === 'ar' ? 'نسخ' : 'Copy'}</button></div>`],
      ['Share row', `<div class="row">${['WhatsApp', 'Instagram', 'Copy link'].map(s => `<button class="btn btn--secondary btn--sm">${s}</button>`).join('')}</div>`],
      ['Reward state', `<div class="callout"><b>${money(100)}</b> ${LOCALE === 'ar' ? 'في رصيدك من ٣ دعوات' : 'credited from 3 referrals'}</div>`]
    ],
    ComparisonTable: () => [
      ['Three products', ComparisonTable({ cols: 3 })],
      ['Two products', ComparisonTable({ cols: 2 })],
      ['Header only', `<div class="cmp2"><table><thead><tr><th></th>${[pA(), pB()].map(p => `<th><span class="cmp2__ph">${ProductImage(p, { zoom: false, badges: false })}<b>${esc(p.title)}</b></span></th>`).join('')}</tr></thead></table></div>`],
      ['Single row', `<div class="cmp2"><table><tbody><tr><th scope="row">${LOCALE === 'ar' ? 'السعر' : 'Price'}</th><td class="best" data-best="${LOCALE === 'ar' ? 'الأفضل' : 'Best value'}"><span class="price">${money(800)}</span></td><td><span class="price">${money(850)}</span></td></tr></tbody></table></div>`],
      ['Empty', `<div class="rcard rcard--empty">${LOCALE === 'ar' ? 'أضف منتجين للمقارنة' : 'Add at least two products to compare'}</div>`]
    ],
    GiftMessage: () => [
      ['Off', GiftMessage({ on: false })],
      ['On, empty', GiftMessage({ on: true })],
      ['Filled', GiftMessage({ on: true, to: LOCALE === 'ar' ? 'سلمى' : 'Salma', from: LOCALE === 'ar' ? 'رنا' : 'Rana', msg: LOCALE === 'ar' ? 'كل سنة وأنتِ طيبة. اخترتُ لكِ موج.' : 'Happy birthday. I picked Mawj for you — it smells like the sea at Siwa.' })],
      ['Over limit', GiftMessage({ on: true, to: 'Salma', msg: 'x'.repeat(210), err: true })],
      ['Card only', GiftCard({ to: LOCALE === 'ar' ? 'سلمى' : 'Salma', from: LOCALE === 'ar' ? 'رنا' : 'Rana', msg: LOCALE === 'ar' ? 'كل سنة وأنتِ طيبة.' : 'Happy birthday.' })]
    ],
    VideoEmbed: () => [
      ['Facade', VideoEmbed()],
      ['Portrait', `<div class="vembed" style="aspect-ratio:9/16;max-width:220px"><img src="${IMG}${withImg[0].img}" alt=""><button aria-label="Play">${svg('play')}</button></div>`],
      ['With caption', `<div class="vembed" style="max-width:340px"><img src="${IMG}${withImg[1].img}" alt=""><button aria-label="Play">${svg('play')}</button></div><p class="field__hint" style="margin-top:6px">${LOCALE === 'ar' ? 'كيف تُطبّق الطبقات' : 'How to layer — 45s'}</p>`],
      ['Loading', `<div class="vembed skeleton" style="max-width:340px"></div>`],
      ['No thumbnail', `<div class="vembed" style="max-width:340px"><button aria-label="Play">${svg('play')}</button></div>`]
    ],
    CountdownTimer: () => [
      ['Full', CountdownTimer()],
      ['Compact', `<div class="countdown">${['02', '14', '37'].map((n, i) => `<div class="cd__unit" style="min-width:48px;padding:8px"><div class="cd__n" style="font-size:20px">${digits(n)}</div><div class="cd__l">${['hrs', 'min', 'sec'][i]}</div></div>`).join('')}</div>`],
      ['Inline', `<p class="lbl">${LOCALE === 'ar' ? 'ينتهي خلال' : 'Ends in'} <b style="color:var(--date-red)">${digits('02:14:37')}</b></p>`],
      ['Urgent', `<div class="countdown">${['00', '04', '59'].map((n, i) => `<div class="cd__unit" style="border-color:var(--date-red)"><div class="cd__n" style="color:var(--date-red)">${digits(n)}</div><div class="cd__l">${['hrs', 'min', 'sec'][i]}</div></div>`).join('')}</div>`],
      ['Expired', `<div class="callout callout--warn">${LOCALE === 'ar' ? 'انتهى العرض' : 'This offer has ended'}</div>`]
    ]
  };

  /* ==================================================================
     EXPANSION TO 78 COMPONENTS — spec sections 1–9
     Variant tuples are [label, html] or [label, html, whenToUse].
     ================================================================== */

  const ICONS_CORE = ['search', 'bag', 'heart', 'star', 'close', 'check', 'burger', 'zoom', 'play', 'bottle', 'leaf', 'drop', 'wood'];

  /* ---- Primitives ---- */
  const Field = (o = {}) => `<label class="field">
      ${o.label ? `<span style="font:500 var(--t-body-sm)/1 var(--font-ui);color:var(--heading)">${o.label}${o.req ? ' *' : ''}</span>` : ''}
      <span style="position:relative;display:block">
        ${o.icon ? `<span style="position:absolute;inset-inline-start:10px;top:50%;transform:translateY(-50%);color:var(--text-secondary-aa);pointer-events:none">${svg(o.icon)}</span>` : ''}
        <input class="input" type="${o.type || 'text'}" placeholder="${esc(o.ph || '')}" value="${esc(o.val || '')}"
          ${o.err ? 'aria-invalid="true" aria-describedby="err-demo"' : ''} ${o.dis ? 'disabled' : ''}
          style="${o.icon ? 'padding-inline-start:34px' : ''}">
      </span>
      ${o.err ? `<span class="field__err" id="err-demo">${svg('close')} ${o.err}</span>` : ''}
      ${o.hint ? `<span class="field__hint">${o.hint}</span>` : ''}
    </label>`;

  const Chip = (label, o = {}) => `<button class="chip" aria-pressed="${!!o.on}">${o.icon ? svg(o.icon) : ''}${esc(label)}${o.n != null ? ` <span class="n">${digits(o.n)}</span>` : ''}${o.x ? ' ×' : ''}</button>`;

  const Sel = (opts, o = {}) => `<label class="field">${o.label ? `<span class="lbl">${o.label}</span>` : ''}
    <select class="select" ${o.dis ? 'disabled' : ''}>${opts.map(x => `<option>${esc(x)}</option>`).join('')}</select></label>`;

  const Check = (label, o = {}) => `<label class="check"><input type="checkbox" ${o.on ? 'checked' : ''} ${o.dis ? 'disabled' : ''}>${esc(label)}${o.n != null ? ` <span class="t-muted">(${digits(o.n)})</span>` : ''}</label>`;

  const Radio = (label, o = {}) => `<label class="qopt" style="display:block"><input type="radio" name="${o.name || 'r'}" ${o.on ? 'checked' : ''} ${o.dis ? 'disabled' : ''}><span>${esc(label)}${o.meta ? `<em style="float:inline-end;font-style:normal;color:var(--text-secondary-aa)">${o.meta}</em>` : ''}</span></label>`;

  const IconGrid = list => `<div class="icongrid">${list.map(n => `<div class="iconcell">${svg(n)}<span>${n}</span></div>`).join('')}</div>`;

  const Img = (src, o = {}) => src
    ? `<div class="pimg" style="aspect-ratio:${o.ar || '4/5'}"><img src="${IMG}${src}" alt="${esc(o.alt || '')}" loading="lazy"></div>`
    : `<div class="pimg" style="aspect-ratio:${o.ar || '4/5'}"><div class="pimg__ph">${svg('bottle')}</div></div>`;

  /* ---- Navigation ---- */
  // Accepts a plain string, or {label, href} when the consumer has a real
  // destination. The gallery passes strings; a product page passes objects —
  // feature A-05 needs working links, not '#Breadcrumbs' on every crumb.
  // Backwards compatible: an item that is not an object behaves as before.
  const Crumbs = (items, o = {}) => `<nav class="crumbs" aria-label="Breadcrumb"><ol style="display:contents;list-style:none;margin:0;padding:0">
    ${items.map((x, i) => {
      const label = (x && typeof x === 'object') ? x.label : x;
      const href = (x && typeof x === 'object' && x.href) ? x.href : '#Breadcrumbs';
      return `<li style="display:contents">${i ? '<span class="sep">›</span>' : ''}${i === items.length - 1
        ? `<span aria-current="page">${esc(label)}</span>` : `<a href="${esc(href)}">${esc(label)}</a>`}</li>`;
    }).join('')}</ol></nav>`;

  const Pager = (o = {}) => `<div class="pager">
    <button ${o.page === 1 ? 'disabled' : ''} aria-label="Previous">‹</button>
    ${[1, 2, 3, 4].map(n => `<a href="#Pagination" ${n === (o.page || 2) ? 'aria-current="page"' : ''}>${digits(n)}</a>`).join('')}
    <span class="t-muted" style="padding:0 4px">…</span><a href="#Pagination">${digits(9)}</a>
    <button aria-label="Next">›</button></div>`;

  const MobileNav = (o = {}) => `<div style="max-width:340px;border:1px solid var(--hairline);background:var(--canvas)">
    <div class="drawer__head"><h2 class="drawer__title">${LOCALE === 'ar' ? 'القائمة' : 'Menu'}</h2><button class="iconbtn">${svg('close')}</button></div>
    <nav style="padding:var(--sp-md);display:grid;gap:2px">
      ${(LOCALE === 'ar' ? NAV_AR : NAV_EN).map(n => `<a class="lnk--nav" href="#MobileNavDrawer" style="padding:10px 0;border-bottom:1px solid var(--hairline)">${n}${o.acc ? ' <span style="float:inline-end">+</span>' : ''}</a>`).join('')}
    </nav>
    ${o.tools ? `<div style="padding:var(--sp-md);border-top:1px solid var(--hairline);display:grid;gap:var(--sp-xs)">${LanguageToggle()}<a class="lnk" href="#MobileNavDrawer">${LOCALE === 'ar' ? 'حسابي' : 'My account'}</a></div>` : ''}
    ${o.promo ? `<div class="annbar" style="justify-content:flex-start">${LOCALE === 'ar' ? 'شحن مجاني فوق ١٥٠٠' : 'Free shipping over 1,500'}</div>` : ''}</div>`;

  /* ---- Registry additions ---- */
  const R2 = [
    ['Input', 'Primitives', 'P0', 'Typography, Icon', 6, 'Forms, search, newsletter, checkout', () =>
      `<div style="max-width:420px">${Field({ label: 'Email', ph: 'you@example.com', type: 'email', req: true, hint: 'We send one email a month.' })}</div>`, [
        ['Top label', `<div style="max-width:260px">${Field({ label: 'Email', ph: 'you@example.com' })}</div>`, 'Default. Clearest for screen readers and long Arabic labels.'],
        ['With icon', `<div style="max-width:260px">${Field({ label: 'Search', icon: 'search', ph: 'Try “Mawj”' })}</div>`, 'Search and filter fields. Icon flips side in RTL.'],
        ['Error', `<div style="max-width:260px">${Field({ label: 'Email', val: 'not-an-email', err: 'Enter a valid email address' })}</div>`, 'Never colour-only — icon + text + aria-invalid.'],
        ['Disabled', `<div style="max-width:260px">${Field({ label: 'Country', val: 'Egypt', dis: true })}</div>`, 'Single-market fields that cannot change.'],
        ['RTL', `<div dir="rtl" style="max-width:260px">${Field({ label: 'البريد الإلكتروني', icon: 'search', ph: 'اكتب هنا' })}</div>`, 'locale=ar. Icon and text both mirror.']
      ]],

    ['TagChip', 'Primitives', 'P1', 'Typography, Icon', 4, 'Filter chips, scent-family tags, product attributes', () =>
      `<div class="row">${Chip('Vanilla', { n: 14 })}${Chip('Woody', { on: true, n: 9 })}${Chip('Fresh', { icon: 'leaf', n: 5 })}</div>`, [
        ['Inactive', Chip('Gourmand', { n: 11 }), 'Default filter state.'],
        ['Active', Chip('Gourmand', { on: true, n: 11 }), 'Selected filter — inverts to ink, not gold.'],
        ['Dismissible', Chip('Oriental', { on: true, x: true }), 'Applied-filter row above the grid.'],
        ['With icon', Chip('Fresh', { icon: 'leaf', n: 5 }), 'Scent families where an icon set exists.'],
        ['Arabic', `<div dir="rtl">${Chip('فانيليا', { n: 14 })}</div>`, 'Counts switch to Arabic-Indic.']
      ]],

    ['Select', 'Primitives', 'P1', 'Typography', 4, 'Size selector, sort, filters', () =>
      `<div style="max-width:280px">${Sel(['Most recent', 'Highest rated', 'Price: low to high'], { label: 'Sort' })}</div>`, [
        ['Default', `<div style="max-width:220px">${Sel(['30 ml', '50 ml', '100 ml'])}</div>`, 'Compact variant picking.'],
        ['With label', `<div style="max-width:220px">${Sel(['Best selling', 'Newest'], { label: 'Sort by' })}</div>`, 'Standard form use.'],
        ['Long list', `<div style="max-width:220px">${Sel(['Kayali', 'Parfums de Marly', 'Louis Vuitton', 'Chanel', 'Giorgio Armani'], { label: 'Inspired by house' })}</div>`, 'Designer facet with many options.'],
        ['Disabled', `<div style="max-width:220px">${Sel(['EGP'], { label: 'Currency', dis: true })}</div>`, 'Single-market — EGP only by design.'],
        ['RTL', `<div dir="rtl" style="max-width:220px">${Sel(['الأحدث', 'الأعلى تقييماً'], { label: 'ترتيب' })}</div>`, 'Chevron mirrors automatically.']
      ]],

    ['Checkbox', 'Primitives', 'P1', 'Typography', 3, 'Filters, newsletter opt-in, gift options', () =>
      `<div class="col">${Check('Men', { n: 28 })}${Check('Women', { on: true, n: 25 })}${Check('Unisex', { n: 4 })}</div>`, [
        ['Unchecked', Check('In stock only', { n: 46 }), 'Default filter row.'],
        ['Checked', Check('In stock only', { on: true, n: 46 }), 'Applied — pair with a chip in the active row.'],
        ['With count', Check('Oriental', { n: 18 }), 'Counts must update live as filters narrow.'],
        ['Disabled', Check('Sold out (0)', { dis: true }), 'Zero-result facet — disable, never hide.'],
        ['Arabic', `<div dir="rtl">${Check('متوفر فقط', { on: true, n: 46 })}</div>`, 'Box moves to the right edge.']
      ]],

    ['Radio', 'Primitives', 'P1', 'Typography', 3, 'Quiz questions, variant selection', () =>
      `<div class="col" style="max-width:420px">${Radio('Everyday', { name: 'd', on: true })}${Radio('A long evening', { name: 'd' })}${Radio('The heat of summer', { name: 'd' })}</div>`, [
        ['List', `<div style="max-width:280px">${Radio('Subtle', { name: 'v1', on: true })}${Radio('Distinct', { name: 'v1' })}</div>`, 'Quiz answers, compact forms.'],
        ['With meta', `<div style="max-width:280px">${Radio('50 ml', { name: 'v2', on: true, meta: money(850) })}</div>`, 'Size selection where price matters.'],
        ['Card', `<div class="quiz__opts" style="max-width:420px">${QUIZ[0].o[LOCALE].slice(0, 2).map((o, i) => `<label class="qopt"><input type="radio" name="v3" ${i === 0 ? 'checked' : ''}><span>${o}</span></label>`).join('')}</div>`, 'Quiz — large touch targets.'],
        ['Disabled', `<div style="max-width:280px">${Radio('100 ml — sold out', { name: 'v4', dis: true })}</div>`, 'Unavailable variant; keep visible for price anchoring.'],
        ['Arabic', `<div dir="rtl" style="max-width:280px">${Radio('كل يوم', { name: 'v5', on: true })}</div>`, 'RTL alignment and dot placement.']
      ]],

    ['Icon', 'Primitives', 'P1', '—', 8, '20+ icons: search, cart, heart, star, chevron, close, check, sunburst, droplet', () =>
      IconGrid(ICONS_CORE), [
        ['Core set', IconGrid(['search', 'bag', 'heart', 'close', 'check']), 'Nav and commerce chrome.'],
        ['Scent set', IconGrid(['leaf', 'drop', 'wood', 'bottle']), 'Note tiers and scent families.'],
        ['Sizes', `<div class="row" style="align-items:flex-end">${[14, 18, 22, 28].map(s => `<span style="width:${s}px;height:${s}px;display:inline-block;color:var(--ink)">${svg('star')}</span>`).join('')}</div>`, '14 / 18 / 22 / 28 px on the 8px grid.'],
        ['On dark', `<div style="background:var(--surface-dark);padding:var(--sp-md);color:var(--on-dark)">${IconGrid(['bag', 'heart', 'search']).replace(/var\(--ink\)/g, 'var(--on-dark)')}</div>`, 'Footer and dark CTA strips.'],
        ['Cultural — sunburst', `<div class="row"><span style="color:var(--date-red);width:28px;display:inline-block">${svg('star')}</span><span class="t-muted" style="font-size:var(--t-caption)">Placeholder — the real Siwan sunburst must be drawn from the embroidery motif, not substituted with a star.</span></div>`, 'Authenticity badge only. Needs real artwork.']
      ]],

    ['Link', 'Primitives', 'P1', 'Typography', 3, 'Nav links, breadcrumbs, footer, CTAs', () =>
      `<div class="row" style="gap:var(--sp-lg)"><a class="lnk" href="#Link">Inline link</a><a class="lnk lnk--arrow" href="#Link">Shop all</a><a class="lnk--nav" href="#Link">Original Creations</a></div>`, [
        ['Inline', `<p class="t-body">Read <a class="lnk" href="#Link">our story</a> from the oasis.</p>`, 'Body copy. Underline is always present, never hover-only.'],
        ['Quiet', `<a class="lnk lnk--quiet" href="#Link">Shipping & returns</a>`, 'Footer and dense lists.'],
        ['Arrow CTA', `<a class="lnk lnk--arrow" href="#Link">Explore the collection</a>`, 'Section CTAs. Arrow mirrors in RTL.'],
        ['Nav', `<a class="lnk--nav" href="#Link">House of Siwa</a>`, 'Primary navigation.'],
        ['RTL arrow', `<div dir="rtl"><a class="lnk lnk--arrow" href="#Link">استكشف المجموعة</a></div>`, 'Arrow flips to ← automatically.']
      ]],

    ['Image', 'Primitives', 'P0', 'Skeleton', 6, 'Product, lifestyle, collection tiles — lazy, srcset, alt enforced', () =>
      `<div class="row" style="align-items:flex-start">${Img('mawj.jpg', { alt: 'Mawj on a salt ledge' })}${Img(null)}</div>`, [
        ['4:5 portrait', `<div style="width:160px">${Img('mawj.jpg', { alt: 'Mawj' })}</div>`, 'Product default — matches the bottle proportion.'],
        ['1:1 square', `<div style="width:160px">${Img('pink-allure.jpg', { ar: '1/1', alt: 'Pink Allure' })}</div>`, 'Carousels and thumbnails.'],
        ['16:9', `<div style="width:220px">${Img('coco-woods.jpg', { ar: '16/9', alt: 'Coco Woods' })}</div>`, 'Editorial and video posters.'],
        ['Placeholder', `<div style="width:160px">${Img(null)}</div>`, '50 of 56 products have one image; this is the common case.'],
        ['Loading', `<div style="width:160px" class="skeleton" role="presentation"><div style="aspect-ratio:4/5"></div></div>`, 'Reserve the box to prevent layout shift.']
      ]],

    ['Heading', 'Primitives', 'P0', 'Typography', 4, 'h1–h6, switches to Arabic display face when locale=ar', () =>
      `<div class="col"><p class="h-eyebrow">The Oasis</p><h3 class="h-display">Not all waves are meant to be chased</h3></div>`, [
        ['Display', `<h3 class="h-display">A riddle in the sands</h3>`, 'Hero and section openers. Serif.'],
        ['Section', `<h4 class="h-section">Best sellers</h4>`, 'Sans, sentence case, no wide tracking.'],
        ['Eyebrow', `<p class="h-eyebrow">The Craft</p>`, 'Kicker above a display heading.'],
        ['Bilingual stack', `<div class="h-bilingual"><h3 class="h-display">Mawj</h3><span class="ar" style="font-size:26px" lang="ar" dir="rtl">موج</span></div>`, 'Matches the bottle lockup. Equal visual weight — never a footnote.'],
        ['Arabic display', `<h3 class="h-display" lang="ar" dir="rtl" style="font-family:var(--font-ar-display)">اكتشف شخصيتك</h3>`, 'locale=ar. Aref Ruqaa at matching weight.']
      ]],

    ['Text', 'Primitives', 'P0', 'Typography', 3, 'Body copy with locale-aware typography', () =>
      `<div class="col" style="max-width:56ch"><p class="t-lead">Where the desert meets the sea.</p><p class="t-body">${esc(byHandle('mawj').body.slice(0, 180))}</p></div>`, [
        ['Body', `<p class="t-body" style="max-width:48ch">${esc(byHandle('mawj').body.slice(0, 150))}</p>`, 'Default. 16px / 1.6.'],
        ['Lead', `<p class="t-lead" style="max-width:44ch">Not all waves are meant to be chased.</p>`, 'Intro paragraph under a heading.'],
        ['Muted', `<p class="t-body t-muted" style="max-width:48ch">Distilled in Siwa · Batch 0114</p>`, 'Metadata. Uses the AA-corrected secondary, not raw Zinc Blend.'],
        ['Arabic', `<p class="t-body" lang="ar" dir="rtl" style="max-width:48ch;font-family:var(--font-ar-ui);line-height:1.7">حيث تلتقي الصحراء بالبحر — بلورات ملح تلتقط الضوء، وظل النخيل فوق ماء ساكن.</p>`, 'Leading loosens 1.6 → 1.7.'],
        ['Truncated', `<p class="t-body" style="max-width:280px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${esc(byHandle('mawj').body)}</p>`, 'Card descriptions. Two lines then clamp.']
      ]],

    ['Divider', 'Primitives', 'P2', 'Cultural Accent', 3, 'Horizontal/vertical, solid/dashed, cultural embroidery variant', () =>
      `<div class="col" style="gap:var(--sp-lg)"><hr class="hr"><hr class="hr--dashed"><div class="hr--sunburst"></div></div>`, [
        ['Hairline', `<hr class="hr">`, 'Default separator between rows.'],
        ['Dashed', `<hr class="hr--dashed">`, 'Optional or provisional content.'],
        ['Rule', `<hr class="hr--rule">`, '2px ink — closes a section header.'],
        ['Labelled', `<div class="hr--label"><span class="lbl">or</span></div>`, 'Between alternative actions.'],
        ['Cultural sunburst', `<div class="hr--sunburst"></div>`, 'Heritage pages only. Cultural Accent — must never appear in nav, forms or checkout.']
      ]],

    ['RecommendedProducts', 'Product', 'P1', 'ProductCard, Carousel', 12, '"You may also like" / "Complete the set"', () =>
      `<div class="col"><div class="row" style="justify-content:space-between"><h4 class="h-section">${LOCALE === 'ar' ? 'قد يعجبك أيضاً' : 'You may also like'}</h4><a class="lnk lnk--arrow" href="#RecommendedProducts">${t('shopAll')}</a></div>
       <div class="carousel">${P.slice(0, 6).map(p => ProductCard(p)).join('')}</div>
       <div class="dots"><i class="on"></i><i></i><i></i></div></div>`, [
        ['Carousel', `<div class="carousel">${P.slice(0, 5).map(p => ProductCard(p)).join('')}</div>`, 'Default. Scroll-snap, no arrows needed on touch.'],
        ['Grid', `<div class="pgrid" style="grid-template-columns:repeat(3,1fr)">${P.slice(0, 3).map(p => ProductCard(p)).join('')}</div>`, 'Below the fold where vertical space is free.'],
        ['Reason-labelled', `<div class="col"><p class="lbl">${LOCALE === 'ar' ? 'نوتات متشابهة' : 'Similar notes — vanilla & amber'}</p><div class="pgrid" style="grid-template-columns:repeat(2,1fr)">${withNotes.slice(0, 2).map(p => ProductCard(p)).join('')}</div></div>`, 'Stating the reason lifts click-through over unlabelled carousels.'],
        ['Persona-filtered', `<div class="col"><p class="lbl">${LOCALE === 'ar' ? 'مطابق لشخصيتك' : 'Matched to The Nomad'}</p><div class="pgrid" style="grid-template-columns:repeat(2,1fr)">${P.slice(2, 4).map(p => ProductCard(p)).join('')}</div></div>`, 'Post-quiz only. Falls back to bestsellers.'],
        ['Empty → bestsellers', `<div class="col"><p class="t-muted" style="font-size:var(--t-body-sm)">${LOCALE === 'ar' ? 'لا توصيات — عرض الأكثر مبيعاً' : 'No recommendations yet — showing bestsellers'}</p><div class="pgrid" style="grid-template-columns:repeat(2,1fr)">${P.slice(0, 2).map(p => ProductCard(p)).join('')}</div></div>`, 'Never render an empty rail.']
      ]],

    ['MobileNavDrawer', 'Navigation', 'P0', 'Drawer, Link, LanguageToggle', 12, 'Slide-out mobile navigation', () => MobileNav({ tools: true }), [
      ['Flat list', MobileNav(), 'Under 8 destinations — matches the live site today.'],
      ['Accordion', MobileNav({ acc: true }), 'When SHOP needs sub-categories.'],
      ['With tools', MobileNav({ tools: true }), 'Locale toggle and account below the fold.'],
      ['With promo', MobileNav({ promo: true }), 'Free-shipping threshold reinforced in-drawer.'],
      ['RTL', `<div dir="rtl">${MobileNav({ tools: true })}</div>`, 'Slides from the left; chevrons mirror.']
    ]],

    ['Breadcrumbs', 'Navigation', 'P2', 'Link', 4, 'Breadcrumb navigation with RTL support', () =>
      Crumbs(LOCALE === 'ar' ? ['الرئيسية', 'إبداعات سيوة', 'موج'] : ['Home', 'Original Creations', 'Mawj']), [
        ['Default', Crumbs(['Home', 'Shop all', 'Mawj']), 'PDP and collection pages.'],
        ['Deep', Crumbs(['Home', 'Shop all', 'Original Creations', 'The Oasis', 'Mawj']), 'Narrative collections add a level.'],
        ['Two level', Crumbs(['Home', 'Bundles']), 'Top-level collections.'],
        ['RTL', `<div dir="rtl">${Crumbs(['الرئيسية', 'إبداعات سيوة', 'موج'])}</div>`, 'Separator flips direction.'],
        ['With schema note', `${Crumbs(['Home', 'Shop all', 'Mawj'])}<p class="field__hint" style="margin-top:6px">Emit <code>BreadcrumbList</code> JSON-LD alongside — the live site emits none.</p>`, 'SEO requirement, not a visual variant.']
      ]],

    ['SortDropdown', 'Navigation', 'P1', 'Select', 4, 'Best selling, new arrivals, price, highest rated', () =>
      `<div class="sortbar"><span class="t-muted" style="font-size:var(--t-body-sm)">${digits(56)} ${LOCALE === 'ar' ? 'منتج' : 'products'}</span>
       <div style="max-width:220px">${Sel(['Best selling', 'Newest', 'Price: low to high', 'Price: high to low', 'Highest rated'], { label: '' })}</div></div>`, [
        ['Native select', `<div style="max-width:220px">${Sel(['Best selling', 'Newest', 'Highest rated'])}</div>`, 'Most reliable on mobile — uses the OS picker.'],
        ['With count', `<div class="sortbar"><span class="t-muted" style="font-size:var(--t-body-sm)">${digits(18)} results</span><div style="max-width:200px">${Sel(['Best selling', 'Newest'])}</div></div>`, 'Pairs with the filter bar.'],
        ['Segmented', `<div class="seg"><button aria-pressed="true">${LOCALE === 'ar' ? 'الأكثر مبيعاً' : 'Popular'}</button><button aria-pressed="false">${LOCALE === 'ar' ? 'جديد' : 'New'}</button><button aria-pressed="false">${LOCALE === 'ar' ? 'السعر' : 'Price'}</button></div>`, 'Three or fewer options — no dropdown needed.'],
        ['Labelled', `<div style="max-width:240px">${Sel(['Best selling', 'Highest rated'], { label: LOCALE === 'ar' ? 'ترتيب حسب' : 'Sort by' })}</div>`, 'Desktop sidebar layouts.'],
        ['RTL', `<div dir="rtl" style="max-width:220px">${Sel(['الأكثر مبيعاً', 'الأحدث', 'الأعلى تقييماً'], { label: 'ترتيب' })}</div>`, 'locale=ar.']
      ]],

    ['Pagination', 'Navigation', 'P2', 'Button, Link', 6, 'First/last, prev/next, numbered pages', () => Pager({ page: 2 }), [
      ['Numbered', Pager({ page: 2 }), 'Best for SEO — every page is crawlable and linkable.'],
      ['First page', Pager({ page: 1 }), 'Previous disabled, never hidden.'],
      ['Load more', `<div class="loadmore"><button class="btn btn--secondary">${LOCALE === 'ar' ? 'عرض المزيد' : 'Load 12 more'}</button><span class="loadmore__meter"><i style="width:40%"></i></span><span class="t-muted" style="font-size:var(--t-caption)">${digits(24)} of ${digits(56)}</span></div>`, 'Best conversion, but paginate underneath for crawlers.'],
      ['Prev / next only', `<div class="pager"><button aria-label="Previous">‹ ${LOCALE === 'ar' ? 'السابق' : 'Prev'}</button><button aria-label="Next">${LOCALE === 'ar' ? 'التالي' : 'Next'} ›</button></div>`, 'Editorial and blog.'],
      ['RTL', `<div dir="rtl">${Pager({ page: 2 })}</div>`, 'Chevrons and order both mirror.']
    ]]
  ];

  /* ---- Commerce / discovery / content / social / layout / marketing ---- */
  const Qty = (o = {}) => `<div class="qty" role="group" aria-label="Quantity">
      <button ${o.n === 1 ? 'disabled' : ''} aria-label="Decrease">−</button>
      <span>${digits(o.n ?? 1)}</span>
      <button ${o.max ? 'disabled' : ''} aria-label="Increase">+</button></div>`;

  const LineItem = (p, o = {}) => `<div class="line">
      <div class="line__img">${p.img ? `<img src="${IMG}${p.img}" alt="">` : ''}</div>
      <div><p class="line__t">${esc(p.title)}</p><p class="line__v">${digits('50')} ml${o.gone ? ` · <span style="color:var(--date-red)">${t('soldOut')}</span>` : ''}</p>
        ${o.compact ? '' : Qty({ n: o.n ?? 1 })}</div>
      <div class="col" style="gap:2px;text-align:end">${o.was ? `<span class="price"><span class="was">${money(o.was)}</span></span>` : ''}<span class="price">${money(p.min)}</span></div></div>`;

  const Ship = (pct, o = {}) => {
    const rem = Math.max(0, 1500 - (1500 * pct / 100));
    return `<div class="ship"><div class="ship__row"><span>${pct >= 100 ? t('freeShipOK') : `${money(rem)} ${t('freeShip')}`}</span>${o.eta ? `<span class="t-muted">${LOCALE === 'ar' ? '٢-٤ أيام' : '2–4 days'}</span>` : ''}</div>
      <div class="freeship__bar"><i class="freeship__fill" style="width:${pct}%"></i></div></div>`;
  };

  const Accordion = (items, o = {}) => `<div class="acc">${items.map((x, i) => `
      <div class="acc__item">
        <button class="acc__btn" aria-expanded="${o.allOpen || i === 0}">${esc(x[0])}<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button>
        <div class="acc__panel" ${(o.allOpen || i === 0) ? '' : 'hidden'}>${esc(x[1])}</div>
      </div>`).join('')}</div>`;

  const Marquee = (text, cls = '') => `<div class="marq ${cls}"><div class="marq__t"><span>${text}</span><span>${text}</span><span>${text}</span><span>${text}</span></div></div>`;

  const Quote = (q, cls = '') => `<figure class="quote ${cls}" style="margin:0"><p>${esc(q.b)}</p><footer>— ${esc(q.a)} · ${LOCALE === 'ar' ? 'شراء موثق' : 'Verified purchase'}</footer></figure>`;

  const USP = (o = {}) => {
    // o.ar forces Arabic content so the bilingual variant is real, not just dir-flipped
    const ar = o.ar || LOCALE === 'ar';
    const items = ar
      ? [['leaf', 'صُنع في مصر', 'مقطّر ومعبّأ في القاهرة'], ['star', '١٬٢١٢ تقييم · ٤٫٩٨★', 'من عملاء موثقين'],
         ['bag', 'شحن مجاني فوق ١٥٠٠ ج.م', 'خلال ٢-٤ أيام'], ['check', 'ضمان الأصالة', 'كيف تكتشف المقلّد']]
      : [['leaf', 'Crafted in Egypt', 'Distilled and filled in Cairo'], ['star', '1,212 reviews · 4.98★', 'From verified buyers'],
         ['bag', 'Free shipping over LE 1,500', 'Delivered in 2–4 days'], ['check', 'Authenticity guarantee', 'How to spot a fake']];
    return `<div class="usp ${o.row ? 'usp--row' : ''}" ${o.two ? 'style="grid-template-columns:repeat(2,1fr)"' : ''}>
      ${items.map(([ic, h, s]) => `<div class="usp__i">${svg(ic)}<b>${h}</b><span>${s}</span>${o.links ? `<a class="lnk" style="font-size:var(--t-caption)" href="#IconWithText">${ar ? 'اعرف المزيد' : 'Learn more'}</a>` : ''}</div>`).join('')}</div>`;
  };

  const Trust = (label, o = {}) => `<span class="trustbadge ${o.cultural ? 'trustbadge--cultural' : ''}">${svg(o.icon || 'check')}${esc(label)}</span>`;

  const PersonaCards = (o = {}) => {
    const ps = LOCALE === 'ar'
      ? [['الإلهة', 'قوية وفاخرة'], ['الشاعر', 'متأمل وفني'], ['الملهمة', 'رومانسية'], ['الوريث', 'كلاسيكي'], ['الرحّالة', 'حر ومغامر']]
      : [['Goddess', 'Powerful & luxurious'], ['Poet', 'Contemplative & artistic'], ['Muse', 'Romantic & feminine'], ['Heir', 'Classic & refined'], ['Nomad', 'Adventurous & free']];
    const list = o.one ? ps.slice(4) : ps;
    return `<div class="pcards">${list.map(([n, d], i) => `
      <button class="pcard2" aria-pressed="${o.sel === i}">${o.img && withImg[i % withImg.length] ? `<img src="${IMG}${withImg[i % withImg.length].img}" alt="" style="aspect-ratio:1;object-fit:cover">` : ''}
        <b>${n}</b>${o.bi ? `<span class="ar" lang="ar" dir="rtl">${['الإلهة', 'الشاعر', 'الملهمة', 'الوريث', 'الرحّالة'][i]}</span>` : ''}<span>${d}</span></button>`).join('')}</div>`;
  };

  const Modal = (o = {}) => `<div style="position:relative;border:1px solid var(--hairline);background:var(--scrim);padding:var(--sp-lg);display:grid;place-items:center;min-height:${o.tall ? '260px' : '180px'}">
      <div class="modal-card" style="background:var(--canvas);padding:var(--sp-lg);max-width:${o.w || 360}px;width:100%;box-shadow:var(--shadow-modal);display:grid;gap:var(--sp-sm)">
        <div class="row" style="justify-content:space-between"><h4 class="h-section">${o.title || 'Quick view'}</h4><button class="iconbtn">${svg('close')}</button></div>
        ${o.body || `<p class="t-body t-muted">Modal content.</p>`}
        ${o.actions !== false ? `<div class="row" style="justify-content:flex-end"><button class="btn btn--secondary btn--sm">${LOCALE === 'ar' ? 'إلغاء' : 'Cancel'}</button><button class="btn btn--sm">${LOCALE === 'ar' ? 'تأكيد' : 'Confirm'}</button></div>` : ''}
      </div></div>`;

  const R3 = [
    ['QuantitySelector', 'Commerce', 'P1', 'Button', 4, '+/- buttons, input field, min/max constraints', () => Qty({ n: 2 }), [
      ['Default', Qty({ n: 1 }), 'Minimum reached — decrease disabled, never hidden.'],
      ['Mid range', Qty({ n: 3 }), 'Standard state.'],
      ['Max reached', Qty({ n: 5, max: true }), 'Caps at available inventory. 49 of 158 variants are out.'],
      ['With label', `<div class="col" style="gap:6px"><span class="lbl">${LOCALE === 'ar' ? 'الكمية' : 'Quantity'}</span>${Qty({ n: 1 })}</div>`, 'PDP where the control needs naming.'],
      ['RTL', `<div dir="rtl">${Qty({ n: 2 })}</div>`, '− and + keep their meaning; order mirrors.']
    ]],

    ['CartLineItem', 'Commerce', 'P0', 'Image, Price, QuantitySelector', 6, 'Thumbnail, title, size, price, quantity, remove', () => LineItem(byHandle('mawj'), { n: 2 }), [
      ['Default', LineItem(byHandle('mawj'), { n: 1 }), 'Standard cart row.'],
      ['Compact', LineItem(byHandle('coco-woods'), { compact: true }), 'Mini-cart and order summary — no quantity control.'],
      ['Discounted', LineItem(byHandle('belle-riche'), { n: 1, was: 1100 }), 'Shows the strike-through original.'],
      ['Unavailable', LineItem(byHandle('citrine'), { n: 1, gone: true }), 'Went out of stock after add — must block checkout.'],
      ['RTL', `<div dir="rtl">${LineItem(byHandle('mawj'), { n: 2 })}</div>`, 'Thumbnail moves to the right.']
    ]],

    ['ShippingEstimator', 'Commerce', 'P1', 'Progress bar', 6, 'Threshold progress, estimated delivery', () => Ship(70, { eta: true }), [
      ['Progress', Ship(45), 'Below threshold — the gap is the motivator.'],
      ['Nearly there', Ship(88), 'Strongest upsell moment; pair with a low-price add-on.'],
      ['Achieved', Ship(100), 'Confirmed benefit — do not keep nagging.'],
      ['With ETA', Ship(70, { eta: true }), 'Delivery window reduces checkout hesitation.'],
      ['RTL', `<div dir="rtl">${Ship(70, { eta: true })}</div>`, 'Bar fills right-to-left.']
    ]],

    ['DiscountCode', 'Commerce', 'P2', 'Input, Button', 5, 'Coupon input, apply, error, applied display', () =>
      `<div class="promo" style="max-width:360px"><input class="input" placeholder="${LOCALE === 'ar' ? 'كود الخصم' : 'Discount code'}"><button class="btn btn--secondary">${LOCALE === 'ar' ? 'تطبيق' : 'Apply'}</button></div>`, [
        ['Empty', `<div class="promo" style="max-width:320px"><input class="input" placeholder="Discount code"><button class="btn btn--secondary">Apply</button></div>`, 'Collapsed by default — an open field invites code-hunting and abandonment.'],
        ['Applied', `<div class="promo--applied" style="max-width:320px"><span>${svg('check')} SIWA50 — ${LOCALE === 'ar' ? 'خصم ٥٠ ج.م' : 'LE 50 off'}</span><button class="btn btn--tertiary btn--sm">${LOCALE === 'ar' ? 'إزالة' : 'Remove'}</button></div>`, 'Confirmed state with a clear removal path.'],
        ['Error', `<div class="col" style="max-width:320px"><div class="promo"><input class="input" value="EXPIRED10" aria-invalid="true"><button class="btn btn--secondary">Apply</button></div><span class="field__err">${LOCALE === 'ar' ? 'هذا الكود منتهي' : 'This code has expired'}</span></div>`, 'Message sits under the field, tied by aria-describedby.'],
        ['Loading', `<div class="promo" style="max-width:320px"><input class="input" value="SIWA50"><button class="btn btn--secondary" data-state="loading"><span class="spinner"></span></button></div>`, 'Prevents double submission.'],
        ['Newsletter code', `<div class="callout">${LOCALE === 'ar' ? 'خصم ٥٠ ج.م على أول طلب — اشترك للحصول عليه' : 'LE 50 off your first order — subscribe to receive the code'}</div>`, 'The live popup promises this with no code, minimum or expiry stated.']
      ]],

    ['CheckoutButton', 'Commerce', 'P0', 'Button, Trust badges', 5, 'Primary checkout CTA with loading and security signals', () =>
      `<div class="col" style="max-width:320px"><button class="btn btn--lg btn--block">${t('checkout')} · ${money(1350)}</button><div class="row" style="justify-content:center">${Trust(LOCALE === 'ar' ? 'دفع آمن' : 'Secure payment')}</div></div>`, [
        ['Default', `<button class="btn btn--lg btn--block" style="max-width:300px">${t('checkout')}</button>`, 'Baseline.'],
        ['With total', `<button class="btn btn--lg btn--block" style="max-width:300px">${t('checkout')} · ${money(1350)}</button>`, 'Total in the button reduces surprise at step one.'],
        ['With trust row', `<div class="col" style="max-width:300px"><button class="btn btn--lg btn--block">${t('checkout')}</button><div class="row" style="justify-content:center">${Trust('Secure')}${Trust('14-day returns')}</div></div>`, 'Trust signals belong adjacent to the CTA, not in the footer.'],
        ['Loading', `<button class="btn btn--lg btn--block" data-state="loading" style="max-width:300px"><span class="spinner"></span> ${LOCALE === 'ar' ? 'جارٍ التحويل…' : 'Redirecting…'}</button>`, 'Checkout hand-off can take seconds.'],
        ['Blocked', `<div class="col" style="max-width:300px"><button class="btn btn--lg btn--block" disabled>${t('checkout')}</button><span class="field__err">${LOCALE === 'ar' ? 'أحد المنتجات نفد' : 'Remove the sold-out item to continue'}</span></div>`, 'Disabled must always say why.']
      ]],

    ['QuizProgress', 'Discovery', 'P1', 'Typography', 4, 'Step indicators, progress bar, labels', () =>
      `<div class="col"><div class="quiz__prog"><i style="width:50%"></i></div><p class="quiz__step">${LOCALE === 'ar' ? 'سؤال' : 'Step'} ${digits(3)} / ${digits(6)}</p></div>`, [
        ['Bar', `<div class="quiz__prog"><i style="width:50%"></i></div>`, 'Minimal. Best when the step count may change.'],
        ['Segmented', `<div class="qprog">${[1, 2, 3, 4, 5, 6].map(i => `<span class="qprog__step ${i <= 3 ? 'on' : ''}"></span>`).join('')}</div>`, 'Shows total length up front — sets expectation.'],
        ['Numbered', `<div class="qprog__num">${[1, 2, 3, 4, 5, 6].map(i => `<i class="${i <= 3 ? 'on' : ''}">${digits(i)}</i>`).join('')}</div>`, 'Allows jumping back to a specific answer.'],
        ['With label', `<div class="col" style="gap:6px"><div class="quiz__prog"><i style="width:50%"></i></div><span class="quiz__step">${LOCALE === 'ar' ? 'نصف الطريق' : 'Halfway — 3 of 6'}</span></div>`, 'Encouragement reduces mid-quiz abandonment.'],
        ['RTL', `<div dir="rtl"><div class="quiz__prog"><i style="width:50%"></i></div></div>`, 'Fill starts from the right.']
      ]],

    ['PersonaCard', 'Discovery', 'P1', 'Image, Typography', 8, 'Goddess / Poet / Muse / Heir / Nomad', () => PersonaCards({ sel: 4 }), [
      ['Grid of five', PersonaCards(), 'Quiz question one. Okhtein archetype model.'],
      ['Selected', PersonaCards({ sel: 1 }), '2px ink border, not a colour fill — keeps gold scarce.'],
      ['With imagery', PersonaCards({ img: true, sel: 0 }), 'Needs five commissioned portraits; placeholders shown.'],
      ['Bilingual', PersonaCards({ bi: true, sel: 4 }), 'Arabic persona names need translation sign-off.'],
      ['Single result', PersonaCards({ one: true, sel: 0 }), 'Quiz results page — the matched persona alone.']
    ]],

    ['RecentlyViewed', 'Discovery', 'P2', 'ProductCard, localStorage', 6, 'Carousel of recently viewed products', () =>
      `<div class="col"><div class="row" style="justify-content:space-between"><h4 class="h-section">${LOCALE === 'ar' ? 'شاهدت مؤخراً' : 'Recently viewed'}</h4><button class="btn btn--tertiary btn--sm">${LOCALE === 'ar' ? 'مسح' : 'Clear'}</button></div><div class="carousel">${P.slice(1, 6).map(p => ProductCard(p)).join('')}</div></div>`, [
        ['Carousel', `<div class="carousel">${P.slice(1, 5).map(p => ProductCard(p)).join('')}</div>`, 'Default. Persists to localStorage.'],
        ['Compact strip', `<div class="row">${withImg.map(p => `<a href="#RecentlyViewed" style="width:64px">${Img(p.img, { alt: p.title })}</a>`).join('')}</div>`, 'Footer or sidebar — thumbnails only.'],
        ['With clear', `<div class="row" style="justify-content:space-between"><span class="lbl">${LOCALE === 'ar' ? 'شاهدت مؤخراً' : 'Recently viewed'}</span><button class="btn btn--tertiary btn--sm">${LOCALE === 'ar' ? 'مسح السجل' : 'Clear history'}</button></div>`, 'Privacy affordance — required if you persist browsing.'],
        ['Single item', `<div style="max-width:200px">${ProductCard(byHandle('mawj'))}</div>`, 'First visit after one PDP view.'],
        ['Empty', `<div class="rcard rcard--empty">${LOCALE === 'ar' ? 'لا سجل بعد' : 'Nothing viewed yet'}</div>`, 'Hide the whole section rather than showing this in production.']
      ]],

    ['Testimonial', 'Content', 'P2', 'StarRating, Typography', 6, 'Review quotes with author, rating, product', () =>
      `<div class="col" style="max-width:520px">${Quote(byHandle('mawj').quotes[1] || q1())}</div>`, [
        ['Card', Quote(q1()), 'Homepage social-proof band.'],
        ['On dark', Quote(q1(), 'quote--dark'), 'Against the footer or a dark CTA strip.'],
        ['With stars', `<figure class="quote" style="margin:0">${Stars(5)}<p>${esc(q1().b)}</p><footer>— ${esc(q1().a)}</footer></figure>`, 'Rating adds credibility to the pull-quote.'],
        ['Arabic', Quote(qAr()), 'Real Arabic review, rendered RTL at 1.7 leading.'],
        ['Carousel', `<div class="carousel" style="gap:var(--sp-md)">${byHandle('layering-vanilla').quotes.slice(0, 3).map(q => `<div style="width:280px">${Quote(q)}</div>`).join('')}</div>`, 'Three-up rotating band.']
      ]],

    ['IconWithText', 'Content', 'P1', 'Icon, Typography', 6, 'USP bar — replaces the vague live copy with verifiable claims', () => USP(), [
      ['Four-up', USP(), 'Default. Replaces "Exquisite Ingredients / Inclusive Pricing / Personalized Service".'],
      ['Two-by-two', USP({ two: true }), 'Tablet and narrow desktop.'],
      ['Stacked row', USP({ row: true }), 'Mobile, or as a sidebar rail.'],
      ['With links', USP({ links: true }), '"Authenticity guarantee" should link to a Spot-a-fake page (Lattafa pattern).'],
      ['Arabic', `<div dir="rtl" lang="ar">${USP({ two: true, ar: true })}</div>`, 'Icons stay; numerals and copy both switch. Not a dir flip over English text.']
    ]],

    ['Accordion', 'Content', 'P2', 'Typography, Icon', 6, 'FAQ, product details, shipping info', () =>
      Accordion(LOCALE === 'ar'
        ? [['الشحن والإرجاع', 'شحن مجاني فوق ١٥٠٠ ج.م. الإرجاع خلال ١٤ يوماً.'], ['كيف أطبّق الطبقات؟', 'ابدأ بالأثقل ثم أضف الأخف.'], ['ما هو الإكستريه؟', 'تركيز ٢٠-٣٠٪ من الزيوت العطرية.']]
        : [['Shipping & returns', 'Free shipping over LE 1,500. Returns accepted within 14 days, unused and sealed.'], ['How do I layer?', 'Start with the heavier scent, then add the lighter one on top.'], ['What is an extrait?', 'A 20–30% aromatic concentration — higher than eau de parfum.']]), [
        ['FAQ', Accordion([['Shipping & returns', 'Free shipping over LE 1,500.'], ['How do I layer?', 'Heavier scent first.']]), 'First item open by default so the pattern is discoverable.'],
        ['All closed', Accordion([['Ingredients', 'Full INCI list.'], ['Longevity', '8–10 hours.']], { allOpen: false }).replace('aria-expanded="true"', 'aria-expanded="false"').replace('class="acc__panel" >', 'class="acc__panel" hidden>'), 'Long reference content where nothing should dominate.'],
        ['All open', Accordion([['Top notes', 'Caramel'], ['Base notes', 'Vanilla and white musk']], { allOpen: true }), 'Print and SEO — content must be in the DOM regardless.'],
        ['Product details', Accordion([['Notes', 'Caramel · Coumarin · Vanilla'], ['Size', '30 / 50 / 100 ml'], ['Made in', 'Cairo, Egypt']]), 'PDP secondary information below the fold.'],
        ['RTL', `<div dir="rtl">${Accordion([['الشحن', 'شحن مجاني فوق ١٥٠٠ ج.م'], ['الإرجاع', 'خلال ١٤ يوماً']])}</div>`, 'Chevron moves to the left edge.']
      ]],

    ['Marquee', 'Content', 'P3', 'Typography', 4, 'Scrolling text — currently "Signature Luxury" / "True Elegance"', () =>
      Marquee(LOCALE === 'ar' ? 'فخامة التوقيع · أناقة حقيقية' : 'Signature Luxury · True Elegance'), [
        ['Light', Marquee('Signature Luxury · True Elegance'), 'Between homepage sections.'],
        ['Dark', Marquee('Distilled in Siwa · Made in Egypt', 'marq--dark'), 'Breaks up a long light page.'],
        ['Provenance', Marquee('Crafted in Egypt · 1,212 reviews · 4.98★ · Free shipping over LE 1,500'), 'Turns decoration into a trust signal.'],
        ['Arabic', `<div dir="rtl">${Marquee('صُنع في مصر · قُطِّر في سيوة')}</div>`, 'Scroll direction reverses.'],
        ['Paused', `${Marquee('Hover to pause')}<p class="field__hint" style="margin-top:6px">Pauses on hover and honours <code>prefers-reduced-motion</code>.</p>`, 'Accessibility requirement, not a style choice.']
      ]],

    ['Review', 'Social Proof', 'P0', 'StarRating, Typography', 5, 'Single review card with author, verified badge, helpful', () =>
      `<div style="max-width:420px">${ReviewCard(q1(), { helpful: 23 })}</div>`, [
        ['Default', `<div style="max-width:380px">${ReviewCard(q1(), { helpful: 23 })}</div>`, 'Standard card.'],
        ['With photos', `<div style="max-width:380px">${ReviewCard(q1(), { photos: true, helpful: 11 })}</div>`, 'Photo reviews convert hardest — incentivise them.'],
        ['Arabic', `<div style="max-width:380px">${ReviewCard(qAr(), { helpful: 7 })}</div>`, 'Script detected per review, independent of page locale.'],
        ['Compact', `<div style="max-width:380px" class="rcard"><div class="rcard__top"><span class="rcard__mono">SO</span><span class="rcard__who"><span class="rcard__name">Salma O.</span></span>${Stars(5)}</div><p class="rcard__quote">${esc(q1().b.slice(0, 70))}</p></div>`, 'Homepage bands and PDP previews.'],
        ['Empty', `<div class="rcard rcard--empty" style="max-width:380px">${LOCALE === 'ar' ? 'كن أول من يكتب تقييماً' : 'Be the first to review this'}</div>`, 'Two of 56 products have zero reviews.']
      ]],

    ['ReviewForm', 'Social Proof', 'P2', 'StarRating, Input, Textarea', 10, 'Write-a-review modal with rating, title, body, photos', () =>
      `<div class="rform"><div class="rform__stars"><span class="lbl">${LOCALE === 'ar' ? 'تقييمك' : 'Your rating'}</span>${StarsInput('form')}</div>
       ${Field({ label: LOCALE === 'ar' ? 'العنوان' : 'Title', ph: LOCALE === 'ar' ? 'لخّص تجربتك' : 'Sum up your experience' })}
       <div class="field"><label>${LOCALE === 'ar' ? 'تقييمك' : 'Your review'}</label><textarea class="textarea"></textarea></div>
       <div class="uploader">${LOCALE === 'ar' ? 'أضف صورة (اختياري)' : 'Add a photo (optional)'}</div>
       <button class="btn">${LOCALE === 'ar' ? 'إرسال' : 'Submit review'}</button></div>`, [
        ['Full', `<div class="rform">${StarsInput('f1')}${Field({ label: 'Title' })}<div class="field"><textarea class="textarea"></textarea></div><button class="btn">Submit</button></div>`, 'Dedicated review page.'],
        ['Rating only', `<div class="col" style="max-width:300px"><span class="lbl">${LOCALE === 'ar' ? 'قيّم هذا العطر' : 'Rate this fragrance'}</span>${StarsInput('f2')}</div>`, 'Post-purchase email — one tap, expand later.'],
        ['With photo', `<div class="rform" style="max-width:380px"><div class="uploader">${LOCALE === 'ar' ? 'اسحب صورة هنا' : 'Drag a photo here, or browse'}</div></div>`, 'Photo reviews are the highest-value UGC.'],
        ['Error', `<div class="rform" style="max-width:380px"><div class="field"><textarea class="textarea" aria-invalid="true"></textarea><span class="field__err">${LOCALE === 'ar' ? 'اكتب ١٠ أحرف على الأقل' : 'Please write at least 10 characters'}</span></div></div>`, 'Validate on blur, never on every keystroke.'],
        ['Submitted', `<div class="callout"><b>${LOCALE === 'ar' ? 'شكراً' : 'Thank you'}</b> — ${LOCALE === 'ar' ? 'سيُنشر تقييمك بعد المراجعة.' : 'your review will appear after moderation.'}</div>`, 'Judge.me runs autopublish:false, so say so — silent queuing looks broken.']
      ]],

    ['TrustBadge', 'Social Proof', 'P2', 'Icon, Typography', 5, 'verified-reviews, authentic-siwan, secure-payment, free-shipping', () =>
      `<div class="row">${Trust(LOCALE === 'ar' ? '١٬٢١٢ تقييم موثق' : '1,212 verified reviews', { icon: 'star' })}${Trust(LOCALE === 'ar' ? 'دفع آمن' : 'Secure payment')}${Trust(LOCALE === 'ar' ? 'صُنع في مصر' : 'Crafted in Egypt', { icon: 'leaf' })}${Trust('أصيل · Authentic Siwan', { cultural: true, icon: 'star' })}</div>`, [
        ['Verified reviews', Trust('1,212 verified reviews', { icon: 'star' }), 'The strongest asset — lead with it.'],
        ['Secure payment', Trust('Secure payment'), 'Near the checkout CTA, not in the footer.'],
        ['Free shipping', Trust('Free over LE 1,500', { icon: 'bag' }), 'Reinforces the threshold at decision points.'],
        ['Crafted in Egypt', Trust('Crafted in Egypt', { icon: 'leaf' }), 'Origin as a verifiable fact (Amouage pattern).'],
        ['Authentic Siwan — Cultural', Trust('أصيل · Authentic Siwan', { cultural: true, icon: 'star' }), 'Only Cultural Accent badge. Roughly 2 SKUs — dilutes if applied brand-wide.']
      ]],

    ['Container', 'Layout', 'P2', '—', 2, 'Max-width content wrapper', () =>
      `<div class="col">${[['sm', 480], ['md', 768], ['lg', 1024], ['xl', 1200]].map(([n, w]) => `<div class="demo-rail" style="max-width:${w}px"><div class="demo-box">${n} — ${w}px</div></div>`).join('')}</div>`, [
        ['sm 480', `<div class="demo-rail" style="max-width:480px"><div class="demo-box">480 — forms, auth</div></div>`, 'Single-column forms and login.'],
        ['md 768', `<div class="demo-rail" style="max-width:768px"><div class="demo-box">768 — article</div></div>`, 'Long-form reading measure.'],
        ['lg 1024', `<div class="demo-rail" style="max-width:1024px"><div class="demo-box">1024 — PDP</div></div>`, 'Product pages.'],
        ['xl 1200', `<div class="demo-rail" style="max-width:1200px"><div class="demo-box">1200 — default</div></div>`, 'System default with 24px gutters.'],
        ['Full bleed', `<div class="demo-rail"><div class="demo-box">100% — hero, marquee</div></div>`, 'Heroes and marquees only.']
      ]],

    ['Section', 'Layout', 'P2', 'Container', 3, 'Page sections with spacing, background, anchor IDs', () =>
      `<div class="col"><div style="padding:var(--sp-section) var(--sp-lg);background:var(--surface-card);text-align:center"><p class="h-eyebrow">The Craft</p><h4 class="h-display">72px section rhythm</h4></div></div>`, [
        ['Default', `<div style="padding:var(--sp-xl) var(--sp-lg)"><div class="demo-box">72px desktop · 48 tablet · 32 mobile</div></div>`, 'Baseline vertical rhythm.'],
        ['Tinted', `<div style="padding:var(--sp-xl) var(--sp-lg);background:var(--surface-card)"><div class="demo-box" style="background:var(--canvas)">Sailcloth ground</div></div>`, 'Alternating bands without borders.'],
        ['Dark', `<div style="padding:var(--sp-xl) var(--sp-lg);background:var(--surface-dark)"><div class="demo-box" style="background:transparent;border-color:rgba(212,207,194,.3);color:var(--on-dark)">Dark strip</div></div>`, 'Footer and CTA strips.'],
        ['With eyebrow', `<div style="padding:var(--sp-xl) var(--sp-lg)"><p class="h-eyebrow">The Oasis</p><h4 class="h-display">The Salt Collection</h4></div>`, 'Narrative collection headers.'],
        ['Full bleed', `<div style="background:var(--surface-card)"><div style="aspect-ratio:5/1;display:grid;place-items:center" class="t-muted">Edge-to-edge media</div></div>`, 'Heroes and image bands.']
      ]],

    ['Grid', 'Layout', 'P2', '—', 3, 'Responsive grid, 1–6 columns', () =>
      `<div class="col">${[2, 3, 4].map(n => `<div style="display:grid;grid-template-columns:repeat(${n},1fr);gap:var(--sp-xs)">${Array.from({ length: n }, () => '<div class="demo-box"></div>').join('')}</div>`).join('')}</div>`, [
        ['2 column', `<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:var(--sp-xs)">${'<div class="demo-box"></div>'.repeat(2)}</div>`, 'Mobile product grid, split content.'],
        ['3 column', `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--sp-xs)">${'<div class="demo-box"></div>'.repeat(3)}</div>`, 'Tablet products, collection tiles.'],
        ['4 column', `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:var(--sp-xs)">${'<div class="demo-box"></div>'.repeat(4)}</div>`, 'Desktop product grid and footer.'],
        ['Auto-fit', `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(90px,1fr));gap:var(--sp-xs)">${'<div class="demo-box"></div>'.repeat(5)}</div>`, 'Unknown item counts — swatches, icons.'],
        ['Asymmetric', `<div style="display:grid;grid-template-columns:2fr 1fr;gap:var(--sp-xs)"><div class="demo-box">2fr</div><div class="demo-box">1fr</div></div>`, 'Image-with-text and PDP layouts.']
      ]],

    ['Stack', 'Layout', 'P3', '—', 2, 'Vertical spacing utility', () =>
      `<div class="col">${[8, 16, 24].map(g => `<div style="display:grid;gap:${g}px"><div class="demo-box">gap ${g}</div><div class="demo-box"></div></div>`).join('')}</div>`, [
        ['xs 8', `<div style="display:grid;gap:8px"><div class="demo-box"></div><div class="demo-box"></div></div>`, 'Label to control.'],
        ['sm 12', `<div style="display:grid;gap:12px"><div class="demo-box"></div><div class="demo-box"></div></div>`, 'Within a card.'],
        ['md 16', `<div style="display:grid;gap:16px"><div class="demo-box"></div><div class="demo-box"></div></div>`, 'Between form fields.'],
        ['lg 24', `<div style="display:grid;gap:24px"><div class="demo-box"></div><div class="demo-box"></div></div>`, 'Between blocks in a section.'],
        ['Divided', `<div style="display:grid"><div class="demo-box" style="border-bottom:1px solid var(--hairline)"></div><div class="demo-box"></div></div>`, 'Lists where separation must be explicit.']
      ]],

    ['Flex', 'Layout', 'P3', '—', 2, 'Flexbox utility', () =>
      `<div class="row" style="justify-content:space-between"><div class="demo-box" style="flex:1">start</div><div class="demo-box" style="flex:1">end</div></div>`, [
        ['Row', `<div style="display:flex;gap:8px"><div class="demo-box" style="flex:1"></div><div class="demo-box" style="flex:1"></div></div>`, 'Default.'],
        ['Space between', `<div style="display:flex;justify-content:space-between;gap:8px"><div class="demo-box">left</div><div class="demo-box">right</div></div>`, 'Header bars, card footers.'],
        ['Centered', `<div style="display:flex;justify-content:center;gap:8px"><div class="demo-box">centre</div></div>`, 'Empty states and CTAs.'],
        ['Wrap', `<div style="display:flex;flex-wrap:wrap;gap:8px">${'<div class="demo-box" style="width:80px"></div>'.repeat(5)}</div>`, 'Chip and badge rows.'],
        ['Column', `<div style="display:flex;flex-direction:column;gap:8px"><div class="demo-box"></div><div class="demo-box"></div></div>`, 'Mobile stacks. Use logical properties so RTL mirrors.']
      ]],

    ['Modal', 'Layout', 'P1', 'Drawer, Button', 10, 'Overlay dialogs — quick view, confirm, lightbox', () => Modal({ title: LOCALE === 'ar' ? 'عرض سريع' : 'Quick view' }), [
      ['Centered', Modal({ title: 'Confirm' }), 'Default. Focus trapped, Esc closes, focus returns to trigger.'],
      ['Quick view', Modal({ title: 'Mawj', w: 420, tall: true, actions: false, body: `<div class="row" style="align-items:flex-start"><div style="width:120px">${Img('mawj.jpg', { alt: 'Mawj' })}</div><div class="col" style="gap:6px">${Stars(4.99, { showCount: true, count: 68 })}${Price(byHandle('mawj'))}<button class="btn btn--sm">${t('add')}</button></div></div>` }), 'Product preview from the grid without leaving the page.'],
      ['Confirm', Modal({ title: LOCALE === 'ar' ? 'إزالة المنتج؟' : 'Remove item?', w: 320, body: `<p class="t-body t-muted">${LOCALE === 'ar' ? 'سيُزال من حقيبتك.' : 'This will be removed from your bag.'}</p>` }), 'Destructive actions only — do not over-use.'],
      ['Full-screen mobile', `<div style="max-width:340px;border:1px solid var(--hairline)">${Modal({ title: 'Filters', w: 320, actions: false, body: `<div class="col">${Check('Men', { n: 28 })}${Check('Women', { on: true, n: 25 })}</div>` })}</div>`, 'Below 768px, modals become full-screen sheets.'],
      ['RTL', `<div dir="rtl">${Modal({ title: 'عرض سريع' })}</div>`, 'Close button and actions both mirror.']
    ]],

    ['Drawer', 'Layout', 'P1', 'Modal', 10, 'Slide-out panels — nav, filters, cart, wishlist', () =>
      `<div class="row"><button class="btn" data-opencart>${LOCALE === 'ar' ? 'افتح السلة' : 'Open cart drawer'}</button><button class="btn btn--secondary">${LOCALE === 'ar' ? 'الفلاتر' : 'Filters'}</button></div>
       <p class="field__hint">All drawers share one primitive: scrim, focus trap, Esc-to-close, and inline-end anchoring that flips in RTL.</p>`, [
        ['Right (cart)', `<button class="btn" data-opencart>${t('bag')}</button>`, 'Cart and wishlist. Flies in from inline-end.'],
        ['Left (nav)', MobileNav(), 'Navigation. Flies in from inline-start.'],
        ['Bottom sheet', `<div style="border:1px solid var(--hairline);background:var(--scrim);padding-top:40px"><div style="background:var(--canvas);padding:var(--sp-md);display:grid;gap:var(--sp-sm)"><div style="width:36px;height:3px;background:var(--hairline);margin-inline:auto"></div><span class="lbl">${LOCALE === 'ar' ? 'اختر الحجم' : 'Select size'}</span>${VariantSelector(byHandle('mawj'), 'sheet')}</div></div>`, 'Mobile variant pickers — thumb-reachable.'],
        ['With header + footer', `<div style="max-width:320px;border:1px solid var(--hairline)"><div class="drawer__head"><h2 class="drawer__title">${LOCALE === 'ar' ? 'الفلاتر' : 'Filters'}</h2><button class="iconbtn">${svg('close')}</button></div><div style="padding:var(--sp-md)">${Check('Oriental', { on: true, n: 18 })}</div><div class="drawer__foot"><button class="btn btn--block">${LOCALE === 'ar' ? 'عرض ١٨ منتج' : 'View 18 products'}</button></div></div>`, 'Filters batch selections behind an Apply button on mobile.'],
        ['RTL', `<div dir="rtl">${MobileNav()}</div>`, 'Anchor side flips automatically via logical properties.']
      ]],

    ['AnnouncementBar', 'Marketing', 'P1', 'Link', 4, 'Top bar with message, link, dismissible, bilingual', () =>
      `<div class="col" style="gap:var(--sp-xs)">${['annbar', 'annbar annbar--gold', 'annbar annbar--quiet'].map(c => `<div class="${c}">${LOCALE === 'ar' ? 'اكتشف شخصيتك · شحن مجاني فوق ١٥٠٠ ج.م' : 'Explore your Persona · Free shipping over LE 1,500'}</div>`).join('')}</div>`, [
        ['Dark', `<div class="annbar">Explore your Persona · Free shipping over LE 1,500</div>`, 'Current live treatment.'],
        ['Gold', `<div class="annbar annbar--gold">${LOCALE === 'ar' ? 'خصم ٥٠ ج.م على أول طلب' : 'LE 50 off your first order'}</div>`, 'Promotional moments only — gold must stay scarce.'],
        ['Quiet', `<div class="annbar annbar--quiet">${LOCALE === 'ar' ? 'الشحن خلال ٢-٤ أيام' : 'Delivery in 2–4 days'}</div>`, 'Always-on informational bar.'],
        ['Dismissible', `<div class="annbar">Free shipping over LE 1,500 <button aria-label="Dismiss">${svg('close')}</button></div>`, 'Must persist the dismissal or it becomes an irritant.'],
        ['With link', `<div class="annbar">${LOCALE === 'ar' ? 'اكتشف شخصيتك' : 'Explore your Persona'} <a class="lnk lnk--arrow" style="color:inherit" href="#AnnouncementBar">${LOCALE === 'ar' ? 'ابدأ' : 'Take the quiz'}</a></div>`, 'The live bar says this and links nowhere — the single cheapest fix on the site.']
      ]],

    ['NewsletterSignup', 'Marketing', 'P2', 'Input, Button', 6, 'Email capture with the 50 EGP incentive', () =>
      `<div class="news" style="max-width:420px"><p class="h-eyebrow">${LOCALE === 'ar' ? 'هدية لأول طلب' : 'A gift for your first order'}</p>
       <p class="t-muted" style="font-size:var(--t-body-sm)">${LOCALE === 'ar' ? 'اشترك واحصل على خصم ٥٠ ج.م.' : 'Subscribe and receive LE 50 off your first purchase.'}</p>
       <div class="news__row"><input class="input" type="email" placeholder="${LOCALE === 'ar' ? 'بريدك الإلكتروني' : 'Your email'}"><button class="btn">${LOCALE === 'ar' ? 'اشترك' : 'Subscribe'}</button></div></div>`, [
        ['Inline', `<div class="news__row" style="max-width:360px"><input class="input" type="email" placeholder="Your email"><button class="btn">Subscribe</button></div>`, 'Footer and section bands.'],
        ['With incentive', `<div class="news" style="max-width:360px"><p class="h-eyebrow">LE 50 off</p><div class="news__row"><input class="input" type="email" placeholder="Your email"><button class="btn">Get code</button></div></div>`, 'Stating the value lifts opt-in materially.'],
        ['Popup', Modal({ title: LOCALE === 'ar' ? 'هدية لأول طلب' : 'A gift for your first order', w: 340, actions: false, body: `<div class="news"><p class="t-muted" style="font-size:var(--t-body-sm)">${LOCALE === 'ar' ? 'خصم ٥٠ ج.م' : 'LE 50 off your first purchase.'}</p><div class="news__row"><input class="input" placeholder="Email"><button class="btn">${LOCALE === 'ar' ? 'اشترك' : 'Join'}</button></div></div>` }), 'Delay to scroll-depth or exit-intent, never on load.'],
        ['Success', `<div class="callout" style="max-width:360px"><b>${LOCALE === 'ar' ? 'تم' : 'You are in.'}</b> ${LOCALE === 'ar' ? 'الكود SIWA50 في بريدك.' : 'Code SIWA50 is on its way to your inbox.'}</div>`, 'Show the code immediately — do not make them wait for email.'],
        ['Error', `<div class="col" style="max-width:360px"><div class="news__row"><input class="input" value="not-an-email" aria-invalid="true"><button class="btn">Subscribe</button></div><span class="field__err">${LOCALE === 'ar' ? 'بريد غير صالح' : 'Enter a valid email address'}</span></div>`, 'Inline validation, not an alert.']
      ]],

    ['PromoBanner', 'Marketing', 'P3', 'Typography, Image, Button', 8, 'Full-width promotional sections', () =>
      `<div class="promoban"><p class="h-eyebrow">${LOCALE === 'ar' ? 'مجموعة الاكتشاف' : 'Discovery set'}</p><h3 class="h-display">${LOCALE === 'ar' ? 'ثلاثة عطور · ٣٩٩ ج.م' : 'Three fragrances · LE 399'}</h3><button class="btn btn--lg">${LOCALE === 'ar' ? 'ابنِ مجموعتك' : 'Build your set'}</button></div>`, [
        ['Centered', `<div class="promoban" style="padding:var(--sp-xl)"><h3 class="h-display">Three for LE 399</h3><button class="btn">Build your set</button></div>`, 'Between homepage sections.'],
        ['With image', `<section class="hero" style="min-height:200px"><div class="hero__media"><img src="${IMG}${withImg[0].img}" alt=""></div><div class="hero__scrim"></div><div class="hero__body"><h3 class="hero__ttl" style="font-size:28px">${LOCALE === 'ar' ? 'مجموعة الواحة' : 'The Oasis Collection'}</h3></div></section>`, 'Collection launches.'],
        ['Dark', `<div class="promoban" style="background:var(--surface-dark);color:var(--on-dark);padding:var(--sp-xl)"><h3 class="h-display" style="color:var(--on-dark)">${LOCALE === 'ar' ? 'عاد للمخزون' : 'Back in stock'}</h3><button class="btn">${LOCALE === 'ar' ? 'تسوق' : 'Shop now'}</button></div>`, 'Restock announcements — 10 products are fully out.'],
        ['Split', `<div class="iwt" style="background:var(--surface-card);padding:var(--sp-lg)"><div>${Img(withImg[1].img, { ar: '16/9', alt: '' })}</div><div class="col"><h3 class="h-display" style="font-size:26px">${LOCALE === 'ar' ? 'الطبقات' : 'Layer your scent'}</h3><button class="btn btn--secondary">${LOCALE === 'ar' ? 'اعرف كيف' : 'Learn how'}</button></div></div>`, 'Educational promos.'],
        ['With countdown', `<div class="promoban" style="padding:var(--sp-xl)"><h3 class="h-display">${LOCALE === 'ar' ? 'ينتهي قريباً' : 'Ends soon'}</h3>${CountdownTimer()}</div>`, 'Time-boxed offers only — permanent countdowns destroy trust.']
      ]],

    ['SocialShare', 'Marketing', 'P3', 'Icon, Button', 4, 'Facebook, WhatsApp, Pinterest, email, copy link', () =>
      `<div class="share">${['WhatsApp', 'Facebook', 'Instagram', 'Copy'].map(s => `<button aria-label="Share on ${s}">${svg(s === 'Copy' ? 'check' : 'heart')}</button>`).join('')}</div>`, [
        ['Icons only', `<div class="share">${[1, 2, 3, 4].map(i => `<button aria-label="Share">${svg('heart')}</button>`).join('')}</div>`, 'Compact PDP row. Every button needs an aria-label.'],
        ['With labels', `<div class="row">${['WhatsApp', 'Copy link'].map(s => `<button class="btn btn--secondary btn--sm">${s}</button>`).join('')}</div>`, 'Higher click-through than bare icons.'],
        ['WhatsApp first', `<div class="row"><button class="btn btn--sm">${LOCALE === 'ar' ? 'شارك على واتساب' : 'Share on WhatsApp'}</button></div>`, 'Egypt-first ordering — WhatsApp is the dominant channel and the brand already uses it for support.'],
        ['Copy link', `<div class="promo" style="max-width:320px"><input class="input" value="siwafragrances.com/mawj" readonly><button class="btn btn--secondary" data-copy="siwafragrances.com/mawj">${LOCALE === 'ar' ? 'نسخ' : 'Copy'}</button></div>`, 'Most-used share action in practice.'],
        ['Native share', `<button class="btn btn--secondary btn--sm">${LOCALE === 'ar' ? 'مشاركة' : 'Share'}</button><p class="field__hint" style="margin-top:6px">Use <code>navigator.share()</code> on mobile and fall back to this row on desktop.</p>`, 'One button on mobile beats five.']
      ]]
  ];

  /* ============================ R4 ============================
     Added for the Shopify theme transplant (../siwa-theme/). Card is the
     base container the Phase 2 patterns (product-card, collection-card,
     feature-card, testimonial-card) compose. It was the one primitive in
     the theme brief with no existing library equivalent — the image
     container is already covered by `Image` above, so no rival was added.
     ============================================================ */

  const CardDemo = (styleClass, body, o = {}) =>
    `<div class="card ${styleClass}" style="max-width:260px">${o.wear ? '<span class="edge-wear"></span>' : ''}${body}</div>`;

  const cardBody = p => `
    <b style="font:400 var(--t-heading-md)/1.2 var(--font-display);color:var(--heading)">${esc(p.title)}</b>
    <span class="card__meta" style="font:400 var(--t-body-sm)/1.4 var(--font-ui);color:var(--text-secondary-aa);margin-top:4px">${money(p.price)}</span>`;

  const R4 = [
    ['Card', 'Primitives', 'P0', 'Typography, colour tokens, vintage layer', 4,
      'Base container behind product, collection, feature and testimonial cards — build before any Phase 2 pattern',
      () => `<div class="row" style="align-items:flex-start">
        ${CardDemo('card--flat', cardBody(pA()))}
        ${CardDemo('card--hairline', cardBody(pB()))}
      </div>`, [
        ['Flat tonal', CardDemo('card--flat', cardBody(pA())),
          'Default. Tonal elevation on Sailcloth — depth without a shadow, per DesignSystem §6.'],
        ['Hairline border', CardDemo('card--hairline', cardBody(pB())),
          'On a Sailcloth background where a flat card would disappear. Note the border is 1.71:1 — see the contrast callout.'],
        ['Hover lift', CardDemo('card--lift', cardBody(pA())),
          'Grids where the whole card is clickable. Rises on focus-within too, so keyboard users get the same cue.'],
        ['Vintage surface', CardDemo('card--vintage vintage-surface', cardBody(originals[0] || pA()), { wear: true }),
          'Heritage storytelling and Originals only. Never on an inspired-by product, never in nav or forms.'],
        ['Dark', `<div style="background:var(--surface-dark);padding:12px">${CardDemo('card--dark', cardBody(pB()))}</div>`,
          'Footer strips and dark sections. on-dark text clears 10.55:1.']
      ]]
  ];

  /* ============================ R5 ============================
     Phase 2 patterns for the theme transplant (../siwa-theme/).

     ProductCardLayout documents a DIFFERENT AXIS from ProductCard above.
     ProductCard shows the five *states* (default, inspired-by, sold out,
     on sale, wishlist). ProductCardLayout shows the five *layout styles*
     the theme exposes as a merchant setting. Same .pcard CSS, two axes —
     not a fork.

     CollectionCard and FeatureCard are genuinely new: the library had
     CollectionGrid (a grid, not a tile) and IconWithText (one of the
     five feature layouts).
     ============================================================ */

  /* Every style below is ProductCard with a `modifier` — one structure,
     six skins. Nothing here hand-rolls card markup. */
  const R5 = [
    ['ProductCardLayout', 'Product', 'P0', 'ProductCard, Card, Image, Badge', 8,
      'The card styles the theme exposes as a setting — a different axis from ProductCard\'s five states',
      () => `<div class="row" style="align-items:flex-start">${ProductCard(pA())}</div>`, [
        ['Minimal commercial', ProductCard(inspired[0] || pA()),
          'The 40 inspired-by products. UI Chrome only, reviews loud, one clear CTA. The default.'],
        ['Editorial — Originals', ProductCard(originals[0] || pA(), {
          modifier: 'pcard--editorial', titleAr: 'موج', cta: 'none' }),
          'Originals only. Arabic and Latin at equal optical weight — Arabic is not a subtitle.'],
        ['Compact grid', ProductCard(pB(), {
          modifier: 'pcard--compact', badges: false, notes: '',
          ctaLabel: t('add') }),
          '6-up grids. Quick-add appears on hover or focus — and is always visible on touch, where there is no hover.'],
        ['Feature hero', ProductCard(pA(), {
          modifier: 'pcard--hero', cta: 'none',
          bodyExtra: `<div class="pcard__ctas"><button class="btn">${t('add')}</button><button class="btn btn--tertiary">${t('shopAll')}</button></div>` }),
          'One product carrying a whole section. Excerpt, note pyramid and two CTAs.'],
        ['Feature — full bleed', ProductCard(pB(), { modifier: 'pcard--feature' }),
          'The 2026-08-13 client spec: full-bleed campaign photograph, serif title, roomier body. For cinematic rails.'],
        ['Vintage storytelling', ProductCard(originals[0] || pA(), {
          modifier: 'pcard--vintage vintage-surface', badges: false, cta: 'none',
          before: '<span class="edge-wear"></span>',
          bodyExtra: `<span class="pcard__accent-rule" style="--accent-color:var(--date-red)"></span>
            <span class="pcard__provenance">${LOCALE === 'ar' ? 'قُطّر في واحة سيوة' : 'Distilled in Siwa Oasis'}</span>` }),
          'Originals only. Sepia image, provenance stamp, ONE Cultural Accent rule. Never on an inspired-by product.']
      ]],

    ['CollectionCard', 'Content', 'P1', 'Card, Image, Typography', 5,
      'Single collection tile — the unit CollectionGrid arranges',
      () => `<div class="row" style="align-items:flex-start"><a class="ccard ccard--overlay" style="max-width:240px">${Img('coco-woods.jpg', { alt: '' })}<div class="ccard__body"><h3 class="ccard__title">${LOCALE === 'ar' ? 'الواحة' : 'The Oasis'}</h3></div></a></div>`, [
        ['Image + title overlay', `<a class="ccard ccard--overlay" style="max-width:220px"><div class="pimg" style="aspect-ratio:4/5">${Img('coco-woods.jpg', { alt: '' }).replace(/^<div class="pimg"[^>]*>|<\/div>$/g, '')}<span class="pimg__scrim" style="--scrim-opacity:.45"></span></div><div class="ccard__body"><h3 class="ccard__title">${LOCALE === 'ar' ? 'للرجال' : 'For Him'}</h3></div></a>`,
          'Dense grids where the photograph carries the meaning.'],
        ['Split image / text', `<a class="ccard ccard--split" style="max-width:220px">${Img('mawj.jpg', { alt: '' })}<div class="ccard__body"><h3 class="ccard__title">${LOCALE === 'ar' ? 'الأصليات' : 'Originals'}</h3><p class="ccard__meta">${digits(16)} ${LOCALE === 'ar' ? 'عطر' : 'fragrances'}</p></div></a>`,
          'When the title needs room and the count is worth stating.'],
        ['Minimal text', `<a class="ccard ccard--minimal" style="max-width:180px">${Img('pink-allure.jpg', { ar: '1/1', alt: '' })}<div class="ccard__body"><h3 class="ccard__title">${LOCALE === 'ar' ? 'الأكثر مبيعًا' : 'Best Sellers'}</h3><span class="btn btn--tertiary" style="padding-inline:0">${t('shopAll')} →</span></div></a>`,
          'Quiet rows on a busy page. No background, sits on the canvas.'],
        ['Cinematic wide', `<a class="ccard ccard--cinematic" style="max-width:420px"><div class="pimg" style="aspect-ratio:21/9">${Img('coco-woods-2.jpg', { alt: '' }).replace(/^<div class="pimg"[^>]*>|<\/div>$/g, '')}<span class="pimg__scrim" style="--scrim-opacity:.5"></span></div><div class="ccard__body"><h3 class="ccard__title">${LOCALE === 'ar' ? 'مجموعة الواحة' : 'The Oasis Collection'}</h3><p class="ccard__meta">${LOCALE === 'ar' ? 'ثمانية عطور من تراث سيوة' : 'Eight scents from Siwan heritage'}</p></div></a>`,
          'One collection as a full-width statement. Landscape photography only.'],
        ['Heritage tile', `<a class="ccard ccard--heritage vintage-surface" style="max-width:220px"><span class="edge-wear"></span><span class="ccard__rule" style="--accent-color:var(--palm-green)"></span><h3 class="ccard__title">${LOCALE === 'ar' ? 'الواحة' : 'The Oasis'}<span class="ccard__title-ar" lang="ar" dir="rtl">الواحة</span></h3><span class="btn btn--tertiary">${LOCALE === 'ar' ? 'اكتشف' : 'Explore'} →</span></a>`,
          'Genuine Siwan collections only. The embroidery rule takes one Cultural Accent colour.']
      ]],

    ['FeatureCard', 'Content', 'P1', 'IconWithText, Image, Typography', 6,
      'USPs, how-it-works steps and heritage blocks — five layouts, one component',
      () => USP(), [
        ['Icon + heading + body', `<div class="usp" style="grid-template-columns:repeat(2,1fr);max-width:420px">${USP().replace(/^<div class="usp"[^>]*>|<\/div>$/g, '')}</div>`,
          'Service promises. The existing USP tile — 14-day return, support, payment protection.'],
        ['Image left, text right', `<div class="iwt" style="max-width:520px;gap:var(--sp-lg)">${Img('mawj.jpg', { ar: '4/5', alt: '' })}<div class="fcard"><h3 class="fcard__heading">${LOCALE === 'ar' ? 'من الواحة' : 'From the Oasis'}</h3><p class="fcard__body">${LOCALE === 'ar' ? 'التمر والزيتون والملح.' : 'Dates, olives and salt.'}</p></div></div>`,
          'Alternating rows down a story page. Reverses with iwt--rev.'],
        ['Text over image', `<div class="fcard fcard--overlay" style="max-width:420px"><div class="pimg" style="aspect-ratio:16/9">${Img('coco-woods.jpg', { alt: '' }).replace(/^<div class="pimg"[^>]*>|<\/div>$/g, '')}<span class="pimg__scrim" style="--scrim-opacity:.5"></span></div><div class="fcard__body-wrap"><h3 class="fcard__heading">${LOCALE === 'ar' ? 'قلعة شالي' : 'Shali Fortress'}</h3></div></div>`,
          'Mid-page statements. Check text contrast against the darkest point of the scrim.'],
        ['Numbered step', `<div class="fcard fcard--step" style="max-width:280px"><span class="fcard__num">${digits('01')}</span><div class="fcard"><h3 class="fcard__heading">${LOCALE === 'ar' ? 'اختر عطرك' : 'Choose your scent'}</h3><p class="fcard__body">${LOCALE === 'ar' ? 'ابدأ بالاختبار.' : 'Start with the quiz.'}</p></div></div>`,
          'How-it-works and layering flows. The number is decorative — aria-hidden.'],
        ['Heritage block', `<div class="fcard fcard--heritage vintage-surface" style="max-width:320px;--accent-color:var(--date-red)"><span class="edge-wear"></span><span class="fcard__rule"></span><h3 class="fcard__heading">${LOCALE === 'ar' ? 'الواحة' : 'The Oasis'}<span class="fcard__heading-ar" lang="ar" dir="rtl">الواحة</span></h3><p class="fcard__body">${LOCALE === 'ar' ? 'أمازيغ · سيوي' : 'Amazigh identity, the Siwi language.'}</p><span class="pcard__provenance">${LOCALE === 'ar' ? 'من واحة سيوة' : 'Sourced from Siwa Oasis'}</span></div>`,
          'Genuine Siwan content only. Arabic and Latin headings at equal optical weight.']
      ]]
  ];

  /* ============================ R6 ============================
     Phase 3 modules for the theme transplant (../siwa-theme/).

     ProductGridLayout documents the five grid styles the theme exposes
     as a setting — a different axis from ProductGrid above, which shows
     the grid's states (loading, empty, paginated). Same .pgrid CSS.

     PriceContrast and HeritageBlock are new views: the library had
     InspiredByBlock (one inline treatment) and ProductStoryBlock (a
     per-product story), not the five-variant modules the brief needs.
     ============================================================ */

  const gridDemo = (cls, n = 4, cols = 4) =>
    `<div class="pgrid ${cls}" style="--grid-cols-desktop:${cols}">${withImg.slice(0, n).map(p => ProductCard(p)).join('')}</div>`;

  const R6 = [
    ['ProductGridLayout', 'Product', 'P0', 'ProductGrid, ProductCard', 6,
      'The five grid styles the theme exposes as a setting — a different axis from ProductGrid\'s states',
      () => gridDemo('', 4), [
        ['Standard 4-up', gridDemo('', 4, 4),
          'Default. 4 / 3 / 2 / 1 at 1200 / 900 / 480. Collection pages and featured rows.'],
        ['Compact 6-up', gridDemo('pgrid--compact', 6, 6),
          'Large catalogues where scanning beats dwelling. Pairs with the compact card.'],
        ['Masonry', gridDemo('pgrid--masonry', 4, 3),
          'Progressive enhancement — falls back to CSS columns, which reorders visually. Never use where rank matters.'],
        ['Carousel', `<div class="carousel carousel--cards">${withImg.slice(0, 5).map(p => ProductCard(p)).join('')}</div>
          <div class="carousel__nav"><button class="carousel__btn">‹</button><button class="carousel__btn">›</button></div>`,
          'One row, scroll-snap. "You may also like" and recently viewed. Arrows disable at the ends.'],
        ['Tabbed', `<div class="tabs"><div class="tabs__list" role="tablist">
            <button class="tabs__tab" role="tab" aria-selected="true">${LOCALE === 'ar' ? 'الأصليات' : 'Originals'}</button>
            <button class="tabs__tab" role="tab" aria-selected="false">${LOCALE === 'ar' ? 'مستوحاة' : 'Inspired-by'}</button>
          </div>${gridDemo('', 3, 3)}</div>`,
          'Two or three collections in one slot. Real ARIA tabs with arrow-key navigation.']
      ]],

    ['PriceContrast', 'Product', 'P1', 'InspiredByBlock, Typography', 5,
      'Inspired-by comparison — ships DEFAULT OFF and without the retail figure, pending legal counsel',
      () => InspiredByBlock(inspired[0] || pA()), [
        ['Inline (PDP)', `<p class="inspired" style="max-width:420px"><span class="inspired__label">${t('inspiredBy')}</span><span class="inspired__house">${esc((inspired[0] || {}).house || '')}</span></p>`,
          'Default. One line under the price. No number until counsel clears it.'],
        ['Card callout', `<span class="inspired inspired--callout"><span class="inspired__label">${t('inspiredBy')}</span><span class="inspired__house">${esc((inspired[0] || {}).house || '')}</span></span>`,
          'On a product card, where a full line would crowd the title.'],
        ['Comparison table', `<table class="ctable" style="max-width:420px"><thead><tr><th></th><th>${LOCALE === 'ar' ? 'الأصلي' : 'Original'}</th><th>Siwa</th></tr></thead><tbody><tr><th scope="row">${LOCALE === 'ar' ? 'العطر' : 'Fragrance'}</th><td>${esc((inspired[0] || {}).house || '')}</td><td>${esc((inspired[0] || {}).title || '')}</td></tr></tbody></table>`,
          'A dedicated comparison surface. The price row appears only if the retail setting is on.'],
        ['Storytelling block', `<div class="inspired inspired--story" style="max-width:420px"><p>${LOCALE === 'ar' ? 'إن كنت تحب الأصل، فستتعرف على هذا.' : 'If you love the original, you will recognise this one.'}</p></div>`,
          'Makes the case in prose rather than numbers. Works with no price data at all.'],
        ['Minimal footnote', `<p class="inspired inspired--footnote">${LOCALE === 'ar' ? 'مقارنة بـ' : 'Compare to'} ${esc((inspired[0] || {}).house || '')}</p>`,
          'Small print at the foot of the PDP. The quietest option — and the safest.']
      ]],

    ['HeritageBlock', 'Content', 'P1', 'FeatureCard, Image, Cultural Accent', 8,
      'Siwan storytelling — the ONE place the Cultural Accent Set belongs',
      () => `<div class="iwt" style="max-width:520px">${Img('coco-woods-2.jpg', { ar: '4/5', alt: '' })}<div class="story"><span class="heritage__rule" style="--accent-color:var(--palm-green)"></span><h2 class="fcard__heading">${LOCALE === 'ar' ? 'الواحة' : 'The Oasis'}</h2></div></div>`, [
        ['Text + image split', `<div class="iwt" style="max-width:460px;gap:var(--sp-lg)">${Img('coco-woods-2.jpg', { ar: '4/5', alt: '' })}<div class="story"><span class="heritage__rule" style="--accent-color:var(--palm-green)"></span><h2 class="fcard__heading">${LOCALE === 'ar' ? 'الواحة' : 'The Oasis'}<span class="fcard__heading-ar" lang="ar" dir="rtl">الواحة</span></h2><p>${LOCALE === 'ar' ? 'التمر والزيتون والملح.' : 'Dates, olives and salt.'}</p></div></div>`,
          'The workhorse. Alternate the side down a story page.'],
        ['Pull quote', `<figure class="story vintage-surface" style="margin:0;max-width:420px"><span class="edge-wear"></span><span class="heritage__rule" style="--accent-color:var(--date-red)"></span><blockquote style="margin:0"><p class="story__quote">${LOCALE === 'ar' ? 'واحة مصرية خلابة.' : 'A breathtaking Egyptian oasis.'}</p></blockquote></figure>`,
          'One sentence carrying a whole screen. Vintage surface optional.'],
        ['Timeline / chapters', `<div class="timeline" style="max-width:420px">${[1, 2].map(n => `<div class="timeline__item"><div class="timeline__marker"><span class="timeline__num">${digits('0' + n)}</span><span class="timeline__line"></span></div><div class="story"><h3 class="fcard__heading">${LOCALE === 'ar' ? 'الفصل' : 'Chapter'} ${digits(n)}</h3></div></div>`).join('')}</div>`,
          'Chronology — the oasis, the ingredients, the making. Chapters are blocks, never a fixed loop.'],
        ['Artisan attribution', `<div class="artisan__grid" style="max-width:420px"><figure class="artisan" style="margin:0">${Img('mawj-2.jpg', { ar: '3/4', alt: '' })}<figcaption><p class="artisan__name">${LOCALE === 'ar' ? 'اسم الحرفية' : 'Artisan name'}</p><span class="artisan__role">${LOCALE === 'ar' ? 'تطريز' : 'Embroidery'}</span></figcaption></figure></div>`,
          'The Kahina model. Publishes a real name and face — consent is a prerequisite, not a nicety.'],
        ['Full-width cinematic', `<div class="heritage heritage--cinematic" style="max-width:520px"><div class="pimg" style="aspect-ratio:21/9">${Img('coco-woods.jpg', { alt: '' }).replace(/^<div class="pimg"[^>]*>|<\/div>$/g, '')}<span class="pimg__scrim" style="--scrim-opacity:.5"></span></div><div class="heritage__body"><span class="heritage__rule" style="--accent-color:var(--date-yellow)"></span><p class="story__quote">${LOCALE === 'ar' ? 'قلعة شالي' : 'Shali Fortress'}</p></div></div>`,
          'Landscape photography at full bleed. Check text contrast against the darkest part of the image.']
      ]]
  ];

  /* ---- merge, order by spec section ---- */
  const CAT_ORDER = ['Primitives', 'Product', 'Navigation', 'Commerce', 'Discovery', 'Content', 'Social Proof', 'Layout', 'Marketing'];
  R2.concat(R3, R4, R5, R6).forEach(entry => {
    const [name, , , , , , , vars] = entry;
    if (vars) VARIANTS[name] = () => vars;
    R.push(entry.slice(0, 7));
  });
  R.sort((a, b) => CAT_ORDER.indexOf(a[1]) - CAT_ORDER.indexOf(b[1]));

  /* ============================ FOUNDATIONS ============================ */

  const SWATCH = [
    ['UI Chrome', [['--primary','#b18044','Unforgettably Gold'],['--primary-alt','#e1b160','Cameleer'],
      ['--canvas','#f7f5ee','Near White'],['--surface-card','#eae0c4','Sailcloth'],['--hairline','#ccbca0','Gobi Desert'],
      ['--surface-hover','#e4b68a','Desert Dust'],['--ink','#212012','Black Mesa'],['--heading','#50251c','Torrefacto Roast'],
      ['--text-secondary','#a38f7e','Zinc Blend'],['--link','#8b5f4c','Spicy Mix'],['--success','#987d69','Dusty Canyon'],
      ['--tag','#b09b7e','Incense'],['--surface-dark','#212012','Black Mesa'],['--on-dark','#d4cfc2','On Dark']]],
    ['Cultural Accent — Siwan embroidery · never in core UI', [
      ['--palm-green','#4f5734','Palm Green — date frond'],['--date-red','#8f3a2e','Date Red — ripe fruit'],
      ['--date-yellow','#977f3a','Date Yellow — golden fruit'],['--desert-brown','#865431','Desert Brown — open sand'],
      ['--embroidery-black','#212012','Embroidery Black — shared with ink']]]
  ];

  const TYPE_ROWS = [
    ['display-xl','56px / 400 / 1.15','var(--font-display)',56],['display-lg','36px / 400 / 1.2','var(--font-display)',36],
    ['heading-lg','22px / 500 / 1.3','var(--font-ui)',22],['heading-md','17px / 500 / 1.35','var(--font-ui)',17],
    ['body-md','16px / 400 / 1.6','var(--font-ui)',16],['body-sm','13px / 400 / 1.5','var(--font-ui)',13],
    ['caption','11px / 500 / 1.4','var(--font-ui)',11]
  ];

  const A11Y = [
    ['button-primary','#fff on --primary','3.48:1','fail','Shipped as ink-on-gold 4.72:1 instead'],
    ['button-primary (fixed)','--ink on --primary','4.72:1','pass','Library default'],
    ['badge-in-stock (spec)','#fff on --success','3.84:1','fail','Shipped on darkened --success-aa'],
    ['badge-in-stock (fixed)','#fff on --success-aa','5.31:1','pass','Library default'],
    ['vintage body (spec)','--text-secondary on Sailcloth','2.35:1','fail','Fails before grain is added'],
    ['vintage body (fixed)','--text-secondary-aa on Sailcloth','4.62:1','pass','Library default'],
    ['scent-tag','--heading on --tag','4.83:1','pass','As specified'],
    ['badge-authentic','#fff on --date-red','7.47:1','pass','As specified'],
    ['badge-sale','--heading on --sale','6.57:1','pass','As specified'],
    ['footer','--on-dark on --surface-dark','10.55:1','pass','As specified']
  ];

  /* ============================ RENDER ============================ */

  function foundations() {
    return `<section class="cmp" id="Foundations">
      <div class="cmp__head"><h2>Foundations</h2></div>
      <p class="cmp__note">Tokens are lifted verbatim from <code>Planning/DesignSystem.md</code>. Two palettes with two jobs — UI Chrome carries the interface, Cultural Accent carries heritage, and they never mix.</p>
      <div class="demo">
        ${SWATCH.map(([title, rows]) => `<div class="col"><span class="lbl">${title}</span>
          <div class="swatches">${rows.map(([tok, hex, name]) => `
            <div class="sw"><div class="sw__chip" style="background:${hex}"></div>
              <div class="sw__meta"><b>${name}</b><code>${tok}</code><span>${hex}</span></div></div>`).join('')}</div></div>`).join('')}
        <div class="col"><span class="lbl">Type scale — Latin & Arabic co-equal</span>
          ${TYPE_ROWS.map(([n, spec, fam, px]) => `<div class="typerow"><code>${n}<br>${spec}</code>
            <div><span style="font-family:${fam};font-size:${px}px;line-height:1.25;color:var(--heading)">Explore your Persona</span>
            <span style="font-family:var(--font-ar-display);font-size:${px}px;line-height:1.35;color:var(--heading);margin-inline-start:16px" lang="ar" dir="rtl">اكتشف شخصيتك</span></div></div>`).join('')}</div>
        <div class="col"><span class="lbl">Spacing · radius · elevation</span>
          <div class="row">${[4,8,12,16,24,32,72].map(n => `<div style="text-align:center"><div style="width:${n}px;height:24px;background:var(--primary);border-radius:2px"></div><code style="font-size:11px">${n}</code></div>`).join('')}</div>
          <div class="row" style="margin-top:12px">
            <div style="width:96px;height:56px;background:var(--surface-card);border:1px solid var(--hairline);border-radius:0;display:grid;place-items:center"><code style="font-size:11px">0</code></div>
            <div style="width:96px;height:56px;background:var(--surface-card);border:1px solid var(--hairline);border-radius:10px;display:grid;place-items:center"><code style="font-size:11px">10px</code></div>
            <div style="width:96px;height:56px;background:var(--surface-card);border:1px solid var(--hairline);border-radius:9999px;display:grid;place-items:center"><code style="font-size:11px">full</code></div>
          </div></div>
        <div class="col"><span class="lbl">Vintage treatment layer — §10, token-only</span>
          <div class="vintage-surface" style="max-width:520px"><span class="edge-wear"></span>
            <span class="stamp">Distilled in Siwa · Batch 0114</span>
            <p style="font:400 28px/1.2 var(--font-display);color:var(--heading);margin:12px 0 8px">A riddle in the sands</p>
            <p style="color:var(--text-secondary-aa);margin:0">Paper grain 4% · corner vignette 12% · edge-wear rule. No new hex — every effect resolves to an existing token.</p></div></div>
        <div class="col"><span class="lbl">Contrast audit — measured, not assumed</span>
          <table class="a11y"><thead><tr><th>Pair</th><th>Colours</th><th>Ratio</th><th>AA</th><th>Resolution</th></tr></thead>
            <tbody>${A11Y.map(([a, b, c, d, e]) => `<tr><td>${a}</td><td><code>${b}</code></td><td>${c}</td><td class="${d}">${d.toUpperCase()}</td><td>${e}</td></tr>`).join('')}</tbody></table>
          <p class="field__hint">Five specified pairs miss the 4.5:1 floor. This library ships corrected tokens and documents both, rather than silently inheriting the failure.</p></div>
      </div></section>`;
  }

  // Wide variants get fewer columns so they stay legible.
  const WIDE = { ProductCard: 3, ProductGrid: 1, Header: 1, Footer: 1, ReviewList: 1, FilterBar: 1,
                 BundleBuilder: 1, ScentQuiz: 2, QuizResults: 2, ImageWithText: 1, CollectionGrid: 1,
                 HeroSection: 1, FeaturedCollection: 1, ComparisonTable: 1, GiftMessage: 1,
                 Search: 2, CartDrawer: 2, LayeringSuggestions: 2, Wishlist: 2, NotePyramid: 3,
                 ReviewSummary: 2, VariantSelector: 3, IntensityScale: 3, InspiredByBlock: 2,
                 ProductStoryBlock: 2, PersonaBlock: 3, VideoEmbed: 3, ReferralWidget: 2,
                 // expansion
                 RecommendedProducts: 1, MobileNavDrawer: 3, Pagination: 2, Breadcrumbs: 2,
                 CartLineItem: 1, ShippingEstimator: 2, DiscountCode: 2, CheckoutButton: 3,
                 PersonaCard: 1, RecentlyViewed: 1, Testimonial: 2, IconWithText: 1,
                 Accordion: 2, Marquee: 1, Review: 2, ReviewForm: 2, TrustBadge: 3,
                 Container: 2, Section: 2, Modal: 2, Drawer: 2, PromoBanner: 1,
                 NewsletterSignup: 2, AnnouncementBar: 1, Image: 4, Icon: 3, Heading: 3, Text: 3 };

  function variantBlock(name) {
    const fn = VARIANTS[name];
    if (!fn) return '';
    const cols = WIDE[name] || 5;
    const cls = cols === 1 ? '' : cols === 2 ? 'vars--2' : cols === 3 ? 'vars--3' : 'vars--5';
    return `<div style="margin-top:var(--sp-lg)">
      <p class="lbl" style="margin-bottom:var(--sp-xs)">Five variants</p>
      <div class="vars ${cls}">${fn().map(([label, html, doc], i) =>
        `<div class="var"><span class="var__n"><i>${i + 1}</i>${esc(label)}</span><div class="var__b">${html}</div>${
          doc ? `<span class="var__doc"><b>When to use</b><span>${esc(doc)}</span></span>` : ''}</div>`).join('')}</div>
    </div>`;
  }

  function render() {
    document.documentElement.lang = LOCALE;
    document.documentElement.dir = LOCALE === 'ar' ? 'rtl' : 'ltr';

    // Gallery-only. Consumer pages (homepage/, homepage-phlur/) load this
    // file for its renderers and have no #content mount, but they do reuse
    // the .langtog markup — so the global [data-loc] handler reaches here
    // and used to throw on their locale switch. Same guard as the boot call.
    const mount = document.getElementById('content');
    if (!mount) return;

    mount.innerHTML =
      foundations() + R.map(([name, cat, pri, deps, hrs, note, fn]) => `
        <section class="cmp" id="${name}">
          <div class="cmp__head"><h2>${name}</h2><span class="p ${pri.toLowerCase()}">${pri}</span></div>
          <div class="cmp__meta"><span><b>Category</b> ${cat}</span><span><b>Dependencies</b> ${esc(deps)}</span><span><b>Est.</b> ${hrs} h</span></div>
          <p class="cmp__note">${esc(note)}</p>
          <div class="demo">${fn()}</div>
          ${variantBlock(name)}
        </section>`).join('');

    document.getElementById('drawerHost').innerHTML = CartDrawer();
    buildNav();
    renderCart();
    startCountdown();
    document.querySelectorAll('[data-loc]').forEach(b => b.setAttribute('aria-pressed', b.dataset.loc === LOCALE));
  }

  function buildNav() {
    const groups = {};
    R.forEach(([name, cat, pri]) => (groups[cat] = groups[cat] || []).push([name, pri]));
    document.getElementById('nav').innerHTML =
      `<div class="side__grp"><h4>Overview</h4><ul><li><a href="#Foundations">Foundations</a></li></ul></div>` +
      Object.entries(groups).map(([cat, items]) => `
        <div class="side__grp"><h4>${cat}</h4><ul>${items.map(([n, p]) =>
          `<li><a href="#${n}" data-nav="${n}">${n}<span class="p ${p.toLowerCase()}">${p}</span></a></li>`).join('')}</ul></div>`).join('');
  }

  /* ---------- countdown ---------- */
  let cdTimer;
  function startCountdown() {
    clearInterval(cdTimer);
    const target = new Date('2026-08-31T23:59:59Z').getTime();
    const tick = () => {
      const el = document.getElementById('cd'); if (!el) return;
      let d = Math.max(0, target - new Date().getTime()) / 1000;
      const days = Math.floor(d / 86400); d -= days * 86400;
      const hrs = Math.floor(d / 3600); d -= hrs * 3600;
      const min = Math.floor(d / 60); const sec = Math.floor(d - min * 60);
      const set = (k, v) => { const n = el.querySelector(`[data-cd="${k}"]`); if (n) n.textContent = digits(String(v).padStart(2, '0')); };
      set('days', days); set('hrs', hrs); set('min', min); set('sec', sec);
    };
    tick(); cdTimer = setInterval(tick, 1000);
  }

  /* ---------- toast ---------- */
  let toastT;
  function toast(msg) {
    // #toast only exists in the gallery pages. Consumer pages compose this
    // file for its renderers and supply their own status surface, so a
    // missing host is a no-op, not a throw.
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg; el.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('show'), 1800);
  }

  /* ---------- cart drawer open/close + focus trap ---------- */
  let lastFocus = null;
  function openCart() {
    lastFocus = document.activeElement;
    document.querySelector('.drawer').classList.add('open');
    document.querySelector('.drawer-scrim').classList.add('open');
    document.querySelector('.drawer').focus();
    document.addEventListener('keydown', trap);
  }
  function closeCart() {
    document.querySelector('.drawer').classList.remove('open');
    document.querySelector('.drawer-scrim').classList.remove('open');
    document.removeEventListener('keydown', trap);
    if (lastFocus) lastFocus.focus();
  }
  function trap(e) {
    if (e.key === 'Escape') return closeCart();
    if (e.key !== 'Tab') return;
    const f = document.querySelector('.drawer').querySelectorAll('button, [href], input, select, textarea');
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ---------- lightbox ---------- */
  function lightbox(src) {
    const prev = document.activeElement;
    const w = document.createElement('div');
    w.className = 'drawer-scrim open';
    w.style.cssText += 'display:grid;place-items:center;padding:32px';
    w.innerHTML = `<img src="${src}" alt="" style="max-width:min(90vw,700px);max-height:88vh;border-radius:10px">`;
    w.tabIndex = -1;
    document.body.appendChild(w); w.focus();
    const kill = () => { w.remove(); document.removeEventListener('keydown', k); if (prev) prev.focus(); };
    const k = e => { if (e.key === 'Escape') kill(); };
    w.addEventListener('click', kill);
    document.addEventListener('keydown', k);
  }

  /* ---------- search ---------- */
  function doSearch(q) {
    const box = document.getElementById('searchResults');
    if (!box) return;
    q = q.trim().toLowerCase();
    if (!q) { box.hidden = true; return; }
    const hits = P.filter(p =>
      p.title.toLowerCase().includes(q) ||
      (p.house || '').toLowerCase().includes(q) ||
      JSON.stringify(p.notes).toLowerCase().includes(q) ||
      (p.body || '').toLowerCase().includes(q)).slice(0, 6);
    box.hidden = false;
    box.innerHTML = hits.length
      ? hits.map(p => `<button class="search__item" role="option" data-goto="${p.handle}">
          ${p.img ? `<img src="${IMG}${p.img}" alt="">` : '<span style="width:40px"></span>'}
          <span><b style="display:block;font-weight:500">${esc(p.title)}</b>
          <small style="color:var(--text-secondary-aa)">${esc(p.house ? t('inspiredBy') + ' ' + p.house : 'Siwa original')}</small></span>
          <span class="price">${money(p.min)}</span></button>`).join('')
      : `<p class="search__empty">${LOCALE === 'ar' ? 'لا نتائج' : 'No matches'} — "${esc(q)}"</p>`;
    document.getElementById('siwaSearch').setAttribute('aria-expanded', 'true');
  }

  /* ---------- global events ----------
     These drive the gallery's own demonstrations — add-to-cart, wishlist,
     lightbox, chips. A page that owns those behaviours itself sets
     window.SIWA_DEMO_EVENTS = false before loading the library, so the two
     do not both answer the same click. */
  const DEMO = window.SIWA_DEMO_EVENTS !== false;

  document.addEventListener('click', e => {
    if (!DEMO) return;
    const el = s => e.target.closest(s);

    if (el('[data-opencart]')) { openCart(); return; }
    if (el('[data-closecart]')) { closeCart(); return; }
    if (el('[data-seed]')) { addToCart('mawj'); addToCart('coco-woods'); toast('2 items added'); return; }

    const atc = el('[data-atc]');
    if (atc) {
      const h = atc.dataset.atc, label = atc.textContent;
      atc.dataset.state = 'loading'; atc.innerHTML = '<span class="spinner"></span> ' + t('adding');
      setTimeout(() => {
        addToCart(h); atc.dataset.state = 'success'; atc.innerHTML = t('added');
        setTimeout(() => { atc.dataset.state = 'idle'; atc.textContent = label; }, 1400);
      }, 650);
      return;
    }

    const lb = el('[data-lightbox]'); if (lb) { lightbox(lb.dataset.lightbox); return; }

    const gal = el('[data-gal]');
    if (gal) {
      document.querySelectorAll('[data-gal]').forEach(b => b.setAttribute('aria-current', 'false'));
      gal.setAttribute('aria-current', 'true');
      document.querySelector('#galMain img').src = gal.dataset.gal;
      return;
    }

    const w = el('[data-wish]');
    if (w) {
      const on = w.getAttribute('aria-pressed') === 'true';
      w.setAttribute('aria-pressed', String(!on));
      const c = document.getElementById('wishCount');
      if (c) c.textContent = digits(document.querySelectorAll('[data-wish][aria-pressed="true"]').length);
      try { localStorage.setItem('siwa_wish_' + w.dataset.wish, String(!on)); } catch (_) {}
      toast(!on ? 'Saved to wishlist' : 'Removed');
      return;
    }

    const chip = el('.chip');
    if (chip) { chip.setAttribute('aria-pressed', chip.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'); return; }

    const si = el('[data-starinput] button');
    if (si) {
      const v = +si.dataset.v, grp = si.closest('[data-starinput]');
      grp.querySelectorAll('button').forEach((b, i) => {
        b.setAttribute('aria-checked', String(i + 1 === v));
        b.querySelector('svg').setAttribute('class', i < v ? 'star-full' : 'star-empty');
      });
      return;
    }

    const q = el('[data-quiz]');
    if (q) {
      const box = document.getElementById('quizBox');
      if (q.dataset.quiz === 'next') {
        if (quizStep < QUIZ.length - 1) { quizStep++; box.outerHTML = ScentQuiz(); }
        else { quizStep = 0; document.querySelector('#ScentQuiz .demo').innerHTML = QuizResults(); toast('Quiz complete'); }
      } else if (q.dataset.quiz === 'back' && quizStep > 0) { quizStep--; box.outerHTML = ScentQuiz(); }
      else if (q.dataset.quiz === 'restart') { quizStep = 0; document.querySelector('#ScentQuiz .demo').innerHTML = `<div style="max-width:640px">${ScentQuiz()}</div>`; }
      return;
    }

    const cp = el('[data-copy]');
    if (cp) { navigator.clipboard?.writeText(cp.dataset.copy); toast('Code copied'); return; }

    const qb = el('[data-q]');
    if (qb) {
      const line = CART.find(l => l.handle === qb.dataset.h);
      if (line) { line.qty += +qb.dataset.q; if (line.qty <= 0) CART.splice(CART.indexOf(line), 1); renderCart(); }
      return;
    }

    const go = el('[data-goto]');
    if (go) { document.getElementById('searchResults').hidden = true; toast('Would open ' + go.dataset.goto); return; }

    const loc = el('[data-loc]');
    if (loc) { LOCALE = loc.dataset.loc; render(); toast(LOCALE === 'ar' ? 'تم التبديل إلى العربية' : 'Switched to English'); return; }

    const play = el('.vembed button');
    if (play) { toast('Facade: iframe would mount here'); return; }
  });

  document.addEventListener('change', e => {
    if (!DEMO) return;
    if (e.target.id === 'giftOn') document.getElementById('giftFields').hidden = !e.target.checked;

    if (e.target.matches('[data-bundle]')) {
      const picked = [...document.querySelectorAll('[data-bundle]:checked')];
      if (picked.length > 3) { e.target.checked = false; toast('Pick three'); return; }
      const slots = document.querySelectorAll('#bundleSlots .bundle__slot');
      slots.forEach((s, i) => {
        const p = picked[i] ? byHandle(picked[i].dataset.bundle) : null;
        s.className = 'bundle__slot' + (p ? ' filled' : '');
        s.innerHTML = p ? (p.img ? `<img src="${IMG}${p.img}" alt="${esc(p.title)}">` : `<span>${esc(p.title.slice(0, 8))}</span>`) : digits(i + 1);
      });
      document.getElementById('bundleCount').textContent = `${digits(picked.length)} / ${digits(3)}`;
      document.getElementById('bundleCta').disabled = picked.length !== 3;
    }
  });

  document.addEventListener('input', e => {
    if (!DEMO) return;
    if (e.target.id === 'siwaSearch') doSearch(e.target.value);

    // GiftMessage — live preview on the enclosed card
    if (['gTo', 'gFrom', 'gMsg'].includes(e.target.id)) {
      const v = e.target.value;
      if (e.target.id === 'gTo') document.getElementById('gpTo').textContent = v || '—';
      if (e.target.id === 'gFrom') document.getElementById('gpFrom').textContent = v || '—';
      if (e.target.id === 'gMsg') {
        const m = document.getElementById('gpMsg');
        m.textContent = v || (LOCALE === 'ar'
          ? 'ستظهر رسالتك هنا، مطبوعة على بطاقة مغلّفة داخل الصندوق.'
          : 'Your message appears here, printed on a card enclosed in the box.');
        m.classList.toggle('placeholder', !v);
        const c = document.getElementById('gCount');
        if (c) c.textContent = `${digits(v.length)} / ${digits(200)}`;
        const meter = document.getElementById('gMeter');
        if (meter) meter.style.width = (v.length / 200) * 100 + '%';
      }
    }
    if (e.target.id === 'libFilter') {
      const q = e.target.value.toLowerCase();
      document.querySelectorAll('#nav a[data-nav]').forEach(a => {
        a.parentElement.style.display = a.dataset.nav.toLowerCase().includes(q) ? '' : 'none';
      });
    }
  });

  document.addEventListener('keydown', e => {
    if (!DEMO) return;
    if (e.target.id === 'siwaSearch' && e.key === 'Escape') {
      document.getElementById('searchResults').hidden = true;
      e.target.setAttribute('aria-expanded', 'false');
    }
  });

  /* ---------- scroll spy ---------- */
  function spy() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        document.querySelectorAll('#nav a').forEach(a => a.classList.remove('active'));
        const a = document.querySelector(`#nav a[href="#${en.target.id}"]`);
        if (a) a.classList.add('active');
      });
    }, { rootMargin: '-10% 0px -75% 0px' });
    document.querySelectorAll('.cmp').forEach(s => io.observe(s));
  }

  /* Public API — sections.js and feature-docs compose these, never fork them. */
  window.SIWA = {
    render, spy, R, P, VARIANTS,
    get locale() { return LOCALE; },
    setLocale(l) { if (T[l]) LOCALE = l; },   // unknown values are ignored, not adopted
    helpers: { t, digits, money, esc, svg, byHandle, withImg, withNotes, inspired, originals, layering, monogram },
    ui: {
      Stars, StarsInput, Badge, Price, ProductImage, ProductCard, ProductGrid, SkeletonCard,
      VariantSelector, NotePyramid, IntensityScale, InspiredByBlock, ProductStoryBlock, PersonaBlock,
      AddToCartButton, CartDrawer, Header, Footer, LanguageToggle, FilterBar, Search,
      ReviewSummary, ReviewList, ReviewCard, ScentQuiz, QuizResults, ComparisonTable,
      HeroSection, ImageWithText, CollectionGrid, FeaturedCollection, VideoEmbed,
      LayeringSuggestions, BundleBuilder, Wishlist, GiftMessage, GiftCard, ReferralWidget, CountdownTimer,
      Field, Chip, Sel, Check, Radio, IconGrid, Img, Crumbs, Pager, MobileNav,
      Qty, LineItem, Ship, Accordion, Marquee, Quote, USP, Trust, PersonaCards, Modal
    }
  };

  // Only auto-render the component gallery when its mount point exists.
  if (document.getElementById('content')) { render(); spy(); }
  document.dispatchEvent(new CustomEvent('siwa:ready'));
})();
