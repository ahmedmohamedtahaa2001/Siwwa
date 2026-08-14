# 04 — PRODUCT CATALOG

Reference: https://siwafragrances.com/ · Audit date 2026-07-27 · Currency **EGP**
Primary source: `raw/products.json` (56 products, 158 variants). Ratings and review bodies:
`raw/reviews_complete.json`. Description-format classification: `raw/description_formats.json`.
All figures below were computed programmatically from those files — nothing is estimated.

> **Data corrections (applied):** every review figure in this document — the ★/Rev columns of the
> master table (and therefore its sort order), §5, §6.1 and §6.3 — was **re-derived after
> recovering the 24 PDP captures that the first pass returned as Cloudflare interstitials**. The
> capture set is now 56/56 valid PDPs, so 24 products previously recorded as having zero reviews
> in fact have them (including the catalog's #1, `layering-vanilla`, at 98). The description-format
> breakdown in §3.0 was likewise re-derived. See `_CORRECTIONS.md`. Superseded figures: "344
> reviews", "4.986 ★", "31 of 56 reviewed", "25 products with zero reviews", "23 of 56 with
> machine-readable notes".

> **Schema warning — full analysis in `03-DATA-SCHEMA.md §2`:** the Shopify `vendor` field does **not**
> hold a brand name. It holds the **designer fragrance the product is inspired by** (e.g. `Layton PDM`,
> `Bleu De Chanel Parfum`). 42 distinct vendor values across 56 products. Only 16 products use
> `Siwa Fragrances` / `Siwa original creation`. A rebuild must never render `product.vendor` as a brand.

---

## 1. Catalog summary

| Metric | Value | Source |
|---|---|---|
| Products | **56** | `raw/products.json` → `products[]` |
| Variants | **158** | sum of `products[].variants[]` |
| Distinct `vendor` values | **42** | `products[].vendor` |
| Distinct tags | **6** | `products[].tags` |
| Product images total | **65** | sum of `products[].images[]` |
| Price floor / ceiling | **350 EGP** (`silk-vanilla-body-lotion`, 120ML) / **2,300 EGP** (`coco-woods`, 100 ml) | `variants[].price` |
| Median variant price | **925 EGP** | all 158 variants |
| In-stock variants | **109 / 158 (69.0 %)** | `variants[].available == true` |
| Sold-out variants | **49 / 158 (31.0 %)** | `variants[].available == false` |
| Fully sold-out products | **10 / 56** | all variants unavailable |
| Partially sold-out products | **18 / 56** | some variants unavailable |
| Reviewed products | **54 / 56** — 820 reviews, 4.9807 ★ weighted | `raw/reviews_complete.json` |
| Products with 0 reviews | **2 / 56** (`soiree`, `sundaze`) | `raw/reviews_complete.json` |
| Shop-wide Judge.me total | **1,176 @ 4.98 ★** — 356 more than the 820 attributable to published products | `data-shop-review-count` on all 56 PDPs |
| Products with exactly 1 image | **50 / 56 (89 %)** | `len(images) == 1` |
| `product_type` populated | **1 / 56** (`silk-vanilla-body-lotion` = `body lotion`) | `products[].product_type` |

### 1.1 Breakdown by category

Shopify carries **no** category field here (`product_type` is empty on 55 of 56 products), so category is
derived from `vendor`, `body_html` wording and variant sizing. Rule used is stated in each row.

| Category | Count | Derivation rule |
|---|---|---|
| Perfume — inspired-by (dupe) | **40** | `vendor` is a designer fragrance name |
| Original Creation | **7** | `vendor` = `Siwa original creation` (6) or `Siwa Fragrances` on a 30/50/100 ml perfume (`mawj`) |
| Body Splash | **5** | 125 ML single variant + body_html contains “body splash” |
| Bundle | **3** | tag `Bundles`; multi-option variants |
| Body Lotion | **1** | `product_type` = `body lotion` |

The `original-creations` collection reports `products_count: 8` in `raw/collections.json` while only 7
products carry a Siwa-authored vendor on a perfume format. The 8th member is not determinable from
captured data (collection→product membership was not captured for that collection).

### 1.2 Breakdown by gender tag

Tags are **not mutually exclusive** — 18 products carry both `Men` and `Women` (and all 4 `Unisex`-tagged
products also carry both). Both views given.

| Raw tag | Products carrying it |
|---|---|
| `Men` | 28 |
| `Women` | 25 |
| `Best Selling` | 23 |
| `new` | 9 |
| `Unisex` | 4 |
| `Bundles` | 3 |

| Resolved gender bucket (rule: `Unisex` tag **or** both `Men`+`Women` → Unisex) | Products |
|---|---|
| Unisex | **18** |
| Men only | **10** |
| Women only | **7** |
| **No gender tag at all** | **21** |

**17 of 56 products (30.4 %) have a completely empty `tags` array**: `sundaze`, `vanilla-91`,
`pink-arrogance`, `pink-allure`, `lost-on-you`, `aurableu`, `absolute-drunk`, `bleu-exclusive`,
`belle-riche`, `bare-glow`, `bleu-intense`, `silk-vanilla-body-lotion`, `marshmallow`, `sweet-rum`,
`apple-pie`, `silk-vanilla`, `soiree`. A further 4 (`irresistible-vanilla` and the 3 bundles) have tags
but no gender tag — 21 of 56 in total are invisible to any Men/Women/Unisex facet.

Any rebuild that drives faceted filtering off `product.tags` will silently hide 30–37 % of the catalog.
This is the single biggest data-quality defect in the catalog, and it disproportionately affects the
**newest** products: 9 of the 10 products published in 2026 are completely untagged (`siwa-trail` is the
sole exception).

### 1.3 Price distribution (all 158 variants)

| Band (EGP) | Variants | Share |
|---|---|---|
| ≤ 500 | 23 | 14.6 % |
| 501 – 750 | 40 | 25.3 % |
| 751 – 1,000 | 28 | 17.7 % |
| 1,001 – 1,500 | 40 | 25.3 % |
| 1,501 – 2,000 | 23 | 14.6 % |
| > 2,000 | 4 | 2.5 % |

### 1.4 Publication cadence

| Year published | Products |
|---|---|
| 2021 | 1 |
| 2022 | 4 |
| 2023 | 11 |
| 2024 | 14 |
| 2025 | 16 |
| 2026 | 10 |

---

## 2. Master catalog table — all 56 products

Sorted by **review count descending** (bestsellers first), ties broken alphabetically.
“Inspired-by” = the raw `vendor` field verbatim. “★” and “Rev” = `avg` / `count` from
`raw/reviews_complete.json` (corrected — see the note at the top of this file).
Prices are the min–max of that product’s variants, in EGP.

| # | Handle | Title | Inspired-by (`vendor`) | Tags | Sizes | Price EGP | Img | ★ | Rev | Published |
|---:|---|---|---|---|---|---|---:|---:|---:|---|
| 1 | `layering-vanilla` | Layering Vanilla | Vanilla 28 Kayali | Best Selling, Men, Women | 100 ml / 50 ml / 30 ml | 450 – 1,000 | 1 | 5.00 | 98 | 2023-10-20 |
| 2 | `mawj` | Mawj | Siwa Fragrances | Best Selling, Men | 100 ml / 50 ml / 30 ml | 800 – 1,850 | 1 | 4.99 | 68 | 2022-06-29 |
| 3 | `boujee-blush` | Boujee Blush | Kayali Boujee Marshmallow | Best Selling, new, Women | 100 ml / 50 ml / 30 ml | 500 – 1,200 | 1 | 4.97 | 59 | 2025-04-25 |
| 4 | `hibiscusex` | Hibiscusex | Hibiscus Mahajád | Best Selling, Men, Women | 100 ml / 50 ml / 30 ml | 700 – 1,650 | 1 | 4.98 | 56 | 2024-05-10 |
| 5 | `drunk-gold` | Drunk Gold | Angels’ Share Paradis | Best Selling, Men, Women | 100 ml / 50 ml / 30 ml | 750 – 1,950 | 1 | 5.00 | 46 | 2025-06-24 |
| 6 | `caramel-vanigliato` | Caramel vanigliato | Bianco Latte Giardini Di Toscana | Best Selling, Men, Women | 100 ml / 50 ml / 30 ml | 550 – 1,550 | 1 | 4.95 | 43 | 2024-10-08 |
| 7 | `lady-killer` | Lady killer | Layton PDM | Best Selling, Men | 100 ml / 50 ml / 30 ml | 750 – 1,750 | 1 | 4.96 | 26 | 2023-08-04 |
| 8 | `alluring-rose` | Alluring Rose | Delina La Rosée Parfums de Marly | Women | 100 ml / 50 ml / 30 ml | 500 – 1,100 | 1 | 4.96 | 24 | 2021-08-20 |
| 9 | `marasi` | Marasi | 40 Knots Xerjoff | Men, Women | 100 ml / 50 ml / 30 ml | 550 – 1,400 | 1 | 5.00 | 23 | 2024-05-21 |
| 10 | `bare-glow` | Bare Glow | Goddess Burberry | — | 30 ml / 50 ml / 100 ml | 450 – 1,000 | 1 | 4.95 | 21 | 2025-11-05 |
| 11 | `citrine` | Citrine | Tygar Bvlgari | Best Selling, Men | 100 ml / 50 ml / 30 ml | 750 – 1,850 | 1 | 5.00 | 20 | 2022-04-07 |
| 12 | `bleu-exclusive` | Bleu Exclusive | Bleu De Chanel L’exclusif | — | 30 ml / 50 ml / 100 ml | 750 – 1,900 | 1 | 5.00 | 19 | 2026-02-27 |
| 13 | `coffee-vanilla` | Coffee Vanilla | Siwa original creation | Best Selling, Men, new, Women | 100 ml / 50 ml / 30 ml | 550 – 1,150 | 1 | 5.00 | 18 | 2024-10-21 |
| 14 | `irresistible-vanilla` | Irresistible Vanilla | Siwa original creation | Best Selling | 100 ml / 50 ml / 30 ml | 400 – 1,000 | 1 | 4.94 | 18 | 2023-05-30 |
| 15 | `coco-woods` | Coco Woods | Vanilla Powder Matiere Premiere | Men, Women | 30 ml / 50 ml / 100 ml | 850 – 2,300 | 1 | 4.94 | 16 | 2024-07-08 |
| 16 | `pink-allure` | Pink Allure | Siwa original creation | — | 30 ml / 50 ml / 100 ml | 590 – 1,400 | 1 | 5.00 | 14 | 2026-04-24 |
| 17 | `lagoon-flair` | Lagoon Flair | Le Beau Le Parfum | Best Selling, Men, new | 100 ml / 50 ml / 30 ml | 450 – 1,200 | 1 | 4.92 | 13 | 2025-04-25 |
| 18 | `silk-vanilla` | Silk Vanilla | Siwa Fragrances | — | 125ML | 375 | 3 | 5.00 | 13 | 2025-02-21 |
| 19 | `hot-vanilla` | Hot Vanilla | Althaïr Parfums de Marly | Men, Women | 100 ml / 50 ml / 30 ml | 550 – 1,550 | 1 | 4.92 | 12 | 2023-11-26 |
| 20 | `male-elixir` | Male Elixir | Le Male Elixir JPG | Best Selling, Men | 100 ml / 50 ml / 30 ml | 450 – 1,250 | 1 | 5.00 | 11 | 2024-05-04 |
| 21 | `mango-pineapple` | Mango Pineapple | Summer Hammer | Best Selling, Men, new, Women | 100 ml / 50 ml / 30 ml | 750 – 1,850 | 1 | 5.00 | 11 | 2025-08-16 |
| 22 | `soul-poudree` | Soul Poudree | Narciso Poudree | Women | 100 / 50 ml / 30 ml | 400 – 1,050 | 1 | 5.00 | 11 | 2024-06-17 |
| 23 | `vanilla-bundle` | Vanilla Bundle | Siwa Fragrances | Bundles | 3-way bundle | 1,060 – 1,555 | 1 | 5.00 | 11 | 2025-07-17 |
| 24 | `carnal-trail` | Carnal Trail | Side Effect Initio | Best Selling, Men, Women | 100 ml / 50 ml / 30 ml | 600 – 1,550 | 1 | 5.00 | 10 | 2023-09-24 |
| 25 | `layering-pistachio` | Layering Pistachio | Yum Pistachio Gelato Kayali | Best Selling, Men, Women | 100 ml / 50 ml / 30 ml | 450 – 1,000 | 1 | 5.00 | 10 | 2023-10-27 |
| 26 | `apple-pie` | Apple Pie | Siwa Fragrances | — | 125ML | 375 | 3 | 5.00 | 9 | 2025-02-22 |
| 27 | `hot-male` | Hot Male | You Intensely Giorgio Armani | Men | 50 ml / 100 ml | 800 – 1,250 | 1 | 5.00 | 9 | 2024-06-14 |
| 28 | `luna-di-roma` | Luna Di Roma | Valentino Donna Born In Roma Intense | Women | 50 ml | 600 | 1 | 4.78 | 9 | 2024-08-14 |
| 29 | `aurableu` | Aurableu | Symphony LV | — | 30 ml / 50 ml / 100 ml | 700 – 1,750 | 1 | 5.00 | 8 | 2026-04-24 |
| 30 | `chocolate-creme` | Chocolate Creme | Siwa original creation | Men, new, Unisex, Women | 100 ml / 50 ml / 30 ml | 450 – 1,250 | 1 | 5.00 | 8 | 2024-12-06 |
| 31 | `bleu-intense` | Bleu Intense | Bleu De Chanel Parfum | — | 100 ml / 50 ml / 30 ml | 500 – 1,050 | 1 | 5.00 | 7 | 2025-10-21 |
| 32 | `libre-desire` | Libre Desire | YSL Libre intense | Best Selling, new, Women | 100 ml / 50 ml / 30 ml | 500 – 1,250 | 1 | 5.00 | 7 | 2025-03-11 |
| 33 | `pacific-elixir` | Pacific Elixir | Pacific Chill Louis Vuitton | Men, Women | 30 ml / 50 ml / 100 ml | 600 – 1,500 | 1 | 5.00 | 7 | 2023-10-06 |
| 34 | `silk-vanilla-body-lotion` | Silk Vanilla Body Lotion | Siwa Fragrances | — | 120ML | 350 | 1 | 5.00 | 7 | 2025-09-29 |
| 35 | `summer-holidays` | Summer Holidays | LV Afternoon Swim | Best Selling, Men, Women | 100 ml / 50 ml / 30 ml | 650 – 1,700 | 1 | 5.00 | 7 | 2022-05-20 |
| 36 | `sweet-rum` | Sweet Rum | Siwa Fragrances | — | 125ml | 375 | 3 | 5.00 | 7 | 2025-03-02 |
| 37 | `gourmet` | Gourmet | Siwa original creation | Best Selling, Men, new, Unisex, Women | 100 ml / 50 ml / 30 ml | 800 – 2,100 | 2 | 5.00 | 6 | 2025-01-09 |
| 38 | `iris-elixir` | Iris elixir | Prada L’Homme Intense | Men | 100 ml / 50 ml | 850 – 1,350 | 1 | 5.00 | 6 | 2024-06-14 |
| 39 | `layering-lychee` | Layering Lychee | Eden Sparkling Lychee 39 Kayali | Best Selling, Women | 100 ml / 50 ml / 30 ml | 450 – 1,000 | 1 | 5.00 | 6 | 2024-04-03 |
| 40 | `insane-pineapple` | Insane Pineapple | Nishane Hacivat | Men | 100 ml / 50 ml / 30 ml | 500 – 1,350 | 1 | 4.80 | 5 | 2023-09-21 |
| 41 | `marshmallow` | Marshmallow | Siwa Fragrances | — | 125ML | 375 | 1 | 5.00 | 5 | 2025-05-06 |
| 42 | `siwa-trail` | Siwa Trail | Guidance Amouage | Men, new, Unisex, Women | 100 ml / 50 ml / 30 ml | 600 – 1,750 | 1 | 5.00 | 5 | 2026-04-25 |
| 43 | `belle-riche` | Belle Riche | La Belle Le Parfum | — | 100 ml / 50 ml / 30 ml | 550 – 1,150 | 1 | 5.00 | 4 | 2026-01-29 |
| 44 | `lost-on-you` | Lost On You | Lost In Paris Roja | — | 30 ml / 50 ml / 100 ml | 750 – 1,900 | 1 | 5.00 | 4 | 2026-04-24 |
| 45 | `marshmallow-bundle` | Marshmallow Bundle | Siwa Fragrances | Bundles | 2-way bundle | 950 | 1 | 5.00 | 4 | 2025-05-17 |
| 46 | `pink-arrogance` | Pink Arrogance | Siwa original creation | — | 30 ml / 50 ml / 100 ml | 450 – 1,000 | 1 | 5.00 | 4 | 2026-04-24 |
| 47 | `layering-30-ml-bundle` | Layering bundle | Siwa Fragrances | Bundles | 3-way bundle | 1,105 – 1,995 | 1 | 5.00 | 3 | 2024-11-14 |
| 48 | `stellar-nights` | Stellar Nights | Stellar Times Louis Vuitton | Best Selling, Men, Women | 100 ml / 50 ml / 30 ml | 800 – 2,050 | 1 | 5.00 | 3 | 2023-12-20 |
| 49 | `absolute-drunk` | Absolute Drunk | Il Padrino Sospiro | — | 30 ml / 50 ml / 100 ml | 750 – 1,850 | 1 | 5.00 | 2 | 2026-03-14 |
| 50 | `summer-elegance` | summer elegance | Imagination LV | Best Selling, Men | 100 ml / 50 ml / 30 ml | 850 – 2,150 | 1 | 5.00 | 2 | 2023-05-29 |
| 51 | `vanilla-91` | Vanilla 91 | Siwa Fragrances | — | 125ML | 380 | 2 | 5.00 | 2 | 2026-05-16 |
| 52 | `layering-apple` | Layering Apple | Eden Juicy Apple kayali | Best Selling, Women | 50 ml / 30 ml | 450 – 650 | 1 | 5.00 | 1 | 2024-10-21 |
| 53 | `mango-on-woods` | Mango on woods | God of Fire Stéphane Humbert | Men | 100 ml / 50 ml / 30 ml | 700 – 1,800 | 1 | 5.00 | 1 | 2023-10-06 |
| 54 | `sweet-oud` | Sweet Oud | Oud Cadenza MC | Best Selling, Men, new, Unisex, Women | 100 ml / 50 ml / 30 ml | 650 – 1,650 | 2 | 5.00 | 1 | 2025-03-23 |
| 55 | `soiree` | Soiree | Grand Soir MFK | — | 100 ml / 50 ml / 30 ml | 550 – 1,400 | 1 | — | 0 | 2022-04-05 |
| 56 | `sundaze` | Sundaze | Power Of You Giorgio Armani | — | 30 ml / 50 ml / 100 ml | 500 – 1,100 | 1 | — | 0 | 2026-07-25 |

---

## 3. Per-category deep dives

### 3.0 How `body_html` is structured (five templates, A–E)

Classification of all 56 `body_html` values (`raw/description_formats.json` — corrected).

| Template | Products | Markers |
|---|---:|---|
| **A — THE VIBE + FRAGRANCE PROFILE** | 1 | `<h4>THE VIBE</h4>` → blockquote “If you love *X*…” → `<h4>FRAGRANCE PROFILE</h4>` (Main Accords / Top / Heart / Base) → `PERFORMANCE & WEAR` (Longevity / Projection / Best For). Only `sundaze`. |
| **B — Persona / The Story** | 5 | `Persona` → `The Story` → `Notes` (Top/Heart/Base) → `Best For`. `absolute-drunk`, `aurableu`, `lost-on-you`, `pink-allure`, `pink-arrogance` |
| **C — name + accord triplet + labelled note tiers** | 12 | Accord line + `Top notes:` / `Middle` or `Heart notes:` / `Base notes:` tiers. `bleu-exclusive`, `bleu-intense`, `caramel-vanigliato`, `citrine`, `coffee-vanilla`, `hot-male`, `iris-elixir`, `layering-apple`, `luna-di-roma`, `mango-pineapple`, `soul-poudree`, `sweet-oud` |
| **D — free prose, no labelled tiers** | 24 | Narrative or notes-only paragraph with ingredients embedded in the prose. `bare-glow`, `belle-riche`, `carnal-trail`, `gourmet`, `hibiscusex`, `hot-vanilla`, `insane-pineapple`, `irresistible-vanilla`, `lady-killer`, `layering-lychee`, `layering-pistachio`, `layering-vanilla`, `libre-desire`, `male-elixir`, `mango-on-woods`, `marasi`, `mawj`, `pacific-elixir`, `siwa-trail`, `stellar-nights`, `summer-elegance`, `summer-holidays`, `vanilla-91`, `vanilla-bundle` |
| **E — minimal / boilerplate (<200 chars)** | 14 | Little more than a one-line blurb. `alluring-rose`, `apple-pie`, `boujee-blush`, `chocolate-creme`, `coco-woods`, `drunk-gold`, `lagoon-flair`, `layering-30-ml-bundle`, `marshmallow`, `marshmallow-bundle`, `silk-vanilla`, `silk-vanilla-body-lotion`, `soiree`, `sweet-rum` |

Only **18 of 56** products (32 %) expose machine-readable fragrance notes (≥2 labelled tiers) — the
A + B + C groups. For the other 38 the note lists in this document were extracted by reading the prose
in `body_html` and are marked *(unstructured)*.

`body_html` text length across the catalog (tags stripped): min 59 chars, max 1,363 (`citrine`,
whose raw markup is 2,023 chars), median 227. The labelled tiers use
**13 distinct spellings** (`Top Notes:`, `Top notes:`, `Top notes :`, `Top:`, `Heart Notes:`,
`Heart notes:`, `Heart:`, `Middle notes:`, `Middle notes :`, `Base Notes:`, `Base notes:`,
`Base notes :`, `Base:`) — note that both `Heart` and `Middle` name the same tier. Any metafield
migration must normalise them.

All `body_html` retains Shopify rich-text-editor artefacts: `data-path-to-node` and `data-index-in-node`
attributes on `<h4>`, `<p>`, `<b>`, `<i>`, `<li>` elements (visible in `sundaze`). Harmless, but a rebuild
that re-authors descriptions should strip them.

### 3.1 Original Creations (7)

Products the store authors itself rather than cloning. Identified by `vendor` = `Siwa original creation`
(6 products) or `Siwa Fragrances` on a perfume format (`mawj`). `mawj` is the oldest of the seven
(published 2022-06-29) and the only Siwa-authored scent tagged `Men` + `Best Selling`. Notably, `mawj`
is the **#2 product in the whole catalog by review volume** (68 reviews @ 4.99) — the house's own
creation outsells almost every dupe it stocks. `coffee-vanilla` (2024) has 18 and `pink-allure` (2026) 14.

| Handle | Title | Inspired-by | Scent description (from `body_html`) | Fragrance notes | Price EGP | Stock |
|---|---|---|---|---|---|---|
| `chocolate-creme` | Chocolate Creme | Siwa original creation | “Gourmand fragrance for men & women.” Chocolate-orange over woods. | *(unstructured)* Chocolate, Vanilla, Orange, Woods | 450 – 1,250 | ⚠️ 1/3 |
| `coffee-vanilla` | Coffee Vanilla | Siwa original creation | “Gourmand Coffee Vanilla fragrance for men & women.” | **T:** Coffee, Amaretto<br>**H:** Ice Cream, Vanilla<br>**B:** Sugar, Vanilla | 550 – 1,150 | ⚠️ 2/3 |
| `gourmet` | Gourmet | Siwa original creation | “Where Gourmand Scent meets buttery Warmth!” Warm croissant, berries, toasted vanilla, gold butter. | *(unstructured)* Croissant, Berries, Blackcurrant, Vanilla, Butter, Tonka Bean, Sandalwood | 800 – 2,100 | ⚠️ 2/3 |
| `irresistible-vanilla` | Irresistible Vanilla | Siwa original creation | “Vanilla, sweet, powdery… perfect for dates and nights out. It is irresistible!” | *(unstructured)* Vanilla, Sugar, Cacao, Tonka Bean, Red Berries, Amber, Musk, Woods | 400 – 1,000 | ✅ all |
| `mawj` | Mawj | Siwa Fragrances | “Citrus, marine, woody… an elegant aquatic perfume reflects the depth of the sea & its fresh breeze in an oriental way.” | *(unstructured)* Sea Notes, Ozonic Notes, Vanilla, Bitter Orange, Pineapple, Vetiver, Violet, Iris, Jasmine, Oud, Musk, Sandalwood | 800 – 1,850 | ✅ all |
| `pink-allure` | Pink Allure | Siwa original creation | Persona/Story template. “A presence defined by softness… quiet, refined, and beautifully understated.” | **T:** Mandarin, Bergamot, Pink Pepper<br>**H:** Rose, Peony, Powdery Accord<br>**B:** Musk, Woods, Vanilla | 590 – 1,400 | ✅ all |
| `pink-arrogance` | Pink Arrogance | Siwa original creation | Persona/Story template. “Pink Arrogance isn’t about being sweet. It’s about being certain.” | **T:** Orange Blossom, Neroli, Almond<br>**H:** Jasmine, Violet, Apricot<br>**B:** Musk, Sandalwood | 450 – 1,000 | ✅ all |

### 3.2 Men's fragrances — `Men` tag only (9)

Tagged `Men` without `Women` and without `Unisex`. Note `citrine` carries the longest `body_html` in the
catalog (2,023 chars, SEO-style copy), has **20 reviews at a perfect 5.00** and is **fully sold out** —
reviews say so explicitly (“Was amazing..but always sold out..”).

| Handle | Title | Inspired-by | Scent description (from `body_html`) | Fragrance notes | Price EGP | Stock |
|---|---|---|---|---|---|---|
| `lagoon-flair` | Lagoon Flair | Le Beau Le Parfum | “Sweet, woody.” (notes-only copy) | *(unstructured)* Coconut, Pineapple, Tonka Bean, Woods, Iris | 450 – 1,200 | ✅ all |
| `iris-elixir` | Iris elixir | Prada L’Homme Intense | “Amber Woody fragrance for men.” | **T:** Iris<br>**H:** Amber, Patchouli<br>**B:** Tonka Bean, Leather, Sandalwood | 850 – 1,350 | ❌ **sold out** |
| `hot-male` | Hot Male | You Intensely Giorgio Armani | “Amber Fougere fragrance for men.” | **T:** Pink Pepper, Juniper, Violet<br>**H:** Toffee, Cinnamon, Lavender, Sage<br>**B:** Vanilla, Amber, Tonka Bean, Suede | 800 – 1,250 | ✅ all |
| `male-elixir` | Male Elixir | Le Male Elixir JPG | Narrative vignette — “dimly lit streets of a cosmopolitan city”; vanilla + honey + tonka + lavender, mint lift, tobacco depth. | *(unstructured)* Vanilla, Honey, Tonka Bean, Lavender, Mint, Tobacco | 450 – 1,250 | ✅ all |
| `mango-on-woods` | Mango on woods | God of Fire Stéphane Humbert | “Fruity, sweet, woody… realistic mango scent with a unique sweetness touch, ideal for all year use.” | *(unstructured)* Mango, Lemon, Ginger, Red Berries, Woods, Amber, Musk, Nagarmotha | 700 – 1,800 | ⚠️ 2/3 |
| `insane-pineapple` | Insane Pineapple | Nishane Hacivat | “Citrus, Woody, mossy… sitting on the beach on a sunny day while drinking an extremely fresh pineapple juice.” | *(unstructured)* Pineapple, Grapefruit, Bergamot, Patchouli, Moss, Woods | 500 – 1,350 | ⚠️ 2/3 |
| `lady-killer` | Lady killer | Layton PDM | “Vanilla, warm, spicy… like a date night in a fancy restaurant. It’s a lady killer!” | *(unstructured)* Vanilla, Green Apple, Cardamom, Lavender, Pepper, Jasmine, Patchouli, Woods | 750 – 1,750 | ✅ all |
| `summer-elegance` | summer elegance | Imagination LV | “Citrus, Fresh, Clean… will avoid you to smell like everyone else in Summer!” | *(unstructured)* Citron, Bergamot, Orange, Neroli, Cinnamon, Ambroxan, Woods, Black Tea | 850 – 2,150 | ⚠️ 2/3 |
| `citrine` | Citrine | Tygar Bvlgari | Long SEO-style copy (only product with a “Why … is One of the Best Men’s Perfumes” block). “Clean yet sensual, vibrant yet deep.” | **T:** Grapefruit<br>**H:** Ginger, Ambrette<br>**B:** Musk, Ambroxan | 750 – 1,850 | ❌ **sold out** |

### 3.3 Women's fragrances — `Women` tag only (7)

Tagged `Women` without `Men`. `boujee-blush` is the catalog’s **#3** product by review volume
(59 @ 4.97), behind `layering-vanilla` (98) and `mawj` (68); `alluring-rose` is #8 (24).

| Handle | Title | Inspired-by | Scent description (from `body_html`) | Fragrance notes | Price EGP | Stock |
|---|---|---|---|---|---|---|
| `boujee-blush` | Boujee Blush | Kayali Boujee Marshmallow | “Yum powdery, sweet, fruity.” (notes-only copy) | *(unstructured)* Marshmallow, Strawberry, Whipped Cream, Vanilla, Coconut, Musk | 500 – 1,200 | ⚠️ 2/3 |
| `libre-desire` | Libre Desire | YSL Libre intense | “A bold and sensual fusion… mirrors the allure of Beautiful Lady.” | *(unstructured)* Vanilla, Orange Blossom, Honey, Lavender, Tonka Bean | 500 – 1,250 | ⚠️ 2/3 |
| `layering-apple` | Layering Apple | Eden Juicy Apple kayali | “Floral Fruity Gourmand fragrance for women.” | **T:** Apple, Lychee, Blackcurrant<br>**H:** Berries, Raspberry, Rose, Jasmine<br>**B:** Sugar, Musk, Vanilla | 450 – 650 | ⚠️ 1/2 |
| `luna-di-roma` | Luna Di Roma | Valentino Donna Born In Roma Intense | “Amber floral fragrance for women.” | **T:** Vanilla, Amber<br>**H:** Jasmine<br>**B:** Benzoin | 600 | ✅ all |
| `soul-poudree` | Soul Poudree | Narciso Poudree | “Woody Floral Musk fragrance for women.” | **T:** Jasmine, Rose, Orange Blossom<br>**H:** Musk<br>**B:** Coumarin, Cedar, Vetiver, Patchouli | 400 – 1,050 | ✅ all |
| `layering-lychee` | Layering Lychee | Eden Sparkling Lychee 39 Kayali | “Sweet, Fruity, vanilla… summer feminine perfume where juicy lychee takes center stage.” | *(unstructured)* Lychee, Vanilla, Blackcurrant, Sugar | 450 – 1,000 | ⚠️ 2/3 |
| `alluring-rose` | Alluring Rose | Delina La Rosée Parfums de Marly | “Floral fruity aquatic fragrance… gorgeous wearable & potent scent for daily use.” | *(unstructured)* Rose, Peony, Lychee, Musk, Pear, Vetiver, Watery Notes | 500 – 1,100 | ❌ **sold out** |

### 3.4 Unisex — `Unisex` tag or `Men`+`Women` (15)

Only 4 products carry the literal `Unisex` tag — `chocolate-creme`, `gourmet` (both listed under
Original Creations in §3.1), `siwa-trail` and `sweet-oud`. All 4 also carry `Men` + `Women`, so the
`Unisex` tag is redundant with the dual tagging used on the other 14 products in this bucket.
`stellar-nights` describes itself as “our new unisex perfume” in copy but is **not** tagged `Unisex` —
a tag/copy mismatch.

| Handle | Title | Inspired-by | Scent description (from `body_html`) | Fragrance notes | Price EGP | Stock |
|---|---|---|---|---|---|---|
| `siwa-trail` | Siwa Trail | Guidance Amouage | “The new summer edition — a journey through the golden dunes of Siwa.” Only product tying copy to the brand name. | *(unstructured)* Hazelnut, Pear, Vanilla, Woods, Amber | 600 – 1,750 | ❌ **sold out** |
| `mango-pineapple` | Mango Pineapple | Summer Hammer | “The taste of summer in a bottle.” | **T:** Mango, Pineapple, Bergamot, Lemon<br>**H:** White Florals, Coconut, Creamy Accord<br>**B:** Musk, Amber, Woods | 750 – 1,850 | ⚠️ 1/3 |
| `drunk-gold` | Drunk Gold | Angels’ Share Paradis | “Liquid gold. Intoxication in every drop. Woody, sweet, fruity.” | *(unstructured)* Cognac, Liquor, Raspberry, Praline, Tonka Bean | 750 – 1,950 | ⚠️ 2/3 |
| `sweet-oud` | Sweet Oud | Oud Cadenza MC | “Gourmand woody oud blend.” | **T:** Saffron, Cinnamon, Cardamom<br>**H:** Dates, Caramel, Oud, Sugar<br>**B:** Vanilla, Tonka Bean, Leather | 650 – 1,650 | ❌ **sold out** |
| `caramel-vanigliato` | Caramel vanigliato | Bianco Latte Giardini Di Toscana | “Gourmand Vanilla fragrance for men & women.” | **T:** Caramel<br>**H:** Coumarin, Honey<br>**B:** Vanilla, Musk | 550 – 1,550 | ✅ all |
| `coco-woods` | Coco Woods | Vanilla Powder Matiere Premiere | No vibe paragraph at all — body_html is a single `Notes:` line. | *(unstructured)* Vanilla, Musk, Coconut, Palo Santo | 850 – 2,300 | ⚠️ 2/3 |
| `marasi` | Marasi | 40 Knots Xerjoff | “Marine, salty, woody.” Yacht-deck luxury narrative. | *(unstructured)* Sea Notes, Salt, Green Notes, Woods | 550 – 1,400 | ⚠️ 2/3 |
| `hibiscusex` | Hibiscusex | Hibiscus Mahajád | “Vanilla, floral, rose.” Hotel-bar date-night narrative. | *(unstructured)* Hibiscus, Rose, Vanilla, Blackcurrant | 700 – 1,650 | ⚠️ 1/3 |
| `stellar-nights` | Stellar Nights | Stellar Times Louis Vuitton | “Our new unisex perfume” — warm amber intertwined with orange blossom, grounded by woods. | *(unstructured)* Amber, Orange Blossom, Woods | 800 – 2,050 | ✅ all |
| `hot-vanilla` | Hot Vanilla | Althaïr Parfums de Marly | “Sweet Warm spicy… cardamom and cinnamon unfolds like a comforting hug.” | *(unstructured)* Cardamom, Cinnamon, Vanilla, Praline, Musk, Woods | 550 – 1,550 | ✅ all |
| `layering-pistachio` | Layering Pistachio | Yum Pistachio Gelato Kayali | “Sweet, woody, nutty… ideal for layering. Best for winter and fall.” | *(unstructured)* Pistachio, Whipped Cream, Hazelnut, Rum, Marshmallow, Cotton Candy | 450 – 1,000 | ✅ all |
| `layering-vanilla` | Layering Vanilla | Vanilla 28 Kayali | “Sweet, amber, vanilla… ideal for layering. Best for winter and fall.” | *(unstructured)* Jasmine, Vanilla, Orchid, Tonka Bean, Sugar, Amberwood, Musk | 450 – 1,000 | ✅ all |
| `pacific-elixir` | Pacific Elixir | Pacific Chill Louis Vuitton | “Citrus, fruity, sweet… very comforting & gives a cooling effect!” | *(unstructured)* Apricot, Orange, Mint, Lemon, Cedrat, Blackcurrant, Basil, Dates, Amber | 600 – 1,500 | ✅ all |
| `carnal-trail` | Carnal Trail | Side Effect Initio | “Vanilla, Rum, Tobacco… drop dead sexy perfume gives a deep, sexy unforgettable trail.” | *(unstructured)* Vanilla, Rum, Tobacco, Cinnamon | 600 – 1,550 | ✅ all |
| `summer-holidays` | Summer Holidays | LV Afternoon Swim | “Citrus, fresh, aquatic… juicy and addictive, perfect for summer and daily use.” | *(unstructured)* Orange, Bergamot, Mandarin, Ginger, Ambergris | 650 – 1,700 | ✅ all |

### 3.5 Untagged perfumes (9)

These 9 perfumes carry **no tags at all**, so they appear in no tag-driven collection or filter. Six of
them are 2026 releases — the newest products in the catalog are the least merchandised. `sundaze`
(published 2026-07-25, the newest product) is untagged, unreviewed and uses the only Template-A description.

| Handle | Title | Inspired-by | Scent description (from `body_html`) | Fragrance notes | Price EGP | Stock |
|---|---|---|---|---|---|---|
| `sundaze` | Sundaze | Power Of You Giorgio Armani | THE VIBE: “A radiant, sunkissed gourmand that blends juicy passionfruit with creamy vanilla and warm amber.” Only product using the full template. | **T:** Passionfruit, Bitter Orange, Lemon<br>**H:** Frangipani, Solar Accords<br>**B:** Vanilla, Benzoin, Labdanum | 500 – 1,100 | ✅ all |
| `lost-on-you` | Lost On You | Lost In Paris Roja | Persona/Story template. “Indulgence meets elegance… a luminous citrus glow, lifted by a warm hint of rum.” | **T:** Blood Orange, Mandarin, Bitter Orange, Rum<br>**H:** Caramel, Sugar, Creamy Accord<br>**B:** Vanilla, Ambergris, Woods, Spices | 750 – 1,900 | ❌ **sold out** |
| `aurableu` | Aurableu | Symphony LV | Persona/Story template. “A bright horizon and open air… clean, luminous, and full of life.” | **T:** Citrus<br>**H:** Aromatic Notes, White Florals<br>**B:** Musk, Woods, Ginger | 700 – 1,750 | ⚠️ 2/3 |
| `absolute-drunk` | Absolute Drunk | Il Padrino Sospiro | Persona/Story template. “The intoxicating atmosphere of luxury evenings… warm boozy sensation.” | **T:** Boozy Accord, Blackcurrant<br>**H:** Patchouli, Woods<br>**B:** Vanilla, Amber, Woods | 750 – 1,850 | ❌ **sold out** |
| `bleu-exclusive` | Bleu Exclusive | Bleu De Chanel L’exclusif | Story-led (no Persona header). “The signature of a man who takes himself seriously, every single day.” | **T:** Citrus, Aromatic Notes<br>**H:** Sandalwood, Labdanum<br>**B:** Amber, Vanilla, Woods | 750 – 1,900 | ✅ all |
| `belle-riche` | Belle Riche | La Belle Le Parfum | “A seductive blend of juicy pear, rich vanilla, and creamy tonka bean… richness & softness.” | *(unstructured)* Pear, Vanilla, Tonka Bean, Jasmine, Amber | 550 – 1,150 | ⚠️ 2/3 |
| `bare-glow` | Bare Glow | Goddess Burberry | “A velvety cloud of vanilla in all its forms — pure, absolute, and caviar.” | *(unstructured)* Vanilla, Lavender, Cacao | 450 – 1,000 | ⚠️ 1/3 |
| `bleu-intense` | Bleu Intense | Bleu De Chanel Parfum | “The scent of quiet confidence, bold yet effortless, like a man who leads without speaking.” | **T:** Bergamot, Lemon, Mint<br>**H:** Lavender, Pineapple<br>**B:** Cedar, Sandalwood, Amber, Tonka Bean | 500 – 1,050 | ❌ **sold out** |
| `soiree` | Soiree | Grand Soir MFK | “Warm amber fragrance… dense smoky scent with leathery animalic nuances.” | *(unstructured)* Amber, Vanilla, Tonka Bean, Labdanum, Resin, Woods, Leather | 550 – 1,400 | ✅ all |

### 3.6 Bundles (3)

Tag `Bundles`. These are the only multi-option products in the catalog and the only ones with genuine
`compare_at_price` values. See §4.3 for bundle economics.

| Handle | Title | Inspired-by | Scent description (from `body_html`) | Fragrance notes | Price EGP | Stock |
|---|---|---|---|---|---|---|
| `layering-30-ml-bundle` | Layering bundle | Siwa Fragrances | “Pay less get more! Enjoy a bundle of our three top layering perfumes with 15%” | — | 1,105 – 1,995 | ✅ all |
| `marshmallow-bundle` | Marshmallow Bundle | Siwa Fragrances | “Enjoy additional 10% off when you buy marshmallow bundle!” | — | 950 | ✅ all |
| `vanilla-bundle` | Vanilla Bundle | Siwa Fragrances | “Vanilla Bundle – Your Everyday Glow in Luxury.” Layering Vanilla + Silk Vanilla Body Lotion + Silk Vanilla Body Splash. | — | 1,060 – 1,555 | ❌ **sold out** |

### 3.7 Body Splash (5)

Single 125 ML variant each, 375–380 EGP, all `Siwa Fragrances`, all **untagged**, all in stock.
These are the only products with more than 2 images (`apple-pie`, `silk-vanilla`, `sweet-rum` have 3).
Note the option value casing is inconsistent: `125ML` on four, `125ml` on `sweet-rum`.

| Handle | Title | Inspired-by | Scent description (from `body_html`) | Fragrance notes | Price EGP | Stock |
|---|---|---|---|---|---|---|
| `apple-pie` | Apple Pie | Siwa Fragrances | “A long-lasting body splash enriched with vitamin E… warm vanilla, delicate Apple, sweet praline, rich cinnamon.” | *(unstructured)* Vanilla, Apple, Praline, Cinnamon | 375 | ✅ all |
| `marshmallow` | Marshmallow | Siwa Fragrances | “A long-lasting body splash enriched with vitamin E, sweet, warm blend of vanilla, sugar, and fluffy marshmallow.” | *(unstructured)* Vanilla, Sugar, Marshmallow | 375 | ✅ all |
| `silk-vanilla` | Silk Vanilla | Siwa Fragrances | “…warm vanilla, delicate orchid, sweet sugar, and rich amber… lingers all day.” | *(unstructured)* Vanilla, Orchid, Sugar, Amber | 375 | ✅ all |
| `sweet-rum` | Sweet Rum | Siwa Fragrances | “…warm vanilla, delicate dates, sweet praline, and rich cinnamon… lingers all night.” | *(unstructured)* Vanilla, Dates, Praline, Cinnamon | 375 | ✅ all |
| `vanilla-91` | Vanilla 91 | Siwa Fragrances | “…creamy vanilla, soft jasmine petals and glowing sandalwood… sweet, cozy, effortlessly elegant.” Marked “Limited”. | *(unstructured)* Vanilla, Jasmine, Sandalwood | 380 | ✅ all |

### 3.8 Body Lotion (1)

The only product with a populated `product_type` (`body lotion`) and the only 120 ML size in the catalog.
It is **sold out**, which also blocks the `vanilla-bundle` that contains it (also sold out).

| Handle | Title | Inspired-by | Scent description (from `body_html`) | Fragrance notes | Price EGP | Stock |
|---|---|---|---|---|---|---|
| `silk-vanilla-body-lotion` | Silk Vanilla Body Lotion | Siwa Fragrances | “Lightweight lotion enriched with Vitamin E, Panthenol, Shea Butter & Cocoa Butter… warm vanilla scent.” | *(unstructured)* Vanilla | 350 | ❌ **sold out** |

---

## 4. Pricing analysis

### 4.1 Price ladder by size tier

Computed over single-option products only (the 16 bundle variants are excluded and handled in §4.3).
`soul-poudree` has a malformed option value `100` (missing “ml”) — counted in the 100 ml tier.

| Size tier | Variants | Min | P25 | Median | P75 | Max | Mean |
|---|---:|---:|---:|---:|---:|---:|---:|
| 30 ml | 44 | 400 | 462 | 550 | 750 | 850 | 598 |
| 50 ml | 47 | 600 | 700 | 850 | 1,100 | 1,300 | 883 |
| 100 ml | 45 | 1,000 | 1,150 | 1,400 | 1,825 | 2,300 | 1,486 |
| 125 ml (body splash) | 5 | 375 | 375 | 375 | 378 | 380 | 376 |
| 120 ml (body lotion) | 1 | 350 | 350 | 350 | 350 | 350 | 350 |

| Tier | Cheapest product | Dearest product |
|---|---|---|
| 30 ml | `irresistible-vanilla` 400 | `summer-elegance` 850 |
| 50 ml | `irresistible-vanilla` 600 | `coco-woods` 1,300 |
| 100 ml | `bare-glow` 1,000 | `coco-woods` 2,300 |

**Size-step multipliers.** 43 products offer the full 30 / 50 / 100 ml ladder. Median step-ups:
30 ml → 50 ml **×1.50** (range 1.36–1.70), 50 ml → 100 ml **×1.67** (range 1.50–1.84),
30 ml → 100 ml **×2.50** (range 2.09–2.92). The 100 ml is never priced at a pure 3.33× the 30 ml —
volume discounting is built into the ladder on every single product.

### 4.2 Price segments in the catalog

Segmenting on the 100 ml price (the anchor size; 45 products offer it) produces four clean tiers.
Lists below are complete, not samples.

| Segment | 100 ml price | Products | Handles |
|---|---|---:|---|
| **Entry / layering** | 1,000 – 1,100 | 10 | `bare-glow`, `irresistible-vanilla`, `layering-lychee`, `layering-pistachio`, `layering-vanilla`, `pink-arrogance` (1,000) · `bleu-intense`, `soul-poudree` (1,050) · `alluring-rose`, `sundaze` (1,100) |
| **Core** | 1,150 – 1,400 | 13 | `belle-riche`, `coffee-vanilla` (1,150) · `boujee-blush`, `lagoon-flair` (1,200) · `chocolate-creme`, `hot-male`, `libre-desire`, `male-elixir` (1,250) · `insane-pineapple`, `iris-elixir` (1,350) · `marasi`, `pink-allure`, `soiree` (1,400) |
| **Premium** | 1,500 – 1,850 | 15 | `pacific-elixir` (1,500) · `caramel-vanigliato`, `carnal-trail`, `hot-vanilla` (1,550) · `hibiscusex`, `sweet-oud` (1,650) · `summer-holidays` (1,700) · `aurableu`, `lady-killer`, `siwa-trail` (1,750) · `mango-on-woods` (1,800) · `absolute-drunk`, `citrine`, `mango-pineapple`, `mawj` (1,850) |
| **Top** | 1,900 – 2,300 | 7 | `bleu-exclusive`, `lost-on-you` (1,900) · `drunk-gold` (1,950) · `stellar-nights` (2,050) · `gourmet` (2,100) · `summer-elegance` (2,150) · `coco-woods` (2,300) |

The 11 products with no 100 ml at all: the 5 body splashes and the body lotion (fixed 125 / 120 ML),
the 3 bundles, `layering-apple` (30 + 50 ml only) and `luna-di-roma` (50 ml only).
`hot-male` and `iris-elixir` skip the 30 ml but do offer 100 ml.

Body care sits in a separate, much lower band: **350 – 380 EGP** flat, no size ladder. That is 88 % of
the cheapest 30 ml perfume (400 EGP) — body splash is the deliberate entry-price / basket-filler product.

The announcement bar (`07-COPY-CONTENT.md §1`) offers free shipping over **1,500 EGP**. Only 27 of 158
variants (17.1 %) exceed that threshold on their own, so the offer is structurally a **multi-item**
incentive, not a single-item one.

### 4.3 Bundle pricing vs buying the components separately

| Bundle variant | Bundle price | Sum of components at list | Real saving | `compare_at_price` shown | Discount the site *claims* |
|---|---:|---:|---:|---:|---:|
| `layering-30-ml-bundle` 30/30/30 | 1,105 | 1,350 (3 × 450) | **−18.1 %** | 1,650 | −33.0 % |
| `layering-30-ml-bundle` 50/50/50 | 1,635 | 1,950 (3 × 650) | **−16.2 %** | 2,300 | −28.9 % |
| `layering-30-ml-bundle` 50/50/100 | 1,995 | 2,300 (650+650+1,000) | **−13.3 %** | 2,750 | −27.5 % |
| `marshmallow-bundle` 125/50 | 950 | 1,075 (375 + 700) | **−11.6 %** | 1,250 | −24.0 % |
| `vanilla-bundle` 125/120/30 | 1,060 | 1,175 (375+350+450) | **−9.8 %** | 1,175 | −9.8 % |
| `vanilla-bundle` 125/120/50 | 1,240 | 1,375 (375+350+650) | **−9.8 %** | 1,375 | −9.8 % |
| `vanilla-bundle` 125/120/100 | 1,555 | 1,725 (375+350+1,000) | **−9.9 %** | 1,725 | −9.9 % |

`vanilla-bundle` is the only bundle whose `compare_at_price` equals the true sum of its components.
`layering-30-ml-bundle` and `marshmallow-bundle` use `compare_at_price` values that are **higher than the
sum of their parts** (1,650 vs a real 1,350; 1,250 vs a real 1,075), so the strike-through discount shown
on the PDP overstates the real saving. Their own body copy claims “15%” and “10%” respectively, which
matches neither the real saving nor the displayed one. Flag for the rebuild.

### 4.4 `compare_at_price` data hygiene

| State | Variants |
|---|---:|
| `null` | 73 |
| `"0.00"` (a literal zero, not a real compare-at) | 66 |
| Genuine compare-at > price | 19 |

The 19 genuine compare-at values belong to exactly **4 products**: the 3 bundles (16 variants) and
`belle-riche` (3 variants, −15.4 % / −25.0 % / −20.7 %). Everything else is full price. The 66 `"0.00"`
entries are inert in Liquid (falsy) but will break any naive `compare_at_price > 0` numeric comparison in
a headless/JS rebuild — normalise them.

---

## 5. Top 15 products by review volume

820 reviews across 54 of 56 products; weighted average **4.9807 ★** (shop-wide Judge.me counter: 1,176
@ 4.98). The top 15 below account for **555 of 820 reviews (67.7 %)** — demand is concentrated, and the
median product has just 9 reviews.

| # | Handle | Title | ★ | Reviews | Price EGP | Stock | Tags | Demand signal (from `raw/reviews_complete.json`) |
|---:|---|---|---:|---:|---|---|---|---|
| 1 | `layering-vanilla` | Layering Vanilla | 5.00 | 98 | 450 – 1,000 | ✅ all | Best Selling, Men, Women | **Catalog #1 by a wide margin** — 98 reviews, a perfect 5.00, and fully in stock in all three sizes. A 450 EGP entry-price layering product is the store's single biggest review engine; reviews cite scent, longevity and packaging together (“بجد تحفه سواء ريحه لثبات للتغليف ١٠ من ١٠”). The whole `layering-*` family should be merchandised off this. |
| 2 | `mawj` | Mawj | 4.99 | 68 | 800 – 1,850 | ✅ all | Best Selling, Men | The store's **own creation outranks every dupe but one** — 68 reviews at 4.99, in stock across all sizes, published 2022. Reviews praise the marine concept and compliment-generation (“i got 3 compliments on the 1st day wearing it”). The strongest available argument for investing in Original Creations. |
| 3 | `boujee-blush` | Boujee Blush | 4.97 | 59 | 500 – 1,200 | ⚠️ 2/3 | Best Selling, new, Women | Top women-tagged product. Reviews are short and enthusiastic (“More than amazing im feeling like marshmallow”) and several cross-sell to `bare-glow`. The 100 ml is sold out — a top-3 seller cannot be bought in its largest size. |
| 4 | `hibiscusex` | Hibiscusex | 4.98 | 56 | 700 – 1,650 | ⚠️ 1/3 | Best Selling, Men, Women | 56 reviews and **only the 100 ml left buyable** (50 ml and 30 ml both sold out) — the worst stock position of any top-5 product. Reviews are unusually descriptive about the drydown (“the moment it settles the aroma is very intoxicating”). |
| 5 | `drunk-gold` | Drunk Gold | 5.00 | 46 | 750 – 1,950 | ⚠️ 2/3 | Best Selling, Men, Women | 46 reviews at a perfect 5.00. Reviews emphasise performance (“اداء مثالي” = perfect performance). 100 ml sold out. Highest-priced product in the top 6 (up to 1,950). |
| 6 | `caramel-vanigliato` | Caramel vanigliato | 4.95 | 43 | 550 – 1,550 | ✅ all | Best Selling, Men, Women | 43 reviews and fully in stock in all three sizes. Reviews repeatedly cite multi-day longevity (“it lasts days on clothes and a full day on skin”), which is the single most persuasive claim available for PDP copy. |
| 7 | `lady-killer` | Lady killer | 4.96 | 26 | 750 – 1,750 | ✅ all | Best Selling, Men | Top men-only product. Reviews mix praise with repeat-purchase intent blocked by stockouts (“اشتريت منها و عايز اشتري منها تاني وللأسف آوت أوف ستوك”). |
| 8 | `alluring-rose` | Alluring Rose | 4.96 | 24 | 500 – 1,100 | ❌ sold out | Women | Oldest product in the catalog (2021-08-20) and **entirely sold out**. Reviews are explicit restock demand: “Please make it available again”, “Nzlohaaaa taniiii please”, “Got many compliments on this pls restock”. Strongest unmet-demand signal in the dataset. |
| 9 | `marasi` | Marasi | 5.00 | 23 | 550 – 1,400 | ⚠️ 2/3 | Men, Women | 23 reviews at a perfect 5.00 yet carries **no `Best Selling` tag** — a merchandising miss. 30 ml sold out. |
| 10 | `bare-glow` | Bare Glow | 4.95 | 21 | 450 – 1,000 | ⚠️ 1/3 | — | Completely **untagged** despite 21 reviews. Reviews position it explicitly against the original (“more creamy than burberry goddess”). 30 ml and 100 ml both sold out; only 50 ml buyable. |
| 11 | `citrine` | Citrine | 5.00 | 20 | 750 – 1,850 | ❌ sold out | Best Selling, Men | 20 reviews, perfect 5.00, **entirely sold out** — and reviewers say it is chronically so (“Was amazing..but always sold out..”). Carries the longest description in the catalog. |
| 12 | `bleu-exclusive` | Bleu Exclusive | 5.00 | 19 | 750 – 1,900 | ✅ all | — | 19 reviews in ~5 months (published 2026-02-27) — the fastest accrual in the catalog. Reviews explicitly benchmark it against the original (“I had the original le exclusive and i know that channel dupes are never been copied…”) — the dupe positioning is working. Untagged. |
| 13 | `coffee-vanilla` | Coffee Vanilla | 5.00 | 18 | 550 – 1,150 | ⚠️ 2/3 | Best Selling, Men, new, Women | Second-best Original Creation after `mawj`. Reviews call out tiramisu (“نفس ريحه التراميسو بالظبط”) and note separation over time. 100 ml sold out. |
| 14 | `irresistible-vanilla` | Irresistible Vanilla | 4.94 | 18 | 400 – 1,000 | ✅ all | Best Selling | Cheapest product in the top 15 and fully in stock. Reviews say it is **under-marketed** relative to how it performs (“انا جبته من الريفيوهات عالموقع مع انهم عالصفحة بتاعت الفيس ماجابوش سيرته”) — on-site reviews, not social, are what sold it. |
| 15 | `coco-woods` | Coco Woods | 4.94 | 16 | 850 – 2,300 | ⚠️ 2/3 | Men, Women | The **most expensive product in the catalog** (2,300 EGP at 100 ml) still clears 16 reviews. Reviews are the most emphatic in the dataset (“This might be the best fragrance I've used by far”). 100 ml sold out — the sold-out size is the one that carries the price ceiling. |

**What the review distribution signals**

| Observation | Evidence |
|---|---|
| Demand is concentrated in **sweet / gourmand / vanilla** | 12 of the top 15 carry a gourmand note (Vanilla, Marshmallow, Caramel, Coffee, Sugar, Chocolate, Praline, Cacao); the only three that don't are `alluring-rose`, `marasi` and `citrine`. `Vanilla` alone appears in **35 of 56** products (62 %). |
| The store systematically **stocks out of its winners** | 9 of the top 15 have at least one sold-out size; 2 are entirely sold out (`alluring-rose`, `citrine`) and both have reviews explicitly demanding restock. |
| The **100 ml is the chronic gap** | 23 of the 46 sold-out single-option variants (50 %) are the 100 ml — the largest and highest-value size. 28 products are stock-affected in total. |
| Ratings carry **no discriminating information** | 41 of the 54 reviewed products sit at exactly 5.00 and the whole spread is 4.78–5.00; only `luna-di-roma` (4.78) and `insane-pineapple` (4.80) fall below 4.90. A star filter would be useless; sort-by-review-count is the only meaningful ranking. |
| Review volume tracks **catalog age plus velocity**, not recency alone | The two biggest products are 2023 and 2022 releases (`layering-vanilla` 98, `mawj` 68), while the fastest accrual rates belong to 2026 drops (`bleu-exclusive` 19 in ~5 months, `pink-allure` 14 in ~3 months). Only the two most recently created products (`soiree`, `sundaze`) have none. |
| **356 reviews are unattributable** | Judge.me reports 1,176 shop-wide but only 820 attach to the 56 published products — the remaining 30 % belong to products that have been unpublished or deleted. Any migration that reads reviews per published product will silently drop them. |
| Reviews are **bilingual** (English + Arabic/Franco-Arabic) | e.g. “Nzlohaaaa taniiii please”, “خرررافي”. Store locale is `en`-only — review rendering must not assume LTR-only text. |

---

## 6. Inventory signals

### 6.1 Fully sold-out products (10 of 56)

Every variant has `available: false`. These products still render on the storefront.

| Handle | Title | Variants | Price EGP | Reviews | Published |
|---|---|---:|---|---:|---|
| `siwa-trail` | Siwa Trail | 3 | 600 – 1,750 | 5 | 2026-04-25 |
| `lost-on-you` | Lost On You | 3 | 750 – 1,900 | 4 | 2026-04-24 |
| `absolute-drunk` | Absolute Drunk | 3 | 750 – 1,850 | 2 | 2026-03-14 |
| `bleu-intense` | Bleu Intense | 3 | 500 – 1,050 | 7 | 2025-10-21 |
| `silk-vanilla-body-lotion` | Silk Vanilla Body Lotion | 1 | 350 | 7 | 2025-09-29 |
| `vanilla-bundle` | Vanilla Bundle | 3 | 1,060 – 1,555 | 11 | 2025-07-17 |
| `sweet-oud` | Sweet Oud | 3 | 650 – 1,650 | 1 | 2025-03-23 |
| `iris-elixir` | Iris elixir | 2 | 850 – 1,350 | 6 | 2024-06-14 |
| `citrine` | Citrine | 3 | 750 – 1,850 | 20 | 2022-04-07 |
| `alluring-rose` | Alluring Rose | 3 | 500 – 1,100 | 24 | 2021-08-20 |

Corrected review counts change the read-out here: the three most-reviewed products in this table
(`alluring-rose` 24, `citrine` 20, `vanilla-bundle` 11) are **proven sellers that are unbuyable**, not
long-tail SKUs. These 10 unbuyable products hold **87 reviews** between them.

### 6.2 Partially sold-out products (18 of 56)

| Handle | Title | Sold-out sizes | Remaining |
|---|---|---|---:|
| `aurableu` | Aurableu | 100 ml | 2 of 3 |
| `belle-riche` | Belle Riche | 100 ml | 2 of 3 |
| `bare-glow` | Bare Glow | 30 ml, 100 ml | 1 of 3 |
| `mango-pineapple` | Mango Pineapple | 100 ml, 30 ml | 1 of 3 |
| `drunk-gold` | Drunk Gold | 100 ml | 2 of 3 |
| `boujee-blush` | Boujee Blush | 100 ml | 2 of 3 |
| `libre-desire` | Libre Desire | 100 ml | 2 of 3 |
| `gourmet` | Gourmet | 100 ml | 2 of 3 |
| `chocolate-creme` | Chocolate Creme | 100 ml, 30 ml | 1 of 3 |
| `coffee-vanilla` | Coffee Vanilla | 100 ml | 2 of 3 |
| `layering-apple` | Layering Apple | 30 ml | 1 of 2 |
| `coco-woods` | Coco Woods | 100 ml | 2 of 3 |
| `marasi` | Marasi | 30 ml | 2 of 3 |
| `hibiscusex` | Hibiscusex | 50 ml, 30 ml | 1 of 3 |
| `layering-lychee` | Layering Lychee | 100 ml | 2 of 3 |
| `mango-on-woods` | Mango on woods | 100 ml | 2 of 3 |
| `insane-pineapple` | Insane Pineapple | 100 ml | 2 of 3 |
| `summer-elegance` | summer elegance | 100 ml | 2 of 3 |

**Sold-out concentration by size** — of the 46 sold-out single-option variants:

| Size | Sold-out variants |
|---|---:|
| 100ML | 23 |
| 30ML | 13 |
| 50ML | 9 |
| 120ML | 1 |

The 100 ml is the most frequently out-of-stock size by a wide margin. A rebuild should surface a
**“notify me when back in stock”** affordance at the *variant* level, not the product level.

### 6.3 Products with zero reviews (2 of 56)

Absent from `raw/reviews_complete.json`. Only two products in the entire catalog have never been
reviewed, and both are recent *creations* (the `published_at` date on `soiree` is backdated — it was
created 2025-09-07).

| Handle | Title | Published | Created | Tags | Price EGP | Stock |
|---|---|---|---|---|---|---|
| `soiree` | Soiree | 2022-04-05 | 2025-09-07 | — | 550 – 1,400 | ✅ all |
| `sundaze` | Sundaze | 2026-07-25 | 2026-07-25 | — | 500 – 1,100 | ✅ all |

Both are **untagged**, so neither appears in any tag-driven collection or filter — the likeliest
explanation for zero reviews is zero merchandising, not zero appeal.

**The `Best Selling` tag still does not track demand.** 23 products carry it, but 8 of them have fewer
than 10 reviews (`layering-apple` 1, `sweet-oud` 1, `summer-elegance` 2, `stellar-nights` 3,
`gourmet` 6, `layering-lychee` 6, `libre-desire` 7, `summer-holidays` 7), while 5 of the top 15 by
review volume carry **no** `Best Selling` tag at all (`alluring-rose` 24, `marasi` 23, `bare-glow` 21,
`bleu-exclusive` 19, `coco-woods` 16). The tag is manually curated — do not use it as a sort key;
sort by review count.

### 6.4 Imagery

| Image count | Products | Handles |
|---:|---:|---|
| 1 | 50 | *(all others)* |
| 2 | 3 | `gourmet`, `sweet-oud`, `vanilla-91` |
| 3 | 3 | `apple-pie`, `silk-vanilla`, `sweet-rum` |

**50 of 56 products ship with exactly one image.** There is no lifestyle shot, no back-of-bottle, no
scale reference for 39 of the 40 inspired-by perfumes. Consequences for a rebuild:

- A PDP gallery/thumbnail strip will render as a single static image for 89 % of the catalog — do not
  build a layout that looks broken with one image.
- Product-card hover-to-second-image (a Prestige feature) will be inert on 50 of 56 cards.
- No variant has a `featured_image` (`variants[].featured_image` is `null` on all 158). Variant-image
  switching is impossible with the current data.

### 6.5 Other data defects worth fixing in a rebuild

| Defect | Evidence | Impact |
|---|---|---|
| Option **name** casing inconsistent | `size` ×44, `Size` ×9, plus `silk vanilla (size)`, `Layering Lychee`, `Layerng Pistachio` (typo), `Marshmallow (size)`, `Boujee Blush (size)` | Any `option_name == "Size"` lookup fails on 47 products |
| Option **value** casing inconsistent | `30 ml`/`30ML`, `50 ml`/`50ML`, `125ML`/`125ml`, `120ML`, and a bare `100` on `soul-poudree` | Size swatches will not group or sort correctly |
| `sku` is `null` on **all 158 variants** | `variants[].sku` | No SKU-based inventory or ERP integration is possible |
| `grams` is `0` on **all 158 variants** | `variants[].grams` | Weight-based shipping rates cannot work |
| `taxable: false` on all variants | `variants[].taxable` | Intentional for EG pricing, but note it |
| `product_type` empty on 55 of 56 | `products[].product_type` | No native category facet exists |
| Title casing inconsistent | `summer elegance`, `Iris elixir`, `Lady killer`, `Mango on woods` vs Title Case elsewhere | Cards use `text-transform: uppercase` (per design tokens) which masks it on grids but not in `<title>`/meta |
| Typo in an option name | `Layerng Pistachio` on `layering-30-ml-bundle` | Visible to customers in the variant picker |

---

## 7. Full fragrance-notes index

Every distinct note mentioned anywhere in `products[].body_html`, normalised (e.g. “Madagascar Vanilla”,
“Bourbon Vanilla”, “creamy vanilla” → **Vanilla**; “tonka” / “tonka beans” → **Tonka Bean**).
**104 distinct notes** across the catalog.

Position legend — **T** = appears as a Top note, **H** = Heart/Middle, **B** = Base, **—** = the source
lists notes without positions (Template C flat `Notes:` line or prose).

| Note | Position(s) | # Products | Products |
|---|---|---:|---|
| Almond | T | 1 | `pink-arrogance` |
| Amaretto | T | 1 | `coffee-vanilla` |
| Amber | T/H/B/— | 15 | `absolute-drunk`, `belle-riche`, `bleu-exclusive`, `bleu-intense`, `hot-male`, `iris-elixir`, `irresistible-vanilla`, `luna-di-roma`, `mango-on-woods`, `mango-pineapple`, `pacific-elixir`, `silk-vanilla`, `siwa-trail`, `soiree`, `stellar-nights` |
| Ambergris | B/— | 2 | `lost-on-you`, `summer-holidays` |
| Amberwood | — | 1 | `layering-vanilla` |
| Ambrette | H | 1 | `citrine` |
| Ambroxan | B/— | 2 | `citrine`, `summer-elegance` |
| Apple | T/— | 2 | `apple-pie`, `layering-apple` |
| Apricot | H/— | 2 | `pacific-elixir`, `pink-arrogance` |
| Aromatic Notes | T/H | 2 | `aurableu`, `bleu-exclusive` |
| Basil | — | 1 | `pacific-elixir` |
| Benzoin | B | 2 | `luna-di-roma`, `sundaze` |
| Bergamot | T/— | 6 | `bleu-intense`, `insane-pineapple`, `mango-pineapple`, `pink-allure`, `summer-elegance`, `summer-holidays` |
| Berries | H/— | 2 | `gourmet`, `layering-apple` |
| Bitter Orange | T/— | 3 | `lost-on-you`, `mawj`, `sundaze` |
| Black Tea | — | 1 | `summer-elegance` |
| Blackcurrant | T/— | 6 | `absolute-drunk`, `gourmet`, `hibiscusex`, `layering-apple`, `layering-lychee`, `pacific-elixir` |
| Blood Orange | T | 1 | `lost-on-you` |
| Boozy Accord | T | 1 | `absolute-drunk` |
| Butter | — | 1 | `gourmet` |
| Cacao | — | 2 | `bare-glow`, `irresistible-vanilla` |
| Caramel | T/H | 3 | `caramel-vanigliato`, `lost-on-you`, `sweet-oud` |
| Cardamom | T/— | 3 | `hot-vanilla`, `lady-killer`, `sweet-oud` |
| Cedar | B | 2 | `bleu-intense`, `soul-poudree` |
| Cedrat | — | 1 | `pacific-elixir` |
| Chocolate | — | 1 | `chocolate-creme` |
| Cinnamon | T/H/— | 7 | `apple-pie`, `carnal-trail`, `hot-male`, `hot-vanilla`, `summer-elegance`, `sweet-oud`, `sweet-rum` |
| Citron | — | 1 | `summer-elegance` |
| Citrus | T | 2 | `aurableu`, `bleu-exclusive` |
| Coconut | H/— | 4 | `boujee-blush`, `coco-woods`, `lagoon-flair`, `mango-pineapple` |
| Coffee | T | 1 | `coffee-vanilla` |
| Cognac | — | 1 | `drunk-gold` |
| Cotton Candy | — | 1 | `layering-pistachio` |
| Coumarin | H/B | 2 | `caramel-vanigliato`, `soul-poudree` |
| Creamy Accord | H | 2 | `lost-on-you`, `mango-pineapple` |
| Croissant | — | 1 | `gourmet` |
| Dates | H/— | 3 | `pacific-elixir`, `sweet-oud`, `sweet-rum` |
| Frangipani | H | 1 | `sundaze` |
| Ginger | H/B/— | 4 | `aurableu`, `citrine`, `mango-on-woods`, `summer-holidays` |
| Grapefruit | T/— | 2 | `citrine`, `insane-pineapple` |
| Green Apple | — | 1 | `lady-killer` |
| Green Notes | — | 1 | `marasi` |
| Hazelnut | — | 2 | `layering-pistachio`, `siwa-trail` |
| Hibiscus | — | 1 | `hibiscusex` |
| Honey | H/— | 3 | `caramel-vanigliato`, `libre-desire`, `male-elixir` |
| Ice Cream | H | 1 | `coffee-vanilla` |
| Iris | T/— | 3 | `iris-elixir`, `lagoon-flair`, `mawj` |
| Jasmine | T/H/— | 9 | `belle-riche`, `lady-killer`, `layering-apple`, `layering-vanilla`, `luna-di-roma`, `mawj`, `pink-arrogance`, `soul-poudree`, `vanilla-91` |
| Juniper | T | 1 | `hot-male` |
| Labdanum | H/B/— | 3 | `bleu-exclusive`, `soiree`, `sundaze` |
| Lavender | H/— | 6 | `bare-glow`, `bleu-intense`, `hot-male`, `lady-killer`, `libre-desire`, `male-elixir` |
| Leather | B/— | 3 | `iris-elixir`, `soiree`, `sweet-oud` |
| Lemon | T/— | 5 | `bleu-intense`, `mango-on-woods`, `mango-pineapple`, `pacific-elixir`, `sundaze` |
| Liquor | — | 1 | `drunk-gold` |
| Lychee | T/— | 3 | `alluring-rose`, `layering-apple`, `layering-lychee` |
| Mandarin | T/— | 3 | `lost-on-you`, `pink-allure`, `summer-holidays` |
| Mango | T/— | 2 | `mango-on-woods`, `mango-pineapple` |
| Marshmallow | — | 3 | `boujee-blush`, `layering-pistachio`, `marshmallow` |
| Mint | T/— | 3 | `bleu-intense`, `male-elixir`, `pacific-elixir` |
| Moss | — | 1 | `insane-pineapple` |
| Musk | H/B/— | 16 | `alluring-rose`, `aurableu`, `boujee-blush`, `caramel-vanigliato`, `citrine`, `coco-woods`, `hot-vanilla`, `irresistible-vanilla`, `layering-apple`, `layering-vanilla`, `mango-on-woods`, `mango-pineapple`, `mawj`, `pink-allure`, `pink-arrogance`, `soul-poudree` |
| Nagarmotha | — | 1 | `mango-on-woods` |
| Neroli | T/— | 2 | `pink-arrogance`, `summer-elegance` |
| Orange | — | 4 | `chocolate-creme`, `pacific-elixir`, `summer-elegance`, `summer-holidays` |
| Orange Blossom | T/— | 4 | `libre-desire`, `pink-arrogance`, `soul-poudree`, `stellar-nights` |
| Orchid | — | 2 | `layering-vanilla`, `silk-vanilla` |
| Oud | H/— | 2 | `mawj`, `sweet-oud` |
| Ozonic Notes | — | 1 | `mawj` |
| Palo Santo | — | 1 | `coco-woods` |
| Passionfruit | T | 1 | `sundaze` |
| Patchouli | H/B/— | 5 | `absolute-drunk`, `insane-pineapple`, `iris-elixir`, `lady-killer`, `soul-poudree` |
| Pear | — | 3 | `alluring-rose`, `belle-riche`, `siwa-trail` |
| Peony | H/— | 2 | `alluring-rose`, `pink-allure` |
| Pepper | — | 1 | `lady-killer` |
| Pineapple | T/H/— | 5 | `bleu-intense`, `insane-pineapple`, `lagoon-flair`, `mango-pineapple`, `mawj` |
| Pink Pepper | T | 2 | `hot-male`, `pink-allure` |
| Pistachio | — | 1 | `layering-pistachio` |
| Powdery Accord | H | 1 | `pink-allure` |
| Praline | — | 4 | `apple-pie`, `drunk-gold`, `hot-vanilla`, `sweet-rum` |
| Raspberry | H/— | 2 | `drunk-gold`, `layering-apple` |
| Red Berries | — | 2 | `irresistible-vanilla`, `mango-on-woods` |
| Resin | — | 1 | `soiree` |
| Rose | T/H/— | 5 | `alluring-rose`, `hibiscusex`, `layering-apple`, `pink-allure`, `soul-poudree` |
| Rum | T/— | 3 | `carnal-trail`, `layering-pistachio`, `lost-on-you` |
| Saffron | T | 1 | `sweet-oud` |
| Sage | H | 1 | `hot-male` |
| Salt | — | 1 | `marasi` |
| Sandalwood | H/B/— | 7 | `bleu-exclusive`, `bleu-intense`, `gourmet`, `iris-elixir`, `mawj`, `pink-arrogance`, `vanilla-91` |
| Sea Notes | — | 2 | `marasi`, `mawj` |
| Solar Accords | H | 1 | `sundaze` |
| Spices | B | 1 | `lost-on-you` |
| Strawberry | — | 1 | `boujee-blush` |
| Suede | B | 1 | `hot-male` |
| Sugar | H/B/— | 9 | `coffee-vanilla`, `irresistible-vanilla`, `layering-apple`, `layering-lychee`, `layering-vanilla`, `lost-on-you`, `marshmallow`, `silk-vanilla`, `sweet-oud` |
| Tobacco | — | 2 | `carnal-trail`, `male-elixir` |
| Toffee | H | 1 | `hot-male` |
| Tonka Bean | B/— | 13 | `belle-riche`, `bleu-intense`, `drunk-gold`, `gourmet`, `hot-male`, `iris-elixir`, `irresistible-vanilla`, `lagoon-flair`, `layering-vanilla`, `libre-desire`, `male-elixir`, `soiree`, `sweet-oud` |
| Vanilla | T/H/B/— | 35 | `absolute-drunk`, `apple-pie`, `bare-glow`, `belle-riche`, `bleu-exclusive`, `boujee-blush`, `caramel-vanigliato`, `carnal-trail`, `chocolate-creme`, `coco-woods`, `coffee-vanilla`, `gourmet`, `hibiscusex`, `hot-male`, `hot-vanilla`, `irresistible-vanilla`, `lady-killer`, `layering-apple`, `layering-lychee`, `layering-vanilla`, `libre-desire`, `lost-on-you`, `luna-di-roma`, `male-elixir`, `marshmallow`, `mawj`, `pink-allure`, `silk-vanilla`, `silk-vanilla-body-lotion`, `siwa-trail`, `soiree`, `sundaze`, `sweet-oud`, `sweet-rum`, `vanilla-91` |
| Vetiver | B/— | 3 | `alluring-rose`, `mawj`, `soul-poudree` |
| Violet | T/H/— | 3 | `hot-male`, `mawj`, `pink-arrogance` |
| Watery Notes | — | 1 | `alluring-rose` |
| Whipped Cream | — | 2 | `boujee-blush`, `layering-pistachio` |
| White Florals | H | 2 | `aurableu`, `mango-pineapple` |
| Woods | H/B/— | 18 | `absolute-drunk`, `aurableu`, `bleu-exclusive`, `chocolate-creme`, `hot-vanilla`, `insane-pineapple`, `irresistible-vanilla`, `lady-killer`, `lagoon-flair`, `lost-on-you`, `mango-on-woods`, `mango-pineapple`, `marasi`, `pink-allure`, `siwa-trail`, `soiree`, `stellar-nights`, `summer-elegance` |

### 7.1 Most-used notes — the filter shortlist

| Rank | Note | Products | Share of catalog |
|---:|---|---:|---:|
| 1 | Vanilla | 35 | 62 % |
| 2 | Woods | 18 | 32 % |
| 3 | Musk | 16 | 29 % |
| 4 | Amber | 15 | 27 % |
| 5 | Tonka Bean | 13 | 23 % |
| 6 | Sugar | 9 | 16 % |
| 7 | Jasmine | 9 | 16 % |
| 8 | Sandalwood | 7 | 12 % |
| 9 | Cinnamon | 7 | 12 % |
| 10 | Lavender | 6 | 11 % |
| 11 | Blackcurrant | 6 | 11 % |
| 12 | Bergamot | 6 | 11 % |
| 13 | Rose | 5 | 9 % |
| 14 | Pineapple | 5 | 9 % |
| 15 | Patchouli | 5 | 9 % |
| 16 | Lemon | 5 | 9 % |
| 17 | Praline | 4 | 7 % |
| 18 | Orange Blossom | 4 | 7 % |
| 19 | Orange | 4 | 7 % |
| 20 | Ginger | 4 | 7 % |

**Read-out for a rebuild.** Vanilla is in 62 % of the catalog and Woods / Musk / Amber / Tonka Bean form the
next band. A flat “filter by note” facet built on all 104 notes would be unusable — 41 of the 104 notes
appear in only a single product. A workable facet needs a curated top layer, e.g.:

| Proposed facet | Underlying notes | Products covered |
|---|---|---:|
| Gourmand / Sweet | Vanilla, Sugar, Caramel, Praline, Marshmallow, Chocolate, Cacao, Coffee, Ice Cream, Toffee, Cotton Candy, Croissant, Butter, Honey, Amaretto, Creamy Accord | **38** |
| Amber / Resinous | Amber, Amberwood, Ambroxan, Ambergris, Benzoin, Labdanum, Resin, Tonka Bean, Coumarin | **29** |
| Woody | Woods, Sandalwood, Cedar, Patchouli, Vetiver, Palo Santo, Nagarmotha | **27** |
| Fruity | Mango, Pineapple, Lychee, Apple, Green Apple, Pear, Raspberry, Strawberry, Blackcurrant, Berries, Red Berries, Apricot, Passionfruit, Dates, Coconut | **25** |
| Floral | Rose, Jasmine, Peony, Violet, Iris, Orange Blossom, Neroli, Orchid, Hibiscus, Frangipani, White Florals | **22** |
| Musky / Powdery | Musk, Ambrette, Powdery Accord | **16** |
| Fresh / Citrus | Citrus, Bergamot, Lemon, Orange, Bitter Orange, Blood Orange, Mandarin, Grapefruit, Citron, Cedrat | **15** |
| Spicy | Cinnamon, Cardamom, Pepper, Pink Pepper, Ginger, Saffron, Spices | **14** |
| Aromatic / Herbal | Lavender, Mint, Basil, Sage, Juniper, Aromatic Notes, Black Tea | **10** |
| Leather / Smoky / Oud | Leather, Suede, Tobacco, Oud | **7** |
| Boozy | Rum, Cognac, Liquor, Boozy Accord | **5** |
| Aquatic / Marine | Sea Notes, Ozonic Notes, Watery Notes, Salt, Green Notes, Moss, Solar Accords | **5** |
| Nutty / Creamy | Pistachio, Hazelnut, Almond, Whipped Cream | **4** |

The 13 facets above are exhaustive — every one of the 104 notes maps to exactly one facet. Coverage
counts are unions of the per-note product sets in §7 (products appear in more than one facet, so the
column does not sum to 56). Gourmand alone covers 38 of 56 products (68 %), which matches the review
data in §5 — 12 of the 15 most-reviewed products are gourmand: this is a gourmand house first and
everything else second.

---

## 8. Source-data caveats

| Caveat | Detail |
|---|---|
| Collection membership was not captured | `raw/collections.json` gives counts only, and the `products_count` values are internally inconsistent (`for-him` 83, `for-her` 80, `perfumes` 82 — all larger than the 56-product catalog). Category assignment in §1.1 and §3 is therefore derived from `vendor` + `body_html` + variant sizing, not from collection membership. |
| Note extraction is partly manual | **18 of 56** products expose machine-readable notes (≥2 labelled tiers, per `raw/description_formats.json`). The other 38 were read out of prose and are marked *(unstructured)* throughout. |
| Review figures were corrected after a re-capture | The first capture pass returned 24 PDPs as Cloudflare interstitials, which made those products look unreviewed. All 24 were re-fetched; every review figure here comes from `raw/reviews_complete.json` (56/56 PDPs). The superseded files `raw/review_summary.json` and `raw/reviews_extracted.json` must not be used — the latter also reports `avg: 0.0` for every product. |
| Only page 1 of each review widget was captured | 241 review bodies are available across 54 products (`raw/reviews_complete.json` → `bodies[]`); counts and averages are complete, but quoted review text is a sample, not the full corpus. |
| Inventory quantities unavailable | Shopify’s public JSON exposes only the boolean `available`, never `inventory_quantity`. “Sold out” here means `available == false`. |
| Prices are as-captured on 2026-07-27 | No historical pricing is available in the captured data. |

