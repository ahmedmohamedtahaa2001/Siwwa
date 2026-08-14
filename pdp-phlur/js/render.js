/* ============================================================
   SIWA — PHLUR-STRUCTURE PDP · BEHAVIOUR
   ------------------------------------------------------------
   Composes ../component-library/. Contains NO content string, no
   price, no product handle and no URL — every such value comes
   from js/config.js, and every product fact from the catalogue.

   Architecture mirrors ../homepage-phlur/js/render.js:
     config.layout + config.type  ->  <style id="pdpGeometry">
     config.*                     ->  mount() -> innerHTML
     locale switch                ->  full re-render + head rewrite

   ⚠ THE GENERATED-GEOMETRY RULE (learned on the homepage build)
   An inline custom property on documentElement outranks every
   stylesheet rule regardless of media query. Geometry is therefore
   emitted as a real <style> element carrying :root plus one block
   per breakpoint — never as element.style.setProperty.

   ⚠ THE TWO-REGISTER FIREWALL (DIRECTION.md Part 2 §5)
   register() derives 'original' | 'inspired' from the catalogue.
   The inspired-by block is refused for originals in code, not by
   configuration, because it is not a merchant choice.
   ============================================================ */
(function () {
  'use strict';

  var C = window.SIWA_PDP;
  var LIB = window.SIWA;
  var CATALOGUE = window.SIWA_PRODUCTS || [];

  if (!C || !LIB) {
    console.error('[pdp] config.js or library.js failed to load');
    return;
  }

  var UI = LIB.ui;
  var H = LIB.helpers;
  var IMG = window.SIWA_IMG_BASE || '../component-library/img/';
  var LS_LOCALE = 'siwa:locale';

  var LOCALE = (function () {
    try {
      var q = new URLSearchParams(location.search).get('locale');
      if (q === 'ar' || q === 'en') return q;
      /* The homepage and the Phlur homepage both JSON-encode this shared
         key, so it comes back as "ar" WITH the quotes. Parse when it is
         JSON, take it as-is when it is not. */
      var v = localStorage.getItem(LS_LOCALE);
      if (v == null) return C.defaultLocale;
      try { v = JSON.parse(v); } catch (e) {}
      return (v === 'ar' || v === 'en') ? v : C.defaultLocale;
    } catch (e) { return C.defaultLocale; }
  })();

  /* ---------- small helpers ---------- */

  var $ = function (id) { return document.getElementById(id); };
  var isRTL = function () { return LOCALE === 'ar'; };
  /* Resolve a bilingual {en, ar} leaf. */
  var L = function (v) {
    if (v == null) return '';
    if (typeof v === 'string') return v;
    return v[LOCALE] != null && v[LOCALE] !== '' ? v[LOCALE] : (v.en || '');
  };
  var esc = function (s) { return H && H.esc ? H.esc(s) : String(s == null ? '' : s); };
  var svg = function (n) { return H && H.svg ? H.svg(n) : ''; };
  var digits = function (s) { return H && H.digits ? H.digits(s) : String(s); };
  var money = function (n) { return H && H.money ? H.money(n) : String(n); };

  /* ---------- the product ---------- */

  function product() {
    var p = CATALOGUE.filter(function (x) { return x.handle === C.product.handle; })[0];
    if (!p) {
      console.warn('[pdp] handle "' + C.product.handle + '" not in catalogue; using the first entry');
      p = CATALOGUE[0];
    }
    return p;
  }

  /* The firewall. 16 originals vs 40 inspired-by.
     data-schema/README.md §3: the split lives in exactly one place. */
  function register(p) {
    return p && p.kind === 'inspired_by' ? 'inspired' : 'original';
  }

  /* Lowest available variant price, for the button and JSON-LD. */
  function activeVariant(p) {
    var vs = (p.variants || []).filter(function (v) { return v.a; });
    if (!vs.length) return (p.variants || [])[0] || null;
    return vs.reduce(function (a, b) { return b.p < a.p ? b : a; });
  }

  function soldOut(p) { return !!p.soldOut || !(p.variants || []).some(function (v) { return v.a; }); }

  /* Genuine compare-at only. data-schema §7.5: test the VALUE, not
     mere presence — 66 catalogue rows carry a literal "0.00". */
  function compareAt(p) {
    var v = activeVariant(p);
    if (!v || !p.onSale) return null;
    var was = p.compareAt || null;
    return (was && was > v.p) ? was : null;
  }

  /* ---------- geometry compiler ---------- */

  function geometry() {
    var l = C.layout, t = C.type;
    var px = function (n) { return n + 'px'; };

    var root = [
      '--pdp-max-width: ' + px(l.maxWidth),
      '--pdp-gutter: ' + px(l.gutter.desktop),
      '--pdp-ann-h: ' + px(l.announcementH),
      '--pdp-hdr-h: ' + px(l.headerH.desktop),
      '--pdp-sec-pad-top: ' + px(l.rail.padTop),
      '--pdp-sec-pad-end: ' + px(l.rail.padTop),
      '--pdp-heading-gap: ' + px(l.rail.headingGap),

      '--pdp-media-col: ' + l.hero.mediaCol,
      '--pdp-hero-gap: ' + px(l.hero.columnGap),
      '--pdp-hero-pad-bottom: ' + px(l.hero.padBottom),
      '--pdp-info-max: ' + px(l.hero.infoMaxWidth),
      '--pdp-info-rhythm: ' + px(l.hero.infoRhythm),
      '--pdp-sticky-top: ' + px(l.hero.stickyTop),
      '--pdp-media-ratio: ' + l.hero.mediaRatio,

      '--pdp-thumb-size: ' + px(C.hero.gallery.thumbnailSize),
      '--pdp-thumb-gap: ' + px(C.hero.gallery.thumbnailGap),

      '--pdp-acc-margin-top: ' + px(l.accordion.marginTop),
      '--pdp-acc-pad-y: ' + px(l.accordion.headerPadY),
      '--pdp-acc-icon: ' + px(l.accordion.iconSize),
      '--pdp-acc-icon-bar: ' + px(l.accordion.iconBar),
      '--pdp-acc-icon-inset: ' + px(l.accordion.iconInset),
      '--pdp-acc-ms: ' + l.accordion.transitionMs + 'ms',
      '--pdp-acc-content-lh: ' + l.accordion.contentLh,
      '--pdp-acc-content-ls: ' + px(l.accordion.contentTracking),

      '--pdp-notes-gap: ' + px(l.scentNotes.columnGap),
      '--pdp-notes-text-col: ' + l.scentNotes.textFr + 'fr',
      '--pdp-notes-image-col: ' + l.scentNotes.imageFr + 'fr',
      '--pdp-notes-label-w: ' + l.scentNotes.labelWidth + '%',
      '--pdp-notes-row-pad: ' + px(l.scentNotes.rowPadY),
      '--pdp-notes-row-border: 1px',
      '--pdp-notes-row-pad-top: ' + px(l.scentNotes.rowPadY),
      '--pdp-notes-body-size: ' + px(l.scentNotes.bodySize),
      '--pdp-notes-body-ls: ' + px(l.scentNotes.bodyTracking),
      '--pdp-notes-body-lh: ' + l.scentNotes.bodyLh,

      '--pdp-quote-inset: 0%',                  // desktop: no inset
      '--pdp-quote-text-col: ' + l.quote.textCol + '%',

      '--pdp-card-w: ' + px(l.rail.cardW),
      '--pdp-rail-gap: ' + px(l.rail.gap),
      '--pdp-buybar-h: ' + px(l.stickyCta.height),
      '--pdp-buybar-cta-min: ' + px(l.stickyCta.ctaMinWidth),
      '--pdp-atc-h: ' + px(l.hero.atcHeight),
      '--pdp-rail-thumb: ' + px(l.scentRailThumb),
      '--pdp-trust-icon: ' + px(l.trustIconSize),
      '--pdp-scales-max: ' + px(l.scalesMaxWidth),
      '--pdp-reviews-col: ' + px(l.reviewsSummaryCol),

      '--pdp-t-title: ' + px(t.productTitle.size),
      '--pdp-t-title-w: ' + t.productTitle.weight,
      '--pdp-t-title-ls: ' + (t.productTitle.tracking * t.productTitle.size).toFixed(2) + 'px',
      '--pdp-t-title-ar: ' + px(t.productTitleAr.size),
      '--pdp-t-variant: ' + px(t.variantTitle.size),
      '--pdp-t-tagline: ' + px(t.tagline.size),
      '--pdp-t-section: ' + px(t.sectionTitle.size),
      '--pdp-t-section-w: ' + t.sectionTitle.weight,
      '--pdp-t-section-ls: ' + (t.sectionTitle.tracking * t.sectionTitle.size).toFixed(2) + 'px',
      '--pdp-t-acc: ' + px(t.accordionTitle.size),
      '--pdp-t-acc-ls: ' + (t.accordionTitle.tracking * t.accordionTitle.size).toFixed(2) + 'px',
      '--pdp-t-note-label: ' + px(t.noteLabel.size),
      '--pdp-t-button: ' + px(t.button.size),
      '--pdp-t-button-ls: ' + (t.button.tracking * t.button.size).toFixed(2) + 'px'
    ].join(';');

    var tablet = [
      '--pdp-gutter: ' + px(l.gutter.tablet),
      '--pdp-hdr-h: ' + px(l.headerH.tablet),
      /* The notes and quote bands stack here; the hero does not —
         it holds its split down to 750. */
      '--pdp-notes-text-col: 1fr',
      '--pdp-notes-image-col: 1fr',
      /* Measured: the quote row holds its 1/3 : 2/3 split at 768 AND
         375 — it is the one band that never stacks. */
      '--pdp-quote-inset: ' + l.quote.textInsetMob + '%',
      '--pdp-notes-body-size: ' + px(l.scentNotes.bodySizeMob),
      '--pdp-notes-body-lh: ' + l.scentNotes.bodyLhMob,
      '--pdp-notes-body-ls: ' + px(l.scentNotes.bodyTrackingMob),
      '--pdp-notes-row-border: ' + px(l.scentNotes.rowBorderMob),
      '--pdp-notes-row-pad-top: ' + px(l.scentNotes.rowPadTopMob),
      '--pdp-t-title: ' + px(t.productTitle.mobileSize),
      '--pdp-t-title-ar: ' + px(t.productTitleAr.mobileSize),
      '--pdp-card-w: ' + px(l.rail.cardWTablet)
    ].join(';');

    var mobile = [
      '--pdp-gutter: ' + px(l.gutter.mobile),
      '--pdp-acc-pad-y: ' + px(l.accordion.headerPadYMob),
      '--pdp-heading-gap: ' + px(l.scentNotes.headingGapMob),
      '--pdp-buybar-h: ' + px(l.stickyCta.heightMobile),
      '--pdp-t-tagline: ' + px(t.tagline.mobileSize),
      '--pdp-t-section: ' + px(t.sectionTitle.mobileSize),
      '--pdp-t-variant: ' + px(t.variantTitle.mobileSize),
      /* The buy box is no longer sticky here, so the offset must go
         too — otherwise a static element reports a stale `top`. */
      '--pdp-sticky-top: auto'
    ].join(';');

    return ':root{' + root + '}' +
      '@media (max-width:' + (l.breakpoints.desktop - 1) + 'px){:root{' + tablet + '}}' +
      '@media (max-width:' + (l.breakpoints.tablet - 1) + 'px){:root{' + mobile + '}}';
  }

  function applyGeometry() {
    var el = $('pdpGeometry');
    if (!el) {
      el = document.createElement('style');
      el.id = 'pdpGeometry';
      document.head.appendChild(el);
    }
    el.textContent = geometry();
  }

  /* ============================================================
     BANDS
     ============================================================ */

  function wrap(inner, cls) {
    return '<div class="pdp-wrap ' + (cls || '') + '">' + inner + '</div>';
  }

  function sectionHead(title, cta) {
    return '<div class="pdp-sec__head">' +
      '<h2 class="pdp-sec__title">' + esc(title) + '</h2>' +
      (cta ? '<a class="pdp-sec__cta" href="' + esc(cta.href) + '">' + esc(cta.label) + '</a>' : '') +
      '</div>';
  }

  /* -- 1 announcement -- */
  function announcement() {
    if (!C.announcement.show) return '';
    return '<div class="pdp-ann">' +
      '<a href="' + esc(L(C.announcement.link)) + '">' + esc(L(C.announcement.text)) + '</a>' +
      '</div>';
  }

  /* -- 2 header -- */
  function header() {
    var nav = C.header.nav.map(function (n) {
      return '<a href="' + esc(n.href) + '">' + esc(L(n.label)) + '</a>';
    }).join('');
    return '<header class="pdp-hdr">' + wrap(
      '<div class="pdp-hdr__inner">' +
        '<a class="pdp-hdr__mark" href="/">' + esc(L(C.header.wordmark)) + '</a>' +
        '<nav class="pdp-hdr__nav" aria-label="Primary">' + nav + '</nav>' +
        '<div class="pdp-hdr__icons">' +
          (UI.LanguageToggle ? UI.LanguageToggle() : '') +
          (C.header.icons.search ? '<button type="button" aria-label="' + esc(L(C.header.searchLabel)) + '">' + svg('search') + '</button>' : '') +
          (C.header.icons.cart ? '<button type="button" aria-label="' + esc(L(C.header.cartLabel)) + '">' + svg('bag') + '</button>' : '') +
        '</div>' +
      '</div>') + '</header>';
  }

  /* -- 3 breadcrumbs -- */
  function breadcrumbs(p) {
    if (!C.breadcrumbs.show) return '';
    var items = C.breadcrumbs.trail.map(function (x) {
      return { label: L(x.label), href: x.href };
    });
    items.push({ label: p.title });
    var html = UI.Crumbs ? UI.Crumbs(items) : '';
    return '<div class="pdp-crumbs">' + wrap(html) + '</div>';
  }

  /* -- 4a gallery --
     ui.ProductImage renders a single frame. The catalogue gives at
     most two images (only mawj and coco-woods), so extra frames fall
     back to the library placeholder rather than repeating one shot. */
  /* Frames are the product's own image plus any explicitly listed in
     config.product.extraFrames. Nothing is GUESSED — an earlier pass
     probed for a `-name-2.jpg` companion and 404'd on every product
     that has only one shot, which is 50 of 56 (reference-analysis/
     08-ASSETS). Missing frames render the library placeholder. */
  function galleryFrames(p) {
    var out = [];
    if (p.img) out.push(p.img);
    (C.product.extraFrames || []).forEach(function (f) {
      if (f && out.indexOf(f) === -1) out.push(f);
    });
    var want = C.product.galleryFallbackFrames;
    while (out.length < want) out.push(null);   // null => placeholder
    return out;
  }

  function gallery(p) {
    var frames = galleryFrames(p);
    var main = frames[0]
      ? '<img src="' + IMG + esc(frames[0]) + '" alt="' + esc(p.title) + '" width="800" height="800">'
      : (UI.ProductImage ? UI.ProductImage(p, { zoom: C.hero.gallery.zoom }) : '');

    var badge = C.hero.gallery.badge.show
      ? '<span class="pdp-gal__badge">' + esc(L(C.hero.gallery.badge.text)) + '</span>' : '';

    var thumbs = C.hero.gallery.thumbnails ? '<ul class="pdp-gal__thumbs" role="list">' +
      frames.map(function (f, i) {
        var inner = f
          ? '<img src="' + IMG + esc(f) + '" alt="" loading="lazy">'
          : (H && H.monogram ? H.monogram(p.title) : '');
        return '<li><button type="button" class="pdp-gal__thumb" data-gal-thumb="' + i + '"' +
          ' data-src="' + (f ? IMG + esc(f) : '') + '"' +
          ' aria-current="' + (i === 0 ? 'true' : 'false') + '"' +
          ' aria-label="' + esc(p.title) + ' ' + digits(i + 1) + '">' + inner + '</button></li>';
      }).join('') + '</ul>' : '';

    return '<div class="pdp-hero__media">' + badge +
      '<div class="pdp-gal__main" id="pdpGalMain">' + main + '</div>' + thumbs + '</div>';
  }

  /* -- 4b buy box -- */

  function titleLockup(p) {
    var reg = register(p);
    /* The Arabic name is an originals-only field today (identity.title_ar).
       The catalogue carries none, so this renders only when authored —
       it is never transliterated or invented. */
    var ar = (reg === 'original' && p.titleAr) ? '<p class="pdp-title__ar">' + esc(p.titleAr) + '</p>' : '';
    /* Stars renders the count itself when asked; asking for it AND
       appending a link printed "5.00 (14 reviews) 14". The count is the
       link, so Stars stays bare. */
    var rating = p.rating
      ? '<div class="pdp-title__rating">' + UI.Stars(p.rating) +
        '<a href="#sec-reviews-anchor">' + esc(L(C.reviews.countLabel))
          .replace('{n}', digits(p.reviews)) + '</a></div>'
      : '';
    return '<div class="pdp-title">' +
      '<div class="pdp-title__row"><h1 class="pdp-title__h1">' + esc(p.title) + '</h1>' + rating + '</div>' +
      ar + '</div>';
  }

  function format(p) {
    var sizes = (p.sizes || []).join(' · ');
    if (!sizes) return '';
    return '<p class="pdp-format">' + esc(digits(sizes)) + '</p>';
  }

  function tagline(p) {
    if (!C.hero.tagline.show) return '';
    var text = L(C.hero.tagline.text);
    /* Fall back to the catalogue's own accord line rather than
       inventing a scent description. */
    if (!text && p.accords) text = String(p.accords).split('•')[0].trim();
    if (!text) return '';
    return '<p class="pdp-tagline">' + esc(text) + '</p>';
  }

  function inspiredBy(p) {
    /* ⚠ FIREWALL: never on an original. Refused in code. */
    if (register(p) !== 'inspired') return '';
    if (!C.hero.inspiredBy.show || !p.house) return '';
    var line = esc(L(C.hero.inspiredBy.label)) + ' <span class="pdp-inspired__house">' +
      esc(p.house) + (p.original ? ' ' + esc(p.original) : '') + '</span>';
    /* ⚠ LEGAL GATE (B-04): the retail figure ships off. The catalogue's
       originalPrice is flagged illustrative, not sourced. */
    if (C.hero.inspiredBy.showRetailPrice && p.originalPrice) {
      line += ' — ' + esc(money(p.originalPrice));
    }
    return '<p class="pdp-inspired">' + line +
      '<span class="pdp-inspired__note">' + esc(L(C.hero.inspiredBy.disclaimer)) + '</span></p>';
  }

  function scentRail(p) {
    var cfg = C.hero.scentRail;
    if (!cfg.show) return '';
    var reg = register(p);
    var pool = CATALOGUE.filter(function (x) {
      return register(x) === reg && x.handle !== p.handle;
    }).slice(0, cfg.count);
    if (!pool.length) return '';
    var items = pool.map(function (x) {
      var thumb = x.img
        ? '<img src="' + IMG + esc(x.img) + '" alt="" loading="lazy">'
        : (H && H.monogram ? H.monogram(x.title) : '');
      return '<li class="pdp-rail__item"><a href="?handle=' + esc(x.handle) + '">' +
        '<span class="pdp-rail__thumb">' + thumb + '</span>' +
        '<span class="pdp-rail__name">' + esc(x.title) + '</span>' +
        '</a></li>';
    }).join('');
    return '<div class="pdp-rail">' +
      '<span class="pdp-rail__label">' + esc(L(cfg.label)) + '</span>' +
      '<ul class="pdp-rail__track" role="list">' + items + '</ul></div>';
  }

  function sizes(p) {
    if (!C.hero.variantSelector.show || !(p.variants || []).length) return '';
    /* B-06: sold-out variants stay VISIBLE for price anchoring.
       ui.VariantSelector already renders them disabled, not hidden. */
    return '<div class="pdp-sizes">' +
      '<span class="pdp-sizes__label">' + esc(L(C.hero.variantSelector.label)) + '</span>' +
      UI.VariantSelector(p, 'pdp-size') + '</div>';
  }

  /* Phlur's signature merged control: price lives INSIDE the button. */
  function addToCart(p) {
    var cfg = C.hero.addToCart;
    var out = soldOut(p);
    if (out) {
      var notify = cfg.backInStock.show
        ? '<button type="button" class="pdp-notify">' + esc(L(cfg.backInStock.label)) + '</button>' : '';
      return '<button type="button" class="pdp-atc" disabled>' + esc(L(cfg.soldOutLabel)) + '</button>' + notify;
    }
    var v = activeVariant(p);
    var was = compareAt(p);
    return '<button type="button" class="pdp-atc" data-atc="' + esc(p.handle) + '" data-state="idle"' +
      ' data-label-idle="' + esc(L(cfg.label)) + '"' +
      ' data-label-loading="' + esc(L(cfg.loadingLabel)) + '"' +
      ' data-label-success="' + esc(L(cfg.successLabel)) + '">' +
      '<span class="pdp-atc__label">' + esc(L(cfg.label)) + '</span>' +
      (cfg.priceInButton && v
        ? '<span class="pdp-atc__dot">' + cfg.separator + '</span>' +
          '<span class="pdp-atc__now">' + esc(money(v.p)) + '</span>' +
          (was ? '<span class="pdp-atc__was">' + esc(money(was)) + '</span>' : '')
        : '') +
      '</button>';
  }

  function promise() {
    if (!C.hero.promise.show) return '';
    return '<p class="pdp-promise">' + esc(L(C.hero.promise.text)) + '</p>';
  }

  function trust() {
    if (!C.hero.trust || !C.hero.trust.length) return '';
    return '<ul class="pdp-trust" role="list">' + C.hero.trust.map(function (t) {
      return '<li>' + svg(t.icon) + '<span>' + esc(L(t.text)) + '</span></li>';
    }).join('') + '</ul>';
  }

  /* Accordion. Phlur drives its titles from a metafield JSON array,
     which is exactly the blocks-not-loop shape the Prime Directive
     wants; config.hero.accordion.items is that array. */
  function accordion(p) {
    var cfg = C.hero.accordion;
    var isBundle = /bundle/i.test(p.handle) || /bundle/i.test(p.title);

    var items = cfg.items.filter(function (it) {
      if (it.onlyWhen === 'bundle' && !isBundle) return false;
      return true;
    }).map(function (it) {
      var body = '';
      if (it.source === 'catalogue:body') {
        body = p.body ? '<p>' + esc(p.body) + '</p>' : '';
      } else if (it.source === 'catalogue:notes') {
        body = UI.NotePyramid ? UI.NotePyramid(p) : '';
      } else if (it.source === 'catalogue:bundleItems') {
        body = (p.variants || []).map(function (v) {
          return '<p>' + esc(v.t) + ' — ' + esc(money(v.p)) + '</p>';
        }).join('');
      } else if (it.body) {
        body = '<p>' + esc(L(it.body)) + '</p>';
      }
      return { id: it.id, title: L(it.title), body: body };
    }).filter(function (it) { return it.body; });

    if (!items.length) return '';

    return '<div class="pdp-acc">' + items.map(function (it, i) {
      var open = cfg.firstOpen && i === 0;
      var pid = 'acc-panel-' + it.id;
      return '<div class="pdp-acc__item">' +
        '<h3 style="margin:0">' +
        '<button type="button" class="pdp-acc__btn" aria-expanded="' + open + '" aria-controls="' + pid + '">' +
        '<span>' + esc(it.title) + '</span><span class="pdp-acc__icon" aria-hidden="true"></span>' +
        '</button></h3>' +
        '<div class="pdp-acc__panel" id="' + pid + '"' + (open ? '' : ' hidden') + '>' + it.body + '</div>' +
        '</div>';
    }).join('') + '</div>';
  }

  function hero(p) {
    var buy = [
      titleLockup(p),
      format(p),
      tagline(p),
      inspiredBy(p),
      scentRail(p),
      sizes(p),
      addToCart(p),
      promise(),
      trust(),
      accordion(p)
    ].filter(Boolean).join('');

    return '<section class="pdp-hero">' + wrap(
      '<div class="pdp-hero__grid">' + gallery(p) +
      '<div class="pdp-hero__buy" id="pdpBuyBox">' + buy + '</div></div>') + '</section>';
  }

  /* -- 5 scent notes -- */
  function scentNotes(p) {
    if (!C.scentNotes.show) return '';
    var n = p.notes || {};
    var has = Object.keys(n).length > 0;

    var tiers = has
      ? '<div class="pdp-notes__tiers">' + C.scentNotes.tiers.map(function (t) {
          if (!n[t.id]) return '';
          return '<div class="pdp-notes__tier">' +
            '<p class="pdp-notes__label">' + esc(L(t.label)) + '</p>' +
            '<p class="pdp-notes__val">' + esc(n[t.id]) + '</p></div>';
        }).join('') + '</div>'
      /* ⚠ 38 of 56 products have no notes. The empty state is the
         default case, never a placeholder pyramid. */
      : '<div class="pdp-notes__tiers"><p class="pdp-notes__empty">' +
        esc(L(C.scentNotes.emptyState)) + '</p></div>';

    var img = p.img
      ? '<div class="pdp-notes__media"><img src="' + IMG + esc(p.img) + '" alt="' +
        esc(L(C.scentNotes.image.alt) || p.title) + '" loading="lazy"></div>'
      : '<div class="pdp-notes__media"></div>';

    return '<section class="pdp-sec">' + wrap(
      sectionHead(L(C.scentNotes.heading)) +
      '<div class="pdp-notes__row">' + tiers + img + '</div>') + '</section>';
  }

  /* -- 6 scales (B-03) -- */
  function scales(p) {
    if (!C.scales.show) return '';
    /* ⚠ The metafields do not exist yet. With no data this renders the
       empty state; it never invents a rating. */
    var hasData = p.intensity != null || p.sillage != null;
    var body = hasData
      ? '<div class="pdp-scales__grid">' + C.scales.scales.map(function (s) {
          var lvl = p[s.id];
          if (lvl == null) return '';
          return '<div><p class="pdp-notes__label">' + esc(L(s.label)) + '</p>' +
            (UI.IntensityScale ? UI.IntensityScale(lvl) : '') + '</div>';
        }).join('') + '</div>'
      : '<p class="pdp-notes__empty">' + esc(L(C.scales.emptyState)) + '</p>';
    return '<section class="pdp-sec">' + wrap(sectionHead(L(C.scales.heading)) + body) + '</section>';
  }

  /* -- 7 / 10 card rails -- */
  function cardRail(cfg, p) {
    if (!cfg.show) return '';
    var reg = register(p);
    var pool;
    if (cfg.source === 'register') {
      pool = CATALOGUE.filter(function (x) { return register(x) === reg && x.handle !== p.handle; });
    } else {
      pool = CATALOGUE.filter(function (x) { return x.handle !== p.handle; });
    }
    pool = pool.slice(0, cfg.count);
    if (!pool.length) return '';
    var cards = pool.map(function (x) { return UI.ProductCard(x); }).join('');
    return '<section class="pdp-sec">' + wrap(
      sectionHead(L(cfg.heading), cfg.cta ? { label: L(cfg.cta.label), href: cfg.cta.href } : null) +
      '<div class="pdp-cards">' + cards + '</div>') + '</section>';
  }

  /* -- 8 quote -- */
  function quote(p) {
    if (!C.quote.show) return '';
    var file = C.quote.image.file || p.img;
    var img = file
      ? '<div class="pdp-quote__media"><img src="' + IMG + esc(file) + '" alt="' +
        esc(L(C.quote.image.alt)) + '" loading="lazy"></div>'
      : '<div class="pdp-quote__media"></div>';
    return '<section class="pdp-sec">' + wrap(
      '<div class="pdp-quote__row"><p class="pdp-quote__text">' + esc(L(C.quote.text)) + '</p>' +
      img + '</div>') + '</section>';
  }

  /* -- 9 reviews -- */
  function reviews(p) {
    if (!C.reviews.show) return '';
    var body;
    if (!p.reviews) {
      body = '<p class="pdp-notes__empty">' + esc(L(C.reviews.emptyState)) + '</p>';
    } else {
      body = '<div class="pdp-reviews__grid">' +
        '<div>' + (UI.ReviewSummary ? UI.ReviewSummary(p) : '') + '</div>' +
        '<div>' + (UI.ReviewList ? UI.ReviewList(p, { limit: C.reviews.limit, photos: C.reviews.showPhotos }) : '') + '</div>' +
        '</div>';
    }
    return '<section class="pdp-sec" id="sec-reviews-anchor">' + wrap(
      sectionHead(L(C.reviews.heading)) + body) + '</section>';
  }

  /* -- 11 sticky CTA -- */
  function stickyCta(p) {
    if (!C.stickyCta.show) return '';
    var meta = '';
    if (C.stickyCta.showRating && p.rating) {
      meta += UI.Stars(p.rating) + '<span>' + digits(p.reviews) + '</span>';
    }
    if (C.stickyCta.showFormat && (p.sizes || []).length) {
      meta += '<span>' + esc(digits(p.sizes.join(' · '))) + '</span>';
    }
    return '<div class="pdp-buybar" id="pdpBuyBar" data-shown="false">' +
      '<div class="pdp-buybar__copy">' +
        '<p class="pdp-buybar__title">' + esc(p.title) + '</p>' +
        (meta ? '<div class="pdp-buybar__meta">' + meta + '</div>' : '') +
      '</div>' + addToCart(p) + '</div>';
  }

  /* -- 12 footer -- */
  function footer() {
    var cols = C.footer.columns.map(function (c) {
      return '<div><p class="pdp-ftr__title">' + esc(L(c.title)) + '</p>' +
        '<ul class="pdp-ftr__list" role="list">' + c.links.map(function (l) {
          return '<li><a href="' + esc(l.href) + '">' + esc(L(l.label)) + '</a></li>';
        }).join('') + '</ul></div>';
    }).join('');
    var nl = C.footer.newsletter.show
      ? '<div><p class="pdp-ftr__title">' + esc(L(C.footer.newsletter.title)) + '</p>' +
        '<form class="pdp-ftr__form" onsubmit="return false">' +
        '<label class="sr-only" for="pdpNl">' + esc(L(C.footer.newsletter.placeholder)) + '</label>' +
        '<input id="pdpNl" type="email" placeholder="' + esc(L(C.footer.newsletter.placeholder)) + '">' +
        '<button type="submit">' + esc(L(C.footer.newsletter.cta)) + '</button></form></div>'
      : '';
    return '<footer class="pdp-ftr">' + wrap(
      '<div class="pdp-ftr__cols">' + cols + nl + '</div>' +
      '<p class="pdp-ftr__legal">' + esc(L(C.footer.legal)) + '</p>') + '</footer>';
  }

  /* ============================================================
     HEAD — rewritten per locale so the Arabic page is a real
     Arabic document, not an English one with mirrored boxes.
     ============================================================ */

  function head(p) {
    var v = activeVariant(p);
    document.title = p.title + L(C.seo.titleSuffix);
    var set = function (sel, attr, val) {
      var el = document.querySelector(sel);
      if (el) el.setAttribute(attr, val);
    };
    set('meta[name=description]', 'content', L(C.seo.description));
    var url = C.seo.canonicalBase + p.handle;
    set('link[rel=canonical]', 'href', LOCALE === 'ar' ? url + '?locale=ar' : url);
    set('link[hreflang=en]', 'href', url);
    set('link[hreflang=ar]', 'href', url + '?locale=ar');
    set('link[hreflang=x-default]', 'href', url);

    /* D-01: aggregateRating — the live store emits it on zero of 56
       PDPs (the audit's #1 finding). It is emitted here. */
    var ld = {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: p.title,
      brand: { '@type': 'Brand', name: L(C.seo.brandName) },
      description: p.body || undefined
    };
    if (v) {
      ld.offers = {
        '@type': 'Offer',
        price: String(v.p),
        priceCurrency: C.seo.currency,
        availability: soldOut(p) ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
        url: url
      };
    }
    if (p.rating && p.reviews) {
      ld.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: String(p.rating),
        reviewCount: String(p.reviews)
      };
    }
    var slot = $('ldProduct');
    if (slot) slot.textContent = JSON.stringify(ld);

    var crumbs = C.breadcrumbs.trail.map(function (x, i) {
      return { '@type': 'ListItem', position: i + 1, name: L(x.label), item: x.href };
    });
    crumbs.push({ '@type': 'ListItem', position: crumbs.length + 1, name: p.title, item: url });
    var bslot = $('ldBreadcrumbs');
    if (bslot) {
      bslot.textContent = JSON.stringify({
        '@context': 'https://schema.org/', '@type': 'BreadcrumbList', itemListElement: crumbs
      });
    }
  }

  /* ============================================================
     MOUNT
     ============================================================ */

  function mount() {
    var p = product();
    applyGeometry();
    head(p);

    var put = function (id, html) { var el = $(id); if (el) el.innerHTML = html; };
    put('sec-announcement',   announcement());
    put('sec-header',         header());
    put('sec-breadcrumbs',    breadcrumbs(p));
    put('sec-hero',           hero(p));
    put('sec-scent-notes',    scentNotes(p));
    put('sec-scales',         scales(p));
    put('sec-collection',     cardRail(C.collectionRail, p));
    put('sec-quote',          quote(p));
    put('sec-reviews',        reviews(p));
    put('sec-recommendations', cardRail(C.recommendations, p));
    put('sec-sticky-cta',     stickyCta(p));
    put('sec-footer',         footer());

    wireBuyBar();
  }

  /* ============================================================
     BEHAVIOUR — delegated, so a re-render never orphans a listener.
     ============================================================ */

  document.addEventListener('click', function (e) {
    /* -- accordion -- */
    var accBtn = e.target.closest && e.target.closest('.pdp-acc__btn');
    if (accBtn) {
      var open = accBtn.getAttribute('aria-expanded') === 'true';
      accBtn.setAttribute('aria-expanded', String(!open));
      var panel = document.getElementById(accBtn.getAttribute('aria-controls'));
      if (panel) panel.hidden = open;
      return;
    }

    /* -- gallery thumbnails -- */
    var thumb = e.target.closest && e.target.closest('.pdp-gal__thumb');
    if (thumb) {
      var src = thumb.getAttribute('data-src');
      var main = $('pdpGalMain');
      if (main && src) main.innerHTML = '<img src="' + src + '" alt="">';
      var all = document.querySelectorAll('.pdp-gal__thumb');
      for (var i = 0; i < all.length; i++) all[i].setAttribute('aria-current', 'false');
      thumb.setAttribute('aria-current', 'true');
      return;
    }

    /* -- add to bag -- */
    var atc = e.target.closest && e.target.closest('.pdp-atc[data-atc]');
    if (atc) {
      if (atc.getAttribute('data-state') !== 'idle') return;
      var label = atc.querySelector('.pdp-atc__label');
      atc.setAttribute('data-state', 'loading');
      if (label) label.textContent = atc.getAttribute('data-label-loading');
      setTimeout(function () {
        atc.setAttribute('data-state', 'success');
        if (label) label.textContent = atc.getAttribute('data-label-success');
        var lr = $('liveRegion');
        if (lr) lr.textContent = atc.getAttribute('data-label-success');
        setTimeout(function () {
          atc.setAttribute('data-state', 'idle');
          if (label) label.textContent = atc.getAttribute('data-label-idle');
        }, 1600);
      }, 500);
      return;
    }

    /* -- locale toggle -- */
    var loc = e.target.closest && e.target.closest('[data-loc]');
    if (loc) setLocale(loc.getAttribute('data-loc'));
  });

  /* Phlur reveals the sticky bar once the main buy box has scrolled
     away. An observer beats a scroll-depth threshold: it stays correct
     when the buy box changes height (locale, sold-out, no notes). */
  var barObserver = null;
  function wireBuyBar() {
    var bar = $('pdpBuyBar');
    var box = $('pdpBuyBox');
    if (!bar || !box || !('IntersectionObserver' in window)) return;
    if (barObserver) barObserver.disconnect();
    barObserver = new IntersectionObserver(function (entries) {
      bar.setAttribute('data-shown', String(!entries[0].isIntersecting));
    }, { rootMargin: '0px 0px -60% 0px' });
    barObserver.observe(box);
  }

  function setLocale(next) {
    if (next === LOCALE) return;
    LOCALE = next;
    try { localStorage.setItem(LS_LOCALE, JSON.stringify(LOCALE)); } catch (e) {}
    if (LIB.setLocale) LIB.setLocale(LOCALE);
    document.documentElement.lang = LOCALE;
    document.documentElement.dir = isRTL() ? 'rtl' : 'ltr';
    mount();
  }

  /* ---------- boot ---------- */

  /* A handle in the query string lets the scent rail navigate between
     products without a build step. */
  try {
    var qh = new URLSearchParams(location.search).get('handle');
    if (qh) C.product.handle = qh;
  } catch (e) {}

  if (LIB.setLocale) LIB.setLocale(LOCALE);
  document.documentElement.lang = LOCALE;
  document.documentElement.dir = isRTL() ? 'rtl' : 'ltr';
  mount();
})();
