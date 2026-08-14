# 02 — DESIGN SYSTEM

**Reference:** https://siwafragrances.com/ · **Theme:** Prestige v11.1.0 (theme_store_id 855) · **Audit date:** 2026-07-27

## Source of evidence

| Source | What it provided | How cited below |
|---|---|---|
| `raw/pages/index.html` — inline `<style>` blocks 0, 5–14 | Root token block, `@font-face`, all 6 colour schemes, header/announcement/section tokens | `index.html §0` … `§14` |
| `raw/pages/pdp_sample.html` — inline `<style>` blocks 0, 7, 11 | Same root token block + PDP `--product-grid`, recently-viewed grid | `pdp §n` |
| `raw/pages/collections_all.html` — inline `<style>` blocks 0, 7 | Same root token block + collection grid density tokens | `coll §n` |
| `raw/pages/*.html` — inline `<style>` block 2 | Judge.me `--jdgm-*` tokens | `jdgm block` |
| `theme.css` — `//siwafragrances.com/cdn/shop/t/4/assets/theme.css?v=41905930618406843701784986633`, linked from `<head>` of every page in `raw/pages/` | Component rules that *consume* the tokens (buttons, badges, inputs, product cards, containers) | `theme.css` |

The token layer (everything in §1–§4, §7) is fully contained in the captured HTML. Component rules (§5) come from `theme.css`, the stylesheet the captured HTML links to. **147 distinct CSS custom properties** were re-extracted across the three pages (superset of the 134 previously recorded — the extra ones are Shopify Inbox/agent chat tokens and section-scoped tokens).

Root font size is browser default **16px**; all `rem → px` conversions below use that.

---

## 1. Colour system

### 1.1 Colour schemes (Prestige `--r g b` triplet format)

Prestige stores colours as space-separated RGB triplets so alpha can be applied with `rgb(var(--token) / α)`. Every scheme sets the same 8 tokens. Applied via `class="color-scheme color-scheme--<name>"`; the generic rule is:

```css
.color-scheme{background-color:rgb(var(--background));background-image:var(--background-gradient);color:rgb(var(--text-color));border-color:rgb(var(--border-color))}
```

#### scheme-1 — default page scheme (light)

| Role | Token | `r g b` | Hex |
|---|---|---|---|
| Accent | `--accent` | `28 28 28` | `#1C1C1C` |
| Text | `--text-color` | `28 28 28` | `#1C1C1C` |
| Background | `--background` | `255 255 255 / 1.0` | `#FFFFFF` |
| Background (no alpha) | `--background-without-opacity` | `255 255 255` | `#FFFFFF` |
| Border | `--border-color` | `221 221 221` | `#DDDDDD` |
| Button background | `--button-background` | `28 28 28` | `#1C1C1C` |
| Button text | `--button-text-color` | `255 255 255` | `#FFFFFF` |
| Circle-button background | `--circle-button-background` | `255 255 255` | `#FFFFFF` |
| Circle-button text | `--circle-button-text-color` | `28 28 28` | `#1C1C1C` |

**Used on:** `<body>` (site-wide default), cart-drawer, every homepage content section (`featured_collections`, `featured-collections-2`, `collection_list`, `media-grid`, `text-with-icons`), PDP `main` + related/recently-viewed + text-with-icons, collection page `main` + text-with-icons. Background-group hash `bg-54922f2e920ba8346f6dc0fba343d673`.

#### scheme-2 — header scheme (pure black on white)

| Role | Token | `r g b` | Hex |
|---|---|---|---|
| Accent | `--accent` | `0 0 0` | `#000000` |
| Text | `--text-color` | `0 0 0` | `#000000` |
| Background | `--background` | `255 255 255 / 1.0` | `#FFFFFF` |
| Border | `--border-color` | `217 217 217` | `#D9D9D9` |
| Button background | `--button-background` | `0 0 0` | `#000000` |
| Button text | `--button-text-color` | `255 255 255` | `#FFFFFF` |
| Circle-button background | `--circle-button-background` | `255 255 255` | `#FFFFFF` |
| Circle-button text | `--circle-button-text-color` | `28 28 28` | `#1C1C1C` |

**Used on:** `<x-header class="header …">` and `<header-sidebar id="sidebar-menu">` (mobile nav drawer) on all three pages. Note it is *pure* `#000000` while the body is `#1C1C1C` — a deliberate 2-value near-black system.

#### scheme-3 — inverted / dark

| Role | Token | `r g b` | Hex |
|---|---|---|---|
| Accent | `--accent` | `255 255 255` | `#FFFFFF` |
| Text | `--text-color` | `255 255 255` | `#FFFFFF` |
| Background | `--background` | `28 28 28 / 1.0` | `#1C1C1C` |
| Border | `--border-color` | `62 62 62` | `#3E3E3E` |
| Button background | `--button-background` | `255 255 255` | `#FFFFFF` |
| Button text | `--button-text-color` | `28 28 28` | `#1C1C1C` |
| Circle-button background | `--circle-button-background` | `255 255 255` | `#FFFFFF` |
| Circle-button text | `--circle-button-text-color` | `28 28 28` | `#1C1C1C` |

**Used on:** announcement bar, footer, newsletter popup, privacy banner — i.e. every chrome element that frames the page. Background-group hash `bg-c1f8cb21047e4797e94d0969dc5d1e44`.

#### scheme-4 — transparent overlay (media captions)

| Role | Token | `r g b` | Hex / note |
|---|---|---|---|
| Accent | `--accent` | `255 255 255` | `#FFFFFF` |
| Text | `--text-color` | `255 255 255` | `#FFFFFF` |
| Background | `--background` | `0 0 0 / 0.0` | `#000000` at **alpha 0** — fully transparent |
| Background (no alpha) | `--background-without-opacity` | `0 0 0` | `#000000` |
| Border | `--border-color` | `255 255 255` | `#FFFFFF` |
| Button background | `--button-background` | `255 255 255` | `#FFFFFF` |
| Button text | `--button-text-color` | `28 28 28` | `#1C1C1C` |

**Used on:** `.collection-card__content` (8 instances on the homepage collection list), `.content-over-media` blocks (3 on the homepage), and the slideshow overlay. 13 uses on `index.html`, 1 each on PDP/collection. Paired with `.color-scheme--with-image-overlay`, which softens the border to `--border-color: var(--text-color) / .6` → `rgb(255 255 255 / 0.6)`. Background-group hash `bg-3671eee015764974ee0aef1536023e0f`.

#### scheme-89deeaaa-2e85-418e-ae13-9e305d760573 — red accent scheme

| Role | Token | `r g b` | Hex |
|---|---|---|---|
| Accent | `--accent` | `28 28 28` | `#1C1C1C` |
| Text | `--text-color` | `255 255 255` | `#FFFFFF` |
| Background | `--background` | `195 17 17 / 1.0` | **`#C31111`** |
| Background (no alpha) | `--background-without-opacity` | `195 17 17` | `#C31111` |
| Border | `--border-color` | `204 53 53` | `#CC3535` |
| Button background | `--button-background` | `28 28 28` | `#1C1C1C` |
| Button text | `--button-text-color` | `255 255 255` | `#FFFFFF` |
| Circle-button background | `--circle-button-background` | `255 255 255` | `#FFFFFF` |
| Circle-button text | `--circle-button-text-color` | `28 28 28` | `#1C1C1C` |

**Used on:** the class is **defined on every page but applied to zero elements**. Verified: the string `scheme-89deeaaa` appears only inside `<style>` on `index.html`, `pdp_sample.html`, `collections_all.html`, and in **0 of 56** product pages' `<body>` markup. Background-group hash `bg-a8cae304c51d650ac6decf52a4d75144`. Treat it as a **merchant-configured but currently dormant** scheme — the rebuild must ship it (it is a saved theme setting) but no section currently selects it.

#### dialog — modal / popover scheme

| Role | Token | `r g b` | Hex |
|---|---|---|---|
| Accent | `--accent` | `0 0 0` | `#000000` |
| Text | `--text-color` | `0 0 0` | `#000000` |
| Background | `--background` | `255 255 255 / 1.0` | `#FFFFFF` |
| Border | `--border-color` | `217 217 217` | `#D9D9D9` |
| Button background | `--button-background` | `0 0 0` | `#000000` |
| Button text | `--button-text-color` | `255 255 255` | `#FFFFFF` |

**Used on:** `facets-sort-popover#sort-by-popover`, `facets-drawer#facets-drawer` (collection page), quick-buy modal. Duplicates scheme-2's values.

#### Ad-hoc inline scheme — scrolling-content marquee bands

Two homepage sections (`scrolling-content-1`, `scrolling-content-2`) use class `color-scheme--bg-77e774e6cc4d94d6a32f6256f02d9552` with the colours set **inline on the element**, not via a named scheme:

```html
style="--background: 0 0 0; background-color: rgb(var(--background));
       --text-color: 255 255 255; color: rgb(var(--text-color));"
```

| Role | `r g b` | Hex |
|---|---|---|
| Background | `0 0 0` | `#000000` |
| Text | `255 255 255` | `#FFFFFF` |

### 1.2 Global product / status colours (`:root`, index.html §0)

| Token | `r g b` | Hex | Notes / consumer |
|---|---|---|---|
| `--on-sale-text` | `255 215 0` | `#FFD700` | gold; consumed by `.text-on-sale{color:rgb(var(--on-sale-text))}` |
| `--on-sale-badge-background` | `255 215 0` | `#FFD700` | gold sale badge fill |
| `--on-sale-badge-text` | `0 0 0 / 0.65` | `#000000` @ **65 % alpha** | black text on gold, deliberately faded |
| `--sold-out-badge-background` | `227 44 43` | `#E32C2B` | sold-out red |
| `--sold-out-badge-text` | `255 255 255` | `#FFFFFF` | |
| `--custom-badge-background` | `28 28 28` | `#1C1C1C` | defined, **0 uses** in captured markup |
| `--custom-badge-text` | `255 255 255` | `#FFFFFF` | |
| `--star-color` | `255 215 0` | `#FFD700` | theme-native rating stars |
| `--page-overlay` | `0 0 0 / 0.4` | `#000000` @ 40 % | modal/drawer scrim |
| `--page-background` | *(empty string)* | — | emitted empty; body background therefore resolves from `color-scheme--scheme-1` on `<body>` |
| `--modal-scheme-background` | `255 255 255` | `#FFFFFF` | |
| `--modal-scheme-text-color` | `0 0 0` | `#000000` | |
| `--header-transparent-header-text-color` | `255 255 255` | `#FFFFFF` | transparent-header state |
| `--header-separation-border-color` | `0 0 0 / 0.15` | `#000000` @ 15 % | header inset bottom hairline |
| `--content-over-media-overlay` | `0 0 0 / 0.0` | `#000000` @ **0 %** | image-with-text-overlay section: **no darkening applied** |

| Status token | `r g b` | Hex |
|---|---|---|
| `--success-background` | `212 227 203` | `#D4E3CB` |
| `--success-text` | `48 122 7` | `#307A07` |
| `--warning-background` | `253 241 224` | `#FDF1E0` |
| `--warning-text` | `237 138 0` | `#ED8A00` |
| `--error-background` | `243 204 204` | `#F3CCCC` |
| `--error-text` | `203 43 43` | `#CB2B2B` |

**Custom snippet colour:** `raw/pages/*.html` final `<style>` block contains `.inventory {color: #ff0000;}` → `255 0 0` / `#FF0000`. This is a merchant/app-added override, not a Prestige token.

### 1.3 Judge.me colours (`--jdgm-*`)

Two separate token sets are emitted. Note the **inconsistency**: the main widget uses gold stars, the snippet carousel uses teal.

| Token | Declared value | `r g b` | Hex | Scope |
|---|---|---|---|---|
| `--jdgm-primary-color` | `#000` | `0 0 0` | `#000000` | `:root` |
| `--jdgm-secondary-color` | `#fff` | `255 255 255` | `#FFFFFF` | `:root` |
| `--jdgm-star-color` | `gold` (CSS keyword) | `255 215 0` | `#FFD700` | `:root` — matches theme `--star-color` |
| `--jdgm-write-review-text-color` | `white` | `255 255 255` | `#FFFFFF` | `:root` |
| `--jdgm-write-review-bg-color` | `#000000` | `0 0 0` | `#000000` | `:root` |
| `--jdgm-paginate-color` | `#000` | `0 0 0` | `#000000` | `:root` |
| `--jdgm-reviewer-name-color` | `#000000` | `0 0 0` | `#000000` | `:root` |
| `--jdgm-border-radius` | `0` | — | — | `:root` — zero, matches theme |
| `--jdgm-snippet-card-color` | `#fff` | `255 255 255` | `#FFFFFF` | `.jdgm-review-snippet-widget` |
| `--jdgm-snippet-text-color` | `#000` | `0 0 0` | `#000000` | `.jdgm-review-snippet-widget` |
| `--jdgm-snippet-lighter-text-color` | `#7B7B7B` | `123 123 123` | `#7B7B7B` | `.jdgm-review-snippet-widget` |
| **`--jdgm-snippet-star-color`** | **`#108474`** | **`16 132 116`** | **`#108474`** | teal — the **only non-monochrome/non-red/non-gold colour on the site** |
| `--jdgm-snippet-border-radius` | `8px` | — | — | **the single rounded element in the design** |
| `--jdgm-snippet-arrows-bg-color` | `#fff` | `255 255 255` | `#FFFFFF` | |
| `--jdgm-snippet-arrows-color` | `#000` | `0 0 0` | `#000000` | |

Hard-coded companions in the same block (not tokenised):
```css
.jdgm-rev-snippet-card{border-radius:8px;background:#fff}
.jdgm-rev-snippet-card__rev-rating .jdgm-star{color:#108474}
.jdgm-rev-snippet-widget__prev-btn,…__next-btn{border-radius:50%;background:#fff}
```

### 1.4 Shopify Inbox / agent chat widget colours

| Token | Value | `r g b` | Hex |
|---|---|---|---|
| `--shopify-chat-bg-color` / `--shopify-agent-bg-color` | `#FFFFFF` | `255 255 255` | `#FFFFFF` |
| `--shopify-chat-text-color` / `--shopify-agent-text-color` | `#000000` | `0 0 0` | `#000000` |
| `--shopify-chat-accent-bg-color` / `--shopify-agent-accent-bg-color` | `#000000` | `0 0 0` | `#000000` |
| `--shopify-chat-accent-text-color` / `--shopify-agent-accent-text-color` | `#FFFFFF` | `255 255 255` | `#FFFFFF` |
| `--shopify-chat-border-radius` / `--shopify-agent-border-radius` | `16px` | — | — |
| `--shopify-chat-activator-offset` / `--shopify-agent-activator-offset` | `20px` | — | — |

### 1.5 Consolidated brand palette

| Hex | `r g b` | Name | Semantic role | Where |
|---|---|---|---|---|
| `#FFFFFF` | `255 255 255` | White | Primary surface, inverted text, button text on dark, circle-button fill | Body bg, header bg, footer text, all button labels |
| `#1C1C1C` | `28 28 28` | Near-black (theme black) | Primary text, primary button fill, dark surfaces, custom badge | Body text, buttons, announcement bar, footer, newsletter popup |
| `#000000` | `0 0 0` | Pure black | Header/dialog text + button fill, marquee band bg, overlays, Judge.me primary | Header, sort popover, facets drawer, scrolling-content bands |
| `#DDDDDD` | `221 221 221` | Light grey | Border, scheme-1 | Section dividers, `.bordered-section` hairlines |
| `#D9D9D9` | `217 217 217` | Light grey (alt) | Border, scheme-2 & dialog | Header/drawer borders, input borders |
| `#3E3E3E` | `62 62 62` | Dark grey | Border on dark surfaces, scheme-3 | Footer/announcement dividers |
| `#FFD700` | `255 215 0` | Gold | Sale badge fill, sale price text, rating stars | 1 on-sale badge on `/collections/all`; all star ratings |
| `#E32C2B` | `227 44 43` | Sold-out red | Sold-out badge fill | 4 sold-out badges on `/collections/all`; 28 of 56 products have ≥1 unavailable variant |
| `#C31111` | `195 17 17` | Accent red | Full-bleed red section scheme | Defined, **not currently applied** |
| `#CC3535` | `204 53 53` | Light accent red | Border inside the red scheme | Defined, not applied |
| `#108474` | `16 132 116` | Judge.me teal | Review-snippet star colour | Judge.me snippet carousel only |
| `#7B7B7B` | `123 123 123` | Mid grey | Judge.me snippet secondary text | Review snippet metadata |
| `#307A07` | `48 122 7` | Success green | Form success text | Cart/form feedback |
| `#ED8A00` | `237 138 0` | Warning amber | Form warning text | Cart/form feedback |
| `#CB2B2B` | `203 43 43` | Error red | Form error text | Cart/form feedback |
| `#FF0000` | `255 0 0` | Pure red | `.inventory` custom snippet | Merchant-added inventory line |

---

## 2. Typography

### 2.1 Font family

Single-family system: **Poppins** for both headings and body. Served from the Shopify font CDN and declared with `@font-face` in `index.html §0` (identical block on all pages).

| Token | Value |
|---|---|
| `--heading-font-family` | `Poppins, sans-serif` |
| `--text-font-family` | `Poppins, sans-serif` |
| `--heading-font-weight` | `400` |
| `--heading-font-style` | `normal` |
| `--text-font-weight` | `400` |
| `--text-font-style` | `normal` |

### 2.2 Loaded font files

All served from `//siwafragrances.com/cdn/fonts/poppins/…`, `font-display: fallback`, `woff2` first with `woff` fallback. The heading block loads a subset of the body block (400 n + 400 i), so **4 unique faces** are loaded in total.

| Weight | Style | Shopify face id | woff2 filename |
|---|---|---|---|
| 400 | normal | `n4` | `poppins_n4.0ba78fa5af9b0e1a374041b3ceaadf0a43b41362.woff2` |
| 400 | italic | `i4` | `poppins_i4.846ad1e22474f856bd6b81ba4585a60799a9f5d2.woff2` |
| 700 | normal | `n7` | `poppins_n7.56758dcf284489feb014a026f3727f2f20a54626.woff2` |
| 700 | italic | `i7` | `poppins_i7.42fd71da11e9d101e1e6c7932199f925f9eea42d.woff2` |

`woff` fallbacks: `poppins_n4.214741a72ff2596839fc9760ee7a770386cf16ca.woff`, `poppins_i4.56b43284e8b52fc64c1fd271f289a39e8477e9ec.woff`, `poppins_n7.f34f55d9b3d3205d2cd6f64955ff4b36f0cfd8da.woff`, `poppins_i7.ec8499dbd7616004e21155106d13837fff4cf556.woff`.

**Only 400 and 700 are loaded — there is no light, medium or semibold weight available.** Headings use 400, so bold text only appears where `<strong>`/`<b>` is authored (e.g. the announcement bar copy is wrapped in `<strong>`).

### 2.3 Body text scale (`--text-*`)

| Token | < 700px | ≥ 700px | px (< 700) | px (≥ 700) |
|---|---|---|---|---|
| `--text-xs` | `0.75rem` | `0.75rem` | 12px | 12px |
| `--text-sm` | `0.8125rem` | `0.8125rem` | 13px | 13px |
| `--text-base` | `0.875rem` | `0.875rem` | 14px | 14px |
| `--text-lg` | `1.0rem` | `1.0rem` | 16px | 16px |
| `--text-xl` | `1.125rem` | `1.25rem` | 18px | **20px** |

`--text-xl` is the **only** body size that changes across breakpoints.

Body default (`theme.css`):
```css
body{font: normal 400 var(--text-base)/1.65 Poppins, sans-serif;
     letter-spacing: var(--text-letter-spacing);}
```
→ **14px / line-height 1.65 (23.1px) / letter-spacing 0**.

`--button-font: var(--text-font-style) var(--text-font-weight) var(--text-sm) / 1.65 var(--text-font-family)` → **normal 400 13px/1.65 Poppins**.

### 2.4 Heading scale (`--text-h1` … `--text-h6`)

`--text-heading-size-factor: 1` — a global multiplier applied to every heading token. Changing it rescales the whole heading system proportionally; at the current value it is a no-op.

All four fluid headings use the pattern `max(0.6875rem, clamp(MIN, A + Bvw, MAX) * var(--text-heading-size-factor))`. The `max(0.6875rem, …)` is a hard **11px floor** that only engages if `--text-heading-size-factor` is reduced below ~0.5.

| Token | Raw declaration | Min | Max | Fluid range | Line-height |
|---|---|---|---|---|---|
| `--text-h1` | `max(0.6875rem, clamp(1.375rem, 1.146341463414634rem + 0.975609756097561vw, 2rem) * var(--text-heading-size-factor))` | 1.375rem = **22px** | 2rem = **32px** | 375px → 1400px viewport | 1.5, → **1.3** at ≥1150px |
| `--text-h2` | `max(0.6875rem, clamp(1.25rem, 1.0670731707317074rem + 0.7804878048780488vw, 1.75rem) * var(--text-heading-size-factor))` | 1.25rem = **20px** | 1.75rem = **28px** | 375px → 1400px | 1.5, → **1.4** at ≥1150px |
| `--text-h3` | `max(0.6875rem, clamp(1.125rem, 1.0335365853658536rem + 0.3902439024390244vw, 1.375rem) * var(--text-heading-size-factor))` | 1.125rem = **18px** | 1.375rem = **22px** | 375px → 1400px | 1.6, → **1.5** at ≥1150px |
| `--text-h4` | `max(0.6875rem, clamp(1rem, 0.9542682926829268rem + 0.1951219512195122vw, 1.125rem) * var(--text-heading-size-factor))` | 1rem = **16px** | 1.125rem = **18px** | 375px → 1400px | 1.6 |
| `--text-h5` | `calc(0.875rem * var(--text-heading-size-factor))` | **14px** fixed | 14px | none | 1.7 |
| `--text-h6` | `calc(0.75rem * var(--text-heading-size-factor))` | **12px** fixed | 12px | none | 1.7 |

**Formula expansion (worked, root = 16px).** Every clamp's preferred term is a straight line through the two anchor viewports 375px and 1400px:

| Token | Preferred term in px | At 375px viewport | At 1400px viewport | Verdict |
|---|---|---|---|---|
| h1 | `18.34146px + 0.00975610 × W` | `18.34146 + 3.65854 = 22.000px` | `18.34146 + 13.65854 = 32.000px` | 22 → 32px, linear over 375–1400 |
| h2 | `17.07317px + 0.00780488 × W` | `17.07317 + 2.92683 = 20.000px` | `17.07317 + 10.92683 = 28.000px` | 20 → 28px |
| h3 | `16.53659px + 0.00390244 × W` | `16.53659 + 1.46341 = 18.000px` | `16.53659 + 5.46341 = 22.000px` | 18 → 22px |
| h4 | `15.26829px + 0.00195122 × W` | `15.26829 + 0.73171 = 16.000px` | `15.26829 + 2.73171 = 18.000px` | 16 → 18px |

So the whole fluid system is **one consistent ramp locked to a 375px → 1400px viewport window**, clamped flat outside it. h5 and h6 are intentionally static.

Consumer rules in `theme.css`:
```css
h1,.h1,:where(.prose h1){font-size:var(--text-h1);line-height:1.5}
h2,.h2,:where(.prose h2){font-size:var(--text-h2);line-height:1.5}
h3,.h3,:where(.prose h3){font-size:var(--text-h3);line-height:1.6}
h4,.h4,:where(.prose h4){font-size:var(--text-h4);line-height:1.6}
h5,.h5,:where(.prose h5){font-size:var(--text-h5);line-height:1.7}
h6,.h6,:where(.prose h6){font-size:var(--text-h6);line-height:1.7}
@media screen and (min-width:1150px){ h1→1.3, h2→1.4, h3→1.5 }
```

### 2.5 Letter-spacing & text-transform

| Token | Value | Applies to |
|---|---|---|
| `--heading-letter-spacing` | **`0.18em`** | h1–h6, `.h1`–`.h6`, `.prose` headings, `.badge`, product-card titles |
| `--text-letter-spacing` | `0.0em` | body copy |
| `--button-letter-spacing` | **`0.18em`** | `.button`, `.shopify-challenge__button`, `.shopify-payment-button__button--unbranded` |
| `--heading-text-transform` | `uppercase` | all headings |
| `--button-text-transform` | `uppercase` | all buttons |
| `--product-card-text-transform` | `uppercase` | product card info block; also re-binds `--heading-text-transform` inside `.product-card__info` |

`0.18em` is the single most distinctive typographic decision on the site. At the h1 max size (32px) that is **5.76px of tracking per character**; on a 13px button it is **2.34px**. Body copy is at exactly 0 tracking, giving a strong contrast between wide-tracked uppercase display type and neutral running text.

Heading rule (`theme.css`):
```css
h1,.h1,…,.h6,.prose :where(h1,h2,h3,h4,h5,h6){
  font-family:var(--heading-font-family); font-weight:var(--heading-font-weight);
  font-style:var(--heading-font-style); letter-spacing:var(--heading-letter-spacing);
  text-transform:var(--heading-text-transform); overflow-wrap:anywhere}
```

### 2.6 Prose / rich-text typography

| Rule | Value |
|---|---|
| `.prose blockquote` | `border-inline-start-width:3px; padding:.375rem 0 .375rem 1rem; font-size:1.15rem (18.4px); line-height:1.75` |
| `.prose:not(.prose--tight) blockquote` | `margin-inline-start:2rem; padding-inline-start:2rem` |
| `.prose figcaption` | `font-style:italic; font-size:var(--text-sm) (13px); color:rgb(var(--text-color)/.65); margin-block-start:.5em` |
| `.prose :is(.link + .link)` | `margin-inline-start:.75rem` |

Relevant because **one** product's `body_html` (`sundaze`) uses `<h4>` + `<blockquote>` + `<ul>` — it is the only such product in the catalog, see `03-DATA-SCHEMA.md §3` — and the blockquote treatment above is exactly what renders its "If you love *X*, this is your scent." line. *(An earlier draft claimed all 56 products used this markup; that was measured and refuted.)*

### 2.7 Underline animation on links/headings

```css
:is(h1,.h1,…,.h6,.button,.link-faded,.link-faded-reverse):not(:has(img)){
  background:linear-gradient(to right,currentColor,currentColor) 0 min(100%,1.35em)/100% 1px no-repeat;
  text-decoration:none; transition:background-size .3s ease-in-out}
…:hover{background-size:0 1px}
```
A **1px** underline drawn with a gradient that retracts on hover (right-to-left wipe). At ≥700px the offset switches from `1.35em` to `1.2lh`.

---

## 3. Spacing & layout

### 3.1 Container max-widths

| Token | rem | px | Consumer class |
|---|---|---|---|
| `--container-max-width` | `100%` | — | `.container` default; `.container{--container-max-width:none}` inside nested contexts |
| `--container-xxs-max-width` | `27.5rem` | **440px** | `.container--xxs` |
| `--container-xs-max-width` | `42.5rem` | **680px** | `.container--xs` (also `--content-over-media-content-max-width` on the image-with-text-overlay section) |
| `--container-sm-max-width` | `61.25rem` | **980px** | `.container--sm` |
| `--container-md-max-width` | `71.875rem` | **1150px** | `.container--md` |
| `--container-lg-max-width` | `78.75rem` | **1260px** | `.container--lg` |
| `--container-xl-max-width` | `85rem` | **1360px** | `.container--xl` |

Container mechanics (`theme.css`):
```css
.container{--distance-to-bleed: max(var(--container-gutter), 50% - var(--container-max-width)/2);
  margin-inline-start:max(var(--container-gutter),50% - var(--container-max-width)/2);
  margin-inline-end:max(var(--container-gutter),50% - var(--container-max-width)/2)}
```
Centering is done with **auto-margins computed from the gutter**, not `margin:auto` — so the gutter is always honoured, never crushed.

### 3.2 `--container-gutter` (responsive)

| Viewport | Value | px |
|---|---|---|
| default (< 700px) | `1.25rem` | **20px** |
| ≥ 700px | `2rem` | **32px** |
| ≥ 1000px | `3rem` | **48px** |

### 3.3 Section vertical rhythm

| Token | < 1000px | ≥ 1000px | px |
|---|---|---|---|
| `--section-vertical-spacing` | `2.5rem` | `4rem` | **40px → 64px** |
| `--section-vertical-spacing-tight` | `2.5rem` | `4rem` | **40px → 64px** (identical — the "tight" variant is not differentiated at theme level) |
| `--section-stack-gap` | `2.25rem` | `3rem` | **36px → 48px** |
| `--section-stack-gap-tight` | `2.25rem` | `3rem` | **36px → 48px** (identical) |

Applied by:
```css
.section-spacing{
  padding-block-start:calc(var(--section-vertical-spacing-override,var(--section-vertical-spacing))
                          + var(--section-vertical-spacing-block-start-compensation,0px));
  padding-block-end:var(--section-vertical-spacing-override,var(--section-vertical-spacing))}
.section-spacing--tight{--section-vertical-spacing:var(--section-vertical-spacing-tight);
                        --section-stack-gap:var(--section-stack-gap-tight)}
```

Consecutive sections that share the same background hash have their top padding collapsed to `0` — emitted per background group, e.g.:
```css
.shopify-section:has(.section-spacing.color-scheme--bg-54922f2e920ba8346f6dc0fba343d673)
+ .shopify-section:has(.section-spacing.color-scheme--bg-54922f2e920ba8346f6dc0fba343d673:not(.bordered-section))
  .section-spacing{padding-block-start:0}
```

**Section-level `--section-vertical-spacing` clamp overrides** (the only place a clamp is used for spacing, on the two marquee sections):

| Section | Declaration | Min | Max | Range |
|---|---|---|---|---|
| `scrolling-content-2` | `clamp(20px, calc(20px + (40 - 20) * ((100vw - 375px)/(1400 - 375))), 40px)` | 20px | 40px | 375 → 1400px |
| `scrolling-content-1` | `clamp(20px, calc(20px + (46 - 20) * ((100vw - 375px)/(1400 - 375))), 46px)` | 20px | 46px | 375 → 1400px |

Same sections also set `--scrolling-content-content-gap` (`clamp(25px…50px)` and `clamp(30px…30px)` respectively — the second is flat 30px) and a raw `font-size: clamp(32px, …, 64px)` over the same 375→1400 window.

### 3.4 Product list grid

Base rule (`theme.css`, `:root`-level `.product-list`):

| Token | Base (<700px) | ≥700px | ≥1000px | ≥1150px | ≥1400px |
|---|---|---|---|---|---|
| `--product-list-max-items-per-row-allowed` | `2` | `3` | `4` | `var(--product-list-items-per-row)` (uncapped) | — |
| `--product-list-default-row-gap` | `2.1875rem` (35px) | `3rem` (48px) | `4rem` (64px) | — | `4rem` (64px) |
| `--product-list-default-column-gap` | `.625rem` (10px) | `1.5rem` (24px) | `3rem` (48px) | — | `3.75rem` (60px) |

Derived values:
```css
--product-list-calculated-items-per-row:
   min(var(--product-list-max-items-per-row-allowed), var(--product-list-items-per-row));
--product-list-calculated-row-gap:
   clamp(var(--section-vertical-spacing)/4,
         var(--product-list-default-row-gap) * var(--product-list-vertical-spacing-factor,1),
         var(--section-vertical-spacing)*2);
--product-list-calculated-column-gap:
   clamp(var(--container-gutter)/4,
         var(--product-list-default-column-gap) * var(--product-list-horizontal-spacing-factor,1),
         var(--container-gutter)*2);
--product-list-card-width:
   calc(100% / var(--product-list-calculated-items-per-row)
        - var(--product-list-calculated-column-gap,0px)
          * (var(--product-list-calculated-items-per-row) - 1)
          / var(--product-list-calculated-items-per-row));
grid: auto-flow dense / repeat(auto-fit, var(--product-list-card-width));
```
Note the row/column gaps are **clamped against the section spacing and the gutter**, so a spacing factor can never produce a gap smaller than ¼ of them or larger than 2×.

Carousel variant: `.product-list--carousel{--product-list-default-column-gap:1.25rem; grid:auto/auto-flow var(--product-list-card-width)}`, and below 700px `--product-list-card-width: min(300px, 65%)` with `scroll-snap-type:x mandatory`.

`.product-list:not(.product-list--carousel){margin-inline:-.625rem}` — a −10px bleed.

### 3.5 `--product-list-items-per-row` and spacing factors, per section

| Page | Section | items/row < 700px | items/row ≥ 700px | h-factor | v-factor |
|---|---|---|---|---|---|
| Home | `featured_collections_EGrx3j` | `2` | `4` | `1` | `1` |
| Home | `featured-collections-2` | `2` | `4` | **`0.2`** | **`0.2`** |
| PDP | `recently_viewed_products_LGtyH6` | `2` | `4` | `1` | `1` |
| Collection | `main` (`/collections/all`) | grid density tokens, see below | | `1` | `1` |

The `0.2` factors on `featured-collections-2` shrink the computed gaps to a fifth of default, then the clamp floors them at `--container-gutter / 4` (5px at mobile / 8px at 700px / 12px at 1000px) horizontally and `--section-vertical-spacing / 4` (10px / 16px) vertically. That section is therefore a visually **near-gapless product mosaic** versus the standard grid.

### 3.6 Collection page grid density (`coll §7`)

The collection template exposes three density presets; only one is active at a time via the toolbar.

| Token | < 700px | ≥ 700px | ≥ 1000px | ≥ 1400px |
|---|---|---|---|---|
| `--collection-items-per-row-compact` | *(not set)* | `4` | `4` | `6` |
| `--collection-items-per-row-medium` | `2` | `3` | `3` | `4` |
| `--collection-items-per-row-large` | `1` | `2` | `2` | `3` |

Also on that section: `.product-list{--product-list-max-items-per-row-allowed: 99 !important}` — the collection page opts out of the theme's per-breakpoint cap entirely and lets the density setting drive the count.

Collection shell (`theme.css`):
```css
.collection{--collection-gap:2rem; --collection-grid-template:minmax(0,1fr);
            --collection-sidebar-width:15rem;
            grid-template-columns:var(--collection-grid-template);
            gap:var(--collection-gap); margin-block-end:var(--section-vertical-spacing);
            scroll-margin-block-start:calc(var(--collection-toolbar-height,0px) + 20px)}
@media (min-width:1150px){.collection{--collection-gap:3.125rem}}
```
At ≥1000px the section sets `--collection-grid-template: var(--collection-sidebar-width, 0) minmax(0,1fr)` → sidebar (**240px**) + fluid grid.

### 3.7 Other section-scoped layout tokens (homepage)

| Section | Token | < 700px | ≥ 700px | ≥ 1150px |
|---|---|---|---|---|
| `collection_list_gpXjxV` | `--collection-list-item-size` | `84vw` | `62vw` | `unset` |
| `collection_list_gpXjxV` | `--collection-list-items-per-row` | — | — | `2` |
| `collection_list_gpXjxV` | `--collection-list-gap` | `1.5rem` (24px) | `1.5rem` | `1.875rem` (30px) |
| `media-grid` | `--media-grid-row-height` | `180px` | `290px` | `290px` |
| `media-grid` | `--media-grid-gap` | `0.5rem` (8px) | `0.5rem` | `0.75rem` (12px) |
| `image-with-text-overlay-1` | `--content-over-media-content-max-width` | `var(--container-xs-max-width)` = 680px | | |
| `image-with-text-overlay-1` | `--content-over-media-overlay` | `0 0 0 / 0.0` (no scrim) | | |
| `footer` | `--footer-content-justify-items` | `space-between` | | |

### 3.8 PDP product grid (`pdp §7`)

| Viewport | `--product-grid` |
|---|---|
| < 1000px | `"product-gallery" "product-info" "product-content" / minmax(0, 1fr)` — single column, gallery → info → content |
| ≥ 1000px | `"product-gallery product-info" auto "product-content product-info" minmax(0, 1fr) / minmax(0, 0.65fr) minmax(0, 0.35fr)` — **65 / 35 split**, gallery + description stacked on the left, sticky buy column on the right spanning both rows |

### 3.9 Form spacing tokens

| Token | Value | px | Meaning (from source comment) |
|---|---|---|---|
| `--form-gap` | `1.25rem` | 20px | Gap between fieldset and submit button |
| `--fieldset-gap` | `1rem` | 16px | Gap between each form input within a fieldset |
| `--form-control-gap` | `0.625rem` | 10px | Gap between input and label (ignored for floating label) |
| `--checkbox-control-gap` | `0.75rem` | 12px | Horizontal gap between checkbox and its label |
| `--input-padding-block` | `0.65rem` | 10.4px | Vertical padding for input / textarea / native select |
| `--input-padding-inline` | `0.8rem` | 12.8px | Horizontal padding for the same |
| `--checkbox-size` | `0.875rem` | 14px | Checkbox width & height |

### 3.10 Drawer spacing (`theme.css`)

| Token | < 1000px | ≥ 1000px |
|---|---|---|
| `--drawer-header-padding-block` | `1rem` (16px) | `1.125rem` (18px) |
| `--drawer-header-padding-inline` | `1.25rem` (20px) | `2rem` (32px) |
| `--drawer-body-padding-block` | `1.25rem` (20px) | `2rem` (32px) |
| `--drawer-body-padding-inline` | `1.25rem` (20px) | `2rem` (32px) |
| `--drawer-footer-padding-block` | `1rem` (16px) | `2rem` (32px) |
| `--drawer-footer-padding-inline` | `1.25rem` (20px) | `2rem` (32px) |
| `--drawer-max-width` | `min(92vw, 28.125rem)` = min(92vw, **450px**) | same |

### 3.11 Sticky-offset arithmetic

```css
--sticky-area-height: calc(
    var(--announcement-bar-is-sticky, 0) * var(--announcement-bar-height, 0px)
  + var(--header-is-sticky, 0) * var(--header-is-visible, 1) * var(--header-height, 0px));
```
With both sticky flags at `0` on this store, `--sticky-area-height` currently evaluates to **0px**. `--announcement-bar-height` is written to `document.documentElement` by an inline script measuring `clientHeight` of the announcement section; `--header-height` is set by the theme's header custom element.

---

## 4. Borders, radii, shadows

### 4.1 Radii — the theme is hard-edged by design

| Token | Value | Effect |
|---|---|---|
| `--button-border-radius` | **`0.0rem`** | Every button, including Shopify Payment Button and challenge button, is a perfect rectangle |
| `--input-border-radius` | **`0.0rem`** | Every text input, textarea and select is a perfect rectangle |
| `--rounded-full` | `9999px` | Used **only** by `.circle-button` and the header cart dot (`border-radius:100%`) |
| `--jdgm-border-radius` | `0` | Judge.me main widget follows the theme |
| `--jdgm-snippet-border-radius` | **`8px`** | Judge.me *snippet carousel* cards — the **single rounded surface on the entire site** |
| `--shopify-chat-border-radius` / `--shopify-agent-border-radius` | `16px` | Shopify Inbox bubble (third-party chrome, not theme design) |
| `.checkbox` `border-radius` (hard-coded) | `2px` | The only other non-zero theme radius |

**Design implication:** the theme is a **zero-radius, hard-edged system**. Only three exceptions exist and two of them are app UI. A rebuild must not introduce rounding anywhere the theme does not already have it.

### 4.2 Shadows

| Token | Value | Notes |
|---|---|---|
| `--shadow-sm` | `0 2px 8px rgb(0 0 0 / 0.05)` | 5 % black |
| `--shadow` | `0 5px 15px rgb(0 0 0 / 0.05)` | 5 % black |
| `--shadow-md` | `0 5px 30px rgb(0 0 0 / 0.05)` | 5 % black |
| `--shadow-block` | **`px px px rgb(var(--text-primary) / 0.0)`** | **Malformed / disabled.** Offsets are the bare unit `px` with no numbers, and alpha is `0.0`. The declaration is invalid CSS and resolves to no shadow. This is Prestige emitting a "block shadow disabled" state; reproduce as *no block shadow*. Note it also references `--text-primary`, a token that is never defined anywhere in the captured CSS. |

Hard-coded shadow outside the token set: `.circle-button{box-shadow:0 .125rem .625rem rgb(var(--circle-button-text-color)/.15)}` → `0 2px 10px` at 15 % of `#1C1C1C`.

The entire shadow language is **5 % black at most** — shadows are near-invisible. The site relies on borders and whitespace, not elevation.

### 4.3 Borders

| Element | Rule | Width |
|---|---|---|
| `.color-scheme` | `border-color:rgb(var(--border-color))` | colour only; width set per-component |
| `.bordered-section` | `border-block-start-width:1px` | **1px** top hairline between sections |
| `.bordered-box` | `border-width:1px; padding:2.5rem 1.25rem 1.25rem` (≥700px: `padding:3rem`) | 1px |
| `.button` | `border:1px solid rgb(var(--button-outline-color, var(--button-background)))` | 1px |
| inputs / textarea / `.select` | `border-width:1px` | 1px |
| `.checkbox` | `border-width:1px; border-color:rgb(var(--text-color)/.8)` | 1px @ 80 % |
| `.header` | `box-shadow:0 -1px rgb(var(--header-separation-border-color)) inset` | 1px inset, `#000000` @ 15 % |
| `.quick-buy-modal__info-wrapper` (<1000px) | `border-block-start-width:1px` | 1px |

Every border in the system is **1px**. There is no thicker rule anywhere except the 3px `blockquote` start-border.

---

## 5. Components

All rules in this section come from `theme.css`.

### 5.1 Buttons

```css
.button,.shopify-challenge__button,.shopify-payment-button__button--unbranded{
  --initial-gradient: linear-gradient(rgb(var(--button-background)), rgb(var(--button-background)));
  --hover-gradient:   linear-gradient(transparent, transparent);
  --initial-background-position: var(--transform-origin-end);
  --hover-background-position:   var(--transform-origin-start);
  appearance:none;
  text-transform:var(--button-text-transform);   /* uppercase */
  font:var(--button-font);                        /* normal 400 13px/1.65 Poppins */
  letter-spacing:var(--button-letter-spacing);    /* 0.18em */
  text-shadow:none; text-align:center; cursor:pointer;
  color:rgb(var(--button-text-color));
  border:1px solid rgb(var(--button-outline-color, var(--button-background)));
  border-radius:var(--button-border-radius);      /* 0 */
  background-color:#0000;
  background-image:var(--initial-gradient),var(--hover-gradient);
  background-size:101% 101%, 0 101%;
  background-position:var(--initial-background-position);}
.button{padding:.45rem 1.5rem}
```

| Property | Value | px |
|---|---|---|
| Padding (default) | `0.45rem 1.5rem` | **7.2px vertical / 24px horizontal** |
| Padding (`.button--sm`) | `0.5rem 0.75rem` + `font-size:var(--text-xs)` | 8px / 12px, 12px text |
| Font | `normal 400 13px / 1.65 Poppins` | |
| Letter-spacing | `0.18em` | ≈ 2.34px at 13px |
| Text-transform | `uppercase` | |
| Border | `1px solid` = button background colour | |
| Border-radius | `0` | |
| Fill (scheme-1) | bg `28 28 28` / `#1C1C1C`, text `255 255 255` / `#FFFFFF` | |
| Fill (scheme-2, dialog) | bg `0 0 0` / `#000000`, text `#FFFFFF` | |
| Fill (scheme-3 dark, scheme-4 overlay) | bg `255 255 255` / `#FFFFFF`, text `#1C1C1C` | |

**Hover behaviour** — a directional wipe, not a colour fade. The button paints two stacked gradients; on hover the solid one shrinks to `0 101%` and the transparent one grows to `101% 101%`, with the background-position flipping from `--transform-origin-end` (right, LTR) to `--transform-origin-start` (left):
```css
:not([disabled]):hover{color:rgb(var(--button-background));
  background-position:var(--hover-background-position);
  border-color:rgb(var(--button-background));
  background-size:0 101%, 101% 101%}
```
Net effect: **filled → outlined, wiping right-to-left**, with the label flipping from `--button-text-color` to `--button-background`. The `<body>` carries the class `features--button-transition`, which is what enables this.

`.button--outline` (inverse start state):
```css
.button--outline{--border-color:var(--text-color);
  --initial-gradient:linear-gradient(transparent,transparent);
  --hover-gradient:linear-gradient(rgb(var(--button-background)),rgb(var(--button-background)));
  --initial-background-position:var(--transform-origin-start);
  --hover-background-position:var(--transform-origin-end);
  color:rgb(var(--button-background,var(--text-color)));
  border-color:rgb(var(--button-outline-color,var(--border-color)))}
```
Inside `.color-scheme--with-image-overlay` the outline button forces `--border-color: var(--text-color)` (full-opacity white) rather than the 60 % variant.

Vertical rhythm: a button following prose gets `margin-block-start:1.5rem` (24px), rising to `2rem` (32px) at the larger breakpoint.

### 5.2 Circle buttons

```css
.circle-button{--circle-button-size:2.75rem;
  width:var(--circle-button-size); height:var(--circle-button-size);
  background:rgb(var(--circle-button-background));
  color:rgb(var(--circle-button-text-color));
  border-radius:var(--rounded-full);
  box-shadow:0 .125rem .625rem rgb(var(--circle-button-text-color)/.15);
  place-items:center; display:grid;
  pointer-events:auto; transition:transform .2s ease-in-out}
```

| Variant | `--circle-button-size` | px |
|---|---|---|
| `.circle-button` (default) | `2.75rem` | **44px** |
| `.circle-button--sm` | `2.25rem` | **36px** |
| `.circle-button--xl` (< 700px) | `3.125rem` | **50px** |
| `.circle-button--xl` (≥ 700px) | `3.5rem` | **56px** |

Colours are scheme-driven but **every scheme in this theme sets the same pair**: background `255 255 255` / `#FFFFFF`, text `28 28 28` / `#1C1C1C`. Circle buttons are therefore always a white disc with near-black icon. Observed use: `.product-gallery__zoom-button circle-button circle-button--sm md:hidden` on the PDP.

### 5.3 Inputs, textarea, select

```css
.input,.textarea,.select{
  appearance:none; width:100%;
  padding:var(--input-padding-block) var(--input-padding-inline);   /* 10.4px 12.8px */
  border-radius:var(--input-border-radius);                          /* 0 */
  background:rgb(var(--input-background, transparent));
  color:rgb(var(--input-text-color, var(--text-color)));
  text-align:start; border-width:1px;
  transition:border-color .1s ease-in-out}
:is(.input,.textarea,.select)::placeholder{color:rgb(var(--input-text-color,var(--text-color))/.6)}
:is(.input,.textarea,.select):focus{border-color:currentColor; outline:none}
textarea{resize:vertical; field-sizing:content; min-height:4lh}
textarea::placeholder{opacity:1; color:rgb(var(--text-color)/.65)}
```

| Property | Value |
|---|---|
| Background | transparent (`--input-background` is never defined) |
| Border | 1px, colour inherited from the scheme's `--border-color` (`#DDDDDD` on body, `#D9D9D9` in header/dialog) |
| Radius | **0** |
| Padding | 10.4px / 12.8px |
| Placeholder | text colour @ **60 %** (textarea: 65 %) |
| Focus | border → `currentColor`, `outline:none` — **no focus ring**, only a border-colour change over 0.1s |
| Font | inherits `font-family/size/weight/style/line-height/text-transform` from parent |

`input[type=submit]{cursor:pointer}`.

### 5.4 Checkboxes

```css
.checkbox-control{align-items:flex-start; column-gap:var(--checkbox-control-gap); /* 12px */
                  text-align:start; display:flex; position:relative}
.checkbox{--checkbox-baseline-distance:1.6em;
  --checkbox-offset:calc((var(--checkbox-baseline-distance) - var(--checkbox-size))/2);
  appearance:none;
  width:var(--checkbox-size); height:var(--checkbox-size);   /* 14px × 14px */
  border-width:1px; border-color:rgb(var(--text-color)/.8);
  background:var(--checkmark-svg-url) no-repeat center / 0;
  border-radius:2px; flex-shrink:0;
  transition:background-color .2s ease-in-out, border-color .2s ease-in-out;
  position:relative; inset-block-start:var(--checkbox-offset)}
.checkbox:checked{background-color:rgb(var(--accent)); border-color:rgb(var(--accent));
                  background-size:10px 8px}
.checkbox:disabled,.checkbox:disabled~label{opacity:.5; cursor:default}
.checkbox:not(:disabled,:checked)~label{opacity:.7}
.checkbox:checked~label{opacity:1}
.checkbox~label{transition:all .2s ease-in-out}
```

| Token / property | Value |
|---|---|
| `--checkbox-size` | `0.875rem` = **14px** |
| `--checkbox-control-gap` | `0.75rem` = **12px** |
| `--checkmark-svg-url` | `url(//siwafragrances.com/cdn/shop/t/4/assets/checkmark.svg?v=5588600397216680941775995614)` |
| Checkmark sprite size when checked | `10px × 8px`, centred |
| Unchecked border | `rgb(var(--text-color) / 0.8)` → `#1C1C1C` @ 80 % on body scheme |
| Checked fill/border | `rgb(var(--accent))` → `#1C1C1C` (scheme-1) / `#000000` (dialog scheme, used by the facets drawer) |
| Radius | `2px` (hard-coded, one of only two non-zero theme radii) |
| Label opacity | 0.7 unchecked → 1.0 checked, 0.5 disabled |

Related asset token: `--cursor-zoom-in-svg-url: url(//siwafragrances.com/cdn/shop/t/4/assets/cursor-zoom-in.svg?v=42284069417148430011775995614)`.

### 5.5 Badges

```css
.badge{width:max-content; display:flex; align-items:center;
  font-family:var(--heading-font-family); font-weight:var(--heading-font-weight);
  font-style:var(--heading-font-style); letter-spacing:var(--heading-letter-spacing);
  text-transform:uppercase;
  padding:.0625rem .3125rem; font-size:.625rem}
@media screen and (min-width:700px){.badge{font-size:.6875rem}}
.badge--on-sale{background:rgb(var(--on-sale-badge-background)); color:rgb(var(--on-sale-badge-text))}
.badge--sold-out{background:rgb(var(--sold-out-badge-background)); color:rgb(var(--sold-out-badge-text))}
.badge--custom{background:rgb(var(--custom-badge-background)); color:rgb(var(--custom-badge-text))}
```

| Property | Value |
|---|---|
| Padding | `0.0625rem 0.3125rem` = **1px vertical / 5px horizontal** |
| Font size | **10px** (< 700px) → **11px** (≥ 700px) |
| Typography | Poppins 400, uppercase, `letter-spacing: 0.18em` (inherits heading tracking) |
| Radius | **0** (inherits nothing; no radius declared) |

| Variant | Element | Background | Text | Observed |
|---|---|---|---|---|
| On sale | `<on-sale-badge class="badge badge--on-sale">On sale</on-sale-badge>` | `255 215 0` / `#FFD700` | `0 0 0 / 0.65` → `#000000` @ 65 % | **1** instance on `raw/pages/collections_all.html` (`belle-riche`). 36 of 56 products carry a `compare_at_price` in `raw/products.json`, so the badge should appear far more widely than the single captured collection page shows |
| Sold out | `<sold-out-badge class="badge badge--sold-out">Sold out</sold-out-badge>` | `227 44 43` / `#E32C2B` | `255 255 255` / `#FFFFFF` | **4** instances on `collections_all.html` (`absolute-drunk`, `alluring-rose`, …). 28 of 56 products have ≥1 unavailable variant |
| Custom | `.badge--custom` | `28 28 28` / `#1C1C1C` | `255 255 255` / `#FFFFFF` | **0** instances in captured markup — token defined, feature unused |

Badges live in `<badge-list class="badge-list badge-list--vertical">`, positioned by the product card (§5.6).

### 5.6 Product cards

```css
.product-card{display:grid; grid-template-columns:minmax(0,1fr); align-content:start;
              gap:0; position:relative; scroll-snap-align:start}
.product-card__figure{position:relative}
.product-card__figure>.badge-list{z-index:1; position:absolute;
                                  inset-block-start:.25rem; inset-inline-start:.25rem}
@media(min-width:700px){.product-card__figure>.badge-list{inset-block-start:.5rem; inset-inline-start:.5rem}}
.product-card__media{isolation:isolate; display:block}
.product-card__image{object-fit:contain; object-position:center; margin-inline:auto;
                     transition:opacity .1s ease-in-out}
.product-card__image--secondary{position:absolute; inset:0 auto auto 0; width:100%; height:100%; display:none}
.product-card__info{--heading-text-transform:var(--product-card-text-transform);
  text-transform:var(--product-card-text-transform);
  text-align:center; justify-items:center; align-content:start;
  gap:.75rem; padding-block-start:1.25rem; display:grid}
.product-card__info .color-swatch{--swatch-size:1.375rem}
```

| Property | Value | px |
|---|---|---|
| Card gap (figure ↔ info) | `gap:0` + `.product-card__info{padding-block-start:1.25rem}` | **20px** |
| Info internal gap | `0.75rem` | 12px |
| Info alignment | `text-align:center; justify-items:center` | **all product-card text is centred** |
| Info text-transform | `var(--product-card-text-transform)` = `uppercase` | |
| Badge position | `0.25rem` from top/inline-start (< 700px) → `0.5rem` (≥ 700px) | 4px → 8px |
| Image fit | `object-fit:contain; object-position:center` — **contain, not cover**; product bottles are never cropped | |
| Colour swatch size | `1.375rem` | 22px |

**Hover — secondary-image crossfade** (`@media screen and (pointer:fine)`):
```css
.product-card__image--secondary{opacity:0; mix-blend-mode:plus-lighter; display:block}
.product-card__figure:has(.product-card__image--secondary):hover>.product-card__media .product-card__image--primary{opacity:0}
.product-card__figure:has(.product-card__image--secondary):hover>.product-card__media .product-card__image--secondary{opacity:1}
```
Note `mix-blend-mode:plus-lighter` — a true additive crossfade rather than a stacked opacity swap, so there is no mid-transition darkening. The `<body>` also carries `features--zoom-image`.

**Quick-add button:**
```css
.product-card__quick-add-button{background:rgb(var(--circle-button-background));
  color:rgb(var(--circle-button-text-color)); z-index:1; padding:.625rem;
  position:absolute; inset-block-end:.5rem; inset-inline-end:.5rem;
  opacity:0; transform:translateY(5px);
  transition:opacity .2s ease-in-out, transform .2s ease-in-out}
.product-card__quick-add-button:hover svg{transform:rotate(90deg)}
.product-card__quick-add-button:focus{opacity:1; transform:translateY(0)}
```
White disc, 10px padding, bottom-right at 8px inset, hidden until hover/focus, and its `+` icon **rotates 90°** on hover.

### 5.7 Rating badge (theme-native stars)

```css
.rating-badge{display:flex; flex-wrap:wrap; align-items:center; column-gap:.5rem; line-height:normal}
.rating-badge__stars{display:flex; column-gap:.125rem; position:relative; top:-.5px}
```
8px gap between stars block and count, 2px between stars, optically nudged up 0.5px. Star colour comes from `--star-color: 255 215 0` / `#FFD700`. Markup observed: `<span class="rating-badge" title="43 reviews"><div class="rating-badge__stars" role="img" aria-label="4.9 out of 5.0 stars">…`.

### 5.8 Price list

```css
.price-list{display:flex; flex-wrap:wrap; align-items:baseline; column-gap:.5rem}
.price-list--product{column-gap:1rem}
.text-on-sale{color:rgb(var(--on-sale-text))}   /* #FFD700 */
```
8px gap in cards, 16px on the PDP. Sale prices render in **gold `#FFD700`**, not red — an unusual choice worth preserving.

### 5.9 Quick-buy modal

| Token / rule | < 1000px | ≥ 1000px |
|---|---|---|
| `--modal-body-max-width` | `55.625rem` (890px) | same |
| `--modal-body-padding-inline` / `-block` | — | `3.125rem` (50px) |
| `.quick-buy-modal__content` | 1 column | `minmax(0,.9fr) minmax(0,1fr)`, `column-gap:2.5rem` (40px) |
| `.quick-buy-modal__close-button` | `inset-block-start:1.875rem; inset-inline-end:1.875rem` (30px) | same |
| `.quick-buy-modal__info-wrapper` | `border-block-start-width:1px; margin-block-start:1.25rem` | header hidden (`::part(header){display:none}`) |
| Buy-buttons block gap | `--product-info-gap: 1.5rem` (24px) | same |
| Variant-picker block gap | `--product-info-gap: 1.25rem` (20px) | same |

---

## 6. Breakpoints

Every `@media` threshold that appears in the captured inline `<style>` blocks and in `theme.css`.

| Threshold | Direction | Occurrences (inline) | Occurrences (`theme.css`) | Role |
|---|---|---|---|---|
| **700px** | `min-width` | 15 | 67 | **Primary breakpoint** — mobile → tablet. Switches `--container-gutter` 20→32px, `--text-xl` 18→20px, `--header-padding-block` 16→25.6px, `--header-logo-width` 80→110px, `--product-list-items-per-row` 2→4, badge font 10→11px, header/announcement gaps |
| **699px** | `max-width` | 0 | 18 | Mobile-only counterpart to 700px |
| **1000px** | `min-width` | 10 | 33 | **Desktop breakpoint** — `--container-gutter` 32→48px, `--section-vertical-spacing` 40→64px, `--section-stack-gap` 36→48px, `--header-grid` switches to the two-row desktop layout, PDP `--product-grid` becomes 65/35, collection sidebar appears, drawer padding doubles |
| **999px** | `max-width` | 0 | 5 | Below-desktop counterpart |
| **999px** | `min-width` | 3 | 0 | Used **only** for `--announcement-bar-font-size` (0.625rem → 0.6875rem). Note the off-by-one vs the 1000px breakpoint used everywhere else — reproduce exactly |
| **1150px** | `min-width` | 2 | 13 | Wide-desktop refinements — heading line-heights tighten (h1 1.5→1.3, h2 1.5→1.4, h3 1.6→1.5), `--collection-list-items-per-row: 2`, `--collection-list-gap` 24→30px, `--media-grid-gap` 8→12px, `--collection-gap` 32→50px, product-list per-row cap removed |
| **1149px** | `max-width` | 0 | 1 | Counterpart |
| **1400px** | `min-width` | 1 | 5 | Ultra-wide — collection density presets step up (compact 4→6, medium 3→4, large 2→3), product-list gaps 48→60px column |
| **1399px** | `max-width` | 0 | 1 | Counterpart |
| **749px** | `max-width` | 0 | 1 | One-off |
| **768px** | `min-width` (`only screen`) | 6 | 0 | **Judge.me app CSS only** — not a theme breakpoint |
| **768px** | `max-width` (`only screen`) | 3 | 0 | **Judge.me app CSS only** |

Non-width media features in use: `(pointer:fine)` ×18 and `not screen and (pointer:fine)` ×5 (hover-capable device gating — this is what enables product-card image swap and quick-add reveal), `(prefers-reduced-motion:no-preference)` ×3 + `(prefers-reduced-motion:reduce)` ×2, `(scripting:none)` ×2, `print` ×1, `screen and (pointer:fine) and (prefers-reduced-motion:no-preference)` ×3.

**Canonical theme breakpoint ladder to rebuild against: 700 / 1000 / 1150 / 1400.** The `999px` announcement-bar query and Judge.me's `768px` are foreign to that ladder.

---

## 7. Header, announcement bar, footer

### 7.1 Header tokens (`index.html §6`, section id `sections--18814157193264__header`)

| Token | < 700px | 700–999px | ≥ 1000px |
|---|---|---|---|
| `--header-logo-width` | `80px` | `110px` | `110px` |
| `--header-padding-block` | `1rem` (16px) | `1.6rem` (**25.6px**) | `1.6rem` (25.6px) |
| `--header-grid` | `"primary-nav logo secondary-nav" / minmax(0,1fr) auto minmax(0,1fr)` | same | `". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0,1fr) auto minmax(0,1fr)` |
| `--header-is-sticky` | `0` | `0` | `0` |
| `--header-transparent-header-text-color` | `255 255 255` / `#FFFFFF` | | |
| `--header-separation-border-color` | `0 0 0 / 0.15` → `#000000` @ 15 % | | |
| `--header-show-transparent-logo` | `0` (from `theme.css`) | | |

**`--header-grid` is the single most important responsive change in the header.**

- **Mobile / tablet (< 1000px):** one row, three columns — hamburger (`primary-nav`) left, logo centre, cart/search (`secondary-nav`) right. Classic mobile bar.
- **Desktop (≥ 1000px):** two rows — row 1 is `. logo secondary-nav` (empty left cell, **logo centred**, utilities right); row 2 is `primary-nav` spanning **all three columns**, i.e. the full menu sits on its own full-width line beneath a centred logo.

The `.` in the desktop template is an intentionally empty grid cell that keeps the logo optically centred against the right-hand utility cluster.

Header shell (`theme.css`):
```css
.header{--header-show-transparent-logo:0;
  grid:var(--header-grid); justify-content:center; align-items:center;
  column-gap:1.25rem; row-gap:var(--header-padding-block);
  box-shadow:0 -1px rgb(var(--header-separation-border-color)) inset;
  reading-flow:grid-columns;
  padding-block:var(--header-padding-block);
  padding-inline:var(--container-gutter)}
@media(min-width:700px){.header{column-gap:2.5rem}}
.header__logo{grid-area:logo; justify-self:start; position:relative}
.header__logo-image{width:var(--header-logo-width); max-width:100%; height:auto}
.header__primary-nav{grid-area:primary-nav; display:flex; flex-wrap:wrap;
                     align-items:center; gap:.625rem 1.25rem}
@media(min-width:700px){.header__primary-nav{column-gap:2.5rem}}
.header__secondary-nav{grid-area:secondary-nav; display:flex; flex-wrap:wrap;
                       justify-content:end; justify-self:end; align-items:center; gap:.625rem .9rem}
@media(min-width:700px){.header__secondary-nav{column-gap:1.25rem}}
.header__nav-icon{width:1.375rem}   /* 22px */
.header__cart-dot{width:.5rem; height:.5rem; border-radius:100%;
                  background:currentColor; box-shadow:0 0 0 2px rgb(var(--background));
                  transform:scale(0); transition:transform .2s ease-in-out;
                  position:absolute; inset-block-start:0; inset-inline-end:-.125rem}
```
Nav icons **22px**; cart dot **8px** with a 2px background-coloured ring; nav gaps **10px row / 20px column**, widening to 40px column at ≥700px.

Sticky-header offset when transparent header is active: `.header{margin-block-end:calc(-1 * var(--header-height,0px))}`.

The header uses **scheme-2** (pure `#000000` on `#FFFFFF`), one of only two places pure black is used as text.

### 7.2 Announcement bar tokens (`index.html §5`, section id `sections--18814157193264__announcement_bar_6BNjyF`)

| Token | Value | Notes |
|---|---|---|
| `--announcement-bar-is-sticky` | `0` | Not sticky |
| `--header-scroll-tracker-offset` | `var(--announcement-bar-height)` | |
| `--announcement-bar-font-size` | `0.625rem` (**10px**) < 999px → `0.6875rem` (**11px**) ≥ 999px | note the 999px, not 1000px, threshold |
| `--announcement-bar-gutter` (`theme.css`) | `0.625rem` (10px) < 700px → `var(--container-gutter)` ≥ 700px | |
| `--announcement-bar-height` | set at runtime by inline script from `clientHeight` | |

```css
.announcement-bar{--announcement-bar-gutter:.625rem;
  display:flex; text-align:center; place-content:center; column-gap:.75rem;
  padding-block:1em;
  padding-inline:max(var(--announcement-bar-gutter), 50% - var(--container-max-width)/2);
  font-size:var(--announcement-bar-font-size)}
@media(min-width:700px){.announcement-bar{--announcement-bar-gutter:var(--container-gutter);
  justify-content:center; column-gap:2.5rem}}
.announcement-bar__carousel{display:grid; place-items:center; flex-grow:1; max-width:35rem}
.announcement-bar__carousel>*{grid-area:1/-1}
.announcement-bar__carousel>:not(.is-selected){visibility:hidden}
```
`padding-block:1em` is **em-based**, so it scales with the 10/11px font size → ~10px then ~11px. Carousel max-width **35rem = 560px**, autoplay interval `3` (seconds), `allow-swipe`. Uses **scheme-3** (white on `#1C1C1C`). Single slide, copy wrapped in `<strong>`: "Explore your Persona. Free shipping orders over 1500". Wrapped in `<height-observer variable="announcement-bar">`.

### 7.3 Footer tokens (`index.html §14`, section id `sections--18814157226032__footer`)

| Token | Value |
|---|---|
| `--footer-content-justify-items` | `space-between` |

```css
.footer{background:rgb(var(--background)); background-image:var(--background-gradient);
  color:rgb(var(--text-color));
  padding-block-start:var(--section-vertical-spacing);
  padding-block-end:min(var(--section-vertical-spacing), 3rem)}
```
Footer top padding = **40px mobile / 64px desktop**; bottom padding = `min(that, 48px)` → **40px mobile / 48px desktop**. Uses **scheme-3** (`#FFFFFF` on `#1C1C1C`), background hash `bg-c1f8cb21047e4797e94d0969dc5d1e44`.

### 7.4 RTL support tokens

| Token | LTR | `[dir="rtl"]` |
|---|---|---|
| `--transform-logical-flip` | `1` | `-1` |
| `--transform-origin-start` | `left` | `right` |
| `--transform-origin-end` | `right` | `left` |

The store is single-locale `en`, but the tokens are emitted and are load-bearing for the button hover wipe direction (§5.1). Preserve them.

### 7.5 View transitions

```css
@view-transition{ navigation: auto; }
```
Native cross-document view transitions are enabled site-wide. Product card links also carry `data-instant` (Prestige's instant-page prefetch).

---

## 8. Design-language summary

1. **Strictly monochrome.** The entire structural palette is four values: `#FFFFFF`, `#1C1C1C` (near-black, used for body/buttons/dark surfaces), `#000000` (pure black, reserved for header + dialogs + marquee bands), and three greys used only for 1px borders (`#DDDDDD`, `#D9D9D9`, `#3E3E3E`). There is no brand hue in the layout chrome at all.

2. **Colour appears only as status, never as decoration.** Gold `#FFD700` marks sale prices, sale badges and rating stars; red `#E32C2B` marks sold-out. The red accent scheme `#C31111` exists as a saved setting but is applied to **zero** elements across all captured pages. Teal `#108474` appears once, in the Judge.me snippet stars, and is the only colour on the site that is neither monochrome, gold nor red — almost certainly an unintentional app default rather than a design decision.

3. **Uppercase, wide-tracked Poppins is the entire display language.** `--heading-letter-spacing: 0.18em` and `--button-letter-spacing: 0.18em` apply to every heading, button, badge and product-card title, all at weight 400 — never bold. Body copy sits at exactly `0em` tracking and 14px/1.65. The contrast between airy uppercase display type and neutral running text *is* the typographic identity.

4. **Zero radius everywhere.** `--button-border-radius: 0`, `--input-border-radius: 0`, `--jdgm-border-radius: 0`; badges declare no radius at all. The only curves in the entire system are `--rounded-full` on circle buttons, `2px` on checkboxes, and `8px` on Judge.me snippet cards. This is a deliberately hard-edged, architectural design.

5. **Borders instead of elevation.** Every border in the theme is exactly 1px. The shadow scale tops out at 5 % black (`--shadow-md: 0 5px 30px rgb(0 0 0 / 0.05)`) and `--shadow-block` is emitted malformed and effectively disabled. Sections are separated by 1px hairlines (`.bordered-section`) and whitespace, never by depth.

6. **One tightly-controlled fluid ramp.** All four fluid heading sizes interpolate over the identical 375px → 1400px window (h1 22→32px, h2 20→28px, h3 18→22px, h4 16→18px); h5/h6 are fixed at 14/12px. `--text-heading-size-factor` is a single global dial that rescales the whole heading system. Body sizes are almost entirely static — only `--text-xl` steps (18→20px).

7. **Restrained scale overall.** The largest text in the type system is 32px; buttons are 13px; badges are 10–11px. Combined with generous 0.18em tracking and 1.65 body leading, the site reads as small, wide and airy rather than bold and large.

8. **Motion is directional and subtle, never bouncy.** Buttons wipe filled→outlined right-to-left via dual gradients; product-card images crossfade with `mix-blend-mode: plus-lighter`; quick-add reveals with a 5px rise and its `+` icon rotates 90°; heading underlines retract on hover. All durations are 0.1–0.3s ease-in-out, all gated behind `(pointer:fine)` and `prefers-reduced-motion`.

9. **Contain, not cover, for product imagery.** `.product-card__image{object-fit:contain; object-position:center}` — bottles are never cropped, and cards are centre-aligned throughout (`text-align:center; justify-items:center`). Combined with the white surface this produces a catalogue/lookbook feel rather than an editorial one.

10. **Layout is desktop-generous and mobile-tight.** Gutters triple from 20→48px and section spacing goes 40→64px across the 700/1000 breakpoints. The header restructures completely at 1000px — from a one-row hamburger/logo/cart bar to a two-row layout with a centred logo above a full-width nav. Everything hangs off four breakpoints: **700 / 1000 / 1150 / 1400**.

---

## Appendix — tokens defined but unused in captured markup

| Token / class | Status |
|---|---|
| `.color-scheme--scheme-89deeaaa-…` (red `#C31111`) | Defined on every page, applied to **0** elements across homepage, PDP sample, collection page and all 56 product pages |
| `--custom-badge-background` / `--custom-badge-text` | Defined; `.badge--custom` never rendered |
| `--page-background` | Emitted as an **empty value**; `body{background:rgb(var(--page-background))}` is therefore invalid and the body background resolves from `color-scheme--scheme-1` instead |
| `--shadow-block` | Emitted malformed (`px px px rgb(var(--text-primary) / 0.0)`); references `--text-primary`, which is never defined anywhere |
| `--background-gradient` / `--modal-scheme-background-gradient` | Empty on every scheme — no gradients are used anywhere |
| `--section-vertical-spacing-tight`, `--section-stack-gap-tight` | Identical to their non-tight counterparts at every breakpoint |
| `--header-is-sticky`, `--announcement-bar-is-sticky` | Both `0`; `--sticky-area-height` consequently evaluates to `0px` |
| `--transform-logical-flip` / `-origin-start` / `-origin-end` RTL block | Emitted but store is single-locale `en` |
