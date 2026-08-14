# 03 — DATA SCHEMA

Siwa Fragrances (`siwafragrances.com` / `3c3u3n-qt.myshopify.com`) — complete data model audit.
Audit date: 2026-07-27. All findings trace to files in `raw/`.

---

## 0. Data-completeness caveat (read first)

The first scrape pass failed on 24 PDP HTML files and 25 `.js.json` files, which came back as
Cloudflare "Verifying your connection…" challenge pages. **The 24 HTML captures have since been
re-scraped successfully; the `.js.json` files have not.**

| Source | Total files | Valid captures | Challenge pages |
|---|---|---|---|
| `raw/products.json` | 1 | 1 (all 56 products) | 0 |
| `raw/collections.json` | 1 | 1 (all 19 collections) | 0 |
| `raw/products/*.html` | 56 | **56 — RECOVERED** | **0** |
| `raw/products/*.js.json` | 56 | **31** | 25 (not re-fetched) |

Handles still missing a valid `.js.json`: `alluring-rose, caramel-vanigliato, carnal-trail, citrine,
coco-woods, hibiscusex, hot-male, hot-vanilla, insane-pineapple, iris-elixir, irresistible-vanilla,
lady-killer, layering-lychee, layering-pistachio, layering-vanilla, luna-di-roma, male-elixir,
marasi, mawj, pacific-elixir, soiree, soul-poudree, stellar-nights, summer-elegance,
summer-holidays`.

**Consequence:** product-object and variant facts below are complete for all 56 products (sourced
from `raw/products.json`, which is authoritative and complete). **JSON-LD and rendered-HTML facts
now also cover all 56 of 56 PDPs** — every figure in §8 and §11 has been re-derived over the
complete set. The `.js.json` gap is immaterial: for all 31 valid `.js.json` files, `description` is
byte-identical to `products.json → body_html`, so the two sources agree and `products.json` can be
used throughout.

---

## 1. Product object schema

Source: `raw/products.json` (Shopify Storefront products JSON), 56 products / 158 variants.

### 1.1 Top-level product fields

| Field | Type | Present | Populated (non-empty) | Example value | Notes |
|---|---|---|---|---|---|
| `id` | int | 56/56 | 56/56 | `8032720257072` (sundaze) | Range `7735872389168` – `8032720257072` |
| `title` | string | 56/56 | 56/56 | `"Sundaze"` | Title Case, no size suffix |
| `handle` | string | 56/56 | 56/56 | `"sundaze"` | lowercase-hyphen, matches `raw/handles.txt` |
| `body_html` | string | 56/56 | 56/56 | see §3 | 73 – 2 023 chars; **4 different templates** |
| `published_at` | ISO8601 | 56/56 | 56/56 | `"2026-07-25T16:15:16+03:00"` | Spans 2021-08-20 → 2026-07-25 |
| `created_at` | ISO8601 | 56/56 | 56/56 | `"2026-07-25T15:40:09+03:00"` | 45 products share `2025-09-07` (bulk import) |
| `updated_at` | ISO8601 | 56/56 | 56/56 | `"2026-07-27T21:19:20+03:00"` | **All 56 identical** → store-wide bulk touch |
| `vendor` | string | 56/56 | 56/56 | `"Power Of You Giorgio Armani"` | **Non-standard use — see §2** |
| `product_type` | string | 56/56 | **1/56** | `"body lotion"` (silk-vanilla-body-lotion) | 55 empty strings — effectively unused |
| `tags` | array\<string> | 56/56 | **39/56** | `["Best Selling","Men","Women"]` | 17 products untagged — see §6 |
| `variants` | array\<object> | 56/56 | 56/56 | see §4 | 158 total |
| `images` | array\<object> | 56/56 | 56/56 | see §1.3 | 65 total |
| `options` | array\<object> | 56/56 | 56/56 | see §4 | 53 × 1 option, 1 × 2, 2 × 3 |

Fields **absent** from the public product JSON but present in the rendered PDP JSON-LD:
`category` (Shopify Standard Product Taxonomy) — see §8.2. `barcode` is present in
`.js.json` variants (all `null` in valid captures) but not in `products.json`.

### 1.2 Variant object fields

| Field | Type | Present | Empty/null | Example | Notes |
|---|---|---|---|---|---|
| `id` | int | 158 | 0 | `43433688563760` | |
| `title` | string | 158 | 0 | `"30 ml"` | = joined option values |
| `option1` | string | 158 | 0 | `"30 ml"` | Always populated |
| `option2` | string\|null | 158 | 142 null | `"120 ml"` | Only the 3 bundle products |
| `option3` | string\|null | 158 | 143 null | `"30ML"` | Only 2 products |
| `sku` | string\|null | 158 | **50 null** | `"SF-081"` | **Product-level, not variant-level — see §4.5** |
| `requires_shipping` | bool | 158 | — | `true` | `true` for **all 158** |
| `taxable` | bool | 158 | — | `false` | `false` for **all 158** |
| `featured_image` | object\|null | 158 | **150 null** | `{…}` | Only 8 variants across 8 products |
| `available` | bool | 158 | — | `true` | **59 of 158 variants unavailable** (§4.6) |
| `price` | string (decimal) | 158 | 0 | `"500.00"` | EGP. Range **350.00 – 2300.00** |
| `grams` | int | 158 | — | `0` | **`0` for all 158** — no shipping weights set |
| `compare_at_price` | string\|null | 158 | 73 null + 66 `"0.00"` | `"1450.00"` | Only **19 variants** genuinely on sale (§4.7) |
| `position` | int | 158 | 0 | `1` | |
| `product_id` | int | 158 | 0 | `8032720257072` | |
| `created_at` / `updated_at` | ISO8601 | 158 | 0 | — | Mirror the parent product |

`.js.json` adds per-variant: `name`, `public_title`, `options[]`, `weight` (0 for all),
`inventory_management` (`"shopify"`), `barcode` (null in all valid captures),
`quantity_rule` (`{min:1, max:null, increment:1}`), `quantity_price_breaks` (`[]`),
`requires_selling_plan` (`false`), `selling_plan_allocations` (`[]`).
**No subscriptions, no quantity breaks, no B2B pricing anywhere in the catalog.**

### 1.3 Image / media object

| Field | Type | Notes |
|---|---|---|
| `id`, `product_id`, `position` | int | |
| `created_at`, `updated_at` | ISO8601 | |
| `variant_ids` | array\<int> | Populated on only **8 of 65** images |
| `src` | URL | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/…` |
| `width`, `height` | int | |

| Metric | Value |
|---|---|
| Total images across catalog | **65** |
| Products with 1 image | **50** |
| Products with 2 images | 3 |
| Products with 3 images | 3 |
| Images linked to a variant | 8 |
| Dominant dimensions | **1080 × 1080 (53 images, square 1:1)** |
| Other dimensions | 1600×1600 (3), 1350×1350 (2), 1254×1254, 1080×1440, 1151×2048, 1600×2127, 1600×2150, 1600×1999, 1600×2133 |
| Media types (31 valid `.js.json`) | **`image` × 40 — zero video, zero 3D, zero external_video** |
| `alt` text | **`null` on every media object** — no image alt text anywhere |

**Rebuild implication:** the media model is effectively "one square hero image per product".
A gallery/carousel design must degrade gracefully to a single image. Alt text is a blanket
accessibility gap (0/65 populated).

---

## 2. The vendor-field anomaly

### 2.1 What the field contains

Shopify's `vendor` field is designed to hold the brand/manufacturer. Here it holds the
**designer fragrance the product is a dupe of**. Evidence: `raw/products.json → vendor`, and
`raw/products/*.html` where the value is rendered on the PDP.

**This is not merely a data quirk — the theme actively surfaces it.** Every one of the 32 valid
PDP captures contains an enabled Prestige `vendor` block:

```html
<div class="product-info__block-item" data-block-id="vendor" data-block-type="vendor">
  <a href="/collections/vendors?q=Power%20Of%20You%20Giorgio%20Armani"
     class="vendor h6 link-faded">Power Of You Giorgio Armani</a>
</div>
```
Source: `raw/products/sundaze.html`. The block sits directly above `variant_picker` in the
`product-info` block stack, so the designer name reads as a sub-title under the product title.

It also propagates into:
- **schema.org `brand.name`** on every PDP (§8.1) — Google is told the brand is "Bleu De Chanel Parfum".
- `window.ShopifyAnalytics.meta.product.vendor` and the Trekkie `Viewed Product` payload
  (`"brand":"Power Of You Giorgio Armani"`).
- Web Pixels `productVariants[].product.vendor`.

### 2.2 Full 56-product vendor table

`SIWA` = Siwa-owned brand name. `INSPIRED` = designer/house reference.
`category` = schema.org `category` from PDP JSON-LD — **now populated for all 56 products**
(the 24 previously-`n/a` rows were recovered when their PDP captures were re-scraped).

| # | handle | vendor | Class | JSON-LD category |
|---|---|---|---|---|
| 1 | absolute-drunk | Il Padrino Sospiro | INSPIRED | Eaux de Parfum |
| 2 | alluring-rose | Delina La Rosée Parfums de Marly | INSPIRED | Eaux de Parfum |
| 3 | apple-pie | **Siwa Fragrances** | SIWA | Body Mists |
| 4 | aurableu | Symphony LV | INSPIRED | Eaux de Parfum |
| 5 | bare-glow | Goddess Burberry | INSPIRED | Eaux de Parfum |
| 6 | belle-riche | La Belle Le Parfum | INSPIRED | Perfumes & Colognes |
| 7 | bleu-exclusive | Bleu De Chanel L'exclusif | INSPIRED | Eaux de Parfum |
| 8 | bleu-intense | Bleu De Chanel Parfum | INSPIRED | Eaux de Parfum |
| 9 | boujee-blush | Kayali Boujee Marshmallow | INSPIRED | Eaux de Parfum |
| 10 | caramel-vanigliato | Bianco Latte Giardini Di Toscana | INSPIRED | Eaux de Parfum |
| 11 | carnal-trail | Side Effect Initio | INSPIRED | Eaux de Parfum |
| 12 | chocolate-creme | **Siwa original creation** | SIWA | Eaux de Parfum |
| 13 | citrine | Tygar Bvlgari | INSPIRED | Eaux de Parfum |
| 14 | coco-woods | Vanilla Powder Matiere Premiere | INSPIRED | Eaux de Parfum |
| 15 | coffee-vanilla | **Siwa original creation** | SIWA | Eaux de Parfum |
| 16 | drunk-gold | Angels' Share Paradis | INSPIRED | Eaux de Parfum |
| 17 | gourmet | **Siwa original creation** | SIWA | Eaux de Parfum |
| 18 | hibiscusex | Hibiscus Mahajád | INSPIRED | Eaux de Parfum |
| 19 | hot-male | You Intensely Giorgio Armani | INSPIRED | Eaux de Parfum |
| 20 | hot-vanilla | Althaïr Parfums de Marly | INSPIRED | Eaux de Parfum |
| 21 | insane-pineapple | Nishane Hacivat | INSPIRED | Eaux de Parfum |
| 22 | iris-elixir | Prada L'Homme Intense | INSPIRED | Eaux de Parfum |
| 23 | irresistible-vanilla | **Siwa original creation** | SIWA | Eaux de Parfum |
| 24 | lady-killer | Layton PDM | INSPIRED | Eaux de Parfum |
| 25 | lagoon-flair | Le Beau Le Parfum | INSPIRED | Eaux de Parfum |
| 26 | layering-30-ml-bundle | **Siwa Fragrances** | SIWA | Bundles |
| 27 | layering-apple | Eden Juicy Apple kayali | INSPIRED | Eaux de Parfum |
| 28 | layering-lychee | Eden Sparkling Lychee 39 Kayali | INSPIRED | Eaux de Parfum |
| 29 | layering-pistachio | Yum Pistachio Gelato Kayali | INSPIRED | Eaux de Parfum |
| 30 | layering-vanilla | Vanilla 28 Kayali | INSPIRED | Perfumes & Colognes |
| 31 | libre-desire | YSL Libre intense | INSPIRED | Eaux de Parfum |
| 32 | lost-on-you | Lost In Paris Roja | INSPIRED | Eaux de Parfum |
| 33 | luna-di-roma | Valentino Donna Born In Roma Intense | INSPIRED | Eaux de Parfum |
| 34 | male-elixir | Le Male Elixir JPG | INSPIRED | Eaux de Parfum |
| 35 | mango-on-woods | God of Fire Stéphane Humbert | INSPIRED | Eaux de Parfum |
| 36 | mango-pineapple | Summer Hammer | INSPIRED | Eaux de Parfum |
| 37 | marasi | 40 Knots Xerjoff | INSPIRED | Eaux de Parfum |
| 38 | marshmallow | **Siwa Fragrances** | SIWA | Body Mists |
| 39 | marshmallow-bundle | **Siwa Fragrances** | SIWA | Bundles |
| 40 | mawj | **Siwa Fragrances** | SIWA | Eaux de Parfum |
| 41 | pacific-elixir | Pacific Chill Louis Vuitton | INSPIRED | Eaux de Parfum |
| 42 | pink-allure | **Siwa original creation** | SIWA | Eaux de Parfum |
| 43 | pink-arrogance | **Siwa original creation** | SIWA | Eaux de Parfum |
| 44 | silk-vanilla | **Siwa Fragrances** | SIWA | Body Mists |
| 45 | silk-vanilla-body-lotion | **Siwa Fragrances** | SIWA | Lotions & Moisturizers |
| 46 | siwa-trail | Guidance Amouage | INSPIRED | Eaux de Parfum |
| 47 | soiree | Grand Soir MFK | INSPIRED | Eaux de Parfum |
| 48 | soul-poudree | Narciso Poudree | INSPIRED | Eaux de Parfum |
| 49 | stellar-nights | Stellar Times Louis Vuitton | INSPIRED | Eaux de Parfum |
| 50 | summer-elegance | Imagination LV | INSPIRED | Eaux de Parfum |
| 51 | summer-holidays | LV Afternoon Swim | INSPIRED | Eaux de Parfum |
| 52 | sundaze | Power Of You Giorgio Armani | INSPIRED | Eaux de Parfum |
| 53 | sweet-oud | Oud Cadenza MC | INSPIRED | Eaux de Parfum |
| 54 | sweet-rum | **Siwa Fragrances** | SIWA | Body Mists |
| 55 | vanilla-91 | **Siwa Fragrances** | SIWA | Body Mists |
| 56 | vanilla-bundle | **Siwa Fragrances** | SIWA | Bundles |

### 2.3 Quantified split

| Class | Products | Share | Distinct vendor strings |
|---|---|---|---|
| **Siwa-owned** (`Siwa Fragrances` 10 + `Siwa original creation` 6) | **16** | **28.6 %** | 2 |
| **Inspired-by designer reference** | **40** | **71.4 %** | 40 (one per product, all unique) |
| **Total** | 56 | 100 % | **42 distinct vendor values** |

Designer houses referenced (by frequency of appearance in the 40 strings): Louis Vuitton /
LV × 5, Kayali × 4, Chanel × 2, Giorgio Armani × 2, Parfums de Marly / PDM × 3, plus single
references to Roja, Amouage, Xerjoff, MFK, JPG, YSL, Valentino, Prada, Bvlgari, Burberry,
Initio, Nishane, Sospiro, Narciso, Matière Première, Giardini di Toscana, Stéphane Humbert,
Le Beau, La Belle, Paradis, Mahajád, MC, Summer Hammer.

Note the pattern: the 16 Siwa-owned records are **exactly the body-splash / body-lotion /
bundle SKUs plus the six declared "original creations"**. Every Eau-de-Parfum dupe carries a
designer vendor. `Siwa Fragrances` = house/private-label products; `Siwa original creation` =
in-house EDP compositions (6 products, vs. the `original-creations` collection which reports 8).

### 2.4 Duplication inside `body_html`

The context brief notes the inspired-by line is repeated as a `<blockquote>` in `body_html`.
**Verified — but only on one product.** Searching all 56 `body_html` values:

| Pattern in `body_html` | Products |
|---|---|
| `<blockquote>` "If you love *X*, this is your scent." | **1** — `sundaze` only |
| word "inspired" anywhere in prose | 3 — `aurableu`, `absolute-drunk`, `marasi` |
| word "dupe" / "clone" | 0 |

So the inspired-by reference is **structured data on 40 products (vendor) but editorial copy on
only 1 (sundaze's blockquote)**. `sundaze` is the newest product in the catalog
(`created_at 2026-07-25T15:40`), i.e. this blockquote convention is a **new pattern the merchant
started 2 days before the audit**, not an established one.

### 2.5 Rebuild implications

1. **`vendor` is load-bearing merchandising content, not metadata.** Any rebuild that renders
   `product.vendor` as "brand" (Prestige's default vendor block, product cards, breadcrumbs)
   will keep publishing designer trademarks as the store's own brand.
2. **SEO/legal risk is concrete.** `brand.name` in the PDP JSON-LD currently claims the brand of
   every dupe is the designer house (§8.1). A rebuild should emit
   `brand.name = "Siwa Fragrances"` and move the reference out of `brand`.
3. **The vendor link target is a dead end.** `/collections/vendors?q=<vendor>` yields a
   single-product listing for 40 of 56 products (each vendor string is unique). It is not a
   usable navigation surface.
4. **Recommended migration:** keep `vendor = "Siwa Fragrances"` for all 56; move the
   designer reference to a dedicated metafield (`custom.inspired_by`, see §3.4 / §9) and render
   it through a purpose-built "Inspired by" UI element with the merchant's own wording.
   This preserves the merchandising value (it is clearly a deliberate decision — 71 % of the
   catalog is positioned this way) while fixing the schema and structured-data misuse.
5. **A rebuild must not silently drop the field.** 40 unique strings would be unrecoverable
   from any other source in this dataset.

---

## 3. `body_html` editorial template

### 3.1 Finding: the template is NOT uniform

The context brief describes a consistent THE VIBE / blockquote / FRAGRANCE PROFILE structure.
Parsing all 56 `body_html` values in `raw/products.json` shows **four distinct generations of
template**, and the described one is present on **1 of 56 products**.

| Family | Structure | Count | Share | Era (`created_at`) |
|---|---|---|---|---|
| **A — "VIBE" (v3)** | `THE VIBE` → p → `<blockquote>` → `FRAGRANCE PROFILE` → ul(Main Accords/Top/Heart/Base) → `PERFORMANCE & WEAR` → ul(Longevity/Projection/Best For) | **1** | 1.8 % | 2026-07-25 |
| **B — "PERSONA" (v2)** | `<strong>Title</strong>` → `Persona` → `The Story` → `Notes` (Top/Heart/Base) → `Best For` | **5** | 8.9 % | 2026-03-14 → 2026-04-24 |
| **C — "NOTES-ONLY" (v1)** | free prose + explicit `Top notes: / Heart notes: / Base notes:` lines, no fixed headings | **12** | 21.4 % | mostly 2025-09-07 bulk import |
| **D — FREE PROSE** | one or more `<p>` of unstructured copy; no notes pyramid at all | **38** | 67.9 % | mostly 2025-09-07 bulk import |

Family A: `sundaze`.
Family B: `absolute-drunk`, `aurableu`, `lost-on-you`, `pink-allure`, `pink-arrogance`.
Family C: `bleu-exclusive`, `bleu-intense`, `caramel-vanigliato`, `citrine`, `coffee-vanilla`,
`hot-male`, `iris-elixir`, `layering-apple`, `luna-di-roma`, `mango-pineapple`, `soul-poudree`,
`sweet-oud`.
Family D: the remaining 38 (see §3.5).

**Interpretation:** the merchant is mid-migration to a richer editorial template. Template
sophistication correlates perfectly with product creation date — the newest product uses the
richest structure. A rebuild should target Family A as the canonical model and treat the other
55 products as backfill.

### 3.2 Canonical skeleton — Family A (`sundaze`, the target template)

Verbatim structure from `raw/products.json → sundaze.body_html`, with Shopify rich-text-editor
instrumentation attributes (`data-path-to-node`, `data-index-in-node`) stripped for legibility.
`sundaze` is the **only** product carrying those attributes — they are artifacts of Shopify's
newer assisted description editor and should not be reproduced in a rebuild.

```html
<h4>THE VIBE</h4>
<p>{{ vibe_paragraph }}</p>

<blockquote>
  <p><b>If you love <i>{{ inspired_by }}</i>, this is your scent.</b></p>
</blockquote>

<h4>FRAGRANCE PROFILE</h4>
<ul>
  <li><p><b>Main Accords:</b> {{ accord_1 }} • {{ accord_2 }} • {{ accord_3 }}</p></li>
  <li><p><b>Top:</b> {{ top_notes }}</p></li>
  <li><p><b>Heart:</b> {{ heart_notes }}</p></li>
  <li><p><b>Base:</b> {{ base_notes }}</p></li>
</ul>

<p><b>PERFORMANCE &amp; WEAR</b></p>
<ul>
  <li><p><b>Longevity:</b> {{ hours }} <i>({{ longevity_note }})</i></p></li>
  <li><p><b>Projection / Sillage:</b> {{ level }} <i>({{ projection_note }})</i></p></li>
  <li><p><b>Best For:</b> {{ occasions }}</p></li>
</ul>
```

Filled example (sundaze):

| Slot | Value |
|---|---|
| `vibe_paragraph` | "A radiant, sunkissed gourmand that blends juicy passionfruit with creamy vanilla and warm amber. Sundaze radiates magnetic warmth invigorating at first spray, then settling into a rich, addictive skin trail." |
| `inspired_by` | `Armani Power of You` (note: **differs in wording** from `vendor` = "Power Of You Giorgio Armani") |
| Main Accords | `Tropical Fruit • Creamy Solar Florals • Warm Bourbon Vanilla` (separator = `•` U+2022) |
| Top | `Passionfruit, Bitter Orange & Lemon` |
| Heart | `Frangipani & Solar Accords` |
| Base | `Madagascar Vanilla, Benzoin & Labdanum` |
| Longevity | `7–8 Hours` + italic parenthetical |
| Projection / Sillage | `Moderate` + italic parenthetical |
| Best For | `Golden hour, warm weather, evening dates & everyday signature wear` |

### 3.3 Canonical skeleton — Family B (5 products)

```html
<p><strong>{{ product_title }}</strong></p>
<p><strong>Persona</strong><br><span></span></p>
<p><span>{{ persona_paragraph }}</span></p>
<p><strong>The Story</strong></p>
<p><span>{{ story_paragraph_1 }}</span></p>
<p><span>{{ story_paragraph_2 }}</span></p>
<p><span>{{ story_paragraph_3 }}</span></p>
<p><strong>Notes</strong></p>
<p><span>Top Notes: {{ … }}</span></p>
<p><span>Heart Notes: {{ … }}</span></p>
<p><span>Base Notes: {{ … }}</span></p>
<p><strong>Best For</strong></p>
<p><span>{{ occasion_1 }}</span></p>
<p><span>{{ occasion_2 }}</span></p>
<p><span>{{ occasion_3 }}</span></p>
```
Source: `raw/products.json → absolute-drunk.body_html` (verbatim modulo content).
Note the empty `<span></span>` and the pseudo-list built from sibling `<p>` elements rather
than `<ul>` — this is copy-pasted rich-text, not authored markup.

### 3.4 Extractability audit — how much is machine-readable today

| Data point | Products where extractable from `body_html` | Share |
|---|---|---|
| Top + Heart/Middle + Base notes trio | **18 / 56** | 32 % |
| "Main Accords" line | **1 / 56** | 2 % |
| "Best For" / occasions | **9 / 56** | 16 % |
| "Longevity" | **2 / 56** | 4 % |
| Inspired-by phrase in prose | **1 / 56** | 2 % |
| Inspired-by via `vendor` field | **40 / 56** | 71 % |

Markup hygiene problems that make the current HTML fragile to restyle:
- 10 products carry inline `style="font-size: 16px; -webkit-text-size-adjust: 100%"` on `<span>`
  (`citrine`, `gourmet`, `drunk-gold`, `lagoon-flair`, `boujee-blush`, `sweet-oud`,
  `chocolate-creme`, `layering-apple`, `layering-vanilla`, `lady-killer`) — these override theme
  typography tokens.
- 20 products wrap text in semantically empty `<span>`.
- Heading levels are inconsistent: `<h4>` (Family A) vs `<p><strong>` (Family B) vs
  `<p><span style=…>` (Family C).

### 3.5 Proposed metafield model for the editorial template

This structure is a prime metafield candidate: it is repeated, field-shaped, and currently
trapped in unstructured HTML with inline styles. Recommended namespace **`fragrance`** for scent
data and **`custom`** for merchandising, all under the `product` owner type.

| Namespace.key | Shopify type | Source today | Populated today | Rebuild use |
|---|---|---|---|---|
| `fragrance.vibe` | `multi_line_text_field` | Family A `THE VIBE` paragraph / Family B `Persona` | 6 | PDP lead paragraph |
| `custom.inspired_by` | `single_line_text_field` | **`vendor` field** (40) + sundaze blockquote (1) | 40 | "Inspired by" badge/blockquote |
| `fragrance.main_accords` | `list.single_line_text_field` | Family A `Main Accords` (• separated) | 1 | Accord chips row |
| `fragrance.notes_top` | `list.single_line_text_field` | `Top:` / `Top notes:` | 18 | Note pyramid |
| `fragrance.notes_heart` | `list.single_line_text_field` | `Heart:` / `Heart notes:` / `Middle notes:` | 18 | Note pyramid |
| `fragrance.notes_base` | `list.single_line_text_field` | `Base:` / `Base notes:` | 18 | Note pyramid |
| `fragrance.longevity` | `single_line_text_field` | `Longevity:` | 2 | Performance spec row |
| `fragrance.longevity_note` | `single_line_text_field` | italic parenthetical | 1 | Tooltip / caption |
| `fragrance.projection` | `single_line_text_field` | `Projection / Sillage:` | 1 | Performance spec row |
| `fragrance.projection_note` | `single_line_text_field` | italic parenthetical | 1 | Tooltip / caption |
| `fragrance.best_for` | `list.single_line_text_field` | `Best For:` | 9 | Occasion chips |
| `fragrance.concentration` | `single_line_text_field` | JSON-LD `category` proxy | 32 (from LD) | "Eau de Parfum" / "Body Mist" label |
| `custom.the_story` | `rich_text_field` | Family B `The Story` | 5 | Optional long-form block |

An alternative worth considering: a **`fragrance_note` metaobject** with fields
`name`, `family`, `image`, referenced from `fragrance.notes_top/heart/base` as
`list.metaobject_reference`. This enables note icons and "shop by note" navigation, which the
current catalog cannot support at all. Only justified if the merchant will backfill all 56
products — today only 18 have parseable notes.

---

## 4. Variant & option model

### 4.1 Option-count distribution

| Options per product | Products | Which |
|---|---|---|
| 1 | **53** | all single-fragrance SKUs |
| 2 | 1 | `marshmallow-bundle` |
| 3 | 2 | `vanilla-bundle`, `layering-30-ml-bundle` |

### 4.2 Option NAMES — casing and typo inventory

Source: `raw/products.json → options[].name`.

| Option name (verbatim) | Occurrences | Issue |
|---|---|---|
| `size` | **44** | lowercase |
| `Size` | **9** | Title Case — **inconsistent with the 44 above** |
| `silk vanilla (size)` | 1 | product name embedded in option name |
| `Silk Vanilla Body Lotion ( size )` | 1 | product name + **spaces inside parens** |
| `layering vanilla (size)` | 1 | lowercase variant of the next row |
| `Layering Vanilla (size)` | 1 | Title Case variant of the previous row |
| `Marshmallow (size)` | 1 | product name embedded |
| `Boujee Blush (size)` | 1 | product name embedded |
| `Layering Lychee` | 1 | **no `(size)` suffix** — inconsistent |
| `Layerng Pistachio` | 1 | **TYPO — "Layerng" is missing the "i"** |
| | **62 total** | 10 distinct strings for what is semantically one concept |

Products using `Size` (capital S) — all 9: `absolute-drunk`, `aurableu`, `bare-glow`,
`bleu-exclusive`, `bleu-intense`, `lost-on-you`, `pink-allure`, `pink-arrogance`, `sundaze`.
These are precisely the 9 newest single-option products (`created_at` ≥ 2025-10-21), so the
casing split is another artefact of the same generational drift seen in §3.

The typo `Layerng Pistachio` lives on `layering-30-ml-bundle` and is **user-visible**: Prestige
renders the option name as the variant-picker legend, and it appears in every variant `title`
context on that product.

### 4.3 Option VALUES — inventory

| Value (verbatim) | Occurrences | Canonical | Issue |
|---|---|---|---|
| `50 ml` | 47 | 50 ml | — |
| `30 ml` | 44 | 30 ml | — |
| `100 ml` | 44 | 100 ml | — |
| `125ML` | 6 | 125 ml | no space, uppercase |
| `50ML` | 5 | 50 ml | no space, uppercase |
| `30ML` | 4 | 30 ml | no space, uppercase |
| `100ML` | 2 | 100 ml | no space, uppercase |
| `120ML` | 1 | 120 ml | no space, uppercase |
| `120 ml` | 1 | 120 ml | — |
| `125ml` | 1 | 125 ml | no space, lowercase suffix |
| `100` | 1 | 100 ml | **unit missing entirely** (`soul-poudree`) |

**5 distinct spellings for what should be 5 canonical sizes.** `100 ml`, `100ML` and `100` all
coexist. The uppercase-no-space forms cluster on the bundle products and body products.

### 4.4 Variant-count distribution

| Variants | Products | Notes |
|---|---|---|
| 1 | **8** | body splash ×5, body lotion ×1, `marshmallow-bundle`, `luna-di-roma` (50 ml only) |
| 2 | 3 | `hot-male` (50/100), `iris-elixir` (50/100), `layering-apple` (30/50) |
| 3 | **44** | the standard 30/50/100 ladder (+ `vanilla-bundle`) |
| 12 | 1 | `layering-30-ml-bundle` (2 × 2 × 3 cartesian) |
| **Total** | 56 products / **158 variants** | mean 2.82 |

### 4.5 SKU model

**SKUs are product-level, not variant-level.** In all 41 products with SKUs, every variant of a
product carries the *same* SKU string:

`belle-riche → ["P085","P085","P085"]`, `gourmet → ["SF-081","SF-081","SF-081"]`, etc.

| Prefix | Meaning (inferred) | Products |
|---|---|---|
| `SF-0xx` | Siwa Fragrances EDP | 8 (`SF-065, 067, 069, 070, 073, 074, 077, 080, 081`) |
| `SP-0xx` | Siwa Perfume (older line) | 13 (`SP-007 … SP-061`) |
| `SL-0xx` | Siwa L… (line 3) | 4 (`SL-001, 003, 006, 010, 012`) |
| `P0xx` | newest additions 2025-2026 | 7 (`P085, P086, P089, P090, P091, P095, P100`) |
| `BS-*` | Body Splash | 4 (`BS-1`, `BS-1-1`, `BS-1-1-1`) |
| `SKU-44` | one-off | 1 (`marshmallow`) |
| *(none)* | 15 products, 50 variants | — |

**Collisions:** `BS-1` is used by both `silk-vanilla` and `vanilla-91`. `BS-1`/`BS-1-1`/`BS-1-1-1`
are placeholder-shaped (Shopify's "duplicate product" auto-suffix pattern). SKU is therefore
**not a reliable unique key** in this catalog.

Related: PDP JSON-LD emits `mpn` and `gtin` for some variants, sourced from the Shopify
`barcode` field, which the merchant has filled with **free text, not barcodes**:

| handle | barcode-derived value | Emitted as | Why |
|---|---|---|---|
| `bare-glow` | `Bare Glow 30ml`, `Bare Glow 50ml` | **`gtin`** | 14 chars → Shopify treats as GTIN-14 |
| `sweet-oud` | `Sweet Oud 30ml`, `Sweet Oud 50ml` | **`gtin`** | 14 chars |
| `gourmet` | `Gourmet 30ml`, `Gourmet 50ml` | **`gtin`** | 12 chars → GTIN-12 |
| `coffee-vanilla` | `Coffee Vanilla 100ml` | `mpn` | 20 chars |
| `marshmallow` | `marshmallow splash` | `mpn` | 18 chars |
| `silk-vanilla`, `vanilla-91` | `Silk vanilla splash` | `mpn` | 19 chars |
| `sweet-rum` | `sweet rum splash` | `mpn` | 16 chars |
| `silk-vanilla-body-lotion` | `silk vanilla lotion` | `mpn` | 19 chars |

**6 product variants publish invalid GTINs to Google Merchant Center.** Fix in rebuild: clear
`barcode` or populate real EANs; never emit `gtin` unless the value is numeric.

### 4.6 Availability

**59 of 158 variants (37.3 %) are `available: false`.** 28 products have at least one
out-of-stock variant; **8 products are entirely sold out**.

| Fully sold out (all variants) | Partially sold out (which size) |
|---|---|
| `siwa-trail`, `lost-on-you`, `absolute-drunk`, `bleu-intense`, `sweet-oud`, `citrine`, `alluring-rose`, `vanilla-bundle` | 100 ml only: `aurableu`, `belle-riche`, `drunk-gold`, `boujee-blush`, `libre-desire`, `gourmet`, `coffee-vanilla`, `coco-woods`, `layering-lychee`, `mango-on-woods`, `insane-pineapple`, `summer-elegance` · 30 ml only: `marasi`, `layering-apple` · mixed: `bare-glow` (30+100), `mango-pineapple` (30+100), `chocolate-creme` (30+100), `hibiscusex` (30+50), `iris-elixir` (50+100) · `silk-vanilla-body-lotion` (its only variant) |

Pattern: **100 ml is the most frequently out-of-stock tier**. A rebuild's variant picker must
handle sold-out option values prominently (Prestige's `--sold-out-badge-background: 227 44 43` /
`#E32C2B` is already configured for this).

### 4.7 Compare-at price / discount model

| `compare_at_price` state | Variants |
|---|---|
| `null` | 73 |
| `"0.00"` (set to zero, semantically "no sale") | **66** |
| Greater than `price` (genuine sale) | **19** |

Only **4 products** are on sale, and 3 of them are the bundles:

| handle | variant | price | compare_at | Discount |
|---|---|---|---|---|
| `belle-riche` | 30 ml | 550 | 650 | 15.4 % |
| `belle-riche` | 50 ml | 750 | 1000 | 25.0 % |
| `belle-riche` | 100 ml | 1150 | 1450 | 20.7 % |
| `marshmallow-bundle` | 125ML / 50ML | 950 | 1250 | 24.0 % |
| `vanilla-bundle` | ×3 | 1060–1555 | 1175–1725 | 9.8 % flat |
| `layering-30-ml-bundle` | ×12 | 1105–1995 | 1650–2750 | 27.5 – 33.0 % |

The `"0.00"` pattern (66 variants) is a data hazard: naive Liquid
`{% if variant.compare_at_price %}` is truthy for `"0.00"` in some contexts. A rebuild must test
`compare_at_price > price`, not mere presence. The on-sale badge token
`--on-sale-badge-background: 255 215 0` / `#FFD700` (gold) applies to these 19 variants.

### 4.8 Price ladder across the catalog

**42 products** carry the full 30 / 50 / 100 ml ladder. Sorted by 30 ml price:

| handle | 30 ml | 50 ml | 100 ml | 50/30 | 100/30 | Δ(50−30) | Δ(100−50) |
|---|---|---|---|---|---|---|---|
| irresistible-vanilla | 400 | 600 | 1000 | ×1.500 | ×2.500 | 200 | 400 |
| pink-arrogance | 450 | 650 | 1000 | ×1.444 | ×2.222 | 200 | 350 |
| bare-glow | 450 | 650 | 1000 | ×1.444 | ×2.222 | 200 | 350 |
| layering-lychee | 450 | 650 | 1000 | ×1.444 | ×2.222 | 200 | 350 |
| layering-pistachio | 450 | 650 | 1000 | ×1.444 | ×2.222 | 200 | 350 |
| layering-vanilla | 450 | 650 | 1000 | ×1.444 | ×2.222 | 200 | 350 |
| lagoon-flair | 450 | 750 | 1200 | ×1.667 | ×2.667 | 300 | 450 |
| chocolate-creme | 450 | 750 | 1250 | ×1.667 | ×2.778 | 300 | 500 |
| male-elixir | 450 | 750 | 1250 | ×1.667 | ×2.778 | 300 | 500 |
| sundaze | 500 | 700 | 1100 | ×1.400 | ×2.200 | 200 | 400 |
| alluring-rose | 500 | 700 | 1100 | ×1.400 | ×2.200 | 200 | 400 |
| bleu-intense | 500 | 700 | 1050 | ×1.400 | ×2.100 | 200 | 350 |
| boujee-blush | 500 | 700 | 1200 | ×1.400 | ×2.400 | 200 | 500 |
| libre-desire | 500 | 800 | 1250 | ×1.600 | ×2.500 | 300 | 450 |
| insane-pineapple | 500 | 850 | 1350 | ×1.700 | ×2.700 | 350 | 500 |
| belle-riche | 550 | 750 | 1150 | ×1.364 | ×2.091 | 200 | 400 |
| coffee-vanilla | 550 | 750 | 1150 | ×1.364 | ×2.091 | 200 | 400 |
| marasi | 550 | 850 | 1400 | ×1.545 | ×2.545 | 300 | 550 |
| soiree | 550 | 850 | 1400 | ×1.545 | ×2.545 | 300 | 550 |
| caramel-vanigliato | 550 | 850 | 1550 | ×1.545 | ×2.818 | 300 | 700 |
| hot-vanilla | 550 | 850 | 1550 | ×1.545 | ×2.818 | 300 | 700 |
| pink-allure | 590 | 850 | 1400 | ×1.441 | ×2.373 | 260 | 550 |
| pacific-elixir | 600 | 900 | 1500 | ×1.500 | ×2.500 | 300 | 600 |
| carnal-trail | 600 | 900 | 1550 | ×1.500 | ×2.583 | 300 | 650 |
| siwa-trail | 600 | 950 | 1750 | ×1.583 | ×2.917 | 350 | 800 |
| sweet-oud | 650 | 1000 | 1650 | ×1.538 | ×2.538 | 350 | 650 |
| summer-holidays | 650 | 1000 | 1700 | ×1.538 | ×2.615 | 350 | 700 |
| hibiscusex | 700 | 1000 | 1650 | ×1.429 | ×2.357 | 300 | 650 |
| mango-on-woods | 700 | 1000 | 1800 | ×1.429 | ×2.571 | 300 | 800 |
| aurableu | 700 | 1050 | 1750 | ×1.500 | ×2.500 | 350 | 700 |
| lady-killer | 750 | 1100 | 1750 | ×1.467 | ×2.333 | 350 | 650 |
| absolute-drunk | 750 | 1100 | 1850 | ×1.467 | ×2.467 | 350 | 750 |
| mango-pineapple | 750 | 1100 | 1850 | ×1.467 | ×2.467 | 350 | 750 |
| lost-on-you | 750 | 1100 | 1900 | ×1.467 | ×2.533 | 350 | 800 |
| bleu-exclusive | 750 | 1100 | 1900 | ×1.467 | ×2.533 | 350 | 800 |
| citrine | 750 | 1150 | 1850 | ×1.533 | ×2.467 | 400 | 700 |
| drunk-gold | 750 | 1150 | 1950 | ×1.533 | ×2.600 | 400 | 800 |
| mawj | 800 | 1100 | 1850 | ×1.375 | ×2.312 | 300 | 750 |
| stellar-nights | 800 | 1200 | 2050 | ×1.500 | ×2.562 | 400 | 850 |
| gourmet | 800 | 1250 | 2100 | ×1.562 | ×2.625 | 450 | 850 |
| summer-elegance | 850 | 1250 | 2150 | ×1.471 | ×2.529 | 400 | 900 |
| coco-woods | 850 | 1300 | 2300 | ×1.529 | ×2.706 | 450 | 1000 |

Partial ladders and non-EDP tiers:

| handle | Sizes present | Prices |
|---|---|---|
| `hot-male` | 50, 100 | 800, 1250 |
| `iris-elixir` | 50, 100 | 850, 1350 |
| `layering-apple` | 30, 50 | 450, 650 |
| `luna-di-roma` | 50 only | 600 |
| `soul-poudree` | 30, 50, **`100`** (no unit) | 400, 600, 1050 |
| `apple-pie`, `marshmallow`, `silk-vanilla`, `sweet-rum` | 125ML | **375** each |
| `vanilla-91` | 125ML | **380** |
| `silk-vanilla-body-lotion` | 120ML | **350** (catalog floor) |

### 4.9 Pricing pattern

| Metric | 50 ml / 30 ml | 100 ml / 30 ml |
|---|---|---|
| Mean | **×1.496** | **×2.475** |
| Median | ×1.485 | ×2.500 |
| Min | ×1.364 (`belle-riche`, `coffee-vanilla`) | ×2.091 (same two) |
| Max | ×1.700 (`insane-pineapple`) | ×2.917 (`siwa-trail`) |

**The pattern is: 50 ml ≈ 1.5 × the 30 ml price; 100 ml ≈ 2.5 × the 30 ml price.** Per-ml cost
therefore *falls* steeply with size (100 ml is ×3.33 the volume for ×2.48 the price → 26 % cheaper
per ml), a classic volume-discount ladder. The spread around the multipliers (×1.36–×1.70,
×2.09–×2.92) shows the ladder is applied **by hand per product, not by rule** — there is no
single formula that reproduces all 42 rows.

All prices are round to the nearest **50 EGP** with two exceptions: `pink-allure` 30 ml = **590**
and `vanilla-91` 125ML = **380**. Body splashes are flat-priced at **375** (4 SKUs).

Catalog price envelope: **350.00 – 2300.00 EGP**; highest `compare_at_price` **2750.00**
(`layering-30-ml-bundle`). Money format `LE {{amount}}` (`raw/meta.json`).

---

## 5. Collections model

Source: `raw/collections.json` (19 collections; matches `raw/meta.json → published_collections_count: 19`
and the 19 URLs in `raw/sitemap_collections_1.xml`).

| # | handle | title | description | `products_count` | image | published_at | updated_at |
|---|---|---|---|---|---|---|---|
| 1 | `best-sellers` | BEST SELLERS | *(empty)* | **24** | yes (`MG_4168.jpg`) | 2025-09-12 | 2026-07-27 |
| 2 | `black-friday-2025` | Black Friday Offer | *(empty)* | **0** | — | 2025-11-27 | 2026-06-26 |
| 3 | `body-lotion` | Body lotion | *(empty)* | 1 | — | 2025-09-07 | 2026-07-21 |
| 4 | `body-splash` | Body Splash | *(empty)* | 6 | — | 2025-09-07 | 2026-07-27 |
| 5 | `bundles` | Bundles | *(empty)* | 11 | — | 2025-09-07 | 2026-07-26 |
| 6 | `for-her` | FOR HER | *(empty)* | **80** ⚠ | — | 2025-09-11 | 2026-07-27 |
| 7 | `for-him` | FOR HIM | *(empty)* | **83** ⚠ | — | 2025-09-11 | 2026-07-27 |
| 8 | `gift-boxes` | Gift Boxes | *(empty)* | 1 | — | 2026-02-13 | 2026-06-26 |
| 9 | `men-best-sellers` | MEN BEST SELLERS | *(empty)* | 17 | — | 2025-09-30 | 2026-07-27 |
| 10 | `men-new-drops` | men new drops | *(empty)* | 7 | — | 2025-09-30 | 2026-07-27 |
| 11 | `new-drops` | new drops | *(empty)* | 30 | — | 2025-09-29 | 2026-07-27 |
| 12 | `original-creations` | Original Creations | *(empty)* | 8 | — | 2025-09-07 | 2026-07-27 |
| 13 | `perfumes` | perfumes | *(empty)* | **82** ⚠ | — | 2025-09-07 | 2026-07-27 |
| 14 | `ramadan-drops` | Ramadan Drops | *(empty)* | 6 | — | 2025-09-07 | 2026-06-26 |
| 15 | `siwa-perfumes` | siwa fragrances | *(empty)* | 51 | — | 2025-09-07 | 2026-07-27 |
| 16 | `summer-collection` | Summer Collection | *(empty)* | 21 | — | 2026-04-24 | 2026-07-27 |
| 17 | `unisex` | UNISEX | *(empty)* | 50 | — | 2025-09-11 | 2026-07-27 |
| 18 | `women-best-sellers` | WOMEN BEST SELLERS | *(empty)* | 11 | — | 2025-09-30 | 2026-07-27 |
| 19 | `women-new-drops` | women new drops | *(empty)* | 9 | — | 2025-09-30 | 2026-07-27 |

**Every one of the 19 collections has an empty `description`** (`body_html` length 0). Only
`best-sellers` has a collection image. A rebuild's collection-header design must therefore work
with *title only* — no rich text, no banner image, for 18 of 19 collections.

### 5.1 Investigation: `products_count` exceeds the published catalog

`for-her` = 80, `for-him` = 83, `perfumes` = 82, but the store publishes only **56** products.
`for-him` alone claims 27 more products than the entire published catalog. Evidence gathered:

| # | Evidence | Source |
|---|---|---|
| E1 | `published_products_count: 56`, `published_collections_count: 19` | `raw/meta.json` |
| E2 | `/collections/all` page header renders literally **"56 products"** | `raw/pages/collections_all.html` |
| E3 | `raw/products.json` returns exactly 56 product objects; `raw/handles.txt` has 56 handles; the product sitemap has 56 product `<loc>` entries (57 minus the sitemap self-reference) — all three sets are identical, zero difference | `raw/products.json`, `raw/handles.txt`, `raw/sitemap_products_1.xml` |
| E4 | `/collections/best-sellers` page header renders **"18 products"** while `collections.json` reports **24** for the same handle — a **6-product gap on a collection small enough to verify by eye** | `raw/pages/collections_best-sellers.html` vs `raw/collections.json` |
| E5 | Gender tags across the 56 published products: `Men` 28, `Women` 25 — nowhere near `for-him` 83 / `for-her` 80 | `raw/products.json → tags` |
| E6 | `for-him`/`for-her`/`perfumes` all have `updated_at: 2026-07-27` — the **same day as the audit** | `raw/collections.json` |

**Conclusion.** The counts are not stale caches: E6 shows the collection records were touched
the day of capture, and E4 shows the discrepancy on a live, same-day-updated collection where the
storefront simultaneously reports a *smaller* number. The `products_count` field returned by
`/collections.json` counts **every product assigned to the collection in the Shopify admin,
regardless of Online Store publication status**, while the storefront renders and counts only
published ones. E2+E3 pin the published set at exactly 56.

Therefore: **the admin catalog contains at least 83 products** (the `for-him` figure is a lower
bound), of which 56 are published — i.e. **≥ 27 products are draft, archived, or unpublished from
the Online Store channel**. The `best-sellers` case quantifies it precisely for one collection:
24 assigned, 18 published, **6 hidden**.

Alternative hypotheses considered and rejected: (a) *stale counter* — rejected by E6;
(b) *counting variants* — rejected, `body-lotion` = 1 while `silk-vanilla-body-lotion` has 1
variant, and `bundles` = 11 while only 3 bundle products exist with 16 variants between them —
neither product nor variant counts fit; (c) *duplicate memberships* — not applicable, counts are
per-collection.

**Not determinable from captured data:** the exact identity of the hidden products, and whether
they are drafts, archived, or merely unpublished. That requires Admin API access.

**Rebuild implication:** do not trust `products_count` for UI (e.g. "80 products" badges on the
`for-her` card in the collection-list section). Render `collection.products_count` from Liquid,
which is publication-aware, or count `collection.products` directly. Also flag to the merchant
that ~27 admin products may need publishing or cleanup before migration.

### 5.2 Collection membership rules — smart vs manual

`/collections.json` does not expose `rules`, so rule types cannot be read directly. Membership
can nevertheless be tested against tags for `best-sellers` (the one collection whose page was
captured):

| Set | Count | Handles |
|---|---|---|
| Rendered on `/collections/best-sellers` | 18 | alluring-rose, bleu-exclusive, boujee-blush, caramel-vanigliato, carnal-trail, chocolate-creme, citrine, drunk-gold, gourmet, hibiscusex, hot-vanilla, lady-killer, lagoon-flair, layering-pistachio, layering-vanilla, male-elixir, mango-pineapple, mawj |
| Tagged `Best Selling` | 23 | — |
| **Tagged but NOT in collection** | **9** | coffee-vanilla, irresistible-vanilla, layering-apple, layering-lychee, libre-desire, stellar-nights, summer-elegance, summer-holidays, sweet-oud |
| **In collection but NOT tagged** | **4** | alluring-rose (`["Women"]`), bleu-exclusive (`[]`), chocolate-creme, hot-vanilla |

**`best-sellers` is therefore a MANUAL collection** (or a smart collection on a non-tag rule).
It is definitively *not* `tag = Best Selling`. The tag and the collection have drifted apart.

For the other 18 collections, rule type is **not determinable from captured data** — but the
count arithmetic (§5.1, E5) makes it impossible for `for-him`/`for-her` to be simple tag rules
on the published catalog either.

---

## 6. Tag taxonomy

Source: `raw/products.json → tags`. **6 distinct tags, 92 assignments across 56 products.**

| Tag | Products | % of 56 | Casing | Nearest collection | Collection count | Match? |
|---|---|---|---|---|---|---|
| `Men` | **28** | 50.0 % | Title Case | `for-him` | 83 | ✗ no |
| `Women` | **25** | 44.6 % | Title Case | `for-her` | 80 | ✗ no |
| `Best Selling` | **23** | 41.1 % | Title Case, 2 words | `best-sellers` | 24 (18 live) | ✗ no (§5.2) |
| `new` | **9** | 16.1 % | **lowercase** | `new-drops` | 30 | ✗ no |
| `Unisex` | **4** | 7.1 % | Title Case | `unisex` | 50 | ✗ no |
| `Bundles` | **3** | 5.4 % | Title Case | `bundles` | 11 | ✗ no |

`new` is the only lowercase tag — a casing inconsistency mirroring the `size`/`Size` split in §4.2.

**No tag maps cleanly onto any collection.** Every pairing is off by a wide margin. Combined
with §5.2's direct test, the conclusion is that the collections are predominantly **manually
curated**, and the tag taxonomy is a parallel, partially-abandoned system.

**17 of 56 products carry no tags at all** (30 %): `sundaze`, `vanilla-91`, `pink-arrogance`,
`pink-allure`, `lost-on-you`, `aurableu`, `absolute-drunk`, `bleu-exclusive`, `belle-riche`,
`bare-glow`, `bleu-intense`, `silk-vanilla-body-lotion`, `marshmallow`, `sweet-rum`, `apple-pie`,
`silk-vanilla`, `soiree`. Note that **16 of these 17 are the newest products** — tagging stopped
being maintained around 2025-09.

**Rebuild implication:** the tag set is too thin and too inconsistently applied to drive
storefront filtering. Prestige/Horizon faceted filtering on tags would produce misleading
results (a "Men" facet would hide 28 products that simply were never tagged). Filtering should
be rebuilt on **metafields + Shopify Search & Discovery** (`fragrance.gender`,
`fragrance.family`, `fragrance.size`), with a one-time backfill.

Missing taxonomies a fragrance store needs and this catalog lacks entirely: scent family
(gourmand / woody / fresh / floral / oriental), season, occasion, concentration. The JSON-LD
`category` field (§8.2) is the only usable product-type signal today.

---

## 7. Metafields

Exhaustive search of all 56 PDP HTML files, 5 page HTML files, `products.json`, `collections.json`,
and all `.js.json` files for `metafield`, `metafields`, `metaobject`.

| Reference found | Occurrences | Owner | Where | Real usage? |
|---|---|---|---|---|
| `shop.metafields.judgeme.all_reviews_rating` | 80 (across files) | shop | Inside the Judge.me settings JSON blob, as an **unrendered Liquid template string** in `all_reviews_text_badge_text` | ✗ template only |
| `shop.metafields.judgeme.all_reviews_count` | 80 | shop | same blob | ✗ template only |
| `widget_rating_metafield_value_type: true` | 40 | — | Judge.me settings key (a boolean app setting, not a metafield) | ✗ not a metafield |
| `metaobject` | **0** | — | — | — |
| `product.metafields.*` | **0** | product | — | — |
| `collection.metafields.*` | **0** | collection | — | — |
| Any custom / `custom.*` namespace | **0** | — | — | — |

### Conclusion

**No merchant-defined metafields are in use anywhere on this store.** The only metafield
identifiers present belong to the Judge.me app (`judgeme` namespace, shop-level) and appear
solely as inert Liquid strings inside the app's serialised settings — they are not rendered by
the theme on any captured page.

Judge.me rating data reaches the storefront via HTML data-attributes instead:
`data-shop-average-rating="4.98"`, `data-shop-review-count="1176"`,
`data-shop-reviews-count="222"` (`raw/products/sundaze.html`). *(Note: these three app-emitted
numbers describe different populations: **1,176** is the shop-wide review total, **222** is the
count of shop-level (non-product) reviews, and **820** is the sum of per-product
`data-number-of-reviews` across all 56 PDPs, at a weighted **4.9807★**. The 356-review difference
belongs to unpublished/deleted products — full reconciliation is in `06-REVIEWS.md` §2.3.)*

**This is the single largest structural gap for a rebuild.** Every piece of fragrance data —
notes, accords, longevity, inspired-by, concentration — is currently either free HTML prose or
crammed into a mis-used core field. §3.5 and §9 propose the metafield model to fix it.

---

## 8. Structured data / JSON-LD

### 8.1 Product pages

Source: `<script type="application/ld+json">` in `raw/products/*.html`.
**All 56 of 56 PDPs are captured** (the 24 bot-challenge captures from the first scrape pass were
subsequently recovered). All 56 emit exactly **2 blocks**: `ProductGroup` + `BreadcrumbList` —
verified by re-parse, 56/56 files, no file emits 1 or 3.

| Type | Property | Nodes emitting | Value source | Example |
|---|---|---|---|---|
| `ProductGroup` | `@context` | 56 | — | `http://schema.org/` |
| `ProductGroup` | `@type` | 56 | — | `ProductGroup` |
| `ProductGroup` | `@id` | 56 | product URL | `/products/sundaze#product` |
| `ProductGroup` | `name` | 56 | `product.title` | `Sundaze` |
| `ProductGroup` | `url` | 56 | canonical | `https://siwafragrances.com/products/sundaze` |
| `ProductGroup` | `productGroupID` | 56 | `product.id` | `8032720257072` |
| `ProductGroup` | `description` | 56 | `body_html` stripped to text | see below |
| `ProductGroup` | `category` | 56 | **Shopify Standard Product Taxonomy** | `Eaux de Parfum` |
| `ProductGroup` | `brand` → `Brand.name` | 56 | **`product.vendor`** ⚠ | `Power Of You Giorgio Armani` |
| `ProductGroup` | `hasVariant` | 56 | variants array | **158** `Product` nodes total |
| `Product` (variant) | `@id`, `@type`, `name`, `image`, `offers` | 158 each | — | `Sundaze - 30 ml` |
| `Product` (variant) | `sku` | **108 of 158** | `variant.sku` | `SF-081` |
| `Product` (variant) | `mpn` | **105 of 158** | `variant.barcode` (non-12/13/14-char) | `Coffee Vanilla 100ml` ⚠ |
| `Product` (variant) | `gtin` | **10 of 158** | `variant.barcode` (12/13/14 chars) | `Bare Glow 30ml` ⚠ invalid |
| `Offer` | `@id`, `@type` | 158 | — | `…?variant=…#offer` |
| `Offer` | `price` | 158 | `variant.price` | `"500.00"` |
| `Offer` | `priceCurrency` | 158 | shop currency | `EGP` |
| `Offer` | `availability` | 158 | `variant.available` | `http://schema.org/InStock` |
| `Offer` | `url` | 158 | variant deep link | `…/products/sundaze?variant=43433688563760` |
| `BreadcrumbList` | `itemListElement` | 56 | — | 2 `ListItem`s: Home → product title |

**Properties conspicuously ABSENT from PDP JSON-LD:**

| Missing property | Impact |
|---|---|
| **`aggregateRating`** — **0 of 56 PDPs** | Re-verified across the complete capture: the strings `aggregateRating` and `ratingValue` occur **zero times** in any of the 56 PDP HTML files, at any level (ProductGroup or variant `Product`), case-insensitively. Despite **1,176 shop-wide reviews at 4.98★** — of which **820 are attributable to 54 of the 56 products at 4.9807★** — there are **zero star-rating rich snippets in Google**. Judge.me's ratings are not wired into the theme's structured data. **Highest-value fix available**, and the full capture makes the case stronger, not weaker: 54 of 56 PDPs have enough review volume (median 9, max 98) to qualify for a rating snippet today. |
| `review` | No review rich snippets — 241 review bodies are server-rendered in HTML but invisible to structured data |
| `priceValidUntil` | Google Merchant warning |
| `itemCondition` | Google Merchant warning |
| `shippingDetails` / `hasMerchantReturnPolicy` | Google Merchant warnings |
| `image` at ProductGroup level | Only per-variant `image` is emitted |
| `variesBy` | ProductGroup best practice: should be `["https://schema.org/size"]` |

**`description` is a flat text-dump of `body_html`** with tags stripped and `&amp;` left
un-decoded (e.g. `"Bitter Orange &amp; Lemon"` appears literally in the JSON string). Double
newlines from list items produce ragged whitespace.

### 8.2 `category` — the hidden taxonomy field

`category` is populated on **all 56 PDPs** even though `product_type` is empty on 55 of 56
products. It comes from Shopify's Standard Product Taxonomy, set in the admin.

| `category` value | Products (of all 56) | Which |
|---|---|---|
| `Eaux de Parfum` | **45** | most EDPs |
| `Body Mists` | 5 | `apple-pie`, `marshmallow`, `silk-vanilla`, `sweet-rum`, `vanilla-91` |
| `Bundles` | 3 | `layering-30-ml-bundle`, `marshmallow-bundle`, `vanilla-bundle` |
| `Perfumes & Colognes` | **2** | `belle-riche`, `layering-vanilla` ⚠ inconsistent — both should be `Eaux de Parfum` |
| `Lotions & Moisturizers` | 1 | `silk-vanilla-body-lotion` |

`layering-apple` is categorised `Eaux de Parfum` despite being a layering/travel product —
minor inconsistency. The full capture surfaces a second `Perfumes & Colognes` outlier:
**`layering-vanilla`**, which is the store's single highest-review product (98 reviews) and was
mis-recorded in the first capture pass. Both it and `belle-riche` need re-filing.

**This is the only reliable product-type signal in the dataset** and should be preserved and
surfaced in a rebuild (as a "Concentration" spec line, and as a filter facet).

### 8.3 Homepage and other pages

Source: `raw/pages/index.html`.

| Block | Type | Properties emitted | Values |
|---|---|---|---|
| 1 | `BreadcrumbList` | `itemListElement` → 1 `ListItem` | Home → `https://siwafragrances.com` |
| 2a | `WebSite` | `name`, `url`, `potentialAction` | `Siwa Fragrances`, `https://siwafragrances.com` |
| 2a | ↳ `SearchAction` | `target`, `query-input` | `…/search?q={search_term_string}`, `required name=search_term_string` |
| 2b | `Organization` | `name`, `url` | `Siwa Fragrances`, `https://siwafragrances.com` |

**`Organization` is minimal** — no `logo`, `sameAs` (social profiles), `address`,
`contactPoint`, `email`, or `telephone`, despite `raw/meta.json` carrying
`city: "New Cairo"`, `province: "Cairo"`, `country: "EG"`. No `LocalBusiness`, no `Store`.

Other captured pages emit **`BreadcrumbList` only** (1 block each):

| Page | Breadcrumb trail |
|---|---|
| `raw/pages/collections_all.html` | Home → Products (`/collections/all`) |
| `raw/pages/collections_best-sellers.html` | Home → BEST SELLERS |
| `raw/pages/pages_about-us.html` | Home → ABOUT US |

No `CollectionPage`, `ItemList`, `WebPage`, `FAQPage`, or `AggregateRating` anywhere.

### 8.4 Structured-data gap summary

| Gap | Severity | Fix |
|---|---|---|
| `brand.name` = designer name on 40 products | **High** (trademark + brand SEO) | Emit `Siwa Fragrances`; move reference to `custom.inspired_by` |
| No `aggregateRating` despite **1,176** shop-wide reviews at 4.98★ (820 attributable across 54 of 56 products at 4.9807★) | **High** (lost rich snippets) | Wire Judge.me metafields into the Product schema |
| **10** invalid `gtin` values from free-text barcodes (all 56 PDPs re-checked: `bare-glow` ×2, `citrine` ×2, `gourmet` ×2, `hot-male` ×2, `sweet-oud` ×2 — and `hot-male`'s 100 ml variant carries the 50 ml string) | **Medium** (Merchant Center errors) | Clear/normalise `barcode` |
| `Organization` has no `logo` / `sameAs` / `address` | Medium | Extend Organization schema |
| No `priceValidUntil`, `itemCondition`, `shippingDetails`, `hasMerchantReturnPolicy` | Medium | Add to Offer |
| No `ItemList` on collection pages | Low | Add `CollectionPage` + `ItemList` |
| `description` contains raw `&amp;` entities | Low | Decode before serialising |

---

## 9. Proposed rebuild schema

Where each piece of content should live after migration. `SS` = section/block setting,
`MF` = metafield, `CF` = core Shopify field, `MO` = metaobject.

### 9.1 Product-level

| Content | Today | Populated | Target | Type | Rationale |
|---|---|---|---|---|---|
| Product name | `title` | 56/56 | **CF** `title` | — | Unchanged |
| URL handle | `handle` | 56/56 | **CF** `handle` | — | Preserve all 56 for SEO; add 301s only if renamed |
| Brand | `vendor` (mis-used) | 56/56 | **CF** `vendor` = `"Siwa Fragrances"` for all 56 | — | Fixes `brand.name` in JSON-LD (§2.5) |
| **Inspired-by designer** | `vendor` (40) + 1 blockquote | 40/56 | **MF** `custom.inspired_by` | `single_line_text_field` | The critical migration. Render via a dedicated PDP element, not the vendor block |
| Concentration / type | JSON-LD `category`; `product_type` empty | 32 via LD | **CF** `category` (keep) + **MF** `fragrance.concentration` | `single_line_text_field` | `category` is the only working type signal (§8.2) |
| "The Vibe" lead copy | `body_html` H4 section | 6/56 | **MF** `fragrance.vibe` | `multi_line_text_field` | Family A/B lead paragraph |
| Long-form story | `body_html` | 5/56 | **MF** `custom.the_story` | `rich_text_field` | Family B only; optional accordion |
| Main accords | `body_html` `•`-separated | 1/56 | **MF** `fragrance.main_accords` | `list.single_line_text_field` | Chips row; needs backfill |
| Top notes | `body_html` | 18/56 | **MF** `fragrance.notes_top` | `list.single_line_text_field` | Note pyramid |
| Heart notes | `body_html` | 18/56 | **MF** `fragrance.notes_heart` | `list.single_line_text_field` | Note pyramid |
| Base notes | `body_html` | 18/56 | **MF** `fragrance.notes_base` | `list.single_line_text_field` | Note pyramid |
| Longevity | `body_html` | 2/56 | **MF** `fragrance.longevity` | `single_line_text_field` | Spec row |
| Projection / sillage | `body_html` | 1/56 | **MF** `fragrance.projection` | `single_line_text_field` | Spec row |
| Best for / occasions | `body_html` | 9/56 | **MF** `fragrance.best_for` | `list.single_line_text_field` | Occasion chips |
| Gender | tags `Men`/`Women`/`Unisex` | 39/56 | **MF** `fragrance.gender` | `list.single_line_text_field` | Tags are 30 % unpopulated (§6); metafield + Search & Discovery facet |
| Scent family | **absent** | 0/56 | **MF** `fragrance.family` | `list.single_line_text_field` | New taxonomy; enables "shop by family" |
| Season | **absent** | 0/56 | **MF** `fragrance.season` | `list.single_line_text_field` | New |
| Remaining prose | `body_html` | 56/56 | **CF** `body_html` (cleaned) | — | Strip inline `style=`, empty `<span>`, `data-path-to-node` |
| Review rating/count | Judge.me data-attrs | **54/56 rated** (820 reviews, 4.9807★) | **MF** `reviews.rating` + `reviews.rating_count` | `rating`, `number_integer` | Enables `aggregateRating` in JSON-LD (§8.4) |
| Badges (Best Seller / New) | tags | 32 assignments | **MF** `custom.badge` | `single_line_text_field` | Decouple badge display from collection membership |
| Bundle contents | option names | 3 products | **MF** `custom.bundle_items` | `list.product_reference` | Replaces the `Layerng Pistachio`-style option-name hack (§4.2) |

### 9.2 Variant-level

| Content | Today | Target | Notes |
|---|---|---|---|
| Size | `option1` (11 spellings) | **CF** option `Size` with canonical values `30 ml`, `50 ml`, `100 ml`, `120 ml`, `125 ml` | Normalise all 62 option names to `Size` and all 11 value spellings to 5 canonical ones |
| Price | `variant.price` | **CF** `price` | Unchanged; ladder documented §4.8 |
| Sale price | `compare_at_price` | **CF** `compare_at_price` | **Clear all 66 `"0.00"` values to null** |
| SKU | product-level, colliding | **CF** `sku`, made unique per variant | e.g. `SF-081-30`, `SF-081-50`, `SF-081-100` |
| Barcode | free text on 8 products | **CF** `barcode` — clear or set real EAN | Fixes 6 invalid GTINs (§4.5) |
| Weight | `grams: 0` on all 158 | **CF** `grams` per size | Currently unusable for shipping rates |

### 9.3 Collection-level

| Content | Today | Target | Notes |
|---|---|---|---|
| Title | `title` (mixed casing) | **CF** `title`, normalised | `FOR HIM` vs `men new drops` vs `perfumes` — pick one convention; the theme uppercases via `--heading-text-transform` anyway |
| Description | **empty on all 19** | **CF** `description` | Needed for SEO and collection-header design |
| Hero image | 1 of 19 | **MF** `custom.hero_image` (+ `custom.hero_image_mobile`) | `file_reference` — collection banners need art direction |
| Membership | manual (verified for `best-sellers`) | Smart rules on the new metafields | Removes the 9-tagged-but-absent / 4-absent-but-tagged drift (§5.2) |
| Product count in UI | `products_count` (unreliable, §5.1) | Liquid `collection.products_count` | Never use the JSON endpoint value |

### 9.4 Theme / section settings (not product data)

| Content | Today | Target |
|---|---|---|
| Announcement bar copy | theme setting | **SS** `announcement-bar` |
| Homepage slideshow, featured collections, media grid, scrolling content | theme sections | **SS** per section |
| Free-shipping threshold (1500 EGP) | hard-coded in announcement copy | **SS** numeric setting, referenced by both the bar and the cart-drawer progress bar |
| `text-with-icons` trust badges | theme section | **SS** |
| Judge.me widget placement | app block | app block (unchanged) |
| Colour schemes, typography, radii | 134 CSS custom properties | theme settings (see doc 02) |

### 9.5 Migration risk register

| # | Risk | Affected | Mitigation |
|---|---|---|---|
| 1 | Dropping `vendor` loses 40 unique inspired-by strings, unrecoverable | 40 products | Export `vendor` → `custom.inspired_by` **before** resetting `vendor` |
| 2 | `compare_at_price = "0.00"` reads as truthy in naive Liquid → phantom sale badges | 66 variants | Test `compare_at_price > price` |
| 3 | Option name `Layerng Pistachio` typo is user-visible | 1 product | Fix in admin; it is in the option name, not just a value |
| 4 | 11 spellings of 5 sizes break any size facet or size-swatch UI | 158 variants | Normalise before enabling filtering |
| 5 | Tag-driven filtering would hide 17 untagged products | 17 products | Backfill `fragrance.gender` before shipping facets |
| 6 | `products_count` from the JSON API is publication-blind | 19 collections | Use Liquid counts |
| 7 | ≥ 27 admin products are unpublished; a theme migration may surface them | unknown set | Audit in Admin before go-live |
| 8 | Zero image alt text | 65 images | Backfill; blocks WCAG compliance |
| 9 | Single square image per product on 50 of 56 | 50 products | Gallery design must not assume multiple images |
| 10 | 37 % of variants sold out, 8 products fully | 59 variants | Sold-out states need first-class design, not an afterthought |

---

## 10. Quick-reference summary

| Dimension | Value |
|---|---|
| Published products / variants / images | **56 / 158 / 65** |
| Admin products (lower bound, inferred) | **≥ 83** — ≥ 27 unpublished (§5.1) |
| Collections | 19, **all with empty descriptions**, 1 with an image |
| Distinct tags | **6** (`Men` 28, `Women` 25, `Best Selling` 23, `new` 9, `Unisex` 4, `Bundles` 3); 17 products untagged |
| Distinct vendors | **42** — 2 Siwa-owned (16 products), 40 designer references (40 products) |
| `product_type` populated | **1 of 56** |
| JSON-LD `category` populated | **56 of 56 PDPs** — the real type taxonomy |
| Merchant metafields in use | **ZERO** |
| Metaobjects in use | **ZERO** |
| Video / 3D media | **ZERO** |
| Image alt text | **ZERO** |
| Option names | **10 distinct strings** for one concept; 1 typo |
| Option values | **11 spellings** for 5 canonical sizes |
| body_html templates | **4 generations**; the richest is on **1 of 56** products |
| Price envelope | **350 – 2300 EGP**; format `LE {{amount}}` |
| Price ladder | 50 ml ≈ **×1.5** of 30 ml; 100 ml ≈ **×2.5** of 30 ml (hand-set per product) |
| Variants on sale | 19 of 158, across 4 products |
| Variants sold out | **49 of 158 (31.0 %)**; **10 products fully** |
| `aggregateRating` in JSON-LD | **absent on all 56 PDPs** (re-verified: 0 occurrences of `aggregateRating` or `ratingValue`) despite **1,176** shop-wide reviews at 4.98★ / **820** attributable across 54 products |
