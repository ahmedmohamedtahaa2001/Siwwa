# Phlur.com — product detail page, structural reference capture

**What this folder is.** A read-only forensic capture of the phlur.com **PDP** layout, taken to
inform `pdp-phlur/`. It records **what Phlur's product page is**, in the same spirit as
`reference-analysis/` records what the live Siwa store is, and as `../PHLUR-SPEC.md` records the
Phlur homepage. It proposes nothing.

| | |
|---|---|
| **Targets** | 4 product pages — 1 bundle, 3 singles (below) |
| **Captured** | 2026-08-13 |
| **Source** | Wayback Machine snapshots — see the per-page table |
| **Why not live** | The live origin returns **403** to every automated client (Cloudflare). Verified again for this capture: all four product URLs, plain `curl` and Playwright alike. Identical to the homepage capture's finding |
| **Why not rendered from the archive** | `web.archive.org` serves a single `id_` document fine, but returns **HTTP 498** to a browser requesting a page *plus its ~30 subresources*. Rendering therefore runs against a local mirror (`raw/*.local.html`), built by `tools/mirror-phlur-pdp.py` |
| **Viewports** | 1440×900 · 768×1024 · 375×812 |
| **Platform** | Shopify, Dawn-derived theme (`shopify-section-*`, `--page-width`, swiper carousels). Reviews by **Okendo**, recommendations by **Rebuy** |

## Pages captured

| Handle | Snapshot | Type | Why |
|---|---|---|---|
| `vanilla-cream-duo-body-mists` | `20260507071628` | bundle | the primary target |
| `missing-person-50ml` | `20260714051904` | single | most recent capture; the only one with a populated Scent Notes band |
| `solar-power-50ml` | `20250916135128` | single | older snapshot, for pattern validation |
| `apricot-privee-50ml` | `20250624153557` | single | older snapshot, for pattern validation |

The requested handles `missing-person`, `solar-power` and `apricot-privee` do not exist; the
products live at their `-50ml` handles. `apricot-privee` (no suffix) exists but was last archived
in 2022 and was not used.

## Files

| File | What it is |
|---|---|
| `raw/*.html` | the archived documents, verbatim |
| `raw/*.local.html` | the same documents rewritten against local stylesheets, renderable offline |
| `raw/css/*.css` | 31 of Phlur's 32 theme stylesheets (`template-collection.css` would not fetch) |
| `measure-phlur.json` | the extraction — every box and computed style, at three viewports |
| `measure-siwa.json` | the same extraction run against the Siwa build |
| `screens/phlur-*.png` · `screens/siwa-*.png` | full-page captures for side-by-side |

---

## 1. Section stack

**Identical on all four products** — this is the universal PDP skeleton, not a per-product layout.

| # | Section | Notes |
|---|---|---|
| 1 | announcement bar | |
| 2 | header | sticky |
| 3 | shop nav drawer | present on the two 2026 captures only |
| 4 | **breadcrumbs** | its own section, above the hero |
| 5 | **main** | gallery + buy box |
| 6 | **product scent notes** | Top / Heart / Base beside an oversized image. **Empty on the bundle** — a bundle puts its notes in the accordion instead |
| 7 | product related collection | "The Body Mist Collection" — a rail of format siblings |
| 8 | perfume quotes | one-line scent statement beside an image |
| 9 | `custom_liquid_*` | **the Okendo reviews widget** — the reviews band, hiding behind a generic section id |
| 10 | related products | "You May Also Like" — a Rebuy widget, client-rendered |
| 11 | **pdp sticky cta** | its own section |
| 12 | footer | |

## 2. Buy box — element order

Observed identically on all four products:

```
title  +  star rating          ← ONE flex row, rating right of the title
format line                    ← "50mL Eau de Parfum" / "Hair & Body Mist Duo"
tagline                        ← one line, 2px left rule, 40px margin above and below
scent rail                     ← sibling PRODUCTS as image + name, not variants
membership note
ADD TO BAG · $99  $129         ← price lives INSIDE the button
accordion                      ← Description (open) · [In This Set] · Notes · Ingredients
```

**Five things that are not there**, and their absence is the finding:

- **no separate price element** — price and add-to-cart are one merged control, the same
  signature the homepage carousel card uses (`../PHLUR-SPEC.md §5`)
- **no quantity selector** — on any of the four
- **no tabs** — the product detail is an accordion, `.Phlur-Accordion`
- **no image zoom** — every gallery image carries `class="image-magnify-none"`
- **no breadcrumbs inside the buy box** — they are their own section above the hero

The accordion titles are driven from a metafield JSON array
(`product.metafields.custom.dropdown_titles`), visible where the archived markup leaked the
unrendered Liquid. That is a repeating list of merchant-editable strings — schema **blocks**, not
a fixed loop.

## 3. Geometry — measured

Rendered from the local mirror. Dawn sets `1rem = 10px`, which the theme confirms by drawing 1px
hairlines as `.1rem`.

| Property | 1440 | 768 | 375 |
|---|---|---|---|
| gutter | 80 | 40 | 20 |
| content width | 1280 | 688 | 335 |
| hero split | **640 / 50 / 590** | **344 / 50 / 294** | stacked |
| buy box `max-width` | 600px (`60rem`) | 600px | none |
| buy box position | `sticky`, `top: 30px` | `sticky`, `top: 30px` | `static` |
| buy box child rhythm | 15px (`1.5rem`) | — | — |
| add-to-bag height | **46px** | 46px | 46px |
| radius, everywhere | 0 | 0 | 0 |
| h1 | 24 / 600 / 0.96px / **uppercase** | 18 | 18 |
| format line | 16 / 400 | **16** | **16** |
| accordion header padding | 12.5px | 12.5px | 12.5px |
| accordion icon | 30×30, 2px bars, 8px inset | same | same |
| scent notes columns | **417 / 30 / 833** (1fr : 2fr) | stacked, image first | stacked, image first |
| scent note row | 1px rule, 25px padding, 20/30px | no rule, 0 top, 16/20.8px | same as 768 |
| scent note label | 104px (25% of column), 11px upper | 172px (25%) | 84px (25%) |
| quote text column | 427 (33.4%) | **229 (33.3%)** | **112 (33.4%)** |

Three of these contradict what the stylesheets suggest on a first read, and each was corrected
against the render:

- the **hero gap is 50px**, not the 20px `--grid-desktop-horizontal-spacing` implies — the info
  container's own 60rem cap absorbs the difference
- the **accordion header pads 12.5px**, not the 20px the first matching rule declares; a later
  `1.25rem` rule wins
- the **scent-notes band is 1fr : 2fr**, not the 50/50 its stylesheet block suggests — the 50%
  rule sits inside a mobile media query

And two responsive behaviours are worth stating because they are counter-intuitive:

- **the hero holds its two-column split at 768** and only stacks below 750
- **the quote band never stacks** — it keeps its 1/3 : 2/3 split at 1440, 768 and 375 alike. It is
  the only band on the page that never reflows

## 4. What the mirror cannot show

Stated so the numbers above are not read as more than they are:

- **swiper slide widths.** Scripts are stripped from the mirror, so the gallery and rail track
  widths are JS-computed and not observable. They are not guessed here.
- **the sticky CTA actually pinning.** `.sticky-cta-wrapper` measures `position: static` in the
  mirror because the script that pins it is gone. That it is a fixed bottom bar is inferred from
  the section id (`pdp-sticky-cta`), its markup (title + rating + a second add-to-cart form) and
  its position as a standalone section outside `<main>` — not from a measurement.
- **section y-offsets.** The mega-menu drawer renders expanded without its collapse script,
  displacing everything below it. Section *heights* and all intra-section geometry are valid;
  absolute `y` positions in `measure-phlur.json` are not.
- **the Okendo and Rebuy bands.** Both are client-rendered; the archive preserves the mount
  points and the summary markup, not the populated widgets.

---

## 5. What was built from this

`pdp-phlur/` — a structural clone. Read `pdp-phlur/README.md` for the build itself.

**Cloned:** band order, hero split, buy-box element order, accordion anatomy, scent-note band,
sticky CTA, rhythm, geometry, breakpoints.
**Not cloned:** colour, type families, imagery, copy — those come from `Planning/DesignSystem.md`
through the token layer, per `CLAUDE.md §1.2` (the project's own direction outranks any imported
reference) and §2 rule 3 (consume tokens, never literals).

### Geometry accuracy

23 properties compared at each of three viewports, Phlur against the Siwa build:

| Viewport | Match |
|---|---|
| 1440 | **23 / 23** |
| 768 | **23 / 23** |
| 375 | **23 / 23** |
| **Total** | **69 / 69 — every measured value exact** |

Reproduce with:

```bash
python3 tools/mirror-phlur-pdp.py                 # once — builds raw/*.local.html
python3 tools/measure-pdp.py phlur                # -> measure-phlur.json
python3 tools/measure-pdp.py siwa <base-url>      # -> measure-siwa.json
```

### One deliberate departure

Phlur's media container measures 669px tall in a 640px column (1.045), and 373 in 344 at 768 —
inconsistent ratios produced by `constrain-height` interacting with each image's own aspect. The
build renders the square its `--ratio: 1.0` declares. Matching the inconsistency would reproduce
an artefact, not a design.

### Known gaps against the reference — data, not layout

Each is the real state of the catalogue, recorded rather than papered over:

- **Photography.** 4 of 56 products have any image; 50 have exactly one. The gallery renders the
  library's placeholder for the remaining frames instead of repeating one shot.
- **Notes.** 18 of 56 products carry notes. The other 38 render the band's empty state.
- **Intensity / sillage.** The metafields do not exist yet (feature B-03), so the band ships
  hidden rather than showing an invented rating.
- **Arabic product names.** `identity.title_ar` is unpopulated across the catalogue, so titles
  stay Latin in the Arabic UI. A data gap tracked in `data-schema/`, not a rendering bug — the
  same gap the homepage build recorded.
- **The retail-price comparison** is switched off pending counsel. See `pdp-phlur/README.md`.
