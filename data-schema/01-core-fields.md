# 1 — Core Shopify Fields

The fields Shopify gives you. Nothing new here — the work is entirely **cleanup**.

Figures cite `../reference-analysis/03-DATA-SCHEMA.md §1, §4, §6, §8.2`.

---

## 1. What changes

| Field | Today | Target | Why |
|---|---|---|---|
| `title` | 56/56 · **53 Western names, 2 Arabic, 1 the brand's own** | unchanged | Naming is a brand decision — `../Planning/BENCHMARK.md Part 2 §6.4` |
| `handle` | 56/56 | **frozen** | Every change costs a 301 and SEO equity |
| `vendor` | 42 distinct values, 40 of them a designer fragrance | **`"Siwa Fragrances"` on all 56** | This is what leaks into `brand.name` |
| `product_type` | **1 of 56** (`body lotion`) | filled on all 56 — **after the §3 decision** | Filters + JSON-LD |
| `category` (Standard Taxonomy) | **56 of 56** ✅ | two rows corrected | The only working type signal you have |
| `tags` | 6 tags, **17 products with none** | prefixed taxonomy — §4 | The current set cannot carry navigation |
| `options[].name` | **10 distinct strings** for one concept, one typo | `"Size"` on all 62 | `Layerng Pistachio` is **customer-visible** |
| `options[].values` | **11 spellings** for 5 sizes | `30 ml` `50 ml` `100 ml` `120 ml` `125 ml` | Any size swatch or facet breaks without this |
| `variants[].sku` | product-level, colliding, 15 products without one | variant-level and unique — §5 | SKU is **not a unique key** today |
| `variants[].barcode` | free text on 8 products | **cleared** or a real EAN | 10 invalid GTINs reaching Google Merchant |
| `variants[].grams` | **0 on all 158** | real weight per size | No weight-based shipping is possible |
| `compare_at_price` | 66 variants hold `"0.00"` | `null` | Truthy in naive Liquid → phantom sale badges |
| `images[].alt` | **null on all 65** | generated — §6 | WCAG + SEO |

---

## 2. `vendor` — where the reference goes

**Today** Google is told:

```json
{ "brand": { "@type": "Brand", "name": "Bleu De Chanel L'Exclusif" } }
```

**After:**

```json
{
  "vendor": "Siwa Fragrances",
  "metafields": {
    "inspired_by.house": "Chanel",
    "inspired_by.fragrance": "Bleu de Chanel L'Exclusif"
  }
}
```

> ⚠️ **Order matters.** `vendor` was the only source for those 40 strings. It is now also captured
> in **`reference-fragrances.json`**, split into house and fragrance — but confirm that file covers
> all 40 before clearing anything. `03-DATA-SCHEMA.md §9.5` risk #1.

Distribution of the 42 values: `Siwa Fragrances` ×10 · `Siwa original creation` ×6 · 40 unique
designer strings.

---

## 3. `product_type` and `category` — an open decision, not a cleanup

A contradiction is on record: **the bottles read `EXTRAIT DE PARFUM`, the JSON-LD says
`Eaux de Parfum`** (`../Planning/DIRECTION.md Part 2 §3.2C` · `../instagram-assets/README.md`).

**This is a product decision, not a data one.** The actual oil concentration settles it, and someone
on the team has to say which. Until then `fragrance.concentration` stays empty.

In the workbook this is asked **once**, on the Settings sheet, and applied to all perfumes from
there — not repeated 56 times.

`category` today (`03-DATA-SCHEMA.md §8.2`):

| Value | Count | Note |
|---|---:|---|
| `Eaux de Parfum` | 45 | |
| `Body Mists` | 5 | `apple-pie`, `marshmallow`, `silk-vanilla`, `sweet-rum`, `vanilla-91` |
| `Bundles` | 3 | |
| `Perfumes & Colognes` | **2** | ⚠️ `belle-riche` and `layering-vanilla` — both should be `Eaux de Parfum` |
| `Lotions & Moisturizers` | 1 | |

Target `product_type`: the settled concentration for perfumes, plus `Body Splash`, `Body Lotion`,
`Bundle`. **Derived, not asked** — the workbook computes it from line and category.

---

## 4. Tag taxonomy

### 4.1 Tags are not the filtering system

The audit is explicit (`03-DATA-SCHEMA.md §6`): filtering is rebuilt on **metafields + Shopify
Search & Discovery**, not tags. A tag is free text — one stray `Men ` with a trailing space creates
a second silent facet.

Tags keep a narrower job: **manual merchandising and smart-collection rules** — the things a
merchant flips by hand without opening a metafield editor.

| Axis | Owner | Why |
|---|---|---|
| Customer-facing facets (family, gender, size, house) | **metafields** | Closed values, filterable, translatable |
| Collection membership, badges, campaigns | **tags** | The merchant controls them directly |

### 4.2 The prefix scheme

```
line:      originals | inspired-by | layering | body-care | bundle
status:    best-seller | new-drop | limited | staff-pick
season:    spring | summer | autumn | winter | all-season
campaign:  ramadan-2026 | black-friday-2026 | …   (temporary, removed after the campaign)
```

A bare `floral` tag tells you nothing about whether it is a gender, a family or a mood.
`family:floral` says what it is.

The list is short because `gender:`, `family:` and `occasion:` are metafields. Duplicating them as
tags would create two sources of truth that drift — which is exactly what happened: `Best Selling`
is on 23 products, the `best-sellers` collection holds 18, and **9 are tagged but absent while 4 are
present but untagged** (`03-DATA-SCHEMA.md §5.2`).

**All of these are generated**, not typed: the workbook builds the tag string from line, badge,
gender and season on its Auto-calculated sheet.

### 4.3 Migration of the existing tags

| Tag | Count | Becomes |
|---|---:|---|
| `Men` | 28 | `fragrance.gender_leaning: masculine` |
| `Women` | 25 | `fragrance.gender_leaning: feminine` |
| `Best Selling` | 23 | `status:best-seller` |
| `new` | 9 | `status:new-drop`, or computed from `identity.launch_date` |
| `Unisex` | 4 | `fragrance.gender_leaning: unisex` |
| `Bundles` | 3 | `line:bundle` |

> ⚠️ **The 17 untagged products are not fixed by this mapping.** It runs on 39 products. The other
> 17 — including **`pink-allure`**, a 2026 flagship original, and **`bleu-exclusive`** — need manual
> input. See `10-migration.md §5`.

---

## 5. SKU

Today SKUs are **product-level, not variant-level** — every size of `gourmet` carries `SF-081` — and
`BS-1` is used by two different products. SKU is therefore not a unique key
(`03-DATA-SCHEMA.md §4.5`).

**Do not re-key the catalogue.** The existing roots (`SF-`, `SP-`, `SL-`, `P0`) are in real
inventory and on real paperwork. Suffix them instead:

```
{existing root}-{size in ml}

SF-081-30 · SF-081-50 · SF-081-100
P085-30   · P085-50   · P085-100
```

| Case | Count | Action |
|---|---:|---|
| Clean root exists | 41 products | Append the size |
| `BS-1` / `BS-1-1` / `BS-1-1-1` (placeholder-shaped, colliding) | 4 | New root, same scheme |
| No SKU at all | **15 products / 50 variants** | New root; prefix by line |

---

## 6. Images and alt text

**65 images, 50 products with exactly one, and `alt` null on all 65**
(`03-DATA-SCHEMA.md §1.3`).

Alt text is **generated, not written**:

```
{title} — {identity.title_ar} — {concentration} — Siwa Fragrances
```

The workbook computes this on the Auto-calculated sheet from fields the owner already supplied.

> **The gallery must survive a single image.** Any carousel or hover-second-image feature is inert
> on 50 of 56 products. `03-DATA-SCHEMA.md §9.5` risk #9.

---

## 7. Sizes — 11 spellings, 5 values

| Present | Target |
|---|---|
| `30 ml` (44) · `30ML` (4) | `30 ml` |
| `50 ml` (47) · `50ML` (5) | `50 ml` |
| `100 ml` (44) · `100ML` (2) · **`100`** (no unit, `soul-poudree`) | `100 ml` |
| `120ML` (1) · `120 ml` (1) | `120 ml` |
| `125ML` (6) · `125ml` (1) | `125 ml` |

And 10 option names collapse to `"Size"`, among them `size` (44), `Size` (9),
**`Layerng Pistachio`** (a customer-visible typo), `Layering Lychee`, and five that embed the
product name in the option name.
