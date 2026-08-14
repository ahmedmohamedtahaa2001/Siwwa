# Product grid

## Purpose
Renders a list of products as cards. Powers collection pages, featured rows, related products,
recently viewed and search results.

## Variants

| # | Name | Class | When to use |
|---|---|---|---|
| 1 | Standard 4-up | `.pgrid` | Default. 4 / 3 / 2 / 1 at 1200 / 900 / 480. |
| 2 | Compact 6-up | `.pgrid--compact` | 6 / 4 / 3 / 2. Large catalogues where scanning beats dwelling. |
| 3 | Masonry | `.pgrid--masonry` | Varying heights. **Progressive enhancement — see below.** |
| 4 | Carousel | `.carousel` | One row, scroll-snap. "You may also like", recently viewed. |
| 5 | Tabbed | `.tabs` | Two or three collections in one slot. Real ARIA tabs. |

## ⚠ Masonry is progressive, not guaranteed

`grid-template-rows: masonry` is not yet supported in most browsers. The `@supports not` fallback
uses CSS columns, which orders cards **down-then-across** instead of across-then-down. That is
visual only — DOM order, and so reading and tab order, is unchanged. **Do not use masonry where
rank matters** (best sellers, "top rated").

## ⚠ The column-count trap — read before changing it

The merchant's column count arrives as an **inline** custom property. An inline `--grid-cols`
out-specifies every media query, which silently froze a 6-up grid at 6 columns on a 375px phone.

The fix: Liquid emits `--grid-cols-desktop`; the stylesheet derives `--grid-cols` from it in a
normal rule, so the breakpoints can still win. Verified at 375px: compact resolves to 2 columns,
standard to 1. **If you re-introduce an inline `--grid-cols`, mobile breaks again.**

## ⚠ Filtering and sorting are not here

Faceted filtering needs `collection.filters` and the Section Rendering API for AJAX updates — both
section-level. This snippet renders a grid of whatever it is handed. The Phase 4 `main-collection`
section wires the facets and re-renders it.

## Settings

| Setting ID | Type | Label | Default | Notes |
|---|---|---|---|---|
| `products` | array | — | — | Required (except tabbed) |
| `grid_style` | select | Layout | `standard` | |
| `columns` | range 2–6 | Columns (desktop) | 4 | Emitted as `--grid-cols-desktop` |
| `card_style` | select | Product card style | `minimal` | Passed to product-card |
| `show_reviews` | checkbox | Show reviews | `true` | |
| `limit` | number | Max products | — | |
| `blocks` | array | Tabs | — | Tabbed variant. Blocks, never a fixed loop |

## Usage

```liquid
{% render 'product-grid',
   products: collection.products,
   grid_style: section.settings.grid_style,
   columns: section.settings.products_per_row,
   card_style: section.settings.product_card_style,
   section_id: section.id %}
```

## Accessibility
- Tabs are **real ARIA tabs**: `role="tablist"`/`tab`/`tabpanel`, roving `tabindex`, and arrow,
  Home and End keys — with arrow direction reversed under RTL. Without the keyboard handling this
  is just a row of buttons.
- Inactive panels use `hidden`, not `visually-hidden`, so they stay out of the tab order.
- The carousel track is `role="region"` with `tabindex="0"`, so it can be scrolled by keyboard.
- Carousel buttons **disable at the ends** rather than wrapping — a silent no-op reads as broken.
- Prev and next render the same glyph, mirrored per-button; the mirroring swaps under RTL.

## RTL and bilingual
Carousel scrolling reads `scrollLeft` as negative-going in RTL and uses `Math.abs`. Tab labels take
an optional `tab_label_ar`.
