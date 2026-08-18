# Collection template — `/collections/<handle>`

**Reference page:** `/collections/perfumes` · 38 live products · height 3292px @1440

## Layout

```
┌──────────────────────────────────────────────────────────────┐
│ announcement bar (40px)                                      │
│ header — logo centred, icons right, nav row below (153px)    │
├──────────────────────────────────────────────────────────────┤
│ [▦▦▦ density]        38 PRODUCTS              SORT BY ▾      │  toolbar
├──────────────┬───────────────────────────────────────────────┤
│ AVAILABILITY▾│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐              │
│ PRICE      ▾ │  │card │ │card │ │card │ │card │              │  4-up @1440
│              │  └─────┘ └─────┘ └─────┘ └─────┘              │
│  (sticky)    │              …                                │
├──────────────┴───────────────────────────────────────────────┤
│ trust icons (275px) · footer (607px)                         │
└──────────────────────────────────────────────────────────────┘
```

**There is no page heading.** The template renders straight from the header into the toolbar — the
collection title appears only in the browser tab.

## Toolbar
- **Grid-density switcher** — three icons (2-up, 4-up, list)
- **Product count** — `38 PRODUCTS`, centred
- **Sort by** — custom dropdown, right-aligned

## Facets
Rendered twice: a `safe-sticky` sidebar (`.facets-sidebar`, `md-max:hidden`) at ≥1000px, and a
`facets-drawer` below that.

| Facet | Type | Values |
|---|---|---|
| Availability | checkbox | "In stock only" |
| Price | range | min / max, prefixed `ج.م` |

That is the entire filter set — two facets.

## Responsive behaviour (measured)

| Viewport | Columns | Row gap | Col gap | Filters | Nav |
|---|---|---|---|---|---|
| 375 / 480 | 2 | 35px | 10px | drawer | hamburger |
| 700 / 768 | 3 | 48px | 24px | drawer | hamburger |
| 1000 – 1280 | 3 | 64px | 48px | sticky sidebar | inline |
| 1440 / 1600 | 4 | 64px | 60px | sticky sidebar | inline |

## Product card
Image (1:1) → vendor/inspiration line → title → price → Judge.me stars.
`SOLD OUT` badge sits top-left in `#E32C2B`. Price reads `FROM LE 800.00` for multi-variant products
and `LE 380.00` for single-variant ones.

The fragrance-note words that appear at the four corners of each card image (`Citruses`, `Sea Water`,
`Wood`, `Fruits`…) are **baked into the image asset**, not markup — they are not selectable, not
translatable and not searchable.

## Live product counts vs. stored metadata

`collections.json` reports `products_count` values that substantially exceed the live catalogue,
because that figure counts products no longer published to the Online Store channel.

| Collection | Live | Metadata | Collection | Live | Metadata |
|---|---|---|---|---|---|
| perfumes | 38 | 82 | for-him | 37 | 84 |
| for-her | 34 | 81 | unisex | 25 | 51 |
| siwa-perfumes | 24 | 51 | best-sellers | 19 | 24 |
| new-drops | 17 | 31 | men-best-sellers | 17 | 17 |
| summer-collection | 21 | 22 | women-best-sellers | 11 | 11 |
| women-new-drops | 9 | 10 | men-new-drops | 8 | 8 |
| body-splash | 5 | 6 | original-creations | 4 | 8 |
| bundles | 3 | 11 | ramadan-drops | 1 | 6 |
| body-lotion | 1 | 1 | **gift-boxes** | **0** | 1 |
| **black-friday-2025** | **0** | 0 | | | |

The union of all collections is exactly the 60 live products, and every live product belongs to at
least one collection — so there are no orphans, but roughly a third of historical collection
membership now points at unpublished products.

## Issues found

| Severity | Issue |
|---|---|
| **High** | **18 of 20 collection pages have no `<h1>`** and no visible title. Search engines and screen-reader users get no page-level heading. |
| **High** | **20 of 20 collection pages have no meta description.** Titles are bare, lowercase handles (`perfumes`, `new drops`, `men new drops`) with no brand. |
| **High** | `/collections/gift-boxes` and `/collections/black-friday-2025` are live, in the XML sitemap, and **contain zero products**. |
| Medium | Only two facets. The catalogue supports gender, size, scent family and concentration — none are filterable. |
| Medium | No collection descriptions anywhere — `body_html` is empty for all 19 collections, so there is no indexable copy on any category page. |
| Medium | Price facet is labelled `ج.م` (Arabic) while every price on the site renders as `LE`. Two different currency symbols for EGP in one interface. |
| Low | `black-friday-2025` is a stale seasonal collection still exposed in the sitemap. |
| Low | Collection titles are inconsistently cased — `FOR HER`, `perfumes`, `men new drops`, `Body lotion`. |
