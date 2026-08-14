# `pdp-phlur/` — Siwa product page on Phlur's structure

A product detail page built to the measured layout of **phlur.com's PDP** and rendered entirely in
Siwa's own design system. It sits alongside `homepage-phlur/` as the second half of the same
structural bet, and consumes the same component library.

| | |
|---|---|
| **Reference** | `../reference-phlur/pdp/PHLUR-PDP-SPEC.md` — the measured capture this is built from |
| **Design system** | `../Planning/DesignSystem.md` via `../component-library/css/tokens.css` |
| **Catalogue** | `../component-library/js/data.js` — the real 56 products |
| **Feature codes** | `../feature-doc/index.html` — A-05, B-02, B-03, B-04, B-05, B-06, C-02, D-01, D-02, D-03, D-04, F-03 |

## What is cloned, and what is not

**Cloned** — band order, hero split, buy-box element order, accordion anatomy, the scent-note
band, the sticky CTA, rhythm, geometry, breakpoints. Every number is measured and reproducible
from `../reference-phlur/pdp/measure-phlur.json`.

**Not cloned** — colour, type families, imagery, copy. `CLAUDE.md §1.2` puts the project's own
direction above any imported reference, and §2 rule 3 requires consuming tokens rather than
literals. The two systems agree on **0px radius**, so the sharp-cornered language carries over
without argument.

Phlur's *skeleton* wearing Siwa's *skin* — the same sentence that describes `homepage-phlur/`.

## Files

```
pdp-phlur/
├── index.html      Twelve mount points, nothing else. No copy, no styling.
├── css/pdp.css     Layout layer. Geometry and rhythm only; no colour literals.
├── js/config.js    EVERY merchant-editable value. Bilingual {en, ar} throughout.
└── js/render.js    Behaviour only. Composes ../component-library/.
```

## Band order

Phlur's stack, with one Siwa insertion:

| # | Band | Feature |
|---|---|---|
| 1 | announcement | |
| 2 | header | |
| 3 | breadcrumbs | A-05 |
| 4 | hero — gallery + sticky buy box | B-06, B-04, D-03, D-04 |
| 5 | scent notes | B-02 |
| 6 | **intensity & sillage** ← *Siwa addition, no Phlur counterpart* | B-03 |
| 7 | the collection rail | F-03 |
| 8 | quote | B-05 |
| 9 | reviews | D-02 |
| 10 | you may also like | F-03 |
| 11 | sticky CTA | |
| 12 | footer | |

Band 6 exists because `DIRECTION.md Part 2 §3.1` requires it in the Oakcha PDP module order.
Phlur has no equivalent, so its geometry is Siwa's own — and it **ships hidden**, because the
metafields behind it do not exist yet (below).

## Composing, not forking

`../component-library/` is consumed verbatim. `ProductCard`, `Stars`, `Price`, `VariantSelector`,
`NotePyramid`, `IntensityScale`, `ReviewSummary`, `ReviewList` and `Crumbs` come from
`window.SIWA.ui`; the library's own classes keep the library's own styling. `css/pdp.css` only
*re-lays-them-out* — the contract `homepage-phlur/` uses.

The one component delta worth naming: Phlur merges add-to-cart and price into a **single
full-width control** with the compare-at struck through inside the button. The homepage build
found the library's `.pcard__foot` already had that shape; here the buy box needs a full-width
variant, so `.pdp-atc` is a page-level layout of the same idea, not a second component.

### One change to the shared library

`ui.Crumbs` accepted only strings and hardcoded `href="#Breadcrumbs"` on every crumb, which made
working breadcrumbs (feature A-05) impossible for any consumer. It now accepts **either** a string
**or** `{label, href}`. The change is additive and backwards compatible — the component gallery,
the sections gallery, `homepage/` and `homepage-phlur/` were all re-rendered afterwards with zero
console errors. Per `component-library/docs/README.md`: a style or behaviour a snippet needs gets
added to the library, never worked around in the page.

## Zero hardcoded values

`js/config.js` holds all copy, links, product selection, image names, alt text, layout geometry,
type roles, feature toggles and SEO. Each top-level key maps 1:1 to a future `{% schema %}`
section; each repeating list is an array, so it becomes schema **blocks**, never a fixed loop.

`css/pdp.css` contains **no colour literal** — grep it. Radius reads `--r-md` and never restates
it. Every geometric value arrives as a `--pdp-*` custom property compiled from `config.layout`,
including the ones with no Phlur counterpart (`scentRailThumb`, `trustIconSize`,
`scalesMaxWidth`, `reviewsSummaryCol`, `stickyCta.ctaMinWidth`).

The product is referenced **by handle only**; title, price, rating, review count, notes, sizes and
stock resolve at render time from the catalogue. `?handle=<handle>` renders any of the 56.

### The architectural rule inherited from the homepage build

`render.js` compiles `config.layout` and `config.type` into a generated `<style id="pdpGeometry">`
holding `:root` plus one block per breakpoint — **not** inline custom properties on
`documentElement`. An inline custom property outranks every stylesheet rule regardless of media
query, so setting geometry inline silently kills the responsive layer. The media queries in
`css/pdp.css` therefore carry structural rules exclusively and never token values.

## The two-register firewall

`DIRECTION.md Part 2 §5` and `data-schema/README.md §3`: originals (16) and inspired-by (40) are
not the same page.

`render.js` derives the register from the catalogue and **refuses the inspired-by block for an
original in code** — it is not a configuration option, because it is not a merchant choice.
Verified in the running build:

| Product | Register | Inspired-by block |
|---|---|---|
| `pink-allure` | original | **absent** |
| `coco-woods` | inspired | present — house + fragrance + disclaimer |

## ⚠ B-04 — the retail-price line is off, deliberately

`config.hero.inspiredBy.showRetailPrice` ships **`false`** and must stay false until counsel
clears the retail-price comparison.

`feature-doc §06` lists the dupe posture as a blocking decision; `data-schema/04-inspired-by.md`
marks `inspired_by.retail_price_egp` as "schema yes, values no, pending counsel"; and the
catalogue's own `originalPrice` is flagged illustrative, not sourced. The existing Liquid PDP
(`siwa-theme/sections/main-product.liquid`) defaults its equivalent `show_retail_price` to false
for the same reason, so this build matches it rather than diverging.

The module ships and works without that third fact: it names the house and the fragrance, and
carries the "independent interpretation / not affiliated" disclaimer.

**This is the one place the build deliberately does less than asked.** A "you save X%" line was
requested; it is blocked by project policy, not by effort. Flip one boolean when counsel clears.

## Bilingual

One toggle flips `dir`, type families, numerals (Arabic-Indic), layout mirroring, `<title>`, meta
description, canonical, hreflang and JSON-LD. Verified in both directions at three viewports with
zero console errors and no horizontal overflow.

Two honest gaps, both data and neither invented:

- **Product titles stay Latin in Arabic** — `identity.title_ar` is unpopulated across the
  catalogue. Tracked in `../data-schema/`. The same gap `homepage-phlur/` recorded.
- **Notes and descriptions stay English in Arabic** — there are no `_ar` values for them yet.

## Feature D-01 — `aggregateRating`

The live store emits `aggregateRating` on **zero of 56** PDPs; `BENCHMARK.md Part 1 §2` calls it
the audit's #1 finding. This build emits it, along with `Product` and `BreadcrumbList` JSON-LD,
rebuilt from the catalogue on every locale switch.

## Running it

Serve from the **`Siwa/` root**, never from this folder — the page reaches up into
`../component-library/`:

```bash
python3 -m http.server 8815 --bind 127.0.0.1 --directory /ahmed-taha-dev/Siwa
# → http://127.0.0.1:8815/pdp-phlur/index.html
# → http://127.0.0.1:8815/pdp-phlur/index.html?locale=ar
# → http://127.0.0.1:8815/pdp-phlur/index.html?handle=coco-woods
```

## Verification

| Check | Result |
|---|---|
| Geometry vs reference, 1440 / 768 / 375 | **69 / 69 exact** |
| Console errors, 6 viewport × locale combinations | **0** |
| Horizontal overflow, same 6 | **none** |
| Colour literals in `css/pdp.css` | **0** |
| Content strings in `render.js` / `index.html` | **0** (bar the pre-JS skip link, matching `homepage-phlur/`) |
| Register firewall | enforced in code, verified both ways |
| Other library consumers after the `Crumbs` change | gallery, sections, `homepage/`, `homepage-phlur/` — all clean |

Full evidence: `../reference-phlur/pdp/PHLUR-PDP-SPEC.md §5`.

## Two bugs worth remembering

Both were found by measurement, not by looking:

1. **`left: -9999px` on a skip link breaks RTL.** In an RTL document the inline-start side is the
   right, so the offset lands inside the scrollable overflow and inflated
   `documentElement.scrollWidth` to 11,439px — a horizontal scrollbar across the whole Arabic
   page, from the one element meant to be invisible. Hide skip links **vertically**.
2. **A bare `1fr` grid track will not shrink.** Its minimum resolves to min-content, so a long
   trust label inside the buy box pinned the hero open at 536px inside a 335px viewport. Every
   grid in this file uses `minmax(0, …)`.
