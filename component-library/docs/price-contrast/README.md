# Price contrast / inspired-by

## Purpose
Shows the designer fragrance a product is inspired by, optionally beside its retail price.
Oakcha's price-contrast merchandising, adapted.

## ══ TWO DELIBERATE DEFAULTS — DO NOT "FIX" THEM ══

**1. `show_comparison` defaults FALSE.** Nothing renders until a merchant switches it on.

**2. `show_retail_price` is a SEPARATE setting and also defaults FALSE.** With it off the module
renders "Inspired by *House* *Fragrance*" and **no number**.

### Why

Making the dupe claim louder is a **legal posture decision**, not a design one. Oakcha operates in
the US; Siwa operates in Egypt. The brief is explicit: **get legal counsel before shipping the
retail price comparison.** The module works without the number, which is why the number is behind
its own switch.

Separately: the original-retail figures in the component library are **illustrative placeholders,
not sourced**. There is no verified retail price data anywhere in this repository. Turning
`show_retail_price` on without sourcing real figures publishes numbers nobody has checked.

This is the configuration you approved on 2026-08-13.

## ⚠ Inspired-by products only — enforced in code

Rendering this on one of the 16 Originals would claim a Siwa original is a copy of something. The
snippet resolves the register through `product-register.liquid` and **renders nothing on an
Original**, whatever the caller asks for.

## ⚠ The data does not exist yet

`inspired_by.*` metafields are a recommendation; the store has **zero** custom metafields
(`03-DATA-SCHEMA.md` §7). Today `house` falls back to `product.vendor`, which does hold the
designer fragrance name. `retail_price` has no source at all and will be blank — so even with both
switches on, the table's price row simply will not render.

## Variants

| # | Name | Class | When to use |
|---|---|---|---|
| 1 | Inline | `.inspired` | Default. One line under the PDP price. |
| 2 | Card callout | `.inspired--callout` | On a product card, where a full line would crowd the title. |
| 3 | Comparison table | `.ctable` | A dedicated comparison surface. |
| 4 | Storytelling | `.inspired--story` | Makes the case in prose. Works with no price data at all. |
| 5 | Minimal footnote | `.inspired--footnote` | Small print at the PDP foot. Quietest — and safest. |

## Settings

| Setting ID | Type | Label | Default | Notes |
|---|---|---|---|---|
| `show_comparison` | checkbox | Show comparison | **`false`** | Master switch |
| `show_retail_price` | checkbox | Show original retail price | **`false`** | ⚠ Legal gate |
| `contrast_style` | select | Style | `inline` | |
| `disclaimer` | text | Disclaimer | — | Trademark / comparison wording |
| `disclaimer_url` | url | Disclaimer link | — | |

## Accessibility
- The table uses a `<caption>` (visually hidden) and `scope` on every header, so the comparison is
  navigable by screen reader rather than being a grid of loose cells.
- The disclaimer is real text in the flow, not a tooltip.

## Before enabling in production
1. Legal counsel on the comparative-advertising posture in Egypt.
2. A sourced, dated set of retail prices — not the library placeholders.
3. A decision on the vendor/`inspired_by` metafield migration (`PROJECT-CONTEXT.md` §7.4).
4. Disclaimer wording approved by the same counsel.
