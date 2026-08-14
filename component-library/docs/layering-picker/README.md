# Layering picker / bundle builder

## Purpose
Guides a customer to buy two scents that work together, and adds both in one action.

**Why it exists:** Layering Vanilla is the store's most-reviewed product — **98 reviews at 5.00★**
(`_CORRECTIONS.md` §1) — and the site offers **no guidance at all** on what to layer it with.
References: Snif's layering bundles, Skylar's quiz-to-combo output (`DIRECTION.md` Part 2).
Commerce mechanics follow Snif, not Amouage — when they disagree, Snif wins on price register.

## Variants

| # | Name | When to use |
|---|---|---|
| 1 | Step flow | Most guided. Base, then partner, then add both. |
| 2 | Dropdown | Fastest. Two selects, live total, one button. |
| 3 | Quiz-driven | Reads a quiz result and presents the matched pair. |
| 4 | Grid pairing | All compatible products as cards; pick one from each. |
| 5 | Guided recommendation | "Start with the most loved, then choose" + a reason per partner. |

## ⚠ Compatibility data does not exist

There is no metafield recording which scents layer well together, and the store has **zero** custom
metafields. Partners come from `partner_collection` — a **merchant-curated collection** — which is
the honest design: a human decided, rather than an algorithm implying data nobody collected.
`layering_reason` is likewise merchant-authored per partner, via blocks.

## ⚠ No discount is actually applied

`bundle_discount` renders a **message only**. Discounting a pair requires a cart-level Shopify
Function or an automatic discount configured in the admin. Rendering a saving that checkout will
not honour is worse than rendering none, so this module does not. **Configure the real discount
before turning the message on.**

## Settings

| Setting ID | Type | Label | Default |
|---|---|---|---|
| `base_collection` | collection | Base scents | — |
| `partner_collection` | collection | Layer-with scents | — |
| `picker_style` | select | Style | `steps` |
| `bundle_discount` | number | Discount % (message only) | — |
| `blocks` | array | Guided partners + reasons | — |

## Accessibility
- Selection uses real `<input type="radio">` inside `<label>`, so keyboard and screen reader work
  without JS. The `.pick__box` is the visual only.
- The running total is `aria-live="polite"` — it changes without a page event.
- The status line is `role="status"`, and **failures are announced**. A silent catch would make a
  failed add look like a successful one.

## Implementation note
Both variants are added in **one** `/cart/add.js` request with an `items` array. Two sequential
requests can interleave and drop a line, and a failure halfway leaves the customer holding half a
bundle.
