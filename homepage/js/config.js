/* ============================================================
   SIWA — HOMEPAGE CONTENT CONFIGURATION
   ------------------------------------------------------------
   EVERY merchant-editable value on the homepage lives in this file
   and nowhere else. index.html carries structure, homepage.css carries
   presentation, homepage.js carries behaviour — none of the three
   contains a content string, a price, a product name or a URL.

   This is the static-prototype form of MultiAgentsWorkFlow Law 1
   (zero hardcoded content). Each top-level key below is one homepage
   section and maps 1:1 to a future Shopify {% schema %} block; each
   leaf is one setting. Repeating items (nav, facets, quiz questions,
   personas, trust blocks, footer links) are arrays => schema BLOCKS,
   never a fixed loop.

   Bilingual convention: every customer-facing string is {en, ar}.
   Products are referenced BY HANDLE only — titles, prices, ratings,
   review counts, notes and stock all resolve at render time from
   ../component-library/js/data.js (the real 56-product catalogue).

   FEATURE PROGRAMME — feature-doc/index.html codes appear inline:
     A-01 faceted browsing      A-02 quiz→persona    A-03 dual-track nav
     A-04 predictive search     A-05 recently viewed B-02 note pyramid
     B-04 inspired-by contrast  C-01 bundle builder  C-02 layering
     C-03 cart + free shipping  C-04 gift message    C-05 wishlist
     D-01 aggregateRating       D-02 reviews loud    D-03 trust badges
     D-04 back-in-stock         E-01 bilingual RTL   E-02 House of Siwa
     E-03 provenance stamp      E-04 vintage layer   E-05 USP bar
     F-01 referral              F-02 newsletter      F-03 cross-sell

   FIGURE PROVENANCE — read before changing a number:
     · 1,212 reviews @ 4.98★  live figure, 2026-08-12
       (reference-analysis/_CORRECTIONS.md drift note)
     · 56 products / 40 inspired-by / 16 originals  same source
     · per-product prices, ratings, review counts, notes, stock
       resolved from the catalogue at runtime, NOT written here
     · original-retail comparison prices  ILLUSTRATIVE PLACEHOLDERS,
       not sourced. See inspired.retailDisclaimer.
   ============================================================ */

window.SIWA_HOME = {

  /* ---------- global ---------- */
  defaultLocale: 'en',
  freeShippingThreshold: 1500,          // EGP — real, from the live store
  currency: { en: 'EGP', ar: 'ج.م' },

  /* ============ 1 · ANNOUNCEMENT BAR (F-02) ============ */
  announcement: {
    enabled: true,
    message: {
      en: '50 EGP off your first order · Free shipping over 1,500 EGP',
      ar: 'خصم ٥٠ جنيه على أول طلب · شحن مجاني فوق ١٬٥٠٠ ج.م'
    },
    link: {
      label: { en: 'Find your scent', ar: 'اكتشف عطرك' },
      href: '#finder'
    },
    dismissible: true,
    storageKey: 'siwa:announcement-dismissed'
  },

  /* ============ 2 · HEADER — dual-track nav (A-03) ============ */
  /* Amouage's structure: commerce on one track, the story on another.
     DIRECTION.md Part 1 §2.1. */
  header: {
    logo: {
      latin: 'SIWA', arabic: 'سيوة', href: '/',
      alt: { en: 'Siwa Fragrances — home', ar: 'سيوة للعطور — الصفحة الرئيسية' }
    },
    commerce: [
      { label: { en: 'Perfumes',   ar: 'العطور' },            href: '/collections/all' },
      { label: { en: 'Originals',  ar: 'الإبداعات الأصلية' }, href: '/collections/original-creations' },
      { label: { en: 'Inspired By', ar: 'المستوحاة' },        href: '/collections/inspired-by' },
      { label: { en: 'Discovery',  ar: 'الاكتشاف' },          href: '/collections/bundles' }
    ],
    story: {
      label: { en: 'House of Siwa', ar: 'بيت سيوة' },
      href: '/pages/house',
      dropdown: [
        { label: { en: 'The Oasis',       ar: 'الواحة' },   href: '/pages/oasis' },
        { label: { en: 'The Ingredients', ar: 'المكونات' }, href: '/pages/ingredients' },
        { label: { en: 'The Craft',       ar: 'الحرفة' },   href: '/pages/craft' },
        { label: { en: 'The House',       ar: 'البيت' },    href: '/pages/house' }
      ]
    },
    /* A-04 predictive search */
    search: {
      placeholder: { en: 'Search a scent, a house, a note…', ar: 'ابحث عن عطر أو بيت أو نوتة…' },
      popularLabel: { en: 'Popular', ar: 'الأكثر بحثاً' },
      recentLabel:  { en: 'Recent',  ar: 'عمليات بحث سابقة' },
      popular: ['mawj', 'boujee-blush', 'layering-vanilla', 'drunk-gold'],
      storageKey: 'siwa:recent-searches'
    },
    accountHref: '/account',
    wishlistHref: '/pages/wishlist'
  },

  /* ============ 3 · HERO ============ */
  hero: {
    productHandle: 'mawj',              // real: 4.99★ · 68 reviews · from 800 EGP
    image: { src: '../component-library/img/mawj.jpg' },
    imageAlt: {
      en: 'Mawj Extrait de Parfum — the Siwa bottle on a salt ledge above open water',
      ar: 'موج إكستريه دو بارفان — زجاجة سيوة على حافة ملحية فوق الماء'
    },
    titleArabic: 'موج',
    eyebrow:     { en: 'The Salt Collection',           ar: 'مجموعة الملح' },
    tagline:     { en: 'Our Siwan original',            ar: 'إبداعنا السيوي الأصلي' },
    description: { en: 'Where the desert meets the sea', ar: 'حيث تلتقي الصحراء بالبحر' },
    ctaPrimary:   { label: { en: 'Shop Mawj',     ar: 'تسوق موج' },   href: '/products/mawj' },
    ctaSecondary: { label: { en: 'Find my scent', ar: 'اكتشف عطري' }, href: '#finder' },
    scrollHint:   { en: 'Scroll', ar: 'انزل' }
  },

  /* ============ 4 · USP BAR — verifiable claims only (E-05, D-03) ============ */
  /* Replaces the live store's "Exquisite Ingredients / Inclusive Pricing /
     Personalized Service" — three adjectives with no evidence behind any. */
  usp: [
    { icon: 'star',   label: { en: '1,212 reviews · 4.98★', ar: '١٬٢١٢ تقييم · ٤٫٩٨★' }, href: '#reviews' },
    { icon: 'truck',  label: { en: 'Free shipping over 1,500 EGP', ar: 'شحن مجاني فوق ١٬٥٠٠ ج.م' }, href: '/pages/shipping' },
    { icon: 'pin',    label: { en: 'Crafted in Nasr City, Cairo', ar: 'صُنع في مدينة نصر، القاهرة' },
      href: 'https://www.google.com/maps/search/?api=1&query=Nasr+City%2C+Cairo%2C+Egypt', external: true },
    { icon: 'shield', label: { en: 'Authenticity guarantee', ar: 'ضمان الأصالة' }, href: '/pages/authenticity' }
  ],

  /* ============ 5 · REVIEWS, LOUD (D-02) ============ */
  proof: {
    rating: 4.98, reviewCount: 1212,
    ratingLabel: { en: 'Average rating', ar: 'متوسط التقييم' },
    countLabel:  { en: 'Verified reviews', ar: 'تقييم موثق' },
    productsLabel: { en: 'Products rated', ar: 'منتج مُقيَّم' },
    ratedProducts: 54,                  // 54 of 56 — _CORRECTIONS.md §1
    distributionLabel: { en: 'Rating distribution', ar: 'توزيع التقييمات' },
    /* Real shape: 804 of 820 attributable reviews are 5★, none below 4★.
       _CORRECTIONS.md §1 records this as a credibility question to resolve
       before the corpus is promoted externally — it is shown honestly here
       rather than smoothed into a prettier curve. */
    distribution: [
      { stars: 5, count: 804 },
      { stars: 4, count: 16 },
      { stars: 3, count: 0 },
      { stars: 2, count: 0 },
      { stars: 1, count: 0 }
    ],
    distributionNote: {
      en: 'Distribution shown across the 820 reviews attributable to published products.',
      ar: 'التوزيع محسوب على ٨٢٠ تقييماً منسوباً لمنتجات منشورة.'
    },
    cta: { label: { en: 'Read all reviews', ar: 'اقرأ كل التقييمات' }, href: '#reviews' }
  },

  /* ============ 6 · SCENT FINDER — quiz to persona (A-02) ============ */
  /* Skylar's architecture: the result is a PAIR (a scent plus a layering
     partner), not a single bottle — which raises order value by construction.
     Persona names are Siwa's own and belong to the identity track. */
  finder: {
    eyebrow: { en: 'Sixty seconds', ar: 'ستون ثانية' },
    heading: { en: 'Find the scent that is already yours', ar: 'اعثر على العطر الذي يشبهك' },
    intro: {
      en: 'Three questions. One persona. A bottle and the layer that completes it.',
      ar: 'ثلاثة أسئلة. شخصية واحدة. زجاجة والطبقة التي تكملها.'
    },
    startLabel:   { en: 'Begin',      ar: 'ابدأ' },
    restartLabel: { en: 'Start over', ar: 'ابدأ من جديد' },
    ofLabel:      { en: 'of',         ar: 'من' },
    resultEyebrow:{ en: 'Your persona', ar: 'شخصيتك' },
    addPairLabel: { en: 'Add both to bag', ar: 'أضف الاثنين للحقيبة' },
    pairSaving:   { en: 'Bought together', ar: 'يُشترى معاً' },

    questions: [
      {
        key: 'family',
        prompt: { en: 'Which of these would you wear all week?', ar: 'أي هذه تلبسه طوال الأسبوع؟' },
        options: [
          { value: 'gourmand', label: { en: 'Vanilla, caramel, coffee', ar: 'فانيليا، كراميل، قهوة' } },
          { value: 'floral',   label: { en: 'Rose, peony, powder',      ar: 'ورد، فاوانيا، بودرة' } },
          { value: 'fresh',    label: { en: 'Citrus, salt, open air',   ar: 'حمضيات، ملح، هواء طلق' } },
          { value: 'woody',    label: { en: 'Oud, sandalwood, amber',   ar: 'عود، صندل، عنبر' } }
        ]
      },
      {
        key: 'presence',
        prompt: { en: 'How much room should it take?', ar: 'كم مساحة تريده أن يأخذ؟' },
        options: [
          { value: 'subtle',   label: { en: 'Close to the skin', ar: 'قريب من البشرة' } },
          { value: 'distinct', label: { en: 'Noticed, not loud', ar: 'ملحوظ دون ضجيج' } },
          { value: 'powerful', label: { en: 'Fills the room',    ar: 'يملأ الغرفة' } }
        ]
      },
      {
        key: 'register',
        prompt: { en: 'And what are you here for?', ar: 'ولماذا أنت هنا؟' },
        options: [
          { value: 'original', label: { en: 'Something nobody else has', ar: 'شيء لا يملكه غيري' } },
          { value: 'inspired', label: { en: 'A scent I already love, for less', ar: 'عطر أحبه بسعر أقل' } },
          { value: 'either',   label: { en: 'Surprise me', ar: 'فاجئني' } }
        ]
      }
    ],

    /* Five personas. Arabic names need translation sign-off — flagged in
       component-library/README.md as an open item. */
    personas: [
      { key: 'goddess', match: { family: 'floral',   register: 'original' },
        name: { en: 'The Goddess', ar: 'الإلهة' },
        line: { en: 'Rose and powder, worn like a verdict.', ar: 'ورد وبودرة، تُلبس كحُكم.' },
        product: 'pink-allure', layer: 'layering-lychee' },
      { key: 'poet', match: { family: 'gourmand', register: 'original' },
        name: { en: 'The Poet', ar: 'الشاعر' },
        line: { en: 'Coffee, vanilla, and the long evening.', ar: 'قهوة وفانيليا ومساء طويل.' },
        product: 'coffee-vanilla', layer: 'layering-vanilla' },
      { key: 'muse', match: { family: 'gourmand', register: 'inspired' },
        name: { en: 'The Muse', ar: 'الملهمة' },
        line: { en: 'Sweet, close, impossible to place.', ar: 'حلو، قريب، يصعب تحديده.' },
        product: 'boujee-blush', layer: 'layering-vanilla' },
      { key: 'heir', match: { family: 'woody', register: 'either' },
        name: { en: 'The Heir', ar: 'الوريث' },
        line: { en: 'Amber and wood, and nothing to prove.', ar: 'عنبر وخشب، ولا شيء لإثباته.' },
        product: 'drunk-gold', layer: 'layering-apple' },
      { key: 'nomad', match: { family: 'fresh', register: 'either' },
        name: { en: 'The Nomad', ar: 'الرحّالة' },
        line: { en: 'Salt air, and somewhere to be.', ar: 'هواء مالح، ووجهة ما.' },
        product: 'mawj', layer: 'layering-pistachio' }
    ],
    fallbackPersona: 'nomad'
  },

  /* ============ 7 · SHOP BY MOOD — live facets (A-01) ============ */
  mood: {
    eyebrow: { en: 'Browse', ar: 'تصفح' },
    heading: { en: 'Shop by mood', ar: 'تصفح حسب المزاج' },
    allLabel: { en: 'Everything', ar: 'الكل' },
    countLabel: { en: 'scents', ar: 'عطر' },
    emptyLabel: { en: 'Nothing matches yet — try another mood.', ar: 'لا يوجد تطابق — جرب مزاجاً آخر.' },
    show: 8,
    moreLabel: { en: 'Show more', ar: 'أظهر المزيد' },

    /* ⚠ DERIVED, NOT AUTHORED. The note taxonomy (feature B-01) has not been
       migrated: zero metafields exist and only 18 of 56 products carry
       parseable notes. Until then a facet is matched by keyword against the
       product's title, notes and description. Each family lists the terms it
       matches, so the mapping is editable and auditable rather than hidden in
       code. Replace this whole block with a metafield read after B-01 ships. */
    families: [
      { key: 'gourmand', label: { en: 'Gourmand', ar: 'حلو' },
        terms: ['vanilla', 'caramel', 'coffee', 'chocolate', 'marshmallow', 'sugar', 'honey', 'praline', 'pistachio', 'toffee', 'gourmand', 'creme', 'latte', 'cocoa'] },
      { key: 'floral', label: { en: 'Floral', ar: 'زهري' },
        terms: ['rose', 'peony', 'jasmine', 'floral', 'hibiscus', 'iris', 'orange blossom', 'ylang', 'tuberose', 'lily', 'violet'] },
      { key: 'fresh', label: { en: 'Fresh', ar: 'منعش' },
        terms: ['citrus', 'bergamot', 'lemon', 'grapefruit', 'marine', 'aquatic', 'salt', 'fresh', 'mint', 'green', 'lavender', 'mandarin', 'zest'] },
      { key: 'fruity', label: { en: 'Fruity', ar: 'فاكهي' },
        terms: ['mango', 'pineapple', 'lychee', 'apple', 'peach', 'berry', 'fruit', 'coconut', 'passionfruit', 'cherry'] },
      { key: 'woody', label: { en: 'Woody & Oud', ar: 'خشبي وعود' },
        terms: ['oud', 'sandalwood', 'wood', 'cedar', 'vetiver', 'patchouli', 'leather', 'tobacco', 'smoke'] },
      { key: 'amber', label: { en: 'Amber & Spice', ar: 'عنبري وحار' },
        terms: ['amber', 'spice', 'saffron', 'cinnamon', 'pepper', 'cardamom', 'incense', 'resin', 'labdanum', 'musk'] }
    ],
    /* A second facet axis, matching Oakcha's differentiated "designer house"
       filter. Values are read live from the catalogue's `house` field. */
    houseFacetLabel: { en: 'Inspired by house', ar: 'حسب البيت' },
    registerFacet: [
      { key: 'siwa_owned', label: { en: 'Siwan originals', ar: 'إبداعات سيوية' } },
      { key: 'inspired_by', label: { en: 'Inspired by', ar: 'مستوحاة' } }
    ]
  },

  /* ============ 8 · ORIGINAL CREATIONS ============ */
  originals: {
    eyebrow:     { en: 'Sixteen of fifty-six',              ar: 'ستة عشر من ستة وخمسين' },
    title:       { en: 'Original Creations',                ar: 'الإبداعات الأصلية' },
    description: { en: 'Our own recipes, composed and filled in Egypt. The oasis belongs to these sixteen — not to the catalogue.',
                   ar: 'وصفاتنا نحن، تُركَّب وتُعبَّأ في مصر. الواحة تخص هؤلاء الستة عشر — لا الكتالوج كله.' },
    badge:       { en: 'Authentic Siwan',                   ar: 'أصيل سيوي' },
    /* E-03 provenance stamp — Kahina's passport-style attribution */
    stamp:       { en: 'Composed · Nasr City · Cairo',      ar: 'تركيب · مدينة نصر · القاهرة' },
    viewAll:     { en: 'All 16 originals',                  ar: 'كل الـ١٦' },
    viewAllHref: '/collections/original-creations',
    handles: ['mawj', 'coffee-vanilla', 'irresistible-vanilla', 'pink-allure',
              'gourmet', 'chocolate-creme', 'silk-vanilla', 'pink-arrogance'],
    itemsToShow: 4
  },

  /* ============ 9 · INSPIRED BY LUXURY ============ */
  inspired: {
    eyebrow:     { en: 'Forty of fifty-six',           ar: 'أربعون من ستة وخمسين' },
    title:       { en: 'Inspired by luxury',           ar: 'المستوحاة من الفخامة' },
    description: { en: 'The scents you already love, honestly merchandised on price. No lore attached.',
                   ar: 'العطور التي تحبها بالفعل، معروضة بصدق على السعر. بلا حكايات.' },
    badge:       { en: 'Inspired by',                  ar: 'مستوحى من' },
    viewAll:     { en: 'All 40 inspired-by',           ar: 'كل الـ٤٠' },
    viewAllHref: '/collections/inspired-by',
    handles: ['boujee-blush', 'hibiscusex', 'drunk-gold', 'caramel-vanigliato',
              'lady-killer', 'alluring-rose', 'marasi', 'coco-woods'],
    itemsToShow: 4,
    /* B-04. Blocked on counsel: Oakcha operates in the US, Siwa in Egypt.
       The module works without the third fact — set false to drop every
       comparison in one edit. */
    showRetailContrast: true,
    retailContrastLabel: { en: 'Original retails at', ar: 'سعر الأصلي' },
    retailDisclaimer: {
      en: 'Comparison figures are indicative recommended retail for the referenced original, not a Siwa price.',
      ar: 'أرقام المقارنة استرشادية للسعر الأصلي المُشار إليه، وليست سعراً من سيوة.'
    }
  },

  /* ============ 10 · BUILD YOUR SET (C-01, C-02) ============ */
  set: {
    eyebrow: { en: 'Two ways in', ar: 'طريقان' },
    heading: { en: 'Build your set', ar: 'اصنع مجموعتك' },
    intro: {
      en: 'Try three before you commit to one — or layer two into something only you wear.',
      ar: 'جرب ثلاثة قبل أن تلتزم بواحد — أو ركّب اثنين في عطر لا يلبسه غيرك.'
    },
    tabs: [
      { key: 'bundle',   label: { en: 'Discovery trio', ar: 'ثلاثية الاكتشاف' } },
      { key: 'layering', label: { en: 'Layering',       ar: 'الطبقات' } }
    ],

    /* C-01 — Snif's pick-three at travel size */
    bundle: {
      slots: 3,
      slotLabel:  { en: 'Slot',  ar: 'خانة' },
      emptyLabel: { en: 'Empty', ar: 'فارغة' },
      pickLabel:  { en: 'Pick three travel sizes', ar: 'اختر ثلاثة أحجام سفر' },
      /* Priced against the real layering-bundle SKU that already exists on the
         store, so the set price is never invented. */
      priceFromHandle: 'layering-30-ml-bundle',
      priceLabel: { en: 'Set price', ar: 'سعر المجموعة' },
      savingLabel: { en: 'You save', ar: 'توفر' },
      addLabel:   { en: 'Add the trio', ar: 'أضف الثلاثية' },
      incompleteLabel: { en: 'Pick {n} more', ar: 'اختر {n} أخرى' },
      poolHandles: ['mawj', 'boujee-blush', 'coffee-vanilla', 'drunk-gold',
                    'hibiscusex', 'caramel-vanigliato', 'pink-allure', 'marasi',
                    'lady-killer', 'gourmet', 'chocolate-creme', 'bare-glow']
    },

    /* C-02 — Kayali's layering system, on the line Siwa already sells */
    layering: {
      baseLabel:  { en: 'Start with a base', ar: 'ابدأ بقاعدة' },
      layerLabel: { en: 'Add a layer',       ar: 'أضف طبقة' },
      basePlaceholder: { en: 'Choose any eau de parfum', ar: 'اختر أي عطر' },
      layerHandles: ['layering-vanilla', 'layering-pistachio', 'layering-lychee', 'layering-apple'],
      totalLabel: { en: 'Together', ar: 'معاً' },
      addLabel:   { en: 'Add both', ar: 'أضف الاثنين' },
      combinationsLabel: { en: 'Customers pair these', ar: 'عملاؤنا يجمعون هذه' },
      combinations: [
        { base: 'mawj',           layer: 'layering-vanilla' },
        { base: 'hibiscusex',     layer: 'layering-lychee' },
        { base: 'drunk-gold',     layer: 'layering-apple' },
        { base: 'coffee-vanilla', layer: 'layering-pistachio' }
      ],
      /* layering-vanilla is the #1 product in the catalogue by review volume */
      note: {
        en: 'Layering Vanilla is our most-reviewed product — 98 reviews, 5.00★.',
        ar: 'طبقات الفانيليا هو الأكثر تقييماً لدينا — ٩٨ تقييماً بمتوسط ٥٫٠٠★.'
      }
    }
  },

  /* ============ 11 · HOUSE OF SIWA (E-02, E-04) ============ */
  /* Specific, ownable lore only — Temple of the Oracle, Shali fortress,
     Amazigh identity, kershef, the embroidery palette. The ONLY section
     permitted the Cultural Accent Set (DesignSystem.md §2) and the only one
     carrying the vintage treatment layer (§10). */
  house: {
    backgroundImage: null,              // no Siwa photograph exists in this repo
    backgroundAlt: {
      en: 'Shali Fortress, Siwa Oasis — kershef walls of salt, clay and mud',
      ar: 'قلعة شالي بواحة سيوة — جدران الكرشيف من الملح والطين'
    },
    eyebrow: { en: 'House of Siwa', ar: 'بيت سيوة' },
    heading: { en: 'A real oasis, not an adjective', ar: 'واحة حقيقية، لا صفة' },
    lede: {
      en: 'Six hundred kilometres from Cairo, past the last road, Siwa keeps its own language and builds its walls from salt.',
      ar: 'على بعد ستمائة كيلومتر من القاهرة، خلف آخر طريق، تحتفظ سيوة بلغتها وتبني جدرانها من الملح.'
    },
    /* Four narrative pillars — Fueguia's naming, DIRECTION.md Part 1 §2.4 */
    pillars: [
      { key: 'oasis', href: '/pages/oasis',
        label: { en: 'The Oasis', ar: 'الواحة' },
        line:  { en: 'Alexander crossed the desert in 331 BC to ask the Oracle of Amun whether he was a god. The temple is still standing.',
                 ar: 'عبر الإسكندر الصحراء عام ٣٣١ ق.م ليسأل وحي آمون إن كان إلهاً. المعبد لا يزال قائماً.' },
        accent: 'date-yellow' },
      { key: 'ingredients', href: '/pages/ingredients',
        label: { en: 'The Ingredients', ar: 'المكونات' },
        line:  { en: 'Dates, olives and salt. Siwa has traded all three for two thousand years, and they are what the oasis actually produces.',
                 ar: 'بلح وزيتون وملح. تتاجر سيوة بها منذ ألفي عام، وهي ما تنتجه الواحة فعلاً.' },
        accent: 'palm-green' },
      { key: 'craft', href: '/pages/craft',
        label: { en: 'The Craft', ar: 'الحرفة' },
        line:  { en: 'Shali fortress is built from kershef — salt, clay and mud cut from the lake bed. Thirteenth century, and it has not fallen.',
                 ar: 'قلعة شالي مبنية من الكرشيف — ملح وطين من قاع البحيرة. من القرن الثالث عشر، ولم تسقط.' },
        accent: 'desert-brown' },
      { key: 'house', href: '/pages/house',
        label: { en: 'The House', ar: 'البيت' },
        line:  { en: 'Siwans speak Siwi, a Berber language, and embroider in five colours. Those five are the only heritage colours on this site.',
                 ar: 'أهل سيوة يتحدثون السيويّة، لغة أمازيغية، ويطرّزون بخمسة ألوان. تلك الخمسة هي ألوان التراث الوحيدة هنا.' },
        accent: 'date-red' }
    ],
    cta: { label: { en: 'Read the full story', ar: 'اقرأ القصة كاملة' }, href: '/pages/our-story' },
    /* E-03 — the ethical floor, stated rather than implied */
    attribution: {
      en: 'Siwa Fragrances is composed in Cairo and named for the oasis. Cultural sign-off from Siwan representatives is a prerequisite of this story track, not a polish step.',
      ar: 'عطور سيوة تُركَّب في القاهرة وتحمل اسم الواحة. موافقة ممثلي سيوة الثقافية شرط لهذا المسار، لا خطوة تجميلية.'
    }
  },

  /* ============ 12 · BEST SELLERS ============ */
  bestSellers: {
    eyebrow: { en: 'Ranked by verified review count', ar: 'مرتّبة حسب عدد التقييمات الموثقة' },
    title:   { en: 'What people actually buy', ar: 'ما يشتريه الناس فعلاً' },
    handles: null,                      // null => rank the real catalogue
    count: 10,
    prevLabel: { en: 'Previous', ar: 'السابق' },
    nextLabel: { en: 'Next',     ar: 'التالي' }
  },

  /* ============ 13 · REVIEWS SHOWCASE (D-02) ============ */
  /* Real review bodies, verbatim from the July 2026 capture. `en` and `ar`
     are DIFFERENT REAL REVIEWS, not translations — the store's customers
     write in both languages and both are quoted as written. */
  reviews: {
    eyebrow: { en: 'Unedited', ar: 'بلا تحرير' },
    heading: { en: 'What our customers say', ar: 'عملاؤنا بيقولوا إيه' },
    verifiedLabel: { en: 'Verified purchase', ar: 'شراء موثق' },
    helpfulLabel:  { en: 'Helpful', ar: 'مفيد' },
    sortLabel:     { en: 'Sort', ar: 'ترتيب' },
    sorts: [
      { key: 'helpful', label: { en: 'Most helpful', ar: 'الأكثر إفادة' } },
      { key: 'recent',  label: { en: 'Most recent',  ar: 'الأحدث' } }
    ],
    items: [
      { handle: 'bleu-exclusive', rating: 5, author: 'Mohaamed Gafar', verified: true, days: 2, helpful: 12,
        body: { en: 'I had the original L’Exclusif and I know Chanel dupes have never been copied properly — but for this, I respect you so much. Great blend.',
                ar: 'برفيوم ولا غلطة، نسبة تطابق عالية جدا، ثبات وفوحان ولا أروع — قيمة مقابل سعر بجد برافوو.' },
        authorAr: 'Anonymous', handleAr: 'iris-elixir' },
      { handle: 'hibiscusex', rating: 5, author: 'Jana Mohammed', verified: true, days: 7, helpful: 9,
        body: { en: 'Smells amazing with great depth. The moment it settles the aroma is intoxicating — it lasts DAYS on clothes.',
                ar: 'الافتتاحية متفجرة بتقلب الغرفة حرفياً، والثبات — رشة واحدة على ظهر إيدي كمّلت ٨ ساعات ولسه ثابتة، وقاعدة خشب الصندل تحفة.' },
        authorAr: 'Kareem Magdi', handleAr: 'bleu-intense' },
      { handle: 'coco-woods', rating: 5, author: 'Omar', verified: true, days: 14, helpful: 7,
        body: { en: 'This might be the best fragrance I have used by far. Not only has it got me a lot of compliments, it also made me feel happier about life for some reason.',
                ar: 'الريحة دافية كريمية، حاسة الكراميل والفانيليا متوازنين، مديني إحساس آيس كريم — وثباته بجد حلو جدا، حبيته أوي ❤️' },
        authorAr: 'Amaal Ahmed', handleAr: 'caramel-vanigliato' },
      { handle: 'mawj', rating: 5, author: 'Mayar Khaled', verified: true, days: 21, helpful: 6,
        body: { en: 'Smells very much like the original with a slight difference that made me like this version even more. Longevity is amazing — literally stays all day.',
                ar: 'جميلة جدا، ولما تركز فيها تحس فعلاً بأجواء البحر والصيف، وبتفضل لفترة طويلة — من الحاجات المميزة فعلاً.' },
        authorAr: 'محمد ابوعوف', handleAr: 'mawj' },
      { handle: 'coffee-vanilla', rating: 5, author: 'Hanatamer', verified: true, days: 30, helpful: 4,
        body: { en: 'Truly a masterpiece and it lasts. Every note shows — coffee first, then chocolate and vanilla. The atomiser is lovely too.',
                ar: 'حلوه اوي اوي انا جبته من الريفيوهات عالموقع، بجد مش واخد حقه — هادي وأنثوي جدا ودافي وحميمي، رائع رائع رائع.' },
        authorAr: 'Anonymous', handleAr: 'irresistible-vanilla' },
      { handle: 'drunk-gold', rating: 5, author: 'Ahmed Hossam', verified: true, days: 45, helpful: 3,
        body: { en: 'A wonderful and long-lasting scent. Ordered twice already.',
                ar: 'تحفه بجد سوبر فريش و سويت مع تويست فريش و ريحه مرار قشر برتقال في الخلفية — بجد تحفه.' },
        authorAr: 'Hazem Sobhy', handleAr: 'pacific-elixir' }
    ],
    cta: { label: { en: 'View all 1,212 reviews', ar: 'شاهد كل الـ١٬٢١٢ تقييم' }, href: '/pages/reviews' }
  },

  /* ============ 14 · RECENTLY VIEWED (A-05) ============ */
  recent: {
    heading: { en: 'Picked up where you left off', ar: 'أكمل من حيث توقفت' },
    clearLabel: { en: 'Clear', ar: 'مسح' },
    storageKey: 'siwa:recently-viewed',
    max: 8
  },

  /* ============ 15 · STAY CLOSE — referral + newsletter (F-01, F-02) ============ */
  keepclose: {
    referral: {
      eyebrow: { en: 'Referral', ar: 'الإحالة' },
      heading: { en: 'Send 50 EGP, get 50 EGP', ar: 'أرسل ٥٠ ج.م، واحصل على ٥٠ ج.م' },
      body: { en: 'Share your link. When a friend orders, you both get 50 EGP off.',
              ar: 'شارك رابطك. عندما يطلب صديق، يحصل كلاكما على خصم ٥٠ ج.م.' },
      /* WhatsApp is a first-class channel — it is how this market shares */
      whatsappLabel: { en: 'Share on WhatsApp', ar: 'شارك على واتساب' },
      copyLabel: { en: 'Copy link', ar: 'انسخ الرابط' },
      copiedLabel: { en: 'Copied', ar: 'تم النسخ' },
      link: 'https://siwafragrances.com/?ref=siwa50',
      shareText: { en: 'I found my scent at Siwa Fragrances — here is 50 EGP off yours:',
                   ar: 'لقيت عطري عند سيوة للعطور — وده خصم ٥٠ ج.م ليك:' }
    },
    newsletter: {
      eyebrow: { en: 'Newsletter', ar: 'النشرة' },
      heading: { en: 'A gift for your first order', ar: 'هدية لطلبك الأول' },
      incentive: { en: '50 EGP off, plus first access to new releases.',
                   ar: 'خصم ٥٠ ج.م، وأولوية الوصول للإصدارات الجديدة.' },
      label: { en: 'Email address', ar: 'البريد الإلكتروني' },
      placeholder: { en: 'you@example.com', ar: 'you@example.com' },
      button: { en: 'Subscribe', ar: 'اشترك' },
      /* No subscriber count is published. The store has never disclosed one,
         and inventing "12,000+" would be a fabricated figure. */
      socialProof: null,
      success: { en: 'Thank you — check your inbox for the code.', ar: 'شكراً لك — راجع بريدك للحصول على الكود.' },
      error:   { en: 'Please enter a valid email address.', ar: 'من فضلك أدخل بريداً إلكترونياً صحيحاً.' },
      consent: { en: 'Unsubscribe any time.', ar: 'يمكنك إلغاء الاشتراك في أي وقت.' }
    }
  },

  /* ============ 16 · FOOTER ============ */
  footer: {
    linkGroups: [
      { title: { en: 'Shop', ar: 'تسوّق' },
        links: [
          { label: { en: 'Original Creations', ar: 'الإبداعات الأصلية' }, href: '/collections/original-creations' },
          { label: { en: 'Inspired By',        ar: 'المستوحاة' },        href: '/collections/inspired-by' },
          { label: { en: 'Discovery Sets',     ar: 'مجموعات الاكتشاف' }, href: '/collections/bundles' },
          { label: { en: 'Layering',           ar: 'الطبقات' },          href: '/collections/layering' },
          { label: { en: 'Body',               ar: 'العناية بالجسم' },   href: '/collections/body' }
        ] },
      { title: { en: 'House of Siwa', ar: 'بيت سيوة' },
        links: [
          { label: { en: 'The Oasis',       ar: 'الواحة' },   href: '/pages/oasis' },
          { label: { en: 'The Ingredients', ar: 'المكونات' }, href: '/pages/ingredients' },
          { label: { en: 'The Craft',       ar: 'الحرفة' },   href: '/pages/craft' },
          { label: { en: 'The House',       ar: 'البيت' },    href: '/pages/house' }
        ] },
      { title: { en: 'Support', ar: 'الدعم' },
        links: [
          { label: { en: 'Contact',        ar: 'تواصل معنا' },      href: '/pages/contact' },
          { label: { en: 'Shipping',       ar: 'الشحن' },           href: '/pages/shipping' },
          { label: { en: 'Returns',        ar: 'الإرجاع' },         href: '/pages/returns' },
          { label: { en: 'Spot a fake',    ar: 'اعرف المقلد' },     href: '/pages/authenticity' },
          { label: { en: 'Track order',    ar: 'تتبع الطلب' },      href: '/pages/track' }
        ] }
    ],
    socialLabel: { en: 'Follow Siwa', ar: 'تابع سيوة' },
    social: [
      { platform: 'instagram', label: 'Instagram', url: 'https://instagram.com/siwafragrances' },
      { platform: 'tiktok',    label: 'TikTok',    url: 'https://tiktok.com/@siwafragrances' },
      { platform: 'facebook',  label: 'Facebook',  url: 'https://facebook.com/siwafragrances' },
      // MUST stay a wa.me deep link — the live store prints the number as plain text
      { platform: 'whatsapp',  label: 'WhatsApp',  url: 'https://wa.me/201000000000' }
    ],
    languageLabel: { en: 'Language', ar: 'اللغة' },
    address: {
      label: { en: 'Nasr City, Cairo', ar: 'مدينة نصر، القاهرة' },
      mapHref: 'https://www.google.com/maps/search/?api=1&query=Nasr+City%2C+Cairo%2C+Egypt'
    },
    brandName: { en: 'Siwa Fragrances', ar: 'سيوة للعطور' },
    copyrightYear: 2026,
    legal: [
      { label: { en: 'Privacy', ar: 'الخصوصية' }, href: '/policies/privacy-policy' },
      { label: { en: 'Terms',   ar: 'الشروط' },   href: '/policies/terms-of-service' }
    ]
  },

  /* ============ ARABIC PRODUCT NAMES ============ */
  /* The physical bottles are bilingual — the Mawj label reads
     SIWA FRAGRANCES → موج → EXTRAIT DE PARFUM — but the catalogue carries
     Latin titles only, so the Arabic display names live here as an editable
     map rather than being invented at render time.

     ⚠ TRANSLATION SIGN-OFF PENDING for everything except `mawj` (موج), which
     is attested on the bottle. Any handle absent from this map falls back to
     its Latin title — that is correct behaviour, not a bug. */
  productNamesAr: {
    'mawj': 'موج',
    'coffee-vanilla': 'قهوة وفانيليا',
    'irresistible-vanilla': 'فانيليا لا تُقاوم',
    'pink-allure': 'إغراء وردي',
    'gourmet': 'غورميه',
    'chocolate-creme': 'كريمة الشوكولاتة',
    'silk-vanilla': 'فانيليا حريرية',
    'pink-arrogance': 'كبرياء وردي',
    'layering-vanilla': 'طبقات الفانيليا',
    'layering-pistachio': 'طبقات الفستق',
    'layering-lychee': 'طبقات الليتشي',
    'layering-apple': 'طبقات التفاح'
  },

  /* ============ SECOND PRODUCT IMAGES (hover swap) ============ */
  /* Only 3 of 56 products carry a primary photograph and 2 carry a second.
     50 of 56 have exactly one image and 100% have null alt text — a
     photography brief, not a code fix (feature-doc B-06). */
  productImagesAlt: {
    'mawj': '../component-library/img/mawj-2.jpg',
    'coco-woods': '../component-library/img/coco-woods-2.jpg'
  },

  /* ============ UI STRINGS ============ */
  ui: {
    addToCart:   { en: 'Add to bag',    ar: 'أضف إلى الحقيبة' },
    adding:      { en: 'Adding…',       ar: 'جارٍ الإضافة…' },
    added:       { en: 'Added',         ar: 'تمت الإضافة' },
    soldOut:     { en: 'Sold out',      ar: 'نفدت الكمية' },
    notifyMe:    { en: 'Notify me',     ar: 'أعلمني' },
    from:        { en: 'From',          ar: 'من' },
    reviews:     { en: 'reviews',       ar: 'تقييم' },
    noReviews:   { en: 'New',           ar: 'جديد' },
    wishlistAdd: { en: 'Save',          ar: 'حفظ' },
    wishlistRem: { en: 'Saved',         ar: 'محفوظ' },
    bag:         { en: 'Your bag',      ar: 'حقيبتك' },
    bagEmpty:    { en: 'Your bag is empty', ar: 'حقيبتك فارغة' },
    subtotal:    { en: 'Subtotal',      ar: 'المجموع' },
    checkout:    { en: 'Checkout',      ar: 'إتمام الشراء' },
    remove:      { en: 'Remove',        ar: 'إزالة' },
    close:       { en: 'Close',         ar: 'إغلاق' },
    menu:        { en: 'Menu',          ar: 'القائمة' },
    search:      { en: 'Search',        ar: 'بحث' },
    account:     { en: 'Account',       ar: 'الحساب' },
    wishlist:    { en: 'Saved items',   ar: 'المحفوظات' },
    openBag:     { en: 'Open bag',      ar: 'افتح الحقيبة' },
    noResults:   { en: 'No fragrances match that search.', ar: 'لا توجد عطور مطابقة لهذا البحث.' },
    freeShipLeft:{ en: 'away from free shipping', ar: 'يفصلك عن الشحن المجاني' },
    freeShipOk:  { en: 'Free shipping unlocked',  ar: 'حصلت على الشحن المجاني' },
    localeChanged: { en: 'Language changed to English', ar: 'تم تغيير اللغة إلى العربية' },
    skip:        { en: 'Skip to content', ar: 'تخطَّ إلى المحتوى' },
    notes:       { en: 'Notes', ar: 'النوتات' },
    top:         { en: 'Top',   ar: 'عليا' },
    heart:       { en: 'Heart', ar: 'قلب' },
    base:        { en: 'Base',  ar: 'أساس' },
    /* C-04 gift messaging */
    giftToggle:  { en: 'This is a gift', ar: 'هذه هدية' },
    giftNote:    { en: 'Gift note (optional)', ar: 'رسالة الهدية (اختياري)' },
    giftHide:    { en: 'Hide prices on the packing slip', ar: 'إخفاء الأسعار من إيصال الشحن' },
    /* F-03 cross-sell */
    crossSell:   { en: 'Complete the set', ar: 'أكمل المجموعة' },
    /* D-04 back-in-stock */
    notifyTitle: { en: 'Tell me when it is back', ar: 'أعلمني عند التوفر' },
    notifyBody:  { en: 'We will email you the moment this is back in stock. No other mail.',
                   ar: 'سنراسلك فور عودة المنتج. ولا شيء غير ذلك.' },
    notifyDone:  { en: 'Done — we will be in touch.', ar: 'تم — سنتواصل معك.' }
  },

  /* ============ SEO ============ */
  seo: {
    en: { lang: 'en', dir: 'ltr',
      title: 'Siwa Fragrances | Egyptian Luxury Perfumes | Original & Inspired Scents',
      description: 'Discover Siwa Fragrances: Egyptian perfumes blending Siwan heritage with accessible pricing. 1,212 reviews at 4.98 stars. 16 original creations and 40 designer-inspired scents. Free shipping over 1,500 EGP.',
      canonical: 'https://siwafragrances.com/' },
    ar: { lang: 'ar', dir: 'rtl',
      title: 'سيوة للعطور | عطور مصرية فاخرة | روائح أصلية ومستوحاة',
      description: 'اكتشف سيوة للعطور: عطور مصرية تجمع بين تراث سيوة وأسعار في المتناول. ١٬٢١٢ تقييم بمتوسط ٤٫٩٨ نجمة. ١٦ إبداعاً أصلياً و٤٠ عطراً مستوحى. شحن مجاني فوق ١٬٥٠٠ ج.م.',
      canonical: 'https://siwafragrances.com/?locale=ar' },
    organization: {
      name: 'Siwa Fragrances', url: 'https://siwafragrances.com',
      logo: 'https://siwafragrances.com/logo.png',
      addressLocality: 'Nasr City', addressRegion: 'Cairo', addressCountry: 'EG',
      ratingValue: '4.98', reviewCount: '1212'
    },
    /* D-01 — aggregateRating on the products the homepage features.
       Verified zero occurrences across all 56 live product pages today;
       54 of 56 qualify. Highest return-on-effort action in the programme. */
    emitProductLd: true,
    productLdCount: 8
  },

  /* ============ ANALYTICS ============ */
  analytics: { enabled: true, sinks: ['dataLayer', 'console'] },

  /* ============ MOTION (epic-design) ============ */
  /* Depth model: 0 far background · 1 atmosphere · 2 mid · 3 hero object
     · 4 UI/text · 5 foreground. All motion is suppressed wholesale by the
     prefers-reduced-motion rule in tokens.css. */
  motion: {
    parallax: true,          // rAF-driven, transform-only
    parallaxStrength: 1,     // 0 disables without touching markup
    reveal: true,            // IntersectionObserver staged entrances
    heroFloat: true          // 9s float loop on the hero bottle
  }
};
