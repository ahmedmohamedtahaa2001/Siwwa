# 00 — BRAND & PLATFORM OVERVIEW

**Reference:** https://siwafragrances.com/
**Audit date:** 2026-07-27
**Evidence base:** `raw/` capture set (manifest in `README.md` → Raw corpus)

Every figure in this document traces to a named raw file. Where the captured data does not
support a claim, it is marked *not determinable from captured data*.

> **Data corrections (applied):** all review figures in this document were **re-derived after
> recovering the 24 PDP captures that the first pass returned as Cloudflare interstitials**.
> The capture set is now 56/56 valid PDPs. Review counts, averages and reviewed-product totals
> below are the corrected figures — see `_CORRECTIONS.md` and `raw/reviews_complete.json`.
> Any earlier figure ("344 reviews", "4.986 ★", "31 of 56 products") is superseded.

---

## 1. Brand identity

### 1.1 Verbatim positioning copy

Extracted from the rendered `<main>` of the three content pages (HTML stripped with python).

| Source | Copy |
|---|---|
| `raw/pages/pages_about-us.html` (H1) | ABOUT US |
| `raw/pages/pages_about-us.html` | "Siwa Fragrances is an esteemed Egyptian maison, weaving heritage and identity into every bottle. We exist to elevate your daily ritual with scents that are both a personal signature and a profound connection to culture, all while embracing unparalleled comfort." |
| `raw/pages/pages_about-us.html` | "Our pledge is to redefine luxury, making it authentically Egyptian and accessible. By fusing masterful craftsmanship with exceptional value, we earn your trust—proving local quality rivals the world's best." |
| `raw/pages/pages_about-us.html` (3 pillar labels) | "Exquisite Ingredients" / "Inclusive Pricing" / "Personalized Service" |
| `raw/pages/pages_our-story.html` (H1) | OUR STORY |
| `raw/pages/pages_our-story.html` | "Producing high quality niche perfumes which suit different tastes" |
| `raw/pages/pages_our-story.html` | "Siwa.. A breathtaking Egyptian oasis of impressive beauty where golden sands, shining sun eye and crystal salty lakes.." |
| `raw/pages/pages_our-story.html` | "A distinctive bouquet of high-quality and carefully selected perfumes specially presented for you inspired by the beauty and charm of Siwa Oasis.. Made in Egypt according to standards and international requirements" |
| `raw/pages/pages_our-comitments.html` (H1) | OUR COMITMENTS *(sic — typo is in the live page title and the handle)* |
| `raw/pages/pages_our-comitments.html` | "At Siwa Fragrances, our promise is built on three pillars:" |
| `raw/pages/pages_our-comitments.html` | "**Uncompromised Quality:** We craft luxurious, long-lasting scents using the world's finest ingredients, ensuring sophistication in every bottle." |
| `raw/pages/pages_our-comitments.html` | "**Honest Value:** We believe luxury should be accessible. By focusing on the juice, not the hype, we deliver exceptional quality at revolutionary prices." |
| `raw/pages/pages_our-comitments.html` | "**Egyptian Excellence:** We are dedicated to reshaping the landscape of local luxury, building trust by proving Egyptian craftsmanship can rival the world's best." |
| `raw/pages/pages_our-comitments.html` (closing CTA) | "Join us in redefining luxury." |
| `raw/pages/index.html` — announcement bar | "Explore your Persona. Free shipping orders over 1500" |
| `raw/pages/index.html` — newsletter popup | "A Gift for Your First Siwa Order" / "Subscribe to our newsletter and receive 50 EGP off your first purchase with Siwa Fragrances" |
| `raw/pages/index.html` — slideshow | "Summer Drops" / "THE SEASON HAS ARRIVED" / CTA "Shop All Summer Collection" |
| `raw/pages/index.html` — scrolling marquees | "Signature Luxury" and "True Elegance" |
| `raw/pages/index.html` — footer legal line | "© 2026 - Siwa Fragrances" |

### 1.2 Brand summary

Siwa Fragrances is an **Egyptian perfume house** named after the Siwa Oasis, selling
**eau de parfum** (30 / 50 / 100 ml), **body splash** (120–125 ml), **body lotion** and
**multi-bottle bundles**, exclusively into Egypt in EGP. The stated positioning triangle is
*Egyptian identity + niche-perfume quality + accessible price* ("By focusing on the juice, not
the hype"). The PDP JSON-LD assigns `"category": "Eaux de Parfum"` (`raw/pages/pdp_sample.html`).

Registered store address per `raw/meta.json`: **New Cairo, Cairo, EG**. Physical retail point
per `raw/pages/pages_contact.html`: **"Cairo, Nasr City, The Garden Kiosk Three"**.

---

## 2. The business model: an "inspired-by" / dupe fragrance house

### 2.1 The evidence

Shopify's `vendor` field is **not** used for a brand name. In `raw/products.json` it stores the
**designer fragrance each product clones**. This is verifiable three ways:

| Evidence | Source | Detail |
|---|---|---|
| Raw catalog field | `raw/products.json` | `"vendor": "Power Of You Giorgio Armani"` on product `sundaze` |
| Rendered product card | `raw/pages/index.html` | Vendor is printed above the product title and hyperlinked to `/collections/vendors?q=Power%20Of%20You%20Giorgio%20Armani` |
| Structured data leak | `raw/pages/pdp_sample.html` JSON-LD | `"brand": { "@type": "Brand", "name": "Power Of You Giorgio Armani" }` — the designer house is emitted to search engines as the product's brand |
| Body copy | `raw/products.json` → `sundaze.body_html` | `<blockquote>` "If you love *Armani Power of You*, this is your scent." |

**42 distinct vendor values across 56 products. Only 16 products (28.6%) carry a Siwa-owned
vendor value; the other 40 (71.4%) are named after a third-party designer fragrance.**

### 2.2 Vendor field distribution

| Vendor value | Products | Titles |
|---|---:|---|
| Siwa Fragrances | 10 | Apple Pie, Layering bundle, Marshmallow, Marshmallow Bundle, Mawj, Silk Vanilla, Silk Vanilla Body Lotion, Sweet Rum, Vanilla 91, Vanilla Bundle |
| Siwa original creation | 6 | Chocolate Creme, Coffee Vanilla, Gourmet, Irresistible Vanilla, Pink Allure, Pink Arrogance |
| 40 Knots Xerjoff | 1 | Marasi |
| Althaïr Parfums de Marly | 1 | Hot Vanilla |
| Angels' Share Paradis | 1 | Drunk Gold |
| Bianco Latte Giardini Di Toscana | 1 | Caramel vanigliato |
| Bleu De Chanel L'exclusif | 1 | Bleu Exclusive |
| Bleu De Chanel Parfum | 1 | Bleu Intense |
| Delina La Rosée Parfums de Marly | 1 | Alluring Rose |
| Eden Juicy Apple kayali | 1 | Layering Apple |
| Eden Sparkling Lychee 39 Kayali | 1 | Layering Lychee |
| God of Fire Stéphane Humbert | 1 | Mango on woods |
| Goddess Burberry | 1 | Bare Glow |
| Grand Soir MFK | 1 | Soiree |
| Guidance Amouage | 1 | Siwa Trail |
| Hibiscus Mahajád | 1 | Hibiscusex |
| Il Padrino Sospiro | 1 | Absolute Drunk |
| Imagination LV | 1 | summer elegance |
| Kayali Boujee Marshmallow | 1 | Boujee Blush |
| La Belle Le Parfum | 1 | Belle Riche |
| Layton PDM | 1 | Lady killer |
| Le Beau Le Parfum | 1 | Lagoon Flair |
| Le Male Elixir JPG | 1 | Male Elixir |
| Lost In Paris Roja | 1 | Lost On You |
| LV Afternoon Swim | 1 | Summer Holidays |
| Narciso Poudree | 1 | Soul Poudree |
| Nishane Hacivat | 1 | Insane Pineapple |
| Oud Cadenza MC | 1 | Sweet Oud |
| Pacific Chill Louis Vuitton | 1 | Pacific Elixir |
| Power Of You Giorgio Armani | 1 | Sundaze |
| Prada L'Homme Intense | 1 | Iris elixir |
| Side Effect Initio | 1 | Carnal Trail |
| Stellar Times Louis Vuitton | 1 | Stellar Nights |
| Summer Hammer | 1 | Mango Pineapple |
| Symphony LV | 1 | Aurableu |
| Tygar Bvlgari | 1 | Citrine |
| Valentino Donna Born In Roma Intense | 1 | Luna Di Roma |
| Vanilla 28 Kayali | 1 | Layering Vanilla |
| Vanilla Powder Matiere Premiere | 1 | Coco Woods |
| You Intensely Giorgio Armani | 1 | Hot Male |
| YSL Libre intense | 1 | Libre Desire |
| Yum Pistachio Gelato Kayali | 1 | Layering Pistachio |

### 2.3 Model implications

- The catalog is split into an **"inspired-by" line** (40 SKUs, named after Chanel / LV / PDM /
  Kayali / Xerjoff / Amouage / Roja etc.) and an **"Original Creations" line** (16 SKUs,
  surfaced through `/collections/original-creations`, 8 products in that collection).
- Because the vendor field carries the clone reference, Shopify's automatic vendor
  infrastructure (`/collections/vendors?q=`) becomes a **designer-name index** — every product
  card on the homepage links to one. In `raw/pages/index.html` these appear as live hrefs, e.g.
  `/collections/vendors?q=Bleu%20De%20Chanel%20L%E2%80%99exclusif`.
- Price positioning is the model's core: **350 – 2,300 EGP** (`raw/products.json`), i.e. an
  entry 30 ml at 375–850 EGP against designer originals.

---

## 3. Tech stack

| Layer | Value | Source |
|---|---|---|
| Commerce platform | Shopify | `powered-by: Shopify` response header; `Shopify.shop` global in `raw/pages/index.html` |
| Store handle | `3c3u3n-qt.myshopify.com` | `raw/meta.json`, `Shopify.shop` in `raw/pages/index.html` |
| Shop ID | `64895778864` | `raw/meta.json`; `<meta id="shopify-digital-wallet" content="/64895778864/digital_wallets/dialog">` |
| Primary domain | `siwafragrances.com` | `raw/meta.json`, `<link rel="canonical">` |
| Theme | **Prestige**, schema version **11.1.0** | `Shopify.theme = {"name":"Updated copy of Prestige","id":141667663920,"schema_name":"Prestige","schema_version":"11.1.0","theme_store_id":855,"role":"main"}` in `raw/pages/index.html` |
| Theme Store ID | `855` | same |
| Live theme ID | `141667663920` | same |
| Admin theme name | "Updated copy of Prestige" (role `main`) | same |
| Theme asset path | `/cdn/shop/t/4/assets/theme.css?v=41905930618406843701784986633` | `<link rel="stylesheet">` in `raw/pages/index.html` — `t/4` = 4th theme slot |
| Locale | `en` (single) | `Shopify.locale = "en"`; `<html lang="en" dir="ltr">`; no `localization` form anywhere in captures |
| Currency | `EGP`, rate 1.0 | `Shopify.currency = {"active":"EGP","rate":"1.0"}`; `raw/cart.js` `"currency":"EGP"` |
| Money format | `LE {{amount}}` | `raw/meta.json` |
| Market / country | `EG` | `Shopify.country = "EG"`; `raw/meta.json` `"ships_to_countries":["EG"]` |
| Country / currency selector | **none rendered** | zero `localization` occurrences in `raw/pages/index.html` |
| Fonts | Poppins (heading + body), self-hosted woff2 preloaded | `<link rel="preload" href="//siwafragrances.com/cdn/fonts/poppins/poppins_n4.0ba78fa5af9b0e1a374041b3ceaadf0a43b41362.woff2">` |
| Font CDN | `fonts.shopifycdn.com` (preconnect) | `raw/pages/index.html` |
| Asset CDN | `cdn.shopify.com` + `siwafragrances.com/cdn/` | `raw/pages/index.html` |
| Edge / hosting | Cloudflare (FRA/DE node) | response headers; corroborated by 24 PDP captures returning a Cloudflare "Verifying your connection" interstitial on the first pass — all 24 were subsequently recovered, see §7 |
| Analytics | Shopify `trekkie` + `monorail-edge.shopifysvc.com` | `raw/pages/index.html` |
| Meta/Facebook | domain verification token `j2tfez3u6oja74fp8o19gjz5s9s4wt` | `<meta name="facebook-domain-verification">` |
| Predictive search | enabled (`"predictiveSearch":true`) | `raw/pages/index.html` |
| Cart mode | **drawer** (`shopify-section--cart-drawer` in overlay group) | `raw/pages/index.html` |

### 3.1 Apps (theme app extensions)

| App | Extension handle | Extension UUID | Blocks observed |
|---|---|---|---|
| **Judge.me Reviews** | `judgeme-657` | `019fa440-b46f-7094-9ecf-aac8c6e13872` | Homepage testimonials carousel block `AdGJjWk43R1pNOVBuV__judge_me_reviews_testimonials_carousel_PDLRxp`; PDP review widget section; PDP preview badge block `AU0o0d2txTFZPR05IW__judge_me_reviews_preview_badge_tkKyYf` (rendered twice — main + sticky bar) |
| **Shopify Inbox** | `shopify-inbox-1295` | `019fa465-9654-78e7-9e8e-b0ba9d2963a7` | chat launcher |

Judge.me hosts referenced from `raw/pages/index.html`: `cdn.judge.me`, `cdn1.judge.me`,
`cdn2.judge.me`, `api.judge.me`, `app.judge.me`, `cdnwidget.judge.me`. Stylesheets loaded:
`judgeme-657/assets/shopify_v2.css` and `judgeme-657/assets/carousels.css`.

No other third-party app blocks, pixels, or scripts appear in any captured page.

### 3.2 Payments

| Item | Finding | Source |
|---|---|---|
| Shop Pay Installments | **disabled** (`"offers_shop_pay_installments": false`) | `raw/meta.json` |
| Accepted card brands (digital wallet) | **empty array** (`"shopify_pay_enabled_card_brands": []`) | `raw/meta.json` |
| Payment icons in footer | **none rendered** | `raw/pages/index.html` footer section — zero `payment` class hits |
| Payment terms markup on PDP | present (Prestige `payment-terms` container, 8 hits) | `raw/pages/pdp_sample.html` |
| Actual gateways (COD, card, wallet) | *not determinable from captured data* — checkout was not captured | — |

Trust messaging instead of icons: the `text-with-icons` footer section states *"Payment
Protection — Your payment details are encrypted and secure."*

---

## 4. Store vitals

| Metric | Value | Source |
|---|---:|---|
| Published products | **56** | `raw/meta.json` `published_products_count`; `raw/products.json` (56 objects); `raw/handles.txt` (56 lines); `/collections/all` renders "56 products" |
| Total variants | **158** | `raw/products.json` (sum of `variants[]`) |
| Published collections | **19** | `raw/meta.json` `published_collections_count`; `raw/collections.json`; `raw/sitemap_collections_1.xml` (19 `<url>`) |
| Pages | **5** | `raw/sitemap_pages_1.xml` |
| Blogs | **1** (`/blogs/news`) | `raw/sitemap_blogs_1.xml` |
| Blog articles | **0 in sitemap** (only the blog index is listed) | `raw/sitemap_blogs_1.xml` |
| Product images | **65** total, avg **1.16** per product | `raw/products.json` `images[]` |
| Distinct vendor values | **42** | `raw/products.json` |
| Distinct tags | **6** | `raw/products.json` |
| Distinct product types | **2** — 55 blank + 1 `body lotion` | `raw/products.json` |
| Shop-wide reviews | **1,176 @ 4.98 ★** | Judge.me `data-shop-review-count="1176"` / `data-shop-average-rating="4.98"` — identical on all 56 PDPs and the homepage carousel |
| Reviews attributable to the 56 published products | **820** across **54** of 56 products | `raw/reviews_complete.json` (sum of per-product `data-number-of-reviews`) |
| Weighted average of those 820 | **4.9807 ★** | computed from `raw/reviews_complete.json` |
| Products with zero reviews | **2** — `soiree`, `sundaze` | `raw/reviews_complete.json` |
| Unattributed review gap | **356** (1,176 − 820) | corroborates the unpublished/deleted-inventory finding in §8, point 6 |
| Variant price range | **350 – 2,300 EGP** | `raw/products.json` |
| Median variant price | **925 EGP** | computed over all 158 variants |
| Cheapest product | `silk-vanilla-body-lotion` @ 350 EGP | `raw/products.json` |
| Most expensive single variant | `coco-woods` 100 ml @ 2,300 EGP | `raw/products.json` |
| Fully sold-out products | **10** | `raw/products.json` — `siwa-trail`, `lost-on-you`, `absolute-drunk`, `bleu-intense`, `silk-vanilla-body-lotion`, `vanilla-bundle`, `sweet-oud`, `iris-elixir`, `citrine`, `alluring-rose` |
| Products displaying a sale price | **4** | `raw/products.json` — only `belle-riche`, `vanilla-bundle`, `marshmallow-bundle`, `layering-30-ml-bundle` have `compare_at_price > price` |
| Cart state at capture | empty, token `cc5246946d7b885c986e45a7a842b1d6` | `raw/cart.js` |

### 4.1 Tag distribution

| Tag | Products |
|---|---:|
| Men | 28 |
| Women | 25 |
| Best Selling | 23 |
| new | 9 |
| Unisex | 4 |
| Bundles | 3 |
| *(no tags at all)* | 16 |

### 4.2 Variant / option shape

| Fact | Value | Source |
|---|---|---|
| Products with 1 option | 53 | `raw/products.json` |
| Products with 2 options | 1 (`marshmallow-bundle`) | same |
| Products with 3 options | 2 (`vanilla-bundle`, `layering-30-ml-bundle`) | same |
| Option name `size` (lowercase) | 44 | same |
| Option name `Size` (capitalised) | 9 | same |
| One-off option names | `silk vanilla (size)`, `Silk Vanilla Body Lotion ( size )`, `layering vanilla (size)`, `Layering Vanilla (size)`, `Marshmallow (size)`, `Boujee Blush (size)`, `Layering Lychee`, `Layerng Pistachio` *(typo)* | same |
| Option values (spacing inconsistent) | `50 ml` ×47, `30 ml` ×44, `100 ml` ×44, `125ML` ×6, `50ML` ×5, `30ML` ×4, `100ML` ×2, `120ML` ×1, `120 ml` ×1, `125ml` ×1, `100` ×1 | same |

### 4.3 Product description shape (correction to prior assumption)

The original audit brief's note that all `body_html` follows a
`THE VIBE → blockquote → FRAGRANCE PROFILE` template is **not supported by `raw/products.json`**.
Measured across all 56 `body_html` values:

| Marker | Products containing it |
|---|---:|
| `THE VIBE` | 1 (`sundaze`) |
| `FRAGRANCE PROFILE` | 1 (`sundaze`) |
| `Main Accords` | 1 (`sundaze`) |
| `<blockquote>` | 1 (`sundaze`) |
| `<h4>` | 1 (`sundaze`) |
| `<ul>` / `<li>` | 3 |
| `Persona` | 5 |
| `Longevity` | 2 |
| `<p>` | 56 (all) |

The dominant real pattern is a short free-text block: title line → accord keywords → a
"Notes:" paragraph (e.g. `boujee-blush`: *"Yum powdery, sweet, fruity / Notes: Marshmallow,
strawberry, whipped cream, vanilla, coconut and musk."*). **One product (`sundaze`) is the
fully-templated exemplar; the other 55 are not.** A rebuild should treat rich fragrance-profile
data as a metafield opportunity, not as parseable existing HTML.

Full classification (`raw/description_formats.json`): **A** THE VIBE + FRAGRANCE PROFILE 1 ·
**B** Persona / The Story 5 · **C** name + accord triplet + labelled note tiers 12 · **D** free
prose, no labelled tiers 24 · **E** minimal / boilerplate 14. Only **18 of 56** products expose
machine-readable fragrance notes (≥2 labelled tiers). See `04-PRODUCTS.md` §3.0.

---

## 5. Contact details & social links

| Channel | Value | Source |
|---|---|---|
| Email | `contact@siwafragrances.com` | `text-with-icons` section, rendered on every captured page |
| WhatsApp (displayed number) | **+20 106 625 0757** | `raw/pages/pages_contact.html` — "WhatsApp us for any inquiries +201066250757" |
| WhatsApp (link) | `https://api.whatsapp.com/message/VLSFRC5URF6EP1?autoload=1&app_absent=0` | footer social row, all 8 captured pages |
| Instagram | `https://www.instagram.com/siwafragrances?igsh=MXE0anh6NXlnYzFmaw==` | footer social row, all 8 pages |
| Facebook | `https://www.facebook.com/share/1AYNy8M7mJ/?mibextid=wwXIfr` | footer social row, all 8 pages |
| TikTok | `https://www.tiktok.com/@siwafragrances?_t=ZS-8zhBvV3DKCe&_r=1` | footer social row, all 8 pages |
| Physical location | "Cairo, Nasr City, The Garden Kiosk Three" | `raw/pages/pages_contact.html` |
| Registered store city | New Cairo, Cairo, EG | `raw/meta.json` |
| Contact form | Shopify `contact-form` section on `/pages/contact` — fields **Name, E-mail, Message**, submit "Send message" | `raw/pages/pages_contact.html` |
| Live chat | Shopify Inbox (`shopify-inbox-1295`) | `raw/pages/index.html` |
| `mailto:` / `tel:` hrefs | **none** — the email and phone are plain text, not clickable links | grep across all `raw/pages/*.html` returned 0 |

> Note: no `mailto:` or `tel:` anchor exists anywhere in the capture. Both the email address and
> the WhatsApp number are rendered as unlinked text. This is a fixable UX gap in a rebuild.

### 5.1 Service promises (footer `text-with-icons`, 3 items, on every page)

| Heading | Body |
|---|---|
| 14 days return | Returns are accepted for items in their original, unused sealed condition. |
| support 24/7 | Reach out to us via DM — Email: contact@siwafragrances.com |
| Payment Protection | Your payment details are encrypted and secure. |

---

## 6. Policies

Only two policy URLs are linked anywhere in the capture, both from the footer "MORE
INFORMATION" menu of `raw/pages/index.html`:

| Policy | URL | Linked from |
|---|---|---|
| Refund policy | `/policies/refund-policy` | footer menu ("REFUND POLICY") |
| Privacy policy | `/policies/privacy-policy` | footer menu ("PRIVACY POLICY"); also referenced in the cookie banner copy |
| Terms of service | *not linked* | — |
| Shipping policy | *not linked* | — |
| Contact information policy | *not linked* | — |

Free-shipping threshold is communicated only through the announcement bar
("Free shipping orders over 1500"), not a shipping policy page.

A **privacy/cookie banner** section is present in the overlay group on every page:
"🍪 Cookie policy — We use cookies and similar technologies to provide the best experience on
our website. Refer to our Privacy Policy for more information." with Accept / Decline.

---

## 7. Capture integrity — resolved

On the **first** capture pass, 24 of the 56 `raw/products/<handle>.html` files came back as
~8.9 KB Cloudflare interstitials reading *"Verifying your connection… Enable JavaScript and
cookies to continue."* **These 24 were subsequently re-fetched and recovered.**

| Artifact | Usable | Blocked |
|---|---:|---:|
| `raw/products/*.html` | **all 56** | 0 |
| `raw/products/*.js.json` | 31 | 25 *(not re-fetched — use `raw/products.json` instead)* |
| `raw/products.json` (catalog) | **all 56** | 0 |
| `raw/pages/*.html` | 8 | 0 |

Every one of the 56 PDP captures now contains `jdgm-prev-badge` or
`shopify-section--main-product`, so per-PDP DOM claims (review counts, template IDs) in this
audit set cover the whole catalog. Handles recovered in the second pass: `caramel-vanigliato`,
`carnal-trail`, `citrine`, `coco-woods`, `hibiscusex`, `hot-male`, `hot-vanilla`,
`insane-pineapple`, `iris-elixir`, `irresistible-vanilla`, `lady-killer`, `layering-lychee`,
`layering-pistachio`, `layering-vanilla`, `luna-di-roma`, `male-elixir`, `marasi`, `mawj`,
`pacific-elixir`, `soiree`, `soul-poudree`, `stellar-nights`, `summer-elegance`,
`summer-holidays`.

**`raw/products.json` remains complete and authoritative for catalog data** — the stale
`*.js.json` files are the only remaining gap and are fully superseded by it.

---

## 8. Key observations for a rebuild

1. **The `vendor` field is load-bearing and non-standard.** It holds the designer fragrance the
   product clones, and it is rendered on product cards *and* emitted as schema.org
   `brand.name`. A rebuild must decide deliberately: keep it (and accept that Google sees
   "Chanel" as the brand of a Siwa product), or migrate it to a dedicated
   `inspired_by` metafield and set `vendor` to `Siwa Fragrances` across all 56 SKUs. This is
   the single highest-risk data decision in the project.

2. **Two product templates already exist and must be preserved.** Template
   `template--18814156767280` serves 50 of the 56 eau-de-parfum PDPs;
   `template--18814157291568` serves exactly the 6 body-splash / body-lotion SKUs
   (`apple-pie`, `marshmallow`, `silk-vanilla`, `silk-vanilla-body-lotion`, `sweet-rum`,
   `vanilla-91`). Both carry a distinct Judge.me apps section ID
   (`1759233522bc5ee263` vs `17592376209d0d9349`). A single-template rebuild would silently
   collapse this split.

3. **Prestige section groups are the skeleton.** Every page renders exactly
   `header-group` (announcement bar + header) → `overlay-group` (cart drawer + newsletter popup
   + privacy banner) → template sections → `footer-group` (text-with-icons + footer). Group IDs
   are stable across all 8 captured page types: `sections--18814157193264`,
   `sections--18814157258800`, `sections--18814157226032`. Rebuild the groups first; the
   templates then only differ in the middle.

4. **Judge.me is not decorative — it is the store's primary trust asset.** 1,176 shop-wide
   reviews at 4.98 ★ — 820 of them attached to the 56 published products (54 of 56 reviewed,
   4.9807 weighted average), a homepage carousel showing 4.98 (1176), a PDP review widget and
   a PDP preview badge rendered twice (main block + sticky buy bar). Any theme rebuild must
   preserve all four app-block insertion points or the store loses its conversion engine.

5. **Option data is dirty and will break variant logic.** Option names split `size` (44) /
   `Size` (9) / eight one-off names including the typo `Layerng Pistachio`; option values mix
   `50 ml` and `50ML` and include a bare `100`. Bundles are the only multi-option products
   (`layering-30-ml-bundle` has 12 variants across 3 options). Normalise before rebuilding, or
   size-swatch / size-chart logic will need per-product exceptions.

6. **Collection counts in the Admin do not match the storefront.** `raw/collections.json`
   reports `for-him` 83, `for-her` 80, `perfumes` 82, `unisex` 50 and `best-sellers` 24 — all
   impossible against 56 published products, and `/collections/best-sellers` actually renders
   **18 products**. Substantial unpublished/draft inventory sits inside these collections. Do
   not use `products_count` for menu badges or "X products" copy.

7. **Merchandising is entirely EGP/EG single-market.** One locale, one currency, one shipping
   country, no localization form, no country selector, no Shop Pay Installments, no payment
   icons. Do not build multi-currency scaffolding; do build for `LE {{amount}}` money format
   and a 1500 EGP free-shipping threshold.

8. **Content sprawl needs pruning, not porting.** 4 of 19 collections are orphans
   (`perfumes` 82, `siwa-perfumes` 51, `ramadan-drops` 6, `black-friday-2025` 0, plus
   `gift-boxes` 1) reachable only via sitemap; `/pages/our-story` and `/pages/our-comitments`
   are linked from nothing; `/blogs/news` has zero inbound links in the entire capture; and the
   page handle `our-comitments` is misspelled. A rebuild is the moment to fix the handle (with a
   301) and decide which of these survive.

9. **Zero clickable contact affordances.** The email address and WhatsApp number are plain text
   with no `mailto:` / `tel:` / `https://wa.me/` anchors, despite the store's own copy directing
   customers to "reach out to us via DM". Low-effort, high-impact fix.
