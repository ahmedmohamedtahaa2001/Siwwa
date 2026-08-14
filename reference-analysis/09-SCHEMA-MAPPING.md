# 09 — SCHEMA MAPPING (reference values → Shopify schema defaults)

Reference: https://siwafragrances.com/ · Audit date: 2026-07-27 · Agent A-01 (reference audit)

**Purpose.** This is the bridge document for Implementation Agents. Every table below is
copy-ready: `Setting id` and `Type` go straight into a `{% schema %}`, `Proposed default` goes
straight into the `"default"` key. Section anatomy and the evidence behind every observed value
live in `05-SECTIONS-INVENTORY.md` — this file does not repeat that reasoning, it converts it.

**Sources.** `raw/pages/index.html`, `raw/pages/pdp_sample.html`, `raw/pages/collections_all.html`,
`raw/pages/pages_about-us.html`, `raw/collections.json`, `raw/meta.json`.

**Conventions.**
- All colours are given as the raw Prestige `r g b` triplet **and** hex.
- `1rem = 16px` throughout (no root font-size override is present in the captured `:root`).
- "not determinable from captured data" means the value lives in the external
  `theme.css` (`/cdn/shop/t/4/assets/theme.css`), which was not captured. Where that happens a
  **proposed** default is given and clearly labelled.
- **[inferred]** marks a value derived from Prestige's utility-class naming convention
  (`gap-N` ⇒ `N × 0.25rem`) rather than from a captured CSS declaration.

---

## PART A — Derivation of the Layout & Spacing defaults

### A.1 Measured spacing tokens (from the `:root` block of `raw/pages/index.html`)

| Token | < 700 px | 700 – 999 px | ≥ 1000 px | px equivalent |
|---|---|---|---|---|
| `--section-vertical-spacing` | `2.5rem` | `2.5rem` | `4rem` | **40 px** / 40 px / **64 px** |
| `--section-vertical-spacing-tight` | `2.5rem` | `2.5rem` | `4rem` | 40 px / 40 px / 64 px |
| `--section-stack-gap` | `2.25rem` | `2.25rem` | `3rem` | **36 px** / 36 px / **48 px** |
| `--section-stack-gap-tight` | `2.25rem` | `2.25rem` | `3rem` | 36 px / 36 px / 48 px |
| `--container-gutter` | `1.25rem` | `2rem` | `3rem` | **20 px** / **32 px** / **48 px** |
| `--container-max-width` | `100%` | `100%` | `100%` | viewport-bound |

Container width tokens (same at every breakpoint):

| Token | rem | px | Used by |
|---|---|---|---|
| `--container-xxs-max-width` | `27.5rem` | 440 | (not used by any captured section) |
| `--container-xs-max-width` | `42.5rem` | **680** | image-with-text-overlay content width; `main-page` (About Us) |
| `--container-sm-max-width` | `61.25rem` | 980 | (not used by any captured section) |
| `--container-md-max-width` | `71.875rem` | 1150 | (not used by any captured section) |
| `--container-lg-max-width` | `78.75rem` | **1260** | media-grid, main-product |
| `--container-xl-max-width` | `85rem` | 1360 | (not used by any captured section) |

**Independent confirmation of the gutter + gap arithmetic.** Prestige writes the computed layout
into every product card's `sizes` attribute. Three separate sections agree:

| Section | Rendered `sizes` (desktop clause) | Proves |
|---|---|---|
| featured-collections ×2 | `calc((100vw - 96px) / 4 - (24px / 4 * 3))` | gutter = 2 × 48 px; grid gap = **24 px**; 4-up |
| main-collection | `calc((100vw - 96px) / 3 - (24px / 3 * 2))` | gutter = 2 × 48 px; grid gap = **24 px**; 3-up |
| media-grid (`.container--lg`) | `(max-width: 699px) 100vw, 420px` | 1260 ÷ 3 = 420 ⇒ `.container--lg` = **1260 px** |
| main-product (`.container--lg`) | `min(1100px, 819px - 96px)` | 1260 × 0.65 = 819 ⇒ `.container--lg` = **1260 px** |

### A.2 Token → setting derivation

| Mandatory setting id | Derived from | Arithmetic | **Derived default** | Skill's generic default (superseded) |
|---|---|---|---|---|
| `padding_top` | `--section-vertical-spacing` @ ≥1000 px | `4rem × 16` | **64** | 60 |
| `padding_bottom` | `--section-vertical-spacing` @ ≥1000 px | `4rem × 16` | **64** | 60 |
| `padding_left` | `--container-gutter` @ ≥1000 px | `3rem × 16` | **48** | 40 |
| `padding_right` | `--container-gutter` @ ≥1000 px | `3rem × 16` | **48** | 40 |
| `margin_top` | no margin declaration on any captured section wrapper; Prestige uses padding-only rhythm and collapses adjacent same-background sections with `padding-block-start: 0` | — | **0** | 0 |
| `margin_bottom` | same | — | **0** | 0 |
| `section_max_width` | `--container-max-width: 100%` for plain `.container`; `--container-lg-max-width` for `.container--lg`; `--container-xs-max-width` for `.container--xs` | see A.1 | **1920** (full-bleed / plain container) · **1260** (lg) · **680** (xs) | 1440 |
| `item_gap` | grid gap proven by `sizes` arithmetic | `24px` | **24** | 24 ✔ (coincidentally identical) |
| `mobile_padding_top` | `--section-vertical-spacing` @ < 1000 px | `2.5rem × 16` | **40** | 40 ✔ |
| `mobile_padding_bottom` | same | `2.5rem × 16` | **40** | 40 ✔ |
| `mobile_padding_horizontal` | `--container-gutter` @ < 700 px | `1.25rem × 16` | **20** | 16 |

### A.3 Range bounds that must be widened

The skill's stock `min`/`max`/`step` cannot express three measured values. Implementation Agents
must use the adjusted bounds below or the reference layout is unreproducible.

| Setting | Skill bounds | Problem | **Required bounds** |
|---|---|---|---|
| `section_max_width` | `min 800, max 1920, step 40` | 1260 (`--lg`) and 1150 (`--md`) are not on a 40 px step from 800; 680 (`--xs`) and 440 (`--xxs`) are below the minimum | `min 400, max 1920, step 10` — reaches 440 / 680 / 980 / 1150 / 1260 / 1360 exactly |
| `padding_top` / `padding_bottom` | `step 4` | scrolling-content #1 measures 46 px; the header measures 25.6 px | `step 2` (keep min 0 / max 200) |
| `item_gap` | `min 0, max 80, step 4` | media-grid gap is 8 px / 12 px, and featured-collections #2 resolves to ≈4.8 px | `min 0, max 80, step 2` |

### A.4 Canonical "Layout & Spacing" group (paste into EVERY section schema)

```json
{ "type": "header",  "content": "Layout & Spacing" },
{ "type": "range", "id": "padding_top",     "label": "Padding top (desktop)",    "min": 0,   "max": 200,  "step": 2,  "unit": "px", "default": 64 },
{ "type": "range", "id": "padding_bottom",  "label": "Padding bottom (desktop)", "min": 0,   "max": 200,  "step": 2,  "unit": "px", "default": 64 },
{ "type": "range", "id": "padding_left",    "label": "Padding left (desktop)",   "min": 0,   "max": 120,  "step": 2,  "unit": "px", "default": 48 },
{ "type": "range", "id": "padding_right",   "label": "Padding right (desktop)",  "min": 0,   "max": 120,  "step": 2,  "unit": "px", "default": 48 },
{ "type": "range", "id": "margin_top",      "label": "Margin top",               "min": 0,   "max": 120,  "step": 4,  "unit": "px", "default": 0  },
{ "type": "range", "id": "margin_bottom",   "label": "Margin bottom",            "min": 0,   "max": 120,  "step": 4,  "unit": "px", "default": 0  },
{ "type": "range", "id": "section_max_width","label": "Max width",               "min": 400, "max": 1920, "step": 10, "unit": "px", "default": 1920 },
{ "type": "range", "id": "item_gap",        "label": "Gap between items",        "min": 0,   "max": 80,   "step": 2,  "unit": "px", "default": 24 },
{ "type": "header", "content": "Mobile Spacing" },
{ "type": "range", "id": "mobile_padding_top",        "label": "Padding top (mobile)",       "min": 0, "max": 120, "step": 2, "unit": "px", "default": 40 },
{ "type": "range", "id": "mobile_padding_bottom",     "label": "Padding bottom (mobile)",    "min": 0, "max": 120, "step": 2, "unit": "px", "default": 40 },
{ "type": "range", "id": "mobile_padding_horizontal", "label": "Horizontal padding (mobile)","min": 0, "max": 60,  "step": 2, "unit": "px", "default": 20 }
```

### A.5 Per-section Layout & Spacing defaults (the 11 ranges, every section)

Bold = deviates from the house default in A.4. "prop." = proposed, because the underlying rule
lives in the uncaptured `theme.css`.

| Section (live ID suffix) | `padding_top` | `padding_bottom` | `padding_left` | `padding_right` | `margin_top` | `margin_bottom` | `section_max_width` | `item_gap` | `mobile_padding_top` | `mobile_padding_bottom` | `mobile_padding_horizontal` |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `announcement_bar_6BNjyF` | **8** prop. | **8** prop. | **20** | **20** | 0 | 0 | **1920** | **0** | **8** prop. | **8** prop. | 20 |
| `header` | **26** | **26** | 48 | 48 | 0 | 0 | 1920 | 24 | **16** | **16** | 20 |
| `cart-drawer` | **24** prop. | **24** prop. | **24** prop. | **24** prop. | 0 | 0 | **440** prop. | **16** prop. | **24** prop. | **24** prop. | **16** prop. |
| `newsletter-popup` | **32** prop. | **32** prop. | **32** prop. | **32** prop. | 0 | 0 | **440** prop. | **32** [inferred] | **32** prop. | **32** prop. | **20** |
| `privacy-banner` | **24** prop. | **24** prop. | **24** prop. | **24** prop. | 0 | 0 | **440** prop. | **16** [inferred] | **24** prop. | **24** prop. | **20** |
| `slideshow` (index) | **0** | **0** | **0** | **0** | 0 | 0 | 1920 | **0** | **0** | **0** | **0** |
| `slideshow_6aQJg6` (about) | **0** | **0** | **0** | **0** | 0 | 0 | 1920 | **0** | **0** | **0** | **0** |
| `featured_collections_EGrx3j` | 64 | 64 | 48 | 48 | 0 | 0 | 1920 | 24 | 40 | 40 | 20 |
| `image-with-text-overlay-1` | **0** | **0** | **0** | **0** | 0 | 0 | 1920 | **0** | **0** | **0** | **0** |
| `featured-collections-2` | 64 | 64 | 48 | 48 | 0 | 0 | 1920 | **6** ← 24 × 0.2 ≈ 4.8, rounded to step 2 | 40 | 40 | 20 |
| `17592337449e486738` (Judge.me carousel) | 64 | 64 | 48 | 48 | 0 | 0 | 1920 | **0** | 40 | 40 | 20 |
| `scrolling-content-2` | **40** | **40** | **0** | **0** | 0 | 0 | 1920 | **50** | **20** | **20** | **0** |
| `collection_list_gpXjxV` | 64 | 64 | 48 | 48 | 0 | 0 | 1920 | **30** | 40 | 40 | 20 |
| `scrolling-content-1` | **46** | **46** | **0** | **0** | 0 | 0 | 1920 | **30** | **20** | **20** | **0** |
| `media-grid` | 64 | 64 | 48 | 48 | 0 | 0 | **1260** | **12** | 40 | 40 | 20 |
| `17765002303c384e0a` (empty apps) | 64 | 64 | 48 | 48 | 0 | 0 | 1920 | 24 | 40 | 40 | 20 |
| `text-with-icons` | 64 | 64 | 48 | 48 | 0 | 0 | 1920 | **32** [inferred] | 40 | 40 | 20 |
| `footer` | 64 prop. | 64 prop. | 48 | 48 | 0 | 0 | 1920 | **48** prop. | 40 prop. | 40 prop. | 20 |
| `main` (product) | 64 | 64 | 48 | 48 | 0 | 0 | **1260** | **48** prop. | 40 | 40 | 20 |
| `1759233522bc5ee263` (Judge.me widget) | 64 | 64 | 48 | 48 | 0 | 0 | 1920 | **0** | 40 | 40 | 20 |
| `related-products` | 64 prop. | 64 prop. | 48 prop. | 48 prop. | 0 | 0 | 1920 prop. | 24 prop. | 40 prop. | 40 prop. | 20 prop. |
| `recently_viewed_products_LGtyH6` | 64 | 64 | 48 | 48 | 0 | 0 | 1920 | 24 | 40 | 40 | 20 |
| `main` (collection) | **0** | **0** | 48 | 48 | 0 | 0 | 1920 | 24 | **0** | **0** | 20 |
| `main` (page / About Us) | 64 | 64 | 48 | 48 | 0 | 0 | **680** | **48** | 40 | 40 | 20 |

Derivation notes for the deviating cells:

| Cell | Evidence |
|---|---|
| slideshow / image-with-text-overlay / scrolling-content horizontal = 0 | no `.container` wrapper in the DOM; the media is full-bleed |
| slideshow vertical = 0 | no `section-spacing` class on the wrapper |
| `scrolling-content-2` = 40 / 20 | section `<style>`: `--section-vertical-spacing: clamp(20px, …, 40px)` |
| `scrolling-content-1` = 46 / 20 | section `<style>`: `--section-vertical-spacing: clamp(20px, …, 46px)` |
| scrolling-content `item_gap` 50 / 30 | `--scrolling-content-content-gap: clamp(25px,…,50px)` and `clamp(30px,…,30px)` |
| `collection_list` gap 30 | `--collection-list-gap: 1.875rem` at ≥1150 px (24 px below) |
| `media-grid` gap 12 | `--media-grid-gap: 0.75rem` at ≥1150 px (8 px below) |
| `media-grid` / `main-product` max-width 1260 | `.container--lg` = `--container-lg-max-width: 78.75rem` |
| `main-page` max-width 680 | `.container--xs` = `--container-xs-max-width: 42.5rem` |
| `main-page` gap 48 | `--section-stack-gap: 3rem` @ ≥1000 px |
| `main` (collection) vertical = 0 | the section has **no** `section-spacing` wrapper at all |
| `header` 26 / 16 | `--header-padding-block: 1.6rem` (≥700 px) and `1rem` (<700 px) |
| `featured-collections-2` gap 6 | `--product-list-horizontal-spacing-factor: 0.2` × the 24 px base gap |

### A.6 Wiring pattern (unchanged from the skill, with the measured breakpoint)

```liquid
{% style %}
  #shopify-section-{{ section.id }} .section-inner {
    padding: {{ section.settings.padding_top }}px {{ section.settings.padding_right }}px
             {{ section.settings.padding_bottom }}px {{ section.settings.padding_left }}px;
    margin-top: {{ section.settings.margin_top }}px;
    margin-bottom: {{ section.settings.margin_bottom }}px;
    max-width: {{ section.settings.section_max_width }}px;
    gap: {{ section.settings.item_gap }}px;
  }
  @media (max-width: 749px) {
    #shopify-section-{{ section.id }} .section-inner {
      padding-top: {{ section.settings.mobile_padding_top }}px;
      padding-bottom: {{ section.settings.mobile_padding_bottom }}px;
      padding-left: {{ section.settings.mobile_padding_horizontal }}px;
      padding-right: {{ section.settings.mobile_padding_horizontal }}px;
    }
  }
{% endstyle %}
```

**Breakpoint caveat.** The reference theme's own breakpoints are `700 / 1000 / 1150 / 1400 / 1600`
(from `window.themeVariables.mediaQueries` in `raw/pages/index.html`), **not** 749 px. If a rebuild
must match the reference's responsive behaviour exactly, use `@media (max-width: 699px)` for the
mobile block and add an intermediate `700–999 px` block where the measured tokens differ
(`--container-gutter: 32px`).

---

## PART B — Global tokens → `config/settings_schema.json`

### B.1 Colour schemes

Prestige stores colour schemes as `color_scheme_group`. Each captured scheme, with both notations:

| Scheme id | Role in this store | `text` | `background` | `border` | `button_background` | `button_text` | `accent` | `circle_button_bg` | `circle_button_text` |
|---|---|---|---|---|---|---|---|---|---|
| `scheme-1` | body default (most sections, cart drawer) | `28 28 28` `#1C1C1C` | `255 255 255 / 1.0` `#FFFFFF` | `221 221 221` `#DDDDDD` | `28 28 28` `#1C1C1C` | `255 255 255` `#FFFFFF` | `28 28 28` `#1C1C1C` | `255 255 255` `#FFFFFF` | `28 28 28` `#1C1C1C` |
| `scheme-2` | header + mobile menu drawer | `0 0 0` `#000000` | `255 255 255 / 1.0` `#FFFFFF` | `217 217 217` `#D9D9D9` | `0 0 0` `#000000` | `255 255 255` `#FFFFFF` | `0 0 0` `#000000` | `255 255 255` `#FFFFFF` | `28 28 28` `#1C1C1C` |
| `scheme-3` | announcement bar, footer, popups | `255 255 255` `#FFFFFF` | `28 28 28 / 1.0` `#1C1C1C` | `62 62 62` `#3E3E3E` | `255 255 255` `#FFFFFF` | `28 28 28` `#1C1C1C` | `255 255 255` `#FFFFFF` | `255 255 255` `#FFFFFF` | `28 28 28` `#1C1C1C` |
| `scheme-4` | overlays on media (slideshow, collection cards, media-grid tiles) | `255 255 255` `#FFFFFF` | `0 0 0 / 0.0` transparent | `255 255 255` `#FFFFFF` | `255 255 255` `#FFFFFF` | `28 28 28` `#1C1C1C` | `255 255 255` `#FFFFFF` | `255 255 255` `#FFFFFF` | `28 28 28` `#1C1C1C` |
| `scheme-89deeaaa-2e85-418e-ae13-9e305d760573` | red accent scheme — **defined but not used by any captured section** | `255 255 255` `#FFFFFF` | `195 17 17 / 1.0` `#C31111` | `204 53 53` `#CC3535` | `28 28 28` `#1C1C1C` | `255 255 255` `#FFFFFF` | `28 28 28` `#1C1C1C` | `255 255 255` `#FFFFFF` | `28 28 28` `#1C1C1C` |
| `dialog` | modals / popovers (sort, filters) | `0 0 0` `#000000` | `255 255 255 / 1.0` `#FFFFFF` | `217 217 217` `#D9D9D9` | `0 0 0` `#000000` | `255 255 255` `#FFFFFF` | `0 0 0` `#000000` | `255 255 255` `#FFFFFF` | `28 28 28` `#1C1C1C` |

Plus one **unnamed inline scheme** used by both `scrolling-content` sections — it must become a
proper scheme in the rebuild:

| Pseudo-scheme | `text` | `background` | `border` |
|---|---|---|---|
| `scrolling-content` (class `bg-77e774e6cc4d94d6a32f6256f02d9552`) | `255 255 255` `#FFFFFF` | `0 0 0` `#000000` | `38 38 38` `#262626` |

All `background_gradient` values are empty strings in the capture — no scheme uses a gradient.

### B.2 Standalone theme colour settings

| Setting id | Type | Label | Observed value on siwafragrances.com | Proposed default |
|---|---|---|---|---|
| `page_overlay_color` | `color` | Modal overlay | `0 0 0 / 0.4` | `#000000` |
| `page_overlay_opacity` | `range` (%) | Modal overlay opacity | `0.4` | `40` |
| `on_sale_text_color` | `color` | On-sale text | `255 215 0` | `#FFD700` |
| `on_sale_badge_background` | `color` | On-sale badge background | `255 215 0` | `#FFD700` |
| `on_sale_badge_text` | `color` | On-sale badge text | `0 0 0 / 0.65` | `#000000` @ 65 % |
| `sold_out_badge_background` | `color` | Sold-out badge background | `227 44 43` | `#E32C2B` |
| `sold_out_badge_text` | `color` | Sold-out badge text | `255 255 255` | `#FFFFFF` |
| `custom_badge_background` | `color` | Custom badge background | `28 28 28` | `#1C1C1C` |
| `custom_badge_text` | `color` | Custom badge text | `255 255 255` | `#FFFFFF` |
| `star_color` | `color` | Rating star colour | `255 215 0` | `#FFD700` |
| `success_background` | `color` | Success background | `212 227 203` | `#D4E3CB` |
| `success_text` | `color` | Success text | `48 122 7` | `#307A07` |
| `warning_background` | `color` | Warning background | `253 241 224` | `#FDF1E0` |
| `warning_text` | `color` | Warning text | `237 138 0` | `#ED8A00` |
| `error_background` | `color` | Error background | `243 204 204` | `#F3CCCC` |
| `error_text` | `color` | Error text | `203 43 43` | `#CB2B2B` |
| `modal_background` | `color` | Modal background | `255 255 255` | `#FFFFFF` |
| `modal_text_color` | `color` | Modal text | `0 0 0` | `#000000` |
| `inventory_low_color` | `color` | Low-stock text | `#ff0000` — **hardcoded** in a page-level `<style>` block, not a theme setting | `#FF0000` |

### B.3 Typography

| Setting id | Type | Label | Observed value | Proposed default |
|---|---|---|---|---|
| `heading_font` | `font_picker` | Heading font | `Poppins, sans-serif`, loaded weights `poppins_n4`, `poppins_i4`, `poppins_n7`, `poppins_i7` | `poppins_n4` |
| `heading_font_weight` | `select` / `range` | Heading weight | `400` | `400` |
| `heading_font_style` | `select` | Heading style | `normal` | `normal` |
| `heading_text_transform` | `select` | Heading transform | `uppercase` | `uppercase` |
| `heading_letter_spacing` | `range` (em ×100) | Heading tracking | `0.18em` | `18` |
| `text_font` | `font_picker` | Body font | `Poppins, sans-serif` | `poppins_n4` |
| `text_font_weight` | `select` / `range` | Body weight | `400` | `400` |
| `text_font_style` | `select` | Body style | `normal` | `normal` |
| `text_letter_spacing` | `range` (em ×100) | Body tracking | `0.0em` | `0` |
| `button_text_transform` | `select` | Button transform | `uppercase` | `uppercase` |
| `button_letter_spacing` | `range` (em ×100) | Button tracking | `0.18em` | `18` |
| `button_font_size` | `range` (px) | Button font size | `var(--text-sm)` = `0.8125rem` = 13 px | `13` |
| `button_line_height` | `range` | Button line-height | `1.65` | `1.65` |
| `product_card_text_transform` | `select` | Product-card transform | `uppercase` | `uppercase` |
| `heading_size_scale` | `range` (%) | Heading scale factor | `--text-heading-size-factor: 1` | `100` |

**Type scale** — every heading size is a `clamp()` between a 375 px and a 1400 px viewport,
multiplied by `--text-heading-size-factor` and floored at `0.6875rem` (11 px):

| Token | Full observed value | Min (px) | Max (px) | Proposed settings |
|---|---|---|---|---|
| `--text-h1` | `max(0.6875rem, clamp(1.375rem, 1.146341463414634rem + 0.975609756097561vw, 2rem) × factor)` | 22 | **32** | `h1_size_min: 22`, `h1_size_max: 32` |
| `--text-h2` | `max(0.6875rem, clamp(1.25rem, 1.0670731707317074rem + 0.7804878048780488vw, 1.75rem) × factor)` | 20 | **28** | `h2_size_min: 20`, `h2_size_max: 28` |
| `--text-h3` | `max(0.6875rem, clamp(1.125rem, 1.0335365853658536rem + 0.3902439024390244vw, 1.375rem) × factor)` | 18 | **22** | `h3_size_min: 18`, `h3_size_max: 22` |
| `--text-h4` | `max(0.6875rem, clamp(1rem, 0.9542682926829268rem + 0.1951219512195122vw, 1.125rem) × factor)` | 16 | **18** | `h4_size_min: 16`, `h4_size_max: 18` |
| `--text-h5` | `calc(0.875rem × factor)` | 14 | 14 | `h5_size: 14` |
| `--text-h6` | `calc(0.75rem × factor)` | 12 | 12 | `h6_size: 12` |

Body scale (two breakpoints only):

| Token | < 700 px | ≥ 700 px | Proposed settings |
|---|---|---|---|
| `--text-xs` | `0.75rem` = 12 px | `0.75rem` = 12 px | `text_xs: 12` |
| `--text-sm` | `0.8125rem` = 13 px | `0.8125rem` = 13 px | `text_sm: 13` |
| `--text-base` | `0.875rem` = 14 px | `0.875rem` = 14 px | `text_base: 14` |
| `--text-lg` | `1.0rem` = 16 px | `1.0rem` = 16 px | `text_lg: 16` |
| `--text-xl` | `1.125rem` = 18 px | **`1.25rem` = 20 px** | `text_xl: 18` / `text_xl_desktop: 20` |

Also observed: `--announcement-bar-font-size` `0.625rem` (10 px) < 999 px, `0.6875rem` (11 px)
≥ 999 px; a `text-xxs` class is used (footer copyright, rating badge, toolbar buttons) but its
value is **not determinable from captured data** — propose 10 px.

### B.4 Shape, layout and behaviour

| Setting id | Type | Label | Observed value | Proposed default |
|---|---|---|---|---|
| `button_border_radius` | `range` (px) | Button radius | `0.0rem` | `0` |
| `input_border_radius` | `range` (px) | Input radius | `0.0rem` | `0` |
| `rounded_full` | (constant) | Pill radius | `9999px` | `9999` |
| `shadow_sm` | `range`×3 + `color` | Small shadow | `0 2px 8px rgb(0 0 0 / 0.05)` | y 2, blur 8, `#000000` @ 5 % |
| `shadow` | same | Default shadow | `0 5px 15px rgb(0 0 0 / 0.05)` | y 5, blur 15, 5 % |
| `shadow_md` | same | Medium shadow | `0 5px 30px rgb(0 0 0 / 0.05)` | y 5, blur 30, 5 % |
| `shadow_block` | same | Block shadow | **`px px px rgb(var(--text-primary) / 0.0)` — malformed / unset** | x 0, y 0, blur 0, opacity 0 |
| `container_gutter_mobile` | `range` (px) | Page gutter (mobile) | `1.25rem` = 20 px | `20` |
| `container_gutter_tablet` | `range` (px) | Page gutter (tablet) | `2rem` = 32 px | `32` |
| `container_gutter_desktop` | `range` (px) | Page gutter (desktop) | `3rem` = 48 px | `48` |
| `page_width` | `range` (px) / `select` | Page max width | `--container-max-width: 100%` | `100%` (full) |
| `product_list_items_per_row` | `range` | Products per row (desktop) | `4` | `4` |
| `product_list_items_per_row_mobile` | `range` | Products per row (mobile) | `2` | `2` |
| `header_logo_width` | `range` (px) | Logo width (desktop) | `110px` | `110` |
| `header_logo_width_mobile` | `range` (px) | Logo width (mobile) | `80px` | `80` |
| `form_gap` | `range` (px) | Fieldset → submit gap | `1.25rem` = 20 px | `20` |
| `fieldset_gap` | `range` (px) | Between form inputs | `1rem` = 16 px | `16` |
| `form_control_gap` | `range` (px) | Input ↔ label gap | `0.625rem` = 10 px | `10` |
| `checkbox_control_gap` | `range` (px) | Checkbox ↔ label gap | `0.75rem` = 12 px | `12` |
| `input_padding_block` | `range` (px) | Input vertical padding | `0.65rem` = 10.4 px | `10` |
| `input_padding_inline` | `range` (px) | Input horizontal padding | `0.8rem` = 12.8 px | `13` |
| `checkbox_size` | `range` (px) | Checkbox size | `0.875rem` = 14 px | `14` |
| `cart_type` | `select` | Cart behaviour | `drawer` | `drawer` |
| `show_page_transition` | `checkbox` | Page transition | `true` (`@view-transition { navigation: auto }`) | `true` |
| `stagger_menu_apparition` | `checkbox` | Stagger menu animation | `true` | `true` |
| `currency_code_enabled` | `checkbox` | Show currency code | `false` | `false` |
| `money_format` | (Shopify admin) | Money format | `LE {{amount}}` | `LE {{amount}}` |
| `money_with_currency_format` | (Shopify admin) | Money + currency | `LE {{amount}} EGP` | `LE {{amount}} EGP` |
| `favicon` | `image_picker` | Favicon | not present in captured `<head>` | — |
| `checkmark_icon` | (asset) | Checkmark SVG | `/cdn/shop/t/4/assets/checkmark.svg` | asset |
| `cursor_zoom_icon` | (asset) | Zoom cursor SVG | `/cdn/shop/t/4/assets/cursor-zoom-in.svg` | asset |

Breakpoints published by the theme (`window.themeVariables.mediaQueries`) — a rebuild must reuse
these exact values or the per-breakpoint defaults in Part A drift:

| Alias | Query |
|---|---|
| `sm` | `min-width: 700px` |
| `md` | `min-width: 1000px` |
| `lg` | `min-width: 1150px` |
| `xl` | `min-width: 1400px` |
| `2xl` | `min-width: 1600px` |

### B.5 Store-level context (drives defaults, not settings)

| Field | Value | Source |
|---|---|---|
| Shop name | `Siwa Fragrances` | `raw/meta.json` |
| Domain / myshopify | `siwafragrances.com` / `3c3u3n-qt.myshopify.com` | `raw/meta.json` |
| Currency | `EGP`, `money_format: LE {{amount}}` | `raw/meta.json` |
| Country / ships to | `EG` / `["EG"]` | `raw/meta.json` |
| Locale | `en`, `dir="ltr"` | `<html lang="en" dir="ltr">` |
| Published products / collections | 56 / 19 | `raw/meta.json` |
| Shop Pay installments | `false`; `shopify_pay_enabled_card_brands: []` | `raw/meta.json` — the `payment_terms` PDP block renders empty |

---

## PART C — Per-section schema mapping tables

Each table lists only the **content and style** settings. Every section additionally receives the
full 11-range Layout & Spacing group from A.4, with the per-section defaults from A.5.

### C.1 `announcement-bar` — `sections--18814157193264__announcement_bar_6BNjyF`

| Setting id | Type | Label | Observed value on siwafragrances.com | Proposed default |
|---|---|---|---|---|
| `color_scheme` | `color_scheme` | Colour scheme | `scheme-3` | `scheme-3` |
| `autoplay` | `checkbox` | Auto-rotate messages | on | `true` |
| `autoplay_interval` | `range` (s) | Rotation interval | `3` | `3` |
| `allow_swipe` | `checkbox` | Allow swipe | present | `true` |
| `sticky` | `checkbox` | Stick to top | `--announcement-bar-is-sticky: 0` | `false` |
| `font_size_desktop` | `range` (px) | Font size (desktop) | `0.6875rem` = 11 px | `11` |
| `font_size_mobile` | `range` (px) | Font size (mobile) | `0.625rem` = 10 px | `10` |
| `show_social_icons` | `checkbox` | Show social icons | not rendered | `false` |
| `show_locale_selector` | `checkbox` | Show country/language | not rendered | `false` |
| **block `announcement`** | | | | |
| `text` | `inline_richtext` | Message | `<strong>Explore your Persona. Free shipping orders over 1500</strong>` | `<strong>Explore your Persona. Free shipping orders over 1500</strong>` |
| `link` | `url` | Message link | none | (blank) |

### C.2 `header` — `sections--18814157193264__header`

| Setting id | Type | Label | Observed value on siwafragrances.com | Proposed default |
|---|---|---|---|---|
| `color_scheme` | `color_scheme` | Colour scheme | `scheme-2` | `scheme-2` |
| `logo` | `image_picker` | Logo | `logo_6e889a1e-1178-440e-8bfb-249d5b777e14.png?v=1775298245` (6543 × 3337) | (merchant asset) |
| `logo_transparent` | `image_picker` | Logo (transparent header) | not present | (blank) |
| `logo_width` | `range` (px) | Logo width (desktop) | `110px` | `110` |
| `logo_width_mobile` | `range` (px) | Logo width (mobile) | `80px` | `80` |
| `logo_alt` | `text` | Logo alt text | `Siwa Fragrances` | `Siwa Fragrances` |
| `menu` | `link_list` | Primary menu | 10 links (HOME … CONTACT US) | `main-menu` |
| `layout` | `select` | Header layout | logo-centre, nav on second row ≥1000 px | `logo_center_nav_below` |
| `nav_alignment` | `select` | Nav alignment | `header__primary-nav--center` | `center` |
| `sticky_header` | `checkbox` | Sticky header | `--header-is-sticky: 0` | `false` |
| `transparent_header` | `checkbox` | Transparent over first section | enabled (slideshow sets `allow-transparent-header`) | `true` |
| `transparent_text_color` | `color` | Transparent-header text | `255 255 255` | `#FFFFFF` |
| `separation_border_color` | `color` | Bottom border | `0 0 0 / 0.15` | `#000000` @ 15 % |
| `padding_block_desktop` | `range` (px) | Vertical padding (desktop) | `1.6rem` = 25.6 px | `26` |
| `padding_block_mobile` | `range` (px) | Vertical padding (mobile) | `1rem` = 16 px | `16` |
| `show_search` | `checkbox` | Show search | yes | `true` |
| `search_placeholder` | `text` | Search placeholder | `Search for...` | `Search for...` |
| `show_account` | `checkbox` | Show account icon | yes | `true` |
| `account_label_mobile` | `text` | Account label (drawer) | `Login` | `Login` |
| `show_cart` | `checkbox` | Show cart icon | yes | `true` |
| `cart_icon` | `select` | Cart icon | `icon-cart` | `cart` |
| `nav_icon_size` | `range` (px) | Nav icon size | `width="24"` | `24` |
| `drawer_open_from` | `select` | Mobile menu side | `left` | `left` |
| `drawer_color_scheme` | `color_scheme` | Mobile menu scheme | `scheme-2` | `scheme-2` |

### C.3 `cart-drawer` — `sections--18814157258800__cart-drawer`

| Setting id | Type | Label | Observed value on siwafragrances.com | Proposed default |
|---|---|---|---|---|
| `color_scheme` | `color_scheme` | Colour scheme | `scheme-1` | `scheme-1` |
| `heading` | `text` | Drawer title | `Cart` | `Cart` |
| `empty_message` | `text` | Empty-cart message | `Your cart is empty` | `Your cart is empty` |
| `empty_cta_label` | `text` | Empty-cart button | not rendered | (blank) |
| `empty_cta_url` | `url` | Empty-cart button link | not rendered | (blank) |
| `body_alignment` | `select` | Body alignment | `drawer--center-body` | `center` |
| `initial_focus` | `checkbox` | Focus first element | `initial-focus="false"` | `false` |
| `show_note` | `checkbox` | Order-note field | not rendered | `false` |
| `show_shipping_estimator` | `checkbox` | Shipping estimator | not rendered | `false` |
| `show_free_shipping_bar` | `checkbox` | Free-shipping bar | not rendered (but the announcement bar advertises free shipping over 1500) | `false` |

### C.4 `newsletter-popup` — `sections--18814157258800__newsletter-popup`

| Setting id | Type | Label | Observed value on siwafragrances.com | Proposed default |
|---|---|---|---|---|
| `color_scheme` | `color_scheme` | Colour scheme | `scheme-3` | `scheme-3` |
| `dialog_title` | `text` | Accessible dialog name | `Newsletter popup` | `Newsletter popup` |
| `heading` | `text` | Heading | `A Gift for Your First Siwa Order` | `A Gift for Your First Siwa Order` |
| `content` | `richtext` | Body copy | `Subscribe to our newsletter and receive 50 EGP off your first purchase with Siwa Fragrances` | same |
| `image` | `image_picker` | Image | none | (blank) |
| `input_label` | `text` | E-mail field label | `E-mail` | `E-mail` |
| `button_label` | `text` | Submit button | **`Get My Discount`** | `Get My Discount` |
| `close_label` | `text` | Close button (sr-only) | `Close` | `Close` |
| `show_once` | `checkbox` | Show only once | `only-once` present | `true` |
| `apparition_delay` | `range` (s) | Delay before showing | `5` | `5` |
| `newsletter_tag` | `text` | Customer tag applied | `newsletter` | `newsletter` |
| `text_alignment` | `select` | Text alignment | `text-center` | `center` |

### C.5 `privacy-banner` — `sections--18814157258800__privacy-banner`

| Setting id | Type | Label | Observed value on siwafragrances.com | Proposed default |
|---|---|---|---|---|
| `color_scheme` | `color_scheme` | Colour scheme | `scheme-3` | `scheme-3` |
| `heading` | `text` | Heading | `🍪 Cookie policy` | `🍪 Cookie policy` |
| `content` | `richtext` | Body copy | `We use cookies and similar technologies to provide the best experience on our website. Refer to our Privacy Policy for more information.` | same |
| `accept_label` | `text` | Accept button | **`Accept`** | `Accept` |
| `decline_label` | `text` | Decline button | **`Decline`** | `Decline` |
| `accept_style` | `select` | Accept button style | `link text-xs` | `link` |
| `decline_style` | `select` | Decline button style | `link text-xs text-subdued` | `link_subdued` |
| `close_label` | `text` | Close (sr-only) | `Close` | `Close` |
| `body_font_size` | `range` (px) | Body font size | `text-xs` = 12 px | `12` |

### C.6 `slideshow` — `template--18814156636208__slideshow`

| Setting id | Type | Label | Observed value on siwafragrances.com | Proposed default |
|---|---|---|---|---|
| `background_color` | `color` | Carousel background | `0 0 0` | `#000000` |
| `border_color` | `color` | Border | `var(--text-color) / 0.15` | `#FFFFFF` @ 15 % |
| `section_height` | `select` | Slide height | `content-over-media--lg` | `large` |
| `autoplay` | `checkbox` | Autoplay | on | `true` |
| `autoplay_interval` | `range` (s) | Autoplay interval | `4` | `4` |
| `autoplay_pause_on_video` | `checkbox` | Pause on video | present | `true` |
| `allow_swipe` | `checkbox` | Allow swipe | present | `true` |
| `allow_transparent_header` | `checkbox` | Let header overlay | present | `true` |
| `show_page_dots` | `checkbox` | Show dots | no dots markup (1 slide) | `true` |
| **block `slide`** | | | | |
| `media_type` | `select` | Media type | `image` | `image` |
| `image_desktop` | `image_picker` | Image (desktop) | `Summer.jpg?v=1776355287` (896 × 1200) | (merchant asset) |
| `image_mobile` | `image_picker` | Image (mobile) | `Summer.jpg?v=1776355287` @ 800/1000/1200 w | (merchant asset) |
| `image_tablet` | `image_picker` | Image (tablet) | not used | (blank) |
| `image_alt` | `text` | Image alt text | `""` (empty) | `Summer Drops — the season has arrived` |
| `video` / `video_url` | `video` / `video_url` | Video | not used | (blank) |
| `subheading` | `inline_richtext` | Eyebrow | `Summer Drops` | `Summer Drops` |
| `heading` | `inline_richtext` | Heading | `THE SEASON HAS ARRIVED` | `THE SEASON HAS ARRIVED` |
| `heading_size` | `select` | Heading size | `h1` | `h1` |
| `subheading_size` | `select` | Eyebrow size | `h6` | `h6` |
| `content` | `richtext` | Body text | none | (blank) |
| `text_color` | `color` | Text colour | `255 255 255` | `#FFFFFF` |
| `content_max_width` | `range` (px) | Content max width | `800px` | `800` |
| `content_position_desktop` | `select` | Position (desktop) | `place-self-end-start` | `bottom_left` |
| `content_position_mobile` | `select` | Position (mobile) | `place-self-end-start` | `bottom_left` |
| `text_alignment` | `select` | Text alignment | `text-start` | `left` |
| `overlay_color` | `color` | Overlay | radial gradient seeded `221 39 57` `#DD2739` | `#000000` |
| `overlay_opacity` | `range` (%) | Overlay opacity | `0` | `0` |
| `reveal_on_scroll` | `checkbox` | Reveal on scroll | `true` | `true` |
| `button_1_label` | `text` | Button 1 label | `Shop All` | `Shop All` |
| `button_1_url` | `url` | Button 1 link | `https://siwafragrances.com/collections/all` | `/collections/all` |
| `button_1_background` | `color` | Button 1 background | `255 255 255` | `#FFFFFF` |
| `button_1_outline` | `color` | Button 1 outline | `255 255 255` | `#FFFFFF` |
| `button_1_text_color` | `color` | Button 1 text | `0 0 0` | `#000000` |
| `button_2_label` | `text` | Button 2 label | `Summer Collection` | `Summer Collection` |
| `button_2_url` | `url` | Button 2 link | `/collections/summer-collection` | `/collections/summer-collection` |
| `button_2_background` | `color` | Button 2 background | `28 28 28` | `#1C1C1C` |
| `button_2_outline` | `color` | Button 2 outline | `28 28 28` | `#1C1C1C` |
| `button_2_text_color` | `color` | Button 2 text | `255 255 255` | `#FFFFFF` |
| `buttons_same_width` | `checkbox` | Equal-width buttons | `button-group--same-width` | `true` |

*About-Us instance (`template--18814156701744__slideshow_6aQJg6`) overrides:*
`autoplay_interval: 5`, `section_height: medium`, `content_max_width: 780`,
`content_position_*: center`, `text_alignment: center`, `reveal_on_scroll: false`,
image `About_Us.png?v=1759517000` (3200 × 1200 desktop / 1200 × 1600 mobile), **all text slots empty**.

### C.7 `featured-collections` #1 — `template--18814156636208__featured_collections_EGrx3j`

| Setting id | Type | Label | Observed value on siwafragrances.com | Proposed default |
|---|---|---|---|---|
| `color_scheme` | `color_scheme` | Colour scheme | `scheme-1` | `scheme-1` |
| `show_divider` | `checkbox` | Show top divider | `bordered-section` present | `true` |
| `subheading` | `inline_richtext` | Eyebrow | `<strong>new in</strong>` | `<strong>new in</strong>` |
| `tab_heading_size` | `select` | Tab label size | `h2` | `h2` |
| `text_alignment` | `select` | Header alignment | `text-center` | `center` |
| `layout` | `select` | Layout | carousel | `carousel` |
| `allow_drag` | `checkbox` | Draggable carousel | `allow-drag` | `true` |
| `group_cells` | `checkbox` | Page by group | `group-cells` | `true` |
| `show_arrows` | `checkbox` | Prev/next arrows | present, on hover, inside | `true` |
| `arrow_style` | `select` | Arrow style | `circle-button` | `circle` |
| `items_per_row` | `range` | Products per row (desktop) | `4` | `4` |
| `items_per_row_mobile` | `range` | Products per row (mobile) | `2` | `2` |
| `horizontal_spacing_factor` | `range` (0–2, step 0.1) | Horizontal spacing | `1` | `1` |
| `vertical_spacing_factor` | `range` (0–2, step 0.1) | Vertical spacing | `1` | `1` |
| `show_vendor` | `checkbox` | Show vendor on card | yes (e.g. `Lost In Paris Roja`) | `true` |
| `show_rating` | `checkbox` | Show rating badge | yes (`5.0`, `title="N reviews"`) | `true` |
| `show_quick_add` | `checkbox` | Quick-add button | yes | `true` |
| `show_badges` | `checkbox` | Show badges | yes (`Sold out`) | `true` |
| `badge_position` | `select` | Badge layout | `badge-list--vertical` | `vertical` |
| `image_aspect_ratio` | `select` | Card image ratio | `aspect-square` | `square` |
| **block `collection` (tab 1)** | | | | |
| `title` | `text` | Tab label | `men` | `men` |
| `collection` | `collection` | Collection | → `/collections/men-new-drops` (`men new drops`, 7 products) | `men-new-drops` |
| `products_to_show` | `range` | Products to show | 7 rendered | `8` |
| `button_label` | `text` | CTA label | `View MEN NEW DROPS` | `View MEN NEW DROPS` |
| `button_url` | `url` | CTA link | `/collections/men-new-drops` | `/collections/men-new-drops` |
| **block `collection` (tab 2)** | | | | |
| `title` | `text` | Tab label | `women` | `women` |
| `collection` | `collection` | Collection | → `/collections/women-new-drops` (`women new drops`, 9 products) | `women-new-drops` |
| `products_to_show` | `range` | Products to show | 8 rendered | `8` |
| `button_label` | `text` | CTA label | `View WOMEN NEW DROPS` | `View WOMEN NEW DROPS` |
| `button_url` | `url` | CTA link | `/collections/women-new-drops` | `/collections/women-new-drops` |

### C.8 `image-with-text-overlay` — `template--18814156636208__image-with-text-overlay-1`

| Setting id | Type | Label | Observed value on siwafragrances.com | Proposed default |
|---|---|---|---|---|
| `color_scheme` | `color_scheme` | Colour scheme | `scheme-4` | `scheme-4` |
| `media_type` | `select` | Media type | `image` | `image` |
| `image_desktop` | `image_picker` | Image (desktop) | `Bundles_1.png?v=1759677715` (2500 × 900) | (merchant asset) |
| `image_mobile` | `image_picker` | Image (mobile) | `Artboard_1_1.png?v=1759677715` (1100 × 1500) | (merchant asset) |
| `image_tablet` | `image_picker` | Image (tablet) | not used | (blank) |
| `image_alt` | `text` | Image alt text | `""` (empty) | `Siwa Fragrances bundles` |
| `subheading` | `inline_richtext` | Eyebrow | `OFFERS & DISCOUNTS` | `OFFERS & DISCOUNTS` |
| `subheading_size` | `select` | Eyebrow size | `h6` | `h6` |
| `heading` | `inline_richtext` | Heading | `OUR BUNDLES` | `OUR BUNDLES` |
| `heading_size` | `select` | Heading size | `h2` | `h2` |
| `content` | `richtext` | Body text | none | (blank) |
| `button_label` | `text` | CTA label | `Shop NOW` | `Shop NOW` |
| `button_url` | `url` | CTA link | `/collections/bundles` | `/collections/bundles` |
| `button_style` | `select` | CTA style | `button--outline` | `outline` |
| `button_background` | `color` | CTA background | `255 255 255` | `#FFFFFF` |
| `button_outline_color` | `color` | CTA outline | `255 255 255` | `#FFFFFF` |
| `button_text_color` | `color` | CTA text | `28 28 28` | `#1C1C1C` |
| `overlay_color` | `color` | Overlay | `0 0 0` | `#000000` |
| `overlay_opacity` | `range` (%) | Overlay opacity | `0.0` | `0` |
| `content_max_width` | `range` (px) | Content max width | `var(--container-xs-max-width)` = 680 px | `680` |
| `section_height` | `select` | Section height | `content-over-media--md` | `medium` |
| `content_position_desktop` | `select` | Position (desktop) | `sm:place-self-end-start` | `bottom_left` |
| `content_position_mobile` | `select` | Position (mobile) | `place-self-center` | `center` |
| `text_alignment_desktop` | `select` | Alignment (desktop) | `sm:text-start` | `left` |
| `text_alignment_mobile` | `select` | Alignment (mobile) | `text-center` | `center` |
| `reveal_on_scroll` | `checkbox` | Reveal on scroll | `true` | `true` |

### C.9 `featured-collections` #2 — `template--18814156636208__featured-collections-2`

Same setting surface as C.7. Differing values only:

| Setting id | Type | Label | Observed value on siwafragrances.com | Proposed default |
|---|---|---|---|---|
| `subheading` | `inline_richtext` | Eyebrow | `<strong>BEST SELLERS</strong>` | `<strong>BEST SELLERS</strong>` |
| `show_divider` | `checkbox` | Show top divider | absent | `false` |
| `horizontal_spacing_factor` | `range` | Horizontal spacing | **`0.2`** | `0.2` |
| `vertical_spacing_factor` | `range` | Vertical spacing | **`0.2`** | `0.2` |
| block 1 `title` | `text` | Tab label | `men` | `men` |
| block 1 `collection` | `collection` | Collection | `/collections/men-best-sellers` (`MEN BEST SELLERS`, 17 products) | `men-best-sellers` |
| block 1 `button_label` | `text` | CTA label | `View all MEN BEST SELLERS` | `View all MEN BEST SELLERS` |
| block 1 `button_url` | `url` | CTA link | `/collections/men-best-sellers` | `/collections/men-best-sellers` |
| block 1 `products_to_show` | `range` | Products shown | 6 | `8` |
| block 2 `title` | `text` | Tab label | `WOMEN` | `WOMEN` |
| block 2 `collection` | `collection` | Collection | `/collections/women-best-sellers` (`WOMEN BEST SELLERS`, 11 products) | `women-best-sellers` |
| block 2 `button_label` | `text` | CTA label | `View ALL WOMEN BEST SELLERS` | `View ALL WOMEN BEST SELLERS` |
| block 2 `button_url` | `url` | CTA link | `/collections/women-best-sellers` | `/collections/women-best-sellers` |
| block 2 `products_to_show` | `range` | Products shown | 8 | `8` |

### C.10 `apps` (Judge.me testimonials carousel) — `template--18814156636208__17592337449e486738`

Section-level settings (theme-owned):

| Setting id | Type | Label | Observed value on siwafragrances.com | Proposed default |
|---|---|---|---|---|
| `color_scheme` | `color_scheme` | Colour scheme | `scheme-1` | `scheme-1` |
| `show_divider` | `checkbox` | Show top divider | `bordered-section` present | `true` |
| `use_container` | `checkbox` | Constrain to page width | `.container` present | `true` |

App-block settings (Judge.me; listed so a native rebuild can reproduce them):

| Setting id | Type | Label | Observed value on siwafragrances.com | Proposed default |
|---|---|---|---|---|
| `heading` | `text` | Widget heading | `Customers are saying` | `Customers are saying` |
| `max_width` | `range` (px) | Widget max width | `1200px` | `1200` |
| `text_color` | `color` | Text colour | `#000000` | `#000000` |
| `card_color` | `color` | Card background | `#f9f9f9` (`249 249 249`) | `#F9F9F9` |
| `card_border_radius` | `range` (px) | Card radius | empty | `0` |
| `card_border` | `select` | Card border | `none` | `none` |
| `card_shadow` | `select` | Card shadow | `none` | `none` |
| `quote_marks_size` | `select` | Quote marks | `hidden` | `hidden` |
| `quote_mark_color` | `color` | Quote mark fill | `#ffd700` | `#FFD700` |
| `text_size` | `range` (px) | Review text size | `24px` | `24` |
| `text_size_mobile` | `range` (px) | Review text size (mobile) | `20px` | `20` |
| `line_clamp` | `range` | Lines shown | `3` | `3` |
| `line_clamp_mobile` | `range` | Lines shown (mobile) | `4` | `4` |
| `stars_size` | `range` (px) | Star size | `24px` (`medium`) | `24` |
| `stars_color` | `color` | Star colour | `#ffd700` | `#FFD700` |
| `product_name_size` | `range` (px) | Product name size | `16px` (`small`) | `16` |
| `arrows_color` | `color` | Arrow colour | `#000000` | `#000000` |
| `transition_speed` | `range` (s) | Slide interval | `5` | `5` |
| `star_rating_filter` | `select` | Minimum stars | `5_star` | `5_star` |
| `max_reviews` | `range` | Reviews pulled | `20` | `20` |
| `reviews_selection` | `select` | Source | `custom_products` | `custom_products` |
| `product_ids` | `product` (list) | Featured products | `7735874814000, 7735877206064, 7735873568816, 7735877500976, 7924236714032, 7909727961136, 7776920109104, 7735874322480` | same |
| `show_sample_reviews` | `checkbox` | Sample reviews | `false` | `false` |
| `show_reviewer_name` | `checkbox` | Show reviewer name | `null` | `true` |
| `min_reviews` | `range` | Min reviews to render | `1` | `1` |
| `verified_badge_style` | `select` | Verified badge | `icon` | `icon` |

### C.11 / C.13 `scrolling-content` — `…__scrolling-content-2` and `…__scrolling-content-1`

| Setting id | Type | Label | Observed (#2 "True Elegance") | Observed (#1 "Signature Luxury") | Proposed default |
|---|---|---|---|---|---|
| `background_color` | `color` | Background | `0 0 0` `#000000` | `0 0 0` `#000000` | `#000000` |
| `text_color` | `color` | Text colour | `255 255 255` `#FFFFFF` | `255 255 255` `#FFFFFF` | `#FFFFFF` |
| `border_color` | `color` | Border colour | `38 38 38` `#262626` | `38 38 38` `#262626` | `#262626` |
| `show_divider` | `checkbox` | Show divider | `bordered-section` | `bordered-section` | `true` |
| `padded` | `checkbox` | Padded variant | `section-spacing--padded` | `section-spacing--padded` | `true` |
| `direction` | `select` | Scroll direction | `right` | `left` | `left` |
| `speed` | `range` | Scroll speed | `0.1` | `0.1` | `0.1` |
| `font_size_min` | `range` (px) | Font size @375 px | `32` | `32` | `32` |
| `font_size_max` | `range` (px) | Font size @1400 px | `64` | `64` | `64` |
| `content_gap_min` | `range` (px) | Repeat gap @375 px | `25` | `30` | `30` |
| `content_gap_max` | `range` (px) | Repeat gap @1400 px | `50` | `30` | `50` |
| `vertical_spacing_min` | `range` (px) | Padding @375 px | `20` | `20` | `20` |
| `vertical_spacing_max` | `range` (px) | Padding @1400 px | `40` | `46` | `40` |
| **block `item`** | | | | | |
| `item_type` | `select` | Item type | text | text | `text` |
| `text` | `inline_richtext` | Item text | **`True Elegance`** | **`Signature Luxury`** | — |
| `image` | `image_picker` | Item image | none | none | (blank) |
| `link` | `url` | Item link | none | none | (blank) |

### C.12 `collection-list` — `template--18814156636208__collection_list_gpXjxV`

| Setting id | Type | Label | Observed value on siwafragrances.com | Proposed default |
|---|---|---|---|---|
| `color_scheme` | `color_scheme` | Colour scheme | `scheme-1` | `scheme-1` |
| `show_divider` | `checkbox` | Show top divider | `bordered-section` present | `true` |
| `heading` | `inline_richtext` | Section heading | `our collections` (`h2`) | `our collections` |
| `heading_size` | `select` | Heading size | `h2` | `h2` |
| `text_alignment` | `select` | Heading alignment | `justify-self-center text-center` | `center` |
| `layout` | `select` | Layout | carousel (`scroll-area bleed lg:unbleed`) | `carousel` |
| `allow_drag` | `checkbox` | Draggable | `allow-drag` | `true` |
| `group_cells` | `checkbox` | Page by group | `group-cells` | `true` |
| `show_arrows` | `checkbox` | Prev/next arrows | present, on hover | `true` |
| `arrow_size` | `select` | Arrow size | `circle-button--lg` | `large` |
| `items_per_row` | `range` | Items per row (≥1150 px) | `2` | `2` |
| `item_width_mobile` | `range` (vw) | Item width (<700 px) | `84vw` | `84` |
| `item_width_tablet` | `range` (vw) | Item width (700–1149 px) | `62vw` | `62` |
| `gap_mobile` | `range` (px) | Gap (<1150 px) | `1.5rem` = 24 px | `24` |
| `gap_desktop` | `range` (px) | Gap (≥1150 px) | `1.875rem` = 30 px | `30` |
| `card_height` | `select` | Card height | `content-over-media--md` | `medium` |
| `card_color_scheme` | `color_scheme` | Card overlay scheme | `scheme-4` | `scheme-4` |
| `card_overlay_color` | `color` | Card overlay | `0 0 0` | `#000000` |
| `card_overlay_opacity` | `range` (%) | Overlay opacity | `0.0` | `0` |
| `card_content_position` | `select` | Label position | `place-self-end-center` | `bottom_center` |
| `card_text_alignment` | `select` | Label alignment | `text-center` | `center` |
| `card_button_style` | `select` | Label button style | `button--outline` | `outline` |
| `hover_zoom` | `checkbox` | Zoom image on hover | `zoom-image group-hover:zoom` | `true` |

Blocks (`collection`, 8 of them) — one row per block:

| # | `label` (`text`) | `collection` (`collection`) | `image` (`image_picker`) | image alt (`text`) |
|---|---|---|---|---|
| 1 | `for her` | `for-her` | `WhatsApp_Image_2025-09-25_at_1.05.14_AM.jpg?v=1759267955` (1600²) | `FOR HER` |
| 2 | `FOR Him` | `for-him` | `For_Him.png?v=1759518964` (1600²) | `FOR HIM` |
| 3 | `bundles` | `bundles` | `Artboard_1.png?v=1759677906` (1100 × 1500) | `Bundles` |
| 4 | `body lotion` | `body-lotion` | `Artboard_3_1.jpg?v=1759147740` (3507 × 4982) | `Body lotion` |
| 5 | `unisex` | `unisex` | `Unisex.png?v=1759518990` (1600²) | `UNISEX` |
| 6 | `original creation` | `original-creations` | `MG_4160.jpg?v=1759268144` (1600²) | `Original Creations` |
| 7 | `best sellers` | `best-sellers` | `MG_4168.jpg?v=1759268008` (1600²) | `BEST SELLERS` |
| 8 | `new drops` | `new-drops` | `MG_4172.jpg?v=1759267985` (1600²) | `new drops` |

All 8 images resolve from `/cdn/shop/collections/` — i.e. the collection's own featured image is
the default; the `image` setting is an override.

### C.14 `media-grid` — `template--18814156636208__media-grid`

| Setting id | Type | Label | Observed value on siwafragrances.com | Proposed default |
|---|---|---|---|---|
| `color_scheme` | `color_scheme` | Colour scheme | `scheme-1` | `scheme-1` |
| `show_divider` | `checkbox` | Show top divider | absent | `false` |
| `heading` | `inline_richtext` | Section heading | `Uncover Hidden Gems` | `Uncover Hidden Gems` |
| `heading_size` | `select` | Heading size | `h2` | `h2` |
| `text_alignment` | `select` | Heading alignment | `justify-self-center text-center` | `center` |
| `container_width` | `select` | Container | `.container--lg` | `lg` (1260 px) |
| `row_height_mobile` | `range` (px) | Row height (<700 px) | `180px` | `180` |
| `row_height_desktop` | `range` (px) | Row height (≥700 px) | `290px` | `290` |
| `grid_gap_mobile` | `range` (px) | Grid gap (<1150 px) | `0.5rem` = 8 px | `8` |
| `grid_gap_desktop` | `range` (px) | Grid gap (≥1150 px) | `0.75rem` = 12 px | `12` |
| **block `image`** ×3 | | | | |
| `column_span` | `range` (1–12) | Columns spanned | `4` (all three) | `4` |
| `row_span` | `range` | Rows spanned | `2` (all three) | `2` |
| `media_type` | `select` | Media type | `image` | `image` |
| `image` | `image_picker` | Tile image | see table below | (merchant asset) |
| `image_alt` | `text` | Alt text | `""` on all three | (per tile) |
| `heading` | `inline_richtext` | Tile heading | see table below (`h3`) | — |
| `button_label` | `text` | Tile button label | see table below | — |
| `link` | `url` | Tile link | see table below | — |
| `button_style` | `select` | Button style | `button--outline` | `outline` |
| `color_scheme` | `color_scheme` | Tile scheme | `scheme-4` | `scheme-4` |
| `overlay_color` | `color` | Overlay | `0 0 0` | `#000000` |
| `overlay_opacity` | `range` (%) | Overlay opacity | `0.0` | `0` |
| `content_position` | `select` | Content position | `place-self-center` | `center` |
| `text_alignment` | `select` | Text alignment | `text-center` | `center` |
| `hover_zoom` | `checkbox` | Hover zoom | `zoom-image group-hover:zoom` | `true` |
| `reveal_on_scroll` | `checkbox` | Reveal on scroll | `true` | `true` |

| Tile | `heading` | `button_label` | `link` | `image` |
|---|---|---|---|---|
| 1 | `ORIGINAL CREATIONS` | `TRY NOW` | `/collections/original-creations` | `Original_Creations_1.jpg?v=1759267663` (1600²) |
| 2 | `BODY SPLASHES` | `SHOP NOW` | `/collections/body-splash` | `Body_Splash.jpg?v=1759267660` (1600²) |
| 3 | `body LOTION` | `SHOP NOW` | `/collections/body-lotion` | `MG_7385.jpg?v=1759147726` (3507 × 4982) |

### C.15 `apps` (empty) — `template--18814156636208__17765002303c384e0a`

| Setting id | Type | Label | Observed value on siwafragrances.com | Proposed default |
|---|---|---|---|---|
| `color_scheme` | `color_scheme` | Colour scheme | no wrapper rendered (section is empty) | `scheme-1` |
| `use_container` | `checkbox` | Constrain to page width | not determinable from captured data | `true` |
| `show_divider` | `checkbox` | Show top divider | not determinable from captured data | `false` |

Keep the section in the homepage template so merchants can add app blocks without code changes.

### C.16 `text-with-icons` — `sections--18814157226032__text-with-icons`

| Setting id | Type | Label | Observed value on siwafragrances.com | Proposed default |
|---|---|---|---|---|
| `color_scheme` | `color_scheme` | Colour scheme | `scheme-1` | `scheme-1` |
| `show_divider` | `checkbox` | Show top divider | `bordered-section` present | `true` |
| `vertical_spacing` | `select` | Vertical spacing preset | `section-spacing--tight` | `tight` |
| `carousel_below` | `select` | Carousel below breakpoint | `disabled-on="sm"` → carousel < 700 px only | `sm` |
| `allow_swipe` | `checkbox` | Allow swipe | present | `true` |
| `show_page_dots` | `checkbox` | Show dots (mobile) | 3 dots, `sm:hidden` | `true` |
| `border_color` | `color` | Divider colour | `var(--text-color) / 0.15` | `#1C1C1C` @ 15 % |
| `stack_gap` | `range` (px) | Outer stack gap | `gap-8` = 32 px [inferred] | `32` |
| `icon_text_gap` | `range` (px) | Icon → text gap | `gap-6` = 24 px [inferred] | `24` |
| `heading_body_gap` | `range` (px) | Heading → body gap | `gap-2` = 8 px [inferred] | `8` |
| `text_alignment_mobile` | `select` | Alignment (mobile) | `text-center` | `center` |
| `text_alignment_desktop` | `select` | Alignment (desktop) | `sm:text-start` | `left` |
| **block `item`** ×3 | | | | |
| `icon` | `select` | Icon | see table below | — |
| `custom_icon` | `image_picker` | Custom icon | none on any block | (blank) |
| `icon_size_desktop` | `range` (px) | Icon size (desktop) | `24` | `24` |
| `icon_size_mobile` | `range` (px) | Icon size (mobile) | `24` | `24` |
| `icon_stroke_width` | `range` | Icon stroke | `2` | `2` |
| `icon_color` | `color` | Icon colour | `currentColor` = `28 28 28` | `#1C1C1C` |
| `heading` | `inline_richtext` | Item heading | see table below (`h6` + `<strong>`) | — |
| `content` | `richtext` | Item body | see table below | — |
| `link` | `url` | Item link | none | (blank) |

| # | `icon` | `heading` | `content` |
|---|---|---|---|
| 1 | `picto-return` | **`14 days return`** | `Returns are accepted for items in their original, unused sealed condition.` |
| 2 | `picto-operator` | **`support 24/7`** | `Reach out to us via DM<br/>Email: contact@siwafragrances.com<br/><br/>` |
| 3 | `picto-lock` | **`Payment Protection`** | `Your payment details are encrypted and secure.` |

### C.17 `footer` — `sections--18814157226032__footer`

| Setting id | Type | Label | Observed value on siwafragrances.com | Proposed default |
|---|---|---|---|---|
| `color_scheme` | `color_scheme` | Colour scheme | `scheme-3` | `scheme-3` |
| `content_justify` | `select` | Block distribution | `--footer-content-justify-items: space-between` | `space_between` |
| `block_heading_gap` | `range` (px) | Heading → list gap | `gap-4 sm:gap-5` = 16 / 20 px [inferred] | `20` |
| `list_item_gap` | `range` (px) | Between links | `gap-2.5` = 10 px [inferred] | `10` |
| `copyright_text` | `inline_richtext` | Copyright line | `© 2026 - Siwa Fragrances` | `© {{ 'now' | date: '%Y' }} - Siwa Fragrances` |
| `show_powered_by` | `checkbox` | "Powered by Shopify" | link present with an empty label | `false` |
| `show_payment_icons` | `checkbox` | Payment icons | not rendered | `false` |
| `show_locale_selector` | `checkbox` | Country / language selector | not rendered | `false` |
| `social_icon_size` | `range` (px) | Social icon size | `24` | `24` |
| `social_icon_style` | `select` | Social icon style | `social-media--list` + `branding-colors--*` | `list` |
| `social_facebook` | `url` | Facebook | `https://www.facebook.com/share/1AYNy8M7mJ/?mibextid=wwXIfr` | same |
| `social_instagram` | `url` | Instagram | `https://www.instagram.com/siwafragrances?igsh=MXE0anh6NXlnYzFmaw==` | same |
| `social_tiktok` | `url` | TikTok | `https://www.tiktok.com/@siwafragrances?_t=ZS-8zhBvV3DKCe&_r=1` | same |
| `social_whatsapp` | `url` | WhatsApp | `https://api.whatsapp.com/message/VLSFRC5URF6EP1?autoload=1&app_absent=0` | same |
| **block `links` #1** | | | | |
| `heading` | `text` | Block heading | `Main menu` | `Main menu` |
| `menu` | `link_list` | Menu | HOME, SHOP ALL, ORIGINAL CREATIONS, FOR HIM, FOR HER, UNISEX, BUNDLES, BODY SPLASH, BODY LOTION, CONTACT US | `main-menu` |
| **block `links` #2** | | | | |
| `heading` | `text` | Block heading | `MORE INFORMATION` | `MORE INFORMATION` |
| `menu` | `link_list` | Menu | SEARCH `/search`, REFUND POLICY `/policies/refund-policy`, ABOUT US `/pages/about-us`, PRIVACY POLICY `/policies/privacy-policy` | `footer` |
| **block `newsletter`** | | | | |
| `heading` | `text` | Block heading | `Newsletter` | `Newsletter` |
| `content` | `richtext` | Body | `Sign up to our newsletter to receive exclusive offers.` | same |
| `input_label` | `text` | Field label | `E-mail` | `E-mail` |
| `button_label` | `text` | Button label | `Subscribe` | `Subscribe` |

### C.18 `main-product` — `template--18814156767280__main`

| Setting id | Type | Label | Observed value on siwafragrances.com | Proposed default |
|---|---|---|---|---|
| `color_scheme` | `color_scheme` | Colour scheme | `scheme-1` | `scheme-1` |
| `container_width` | `select` | Container | `.container--lg` = 1260 px | `lg` |
| `vertical_spacing` | `select` | Vertical spacing preset | `section-spacing--tight` | `tight` |
| `desktop_gallery_width` | `range` (fr ×100) | Gallery column | `0.65fr` | `65` |
| `desktop_info_width` | `range` (fr ×100) | Info column | `0.35fr` | `35` |
| `mobile_stack_order` | `select` | Mobile order | gallery → info → content | `gallery_first` |
| `gallery_layout` | `select` | Gallery layout | `scroll-carousel` + `adaptive-height` | `carousel` |
| `gallery_bleed_mobile` | `checkbox` | Full-bleed gallery (mobile) | `full-bleed md:unbleed` | `true` |
| `allow_zoom` | `checkbox` | Enable zoom | `allow-zoom="3"` | `true` |
| `zoom_level` | `range` | Zoom factor | `3` | `3` |
| `zoom_button_label` | `text` | Zoom button (sr-only) | `Zoom picture` | `Zoom picture` |
| `sticky_info` | `checkbox` | Sticky info column | `<safe-sticky>` | `true` |
| `show_sticky_bar` | `checkbox` | Sticky add-to-cart bar | `<product-sticky-bar>` present | `true` |
| `enable_quick_buy` | `checkbox` | Quick-buy modal | template rendered | `true` |
| `track_recently_viewed` | `checkbox` | Track recently viewed | `localStorage['theme:recently-viewed-products']` | `true` |
| `complementary_limit` | `range` | Complementary products | `limit="2" intent="complementary"` | `2` |
| **blocks (order as rendered)** | | | | |
| `title` (`title`) | `select` | Title size | `<h1 class="product-title h3">` — element `h1`, scale `h3` | `h3` |
| `price` (`price`) | `select` | Price size | `h4 text-subdued` | `h4` |
| `payment_terms` (`payment-terms`) | — | Shop Pay terms | renders empty (installments disabled) | — |
| `separator` (`separator`) | — | Divider | `<hr>` | — |
| `vendor` (`vendor`) | `select` | Vendor size / link | `h6 link-faded` → `/collections/vendors?q=Power Of You Giorgio Armani` | `h6` |
| `variant_picker` (`variant-picker`) | `select` | Picker style | `block-swatch`; option label `Size:`; values `30 ml` / `50 ml` / `100 ml` | `block` |
| `text_XP3cia` (`text`) | `richtext` | Custom text | `<a href="/pages/size-chart-1" title="Size Chart">Size chart</a>` | same |
| `quantity_selector` (`quantity-selector`) | `checkbox` | Quantity selector | shown, min 1, step 1 | `true` |
| `inventory_Ut4wkJ` (`inventory`) | `text` + `color` | Low-stock notice | `Only a few units left`, colour `#ff0000` (hardcoded) | text + `#FF0000` |
| `volume_pricing_P9F794` (`volume-pricing`) | — | Volume pricing | renders empty | — |
| `buy_buttons` (`buy-buttons`) | `text` + `checkbox` | Add-to-cart | label `Add to cart`, `w-full`, no dynamic checkout button | `Add to cart`, full width, dynamic off |
| `description` (`description`) | — | Description | full `body_html` | — |
| `@app` Judge.me preview badge | — | Rating badge | `jdgm-preview-badge` | — |

Quick-buy modal block subset: `title`, `price`, `payment_terms`, `separator`, `vendor`,
`variant_picker`, `quantity_selector`, `buy_buttons`, `@app` badge, plus a `View details` link
(label is an editable `text` setting).

### C.19 `apps` (Judge.me review widget) — `template--18814156767280__1759233522bc5ee263`

| Setting id | Type | Label | Observed value on siwafragrances.com | Proposed default |
|---|---|---|---|---|
| `color_scheme` | `color_scheme` | Colour scheme | `scheme-1` | `scheme-1` |
| `show_divider` | `checkbox` | Show top divider | `bordered-section` present | `true` |
| `use_container` | `checkbox` | Constrain to page width | `.container` present | `true` |
| `widget_heading` (app) | `text` | Widget heading | `Customer Reviews` | `Customer Reviews` |
| `empty_state_text` (app) | `text` | Empty state | `Be the first to write a review` | same |
| `write_review_label` (app) | `text` | Write-review link | `Write a review` | same |
| `widget_max_width` (app) | `range` (px) | Widget max width | `1200px` | `1200` |
| `empty_state_mode` (app) | `select` | Empty-state behaviour | `empty_widget` | `empty_widget` |

### C.20 `related-products` — `template--18814156767280__related-products`

| Setting id | Type | Label | Observed value on siwafragrances.com | Proposed default |
|---|---|---|---|---|
| `intent` | `select` | Recommendation type | `related` | `related` |
| `products_limit` | `range` (1–10) | Products to show | `10` | `10` |
| `heading` | `inline_richtext` | Heading | not determinable from captured data (async section) | `You may also like` |
| `layout` | `select` | Layout | not determinable from captured data | `carousel` |
| `items_per_row` | `range` | Items per row | not determinable from captured data | `4` |
| `items_per_row_mobile` | `range` | Items per row (mobile) | not determinable from captured data | `2` |
| `color_scheme` | `color_scheme` | Colour scheme | not determinable from captured data | `scheme-1` |
| `show_divider` | `checkbox` | Show top divider | not determinable from captured data | `true` |

### C.21 `recently-viewed-products` — `template--18814156767280__recently_viewed_products_LGtyH6`

| Setting id | Type | Label | Observed value on siwafragrances.com | Proposed default |
|---|---|---|---|---|
| `color_scheme` | `color_scheme` | Colour scheme | `scheme-1` | `scheme-1` |
| `show_divider` | `checkbox` | Show top divider | `bordered-section` present | `true` |
| `heading` | `inline_richtext` | Heading | `Recently viewed products` | `Recently viewed products` |
| `heading_size` | `select` | Heading size | `h2` | `h2` |
| `text_alignment` | `select` | Heading alignment | `justify-self-center text-center` | `center` |
| `products_count` | `range` | Products to show | `9` | `9` |
| `exclude_current_product` | `checkbox` | Exclude current product | `exclude-id="8032720257072"` | `true` |
| `items_per_row` | `range` | Items per row (desktop) | `4` | `4` |
| `items_per_row_mobile` | `range` | Items per row (mobile) | `2` | `2` |
| `horizontal_spacing_factor` | `range` | Horizontal spacing | `1` | `1` |
| `vertical_spacing_factor` | `range` | Vertical spacing | `1` | `1` |
| `hide_when_empty` | `checkbox` | Hide when empty | CSS `:has(...:empty){display:none}` | `true` |

### C.22 `main-collection` — `template--18814157029424__main`

| Setting id | Type | Label | Observed value on siwafragrances.com | Proposed default |
|---|---|---|---|---|
| `color_scheme` | `color_scheme` | Colour scheme | `scheme-1` | `scheme-1` |
| `show_collection_title` | `checkbox` | Show collection title | no `<h1>` on either captured collection page | `false` |
| `show_collection_description` | `checkbox` | Show description | not rendered | `false` |
| `show_collection_image` | `checkbox` | Show banner image | not rendered | `false` |
| `products_per_page` | `range` | Products per page | `18` (56 products → 4 pages) | `18` |
| `show_product_count` | `checkbox` | Show product count | `56 products` | `true` |
| `filter_button_label` | `text` | Filter button | `Filter by` | `Filter by` |
| `sort_button_label` | `text` | Sort button | `Sort by` | `Sort by` |
| `sort_drawer_title` | `text` | Sort drawer title | `Sort by` | `Sort by` |
| `filter_drawer_title` | `text` | Filter drawer title | `Filters` | `Filters` |
| `default_sort` | `select` | Default sort | `title-ascending` (`aria-selected="true"`) | `title-ascending` |
| `filter_layout` | `select` | Filter layout | drawer < 1000 px, sidebar slot ≥ 1000 px (`--collection-sidebar-width`) | `sidebar` |
| `show_layout_switcher` | `checkbox` | Layout switchers | mobile: large/medium · desktop: large/medium/compact | `true` |
| `default_layout` | `select` | Default card layout | `medium` (`is-active`) | `medium` |
| `items_per_row_compact` | `range` | Compact per row | `4` (≥700 px) → `6` (≥1400 px) | `4` |
| `items_per_row_medium` | `range` | Medium per row | `2` / `3` / `3` / `4` | `3` |
| `items_per_row_large` | `range` | Large per row | `1` / `2` / `2` / `3` | `2` |
| `horizontal_spacing_factor` | `range` | Horizontal spacing | `1` | `1` |
| `vertical_spacing_factor` | `range` | Vertical spacing | `1` | `1` |
| `max_items_per_row_allowed` | `range` | Hard cap | `99 !important` | `99` |
| `pagination_type` | `select` | Pagination | numbered links `?page=N` | `paginate` |
| `sticky_toolbar` | `checkbox` | Sticky toolbar | `<height-observer variable="collection-toolbar">` | `true` |
| `show_vendor` | `checkbox` | Card vendor | yes | `true` |
| `show_rating` | `checkbox` | Card rating | yes | `true` |
| `show_quick_add` | `checkbox` | Card quick-add | yes | `true` |

Available filters on the reference: **only** `Availability` (`filter.v.availability`, checkbox
label `In stock only`) and `Price`. No option, vendor or tag filters are configured, despite the
6 tags and the `size` option present on the catalogue.

### C.23 `main-page` — `template--18814156701744__main` (About Us)

| Setting id | Type | Label | Observed value on siwafragrances.com | Proposed default |
|---|---|---|---|---|
| `color_scheme` | `color_scheme` | Colour scheme | `scheme-1` | `scheme-1` |
| `container_width` | `select` | Container | `.container--xs` = 680 px | `xs` |
| `vertical_spacing` | `select` | Vertical spacing preset | `section-spacing--tight` | `tight` |
| `show_title` | `checkbox` | Show page title | `<h1 class="h2">ABOUT US</h1>` | `true` |
| `title_size` | `select` | Title size | `h2` | `h2` |
| `text_alignment` | `select` | Header alignment | `justify-self-center text-center` | `center` |
| `content` | (dynamic) | Page content | `page.content` — 2 paragraphs + 3-item list (`Exquisite Ingredients`, `Inclusive Pricing`, `Personalized Service`) | — |

---

## PART D — Zero-hardcode compliance notes

Everything below is currently baked into the reference site (CSS, markup or app config) and
**must be exposed as a Theme Customizer setting** in the rebuild. Each row cites the evidence and
names the setting type required by §6 of the workflow skill.

### D.1 Hard blockers (a QA agent must FAIL the build if any of these is fixed in CSS)

| # | What is hardcoded on the reference | Evidence | Required setting |
|---|---|---|---|
| 1 | Low-stock text colour `#ff0000` | `<style> .inventory {color: #ff0000;} </style>` injected after the footer in `raw/pages/index.html` | `color` — `inventory_low_color` |
| 2 | All section vertical padding comes from a single global `--section-vertical-spacing` (40/64 px) — no per-section control | `:root` block; only the two `scrolling-content` sections override it | `range` × 4 (`padding_top/bottom`, `mobile_padding_top/bottom`) per section |
| 3 | All horizontal padding comes from a single global `--container-gutter` (20/32/48 px) | `:root` block | `range` × 3 (`padding_left/right`, `mobile_padding_horizontal`) per section |
| 4 | No section has any margin control at all | no `margin` declarations on any section wrapper | `range` × 2 (`margin_top`, `margin_bottom`) per section |
| 5 | Section max-width is fixed per container class (`--xs` / `--lg` / 100 %) — merchants cannot change it | `.container`, `.container--lg`, `.container--xs` usage | `range` — `section_max_width` per section |
| 6 | Grid gaps are theme constants (24 px product grids, 24/30 px collection list, 8/12 px media grid) | `sizes` arithmetic; `--collection-list-gap`; `--media-grid-gap` | `range` — `item_gap` per section (desktop **and** mobile) |
| 7 | Adjacent same-background sections collapse their top padding via a `:has()` CSS rule with a hashed class name | `.shopify-section:has(.section-spacing.color-scheme--bg-<hash>) + …{padding-block-start:0}` | `checkbox` — `collapse_with_previous_section` |
| 8 | The `bordered-section` divider is a class toggle with no colour or width control | 7 sections carry it | `checkbox` + `color` + `range` (`show_divider`, `divider_color`, `divider_width`) |
| 9 | `scrolling-content` background/text/border are inline styles with a hashed pseudo-scheme, not a named colour scheme | `color-scheme--bg-77e774e6…` + inline `--background: 0 0 0` | promote to a real `color_scheme` entry |
| 10 | Icon SVGs in `text-with-icons` are inlined from the theme's icon library — no custom-image path, no per-block size/colour/stroke | `icon-picto-return` / `-operator` / `-lock`, `width="24"`, `stroke-width="2"` | `select` + `image_picker` + `range` × 2 + `color` |
| 11 | Header vertical padding (`1rem` / `1.6rem`) and logo widths (80/110 px) are section-scoped CSS with no exposed range | header `<style>` | `range` × 4 |
| 12 | Announcement-bar font sizes (10 px / 11 px) are section-scoped CSS | announcement-bar `<style>` | `range` × 2 |
| 13 | Media-grid tile spans (`4` col / `2` row) are inline styles per tile | `--media-grid-item-column-span` / `-row-span` | `range` × 2 per block |
| 14 | Collection-list item widths (`84vw` / `62vw`) and per-row count are section CSS | `--collection-list-item-size`, `--collection-list-items-per-row` | `range` × 3 |
| 15 | `scrolling-content` font size and repeat gap are `clamp()` expressions written into section CSS | both scrolling sections | `range` × 4 (`font_size_min/max`, `content_gap_min/max`) |
| 16 | Product-list spacing factors (`1` vs `0.2`) exist as section CSS variables but with no visible label | both featured-collections sections | `range` × 2 with labels |
| 17 | Judge.me widget colours (`#f9f9f9` card, `#ffd700` stars, `#000000` text/arrows) and sizes (24/20 px text, 24 px stars, 16 px product name, 1200 px max width) live only in the app's block config | inline `style` on `.jdgm-widget` | mirror as theme settings, or drive the app block from theme colour schemes |
| 18 | `--star-color: 255 215 0` (theme) and `--stars-color: #ffd700` (Judge.me) are the same value maintained twice | `:root` vs Judge.me inline style | one `color` setting feeding both |
| 19 | The Shopify Inbox chat widget has no theme-side visibility toggle | `shopify-inbox-1295` scripts | `checkbox` — `show_chat_widget` |
| 20 | Breakpoints (`700 / 1000 / 1150 / 1400 / 1600 px`) are compiled into every section's media queries | `window.themeVariables.mediaQueries` | keep structural, but ensure every setting that differs across them has a desktop **and** mobile variant |

### D.2 Content currently unaddressable from the customizer

| # | Item | Evidence | Required setting |
|---|---|---|---|
| 21 | Every hero/tile image has `alt=""` (slideshow ×2, image-with-text-overlay, 3 media-grid tiles) | `alt=""` in `<img>` | `text` — `image_alt` per media slot |
| 22 | The slideshow overlay is a radial gradient seeded from `221 39 57` `#DD2739` at 0 % — an invisible leftover | `--content-over-media-gradient-overlay` | `color` + `range` (opacity), or `color_background` for gradients |
| 23 | `--shadow-block: px px px rgb(var(--text-primary) / 0.0)` is a malformed CSS value (empty numbers) | `:root` | `range` × 3 + `color` with valid defaults |
| 24 | Footer "Powered by Shopify" link renders with an empty label | footer `<a>` with a single space | `checkbox` — `show_powered_by` |
| 25 | Footer copyright year `© 2026` is a literal string | footer `footer__aside` | `inline_richtext` with a `{{ 'now' \| date: '%Y' }}` default |
| 26 | Collection-card labels are free text that has drifted from collection titles (`for her` vs `FOR HER`, `original creation` vs `Original Creations`) | §C.12 vs `raw/collections.json` | keep as `text`, but default to `collection.title` |
| 27 | Featured-collections tab labels have drifted (`women` vs `WOMEN`) | §C.7 vs §C.9 | keep as `text`, document the convention |
| 28 | PDP "Size chart" link is a hardcoded `<a href="/pages/size-chart-1">` inside a rich-text block | `data-block-id="text_XP3cia"` | `url` setting, not a literal href in rich text |
| 29 | Product `body_html` carries editor cruft (`data-path-to-node`, `data-index-in-node`) and the About Us page carries `class="ds-markdown-paragraph"` | `pdp_sample.html`, `pages_about-us.html` | content hygiene task — no theme setting, but the rebuild must not style these classes |
| 30 | Homepage `<title>` is literally `siwafragrances.com` | `raw/pages/index.html` `<head>` | Shopify SEO field — flag to merchant |
| 31 | No favicon is present in the captured `<head>` | `raw/pages/index.html` | `image_picker` — `favicon` |
| 32 | The `vendor` field stores the "inspired-by" designer fragrance, and the PDP renders it as a link to `/collections/vendors?q=…` | `Power Of You Giorgio Armani` on `sundaze` | `checkbox` (`show_vendor`) + `select` (`vendor_link_behaviour`) + `text` (`vendor_label`), so the merchant can relabel or unlink it |
| 33 | Only two storefront filters (`Availability`, `Price`) are configured despite 6 tags and a `size` option | `collections_all.html` facets | Shopify Search & Discovery config — flag to merchant |
| 34 | Payment icons and the country/currency selector are absent from the footer | footer markup | `checkbox` × 2 |
| 35 | The homepage carries an entirely empty `apps` section | `template--18814156636208__17765002303c384e0a` | keep the section available; no setting needed |
