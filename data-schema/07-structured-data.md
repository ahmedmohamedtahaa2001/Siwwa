# 7 — Structured Data

This layer stores nothing. It is **output** — every field reads from one of the six layers above.

It is also the highest-return item in the project. `../reference-analysis/README.md §3` makes it
finding #1 and `../Planning/BENCHMARK.md Part 1 §3.1` ranks it first:
*"Highest ROI action available anywhere in this project."*

---

## 1. The gap

| Element | Today | After |
|---|---|---|
| `brand.name` | **the designer's name** on 40 products | `Siwa Fragrances` on 56 |
| `aggregateRating` | **absent from all 56 PDPs** | 54 of 56 qualify today |
| `review` | absent | first 3–5 reviews |
| `breadcrumb` | 2 levels (Home → product) | 3 levels |
| `alternateName` | absent | the Arabic name |
| `additionalProperty` | absent | notes, concentration, longevity, sillage |
| `gtin` | **10 invalid values** from free text in `barcode` | cleared, or real EANs |
| `priceValidUntil` · `itemCondition` · `shippingDetails` · `hasMerchantReturnPolicy` | absent | Merchant Center warnings today |
| `variesBy` | absent | `["https://schema.org/size"]` |
| `image` at ProductGroup level | absent (per-variant only) | added |
| `description` | flat text with raw `&amp;` | decoded |

### 1.1 What is being lost

The store holds **1,212 reviews at 4.98★** (live 2026-08-12), of which **820 are attributable to 54
of the 56 products at a weighted 4.9807★** — and produces **zero star ratings in Google**, because
the string `aggregateRating` appears **zero times** across all 56 PDPs
(`../reference-analysis/_CORRECTIONS.md §1` · `../reference-analysis/03-DATA-SCHEMA.md §8.1`).

The only two products without reviews are `soiree` and `sundaze`, both recent.

---

## 2. The target shape

`mawj` — **prices, reviews and availability are real** from
`../product-data/product-data.json`; fields marked `✍` have no value in any capture yet.

```jsonc
{
  "@context": "https://schema.org",
  "@type": "ProductGroup",
  "@id": "https://siwafragrances.com/products/mawj#product",

  "name": "Mawj",
  "alternateName": "موج",                          // ← identity.title_ar             ✍
  "description": "…",                              // ← story.the_vibe, decoded       ✍
  "category": "Eaux de Parfum",                    // ← Standard Taxonomy (56/56 today)
  "productGroupID": "mawj",
  "url": "https://siwafragrances.com/products/mawj",
  "variesBy": ["https://schema.org/size"],

  "brand":        { "@type": "Brand",        "name": "Siwa Fragrances" },
  "manufacturer": { "@type": "Organization", "name": "Siwa Fragrances",
    "address": { "@type": "PostalAddress",
      "addressLocality": "New Cairo", "addressRegion": "Cairo", "addressCountry": "EG" } },
                                                   // ← raw/meta.json — present and unused today

  "image": ["https://…/mawj.jpg"],                  // one image — true of 50 of 56

  "aggregateRating": {                             // ← reviews.* — §3
    "@type": "AggregateRating",
    "ratingValue": "4.99", "reviewCount": "68",
    "bestRating": "5", "worstRating": "1"
  },

  "hasVariant": [
    { "@type": "Product", "name": "Mawj — 30 ml",  "size": "30 ml", "sku": "…-30",
      "offers": { "@type": "Offer", "price": "800.00",  "priceCurrency": "EGP",
                  "availability": "https://schema.org/InStock",
                  "itemCondition": "https://schema.org/NewCondition",
                  "url": "https://siwafragrances.com/products/mawj?variant=…" } },
    { "@type": "Product", "name": "Mawj — 50 ml",  "size": "50 ml",
      "offers": { "price": "1100.00", "priceCurrency": "EGP",
                  "availability": "https://schema.org/InStock", "…": "…" } },
    { "@type": "Product", "name": "Mawj — 100 ml", "size": "100 ml",
      "offers": { "price": "1850.00", "priceCurrency": "EGP",
                  "availability": "https://schema.org/InStock", "…": "…" } }
  ],

  "additionalProperty": [                          // ← fragrance.*                   ✍
    { "@type": "PropertyValue", "name": "Concentration", "value": "…" },
    { "@type": "PropertyValue", "name": "Top Notes",     "value": "…" },
    { "@type": "PropertyValue", "name": "Heart Notes",   "value": "…" },
    { "@type": "PropertyValue", "name": "Base Notes",    "value": "…" },
    { "@type": "PropertyValue", "name": "Longevity",     "value": "…" },
    { "@type": "PropertyValue", "name": "Sillage",       "value": "…" }
  ],

  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home",               "item": "https://siwafragrances.com/" },
      { "@type": "ListItem", "position": 2, "name": "Original Creations", "item": "https://siwafragrances.com/collections/original-creations" },
      { "@type": "ListItem", "position": 3, "name": "Mawj",               "item": "https://siwafragrances.com/products/mawj" }
    ]
  }
}
```

> **`hasVariant` is generated from the variants, never authored.** `mawj` has 3;
> `layering-30-ml-bundle` has **12**. Mean 2.82 per product, 158 in total.

---

## 3. `reviews.*` — the one thing we do not write

| Key | Type | Written by |
|---|---|---|
| `reviews.rating` | `rating` (`{ value, scale_min: 1, scale_max: 5 }`) | **Judge.me** |
| `reviews.rating_count` | `number_integer` | **Judge.me** |

`03-DATA-SCHEMA.md §9.1` names both, and `reviews` is the namespace Judge.me writes to when the
feature is enabled. **Do not create a parallel namespace and copy numbers by hand** — they will be
stale within days.

Today ratings reach the storefront only as HTML data attributes
(`data-shop-average-rating="4.98"`, `data-number-of-reviews="…"`) and never enter the structured
data at all (`03-DATA-SCHEMA.md §7`).

> ⚠️ **Before promoting the figure off-site:** 804 of the 820 reviews are 5★, none is below 4★, and
> the app runs with `autopublish: false` (manual approval).
> `../reference-analysis/06-REVIEWS.md §4` sets out five ranked mechanisms that could explain the
> distribution. The `aggregateRating` markup is technically correct; using the number in outside
> advertising is a separate decision.
>
> For the same reason `../Planning/DIRECTION.md Part 2 §7` rejects Oakcha's AI review summaries.

---

## 4. `gtin` — 10 invalid values reaching Merchant Center

Shopify converts `barcode` to `gtin` automatically when it is 12, 13 or 14 characters. The merchant
filled `barcode` with free text:

| Product | Value | Emitted as |
|---|---|---|
| `bare-glow` | `Bare Glow 30ml` | **`gtin`** (14 chars) |
| `sweet-oud` | `Sweet Oud 30ml` | **`gtin`** |
| `gourmet` | `Gourmet 30ml` | **`gtin`** (12 chars) |
| `coffee-vanilla` · `marshmallow` · `silk-vanilla` · `vanilla-91` · `sweet-rum` · `silk-vanilla-body-lotion` | free text | `mpn` |

`hot-male`'s 100 ml variant carries the 50 ml string. **Clear `barcode`**, or set a real EAN, and
never emit `gtin` for a non-numeric value.

---

## 5. Other pages

| Page | Today | Target |
|---|---|---|
| Home | `BreadcrumbList` + `WebSite` + `SearchAction` + a **minimal** `Organization` | extend `Organization`: `logo` · `sameAs` · `address` · `contactPoint` |
| Collection | `BreadcrumbList` only | `CollectionPage` + `ItemList` |
| Content pages | `BreadcrumbList` only | `WebPage`, and `FAQPage` where there are questions |

`Organization` currently carries a name and a URL — no logo, no social profiles, no address —
**despite the address being present in `raw/meta.json`** (`New Cairo` / `Cairo` / `EG`).

And a smaller irritant: **no favicon is declared anywhere on the store**
(`../reference-analysis/README.md §3`).

---

## 6. `description` — a small thing that hurts

Today `description` is `body_html` with tags stripped and **entities left undecoded**, so
`"Bitter Orange &amp; Lemon"` appears literally in the JSON, and double newlines from list items
leave ragged whitespace.

After migration the source is `story.the_vibe` — clean authored text — not a stripped HTML dump.
