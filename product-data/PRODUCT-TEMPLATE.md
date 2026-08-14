# Siwa Fragrances — Unified Product Template

**What we know about any given product.** This is the empty schema, not the data.
One block per product; every product uses the same shape.

Coverage figures are out of the **56 published products** (catalogue captured 2026-07-27,
social captured 2026-07-28). `Held` tells you how many products actually have that field
filled — the low numbers are the migration backlog, not a capture failure.

---

## The template

```
IDENTITY
  handle …………………… url slug, the join key across every file
  title ……………………… display name
  vendor …………………… ⚠ NOT a brand — the designer fragrance this clones, or a Siwa value
  vendor_kind ………… siwa_owned | inspired_by          (derived)
  product_type ……… Shopify product type
  published_at ……… date

TAXONOMY
  tags[] …………………… drives the entire navigation

COMMERCE
  option_name ……… the size option's label  ⚠ casing is inconsistent
  variants[]
      size ………………… e.g. 30 ml / 50 ml / 100 ml / 125 ml
      price ……………… EGP
      compare_at ……  ⚠ often the junk value "0.00"
      available ……… in stock | sold out
  price_min / price_max …………………………………… (derived)
  variants_total / variants_sold_out ……… (derived)
  fully_sold_out / on_sale ………………………………  (derived)

CONTENT
  description_format ……… A | B | C | D | E   (see key below)
  body_chars ………………………… length of the description
  body_text …………………………… the description, HTML stripped
  accords ………………………………… main accords, where the copy labels them
  notes
      top ……………………………………  labelled tier, where present
      heart ………………………………  ⚠ the store uses both "Heart" and "Middle"
      base …………………………………

SOCIAL PROOF
  review_avg / review_count ……… Judge.me, per product
  review_quotes[]
      rating / author / body ……  verbatim, page 1 of each widget

MEDIA
  image_count ………………… ⚠ 50 of 56 products have exactly one
  image_files[] ……………  filenames
  image_alt ………………………  ⚠ null on every product image in the store

SOCIAL CREATIVE                       ← only 4 products
  instagram[]
      shortcode / url / date
      likes / comments
      type ……………………………… single | carousel
      caption ……………………… verbatim, with hashtags
      images[]
          file / px / art_direction
      notable_comments[]
          user / body / signal
      pairs_with ………………… co-marketed product, where applicable
  palette{} ……………………… the fragrance's colour world, read from the photography
  voice
      register ………………… how this product's copy speaks
      pull_quotes[] ……… lines usable as headlines

DERIVED GAPS                          ← computed, not stored
  no tags · no gender tag · single image · null alt ·
  notes not machine-readable · sold out · junk compare-at · no reviews
```

---

## Field reference

| Field | Type | Source | Held |
|---|---|---|---:|
| `handle` | string | `products.json` | **56 / 56** |
| `title` | string | `products.json` | **56 / 56** |
| `vendor` | string | `products.json` | **56 / 56** |
| `vendor_kind` | enum | derived | **56 / 56** |
| `product_type` | string | `products.json` | **1 / 56** |
| `published_at` | date | `products.json` | **56 / 56** |
| `tags[]` | string[] | `products.json` | **39 / 56** |
| `option_name` | string | `products.json` | **56 / 56** |
| `variants[]` | object[] | `products.json` | **56 / 56** (158 variants) |
| `price_min` / `price_max` | number | derived | **56 / 56** |
| `description_format` | enum A–E | `description_formats.json` | **56 / 56** |
| `body_text` | string | `products.json` | **56 / 56** |
| `accords` | string | parsed from `body_html` | **5 / 56** |
| `notes.top/heart/base` | string | parsed from `body_html` | **18 / 56** |
| `review_avg` / `review_count` | number | `reviews_complete.json` | **54 / 56** |
| `review_quotes[]` | object[] | `reviews_complete.json` | **54 / 56** |
| `image_count` / `image_files[]` | int / string[] | `products.json` | **56 / 56** |
| `image_alt` | string | `products.json` | **0 / 56** |
| `instagram[]` | object[] | `instagram-assets/` | **4 / 56** |
| `palette{}` | object | `instagram-assets/` | **4 / 56** |
| `voice` | object | `instagram-assets/` | **4 / 56** |

### Description format key

| | Meaning | Products |
|---|---|---:|
| **A** | `THE VIBE` + `FRAGRANCE PROFILE` | 1 |
| **B** | `Persona` / `The Story` — the strongest editorial template | 5 |
| **C** | name + accord triplet + labelled note tiers | 12 |
| **D** | free prose, no labelled tiers | 24 |
| **E** | minimal / boilerplate (under 200 chars) | 14 |

---

## What we do NOT have, for any product

None of this exists in the store or the capture. Anything needing it has to be created:

- **metafields and metaobjects** — zero of either; the whole content model lives in `body_html`
- **collection membership per product** — the capture has collections and products, not the join
- **variant images** — no variant carries a `featured_image`
- **SKU, barcode, weight, dimensions**
- **inventory quantities** — only the in-stock / sold-out boolean
- **cost, margin, supplier**
- **longevity, sillage, projection ratings**
- **gender / occasion / season guidance** as structured fields (only the free-text tags)
- **fragrance family or concentration** as a field — ⚠ packaging says `EXTRAIT DE PARFUM`, the site's JSON-LD says `Eaux de Parfum`

---

## Notes on using this

- **`vendor` is not a brand** for 40 of 56 products. Any template that renders it as one repeats the live store's mistake — it currently ships to Google as schema.org `brand.name`.
- **The low-coverage rows are the backlog**, in priority order: image alt (0/56), accords (5/56), structured notes (18/56), tags (39/56).
- **`notes.heart`** must absorb both `Heart` and `Middle` spellings; the store uses 13 different tier labels in total.
- **Two known value quirks:** `soul-poudree` has a variant titled `100` with no unit; `layering-30-ml-bundle` carries 36 variants across only 3 distinct sizes.

*Filled instances of this template for all 56 products: `PRODUCT-DATA.md` (human) and `product-data.json` (machine).*
