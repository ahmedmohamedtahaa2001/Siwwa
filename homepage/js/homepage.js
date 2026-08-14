/* ============================================================
   SIWA — HOMEPAGE RENDERER
   ------------------------------------------------------------
   Behaviour only. Every customer-facing string, price, URL, product
   reference and colour comes from js/config.js, the real catalogue in
   ../component-library/js/data.js, or the design tokens — never from
   this file. If you find yourself typing a sentence in here, it belongs
   in config.js.

   MOTION follows the epic-design depth model: every animated element is
   assigned a depth 0–5, only transform / opacity / filter / clip-path are
   animated, parallax runs off a single rAF loop, and everything is
   suppressed wholesale by the prefers-reduced-motion rule in tokens.css
   plus the pointer:coarse check in initMotion().
   ============================================================ */
(() => {
  'use strict';

  const C = window.SIWA_HOME;
  const CATALOGUE = window.SIWA_PRODUCTS || [];

  if (!C) { console.error('[siwa] config.js did not load'); return; }
  if (!CATALOGUE.length) console.warn('[siwa] catalogue empty — product sections will be sparse');

  /* ══════════════════════ STATE ══════════════════════ */

  const LS = {
    locale: 'siwa:locale', wishlist: 'siwa:wishlist', cart: 'siwa:cart', gift: 'siwa:gift'
  };

  const store = {
    get(k, f) { try { const v = localStorage.getItem(k); return v == null ? f : JSON.parse(v); } catch { return f; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* private mode */ } }
  };

  let LOCALE   = store.get(LS.locale, null) || C.defaultLocale;
  let WISHLIST = new Set(store.get(LS.wishlist, []));      // C-05, rehydrated on load
  let CART     = store.get(LS.cart, []);
  let GIFT     = store.get(LS.gift, { on: false, note: '', hidePrices: false });   // C-04

  const UI = {
    moodFamily: null, moodRegister: null, moodExpanded: false,
    quizStep: -1, quizAnswers: {}, quizResult: null,
    setTab: 'bundle', bundle: [], reviewSort: 'helpful'
  };

  /* The component library. The product card is ITS component — this page
     composes it and supplies only what config.js owns (copy, imagery,
     money formatting). See component-library/js/library.js. The library's
     own demo click handlers are switched off in index.html, because this
     page answers those clicks itself. */
  const LIB = (window.SIWA || {}).ui || {};

  const isRTL = () => LOCALE === 'ar';

  /* ══════════════════════ HELPERS ══════════════════════ */

  const esc = s => String(s ?? '').replace(/[&<>"']/g,
    c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /** Resolve a bilingual value. Accepts {en,ar}, a plain string, or an array. */
  const L = v => (v && typeof v === 'object' && !Array.isArray(v) && ('en' in v || 'ar' in v))
    ? (v[LOCALE] ?? v.en ?? '') : v;

  const AR_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

  /** Arabic-Indic numerals in AR, Latin in EN, including group/decimal marks. */
  const digits = s => isRTL()
    ? String(s).replace(/,/g, '٬').replace(/\./g, '٫').replace(/\d/g, d => AR_DIGITS[+d])
    : String(s);

  const num = n => digits(Number(n).toLocaleString('en-US'));
  const money = n => `${num(Math.round(n))} ${isRTL() ? C.currency.ar : C.currency.en}`;
  const t = k => L(C.ui[k]);
  const arrow = () => isRTL() ? '←' : '→';

  const byHandle = h => CATALOGUE.find(p => p.handle === h) || null;
  const resolve = hs => (hs || []).map(byHandle).filter(Boolean);
  const titleAr = p => C.productNamesAr[p.handle] || null;
  const primaryImage = p => p.img ? `../component-library/img/${p.img}` : null;
  const hoverImage = p => C.productImagesAlt[p.handle] || null;
  const el = id => document.getElementById(id);

  /** Cheapest available variant — what the card's "From <price>" advertises. */
  const cheapest = p => (p.variants || []).filter(v => v.a).sort((a, b) => a.p - b.p)[0]
    || { t: p.sizes?.[p.sizes.length - 1] || '', p: p.min };

  /** Relative date from a day offset, so review dates never go stale. */
  const ago = d => {
    if (d < 7)  return LOCALE === 'ar' ? `منذ ${digits(d)} أيام`   : `${d} days ago`;
    if (d < 30) return LOCALE === 'ar' ? `منذ ${digits(Math.round(d / 7))} أسابيع` : `${Math.round(d / 7)} weeks ago`;
    return LOCALE === 'ar' ? `منذ ${digits(Math.round(d / 30))} أشهر` : `${Math.round(d / 30)} months ago`;
  };

  /* ══════════════════════ ANALYTICS ══════════════════════ */

  function track(event, props = {}) {
    if (!C.analytics.enabled) return;
    const payload = { event, locale: LOCALE, ...props };
    if (C.analytics.sinks.includes('dataLayer')) (window.dataLayer = window.dataLayer || []).push(payload);
    if (C.analytics.sinks.includes('console')) console.debug('[siwa:track]', payload);
  }

  /* ══════════════════════ DERIVED TAXONOMY (A-01) ══════════════════════ */
  /* The note taxonomy (B-01) has not been migrated — zero metafields exist
     and only 18 of 56 products carry parseable notes. Until it ships, a
     product's scent families are derived by keyword match against its title,
     notes and description, using the editable term lists in config.mood. */

  const familyIndex = new Map();
  function familiesOf(p) {
    if (familyIndex.has(p.handle)) return familyIndex.get(p.handle);
    const hay = [p.title, p.accords, p.body, ...Object.values(p.notes || {})]
      .filter(Boolean).join(' ').toLowerCase();
    const hit = C.mood.families.filter(f => f.terms.some(term => hay.includes(term))).map(f => f.key);
    familyIndex.set(p.handle, hit);
    return hit;
  }

  /** Three compact note descriptors for the card (B-02), when data exists. */
  function noteChips(p) {
    const n = p.notes || {};
    const first = s => String(s).split(/[,&]|\band\b/)[0].trim().replace(/\.$/, '');
    return ['top', 'heart', 'base'].filter(k => n[k]).map(k => ({ k, v: first(n[k]) })).slice(0, 3);
  }

  /* ══════════════════════ ICONS ══════════════════════ */

  const ICON = {
    star:  '<path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4 6.2 20.5l1.1-6.5L2.6 9.4l6.5-.9z"/>',
    bottle:'<path d="M9 2h6v3.5l1.6 2.2c.6.8.9 1.7.9 2.7V21a1 1 0 0 1-1 1H7.5a1 1 0 0 1-1-1V10.4c0-1 .3-1.9.9-2.7L9 5.5z" fill="none" stroke="currentColor" stroke-width="1.2"/>',
    search:'<circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M20 20l-3.6-3.6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    bag:   '<path d="M6 8h12l-1 12H7L6 8z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 8V6a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" stroke-width="1.5"/>',
    heart: '<path d="M12 20s-7-4.6-7-9.3A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.7C19 15.4 12 20 12 20z"/>',
    user:  '<circle cx="12" cy="8" r="3.6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4.5 20.5c1.2-3.7 4-5.6 7.5-5.6s6.3 1.9 7.5 5.6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    close: '<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    burger:'<path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    chevron:'<path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    caret: '<path d="M7 9.5l5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
    check: '<path d="M4 12.5l5 5L20 6.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    thumb: '<path d="M7 21V10l4.5-7 .8.4c.9.5 1.3 1.6 1 2.6L12.4 9H19a2 2 0 0 1 2 2.3l-1.1 7A2 2 0 0 1 17.9 20H7z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M3 10h4v11H3z" fill="none" stroke="currentColor" stroke-width="1.4"/>',
    plus:  '<path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    bell:  '<path d="M12 3a6 6 0 0 0-6 6c0 4-1.5 5.5-2 6h16c-.5-.5-2-2-2-6a6 6 0 0 0-6-6z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M10 19a2 2 0 0 0 4 0" fill="none" stroke="currentColor" stroke-width="1.4"/>',
    link:  '<path d="M10 14a4 4 0 0 0 5.7 0l3-3A4 4 0 0 0 13 5.3L11.4 7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3A4 4 0 0 0 11 18.7L12.6 17" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    pin:   '<path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="12" cy="10" r="2.6" fill="none" stroke="currentColor" stroke-width="1.4"/>',
    truck: '<path d="M2.5 6.5h11v9h-11zM13.5 9.5h4l3 3.2v2.8h-7z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><circle cx="7" cy="17.5" r="1.9" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="17" cy="17.5" r="1.9" fill="none" stroke="currentColor" stroke-width="1.4"/>',
    shield:'<path d="M12 3l7.5 2.8v5.4c0 4.6-3.1 8.2-7.5 9.8-4.4-1.6-7.5-5.2-7.5-9.8V5.8z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M8.6 12.2l2.5 2.5 4.3-4.9" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    /* The Siwan sunburst — placeholder geometry pending the real motif being
       drawn from the embroidery reference (component-library README gap). */
    sun:   '<circle cx="12" cy="12" r="3.4" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M12 2v3.4M12 18.6V22M2 12h3.4M18.6 12H22M4.9 4.9l2.4 2.4M16.7 16.7l2.4 2.4M19.1 4.9l-2.4 2.4M7.3 16.7l-2.4 2.4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
    instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="4.5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="17.2" cy="6.8" r="1.1"/>',
    tiktok:    '<path d="M14 3.5h2.6a5.2 5.2 0 0 0 4.4 4.3v2.7a8 8 0 0 1-4.4-1.4v5.7a6.1 6.1 0 1 1-6.1-6.1c.3 0 .6 0 .9.1v2.8a3.3 3.3 0 1 0 2.6 3.2z"/>',
    facebook:  '<path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H16.7V3.6a22 22 0 0 0-2.4-.12c-2.4 0-4 1.45-4 4.12v2.3H7.6V13h2.7v8z"/>',
    whatsapp:  '<path d="M3.2 20.8l1.25-4.5A8.4 8.4 0 1 1 7.8 19.5zM8.6 7.6c-.2 0-.5.07-.75.36-.26.29-1 .95-1 2.32s1.02 2.7 1.16 2.88c.14.19 1.97 3.13 4.86 4.26 2.4.94 2.9.75 3.42.7.52-.05 1.68-.68 1.92-1.34.24-.66.24-1.22.17-1.34-.07-.12-.26-.19-.55-.33-.29-.15-1.68-.83-1.94-.92-.26-.1-.45-.15-.64.14-.19.29-.73.92-.9 1.1-.16.2-.33.22-.62.08-.29-.15-1.2-.45-2.3-1.42-.85-.76-1.42-1.69-1.59-1.98-.16-.29-.02-.45.13-.59.13-.13.29-.34.43-.51.15-.17.2-.29.29-.48.1-.2.05-.36-.02-.51-.07-.14-.63-1.53-.87-2.1-.2-.5-.4-.44-.55-.44z"/>'
  };
  const svg = (n, cls = '') => ICON[n]
    ? `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true" focusable="false">${ICON[n]}</svg>` : '';

  /* ══════════════════════ SHARED PARTS ══════════════════════ */

  function Stars(rating, size = '') {
    const r = Number(rating) || 0;
    let out = `<span class="stars ${size}" role="img" aria-label="${digits(r.toFixed(2))} / 5">`;
    for (let i = 1; i <= 5; i++)
      out += `<svg viewBox="0 0 24 24" class="${r >= i - 0.25 ? 'star-full' : 'star-empty'}" aria-hidden="true">${ICON.star}</svg>`;
    return out + '</span>';
  }

  /** Section header: eyebrow, display title, optional lede and view-all. */
  function Head(cfg, id, opts = {}) {
    return `
<div class="head ${opts.center ? 'head--center' : ''}">
  <div class="head__main">
    ${cfg.eyebrow ? `<p class="eyebrow">${esc(L(cfg.eyebrow))}</p>` : ''}
    <h2 class="head__title" id="${id}-title" data-reveal>${esc(L(cfg.title || cfg.heading))}</h2>
    ${cfg.description || cfg.intro || cfg.lede
      ? `<p class="head__lede" data-reveal>${esc(L(cfg.description || cfg.intro || cfg.lede))}</p>` : ''}
  </div>
  ${cfg.viewAll ? `<a class="head__link" href="${cfg.viewAllHref}">${esc(L(cfg.viewAll))}
      <span aria-hidden="true">${arrow()}</span></a>` : ''}
</div>`;
  }

  /**
   * One product card. `variant` decides the register:
   *   'original' → Authentic Siwan mark, Arabic name, provenance stamp
   *   'inspired' → neutral inspired-by line and the price contrast
   * Sold-out cards swap Add-to-bag for Notify-me (D-04) rather than dead-ending.
   */
  function Card(p, opts = {}) {
    const { variant = 'plain', section = '', index = 0, compact = false } = opts;
    const ar = titleAr(p);
    const href = `/products/${p.handle}`;
    const wished = WISHLIST.has(p.handle);
    const alt = LOCALE === 'ar' ? `${p.title} — زجاجة عطر من سيوة` : `${p.title} — Siwa eau de parfum bottle`;
    const chips = compact ? [] : noteChips(p);

    const mark = variant === 'original'
      ? `<span class="badge badge--authentic">${svg('sun', 'badge__icon')}${esc(L(C.originals.badge))}</span>`
      : (variant === 'inspired' && p.house) ? `<span class="badge badge--new">${esc(L(C.inspired.badge))}</span>` : '';

    /* The inspired-by line is the sub. On an Original there is no house to
       name, so the Arabic name takes the slot instead — at its own weight,
       never as a translation of the Latin one. */
    const sub = (variant === 'inspired' && p.house)
      ? `<p class="pcard__sub">${esc(L(C.inspired.badge))} <b>${esc(p.original || p.house)}</b></p>`
      : ar ? `<p class="pcard__sub pcard__sub--ar"><span lang="ar" dir="rtl">${esc(ar)}</span></p>` : '';

    const contrast = (variant === 'inspired' && C.inspired.showRetailContrast && p.originalPrice)
      ? `<span class="pcard__was" title="${esc(L(C.inspired.retailDisclaimer))}">${esc(L(C.inspired.retailContrastLabel))} <s>${money(p.originalPrice)}</s></span>` : '';

    return LIB.ProductCard(p, {
      modifier: 'pcard--bare',
      images: [primaryImage(p), hoverImage(p)],
      alt, href,
      // No PDP exists in the prototype: the click is recorded and suppressed.
      linkAttrs: 'data-open-product',
      subHtml: sub,
      notesHtml: chips.length
        ? `<p class="pcard__notes pcard__notes--chips">${chips.map(c =>
            `<span><i>${esc(t(c.k))}</i> ${esc(c.v)}</span>`).join('')}</p>` : '',
      badges: `${mark}${p.soldOut ? `<span class="badge badge--soldout">${esc(t('soldOut'))}</span>` : ''}`,
      wish: true, wished, wishLabel: wished ? t('wishlistRem') : t('wishlistAdd'),
      cta: p.soldOut ? 'notify' : 'add',
      ctaLabel: p.soldOut ? t('notifyMe') : t('addToCart'),
      ctaIcon: p.soldOut ? 'bell' : 'bag',
      ctaBlock: true,
      /* Money is formatted by this page — currency word and numeral system
         both come from config.js — so the price markup is handed in rather
         than derived inside the card. */
      priceHtml: `<span class="price">${p.min !== p.max
        ? `<span class="from">${esc(t('from'))}</span>` : ''}${money(p.min)}</span>`,
      priceExtra: contrast,
      /* Every string on this page comes from config.js, including the ones
         the card renders for itself. */
      labels: { from: t('from'), reviews: t('reviews'), new: t('noReviews') },
      section, index, reveal: true
    });
  }

  /* ══════════════════════ 1 · ANNOUNCEMENT ══════════════════════ */

  function Announcement() {
    const a = C.announcement;
    if (!a.enabled || store.get(a.storageKey, false)) return '';
    return `
<div class="ann" role="region" aria-label="${esc(L(a.message))}">
  <div class="ann__in">
    <p>${esc(L(a.message))}
      <a href="${a.link.href}" data-ev="click_announcement_link">${esc(L(a.link.label))}
        <span aria-hidden="true">${arrow()}</span></a></p>
    ${a.dismissible ? `<button type="button" class="ann__x" data-ann-close aria-label="${esc(t('close'))}">${svg('close')}</button>` : ''}
  </div>
</div>`;
  }

  /* ══════════════════════ 2 · HEADER (A-03) ══════════════════════ */

  function Header() {
    const h = C.header;
    const count = CART.reduce((s, l) => s + l.qty, 0);
    return `
<header class="hdr" data-header>
  <div class="hdr__in">
    <button type="button" class="ico hdr__burger" data-open-nav aria-label="${esc(t('menu'))}">${svg('burger')}</button>

    <a class="logo" href="${h.logo.href}" aria-label="${esc(L(h.logo.alt))}">
      <span class="logo__latin">${esc(h.logo.latin)}</span>
      <span class="logo__ar" lang="ar" dir="rtl">${esc(h.logo.arabic)}</span>
    </a>

    <nav class="nav" aria-label="${esc(L({ en: 'Primary', ar: 'التنقل الرئيسي' }))}">
      <ul class="nav__track">
        ${h.commerce.map(i => `<li><a href="${i.href}">${esc(L(i.label))}</a></li>`).join('')}
      </ul>
      <span class="nav__split" aria-hidden="true"></span>
      <ul class="nav__track nav__track--story">
        <li class="nav__has">
          <button type="button" class="nav__toggle" aria-expanded="false" aria-controls="storymenu">
            ${esc(L(h.story.label))} ${svg('caret', 'nav__caret')}
          </button>
          <ul class="nav__menu" id="storymenu">
            ${h.story.dropdown.map(d => `<li><a href="${d.href}">${esc(L(d.label))}</a></li>`).join('')}
          </ul>
        </li>
      </ul>
    </nav>

    <div class="hdr__tools">
      <div class="langtog" role="group" aria-label="${esc(L(C.footer.languageLabel))}">
        <button type="button" data-locale="ar" lang="ar" aria-pressed="${isRTL()}">ع</button>
        <button type="button" data-locale="en" aria-pressed="${!isRTL()}">EN</button>
      </div>
      <button type="button" class="ico" data-open-search aria-label="${esc(t('search'))}">${svg('search')}</button>
      <a class="ico ico--wish" href="${h.wishlistHref}" aria-label="${esc(t('wishlist'))}">
        ${svg('heart')}${WISHLIST.size ? `<span class="ico__dot">${digits(WISHLIST.size)}</span>` : ''}</a>
      <a class="ico hdr__acct" href="${h.accountHref}" aria-label="${esc(t('account'))}">${svg('user')}</a>
      <button type="button" class="ico" data-open-cart aria-label="${esc(t('openBag'))}">
        ${svg('bag')}${count ? `<span class="ico__dot">${digits(count)}</span>` : ''}</button>
    </div>
  </div>
</header>`;
  }

  /* ══════════════════════ 3 · HERO ══════════════════════ */
  /* Five depth layers. 0 kershef ground · 1 atmosphere · 2 horizon rule
     · 3 the bottle · 4 type and CTAs. Parallax factors live in CSS/JS by
     depth, never per element. */

  function Hero() {
    const h = C.hero, p = byHandle(h.productHandle);
    if (!p) return '';
    return `
<section class="hero" aria-labelledby="hero-title">

  <div class="layer depth-0" data-depth="0" data-parallax=".10" aria-hidden="true"></div>
  <div class="layer depth-1" data-depth="1" data-parallax=".25" aria-hidden="true">
    <span class="hero__glow"></span>
  </div>
  <div class="layer depth-2" data-depth="2" data-parallax=".50" aria-hidden="true">
    <span class="hero__rule"></span>
  </div>

  <div class="hero__in">
    <div class="hero__copy layer depth-4" data-depth="4">
      <p class="hero__eyebrow" data-reveal>${esc(L(h.eyebrow))}</p>

      <h1 class="hero__title" id="hero-title">
        <span class="hero__latin" data-reveal-line>${esc(p.title)}</span>
        <span class="hero__ar" lang="ar" dir="rtl" data-reveal-line>${esc(h.titleArabic)}</span>
      </h1>

      <p class="hero__tag" data-reveal>${esc(L(h.tagline))}</p>
      <p class="hero__desc" data-reveal>${esc(L(h.description))}</p>

      <p class="hero__proof" data-reveal>
        ${Stars(p.rating, 'stars--lg')}
        <b>${digits(Number(p.rating).toFixed(2))}</b>
        <span>${digits(p.reviews)} ${esc(t('reviews'))}</span>
        <i aria-hidden="true">·</i>
        <span class="hero__price">${esc(t('from'))} <b>${money(p.min)}</b></span>
      </p>

      <div class="hero__ctas" data-reveal>
        <a class="btn btn--lg" href="${h.ctaPrimary.href}" data-ev="click_hero_primary_cta"
           data-ev-props='{"product":"${esc(p.handle)}"}'>${esc(L(h.ctaPrimary.label))}</a>
        <a class="btn btn--ghost btn--lg" href="${h.ctaSecondary.href}" data-ev="click_hero_quiz_cta">
          ${esc(L(h.ctaSecondary.label))} <span aria-hidden="true">${arrow()}</span></a>
      </div>
    </div>

    <div class="hero__media layer depth-3" data-depth="3" data-parallax=".80">
      <img class="hero__bottle" src="${h.image.src}" alt="${esc(L(h.imageAlt))}"
           width="600" height="750" fetchpriority="high" decoding="async">
    </div>
  </div>

  <span class="hero__scroll layer depth-5" data-depth="5" aria-hidden="true">
    ${esc(L(h.scrollHint))}<i></i>
  </span>
</section>`;
  }

  /* ══════════════════════ 4 · USP BAR (E-05) ══════════════════════ */

  function Usp() {
    return `
<section class="usp" aria-label="${esc(L({ en: 'Why shop with Siwa', ar: 'لماذا تتسوق من سيوة' }))}">
  <ul class="usp__in">
    ${C.usp.map(u => `
    <li><a href="${u.href}" ${u.external ? 'target="_blank" rel="noopener noreferrer"' : ''}>
      ${svg(u.icon)}<span>${esc(L(u.label))}</span></a></li>`).join('')}
  </ul>
</section>`;
  }

  /* ══════════════════════ 5 · REVIEWS, LOUD (D-02) ══════════════════════ */

  function Proof() {
    const s = C.proof;
    const total = s.distribution.reduce((a, b) => a + b.count, 0) || 1;
    return `
<section class="proof" aria-labelledby="proof-title" data-view-event="view_social_proof">
  <div class="proof__in">

    <div class="proof__figure">
      <p class="proof__big" id="proof-title"><b>${digits(s.rating.toFixed(2))}</b><i>★</i></p>
      <p class="proof__lbl">${esc(L(s.ratingLabel))}</p>
      ${Stars(s.rating, 'stars--lg')}
    </div>

    <div class="proof__dist">
      <h3 class="sr-only">${esc(L(s.distributionLabel))}</h3>
      ${s.distribution.map(d => `
      <div class="bar">
        <span class="bar__k">${digits(d.stars)}★</span>
        <span class="bar__t"><i style="--w:${(d.count / total * 100).toFixed(1)}%"></i></span>
        <span class="bar__v">${num(d.count)}</span>
      </div>`).join('')}
      <p class="proof__note">${esc(L(s.distributionNote))}</p>
    </div>

    <div class="proof__nums">
      <p><b>${num(s.reviewCount)}</b><span>${esc(L(s.countLabel))}</span></p>
      <p><b>${digits(s.ratedProducts)}</b><span>${esc(L(s.productsLabel))}</span></p>
      <a class="btn btn--secondary" href="${s.cta.href}" data-ev="click_view_all_reviews">
        ${esc(L(s.cta.label))} <span aria-hidden="true">${arrow()}</span></a>
    </div>

  </div>
</section>`;
  }

  /* ══════════════════════ 6 · SCENT FINDER (A-02) ══════════════════════ */

  function Finder() {
    const f = C.finder;
    let stage;

    if (UI.quizResult) {
      const per = f.personas.find(x => x.key === UI.quizResult) || f.personas[0];
      const prod = byHandle(per.product), lay = byHandle(per.layer);
      const total = (prod ? cheapest(prod).p : 0) + (lay ? cheapest(lay).p : 0);
      stage = `
<div class="quiz__result" role="status">
  <p class="eyebrow">${esc(L(f.resultEyebrow))}</p>
  <h3 class="quiz__persona">
    <span>${esc(L(per.name))}</span>
    ${isRTL() ? '' : `<i lang="ar" dir="rtl">${esc(per.name.ar)}</i>`}
  </h3>
  <p class="quiz__line">${esc(L(per.line))}</p>

  <div class="quiz__pair">
    ${[prod, lay].filter(Boolean).map((x, i) => `
    <div class="pairitem">
      <span class="pairitem__img">${primaryImage(x)
        ? `<img src="${primaryImage(x)}" alt="" loading="lazy">` : `<span class="card__ph">${svg('bottle')}</span>`}</span>
      <span class="pairitem__t">${esc(x.title)}</span>
      <span class="pairitem__p">${money(cheapest(x).p)}</span>
    </div>${i === 0 ? '<span class="pairitem__plus" aria-hidden="true">+</span>' : ''}`).join('')}
  </div>

  <p class="quiz__total">${esc(L(f.pairSaving))} · <b>${money(total)}</b></p>
  <div class="quiz__acts">
    <button type="button" class="btn btn--lg" data-add-pair="${esc(per.product)}|${esc(per.layer)}">
      ${esc(L(f.addPairLabel))}</button>
    <button type="button" class="btn btn--tertiary" data-quiz-restart>${esc(L(f.restartLabel))}</button>
  </div>
</div>`;
    } else if (UI.quizStep < 0) {
      stage = `
<div class="quiz__start">
  <button type="button" class="btn btn--lg" data-quiz-start>${esc(L(f.startLabel))}
    <span aria-hidden="true">${arrow()}</span></button>
</div>`;
    } else {
      const q = f.questions[UI.quizStep];
      stage = `
<div class="quiz__step" role="group" aria-labelledby="q-${esc(q.key)}">
  <p class="quiz__count">${digits(UI.quizStep + 1)} ${esc(L(f.ofLabel))} ${digits(f.questions.length)}</p>
  <span class="quiz__bar" aria-hidden="true"><i style="--w:${((UI.quizStep) / f.questions.length * 100).toFixed(0)}%"></i></span>
  <h3 class="quiz__q" id="q-${esc(q.key)}">${esc(L(q.prompt))}</h3>
  <div class="quiz__opts">
    ${q.options.map(o => `
    <button type="button" class="quiz__opt" data-quiz-answer="${esc(q.key)}|${esc(o.value)}">
      ${esc(L(o.label))}</button>`).join('')}
  </div>
</div>`;
    }

    return `
<section class="finder" id="finder" aria-labelledby="finder-title" data-view-event="view_scent_finder">
  <div class="layer depth-1" data-depth="1" data-parallax=".2" aria-hidden="true"><span class="finder__glow"></span></div>
  <div class="finder__in">
    ${Head(f, 'finder', { center: true })}
    <div class="quiz">${stage}</div>
  </div>
</section>`;
  }

  /* ══════════════════════ 7 · SHOP BY MOOD (A-01) ══════════════════════ */

  function moodMatches() {
    return CATALOGUE.filter(p => {
      if (UI.moodRegister && p.kind !== UI.moodRegister) return false;
      if (UI.moodFamily && !familiesOf(p).includes(UI.moodFamily)) return false;
      return true;
    }).sort((a, b) => (b.reviews - a.reviews) || (b.rating - a.rating));
  }

  function Mood() {
    const m = C.mood;
    const hits = moodMatches();
    const shown = UI.moodExpanded ? hits : hits.slice(0, m.show);

    const famChip = (key, label, n) => `
<button type="button" class="chip" data-mood-family="${key === null ? '' : esc(key)}"
        aria-pressed="${UI.moodFamily === key}">
  ${esc(label)} <span class="chip__n">${digits(n)}</span></button>`;

    return `
<section class="mood" aria-labelledby="mood-title" data-view-event="view_shop_by_mood">
  <div class="mood__in">
    ${Head(m, 'mood')}

    <div class="facets">
      <div class="facets__row" role="group" aria-label="${esc(L(m.heading))}">
        ${famChip(null, L(m.allLabel), CATALOGUE.filter(p => !UI.moodRegister || p.kind === UI.moodRegister).length)}
        ${m.families.map(f => famChip(f.key, L(f.label),
          CATALOGUE.filter(p => familiesOf(p).includes(f.key) && (!UI.moodRegister || p.kind === UI.moodRegister)).length)).join('')}
      </div>
      <div class="facets__row facets__row--sub" role="group" aria-label="${esc(L(m.houseFacetLabel))}">
        ${m.registerFacet.map(r => `
        <button type="button" class="chip chip--sm" data-mood-register="${esc(r.key)}"
                aria-pressed="${UI.moodRegister === r.key}">${esc(L(r.label))}</button>`).join('')}
      </div>
    </div>

    <p class="facets__count" aria-live="polite">${digits(hits.length)} ${esc(L(m.countLabel))}</p>

    ${shown.length
      ? `<div class="grid grid--4">${shown.map((p, i) => Card(p, {
          variant: p.kind === 'siwa_owned' ? 'original' : 'inspired', section: 'mood', index: i, compact: true
        })).join('')}</div>`
      : `<p class="facets__empty">${esc(L(m.emptyLabel))}</p>`}

    ${(!UI.moodExpanded && hits.length > m.show)
      ? `<p class="mood__more"><button type="button" class="btn btn--secondary" data-mood-more>
          ${esc(L(m.moreLabel))} (${digits(hits.length - m.show)})</button></p>` : ''}
  </div>
</section>`;
  }

  /* ══════════════════════ 8 & 9 · COLLECTION GRIDS ══════════════════════ */

  function Collection(cfg, variant, id) {
    const products = resolve(cfg.handles).slice(0, cfg.itemsToShow);
    if (!products.length) return '';
    return `
<section class="coll coll--${id}" id="${id}" aria-labelledby="${id}-title" data-view-event="view_${id}">
  <div class="coll__in">
    ${Head(cfg, id)}
    ${variant === 'original' && cfg.stamp
      ? `<p class="coll__stamp"><span class="stamp">${esc(L(cfg.stamp))}</span></p>` : ''}
    <div class="grid grid--4">
      ${products.map((p, i) => Card(p, { variant, section: id, index: i })).join('')}
    </div>
    ${variant === 'inspired' && cfg.showRetailContrast
      ? `<p class="coll__note">${esc(L(cfg.retailDisclaimer))}</p>` : ''}
  </div>
</section>`;
  }

  /* ══════════════════════ 10 · BUILD YOUR SET (C-01, C-02) ══════════════════════ */

  function BundlePanel() {
    const b = C.set.bundle;
    const pool = resolve(b.poolHandles).filter(p => !p.soldOut);
    const chosen = UI.bundle.map(byHandle).filter(Boolean);
    const setSku = byHandle(b.priceFromHandle);
    const setPrice = setSku ? setSku.min : 0;
    const sumIndividually = chosen.reduce((s, p) => s + cheapest(p).p, 0);
    const saving = chosen.length === b.slots ? Math.max(0, sumIndividually - setPrice) : 0;
    const missing = b.slots - chosen.length;

    return `
<div class="bundle">
  <div class="bundle__slots" aria-live="polite">
    ${Array.from({ length: b.slots }, (_, i) => {
      const p = chosen[i];
      return `
    <div class="slot${p ? ' slot--full' : ''}">
      ${p ? `${primaryImage(p) ? `<img src="${primaryImage(p)}" alt="" loading="lazy">` : `<span class="card__ph">${svg('bottle')}</span>`}
             <span class="slot__t">${esc(p.title)}</span>
             <button type="button" class="slot__x" data-bundle-remove="${i}"
                     aria-label="${esc(t('remove'))}: ${esc(p.title)}">${svg('close')}</button>`
           : `<span class="slot__e">${esc(L(b.slotLabel))} ${digits(i + 1)}</span>`}
    </div>`;
    }).join('')}
  </div>

  <p class="bundle__price">
    ${chosen.length === b.slots
      ? `<span class="bundle__lbl">${esc(L(b.priceLabel))}</span> <b>${money(setPrice)}</b>
         ${saving > 0 ? `<span class="bundle__save">${esc(L(b.savingLabel))} ${money(saving)}</span>` : ''}`
      : `<span class="bundle__lbl">${esc(L(b.incompleteLabel).replace('{n}', digits(missing)))}</span>`}
  </p>

  <button type="button" class="btn btn--lg" data-bundle-add ${chosen.length < b.slots ? 'disabled' : ''}>
    ${esc(L(b.addLabel))}</button>

  <h4 class="bundle__pick">${esc(L(b.pickLabel))}</h4>
  <div class="bundle__pool">
    ${pool.map(p => `
    <button type="button" class="pool${UI.bundle.includes(p.handle) ? ' pool--on' : ''}"
            data-bundle-pick="${esc(p.handle)}" aria-pressed="${UI.bundle.includes(p.handle)}">
      <span class="pool__img">${primaryImage(p)
        ? `<img src="${primaryImage(p)}" alt="" loading="lazy">` : `<span class="card__ph">${svg('bottle')}</span>`}</span>
      <span class="pool__t">${esc(p.title)}</span>
      ${p.reviews ? `<span class="pool__r">${digits(Number(p.rating).toFixed(2))}★</span>` : ''}
    </button>`).join('')}
  </div>
</div>`;
  }

  function LayerPanel() {
    const l = C.set.layering;
    const layers = resolve(l.layerHandles);
    const bases = CATALOGUE.filter(p => !/layering|bundle|lotion|splash/i.test(p.title) && !p.soldOut)
      .sort((a, b) => a.title.localeCompare(b.title));

    return `
<div class="lay">
  <div class="lay__cols">
    <div class="lay__col">
      <h4 class="lay__h"><span class="lay__n">1</span> ${esc(L(l.baseLabel))}</h4>
      <label class="field">
        <span class="sr-only">${esc(L(l.baseLabel))}</span>
        <select class="select" id="layBase">
          <option value="">${esc(L(l.basePlaceholder))}</option>
          ${bases.map(p => `<option value="${esc(p.handle)}">${esc(p.title)} — ${money(cheapest(p).p)}</option>`).join('')}
        </select>
      </label>
      <p class="lay__note">${esc(L(l.note))}</p>
    </div>

    <span class="lay__plus" aria-hidden="true">${svg('plus')}</span>

    <div class="lay__col">
      <h4 class="lay__h"><span class="lay__n">2</span> ${esc(L(l.layerLabel))}</h4>
      <div class="lay__opts" role="radiogroup" aria-label="${esc(L(l.layerLabel))}">
        ${layers.map((p, i) => {
          const ar = titleAr(p);
          return `
        <label class="lay__opt">
          <input type="radio" name="siwa-layer" value="${esc(p.handle)}" ${i === 0 ? 'checked' : ''}>
          <span class="lay__box">
            <span class="lay__img">${primaryImage(p)
              ? `<img src="${primaryImage(p)}" alt="" loading="lazy">` : `<span class="card__ph">${svg('bottle')}</span>`}</span>
            <span class="lay__t">${esc(p.title)}</span>
            ${ar ? `<span class="lay__ar"><span lang="ar" dir="rtl">${esc(ar)}</span></span>` : ''}
            <span class="lay__p">${money(cheapest(p).p)}</span>
          </span>
        </label>`;
        }).join('')}
      </div>
    </div>
  </div>

  <p class="lay__total" data-lay-total aria-live="polite"></p>
  <button type="button" class="btn btn--lg" data-lay-add disabled>${esc(L(l.addLabel))}</button>

  <div class="lay__combos">
    <h4>${esc(L(l.combinationsLabel))}</h4>
    <div class="lay__chips">
      ${l.combinations.map(c => {
        const b = byHandle(c.base), y = byHandle(c.layer);
        if (!b || !y) return '';
        const bn = (isRTL() && titleAr(b)) || b.title, yn = (isRTL() && titleAr(y)) || y.title;
        return `<button type="button" class="chip chip--sm" data-combo="${esc(c.base)}|${esc(c.layer)}">${esc(bn)} + ${esc(yn)}</button>`;
      }).join('')}
    </div>
  </div>
</div>`;
  }

  function SetSection() {
    const s = C.set;
    return `
<section class="set" aria-labelledby="set-title" data-view-event="view_build_your_set">
  <div class="set__in">
    ${Head(s, 'set', { center: true })}
    <div class="tabs" role="tablist" aria-label="${esc(L(s.heading))}">
      ${s.tabs.map(tb => `
      <button type="button" class="tab" role="tab" data-set-tab="${esc(tb.key)}"
              aria-selected="${UI.setTab === tb.key}">${esc(L(tb.label))}</button>`).join('')}
    </div>
    <div class="set__panel" role="tabpanel">
      ${UI.setTab === 'bundle' ? BundlePanel() : LayerPanel()}
    </div>
  </div>
</section>`;
  }

  /* ══════════════════════ 11 · HOUSE OF SIWA (E-02, E-04) ══════════════════════ */
  /* Sticky media column, pillars scrolling past it. The only section carrying
     the Cultural Accent Set and the vintage treatment layer. */

  function House() {
    const h = C.house;
    return `
<section class="house" aria-labelledby="house-title" data-view-event="view_house_of_siwa">

  <div class="layer depth-0" data-depth="0" aria-hidden="true">
    <span class="house__ground ${h.backgroundImage ? '' : 'house__ground--woven'}"
          ${h.backgroundImage ? `style="background-image:url('${h.backgroundImage}')"` : ''}></span>
  </div>
  <div class="layer depth-1" data-depth="1" data-parallax=".18" aria-hidden="true"><span class="house__haze"></span></div>

  <div class="house__in">
    <div class="house__lead">
      <p class="eyebrow eyebrow--accent">${esc(L(h.eyebrow))}</p>
      <h2 class="house__title" id="house-title" data-reveal>${esc(L(h.heading))}</h2>
      <p class="house__lede" data-reveal>${esc(L(h.lede))}</p>
      <a class="btn btn--lg" href="${h.cta.href}" data-ev="click_house_story">
        ${esc(L(h.cta.label))} <span aria-hidden="true">${arrow()}</span></a>
    </div>

    <ol class="pillars">
      ${h.pillars.map((p, i) => `
      <li class="pillar" style="--accent: var(--${p.accent})" data-reveal>
        <span class="pillar__n" aria-hidden="true">${digits(String(i + 1).padStart(2, '0'))}</span>
        <div>
          <h3 class="pillar__h"><a href="${p.href}" data-ev="click_house_pillar"
              data-ev-props='{"pillar":"${esc(p.label.en)}"}'>${esc(L(p.label))}</a></h3>
          <p class="pillar__p">${esc(L(p.line))}</p>
        </div>
      </li>`).join('')}
    </ol>
  </div>

  <p class="house__attr"><span class="stamp stamp--dark">${svg('sun')}</span>${esc(L(h.attribution))}</p>
</section>`;
  }

  /* ══════════════════════ 12 · BEST SELLERS ══════════════════════ */

  function BestSellers() {
    const b = C.bestSellers;
    const products = b.handles ? resolve(b.handles).slice(0, b.count)
      : CATALOGUE.filter(p => p.reviews > 0)
        .sort((x, y) => (y.reviews - x.reviews) || (y.rating - x.rating)).slice(0, b.count);
    return `
<section class="rail" aria-labelledby="rail-title" data-view-event="view_best_sellers">
  <div class="rail__in">
    ${Head(b, 'rail')}
    <div class="rail__vp">
      <button type="button" class="rail__arw rail__arw--p" data-rail-prev aria-label="${esc(L(b.prevLabel))}">${svg('chevron')}</button>
      <div class="rail__track" data-rail-track tabindex="0" aria-label="${esc(L(b.title))}">
        ${products.map((p, i) => `<div class="rail__slide">${Card(p, {
          variant: p.kind === 'siwa_owned' ? 'original' : 'inspired', section: 'bestsellers', index: i, compact: true
        })}</div>`).join('')}
      </div>
      <button type="button" class="rail__arw rail__arw--n" data-rail-next aria-label="${esc(L(b.nextLabel))}">${svg('chevron')}</button>
    </div>
    <div class="rail__dots" data-rail-dots role="tablist" aria-label="${esc(L(b.title))}"></div>
  </div>
</section>`;
  }

  /* ══════════════════════ 13 · REVIEWS SHOWCASE (D-02) ══════════════════════ */

  function Reviews() {
    const r = C.reviews;
    const items = r.items.slice().sort((a, b) =>
      UI.reviewSort === 'recent' ? a.days - b.days : b.helpful - a.helpful);

    return `
<section class="revs" id="reviews" aria-labelledby="revs-title" data-view-event="view_reviews_showcase">
  <div class="revs__in">
    ${Head(r, 'revs', { center: true })}

    <div class="revs__sort">
      <span>${esc(L(r.sortLabel))}</span>
      ${r.sorts.map(s => `
      <button type="button" class="chip chip--sm" data-rev-sort="${esc(s.key)}"
              aria-pressed="${UI.reviewSort === s.key}">${esc(L(s.label))}</button>`).join('')}
    </div>

    <div class="revs__grid">
      ${items.map((rv, i) => {
        const handle = isRTL() ? (rv.handleAr || rv.handle) : rv.handle;
        const author = isRTL() ? (rv.authorAr || rv.author) : rv.author;
        const p = byHandle(handle);
        return `
      <article class="rev" data-reveal>
        <div class="rev__top">${Stars(rv.rating)}
          ${rv.verified ? `<span class="rev__v">${svg('check')}${esc(L(r.verifiedLabel))}</span>` : ''}</div>
        <p class="rev__b">${esc(L(rv.body))}</p>
        <div class="rev__foot">
          <span class="rev__who"><b>${esc(author)}</b><time>${esc(ago(rv.days))}</time></span>
          ${p ? `<a class="rev__p" href="/products/${esc(p.handle)}">${esc(p.title)}</a>` : ''}
        </div>
        <button type="button" class="rev__help" data-helpful="${esc(String(i))}">
          ${svg('thumb')}${esc(L(r.helpfulLabel))} (<span>${digits(rv.helpful)}</span>)</button>
      </article>`;
      }).join('')}
    </div>

    <p class="revs__cta">
      <a class="btn btn--secondary btn--lg" href="${r.cta.href}" data-ev="click_view_all_reviews">
        ${esc(L(r.cta.label))} <span aria-hidden="true">${arrow()}</span></a></p>
  </div>
</section>`;
  }

  /* ══════════════════════ 14 · RECENTLY VIEWED (A-05) ══════════════════════ */

  function Recent() {
    const cfg = C.recent;
    const items = resolve(store.get(cfg.storageKey, []));
    if (!items.length) return '';
    return `
<section class="recent" aria-labelledby="recent-title">
  <div class="recent__in">
    <div class="head">
      <div class="head__main"><h2 class="head__title" id="recent-title">${esc(L(cfg.heading))}</h2></div>
      <button type="button" class="head__link" data-recent-clear>${esc(L(cfg.clearLabel))}</button>
    </div>
    <div class="recent__row">
      ${items.slice(0, cfg.max).map(p => `
      <a class="mini" href="/products/${esc(p.handle)}" data-open-product data-handle="${esc(p.handle)}">
        <span class="mini__i">${primaryImage(p)
          ? `<img src="${primaryImage(p)}" alt="" loading="lazy">` : `<span class="card__ph">${svg('bottle')}</span>`}</span>
        <span class="mini__t">${esc(p.title)}</span>
        <span class="mini__p">${money(p.min)}</span>
      </a>`).join('')}
    </div>
  </div>
</section>`;
  }

  /* ══════════════════════ 15 · STAY CLOSE (F-01, F-02) ══════════════════════ */

  function KeepClose() {
    const k = C.keepclose, rf = k.referral, nl = k.newsletter;
    const share = `${L(rf.shareText)} ${rf.link}`;
    return `
<section class="close" aria-label="${esc(L(nl.heading))}">
  <div class="close__in">

    <div class="close__card close__card--ref">
      <p class="eyebrow">${esc(L(rf.eyebrow))}</p>
      <h2 class="close__h">${esc(L(rf.heading))}</h2>
      <p class="close__p">${esc(L(rf.body))}</p>
      <div class="close__acts">
        <a class="btn" href="https://wa.me/?text=${encodeURIComponent(share)}"
           target="_blank" rel="noopener noreferrer" data-ev="click_referral_whatsapp">
          ${svg('whatsapp')}${esc(L(rf.whatsappLabel))}</a>
        <button type="button" class="btn btn--secondary" data-copy="${esc(rf.link)}">
          ${svg('link')}${esc(L(rf.copyLabel))}</button>
      </div>
    </div>

    <form class="close__card close__card--nl" data-newsletter novalidate>
      <p class="eyebrow">${esc(L(nl.eyebrow))}</p>
      <h2 class="close__h">${esc(L(nl.heading))}</h2>
      <p class="close__p">${esc(L(nl.incentive))}</p>
      <div class="close__grp">
        <label class="close__f">
          <span class="sr-only">${esc(L(nl.label))}</span>
          <input class="input" type="email" name="email" required autocomplete="email"
                 placeholder="${esc(L(nl.placeholder))}" aria-describedby="nl-msg"
                 dir="${isRTL() ? 'rtl' : 'ltr'}">
        </label>
        <button class="btn" type="submit">${esc(L(nl.button))}</button>
      </div>
      <p class="close__msg" id="nl-msg" role="status" aria-live="polite"></p>
      ${nl.socialProof ? `<p class="close__fine">${esc(L(nl.socialProof))}</p>` : ''}
      <p class="close__fine">${esc(L(nl.consent))}</p>
    </form>

  </div>
</section>`;
  }

  /* ══════════════════════ 16 · FOOTER ══════════════════════ */

  function Footer() {
    const f = C.footer;
    return `
<footer class="ftr">
  <div class="ftr__in">
    <div class="ftr__grid">
      ${f.linkGroups.map((g, i) => `
      <div class="ftr__g">
        <h3 class="ftr__gt">
          <button type="button" class="ftr__gb" aria-expanded="false" aria-controls="fg-${i}">
            ${esc(L(g.title))} ${svg('caret', 'ftr__caret')}</button>
          <span class="ftr__gl">${esc(L(g.title))}</span>
        </h3>
        <ul class="ftr__l" id="fg-${i}">
          ${g.links.map(l => `<li><a href="${l.href}">${esc(L(l.label))}</a></li>`).join('')}
        </ul>
      </div>`).join('')}

      <div class="ftr__g ftr__g--brand">
        <h3 class="ftr__gt"><span class="ftr__gl">${esc(L(f.socialLabel))}</span></h3>
        <div class="ftr__soc">
          ${f.social.map(s => `
          <a href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="${esc(s.label)}"
             data-ev="click_social" data-ev-props='{"platform":"${esc(s.platform)}"}'>${svg(s.platform)}</a>`).join('')}
        </div>
        <div class="langtog langtog--dark" role="group" aria-label="${esc(L(f.languageLabel))}">
          <button type="button" data-locale="ar" lang="ar" aria-pressed="${isRTL()}">العربية</button>
          <button type="button" data-locale="en" aria-pressed="${!isRTL()}">English</button>
        </div>
      </div>
    </div>

    <div class="ftr__base">
      <p>© ${digits(f.copyrightYear)} ${esc(L(f.brandName))} <span aria-hidden="true">·</span>
        <a href="${f.address.mapHref}" target="_blank" rel="noopener noreferrer">
          ${esc(L(f.address.label))} <span aria-hidden="true">${arrow()}</span></a></p>
      <p class="ftr__legal">${f.legal.map(l => `<a href="${l.href}">${esc(L(l.label))}</a>`).join('<i aria-hidden="true">·</i>')}</p>
    </div>
  </div>
</footer>`;
  }

  /* ══════════════════════ OVERLAYS ══════════════════════ */

  /** C-03 cart + free-shipping progress, C-04 gift note, F-03 cross-sell. */
  function CartDrawer() {
    const subtotal = CART.reduce((s, l) => s + l.price * l.qty, 0);
    const left = C.freeShippingThreshold - subtotal;
    const pct = Math.min(100, (subtotal / C.freeShippingThreshold) * 100);

    const lines = CART.map((line, i) => {
      const p = byHandle(line.handle); if (!p) return '';
      const img = primaryImage(p);
      return `
<div class="ln" data-line="${i}">
  <span class="ln__i">${img ? `<img src="${img}" alt="" loading="lazy">` : `<span class="card__ph">${svg('bottle')}</span>`}</span>
  <div class="ln__b">
    <p class="ln__t">${esc(p.title)}</p>
    <p class="ln__v">${esc(line.variant)}</p>
    <span class="qty">
      <button type="button" data-qty="-1" aria-label="−">−</button>
      <span>${digits(line.qty)}</span>
      <button type="button" data-qty="1" aria-label="+">+</button>
    </span>
  </div>
  <div class="ln__e">
    <b>${money(line.price * line.qty)}</b>
    <button type="button" class="ln__x" data-rm aria-label="${esc(t('remove'))}: ${esc(p.title)}">${svg('close')}</button>
  </div>
</div>`;
    }).join('');

    /* Cross-sell driven by shared scent family, not collection membership. */
    const inCart = new Set(CART.map(l => l.handle));
    const wanted = new Set(CART.flatMap(l => familiesOf(byHandle(l.handle) || {})));
    const cross = CATALOGUE
      .filter(p => !inCart.has(p.handle) && !p.soldOut && familiesOf(p).some(f => wanted.has(f)))
      .sort((a, b) => b.reviews - a.reviews).slice(0, 3);

    return `
<div class="scrim" data-scrim></div>
<aside class="drw" data-drawer="cart" role="dialog" aria-modal="true" aria-labelledby="cart-title">
  <div class="drw__h">
    <h2 class="drw__t" id="cart-title">${esc(t('bag'))}</h2>
    <button type="button" class="ico" data-close-overlay aria-label="${esc(t('close'))}">${svg('close')}</button>
  </div>

  ${CART.length ? `
  <p class="ship">
    ${left > 0 ? `<b>${money(left)}</b> ${esc(t('freeShipLeft'))}` : `${svg('check')}${esc(t('freeShipOk'))}`}
    <span class="ship__bar"><i style="--w:${pct}%"></i></span>
  </p>` : ''}

  <div class="drw__b">
    ${CART.length ? lines : `<p class="drw__empty">${esc(t('bagEmpty'))}</p>`}

    ${CART.length && cross.length ? `
    <div class="cross">
      <h3>${esc(t('crossSell'))}</h3>
      ${cross.map(p => `
      <div class="cross__i">
        <span class="cross__im">${primaryImage(p)
          ? `<img src="${primaryImage(p)}" alt="" loading="lazy">` : `<span class="card__ph">${svg('bottle')}</span>`}</span>
        <span class="cross__t">${esc(p.title)}<b>${money(cheapest(p).p)}</b></span>
        <button type="button" class="btn btn--sm" data-add="${esc(p.handle)}" data-from="cart-cross">
          ${esc(t('addToCart'))}</button>
      </div>`).join('')}
    </div>` : ''}

    ${CART.length ? `
    <div class="gift">
      <label class="check"><input type="checkbox" data-gift-on ${GIFT.on ? 'checked' : ''}>
        <span>${esc(t('giftToggle'))}</span></label>
      ${GIFT.on ? `
      <label class="field">
        <span class="sr-only">${esc(t('giftNote'))}</span>
        <textarea class="textarea" data-gift-note placeholder="${esc(t('giftNote'))}"
                  dir="${isRTL() ? 'rtl' : 'ltr'}">${esc(GIFT.note)}</textarea>
      </label>
      <label class="check"><input type="checkbox" data-gift-hide ${GIFT.hidePrices ? 'checked' : ''}>
        <span>${esc(t('giftHide'))}</span></label>` : ''}
    </div>` : ''}
  </div>

  ${CART.length ? `
  <div class="drw__f">
    <p class="drw__sub"><span>${esc(t('subtotal'))}</span><b>${money(subtotal)}</b></p>
    <a class="btn btn--block btn--lg" href="/checkout" data-ev="begin_checkout"
       data-ev-props='{"cart_value":${subtotal},"item_count":${CART.reduce((s, l) => s + l.qty, 0)}}'>
      ${esc(t('checkout'))}</a>
  </div>` : ''}
</aside>`;
  }

  function SearchModal() {
    const s = C.header.search;
    const recent = store.get(s.storageKey, []);
    const popular = resolve(s.popular);
    return `
<div class="scrim" data-scrim></div>
<div class="srch" role="dialog" aria-modal="true" aria-labelledby="srch-title">
  <div class="srch__h">
    <h2 class="sr-only" id="srch-title">${esc(t('search'))}</h2>
    <label class="srch__f">
      <span class="sr-only">${esc(t('search'))}</span>
      ${svg('search', 'srch__ico')}
      <input class="input" type="search" data-search-input autocomplete="off"
             placeholder="${esc(L(s.placeholder))}" dir="${isRTL() ? 'rtl' : 'ltr'}">
    </label>
    <button type="button" class="ico" data-close-overlay aria-label="${esc(t('close'))}">${svg('close')}</button>
  </div>
  <div class="srch__b" data-search-results>
    ${recent.length ? `<div class="srch__blk"><h3>${esc(L(s.recentLabel))}</h3>
      <div class="srch__chips">${recent.map(q =>
        `<button type="button" class="chip chip--sm" data-search-term="${esc(q)}">${esc(q)}</button>`).join('')}</div></div>` : ''}
    <div class="srch__blk"><h3>${esc(L(s.popularLabel))}</h3>
      <div class="srch__chips">${popular.map(p =>
        `<button type="button" class="chip chip--sm" data-search-term="${esc(p.title)}">${esc(p.title)}</button>`).join('')}</div></div>
  </div>
</div>`;
  }

  function NavDrawer() {
    const h = C.header;
    return `
<div class="scrim" data-scrim></div>
<aside class="drw drw--start" data-drawer="nav" role="dialog" aria-modal="true" aria-label="${esc(t('menu'))}">
  <div class="drw__h">
    <span class="logo"><span class="logo__latin">${esc(h.logo.latin)}</span>
      <span class="logo__ar" lang="ar" dir="rtl">${esc(h.logo.arabic)}</span></span>
    <button type="button" class="ico" data-close-overlay aria-label="${esc(t('close'))}">${svg('close')}</button>
  </div>
  <div class="drw__b">
    <ul class="mnav">
      ${h.commerce.map(i => `<li><a href="${i.href}">${esc(L(i.label))}</a></li>`).join('')}
      <li class="mnav__sep" aria-hidden="true"></li>
      <li>
        <button type="button" class="mnav__tg" aria-expanded="false" aria-controls="mstory">
          ${esc(L(h.story.label))} ${svg('caret')}</button>
        <ul class="mnav__sub" id="mstory">
          ${h.story.dropdown.map(d => `<li><a href="${d.href}">${esc(L(d.label))}</a></li>`).join('')}
        </ul>
      </li>
    </ul>
    <div class="langtog" role="group" aria-label="${esc(L(C.footer.languageLabel))}">
      <button type="button" data-locale="ar" lang="ar" aria-pressed="${isRTL()}">العربية</button>
      <button type="button" data-locale="en" aria-pressed="${!isRTL()}">English</button>
    </div>
  </div>
</aside>`;
  }

  /** D-04 back-in-stock capture — 10 products are fully sold out today. */
  function NotifyModal(handle) {
    const p = byHandle(handle); if (!p) return '';
    return `
<div class="scrim" data-scrim></div>
<div class="modal" role="dialog" aria-modal="true" aria-labelledby="notify-title">
  <button type="button" class="ico modal__x" data-close-overlay aria-label="${esc(t('close'))}">${svg('close')}</button>
  <h2 class="modal__t" id="notify-title">${esc(t('notifyTitle'))}</h2>
  <p class="modal__p"><b>${esc(p.title)}</b> — ${esc(t('notifyBody'))}</p>
  <form data-notify-form="${esc(handle)}" novalidate>
    <div class="close__grp">
      <label class="close__f"><span class="sr-only">${esc(L(C.keepclose.newsletter.label))}</span>
        <input class="input" type="email" name="email" required autocomplete="email"
               placeholder="${esc(L(C.keepclose.newsletter.placeholder))}" dir="${isRTL() ? 'rtl' : 'ltr'}"></label>
      <button class="btn" type="submit">${esc(t('notifyMe'))}</button>
    </div>
    <p class="close__msg" role="status" aria-live="polite"></p>
  </form>
</div>`;
  }

  /* ══════════════════════ RENDER ══════════════════════ */

  const SECTIONS = [
    ['sec-announcement', Announcement],
    ['sec-header',       Header],
    ['sec-hero',         Hero],
    ['sec-usp',          Usp],
    ['sec-proof',        Proof],
    ['sec-finder',       Finder],
    ['sec-mood',         Mood],
    ['sec-originals',    () => Collection(C.originals, 'original', 'originals')],
    ['sec-inspired',     () => Collection(C.inspired,  'inspired', 'inspired')],
    ['sec-set',          SetSection],
    ['sec-house',        House],
    ['sec-bestsellers',  BestSellers],
    ['sec-reviews',      Reviews],
    ['sec-recent',       Recent],
    ['sec-keepclose',    KeepClose],
    ['sec-footer',       Footer]
  ];

  function applyDocumentLocale() {
    const seo = C.seo[LOCALE], root = document.documentElement;
    root.lang = seo.lang; root.dir = seo.dir;
    document.title = seo.title;

    const set = (sel, attr, val) => { const n = document.querySelector(sel); if (n) n.setAttribute(attr, val); };
    set('meta[name="description"]', 'content', seo.description);
    set('link[rel="canonical"]', 'href', seo.canonical);
    set('meta[property="og:title"]', 'content', seo.title);
    set('meta[property="og:description"]', 'content', seo.description);

    const skip = document.querySelector('.skiplink');
    if (skip) skip.textContent = t('skip');

    const o = C.seo.organization, ld = el('ldOrganization');
    if (ld) ld.textContent = JSON.stringify({
      '@context': 'https://schema.org', '@type': 'Organization',
      name: o.name, url: o.url, logo: o.logo,
      sameAs: C.footer.social.map(s => s.url),
      address: { '@type': 'PostalAddress', addressLocality: o.addressLocality,
        addressRegion: o.addressRegion, addressCountry: o.addressCountry },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: o.ratingValue,
        reviewCount: o.reviewCount, bestRating: '5', worstRating: '1' }
    });

    /* D-01 — aggregateRating per product. Verified zero occurrences across
       all 56 live product pages; 54 of 56 qualify today. */
    const pld = el('ldProducts');
    if (pld && C.seo.emitProductLd) {
      const feat = CATALOGUE.filter(p => p.reviews > 0)
        .sort((a, b) => b.reviews - a.reviews).slice(0, C.seo.productLdCount);
      pld.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': feat.map(p => ({
          '@type': 'Product', name: p.title, url: `${o.url}/products/${p.handle}`,
          brand: { '@type': 'Brand', name: o.name },
          offers: { '@type': 'AggregateOffer', priceCurrency: 'EGP',
            lowPrice: p.min, highPrice: p.max,
            availability: p.soldOut ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock' },
          aggregateRating: { '@type': 'AggregateRating', ratingValue: String(p.rating),
            reviewCount: String(p.reviews), bestRating: '5', worstRating: '1' }
        }))
      });
    }
  }

  function render() {
    applyDocumentLocale();
    SECTIONS.forEach(([id, fn]) => { const m = el(id); if (m) m.innerHTML = fn(); });
    initRail();
    initMotion();
    updateLayerTotal();
  }

  /** Re-render one section without disturbing scroll position elsewhere. */
  function repaint(id, fn) {
    const m = el(id); if (!m) return;
    m.innerHTML = fn();
    initMotion();
    if (id === 'sec-bestsellers') initRail();
  }

  function setLocale(next) {
    if (next === LOCALE) return;
    LOCALE = next; store.set(LS.locale, LOCALE);
    // The card's own strings and numerals come from the library, so its
    // locale has to flip with this one.
    if (window.SIWA) window.SIWA.setLocale(LOCALE);
    familyIndex.clear();
    render();
    announce(t('localeChanged'));
    track('change_locale', { to: LOCALE });
  }

  /* ══════════════════════ FEEDBACK ══════════════════════ */

  let toastTimer;
  function toast(msg) {
    const n = el('toast'); if (!n) return;
    n.textContent = msg; n.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => n.classList.remove('show'), 2600);
  }
  function announce(msg) {
    const n = el('liveRegion');
    if (n) { n.textContent = ''; setTimeout(() => { n.textContent = msg; }, 40); }
  }

  /* ══════════════════════ OVERLAYS ══════════════════════ */

  let lastFocus = null;

  function openOverlay(html) {
    lastFocus = document.activeElement;
    const host = el('overlayHost');
    host.innerHTML = html;
    document.body.classList.add('is-locked');
    requestAnimationFrame(() => {
      host.querySelector('[data-scrim]')?.classList.add('open');
      host.querySelector('.drw, .srch, .modal')?.classList.add('open');
      (host.querySelector('input, button, a') || host.querySelector('.drw'))?.focus();
    });
  }

  function refreshOverlay(html) {
    const host = el('overlayHost');
    host.innerHTML = html;
    host.querySelector('[data-scrim]')?.classList.add('open');
    host.querySelector('.drw, .srch, .modal')?.classList.add('open');
  }

  function closeOverlay() {
    const host = el('overlayHost');
    if (!host.innerHTML) return;
    host.querySelector('[data-scrim]')?.classList.remove('open');
    host.querySelector('.drw, .srch, .modal')?.classList.remove('open');
    document.body.classList.remove('is-locked');
    setTimeout(() => { host.innerHTML = ''; }, 280);
    lastFocus?.focus();
  }

  function trapFocus(e) {
    const host = el('overlayHost');
    if (e.key !== 'Tab' || !host.innerHTML) return;
    const f = host.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ══════════════════════ CART & WISHLIST ══════════════════════ */

  function addToCart(handle, from, silent = false) {
    const p = byHandle(handle);
    if (!p || p.soldOut) return false;
    const v = cheapest(p);
    const existing = CART.find(l => l.handle === handle && l.variant === v.t);
    if (existing) existing.qty += 1; else CART.push({ handle, variant: v.t, price: v.p, qty: 1 });
    store.set(LS.cart, CART);
    track('add_to_cart', { handle, variant: v.t, quantity: 1, value: v.p, from_section: from });
    if (!silent) { toast(`${t('added')} — ${p.title}`); announce(`${t('added')} — ${p.title}`); }
    repaint('sec-header', Header);
    return true;
  }

  function toggleWishlist(handle) {
    const p = byHandle(handle);
    const adding = !WISHLIST.has(handle);
    adding ? WISHLIST.add(handle) : WISHLIST.delete(handle);
    store.set(LS.wishlist, [...WISHLIST]);
    document.querySelectorAll(`[data-wish="${CSS.escape(handle)}"]`).forEach(b => {
      b.setAttribute('aria-pressed', String(adding));
      b.setAttribute('aria-label', `${adding ? t('wishlistRem') : t('wishlistAdd')}: ${p ? p.title : handle}`);
    });
    repaint('sec-header', Header);
    track('toggle_wishlist', { handle, action: adding ? 'add' : 'remove' });
    announce(adding ? t('wishlistRem') : t('wishlistAdd'));
  }

  /** A-05 — record a product view, then repaint the rail. */
  function recordView(handle) {
    const key = C.recent.storageKey;
    const list = [handle, ...store.get(key, []).filter(h => h !== handle)].slice(0, C.recent.max);
    store.set(key, list);
    repaint('sec-recent', Recent);
  }

  /* ══════════════════════ RAIL ══════════════════════ */

  function initRail() {
    const track = document.querySelector('[data-rail-track]');
    const dots = document.querySelector('[data-rail-dots]');
    if (!track || !dots) return;

    const pages = () => Math.max(1, Math.ceil(track.scrollWidth / track.clientWidth));
    const build = () => {
      dots.innerHTML = Array.from({ length: pages() }, (_, i) =>
        `<button type="button" class="rail__dot" role="tab" data-dot="${i}"
                 aria-label="${digits(i + 1)}" aria-selected="${i === 0}"></button>`).join('');
    };
    const sync = () => {
      const per = track.clientWidth;
      // RTL scrollLeft is negative in modern engines — normalise to a page index.
      const idx = Math.round(Math.abs(track.scrollLeft) / per);
      dots.querySelectorAll('[data-dot]').forEach((d, i) => {
        d.setAttribute('aria-selected', String(i === idx));
        d.classList.toggle('is-on', i === idx);
      });
      const max = track.scrollWidth - per - 1;
      document.querySelector('[data-rail-prev]')?.toggleAttribute('disabled', Math.abs(track.scrollLeft) <= 1);
      document.querySelector('[data-rail-next]')?.toggleAttribute('disabled', Math.abs(track.scrollLeft) >= max);
    };

    build(); sync();
    track.addEventListener('scroll', () => requestAnimationFrame(sync), { passive: true });
    window.addEventListener('resize', () => { build(); sync(); });

    const step = dir => track.scrollBy({ left: track.clientWidth * dir * (isRTL() ? -1 : 1), behavior: 'smooth' });
    document.querySelector('[data-rail-prev]')?.addEventListener('click', () => step(-1));
    document.querySelector('[data-rail-next]')?.addEventListener('click', () => step(1));
    dots.addEventListener('click', e => {
      const d = e.target.closest('[data-dot]'); if (!d) return;
      track.scrollTo({ left: track.clientWidth * Number(d.dataset.dot) * (isRTL() ? -1 : 1), behavior: 'smooth' });
    });
  }

  /* ══════════════════════ LAYERING TOTAL ══════════════════════ */

  function updateLayerTotal() {
    const out = document.querySelector('[data-lay-total]');
    const btn = document.querySelector('[data-lay-add]');
    if (!out) return;
    const base = byHandle(el('layBase')?.value || '');
    const layer = byHandle(document.querySelector('[name="siwa-layer"]:checked')?.value || '');
    if (!base || !layer) { out.textContent = ''; btn?.setAttribute('disabled', ''); return; }
    const total = cheapest(base).p + cheapest(layer).p;
    out.innerHTML = `<b>${esc(base.title)}</b> + <b>${esc(layer.title)}</b>
      <span>${esc(L(C.set.layering.totalLabel))} ${money(total)}</span>`;
    btn?.removeAttribute('disabled');
  }

  /* ══════════════════════ MOTION (epic-design) ══════════════════════ */
  /* One rAF loop drives every parallax layer; nothing animates outside the
     viewport; only transform and opacity are touched. Disabled entirely for
     reduced-motion users and on coarse pointers. */

  let revealObs, parallaxNodes = [], rafPending = false, motionOn = false;

  function initMotion() {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    motionOn = C.motion.parallax && !reduce && !coarse;

    /* Staged reveal */
    revealObs?.disconnect();
    if ('IntersectionObserver' in window) {
      revealObs = new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (!en.isIntersecting) return;
          en.target.classList.add('in');
          const ev = en.target.dataset.viewEvent;
          if (ev && !en.target.dataset.fired) {
            en.target.dataset.fired = '1';
            track(ev, { scroll_depth: Math.round((window.scrollY / document.body.scrollHeight) * 100) });
          }
          if (en.target.classList.contains('card') && !en.target.dataset.fired) {
            en.target.dataset.fired = '1';
            track('view_product_card', { handle: en.target.dataset.handle,
              position: Number(en.target.dataset.index), collection: en.target.dataset.section });
          }
          if (!en.target.dataset.viewEvent && !en.target.classList.contains('card')) revealObs.unobserve(en.target);
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });

      document.querySelectorAll('section, .pcard, [data-reveal], [data-reveal-line]')
        .forEach(n => revealObs.observe(n));
    } else {
      document.querySelectorAll('[data-reveal], [data-reveal-line], section, .pcard')
        .forEach(n => n.classList.add('in'));
    }

    parallaxNodes = motionOn ? [...document.querySelectorAll('[data-parallax]')] : [];
    if (!motionOn) document.querySelectorAll('[data-parallax]').forEach(n => { n.style.transform = ''; });
    if (parallaxNodes.length) onScrollParallax();
  }

  function onScrollParallax() {
    if (rafPending || !motionOn) return;
    rafPending = true;
    requestAnimationFrame(() => {
      const vh = window.innerHeight;
      for (const n of parallaxNodes) {
        const r = n.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;   // off-screen: skip
        const f = parseFloat(n.dataset.parallax) * C.motion.parallaxStrength;
        const mid = r.top + r.height / 2 - vh / 2;
        n.style.transform = `translate3d(0, ${(-mid * f * 0.12).toFixed(2)}px, 0)`;
      }
      rafPending = false;
    });
  }

  function initSticky() {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          document.body.classList.toggle('is-scrolled', window.scrollY > 80);
          ticking = false;
        });
      }
      onScrollParallax();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ══════════════════════ SEARCH ══════════════════════ */

  function runSearch(query) {
    const host = document.querySelector('[data-search-results]');
    if (!host) return;
    const q = query.trim().toLowerCase();
    if (q.length < 2) { refreshOverlay(SearchModal()); return; }

    const hits = CATALOGUE.filter(p =>
      p.title.toLowerCase().includes(q) ||
      (p.house || '').toLowerCase().includes(q) ||
      (p.original || '').toLowerCase().includes(q) ||
      Object.values(p.notes || {}).join(' ').toLowerCase().includes(q) ||
      (C.productNamesAr[p.handle] || '').includes(query.trim())
    ).slice(0, 8);

    host.innerHTML = hits.length ? hits.map(p => `
<a class="sres" href="/products/${esc(p.handle)}" data-open-product data-handle="${esc(p.handle)}">
  <span class="sres__i">${primaryImage(p)
    ? `<img src="${primaryImage(p)}" alt="" loading="lazy">` : `<span class="card__ph">${svg('bottle')}</span>`}</span>
  <span class="sres__t"><b>${esc(p.title)}</b>
    ${p.house ? `<small>${esc(L(C.inspired.badge))} ${esc(p.original || p.house)}</small>` : ''}</span>
  <span class="sres__p">${money(p.min)}</span>
</a>`).join('') : `<p class="srch__empty">${esc(t('noResults'))}</p>`;

    const key = C.header.search.storageKey;
    store.set(key, [query.trim(), ...store.get(key, []).filter(r => r !== query.trim())].slice(0, 5));
    track('search', { query: q, results: hits.length });
  }

  /* ══════════════════════ EVENTS ══════════════════════ */

  function onClick(e) {
    const T = sel => e.target.closest(sel);

    if (T('[data-locale]')) { setLocale(T('[data-locale]').dataset.locale); return; }

    if (T('[data-ann-close]')) {
      store.set(C.announcement.storageKey, true);
      el('sec-announcement').innerHTML = '';
      track('dismiss_announcement'); return;
    }

    /* overlays */
    if (T('[data-open-cart]'))   { openOverlay(CartDrawer()); track('open_cart'); return; }
    if (T('[data-open-search]')) { openOverlay(SearchModal()); track('open_search'); return; }
    if (T('[data-open-nav]'))    { openOverlay(NavDrawer()); track('open_nav'); return; }
    if (T('[data-close-overlay]') || T('[data-scrim]')) { closeOverlay(); return; }
    const notify = T('[data-notify]');
    if (notify) { openOverlay(NotifyModal(notify.dataset.notify));
      track('open_back_in_stock', { handle: notify.dataset.notify }); return; }

    /* dropdowns / accordions */
    const tg = T('.nav__toggle, .mnav__tg, .ftr__gb');
    if (tg) {
      const open = tg.getAttribute('aria-expanded') === 'true';
      tg.setAttribute('aria-expanded', String(!open)); return;
    }

    /* product card */
    const wish = T('[data-wish]');
    if (wish) { toggleWishlist(wish.dataset.wish); return; }

    const add = T('[data-add]');
    if (add) {
      const label = add.innerHTML;
      add.dataset.state = 'loading'; add.innerHTML = esc(t('adding'));
      setTimeout(() => {
        addToCart(add.dataset.add, add.dataset.from);
        add.dataset.state = 'success'; add.innerHTML = esc(t('added'));
        setTimeout(() => {
          add.removeAttribute('data-state');
          add.innerHTML = label;
          if (add.dataset.from === 'cart-cross') refreshOverlay(CartDrawer());
        }, 1200);
      }, 220);
      return;
    }

    const pair = T('[data-add-pair]');
    if (pair) {
      const [a, b] = pair.dataset.addPair.split('|');
      const ok = [a, b].filter(h => addToCart(h, 'quiz', true)).length;
      toast(`${t('added')} · ${digits(ok)}`);
      track('quiz_add_pair', { persona: UI.quizResult, product: a, layer: b });
      openOverlay(CartDrawer()); return;
    }

    const open = T('[data-open-product]');
    if (open) {
      const card = open.closest('[data-handle]') || open;
      const handle = card?.dataset.handle;
      track('click_product_card', { handle, position: Number(card?.dataset.index),
        collection: card?.dataset.section });
      // Prototype: no PDP exists yet, so navigation is recorded and suppressed.
      e.preventDefault();
      if (handle) { recordView(handle); toast(`/products/${handle}`); }
      return;
    }

    /* cart lines */
    const qty = T('[data-qty]');
    if (qty) {
      const i = Number(qty.closest('[data-line]').dataset.line);
      CART[i].qty = Math.max(0, CART[i].qty + Number(qty.dataset.qty));
      if (!CART[i].qty) CART.splice(i, 1);
      store.set(LS.cart, CART); refreshOverlay(CartDrawer()); repaint('sec-header', Header); return;
    }
    const rm = T('[data-rm]');
    if (rm) {
      CART.splice(Number(rm.closest('[data-line]').dataset.line), 1);
      store.set(LS.cart, CART); refreshOverlay(CartDrawer()); repaint('sec-header', Header); return;
    }

    /* quiz (A-02) */
    if (T('[data-quiz-start]')) { UI.quizStep = 0; repaint('sec-finder', Finder); track('quiz_start'); return; }
    const ans = T('[data-quiz-answer]');
    if (ans) {
      const [key, value] = ans.dataset.quizAnswer.split('|');
      UI.quizAnswers[key] = value;
      track('quiz_answer', { question: key, value });
      if (UI.quizStep + 1 < C.finder.questions.length) UI.quizStep += 1;
      else {
        const scored = C.finder.personas.map(p => ({ p,
          score: Object.entries(p.match).filter(([k, v]) => UI.quizAnswers[k] === v).length }))
          .sort((a, b) => b.score - a.score);
        UI.quizResult = scored[0].score > 0 ? scored[0].p.key : C.finder.fallbackPersona;
        track('quiz_complete', { persona: UI.quizResult, ...UI.quizAnswers });
      }
      repaint('sec-finder', Finder); return;
    }
    if (T('[data-quiz-restart]')) {
      UI.quizStep = -1; UI.quizAnswers = {}; UI.quizResult = null;
      repaint('sec-finder', Finder); track('quiz_restart'); return;
    }

    /* mood facets (A-01) */
    const fam = T('[data-mood-family]');
    if (fam) {
      const v = fam.dataset.moodFamily || null;
      UI.moodFamily = UI.moodFamily === v ? null : v;
      UI.moodExpanded = false;
      repaint('sec-mood', Mood);
      track('filter_mood', { family: UI.moodFamily, register: UI.moodRegister });
      return;
    }
    const reg = T('[data-mood-register]');
    if (reg) {
      UI.moodRegister = UI.moodRegister === reg.dataset.moodRegister ? null : reg.dataset.moodRegister;
      UI.moodExpanded = false;
      repaint('sec-mood', Mood);
      track('filter_register', { register: UI.moodRegister }); return;
    }
    if (T('[data-mood-more]')) { UI.moodExpanded = true; repaint('sec-mood', Mood); return; }

    /* build your set (C-01, C-02) */
    const tab = T('[data-set-tab]');
    if (tab) { UI.setTab = tab.dataset.setTab; repaint('sec-set', SetSection); updateLayerTotal();
      track('switch_set_tab', { tab: UI.setTab }); return; }

    const pick = T('[data-bundle-pick]');
    if (pick) {
      const h = pick.dataset.bundlePick;
      if (UI.bundle.includes(h)) UI.bundle = UI.bundle.filter(x => x !== h);
      else if (UI.bundle.length < C.set.bundle.slots) UI.bundle.push(h);
      else { toast(L(C.set.bundle.pickLabel)); return; }
      repaint('sec-set', SetSection);
      track('bundle_pick', { handle: h, size: UI.bundle.length }); return;
    }
    const bRm = T('[data-bundle-remove]');
    if (bRm) { UI.bundle.splice(Number(bRm.dataset.bundleRemove), 1); repaint('sec-set', SetSection); return; }
    if (T('[data-bundle-add]')) {
      const n = UI.bundle.filter(h => addToCart(h, 'bundle-builder', true)).length;
      toast(`${t('added')} · ${digits(n)}`);
      track('bundle_add', { handles: [...UI.bundle] });
      UI.bundle = []; repaint('sec-set', SetSection); openOverlay(CartDrawer()); return;
    }
    if (T('[data-lay-add]')) {
      const base = el('layBase')?.value, layer = document.querySelector('[name="siwa-layer"]:checked')?.value;
      const n = [base, layer].filter(h => h && addToCart(h, 'layering', true)).length;
      toast(`${t('added')} · ${digits(n)}`);
      track('layering_add', { base, layer }); openOverlay(CartDrawer()); return;
    }
    const combo = T('[data-combo]');
    if (combo) {
      const [base, layer] = combo.dataset.combo.split('|');
      const sel = el('layBase'); if (sel) sel.value = base;
      const radio = document.querySelector(`[name="siwa-layer"][value="${CSS.escape(layer)}"]`);
      if (radio) radio.checked = true;
      updateLayerTotal(); track('layering_combo', { base, layer }); return;
    }

    /* reviews (D-02) */
    const sort = T('[data-rev-sort]');
    if (sort) { UI.reviewSort = sort.dataset.revSort; repaint('sec-reviews', Reviews);
      track('sort_reviews', { sort: UI.reviewSort }); return; }
    const help = T('[data-helpful]');
    if (help && !help.disabled) {
      const span = help.querySelector('span');
      span.textContent = digits(Number(span.textContent.replace(/\D/g, '')) + 1);
      help.disabled = true; track('click_review_helpful'); return;
    }

    /* recently viewed (A-05) */
    if (T('[data-recent-clear]')) {
      store.set(C.recent.storageKey, []); repaint('sec-recent', Recent); return;
    }

    /* referral (F-01) */
    const copy = T('[data-copy]');
    if (copy) {
      navigator.clipboard?.writeText(copy.dataset.copy)
        .then(() => { toast(L(C.keepclose.referral.copiedLabel)); track('copy_referral_link'); })
        .catch(() => toast(copy.dataset.copy));
      return;
    }

    /* search chips */
    const term = T('[data-search-term]');
    if (term) {
      const input = document.querySelector('[data-search-input]');
      if (input) { input.value = term.textContent.trim(); runSearch(input.value); input.focus(); }
      return;
    }

    /* declarative analytics */
    const ev = T('[data-ev]');
    if (ev) {
      let props = {}; try { props = JSON.parse(ev.dataset.evProps || '{}'); } catch { /* ignore */ }
      track(ev.dataset.ev, props);
    }
  }

  /* ══════════════════════ BOOT ══════════════════════ */

  function boot() {
    if (window.SIWA) window.SIWA.setLocale(LOCALE);   // card strings follow the page
    render();
    initSticky();

    document.addEventListener('click', onClick);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeOverlay(); trapFocus(e); });

    document.addEventListener('change', e => {
      if (e.target.matches('#layBase, [name="siwa-layer"]')) updateLayerTotal();
      if (e.target.matches('[data-gift-on]')) {
        GIFT.on = e.target.checked; store.set(LS.gift, GIFT);
        refreshOverlay(CartDrawer()); track('toggle_gift', { on: GIFT.on });
      }
      if (e.target.matches('[data-gift-hide]')) { GIFT.hidePrices = e.target.checked; store.set(LS.gift, GIFT); }
    });

    document.addEventListener('input', e => {
      if (e.target.matches('[data-search-input]')) {
        clearTimeout(e.target._t);
        e.target._t = setTimeout(() => runSearch(e.target.value), 200);
      }
      if (e.target.matches('[data-gift-note]')) { GIFT.note = e.target.value; store.set(LS.gift, GIFT); }
    });

    document.addEventListener('submit', e => {
      const nlForm = e.target.closest('[data-newsletter]');
      const nfForm = e.target.closest('[data-notify-form]');
      const form = nlForm || nfForm;
      if (!form) return;
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const msg = form.querySelector('.close__msg');
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim());
      input.setAttribute('aria-invalid', String(!ok));
      const cfg = C.keepclose.newsletter;
      msg.textContent = ok ? (nfForm ? t('notifyDone') : L(cfg.success)) : L(cfg.error);
      msg.className = `close__msg ${ok ? 'is-ok' : 'is-err'}`;
      track(nfForm ? 'submit_back_in_stock' : 'submit_newsletter',
        { success: ok, handle: nfForm?.dataset.notifyForm });
      if (ok) form.reset();
    });

    document.addEventListener('focusout', e => {
      const item = e.target.closest('.nav__has');
      if (item && !item.contains(e.relatedTarget)) item.querySelector('.nav__toggle')?.setAttribute('aria-expanded', 'false');
    });

    window.addEventListener('resize', () => { initMotion(); }, { passive: true });

    track('view_homepage');
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', boot) : boot();

  /* Exposed for QA and for the future Liquid port. */
  window.SIWA_HOMEPAGE = {
    setLocale, render, track, familiesOf,
    get locale() { return LOCALE; },
    get cart() { return CART; },
    get wishlist() { return [...WISHLIST]; },
    get ui() { return UI; }
  };
})();
