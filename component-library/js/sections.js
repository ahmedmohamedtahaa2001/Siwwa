/* ============================================================
   SIWA — SECTION VARIANTS
   20 page sections × 6 designs = 120 section compositions.

   Every variant is assembled from window.SIWA.ui — the 78-component
   library — and carries the feature codes from feature-doc/index.html.
   Nothing here forks a component; sections are arrangements, not new parts.

   Consumed by:
     component-library/sections.html  → browsed by section
     feature-docs/index.html          → the same variants, regrouped by feature
   ============================================================ */
(() => {
  'use strict';
  const S = window.SIWA;
  if (!S) { console.error('sections.js requires library.js'); return; }
  const U = S.ui, H = S.helpers;
  const L = () => S.locale;
  const ar = () => S.locale === 'ar';
  const T = (en, a) => (ar() ? a : en);
  const P = S.P;
  const p = h => H.byHandle(h);
  const imgs = H.withImg;
  const money = H.money, digits = H.digits, esc = H.esc, svg = H.svg, t = H.t;
  const IMG = window.SIWA_IMG_BASE || 'img/';

  /* ---------- small local compositions ---------- */
  const band = (inner, cls = '') => `<div class="band ${cls}"><div class="band__inner">${inner}</div></div>`;
  const head = (h, sub, cta) => `<div class="band__head"><div><h3>${h}</h3>${sub ? `<p>${sub}</p>` : ''}</div>${cta ? `<a class="lnk lnk--arrow" href="#">${cta}</a>` : ''}</div>`;
  const grid = (list, n = 4, o) => `<div class="pgrid" style="grid-template-columns:repeat(${n},1fr)">${list.map(x => U.ProductCard(x, o)).join('')}</div>`;
  const rail = (list, o) => `<div class="rail">${list.map(x => U.ProductCard(x, o)).join('')}</div>`;

  const top = n => P.slice(0, n);
  const orig = n => H.originals.slice(0, n);
  const insp = n => H.inspired.slice(0, n);
  const notes = n => H.withNotes.slice(0, n);
  const lay = n => H.layering.slice(0, n);

  /* ============================================================
     SECTION DEFINITIONS
     ============================================================ */
  const SECTIONS = [

    /* ---------------------------------------------------------- 1 */
    { id: 'announcement', name: 'Announcement bar', features: ['F-02'],
      note: 'The live bar reads "Explore your Persona · Free shipping orders over 1500" and links nowhere — the most-repeated line on the store, pointing at nothing.',
      variants: [
        { n: 'Static dark', doc: 'Baseline. Matches the live treatment. Safest when the message rarely changes.',
          html: () => `<div class="annbar">${T('Explore your Persona · Free shipping over LE 1,500', 'اكتشف شخصيتك · شحن مجاني فوق ١٥٠٠ ج.م')}</div>` },
        { n: 'With quiz CTA', doc: 'Turns the dead line into the quiz entry point. Cheapest fix on the site.',
          html: () => `<div class="annbar">${T('Explore your Persona', 'اكتشف شخصيتك')} <a class="lnk lnk--arrow" style="color:inherit" href="#">${T('Take the quiz', 'ابدأ الاختبار')}</a></div>` },
        { n: 'Rotating', doc: 'Three messages on a timer. Use when shipping, promo and trust all need airtime.',
          html: () => `<div class="annbar" style="gap:var(--sp-lg)"><span>${T('Free shipping over LE 1,500', 'شحن مجاني فوق ١٥٠٠ ج.م')}</span><span style="opacity:.4">·</span><span>${T('1,212 reviews · 4.98★', '١٬٢١٢ تقييم · ٤٫٩٨★')}</span><span style="opacity:.4">·</span><span>${T('Crafted in Egypt', 'صُنع في مصر')}</span></div>` },
        { n: 'Gold promo', doc: 'Time-boxed offers only. Gold must stay scarce or it stops meaning "act".',
          html: () => `<div class="annbar annbar--gold">${T('LE 50 off your first order — code SIWA50', 'خصم ٥٠ ج.م على أول طلب — كود SIWA50')}</div>` },
        { n: 'Dismissible', doc: 'Persist the dismissal or it becomes an irritant on every page view.',
          html: () => `<div class="annbar">${T('Delivery in 2–4 days across Egypt', 'التوصيل خلال ٢-٤ أيام')} <button aria-label="Dismiss">${svg('close')}</button></div>` },
        { n: 'Quiet + shipping meter', doc: 'Ties the bar to the 1,500 EGP threshold the store already runs but never merchandises.',
          html: () => `<div class="annbar annbar--quiet" style="flex-direction:column;gap:4px;padding-block:10px"><span>${T('LE 700 away from free shipping', '٧٠٠ ج.م تفصلك عن الشحن المجاني')}</span><span style="display:block;width:180px;height:3px;background:var(--hairline)"><i style="display:block;height:100%;width:53%;background:var(--primary)"></i></span></div>` }
      ] },

    /* ---------------------------------------------------------- 2 */
    { id: 'header', name: 'Header', features: ['A-03', 'A-04', 'E-01'],
      note: 'Amouage\'s dual track: commerce categories on one side, a separate House of Siwa story track on the other. The live nav is 10 flat tag-driven links with no dropdowns.',
      variants: [
        { n: 'Dual-track centred', doc: 'Default desktop. Commerce nav centre, story track and tools right.', flush: true,
          html: () => U.Header() },
        { n: 'Logo centred', doc: 'Fewer nav items, logo-forward branding. Splits nav left and right of the mark.', flush: true,
          html: () => `<header class="hdr"><div class="hdr__ann">${T('Explore your Persona', 'اكتشف شخصيتك')}</div><div class="hdr__bar"><nav class="hdr__nav" style="margin:0;flex:1">${['Shop all', 'Originals'].map(n => `<a href="#">${T(n, n === 'Shop all' ? 'تسوق الكل' : 'الأصلية')}</a>`).join('')}</nav><a class="hdr__mark" href="#"><span>SIWA</span><span class="ar">سيوة</span></a><nav class="hdr__nav" style="margin:0;flex:1;justify-content:flex-end">${['Bundles', 'House of Siwa'].map(n => `<a href="#">${n}</a>`).join('')}</nav></div></header>` },
        { n: 'With search open', doc: 'A-04 predictive search inline rather than behind an icon. Best when search is a primary route.', flush: true,
          html: () => `<header class="hdr"><div class="hdr__bar"><a class="hdr__mark" href="#"><span>SIWA</span></a><div style="flex:1;max-width:420px">${U.Search()}</div><div class="hdr__tools">${U.LanguageToggle()}<button class="iconbtn">${svg('bag')}</button></div></div></header>` },
        { n: 'Compact sticky', doc: 'Post-scroll state. Drops the announcement and shrinks to 52px.', flush: true,
          html: () => `<header class="hdr"><div class="hdr__bar" style="height:52px"><a class="hdr__mark" href="#" style="font-size:18px"><span>SIWA</span></a><nav class="hdr__nav">${(ar() ? ['تسوق', 'الواحة'] : ['Shop', 'The Oasis']).map(n => `<a href="#">${n}</a>`).join('')}</nav><div class="hdr__tools"><button class="iconbtn">${svg('search')}</button><button class="iconbtn cartdot">${svg('bag')}<span data-cartcount style="display:none">0</span></button></div></div></header>` },
        { n: 'Mobile', doc: 'Below 900px. Burger left, mark centre, cart right; nav moves to the drawer.', flush: true,
          html: () => `<div style="max-width:400px;margin-inline:auto"><header class="hdr"><div class="hdr__ann" style="font-size:10px">${T('Free shipping over LE 1,500', 'شحن مجاني فوق ١٥٠٠')}</div><div class="hdr__bar" style="padding-inline:12px;gap:8px"><button class="iconbtn" style="display:grid">${svg('burger')}</button><a class="hdr__mark" href="#" style="margin-inline:auto;font-size:18px"><span>SIWA</span></a><button class="iconbtn">${svg('search')}</button><button class="iconbtn">${svg('bag')}</button></div></header></div>` },
        { n: 'Story-track emphasis', doc: 'Fueguia weighting — the four pillars sit at the same level as commerce.', flush: true,
          html: () => `<header class="hdr"><div class="hdr__bar" style="height:auto;flex-direction:column;align-items:stretch;padding-block:var(--sp-sm);gap:var(--sp-xs)"><div class="row" style="justify-content:space-between"><a class="hdr__mark" href="#"><span>SIWA</span><span class="ar">سيوة</span></a><div class="hdr__tools">${U.LanguageToggle()}<button class="iconbtn">${svg('bag')}</button></div></div><nav class="hdr__nav" style="margin:0;justify-content:flex-start;gap:var(--sp-md);border-top:1px solid var(--hairline);padding-top:var(--sp-xs)">${(ar() ? ['الواحة', 'المكونات', 'الحرفة', 'الدار'] : ['The Oasis', 'The Ingredients', 'The Craft', 'The House']).map(n => `<a href="#">${n}</a>`).join('')}</nav></div></header>` }
      ] },

    /* ---------------------------------------------------------- 3 */
    { id: 'hero', name: 'Hero', features: ['E-01', 'A-02'],
      note: 'Real campaign photography from the brand\'s own Instagram — the asset set the live site never uses. Bilingual product lockup matches the bottle.',
      variants: [
        { n: 'Product split', doc: 'Homepage default. Image one side, bilingual name + rating + price + dual CTA the other.', flush: true,
          html: () => U.HeroSection() },
        { n: 'Full-bleed collection', doc: 'Collection landing. Narrative name over a landscape, single CTA.', flush: true,
          html: () => `<section class="hero" style="min-height:380px"><div class="hero__media"><img src="${IMG}${imgs[2].img}" alt=""></div><div class="hero__scrim" style="background:rgba(33,32,18,.5)"></div><div class="hero__body" style="max-width:none;text-align:center;justify-items:center;margin-inline:auto"><span class="stamp" style="color:var(--on-dark);border-color:rgba(212,207,194,.5)">${T('The Oasis Collection', 'مجموعة الواحة')}</span><h2 class="hero__ttl">${T('Salt, palm and still water', 'ملح ونخيل وماء ساكن')}</h2><a class="btn btn--lg" href="#">${T('Explore the collection', 'استكشف المجموعة')}</a></div></section>` },
        { n: 'Quiz-first', doc: 'Makes "Explore your Persona" the hero rather than a dead announcement line.', flush: true,
          html: () => `<section class="hero" style="min-height:320px;background:var(--surface-card)"><div class="hero__body" style="max-width:none;text-align:center;justify-items:center;margin-inline:auto;color:var(--ink)"><p class="h-eyebrow">${T('Three questions', 'ثلاثة أسئلة')}</p><h2 class="hero__ttl" style="color:var(--heading)">${T('Explore your Persona', 'اكتشف شخصيتك')}</h2><p class="t-muted" style="max-width:46ch">${T('Find the scent that speaks to who you are — and the one that layers with it.', 'اعثر على العطر الذي يشبهك — والعطر الذي يُمزج معه.')}</p><div class="row" style="justify-content:center"><a class="btn btn--lg" href="#">${T('Take the quiz', 'ابدأ الاختبار')}</a><a class="btn btn--lg btn--secondary" href="#">${t('shopAll')}</a></div></div></section>` },
        { n: 'With review carousel', doc: 'New-product launch. Social proof sits inside the hero instead of below it.', flush: true,
          html: () => `<section class="hero" style="min-height:auto;background:var(--surface-card)"><div class="split" style="padding:var(--sp-xl) var(--sp-lg);gap:var(--sp-xl)"><div>${U.ProductImage(p('pink-allure'), { zoom: false, badges: false })}</div><div class="col" style="gap:var(--sp-md)"><p class="h-eyebrow">${T('New arrival', 'وصل حديثاً')}</p><h2 style="font:400 42px/1.1 var(--font-display);color:var(--heading)">Pink Allure</h2>${U.Stars(5, { showCount: true, count: 14 })}${U.Price(p('pink-allure'))}<div class="row"><button class="btn btn--lg atc" data-atc="pink-allure">${t('add')}</button></div><div style="margin-top:var(--sp-xs)">${U.Quote(p('layering-vanilla').quotes[1] || p('layering-vanilla').quotes[0])}</div></div></div></section>` },
        { n: 'Editorial minimal', doc: 'Le Labo / Amouage register. Type-only, no product, maximum restraint.', flush: true,
          html: () => `<section class="hero" style="min-height:300px;background:var(--canvas)"><div class="hero__body" style="max-width:none;text-align:center;justify-items:center;margin-inline:auto;color:var(--ink)"><h2 class="hero__ttl" style="color:var(--heading);font-size:48px">${T('A riddle in the sands', 'لغز في الرمال')}</h2><div class="hr--sunburst" style="width:180px"></div><p class="t-muted" style="max-width:44ch">${T('An Egyptian maison, named for the oasis it comes from.', 'دار مصرية، سُمّيت على الواحة التي جاءت منها.')}</p></div></section>` },
        { n: 'Vintage specimen', doc: 'Heritage moments. Paper grain, corner vignette, provenance stamp (E-04).', flush: true,
          html: () => `<div class="band band--tint"><div class="band__inner"><div class="vintage-surface" style="text-align:center"><span class="edge-wear"></span><span class="stamp">${T('Distilled in Siwa · Batch 0114', 'قُطِّر في سيوة · دفعة ٠١١٤')}</span><h2 style="font:400 40px/1.15 var(--font-display);color:var(--heading);margin:var(--sp-md) 0 var(--sp-xs)">${T('Where the desert meets the sea', 'حيث تلتقي الصحراء بالبحر')}</h2><p class="t-muted" style="max-width:48ch;margin-inline:auto">${T('Mawj — our Siwan original.', 'موج — إبداعنا السيوي.')}</p><div class="row" style="justify-content:center;margin-top:var(--sp-md)"><a class="btn" href="#">${T('Discover Mawj', 'اكتشف موج')}</a></div></div></div></div>` }
      ] },

    /* ---------------------------------------------------------- 4 */
    { id: 'usp', name: 'USP bar', features: ['E-05', 'D-03'],
      note: 'Replaces the live "Exquisite Ingredients / Inclusive Pricing / Personalized Service" — three adjectives with no evidence — with four verifiable claims.',
      variants: [
        { n: 'Four-up', doc: 'Default, directly under the hero.', html: () => band(U.USP(), 'band--tint') },
        { n: 'Two-by-two', doc: 'Tablet and narrow desktop.', html: () => band(U.USP({ two: true }), 'band--tint') },
        { n: 'Stacked row', doc: 'Mobile, or as a PDP sidebar rail.', html: () => band(U.USP({ row: true })) },
        { n: 'With links', doc: 'Authenticity guarantee should reach a Spot-a-fake page (Lattafa pattern).', html: () => band(U.USP({ links: true }), 'band--tint') },
        { n: 'Trust badge row', doc: 'Compact alternative near the buy box rather than a full band.',
          html: () => band(`<div class="row" style="justify-content:center">${U.Trust(T('1,212 verified reviews', '١٬٢١٢ تقييم موثق'), { icon: 'star' })}${U.Trust(T('Crafted in Egypt', 'صُنع في مصر'), { icon: 'leaf' })}${U.Trust(T('Free over LE 1,500', 'مجاني فوق ١٥٠٠'), { icon: 'bag' })}${U.Trust(T('14-day returns', 'إرجاع ١٤ يوم'))}</div>`) },
        { n: 'On dark', doc: 'Between two light bands, or above the footer.',
          html: () => `<div class="band band--dark"><div class="band__inner"><div class="row" style="justify-content:space-around">${[[T('Crafted in Egypt', 'صُنع في مصر'), 'leaf'], [T('1,212 reviews · 4.98★', '١٬٢١٢ تقييم · ٤٫٩٨★'), 'star'], [T('Free over LE 1,500', 'شحن مجاني فوق ١٥٠٠'), 'bag'], [T('Authenticity guarantee', 'ضمان الأصالة'), 'check']].map(([l, i]) => `<span class="row" style="gap:8px;color:var(--on-dark)"><span style="color:var(--primary);width:20px;display:inline-block">${svg(i)}</span><b style="font:500 var(--t-body-sm)/1 var(--font-ui)">${l}</b></span>`).join('')}</div></div></div>` }
      ] },

    /* ---------------------------------------------------------- 5 */
    { id: 'reviews-loud', name: 'Reviews, loud', features: ['D-02', 'D-01'],
      note: 'Siwa\'s single strongest asset — 1,212 reviews at 4.98★. Amouage hides social proof; at a ~$19 median Siwa cannot afford to.',
      variants: [
        { n: 'Headline number', doc: 'Maximum impact. The number is the section.',
          html: () => band(`<div style="text-align:center"><p class="h-eyebrow">${T('Loved by', 'محبوب من')}</p><div style="font:400 88px/1 var(--font-display);color:var(--heading)">${digits('4.98')}</div>${U.Stars(4.98, { size: 'stars--lg' })}<p class="t-muted" style="margin-top:var(--sp-xs)">${T('across 1,212 verified reviews', 'عبر ١٬٢١٢ تقييماً موثقاً')}</p></div>`, 'band--tint') },
        { n: 'With distribution', doc: 'PDP. The histogram is honest about the 5★ skew rather than hiding it.',
          html: () => band(`<div style="max-width:520px;margin-inline:auto">${U.ReviewSummary(p('layering-vanilla'))}</div>`) },
        { n: 'Quote band', doc: 'Homepage. Three real reviews carry more weight than one aggregate.',
          html: () => band(`${head(T('What customers say', 'ماذا يقول العملاء'), '', T('Read all', 'اقرأ الكل'))}<div class="pgrid" style="grid-template-columns:repeat(3,1fr)">${p('layering-vanilla').quotes.slice(0, 3).map(q => U.Quote(q)).join('')}</div>`, 'band--tint') },
        { n: 'Split with product', doc: 'Ties the rating to a specific bottle instead of the shop average.',
          html: () => band(`<div class="split"><div>${U.ProductImage(p('mawj'), { zoom: false })}</div><div class="col" style="gap:var(--sp-md)"><h3 style="font:400 32px/1.2 var(--font-display);color:var(--heading)">${T('Mawj — 68 reviews, 4.99★', 'موج — ٦٨ تقييماً، ٤٫٩٩★')}</h3>${U.ReviewCard(p('layering-vanilla').quotes[0], { helpful: 23 })}<a class="lnk lnk--arrow" href="#">${T('Read all reviews', 'اقرأ كل التقييمات')}</a></div></div>`) },
        { n: 'Dark testimonial', doc: 'Breaks up a long light page; the star colour reads strongly on ink.',
          html: () => `<div class="band band--dark"><div class="band__inner" style="text-align:center">${U.Stars(5, { size: 'stars--lg' })}<p style="font:400 26px/1.5 var(--font-display);color:var(--on-dark);max-width:44ch;margin:var(--sp-md) auto">${esc(p('layering-vanilla').quotes[3] ? p('layering-vanilla').quotes[3].b : 'One of my best perfumes')}</p><p class="t-muted">${T('Verified purchase', 'شراء موثق')}</p></div></div>` },
        { n: 'Inline strip', doc: 'Lowest-commitment placement — a single rule under the hero.',
          html: () => `<div class="band" style="padding-block:var(--sp-md);border-block:1px solid var(--hairline)"><div class="band__inner"><div class="row" style="justify-content:center">${U.Stars(4.98)}<b style="font:500 var(--t-body)/1 var(--font-ui)">${digits('4.98')}</b><span class="t-muted">${T('· 1,212 reviews · 97% recommend', '· ١٬٢١٢ تقييم · يوصي ٩٧٪')}</span></div></div></div>` }
      ] },

    /* ---------------------------------------------------------- 6 */
    { id: 'finder', name: 'Scent finder', features: ['A-02'],
      note: 'Skylar architecture — returns a fragrance AND a layering partner, both addable at the bundle price. Okhtein archetypes supply the persona names.',
      variants: [
        { n: 'Inline three-step', doc: 'Homepage. Question one is visible, no click needed to start.',
          html: () => band(`<div class="split"><div class="col"><p class="h-eyebrow">${T('Three questions', 'ثلاثة أسئلة')}</p><h3 style="font:400 34px/1.15 var(--font-display);color:var(--heading)">${T('Explore your Persona', 'اكتشف شخصيتك')}</h3><p class="t-muted">${T('The store already says this on every page. Here it finally does something.', 'يقول المتجر هذا في كل صفحة. هنا يفعل شيئاً أخيراً.')}</p></div><div>${U.ScentQuiz()}</div></div>`, 'band--tint') },
        { n: 'Persona cards', doc: 'Leads with the five archetypes — identity first, scent second.',
          html: () => band(`${head(T('Which are you?', 'أيّها أنت؟'), T('Goddess · Poet · Muse · Heir · Nomad', 'الإلهة · الشاعر · الملهمة · الوريث · الرحّالة'))}${U.PersonaCards({ sel: 4 })}`) },
        { n: 'Full-width stepper', doc: 'Dedicated quiz page. One question per screen, auto-advance.',
          html: () => band(`<div style="max-width:640px;margin-inline:auto">${U.ScentQuiz()}</div>`, 'band--center') },
        { n: 'Result preview', doc: 'Post-quiz. Persona + the pair, one action to add both.',
          html: () => band(U.QuizResults(), 'band--tint') },
        { n: 'Compact CTA', doc: 'Anywhere the full quiz is too heavy — PDP sidebar, collection top.',
          html: () => band(`<div class="vintage-surface" style="max-width:520px;margin-inline:auto;text-align:center"><span class="edge-wear"></span><p class="h-eyebrow">${T('Not sure?', 'غير متأكد؟')}</p><h4 style="font:400 26px/1.2 var(--font-display);color:var(--heading);margin:6px 0 var(--sp-sm)">${T('Let the quiz choose', 'دع الاختبار يختار')}</h4><a class="btn" href="#">${T('Take the quiz', 'ابدأ الاختبار')}</a></div>`) },
        { n: 'Mood chips shortcut', doc: 'Skips the quiz for decided customers — one tap into a filtered grid.',
          html: () => band(`${head(T('Or start from a mood', 'أو ابدأ من الحالة'), '')}<div class="row">${(ar() ? ['هادئ', 'واثق', 'حر', 'رومانسي', 'دافئ'] : ['Calm', 'Confident', 'Free', 'Romantic', 'Warm']).map(m => U.Chip(m)).join('')}</div>`) }
      ] },

    /* ---------------------------------------------------------- 7 */
    { id: 'mood', name: 'Shop by mood / facets', features: ['A-01'],
      note: '17 products have an empty tags array and 21 carry no gender tag — around 35% of the catalogue is unreachable by browsing today.',
      variants: [
        { n: 'Sidebar + grid', doc: 'Desktop collection page. Eight axes, live counts, sticky CTA.',
          html: () => band(`<div class="split split--narrow" style="align-items:start">${U.FilterBar()}<div>${grid(top(3), 3)}</div></div>`) },
        { n: 'Horizontal chips', doc: 'Above the grid where vertical space is scarce.',
          html: () => band(`<div class="col">${U.FilterBar().split('</div>').slice(0, 3).join('</div>') + '</div>'}${grid(top(4), 4)}</div>`) },
        { n: 'Designer facet', doc: 'The differentiated axis — converts "something like Baccarat Rouge" into a browse route.',
          html: () => band(`${head(T('Shop by the house it is inspired by', 'تسوق حسب الدار المستوحاة'), T('The facet no mainstream perfumery can offer.', 'الفلتر الذي لا يملكه أي متجر تقليدي.'))}<div class="row">${[['Kayali', 5], ['Parfums de Marly', 3], ['Louis Vuitton', 4], ['Chanel', 2], ['Giorgio Armani', 2]].map(([h, n]) => U.Chip(h, { n })).join('')}</div>`, 'band--tint') },
        { n: 'Visual mood tiles', doc: 'Editorial entry into facets — image tiles rather than checkboxes.',
          html: () => band(`${head(T('Shop by mood', 'تسوق حسب الحالة'))}${U.CollectionGrid()}`) },
        { n: 'Mobile drawer', doc: 'Below 768px. Batches selections behind an Apply button.',
          html: () => band(`<div style="max-width:340px;margin-inline:auto;border:1px solid var(--hairline)"><div class="drawer__head"><h2 class="drawer__title">${T('Filters', 'الفلاتر')}</h2><button class="iconbtn">${svg('close')}</button></div><div style="padding:var(--sp-md);display:grid;gap:var(--sp-xs)">${U.Check('Vanilla', { on: true, n: 14 })}${U.Check('Woody', { n: 9 })}${U.Check('Fresh', { n: 5 })}</div><div class="drawer__foot"><button class="btn btn--block">${T('View 14 products', 'عرض ١٤ منتجاً')}</button></div></div>`) },
        { n: 'Applied state', doc: 'Active filters as dismissible chips with a live count and clear-all.',
          html: () => band(`<div class="col"><div class="row">${U.Chip('Vanilla', { on: true, x: true })}${U.Chip('Kayali', { on: true, x: true })}<button class="btn btn--tertiary btn--sm">${T('Clear all', 'مسح الكل')}</button><span class="t-muted" style="margin-inline-start:auto;font-size:var(--t-body-sm)">${T('5 products', '٥ منتجات')}</span></div>${grid(lay(3), 3)}</div>`) }
      ] },

    /* ---------------------------------------------------------- 8 */
    { id: 'originals', name: 'Original Creations', features: ['E-03', 'B-02', 'E-04'],
      note: 'The 16 Siwa originals are where the lore honestly belongs (DIRECTION.md). Mawj is the proof: Arabic name, Arabic label, #2 by review volume.',
      variants: [
        { n: 'Grid with Siwan mark', doc: 'Default. Authenticity badge uses the Cultural Accent set, ~2 SKUs only.',
          html: () => band(`${head(T('Original Creations', 'إبداعات سيوة'), T('Sixteen scents that are ours alone.', 'ستة عشر عطراً لنا وحدنا.'), t('shopAll'))}${grid(orig(4), 4)}`) },
        { n: 'Editorial split', doc: 'One hero original with its story and notes beside it.',
          html: () => band(`<div class="split"><div>${U.ProductImage(p('mawj'), { zoom: false })}</div><div class="col" style="gap:var(--sp-md)"><span class="stamp">${T('Distilled in Siwa', 'قُطِّر في سيوة')}</span><div class="h-bilingual"><h3 style="font:400 38px/1.1 var(--font-display);color:var(--heading)">Mawj</h3><span class="ar" style="font-size:26px;font-family:var(--font-ar-display);color:var(--heading)" lang="ar" dir="rtl">موج</span></div>${U.Stars(4.99, { showCount: true, count: 68 })}<p class="t-muted">${T('Not all waves are meant to be chased. Some are meant to be worn.', 'ليست كل الأمواج تُطارَد. بعضها يُرتدى.')}</p>${U.Price(p('mawj'))}<div class="row"><button class="btn atc" data-atc="mawj">${t('add')}</button></div></div></div>`, 'band--tint') },
        { n: 'With note pyramid', doc: 'B-02 — the notes diagram Siwa already drew on Instagram, as a component.',
          html: () => band(`<div class="split"><div>${U.ProductImage(p('pink-allure'), { zoom: false })}</div><div>${U.NotePyramid(notes(1)[0])}</div></div>`) },
        { n: 'Provenance vintage', doc: 'E-03/E-04 — Kahina attribution model on a specimen surface.',
          html: () => band(`<div class="vintage-surface"><span class="edge-wear"></span><div class="split" style="gap:var(--sp-lg)"><div class="col"><p class="h-eyebrow">${T('The Craft', 'الحرفة')}</p><h3 style="font:400 30px/1.2 var(--font-display);color:var(--heading)">${T('Made by named hands', 'صُنع بأيادٍ معروفة')}</h3><p class="t-muted">${T('Kershef — clay and salt from the lakes. The sunburst motif is embroidered by a named Siwan cooperative, credited on the label.', 'الكرشيف — طين وملح من البحيرات. زخرفة الشمس مطرّزة بيد تعاونية سيوية، مذكورة على الملصق.')}</p><span class="stamp">${T('Cooperative attribution pending sign-off', 'الإسناد قيد الاعتماد')}</span></div><div>${U.ProductImage(p('coco-woods'), { zoom: false, badges: false })}</div></div></div>`) },
        { n: 'Bilingual rail', doc: 'Arabic name under every Latin name, at matching weight — never a footnote.',
          html: () => band(`${head(T('Original Creations', 'إبداعات سيوة'))}${rail(orig(6))}`) },
        { n: 'Single feature', doc: 'Launch moment for one original. Everything else removed.',
          html: () => band(`<div style="max-width:420px;margin-inline:auto;text-align:center"><div style="max-width:260px;margin-inline:auto">${U.ProductImage(p('pink-allure'), { zoom: false })}</div><h3 style="font:400 32px/1.2 var(--font-display);color:var(--heading);margin-top:var(--sp-md)">Pink Allure</h3><p class="t-muted">${T('A 2026 flagship — and currently unreachable, because its tags array is empty.', 'إصدار ٢٠٢٦ — وغير قابل للوصول حالياً لأن وسومه فارغة.')}</p><div class="row" style="justify-content:center;margin-top:var(--sp-sm)">${U.Price(p('pink-allure'))}<button class="btn atc" data-atc="pink-allure">${t('add')}</button></div></div>`, 'band--center') }
      ] },

    /* ---------------------------------------------------------- 9 */
    { id: 'inspired', name: 'Inspired By', features: ['B-04'],
      note: 'Oakcha price-contrast, scoped to the 40 inspired-by SKUs. Never renders on the 16 originals. Retail figures are placeholders pending sourcing, and the block ships without them if legal says so.',
      variants: [
        { n: 'Grid with contrast', doc: 'Collection page. Contrast line under each card price.',
          html: () => band(`${head(T('Inspired By', 'مستوحى من'), T('Forty interpretations, priced honestly against the originals.', 'أربعون تفسيراً، بأسعار صادقة مقابل الأصل.'))}${grid(insp(4), 4)}`) },
        { n: 'Price-hero PDP block', doc: 'B-04 full treatment — house, fragrance, original retail, saving.',
          html: () => band(`<div style="max-width:560px;margin-inline:auto">${U.InspiredByBlock(p('layering-vanilla'))}</div>`) },
        { n: 'Legal-safe', doc: 'Disclaimer-first, no retail figure. Ships today without legal review.',
          html: () => band(`<div class="inspired" style="max-width:560px;margin-inline:auto"><span class="inspired__label">${t('inspiredBy')}</span><span class="inspired__house">Kayali — Vanilla 28</span><span class="inspired__note">${T('An independent Siwa interpretation. Not the original, and not affiliated with the house named.', 'تفسير مستقل من سيوة. ليس الأصل، وغير تابع للدار المذكورة.')}</span></div>`, 'band--tint') },
        { n: 'By house', doc: 'Groups the 40 under their designer houses — the browse tree the vendor field accidentally created.',
          html: () => band(`${head(T('Browse by house', 'تصفح حسب الدار'))}<div class="col">${[['Kayali', 5], ['Parfums de Marly', 3], ['Louis Vuitton', 4]].map(([h, n]) => `<div class="row" style="justify-content:space-between;padding:var(--sp-sm) 0;border-bottom:1px solid var(--hairline)"><b style="font:500 var(--t-body)/1 var(--font-ui);color:var(--heading)">${h}</b><span class="t-muted">${digits(n)} ${T('scents', 'عطور')}</span><a class="lnk lnk--arrow" href="#">${T('View', 'عرض')}</a></div>`).join('')}</div>`) },
        { n: 'Comparison', doc: 'Side-by-side attributes with a best-value callout.',
          html: () => band(U.ComparisonTable({ cols: 3 })) },
        { n: 'Educational', doc: 'Explains what "inspired by" means before merchandising it — reduces refund risk.',
          html: () => band(`<div class="split"><div class="col"><p class="h-eyebrow">${T('What this means', 'ماذا يعني هذا')}</p><h3 style="font:400 30px/1.2 var(--font-display);color:var(--heading)">${T('Our interpretation, not a counterfeit', 'تفسيرنا، وليس تقليداً')}</h3><p class="t-muted">${T('We name the scent we interpreted, state the original price, and never use the other house\'s bottle, logo or packaging.', 'نذكر العطر الذي فسّرناه، ونعلن سعر الأصل، ولا نستخدم زجاجة أو شعار الدار الأخرى أبداً.')}</p></div><div>${U.InspiredByBlock(p('lady-killer'))}</div></div>`, 'band--tint') }
      ] },

    /* ---------------------------------------------------------- 10 */
    { id: 'set', name: 'Build your set', features: ['C-01', 'C-02'],
      note: 'Siwa\'s entry size is a 30 ml with no trial tier. Every Tier 1 comparable has a build-your-own discovery set; Snif sells 3 × 10 ml for $68.',
      variants: [
        { n: 'Slot builder', doc: 'Default. Three slots fill as products are picked; CTA unlocks at three.',
          html: () => band(U.BundleBuilder()) },
        { n: 'Layering pair', doc: 'C-02 — cross-sell on the #1 product, which ships with no guidance today.',
          html: () => band(U.LayeringSuggestions(), 'band--tint') },
        { n: 'Ladder', doc: 'Snif\'s commitment ladder: sample set → BYO trio → full bottle + candle.',
          html: () => band(`${head(T('Start anywhere', 'ابدأ من أي مكان'))}<div class="pgrid" style="grid-template-columns:repeat(3,1fr)">${[[T('Sample set', 'مجموعة عينات'), T('4 × 2 ml', '٤ × ٢ مل'), 240], [T('Discovery trio', 'ثلاثي الاكتشاف'), T('3 × 10 ml', '٣ × ١٠ مل'), 399], [T('Full + layer', 'كامل + طبقة'), T('50 ml + 10 ml', '٥٠ مل + ١٠ مل'), 1150]].map(([n, s, pr]) => `<div class="pcard" style="text-align:center"><h4 style="font:400 22px/1.2 var(--font-display);color:var(--heading)">${n}</h4><p class="pcard__sub">${s}</p><div class="price" style="justify-content:center">${money(pr)}</div><button class="btn btn--sm">${T('Choose', 'اختر')}</button></div>`).join('')}</div>`) },
        { n: 'Quiz-seeded', doc: 'Pre-fills the set from quiz answers; the customer swaps rather than starts blank.',
          html: () => band(`<div class="col"><p class="lbl">${T('Based on your Persona — The Nomad', 'بناءً على شخصيتك — الرحّالة')}</p>${grid(lay(3), 3)}<div class="row"><button class="btn btn--lg">${T('Add all three — LE 399', 'أضف الثلاثة — ٣٩٩ ج.م')}</button></div></div>`, 'band--tint') },
        { n: 'Gift framing', doc: 'Same mechanic sold as a gift, with C-04 messaging attached.',
          html: () => band(`<div class="split"><div class="col"><p class="h-eyebrow">${T('Gifting', 'الهدايا')}</p><h3 style="font:400 30px/1.2 var(--font-display);color:var(--heading)">${T('Three scents, one box', 'ثلاثة عطور، صندوق واحد')}</h3><p class="t-muted">${T('Free printed card. No prices in the box.', 'بطاقة مطبوعة مجاناً. بدون أسعار في الصندوق.')}</p><div class="row"><button class="btn">${T('Build a gift set', 'ابنِ صندوق هدية')}</button></div></div><div>${U.GiftCard({ to: T('Salma', 'سلمى'), from: T('Rana', 'رنا'), msg: T('Happy birthday — I picked these for you.', 'كل سنة وأنتِ طيبة — اخترتُ لكِ هذه.') })}</div></div>`) },
        { n: 'Compact strip', doc: 'Cart drawer or PDP footer — one line, one CTA.',
          html: () => band(`<div class="callout" style="display:flex;align-items:center;gap:var(--sp-md);flex-wrap:wrap"><b>${T('Try three for LE 399', 'جرّب ثلاثة بـ ٣٩٩ ج.م')}</b><span class="t-muted">${T('10 ml each · pick any', '١٠ مل لكل · اختر ما تشاء')}</span><button class="btn btn--sm" style="margin-inline-start:auto">${T('Build set', 'ابنِ المجموعة')}</button></div>`) }
      ] },

    /* ---------------------------------------------------------- 11 */
    { id: 'house', name: 'House of Siwa', features: ['E-02', 'E-04', 'E-03'],
      note: 'Fueguia four-pillar naming inside Amouage dual-track structure. The live /pages/our-story is an orphan — linked from nothing.',
      variants: [
        { n: 'Four pillars', doc: 'Default. The Oasis · The Ingredients · The Craft · The House.',
          html: () => band(`${head(T('House of Siwa', 'بيت سيوة'), T('Four ways in.', 'أربعة مداخل.'))}<div class="pgrid" style="grid-template-columns:repeat(4,1fr)">${(ar() ? [['الواحة', 'من أين نأتي'], ['المكونات', 'ماذا بداخلها'], ['الحرفة', 'كيف تُصنع'], ['الدار', 'من نحن']] : [['The Oasis', 'Where we come from'], ['The Ingredients', 'What is inside'], ['The Craft', 'How it is made'], ['The House', 'Who we are']]).map(([n, s]) => `<a class="pcard" href="#" style="text-decoration:none;text-align:center"><h4 style="font:400 24px/1.2 var(--font-display);color:var(--heading)">${n}</h4><p class="pcard__sub">${s}</p></a>`).join('')}`) },
        { n: 'Image with text', doc: 'One pillar expanded — kershef and Shali as the material story.',
          html: () => band(U.ImageWithText(), 'band--tint') },
        { n: 'Vintage specimen', doc: 'E-04 — paper grain, vignette, edge-wear, provenance stamp.',
          html: () => band(`<div class="vintage-surface" style="max-width:720px;margin-inline:auto"><span class="edge-wear"></span><p class="h-eyebrow">${T('The Oasis', 'الواحة')}</p><p style="font:400 30px/1.35 var(--font-display);color:var(--heading);margin:var(--sp-sm) 0">${T('Siwans build in kershef — clay and salt quarried from the lakes. The same material Shali Fortress is built from.', 'يبني أهل سيوة بالكرشيف — طين وملح من البحيرات. المادة نفسها التي بُنيت منها قلعة شالي.')}</p><span class="stamp">${T('Aghurmi · Shali · Bir Wahed', 'أغورمي · شالي · بئر واحد')}</span></div>`) },
        { n: 'Timeline', doc: 'Origin as verifiable fact (Amouage): a date, a place, a person.',
          html: () => band(`${head(T('The House', 'الدار'))}<div class="col">${[[T('The oasis', 'الواحة'), T('Amazigh, Siwi-speaking, 560 km from Cairo.', 'أمازيغية، تتحدث السيوية، على بعد ٥٦٠ كم من القاهرة.')], [T('The maison', 'الدار'), T('Founded in Cairo. Retail point: Nasr City.', 'تأسست في القاهرة. نقطة البيع: مدينة نصر.')], [T('The promise', 'الوعد'), T('Named artisans, quantified commitments.', 'حرفيون بالاسم، والتزامات محددة.')]].map(([h, s], i) => `<div class="row" style="gap:var(--sp-md);align-items:flex-start;padding:var(--sp-sm) 0;border-bottom:1px solid var(--hairline)"><span class="stamp">${digits('0' + (i + 1))}</span><div><b style="display:block;font:500 var(--t-body)/1.3 var(--font-ui);color:var(--heading)">${h}</b><span class="t-muted" style="font-size:var(--t-body-sm)">${s}</span></div></div>`).join('')}</div>`) },
        { n: 'Attribution block', doc: 'Kahina model — named cooperative, quantified commitment, not adjectives.',
          html: () => band(`<div class="split"><div>${U.ProductImage(p('coco-woods'), { zoom: false, badges: false })}</div><div class="col"><p class="h-eyebrow">${T('Attribution', 'الإسناد')}</p><h3 style="font:400 28px/1.2 var(--font-display);color:var(--heading)">${T('The women who make the motif', 'النساء اللواتي يصنعن الزخرفة')}</h3><p class="t-muted">${T('Kahina states 1% of yearly revenue, names its partners, and prints the women\'s signatures on the packaging. Siwa\'s equivalent is a named cooperative and a stated figure — both still to be decided.', 'تعلن كاهينا عن ١٪ من إيراداتها السنوية، وتسمّي شركاءها، وتطبع تواقيع النساء على العبوة. ما يعادلها لسيوة: تعاونية بالاسم ورقم معلن — وكلاهما لم يُقرّر بعد.')}</p><span class="status status--blocked">${T('Blocked — commitment not yet decided', 'معلّق — لم يُحدد الالتزام')}</span></div></div>`, 'band--tint') },
        { n: 'Sunburst divider', doc: 'The only Cultural Accent motif in the system. Heritage surfaces only.',
          html: () => band(`<div style="text-align:center"><div class="hr--sunburst" style="width:220px;margin-inline:auto"></div><p style="font:400 26px/1.4 var(--font-display);color:var(--heading);max-width:40ch;margin:var(--sp-md) auto">${T('Five colours, inherited: palm green, date red, date yellow, desert brown, black.', 'خمسة ألوان موروثة: أخضر النخيل، أحمر البلح، أصفر البلح، بني الصحراء، والأسود.')}</p><div class="row" style="justify-content:center">${['#4f5734', '#8f3a2e', '#977f3a', '#865431', '#212012'].map(c => `<span style="width:40px;height:40px;background:${c};display:inline-block"></span>`).join('')}</div></div>`) }
      ] },

    /* ---------------------------------------------------------- 12 */
    { id: 'bestsellers', name: 'Best sellers rail', features: ['F-03'],
      note: 'Ranked by real review count — Layering Vanilla 98, Mawj 68, Boujee Blush 59.',
      variants: [
        { n: 'Four-up grid', doc: 'Default homepage placement.', html: () => band(`${head(T('Best sellers', 'الأكثر مبيعاً'), '', t('shopAll'))}${grid(top(4), 4)}`) },
        { n: 'Scroll rail', doc: 'More products in the same vertical space; better on mobile.', html: () => band(`${head(T('Best sellers', 'الأكثر مبيعاً'))}${rail(top(6))}`) },
        { n: 'Ranked list', doc: 'Makes the ranking explicit — the review count is the argument.',
          html: () => band(`${head(T('Ranked by our customers', 'مرتّب حسب عملائنا'))}<div class="col">${top(5).map((x, i) => `<div class="row" style="gap:var(--sp-md);align-items:center;padding:var(--sp-sm) 0;border-bottom:1px solid var(--hairline)"><span style="font:400 28px/1 var(--font-display);color:var(--hairline);min-width:36px">${digits(i + 1)}</span><div style="width:52px">${U.ProductImage(x, { zoom: false, badges: false })}</div><div style="flex:1"><b style="display:block;font:500 var(--t-body)/1.3 var(--font-ui);color:var(--heading)">${esc(x.title)}</b>${U.Stars(x.rating, { showCount: true, count: x.reviews })}</div>${U.Price(x)}<button class="btn btn--sm atc" data-atc="${x.handle}">${t('add')}</button></div>`).join('')}</div>`) },
        { n: 'Split feature', doc: 'One hero bestseller plus a small rail of the rest.',
          html: () => band(`<div class="split"><div>${U.ProductImage(p('layering-vanilla'), { zoom: false })}</div><div class="col"><p class="h-eyebrow">${T('#1 by reviews', 'الأول حسب التقييمات')}</p><h3 style="font:400 32px/1.2 var(--font-display);color:var(--heading)">Layering Vanilla</h3>${U.Stars(5, { showCount: true, count: 98 })}<p class="t-muted">${T('And it ships with no layering guidance at all.', 'ويُباع بلا أي إرشادات للمزج.')}</p>${U.Price(p('layering-vanilla'))}<button class="btn atc" data-atc="layering-vanilla">${t('add')}</button></div></div>`, 'band--tint') },
        { n: 'By gender', doc: 'Mirrors the live homepage, which splits men\'s and women\'s bestsellers.',
          html: () => band(`<div class="col" style="gap:var(--sp-xl)"><div>${head(T('For him', 'له'))}${grid(top(3), 3)}</div><div>${head(T('For her', 'لها'))}${grid(P.slice(3, 6), 3)}</div></div>`) },
        { n: 'Loading', doc: 'Skeletons reserve the layout and prevent shift on slow connections.',
          html: () => band(`${head(T('Best sellers', 'الأكثر مبيعاً'))}<div class="pgrid" style="grid-template-columns:repeat(4,1fr)">${U.SkeletonCard()}${U.SkeletonCard()}${U.SkeletonCard()}${U.SkeletonCard()}</div>`) }
      ] },

    /* ---------------------------------------------------------- 13 */
    { id: 'reviews-showcase', name: 'Reviews showcase', features: ['D-02'],
      note: 'Real captured reviews, including Arabic bodies rendered RTL at 1.7 leading regardless of page locale.',
      variants: [
        { n: 'Two-up cards', doc: 'Default PDP list with segmented sort.', html: () => band(U.ReviewList(p('layering-vanilla'), { limit: 4 })) },
        { n: 'Summary + list', doc: 'Aggregate above, individual reviews below — the standard PDP stack.',
          html: () => band(`<div class="split split--narrow" style="align-items:start">${U.ReviewSummary(p('layering-vanilla'))}${U.ReviewList(p('mawj'), { limit: 2 })}</div>`) },
        { n: 'Quote wall', doc: 'Homepage band. Three quotes, no chrome.',
          html: () => band(`<div class="pgrid" style="grid-template-columns:repeat(3,1fr)">${p('layering-vanilla').quotes.slice(0, 3).map(q => U.Quote(q)).join('')}</div>`, 'band--tint') },
        { n: 'With photos', doc: 'Photo reviews convert hardest — incentivise them explicitly.',
          html: () => band(`<div style="max-width:420px;margin-inline:auto">${U.ReviewCard(p('layering-vanilla').quotes[0], { photos: true, helpful: 23 })}</div>`) },
        { n: 'Write a review', doc: 'Judge.me runs autopublish:false — say so, or queuing looks broken.',
          html: () => band(`<div class="split"><div>${U.ReviewCard(p('layering-vanilla').quotes[1] || p('mawj').quotes[0], { helpful: 11 })}</div><div class="rform"><div class="rform__stars"><span class="lbl">${T('Your rating', 'تقييمك')}</span>${U.StarsInput('sec')}</div><div class="field"><textarea class="textarea" placeholder="${T('What did you think?', 'ما رأيك؟')}"></textarea></div><button class="btn">${T('Submit review', 'أرسل التقييم')}</button><span class="field__hint">${T('Reviews appear after moderation.', 'تظهر التقييمات بعد المراجعة.')}</span></div></div>`) },
        { n: 'Empty', doc: 'Two of 56 products have zero reviews — soiree and sundaze.',
          html: () => band(U.ReviewList(p('mawj'), { empty: true })) }
      ] },

    /* ---------------------------------------------------------- 14 */
    { id: 'recent', name: 'Recently viewed', features: ['A-05'],
      note: 'Persists to localStorage. Hide the section entirely rather than render an empty rail in production.',
      variants: [
        { n: 'Rail', doc: 'Default, below the fold.', html: () => band(`${head(T('Recently viewed', 'شاهدت مؤخراً'), '', T('Clear', 'مسح'))}${rail(P.slice(1, 6))}`) },
        { n: 'Grid', doc: 'Collection footer where horizontal space is free.', html: () => band(`${head(T('Recently viewed', 'شاهدت مؤخراً'))}${grid(P.slice(1, 5), 4)}`) },
        { n: 'Thumbnail strip', doc: 'Minimal — footer or sidebar, images only.',
          html: () => band(`<div class="row"><span class="lbl">${T('Recently viewed', 'شاهدت مؤخراً')}</span>${imgs.map(x => `<a href="#" style="width:56px">${U.Img(x.img, { alt: x.title })}</a>`).join('')}</div>`) },
        { n: 'With cross-sell', doc: 'F-03 — pairs history with a same-family recommendation.',
          html: () => band(`<div class="split"><div>${head(T('Recently viewed', 'شاهدت مؤخراً'))}${grid(P.slice(1, 3), 2)}</div><div>${head(T('Similar notes', 'نوتات متشابهة'))}${grid(notes(2), 2)}</div></div>`, 'band--tint') },
        { n: 'Single + continue', doc: 'Return visit. One product and a resume-shopping CTA.',
          html: () => band(`<div class="row" style="gap:var(--sp-lg);align-items:center;justify-content:center"><div style="width:120px">${U.ProductImage(p('mawj'), { zoom: false })}</div><div class="col"><p class="h-eyebrow">${T('Pick up where you left off', 'أكمل من حيث توقفت')}</p><b style="font:400 24px/1.2 var(--font-display);color:var(--heading)">Mawj</b><div class="row">${U.Price(p('mawj'))}<button class="btn btn--sm atc" data-atc="mawj">${t('add')}</button></div></div></div>`) },
        { n: 'Empty', doc: 'First visit. Offer a route rather than a blank box.',
          html: () => band(`<div class="rcard rcard--empty">${T('Nothing viewed yet', 'لا سجل بعد')}<div class="row" style="justify-content:center;margin-top:var(--sp-sm)"><a class="btn btn--secondary btn--sm" href="#">${t('shopAll')}</a></div></div>`) }
      ] },

    /* ---------------------------------------------------------- 15 */
    { id: 'stayclose', name: 'Stay close — referral & newsletter', features: ['F-01', 'F-02'],
      note: 'Siwa\'s only retention mechanic today is a 50 EGP newsletter popup with no code, minimum or expiry stated. WhatsApp is the dominant channel in Egypt and the brand already uses it for support.',
      variants: [
        { n: 'Split referral + newsletter', doc: 'Default. Two mechanics, one band.',
          html: () => band(`<div class="split">${U.ReferralWidget()}<div class="news"><p class="h-eyebrow">${T('A gift for your first order', 'هدية لأول طلب')}</p><p class="t-muted" style="font-size:var(--t-body-sm)">${T('LE 50 off your first purchase.', 'خصم ٥٠ ج.م على أول شراء.')}</p><div class="news__row"><input class="input" type="email" placeholder="${T('Your email', 'بريدك الإلكتروني')}"><button class="btn">${T('Subscribe', 'اشترك')}</button></div></div></div>`, 'band--tint') },
        { n: 'WhatsApp-first', doc: 'Egypt-first ordering. WhatsApp above email, not below it.',
          html: () => band(`<div style="max-width:520px;margin-inline:auto;text-align:center"><p class="h-eyebrow">${T('Refer a friend', 'ادعُ صديقاً')}</p><h3 style="font:400 30px/1.2 var(--font-display);color:var(--heading)">${T('Give LE 100, get LE 100', 'امنح ١٠٠ ج.م، واحصل على ١٠٠ ج.م')}</h3><div class="row" style="justify-content:center;margin-top:var(--sp-md)"><button class="btn btn--lg">${T('Share on WhatsApp', 'شارك على واتساب')}</button><button class="btn btn--lg btn--secondary" data-copy="SIWA-MAWJ-2026">${T('Copy code', 'انسخ الكود')}</button></div></div>`, 'band--center') },
        { n: 'Newsletter only', doc: 'Footer band. States the code value up front.',
          html: () => band(`<div style="max-width:440px;margin-inline:auto"><div class="news"><p class="h-eyebrow">${T('LE 50 off', 'خصم ٥٠ ج.م')}</p><div class="news__row"><input class="input" type="email" placeholder="${T('Your email', 'بريدك')}"><button class="btn">${T('Get code', 'احصل على الكود')}</button></div><span class="field__hint">${T('One email a month. Unsubscribe anytime.', 'رسالة واحدة شهرياً. يمكنك الإلغاء في أي وقت.')}</span></div></div>`, 'band--center') },
        { n: 'On dark', doc: 'Above the footer, closing the page on a dark note.',
          html: () => `<div class="band band--dark"><div class="band__inner" style="text-align:center"><h3 style="font:400 32px/1.2 var(--font-display);color:var(--on-dark)">${T('Stay close', 'ابقَ قريباً')}</h3><div class="news__row" style="max-width:400px;margin:var(--sp-md) auto 0"><input class="input" placeholder="${T('Your email', 'بريدك')}" style="background:transparent;color:var(--on-dark);border-color:rgba(212,207,194,.4)"><button class="btn">${T('Join', 'انضم')}</button></div></div></div>` },
        { n: 'Countdown promo', doc: 'Time-boxed only. A permanent countdown destroys trust.',
          html: () => band(`<div style="text-align:center"><p class="h-eyebrow">${T('Discovery set — ends soon', 'مجموعة الاكتشاف — تنتهي قريباً')}</p><h3 style="font:400 30px/1.2 var(--font-display);color:var(--heading);margin-bottom:var(--sp-md)">${T('Three for LE 399', 'ثلاثة بـ ٣٩٩ ج.م')}</h3><div class="row" style="justify-content:center">${U.CountdownTimer()}</div></div>`, 'band--tint band--center') },
        { n: 'Back-in-stock', doc: 'D-04 — 10 products are fully out and reviews say "always sold out".',
          html: () => band(`<div class="split"><div>${U.ProductCard(p('citrine'))}</div><div class="col"><p class="h-eyebrow">${T('Out of stock', 'نفدت الكمية')}</p><h3 style="font:400 28px/1.2 var(--font-display);color:var(--heading)">${T('Tell me when it returns', 'أخبرني عند التوفر')}</h3><p class="t-muted">${T('Citrine: 20 reviews at 5.00★, tagged Best Selling, every variant out. A customer wrote "always sold out".', 'سيترين: ٢٠ تقييماً بـ ٥٫٠٠★، ومصنّف الأكثر مبيعاً، وكل المقاسات نفدت. كتب أحد العملاء "دائماً نافد".')}</p><div class="news__row"><input class="input" type="email" placeholder="${T('Your email', 'بريدك')}"><button class="btn">${t('notify')}</button></div></div></div>`) }
      ] },

    /* ---------------------------------------------------------- 16 */
    { id: 'footer', name: 'Footer', features: ['E-02', 'F-02'],
      note: 'Column two carries Fueguia\'s four-pillar naming. The live footer duplicates the 10-link main menu.',
      variants: [
        { n: 'Four column', doc: 'Default.', flush: true, html: () => U.Footer() },
        { n: 'With newsletter', doc: 'Capture at the last scroll position on the page.', flush: true,
          html: () => `<footer class="ftr"><div class="ftr__grid" style="grid-template-columns:2fr 1fr 1fr"><div><h4>${T('Stay close', 'ابقَ قريباً')}</h4><div class="news__row" style="max-width:320px"><input class="input" placeholder="${T('Your email', 'بريدك')}" style="background:transparent;color:var(--on-dark);border-color:rgba(212,207,194,.4)"><button class="btn">${T('Join', 'انضم')}</button></div></div><div><h4>${T('Shop', 'تسوق')}</h4><ul><li><a href="#">${T('All fragrances', 'كل العطور')}</a></li><li><a href="#">${T('Originals', 'الأصلية')}</a></li></ul></div><div><h4>${T('The House', 'الدار')}</h4><ul><li><a href="#">${T('The Oasis', 'الواحة')}</a></li><li><a href="#">${T('The Craft', 'الحرفة')}</a></li></ul></div></div></footer>` },
        { n: 'With trust row', doc: 'Payment, returns and authenticity where customers look for them.', flush: true,
          html: () => `<footer class="ftr"><div class="ftr__grid" style="grid-template-columns:1fr">${`<div class="row" style="justify-content:center;gap:var(--sp-md)">${[T('Secure payment', 'دفع آمن'), T('14-day returns', 'إرجاع ١٤ يوم'), T('Authenticity guarantee', 'ضمان الأصالة')].map(x => `<span class="trustbadge" style="border-color:rgba(212,207,194,.35);color:var(--on-dark)">${svg('check')}${x}</span>`).join('')}</div>`}</div><div class="ftr__base"><span>© ${digits('2026')} Siwa · سيوة</span><span>${T('Made in Egypt', 'صُنع في مصر')}</span></div></footer>` },
        { n: 'Minimal', doc: 'Checkout and utility pages — no distractions from the flow.', flush: true,
          html: () => `<footer class="ftr" style="padding:var(--sp-lg)"><div class="ftr__base" style="margin:0;border:0;padding:0"><span>© ${digits('2026')} Siwa Fragrances</span><span>${T('Secure checkout', 'دفع آمن')}</span></div></footer>` },
        { n: 'Social row', doc: 'When social is the primary channel — Instagram, TikTok, WhatsApp.', flush: true,
          html: () => `<footer class="ftr"><div class="ftr__grid" style="grid-template-columns:1fr"><div style="text-align:center"><h4>${T('Follow', 'تابعنا')}</h4><div class="row" style="justify-content:center;gap:var(--sp-lg)">${['Instagram', 'TikTok', 'Facebook', 'WhatsApp'].map(s => `<a href="#">${s}</a>`).join('')}</div></div></div><div class="ftr__base"><span>© ${digits('2026')} Siwa · سيوة</span><span>contact@siwafragrances.com</span></div></footer>` },
        { n: 'Light', doc: 'Alternative when the page above it already ends dark.', flush: true,
          html: () => `<footer class="ftr" style="background:var(--surface-card);color:var(--ink)"><div class="ftr__grid">${[[T('Shop', 'تسوق'), [T('All fragrances', 'كل العطور'), T('Originals', 'الأصلية')]], [T('The House', 'الدار'), [T('The Oasis', 'الواحة'), T('The Craft', 'الحرفة')]], [T('Help', 'المساعدة'), [T('Shipping', 'الشحن'), T('Returns', 'الإرجاع')]], [T('Follow', 'تابعنا'), ['Instagram', 'WhatsApp']]].map(([h, items]) => `<div><h4 style="color:var(--text-secondary-aa)">${h}</h4><ul>${items.map(i => `<li><a href="#" style="color:var(--ink)">${i}</a></li>`).join('')}</ul></div>`).join('')}</div><div class="ftr__base" style="border-top-color:var(--hairline);color:var(--ink)"><span>© ${digits('2026')} Siwa · سيوة</span><span>${T('Made in Egypt', 'صُنع في مصر')}</span></div></footer>` }
      ] },

    /* ------------------------------------------------- 17 (PDP) */
    { id: 'pdp-buybox', name: 'PDP — buy box', features: ['B-06', 'C-06', 'D-04'],
      note: 'Gallery, variant selector, price, add-to-cart. 50 of 56 products have exactly one image, so the single-image case is the default, not the exception.',
      variants: [
        { n: 'Gallery left', doc: 'Default desktop. Thumbnails vertical, buy box right.',
          html: () => band(`<div class="split"><div>${U.ProductImage(p('coco-woods'), { wish: true })}</div><div class="col" style="gap:var(--sp-md)"><h3 style="font:400 34px/1.15 var(--font-display);color:var(--heading)">Coco Woods</h3>${U.Stars(4.94, { showCount: true, count: 16 })}${U.InspiredByBlock(p('coco-woods'))}${U.VariantSelector(p('coco-woods'), 'pdp1')}<div class="row">${U.Price(p('coco-woods'))}</div><button class="btn btn--lg btn--block atc" data-atc="coco-woods">${t('add')}</button>${U.Ship(70, { eta: true })}</div></div>`) },
        { n: 'Single image', doc: 'The real common case — no thumbnails, no swipe affordance.',
          html: () => band(`<div class="split"><div>${U.ProductImage(p('hot-vanilla'), { zoom: false })}</div><div class="col" style="gap:var(--sp-md)"><h3 style="font:400 34px/1.15 var(--font-display);color:var(--heading)">Hot Vanilla</h3>${U.VariantSelector(p('hot-vanilla'), 'pdp2')}${U.Price(p('hot-vanilla'))}<button class="btn btn--lg btn--block atc" data-atc="hot-vanilla">${t('add')}</button></div></div>`, 'band--tint') },
        { n: 'Sold out', doc: 'D-04 — every sold-out PDP is a dead end today.',
          html: () => band(`<div class="split"><div>${U.ProductImage(p('citrine'), { zoom: false })}</div><div class="col" style="gap:var(--sp-md)"><h3 style="font:400 34px/1.15 var(--font-display);color:var(--heading)">Citrine</h3>${U.Stars(5, { showCount: true, count: 20 })}${U.VariantSelector({ variants: p('citrine').variants.map(v => ({ ...v, a: false })) }, 'pdp3')}<div class="news__row"><input class="input" type="email" placeholder="${T('Your email', 'بريدك')}"><button class="btn">${t('notify')}</button></div><span class="field__hint">${T('20 reviews at 5.00★ — and out of stock in every size.', '٢٠ تقييماً بـ ٥٫٠٠★ — ونافد بكل المقاسات.')}</span></div></div>`) },
        { n: 'Bilingual lockup', doc: 'Arabic name at matching weight, mirroring the bottle.',
          html: () => band(`<div class="split"><div>${U.ProductImage(p('mawj'), { zoom: false })}</div><div class="col" style="gap:var(--sp-md)"><div class="h-bilingual"><h3 style="font:400 34px/1.15 var(--font-display);color:var(--heading)">Mawj</h3><span class="ar" style="font-size:26px;font-family:var(--font-ar-display);color:var(--heading)" lang="ar" dir="rtl">موج</span></div><span class="stamp">${T('Extrait de parfum', 'إكستريه دي بارفان')}</span>${U.Stars(4.99, { showCount: true, count: 68 })}${U.VariantSelector(p('mawj'), 'pdp4')}${U.Price(p('mawj'))}<button class="btn btn--lg btn--block atc" data-atc="mawj">${t('add')}</button></div></div>`, 'band--tint') },
        { n: 'Sticky mobile bar', doc: 'Below 768px the buy action follows the scroll.',
          html: () => band(`<div style="max-width:380px;margin-inline:auto;border:1px solid var(--hairline)"><div>${U.ProductImage(p('mawj'), { zoom: false })}</div><div style="padding:var(--sp-md)"><h4 style="font:400 24px/1.2 var(--font-display);color:var(--heading)">Mawj</h4>${U.Stars(4.99, { showCount: true, count: 68 })}</div><div style="position:sticky;bottom:0;border-top:1px solid var(--hairline);background:var(--canvas);padding:var(--sp-sm);display:flex;gap:var(--sp-sm);align-items:center">${U.Price(p('mawj'))}<button class="btn atc" style="margin-inline-start:auto" data-atc="mawj">${t('add')}</button></div></div>`) },
        { n: 'With quantity & gift', doc: 'C-06 and C-04 attached to the buy box.',
          html: () => band(`<div class="split"><div>${U.ProductImage(p('pink-allure'), { zoom: false })}</div><div class="col" style="gap:var(--sp-md)"><h3 style="font:400 34px/1.15 var(--font-display);color:var(--heading)">Pink Allure</h3>${U.VariantSelector(p('pink-allure'), 'pdp6')}<div class="row">${U.Qty({ n: 1 })}<button class="btn atc" data-atc="pink-allure" style="flex:1">${t('add')}</button></div><label class="check"><input type="checkbox"> ${T('This is a gift', 'هذه هدية')}</label></div></div>`) }
      ] },

    /* ------------------------------------------------- 18 (PDP) */
    { id: 'pdp-story', name: 'PDP — story before notes', features: ['B-05', 'E-03'],
      note: 'D.S. & Durga ordering — story above notes. Only 5 of 56 products currently use a "Persona / The Story" structure.',
      variants: [
        { n: 'Vintage story', doc: 'Default. Specimen surface, provenance stamp, pull-quote.', html: () => band(U.ProductStoryBlock(p('mawj'))) },
        { n: 'Plain editorial', doc: 'When the vintage layer would be too heavy for the page.',
          html: () => band(`<div class="story" style="max-width:640px;margin-inline:auto"><p class="story__eyebrow">${t('story')}</p><p class="story__quote">${T('Not all waves are meant to be chased. Some are meant to be worn.', 'ليست كل الأمواج تُطارَد. بعضها يُرتدى.')}</p><p class="t-muted">${esc(p('mawj').body)}</p></div>`) },
        { n: 'Persona-first', doc: 'Leads with the quiz archetype, links back to the quiz if not taken.',
          html: () => band(`<div class="split">${U.PersonaBlock()}<div class="story"><p class="story__eyebrow">${t('story')}</p><p class="t-muted">${esc(p('mawj').body)}</p></div></div>`, 'band--tint') },
        { n: 'Cinematic', doc: 'Full-bleed lifestyle image above the story. Needs real photography.',
          html: () => `<div class="band band--flush"><div style="aspect-ratio:21/7;overflow:hidden">${U.Img(imgs[0].img, { ar: '21/7', alt: '' })}</div><div class="band" style="text-align:center"><p class="story__eyebrow">${t('story')}</p><p style="font:400 30px/1.4 var(--font-display);color:var(--heading);max-width:44ch;margin-inline:auto">${T('Where the desert meets the sea.', 'حيث تلتقي الصحراء بالبحر.')}</p></div></div>` },
        { n: 'Cultural highlight', doc: 'E-03 — the cultural block only appears on the 16 originals.',
          html: () => band(`<div class="col" style="max-width:640px;margin-inline:auto"><div class="story"><p class="story__eyebrow">${t('story')}</p><p class="t-muted">${esc(p('mawj').body.slice(0, 200))}</p></div><div class="vintage-surface"><span class="edge-wear"></span><div class="hr--sunburst" style="width:120px;margin-bottom:var(--sp-sm)"></div><p style="font:400 20px/1.5 var(--font-display);color:var(--heading);margin:0">${T('Mawj means "wave" in Arabic — named for the salt pools of Siwa, where crystalline water meets desert silence.', 'موج تعني الأمواج بالعربية — سُمّي على برك الملح في سيوة، حيث يلتقي الماء البلوري بصمت الصحراء.')}</p></div></div>`) },
        { n: 'Story + notes stack', doc: 'The full B-05 → B-02 → B-03 sequence in one column.',
          html: () => band(`<div class="col" style="max-width:560px;margin-inline:auto;gap:var(--sp-xl)">${U.ProductStoryBlock(p('mawj'))}${U.NotePyramid(notes(1)[0])}${U.IntensityScale(2)}</div>`) }
      ] },

    /* ------------------------------------------------- 19 (PDP) */
    { id: 'pdp-scales', name: 'PDP — notes & scales', features: ['B-02', 'B-03', 'B-01'],
      note: 'Only 18 of 56 products hold parseable notes, across 13 different tier-label spellings. Sillage and longevity are new metafield data — nothing to parse out of body_html.',
      variants: [
        { n: 'Pyramid + scales', doc: 'Default. Notes then sillage, both from metafields.',
          html: () => band(`<div class="split">${U.NotePyramid(notes(1)[0])}<div class="col" style="gap:var(--sp-lg)">${U.IntensityScale(2)}${U.IntensityScale(3)}</div></div>`) },
        { n: 'Three-card notes', doc: 'Equal visual weight per tier — good on wide desktop.',
          html: () => band(`<div class="pgrid" style="grid-template-columns:repeat(3,1fr)">${[['top', t('top')], ['heart', t('heart')], ['base', t('base')]].map(([k, l]) => `<div class="pcard" style="text-align:center"><p class="pyramid__label">${l}</p><p class="pyramid__val">${esc(notes(1)[0].notes[k] || '—')}</p></div>`).join('')}</div>`) },
        { n: 'Horizontal tiers', doc: 'Mobile PDP. Bullet-separated rows instead of a pyramid.',
          html: () => band(`<div class="col" style="max-width:520px;margin-inline:auto">${[['top', t('top')], ['heart', t('heart')], ['base', t('base')]].map(([k, l]) => `<div class="row" style="gap:var(--sp-sm);padding:var(--sp-xs) 0;border-bottom:1px solid var(--hairline)"><span class="pyramid__label" style="min-width:96px">${l}</span><span class="pyramid__val">${esc(notes(1)[0].notes[k] || '—')}</span></div>`).join('')}</div>`) },
        { n: 'Accord chips', doc: 'For the 38 products with prose instead of tiers — chips from accords.',
          html: () => band(`<div style="max-width:520px;margin-inline:auto"><p class="lbl" style="margin-bottom:var(--sp-xs)">${T('Main accords', 'الأنفاس الرئيسية')}</p><div class="row">${['Vanilla', 'Amber', 'Sweet', 'Woody'].map(n => U.Badge(n, 'tag')).join('')}</div></div>`, 'band--tint') },
        { n: 'Full scent profile', doc: 'B-03 complete: intensity, longevity, sillage, season.',
          html: () => band(`<div class="col" style="max-width:480px;margin-inline:auto;gap:var(--sp-lg)"><p class="lbl">${T('Scent profile', 'ملف العطر')}</p>${U.IntensityScale(3)}<div class="row" style="gap:var(--sp-md)"><span class="t-muted" style="font-size:var(--t-body-sm)">${T('Longevity', 'الثبات')}: <b style="color:var(--heading)">${T('8–10 hours', '٨-١٠ ساعات')}</b></span><span class="t-muted" style="font-size:var(--t-body-sm)">${T('Best in', 'الأفضل في')}: <b style="color:var(--heading)">${T('Autumn · Winter', 'الخريف · الشتاء')}</b></span></div></div>`) },
        { n: 'No data', doc: 'The honest default for 38 of 56 products until the migration runs.',
          html: () => band(`<div style="max-width:480px;margin-inline:auto">${U.NotePyramid({ notes: {} })}</div>`) }
      ] },

    /* ------------------------------------------------- 20 (cart) */
    { id: 'cart', name: 'Cart drawer', features: ['C-03', 'F-03', 'C-04'],
      note: 'The 1,500 EGP free-shipping threshold exists on the live store and is never merchandised anywhere in the cart.',
      variants: [
        { n: 'With shipping progress', doc: 'Default. The gap to free shipping is the upsell.',
          html: () => band(`<div style="max-width:400px;margin-inline:auto;border:1px solid var(--hairline)"><div class="drawer__head"><h2 class="drawer__title">${t('bag')}</h2><button class="iconbtn">${svg('close')}</button></div><div style="padding:var(--sp-md);display:grid;gap:var(--sp-md)">${U.LineItem(p('mawj'), { n: 1 })}${U.LineItem(p('coco-woods'), { n: 1 })}</div><div class="drawer__foot">${U.Ship(70, { eta: true })}<div class="row" style="justify-content:space-between"><span class="lbl">${t('subtotal')}</span><b class="price">${money(1650)}</b></div><button class="btn btn--block btn--lg">${t('checkout')}</button></div></div>`) },
        { n: 'With cross-sell', doc: 'F-03 — same scent family, shown before checkout not after.',
          html: () => band(`<div style="max-width:400px;margin-inline:auto;border:1px solid var(--hairline)"><div class="drawer__head"><h2 class="drawer__title">${t('bag')}</h2></div><div style="padding:var(--sp-md)">${U.LineItem(p('mawj'), { n: 1 })}</div><div style="padding:var(--sp-md);border-top:1px solid var(--hairline)"><p class="lbl" style="margin-bottom:var(--sp-xs)">${T('Layers well with', 'يُمزج جيداً مع')}</p><div class="row">${lay(2).map(x => `<div style="width:120px">${U.ProductCard(x)}</div>`).join('')}</div></div></div>`, 'band--tint') },
        { n: 'Free shipping met', doc: 'Confirmed benefit — stop nagging and switch to cross-sell.',
          html: () => band(`<div style="max-width:400px;margin-inline:auto;border:1px solid var(--hairline)"><div class="drawer__head"><h2 class="drawer__title">${t('bag')}</h2></div><div style="padding:var(--sp-md)">${U.LineItem(p('coco-woods'), { n: 2 })}</div><div class="drawer__foot">${U.Ship(100)}<button class="btn btn--block btn--lg">${t('checkout')}</button></div></div>`) },
        { n: 'With gift message', doc: 'C-04 — the enclosed-card preview inside the drawer.',
          html: () => band(`<div class="split"><div style="border:1px solid var(--hairline)"><div class="drawer__head"><h2 class="drawer__title">${t('bag')}</h2></div><div style="padding:var(--sp-md)">${U.LineItem(p('pink-allure'), { n: 1 })}</div></div><div>${U.GiftCard({ to: T('Salma', 'سلمى'), from: T('Rana', 'رنا'), msg: T('Happy birthday.', 'كل سنة وأنتِ طيبة.') })}</div></div>`) },
        { n: 'Empty', doc: 'Offer a route — the quiz or bestsellers — never a blank panel.',
          html: () => band(`<div style="max-width:400px;margin-inline:auto;border:1px solid var(--hairline)"><div class="drawer__head"><h2 class="drawer__title">${t('bag')}</h2></div><div style="padding:var(--sp-xl);text-align:center"><p class="t-muted">${t('empty')}</p><div class="row" style="justify-content:center;margin-top:var(--sp-md)"><a class="btn btn--secondary btn--sm" href="#">${T('Take the quiz', 'ابدأ الاختبار')}</a><a class="btn btn--secondary btn--sm" href="#">${t('shopAll')}</a></div></div></div>`) },
        { n: 'Blocked checkout', doc: 'An item went out of stock after add — say why, never just disable.',
          html: () => band(`<div style="max-width:400px;margin-inline:auto;border:1px solid var(--hairline)"><div class="drawer__head"><h2 class="drawer__title">${t('bag')}</h2></div><div style="padding:var(--sp-md)">${U.LineItem(p('citrine'), { n: 1, gone: true })}</div><div class="drawer__foot"><button class="btn btn--block btn--lg" disabled>${t('checkout')}</button><span class="field__err">${T('Remove the sold-out item to continue', 'أزل المنتج النافد للمتابعة')}</span></div></div>`) }
      ] }
  ];

  /* ------------------------------------------------- 21 (wishlist) */
  SECTIONS.push(
    { id: 'wishlist', name: 'Wishlist & saved', features: ['C-05', 'D-04'],
      note: 'Rehydrates from localStorage. Doubles as the demand signal for the 10 fully sold-out products — a save on an out-of-stock SKU is a restock request.',
      variants: [
        { n: 'Saved grid', doc: 'Default wishlist page. Hearts stay pressed across reloads.',
          html: () => band(`${head(T('Your wishlist', 'قائمتك'), T('4 saved', '٤ محفوظات'), T('Share list', 'شارك القائمة'))}${grid(P.slice(0, 4), 4, { wish: true })}`) },
        { n: 'With move-to-cart', doc: 'Bulk action — the whole point of a wishlist is the second visit.',
          html: () => band(`<div class="col">${grid(P.slice(0, 3), 3, { wish: true })}<div class="row" style="justify-content:center"><button class="btn btn--lg">${T('Add all to bag', 'أضف الكل للحقيبة')}</button><button class="btn btn--tertiary">${T('Clear list', 'مسح القائمة')}</button></div></div>`, 'band--tint') },
        { n: 'Sold-out watchlist', doc: 'D-04 crossover — saved items that are out of stock become notify-me rows.',
          html: () => band(`${head(T('Waiting for these', 'بانتظار هذه'), T('We will email you the moment they return.', 'سنراسلك فور توفرها.'))}<div class="col">${[p('citrine'), p('alluring-rose')].map(x => `<div class="row" style="gap:var(--sp-md);align-items:center;padding:var(--sp-sm) 0;border-bottom:1px solid var(--hairline)"><div style="width:56px">${U.ProductImage(x, { zoom: false, badges: false })}</div><div style="flex:1"><b style="display:block;font:500 var(--t-body)/1.3 var(--font-ui);color:var(--heading)">${esc(x.title)}</b>${U.Stars(x.rating, { showCount: true, count: x.reviews })}</div><button class="btn btn--secondary btn--sm">${t('notify')}</button></div>`).join('')}</div>`) },
        { n: 'Heart states', doc: 'The toggle itself — aria-pressed, not a colour change alone.',
          html: () => band(`<div class="row" style="gap:var(--sp-lg);justify-content:center"><div style="width:160px">${U.ProductImage(p('mawj'), { zoom: false, wish: true })}</div><div style="width:160px;position:relative">${U.ProductImage(p('coco-woods'), { zoom: false, badges: false })}<button class="wish" aria-pressed="true" style="position:absolute;top:12px;inset-inline-end:12px">${svg('heart')}</button></div></div>`) },
        { n: 'Empty', doc: 'Offer the quiz — a customer with no saves has not decided anything yet.',
          html: () => band(`<div class="rcard rcard--empty" style="max-width:520px;margin-inline:auto">${T('Nothing saved yet', 'لا محفوظات بعد')}<div class="row" style="justify-content:center;margin-top:var(--sp-md)"><a class="btn btn--secondary btn--sm" href="#">${T('Take the quiz', 'ابدأ الاختبار')}</a><a class="btn btn--secondary btn--sm" href="#">${t('shopAll')}</a></div></div>`) },
        { n: 'Drawer', doc: 'Same panel primitive as the cart — flies in from inline-end, flips in RTL.',
          html: () => band(`<div style="max-width:400px;margin-inline:auto;border:1px solid var(--hairline)"><div class="drawer__head"><h2 class="drawer__title">${t('wishlist')}</h2><button class="iconbtn">${svg('close')}</button></div><div style="padding:var(--sp-md);display:grid;gap:var(--sp-md)">${U.LineItem(p('mawj'), { compact: true })}${U.LineItem(p('pink-allure'), { compact: true })}</div><div class="drawer__foot"><button class="btn btn--block">${T('Add all to bag', 'أضف الكل')}</button></div></div>`) }
      ] });

  /* ---------- feature metadata from feature-doc/index.html ---------- */
  const FEATURES = [
    ['A', 'Findability — getting the customer to the right bottle', [
      ['A-01', 'Faceted collection filtering', 'built'], ['A-02', 'Scent quiz → Persona', 'spec'],
      ['A-03', 'Dual-track navigation and narrative collections', 'built'], ['A-04', 'Predictive search', 'built'],
      ['A-05', 'Sort, pagination, breadcrumbs, recently viewed', 'built']]],
    ['B', 'The product page — answering the questions that stop a purchase', [
      ['B-01', 'Note & accord taxonomy — the keystone', 'spec'], ['B-02', 'Note pyramid', 'built'],
      ['B-03', 'Intensity & sillage scales', 'spec'], ['B-04', 'Inspired-by price-contrast block', 'blocked'],
      ['B-05', 'Story-before-notes product page', 'built'], ['B-06', 'Gallery, variant selector, price display', 'built']]],
    ['C', 'Basket building — the track with the most upside', [
      ['C-01', 'Bundle builder & discovery set', 'built'], ['C-02', 'Layering suggestions', 'built'],
      ['C-03', 'Cart drawer with free-shipping progress', 'built'], ['C-04', 'Gift messaging', 'built'],
      ['C-05', 'Wishlist', 'built'], ['C-06', 'Checkout CTA, quantity, discount code', 'built']]],
    ['D', 'Trust — deploying the asset the store already owns', [
      ['D-01', 'aggregateRating structured data', 'spec'], ['D-02', 'Reviews, loud', 'built'],
      ['D-03', 'Trust badges — verifiable claims only', 'built'], ['D-04', 'Back-in-stock capture', 'built']]],
    ['E', 'Identity — closing the gap between the bottle and the website', [
      ['E-01', 'Bilingual EN/AR storefront with RTL', 'built'], ['E-02', 'House of Siwa — the story track', 'built'],
      ['E-03', 'Provenance stamp and artisan credit', 'blocked'], ['E-04', 'Two-palette design system and the vintage layer', 'built'],
      ['E-05', 'USP bar rebuilt on verifiable claims', 'built']]],
    ['F', 'Retention — the second order', [
      ['F-01', 'Referral', 'built'], ['F-02', 'Announcement bar, newsletter, promo banner, countdown', 'built'],
      ['F-03', 'Recommendations and cross-sell', 'built'], ['F-04', 'Subscription and loyalty', 'spec']]]
  ];

  window.SIWA_SECTIONS = SECTIONS;
  window.SIWA_FEATURES = FEATURES;

  /* ---------- shared renderers ---------- */
  const fchip = c => `<a class="fcode fcode--${c[0]}" href="../feature-docs/index.html#${c}">${c}</a>`;

  window.renderSectionGallery = function (mount) {
    mount.innerHTML = SECTIONS.map((s, si) => `
      <section class="sec" id="${s.id}">
        <div class="sec__head"><h2>${esc(s.name)}</h2></div>
        <div class="sec__meta">${s.features.map(fchip).join('')}
          <span class="t-muted" style="font-size:var(--t-caption)">${digits(s.variants.length)} ${T('designs', 'تصاميم')}</span></div>
        <p class="sec__note">${esc(s.note)}</p>
        ${s.variants.map((v, i) => `
          <div class="svar" id="${s.id}-${i + 1}">
            <div class="svar__bar"><span class="svar__n"><i>${i + 1}</i>${esc(v.n)}</span>
              <span class="svar__uses">${s.features.map(f => f).join(' · ')}</span></div>
            <div class="svar__stage ${v.flush ? 'svar__stage--flush' : ''}">${v.html()}</div>
            <div class="svar__doc"><b>${T('When to use', 'متى تستخدمه')}</b><span>${esc(v.doc)}</span></div>
          </div>`).join('')}
      </section>`).join('');
  };

  window.renderSectionNav = function (mount) {
    mount.innerHTML = `<div class="side__grp"><h4>${T('Sections', 'الأقسام')}</h4><ul>${
      SECTIONS.map(s => `<li><a href="#${s.id}" data-nav="${s.id}">${esc(s.name)}<span class="p p1">${digits(s.variants.length)}</span></a></li>`).join('')}</ul></div>`;
  };

  /* feature → variants index */
  window.featureIndex = function () {
    const idx = {};
    SECTIONS.forEach(s => s.features.forEach(f => {
      (idx[f] = idx[f] || []).push({ section: s, });
    }));
    SECTIONS.forEach(s => s.variants.forEach((v, i) => {
      s.features.forEach(f => {
        idx[f] = idx[f] || [];
        idx[f].variants = idx[f].variants || [];
        idx[f].variants.push({ sid: s.id, sname: s.name, vi: i + 1, vn: v.n, doc: v.doc });
      });
    }));
    return idx;
  };
})();
