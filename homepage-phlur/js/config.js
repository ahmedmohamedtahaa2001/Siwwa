/* ============================================================
   SIWA — PHLUR-STRUCTURE HOMEPAGE · CONFIGURATION
   ------------------------------------------------------------
   Structural clone of https://phlur.com/ (captured 2026-08-08 via
   the Wayback Machine — the live origin blocks headless clients).
   Full measurement evidence: ../reference-phlur/PHLUR-SPEC.md

   WHAT IS CLONED  layout, section order, geometry, rhythm, grid
                   configuration, component anatomy, breakpoints.
   WHAT IS NOT     colour, type families, imagery, copy. Those come
                   from Planning/DesignSystem.md via the token layer.
                   CLAUDE.md §1.2 — the project's own direction
                   outranks any imported reference.

   PRIME DIRECTIVE (MultiAgentsWorkFlow §Prime Directive)
   Every merchant-editable value lives in this file and nowhere else.
   index.html carries structure, css/phlur.css carries presentation,
   js/render.js carries behaviour — none of the three contains a
   content string, a price, a product handle or a URL.

   Each top-level key maps 1:1 to a future Shopify {% schema %}
   section; each leaf is one setting; every repeating list is an
   array => schema BLOCKS, never a fixed loop.

   Bilingual convention: every customer-facing string is {en, ar}.
   Products are referenced BY HANDLE only — titles, prices, ratings,
   review counts and stock resolve at render time from
   ../component-library/js/data.js (the real 56-product catalogue).

   FIGURE PROVENANCE — read before changing a number:
     · 1,212 reviews @ 4.98★ · 56 products · 16 originals · 40
       inspired-by · free shipping over 1,500 EGP
       — all from reference-analysis/_CORRECTIONS.md, the
         authoritative figures document. Cited, not re-asserted.
     · per-product price / rating / review count / stock resolve
       from the catalogue at runtime and are NOT written here.
   ============================================================ */

window.SIWA_PHLUR = {

  /* ---------- global ---------- */
  defaultLocale: 'en',

  /* ============================================================
     LAYOUT GEOMETRY — measured from phlur.com at 1440 / 768 / 390.
     Every number here is an observation, reproducible from
     ../reference-phlur/phlur-measure-1440.json. These are settings,
     not literals: change one and the page follows.
     ============================================================ */
  layout: {
    /* Phlur's measured breakpoints. Below `tablet` the gutter halves, the
       nav collapses, the hero turns portrait and the banner loses its
       inset — all of it observed at 768 on the live capture. */
    breakpoints:   { tablet: 990, small: 480 },
    gutter:        { desktop: 80, tablet: 40, mobile: 20 },  // content inset
    announcementH: 36,
    headerH:       { desktop: 56, tablet: 48 },
    sectionPadTop: 40,        // section box top -> heading top
    headingGap:    30,        // heading -> content
    sectionGapEnd: 40,        // content -> next section
    hero:          { h: 630, mobileH: 960, smallH: 620, fullBleed: true },
    banner:        { h: 560, mobileH: 800, smallH: 520, inset: true, padTop: 15 },  // inset on desktop, full-bleed on mobile
    carousel:      { cardW: 303, cardWTablet: 207, gap: 16, imageRatio: '1 / 1' },
    collections:   { columns: 2, mobileColumns: 1, gap: 20, tileRatio: '1 / 1' },
    imageWithText: { textCol: 330, imageCol: 867, imageH: 460, gap: 83 },
    richText:      { maxWidth: 880 }
  },

  /* ============================================================
     TYPE ROLES — Phlur's *scale and rhythm*, rendered in Siwa's
     families. Sizes/weights/tracking are measured from Phlur;
     the families resolve to --font-display / --font-ui tokens.
     ============================================================ */
  type: {
    heroTitle:    { size: 30, mobileSize: 22, weight: 600, tracking: 0.032, upper: true },
    bannerTitle:  { size: 26, mobileSize: 20, weight: 600, tracking: 0.032, upper: true },
    sectionTitle: { size: 18, mobileSize: 16, weight: 600, tracking: 0.053, upper: true },
    lead:         { size: 20, mobileSize: 17, weight: 400, tracking: 0,     upper: false },
    cardTitle:    { size: 14, mobileSize: 13, weight: 600, tracking: 0.046, upper: true },
    body:         { size: 16, mobileSize: 15, weight: 400, tracking: 0.004, upper: false },
    ui:           { size: 12, mobileSize: 11, weight: 500, tracking: 0.067, upper: true },
    badge:        { size: 11, mobileSize: 10, weight: 500, tracking: 0.064, upper: true }
  },

  /* ============ 1 · ANNOUNCEMENT BAR ============
     Uses the library's AnnouncementBar component (`.annbar`) rather than a
     page-local strip — CLAUDE.md §2 rule 1, never hand-roll what the library
     already has. Message + arrow link, per the component's "With link"
     variant. Phlur's 36px height is carried by layout.announcementH. */
  announcement: {
    enabled: true,
    variant: '',              // '' | 'annbar--gold' | 'annbar--quiet'
    message: {
      en: 'Explore your Persona',
      ar: 'اكتشف شخصيتك'
    },
    link: {
      label: { en: 'Take the quiz', ar: 'ابدأ' },
      href: '#discovery'
    },
    dismissible: false
  },

  /* ============ 2 · HEADER ============
     Uses the library's Header component markup (`.hdr` / `.hdr__bar` /
     `.hdr__mark` / `.hdr__nav` / `.hdr__tools`). The bilingual wordmark
     carries both scripts at once, as the component does. Phlur's sticky
     behaviour and gutter are applied as layout, not as a new component.
     Nav collapses to the burger below layout.breakpoints.tablet. */
  header: {
    sticky: true,
    /* Transparent over the hero photograph, taking its surface once the
       reader has scrolled past this many pixels. */
    solidAfterScroll: 124,
    /* The bar is TOTALLY transparent by default — no tint of its own, the
       photograph shows through untouched. Legibility is carried by the
       hero's own top scrim (hero.scrimTopOpacity), which now travels with
       the image rather than banding the bar.
       Raise this above 0 only if a merchant uploads a hero bright enough
       that the top scrim alone cannot hold the glyphs. */
    veilOpacity: 0,
    wordmark: { en: 'SIWA', ar: 'سيوة' },   // both render together
    wordmarkHref: '#top',
    /* Six-item merchandising nav, matching the library's own NAV_EN/NAV_AR. */
    nav: [
      { label: { en: 'Shop all',           ar: 'تسوق الكل' },   href: '#bestsellers', current: true },
      { label: { en: 'Original Creations', ar: 'إبداعات سيوة' }, href: '#originals' },
      { label: { en: 'For Him',            ar: 'له' },          href: '#bestsellers' },
      { label: { en: 'For Her',            ar: 'لها' },         href: '#bestsellers' },
      { label: { en: 'Layering',           ar: 'الطبقات' },     href: '#bestsellers' },
      { label: { en: 'The Oasis',          ar: 'الواحة' },      href: '#house' }
    ],
    showSearch: true,
    showBag: true,
    showLanguageToggle: true,
    labels: {
      search:  { en: 'Search',     ar: 'بحث' },
      bag:     { en: 'Open bag',   ar: 'افتح الحقيبة' },
      menu:    { en: 'Open menu',  ar: 'افتح القائمة' },
      close:   { en: 'Close menu', ar: 'أغلق القائمة' }
    }
  },

  /* ============ 3 · HERO — full-bleed banner ============
     Phlur: 1440×630 full-bleed image, content bottom-left at the
     gutter, eyebrow chip + title + subtitle + solid button. */
  hero: {
    enabled: true,
    productHandle: 'mawj',            // image + link resolve from the catalogue
    image: 'mawj.jpg',
    imageAlt: {
      en: 'Mawj eau de parfum on a salt ledge above the sea',
      ar: 'عطر موج على حافة ملحية فوق البحر'
    },
    eyebrow:  { en: 'Original',  ar: 'أصلي' },
    title:    { en: 'Mawj',      ar: 'موج' },
    subtitle: {
      en: 'Citrus, marine, woody — the depth of the sea and its fresh breeze',
      ar: 'حمضي، بحري، خشبي — عمق البحر ونسيمه المنعش'
    },
    cta:      { label: { en: 'Shop now', ar: 'تسوق الآن' }, href: '#bestsellers' },
    contentPosition: 'bottom-left',   // bottom-left | bottom-centre | centre
    /* Crop focus for the hero photograph. The catalogue shots are portrait
       with the subject centred, so a plain centre crop at hero aspect lands
       on the bottle cap alone. */
    imageFocus: '50% 56%',
    /* Overlay copy must clear AA wherever the horizon falls in the image a
       merchant uploads. Measured against this photograph's bright sky. */
    scrimOpacity: 0.62,
    /* Top-down ramp carrying the transparent header's glyphs, which would
       otherwise sit on open sky. Height is in px from the top of the frame. */
    scrimTopOpacity: 0.66,
    scrimTopHeight: 340,
    /* Local plate behind the hero copy block — see the banner's plateOpacity
       for the reasoning. Guarantees the copy zone without flattening the shot. */
    plateOpacity: 0.45,

    /* ---- CINEMATIC SCROLL (skills/epic-design) ----
       Decision engine: "Hero with big title" → 6-layer parallax + pinned
       sticky, masked line reveal on the type, float loop on the subject.

       The scene is `sceneHeight` tall and the viewport pins inside it, so
       the whole sequence scrubs against scroll rather than firing once.

       Depth model is the skill's, verbatim (§Step 3). Only transform,
       opacity and filter are animated; the whole engine is suppressed by
       prefers-reduced-motion and on coarse pointers.

       NOTE ON ASSETS: the skill assigns product images to depth-3 and
       background images to depth-0. Siwa has flat photographs, not cut-out
       PNGs, so the SAME photograph is used twice — an over-scaled blurred
       copy at depth-0 and the sharp frame at depth-3. That is a real
       backdrop technique, not a workaround, but it is worth knowing that
       true layer separation needs a cut-out subject the repo does not have. */
    motion: {
      enabled: true,

      /* WHICH SCROLL EFFECT THE HERO USES.

         'fixed-parallax'  the classic window effect. The photograph is a
                           fixed-attachment background, so it stays locked
                           to the viewport while the section scrolls over
                           it and reveals a different part of the frame.
                           Image and grade are two layers of ONE background,
                           so they can never separate.

         'pinned-scene'    the 6-layer depth stack from skills/epic-design:
                           the stage pins and the layers drift apart at
                           different rates. Kept available — every setting
                           below still drives it. */
      style: 'fixed-parallax',

      sceneHeight: 200,        // vh — 'pinned-scene' only: how long it pins
      pin: true,

      /* 'fixed-parallax' only. The section is this tall, so the taller it
         is the more of the frame the window travels across. */
      viewportHeight: 100,     // vh
      /* How far the depth stack spreads across the pin, as a multiple of
         viewport height. Raise it for a more pronounced parallax, lower it
         for a subtler one. At 0.7 the backdrop travels ~560px against the
         copy's 0 over a 900px viewport. */
      driftFactor: 0.7,
      /* parallax multiplier · blur px · scale — the skill's depth table */
      depths: [
        { d: 0, parallax: 0.10, blur: 14, scale: 1.25 },   // blurred backdrop
        { d: 1, parallax: 0.25, blur: 0,  scale: 1.00 },   // atmosphere / glow
        { d: 2, parallax: 0.50, blur: 0,  scale: 1.00 },   // horizon veil
        { d: 3, parallax: 0.80, blur: 0,  scale: 1.06 },   // the photograph
        { d: 4, parallax: 1.00, blur: 0,  scale: 1.00 }    // copy
      ],
      /* NOTE: the skill's depth-5 foreground plane is unused. The hero's
         scrim was there, but a grade that drifts against the frame it is
         grading reads as a fault, so it now lives inside depth-3 and
         inherits that layer's transform. */
      kenBurns:  { from: 1.06, to: 1.16 },   // depth-3 scale across the pin
      floatLoop: { amplitude: 10, duration: 11 },  // px, seconds — rule 7
      revealStaggerMs: 90      // masked line reveal, per line
    }
  },

  /* ============ 4 · BESTSELLERS — carousel ============
     Phlur: title left / "Shop All" right, then a horizontal track
     of 303px cards, 16px gap, peeking the next card. */
  bestsellers: {
    enabled: true,
    title:    { en: 'Bestsellers', ar: 'الأكثر مبيعاً' },
    linkLabel:{ en: 'Shop all',    ar: 'تسوق الكل' },
    linkHref: '#collections',
    /* Ranked by real review count — the catalogue is the source.
       'auto' sorts by reviews desc; replace with an explicit handle
       array to curate. */
    source: 'auto-by-reviews',
    count: 8,
    badge: { en: 'Bestseller', ar: 'الأكثر مبيعاً' },
    badgeMinReviews: 40          // show the badge above this review count
  },

  /* ============ 5 · RICH TEXT — the manifesto ============
     Phlur: 200px section, 20px lead paragraph, outlined button. */
  manifesto: {
    enabled: true,
    text: {
      en: 'Fragrances drawn from the oasis — Siwan salt, date palm and olive — worn as memory rather than statement.',
      ar: 'عطور من الواحة — ملح سيوة والنخيل والزيتون — تُرتدى كذكرى لا كتصريح.'
    },
    cta: { label: { en: 'About us', ar: 'عن سيوة' }, href: '#house' }
  },

  /* ============ 6 · HOUSE BANNER — inset banner ============
     Phlur: inset to the gutter (1280×560 at 1440), overlay text
     bottom-left, outlined white button. Full-bleed below 750. */
  house: {
    enabled: true,
    image: 'mawj-2.jpg',
    imageAlt: {
      en: 'Mawj photographed against the salt lakes',
      ar: 'موج مصوَّراً أمام البحيرات المالحة'
    },
    /* Overlay copy must clear AA on ANY image a merchant uploads. Two
       controls: `scrimOpacity` tints the whole image, `plateOpacity` darkens
       only the band the copy sits in. Prefer raising the plate — it keeps
       the photograph's midtones intact. */
    scrimOpacity: 0.55,
    plateOpacity: 0.62,
    title:    { en: 'The House of Siwa', ar: 'دار سيوة' },
    subtitle: {
      en: 'Sixteen original creations, made in Egypt',
      ar: 'ستة عشر إبداعاً أصلياً، صُنعت في مصر'
    },
    cta: { label: { en: 'Explore', ar: 'اكتشف' }, href: '#originals' }
  },

  /* ============ 7 · ORIGINAL CREATIONS — carousel ============ */
  originals: {
    enabled: true,
    title:    { en: "Wear what's original", ar: 'ارتدِ الأصيل' },
    linkLabel:{ en: 'Shop originals',       ar: 'تسوق الأصيلة' },
    linkHref: '#collections',
    source: 'kind:siwa_owned',   // the 16 Siwa-owned creations
    count: 8,
    badge: { en: 'Original', ar: 'أصلي' }
  },

  /* ============ 8 · FEATURED COLLECTIONS — 2-up tiles ============
     Phlur: two 630×630 tiles, 20px gap, caption bottom-left in white. */
  collections: {
    enabled: true,
    title: { en: 'Featured collections', ar: 'المجموعات المميزة' },
    scrimOpacity: 0.6,        // same reasoning as house.scrimOpacity — measured 6.16:1 on the palest tile
    tiles: [
      {
        image: 'pink-allure.jpg',
        imageAlt: { en: 'Pink Allure',   ar: 'بينك ألور' },
        label:    { en: 'Original Creations', ar: 'الإبداعات الأصلية' },
        meta:     { en: '16 fragrances',      ar: '١٦ عطراً' },
        href: '#originals'
      },
      {
        image: 'tobacco-vanilla.jpg',
        imageAlt: { en: 'Tobacco Vanilla', ar: 'توباكو فانيلا' },
        label:    { en: 'Inspired By',     ar: 'مستوحى من' },
        meta:     { en: '40 fragrances',   ar: '٤٠ عطراً' },
        href: '#bestsellers'
      }
    ]
  },

  /* ============ 9 · DISCOVERY — image with text ============
     Phlur: text column left at the gutter, image right, offset. */
  discovery: {
    enabled: true,
    image: 'coco-woods-2.jpg',
    imageAlt: {
      en: 'A discovery set of Siwa sample vials',
      ar: 'مجموعة اكتشاف من عينات سيوة'
    },
    title: { en: "There's more to discover", ar: 'هناك المزيد لتكتشفه' },
    text: {
      en: 'The Discovery Set is an eight-piece sample collection — with credit towards your next full size.',
      ar: 'مجموعة الاكتشاف من ثماني عينات — مع رصيد لطلبك التالي بالحجم الكامل.'
    },
    cta: { label: { en: 'Shop now', ar: 'تسوق الآن' }, href: '#bestsellers' }
  },

  /* ============ 10 · FOOTER ============
     Phlur: 5 columns on a tinted surface, 489px, small quiet links. */
  footer: {
    enabled: true,
    columns: [
      {
        heading: { en: 'Collections', ar: 'المجموعات' },
        links: [
          { label: { en: 'Original Creations', ar: 'الإبداعات الأصلية' }, href: '#originals' },
          { label: { en: 'Inspired By',        ar: 'مستوحى من' },        href: '#bestsellers' },
          { label: { en: 'Layering',           ar: 'الطبقات' },          href: '#bestsellers' },
          { label: { en: 'Gifting',            ar: 'الهدايا' },          href: '#discovery' }
        ]
      },
      {
        heading: { en: 'Categories', ar: 'الفئات' },
        links: [
          { label: { en: 'Eau de Parfum', ar: 'أو دو بارفان' }, href: '#bestsellers' },
          { label: { en: 'Body Mist',     ar: 'معطر الجسم' },   href: '#bestsellers' },
          { label: { en: 'Discovery Set', ar: 'مجموعة الاكتشاف' }, href: '#discovery' },
          { label: { en: 'Bundles',       ar: 'العروض' },       href: '#bestsellers' }
        ]
      },
      {
        heading: { en: 'Customer Care', ar: 'خدمة العملاء' },
        links: [
          { label: { en: 'Contact',            ar: 'اتصل بنا' },      href: '#footer' },
          { label: { en: 'Track your order',   ar: 'تتبع طلبك' },     href: '#footer' },
          { label: { en: 'Shipping & Returns', ar: 'الشحن والإرجاع' }, href: '#footer' },
          { label: { en: 'Terms of Service',   ar: 'شروط الخدمة' },   href: '#footer' },
          { label: { en: 'Privacy Policy',     ar: 'سياسة الخصوصية' }, href: '#footer' }
        ]
      },
      {
        heading: { en: 'Our Story', ar: 'قصتنا' },
        links: [
          { label: { en: 'About us',    ar: 'عن سيوة' },   href: '#house' },
          { label: { en: 'The Oasis',   ar: 'الواحة' },    href: '#house' },
          { label: { en: 'Ingredients', ar: 'المكونات' },  href: '#house' },
          { label: { en: 'The Craft',   ar: 'الحرفة' },    href: '#house' }
        ]
      }
    ],
    subscribe: {
      heading: { en: 'Subscribe', ar: 'اشترك' },
      text:    { en: 'Sign up for 10% off your first order', ar: 'اشترك واحصل على خصم ١٠٪ على أول طلب' },
      placeholder: { en: 'Email address', ar: 'البريد الإلكتروني' },
      cta:     { en: 'Join', ar: 'انضم' }
    },
    legal: {
      en: '© 2026 Siwa Fragrances · Made in Egypt',
      ar: '© ٢٠٢٦ سيوة للعطور · صُنع في مصر'
    }
  },

  /* ============ SEO — survives the EN/AR toggle ============ */
  seo: {
    title: {
      en: 'Siwa Fragrances | Egyptian Luxury Perfumes',
      ar: 'سيوة للعطور | عطور مصرية فاخرة'
    },
    description: {
      en: 'Siwa Fragrances: 16 original Siwan creations and 40 designer-inspired scents. Free shipping over LE 1,500.',
      ar: 'سيوة للعطور: ١٦ إبداعاً سيوياً أصلياً و٤٠ عطراً مستوحى. شحن مجاني فوق ١٬٥٠٠ ج.م.'
    },
    canonical: 'https://siwafragrances.com/',
    locales: { en: 'https://siwafragrances.com/', ar: 'https://siwafragrances.com/?locale=ar' },
    /* Cited from reference-analysis/_CORRECTIONS.md — not re-asserted here. */
    aggregateRating: { value: 4.98, count: 1212 }
  }
};
