/* ============================================================
   SIWA — PHLUR-STRUCTURE PRODUCT DETAIL PAGE · CONFIGURATION
   ------------------------------------------------------------
   Structural clone of the phlur.com PDP. Captured 2026-08-13 from
   Wayback snapshots of four product pages — the live origin returns
   403 to every automated client (Cloudflare), exactly as recorded
   for the homepage capture in ../reference-phlur/PHLUR-SPEC.md.

   Full measurement evidence: ../reference-phlur/pdp/PHLUR-PDP-SPEC.md

   WHAT IS CLONED  band order, hero split, buy-box element order,
                   accordion anatomy, scent-note band, sticky CTA,
                   rhythm, geometry, breakpoints.
   WHAT IS NOT     colour, type families, imagery, copy — those come
                   from Planning/DesignSystem.md through the token
                   layer. CLAUDE.md §1.2: the project's own direction
                   outranks any imported reference.

   PRIME DIRECTIVE (MultiAgentsWorkFlow.md §1, Law 1)
   Every merchant-editable value lives in this file and nowhere else.
   index.html carries structure, css/pdp.css carries presentation,
   js/render.js carries behaviour — none of the three contains a
   content string, a price, a product handle or a URL.

   Each top-level key maps 1:1 to a future Shopify {% schema %}
   section; each leaf is one setting; every repeating list is an
   array => schema BLOCKS, never a fixed loop.

   Bilingual convention: every customer-facing string is {en, ar}.
   The product is referenced BY HANDLE only — title, price, rating,
   review count, notes, sizes and stock resolve at render time from
   ../component-library/js/data.js (the real 56-product catalogue).

   FIGURE PROVENANCE — read before changing a number:
     · 1,212 reviews @ 4.98★ shop-wide · 56 products · 16 originals
       · 40 inspired-by · free shipping over 1,500 EGP
       — reference-analysis/_CORRECTIONS.md, the authoritative
         figures document. Cited here, never re-asserted.
     · per-product price / rating / review count / notes / stock
       resolve from the catalogue at runtime and are NOT written here.

   ⚠ TWO-REGISTER FIREWALL (DIRECTION.md Part 2 §5, data-schema §3)
     Originals (16) get the Arabic name at equal weight, provenance
     and the heritage treatment — and NEVER the price-contrast line.
     Inspired-by (40) get the inspired-by block and the designer
     facet — and NEVER Cultural Accent colour or heritage fields.
     render.js derives the register from the catalogue `kind` field;
     it is not a setting, because it is not a merchant choice.

   ⚠ B-04 LEGAL GATE (feature-doc §06, DIRECTION.md Part 2 §3.2A)
     `inspiredBy.showRetailPrice` ships FALSE and must stay false
     until counsel clears the retail-price comparison. This mirrors
     siwa-theme/sections/main-product.liquid, where the equivalent
     `show_retail_price` setting also defaults to false. The module
     works without that third fact — house and fragrance only.
   ============================================================ */

window.SIWA_PDP = {

  /* ---------- global ---------- */
  defaultLocale: 'en',

  /* Which product this page renders. Everything else about the
     product resolves from the catalogue by this handle.
     `pink-allure` is the default because it is the only catalogue
     entry carrying BOTH real photography and a complete top/heart/
     base note set, so the Scent Notes band shows real data rather
     than its (honest) empty state. Switch to `coco-woods` to
     exercise the inspired-by register. */
  product: {
    handle: 'pink-allure',
    /* Gallery needs more than one frame to be a gallery. Additional
       frames must be NAMED here — they are never guessed from the
       primary filename, because 50 of 56 catalogue products have
       exactly one image (reference-analysis/08-ASSETS) and probing
       for a companion 404s on all of them. Unfilled slots render the
       library's placeholder, which is the honest data situation.
       Files available: coco-woods.jpg, coco-woods-2.jpg, mawj.jpg,
       mawj-2.jpg, pink-allure.jpg, tobacco-vanilla.jpg. */
    extraFrames: [],
    galleryFallbackFrames: 3
  },

  /* ============================================================
     LAYOUT GEOMETRY — from phlur.com's own authored stylesheets,
     not from measuring screenshots. Dawn sets 1rem = 10px, which
     the theme confirms by drawing 1px hairlines as `.1rem`.
     Sources: assets/section-main-product.css, main.bundle.css,
     product.bundle.css @ snapshot 20260507071628.
     These are settings, not literals: change one, the page follows.
     ============================================================ */
  layout: {
    /* Phlur's own breakpoints, from the theme's media queries.
       Measured behaviour: the hero stays a two-column split all the
       way down to 768 and only stacks below 750. `desktop` here is
       the type/gutter step; `tablet` is where the split collapses. */
    breakpoints:   { desktop: 990, tablet: 750 },
    gutter:        { desktop: 80, tablet: 40, mobile: 20 },
    announcementH: 36,
    headerH:       { desktop: 56, tablet: 48 },

    hero: {
      /* MEASURED, not inferred. At 1440: media 640 @ x80, info 590 @
         x770 — a 50px gutter between the columns, inside a 1280
         content width. At 768: media 344, info 294, gap 50. Both fall
         out of `50% / 50px / rest`, so that is how it is expressed.
         (The authored `calc(50% - var(--grid-desktop-horizontal-spacing)/2)`
         describes the wrapper, not the rendered column — the info
         container's own 60rem cap and padding take it to 590.) */
      mediaCol:     '50%',
      columnGap:    50,
      /* .product__info-container { max-width: 60rem } => 600px */
      infoMaxWidth: 600,
      /* .product__info-container > * + * { margin: 1.5rem 0 } */
      infoRhythm:   15,
      /* .product__column-sticky { position: sticky; top: 3rem } */
      stickyTop:    30,
      /* .product-media-container { --ratio: 1.0 } — square, not 3:4 */
      mediaRatio:   '1 / 1',
      atcHeight:    46,         // measured on the button, not assumed
      padBottom:    60          // .container-bottom-padding-60
    },

    /* .Phlur-Accordion — border-top .1rem solid rgba(0,0,0,.15),
       margin 20px 0 0; header padding 2rem 0 desktop / 1.25rem 0
       mobile; .icon-plus-rotate is 30×30 with 2px bars inset 8px. */
    accordion: {
      marginTop:      20,
      /* The stylesheet carries both `2rem 0` and `1.25rem 0`; the
         later rule wins, and the rendered header measures 12.5px top
         and bottom at every breakpoint. Measured, not read off the
         first matching rule. */
      headerPadY:     12.5,
      headerPadYMob:  12.5,
      iconSize:       30,
      iconBar:        2,
      iconInset:      8,
      transitionMs:   150,
      contentLh:      1.5,
      contentTracking: 0.48    // px
    },

    /* .scent-notes — h2 margin-bottom 50px desktop / 20px mobile,
       .flex-container-row gap 30px, columns 50/50 (the band
       overrides the theme's base 33.33/66.66), each
       .scent-note-section has a 1px top rule and an 11px uppercase
       label occupying 25% of the row. */
    /* MEASURED at 1440 on missing-person: tiers 417, image 833, gap 30
       — i.e. 1fr / 2fr, not the 50/50 the stylesheet's mobile rule
       suggests. Rows carry a 1px top rule and 25px of padding; the
       note text renders at 20px/30px with a 0.6px track, and the tier
       label occupies 104px = 25% of the column. */
    scentNotes: {
      headingGap:   50,
      headingGapMob: 20,
      columnGap:    30,
      textFr:       1,
      imageFr:      2,
      labelWidth:   25,        // % of the tier column
      rowPadY:      25,
      bodySize:     20,
      bodyTracking: 0.6,
      bodyLh:       1.5,       // 30px / 20px
      labelSize:    11,
      /* Below 990 the band stacks (image first, tiers second), the row
         rules disappear and the note text drops a step. Measured on
         missing-person at 768 and 375: border 0, padding-top 0,
         padding-bottom 25, 16px / 20.8px / 0.48px. */
      bodySizeMob:     16,
      bodyLhMob:       1.3,
      bodyTrackingMob: 0.48,
      rowBorderMob:    0,
      rowPadTopMob:    0
    },

    /* .perfume-quotes — MEASURED text column 427 of 1280 = 33.36%,
       image taking the rest with no gap (the row is space-between at
       33.33/66.66). The stylesheet's `max-width:600px; padding-right:8%`
       is the MOBILE rule and does not apply at desktop. */
    quote: {
      textCol:      33.33,     // %
      textInsetMob: 8,         // % right padding, mobile only
      padY:         60         // .container-padding-60
    },

    /* Card rail geometry carried over from the homepage capture,
       where it was measured exactly. ../reference-phlur/PHLUR-SPEC.md §2 */
    rail: {
      cardW: 303, cardWTablet: 207, gap: 16, imageRatio: '1 / 1',
      padTop: 40, headingGap: 30
    },

    /* Phlur's sticky CTA: copy left, add-to-bag right, fixed to the
       bottom of the viewport, revealed once the main buy box has
       scrolled away. */
    stickyCta: {
      height:       72,
      heightMobile: 64,
      ctaMinWidth:  260,
      revealAfter:  'buybox'   // reveal once .pdp-hero__buy leaves the viewport
    },

    /* Siwa-side layout values with no Phlur counterpart. Settings
       rather than literals, because the Prime Directive makes no
       exception for "it is only spacing". */
    scentRailThumb:    76,
    trustIconSize:     16,
    scalesMaxWidth:    720,
    reviewsSummaryCol: 320,

    maxWidth: 2000             // .page-width { max-width: 2000px }
  },

  /* ============================================================
     TYPE ROLES — Phlur's scale and rhythm, rendered in Siwa's
     families. Sizes/weights/tracking are observations from Phlur's
     stylesheets; the families resolve to --font-display / --font-ui.
     ============================================================ */
  type: {
    /* MEASURED: h1 renders 24px/600 at 1440 and 18px/600 at 768 and
       below, uppercase, 0.96px tracking. Phlur's product title is a
       small uppercase grotesque, not a large display line — worth
       stating, because it is the opposite of the usual PDP instinct. */
    productTitle:  { size: 24, mobileSize: 18, weight: 600, tracking: 0.04, upper: true },
    productTitleAr:{ size: 32, mobileSize: 26, weight: 400, tracking: 0 },
    /* Measured 16px at 1440, 768 AND 375 — the format line never
       shrinks. Held constant deliberately. */
    variantTitle:  { size: 16, mobileSize: 16, weight: 400, tracking: 0 },
    tagline:       { size: 20, mobileSize: 17, weight: 400, tracking: 0 },
    sectionTitle:  { size: 18, mobileSize: 16, weight: 600, tracking: 0.053, upper: true },
    accordionTitle:{ size: 14, mobileSize: 14, weight: 600, tracking: 0.046, upper: true },
    body:          { size: 16, mobileSize: 15, weight: 400, tracking: 0.03,  upper: false },
    noteLabel:     { size: 11, mobileSize: 11, weight: 500, tracking: 0.08,  upper: true },
    button:        { size: 13, mobileSize: 13, weight: 500, tracking: 0.06,  upper: true },
    caption:       { size: 12, mobileSize: 11, weight: 400, tracking: 0.04,  upper: false }
  },

  /* ============================================================
     1 · ANNOUNCEMENT BAR
     ============================================================ */
  announcement: {
    show: true,
    /* Threshold cited from _CORRECTIONS.md. The live store's own bar
       carries no currency unit (07-COPY-CONTENT.md §1); this build
       states it, because an unlabelled number is worse bilingually. */
    text: {
      en: 'Free shipping on orders over 1,500 EGP',
      ar: 'شحن مجاني للطلبات فوق ١٥٠٠ ج.م'
    },
    link: { en: '/collections/all', ar: '/collections/all' }
  },

  /* ============================================================
     2 · HEADER
     ============================================================ */
  header: {
    wordmark: { en: 'SIWA', ar: 'سيوة' },
    nav: [
      { label: { en: 'Shop',      ar: 'المتجر' },    href: '/collections/all' },
      { label: { en: 'Originals', ar: 'الأصلية' },   href: '/collections/originals' },
      { label: { en: 'Layering',  ar: 'الطبقات' },   href: '/pages/layering' },
      { label: { en: 'About',     ar: 'عن سيوة' },   href: '/pages/about' }
    ],
    icons: { search: true, account: true, cart: true },
    cartLabel:   { en: 'Cart',   ar: 'الحقيبة' },
    searchLabel: { en: 'Search', ar: 'بحث' }
  },

  /* ============================================================
     3 · BREADCRUMBS  (feature A-05)
     Phlur ships a dedicated breadcrumbs section above the hero.
     ============================================================ */
  breadcrumbs: {
    show: true,
    trail: [
      { label: { en: 'Home', ar: 'الرئيسية' }, href: '/' },
      { label: { en: 'Shop', ar: 'المتجر' },   href: '/collections/all' }
    ]
    /* The product itself is appended by render.js from the catalogue. */
  },

  /* ============================================================
     4 · HERO — gallery + buy box  (features B-06, B-04, D-03)

     Buy-box element order is Phlur's, observed identically on all
     four captured products:
       title + rating (one flex row) → variant title → tagline →
       scent rail → membership note → ADD TO BAG (price inside the
       button) → accordion
     Siwa inserts the bilingual name lockup and the inspired-by line,
     both placed per DIRECTION.md Part 2 §3.2A (under the name,
     above the notes).
     ============================================================ */
  hero: {
    /* Phlur has no separate price element and no quantity selector:
       price lives inside the add-to-bag control. That merged control
       is the same signature the homepage carousel card uses. */
    showQuantity: false,
    showSeparatePrice: false,

    gallery: {
      thumbnails:         true,
      thumbnailPosition:  { desktop: 'bottom', mobile: 'bottom' },
      thumbnailSize:      80,
      thumbnailGap:       10,
      zoom:               true,   // library ProductImage supports a lightbox
      badge:              { show: true, text: { en: 'BEST SELLER', ar: 'الأكثر مبيعاً' } }
    },

    /* The tagline is a one-line scent summary with a left rule —
       Phlur's `h3.tagline { border-left: 2px solid }`. Authored per
       product; falls back to the catalogue accords when absent. */
    tagline: {
      show: true,
      rule: true,
      text: { en: '', ar: '' }    // empty => derive from catalogue
    },

    /* Phlur's "Scent" rail: sibling products as image + name +
       family, linking across the collection rather than switching a
       variant. Siwa's equivalent is the layering/sibling rail. */
    scentRail: {
      show:  true,
      label: { en: 'Scent', ar: 'الرائحة' },
      /* 'siblings' = same register, excluding this product. */
      source: 'siblings',
      count:  6
    },

    /* Size is a real Shopify variant on Siwa (30/50/100 ml), unlike
       Phlur where size is a separate product. B-06 requires sold-out
       variants stay VISIBLE for price anchoring — never hidden. */
    variantSelector: {
      show: true,
      label: { en: 'Size', ar: 'الحجم' },
      keepSoldOutVisible: true
    },

    addToCart: {
      label:        { en: 'Add to Bag', ar: 'أضف إلى الحقيبة' },
      separator:    '·',
      priceInButton: true,
      soldOutLabel: { en: 'Sold Out',   ar: 'نفدت الكمية' },
      loadingLabel: { en: 'Adding…',    ar: 'جارٍ الإضافة…' },
      successLabel: { en: 'Added',      ar: 'تمت الإضافة' },
      /* D-04: back-in-stock capture on every sold-out variant.
         Specified, not built — the control renders, the capture
         endpoint does not exist yet. Flagged, not faked. */
      backInStock:  { show: true, label: { en: 'Notify me', ar: 'أعلمني' } }
    },

    /* B-04 — inspired-by price contrast. THE 40 ONLY.
       render.js refuses to emit this for an original; that refusal
       is code, not configuration. */
    inspiredBy: {
      show: true,
      label:            { en: 'Inspired by', ar: 'مستوحى من' },
      showRetailPrice:  false,          // ⚠ LEGAL GATE — see header
      disclaimer: {
        en: 'An independent interpretation. Not the original, and not affiliated with the house named.',
        ar: 'تفسير مستقل. ليس العطر الأصلي، وغير تابع للدار المذكورة.'
      }
    },

    /* Phlur runs a membership cashback note directly above the button.
       Siwa has no membership programme, and the shipping threshold is
       already carried by the D-03 trust row below — stating it twice in
       one buy box says the same thing twice. The slot therefore ships
       OFF rather than being filled with an invented claim. Turn it on
       and supply `text` when there is a real offer to put here. */
    promise: {
      show: false,
      text: { en: '', ar: '' }
    },

    /* D-03 — trust badges, verifiable claims only. Oakcha's
       vegan/paraben/atomizer row is explicitly NOT copied
       (DIRECTION.md Part 2 §7). */
    trust: [
      { icon: 'check',  text: { en: 'Verified reviews',   ar: 'تقييمات موثقة' } },
      { icon: 'lock',   text: { en: 'Secure payment',     ar: 'دفع آمن' } },
      { icon: 'truck',  text: { en: 'Free shipping over 1,500 EGP', ar: 'شحن مجاني فوق ١٥٠٠ ج.م' } },
      { icon: 'leaf',   text: { en: 'Crafted in Egypt',   ar: 'صُنع في مصر' } }
    ],

    /* Phlur's accordion: Description always first and open; "In This
       Set" appears on bundles only; Notes and Ingredients always.
       Phlur drives these titles from a metafield JSON array, which is
       exactly the blocks-not-loop shape the Prime Directive wants. */
    accordion: {
      firstOpen: true,
      items: [
        { id: 'description', title: { en: 'Description', ar: 'الوصف' },
          source: 'catalogue:body' },
        { id: 'inThisSet',   title: { en: 'In This Set', ar: 'محتويات الطقم' },
          source: 'catalogue:bundleItems', onlyWhen: 'bundle' },
        { id: 'notes',       title: { en: 'Notes', ar: 'النوتات' },
          source: 'catalogue:notes' },
        { id: 'howToWear',   title: { en: 'How to Wear', ar: 'طريقة الاستخدام' },
          body: {
            en: 'Spray onto pulse points — wrists, neck, the inside of the elbow. Do not rub; it breaks the top notes.',
            ar: 'رشّي العطر على مواضع النبض — المعصمين والعنق وداخل المرفق. لا تفركيه، فذلك يكسر النوتات العليا.'
          } },
        { id: 'ingredients', title: { en: 'Ingredients', ar: 'المكونات' },
          body: {
            en: 'Alcohol Denat., Parfum (Fragrance), Aqua (Water). Full INCI list on the carton.',
            ar: 'كحول مُمَسوخ، عطر، ماء. قائمة المكونات الكاملة على العلبة.'
          } }
      ]
    }
  },

  /* ============================================================
     5 · SCENT NOTES  (feature B-02 — note pyramid)
     Phlur's band: three labelled tiers in a half-width column
     beside a half-width image.
     ⚠ Only 18 of 56 catalogue products carry notes. Where they are
     absent the band renders the library's honest empty state and is
     NEVER invented (data-schema/README.md §7.2).
     ============================================================ */
  scentNotes: {
    show: true,
    heading: { en: 'Scent Notes', ar: 'نوتات العطر' },
    tiers: [
      { id: 'top',   label: { en: 'Top',   ar: 'النوتة العليا' } },
      { id: 'heart', label: { en: 'Heart', ar: 'النوتة الوسطى' } },
      { id: 'base',  label: { en: 'Base',  ar: 'النوتة القاعدية' } }
    ],
    image:    { file: '', alt: { en: '', ar: '' } },   // '' => product image
    emptyState: {
      en: 'Notes for this fragrance are being catalogued.',
      ar: 'يجري توثيق نوتات هذا العطر.'
    }
  },

  /* ============================================================
     6 · INTENSITY & SILLAGE  (feature B-03)
     Siwa addition — Phlur has no equivalent band. Required by
     DIRECTION.md Part 2 §3.1 (the Oakcha PDP module order).
     ⚠ The underlying metafields DO NOT EXIST YET (feature-doc B-03:
     "data does not exist yet"; longevity appears on 2 of 56).
     The band therefore ships hidden by default. Turning it on with
     no data renders the empty state — it never invents a rating.
     ============================================================ */
  scales: {
    show: false,                       // ⚠ no data yet — see above
    heading: { en: 'How it wears', ar: 'كيف يدوم' },
    scales: [
      { id: 'intensity', label: { en: 'Intensity', ar: 'الكثافة' },
        steps: [ { en: 'Subtle', ar: 'خفيف' }, { en: 'Distinct', ar: 'واضح' }, { en: 'Powerful', ar: 'قوي' } ] },
      { id: 'sillage',   label: { en: 'Sillage', ar: 'الانتشار' },
        steps: [ { en: 'Subtle', ar: 'خفيف' }, { en: 'Distinct', ar: 'واضح' }, { en: 'Powerful', ar: 'قوي' } ] }
    ],
    emptyState: {
      en: 'Wear data for this fragrance is being catalogued.',
      ar: 'يجري توثيق بيانات ثبات هذا العطر.'
    }
  },

  /* ============================================================
     7 · THE COLLECTION RAIL  (feature F-03)
     Phlur: "The Body Mist Collection" — a rail of the siblings that
     share this product's format.
     ============================================================ */
  collectionRail: {
    show: true,
    heading: { en: 'The Collection', ar: 'المجموعة' },
    source:  'register',      // same register as this product
    count:   8,
    cta:     { label: { en: 'Shop all', ar: 'تسوق الكل' }, href: '/collections/all' }
  },

  /* ============================================================
     8 · QUOTE  (feature B-05 — story before notes)
     Phlur's perfume-quotes band: a one-line scent statement beside
     an oversized image.
     ============================================================ */
  quote: {
    show: true,
    text: {
      en: 'Layer it, and it turns from a fragrance into a signature.',
      ar: 'اجمعيه مع غيره، فيتحول من عطر إلى توقيع.'
    },
    image: { file: '', alt: { en: 'Campaign photograph', ar: 'صورة الحملة' } }
  },

  /* ============================================================
     9 · REVIEWS  (feature D-02 — reviews, loud)
     Phlur runs Okendo in a dedicated band between the quote and the
     recommendations. Siwa's equivalent is the library's review
     summary + list, fed by the catalogue's own quotes.
     Shop-wide figures are cited, never re-asserted here.
     ============================================================ */
  reviews: {
    show: true,
    heading: { en: 'Reviews', ar: 'التقييمات' },
    /* {n} is replaced with the catalogue's own review count, in the
       locale's numerals. */
    countLabel: { en: '{n} reviews', ar: '{n} تقييم' },
    showDistribution: true,
    showPhotos: false,          // no review photography in the corpus
    limit: 4,
    sortLabels: [
      { id: 'recent',  label: { en: 'Most recent',  ar: 'الأحدث' } },
      { id: 'helpful', label: { en: 'Most helpful', ar: 'الأكثر إفادة' } },
      { id: 'rating',  label: { en: 'Highest rated', ar: 'الأعلى تقييماً' } }
    ],
    emptyState: { en: 'No reviews yet.', ar: 'لا توجد تقييمات بعد.' },
    writeCta:   { en: 'Write a review',  ar: 'اكتب تقييماً' }
  },

  /* ============================================================
     10 · YOU MAY ALSO LIKE  (feature F-03)
     ============================================================ */
  recommendations: {
    show: true,
    heading: { en: 'You may also like', ar: 'قد يعجبك أيضاً' },
    source: 'related',
    count: 4
  },

  /* ============================================================
     11 · STICKY CTA — Phlur's pdp-sticky-cta section
     Copy left (title + rating + format), add-to-bag right.
     ============================================================ */
  stickyCta: {
    show: true,
    showRating: true,
    showFormat: true
  },

  /* ============================================================
     12 · FOOTER
     ============================================================ */
  footer: {
    columns: [
      { title: { en: 'Shop', ar: 'المتجر' }, links: [
        { label: { en: 'All fragrances', ar: 'كل العطور' }, href: '/collections/all' },
        { label: { en: 'Original Creations', ar: 'إبداعات سيوة' }, href: '/collections/originals' },
        { label: { en: 'Layering', ar: 'الطبقات' }, href: '/pages/layering' },
        { label: { en: 'Bundles', ar: 'العروض' }, href: '/collections/bundles' }
      ]},
      { title: { en: 'Help', ar: 'المساعدة' }, links: [
        { label: { en: 'Shipping', ar: 'الشحن' }, href: '/pages/shipping' },
        { label: { en: 'Returns', ar: 'الإرجاع' }, href: '/pages/returns' },
        { label: { en: 'Contact', ar: 'تواصل معنا' }, href: '/pages/contact' },
        { label: { en: 'FAQ', ar: 'الأسئلة الشائعة' }, href: '/pages/faq' }
      ]},
      { title: { en: 'Siwa', ar: 'سيوة' }, links: [
        { label: { en: 'Our story', ar: 'قصتنا' }, href: '/pages/about' },
        { label: { en: 'The oasis', ar: 'الواحة' }, href: '/pages/oasis' },
        { label: { en: 'Journal', ar: 'المدونة' }, href: '/blogs/journal' }
      ]}
    ],
    newsletter: {
      show: true,
      title:       { en: 'Stay close', ar: 'ابقَ قريباً' },
      placeholder: { en: 'Email address', ar: 'البريد الإلكتروني' },
      cta:         { en: 'Sign up', ar: 'اشترك' }
    },
    legal: { en: '© Siwa Fragrances', ar: '© عطور سيوة' }
  },

  /* ============================================================
     SEO — rewritten by render.js on every locale switch, so the
     Arabic page is a real Arabic document and not an English one
     with mirrored boxes. CLAUDE.md §6 "Bilingual by default".
     Product-level JSON-LD (including aggregateRating, which the
     live store is missing on all 56 PDPs — the audit's #1 finding,
     feature D-01) is assembled by render.js from the catalogue.
     ============================================================ */
  seo: {
    titleSuffix: { en: ' | Siwa Fragrances', ar: ' | عطور سيوة' },
    description: {
      en: 'Egyptian perfumery from the Siwa Oasis. Free shipping over 1,500 EGP.',
      ar: 'عطور مصرية من واحة سيوة. شحن مجاني للطلبات فوق ١٥٠٠ ج.م.'
    },
    canonicalBase: 'https://siwafragrances.com/products/',
    brandName: { en: 'Siwa Fragrances', ar: 'عطور سيوة' },
    currency: 'EGP'
  }
};
