# Siwa — Component Documentation

Per-component reference for the **Shopify theme transplant**. Each folder documents one
component: what it is, its five variants, its settings, and how to render it in Liquid.

## How the layers relate

```
component-library/css/tokens.css      ← design tokens        ]
component-library/css/components.css  ← all component CSS    ] ONE source of truth
component-library/js/library.js       ← gallery renderers    ]
             │
             │  tools/build-theme-assets.sh  (copies, with provenance header)
             ▼
siwa-theme/assets/siwa-tokens.css
siwa-theme/assets/siwa-components.css
siwa-theme/snippets/*.liquid          ← render the SAME class names
component-library/docs/*/             ← you are here
```

**The theme contains no component CSS of its own.** A snippet that needs a style it cannot find
gets that style added to `component-library/css/components.css`, in the library's idiom, and the
assets are rebuilt. Never the other way round.

## Phase 1 — Primitives

| Component | Snippet | Library class | Status |
|---|---|---|---|
| [Button](button/) | `snippets/button.liquid` | `.btn` | Built |
| [Badge](badge/) | `snippets/badge.liquid` | `.badge` | Built |
| [Card](card/) | `snippets/card.liquid` | `.card` | Built — new component |
| [Input](input/) | `snippets/input.liquid` | `.field` `.input` | Built |
| [Chip](chip/) | `snippets/chip.liquid` | `.chip` | Built |
| [Image container](image-container/) | `snippets/image-container.liquid` | `.pimg` | Built |

## Phase 2 — Patterns

| Component | Snippet | Library class | Status |
|---|---|---|---|
| [Product card](product-card/) | `snippets/product-card.liquid` | `.pcard` | Built — firewall enforced in code |
| [Review card](review-card/) | `snippets/review-card.liquid` | `.review` | Built |
| [Collection card](collection-card/) | `snippets/collection-card.liquid` | `.ccard` | Built — new component |
| [Feature card](feature-card/) | `snippets/feature-card.liquid` | `.fcard` `.usp__i` | Built — new component |
| [Testimonial card](testimonial-card/) | `snippets/testimonial-card.liquid` | `.tcard` `.quote` | Built |
| [Note pyramid](note-pyramid/) | `snippets/note-pyramid.liquid` | `.pyramid` | Built — ⚠ data gap |

Supporting snippets added in Phase 2: `product-register` (the single place vendor is tested),
`price`, `star-rating`, `judgeme-preview-badge`.

## Phase 3 — Modules

| Component | Snippet | Library class | Status |
|---|---|---|---|
| [Product grid](product-grid/) | `snippets/product-grid.liquid` | `.pgrid` `.tabs` `.carousel` | Built |
| [Review widget](review-widget/) | `snippets/review-widget.liquid` | `.rsummary` | Built — ⚠ untested against live Judge.me |
| [Price contrast](price-contrast/) | `snippets/price-contrast.liquid` | `.inspired` `.ctable` | Built — ⚠ **defaults OFF, legal gate** |
| [Layering picker](layering-picker/) | `snippets/layering-picker.liquid` | `.layering` `.pick` | Built |
| [Scent quiz](quiz-flow/) | `snippets/quiz-flow.liquid` | `.quiz` `.qopt` | Built |
| [Heritage block](heritage-block/) | `snippets/heritage-block.liquid` | `.story` `.timeline` `.artisan` | Built |

Behaviour for tabs, carousel, layering and quiz lives in `siwa-theme/assets/siwa-modules.js`.

## Phase 4 — Sections

**24 sections**, each with a complete `{% schema %}`. See [sections/](sections/) for the map,
the two-template decision, and the accessibility notes. Detailed documentation lives in each
section's own `{% comment %}` header.

All four phases are built.

## The one exception to "the library owns everything"

CSS flows **library → theme**: `assets/*.css` are generated copies and the theme has no component
CSS of its own.

**JavaScript does not.** `siwa-theme/assets/siwa-modules.js` is hand-authored and is *not*
generated from anything. The library's `js/library.js` renders gallery demos and has no Shopify
runtime; the theme's JS drives the real Cart and Section Rendering APIs. They are different
programs solving different problems, and merging them would help neither.

What both obey: **no sentence is ever written in JavaScript.** Every message the module JS shows is
read from a `data-msg-*` attribute that Liquid populates from a locale key.

## Data gaps that constrain what can be built

| Gap | Figure | Blocks |
|---|---|---|
| Custom metafields on the store | **0** | note pyramid, price contrast, Arabic titles, layering compatibility |
| Products with machine-readable notes | **18 of 56** | note pyramid |
| Tier-label spellings to normalise | **13** | any notes migration |
| Verified original-retail prices | **none** | price contrast's price row |
| Defined Persona archetypes | **none** | quiz `persona` variant |
| Scent-compatibility data | **none** | layering picker (worked around with curated collections) |

None of these are markup problems. Each is resolved by a data or content decision.

## Where the two-register firewall is enforced

| Component | Mechanism |
|---|---|
| `badge` | Code. `authentic` on a non-Original downgrades to `new`. |
| `product-card` | Code. `editorial`/`vintage` downgrade to `minimal`; `accent_color` dropped. |
| `note-pyramid` | Merchant instruction. Heritage style is Originals-only. |
| `collection-card` | Merchant instruction — a collection has no vendor to test. |
| `feature-card` | Merchant instruction — content, not a product. |
| `testimonial-card` | Merchant instruction. |

All of them read the register from `snippets/product-register.liquid`. When the vendor/dupe
posture is decided (`PROJECT-CONTEXT.md` §7.4), that one file changes and every consumer follows.

## Conventions every component follows

1. **Zero hardcoded content.** No visible string is written in a snippet. Text comes from a
   `{% schema %}` setting or a `locales/` key. The only literals are class names, structural
   HTML and Liquid control flow.
2. **Tokens, never literals.** Colour, spacing and radius read CSS custom properties. Radius is
   currently sharp (`--r-md: 0`) per the 2026-08-12 client direction — read the token, never
   restate the value.
3. **Bilingual by default.** Direction, type family and numerals follow `request.locale`.
   Anything new must survive the toggle. Arabic carries equal visual weight, not fallback weight.
4. **RTL through logical properties.** `padding-inline`, `inset-inline-start`, `margin-inline`.
   A direction-specific rule is a last resort, used only for mirroring directional glyphs.
5. **The two-register firewall.** Cultural Accent colours may appear only on the 16 Originals and
   on heritage storytelling — never on the 40 inspired-by products.
   Source: `Planning/BENCHMARK.md` Part 2 §5.
6. **Reviews stay loud.** 4.98★ from 1,212 reviews (live, 2026-08-12) is the strongest
   competitive asset. No component may minimise it.
   Source: `reference-analysis/_CORRECTIONS.md`.

## Known accessibility findings

| Finding | Measured | Where |
|---|---|---|
| `--hairline` on `--canvas` as a control boundary | **1.71:1** — WCAG 1.4.11 requires 3:1 | `.input`, `.chip`, `.btn--secondary`, `.card--hairline` |
| Brief's `badge--bestseller` (gold text on canvas) | **3.19:1** — below the 4.5:1 text floor | Corrected in build to `--heading` label, 11.86:1 |

The first is pre-existing and affects the whole design system, so it has **not** been changed
unilaterally — `Planning/DesignSystem.md` is the spec and the spec wins until it is updated
deliberately. Darkening `--hairline` to roughly `#978b76` clears 3:1 on canvas. The value is
exposed as a theme setting so it can be changed without a code edit.
