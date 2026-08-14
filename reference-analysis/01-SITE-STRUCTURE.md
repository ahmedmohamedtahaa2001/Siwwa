# 01 — SITE STRUCTURE & PAGE ARCHITECTURE

**Reference:** https://siwafragrances.com/
**Audit date:** 2026-07-27
**Theme:** Prestige 11.1.0 (theme_store_id 855), live theme id `141667663920`
**Evidence base:** `raw/sitemap*.xml`, `raw/pages/*.html`, `raw/products/*.html`,
`raw/products.json`, `raw/collections.json`, `raw/reviews_complete.json`

> **Data corrections (applied):** the review counts and ratings in §2.4, and the per-PDP DOM
> claims throughout, were **re-derived after recovering the 24 PDP captures that the first pass
> returned as Cloudflare interstitials**. The capture set is now **56/56 valid PDPs** — no
> product row is unknown any more. See `_CORRECTIONS.md` and `raw/reviews_complete.json`.

---

## 1. Sitemap index

`raw/sitemap.xml` declares five child sitemaps:

| Child sitemap | URLs | Raw file |
|---|---:|---|
| `/sitemap_agentic_discovery.xml` | 1 | `raw/sitemap_agentic_discovery.xml` |
| `/sitemap_products_1.xml?from=7735872389168&to=8032736182320` | 57 (56 products + site root) | `raw/sitemap_products_1.xml` |
| `/sitemap_pages_1.xml?from=106735173680&to=107340365872` | 5 | `raw/sitemap_pages_1.xml` |
| `/sitemap_collections_1.xml?from=297379168304&to=305941053488` | 19 | `raw/sitemap_collections_1.xml` |
| `/sitemap_blogs_1.xml` | 1 | `raw/sitemap_blogs_1.xml` |
| **Total indexed URLs** | **83** | |

The agentic-discovery sitemap contains a single entry, `https://siwafragrances.com/agents.md`
(`changefreq: weekly`). That file is **not referenced from any captured HTML** and its contents
were not captured.

All 56 product URLs carry an identical `<lastmod>` of `2026-07-27` — the sitemap was regenerated
wholesale, so lastmod carries no per-product signal and is omitted from the tables below.

---

## 2. URL inventory

### 2.1 Root & system URLs

| URL | Template | Evidence |
|---|---|---|
| `/` | `index` | `raw/pages/index.html`; also listed (blank lastmod) in `raw/sitemap_products_1.xml` |
| `/cart` | `cart` | linked from header cart icon in every captured page; `raw/cart.js` returned a valid cart object |
| `/search` | `search` | linked 16× across captures (header icon + footer "SEARCH"); `"predictiveSearch":true` in `raw/pages/index.html` |
| `/agents.md` | n/a (static file) | `raw/sitemap_agentic_discovery.xml` |
| `/collections/vendors?q=<vendor>` | Shopify auto vendor listing | 20+ distinct hrefs emitted by product cards in `raw/pages/index.html` |
| `/products/<handle>?variant=<id>` | product (variant-deep-link) | JSON-LD `hasVariant[].offers.url` in `raw/pages/pdp_sample.html` |
| `/policies/refund-policy` | Shopify policy | footer menu |
| `/policies/privacy-policy` | Shopify policy | footer menu |

### 2.2 Page URLs (5)

| # | URL | H1 rendered | Template ID | `<lastmod>` | Linked from |
|---|---|---|---|---|---|
| 1 | `/pages/contact` | Contact | `template--18814156668976` | 2025-09-03 | header nav, footer nav |
| 2 | `/pages/about-us` | ABOUT US | `template--18814156701744` | 2025-09-13 | footer nav ("ABOUT US") |
| 3 | `/pages/our-story` | OUR STORY | `template--18814156701744` | 2025-09-13 | **nothing** — orphan |
| 4 | `/pages/our-comitments` | OUR COMITMENTS | `template--18814156701744` | 2025-09-13 | **nothing** — orphan |
| 5 | `/pages/size-chart-1` | *(not captured)* | *(not captured)* | 2025-09-20 | PDP "Size chart" modal — 1 href in `raw/pages/pdp_sample.html` |

### 2.3 Collection URLs (19)

`linked from` measured by parsing `href="/collections/<handle>"` inside the header-group,
footer-group and body regions of `raw/pages/index.html`.

| # | URL | Title | `products_count` (admin) | Has image | Published | Linked from |
|---|---|---|---:|---|---|---|
| 1 | `/collections/all` | *(Shopify catch-all)* | 56 rendered | — | — | header, footer ("SHOP ALL") |
| 2 | `/collections/best-sellers` | BEST SELLERS | 24 | yes | 2025-09-12 | home body (collection list) |
| 3 | `/collections/black-friday-2025` | Black Friday Offer | 0 | no | 2025-11-27 | **orphan** |
| 4 | `/collections/body-lotion` | Body lotion | 1 | yes | 2025-09-07 | header, footer, home body ×2 |
| 5 | `/collections/body-splash` | Body Splash | 6 | yes | 2025-09-07 | header, footer, home body |
| 6 | `/collections/bundles` | Bundles | 11 | yes | 2025-09-07 | header, footer, home body ×2 |
| 7 | `/collections/for-her` | FOR HER | 80 | yes | 2025-09-11 | header, footer, home body |
| 8 | `/collections/for-him` | FOR HIM | 83 | yes | 2025-09-11 | header, footer, home body |
| 9 | `/collections/gift-boxes` | Gift Boxes | 1 | no | 2026-02-13 | **orphan** |
| 10 | `/collections/men-best-sellers` | MEN BEST SELLERS | 17 | no | 2025-09-30 | home body (featured-collections-2 tab CTA) |
| 11 | `/collections/men-new-drops` | men new drops | 7 | no | 2025-09-30 | home body (featured_collections tab CTA) |
| 12 | `/collections/new-drops` | new drops | 30 | yes | 2025-09-29 | home body (collection list) |
| 13 | `/collections/original-creations` | Original Creations | 8 | yes | 2025-09-07 | header, footer, home body ×2 |
| 14 | `/collections/perfumes` | perfumes | 82 | no | 2025-09-07 | **orphan** |
| 15 | `/collections/ramadan-drops` | Ramadan Drops | 6 | no | 2025-09-07 | **orphan** |
| 16 | `/collections/siwa-perfumes` | siwa fragrances | 51 | no | 2025-09-07 | **orphan** |
| 17 | `/collections/summer-collection` | Summer Collection | 21 | yes | 2026-04-24 | home body (slideshow CTA) |
| 18 | `/collections/unisex` | UNISEX | 50 | yes | 2025-09-11 | header, footer, home body |
| 19 | `/collections/women-best-sellers` | WOMEN BEST SELLERS | 11 | no | 2025-09-30 | home body (featured-collections-2 tab CTA) |
| 20 | `/collections/women-new-drops` | women new drops | 9 | no | 2025-09-30 | home body (featured_collections tab CTA) |

> Row 1 (`/collections/all`) is a Shopify built-in and is **not** in
> `raw/sitemap_collections_1.xml`; rows 2–20 are the 19 sitemapped collections.
>
> **Warning:** `products_count` from `raw/collections.json` exceeds the 56 published products for
> `for-him` (83), `perfumes` (82), `for-her` (80), `siwa-perfumes` (51) and `unisex` (50), and
> `/collections/best-sellers` renders **18** products against an admin count of 24. These counts
> include unpublished inventory and must not be used in storefront copy.
>
> Collections carrying `<image:title>` in `raw/sitemap_collections_1.xml`: Bundles, Body lotion,
> Original Creations, Body Splash, FOR HER, FOR HIM, UNISEX, BEST SELLERS, new drops, Summer
> Collection. The remaining nine have no sitemap image.

### 2.4 Product URLs (56)

Template column: **A** = `template--18814156767280` (default product template, eau de parfum,
50 products), **B** = `template--18814157291568` (alternate template, body splash / lotion,
6 products). All 56 PDP captures are now readable, so the template is known for every product
(see `00-OVERVIEW.md` §7).

Reviews column = `count / average` from `raw/reviews_complete.json` (corrected — 820 reviews
across 54 of 56 products; only `soiree` and `sundaze` have none).

| # | URL | Title | Variants | Price (EGP) | Stock | Tpl | Reviews |
|---|---|---|---:|---|---|---|---|
| 1 | `/products/absolute-drunk` | Absolute Drunk | 3 | 750–1850 | sold out | A | 2 / 5.00 |
| 2 | `/products/alluring-rose` | Alluring Rose | 3 | 500–1100 | sold out | A | 24 / 4.96 |
| 3 | `/products/apple-pie` | Apple Pie | 1 | 375 | in stock | B | 9 / 5.00 |
| 4 | `/products/aurableu` | Aurableu | 3 | 700–1750 | in stock | A | 8 / 5.00 |
| 5 | `/products/bare-glow` | Bare Glow | 3 | 450–1000 | in stock | A | 21 / 4.95 |
| 6 | `/products/belle-riche` | Belle Riche | 3 | 550–1150 | in stock | A | 4 / 5.00 |
| 7 | `/products/bleu-exclusive` | Bleu Exclusive | 3 | 750–1900 | in stock | A | 19 / 5.00 |
| 8 | `/products/bleu-intense` | Bleu Intense | 3 | 500–1050 | sold out | A | 7 / 5.00 |
| 9 | `/products/boujee-blush` | Boujee Blush | 3 | 500–1200 | in stock | A | 59 / 4.97 |
| 10 | `/products/caramel-vanigliato` | Caramel vanigliato | 3 | 550–1550 | in stock | A | 43 / 4.95 |
| 11 | `/products/carnal-trail` | Carnal Trail | 3 | 600–1550 | in stock | A | 10 / 5.00 |
| 12 | `/products/chocolate-creme` | Chocolate Creme | 3 | 450–1250 | in stock | A | 8 / 5.00 |
| 13 | `/products/citrine` | Citrine | 3 | 750–1850 | sold out | A | 20 / 5.00 |
| 14 | `/products/coco-woods` | Coco Woods | 3 | 850–2300 | in stock | A | 16 / 4.94 |
| 15 | `/products/coffee-vanilla` | Coffee Vanilla | 3 | 550–1150 | in stock | A | 18 / 5.00 |
| 16 | `/products/drunk-gold` | Drunk Gold | 3 | 750–1950 | in stock | A | 46 / 5.00 |
| 17 | `/products/gourmet` | Gourmet | 3 | 800–2100 | in stock | A | 6 / 5.00 |
| 18 | `/products/hibiscusex` | Hibiscusex | 3 | 700–1650 | in stock | A | 56 / 4.98 |
| 19 | `/products/hot-male` | Hot Male | 2 | 800–1250 | in stock | A | 9 / 5.00 |
| 20 | `/products/hot-vanilla` | Hot Vanilla | 3 | 550–1550 | in stock | A | 12 / 4.92 |
| 21 | `/products/insane-pineapple` | Insane Pineapple | 3 | 500–1350 | in stock | A | 5 / 4.80 |
| 22 | `/products/iris-elixir` | Iris elixir | 2 | 850–1350 | sold out | A | 6 / 5.00 |
| 23 | `/products/irresistible-vanilla` | Irresistible Vanilla | 3 | 400–1000 | in stock | A | 18 / 4.94 |
| 24 | `/products/lady-killer` | Lady killer | 3 | 750–1750 | in stock | A | 26 / 4.96 |
| 25 | `/products/lagoon-flair` | Lagoon Flair | 3 | 450–1200 | in stock | A | 13 / 4.92 |
| 26 | `/products/layering-30-ml-bundle` | Layering bundle | 12 | 1105–1995 | in stock | A | 3 / 5.00 |
| 27 | `/products/layering-apple` | Layering Apple | 2 | 450–650 | in stock | A | 1 / 5.00 |
| 28 | `/products/layering-lychee` | Layering Lychee | 3 | 450–1000 | in stock | A | 6 / 5.00 |
| 29 | `/products/layering-pistachio` | Layering Pistachio | 3 | 450–1000 | in stock | A | 10 / 5.00 |
| 30 | `/products/layering-vanilla` | Layering Vanilla | 3 | 450–1000 | in stock | A | 98 / 5.00 |
| 31 | `/products/libre-desire` | Libre Desire | 3 | 500–1250 | in stock | A | 7 / 5.00 |
| 32 | `/products/lost-on-you` | Lost On You | 3 | 750–1900 | sold out | A | 4 / 5.00 |
| 33 | `/products/luna-di-roma` | Luna Di Roma | 1 | 600 | in stock | A | 9 / 4.78 |
| 34 | `/products/male-elixir` | Male Elixir | 3 | 450–1250 | in stock | A | 11 / 5.00 |
| 35 | `/products/mango-on-woods` | Mango on woods | 3 | 700–1800 | in stock | A | 1 / 5.00 |
| 36 | `/products/mango-pineapple` | Mango Pineapple | 3 | 750–1850 | in stock | A | 11 / 5.00 |
| 37 | `/products/marasi` | Marasi | 3 | 550–1400 | in stock | A | 23 / 5.00 |
| 38 | `/products/marshmallow` | Marshmallow | 1 | 375 | in stock | B | 5 / 5.00 |
| 39 | `/products/marshmallow-bundle` | Marshmallow Bundle | 1 | 950 | in stock | A | 4 / 5.00 |
| 40 | `/products/mawj` | Mawj | 3 | 800–1850 | in stock | A | 68 / 4.99 |
| 41 | `/products/pacific-elixir` | Pacific Elixir | 3 | 600–1500 | in stock | A | 7 / 5.00 |
| 42 | `/products/pink-allure` | Pink Allure | 3 | 590–1400 | in stock | A | 14 / 5.00 |
| 43 | `/products/pink-arrogance` | Pink Arrogance | 3 | 450–1000 | in stock | A | 4 / 5.00 |
| 44 | `/products/silk-vanilla` | Silk Vanilla | 1 | 375 | in stock | B | 13 / 5.00 |
| 45 | `/products/silk-vanilla-body-lotion` | Silk Vanilla Body Lotion | 1 | 350 | sold out | B | 7 / 5.00 |
| 46 | `/products/siwa-trail` | Siwa Trail | 3 | 600–1750 | sold out | A | 5 / 5.00 |
| 47 | `/products/soiree` | Soiree | 3 | 550–1400 | in stock | A | 0 / — |
| 48 | `/products/soul-poudree` | Soul Poudree | 3 | 400–1050 | in stock | A | 11 / 5.00 |
| 49 | `/products/stellar-nights` | Stellar Nights | 3 | 800–2050 | in stock | A | 3 / 5.00 |
| 50 | `/products/summer-elegance` | summer elegance | 3 | 850–2150 | in stock | A | 2 / 5.00 |
| 51 | `/products/summer-holidays` | Summer Holidays | 3 | 650–1700 | in stock | A | 7 / 5.00 |
| 52 | `/products/sundaze` | Sundaze | 3 | 500–1100 | in stock | A | 0 / — |
| 53 | `/products/sweet-oud` | Sweet Oud | 3 | 650–1650 | sold out | A | 1 / 5.00 |
| 54 | `/products/sweet-rum` | Sweet Rum | 1 | 375 | in stock | B | 7 / 5.00 |
| 55 | `/products/vanilla-91` | Vanilla 91 | 1 | 380 | in stock | B | 2 / 5.00 |
| 56 | `/products/vanilla-bundle` | Vanilla Bundle | 3 | 1060–1555 | sold out | A | 11 / 5.00 |

### 2.5 Blog URLs (1)

| URL | `<lastmod>` | Articles in sitemap | Linked from |
|---|---|---:|---|
| `/blogs/news` | 2025-09-03 | 0 | **nothing** — grep for `/blogs/` across all 8 page captures and 56 PDP captures returned zero hrefs |

The default Shopify `news` blog exists and is indexed but is unreachable by navigation and has
no published articles listed. There are no `article` URLs anywhere in the capture.

---

## 3. Template inventory

Prestige exposes the template a page uses through the numeric prefix of its section IDs
(`template--<templateId>__<sectionId>`). Every captured page was parsed for this prefix.

| Template ID | Shopify template | Verified by | Sections in it |
|---|---|---|---:|
| `template--18814156636208` | `index` | `raw/pages/index.html` | 10 |
| `template--18814156767280` | `product` (default) | 50 PDP captures incl. `raw/pages/pdp_sample.html` | 4 |
| `template--18814157291568` | `product` (**second template**) | 6 PDP captures (`apple-pie`, `marshmallow`, `silk-vanilla`, `silk-vanilla-body-lotion`, `sweet-rum`, `vanilla-91`) | 4 |
| `template--18814157029424` | `collection` | `raw/pages/collections_all.html`, `raw/pages/collections_best-sellers.html` | 1 |
| `template--18814156701744` | `page` (default) | `pages_about-us.html`, `pages_our-story.html`, `pages_our-comitments.html` | 2 |
| `template--18814156668976` | `page` (**contact variant**) | `raw/pages/pages_contact.html` | 3 |

### 3.1 Template existence verification

| Template | Exists? | Evidence |
|---|---|---|
| `index` | **yes** | `raw/pages/index.html` |
| `product` | **yes — two distinct templates** | two template IDs across all 56 PDP captures (50 / 6) |
| `collection` | **yes** | both collection captures share `template--18814157029424` |
| `page` | **yes — two distinct templates** | default (3 pages) + contact variant (1 page) |
| `cart` | **assumed yes, not captured** | `/cart` is linked from every page and `raw/cart.js` responds; the cart is presented as a **drawer** (`shopify-section--cart-drawer` in the overlay group) so `/cart` may be a fallback only |
| `search` | **assumed yes, not captured** | `/search` linked 16×; `"predictiveSearch":true` |
| `blog` | **assumed yes, not captured** | `/blogs/news` in sitemap, zero inbound links |
| `article` | *not determinable from captured data* | no article URLs exist in any sitemap |
| `404` | *not determinable from captured data* | no 404 page was captured |
| `list-collections` | **no evidence** | `/collections` never appears as an href in any capture |
| `customers/*` (account) | **markup present** | `<shopify-account>` custom element renders twice in the header group of `raw/pages/index.html`, but no `/account` href is emitted |

### 3.2 Product-template split (important)

| Template | Products | Common trait |
|---|---:|---|
| `template--18814156767280` | 50 (all EDP/bundle SKUs) | eau de parfum + bundles, 30/50/100 ml, ≥ 400 EGP |
| `template--18814157291568` | 6 | `apple-pie`, `marshmallow`, `silk-vanilla`, `sweet-rum`, `vanilla-91` (body splashes, 120–125 ml) and `silk-vanilla-body-lotion` — all single-variant, 350–380 EGP |

The two templates differ in their Judge.me app section ID
(`__1759233522bc5ee263` vs `__17592376209d0d9349`) and in `--product-grid` values, but carry the
same four sections in the same order. A rebuild that ships one product template loses this split.

---

## 4. Section-group architecture

Prestige 11.1.0 uses three JSON section groups, wrapped in the DOM by
`<!-- BEGIN sections: <group> -->` / `<!-- END sections: <group> -->` comments. **All three
appear, in the same order, on all 8 captured page types and all 56 PDP captures.**

| Group | Group ID | Position | Sections (DOM order) | Section CSS class |
|---|---|---|---|---|
| `header-group` | `sections--18814157193264` | top of `<body>` | 1. `announcement_bar_6BNjyF`<br>2. `header` | `shopify-section--announcement-bar`<br>`shopify-section--header` |
| `overlay-group` | `sections--18814157258800` | immediately after header-group, before template content | 1. `cart-drawer`<br>2. `newsletter-popup`<br>3. `privacy-banner` | `shopify-section--cart-drawer`<br>`shopify-section--popup`<br>`shopify-section--privacy-banner` |
| *(template sections)* | `template--<id>` | middle | varies — see §5 | varies |
| `footer-group` | `sections--18814157226032` | bottom of `<body>` | 1. `text-with-icons`<br>2. `footer` | `shopify-section--text-with-icons`<br>`shopify-section--footer` |

Every section element also carries `shopify-section-group-<group>-group`, e.g.
`class="shopify-section shopify-section-group-header-group shopify-section--header"`.

### 4.1 Group content constants (identical on every page)

| Section | Rendered content |
|---|---|
| `announcement_bar_6BNjyF` | Single rotating item: "Explore your Persona. Free shipping orders over 1500". `<announcement-bar-carousel>` custom element. `--announcement-bar-is-sticky: 0`; font size `0.625rem` mobile → `0.6875rem` ≥ 999px |
| `header` | Logo "Siwa Fragrances" (image), 10-item primary nav, `<header-search>` + `<predictive-search>`, `<cart-dot>` cart link, `<header-sidebar>` mobile drawer, `<shopify-account>` ×2. `--header-is-sticky: 0`; `--header-logo-width: 80px` mobile → `110px` ≥ 700px; `--header-padding-block: 1rem` → `1.6rem` ≥ 700px |
| header grid | `< 1000px`: `"primary-nav logo secondary-nav" / minmax(0,1fr) auto minmax(0,1fr)`<br>`≥ 1000px`: `". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0,1fr) auto minmax(0,1fr)` (logo centred, nav on a second row) |
| `cart-drawer` | Heading "Cart", empty state "Your cart is empty" |
| `newsletter-popup` | "A Gift for Your First Siwa Order" / "Subscribe to our newsletter and receive 50 EGP off your first purchase with Siwa Fragrances" / E-mail field / CTA "Get My Discount" |
| `privacy-banner` | "🍪 Cookie policy" / cookie copy referencing the Privacy Policy / Accept + Decline |
| `text-with-icons` | 3-item carousel (`<text-with-icons-carousel disabled-on="sm" allow-swipe>`): 14 days return · support 24/7 · Payment Protection |
| `footer` | 2 link menus + newsletter block + 4 social icons + "© 2026 - Siwa Fragrances" + Shopify "powered by" link |

---

## 5. Per-template section stacks

### 5.1 Homepage — `template--18814156636208` (17 sections total)

Verified by parsing `id="shopify-section-…"` occurrences in DOM order from
`raw/pages/index.html`. Byte offsets confirm the order below.

| # | Group | Section ID (suffix) | Prestige section type | Rendered content | Outbound links |
|---:|---|---|---|---|---|
| 1 | header | `announcement_bar_6BNjyF` | announcement-bar | "Explore your Persona. Free shipping orders over 1500" | — |
| 2 | header | `header` | header | logo, 10-item nav, search, cart | 12 |
| 3 | overlay | `cart-drawer` | cart-drawer | empty-cart drawer | — |
| 4 | overlay | `newsletter-popup` | popup | 50 EGP first-order offer | — |
| 5 | overlay | `privacy-banner` | privacy-banner | cookie consent | — |
| 6 | template | `slideshow` | slideshow | "Summer Drops" / "THE SEASON HAS ARRIVED" / CTA "Shop All Summer Collection" | `/collections/summer-collection` |
| 7 | template | `featured_collections_EGrx3j` | featured-collections | Heading "new in"; 2 tabs `men` / `women` via `<carousel-navigation>` + `<featured-collections-carousel>`; **men panel = 7 cards**, **women panel = 8 cards** | `/collections/men-new-drops`, `/collections/women-new-drops`, 15 vendor anchors (13 distinct) |
| 8 | template | `image-with-text-overlay-1` | image-with-text-overlay | "OFFERS & DISCOUNTS" / "OUR BUNDLES" / CTA "Shop NOW" | `/collections/bundles` |
| 9 | template | `featured-collections-2` | featured-collections | Heading "BEST SELLERS"; tabs `men` / `WOMEN`; **men panel = 6 cards**, **women panel = 8 cards**; CTA "View ALL WOMEN BEST SELLERS" | `/collections/men-best-sellers`, `/collections/women-best-sellers`, 14 vendor anchors (11 distinct) |
| 10 | template | `17592337449e486738` | **apps** | Judge.me testimonials carousel — "Customers are saying / 4.98 ★ (1176) / Verified". Block ID `AdGJjWk43R1pNOVBuV__judge_me_reviews_testimonials_carousel_PDLRxp` | — |
| 11 | template | `scrolling-content-2` | scrolling-content | Marquee: "True Elegance" | — |
| 12 | template | `collection_list_gpXjxV` | collection-list | Heading "our collections"; 8 cards: for her, FOR Him, bundles, body lotion, unisex, original creation, best sellers, new drops | 8 collection links |
| 13 | template | `scrolling-content-1` | scrolling-content | Marquee: "Signature Luxury" | — |
| 14 | template | `media-grid` | media-grid | Heading "Uncover Hidden Gems"; 3 tiles: ORIGINAL CREATIONS / TRY NOW, BODY SPLASHES / SHOP NOW, body LOTION / SHOP NOW | `/collections/original-creations`, `/collections/body-splash`, `/collections/body-lotion` |
| 15 | template | `17765002303c384e0a` | **apps** | renders **empty** (171 bytes, no children) — an app block with no visible output | — |
| 16 | footer | `text-with-icons` | text-with-icons | 3 service promises | — |
| 17 | footer | `footer` | footer | menus, newsletter, socials, copyright | 14 |

Homepage section CSS variables worth capturing verbatim:

| Section | Declared variables |
|---|---|
| `featured_collections_EGrx3j` | `--product-list-items-per-row: 2` → `4` at ≥700px; `--product-list-horizontal-spacing-factor: 1`; `--product-list-vertical-spacing-factor: 1` |
| `collection_list_gpXjxV` | `--collection-list-item-size: 84vw` → `62vw` ≥700px → `unset` ≥1150px; `--collection-list-items-per-row: 2` ≥1150px; `--collection-list-gap: 1.5rem` → `1.875rem` ≥1150px |
| `media-grid` | `--media-grid-row-height: 180px` → `290px` ≥700px; `--media-grid-gap: 0.5rem` → `0.75rem` ≥1150px |

Homepage products surfaced (unique handles, in DOM order):
`lost-on-you, mango-on-woods, aurableu, mango-pineapple, summer-holidays, bleu-exclusive,
insane-pineapple, sundaze, pink-arrogance, pink-allure, coco-woods, luna-di-roma, libre-desire,
vanilla-91` (new in) and `mawj, lady-killer, drunk-gold, lagoon-flair, marasi, bleu-exclusive,
layering-vanilla, hibiscusex, boujee-blush, pink-arrogance, irresistible-vanilla,
layering-pistachio, silk-vanilla, vanilla-91` (best sellers) — **25 distinct products of 56**.

### 5.2 PDP — `template--18814156767280` (11 sections)

Verified against `raw/pages/pdp_sample.html` (`/products/sundaze`) and 25 further PDP captures;
all 26 produce an identical section signature.

| # | Group | Section ID (suffix) | Prestige section type | Notes |
|---:|---|---|---|---|
| 1 | header | `announcement_bar_6BNjyF` | announcement-bar | shared |
| 2 | header | `header` | header | shared |
| 3 | overlay | `cart-drawer` | cart-drawer | shared |
| 4 | overlay | `newsletter-popup` | popup | shared |
| 5 | overlay | `privacy-banner` | privacy-banner | shared |
| 6 | template | `main` | **main-product** | ~30 KB. Grid `--product-grid`: mobile `"product-gallery" "product-info" "product-content"`; ≥1000px `"product-gallery product-info" auto "product-content product-info" / minmax(0,0.65fr) minmax(0,0.35fr)` |
| 7 | template | `1759233522bc5ee263` | **apps** | Judge.me review widget — "Customer Reviews", rating histogram, "Write a review" |
| 8 | template | `related-products` | related-products | **renders empty** (252 bytes) — populated client-side / via Section Rendering API |
| 9 | template | `recently_viewed_products_LGtyH6` | recently-viewed-products | **renders empty**; section self-hides via `:has(recently-viewed-products:empty){display:none}` |
| 10 | footer | `text-with-icons` | text-with-icons | shared |
| 11 | footer | `footer` | footer | shared |

`main-product` block order inside `.product-info__block-list` (13 desktop items + 9 in the mobile
sticky buy bar), read from `raw/pages/pdp_sample.html`:

| Order | Block | Rendered value on `/products/sundaze` |
|---:|---|---|
| 1 | title | "Sundaze" |
| 2 | price | "Sale price LE 500.00" |
| 3 | vendor | "Power Of You Giorgio Armani" (the inspired-by reference) |
| 4 | variant picker | `Size:` — 30 ml / 50 ml / 100 ml with inline prices "30 ml - LE 500.00" etc. |
| 5 | size-chart trigger | "Size chart" → `/pages/size-chart-1` |
| 6 | quantity selector | Decrease / Increase |
| 7 | inventory | "Only a few units left" |
| 8 | buy buttons | "Add to cart" |
| 9 | description | `THE VIBE` → paragraph → blockquote → `FRAGRANCE PROFILE` → `PERFORMANCE & WEAR` |
| 10 | Judge.me preview badge | block `AU0o0d2txTFZPR05IW__judge_me_reviews_preview_badge_tkKyYf` ("No reviews") |
| 11–13 | sticky buy bar | title + price + "Add to cart" repeated, plus a second Judge.me badge instance (`…tkKyYf-1`) |

Absent from the PDP: breadcrumb markup (`breadcrumb` class count = 0 — breadcrumbs exist only as
JSON-LD), accordions, share buttons, store pickup. `payment-terms` markup is present (8 hits).

PDP JSON-LD (`raw/pages/pdp_sample.html`):
- `ProductGroup` with `@id: /products/sundaze#product`, `category: "Eaux de Parfum"`,
  `brand.name: "Power Of You Giorgio Armani"`, `productGroupID`, and 3 `hasVariant` `Product`
  entries each with `offers.price`, `priceCurrency: "EGP"`, `availability`, and a
  `?variant=<id>` URL.
- `BreadcrumbList` with 2 levels only: Home → product. **No collection level.**

### 5.3 PDP — `template--18814157291568` (11 sections)

Identical structure, different section IDs. Verified against `raw/products/silk-vanilla.html`.

| # | Group | Section ID (suffix) | Type |
|---:|---|---|---|
| 6 | template | `main` | main-product |
| 7 | template | `17592376209d0d9349` | apps (Judge.me review widget) |
| 8 | template | `related-products` | related-products |
| 9 | template | `recently_viewed_products_LGtyH6` | recently-viewed-products |

Observable differences on this template: the gallery renders a **multi-image carousel**
("Go to item 1 / 2 / 3") whereas template A's sample rendered a single image; the vendor block
prints **above** the title; and there is no size-chart trigger.

### 5.4 Collection page — `template--18814157029424` (9 sections)

Identical signature for `/collections/all` and `/collections/best-sellers`.

| # | Group | Section ID (suffix) | Type |
|---:|---|---|---|
| 1–2 | header | `announcement_bar_6BNjyF`, `header` | shared |
| 3–5 | overlay | `cart-drawer`, `newsletter-popup`, `privacy-banner` | shared |
| 6 | template | `main` | **main-collection** |
| 7–8 | footer | `text-with-icons`, `footer` | shared |

`main-collection` behaviour, read from `raw/pages/collections_all.html`:

| Feature | Value |
|---|---|
| Products per page | **18** (`/collections/all` = 56 products over 4 pages; page links `?page=2,3,4`, `aria-label="Go to page N"`) |
| Product count label | "56 products" / "18 products" rendered in the toolbar |
| Sidebar filters | `filter.v.availability`, `filter.v.price.gte`, `filter.v.price.lte` — **availability + price only**, no tag/vendor/option facets |
| Filter label | "Filter by" |
| Sort options (9) | Featured, Most relevant, Best selling, Alphabetically A-Z, Alphabetically Z-A, Price low→high, Price high→low, Date old→new, **Date new→old (default/current)** |
| Layout switch | `<collection-layout-switch device="mobile">` present |
| Grid — `--collection-items-per-row-compact` | 4 (≥700px), 4 (≥1000px), **6** (≥1400px) |
| Grid — `--collection-items-per-row-medium` | 2 (base), 3 (≥700px), 3 (≥1000px), 4 (≥1400px) |
| Grid — `--collection-items-per-row-large` | 1 (base), 2 (≥700px), 2 (≥1000px), 3 (≥1400px) |
| Grid template ≥1000px | `--collection-grid-template: var(--collection-sidebar-width, 0) minmax(0,1fr)` (sidebar + grid) |
| Override | `.product-list { --product-list-max-items-per-row-allowed: 99 !important; }` |
| JSON-LD | `BreadcrumbList` only |
| Collection banner / description | none rendered — all 19 collections have an empty `description` in `raw/collections.json` |

### 5.5 Content pages

| Template | Pages | Sections (DOM order) |
|---|---|---|
| `template--18814156701744` | `/pages/about-us`, `/pages/our-story`, `/pages/our-comitments` | header-group ×2 → overlay-group ×3 → `slideshow_6aQJg6` (page hero) → `main` (**main-page**) → footer-group ×2 = **9 sections** |
| `template--18814156668976` | `/pages/contact` | header-group ×2 → overlay-group ×3 → `slideshow_jf4Rh7` (page hero) → `contact-form` → `rich_text_GFEiqV` → footer-group ×2 = **10 sections** |

The contact template's `rich_text` section holds the store's only address/phone content:
heading "contact us", then "WhatsApp us for any inquiries +201066250757" and
"Store location: Cairo, Nasr City, The Garden Kiosk Three".
The `contact-form` section renders Name / E-mail / Message + "Send message".

Note that all three default `page` template pages share **one** template, so a hero slideshow is
forced onto every page. `/pages/size-chart-1` was not captured; its template is
*not determinable from captured data*.

---

## 6. Navigation trees

### 6.1 Header menu ("Main menu") — 10 links, flat

Extracted from the `header-group` region of `raw/pages/index.html`. Every item is a
`class="block h6"` anchor; **there are zero dropdowns, mega-menus or `<details>` elements**
(`mega-menu`, `dropdown`, `navigation-menu` all count 0 in the header markup).

| # | Label | URL | Target type |
|---:|---|---|---|
| 1 | HOME | `/` | index |
| 2 | SHOP ALL | `/collections/all` | collection (built-in) |
| 3 | ORIGINAL CREATIONS | `/collections/original-creations` | collection |
| 4 | FOR HIM | `/collections/for-him` | collection |
| 5 | FOR HER | `/collections/for-her` | collection |
| 6 | UNISEX | `/collections/unisex` | collection |
| 7 | BUNDLES | `/collections/bundles` | collection |
| 8 | BODY SPLASH | `/collections/body-splash` | collection |
| 9 | BODY LOTION | `/collections/body-lotion` | collection |
| 10 | CONTACT US | `/pages/contact` | page |

Plus two utility affordances outside the menu: **Search** → `/search` and **Cart** → `/cart`.
Logo anchor: "Siwa Fragrances" → `/`.

### 6.2 Mobile menu — `<header-sidebar>` drawer

The mobile drawer re-renders the **same 10 links in the same order**, differing only in class
(`header-sidebar__linklist-button h6` instead of `block h6`). `<header-sidebar-collapsible-panel>`
is present in the markup but no nested items are emitted, confirming a single-level menu.

| # | Label | URL |
|---:|---|---|
| 1–10 | HOME, SHOP ALL, ORIGINAL CREATIONS, FOR HIM, FOR HER, UNISEX, BUNDLES, BODY SPLASH, BODY LOTION, CONTACT US | identical to §6.1 |

**There is no separate mobile menu object** — one Shopify linklist drives both.

### 6.3 Footer menus

Three footer blocks, read from the `footer-group` region of `raw/pages/index.html`.

**Block 1 — heading "Main menu" (10 links, a duplicate of the header menu):**

| # | Label | URL |
|---:|---|---|
| 1–10 | HOME, SHOP ALL, ORIGINAL CREATIONS, FOR HIM, FOR HER, UNISEX, BUNDLES, BODY SPLASH, BODY LOTION, CONTACT US | identical to §6.1 |

**Block 2 — heading "MORE INFORMATION" (4 links):**

| # | Label | URL |
|---:|---|---|
| 1 | SEARCH | `/search` |
| 2 | REFUND POLICY | `/policies/refund-policy` |
| 3 | ABOUT US | `/pages/about-us` |
| 4 | PRIVACY POLICY | `/policies/privacy-policy` |

**Block 3 — heading "Newsletter":** copy "Sign up to our newsletter to receive exclusive
offers.", an "E-mail" field and a "Subscribe" button.

**Social row (4 icon links, no visible label):**

| Platform | URL |
|---|---|
| Facebook | `https://www.facebook.com/share/1AYNy8M7mJ/?mibextid=wwXIfr` |
| Instagram | `https://www.instagram.com/siwafragrances?igsh=MXE0anh6NXlnYzFmaw==` |
| TikTok | `https://www.tiktok.com/@siwafragrances?_t=ZS-8zhBvV3DKCe&_r=1` |
| WhatsApp | `https://api.whatsapp.com/message/VLSFRC5URF6EP1?autoload=1&app_absent=0` |

Footer also renders `© 2026 - Siwa Fragrances` and a Shopify attribution link
(`https://www.shopify.com?utm_campaign=poweredby&utm_medium=shopify&utm_source=onlinestore`).
Section-scoped style: `#shopify-section-sections--18814157226032__footer { --footer-content-justify-items: space-between; }`.

### 6.4 Navigation coverage gaps

| Destination | In header | In footer | On homepage body | Reachable at all? |
|---|---|---|---|---|
| `/pages/our-story` | no | no | no | sitemap only |
| `/pages/our-comitments` | no | no | no | sitemap only |
| `/pages/size-chart-1` | no | no | no | PDP modal only |
| `/blogs/news` | no | no | no | sitemap only |
| `/collections/perfumes` (82) | no | no | no | sitemap only |
| `/collections/siwa-perfumes` (51) | no | no | no | sitemap only |
| `/collections/ramadan-drops` (6) | no | no | no | sitemap only |
| `/collections/gift-boxes` (1) | no | no | no | sitemap only |
| `/collections/black-friday-2025` (0) | no | no | no | sitemap only |
| `/collections/best-sellers` (24) | no | no | **yes** (collection-list card) | homepage only |
| `/collections/new-drops` (30) | no | no | **yes** (collection-list card) | homepage only |
| `/collections/summer-collection` (21) | no | no | **yes** (slideshow CTA) | homepage only |
| `/collections/men-…`, `/collections/women-…` (4) | no | no | **yes** (featured-collections tab CTAs) | homepage only |

**9 of 19 collections and 3 of 5 pages plus the blog have no menu entry anywhere.**

---

## 7. URL patterns & handle conventions

| Entity | Pattern | Notes |
|---|---|---|
| Product | `/products/<handle>` | Never collection-scoped — a grep for `/collections/<x>/products/<y>` across all captures returned **zero** hits. Canonical is always `https://siwafragrances.com/products/<handle>` |
| Product variant | `/products/<handle>?variant=<variant_id>` | Emitted only in JSON-LD `hasVariant[].offers.url` |
| Collection | `/collections/<handle>` | Filters append `?filter.v.availability=…`, `?filter.v.price.gte=…`, `?filter.v.price.lte=…`; paging appends `?page=N`; sorting appends `?sort_by=…` |
| Vendor listing | `/collections/vendors?q=<URL-encoded vendor>` | Auto-generated by Shopify; because `vendor` holds designer names, these read e.g. `/collections/vendors?q=Bleu%20De%20Chanel%20L%E2%80%99exclusif` |
| Page | `/pages/<handle>` | |
| Policy | `/policies/<handle>` | Only `refund-policy` and `privacy-policy` linked |
| Blog | `/blogs/news` | No articles |
| Search | `/search` | Predictive search enabled |
| Cart | `/cart` (drawer is primary UI) | |

### 7.1 Handle conventions

- All 56 product handles are lowercase, hyphen-separated ASCII; none contain digits except
  `vanilla-91` and `layering-30-ml-bundle`.
- **55 of 56 product handles are the exact slugified title.** The one divergence:

| Handle | Title | Slug of title |
|---|---|---|
| `layering-30-ml-bundle` | Layering bundle | `layering-bundle` |

- Two of 19 collection handles diverge from their titles:

| Handle | Title | Slug of title |
|---|---|---|
| `black-friday-2025` | Black Friday Offer | `black-friday-offer` |
| `siwa-perfumes` | siwa fragrances | `siwa-fragrances` |

- Title casing in the catalog is inconsistent and will surface anywhere titles are printed
  raw: `Lady killer`, `Iris elixir`, `Mango on woods`, `Caramel vanigliato`, `summer elegance`
  (lowercase initial). Collection titles mix `BEST SELLERS`, `Body lotion`, `new drops`,
  `siwa fragrances` — the theme normalises them with `--product-card-text-transform: uppercase`
  and `--heading-text-transform: uppercase`, which masks the inconsistency on the storefront but
  not in the Admin, in emails, or in structured data.

---

## 8. Anomalies and structural risks

| # | Anomaly | Evidence | Consequence for a rebuild |
|---:|---|---|---|
| 1 | **Page handle `our-comitments` is misspelled** ("comitments"), and the rendered H1 repeats the typo as "OUR COMITMENTS" | `raw/sitemap_pages_1.xml`, `raw/pages/pages_our-comitments.html` | Fix the handle + H1 and 301 the old URL; it is currently orphaned so link risk is nil |
| 2 | **Two product templates** with different Judge.me app section IDs | all 56 PDP captures (50 default / 6 body-splash) | Must be recreated as two `product.*.json` templates and reassigned per product |
| 3 | **Two page templates** — the contact page is a distinct template with `contact-form` + `rich_text` | `raw/pages/pages_contact.html` vs the other three page captures | Recreate `page.contact.json` separately |
| 4 | Product option name typo **`Layerng Pistachio`** and 8 inconsistent option names (`size` ×44, `Size` ×9) | `raw/products.json` | Variant/swatch logic will need normalisation |
| 5 | Collection `products_count` values exceed the published catalog (`for-him` 83, `perfumes` 82, `for-her` 80 vs 56 published) and `/collections/best-sellers` renders 18 against an admin count of 24 | `raw/collections.json` vs `raw/pages/collections_best-sellers.html` | Never render `products_count`; use `collection.products_count` from the live storefront object instead |
| 6 | `related-products` and `recently-viewed-products` sections render **empty HTML** on every PDP | all 56 PDP captures | They are populated client-side; a rebuild must keep the JS/Section-Rendering wiring, not just the Liquid |
| 7 | One homepage `apps` section (`17765002303c384e0a`) renders **171 bytes with no children** | `raw/pages/index.html` | A dead/misconfigured app block — drop it |
| 8 | **No breadcrumb UI** anywhere; breadcrumbs exist only as JSON-LD, and the PDP breadcrumb is 2-level (Home → Product) with no collection tier | `raw/pages/pdp_sample.html` | Adding a visible breadcrumb is a free UX/SEO win |
| 9 | Collection filtering is **availability + price only** — no tag, vendor, size or gender facets, despite 6 tags and a single `size` option | `raw/pages/collections_all.html` (`filter.v.*` names) | Enabling tag/option facets is the highest-leverage collection improvement |
| 10 | All 19 collections have an **empty `description`** | `raw/collections.json` | No collection banner copy to port; SEO gap |
| 11 | `/blogs/news` exists in the sitemap with **zero articles and zero inbound links** | `raw/sitemap_blogs_1.xml` + grep across all captures | Either populate or unpublish |
| 12 | An `/agents.md` file is declared in `sitemap_agentic_discovery.xml` but never linked | `raw/sitemap_agentic_discovery.xml` | Preserve or intentionally drop during migration |
| 13 | `<shopify-account>` renders in the header but **no `/account` link is emitted** | `raw/pages/index.html` | Customer accounts appear to be off or hidden; confirm before rebuilding account templates |
| 14 | ~~24 of 56 PDP captures are Cloudflare interstitials~~ — **resolved**: all 24 were re-fetched, the capture set is now **56/56 valid PDPs** | `raw/products/*.html` | Per-PDP DOM claims in this document now cover the whole catalog; only the stale `raw/products/*.js.json` files remain unrecovered, and `raw/products.json` supersedes them |
