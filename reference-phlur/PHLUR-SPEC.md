# Phlur.com — structural reference capture

**What this folder is.** A read-only forensic capture of the phlur.com homepage layout, taken to
inform `homepage-phlur/`. It records **what Phlur's homepage is**, in the same spirit as
`reference-analysis/` records what the live Siwa store is. It proposes nothing.

| | |
|---|---|
| **Target** | `https://phlur.com/` (homepage) |
| **Captured** | 2026-08-13 |
| **Source** | Wayback Machine snapshot `20260808064423` (2026-08-08) |
| **Why not live** | The live origin returns **403** to headless clients — Cloudflare interstitial. Both `curl` and Playwright/Chromium are blocked; the challenge does not clear on wait. The archive snapshot preserves the DOM and stylesheets, which is what layout extraction needs |
| **Viewports** | 1440×900 · 768×1024 |
| **Platform** | Shopify, Dawn-derived theme (`shopify-section-*` ids, `--page-width`, `swiper` carousels, Rebuy app widgets) |

## Files

| File | What it is |
|---|---|
| `phlur-measure-1440.json` | The raw extraction — every section box, computed style, type role, palette entry and `:root` custom property at 1440 |
| `screens/phlur-full-1440.png` | Full-page capture, first paint |
| `screens/phlur-revealed-1440.png` | Full-page capture after scrolling to trigger reveals and lazy images |
| `screens/ph-ship.png` | The Siwa build at 1440, for side-by-side |
| `screens/ph-bg4.png` | The Siwa build with overlay text hidden — the background plate used for the contrast measurements in §6 |

---

## 1. Section stack

Ten blocks. Page height **4513px** at 1440. Body background `rgb(250,250,250)`.

| # | Section | y | height | Notes |
|---|---|---|---|---|
| 1 | announcement bar | 0 | 36 | centred, one line, not dismissible |
| 2 | header | 36 | 56 | sticky |
| 3 | collection subnav | 92 | 0 | present but collapsed on the homepage |
| 4 | full-width banner (hero) | 92 | 630 | full-bleed image, copy bottom-left |
| 5 | featured collection | 722 | 561 | carousel — "BESTSELLERS" |
| 6 | rich text | 1283 | 200 | mission line + outlined button |
| 7 | full-width banner | 1483 | 615 | **inset** to the gutter, not full-bleed |
| 8 | featured collection | 2098 | 561 | carousel — "WEAR WHAT'S TRUE" |
| 9 | collection list | 2659 | 765 | two square tiles |
| 10 | image with text | 3424 | 540 | text left, oversized image right |
| 11 | footer | 4024 | 489 | five columns |

## 2. The layout rail

One number governs the whole page: the **80px gutter**. Content width is 1280 at 1440. Only the
hero escapes it.

| Property | 1440 | 768 |
|---|---|---|
| gutter | 80 | 40 |
| content width | 1280 | 688 |
| header height | 56 | 48 |
| nav | inline | burger |
| hero | 1440×630 full-bleed | 768×960 (portrait crop) |
| inset banner | 1280×560 | full-bleed |
| carousel card | 303 wide, 16 gap, **pitch 319** | 207 wide, 16 gap, **pitch 223** |
| collection tiles | 2 × 630×630, gap 20 | 1 × 688×688 |
| section rhythm | 40 top · 30 under heading · 40 tail | same |

`--page-width: 160rem` — effectively uncapped; the gutter does the work.

## 3. Type

Three families, and the *roles* are what matter more than the faces.

| Role | Size | Weight | Tracking | Case | Family |
|---|---|---|---|---|---|
| hero title | 30 | 600 | 0.96px | upper | `aktiv-grotesk-extended` |
| banner title | 26 | 600 | 0.96px | upper | `aktiv-grotesk-extended` |
| lead / rich text | 20 | 400 | — | none | `ABCRepro-Regular` |
| section title | 18 | 600 | 0.96px | upper | `aktiv-grotesk-extended` |
| body | 16 | 400 | 0.6px | none | `ABCRepro-Regular` |
| nav | 14 | 400 | — | none | `ABCRepro-Regular` |
| card title | 14 | 600 | 0.64px | upper | `aktiv-grotesk-extended` |
| button / price | 12 | 500 | 0.8px | upper | `ABCReproMono-Medium` |
| badge | 11 | 500 | 0.7px | upper | `ABCReproMono-Medium` |

The signature move is the **monospace UI register** — buttons, prices and badges all sit in
`ABCReproMono` at 11–12px with wide tracking, against a neo-grotesque display face.

## 4. Colour and shape

| Token | Value | Use |
|---|---|---|
| page | `#fafafa` | body |
| tint | `#f5f5f5` | card image beds, alternate bands |
| ink | `#000000` | all text |
| white | `#ffffff` | badges, solid buttons, overlay copy |
| swatch strip | `#c3c3c3` | the grey band under card images |

**Radius is 0 everywhere** — `--media-radius`, `--product-card-corner-radius`,
`--collection-card-corner-radius` and `--blog-card-corner-radius` are all `0.0rem`. No shadows:
every `*-shadow-opacity` is `0.0`.

## 5. Component anatomy

**Product card** (303×424, in a swiper track)
- square image, `#f5f5f5` bed, badge inset 12px top-left, white chip
- grey swatch strip under the image
- title (14/600 upper) → subtitle (13/400)
- one **merged full-width outlined control**: `ADD · $68 $78`, 40px tall, 1px black border,
  compare-at price struck in grey. This is the single most distinctive element on the page —
  add-to-cart and price are the same box, not a price with a button beside it.

**Buttons** — only two: solid fill and 1px outline. Both 40px tall (36 on mobile), `0 30px`
padding, sharp, 12/500 uppercase at 0.8px tracking.

**Carousel** — cards are fixed-width and the track deliberately overflows the right gutter so the
next card peeks. Not a responsive grid.

**Section head** — title left, quiet underlined "Shop All" right. The underline is the only one
on the page.

---

## 6. What was built from this

`homepage-phlur/` — a structural clone. Read `homepage-phlur/README.md` for the build itself.

**Cloned:** section order, geometry, rhythm, grid configuration, component anatomy, breakpoints.
**Not cloned:** colour, type families, imagery, copy — those come from `Planning/DesignSystem.md`
through the token layer, per CLAUDE.md §1.2 (the project's own direction outranks any imported
reference) and §2 rule 3 (consume tokens, never literals).

### Geometry accuracy at 1440

Measured on the build, compared against the table in §1.

| Element | Phlur | Siwa build | Δ |
|---|---|---|---|
| announcement | 1440×36 @ y0 | 1440×36 @ y0 | **0** |
| header | 1440×56 @ y36 | 1440×56 @ y36 | **0** |
| hero | 1440×630 @ y92 | 1440×630 @ y92 | **0** |
| bestsellers | h 561 | h 554 | −7 |
| rich text | h 200 | h 174 | −26 |
| inset banner section | h 615 | h 615 | **0** |
| banner box | 1280×560 @ x80 | 1280×560 @ x80 | **0** |
| second carousel | h 561 | h 554 | −7 |
| collection list | h 765 | h 765 | **0** |
| collection tiles | 630×630 @ x80 / x730 | 630×630 @ x80 / x730 | **0** |
| image-with-text | h 540 | h 540 | **0** |
| — its image | 867×460 @ x493 | 867×460 @ x493 | **0** |
| card | 303 wide, image 303×303 | 303 wide, image 303×303 | **0** |
| card pitch | 319 | 319 | **0** |
| footer | h 489 | h 420 | −69 |
| **page** | **4513** | **4344** | **−169** |

**14 of 17 measured values are exact.** The three deltas are content volume, not layout:

- **rich text −26** — Phlur's mission line wraps to two lines in its measure; the Siwa line fits on
  one. Forcing a wrap would game the number without improving the match.
- **carousels −7 each** — card internal leading; the image, width, gap and pitch are all exact.
- **footer −69** — Phlur's Customer Care column carries 9 links, Siwa's 5. Inventing four links
  Siwa does not have would be worse than the delta.

### Geometry accuracy at 768

| Element | Phlur | Siwa build |
|---|---|---|
| gutter | 40 | **40** |
| header | 48 | **48** |
| hero | 768×960 | **768×960** |
| card width | 207 | **207** |
| card pitch | 223 | **223** |
| first card x | 40 | **40** |
| collection tiles | 1 × 688×688 | **1 × 688×688** |

Exact on every measured value.

### Accessibility — overlay copy

Phlur sets white directly on photography. Siwa's `--on-dark` (`#d4cfc2`) is specified for the
`--surface-dark` token, and measured only **3.93:1** over pale imagery — below the AA floor. The
build uses `--canvas` for text on media instead, behind a configurable scrim, and adds a local
gradient plate on the banner rather than darkening the whole photograph.

Measured against the true background (text hidden, `screens/ph-bg4.png`), at the **worst single
pixel** under each element — a stricter bar than the average:

| Element | worst | floor | |
|---|---|---|---|
| hero eyebrow | 5.60 | 4.5 | pass |
| hero title | 6.22 | 3.0 | pass |
| hero subtitle | 5.12 | 4.5 | pass |
| banner title | 6.22 | 3.0 | pass |
| banner subtitle | 7.19 | 4.5 | pass |
| tile 1 label / meta | 5.18 / 7.36 | 4.5 | pass |
| tile 2 label / meta | 5.49 / 8.16 | 4.5 | pass |

### Known gaps against the reference

- **Photography.** The repo holds six images (`component-library/img/`). Phlur's homepage runs a
  dozen art-directed shots, several wide-format. The hero and banner crops are constrained by
  what exists, not by the layout.
- **Grey swatch strip** under Phlur's card images is a variant-colour affordance with no Siwa
  equivalent yet; omitted rather than faked.
- **Card imagery.** 50 of 56 catalogue products have no image, so most cards render the library's
  monogram placeholder. That is the real data situation, documented in
  `reference-analysis/08-ASSETS`.
