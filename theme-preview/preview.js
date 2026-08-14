/* ============================================================
   SIWA — HOMEPAGE · cinematic build
   ------------------------------------------------------------
   Method: skills/epic-design.

   Structure and copy are read from siwa-theme/templates/index.json, so
   the page cannot drift from the theme. Art direction — imagery, notes,
   Arabic names, headlines, per-variant prices — comes from
   the per-product records in instagram-assets, flattened into art.json.

   ONE LANGUAGE AT A TIME. English from the template; Arabic from the AR
   map below, standing in for Shopify's Translate & Adapt.

   Every animated property is transform, opacity or clip-path. Nothing
   animates layout. All of it is off under prefers-reduced-motion.
   ============================================================ */
(() => {
  'use strict';

  const P = window.SIWA_PRODUCTS || [];
  /* The component library. Product cards, stars, badges and price come from
     it — this page composes them and owns only its own art direction. */
  const UI = (window.SIWA || {}).ui || {};
  /* Icons come from the library's own set — never redrawn here. */
  const svg = ((window.SIWA || {}).helpers || {}).svg || (() => '');
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const IG = '../instagram-assets/';
  let LOCALE = 'en', ART = {};

  const AR_D = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
  const digits = s => LOCALE === 'ar' ? String(s).replace(/\d/g, d => AR_D[+d]) : String(s);
  const money = n => LOCALE === 'ar'
    ? `${digits(Math.round(n).toLocaleString('en-US'))} ج.م`
    : `LE ${Math.round(n).toLocaleString('en-US')}`;

  /* Arabic copy — stands in for Translate & Adapt. */
  const AR = {
    'Where the sea is always moving.': 'حيث البحر لا يهدأ.',
    'Shop the house': 'تسوق المجموعة', 'Best selling': 'الأكثر مبيعاً',
    'Collections': 'المجموعات', 'Bundles': 'الباقات', 'Inspired by': 'مستوحى من',
    'Layering': 'التطبيق', 'Worn in Egypt': 'يُلبس في مصر',
    '4.98 out of 5': '٤٫٩٨ من ٥', 'Not sure yet?': 'لم تقرر بعد؟',
    'A real oasis, not an adjective': 'واحة حقيقية، لا صفة',
    'The House of Siwa': 'بيت سيوة', 'Read all reviews': 'اقرأ كل التقييمات',
    'Add both': 'أضف الاثنين', 'Shop sets': 'تسوق الأطقم', 'Explore': 'اكتشف',
    'Shop': 'تسوق', 'For Her': 'لها', 'For Him': 'له', 'For her': 'لها', 'For him': 'له',
    'Original Creations': 'إبداعات أصلية', 'Body & Home': 'الجسم والمنزل',
    'Sets & Gifts': 'أطقم وهدايا', '14-day returns': 'إرجاع خلال ١٤ يوماً',
    'Support on WhatsApp': 'الدعم عبر واتساب',
    'Free shipping over 1,500 EGP': 'شحن مجاني فوق ١٥٠٠ ج.م',
    'Where are you wearing it?': 'أين سترتديه؟', 'Every day': 'كل يوم',
    'After dark': 'بعد الغروب', 'Somewhere warm': 'في مكان دافئ',
    'A room full of people': 'غرفة مليئة بالناس', 'Siwa Oasis, Egypt': 'واحة سيوة، مصر',
    'Top notes': 'النوتات العليا', 'Heart notes': 'نوتات القلب',
    'Base notes': 'النوتات الأساسية', 'Sold out': 'نفدت الكمية',
    'From': 'من', 'Together': 'المجموع', 'View all': 'عرض الكل',
    'Vanilla, in a deeper state.': 'فانيليا، في حالة أعمق.',
    'Sale': 'تخفيض', 'Best seller': 'الأكثر مبيعاً', 'Siwan original': 'إبداع سيوي',
    'Add to bag': 'أضف إلى الحقيبة', 'Notify me': 'أعلمني',
    'Previous': 'السابق', 'Next': 'التالي',
    'Go to page': 'اذهب إلى الصفحة', 'Play': 'تشغيل',
    'Worn by you': 'بأسلوبكم', 'Shop this': 'تسوق هذا'
  };
  const T = v => {
    if (!v || LOCALE === 'en') return v;
    const bare = String(v).replace(/<\/?p>/g, '').trim();
    const hit = AR[bare];
    if (!hit) return v;
    return /^<p>/.test(String(v).trim()) ? `<p>${hit}</p>` : hit;
  };

  /* ---------- catalogue ---------- */
  const ranked = [...P].sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
  const inspired = P.filter(p => p.kind === 'inspired_by');
  const byHandle = h => P.find(p => p.handle === h);
  // Best sellers by real review count — the badge has to mean something.
  const TOP5 = new Set([...P].sort((a,b)=>(b.reviews||0)-(a.reviews||0)).slice(0,5).map(p=>p.handle));

  // The README names the strongest assets in the set.
  const HERO_IMG = 'mawj/DOTzj9WFZwB_1.jpg';
  const PYRAMID_IMG = 'coco-woods/DXH731vCike_1.jpg';
  const gallery = () => {
    const out = [];
    Object.entries(ART).forEach(([h, a]) => (a.images || []).forEach((src, i) =>
      out.push({ handle: h, src, alt: (a.alts || [])[i] || '', title: a.title })));
    return out;
  };

  const stars = (r, n) => `<span class="pc__stars">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4 6.2 20.5l1.1-6.5L2.6 9.4l6.5-.9z"/></svg>
    ${digits(r)}${n ? ` <span style="opacity:.6">(${digits(n)})</span>` : ''}</span>`;

  const BOTTLE = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 2h6v3.5l1.6 2.2c.6.8.9 1.7.9 2.7V21a1 1 0 0 1-1 1H7.5a1 1 0 0 1-1-1V10.4c0-1 .3-1.9.9-2.7L9 5.5z" fill="none" stroke="currentColor" stroke-width="1.1"/></svg>`;

  /* Price is ALWAYS shown. "Price?" / "بكام" is the single most repeated
     comment across every Instagram post in the capture. */
  /* Product card — the component library's unified card, in its full-bleed
     `feature` skin. This page owns only the art direction (campaign imagery
     from instagram-assets, the note line, the badge vocabulary); the card
     itself is composed, never forked. See component-library/js/library.js.
     Price is never optional: "price?" / "بكام" is the most repeated
     comment across every Instagram post in the capture. */
  const pcard = (p, i = 0) => {
    const art = ART[p.handle] || {};
    const imgs = art.images || [];
    const a = imgs[0], b = imgs[1];
    /* The house carries the weight, not the phrase that frames it, so the
       line goes to the card as markup rather than as a flat string — a
       plain `sub` would be escaped whole and the split would be lost.
       Same shape the library's own default builds. */
    const subHtml = `<p class="pcard__sub">${
      p.kind === 'inspired_by' && p.house
        ? `${esc(T('Inspired by'))} <span class="pcard__house">${esc(p.house)}</span>`
        : esc(art.subtitle || 'Extrait de Parfum')}</p>`;
    /* Notes fallback chain. The catalogue carries tiered notes on 18 of
       56 products and a description on all of them, so the line is
       almost always fillable:
         campaign record → tiered notes → accords → description  */
    let notes = '';
    if (art.notes && art.notes.top) notes = art.notes.top.join(', ');
    else if (p.notes && p.notes.top) notes = [p.notes.top, p.notes.heart, p.notes.base].filter(Boolean).join(' · ');
    else if (p.accords) notes = p.accords;
    else if (p.body) {
      // Descriptions often open by repeating the product name — drop it.
      notes = String(p.body).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      const t = p.title.trim();
      if (notes.toLowerCase().startsWith(t.toLowerCase()))
        notes = notes.slice(t.length).replace(/^[\s:·—-]+/, '');
      notes = notes.slice(0, 150);
    }

    /* Badge, only when it says something. A "New" on all 56 is noise.
       The vocabulary is this page's; the badge component is the library's. */
    let badge = null, badgeVar = 'new';
    if (p.soldOut) { badge = T('Sold out'); badgeVar = 'soldout'; }
    else if (p.onSale) { badge = T('Sale'); badgeVar = 'sale'; }
    else if (TOP5.has(p.handle)) { badge = T('Best seller'); badgeVar = 'new'; }
    else if (p.kind === 'siwa_owned') { badge = T('Siwan original'); badgeVar = 'authentic'; }

    return UI.ProductCard(p, {
      modifier: 'pcard--feature',
      images: [a ? IG + a : null, b ? IG + b : null],
      alt: (art.alts || [])[0] || p.title,
      subHtml, notes, reserveNotes: true,
      badges: badge ? `<span class="badge badge--${badgeVar}">${esc(badge)}</span>` : '',
      href: '#',
      index: i,
      attrs: `style="--i:${i}"`
    });
  };

  /* Unified carousel — one component for every horizontal rail.
     The track is content-agnostic: product cards, UGC reels, bundles
     and quotes all go in as-is. Controls live under the track as a
     single bar — prev · dots · next — so there is one control
     convention on the site rather than one per rail.

     `media: true` narrows the slides for portrait 9:16 reels. */
  const carousel = (items, opts = {}) => `
    <div class="car ${opts.dark ? 'car--dark' : ''} ${opts.media ? 'car--media' : ''}" data-siwa-carousel>
      ${opts.heading || opts.eyebrow || opts.link ? `
      <div class="car__head">
        <div>
          <span class="rule" data-reveal></span>
          ${opts.eyebrow ? `<p class="eyebrow" data-reveal>${esc(opts.eyebrow)}</p>` : ''}
          ${opts.heading ? `<h2 class="ttl" data-lines>${lines(opts.heading)}</h2>` : ''}
        </div>
        ${opts.link ? `<div data-reveal data-delay="2"><a class="btn btn--tertiary" href="#">${esc(opts.link)} →</a></div>` : ''}
      </div>` : ''}

      <div class="car__track" data-stagger>${items}</div>

      ${/* Both arrows draw the same glyph; prev is mirrored in CSS, and the
            mirroring swaps again under RTL. The dots are built by the driver,
            not here — their count depends on how many slides fit the viewport,
            which is only knowable at runtime. */''}
      <div class="car__foot" data-carousel-foot hidden>
        <button class="car__btn car__btn--prev" type="button" data-carousel-prev aria-label="${esc(T('Previous')||'Previous')}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg></button>
        <div class="car__dots" role="tablist" data-carousel-dots
             data-label="${esc(T('Go to page')||'Go to page')}"></div>
        <button class="car__btn car__btn--next" type="button" data-carousel-next aria-label="${esc(T('Next')||'Next')}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg></button>
      </div>
    </div>`;

  const playGlyph = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5l11 7-11 7z" fill="currentColor"/></svg>`;

  /* UGC video card — portrait reel that drops into the same track.
     Facade: only the poster loads until the reel is played. */
  const vcard = (v, i) => `
    <button class="vcd" type="button" style="--i:${i}" data-ugc="${esc(v.src || '')}"
            aria-label="${esc(T('Play')||'Play')} — ${esc(v.by || '')}">
      <img src="${IG}${esc(v.poster)}" alt="${esc(v.alt || '')}" loading="lazy">
      <span class="vcd__veil"></span>
      <span class="vcd__play">${playGlyph}</span>
      <span class="vcd__body">
        ${v.by ? `<span class="vcd__by">${esc(v.by)}</span>` : ''}
        ${v.caption ? `<span class="vcd__cap">${esc(T(v.caption) || v.caption)}</span>` : ''}
        ${v.shop ? `<span class="vcd__shop">${esc(T(v.shop) || v.shop)}</span>` : ''}
      </span>
    </button>`;

  /* Collection card — square, gradient veil, type on the veil. */
  const ccard = (t, img, alt, i) => `
    <a class="ccd" href="#" style="--i:${i}">
      <img src="${IG}${esc(img)}" alt="${esc(alt||'')}" loading="lazy">
      <span class="ccd__veil"></span>
      <span class="ccd__body">
        ${t.meta ? `<span class="ccd__meta">${esc(t.meta)}</span>` : ''}
        <span class="ccd__title">${esc(T(t.title)||'')}</span>
        <span class="ccd__cta">${esc(T(t.cta_label)||T('Explore'))}
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg></span>
      </span></a>`;

  /* Bundle card — square: three bottles over a detail row. */
  const bcard = (name, members, price, was, i) => `
    <a class="bcd" href="#" style="--i:${i}">
      <span class="bcd__row">${[0,1,2].map(n => {
        const m = members[n]; const art = m ? (ART[m.handle]||{}) : {};
        const img = (art.images||[])[0];
        return `<span class="bcd__cell">${img
          ? `<img src="${IG}${esc(img)}" alt="${esc(m.title)}" loading="lazy">`
          : `<span class="bcd__ph">${BOTTLE}</span>`}</span>`;
      }).join('')}</span>
      <span class="bcd__body">
        <span class="bcd__title">${esc(name)}</span>
        <span class="bcd__items">${members.map(m => esc(m.title)).join(' · ')}</span>
        <span class="bcd__foot">
          <span class="bcd__price">${money(price)}</span>
          ${was > price ? `<span class="bcd__was">${money(was)}</span>
            <span class="bcd__save">${LOCALE==='ar'?'وفّر':'Save'} ${money(was-price)}</span>` : ''}
        </span>
      </span></a>`;

  const note = t => `<p class="note">${esc(t)}</p>`;
  const lines = text => {
    const parts = String(text || '').split(/(?<=[.!?])\s+/).filter(Boolean);
    return (parts.length ? parts : [String(text || '')])
      .map(l => `<span class="line" data-line><span>${esc(l)}</span></span>`).join('');
  };

  const head = (s, opts = {}) => {
    const h = T(s.heading), lede = T(s.subheading || '');
    if (!h && !s.eyebrow) return '';
    return `<div class="band__head ${opts.split ? 'band__head--split' : ''}">
      <div>
        <span class="rule" data-reveal></span>
        ${s.eyebrow ? `<p class="eyebrow" data-reveal>${esc(T(s.eyebrow))}</p>` : ''}
        ${h ? `<h2 class="ttl" data-lines>${lines(h)}</h2>` : ''}
        ${lede ? `<div class="lede" data-reveal data-delay="2">${lede}</div>` : ''}
      </div>
      ${opts.link ? `<a class="btn btn--tertiary" href="#" data-reveal data-delay="3">${esc(T(opts.link))} →</a>` : ''}
    </div>`;
  };

  /* ---------- band renderers ---------- */
  const R = {
    hero: (s, sec) => {
      const b = Object.values(sec.blocks || {})[0];
      const bs = (b && b.settings) || {};
      const art = ART['mawj'] || {};
      const p = byHandle('mawj') || ranked[0];
      return { bare: true, html: `
      <section class="hero">
        <div class="hero__bg depth-0" data-parallax data-speed="0.16">
          <img src="${IG}${HERO_IMG}" alt="${esc((art.alts || [])[0] || '')}" fetchpriority="high">
        </div>
        <div class="hero__wash depth-1"></div>
        <div class="hero__grain depth-5"></div>
        <div class="hero__in depth-4">
          <span class="rule" data-reveal></span>
          <h1 class="hero__ttl" data-lines>${lines(T(art.headline || bs.heading))}</h1>
          <div class="hero__meta" data-reveal data-delay="2">
            ${p ? `<span class="hero__price"><small>${esc(T('From'))}</small>${money(p.min)}</span>` : ''}
            ${p && p.reviews ? stars(p.rating, p.reviews) : ''}
          </div>
          <div class="hero__cta" data-reveal data-delay="3">
            <a class="btn btn--xl" href="#">${esc(T(bs.cta_label) || 'Shop')}</a>
            <a class="btn btn--xl btn--clear" href="#quiz">${esc(T('Not sure yet?'))}</a>
          </div>
        </div>
        <span class="hero__scroll depth-4"><i></i></span>
      </section>` };
    },

    'text-columns': (s, sec) => {
      const cols = Object.values(sec.blocks || {}).map(b => b.settings);
      const one = cols.map(c => `<span>${BOTTLE}${esc(T(c.heading) || '')}</span>`).join('');
      return { bare: true, html: `<div class="strip"><div class="strip__in">${one}${one}${one}</div></div>` };
    },

    'featured-collections': (s, sec) => {
      const blocks = Object.values(sec.blocks || {});

      // Best selling — the unified carousel.
      if (s.layout === 'carousel') {
        return { html: carousel(ranked.slice(0, 10).map((p, i) => pcard(p, i)).join(''),
          { heading: T(s.heading), link: T('View all') }) +
          note('Collection not assigned — the real catalogue ranked by review count. 4 products have campaign photography; the rest use the bottle placeholder.') };
      }

      // Bundles — square bundle cards, in the same carousel.
      if (s.layout === 'grid') {
        const sets = [
          ['The Discovery Set', [ranked[0], ranked[1], ranked[2]], 1450, 1850],
          ['For Him', [byHandle('mawj'), ranked[3], ranked[4]].filter(Boolean), 1900, 2400],
          ['For Her', [byHandle('pink-allure'), ranked[5], ranked[6]].filter(Boolean), 1650, 2050],
          ['The Layering Duo', [byHandle('pink-allure'), byHandle('coco-woods')].filter(Boolean), 1200, 1450]
        ];
        return { html: carousel(sets.map(([n, m, price, was], i) => bcard(n, m, price, was, i)).join(''),
          { heading: T(s.heading), link: T('Shop sets') }) +
          note('⚠ NO BUNDLE PRODUCTS EXIST IN THE CATALOGUE. These four are illustrative compositions of real products at invented set prices, to show the card. Nothing here is a real saving — create the bundle products, then the prices and savings come from Shopify.') };
      }

      // Inspired by — same card, in the same carousel.
      const tabs = blocks.map(b => b.settings).filter(t => t.tab_label);
      return { html:
        (tabs.length ? `<div class="filters__row" style="margin-bottom:var(--sp-lg)" data-reveal>${
          tabs.map((t, i) => `<button class="chip" aria-pressed="${i === 0}">${esc(T(t.tab_label))}</button>`).join('')}</div>` : '') +
        carousel(inspired.slice(0, 10).map((p, i) => pcard(p, i)).join(''),
          { heading: T(s.heading), link: T('View all') }) +
        note('Tab collections not assigned — showing real inspired-by products.') };
    },

    'media-grid': (s, sec) => {
      const tiles = Object.values(sec.blocks || {}).map(b => b.settings);
      const worlds = ['mawj', 'pink-allure', 'coco-woods', 'tobacco-vanilla'];
      return { html: head(s, { split: false }) +
        `<div class="cgrid" data-stagger>${tiles.slice(0, 4).map((t, i) => {
          const a = ART[worlds[i % worlds.length]] || {};
          const img = (a.images || [])[0] || HERO_IMG;
          return ccard({ title: t.title, cta_label: t.cta_label, meta: a.subtitle },
                       img, (a.alts || [])[0], i);
        }).join('')}</div>
        <div class="cgrid__more" data-reveal>
          <a class="btn btn--secondary btn--xl" href="#">${esc(LOCALE === 'ar' ? 'شاهد المزيد' : 'See more collections')}</a>
        </div>` +
        note('2 × 2, then a see-more. Tile collections not assigned — imagery is the four art-directed campaign worlds.') };
    },

    layering: (s) => {
      const a = byHandle('pink-allure') || ranked[0];
      const b = byHandle('pink-arrogance') || byHandle('layering-vanilla') || ranked[1];
      const total = (a.min || 0) + (b.min || 0);
      return { html: head(s) + `
        <div class="duo" data-stagger>${pcard(a, 0)}<span class="duo__x">+</span>${pcard(b, 1)}</div>
        <div class="duo__foot" data-reveal>
          <span class="hero__price"><small>${esc(T('Together'))}</small>${money(total)}</span>
          <a class="btn btn--xl" href="#">${esc(T(s.cta_label) || 'Add both')}</a>
        </div>` +
        note('Pink Allure is marketed as a duo with Pink Arrogance in 2 of 3 Instagram posts — and no bundle, cross-sell or collection joins them on the store. This band is that gap.') };
    },

    reviews: (s, sec) => {
      if (s.style === 'video') {
        /* The same unified carousel the product rails use — only the
           slides differ. `media` narrows the track to 9:16 portrait. */
        const g = gallery().filter(x => x.handle !== 'mawj').slice(0, 9);
        return { html: head(s) + carousel(g.map((x, i) => vcard({
            poster: x.src, alt: x.alt, by: x.title,
            caption: 'Worn by you', shop: 'Shop this', src: ''
          }, i)).join(''), { media: true }) +
          note('Posters stand in from the campaign stills — 18 real images across 11 posts. No video assets exist in the repository, so the cards play nothing; the facade attaches a reel only once one is supplied.') };
      }
      const quoted = P.filter(p => (p.quotes || []).length).slice(0, 3);
      return { html: `
        <div class="agg" data-reveal>
          <span class="agg__n">${digits('4.98')}</span>
          <span class="agg__sub">${digits('1,212')} ${LOCALE === 'ar' ? 'تقييم موثق' : 'verified reviews'}</span>
        </div>
        <div class="revs" data-stagger>${quoted.map((p, i) => {
          const q = p.quotes[0], isAr = /[؀-ۿ]/.test(q.b);
          return `<figure class="rev" ${isAr ? 'lang="ar" dir="rtl"' : ''} style="--i:${i}">
            <p>&ldquo;${esc(q.b)}&rdquo;</p>
            <footer>${esc(q.a)} · ${esc(p.title)}</footer></figure>`;
        }).join('')}</div>` +
        note('4.98 / 1,212 is the live figure at 2026-08-12 and reads from Judge.me on the storefront. Quotes are real customer reviews, in the language each was written in.') };
    },

    'scent-quiz': (s, sec) => {
      const first = Object.values(sec.blocks || {})[0];
      const q = (first && first.settings) || {};
      const answers = [1, 2, 3, 4].map(i => q[`answer_${i}_label`]).filter(Boolean);
      const g = gallery();
      return { html: `<div class="quiz" id="quiz">
          <span class="rule" style="margin-inline:auto" data-reveal></span>
          <h2 class="ttl" data-lines>${lines(T(s.heading))}</h2>
          <p class="lede" style="margin-inline:auto" data-reveal data-delay="2">${esc(T(q.question_text) || '')}</p>
          <div class="quiz__opts" data-stagger>${answers.map((a, i) => {
            const x = g[(i * 4) % (g.length || 1)] || { src: HERO_IMG };
            return `<a class="quiz__opt" href="#" style="--i:${i}">
              <img src="${IG}${esc(x.src)}" alt="" loading="lazy">
              <span>${esc(T(a))}</span></a>`;
          }).join('')}</div></div>` +
        note(`${Object.keys(sec.blocks || {}).length} question blocks defined. Answer imagery stands in from the campaign set; the scorer falls back rather than asserting a match.`) };
    },

    'image-text-overlay': (s) => {
      const a = ART['tobacco-vanilla'] || {};
      return { bare: true, html: `
        <div class="ed">
          <div class="ed__fig" data-parallax data-speed="0.07">
            <img src="${IG}tobacco-vanilla/DUEWP1fCO4Q_1.jpg" alt="${esc((a.alts || [])[0] || '')}" loading="lazy">
          </div>
          <div class="ed__body band--dark">
            <span class="rule" data-reveal></span>
            <h2 class="ttl" data-lines>${lines(T(s.heading))}</h2>
            <div class="lede" data-reveal data-delay="2">${T(s.body) || ''}</div>
            ${s.provenance ? `<span class="stampline" data-reveal data-delay="3" style="justify-self:start">${esc(T(s.provenance))}</span>` : ''}
            ${s.cta_label ? `<a class="btn btn--clear btn--xl" href="#" data-reveal data-delay="3" style="justify-self:start">${esc(T(s.cta_label))}</a>` : ''}
          </div>
        </div>
        <div class="band__in">${note('Photograph: Tobacco Vanilla — the strongest image in the set, and a product with NO catalogue record. Used as atmosphere only; never priced or linked, because it cannot be bought.')}</div>` };
    }
  };

  /* The notes pyramid. The Coco Woods post IS a finished design spec for
     this component and is the highest-engagement post in the set
     (122 likes, 16 comments). "notes?" recurs on nearly every post. */
  const pyramidBand = () => {
    const a = ART['coco-woods']; if (!a) return '';
    const n = a.notes || {};
    const tiers = [['Top notes', n.top], ['Heart notes', n.heart], ['Base notes', n.base]]
      .filter(([, v]) => v && v.length);
    return `<section class="band band--canvas"><span class="tag">notes · component</span>
      <div class="band__in">
        <div class="pyr">
          <div class="pyr__fig" data-reveal>
            <img src="${IG}${PYRAMID_IMG}" alt="${esc((a.alts || [])[0] || '')}" loading="lazy">
          </div>
          <div>
            <span class="rule" data-reveal></span>
            <p class="eyebrow" data-reveal>${esc(a.subtitle || '')}</p>
            <h2 class="ttl" data-lines>${lines(T(a.headline))}</h2>
            <div class="pyr__tiers" style="margin-top:clamp(26px,3vw,46px)" data-stagger>
              ${tiers.map(([label, vals], i) => `
                <div class="pyr__tier" style="--i:${i}">
                  <span class="pyr__n">0${i + 1}</span>
                  <div><p class="pyr__lbl">${esc(T(label))}</p>
                    <p class="pyr__val">${esc(vals.join(', '))}</p></div>
                </div>`).join('')}
            </div>
          </div>
        </div>
        ${note('The Coco Woods Instagram post is already a finished fragrance-pyramid diagram, and the highest-engagement post in the set (122 likes, 16 comments). "notes?" is asked in the comments of nearly every post. This is that post, built as a component.')}
      </div></section>`;
  };

  /* ---------- chrome ---------- */
  const NAV = {
    en: ['Shop all', 'Original Creations', 'For Him', 'For Her', 'Layering', 'The Oasis'],
    ar: ['تسوق الكل', 'إبداعات أصلية', 'له', 'لها', 'التطبيق', 'الواحة']
  };
  /* Announcement — the library's annbar, three messages on one row:
     shipping · social proof · provenance. All three stay visible, so the
     line reads without waiting on a timer. The product template swaps
     this for the quiet shipping-meter variant. */
  const ANN = {
    en: ['Free shipping over LE 1,500', '1,212 reviews · 4.98★', 'Crafted in Egypt'],
    ar: ['شحن مجاني فوق ١٥٠٠ ج.م', '١٢١٢ تقييم · ٤٫٩٨★', 'صُنع في مصر']
  };
  const SOCIAL = [
    ['Instagram', `<rect x="3.5" y="3.5" width="17" height="17" rx="4.5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="17" cy="7" r="1.1" fill="currentColor"/>`],
    ['TikTok', `<path d="M15 3c.4 2 1.7 3.4 3.7 3.6v2.6c-1.3.1-2.6-.3-3.7-1v5.9a5.4 5.4 0 1 1-4.6-5.3v2.7a2.7 2.7 0 1 0 1.9 2.6V3z" fill="currentColor"/>`],
    ['Facebook', `<path d="M13.5 21v-8h2.7l.4-3h-3.1V8.2c0-.9.3-1.5 1.5-1.5h1.6V4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1V10H7.5v3h2.7v8z" fill="currentColor"/>`],
    ['WhatsApp', `<path d="M12 3a9 9 0 0 0-7.7 13.6L3.2 21l4.5-1.1A9 9 0 1 0 12 3z" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M9 8.4c.3-.1.6 0 .8.3l.7 1.2c.2.3.1.6-.1.8l-.5.5c.5 1 1.3 1.8 2.3 2.3l.5-.5c.2-.2.5-.3.8-.1l1.2.7c.3.2.4.5.3.8-.3.8-1.1 1.3-2 1.1a8 8 0 0 1-5.6-5.6c-.2-.9.3-1.7 1.1-2z" fill="currentColor"/>`]
  ];
  /* Footer column 2 uses Fueguia's four-pillar naming (DIRECTION.md Part 1 §2.4). */
  const FTR = {
    en: [['Shop', ['All fragrances', 'Original Creations', 'Layering', 'Gifting']],
         ['The House', ['The Oasis', 'The Ingredients', 'The Craft', 'The House']],
         ['Help', ['Shipping', 'Returns', 'Contact', 'FAQ']]],
    ar: [['تسوق', ['كل العطور', 'إبداعات أصلية', 'التطبيق', 'الهدايا']],
         ['البيت', ['الواحة', 'المكونات', 'الحرفة', 'البيت']],
         ['المساعدة', ['الشحن', 'الإرجاع', 'اتصل بنا', 'الأسئلة']]]
  };

  const chromeTop = () => `
    <div class="annbar annbar--spaced">${ANN[LOCALE]
      .map(m => `<span>${esc(m)}</span>`)
      .join('<span class="annbar__sep" aria-hidden="true">·</span>')}</div>
    <header class="hdr"><div class="hdr__bar">
      <button class="iconbtn hdr__burger" type="button"
              aria-label="${LOCALE === 'ar' ? 'افتح القائمة' : 'Open menu'}">${svg('burger')}</button>
      <a class="hdr__mark" href="#"><span>SIWA</span><span class="ar">سيوة</span></a>
      <nav class="hdr__nav" aria-label="${LOCALE === 'ar' ? 'رئيسي' : 'Primary'}">
        ${NAV[LOCALE].map((n, i) =>
          `<a href="#"${i === 0 ? ' aria-current="page"' : ''}>${esc(n)}</a>`).join('')}
      </nav>
      <div class="hdr__tools">
        <div class="langtog" role="group" aria-label="${LOCALE === 'ar' ? 'اللغة' : 'Language'}">
          <button type="button" data-loc="en" aria-pressed="${LOCALE === 'en'}">EN</button>
          <button type="button" data-loc="ar" lang="ar" aria-pressed="${LOCALE === 'ar'}">ع</button>
        </div>
        <button class="iconbtn" type="button"
                aria-label="${LOCALE === 'ar' ? 'بحث' : 'Search'}">${svg('search')}</button>
        <button class="iconbtn cartdot" type="button" data-opencart
                aria-label="${LOCALE === 'ar' ? 'افتح الحقيبة' : 'Open bag'}">${svg('bag')}<span
                data-cartcount style="display:none">${digits(0)}</span></button>
      </div>
    </div></header>`;

  const chromeFoot = () => `
    <footer class="ftr">
      <div class="ftr__in">
        ${FTR[LOCALE].map(([h, l]) =>
          `<div><h4>${esc(h)}</h4><ul>${l.map(x => `<li><a href="#">${esc(x)}</a></li>`).join('')}</ul></div>`).join('')}
        <div><h4>${LOCALE === 'ar' ? 'تابعنا' : 'Follow'}</h4>
          <div class="social">${SOCIAL.map(([name, path]) =>
            `<a href="#" aria-label="${esc(name)}"><svg viewBox="0 0 24 24" aria-hidden="true">${path}</svg></a>`).join('')}</div>
        </div>
      </div>
      <div class="ftr__base">
        <span>© ${digits(2026)} Siwa Fragrances <span lang="ar" dir="rtl">· سيوة</span></span>
        <span>${LOCALE === 'ar' ? 'صُنع في مصر' : 'Made in Egypt'}</span>
      </div></footer>`;

  /* ---------- motion ---------- */
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function observe() {
    const targets = document.querySelectorAll('[data-reveal], [data-stagger], [data-lines]');
    if (REDUCED) {
      targets.forEach(t => t.classList.add('in'));
      document.querySelectorAll('[data-line]').forEach(l => l.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      el.classList.add('in');
      el.querySelectorAll('[data-line]').forEach((l, i) => {
        l.style.transitionDelay = `${i * 90}ms`; l.classList.add('in');
      });
      if (el.hasAttribute('data-stagger'))
        [...el.children].forEach((c, i) => c.style.setProperty('--i', i));
      io.unobserve(el);
    }), { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    targets.forEach(t => io.observe(t));
  }

  /* One rAF loop for every parallax layer — never a handler per element. */
  function parallax() {
    if (REDUCED || window.matchMedia('(pointer: coarse)').matches) return;
    const layers = [...document.querySelectorAll('[data-parallax]')];
    if (!layers.length) return;
    let ticking = false;
    const frame = () => {
      const vh = window.innerHeight;
      layers.forEach(l => {
        const r = l.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) { ticking = false; return; }
        const speed = parseFloat(l.dataset.speed || '0.15');
        const offset = (r.top + r.height / 2 - vh / 2) * speed;
        l.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
      ticking = false;
    };
    addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(frame); }
    }, { passive: true });
    addEventListener('resize', frame, { passive: true });
    frame();
  }

  /* Carousel. Native scroll-snap does the scrolling; the controls only
     drive it, so touch and trackpad keep working untouched. Arrows
     disable at the ends rather than wrapping — a silent no-op reads as
     broken.

     The dots page rather than track one-per-slide: a rail of twelve
     products would otherwise show twelve dots, most of them meaningless
     when four cards are on screen at once. A page is as many whole cards
     as fit, so the dot count follows the viewport and is rebuilt on
     resize. Scroll position is the single source of truth for which dot
     is current — dragging the track by hand moves them too. */
  function carousels(scope) {
    scope.querySelectorAll('[data-siwa-carousel]').forEach(root => {
      const track = root.querySelector('.car__track');
      if (!track) return;
      const prev = root.querySelector('[data-carousel-prev]');
      const next = root.querySelector('[data-carousel-next]');
      const foot = root.querySelector('[data-carousel-foot]');
      const dots = root.querySelector('[data-carousel-dots]');

      const rtl = () => document.documentElement.dir === 'rtl';
      const num = n => (rtl() ? String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[+d]) : String(n));
      const maxScroll = () => track.scrollWidth - track.clientWidth;

      /* One page = the whole cards that fit, never a fraction of one. */
      const step = () => {
        const first = track.firstElementChild;
        if (!first) return track.clientWidth || 1;
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        const card = first.getBoundingClientRect().width + gap;
        if (!card) return track.clientWidth || 1;
        const per = Math.max(1, Math.floor((track.clientWidth + gap) / card));
        return card * per;
      };
      /* Landings are 0, step, 2·step … and finally maxScroll, so the
         count is the number of full steps plus that last resting place. */
      const pageCount = () => (maxScroll() <= 1 ? 1 : Math.ceil(maxScroll() / step()) + 1);

      /* The last landing is maxScroll, not (n-1)·step — the final hop is
         usually shorter than a full page. Sending the last segment to
         k·step would overshoot and clamp, leaving it indistinguishable
         from the one before it. */
      const landing = k => (k >= pageCount() - 1 ? maxScroll() : Math.min(k * step(), maxScroll()));
      const goTo = k => track.scrollTo({
        left: (rtl() ? -1 : 1) * landing(k), behavior: 'smooth' });

      let built = -1;
      const buildDots = n => {
        if (!dots || n === built) return;
        built = n;
        dots.textContent = '';
        const label = dots.dataset.label || 'Go to page';
        for (let k = 0; k < n; k++) {
          const b = document.createElement('button');
          b.type = 'button';
          b.className = 'car__dot';
          b.setAttribute('role', 'tab');
          b.setAttribute('aria-label', `${label} ${num(k + 1)}`);
          b.addEventListener('click', () => goTo(k));
          dots.appendChild(b);
        }
      };

      const sync = () => {
        const max = maxScroll();
        const pos = Math.abs(track.scrollLeft);
        const n = pageCount();
        buildDots(n);
        /* Nothing to page through — hide the bar rather than show a full
           dead rule between two dead arrows. */
        if (foot) foot.hidden = n <= 1;
        if (prev) prev.disabled = pos <= 2;
        if (next) next.disabled = pos >= max - 2;
        // Sitting at the end IS the last page; rounding pos/step can never
        // produce that index when the final hop is shorter than a page.
        const cur = max <= 1 ? 0
          : (pos >= max - 2 ? n - 1 : Math.min(n - 1, Math.round(pos / step())));
        if (dots) {
          /* Width = the share of the rail on screen; shift = how far that
             view has travelled, expressed in multiples of its own width so
             CSS can slide it by transform alone. Clamped so the span's far
             edge lands exactly on the track's, never past it. */
          const sw = track.scrollWidth || 1;
          const frac = Math.min(1, track.clientWidth / sw);
          const maxShift = frac > 0 ? (1 - frac) / frac : 0;
          const shift = frac > 0 ? (pos / sw) / frac : 0;
          dots.style.setProperty('--car-frac', frac);
          dots.style.setProperty('--car-shift', Math.max(0, Math.min(shift, maxShift)));
          [...dots.children].forEach((d, k) =>
            d.setAttribute('aria-current', k === cur ? 'true' : 'false'));
        }
      };

      const nudge = d => track.scrollBy({ left: d * (rtl() ? -1 : 1) * step(), behavior: 'smooth' });
      prev && prev.addEventListener('click', () => nudge(-1));
      next && next.addEventListener('click', () => nudge(1));
      track.addEventListener('scroll', sync, { passive: true });
      if (window.ResizeObserver) new ResizeObserver(sync).observe(track);
      sync();
    });
  }

  /* UGC facade — swap the poster for the real reel only once played. */
  function ugc(scope) {
    scope.querySelectorAll('[data-ugc]').forEach(card => {
      card.addEventListener('click', () => {
        const src = card.dataset.ugc;
        if (!src || card.dataset.played) return;
        card.dataset.played = '1';
        const v = document.createElement('video');
        v.src = src; v.controls = true; v.autoplay = true;
        v.playsInline = true; v.muted = true;
        card.prepend(v);
        const play = card.querySelector('.vcd__play');
        if (play) play.remove();
      });
    });
  }

  /* ---------- boot ---------- */
  async function boot() {
    const main = document.getElementById('pvMain');
    let tpl;
    try {
      const [t, a] = await Promise.all([
        fetch('../siwa-theme/templates/index.json', { cache: 'no-store' }).then(r => r.json()),
        fetch('art.json', { cache: 'no-store' }).then(r => r.json()).catch(() => ({}))
      ]);
      tpl = t; ART = a;
    } catch (err) {
      main.innerHTML = `<div style="padding:80px 24px"><h1 class="ttl">Could not read the theme template</h1>
        <p class="lede">${esc(err.message)} — serve from the Siwa root.</p></div>`;
      return;
    }

    const order = tpl.order || [];
    let html = chromeTop();
    order.forEach((key, i) => {
      const sec = tpl.sections[key], s = sec.settings || {};
      const fn = R[sec.type];
      const out = fn ? fn(s, sec)
        : { html: `<div class="note" style="display:block">No renderer for ${esc(sec.type)}</div>` };
      const ground = s.color_scheme || 'canvas';
      html += `<section class="band band--${ground}">
        <span class="tag">${i + 3}. ${esc(key)} · ${esc(sec.type)}</span>
        ${out.bare ? out.html : `<div class="band__in">${out.html}</div>`}</section>`;
      if (key === 'collections') html += pyramidBand();
    });
    html += chromeFoot();
    main.innerHTML = html;
    main.setAttribute('aria-busy', 'false');

    observe(); parallax(); carousels(main); ugc(main);
  }

  /* One locale switch, two entry points: the preview chrome's own button and
     the langtog now sitting in the header. Both drive the same state, or the
     page and the library fall out of step. */
  const pvLocale = document.getElementById('pvLocale');
  function applyLocale(next) {
    if (next !== 'en' && next !== 'ar') return;
    if (next === LOCALE) return;
    LOCALE = next;
    // The library holds its own locale — the card's strings and numerals
    // come from it, so the two must flip together.
    if (window.SIWA) window.SIWA.setLocale(LOCALE);
    const ar = LOCALE === 'ar';
    document.documentElement.lang = LOCALE;
    document.documentElement.dir = ar ? 'rtl' : 'ltr';
    pvLocale.setAttribute('aria-pressed', String(ar));
    pvLocale.textContent = ar ? 'English' : 'العربية';
    boot();
  }
  pvLocale.addEventListener('click', () => applyLocale(LOCALE === 'en' ? 'ar' : 'en'));
  /* boot() replaces the header wholesale, so the langtog is delegated. */
  document.addEventListener('click', e => {
    const btn = e.target instanceof Element && e.target.closest('.langtog [data-loc]');
    if (btn) applyLocale(btn.dataset.loc);
  });
  /* Header ground. Transparent over the hero, canvas past this many pixels.
     The flag lives on <body>, not on the header, because boot() rebuilds the
     header on every locale flip and would drop a class set on it. */
  const HDR_SOLID_AT = 150;
  let hdrQueued = false;
  function syncHeader() {
    hdrQueued = false;
    document.body.classList.toggle('hdr-solid', window.scrollY > HDR_SOLID_AT);
  }
  addEventListener('scroll', () => {
    if (!hdrQueued) { hdrQueued = true; requestAnimationFrame(syncHeader); }
  }, { passive: true });
  syncHeader();   // a reload part-way down the page must not start transparent

  document.getElementById('pvTags').addEventListener('click', function () {
    const on = this.getAttribute('aria-pressed') !== 'true';
    this.setAttribute('aria-pressed', String(on));
    document.body.classList.toggle('structure', on);
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
