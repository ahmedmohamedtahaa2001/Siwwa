# Product template — `/products/<handle>`

**Reference pages:** `/products/lost-on-you` (sold out, 3 sizes), `/products/vanilla-91` (in stock, 1 size)
**Height:** 4005px @1440

## Section stack

| # | Section | Height | Content |
|---|---|---|---|
| 1 | `main` | 1320px | Media + buy box + description |
| 2 | Judge.me | 984px | `Customer Reviews` |
| 3 | `related-products` | 625px | `Related products` carousel |
| 4 | `text-with-icons` | 275px | Trust row |
| 5 | `footer` | 607px | |

## Buy box order

1. **Title** — uppercase, 22px, letter-spacing 3.96px
2. **Price** — `LE 750.00`
3. hairline divider
4. **Vendor line** — e.g. `LOST IN PARIS ROJA` (see below)
5. **Size** — square block swatches: `30 ml` `50 ml` `100 ml`
6. **Size chart** link
7. **Stock state** — `Out of stock`, red italic
8. **Add to cart** / `SOLD OUT` — full width
9. **Description**

## The `vendor` field is an inspiration reference

This is the single most important thing to understand about the catalogue. Siwa is an
*inspired-by* house, and the Shopify `vendor` field does not hold "Siwa Fragrances" — it holds the
designer fragrance each scent references, and **this is printed on the product page and on every
product card**:

| Siwa product | `vendor` value shown on-site |
|---|---|
| Lost On You | Lost In Paris Roja |
| Drunk Gold | Angels' Share Paradis |
| Lady Killer | Layton PDM |
| Mawj | Siwa Fragrances |
| Irresistible Vanilla | Siwa Original Creation |
| Soiree | Grand Soir MFK |
| Citrine | Tygar Bvlgari |

46 distinct vendor values across 60 products. Two of them (`Siwa Fragrances`,
`Siwa original creation`) mark the house's own compositions; the other 44 name third-party
fragrances. Any rebuild has to decide deliberately whether to keep surfacing this field, and where
it belongs in the data model — it is currently doing the job of a "inspired by" attribute while
occupying the slot Shopify, Google Merchant Center and schema.org all read as *brand*.

The emitted `Product` JSON-LD sets `brand` from this field, so structured data currently tells Google
that "Lost On You" is a product by the brand "Lost In Paris Roja".

## Description template

The intended content pattern is four blocks:

```
Persona     — one or two lines on who the scent is for
The Story   — narrative paragraph(s)
Notes       — Top Notes: … / Heart Notes: … / Base Notes: …
Best For    — occasions and seasons
```

Coverage across the 60-product catalogue:

| Block | Products containing it |
|---|---|
| Persona | 6 / 60 |
| The Story | 6 / 60 |
| Notes | 14 / 60 |
| Best For | 11 / 60 |

Every product has *some* description (none under 50 characters), but the structured template is the
exception, not the rule. The description renders as one flat block — there are no accordions or tabs.

Observed copy defect on `lost-on-you`: `Date nights and special occasionsCooler weather` — two list
items concatenated without a separator.

## Media

- 54 / 60 products have **exactly one image**; 3 have two, 3 have three.
- Dominant asset size 1080×1080 (56 images). Outliers: 1600×1600, 1350×1350, 1755×1755, 1151×2048.
- Fragrance notes (`Mandarin`, `Musk`, `Pink Pepper`, `Cashmere`) are **rendered into the photograph**
  in an italic serif — a typeface that appears nowhere in the CSS.
- Shopify CDN serves WebP by content negotiation (verified: 124KB WebP vs 179KB JPEG for the same
  asset), so image weight is already handled.
- Card hover is meant to swap to a second image; with 90% of products having one image, that
  interaction is inert across most of the catalogue.

## Variants

170 variants over 60 products. Standard ladder is `30 ml / 50 ml / 100 ml`; body splash is `125ML`;
body lotion `120 ml`. The `Layering bundle` is the outlier at 12 variants (3 × 3 size combinations).

**Option naming is inconsistent** — 20+ distinct spellings of what should be one option:

| Option name | Values | Count |
|---|---|---|
| `size` | `100 ml / 50 ml / 30 ml` | 33 |
| `Size` | `30 ml / 50 ml / 100 ml` | 10 |
| `size` | `125ML` | 4 |
| `silk vanilla (size)` | `125ML` | 1 |
| `Silk Vanilla Body Lotion ( size )` | `120 ml` | 1 |
| `layering vanilla (size)` | `30ML / 50ML / 100ML` | 1 |
| `Layerng Pistachio` | `30ML / 50ML / 100ML` | 1 |
| `Boujee Blush (size)` | `50ML` | 1 |
| `size` | `100 / 50 ml / 30 ml` | 1 |

Problems visible in that table: casing (`size` vs `Size`), unit format (`100 ml` vs `100ML` vs
`100`), the product name embedded in the option name, and a typo (`Layerng`). Because Shopify facets
and variant pickers key on option name, this is why a size filter cannot currently be offered.

## Issues found

| Severity | Issue |
|---|---|
| **High** | `vendor` holds a third-party fragrance name, which propagates into `Product` JSON-LD as `brand`. |
| **High** | Option names are inconsistent across 20+ variations, blocking any size-based faceting. |
| **High** | 58 / 60 product `<title>` tags are the bare product name. Only `purevelle` and `sundaze` use the intended pattern — `Purevelle Perfume \| Xerjoff Erba Pura Alternative in Egypt`. That pattern is exactly right and should be applied catalogue-wide. |
| Medium | The 4-block description template covers 6–14 of 60 products. |
| Medium | 54 / 60 products have a single image — no packaging, scale, texture or lifestyle shots. |
| Medium | 56 / 170 variants have no SKU. |
| Medium | All 170 variants have `grams: 0`, so weight-based shipping rates are impossible. |
| Low | `Best For` list items concatenate without separators on at least one product. |
| Low | Product titles vary in case (`summer elegance`, `Lady killer`, `Iris elixir`, `Mango on woods`). |
