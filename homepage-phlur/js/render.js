/* ============================================================
   SIWA — PHLUR-STRUCTURE HOMEPAGE · RENDERER
   ------------------------------------------------------------
   Behaviour only. Every customer-facing string, price, URL, image
   name and product reference comes from js/config.js, the real
   catalogue in ../component-library/js/data.js, or the design
   tokens — never from this file. If you find yourself typing a
   sentence in here, it belongs in config.js.

   COMPOSES the component library, never forks it:
     · ProductCard / ProductImage / Price  from window.SIWA.ui
     · .pcard .pimg .pgrid .cgrid .ctile .btn .langtog
       keep the library's own styling; css/phlur.css only re-lays
       them out to Phlur's geometry.

   Layout numbers in config.layout are written onto :root as
   --ph-* custom properties, so the measured geometry stays a
   setting rather than a literal in the stylesheet.
   ============================================================ */
(() => {
  'use strict';

  const C = window.SIWA_PHLUR;
  const LIB = window.SIWA;
  const CATALOGUE = window.SIWA_PRODUCTS || [];

  if (!C)   { console.error('[siwa-phlur] config.js did not load'); return; }
  if (!LIB) { console.error('[siwa-phlur] component-library/js/library.js did not load'); return; }
  if (!CATALOGUE.length) console.warn('[siwa-phlur] catalogue empty — product rails will be sparse');

  const UI = LIB.ui;
  const IMG = window.SIWA_IMG_BASE || '../component-library/img/';

  /* ══════════════════════ STATE ══════════════════════ */

  const LS_LOCALE = 'siwa:locale';
  const store = {
    get(k, f) { try { const v = localStorage.getItem(k); return v == null ? f : JSON.parse(v); } catch { return f; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* private mode */ } }
  };

  let LOCALE = store.get(LS_LOCALE, null) || C.defaultLocale;
  const isRTL = () => LOCALE === 'ar';

  /* ══════════════════════ HELPERS ══════════════════════ */

  /* Bilingual leaf resolver: every customer-facing value is {en, ar}. */
  const L = v => (v && typeof v === 'object' && ('en' in v || 'ar' in v)) ? (v[LOCALE] ?? v.en ?? '') : (v ?? '');

  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));

  const $ = id => document.getElementById(id);
  const svg = name => (LIB.helpers && LIB.helpers.svg) ? LIB.helpers.svg(name) : '';

  /* Resolve a product rail from a config `source` declaration.
     Keeps curation in config: 'auto-by-reviews', 'kind:<kind>',
     or an explicit array of handles. */
  function resolveRail(source, count) {
    if (Array.isArray(source)) {
      return source.map(h => CATALOGUE.find(p => p.handle === h)).filter(Boolean).slice(0, count);
    }
    if (typeof source === 'string' && source.startsWith('kind:')) {
      const kind = source.slice(5);
      return CATALOGUE.filter(p => p.kind === kind).slice(0, count);
    }
    // default: rank by the real review count
    return [...CATALOGUE].sort((a, b) => (b.reviews || 0) - (a.reviews || 0)).slice(0, count);
  }

  /* ══════════════════════ GEOMETRY ══════════════════════
     config.layout + config.type -> a generated stylesheet.

     This MUST be a stylesheet and not inline properties on
     documentElement: an inline custom property outranks every
     stylesheet rule regardless of media query, so setting them
     inline silently kills all the responsive overrides. Emitting
     real :root rules — base plus one block per breakpoint — keeps
     the cascade intact and keeps every measured number a setting. */

  function geometryCSS() {
    const g = C.layout, t = C.type, bp = g.breakpoints;
    const decl = o => Object.entries(o).map(([k, v]) => `${k}:${v}`).join(';');

    const base = {
      '--ph-gutter':     g.gutter.desktop + 'px',
      '--ph-ann-h':      g.announcementH + 'px',
      '--ph-hdr-h':      g.headerH.desktop + 'px',
      '--ph-pad-top':    g.sectionPadTop + 'px',
      '--ph-head-gap':   g.headingGap + 'px',
      '--ph-sec-end':    g.sectionGapEnd + 'px',
      '--ph-hero-h':     g.hero.h + 'px',
      '--ph-banner-h':   g.banner.h + 'px',
      '--ph-banner-pad-top': g.banner.padTop + 'px',
      '--ph-card-w':     g.carousel.cardW + 'px',
      '--ph-card-gap':   g.carousel.gap + 'px',
      '--ph-card-ratio': g.carousel.imageRatio,
      '--ph-coll-cols':  g.collections.columns,
      '--ph-coll-gap':   g.collections.gap + 'px',
      '--ph-coll-ratio': g.collections.tileRatio,
      '--ph-iwt-text':   g.imageWithText.textCol + 'px',
      '--ph-iwt-img-h':  g.imageWithText.imageH + 'px',
      '--ph-iwt-gap':    g.imageWithText.gap + 'px',
      '--ph-rich-max':   g.richText.maxWidth + 'px',
      '--ph-scrim':        C.hero.scrimOpacity,
      '--ph-hdr-veil':     C.header.veilOpacity,
      '--ph-scrim-top':    C.hero.scrimTopOpacity,
      '--ph-scrim-top-h':  C.hero.scrimTopHeight + 'px',
      '--ph-hero-plate':   C.hero.plateOpacity,
      '--ph-banner-scrim': C.house.scrimOpacity,
      '--ph-banner-plate': C.house.plateOpacity,
      '--ph-coll-scrim':   C.collections.scrimOpacity,
      '--ph-t-hero':    t.heroTitle.size + 'px',    '--ph-ls-hero':    t.heroTitle.tracking + 'em',
      '--ph-t-banner':  t.bannerTitle.size + 'px',  '--ph-ls-banner':  t.bannerTitle.tracking + 'em',
      '--ph-t-section': t.sectionTitle.size + 'px', '--ph-ls-section': t.sectionTitle.tracking + 'em',
      '--ph-t-lead':    t.lead.size + 'px',
      '--ph-t-card':    t.cardTitle.size + 'px',    '--ph-ls-card':    t.cardTitle.tracking + 'em',
      '--ph-t-body':    t.body.size + 'px',
      '--ph-t-ui':      t.ui.size + 'px',           '--ph-ls-ui':      t.ui.tracking + 'em',
      '--ph-t-badge':   t.badge.size + 'px',        '--ph-ls-badge':   t.badge.tracking + 'em',
      /* cinematic hero (skills/epic-design) */
      '--scene-height':      (C.hero.motion?.sceneHeight ?? 200) + 'vh',
      '--ph-float-amp':      (C.hero.motion?.floatLoop?.amplitude ?? 10) + 'px',
      '--ph-float-dur':      (C.hero.motion?.floatLoop?.duration ?? 11) + 's',
      '--ph-line-stagger':   (C.hero.motion?.revealStaggerMs ?? 90) + 'ms',
      '--kb-scale':          (C.hero.motion?.kenBurns?.from ?? 1.06),
      '--ph-hero-focus':     C.hero.imageFocus || '50% 56%'
    };

    /* Below the tablet breakpoint Phlur halves the gutter, shrinks the
       header, turns the hero portrait and drops the carousel card width.
       Measured on the live capture at 768. */
    const tablet = {
      '--ph-gutter':    g.gutter.tablet + 'px',
      '--ph-hdr-h':     g.headerH.tablet + 'px',
      '--ph-hero-h':    g.hero.mobileH + 'px',
      '--ph-banner-h':  g.banner.mobileH + 'px',
      '--ph-card-w':    g.carousel.cardWTablet + 'px',
      '--ph-coll-cols': g.collections.mobileColumns,
      '--ph-t-hero':    t.heroTitle.mobileSize + 'px',
      '--ph-t-banner':  t.bannerTitle.mobileSize + 'px',
      '--ph-t-section': t.sectionTitle.mobileSize + 'px',
      '--ph-t-lead':    t.lead.mobileSize + 'px',
      '--ph-t-card':    t.cardTitle.mobileSize + 'px',
      '--ph-t-body':    t.body.mobileSize + 'px',
      '--ph-t-ui':      t.ui.mobileSize + 'px',
      '--ph-t-badge':   t.badge.mobileSize + 'px'
    };

    const small = {
      '--ph-gutter':   g.gutter.mobile + 'px',
      '--ph-hero-h':   g.hero.smallH + 'px',
      '--ph-banner-h': g.banner.smallH + 'px'
    };

    return `:root{${decl(base)}}\n` +
           `@media (max-width:${bp.tablet}px){:root{${decl(tablet)}}}\n` +
           `@media (max-width:${bp.small}px){:root{${decl(small)}}}`;
  }

  function applyGeometry() {
    let el = document.getElementById('phGeometry');
    if (!el) {
      el = document.createElement('style');
      el.id = 'phGeometry';
      document.head.appendChild(el);
    }
    el.textContent = geometryCSS();
  }

  /* ══════════════════════ SECTION BUILDERS ══════════════════════ */

  const sectionHead = (title, linkLabel, linkHref) => `
    <div class="ph-sec__head">
      <h2 class="ph-sec__title">${esc(L(title))}</h2>
      ${linkLabel ? `<a class="ph-sec__link" href="${esc(linkHref || '#')}">${esc(L(linkLabel))}</a>` : ''}
    </div>`;

  /* 1 · ANNOUNCEMENT — the library's AnnouncementBar (.annbar) */
  function announcement() {
    const a = C.announcement;
    if (!a.enabled) return '';
    const link = a.link
      ? ` <a class="lnk lnk--arrow" style="color:inherit" href="${esc(a.link.href)}">${esc(L(a.link.label))}</a>`
      : '';
    return `<div class="annbar ${esc(a.variant || '')}">${esc(L(a.message))}${link}</div>`;
  }

  /* 2 · HEADER — the library's Header (.hdr / .hdr__bar / .hdr__nav) */
  function header() {
    const h = C.header;
    const nav = h.nav.map(n =>
      `<a href="${esc(n.href)}"${n.current ? ' aria-current="page"' : ''}>${esc(L(n.label))}</a>`
    ).join('');
    const langtog = h.showLanguageToggle ? `<div class="langtog" role="group" aria-label="Language">
          <button data-loc="en" aria-pressed="${LOCALE === 'en'}">EN</button>
          <button data-loc="ar" aria-pressed="${LOCALE === 'ar'}" lang="ar">ع</button>
        </div>` : '';

    return `
      <header class="hdr${h.sticky ? ' hdr--sticky' : ''}">
        <div class="hdr__bar">
          <button class="iconbtn hdr__burger" data-drawer-open aria-label="${esc(L(h.labels.menu))}">${svg('burger')}</button>
          <a class="hdr__mark" href="${esc(h.wordmarkHref)}"><span>${esc(h.wordmark.en)}</span><span class="ar">${esc(h.wordmark.ar)}</span></a>
          <nav class="hdr__nav" aria-label="Primary">${nav}</nav>
          <div class="hdr__tools">
            ${langtog}
            ${h.showSearch ? `<button class="iconbtn" aria-label="${esc(L(h.labels.search))}">${svg('search')}</button>` : ''}
            ${h.showBag ? `<button class="iconbtn cartdot" data-opencart aria-label="${esc(L(h.labels.bag))}">${svg('bag')}<span data-cartcount style="display:none">0</span></button>` : ''}
          </div>
        </div>
      </header>
      <div class="ph-drawer" id="phDrawer" data-open="false" aria-hidden="true">
        <div class="ph-drawer__head">
          <button class="iconbtn" data-drawer-close aria-label="${esc(L(h.labels.close))}">${svg('close')}</button>
        </div>
        <nav aria-label="Mobile">${nav}</nav>
      </div>`;
  }

  /* 3 · HERO — cinematic scene (skills/epic-design)

     Structure follows the skill's Step 5 architecture exactly: a `.scene`
     wrapper sized in vh, a pinned `.scene__stage`, and one `.layer` per
     depth with a matching data-depth attribute. Every decorative layer is
     aria-hidden (rule 8); the copy layer is the only one in the a11y tree.

     Depth 0 is an over-scaled blurred copy of the photograph, depth 3 the
     sharp frame — see the note in config.hero.motion on why the same asset
     serves both. */
  function hero() {
    const o = C.hero;
    if (!o.enabled) return '';
    const m = o.motion || {};

    if ((m.style || 'pinned-scene') === 'fixed-parallax') return heroFixed(o, m);

    const scene = m.enabled ? ` style="--scene-height:${m.sceneHeight}vh"` : '';

    /* Masked line reveal — each line is its own clipping mask so the type
       wipes upward line by line rather than fading as a block. */
    const line = (cls, txt, i) =>
      `<span class="ph-line" style="--line-i:${i}"><span class="ph-line__in">${txt}</span></span>`;

    return `
      <section class="scene ph-hero${m.enabled ? ' ph-hero--cine' : ''}" data-scene="hero"${scene}>
        <div class="scene__stage">

          <div class="layer depth-0" data-depth="0" aria-hidden="true">
            <img class="ph-hero__backdrop" src="${IMG}${esc(o.image)}" alt="" decoding="async">
          </div>

          <div class="layer depth-1" data-depth="1" aria-hidden="true">
            <span class="ph-glow ph-glow--a"></span>
            <span class="ph-glow ph-glow--b"></span>
          </div>

          <div class="layer depth-2" data-depth="2" aria-hidden="true">
            <span class="ph-veil"></span>
          </div>

          <div class="layer depth-3" data-depth="3">
            <!-- Photograph and its grade are ONE rigid frame: the Ken Burns
                 scale and the float loop are applied to this wrapper, not to
                 the image, so the scrim scales and drifts with the picture
                 instead of sliding across it. -->
            <div class="ph-hero__frame float-loop">
              <img class="ph-hero__subject" src="${IMG}${esc(o.image)}"
                   alt="${esc(L(o.imageAlt))}" fetchpriority="high" decoding="async">
              <div class="ph-hero__scrim" aria-hidden="true"></div>
            </div>
          </div>

          <div class="layer depth-4" data-depth="4">
            <div class="ph-hero__body">
              ${o.eyebrow ? line('', `<span class="ph-hero__eyebrow">${esc(L(o.eyebrow))}</span>`, 0) : ''}
              <h1 class="ph-hero__title">${line('', esc(L(o.title)), 1)}</h1>
              <p class="ph-hero__sub">${line('', esc(L(o.subtitle)), 2)}</p>
              ${line('', `<a class="ph-btn ph-btn--on-media" href="${esc(o.cta.href)}">${esc(L(o.cta.label))}</a>`, 3)}
            </div>
          </div>

        </div>
      </section>`;
  }

  /* 3b · HERO — 'fixed-parallax'

     The photograph is a background layer with `background-attachment: fixed`,
     so it is positioned against the VIEWPORT rather than the section. The
     section scrolls over it and the window travels across the frame — no
     JS, no transforms, and the image cannot drift against its own grade
     because the scrim is simply the layer above it in the same background.

     There is no <img>, so the photograph's description rides on the section
     as role="img" + aria-label rather than being lost. */
  function heroFixed(o, m) {
    const line = (txt, i) =>
      `<span class="ph-line" style="--line-i:${i}"><span class="ph-line__in">${txt}</span></span>`;

    /* Resolved to an absolute URL. A relative url() inside a custom property
       is resolved against the stylesheet that declares it, and for an inline
       style attribute browsers disagree about what that means — the ../ was
       being dropped. new URL() against the document removes the ambiguity. */
    const src = new URL(IMG + o.image, document.baseURI).href;

    /* Single quotes inside url() — double quotes would close the HTML
       style="" attribute and truncate the declaration. */
    const style = [
      `--ph-hero-img:url('${src}')`,
      `--ph-hero-vh:${m.viewportHeight || 100}vh`
    ].join(';');

    return `
      <section class="ph-hero ph-hero--fixed" data-scene="hero"
               role="img" aria-label="${esc(L(o.imageAlt))}" style="${style}">
        <div class="ph-hero__body">
          ${o.eyebrow ? line(`<span class="ph-hero__eyebrow">${esc(L(o.eyebrow))}</span>`, 0) : ''}
          <h1 class="ph-hero__title">${line(esc(L(o.title)), 1)}</h1>
          <p class="ph-hero__sub">${line(esc(L(o.subtitle)), 2)}</p>
          ${line(`<a class="ph-btn ph-btn--on-media" href="${esc(o.cta.href)}">${esc(L(o.cta.label))}</a>`, 3)}
        </div>
      </section>`;
  }

  /* 4 & 7 · PRODUCT RAIL — the library's ProductCard on a Phlur track */
  function rail(cfg) {
    if (!cfg.enabled) return '';
    const items = resolveRail(cfg.source, cfg.count);
    const min = cfg.badgeMinReviews;
    const cards = items.map(p => {
      // Badge is a page-level affordance the card takes as an option — the
      // component is composed, never patched after the fact.
      const show = cfg.badge && (min == null || (p.reviews || 0) >= min);
      return UI.ProductCard(p, {
        mediaExtra: show ? `<span class="ph-card-badge">${esc(L(cfg.badge))}</span>` : '',
        // 24 of 56 catalogue products carry no notes. Reserving the slot
        // keeps the star row and the price aligned across the rail.
        reserveNotes: true
      });
    }).join('');

    return `
      <section class="ph-sec ph-wrap ph-reveal">
        ${sectionHead(cfg.title, cfg.linkLabel, cfg.linkHref)}
        <div class="ph-rail" role="region" aria-label="${esc(L(cfg.title))}" tabindex="0">${cards}</div>
      </section>`;
  }

  /* 5 · MANIFESTO */
  function manifesto() {
    const m = C.manifesto;
    if (!m.enabled) return '';
    return `
      <section class="ph-sec ph-wrap ph-manifesto ph-reveal">
        <p>${esc(L(m.text))}</p>
        <a class="ph-btn ph-btn--outline" href="${esc(m.cta.href)}">${esc(L(m.cta.label))}</a>
      </section>`;
  }

  /* 6 · HOUSE — inset banner */
  function houseBanner() {
    const b = C.house;
    if (!b.enabled) return '';
    return `
      <section class="ph-sec ph-wrap ph-banner-wrap ph-reveal">
        <div class="ph-banner">
          <div class="ph-banner__media"><img src="${IMG}${esc(b.image)}" alt="${esc(L(b.imageAlt))}" loading="lazy" decoding="async"></div>
          <div class="ph-banner__scrim" aria-hidden="true"></div>
          <div class="ph-banner__body">
            <h2 class="ph-banner__title">${esc(L(b.title))}</h2>
            <p class="ph-banner__sub">${esc(L(b.subtitle))}</p>
            <a class="ph-btn ph-btn--outline-on-media" href="${esc(b.cta.href)}">${esc(L(b.cta.label))}</a>
          </div>
        </div>
      </section>`;
  }

  /* 8 · FEATURED COLLECTIONS — 2-up, reusing the library's .cgrid/.ctile */
  function collections() {
    const c = C.collections;
    if (!c.enabled) return '';
    const tiles = c.tiles.map(tile => `
      <a class="ctile" href="${esc(tile.href)}">
        <img src="${IMG}${esc(tile.image)}" alt="${esc(L(tile.imageAlt))}" loading="lazy" decoding="async">
        <div class="ctile__cap">
          <h4>${esc(L(tile.label))}</h4>
          <p>${esc(L(tile.meta))}</p>
        </div>
      </a>`).join('');
    return `
      <section class="ph-sec ph-wrap ph-colls ph-reveal" id="collections">
        ${sectionHead(c.title)}
        <div class="cgrid">${tiles}</div>
      </section>`;
  }

  /* 9 · DISCOVERY — image with text */
  function discovery() {
    const d = C.discovery;
    if (!d.enabled) return '';
    return `
      <section class="ph-sec ph-wrap ph-reveal" id="discovery">
        <div class="ph-iwt">
          <div class="ph-iwt__body">
            <h2 class="ph-iwt__title">${esc(L(d.title))}</h2>
            <p class="ph-iwt__text">${esc(L(d.text))}</p>
            <a class="ph-btn ph-btn--outline" href="${esc(d.cta.href)}">${esc(L(d.cta.label))}</a>
          </div>
          <div class="ph-iwt__media">
            <img src="${IMG}${esc(d.image)}" alt="${esc(L(d.imageAlt))}" loading="lazy" decoding="async">
          </div>
        </div>
      </section>`;
  }

  /* 10 · FOOTER */
  function footer() {
    const f = C.footer;
    if (!f.enabled) return '';
    const cols = f.columns.map(col => `
      <div>
        <h4>${esc(L(col.heading))}</h4>
        <ul>${col.links.map(l => `<li><a href="${esc(l.href)}">${esc(L(l.label))}</a></li>`).join('')}</ul>
      </div>`).join('');
    const s = f.subscribe;
    return `
      <footer class="ph-ftr" id="footer">
        <div class="ph-ftr__grid">
          ${cols}
          <div class="ph-ftr__sub">
            <h4>${esc(L(s.heading))}</h4>
            <p style="margin:0 0 8px;font:400 14px/1.4 var(--font-ui)">${esc(L(s.text))}</p>
            <form onsubmit="return false">
              <label class="sr-only" for="phMail">${esc(L(s.placeholder))}</label>
              <input id="phMail" type="email" placeholder="${esc(L(s.placeholder))}" autocomplete="email">
              <button class="ph-btn" type="submit">${esc(L(s.cta))}</button>
            </form>
          </div>
        </div>
        <div class="ph-ftr__base">${esc(L(f.legal))}</div>
      </footer>`;
  }

  /* ══════════════════════ SEO ══════════════════════
     Title, description, canonical, hreflang and JSON-LD all follow
     the locale — CLAUDE.md "Bilingual by default". */

  function applySEO() {
    const s = C.seo;
    document.title = L(s.title);
    const set = (sel, attr, val) => { const el = document.querySelector(sel); if (el) el.setAttribute(attr, val); };
    set('meta[name="description"]', 'content', L(s.description));
    set('link[rel="canonical"]', 'href', s.locales[LOCALE] || s.canonical);

    const org = $('ldOrganization');
    if (org) org.textContent = JSON.stringify({
      '@context': 'https://schema.org', '@type': 'Organization',
      name: L(C.header.wordmark), url: s.canonical,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: s.aggregateRating.value,
        reviewCount: s.aggregateRating.count
      }
    });

    const prods = $('ldProducts');
    if (prods) prods.textContent = JSON.stringify({
      '@context': 'https://schema.org', '@type': 'ItemList',
      itemListElement: resolveRail(C.bestsellers.source, C.bestsellers.count).map((p, i) => ({
        '@type': 'ListItem', position: i + 1,
        item: {
          '@type': 'Product', name: p.title,
          offers: { '@type': 'Offer', price: p.min, priceCurrency: 'EGP' },
          ...(p.reviews ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: p.rating, reviewCount: p.reviews } } : {})
        }
      }))
    });
  }

  /* ══════════════════════ MOTION ══════════════════════
     One IntersectionObserver, reveal-once, transform+opacity only.
     Suppressed wholesale by prefers-reduced-motion in tokens.css. */

  function initMotion() {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = document.querySelectorAll('.ph-reveal');
    if (reduce || !('IntersectionObserver' in window)) {
      targets.forEach(el => el.setAttribute('data-in', 'true'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.setAttribute('data-in', 'true'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    targets.forEach(el => io.observe(el));
  }

  /* ══════════════════════ CINEMATIC HERO ══════════════════════
     skills/epic-design — 6-layer parallax against a pinned scene.

     Implemented on a single rAF loop in vanilla JS rather than the skill's
     suggested GSAP CDN: CLAUDE.md §2 states this project has no build step
     and no dependencies, and homepage/js/homepage.js already runs its
     parallax "off a single rAF loop". Matching the existing convention
     outranks the imported skill's tooling preference (CLAUDE.md §1.2).

     Only transform / opacity / filter are touched (rule 4). The loop is
     never armed under prefers-reduced-motion or on a coarse pointer
     (rule 9), and will-change is dropped once the scene leaves the
     viewport (rule 10). */

  let heroRAF = null;

  /* ══════════════════════ HEADER STATE ══════════════════════
     Transparent while the reader is on the hero photograph, opaque once
     past it. Driven by an IntersectionObserver on a zero-height sentinel
     rather than a scroll handler, so it costs nothing per frame.

     The threshold is the header's own height: the moment the hero's top
     passes under the bar, the bar takes its surface. */

  function initHeaderState() {
    const hdr = document.querySelector('.hdr');
    if (!hdr) return;

    // No hero to sit over — the bar is solid from the start.
    if (!document.querySelector('.scene, .ph-hero')) {
      hdr.setAttribute('data-scrolled', 'true');
      return;
    }

    /* One threshold, in pixels of scroll: above it the bar is transparent
       over the photograph, past it the bar takes its surface. Kept as a
       setting rather than derived from the hero's geometry so the flip
       point is directly adjustable. */
    const threshold = C.header.solidAfterScroll ?? 124;

    let solid = null;                       // last written state
    const apply = () => {
      const next = scrollY > threshold;
      if (next === solid) return;           // only touch the DOM on change
      solid = next;
      hdr.setAttribute('data-scrolled', String(next));
    };

    apply();
    addEventListener('scroll', apply, { passive: true });
  }

  function initHeroMotion() {
    const cfg = (C.hero.motion) || {};

    /* 'fixed-parallax' needs no engine — the browser does the parallax. The
       only thing to arm is the copy reveal, and it must be armed on a LATER
       frame than the markup was inserted or there is no state change for
       the transition to run from. */
    const fixed = document.querySelector('.ph-hero--fixed');
    if (fixed) {
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
      requestAnimationFrame(() => {
        fixed.setAttribute(reduce ? 'data-static' : 'data-armed', 'true');
      });
      return;
    }

    const scene = document.querySelector('.ph-hero--cine');
    if (!scene) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = matchMedia('(pointer: coarse)').matches;

    // Reveal the copy immediately and skip the engine entirely.
    if (!cfg.enabled || reduce || coarse) {
      scene.setAttribute('data-static', 'true');
      return;
    }

    const layers = Array.from(scene.querySelectorAll('.layer')).map(el => {
      const d = Number(el.getAttribute('data-depth'));
      const spec = (cfg.depths || []).find(x => x.d === d) || { parallax: 1, blur: 0, scale: 1 };
      return { el, spec };
    });
    // Ken Burns drives the FRAME (image + scrim together), never the image
    // alone — scaling only the image would slide it under a static grade.
    const subject = scene.querySelector('.ph-hero__frame');
    const kb = cfg.kenBurns || { from: 1, to: 1 };

    let ticking = false, visible = false, progress = 0;

    // Only run the loop while the scene is actually on screen.
    const vis = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      layers.forEach(({ el }) => { el.style.willChange = visible ? 'transform' : ''; });
      if (visible) schedule();
    }, { threshold: 0 });
    vis.observe(scene);

    function measure() {
      const r = scene.getBoundingClientRect();
      // 0 when the scene top hits the viewport top, 1 when its bottom does.
      const travel = Math.max(1, r.height - innerHeight);
      progress = Math.min(1, Math.max(0, -r.top / travel));
    }

    function paint() {
      ticking = false;
      if (!visible) return;
      measure();

      // Depth drift. Each layer travels a fraction of the scene's scroll
      // set by its depth: a layer at parallax 1.00 is the reference plane
      // and holds still against the pin, slower layers fall behind it and
      // faster ones run ahead. The spread between them is the parallax.
      const drift = progress * innerHeight * (cfg.driftFactor ?? 0.7);
      layers.forEach(({ el, spec }) => {
        const y = drift * (1 - spec.parallax);   // slower layers lag further
        el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
      });

      // Ken Burns on the subject, scrubbed rather than looped.
      if (subject) {
        const s = kb.from + (kb.to - kb.from) * progress;
        subject.style.setProperty('--kb-scale', s.toFixed(4));
      }

      // Drives the copy reveal and scrim deepening from CSS.
      scene.style.setProperty('--scene-progress', progress.toFixed(4));
    }

    function schedule() {
      if (ticking) return;
      ticking = true;
      heroRAF = requestAnimationFrame(paint);
    }

    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule, { passive: true });

    // Arm the reveal on the next frame so the transition actually plays.
    requestAnimationFrame(() => {
      scene.setAttribute('data-armed', 'true');
      paint();
    });
  }

  /* ══════════════════════ BEHAVIOUR ══════════════════════ */

  function initEvents() {
    document.addEventListener('click', (e) => {
      const loc = e.target.closest('[data-loc]');
      if (loc) { setLocale(loc.getAttribute('data-loc')); return; }

      if (e.target.closest('[data-drawer-open]'))  return toggleDrawer(true);
      if (e.target.closest('[data-drawer-close]')) return toggleDrawer(false);
      if (e.target.closest('.ph-drawer nav a'))    return toggleDrawer(false);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') toggleDrawer(false);
    });
  }

  function toggleDrawer(open) {
    const d = $('phDrawer');
    if (!d) return;
    d.setAttribute('data-open', String(open));
    d.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  function setLocale(next) {
    if (next === LOCALE) return;
    LOCALE = next;
    store.set(LS_LOCALE, LOCALE);
    if (LIB.setLocale) LIB.setLocale(LOCALE);        // keep the library in the same locale
    document.documentElement.lang = LOCALE;
    document.documentElement.dir = isRTL() ? 'rtl' : 'ltr';
    mount();
  }

  /* ══════════════════════ MOUNT ══════════════════════ */

  function mount() {
    applyGeometry();

    const put = (id, html) => { const el = $(id); if (el) el.innerHTML = html; };

    put('sec-announcement', announcement());
    put('sec-header',       header());
    put('sec-hero',         hero());
    put('sec-bestsellers',  rail(C.bestsellers));
    put('sec-manifesto',    manifesto());
    put('sec-house',        houseBanner());
    put('sec-originals',    rail(C.originals));
    put('sec-collections',  collections());
    put('sec-discovery',    discovery());
    put('sec-footer',       footer());

    // anchor targets the config links point at
    const bs = document.querySelector('#sec-bestsellers .ph-sec');
    if (bs) bs.id = 'bestsellers';
    const or = document.querySelector('#sec-originals .ph-sec');
    if (or) or.id = 'originals';
    const hs = document.querySelector('#sec-house .ph-sec');
    if (hs) hs.id = 'house';

    applySEO();
    initMotion();
    if (heroRAF) { cancelAnimationFrame(heroRAF); heroRAF = null; }
    initHeroMotion();
    initHeaderState();
  }

  /* ══════════════════════ BOOT ══════════════════════ */

  document.documentElement.lang = LOCALE;
  document.documentElement.dir = isRTL() ? 'rtl' : 'ltr';
  if (LIB.setLocale) LIB.setLocale(LOCALE);

  mount();
  initEvents();
})();
