# `homepage-phlur/` — Siwa homepage on Phlur's structure

A second homepage composition, built to the layout of **phlur.com** and rendered entirely in
Siwa's own design system. It sits alongside `homepage/` rather than replacing it — the two are
different structural bets on the same catalogue and the same component library.

| | |
|---|---|
| **Reference** | `../reference-phlur/PHLUR-SPEC.md` — the measured capture this is built from |
| **Design system** | `../Planning/DesignSystem.md` via `../component-library/css/tokens.css` |
| **Catalogue** | `../component-library/js/data.js` — the real 56 products |
| **Feature codes** | `../feature-doc/index.html` |

## What is cloned, and what is not

**Cloned** — section order, geometry, rhythm, grid configuration, component anatomy, breakpoints.
Every number is measured and reproducible from `../reference-phlur/phlur-measure-1440.json`.

**Not cloned** — colour, type families, imagery, copy. Phlur is a cold neo-grotesque monochrome
(`#fafafa` / pure black / extended grotesque / mono UI). Siwa is a warm desert system (cream,
gold, Cormorant + Inter, Arabic faces). CLAUDE.md §1.2 puts the project's own direction above any
imported reference, and §2 rule 3 requires consuming tokens rather than literals. The two systems
happen to agree on one thing — **0px radius** — so the sharp-cornered language carries over
without argument.

The result is Phlur's *skeleton* wearing Siwa's *skin*.

## Files

```
homepage-phlur/
├── index.html        Ten mount points, nothing else. No copy, no styling.
├── css/phlur.css     Layout layer. Geometry and rhythm only; no colour literals.
├── js/config.js      EVERY merchant-editable value. Bilingual {en, ar} throughout.
└── js/render.js      Behaviour only. Composes ../component-library/.
```

## Composing, not forking

`../component-library/` is consumed verbatim. The chrome is the library's own components —
**AnnouncementBar** (`.annbar`), **Header** (`.hdr` / `.hdr__bar` / `.hdr__nav`, bilingual
wordmark, six-item merchandising nav) and **ProductCard** — and `css/phlur.css` only re-lays them
out onto Phlur's gutter and bar heights. Same contract `homepage/` uses.

### One card, everywhere

The library's `.pcard` is used **whole and identically** in every rail: surface, border, padding,
subtitle, title, notes, star row, and price + Add-to-bag foot. Nothing hidden, nothing re-ordered.

This deliberately gives up Phlur's card anatomy (bare card, square image, merged `ADD · price`
control). One card design across the whole storefront beats matching the reference section by
section. The rail adds only what a fixed-width track needs: equal heights, a two-line clamp on
`.pcard__notes` (which runs from empty to a full paragraph across the real catalogue), and a
`margin-top:auto` foot so prices align across the row.

## The cinematic hero

Built to `skills/epic-design`. Its decision engine maps "hero with big title" to **6-layer
parallax + pinned sticky**, with a masked line reveal on the type — which is what this is.

- `.scene` is 200vh; `.scene__stage` pins inside it under the sticky header
- six `.layer` elements carry `data-depth` 0–5 and the skill's parallax/blur/scale table
- Ken Burns scrubs the subject 1.06 → 1.16 against scroll progress
- copy wipes up line by line through per-line clipping masks
- every decorative layer is `aria-hidden`; only the copy layer is in the a11y tree

**Vanilla rAF, not GSAP.** The skill suggests a GSAP CDN; CLAUDE.md §2 states this project has no
build step and no dependencies, and `homepage/js/homepage.js` already runs its parallax "off a
single rAF loop". Matching the existing convention outranks the imported skill's tooling
preference (CLAUDE.md §1.2).

**Asset honesty.** The skill puts product images at depth-3 and backgrounds at depth-0. Siwa has
flat photographs, not cut-out PNGs, so the *same* photograph serves both — an over-scaled blurred
copy behind, the sharp frame in front. That is a real backdrop technique, but true layer
separation would need a cut-out subject the repo does not have.

Under `prefers-reduced-motion` or on a coarse pointer the engine never arms: the scene collapses
to a still frame at the measured hero height, with the copy shown immediately.

## Zero hardcoded values

`js/config.js` holds all copy, links, product selection, image names, alt text, layout geometry,
type roles, scrim strengths and SEO. Each top-level key maps 1:1 to a future `{% schema %}`
section; each repeating list is an array, so it becomes schema **blocks**, never a fixed loop.

`css/phlur.css` contains no colour literal. Radius reads `--r-md` and never restates it.

### One architectural rule worth knowing

`render.js` compiles `config.layout` and `config.type` into a generated
`<style id="phGeometry">` holding `:root` plus one block per breakpoint — **not** inline custom
properties on `documentElement`. An inline custom property outranks every stylesheet rule
regardless of media query, so setting geometry inline silently kills the entire responsive layer.
The media queries in `css/phlur.css` therefore carry structural rules exclusively (which elements
exist, how many grid tracks, stacking direction) and never token values, so there is one source of
truth per concern.

## Bilingual

One toggle flips `dir`, type families, numerals (Arabic-Indic), layout mirroring, `<title>`, meta
description, canonical and JSON-LD. Verified in both directions with no console errors.

Product **titles** stay Latin in Arabic because the catalogue has no Arabic title field — that is
a data gap tracked in `../data-schema/`, not a rendering bug.

## Running it

Serve from the **`Siwa/` root**, never from this folder — the page reaches up into
`../component-library/`:

```bash
python3 -m http.server 8803 --bind 127.0.0.1 --directory /ahmed-taha-dev/Siwa
# → http://127.0.0.1:8803/homepage-phlur/index.html
```

## Verification

Geometry, responsive and contrast results are in `../reference-phlur/PHLUR-SPEC.md §6`.
Summary: 14 of 17 measured values exact at 1440, every measured value exact at 768, all overlay
copy clears its WCAG AA floor at its worst pixel, zero console errors, no horizontal overflow.

## Two CSS traps worth knowing

Both cost real debugging time and both look fine in computed styles while being broken on screen.

**`overflow-x: hidden` on `<body>` silently kills `position: sticky`.** Any non-`visible`
overflow other than `clip` makes the body a scroll container, so sticky resolves against the body
— which scrolls away with the page. The header and the pinned hero stage both stopped sticking.
`overflow-x: clip` contains the rail bleed without creating a scroll container.

**A sticky element can only travel inside its own parent's box.** `.hdr` computed to
`position: sticky` and still scrolled off, because its `#sec-header` mount is exactly
header-height. `display: contents` on the mount collapses it out of the box tree and gives the
header the whole page to stick across. Reading the computed property is not a test — scroll and
measure.

## Note on the shared library

Building this surfaced two latent defects in `../component-library/js/library.js` that broke
**any** consumer page (including `homepage/`): the gallery-only `render()` and the `toast()`
helper both assumed gallery DOM (`#content`, `#toast`) and threw on every locale switch. Both now
guard for a missing host, matching the guard the file already used at its boot call. The gallery
is unaffected — verified at 86 sections with the toggle working in both directions.

`../component-library/css/tokens.css` also gained `--ink-rgb: 33, 32, 18` — not a new colour, the
same Black Mesa value in the channel notation `rgb()` needs when a scrim requires a variable
alpha. It removes the last colour literal from this page's stylesheet.
