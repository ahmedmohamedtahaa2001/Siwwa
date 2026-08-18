# phlur-clone

A six-agent pipeline that extracts phlur.com's layout system and emits it as a
Shopify theme fragment for Siwa Fragrances.

```bash
node agents/orchestrator.mjs              # analyse → map → build → validate → verify
xvfb-run -a node agents/orchestrator.mjs --inspect   # also re-crawl phlur.com
```

`--inspect` **requires `xvfb-run` and real Chrome.** phlur.com sits behind a
Cloudflare bot challenge that headless Chromium never clears — it serves
"Just a moment…" indefinitely. `chromium.launch({ headless: false, channel: 'chrome' })`
under a virtual display passes it.

## Agents

| # | File | Does |
|---|---|---|
| 1 | `inspector.mjs` | Crawls a page, dumps DOM + computed styles + CSS + assets + screenshots |
| 2 | `analyzer.mjs` | Derives palette, type scale, spacing scale, shape/elevation, breakpoints, section & component inventory |
| 3 | `mapper.mjs` | Measures the exact components to rebuild; reconciles each against `siwa-design-system`, logging every override |
| 4 | `builder.mjs` + `builder-liquid.mjs` | Emits CSS assets and Liquid sections/snippets/templates |
| 5a | `validator.mjs` | Runs Siwa's own CI rules + WCAG 2.2 AA contrast |
| 5b | `verifier.mjs` | Renders the output in a browser and diffs geometry against the measured phlur values |
| 6 | `orchestrator.mjs` | Runs 2→5b and writes `reports/final-report.json` |

## Results

- **Geometry vs phlur.com: 26/26 checks pass** (`reports/verification.json`)
- **Siwa CI rules: 0 errors, 0 warnings** (`reports/validation.json`)
- **`shopify theme check`: 17 files, 0 offenses**
- **RTL verified** — badges, cards and head rows mirror; no horizontal overflow

## What was measured (not assumed)

phlur.com turned out to be a Shopify store on a Dawn-derived theme, and far
closer to the Siwa design system than its reputation suggests:

| Property | Measured on phlur.com |
|---|---|
| `border-radius` | `0px` on 1344 of 1355 elements (`50%` on 10 icon buttons, `5px` once) |
| `box-shadow` | exactly **one** on the page — the cart-drawer scrim |
| Palette | achromatic: `#fafafa`, `#000`, `#f5f5f5`, `#fff`; zero cool-hue backgrounds |
| Spacing base | 5px / 10px (60.6% fit) |
| Breakpoints | `max-749` / `min-750` / `max-989` (Dawn defaults) |
| Hero | 623px tall, 44px/600 uppercase heading at 0.96px tracking, **1** CTA |
| CTA | 130×40, `padding-inline: 30px`, 12px uppercase at 0.8px tracking, 0 radius |
| Badge | 19px tall, 4px/6px padding, 11px uppercase at 0.7px tracking |
| Product card | 299.5×420, 1:1 media on `#f5f5f5`, 0 radius, no shadow |
| Carousel | flex, 20px gap, overflow-x auto, 1265px container |

So Phlur's geometry *already* satisfies Siwa principle 3 (stamped, not rounded)
and rule 4 (no shadow outside the modal layer). The conflicts are palette,
spacing base, and fonts — not shape.

## Override ledger

Seven documented deviations (`mapping/overrides.json`). Per your instruction,
Phlur fidelity wins on design decisions:

| # | Property | Resolution |
|---|---|---|
| 1–3 | background / surface / text colour | **Phlur** — achromatic greys instead of Siwa's warm family |
| 4 | spacing base | **Phlur** — 5px scale as `--pl-space-*`, Siwa's `--spacing-*` untouched |
| 5–6 | display + body font | **Substituted** — `aktiv-grotesk-extended` and `ABCRepro` are licensed and are not redistributed; Inter carries the same weight and tracking |
| 7 | direction | **Siwa** — logical properties throughout. Free in LTR, and the only way these sections survive Arabic |

### Two places I did not follow "match Phlur"

Both are accessibility floors, not style choices:

1. **Muted text.** Phlur ships `#808080`, which measures 3.78:1 on its own page
   background and 3.62:1 on its card surface — below the WCAG 2.2 AA 4.5:1 floor.
   Copying it faithfully would inherit an accessibility defect. `--pl-ink-muted`
   is `#707070` (4.74:1 / 4.54:1), a 16-step shift. Phlur's exact value is kept as
   `--pl-ink-muted-phlur-exact` if you want it.

2. **Tap targets.** Phlur's 40px button is under the 44×44 floor. The visual box
   stays 40px to match; `.pl-button::after` extends the hit area to 44px.

## Reverting to the Siwa palette

The overlay is designed to be removable. Every colour is a `--pl-*` token in
`assets/phlur-siwa-tokens.css` with its Siwa equivalent in the adjacent comment.
Repoint those six values at `var(--colors-*)` and you get Siwa's warm palette on
Phlur's layout, with no other edit.

## Install

```
assets/     → theme/assets/
sections/   → theme/sections/
snippets/   → theme/snippets/
templates/  → theme/templates/
```

Then in `layout/theme.liquid`, before `</head>`, **in this order**:

```liquid
{{ 'siwa-tokens.css'       | asset_url | stylesheet_tag }}
{{ 'phlur-siwa-tokens.css' | asset_url | stylesheet_tag }}
```

Sections carry `{% schema %}` blocks and presets, so they are editable in the
theme customizer.

## Known gaps

- **Not built:** cart drawer, search overlay, filters/sort on collection, mega-menu
  panel, mobile nav drawer JS. The header renders a burger button with correct
  ARIA but no drawer is wired to it.
- **Product photography and copy are Phlur's.** The templates ship with their
  wording as placeholder text (`Vanilla Canyon`, `Bestsellers`). Replace before
  going live — that is their content, not layout.
- **Carousel is CSS scroll-snap only.** No prev/next buttons or autoplay.
- **`pl-main-product` variant picker** renders radio inputs but has no JS to swap
  the gallery or update price on selection.
