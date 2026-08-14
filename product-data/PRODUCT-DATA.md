# Siwa Fragrances — Product Data Sheets

> One repeatable template, filled from source for **every product we hold data on**.

> Catalogue + reviews: `reference-analysis/raw/` (captured **2026-07-27**). Social creative: `instagram-assets/` (captured **2026-07-28**).

> Machine-readable twin: **`product-data/product-data.json`**.


---

## 1. The template

Every product block below uses these fields. Blank/unknown values are written `— not in capture`; nothing is inferred or invented.

| Field | Meaning | Source | Held for |
|---|---|---|---|
| `handle` | URL slug — the join key across every file | `products.json` | 56 / 56 |
| `title` | Display name | `products.json` | 56 / 56 |
| `vendor` | ⚠️ **Not a brand.** The designer fragrance this clones, or a Siwa-owned value | `products.json` | 56 / 56 |
| `vendor_kind` | `siwa_owned` (16) or `inspired_by` (40) — derived | derived | 56 / 56 |
| `product_type` | Shopify product type | `products.json` | **1 / 56** (55 blank) |
| `tags` | Drives the entire navigation | `products.json` | **39 / 56** (17 empty) |
| `published_at` | Publication date | `products.json` | 56 / 56 |
| `option_names` | ⚠️ Casing is inconsistent (`Size` 9 / `size` 44 + one-offs) | `products.json` | 56 / 56 |
| `variants[]` | Per size: price, compare-at, availability | `products.json` | 158 variants |
| `price_min/max` | Range across sizes — derived | derived | 56 / 56 |
| `image_count` | **50 of 56 have exactly one** | `products.json` | 56 / 56 |
| `alt_missing` | **true for all 56** — every product image has `null` alt | `products.json` | 56 / 56 |
| `review_avg` / `review_count` | Judge.me per product | `reviews_complete.json` | **54 / 56** |
| `review_quotes[]` | Verbatim review bodies (page 1 of each widget) | `reviews_complete.json` | 54 / 56 |
| `description_format` | A–E classification of `body_html` | `description_formats.json` | 56 / 56 |
| `accords` | Main accords, where the copy labels them | parsed from `body_html` | **5 / 56** |
| `notes.top/heart/base` | Labelled tiers, where present | parsed from `body_html` | **18 / 56** |
| `body_text` | Description, HTML stripped | `products.json` | 56 / 56 |
| `instagram[]` | Posts: caption, date, likes, comments, images, art direction | `instagram-assets/` | **4 / 56** |
| `palette` | Per-fragrance colour world read from the photography | `instagram-assets/` | **4 / 56** |
| `voice` | Register + pull quotes | `instagram-assets/` | **4 / 56** |

**Not held for any product** (does not exist in the store): metafields, metaobjects, collection membership per product, variant images, SKU/barcode, weight, inventory counts, cost, supplier, launch/EOL dates, longevity/sillage ratings.


---

## 2. Coverage across the 56

| Dimension | Held | Missing |
|---|---:|---:|
| Catalogue record | 56 | 0 |
| Pricing & stock | 56 | 0 |
| Review score | 54 | 2 |
| Review quotes | 54 | 2 |
| Any description | 56 | 0 |
| Labelled note tiers | 18 | 38 |
| Main accords | 5 | 51 |
| Any tag | 39 | 17 |
| Gender tag | 35 | 21 |
| More than one image | 6 | 50 |
| Image alt text | 0 | 56 |
| Social creative | 4 | 52 |
| Palette / voice | 4 | 52 |

**Catalogue totals** — 158 variants · 49 sold out · 10 products fully out · 4 on sale · 66 variants carry a junk `"0.00"` compare-at.


---

## 3. Master table — all 56

Sorted by review volume. ⭑ = has labelled note tiers · ▣ = has social creative · ⚠ = no tags

| # | Product | `handle` | Vendor | Kind | Tags | Sizes | Price (EGP) | Stock | Reviews | Fmt | Flags |
|---:|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Layering Vanilla | `layering-vanilla` | Vanilla 28 Kayali | dupe | Best Selling, Men, Women | 100 ml / 50 ml / 30 ml | 450–1,000 | in stock | 5.0★ · 98 | D | — |
| 2 | Mawj | `mawj` | Siwa Fragrances | own | Best Selling, Men | 100 ml / 50 ml / 30 ml | 800–1,850 | in stock | 4.99★ · 68 | D | ▣ |
| 3 | Boujee Blush | `boujee-blush` | Kayali Boujee Marshmallow | dupe | Best Selling, new, Women | 100 ml / 50 ml / 30 ml | 500–1,200 | 1/3 out | 4.97★ · 59 | E | — |
| 4 | Hibiscusex | `hibiscusex` | Hibiscus Mahajád | dupe | Best Selling, Men, Women | 100 ml / 50 ml / 30 ml | 700–1,650 | 2/3 out | 4.98★ · 56 | D | — |
| 5 | Drunk Gold | `drunk-gold` | Angels’ Share Paradis | dupe | Best Selling, Men, Women | 100 ml / 50 ml / 30 ml | 750–1,950 | 1/3 out | 5.0★ · 46 | E | — |
| 6 | Caramel vanigliato | `caramel-vanigliato` | Bianco Latte Giardini Di Toscana | dupe | Best Selling, Men, Women | 100 ml / 50 ml / 30 ml | 550–1,550 | in stock | 4.95★ · 43 | C | ⭑ |
| 7 | Lady killer | `lady-killer` | Layton PDM | dupe | Best Selling, Men | 100 ml / 50 ml / 30 ml | 750–1,750 | in stock | 4.96★ · 26 | D | — |
| 8 | Alluring Rose | `alluring-rose` | Delina La Rosée Parfums de Marly | dupe | Women | 100 ml / 50 ml / 30 ml | 500–1,100 | **all out** | 4.96★ · 24 | E | — |
| 9 | Marasi | `marasi` | 40 Knots Xerjoff | dupe | Men, Women | 100 ml / 50 ml / 30 ml | 550–1,400 | 1/3 out | 5.0★ · 23 | D | — |
| 10 | Bare Glow | `bare-glow` | Goddess Burberry | dupe | — | 30 ml / 50 ml / 100 ml | 450–1,000 | 2/3 out | 4.95★ · 21 | D | ⚠ |
| 11 | Citrine | `citrine` | Tygar Bvlgari | dupe | Best Selling, Men | 100 ml / 50 ml / 30 ml | 750–1,850 | **all out** | 5.0★ · 20 | C | ⭑ |
| 12 | Bleu Exclusive | `bleu-exclusive` | Bleu De Chanel L’exclusif | dupe | — | 30 ml / 50 ml / 100 ml | 750–1,900 | in stock | 5.0★ · 19 | C | ⭑⚠ |
| 13 | Coffee Vanilla | `coffee-vanilla` | Siwa original creation | own | Best Selling, Men, new, Women | 100 ml / 50 ml / 30 ml | 550–1,150 | 1/3 out | 5.0★ · 18 | C | ⭑ |
| 14 | Irresistible Vanilla | `irresistible-vanilla` | Siwa original creation | own | Best Selling | 100 ml / 50 ml / 30 ml | 400–1,000 | in stock | 4.94★ · 18 | D | — |
| 15 | Coco Woods | `coco-woods` | Vanilla Powder Matiere Premiere | dupe | Men, Women | 30 ml / 50 ml / 100 ml | 850–2,300 | 1/3 out | 4.94★ · 16 | E | ▣ |
| 16 | Pink Allure | `pink-allure` | Siwa original creation | own | — | 30 ml / 50 ml / 100 ml | 590–1,400 | in stock | 5.0★ · 14 | B | ⭑▣⚠ |
| 17 | Lagoon Flair | `lagoon-flair` | Le Beau Le Parfum | dupe | Best Selling, Men, new | 100 ml / 50 ml / 30 ml | 450–1,200 | in stock | 4.92★ · 13 | E | — |
| 18 | Silk Vanilla | `silk-vanilla` | Siwa Fragrances | own | — | 125ML | LE 375 | in stock | 5.0★ · 13 | E | ⚠ |
| 19 | Hot Vanilla | `hot-vanilla` | Althaïr Parfums de Marly | dupe | Men, Women | 100 ml / 50 ml / 30 ml | 550–1,550 | in stock | 4.92★ · 12 | D | — |
| 20 | Male Elixir | `male-elixir` | Le Male Elixir JPG | dupe | Best Selling, Men | 100 ml / 50 ml / 30 ml | 450–1,250 | in stock | 5.0★ · 11 | D | — |
| 21 | Mango Pineapple | `mango-pineapple` | Summer Hammer | dupe | Best Selling, Men, new, Women | 100 ml / 50 ml / 30 ml | 750–1,850 | 2/3 out | 5.0★ · 11 | C | ⭑ |
| 22 | Soul Poudree | `soul-poudree` | Narciso Poudree | dupe | Women | 100 / 50 ml / 30 ml | 400–1,050 | in stock | 5.0★ · 11 | C | ⭑ |
| 23 | Vanilla Bundle | `vanilla-bundle` | Siwa Fragrances | own | Bundles | 9 variants (125ML, 120 ml, 30ML, 50ML, 100ML) | 1,060–1,555 | **all out** | 5.0★ · 11 | D | — |
| 24 | Carnal Trail | `carnal-trail` | Side Effect Initio | dupe | Best Selling, Men, Women | 100 ml / 50 ml / 30 ml | 600–1,550 | in stock | 5.0★ · 10 | D | — |
| 25 | Layering Pistachio | `layering-pistachio` | Yum Pistachio Gelato Kayali | dupe | Best Selling, Men, Women | 100 ml / 50 ml / 30 ml | 450–1,000 | in stock | 5.0★ · 10 | D | — |
| 26 | Apple Pie | `apple-pie` | Siwa Fragrances | own | — | 125ML | LE 375 | in stock | 5.0★ · 9 | E | ⚠ |
| 27 | Hot Male | `hot-male` | You Intensely Giorgio Armani | dupe | Men | 50 ml / 100 ml | 800–1,250 | in stock | 5.0★ · 9 | C | ⭑ |
| 28 | Luna Di Roma | `luna-di-roma` | Valentino Donna Born In Roma Intense | dupe | Women | 50 ml | LE 600 | in stock | 4.78★ · 9 | C | ⭑ |
| 29 | Aurableu | `aurableu` | Symphony LV | dupe | — | 30 ml / 50 ml / 100 ml | 700–1,750 | 1/3 out | 5.0★ · 8 | B | ⭑⚠ |
| 30 | Chocolate Creme | `chocolate-creme` | Siwa original creation | own | Men, new, Unisex, Women | 100 ml / 50 ml / 30 ml | 450–1,250 | 2/3 out | 5.0★ · 8 | E | — |
| 31 | Bleu Intense | `bleu-intense` | Bleu De Chanel Parfum | dupe | — | 100 ml / 50 ml / 30 ml | 500–1,050 | **all out** | 5.0★ · 7 | C | ⭑⚠ |
| 32 | Libre Desire | `libre-desire` | YSL Libre intense | dupe | Best Selling, new, Women | 100 ml / 50 ml / 30 ml | 500–1,250 | 1/3 out | 5.0★ · 7 | D | — |
| 33 | Pacific Elixir | `pacific-elixir` | Pacific Chill Louis Vuitton | dupe | Men, Women | 30 ml / 50 ml / 100 ml | 600–1,500 | in stock | 5.0★ · 7 | D | — |
| 34 | Silk Vanilla Body Lotion | `silk-vanilla-body-lotion` | Siwa Fragrances | own | — | 120ML | LE 350 | **all out** | 5.0★ · 7 | E | ⚠ |
| 35 | Summer Holidays | `summer-holidays` | LV Afternoon Swim | dupe | Best Selling, Men, Women | 100 ml / 50 ml / 30 ml | 650–1,700 | in stock | 5.0★ · 7 | D | — |
| 36 | Sweet Rum | `sweet-rum` | Siwa Fragrances | own | — | 125ml | LE 375 | in stock | 5.0★ · 7 | E | ⚠ |
| 37 | Gourmet | `gourmet` | Siwa original creation | own | Best Selling, Men, new, Unisex, Women | 100 ml / 50 ml / 30 ml | 800–2,100 | 1/3 out | 5.0★ · 6 | D | — |
| 38 | Iris elixir | `iris-elixir` | Prada L’Homme Intense | dupe | Men | 100 ml / 50 ml | 850–1,350 | **all out** | 5.0★ · 6 | C | ⭑ |
| 39 | Layering Lychee | `layering-lychee` | Eden Sparkling Lychee 39 Kayali | dupe | Best Selling, Women | 100 ml / 50 ml / 30 ml | 450–1,000 | 1/3 out | 5.0★ · 6 | D | — |
| 40 | Insane Pineapple | `insane-pineapple` | Nishane Hacivat | dupe | Men | 100 ml / 50 ml / 30 ml | 500–1,350 | 1/3 out | 4.8★ · 5 | D | — |
| 41 | Marshmallow | `marshmallow` | Siwa Fragrances | own | — | 125ML | LE 375 | in stock | 5.0★ · 5 | E | ⚠ |
| 42 | Siwa Trail | `siwa-trail` | Guidance Amouage | dupe | Men, new, Unisex, Women | 100 ml / 50 ml / 30 ml | 600–1,750 | **all out** | 5.0★ · 5 | D | — |
| 43 | Belle Riche | `belle-riche` | La Belle Le Parfum | dupe | — | 100 ml / 50 ml / 30 ml | 550–1,150 | 1/3 out | 5.0★ · 4 | D | ⚠ |
| 44 | Lost On You | `lost-on-you` | Lost In Paris Roja | dupe | — | 30 ml / 50 ml / 100 ml | 750–1,900 | **all out** | 5.0★ · 4 | B | ⭑⚠ |
| 45 | Marshmallow Bundle | `marshmallow-bundle` | Siwa Fragrances | own | Bundles | 125ML / 50ML | LE 950 | in stock | 5.0★ · 4 | E | — |
| 46 | Pink Arrogance | `pink-arrogance` | Siwa original creation | own | — | 30 ml / 50 ml / 100 ml | 450–1,000 | in stock | 5.0★ · 4 | B | ⭑⚠ |
| 47 | Layering bundle | `layering-30-ml-bundle` | Siwa Fragrances | own | Bundles | 36 variants (30ML, 50ML, 100ML) | 1,105–1,995 | in stock | 5.0★ · 3 | E | — |
| 48 | Stellar Nights | `stellar-nights` | Stellar Times Louis Vuitton | dupe | Best Selling, Men, Women | 100 ml / 50 ml / 30 ml | 800–2,050 | in stock | 5.0★ · 3 | D | — |
| 49 | Absolute Drunk | `absolute-drunk` | Il Padrino Sospiro | dupe | — | 30 ml / 50 ml / 100 ml | 750–1,850 | **all out** | 5.0★ · 2 | B | ⭑⚠ |
| 50 | summer elegance | `summer-elegance` | Imagination LV | dupe | Best Selling, Men | 100 ml / 50 ml / 30 ml | 850–2,150 | 1/3 out | 5.0★ · 2 | D | — |
| 51 | Vanilla 91 | `vanilla-91` | Siwa Fragrances | own | — | 125ML | LE 380 | in stock | 5.0★ · 2 | D | ⚠ |
| 52 | Layering Apple | `layering-apple` | Eden Juicy Apple kayali | dupe | Best Selling, Women | 50 ml / 30 ml | 450–650 | 1/2 out | 5.0★ · 1 | C | ⭑ |
| 53 | Mango on woods | `mango-on-woods` | God of Fire Stéphane Humbert | dupe | Men | 100 ml / 50 ml / 30 ml | 700–1,800 | 1/3 out | 5.0★ · 1 | D | — |
| 54 | Sweet Oud | `sweet-oud` | Oud Cadenza MC | dupe | Best Selling, Men, new, Unisex, Women | 100 ml / 50 ml / 30 ml | 650–1,650 | **all out** | 5.0★ · 1 | C | ⭑ |
| 55 | Soiree | `soiree` | Grand Soir MFK | dupe | — | 100 ml / 50 ml / 30 ml | 550–1,400 | in stock | — | E | ⚠ |
| 56 | Sundaze | `sundaze` | Power Of You Giorgio Armani | dupe | — | 30 ml / 50 ml / 100 ml | 500–1,100 | in stock | — | A | ⭑⚠ |

---

## 4. Product data sheets

Full template, filled per product. Products with social creative are marked **▣ enriched**.


### 1. Layering Vanilla
`layering-vanilla`

| | |
|---|---|
| **Vendor** | Vanilla 28 Kayali · *⚠️ dupe reference — renders as brand on the PDP and in JSON-LD* |
| **Product type** | — not in capture |
| **Tags** | `Best Selling`, `Men`, `Women` |
| **Published** | 2023-10-20 |
| **Option name** | `size` |
| **Reviews** | 5.0★ across 98 reviews |
| **Images** | 1 · **alt text missing** · `layering-vanilla1.jpg` |
| **Description** | format D: free prose, no labelled tiers · 276 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 100 ml | LE 1,000 | `0.00` junk | in stock |
| 50 ml | LE 650 | `0.00` junk | in stock |
| 30 ml | LE 450 | `0.00` junk | in stock |

**Scent profile** — ⚠️ no labelled tiers in `body_html`; notes exist only as prose.

**Description (as published)**

> Layering Vanilla Sweet, amber, vanilla Amber Vanilla fragrance captivates the senses with its creamy long lasting components of jasmine, vanilla orchid, tonka bean, sugar, vanilla, amberwood and Musk. Sensual vanilla perfume ideal for layering & sexy. Best for winter and fall

**Customer voice**

- 5★ *Salma Osama* — “بجد تحفه سواء ريحه لثبات للتغليف ١٠ من ١٠”
- 5★ *Rowan روان عادل صالح عمر سعيد* — “Amazing quality”
- 5★ *Sama Makky* — “تحفههه”

**Gaps:** only 1 image — theme hover/variant switching inert · image alt text is null · notes not machine-readable · junk `0.00` compare-at

---

### 2. Mawj  ▣ enriched
`mawj`

| | |
|---|---|
| **Vendor** | Siwa Fragrances · *Siwa-owned* |
| **Product type** | — not in capture |
| **Tags** | `Best Selling`, `Men` |
| **Published** | 2022-06-29 |
| **Option name** | `size` |
| **Reviews** | 4.99★ across 68 reviews |
| **Images** | 1 · **alt text missing** · `mawj.jpg` |
| **Description** | format D: free prose, no labelled tiers · 336 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 100 ml | LE 1,850 | `0.00` junk | in stock |
| 50 ml | LE 1,100 | `0.00` junk | in stock |
| 30 ml | LE 800 | `0.00` junk | in stock |

**Scent profile** — ⚠️ no labelled tiers in `body_html`; notes exist only as prose.

**Description (as published)**

> Mawj Citrus , marine, woody Luxurios blend of sea notes, watery notes, ozonic notes, spicey notes, vanilla combined with bitter orange, pineapple, with hints of vetiver, violet, iris, jasmine with smooth touches of oud, musk and sandalwood. An elegant aquatic perfume reflects the depth of the sea & its fresh breeze in an oriental way.

**Customer voice**

- 5★ *Ramy Magdy* — “Perfect, i got 3 compliments on the 1st day wearing it”
- 5★ *Ahmed Sherif* — “تحفة بجد”
- 5★ *Hassan Ali* — “very beautiful”

**Social creative** ▣

- **Palette:** `#7FA9A6` sea teal · `#1F4E79` horizon navy · `#AFCFE3` sky pale blue · `#F2F3EF` salt white · `#141414` bottle black
- **Voice:** Declarative, elemental, masculine. Short lines with hard stops. Sea as metaphor for presence.
  - “Where the sea is always moving.”
  - “Not all waves are meant to be chased. Some are meant to be worn.”
- **2026-07-22** · 29 likes · 0 comments · [DbG2mgBF2MQ](https://www.instagram.com/p/DbG2mgBF2MQ/)
  - Caption: “Mawj / Where the sea is always moving. /  / #siwafragrances #freshfragrance #aquaticfragrance /  / Marasi / Where the sea finds its calm. /  / #siwafragrances #freshfragrance #aquaticfragrance”
  - Images: `mawj/DbG2mgBF2MQ_1.jpg`, `mawj/DbG2mgBF2MQ_2.jpg`
- **2026-07-17** · 23 likes · 2 comments · [Da56ixwiJzJ](https://www.instagram.com/p/Da56ixwiJzJ/)
  - Caption: “Not all waves are meant to be chased. /  / Some are meant to be worn. /  / Marasi. / Mawj. /  / #siwafragrances #mawj #marasi #freshscent #freshfragrance”
  - Images: `mawj/Da56ixwiJzJ_1.jpg`, `mawj/Da56ixwiJzJ_2.jpg`
- **2025-09-07** · 47 likes · 5 comments · [DOTzj9WFZwB](https://www.instagram.com/p/DOTzj9WFZwB/)
  - Caption: “Mawj is not a scent of sweetness or softness, but of power in motion. A wave that cannot be held back. A presence that arrives, lingers, and commands. /  / #siwafragrances #aquaticperfume #woodyfragrance #summerscents”
  - Images: `mawj/DOTzj9WFZwB_1.jpg`, `mawj/DOTzj9WFZwB_2.jpg`
- **Gaps:** 68 reviews at 4.99 and social calls it a flagship, but the PDP has ONE image with null alt. · Tagged 'Men' only, though the aquatic positioning and reviews read unisex. · compare_at_price is the junk value '0.00' on all three variants.

**Gaps:** only 1 image — theme hover/variant switching inert · image alt text is null · notes not machine-readable · junk `0.00` compare-at

---

### 3. Boujee Blush
`boujee-blush`

| | |
|---|---|
| **Vendor** | Kayali Boujee Marshmallow · *⚠️ dupe reference — renders as brand on the PDP and in JSON-LD* |
| **Product type** | — not in capture |
| **Tags** | `Best Selling`, `new`, `Women` |
| **Published** | 2025-04-25 |
| **Option name** | `size` |
| **Reviews** | 4.97★ across 59 reviews |
| **Images** | 1 · **alt text missing** · `Boujee-Blush.jpg` |
| **Description** | format E: minimal / boilerplate · 113 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 100 ml | LE 1,200 | `0.00` junk | **sold out** |
| 50 ml | LE 700 | `0.00` junk | in stock |
| 30 ml | LE 500 | — | in stock |

**Scent profile** — ⚠️ no labelled tiers in `body_html`; notes exist only as prose.

**Description (as published)**

> Boujee Blush Yum powdery, sweet, fruity Notes: Marshmallow, strawberry, whipped cream, vanilla, coconut and musk.

**Customer voice**

- 5★ *رقيه ياسر* — “More than amazing im feeling like marshmallow”
- 5★ *Anonymous* — “The scent is soo goodd”
- 5★ *Hajar* — “حلوه اوي ثابته اوي و بجد و كمان جربت bare glow جميله اوي بردو و ثبات مش طبيعي”

**Gaps:** only 1 image — theme hover/variant switching inert · image alt text is null · notes not machine-readable · 1 variant(s) sold out · junk `0.00` compare-at

---

### 4. Hibiscusex
`hibiscusex`

| | |
|---|---|
| **Vendor** | Hibiscus Mahajád · *⚠️ dupe reference — renders as brand on the PDP and in JSON-LD* |
| **Product type** | — not in capture |
| **Tags** | `Best Selling`, `Men`, `Women` |
| **Published** | 2024-05-10 |
| **Option name** | `size` |
| **Reviews** | 4.98★ across 56 reviews |
| **Images** | 1 · **alt text missing** · `hibiscusex.jpg` |
| **Description** | format D: free prose, no labelled tiers · 649 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 100 ml | LE 1,650 | `0.00` junk | in stock |
| 50 ml | LE 1,000 | `0.00` junk | **sold out** |
| 30 ml | LE 700 | — | **sold out** |

**Scent profile** — ⚠️ no labelled tiers in `body_html`; notes exist only as prose.

**Description (as published)**

> Hibiscusex Vanilla, floral, rose In a classy hotel bar, amidst the soft glow of candlelight and the whispers of conversations, a couple shared a moment of intimacy on their elegant date night. As they savored their drinks, the air was imbued with the alluring scent of hibiscus and roses, casting a spell of romance around them. Vanilla infused the atmosphere with a delicate sweetness, while black currant added a touch of intrigue to their evening. With each sip & shared glance their connection deepened, their senses enveloped in the seductive perfume of their blossoming affection, marking the beginning of a memorable night to cherish forever.

**Customer voice**

- 5★ *Salma Osama* — “تحفه”
- 5★ *Abdelmoniem Hakeem* — “Intoxicating”
- 5★ *Muhammed Ashraf* — “so good”

**Gaps:** only 1 image — theme hover/variant switching inert · image alt text is null · notes not machine-readable · 2 variant(s) sold out · junk `0.00` compare-at

---

### 5. Drunk Gold
`drunk-gold`

| | |
|---|---|
| **Vendor** | Angels’ Share Paradis · *⚠️ dupe reference — renders as brand on the PDP and in JSON-LD* |
| **Product type** | — not in capture |
| **Tags** | `Best Selling`, `Men`, `Women` |
| **Published** | 2025-06-24 |
| **Option name** | `size` |
| **Reviews** | 5.0★ across 46 reviews |
| **Images** | 1 · **alt text missing** · `Drunk-Gold.jpg` |
| **Description** | format E: minimal / boilerplate · 120 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 100 ml | LE 1,950 | — | **sold out** |
| 50 ml | LE 1,150 | — | in stock |
| 30 ml | LE 750 | — | in stock |

**Scent profile** — ⚠️ no labelled tiers in `body_html`; notes exist only as prose.

**Description (as published)**

> Drunk Gold Liquid gold. Intoxication in every drop Woody, sweet, fruity Notes: Cognac, liquor, raspberry, praline, tonka

**Customer voice**

- 5★ *Anonymous* — “Good”
- 5★ *Anonymous* — “اداء مثالي”
- 5★ *Rana* — “Very elegant scent”

**Gaps:** only 1 image — theme hover/variant switching inert · image alt text is null · notes not machine-readable · 1 variant(s) sold out

---

### 6. Caramel vanigliato
`caramel-vanigliato`

| | |
|---|---|
| **Vendor** | Bianco Latte Giardini Di Toscana · *⚠️ dupe reference — renders as brand on the PDP and in JSON-LD* |
| **Product type** | — not in capture |
| **Tags** | `Best Selling`, `Men`, `Women` |
| **Published** | 2024-10-08 |
| **Option name** | `size` |
| **Reviews** | 4.95★ across 43 reviews |
| **Images** | 1 · **alt text missing** · `caramel-vanigliato.jpg` |
| **Description** | format C: name + accords + labelled notes · 149 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 100 ml | LE 1,550 | `0.00` junk | in stock |
| 50 ml | LE 850 | — | in stock |
| 30 ml | LE 550 | — | in stock |

**Scent profile**

- **Top notes:** Caramel
- **Heart notes:** Coumarin and Honey
- **Base notes:** Vanilla and White Musk

**Description (as published)**

> Caramel Vanigliato Gourmand Vanilla fragrance for men & women. Top notes: Caramel Middle notes: Coumarin and Honey Base notes: Vanilla and White Musk

**Customer voice**

- 5★ *Anonymous* — “Khatera wallahi it lasts days on clothes and a full day on skin❤️”
- 5★ *Ahmed Samy* — “تحفة”
- 5★ *Anonymous* — “Amazing”

**Gaps:** only 1 image — theme hover/variant switching inert · image alt text is null · junk `0.00` compare-at

---

### 7. Lady killer
`lady-killer`

| | |
|---|---|
| **Vendor** | Layton PDM · *⚠️ dupe reference — renders as brand on the PDP and in JSON-LD* |
| **Product type** | — not in capture |
| **Tags** | `Best Selling`, `Men` |
| **Published** | 2023-08-04 |
| **Option name** | `size` |
| **Reviews** | 4.96★ across 26 reviews |
| **Images** | 1 · **alt text missing** · `lady-killer.jpg` |
| **Description** | format D: free prose, no labelled tiers · 235 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 100 ml | LE 1,750 | — | in stock |
| 50 ml | LE 1,100 | — | in stock |
| 30 ml | LE 750 | — | in stock |

**Scent profile** — ⚠️ no labelled tiers in `body_html`; notes exist only as prose.

**Description (as published)**

> Lady Killer Vanilla, warm, spicy. Sexy & hot blend of vanilla green apple, cardamom, lavender, pepper, jasmine, patchouli and woods. Ideal for special occasions and dates. Its like a date night in a fancy restaurant Its a lady killer !

**Customer voice**

- 5★ *Emad* — “Amazing ❤️ all your stuff is perfect”
- 5★ *Anonymous* — “Excellent”
- 5★ *Anonymous* — “Perfecf”

**Gaps:** only 1 image — theme hover/variant switching inert · image alt text is null · notes not machine-readable

---

### 8. Alluring Rose
`alluring-rose`

| | |
|---|---|
| **Vendor** | Delina La Rosée Parfums de Marly · *⚠️ dupe reference — renders as brand on the PDP and in JSON-LD* |
| **Product type** | — not in capture |
| **Tags** | `Women` |
| **Published** | 2021-08-20 |
| **Option name** | `size` |
| **Reviews** | 4.96★ across 24 reviews |
| **Images** | 1 · **alt text missing** · `alluring-rose.jpg` |
| **Description** | format E: minimal / boilerplate · 167 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 100 ml | LE 1,100 | — | **sold out** |
| 50 ml | LE 700 | — | **sold out** |
| 30 ml | LE 500 | — | **sold out** |

**Scent profile** — ⚠️ no labelled tiers in `body_html`; notes exist only as prose.

**Description (as published)**

> Floral fruity aquatic fragrance. Beautiful blend of rose, peony, lychee, musk, pear, vetiver with watery & floral notes. Gorgeous wearable & potent scent for daily use

**Customer voice**

- 5★ *Marvel Raafat* — “Please make it available again, always getting compliments about it 🤩”
- 5★ *Israa* — “Ahla scent bgd yareet tenazeloha tani 🩷🩷”
- 5★ *Anonymous* — “Nzlohaaaa taniiii please 🥹”

**Gaps:** only 1 image — theme hover/variant switching inert · image alt text is null · notes not machine-readable · **every variant sold out** — no back-in-stock capture

---

### 9. Marasi
`marasi`

| | |
|---|---|
| **Vendor** | 40 Knots Xerjoff · *⚠️ dupe reference — renders as brand on the PDP and in JSON-LD* |
| **Product type** | — not in capture |
| **Tags** | `Men`, `Women` |
| **Published** | 2024-05-21 |
| **Option name** | `size` |
| **Reviews** | 5.0★ across 23 reviews |
| **Images** | 1 · **alt text missing** · `marasi.jpg` |
| **Description** | format D: free prose, no labelled tiers · 757 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 100 ml | LE 1,400 | `0.00` junk | in stock |
| 50 ml | LE 850 | `0.00` junk | in stock |
| 30 ml | LE 550 | `0.00` junk | **sold out** |

**Scent profile** — ⚠️ no labelled tiers in `body_html`; notes exist only as prose.

**Description (as published)**

> Marasi Marine, salty, woody On the deck of a majestic yacht, a gentleman basked in the lap of luxury as he sailed across the azure waters. Around him, the salty breeze mingled with the lush green notes of the coastline, creating an ambiance of refined opulence. The scent of the sea, carried on the wind, whispered tales of adventure and exploration, while the rich aroma of woods added depth and sophistication to the air. This beach-inspired perfume was a tribute to indulgence, capturing the essence of high-end relaxation on the open sea. As he breathed in the intoxicating blend of woods, salt, sea, and green notes, he felt a sense of serenity wash over him, knowing that every moment aboard …

**Customer voice**

- 5★ *Adham Abd-Elbary* — “Beautiful smell and long lasting. Thank you!”
- 5★ *Amr Ibrahim* — “رائع ويستحق التجربه”
- 5★ *Maria Hany* — “Helwa gedn”

**Gaps:** only 1 image — theme hover/variant switching inert · image alt text is null · notes not machine-readable · 1 variant(s) sold out · junk `0.00` compare-at

---

### 10. Bare Glow
`bare-glow`

| | |
|---|---|
| **Vendor** | Goddess Burberry · *⚠️ dupe reference — renders as brand on the PDP and in JSON-LD* |
| **Product type** | — not in capture |
| **Tags** | **none — unreachable via tag-driven nav** |
| **Published** | 2025-11-05 |
| **Option name** | `Size` |
| **Reviews** | 4.95★ across 21 reviews |
| **Images** | 1 · **alt text missing** · `1EC1A752-2428-4549-B869-4EC86C442142.jpg` |
| **Description** | format D: free prose, no labelled tiers · 202 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 30 ml | LE 450 | — | **sold out** |
| 50 ml | LE 650 | — | in stock |
| 100 ml | LE 1,000 | — | **sold out** |

**Scent profile** — ⚠️ no labelled tiers in `body_html`; notes exist only as prose.

**Description (as published)**

> A velvety cloud of vanilla in all its forms pure, absolute, and caviar, gently layered with calming lavender and deep cacao. Soft warmth that melts into your skin and stays close, like a gentle embrace.

**Customer voice**

- 5★ *Anonymous* — “To7faaa”
- 5★ *Darin* — “Smells amazing and the vanillia in it is addictive and not the gourmand type , it's so mature and elegant type of way and more creamy than burberry goddess”
- 5★ *Anonymous* — “Very great scent which last on the skin for a few hours”

**Gaps:** no tags — invisible to navigation · only 1 image — theme hover/variant switching inert · image alt text is null · notes not machine-readable · 2 variant(s) sold out

---

### 11. Citrine
`citrine`

| | |
|---|---|
| **Vendor** | Tygar Bvlgari · *⚠️ dupe reference — renders as brand on the PDP and in JSON-LD* |
| **Product type** | — not in capture |
| **Tags** | `Best Selling`, `Men` |
| **Published** | 2022-04-07 |
| **Option name** | `size` |
| **Reviews** | 5.0★ across 20 reviews |
| **Images** | 1 · **alt text missing** · `citrine.jpg` |
| **Description** | format C: name + accords + labelled notes · 1363 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 100 ml | LE 1,850 | `0.00` junk | **sold out** |
| 50 ml | LE 1,150 | `0.00` junk | **sold out** |
| 30 ml | LE 750 | — | **sold out** |

**Scent profile**

- **Top notes:** Bright and zesty grapefruit opens the scent with a burst of citrus energy, perfect for a fresh start to your day
- **Heart notes:** The spice of ginger blends with soft ambrette, creating a warm, aromatic core that adds depth and character

**Description (as published)**

> Citrine by Siwa Fragrances is a modern masculine fragrance crafted for those who command attention without saying a word. Clean yet sensual, vibrant yet deep — Citrine is your daily signature scent. Notes & Character Top Notes: Bright and zesty grapefruit opens the scent with a burst of citrus energy, perfect for a fresh start to your day. Heart Notes: The spice of ginger blends with soft ambrette, creating a warm, aromatic core that adds depth and character. Base Notes: A smooth, skin-like blend of musk and ambroxan offers sensuality and longevity, leaving a clean yet memorable trail. Citrine is made for men who value minimalism with presence. It’s the kind of scent people remember — not …

**Customer voice**

- 5★ *Disha* — “Was amazing..but always sold out..”
- 5★ *Eyad Yahia* — “Very pleasant and rich scent”
- 5★ *Mohammed Shapoury* — “good”

**Gaps:** only 1 image — theme hover/variant switching inert · image alt text is null · **every variant sold out** — no back-in-stock capture · junk `0.00` compare-at

---

### 12. Bleu Exclusive
`bleu-exclusive`

| | |
|---|---|
| **Vendor** | Bleu De Chanel L’exclusif · *⚠️ dupe reference — renders as brand on the PDP and in JSON-LD* |
| **Product type** | — not in capture |
| **Tags** | **none — unreachable via tag-driven nav** |
| **Published** | 2026-02-27 |
| **Option name** | `Size` |
| **Reviews** | 5.0★ across 19 reviews |
| **Images** | 1 · **alt text missing** · `IMG-3917.jpg` |
| **Description** | format C: name + accords + labelled notes · 1051 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 30 ml | LE 750 | — | in stock |
| 50 ml | LE 1,100 | — | in stock |
| 100 ml | LE 1,900 | — | in stock |

**Scent profile**

- **Top notes:** Soft citrus freshness with aromatic nuances
- **Heart notes:** Creamy sandalwood blended with warm leathery labdanum
- **Base notes:** Deep woody amber accords enriched with smooth vanilla and refined woods

**Description (as published)**

> Bleu Exclusive Not every man tries to attract attention. Some simply walk into a room and are noticed naturally. Bleu Exclusive is crafted for the man who treats his appearance as part of his identity. The businessman who understands that details such as tailoring, presence, posture, and scent are not luxury choices, but priorities. A fragrance that reflects quiet confidence and refined authority. It opens with a subtle freshness before evolving into a deep, creamy woody amber signature that feels polished, professional, and undeniably elegant. This isn’t a scent for occasions. It’s the signature of a man who takes himself seriously, every single day. Notes Top Notes: Soft citrus freshness …

**Customer voice**

- 5★ *MOHAAMED GAFAR* — “I had the original le exclusive and i know that channel dupes are never been copied but for this i respect you so much great blend”
- 5★ *Ahmed Zaghloul* — “حلوة”
- 5★ *Mohamed* — “ممتازة جدا”

**Gaps:** no tags — invisible to navigation · only 1 image — theme hover/variant switching inert · image alt text is null

---

### 13. Coffee Vanilla
`coffee-vanilla`

| | |
|---|---|
| **Vendor** | Siwa original creation · *Siwa-owned* |
| **Product type** | — not in capture |
| **Tags** | `Best Selling`, `Men`, `new`, `Women` |
| **Published** | 2024-10-21 |
| **Option name** | `size` |
| **Reviews** | 5.0★ across 18 reviews |
| **Images** | 1 · **alt text missing** · `coffee-vanilla-1.jpg` |
| **Description** | format C: name + accords + labelled notes · 171 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 100 ml | LE 1,150 | — | **sold out** |
| 50 ml | LE 750 | — | in stock |
| 30 ml | LE 550 | — | in stock |

**Scent profile**

- **Top notes:** Coffee and Amaretto
- **Heart notes:** Ice cream and Vanilla
- **Base notes:** Brown Sugar and Vanilla

**Description (as published)**

> Coffee Vanilla Gourmand Coffee Vanilla fragrance for men & women. Top notes: Coffee and Amaretto. Middle notes: Ice cream and Vanilla. Base notes: Brown Sugar and Vanilla.

**Customer voice**

- 5★ *Hanatamer* — “Bgd tuhfaaa awee w btsbat gedan el notes el fyha kul wahda fyha btban lama thda fl awel btkun coffe w baad kda chocolate w vanilla momayaxen awe w el atomiser tuhfa”
- 5★ *Rawan Mohamed* — “I loved it . And i lasts so long”
- 5★ *Kamal Mohamed* — “Great 😍”

**Gaps:** only 1 image — theme hover/variant switching inert · image alt text is null · 1 variant(s) sold out

---

### 14. Irresistible Vanilla
`irresistible-vanilla`

| | |
|---|---|
| **Vendor** | Siwa original creation · *Siwa-owned* |
| **Product type** | — not in capture |
| **Tags** | `Best Selling` |
| **Published** | 2023-05-30 |
| **Option name** | `size` |
| **Reviews** | 4.94★ across 18 reviews |
| **Images** | 1 · **alt text missing** · `Irresistible_Vanilla.jpg` |
| **Description** | format D: free prose, no labelled tiers · 227 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 100 ml | LE 1,000 | `0.00` junk | in stock |
| 50 ml | LE 600 | `0.00` junk | in stock |
| 30 ml | LE 400 | `0.00` junk | in stock |

**Scent profile** — ⚠️ no labelled tiers in `body_html`; notes exist only as prose.

**Description (as published)**

> Irresistible Vanilla Vanilla, sweet, powdery. Warm sweet blend of vanilla, sugar, cacao, tonka beans, red berries based on amber, musk and woods. Sexy and beautiful perfume perfect for dates and nights out. It is irresistible !

**Customer voice**

- 5★ *Anonymous* — “تحفة اوووي”
- 5★ *Anonymous* — “حلو اوي اوي انا جبته من الريفيوهات عالموقع مع انهم عالصفحة بتاعت الفيس ماجابوش سيرته بجد مش واخد حقه هادي وانثوي جدا ودافي وحميمي رائع رائع رائع”
- 5★ *Anonymous* — “حبيت جدا ❤️”

**Gaps:** no gender tag · only 1 image — theme hover/variant switching inert · image alt text is null · notes not machine-readable · junk `0.00` compare-at

---

### 15. Coco Woods  ▣ enriched
`coco-woods`

| | |
|---|---|
| **Vendor** | Vanilla Powder Matiere Premiere · *⚠️ dupe reference — renders as brand on the PDP and in JSON-LD* |
| **Product type** | — not in capture |
| **Tags** | `Men`, `Women` |
| **Published** | 2024-07-08 |
| **Option name** | `size` |
| **Reviews** | 4.94★ across 16 reviews |
| **Images** | 1 · **alt text missing** · `coco-woods.jpg` |
| **Description** | format E: minimal / boilerplate · 59 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 30 ml | LE 850 | — | in stock |
| 50 ml | LE 1,300 | — | in stock |
| 100 ml | LE 2,300 | — | **sold out** |

**Scent profile** — ⚠️ no labelled tiers in `body_html`; notes exist only as prose.

**Description (as published)**

> Coco Woods Notes: Vanilla, musk, coconut powder, palo santo

**Customer voice**

- 5★ *Anonymous* — “Very sexy”
- 5★ *ahmed gamal* — “Very good”
- 5★ *Dalia* — “It's perfect... a unique scent that gives sweet, attractive signature”

**Social creative** ▣

- **Palette:** `#EFE9E0` cream seamless · `#A8886A` raw wood · `#5B3A28` warm brown text · `#C6A87C` gold hairline · `#1A1714` label black
- **Voice:** Sensory sequencing - narrates the scent in time order (opens / settles / then). Ellipses as pacing. Softest register of the four.
  - “Vanilla, in a deeper state.”
  - “Soft, but defined. Warm, but never overwhelming.”
- **2026-04-11** · 45 likes · 3 comments · [DXAKtxjFwyu](https://www.instagram.com/p/DXAKtxjFwyu/)
  - Caption: “Some scents stay close. / Others create their own space. /  / Coco Woods sits somewhere in between. / Soft, but defined. / Warm, but never overwhelming. /  / Vanilla, in a deeper state. /  / #siwafragrances #vanillascent #vanillaperfume”
  - Images: `coco-woods/DXAKtxjFwyu_1.jpg`
- **2026-04-14** · 122 likes · 16 comments · [DXH731vCike](https://www.instagram.com/p/DXH731vCike/)
  - Caption: “Coconut opens… / soft, effortless. /  / Vanilla settles at the heart, / warm, close, and familiar. /  / Then woods and musk… / bringing everything into place. /  / #siwafragrances #vanillascent #vanillaperfume”
  - Images: `coco-woods/DXH731vCike_1.jpg`
- **2026-04-08** · 60 likes · 3 comments · [DW4iEg6F6pz](https://www.instagram.com/p/DW4iEg6F6pz/)
  - Caption: “A softer kind of depth.  / Vanilla, wrapped in coconut, musk… and everything in between. /  / #siwafragrances #vanillascent #vanillaperfume”
  - Images: `coco-woods/DW4iEg6F6pz_1.jpg`, `coco-woods/DW4iEg6F6pz_2.jpg`
- **Gaps:** body_html is 2 lines. The Instagram captions contain a better product description than the website does. · The notes diagram in DXH731vCike is richer than anything on the PDP - and it is the highest-engagement asset. · 100ml (the 2300 EGP hero SKU) is sold out with no back-in-stock capture.

**Gaps:** only 1 image — theme hover/variant switching inert · image alt text is null · notes not machine-readable · 1 variant(s) sold out

---

### 16. Pink Allure  ▣ enriched
`pink-allure`

| | |
|---|---|
| **Vendor** | Siwa original creation · *Siwa-owned* |
| **Product type** | — not in capture |
| **Tags** | **none — unreachable via tag-driven nav** |
| **Published** | 2026-04-24 |
| **Option name** | `Size` |
| **Reviews** | 5.0★ across 14 reviews |
| **Images** | 1 · **alt text missing** · `D45DDE71-48A7-4B1C-BE46-ACA593B54BA0.jpg` |
| **Description** | format B: Persona / The Story · 1033 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 30 ml | LE 590 | — | in stock |
| 50 ml | LE 850 | — | in stock |
| 100 ml | LE 1,400 | — | in stock |

**Scent profile**

- **Top notes:** Mandarin, Bergamot & soft pink pepper touch
- **Heart notes:** Soft rose, peony, powdery nuances
- **Base notes:** Musk, smooth woods, hint of vanilla

**Description (as published)**

> Persona A presence defined by softness. Calm, polished, and effortlessly composed. The kind of aura that feels gentle, yet leaves a lasting impression. The Story Pink Allure is built around a soft touch. It opens with a light, fresh brightness that feels clean and effortless, setting a smooth and delicate tone from the first moment. As it develops, a refined floral heart comes forward. Rose is present, but in its softest form, blended with airy petals and a subtle powdery nuance that keeps everything light and balanced. In the dry down, skin-like musk and smooth woods settle gently, wrapped in a hint of vanilla. The fragrance stays close, creating a soft, comforting trail that feels natural …

**Customer voice**

- 5★ *Anonymous* — “E3mlolha restock b2aaa”
- 5★ *Anonymous* — “تحفة كان جدا وثابت اووي بالايام وتقيل”
- 5★ *Yasmin Mohsen* — “Amazing perfume, smells great and lasts well. Please don’t increase the price!”

**Social creative** ▣

- **Palette:** `#EBD3D2` blush ground · `#F2DCDC` petal pink · `#B98A8C` deep rose shadow · `#171416` label black · `#FBF1F0` glass highlight
- **Voice:** Restrained feminine. Antithesis constructions - defines by what it does not do. Two-beat lines.
  - “The kind of femininity that doesn't ask for attention. Yet somehow gets it anyway.”
  - “Two shades of pink. One draws you in. One takes up the room.”
- **2026-06-02** · 41 likes · 9 comments · [DZGMMDtKWf7](https://www.instagram.com/p/DZGMMDtKWf7/)
  - Caption: “The kind of femininity that doesn't ask for attention. / Yet somehow gets it anyway. /  / Pink Allure. /  / #siwafragrances #femininefragrance #femininescent”
  - Images: `pink-allure/DZGMMDtKWf7_1.jpg`
- **2026-06-22** · 35 likes · 0 comments · [DZ5oMKtF7aa](https://www.instagram.com/p/DZ5oMKtF7aa/)
  - Caption: “Two signatures. /  / #siwafragrances #pinkallure #pinkarrogance /  / Waiting to be worn your way! /  / #siwafragrances #pinkallure #pinkarrogance”
  - Images: `pink-allure/DZ5oMKtF7aa_1.jpg`, `pink-allure/DZ5oMKtF7aa_2.jpg`
- **2026-06-08** · 35 likes · 0 comments · [DZVlKydl2I0](https://www.instagram.com/p/DZVlKydl2I0/)
  - Caption: “Two shades of pink. /  / One draws you in. / One takes up the room. /  / #siwafragrances #pinkallure #pinkarrogance #femininescent”
  - Images: `pink-allure/DZVlKydl2I0_1.jpg`, `pink-allure/DZVlKydl2I0_2.jpg`, `pink-allure/DZVlKydl2I0_3.jpg`
- **Gaps:** Empty tags array - invisible to FOR HER, UNISEX and every other tag-driven nav route despite being a flagship launch. · Has the best structured notes in the catalog (3 clean tiers) and no template renders them as anything but a paragraph. · Marketed as a DUO with Pink Arrogance in 2 of 3 posts; the catalog has no bundle, no cross-sell, no collection linking them.

**Gaps:** no tags — invisible to navigation · only 1 image — theme hover/variant switching inert · image alt text is null

---

### 17. Lagoon Flair
`lagoon-flair`

| | |
|---|---|
| **Vendor** | Le Beau Le Parfum · *⚠️ dupe reference — renders as brand on the PDP and in JSON-LD* |
| **Product type** | — not in capture |
| **Tags** | `Best Selling`, `Men`, `new` |
| **Published** | 2025-04-25 |
| **Option name** | `size` |
| **Reviews** | 4.92★ across 13 reviews |
| **Images** | 1 · **alt text missing** · `Lagoon-Flair.jpg` |
| **Description** | format E: minimal / boilerplate · 75 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 100 ml | LE 1,200 | `0.00` junk | in stock |
| 50 ml | LE 750 | `0.00` junk | in stock |
| 30 ml | LE 450 | `0.00` junk | in stock |

**Scent profile** — ⚠️ no labelled tiers in `body_html`; notes exist only as prose.

**Description (as published)**

> Lagoon Flair Sweet, woody Notes: Coconut, Pineapple, Tonka, Woods and Iris.

**Customer voice**

- 5★ *Mahmoud Khalaf* — “ببقي مبسوط وانا راشش منه”
- 5★ *Nada Ahmed* — “تحفههه💗💗💗”
- 5★ *كيغام زهراب Karsian* — “Beautiful”

**Gaps:** only 1 image — theme hover/variant switching inert · image alt text is null · notes not machine-readable · junk `0.00` compare-at

---

### 18. Silk Vanilla
`silk-vanilla`

| | |
|---|---|
| **Vendor** | Siwa Fragrances · *Siwa-owned* |
| **Product type** | — not in capture |
| **Tags** | **none — unreachable via tag-driven nav** |
| **Published** | 2025-02-21 |
| **Option name** | `size` |
| **Reviews** | 5.0★ across 13 reviews |
| **Images** | 3 · **alt text missing** · `silk-vanilla.jpg`, `MG_0975-scaled.jpg`, `copy-of-brown-beige-minimalist-face-mist-features-instagram-post_png.png` |
| **Description** | format E: minimal / boilerplate · 188 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 125ML | LE 375 | `0.00` junk | in stock |

**Scent profile** — ⚠️ no labelled tiers in `body_html`; notes exist only as prose.

**Description (as published)**

> Silk Vanilla A long-lasting body splash enriched with vitamin E, blending warm vanilla, delicate orchid, sweet sugar, and rich amber for a sensual, irresistible scent that lingers all day.

**Customer voice**

- 5★ *Seif Hamdy* — “ممتاز”
- 5★ *Anonymous* — “‏very nice”
- 5★ *Anonymous* — “نفسي اشتري الويب سايت كلوا بجد من كتر حلاوته😭❤️”

**Gaps:** no tags — invisible to navigation · image alt text is null · notes not machine-readable · junk `0.00` compare-at

---

### 19. Hot Vanilla
`hot-vanilla`

| | |
|---|---|
| **Vendor** | Althaïr Parfums de Marly · *⚠️ dupe reference — renders as brand on the PDP and in JSON-LD* |
| **Product type** | — not in capture |
| **Tags** | `Men`, `Women` |
| **Published** | 2023-11-26 |
| **Option name** | `size` |
| **Reviews** | 4.92★ across 12 reviews |
| **Images** | 1 · **alt text missing** · `hot-vanilla.jpg` |
| **Description** | format D: free prose, no labelled tiers · 415 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 100 ml | LE 1,550 | `0.00` junk | in stock |
| 50 ml | LE 850 | `0.00` junk | in stock |
| 30 ml | LE 550 | `0.00` junk | in stock |

**Scent profile** — ⚠️ no labelled tiers in `body_html`; notes exist only as prose.

**Description (as published)**

> Hot Vanilla Sweet Warm spicy Indulge your senses in the enchanting embrace of our warm perfume. A harmonious blend of cardamom and cinnamon unfolds like a comforting hug, while the richness of vanilla and praline adds a touch of sweetness. The scent lingers with a subtle allure, courtesy of a sensual mix of musk & woods. Elevate your presence with this enticing fragrance, a symphony of warmth and sophistication.

**Customer voice**

- 5★ *Mahmoud Taymour* — “gamila gda wallahy”
- 5★ *Abdallah omar* — “رائع وريحتة تحب تشمها كل شوية”
- 5★ *Momen Edris* — “.”

**Gaps:** only 1 image — theme hover/variant switching inert · image alt text is null · notes not machine-readable · junk `0.00` compare-at

---

### 20. Male Elixir
`male-elixir`

| | |
|---|---|
| **Vendor** | Le Male Elixir JPG · *⚠️ dupe reference — renders as brand on the PDP and in JSON-LD* |
| **Product type** | — not in capture |
| **Tags** | `Best Selling`, `Men` |
| **Published** | 2024-05-04 |
| **Option name** | `size` |
| **Reviews** | 5.0★ across 11 reviews |
| **Images** | 1 · **alt text missing** · `male-elixir.jpg` |
| **Description** | format D: free prose, no labelled tiers · 612 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 100 ml | LE 1,250 | `0.00` junk | in stock |
| 50 ml | LE 750 | `0.00` junk | in stock |
| 30 ml | LE 450 | `0.00` junk | in stock |

**Scent profile** — ⚠️ no labelled tiers in `body_html`; notes exist only as prose.

**Description (as published)**

> Male Elixir In the dimly lit streets of a cosmopolitan city, a man strolled confidently, leaving a trail of allure in his wake. His presence was like a symphony of elegance and sensuality, embodied in the fragrance he wore. With each step, notes of intoxicating vanilla and golden honey enveloped him, blending seamlessly with the warmth of tonka and the soothing essence of lavender. Crisp mint added a refreshing twist, while whispers of tobacco added depth and intrigue. As he passed, heads turned, captivated by the irresistible allure of his scent, a subtle yet undeniable declaration of his magnetic charm.

**Customer voice**

- 5★ *Adham Abd-Elbary* — “Long lasting and effective. Many thanks!”
- 5★ *احمد احمد* — “Awesome”
- 5★ *Anonymous* — “Best Quality❤️❤️”

**Gaps:** only 1 image — theme hover/variant switching inert · image alt text is null · notes not machine-readable · junk `0.00` compare-at

---

### 21. Mango Pineapple
`mango-pineapple`

| | |
|---|---|
| **Vendor** | Summer Hammer · *⚠️ dupe reference — renders as brand on the PDP and in JSON-LD* |
| **Product type** | — not in capture |
| **Tags** | `Best Selling`, `Men`, `new`, `Women` |
| **Published** | 2025-08-16 |
| **Option name** | `size` |
| **Reviews** | 5.0★ across 11 reviews |
| **Images** | 1 · **alt text missing** · `Mango-Pineapple.jpg` |
| **Description** | format C: name + accords + labelled notes · 303 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 100 ml | LE 1,850 | — | **sold out** |
| 50 ml | LE 1,100 | — | in stock |
| 30 ml | LE 750 | — | **sold out** |

**Scent profile**

- **Top notes:** Mango, Pineapple, Bergamot/Lemon zest
- **Heart notes:** White florals, Coconut water, Creamy accord
- **Base notes:** Soft Musk, Light Amber, Cashmere Woods

**Description (as published)**

> Mango Pineapple The taste of summer in a bottle. Juicy mango and pineapple, resting on soft musk that keeps your presence fresh and effortlessly chic all day Notes: Top: Mango, Pineapple, Bergamot/Lemon zest Heart: White florals, Coconut water, Creamy accord Base: Soft Musk, Light Amber, Cashmere Woods

**Customer voice**

- 5★ *محمد ناصر* — “Gorgeous perfume 100% recommend 🔥❤️”
- 5★ *Fadi Ghattas* — “Hiiiii siwa I ordered last moth Boujee Blush from the website for a friend’s birthday And bought mango pineapple from your store this weekend and Honestly, this perfume really surp”
- 5★ *Anonymous* — “رائع”

**Gaps:** only 1 image — theme hover/variant switching inert · image alt text is null · 2 variant(s) sold out

---

### 22. Soul Poudree
`soul-poudree`

| | |
|---|---|
| **Vendor** | Narciso Poudree · *⚠️ dupe reference — renders as brand on the PDP and in JSON-LD* |
| **Product type** | — not in capture |
| **Tags** | `Women` |
| **Published** | 2024-06-17 |
| **Option name** | `size` |
| **Reviews** | 5.0★ across 11 reviews |
| **Images** | 1 · **alt text missing** · `Soul_Poudree.jpg` |
| **Description** | format C: name + accords + labelled notes · 177 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 100 | LE 1,050 | — | in stock |
| 50 ml | LE 600 | `0.00` junk | in stock |
| 30 ml | LE 400 | `0.00` junk | in stock |

**Scent profile**

- **Top notes:** Jasmine, Bulgarian Rose and Orange Blossom
- **Heart notes:** Musk
- **Base notes:** Coumarin, Cedar, Vetiver and Patchouli

**Description (as published)**

> Soul Poudree Woody Floral Musk fragrance for women Top notes : Jasmine, Bulgarian Rose and Orange Blossom Middle notes : Musk Base notes : Coumarin, Cedar, Vetiver and Patchouli

**Customer voice**

- 5★ *Asmaa* — “تحفه جداوثباتها حلو اوي ❤️❤️❤️”
- 5★ *Samar* — “جميل و شيك و راقى و انثوى جدا و ثباته حلو اوى”
- 5★ *Ahmed Said* — “.”

**Gaps:** only 1 image — theme hover/variant switching inert · image alt text is null · junk `0.00` compare-at

---

### 23. Vanilla Bundle
`vanilla-bundle`

| | |
|---|---|
| **Vendor** | Siwa Fragrances · *Siwa-owned* |
| **Product type** | — not in capture |
| **Tags** | `Bundles` |
| **Published** | 2025-07-17 |
| **Option name** | `silk vanilla (size)`, `Silk Vanilla Body Lotion ( size )`, `layering vanilla (size)` |
| **Reviews** | 5.0★ across 11 reviews |
| **Images** | 1 · **alt text missing** · `IMG-1919.png` |
| **Description** | format D: free prose, no labelled tiers · 559 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 125ML / 120 ml / 30ML | LE 1,060 | LE 1,175 | **sold out** |
| 125ML / 120 ml / 50ML | LE 1,240 | LE 1,375 | **sold out** |
| 125ML / 120 ml / 100ML | LE 1,555 | LE 1,725 | **sold out** |

**Scent profile** — ⚠️ no labelled tiers in `body_html`; notes exist only as prose.

**Description (as published)**

> Vanilla Bundle – Your Everyday Glow in Luxury.. Sink into the warm, creamy essence of Silk Vanilla. This luxurious bundle features: Layering Vanilla Perfume – a rich, long-lasting scent that wraps you in sensual comfort. Silk Vanilla Body Lotion (125 ml) – deeply moisturizing with Shea Butter, Cocoa Butter & Vitamin E for a soft, radiant feel. Silk Vanilla Body Splash (125 ml) – a fresh touch of elegance that leaves a subtle trail of vanilla warmth all day. Layer all three for a long-lasting, addictive vanilla aura that feels both comforting and classy.

**Customer voice**

- 5★ *Merna Abo Basha* — “The layering Vanilla bundle is amazing 😍😍”
- 5★ *Elshanshorylaila* — “The smell is amazing I love everything about the bundle the packaging the perfume is long lasting would 1000% recommend”
- 5★ *Salma* — “I have no words, this smells heavenly”

**Gaps:** no gender tag · only 1 image — theme hover/variant switching inert · image alt text is null · notes not machine-readable · **every variant sold out** — no back-in-stock capture

---

### 24. Carnal Trail
`carnal-trail`

| | |
|---|---|
| **Vendor** | Side Effect Initio · *⚠️ dupe reference — renders as brand on the PDP and in JSON-LD* |
| **Product type** | — not in capture |
| **Tags** | `Best Selling`, `Men`, `Women` |
| **Published** | 2023-09-24 |
| **Option name** | `size` |
| **Reviews** | 5.0★ across 10 reviews |
| **Images** | 1 · **alt text missing** · `CarnalTrail.jpg` |
| **Description** | format D: free prose, no labelled tiers · 225 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 100 ml | LE 1,550 | — | in stock |
| 50 ml | LE 900 | — | in stock |
| 30 ml | LE 600 | — | in stock |

**Scent profile** — ⚠️ no labelled tiers in `body_html`; notes exist only as prose.

**Description (as published)**

> Carnal Trail Vanilla, Rum, Tobacco Irresistible boozy blend of rum, vanilla, tobacco and cinnamon. Drop dead sexy perfume gives a deep, sexy unforgettable trail. If you want to smell the sexiest person in this world Wear it !

**Customer voice**

- 5★ *Marco farag* — “Perfect opening and awesome dry down I love it so much”
- 5★ *Ahmed Nabawi* — “So good”
- 5★ *Ahmed Gaafary* — “حلوة وثابتة”

**Gaps:** only 1 image — theme hover/variant switching inert · image alt text is null · notes not machine-readable

---

### 25. Layering Pistachio
`layering-pistachio`

| | |
|---|---|
| **Vendor** | Yum Pistachio Gelato Kayali · *⚠️ dupe reference — renders as brand on the PDP and in JSON-LD* |
| **Product type** | — not in capture |
| **Tags** | `Best Selling`, `Men`, `Women` |
| **Published** | 2023-10-27 |
| **Option name** | `size` |
| **Reviews** | 5.0★ across 10 reviews |
| **Images** | 1 · **alt text missing** · `layering-pistachio.jpg` |
| **Description** | format D: free prose, no labelled tiers · 298 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 100 ml | LE 1,000 | `0.00` junk | in stock |
| 50 ml | LE 650 | — | in stock |
| 30 ml | LE 450 | — | in stock |

**Scent profile** — ⚠️ no labelled tiers in `body_html`; notes exist only as prose.

**Description (as published)**

> Layering Pistachio Sweet, woody, nutty Delicious blend captivates the senses with its irresistible and edible notes including pistachio, whipped cream, roasted hazelnut, sweet rum, fluffy marshmallow, and fizzy cotton candy. Irresistible perfume ideal for layering & sexy. Best for winter and fall.

**Customer voice**

- 5★ *Anonymous* — “Nice”
- 5★ *Marwa Abdelaziz* — “❤️❤️❤️”
- 5★ *Anonymous* — “very good scent and lasts for a very long time”

**Gaps:** only 1 image — theme hover/variant switching inert · image alt text is null · notes not machine-readable · junk `0.00` compare-at

---

### 26. Apple Pie
`apple-pie`

| | |
|---|---|
| **Vendor** | Siwa Fragrances · *Siwa-owned* |
| **Product type** | — not in capture |
| **Tags** | **none — unreachable via tag-driven nav** |
| **Published** | 2025-02-22 |
| **Option name** | `size` |
| **Reviews** | 5.0★ across 9 reviews |
| **Images** | 3 · **alt text missing** · `apple-pie.jpg`, `MG_0974-scaled.jpg`, `brown-beige-minimalist-face-mist-features-instagram-post-4.png-4.png` |
| **Description** | format E: minimal / boilerplate · 189 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 125ML | LE 375 | `0.00` junk | in stock |

**Scent profile** — ⚠️ no labelled tiers in `body_html`; notes exist only as prose.

**Description (as published)**

> Apple Pie A long-lasting body splash enriched with vitamin E, blending warm vanilla, delicate Apple, sweet praline, and rich cinnamon for a sensual, irresistible scent that lingers all day.

**Customer voice**

- 5★ *Anonymous* — “ممتاز”
- 5★ *Mohanad Tarek* — “Beautiful”
- 5★ *Elham Khedr* — “Highly recommended”

**Gaps:** no tags — invisible to navigation · image alt text is null · notes not machine-readable · junk `0.00` compare-at

---

### 27. Hot Male
`hot-male`

| | |
|---|---|
| **Vendor** | You Intensely Giorgio Armani · *⚠️ dupe reference — renders as brand on the PDP and in JSON-LD* |
| **Product type** | — not in capture |
| **Tags** | `Men` |
| **Published** | 2024-06-14 |
| **Option name** | `size` |
| **Reviews** | 5.0★ across 9 reviews |
| **Images** | 1 · **alt text missing** · `hot-male.jpg` |
| **Description** | format C: name + accords + labelled notes · 184 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 50 ml | LE 800 | `0.00` junk | in stock |
| 100 ml | LE 1,250 | — | in stock |

**Scent profile**

- **Top notes:** Pink Pepper, Juniper and Violet
- **Heart notes:** Toffee, Cinnamon, Lavender and Sage
- **Base notes:** Vanilla, Amber, Tonka Bean and Suede

**Description (as published)**

> Hot Male Amber Fougere fragrance for men. Top notes :Pink Pepper, Juniper and Violet Middle notes :Toffee, Cinnamon, Lavender and Sage Base notes : Vanilla, Amber, Tonka Bean and Suede

**Customer voice**

- 5★ *Anonymous* — “Nice”
- 5★ *Moaz Ahmed* — “To7fa”
- 5★ *Anonymous* — “A distinctive and long-lasting perfume as well”

**Gaps:** only 1 image — theme hover/variant switching inert · image alt text is null · junk `0.00` compare-at

---

### 28. Luna Di Roma
`luna-di-roma`

| | |
|---|---|
| **Vendor** | Valentino Donna Born In Roma Intense · *⚠️ dupe reference — renders as brand on the PDP and in JSON-LD* |
| **Product type** | — not in capture |
| **Tags** | `Women` |
| **Published** | 2024-08-14 |
| **Option name** | `size` |
| **Reviews** | 4.78★ across 9 reviews |
| **Images** | 1 · **alt text missing** · `Luna_Di_Roma.jpg` |
| **Description** | format C: name + accords + labelled notes · 127 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 50 ml | LE 600 | `0.00` junk | in stock |

**Scent profile**

- **Top notes:** Bourbon Vanilla and Amber
- **Heart notes:** Jasmine
- **Base notes:** Benzoin

**Description (as published)**

> Luna Di Roma Amber floral fragrance for women Top notes : Bourbon Vanilla and Amber Middle notes : Jasmine Base notes : Benzoin

**Customer voice**

- 5★ *Sahar Elagamy* — “Perfect”
- 5★ *FATIMA ABED* — “It smells soooooo good better than the original and it lasted so long on me”
- 5★ *عمر محمد* — “المنتج تحفه”

**Gaps:** only 1 image — theme hover/variant switching inert · image alt text is null · junk `0.00` compare-at

---

### 29. Aurableu
`aurableu`

| | |
|---|---|
| **Vendor** | Symphony LV · *⚠️ dupe reference — renders as brand on the PDP and in JSON-LD* |
| **Product type** | — not in capture |
| **Tags** | **none — unreachable via tag-driven nav** |
| **Published** | 2026-04-24 |
| **Option name** | `Size` |
| **Reviews** | 5.0★ across 8 reviews |
| **Images** | 1 · **alt text missing** · `3BA9765B-63D6-4CE5-9C0D-73CD8D312E09.jpg` |
| **Description** | format B: Persona / The Story · 1000 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 30 ml | LE 700 | — | in stock |
| 50 ml | LE 1,050 | — | in stock |
| 100 ml | LE 1,750 | — | **sold out** |

**Scent profile**

- **Top notes:** Bright citrus blend with vibrant freshness
- **Heart notes:** Soft aromatic nuances and refined floral layers
- **Base notes:** Clean musky undertones with subtle woody freshness and ginger

**Description (as published)**

> Persona For those who move with lightness and clarity. Effortless, fresh, and naturally refined. A presence that feels clean, uplifting, and quietly confident. The Story Aurableu captures the feeling of a bright horizon and open air. Inspired by a radiant citrus symphony, it opens with a vibrant burst of fresh, juicy notes that feel instantly energizing and pure. As it settles, the composition becomes smoother and more balanced, blending crisp citrus with subtle aromatic and floral nuances that keep it elegant and never overwhelming. The result is a scent that feels transparent, refreshing, and perfectly polished. Clean, luminous, and full of life. A fragrance that feels like a breath of …

**Customer voice**

- 5★ *FARES Ehab* — “Smells really nice”
- 5★ *Anonymous* — “Fresh summery lime”
- 5★ *Youssef Mahmoud* — “Very good”

**Gaps:** no tags — invisible to navigation · only 1 image — theme hover/variant switching inert · image alt text is null · 1 variant(s) sold out

---

### 30. Chocolate Creme
`chocolate-creme`

| | |
|---|---|
| **Vendor** | Siwa original creation · *Siwa-owned* |
| **Product type** | — not in capture |
| **Tags** | `Men`, `new`, `Unisex`, `Women` |
| **Published** | 2024-12-06 |
| **Option name** | `size` |
| **Reviews** | 5.0★ across 8 reviews |
| **Images** | 1 · **alt text missing** · `chocolate-creme.jpg` |
| **Description** | format E: minimal / boilerplate · 96 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 100 ml | LE 1,250 | `0.00` junk | **sold out** |
| 50 ml | LE 750 | `0.00` junk | in stock |
| 30 ml | LE 450 | `0.00` junk | **sold out** |

**Scent profile** — ⚠️ no labelled tiers in `body_html`; notes exist only as prose.

**Description (as published)**

> Chocolate Creme Gourmand fragrance for men & women. Notes: Chocolate, Vanilla, orange and woods.

**Customer voice**

- 5★ *Anonymous* — “Very rich and nice”
- 5★ *Maryamgibreel* — “Msh tbe3yaaaaaaa😍😍😍😍😍”
- 5★ *Jana* — “It smells so edible, for those who like to smell edible it’s the perfect scent for you”

**Gaps:** only 1 image — theme hover/variant switching inert · image alt text is null · notes not machine-readable · 2 variant(s) sold out · junk `0.00` compare-at

---

### 31. Bleu Intense
`bleu-intense`

| | |
|---|---|
| **Vendor** | Bleu De Chanel Parfum · *⚠️ dupe reference — renders as brand on the PDP and in JSON-LD* |
| **Product type** | — not in capture |
| **Tags** | **none — unreachable via tag-driven nav** |
| **Published** | 2025-10-21 |
| **Option name** | `Size` |
| **Reviews** | 5.0★ across 7 reviews |
| **Images** | 1 · **alt text missing** · `BleuIntense.jpg` |
| **Description** | format C: name + accords + labelled notes · 400 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 100 ml | LE 1,050 | — | **sold out** |
| 50 ml | LE 700 | — | **sold out** |
| 30 ml | LE 500 | — | **sold out** |

**Scent profile**

- **Top notes:** Bergamot, Lemon, Mint
- **Heart notes:** Lavender, Pineapple
- **Base notes:** Cedar wood, Sandalwood, Amber, Tonka Bean

**Description (as published)**

> Bleu Intense the scent of quiet confidence, bold yet effortless, like a man who leads without speaking. Fresh citrus bursts of bergamot and lemon zest open the scent. As it settles, cedar wood and sandalwood reveal depth and warmth, balanced with whispers of amber and tonka bean. Top notes: Bergamot, Lemon, Mint Heart notes: Lavender, Pineapple Base notes: Cedar wood, Sandalwood, Amber, Tonka Bean

**Customer voice**

- 5★ *Anonymous* — “very good local perfumes”
- 5★ *Ibrahim* — “Great quality the perfume stays for a very long time and the scent profile is masculine and appealing”
- 5★ *Kareem El oraby* — “Amazing but needs to be a little fresh to smell like the original more”

**Gaps:** no tags — invisible to navigation · only 1 image — theme hover/variant switching inert · image alt text is null · **every variant sold out** — no back-in-stock capture

---

### 32. Libre Desire
`libre-desire`

| | |
|---|---|
| **Vendor** | YSL Libre intense · *⚠️ dupe reference — renders as brand on the PDP and in JSON-LD* |
| **Product type** | — not in capture |
| **Tags** | `Best Selling`, `new`, `Women` |
| **Published** | 2025-03-11 |
| **Option name** | `size` |
| **Reviews** | 5.0★ across 7 reviews |
| **Images** | 1 · **alt text missing** · `libre-desire-1.jpg` |
| **Description** | format D: free prose, no labelled tiers · 219 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 100 ml | LE 1,250 | `0.00` junk | **sold out** |
| 50 ml | LE 800 | `0.00` junk | in stock |
| 30 ml | LE 500 | `0.00` junk | in stock |

**Scent profile** — ⚠️ no labelled tiers in `body_html`; notes exist only as prose.

**Description (as published)**

> Libre Desire A bold and sensual fusion of warm vanilla, radiant orange blossom, and rich honey, with a touch of lavender and tonka bean for elegance. A rich, long-lasting scent that mirrors the allure of Beautiful Lady.

**Customer voice**

- 5★ *مني عبد الرحمن عوض Awad* — “nice smell and long-lasting”
- 5★ *Mariamessam* — “Touhfaaaaa”
- 5★ *Anonymous* — “Nice long lasting”

**Gaps:** only 1 image — theme hover/variant switching inert · image alt text is null · notes not machine-readable · 1 variant(s) sold out · junk `0.00` compare-at

---

### 33. Pacific Elixir
`pacific-elixir`

| | |
|---|---|
| **Vendor** | Pacific Chill Louis Vuitton · *⚠️ dupe reference — renders as brand on the PDP and in JSON-LD* |
| **Product type** | — not in capture |
| **Tags** | `Men`, `Women` |
| **Published** | 2023-10-06 |
| **Option name** | `size` |
| **Reviews** | 5.0★ across 7 reviews |
| **Images** | 1 · **alt text missing** · `pacific-elixir.jpg` |
| **Description** | format D: free prose, no labelled tiers · 264 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 30 ml | LE 600 | — | in stock |
| 50 ml | LE 900 | `0.00` junk | in stock |
| 100 ml | LE 1,500 | `0.00` junk | in stock |

**Scent profile** — ⚠️ no labelled tiers in `body_html`; notes exist only as prose.

**Description (as published)**

> Pacific Elixir Citrus, fruity, sweet. Fresh blend of apricot, orange, mint, lemon, cedrat, blackcurrant, basil with slight hints of dates and amber. Sparkly fresh heavenly scent evokes the serenity of the sparkling ocean. Very comforting & gives a cooling effect !

**Customer voice**

- 5★ *Mohamed* — “Perfect”
- 5★ *Anonymous* — “Perfect”
- 5★ *Hazem Sobhy* — “تحفه بجد سوبر فريش و سويت مع تويست فريش و ريحه مرار قشر برتقال في الخلفيةبجد تحفه”

**Gaps:** only 1 image — theme hover/variant switching inert · image alt text is null · notes not machine-readable · junk `0.00` compare-at

---

### 34. Silk Vanilla Body Lotion
`silk-vanilla-body-lotion`

| | |
|---|---|
| **Vendor** | Siwa Fragrances · *Siwa-owned* |
| **Product type** | body lotion |
| **Tags** | **none — unreachable via tag-driven nav** |
| **Published** | 2025-09-29 |
| **Option name** | `size` |
| **Reviews** | 5.0★ across 7 reviews |
| **Images** | 1 · **alt text missing** · `CopyofSilkVanillaLotion.jpg` |
| **Description** | format E: minimal / boilerplate · 197 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 120ML | LE 350 | — | **sold out** |

**Scent profile** — ⚠️ no labelled tiers in `body_html`; notes exist only as prose.

**Description (as published)**

> Silk Vanilla Body Lotion Lightweight lotion enriched with Vitamin E, Panthenol, Shea Butter & Cocoa Butter. Deeply hydrates, absorbs quickly, and leaves skin silky smooth with a warm vanilla scent.

**Customer voice**

- 5★ *Anonymous* — “Absolutely to7fa the scent is really good and even the hydrate it gives is so deep”
- 5★ *Sarah Badran* — “Amazing🤩”
- 5★ *Mina* — “An essential product for everyday use, this is a must if you are obsessed with smelling good.”

**Gaps:** no tags — invisible to navigation · only 1 image — theme hover/variant switching inert · image alt text is null · notes not machine-readable · **every variant sold out** — no back-in-stock capture

---

### 35. Summer Holidays
`summer-holidays`

| | |
|---|---|
| **Vendor** | LV Afternoon Swim · *⚠️ dupe reference — renders as brand on the PDP and in JSON-LD* |
| **Product type** | — not in capture |
| **Tags** | `Best Selling`, `Men`, `Women` |
| **Published** | 2022-05-20 |
| **Option name** | `size` |
| **Reviews** | 5.0★ across 7 reviews |
| **Images** | 1 · **alt text missing** · `summer-holidays.jpg` |
| **Description** | format D: free prose, no labelled tiers · 217 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 100 ml | LE 1,700 | — | in stock |
| 50 ml | LE 1,000 | `0.00` junk | in stock |
| 30 ml | LE 650 | `0.00` junk | in stock |

**Scent profile** — ⚠️ no labelled tiers in `body_html`; notes exist only as prose.

**Description (as published)**

> Citrus, fresh, aquatic Summer Holidays a super refreshing blend of sicilian orange, bergamot, mandarine, ginger with hints of ambergris. A beautiful citrus scent, juicy and addictive. perfect for summer and daily use.

**Customer voice**

- 5★ *Raghda* — “بجد خطييييرة وريحتها منعشة اوي”
- 5★ *Zain Khalid* — “Amazing perfum”
- 5★ *Waiz Maswadi* — “Good smell and long lasting”

**Gaps:** only 1 image — theme hover/variant switching inert · image alt text is null · notes not machine-readable · junk `0.00` compare-at

---

### 36. Sweet Rum
`sweet-rum`

| | |
|---|---|
| **Vendor** | Siwa Fragrances · *Siwa-owned* |
| **Product type** | — not in capture |
| **Tags** | **none — unreachable via tag-driven nav** |
| **Published** | 2025-03-02 |
| **Option name** | `size` |
| **Reviews** | 5.0★ across 7 reviews |
| **Images** | 3 · **alt text missing** · `sweet-rum.jpg`, `MG_0973-scaled.jpg`, `copy-of-brown-beige-minimalist-face-mist-features-instagram-post_png_85708ae2-29a7-4237-91f8-1bd663d1321d.png` |
| **Description** | format E: minimal / boilerplate · 191 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 125ml | LE 375 | `0.00` junk | in stock |

**Scent profile** — ⚠️ no labelled tiers in `body_html`; notes exist only as prose.

**Description (as published)**

> Sweet Rum A long-lasting body splash enriched with vitamin E, blending warm vanilla, delicate dates, sweet praline, and rich cinnamon for a sensual, irresistible scent that lingers all night.

**Customer voice**

- 5★ *Anonymous* — “It's the 3rd time to order it actually , it's so good and long-lasting”
- 5★ *Bimen Atef* — “Perfect”
- 5★ *Anonymous* — “حقيقي بتجنننن كتيير حلوة وبتثبت لأيام روووعة❤️❤️❤️”

**Gaps:** no tags — invisible to navigation · image alt text is null · notes not machine-readable · junk `0.00` compare-at

---

### 37. Gourmet
`gourmet`

| | |
|---|---|
| **Vendor** | Siwa original creation · *Siwa-owned* |
| **Product type** | — not in capture |
| **Tags** | `Best Selling`, `Men`, `new`, `Unisex`, `Women` |
| **Published** | 2025-01-09 |
| **Option name** | `size` |
| **Reviews** | 5.0★ across 6 reviews |
| **Images** | 2 · **alt text missing** · `gourmet.jpg`, `IMG_7982-1-scaled.jpg` |
| **Description** | format D: free prose, no labelled tiers · 236 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 100 ml | LE 2,100 | — | **sold out** |
| 50 ml | LE 1,250 | `0.00` junk | in stock |
| 30 ml | LE 800 | `0.00` junk | in stock |

**Scent profile** — ⚠️ no labelled tiers in `body_html`; notes exist only as prose.

**Description (as published)**

> Gourmet Where Gourmand Scent meets buttery Warmth ! A warm croissant fresh from the oven, layered with sweet berries and rich blackcurrant, melts into the heart of toasted vanilla, gold butter and velvety Tonka bean based on Sandalwood.

**Customer voice**

- 5★ *Anonymous* — “More than great ❤️❤️❤️❤️ tuhfaaaaaaa”
- 5★ *Anonymous* — “Perfect”
- 5★ *Anonymous* — “perfect scent”

**Gaps:** image alt text is null · notes not machine-readable · 1 variant(s) sold out · junk `0.00` compare-at

---

### 38. Iris elixir
`iris-elixir`

| | |
|---|---|
| **Vendor** | Prada L’Homme Intense · *⚠️ dupe reference — renders as brand on the PDP and in JSON-LD* |
| **Product type** | — not in capture |
| **Tags** | `Men` |
| **Published** | 2024-06-14 |
| **Option name** | `size` |
| **Reviews** | 5.0★ across 6 reviews |
| **Images** | 1 · **alt text missing** · `iris-elixir-1.jpg` |
| **Description** | format C: name + accords + labelled notes · 141 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 100 ml | LE 1,350 | — | **sold out** |
| 50 ml | LE 850 | — | **sold out** |

**Scent profile**

- **Top notes:** Iris
- **Heart notes:** Amber and Patchouli
- **Base notes:** Tonka Bean, Leather and Sandalwood

**Description (as published)**

> Iris elixir Amber Woody fragrance for men Top notes : Iris Middle notes : Amber and Patchouli Base notes : Tonka Bean, Leather and Sandalwood

**Customer voice**

- 5★ *Anonymous* — “Super clean masculine smell”
- 5★ *Anonymous* — “برفيوم ولا غلطة نسبة تطابق عالية جدا ، ثبات وفوحان ولا أروع قيمة مقابل سعر بجد برافوو”
- 5★ *Anonymous* — “The best”

**Gaps:** only 1 image — theme hover/variant switching inert · image alt text is null · **every variant sold out** — no back-in-stock capture

---

### 39. Layering Lychee
`layering-lychee`

| | |
|---|---|
| **Vendor** | Eden Sparkling Lychee 39 Kayali · *⚠️ dupe reference — renders as brand on the PDP and in JSON-LD* |
| **Product type** | — not in capture |
| **Tags** | `Best Selling`, `Women` |
| **Published** | 2024-04-03 |
| **Option name** | `size` |
| **Reviews** | 5.0★ across 6 reviews |
| **Images** | 1 · **alt text missing** · `Layering_Lychee.jpg` |
| **Description** | format D: free prose, no labelled tiers · 399 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 100 ml | LE 1,000 | `0.00` junk | **sold out** |
| 50 ml | LE 650 | — | in stock |
| 30 ml | LE 450 | — | in stock |

**Scent profile** — ⚠️ no labelled tiers in `body_html`; notes exist only as prose.

**Description (as published)**

> Layering Lychee Sweet, Fruity, vanilla Introducing our summer feminine perfume, where juicy lychee takes center stage, dancing with notes of vanilla, black currant, and a sprinkle of sugar. A delightful concoction that captures the essence of sunny days and carefree moments. Revel in the sweet and refreshing allure of this irresistible fragrance, perfect for brightening up your summer adventures.

**Customer voice**

- 5★ *Sondos Tarek* — “Ten out of ten chefs kiss🤪😍😍💕”
- 5★ *Nada* — “my favorite helwa gedan w sabta”
- 5★ *Anonymous* — “very sweet w tuhfa ll summer”

**Gaps:** only 1 image — theme hover/variant switching inert · image alt text is null · notes not machine-readable · 1 variant(s) sold out · junk `0.00` compare-at

---

### 40. Insane Pineapple
`insane-pineapple`

| | |
|---|---|
| **Vendor** | Nishane Hacivat · *⚠️ dupe reference — renders as brand on the PDP and in JSON-LD* |
| **Product type** | — not in capture |
| **Tags** | `Men` |
| **Published** | 2023-09-21 |
| **Option name** | `size` |
| **Reviews** | 4.8★ across 5 reviews |
| **Images** | 1 · **alt text missing** · `insane-pineapple.jpg` |
| **Description** | format D: free prose, no labelled tiers · 286 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 100 ml | LE 1,350 | `0.00` junk | **sold out** |
| 50 ml | LE 850 | `0.00` junk | in stock |
| 30 ml | LE 500 | `0.00` junk | in stock |

**Scent profile** — ⚠️ no labelled tiers in `body_html`; notes exist only as prose.

**Description (as published)**

> Insane Pineapple Citrus, Woody, mossy Unique fresh blend of pineapple, grapefruit, bergamot, patchouli based on moss and woods. Strong summer perfume gives the feeling of sitting on the beach on a sunny day while drinking an extremely fresh pineapple juice & breezing a mossy fresh air.

**Customer voice**

- 5★ *Ahmed nabil* — “روعه”
- 5★ *Anonymous* — “I love it”
- 5★ *Raghda* — “حلوة اوي بجد و ريحتها منعشة”

**Gaps:** only 1 image — theme hover/variant switching inert · image alt text is null · notes not machine-readable · 1 variant(s) sold out · junk `0.00` compare-at

---

### 41. Marshmallow
`marshmallow`

| | |
|---|---|
| **Vendor** | Siwa Fragrances · *Siwa-owned* |
| **Product type** | — not in capture |
| **Tags** | **none — unreachable via tag-driven nav** |
| **Published** | 2025-05-06 |
| **Option name** | `size` |
| **Reviews** | 5.0★ across 5 reviews |
| **Images** | 1 · **alt text missing** · `Marshmallow-Splash.jpg` |
| **Description** | format E: minimal / boilerplate · 112 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 125ML | LE 375 | `0.00` junk | in stock |

**Scent profile** — ⚠️ no labelled tiers in `body_html`; notes exist only as prose.

**Description (as published)**

> A long-lasting body splash enriched with vitamin E, sweet, warm blend of vanilla, sugar, and fluffy marshmallow.

**Customer voice**

- 5★ *Ahmed aboalfath* — “its smell is really sweet and the packaging is great, thank you very much”
- 5★ *Tarek ELGHABATY* — “رائع”
- 5★ *mostafa badr* — “Very good”

**Gaps:** no tags — invisible to navigation · only 1 image — theme hover/variant switching inert · image alt text is null · notes not machine-readable · junk `0.00` compare-at

---

### 42. Siwa Trail
`siwa-trail`

| | |
|---|---|
| **Vendor** | Guidance Amouage · *⚠️ dupe reference — renders as brand on the PDP and in JSON-LD* |
| **Product type** | — not in capture |
| **Tags** | `Men`, `new`, `Unisex`, `Women` |
| **Published** | 2026-04-25 |
| **Option name** | `size` |
| **Reviews** | 5.0★ across 5 reviews |
| **Images** | 1 · **alt text missing** · `siwa-trail.jpg` |
| **Description** | format D: free prose, no labelled tiers · 428 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 100 ml | LE 1,750 | `0.00` junk | **sold out** |
| 50 ml | LE 950 | `0.00` junk | **sold out** |
| 30 ml | LE 600 | `0.00` junk | **sold out** |

**Scent profile** — ⚠️ no labelled tiers in `body_html`; notes exist only as prose.

**Description (as published)**

> Siwa Trail The new summer edition A journey through the golden dunes of Siwa, the scent of hazelnut, pear, vanilla and soft woods lingering in the air with shades of amber. A fragrance that felt like a memory, a whisper of elegance wrapped in warmth. Siwa Trail brings you a scent that tells a story of beauty and resilience. Rich, floral, and irresistibly creamy, it’s more than a perfume it’s a journey..now within your reach.

**Customer voice**

- 5★ *حنان سامي* — “عجبني جدا و فوحانه و ثباته رائع لسه ماستخدمتوش كفايه بس جربته اول ما وصلني الريحة كانت فواحة وثابته فترة طويله، بالنسبة للريحة نفسها فهي مش بالظبط الزوق المتعودة عليه لكن عجبني و ح”
- 5★ *Anonymous* — “حلوه جدا لأول وهله تحسها تقيله بعد كدا تهدأ وتكون تحفه وقيمه وشيك اللي هيعرف قيمتها اللي عايشين في الخليج .”
- 5★ *Mohamed Ahmed* — “I love is so much I think I will never stop by it from you. It’s very unique. I hope that youmake 100 ml from it soon”

**Gaps:** only 1 image — theme hover/variant switching inert · image alt text is null · notes not machine-readable · **every variant sold out** — no back-in-stock capture · junk `0.00` compare-at

---

### 43. Belle Riche
`belle-riche`

| | |
|---|---|
| **Vendor** | La Belle Le Parfum · *⚠️ dupe reference — renders as brand on the PDP and in JSON-LD* |
| **Product type** | — not in capture |
| **Tags** | **none — unreachable via tag-driven nav** |
| **Published** | 2026-01-29 |
| **Option name** | `size` |
| **Reviews** | 5.0★ across 4 reviews |
| **Images** | 1 · **alt text missing** · `belle-riche-4.jpg` |
| **Description** | format D: free prose, no labelled tiers · 204 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 100 ml | LE 1,150 | LE 1,450 | **sold out** |
| 50 ml | LE 750 | LE 1,000 | in stock |
| 30 ml | LE 550 | LE 650 | in stock |

**Scent profile** — ⚠️ no labelled tiers in `body_html`; notes exist only as prose.

**Description (as published)**

> Belle Riche A seductive blend of juicy pear, rich vanilla, and creamy tonka bean, wrapped in warm jasmine and a hint of amber. A deep, addictive fragrance that captures the essence of richness & softness.

**Customer voice**

- 5★ *Mayar Khaled* — “Smells very much like the original with a very slight difference that made me like this version even more. Longevity is amaaziingggg literally stays all day. Quality tohfa as usual”
- 5★ *Anonymous* — “Nice”
- 5★ *H.Ahmed* — “حلوه اوي اوي اوي 🤩🤩🤩 نسبه تطابق عاليه جدا الفكره انها كل بتقعد بتحلو اوي 🫶🫶🫶”

**Gaps:** no tags — invisible to navigation · only 1 image — theme hover/variant switching inert · image alt text is null · notes not machine-readable · 1 variant(s) sold out

---

### 44. Lost On You
`lost-on-you`

| | |
|---|---|
| **Vendor** | Lost In Paris Roja · *⚠️ dupe reference — renders as brand on the PDP and in JSON-LD* |
| **Product type** | — not in capture |
| **Tags** | **none — unreachable via tag-driven nav** |
| **Published** | 2026-04-24 |
| **Option name** | `Size` |
| **Reviews** | 5.0★ across 4 reviews |
| **Images** | 1 · **alt text missing** · `06EE0A47-1E7B-4AE1-ACF0-BA56D57994D1.jpg` |
| **Description** | format B: Persona / The Story · 986 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 30 ml | LE 750 | — | **sold out** |
| 50 ml | LE 1,100 | — | **sold out** |
| 100 ml | LE 1,900 | — | **sold out** |

**Scent profile**

- **Top notes:** Blood orange, mandarin, bitter orange, rum
- **Heart notes:** Caramel, sugar, creamy gourmand accords
- **Base notes:** Vanilla, ambergris, warm woods, soft spices

**Description (as published)**

> Persona For a presence that feels magnetic and unforgettable. Emotional, indulgent, and effortlessly captivating. The Story Lost On You is where indulgence meets elegance. It opens with a luminous citrus glow, lifted by a warm hint of rum, like the first sip of something rich on a Parisian night. As it unfolds, a smooth gourmand heart takes shape. Caramel softens into a buttery warmth, wrapping the scent in a creamy, refined sweetness that feels luxurious, never excessive. In the dry down, vanilla melts into soft woods, settling close to the skin in a way that feels intimate, warm, and quietly addictive. A fragrance that doesn’t overwhelm… it draws you in, slowly. Notes Top Notes: Blood …

**Customer voice**

- 5★ *Youssef Dahy* — “simple GREAT”
- 5★ *Anonymous* — “عطر جيد جدا وفي مرحلة التجربة”
- 5★ *Anonymous* — “sweet amazing pure feminien it has a strong entrance but its pure notes later on turns to something very unique”

**Gaps:** no tags — invisible to navigation · only 1 image — theme hover/variant switching inert · image alt text is null · **every variant sold out** — no back-in-stock capture

---

### 45. Marshmallow Bundle
`marshmallow-bundle`

| | |
|---|---|
| **Vendor** | Siwa Fragrances · *Siwa-owned* |
| **Product type** | — not in capture |
| **Tags** | `Bundles` |
| **Published** | 2025-05-17 |
| **Option name** | `Marshmallow (size)`, `Boujee Blush (size)` |
| **Reviews** | 5.0★ across 4 reviews |
| **Images** | 1 · **alt text missing** · `body-splash-marshmellow.jpg` |
| **Description** | format E: minimal / boilerplate · 77 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 125ML / 50ML | LE 950 | LE 1,250 | in stock |

**Scent profile** — ⚠️ no labelled tiers in `body_html`; notes exist only as prose.

**Description (as published)**

> Marshmallow Bundle Enjoy additional 10% off when you buy marshmallow bundle !

**Customer voice**

- 5★ *Anonymous* — “تحفه تحفه”
- 5★ *RowanAhmed* — “MASTERPIECE ❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥”
- 5★ *youmna Yasser* — “touhfaaa”

**Gaps:** no gender tag · only 1 image — theme hover/variant switching inert · image alt text is null · notes not machine-readable

---

### 46. Pink Arrogance
`pink-arrogance`

| | |
|---|---|
| **Vendor** | Siwa original creation · *Siwa-owned* |
| **Product type** | — not in capture |
| **Tags** | **none — unreachable via tag-driven nav** |
| **Published** | 2026-04-24 |
| **Option name** | `Size` |
| **Reviews** | 5.0★ across 4 reviews |
| **Images** | 1 · **alt text missing** · `068E4637-6A79-41AB-80D5-7658C653F7BC.jpg` |
| **Description** | format B: Persona / The Story · 997 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 30 ml | LE 450 | — | in stock |
| 50 ml | LE 650 | — | in stock |
| 100 ml | LE 1,000 | — | in stock |

**Scent profile**

- **Top notes:** Orange blossom, neroli, almond
- **Heart notes:** Jasmine, violet, apricot
- **Base notes:** Musk, sandalwood

**Description (as published)**

> Persona She doesn’t wait to be noticed. She decides when she is. Confident, composed, and always in control. There’s a quiet sharpness to her presence… soft at first, but never weak. The Story Pink Arrogance isn’t about being sweet. It’s about being certain. It opens with a bright floral lift, where orange blossom and neroli meet a soft almond nuance, creating a start that feels clean but with a subtle edge. As it settles, the scent becomes more defined. Jasmine and violet bring a powdery elegance, while a smooth fruity touch adds just enough warmth to keep it balanced without losing its composure. In the dry down, musk and sandalwood take over quietly, giving the fragrance structure and …

**Customer voice**

- 5★ *Mai Habib* — “It's an amazing perfume. I love it”
- 5★ *Anonymous* — “5teeeeeraaaa♥️”
- 5★ *Anonymous* — “A very unique scent”

**Gaps:** no tags — invisible to navigation · only 1 image — theme hover/variant switching inert · image alt text is null

---

### 47. Layering bundle
`layering-30-ml-bundle`

| | |
|---|---|
| **Vendor** | Siwa Fragrances · *Siwa-owned* |
| **Product type** | — not in capture |
| **Tags** | `Bundles` |
| **Published** | 2024-11-14 |
| **Option name** | `Layering Vanilla (size)`, `Layering Lychee`, `Layerng Pistachio` |
| **Reviews** | 5.0★ across 3 reviews |
| **Images** | 1 · **alt text missing** · `artboard-3.jpg` |
| **Description** | format E: minimal / boilerplate · 77 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 30ML / 30ML / 30ML | LE 1,105 | LE 1,650 | in stock |
| 30ML / 30ML / 50ML | LE 1,285 | LE 1,850 | in stock |
| 30ML / 30ML / 100ML | LE 1,645 | LE 2,300 | in stock |
| 30ML / 50ML / 30ML | LE 1,275 | LE 1,900 | in stock |
| 30ML / 50ML / 50ML | LE 1,455 | LE 2,100 | in stock |
| 30ML / 50ML / 100ML | LE 1,815 | LE 2,550 | in stock |
| 50ML / 30ML / 30ML | LE 1,285 | LE 1,850 | in stock |
| 50ML / 30ML / 50ML | LE 1,465 | LE 2,050 | in stock |
| 50ML / 30ML / 100ML | LE 1,825 | LE 2,500 | in stock |
| 50ML / 50ML / 30ML | LE 1,455 | LE 2,100 | in stock |
| 50ML / 50ML / 50ML | LE 1,635 | LE 2,300 | in stock |
| 50ML / 50ML / 100ML | LE 1,995 | LE 2,750 | in stock |

**Scent profile** — ⚠️ no labelled tiers in `body_html`; notes exist only as prose.

**Description (as published)**

> Pay less get more! Enjoy a bundle of our three top layering perfumes with 15%

**Customer voice**

- 5★ *Samar Khalied* — “الليتشي خطيرة ومختلفة بجد تحفة البستاشيو جوكر مع كل البرفيومز بتمشي معاهم حلو اوي الفانيلا لذيذه بس تقريبا عليها توباكو ف تقيله شويه و ثابتين ✨”
- 5★ *Nouran Emad* — “Very good quality and long lasting”
- 5★ *Anonymous* — “All items are amazing”

**Gaps:** no gender tag · only 1 image — theme hover/variant switching inert · image alt text is null · notes not machine-readable

---

### 48. Stellar Nights
`stellar-nights`

| | |
|---|---|
| **Vendor** | Stellar Times Louis Vuitton · *⚠️ dupe reference — renders as brand on the PDP and in JSON-LD* |
| **Product type** | — not in capture |
| **Tags** | `Best Selling`, `Men`, `Women` |
| **Published** | 2023-12-20 |
| **Option name** | `size` |
| **Reviews** | 5.0★ across 3 reviews |
| **Images** | 1 · **alt text missing** · `Stellar_Nights.jpg` |
| **Description** | format D: free prose, no labelled tiers · 367 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 100 ml | LE 2,050 | — | in stock |
| 50 ml | LE 1,200 | — | in stock |
| 30 ml | LE 800 | — | in stock |

**Scent profile** — ⚠️ no labelled tiers in `body_html`; notes exist only as prose.

**Description (as published)**

> Stellar Nights Discover the allure of our new unisex perfume, a harmonious fusion where the warm amber intertwines with the vibrant essence of orange blossoms. Balanced by the grounding notes of woods which captures the essence of timeless sophistication. Embrace the versatility of scent that transcends boundaries, leaving an indelible impression with every spritz.

**Customer voice**

- 5★ *Anonymous* — “The stunning entry to the perfume is strong, then turns into warm and long-lasting; beautifully combined notes make you feel elite.”
- 5★ *Tarek ELGHABATY* — “ممتاز”
- 5★ *Anonymous* — “Perfect”

**Gaps:** only 1 image — theme hover/variant switching inert · image alt text is null · notes not machine-readable

---

### 49. Absolute Drunk
`absolute-drunk`

| | |
|---|---|
| **Vendor** | Il Padrino Sospiro · *⚠️ dupe reference — renders as brand on the PDP and in JSON-LD* |
| **Product type** | — not in capture |
| **Tags** | **none — unreachable via tag-driven nav** |
| **Published** | 2026-03-14 |
| **Option name** | `Size` |
| **Reviews** | 5.0★ across 2 reviews |
| **Images** | 1 · **alt text missing** · `IMG-4136.jpg` |
| **Description** | format B: Persona / The Story · 1062 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 30 ml | LE 750 | — | **sold out** |
| 50 ml | LE 1,100 | — | **sold out** |
| 100 ml | LE 1,850 | — | **sold out** |

**Scent profile**

- **Top notes:** Boozy accord with black currant
- **Heart notes:** Rich patchouli, dark woods, and oriental depth
- **Base notes:** Vanilla, amber warmth, and smooth woody accords

**Description (as published)**

> Absolute Drunk Persona A man who doesn’t follow the room… he owns it. Confident, charismatic, and unapologetically bold. The kind of presence that turns heads without trying. Nights, conversations, and moments seem to orbit around him. The Story Absolute Drunk captures the intoxicating atmosphere of luxury evenings and unforgettable encounters. Inspired by the richness of oriental perfumery, it opens with a warm boozy sensation that immediately feels deep and addictive. As the scent unfolds, rich patchouli and dark woods begin to dominate, creating a bold and mysterious character. In the dry down, smooth vanilla and warm amber and benzoin wrap the fragrance in a luxurious softness that …

**Customer voice**

- 5★ *Mohamed Bayomi* — “FANTASY”
- 5★ *Khaled medany* — “Amazing Powerful performance 👏”

**Gaps:** no tags — invisible to navigation · only 1 image — theme hover/variant switching inert · image alt text is null · **every variant sold out** — no back-in-stock capture

---

### 50. summer elegance
`summer-elegance`

| | |
|---|---|
| **Vendor** | Imagination LV · *⚠️ dupe reference — renders as brand on the PDP and in JSON-LD* |
| **Product type** | — not in capture |
| **Tags** | `Best Selling`, `Men` |
| **Published** | 2023-05-29 |
| **Option name** | `size` |
| **Reviews** | 5.0★ across 2 reviews |
| **Images** | 1 · **alt text missing** · `summer-elegance.jpg` |
| **Description** | format D: free prose, no labelled tiers · 241 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 100 ml | LE 2,150 | — | **sold out** |
| 50 ml | LE 1,250 | `0.00` junk | in stock |
| 30 ml | LE 850 | `0.00` junk | in stock |

**Scent profile** — ⚠️ no labelled tiers in `body_html`; notes exist only as prose.

**Description (as published)**

> Summer elegance Citrus, Fresh, Clean Elegant blend of citron, bergamot, orange, neroli, cinnamon based on ambroxan, woods, and chinese black tea. Calming, refreshing and inviting perfume will avoid you to smell like everyone else in Summer !

**Customer voice**

- 5★ *Daniel Salman* — “Great fragrance a must have for summer in my collection Longevity is amazing i get 10 hours on my skin”
- 5★ *عمرو على جلال الدين شاهين* — “It is a wonderful fresh summer fragrance”

**Gaps:** only 1 image — theme hover/variant switching inert · image alt text is null · notes not machine-readable · 1 variant(s) sold out · junk `0.00` compare-at

---

### 51. Vanilla 91
`vanilla-91`

| | |
|---|---|
| **Vendor** | Siwa Fragrances · *Siwa-owned* |
| **Product type** | — not in capture |
| **Tags** | **none — unreachable via tag-driven nav** |
| **Published** | 2026-05-16 |
| **Option name** | `size` |
| **Reviews** | 5.0★ across 2 reviews |
| **Images** | 2 · **alt text missing** · `C8C728AE-A095-4A70-A6C1-87DE3302578F.jpg`, `129BA2AA-F4DE-46A8-BD2E-DA03FFE389E2.png` |
| **Description** | format D: free prose, no labelled tiers · 222 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 125ML | LE 380 | `0.00` junk | in stock |

**Scent profile** — ⚠️ no labelled tiers in `body_html`; notes exist only as prose.

**Description (as published)**

> Vanilla 91 A long-lasting body splash enriched with vitamin E, b lending creamy vanilla, soft jasmine petals and glowing sandalwood for a warm, comforting fragrance that feels sweet, cozy, and effortlessly elegant. Limited

**Customer voice**

- 5★ *Anonymous* — “Love it so much”
- 5★ *Anonymous* — “بجد ريحتها تحفة و ثباتها قوي اوي بتقعد طول اليوم الكواليتي بتاعتهاخطيرةةة ♥️🔥🔥”

**Gaps:** no tags — invisible to navigation · image alt text is null · notes not machine-readable · junk `0.00` compare-at

---

### 52. Layering Apple
`layering-apple`

| | |
|---|---|
| **Vendor** | Eden Juicy Apple kayali · *⚠️ dupe reference — renders as brand on the PDP and in JSON-LD* |
| **Product type** | — not in capture |
| **Tags** | `Best Selling`, `Women` |
| **Published** | 2024-10-21 |
| **Option name** | `size` |
| **Reviews** | 5.0★ across 1 reviews |
| **Images** | 1 · **alt text missing** · `layering-apple.jpg` |
| **Description** | format C: name + accords + labelled notes · 204 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 50 ml | LE 650 | — | in stock |
| 30 ml | LE 450 | — | **sold out** |

**Scent profile**

- **Top notes:** Red Apple, Litchi, Black Currant
- **Heart notes:** Wild Berries, Raspberry Bloom, May Rose and Jasmine
- **Base notes:** Sugar, Musk, Vanilla

**Description (as published)**

> Layering Apple Floral Fruity Gourmand fragrance for women. Top notes: Red Apple, Litchi, Black Currant. Middle notes: Wild Berries, Raspberry Bloom, May Rose and Jasmine. Base notes: Sugar, Musk, Vanilla.

**Customer voice**

- 5★ *Habiba Tarek* — “it so sweet I love it”

**Gaps:** only 1 image — theme hover/variant switching inert · image alt text is null · 1 variant(s) sold out

---

### 53. Mango on woods
`mango-on-woods`

| | |
|---|---|
| **Vendor** | God of Fire Stéphane Humbert · *⚠️ dupe reference — renders as brand on the PDP and in JSON-LD* |
| **Product type** | — not in capture |
| **Tags** | `Men` |
| **Published** | 2023-10-06 |
| **Option name** | `size` |
| **Reviews** | 5.0★ across 1 reviews |
| **Images** | 1 · **alt text missing** · `mango-on-woods.jpg` |
| **Description** | format D: free prose, no labelled tiers · 272 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 100 ml | LE 1,800 | — | **sold out** |
| 50 ml | LE 1,000 | `0.00` junk | in stock |
| 30 ml | LE 700 | — | in stock |

**Scent profile** — ⚠️ no labelled tiers in `body_html`; notes exist only as prose.

**Description (as published)**

> Mango on woods Fruity, sweet, woody Tropical woody blend of mango, lemon, ginger, red berries enriched with woody notes & based on amber, musk and nagarmotha. Attractive woody scent has a realistic mango scent with a unique sweetness touch makes it ideal for all year use.

**Customer voice**

- 5★ *Anonymous* — “Fresh”

**Gaps:** only 1 image — theme hover/variant switching inert · image alt text is null · notes not machine-readable · 1 variant(s) sold out · junk `0.00` compare-at

---

### 54. Sweet Oud
`sweet-oud`

| | |
|---|---|
| **Vendor** | Oud Cadenza MC · *⚠️ dupe reference — renders as brand on the PDP and in JSON-LD* |
| **Product type** | — not in capture |
| **Tags** | `Best Selling`, `Men`, `new`, `Unisex`, `Women` |
| **Published** | 2025-03-23 |
| **Option name** | `size` |
| **Reviews** | 5.0★ across 1 reviews |
| **Images** | 2 · **alt text missing** · `sweet-oud-1.jpg`, `Sweet-Oud.jpg` |
| **Description** | format C: name + accords + labelled notes · 152 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 100 ml | LE 1,650 | `0.00` junk | **sold out** |
| 50 ml | LE 1,000 | `0.00` junk | **sold out** |
| 30 ml | LE 650 | `0.00` junk | **sold out** |

**Scent profile**

- **Top notes:** Saffron, cinnamon, cardamom
- **Heart notes:** Dates, caramel, oud, sugar
- **Base notes:** Vanilla, tonka, leather

**Description (as published)**

> Sweet Oud Gourmand woody oud blend . Top notes: Saffron, cinnamon, cardamom. Heart notes: Dates, caramel, oud, sugar Base notes: Vanilla, tonka, leather

**Customer voice**

- 5★ *farah yusri* — “i love it”

**Gaps:** image alt text is null · **every variant sold out** — no back-in-stock capture · junk `0.00` compare-at

---

### 55. Soiree
`soiree`

| | |
|---|---|
| **Vendor** | Grand Soir MFK · *⚠️ dupe reference — renders as brand on the PDP and in JSON-LD* |
| **Product type** | — not in capture |
| **Tags** | **none — unreachable via tag-driven nav** |
| **Published** | 2022-04-05 |
| **Option name** | `size` |
| **Reviews** | **no reviews** |
| **Images** | 1 · **alt text missing** · `CopyofWebsiteBottle_1.jpg` |
| **Description** | format E: minimal / boilerplate · 189 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 100 ml | LE 1,400 | `0.00` junk | in stock |
| 50 ml | LE 850 | `0.00` junk | in stock |
| 30 ml | LE 550 | `0.00` junk | in stock |

**Scent profile** — ⚠️ no labelled tiers in `body_html`; notes exist only as prose.

**Description (as published)**

> Soiree Warm amber fragrance. Velvety rich amber enriched with expensive vanilla extract, creamy tonka, labdanum with resin & woody touches. Dense smoky scent with leathery animalic nuances.

**Gaps:** no tags — invisible to navigation · only 1 image — theme hover/variant switching inert · image alt text is null · notes not machine-readable · junk `0.00` compare-at · no reviews

---

### 56. Sundaze
`sundaze`

| | |
|---|---|
| **Vendor** | Power Of You Giorgio Armani · *⚠️ dupe reference — renders as brand on the PDP and in JSON-LD* |
| **Product type** | — not in capture |
| **Tags** | **none — unreachable via tag-driven nav** |
| **Published** | 2026-07-25 |
| **Option name** | `Size` |
| **Reviews** | **no reviews** |
| **Images** | 1 · **alt text missing** · `IMG-6766.jpg` |
| **Description** | format A: THE VIBE + FRAGRANCE PROFILE · 769 chars |

**Variants**

| Size | Price | Compare-at | Stock |
|---|---:|---:|---|
| 30 ml | LE 500 | — | in stock |
| 50 ml | LE 700 | — | in stock |
| 100 ml | LE 1,100 | — | in stock |

**Scent profile**

- **Main accords:** Tropical Fruit • Creamy Solar Florals • Warm Bourbon Vanilla
- **Top notes:** Passionfruit, Bitter Orange & Lemon
- **Heart notes:** Frangipani & Solar Accords

**Description (as published)**

> THE VIBE A radiant, sunkissed gourmand that blends juicy passionfruit with creamy vanilla and warm amber. Sundaze radiates magnetic warmth invigorating at first spray, then settling into a rich, addictive skin trail. If you love Armani Power of You , this is your scent. FRAGRANCE PROFILE Main Accords: Tropical Fruit • Creamy Solar Florals • Warm Bourbon Vanilla Top: Passionfruit, Bitter Orange & Lemon Heart: Frangipani & Solar Accords Base: Madagascar Vanilla, Benzoin & Labdanum PERFORMANCE & WEAR Longevity: 7–8 Hours (Transforms from vibrant fruit into a long-lasting vanilla-amber base) Projection / Sillage: Moderate (Creates a radiant, noticeable halo without overpowering the room) Best …

**Gaps:** no tags — invisible to navigation · only 1 image — theme hover/variant switching inert · image alt text is null · no reviews

---
## 5. Appendix — product with social data but NO catalogue record

### Tobacco Vanilla  ▣ enriched

`tobacco-vanilla` — ⚠️ **not in the 56-product catalogue**

| | |
|---|---|
| **Status** | UNMATCHED |
| **Vendor / price / sizes / stock / reviews** | — no catalogue record exists |
| **Corroborates** | reference-analysis/_CORRECTIONS.md records a 356-review gap between the 1,176 shop-wide Judge.me count and the 820 attributable to published products, implying 27 or more unpublished/deleted products. Tobacco Vanilla is a concrete instance. |
| **Action required** | Confirm with the client whether Tobacco Vanilla is live, seasonal, discontinued, or pending relaunch, and supply its pricing, sizes and stock before it can be built as a template page. |

**Detail** — Tobacco Vanilla does NOT exist in the 56-product catalog captured 2026-07-27. No handle, no title, no vendor match. Two other products merely mention tobacco in their notes (male-elixir, carnal-trail) and are unrelated. The product is real - it is photographed with a finished production label - but it is either unpublished, discontinued, or created after the catalog capture. Both Instagram posts predate the capture (Jan/Feb 2026), so 'created later' is ruled out.

**Scent profile** — ⚠️ derived from caption copy, *not* catalogue data

- **Top:** smoky tobacco leaves, exotic spices
- **Heart:** creamy vanilla
- **Base:** velvety cacao

**Social creative** ▣

- **Palette:** `#C89A3C` autumn ochre · `#8C5A2B` rust leaf · `#D9A441` amber juice · `#3B2617` deep shadow brown · `#E8C98A` warm highlight
- **Voice:** The most literary of the four. Long sentences, sensory compounding, place-and-time imagery (fireside library, autumn nights). Closest to the Egyptian-scene brand voice in Skills/sorella-brand-voice-profile.md.
  - “Imagine wrapping yourself in the scent of a grand, fireside library where time slows.”
  - “It speaks of low amber light, and long autumn nights.”
- **2026-02-04** · 101 likes · 9+ comments · [DUWYHackb8X](https://www.instagram.com/p/DUWYHackb8X/)
  - Caption: “Imagine wrapping yourself in the scent of a grand, fireside library where time slows and every breath feels like an invitation. / Tobacco Vanilla, a deep tobacco-vanilla scent defined by warmth, stillness, and quiet intensity. /  / #siwafragrance”
  - Images: `tobacco-vanilla/DUWYHackb8X_1.jpg`
  - Comment — *ahmed_nasser_mohammed_anwar*: “موجوده؟” → 'is it available?' - corroborates the unpublished status
  - Comment — *mira_welliam*: “Hi wanna ask about the heavuer perfumes u have and what is the notes for it and hopfully u have smaller sizes” → notes + size discovery gap
- **2026-01-28** · 68 likes · 15 comments · [DUEWP1fCO4Q](https://www.instagram.com/p/DUEWP1fCO4Q/)
  - Caption: “Tobacco Vanilla unfolds with smoky tobacco leaves kissed by exotic spices, melting into clouds of creamy vanilla and velvety cacao. /  / It speaks of low amber light, and long autumn nights — a fragrance that doesn't just linger in the air, but”
  - Images: `tobacco-vanilla/DUEWP1fCO4Q_1.jpg`
  - Comment — *sohaila_203p*: “ب كام” → price
  - Comment — *geek_dyma*: “Price?” → price

**Gaps:** No product record at all. Cannot be priced, sized, added to cart, or reviewed. · 101 and 68 likes with 24+ comments, many asking price and availability - demonstrable demand against a product the store does not sell.

---

## 6. How to use this

- **`product-data.json`** is the machine-readable twin — same fields, same values, sorted by review volume. Feed that to implementation agents, not this markdown.

- **The template in §1 is the content model.** Fields marked as held for fewer than 56 products are exactly the migration backlog: `notes.top/heart/base` (18/56), `accords` (5/56), `tags` (39/56), image alt (0/56).

- **Nothing here is inferred.** The note parser was validated against `_CORRECTIONS.md` and reproduces its 18-product list exactly, plus every other headline figure (56 / 158 / 49 / 10 / 17 / 21 / 50 / 66 / 16-40 / 54 / 4).

- **`vendor` is not a brand** for 40 of 56 products. Any template that prints it as one repeats the live store's mistake.
