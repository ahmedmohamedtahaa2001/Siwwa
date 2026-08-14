# 05 — SECTIONS INVENTORY (Siwa Fragrances / Prestige 11.1.0)

Reference: https://siwafragrances.com/ · Audit date: 2026-07-27 · Agent A-01 (reference audit)

**Evidence base.** Every value below is extracted from the captured HTML in `raw/pages/`:
`index.html`, `pdp_sample.html` (product `sundaze`), `collections_all.html`, `pages_about-us.html`,
plus `raw/collections.json` and `raw/meta.json`. Nothing is inferred from the Prestige source
(the theme's `.liquid`/`.css` is not in the capture) unless explicitly labelled **[inferred]**.

**Setting-type column.** The `Schema type` column states the Shopify schema `type` a rebuild must
use so the value is merchant-editable (see `Skills/MultiAgentsWorkFlow.md` §6). It is a
prescription for the rebuild, not a claim about Prestige's own schema.

**Colour reporting.** Prestige stores colours as space-separated `r g b` triplets. Both the raw
triplet and the hex are given everywhere.

---

## 0. Master section index

| # | Page(s) | Section type (from `shopify-section--*` class) | Live section ID | Wrapper colour scheme | Container | Vertical-spacing modifier | Bordered |
|---|---|---|---|---|---|---|---|
| 1 | all | `announcement-bar` | `sections--18814157193264__announcement_bar_6BNjyF` | scheme-3 | full-bleed | — | no |
| 2 | all | `header` | `sections--18814157193264__header` | scheme-2 | full-bleed | `--header-padding-block` | separation border |
| 3 | all | `cart-drawer` | `sections--18814157258800__cart-drawer` | scheme-1 | drawer | — | no |
| 4 | index (rendered); PDP/collection/page (empty) | `popup` (newsletter popup) | `sections--18814157258800__newsletter-popup` | scheme-3 | pop-in | — | no |
| 5 | all | `privacy-banner` | `sections--18814157258800__privacy-banner` | scheme-3 | pop-in | — | no |
| 6 | index | `slideshow` | `template--18814156636208__slideshow` | inline `--background: 0 0 0`; slide text 255 255 255 | full-bleed | none (0 padding) | no |
| 6b | about-us | `slideshow` | `template--18814156701744__slideshow_6aQJg6` | inline `--background: 0 0 0` | full-bleed | none | no |
| 7 | index | `featured-collections` (#1 "new in") | `template--18814156636208__featured_collections_EGrx3j` | scheme-1 | `.container` | `section-spacing` | **yes** |
| 8 | index | `image-with-text-overlay` | `template--18814156636208__image-with-text-overlay-1` | scheme-4 (`--with-image-overlay`) | full-bleed | none | no |
| 9 | index | `featured-collections` (#2 "BEST SELLERS") | `template--18814156636208__featured-collections-2` | scheme-1 | `.container` | `section-spacing` | no |
| 10 | index | `apps` — Judge.me testimonials carousel | `template--18814156636208__17592337449e486738` | scheme-1 | `.container` | `section-spacing` | **yes** |
| 11 | index | `scrolling-content` (#2) | `template--18814156636208__scrolling-content-2` | custom `bg-77e774e6…` (black) | full-bleed | `section-spacing--padded` | **yes** |
| 12 | index | `collection-list` | `template--18814156636208__collection_list_gpXjxV` | scheme-1 | `.container` | `section-spacing` | **yes** |
| 13 | index | `scrolling-content` (#1) | `template--18814156636208__scrolling-content-1` | custom `bg-77e774e6…` (black) | full-bleed | `section-spacing--padded` | **yes** |
| 14 | index | `media-grid` | `template--18814156636208__media-grid` | scheme-1 | `.container--lg` | `section-spacing` | no |
| 15 | index | `apps` (empty) | `template--18814156636208__17765002303c384e0a` | — | — | — | — |
| 16 | all | `text-with-icons` | `sections--18814157226032__text-with-icons` | scheme-1 | `.container` | `section-spacing--tight` | **yes** |
| 17 | all | `footer` | `sections--18814157226032__footer` | scheme-3 | `.container` | none (`.footer` own padding) | no |
| 18 | PDP | `main-product` | `template--18814156767280__main` | scheme-1 | `.container--lg` | `section-spacing--tight` | no |
| 19 | PDP | `apps` — Judge.me review widget | `template--18814156767280__1759233522bc5ee263` | scheme-1 | `.container` | `section-spacing` | **yes** |
| 20 | PDP | `related-products` | `template--18814156767280__related-products` | (async) | (async) | (async) | (async) |
| 21 | PDP | `recently-viewed-products` | `template--18814156767280__recently_viewed_products_LGtyH6` | scheme-1 | `.container` | `section-spacing` | **yes** |
| 22 | collection | `main-collection` | `template--18814157029424__main` | scheme-1 | `.container` | **none** | no |
| 23 | about-us | `main-page` | `template--18814156701744__main` | scheme-1 | `.container--xs` | `section-spacing--tight` | no |

Section-group membership (from `shopify-section-group-*` classes):
`header-group` = 1, 2 · `overlay-group` = 3, 4, 5 · `footer-group` = 16, 17 · everything else is
template-owned.

Colour-scheme background hashes observed (used by Prestige's "collapse consecutive same-background
sections" rule):

| Hash class | Resolves to | Triplet | Hex |
|---|---|---|---|
| `color-scheme--bg-54922f2e920ba8346f6dc0fba343d673` | scheme-1 / scheme-2 background | `255 255 255` | `#FFFFFF` |
| `color-scheme--bg-c1f8cb21047e4797e94d0969dc5d1e44` | scheme-3 background | `28 28 28` | `#1C1C1C` |
| `color-scheme--bg-3671eee015764974ee0aef1536023e0f` | scheme-4 background | `0 0 0 / 0.0` | transparent |
| `color-scheme--bg-a8cae304c51d650ac6decf52a4d75144` | scheme-`89deeaaa…` (red) background | `195 17 17` | `#C31111` |
| `color-scheme--bg-77e774e6cc4d94d6a32f6256f02d9552` | scrolling-content custom background | `0 0 0` | `#000000` |

---

## 1. Announcement bar

- **Prestige section type:** `announcement-bar` (`shopify-section--announcement-bar`)
- **Live section ID:** `sections--18814157193264__announcement_bar_6BNjyF`
- **Section group:** `header-group`
- **Renders:** a single-message auto-rotating bar at the very top of every page, wrapped in
  `<height-observer variable="announcement-bar">` so `--announcement-bar-height` is published to
  `:root`. Copy: **"Explore your Persona. Free shipping orders over 1500"**, rendered as
  `<p class="prose heading is-selected"><strong>…</strong></p>` — i.e. bolded, uses the heading
  font (uppercase, `0.18em` tracking).
- **Block-based:** yes. Prestige renders each message as a carousel cell inside
  `<announcement-bar-carousel>`. **One block present** — proposed block type `announcement`.
- **Colour scheme:** `scheme-3` (inverted) — text `255 255 255` `#FFFFFF` on background
  `28 28 28` `#1C1C1C`.
- **Behaviour attributes observed:** `allow-swipe`, `autoplay="3"` (3 s), sticky OFF
  (`--announcement-bar-is-sticky: 0`).
- **Type scale:** `--announcement-bar-font-size: 0.625rem` (10 px) mobile, `0.6875rem` (11 px)
  at `min-width: 999px`.

| Content slot | Live value | Schema type |
|---|---|---|
| Message text (block) | `Explore your Persona. Free shipping orders over 1500` | `inline_richtext` |
| Message link (block) | none (no `<a>` in markup) | `url` |
| Bold emphasis | `<strong>` wraps the whole message | `inline_richtext` (author-controlled) |
| Autoplay on/off | on | `checkbox` |
| Autoplay interval | `3` seconds | `range` (min 2, max 10, step 1, unit `s`) |
| Allow swipe | present | `checkbox` |
| Sticky bar | `--announcement-bar-is-sticky: 0` → off | `checkbox` |
| Colour scheme | `scheme-3` | `color_scheme` |
| Text colour | `255 255 255` `#FFFFFF` (via scheme) | `color` |
| Background colour | `28 28 28` `#1C1C1C` (via scheme) | `color` |
| Font size (desktop) | `0.6875rem` = 11 px | `range` (px) |
| Font size (mobile) | `0.625rem` = 10 px | `range` (px) |
| Show country/language selector | not rendered | `checkbox` |
| Show social icons | not rendered | `checkbox` |

---

## 2. Header

- **Prestige section type:** `header` (`shopify-section--header`)
- **Live section ID:** `sections--18814157193264__header`
- **Renders:** logo-centred header with the primary nav on a second row at ≥1000 px, a hamburger
  drawer below that, a secondary nav (account / search / cart) on the right, a slide-down
  predictive-search panel, and a left-opening `header-sidebar` mobile menu.
- **Block-based:** the menu itself comes from a Shopify **linklist**, not from blocks. No
  `data-block-id` attributes are present in the header markup, so **no blocks are in use**.
  A rebuild should still expose menu-item mega-menu behaviour per link (Prestige does this via
  `menu_*` blocks) — proposed block type `menu_item` / `mega_menu`.
- **Colour scheme:** `scheme-2` — text `0 0 0` `#000000` on background `255 255 255` `#FFFFFF`,
  border `217 217 217` `#D9D9D9`.

Layout tokens set on the section:

| Token | Value | Breakpoint |
|---|---|---|
| `--header-grid` | `"primary-nav logo secondary-nav" / minmax(0,1fr) auto minmax(0,1fr)` | < 1000 px |
| `--header-grid` | `". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0,1fr) auto minmax(0,1fr)` | ≥ 1000 px |
| `--header-padding-block` | `1rem` (16 px) | < 700 px |
| `--header-padding-block` | `1.6rem` (25.6 px) | ≥ 700 px |
| `--header-logo-width` | `80px` | < 700 px |
| `--header-logo-width` | `110px` | ≥ 700 px |
| `--header-transparent-header-text-color` | `255 255 255` `#FFFFFF` | all |
| `--header-separation-border-color` | `0 0 0 / 0.15` (`#000000` @ 15 %) | all |
| `--header-is-sticky` | `0` (not sticky) | all |

| Content slot | Live value | Schema type |
|---|---|---|
| Logo image | `//siwafragrances.com/cdn/shop/files/logo_6e889a1e-1178-440e-8bfb-249d5b777e14.png?v=1775298245` (intrinsic 6543 × 3337) | `image_picker` |
| Logo alt / shop name | `Siwa Fragrances` | `text` (falls back to `shop.name`) |
| Logo link | `/` | (structural) |
| Logo width desktop | `110px` | `range` (px) |
| Logo width mobile | `80px` | `range` (px) |
| Transparent-logo variant | not present in markup | `image_picker` |
| Menu (linklist) | HOME `/` · SHOP ALL `/collections/all` · ORIGINAL CREATIONS `/collections/original-creations` · FOR HIM `/collections/for-him` · FOR HER `/collections/for-her` · UNISEX `/collections/unisex` · BUNDLES `/collections/bundles` · BODY SPLASH `/collections/body-splash` · BODY LOTION `/collections/body-lotion` · CONTACT US `/pages/contact` | `link_list` |
| Layout preset | logo-centre + nav below (desktop) / nav-left + logo-centre (mobile) | `select` |
| Nav alignment | `header__primary-nav--center` | `select` |
| Sticky header | off (`--header-is-sticky: 0`) | `checkbox` |
| Transparent header on first section | enabled — slideshow sets `allow-transparent-header` | `checkbox` |
| Transparent-header text colour | `255 255 255` `#FFFFFF` | `color` |
| Separation border colour | `0 0 0 / 0.15` | `color` |
| Vertical padding desktop | `1.6rem` = 25.6 px | `range` (px) |
| Vertical padding mobile | `1rem` = 16 px | `range` (px) |
| Show search | yes — `/search`, opens `header-search` panel | `checkbox` |
| Search placeholder | `Search for...` | `text` |
| Show account icon | yes (`shopify-account`, signed-out avatar SVG); mobile drawer label `Login` | `checkbox` |
| Show cart icon | yes, `/cart`, opens `cart-drawer`, with `<cart-dot>` count bubble | `checkbox` |
| Cart icon style | `icon-cart` (bag with handle) | `select` |
| Mobile drawer open direction | `open-from="left"` | `select` |
| Mobile drawer colour scheme | `scheme-2` | `color_scheme` |
| Colour scheme | `scheme-2` | `color_scheme` |
| Shopify context | `<shopify-store store-domain="https://siwafragrances.com" country="EG" language="en">` | (structural) |

---

## 3. Cart drawer

- **Prestige section type:** `cart-drawer` (`shopify-section--cart-drawer`), `overlay-group`
- **Live section ID:** `sections--18814157258800__cart-drawer`
- **Renders:** a right-hand drawer, `drawer drawer--center-body`, opened from the header cart icon
  (`aria-controls="cart-drawer"`). In the capture the cart is empty, so only the header title and
  the empty-state line are present.
- **Block-based:** yes in Prestige (order note, shipping estimator, free-shipping bar, etc.).
  **No blocks rendered** in the capture — proposed block types `note`, `shipping_estimator`,
  `free_shipping_bar`, `text`, `button`.
- **Colour scheme:** `scheme-1` — text `28 28 28` `#1C1C1C` on `255 255 255` `#FFFFFF`.
- **Cart mode:** `window.themeVariables.settings.cartType = "drawer"`.

| Content slot | Live value | Schema type |
|---|---|---|
| Drawer title | `Cart` (`<p class="h4" slot="header">`) | `text` |
| Empty-cart message | `Your cart is empty` (`<p class="h5 text-center">`) | `text` |
| Empty-cart CTA label | not rendered | `text` |
| Empty-cart CTA link | not rendered | `url` |
| Colour scheme | `scheme-1` | `color_scheme` |
| Body alignment | `drawer--center-body` | `select` |
| Initial focus | `initial-focus="false"` | `checkbox` |
| Money format | `LE {{amount}}` (from `themeVariables`) | theme-level `text` |

---

## 4. Newsletter popup

- **Prestige section type:** `popup` (`shopify-section--popup`), `overlay-group`
- **Live section ID:** `sections--18814157258800__newsletter-popup`
- **Renders:** a centred modal (`<newsletter-popup class="pop-in newsletter-popup">`) with a close
  button, a heading, a sub-paragraph, an e-mail field and a submit button. It posts to
  `/contact#newsletter-sections--18814157258800__newsletter-popup` with hidden
  `contact[tags] = newsletter`.
- **Only rendered on the homepage capture.** In `pdp_sample.html`, `collections_all.html` and
  `pages_about-us.html` the same section ID is present but its body is empty — consistent with the
  `only-once` attribute below.
- **Block-based:** no blocks (`data-block-id` absent). Single fixed content group.
- **Colour scheme:** `scheme-3` — text `255 255 255` `#FFFFFF` on `28 28 28` `#1C1C1C`.

| Content slot | Live value | Schema type |
|---|---|---|
| Dialog title attribute | `Newsletter popup` | `text` |
| Heading | `A Gift for Your First Siwa Order` (`<p class="h4">`) | `text` |
| Body copy | `Subscribe to our newsletter and receive 50 EGP off your first purchase with Siwa Fragrances` | `richtext` |
| Image | none rendered | `image_picker` |
| E-mail input placeholder / floating label | `E-mail` | `text` |
| Submit button label | **`Get My Discount`** | `text` |
| Close button label | `Close` (sr-only) | `text` |
| Show once per visitor | `only-once` present → true | `checkbox` |
| Apparition delay | `apparition-delay="5"` (5 s) | `range` (s) |
| Newsletter tag applied | `contact[tags] = newsletter` | `text` |
| Colour scheme | `scheme-3` | `color_scheme` |
| Content gap | `v-stack gap-8` (outer) / `gap-4` (inner) | `range` (px) |
| Text alignment | `text-center` | `select` |

---

## 5. Privacy / cookie banner

- **Prestige section type:** `privacy-banner` (`shopify-section--privacy-banner`), `overlay-group`
- **Live section ID:** `sections--18814157258800__privacy-banner`
- **Renders:** a small `pop-in` consent banner with an emoji heading, one paragraph and two text
  buttons wired to `data-action="accept"` / `data-action="decline"`.
- **Block-based:** no.
- **Colour scheme:** `scheme-3` — `255 255 255` `#FFFFFF` on `28 28 28` `#1C1C1C`.

| Content slot | Live value | Schema type |
|---|---|---|
| Heading | `🍪 Cookie policy` (`<p class="h6">`) | `text` |
| Body copy | `We use cookies and similar technologies to provide the best experience on our website. Refer to our Privacy Policy for more information.` (`prose text-xs`) | `richtext` |
| Accept button label | **`Accept`** | `text` |
| Decline button label | **`Decline`** | `text` |
| Decline button style | `link text-xs text-subdued` (de-emphasised) | `select` |
| Accept button style | `link text-xs` | `select` |
| Close button label | `Close` (sr-only) | `text` |
| Colour scheme | `scheme-3` | `color_scheme` |
| Vertical gap | `v-stack gap-4`, buttons `h-stack gap-4` | `range` (px) |

---

## 6. Slideshow (homepage hero)

- **Prestige section type:** `slideshow` (`shopify-section--slideshow`)
- **Live section ID:** `template--18814156636208__slideshow`
- **Renders:** one full-bleed hero slide, image-only, with the header allowed to sit transparently
  over it. Content is bottom-left aligned with an eyebrow, a large headline and two buttons.
- **Block-based:** **yes** — one `.slideshow__slide` cell present. Proposed block type
  `slide` (Prestige: `image`/`video` slide blocks).
- **Colour scheme:** carousel background is set inline to `--background: 0 0 0` (`#000000`);
  the slide content forces `--text-color: 255 255 255` (`#FFFFFF`). No named scheme class — the
  slide's text colour is a per-slide inline override.

Carousel attributes: `allow-swipe`, `allow-transparent-header`, `autoplay="4"` (4 s),
`autoplay-pause-on-video`, `cell-selector=".slideshow__slide"`, `role="region"`.
Slide sizing: `content-over-media content-over-media--lg` (large height preset);
`--content-over-media-content-max-width: 800px`;
`--content-over-media-gradient-overlay: radial-gradient(rgba(221, 39, 57, 0) 100%)` — a fully
transparent radial gradient seeded from `221 39 57` `#DD2739`.

| Content slot | Live value | Schema type |
|---|---|---|
| Slide media type | `media-type="image"` | `select` (image / video / video_url) |
| Desktop image | `//siwafragrances.com/cdn/shop/files/Summer.jpg?v=1776355287` rendered at `width=896`, intrinsic 896 × 1200 | `image_picker` |
| Mobile image | same file via `<source media="(max-width: 699px)">` (800/1000/1200 w) | `image_picker` |
| Image alt text | `""` (empty — accessibility gap) | `text` |
| Eyebrow / subheading | `Summer Drops` (`<p class="h6">`) | `inline_richtext` |
| Heading | `THE SEASON HAS ARRIVED` (`<p class="h1">`) | `inline_richtext` |
| Body text | none | `richtext` |
| CTA 1 label | `Shop All` | `text` |
| CTA 1 URL | `https://siwafragrances.com/collections/all` (absolute) | `url` |
| CTA 1 background | `255 255 255` `#FFFFFF` | `color` |
| CTA 1 outline | `255 255 255` `#FFFFFF` | `color` |
| CTA 1 text colour | `0 0 0` `#000000` | `color` |
| CTA 2 label | `Summer Collection` | `text` |
| CTA 2 URL | `/collections/summer-collection` | `url` |
| CTA 2 background | `28 28 28` `#1C1C1C` | `color` |
| CTA 2 outline | `28 28 28` `#1C1C1C` | `color` |
| CTA 2 text colour | `255 255 255` `#FFFFFF` | `color` |
| Button group layout | `button-group--same-width justify-start sm:justify-start` | `select` + `checkbox` |
| Slide text colour | `255 255 255` `#FFFFFF` | `color` |
| Content position (desktop) | `sm:place-self-end-start` (bottom-left) | `select` |
| Content position (mobile) | `place-self-end-start` (bottom-left) | `select` |
| Text alignment | `text-start` both breakpoints | `select` |
| Content max width | `800px` | `range` (px) |
| Overlay / gradient | `radial-gradient(rgba(221, 39, 57, 0) 100%)` → 0 % opacity | `color` + `range` (opacity) |
| Section height preset | `content-over-media--lg` | `select` |
| Autoplay | on, `4` s | `checkbox` + `range` |
| Pause on video | `autoplay-pause-on-video` | `checkbox` |
| Reveal on scroll | `reveal-on-scroll="true"` | `checkbox` |
| Allow transparent header | `allow-transparent-header` | `checkbox` |
| Carousel background | `0 0 0` `#000000` | `color` |
| Border colour | `var(--text-color) / 0.15` | `color` |

### 6b. Slideshow — About Us variant

- **Live section ID:** `template--18814156701744__slideshow_6aQJg6` (page template `about-us`)
- One image slide, **no text content at all** (`<div class="prose"></div>` is empty).
- Image: `//siwafragrances.com/cdn/shop/files/About_Us.png?v=1759517000` intrinsic 3200 × 1200,
  mobile source 1200 × 1600. Alt `""`.
- `autoplay="5"`, height preset `content-over-media--md`, content max width `780px`,
  content position `place-self-center` / `text-center`, no `reveal-on-scroll`.
- Confirms the same section is reused as a page banner — the rebuild must not hardcode
  "hero-only" assumptions.

---

## 7. Featured collections #1 — "new in"

- **Prestige section type:** `featured-collections` (`shopify-section--featured-collections`)
- **Live section ID:** `template--18814156636208__featured_collections_EGrx3j`
- **Renders:** an eyebrow, a two-tab switcher (`men` / `women`) rendered as `<carousel-navigation>`
  `h2` buttons, and per tab a draggable product carousel plus a "View …" CTA. Tab 1 is
  pre-selected (`aria-current="true"`).
- **Block-based:** **yes** — each tab is one `.featured-collections-carousel__item`. Proposed
  block type `collection` with settings: collection reference, tab title, CTA label, CTA link.
- **Colour scheme:** `scheme-1` (`#1C1C1C` on `#FFFFFF`); wrapper carries `bordered-section`
  (top divider) and `section-spacing`.

Grid tokens: `--product-list-items-per-row: 2` (mobile) → `4` at ≥700 px;
`--product-list-horizontal-spacing-factor: 1`; `--product-list-vertical-spacing-factor: 1`.
Product-card `sizes` attribute proves the desktop layout: `calc((100vw - 96px) / 4 - (24px / 4 * 3))`
→ container gutters 2 × 48 px and a **24 px** inter-card gap.

| Content slot | Live value | Schema type |
|---|---|---|
| Eyebrow / subheading | `new in` (`<p class="h6 text-center"><strong>`) | `inline_richtext` |
| Heading style of tabs | `h2` | `select` |
| Tab 1 label (block) | `men` | `text` |
| Tab 1 collection (block) | carousel id `collection_ty6e9T` → CTA target `/collections/men-new-drops` (`men new drops`, 7 products) | `collection` |
| Tab 1 CTA label | `View MEN NEW DROPS` | `text` |
| Tab 1 CTA URL | `/collections/men-new-drops` | `url` |
| Tab 1 products shown | 7 cards: `lost-on-you`, `mango-on-woods`, `aurableu`, `mango-pineapple`, `summer-holidays`, `bleu-exclusive`, `insane-pineapple` | `range` (products to show) |
| Tab 2 label (block) | `women` | `text` |
| Tab 2 collection (block) | carousel id `collection_EcLKqi` → `/collections/women-new-drops` (`women new drops`, 9 products) | `collection` |
| Tab 2 CTA label | `View WOMEN NEW DROPS` | `text` |
| Tab 2 CTA URL | `/collections/women-new-drops` | `url` |
| Tab 2 products shown | 8 cards: `sundaze`, `pink-arrogance`, `pink-allure`, `lost-on-you`, `coco-woods`, `luna-di-roma`, `libre-desire`, `vanilla-91` | `range` |
| Items per row (desktop) | `4` | `range` |
| Items per row (mobile) | `2` | `range` |
| Horizontal spacing factor | `1` | `range` |
| Vertical spacing factor | `1` | `range` |
| Layout | carousel (`product-list--carousel`, `allow-drag`, `group-cells`, `scroll-area bleed md:unbleed`) | `select` (grid / carousel) |
| Prev/next buttons | `circle-button`, shown on hover inside the container | `checkbox` + `select` |
| Show section divider | `bordered-section` present → true | `checkbox` |
| Colour scheme | `scheme-1` | `color_scheme` |
| Text alignment | `text-center` header, `justify-self-center` CTA | `select` |
| Card: show vendor | yes — `<a class="vendor smallcaps heading">` (e.g. `Lost In Paris Roja`) | `checkbox` |
| Card: show rating | yes — `rating-badge` with star SVGs `fill="#ffd700"` + `(5.0)` and `title="N reviews"` | `checkbox` |
| Card: show quick-add | yes — `product-card__quick-add-button` + `<quick-buy-modal>` | `checkbox` |
| Card: badges | `sold-out` badge rendered (`Sold out`) in `badge-list--vertical` | `checkbox` + `select` |
| Card: image aspect | `aspect-square` | `select` |
| Card: price format | `From LE 750.00` / `LE 380.00` (money format `LE {{amount}}`) | (theme-level) |

---

## 8. Image with text overlay

- **Prestige section type:** `image-with-text-overlay` (`shopify-section--image-with-text-overlay`)
- **Live section ID:** `template--18814156636208__image-with-text-overlay-1`
- **Renders:** a full-bleed banner promoting the Bundles collection, with an eyebrow, a large
  heading and one outline button, positioned bottom-left on desktop and centred on mobile.
- **Block-based:** no `data-block-id` present — single fixed content group. (Prestige exposes
  heading/text/button as blocks in some versions; the rebuild should use blocks of type
  `heading`, `text`, `button` so ordering is editable.)
- **Colour scheme:** `scheme-4` + `color-scheme--with-image-overlay` — text `255 255 255`
  `#FFFFFF`, background `0 0 0 / 0.0` (fully transparent), border `255 255 255` `#FFFFFF`.

Tokens: `--content-over-media-overlay: 0 0 0 / 0.0` (overlay opacity **0 %**),
`--content-over-media-content-max-width: var(--container-xs-max-width)` = `42.5rem` = **680 px**,
height preset `content-over-media--md`, `reveal-on-scroll="true"`.

| Content slot | Live value | Schema type |
|---|---|---|
| Desktop image | `//siwafragrances.com/cdn/shop/files/Bundles_1.png?v=1759677715` intrinsic 2500 × 900 | `image_picker` |
| Mobile image | `//siwafragrances.com/cdn/shop/files/Artboard_1_1.png?v=1759677715` intrinsic 1100 × 1500 | `image_picker` |
| Image alt | `""` (empty) | `text` |
| Eyebrow / subheading | `OFFERS & DISCOUNTS` (`<p class="h6">`) | `inline_richtext` |
| Heading | `OUR BUNDLES` (`<p class="h2">`) | `inline_richtext` |
| Body text | none | `richtext` |
| CTA label | `Shop NOW` | `text` |
| CTA URL | `/collections/bundles` | `url` |
| CTA style | `button button--outline` | `select` |
| CTA background | `255 255 255` `#FFFFFF` | `color` |
| CTA outline colour | `255 255 255` `#FFFFFF` | `color` |
| CTA text colour | `28 28 28` `#1C1C1C` | `color` |
| Overlay colour | `0 0 0` `#000000` | `color` |
| Overlay opacity | `0.0` → 0 % | `range` (%) |
| Content max width | `680px` (= `--container-xs-max-width`) | `range` (px) |
| Section height | `content-over-media--md` | `select` |
| Content position desktop | `sm:place-self-end-start` (bottom-left) | `select` |
| Content position mobile | `place-self-center` | `select` |
| Text alignment | `sm:text-start` / `text-center` | `select` |
| Reveal on scroll | `true` | `checkbox` |
| Colour scheme | `scheme-4` | `color_scheme` |

---

## 9. Featured collections #2 — "BEST SELLERS"

- **Prestige section type:** `featured-collections`
- **Live section ID:** `template--18814156636208__featured-collections-2`
- **Renders:** identical structure to §7 but with different copy, different collections and much
  tighter card spacing. **No** `bordered-section` (no divider) — it butts against the
  image-with-text-overlay above it.
- **Block-based:** yes — 2 tab blocks.
- **Colour scheme:** `scheme-1`.

Grid tokens: `--product-list-items-per-row: 2` → `4` at ≥700 px;
**`--product-list-horizontal-spacing-factor: 0.2`** and
**`--product-list-vertical-spacing-factor: 0.2`** (vs `1` in §7) — the single clearest example on
the site of the same section type being tuned differently per instance.

| Content slot | Live value | Schema type |
|---|---|---|
| Eyebrow / subheading | `BEST SELLERS` (`<p class="h6"><strong>`) | `inline_richtext` |
| Tab 1 label | `men` | `text` |
| Tab 1 collection | carousel id `collection-1` → `/collections/men-best-sellers` (`MEN BEST SELLERS`, 17 products) | `collection` |
| Tab 1 CTA label | `View all MEN BEST SELLERS` | `text` |
| Tab 1 CTA URL | `/collections/men-best-sellers` | `url` |
| Tab 1 products shown | 6 cards: `mawj`, `lady-killer`, `drunk-gold`, `lagoon-flair`, `marasi`, `bleu-exclusive` | `range` |
| Tab 2 label | `WOMEN` (note the inconsistent casing vs §7's `women`) | `text` |
| Tab 2 collection | carousel id `collection_UnGcaq` → `/collections/women-best-sellers` (`WOMEN BEST SELLERS`, 11 products) | `collection` |
| Tab 2 CTA label | `View ALL WOMEN BEST SELLERS` | `text` |
| Tab 2 CTA URL | `/collections/women-best-sellers` | `url` |
| Tab 2 products shown | 8 cards: `layering-vanilla`, `hibiscusex`, `boujee-blush`, `pink-arrogance`, `irresistible-vanilla`, `layering-pistachio`, `silk-vanilla`, `vanilla-91` | `range` |
| Horizontal spacing factor | `0.2` | `range` (0–2, step 0.1) |
| Vertical spacing factor | `0.2` | `range` (0–2, step 0.1) |
| Items per row desktop / mobile | `4` / `2` | `range` |
| Show section divider | absent → false | `checkbox` |
| Colour scheme | `scheme-1` | `color_scheme` |

---

## 10. Apps — Judge.me testimonials carousel (homepage)

- **Prestige section type:** `apps` (`shopify-section--apps`)
- **Live section ID:** `template--18814156636208__17592337449e486738`
- **App block ID:** `AdGJjWk43R1pNOVBuV__judge_me_reviews_testimonials_carousel_PDLRxp`
  (extension `judgeme-657`)
- **Renders:** a Judge.me "testimonials carousel" — heading, store-wide rating summary, then
  JS-hydrated review cards (the cards themselves are client-rendered; `jdgm-testimonials-container`
  is empty in the HTML).
- **Block-based:** yes — the `apps` section holds `@app` blocks. One block present.
- **Colour scheme:** section wrapper `scheme-1` + `section-spacing` + `bordered-section`;
  the widget's own colours are set inline by the app (see below) and are **not** driven by the
  theme's colour schemes.

| Content slot | Live value | Schema type (if rebuilt natively) |
|---|---|---|
| Widget heading | `Customers are saying` (`<h2 class="jdgm-title">`) | `text` |
| Average rating displayed | `4.98 ★` | (dynamic) |
| Review count displayed | `1176` | (dynamic) |
| Verified badge | `jdgm-verified-badge-header` (hidden), label `Verified` | `checkbox` + `text` |
| Max width | `--max-width: 1200px` | `range` (px) |
| Text colour | `#000000` (`0 0 0`) | `color` |
| Card colour | `#f9f9f9` (`249 249 249`) | `color` |
| Border | `none` | `range` + `color` |
| Border radius | empty (`--border-radius: ;`) | `range` (px) |
| Box shadow | `none` | `select` |
| Quote-mark graphic | inline base64 SVG, fill `#ffd700` (`255 215 0`), aspect `1.52`, `quote_marks_size: "hidden"` | `image_picker` / `select` |
| Body text size | `24px` desktop / `20px` mobile | `range` (px) |
| Line clamp | `3` desktop / `4` mobile | `range` |
| Stars size | `24px` (`stars_size: "medium"`) | `range` (px) |
| Stars colour | `#ffd700` (`255 215 0`) | `color` |
| Product-name size | `16px` (`product_name_text_size: "small"`) | `range` (px) |
| Arrows colour | `#000000` | `color` |
| Transition speed | `5` | `range` (s) |
| Star filter | `star_rating: '5_star'` | `select` |
| Max reviews pulled | `20` | `range` |
| Review source | `reviews_selection: "custom_products"`, `product_ids: [7735874814000, 7735877206064, 7735873568816, 7735877500976, 7924236714032, 7909727961136, 7776920109104, 7735874322480]` | `product` (list) |
| Show sample reviews | `false` | `checkbox` |
| Show reviewer name | `null` | `checkbox` |
| Min reviews to render | `1` | `range` |
| Section colour scheme | `scheme-1` | `color_scheme` |
| Show section divider | `bordered-section` → true | `checkbox` |

---

## 11. Scrolling content #2 — "True Elegance"

- **Prestige section type:** `scrolling-content` (`shopify-section--scrolling-content`)
- **Live section ID:** `template--18814156636208__scrolling-content-2`
- **Renders:** a full-bleed black marquee band with one repeating phrase scrolling **right**.
- **Block-based:** yes — one `.scrolling-content__item`. Proposed block type `text` (Prestige also
  supports `image` items).
- **Colour scheme:** no named scheme — a custom background hash
  `color-scheme--bg-77e774e6cc4d94d6a32f6256f02d9552` with inline
  `--background: 0 0 0` (`#000000`), `--text-color: 255 255 255` (`#FFFFFF`),
  `--border-color: 38 38 38` (`#262626`). Wrapper: `section-spacing section-spacing--padded
  bordered-section`.

| Content slot | Live value | Schema type |
|---|---|---|
| Item text (block) | **`True Elegance`** | `inline_richtext` |
| Item type | text (`<p class="scrolling-content__text heading">`) | `select` (text / image) |
| Item image | none | `image_picker` |
| Item link | none | `url` |
| Scroll direction | `direction="right"` | `select` |
| Scroll speed | `speed="0.1"` | `range` |
| Font size | `clamp(32px, calc(32px + (64 - 32) * ((100vw - 375px) / (1400 - 375))), 64px)` → 32 px @375 px, 64 px @1400 px | `range` (min px) + `range` (max px) |
| Gap between repeats | `--scrolling-content-content-gap: clamp(25px … 50px)` | `range` (px) |
| Section vertical spacing | `--section-vertical-spacing: clamp(20px … 40px)` | `range` (px) |
| Background colour | `0 0 0` `#000000` | `color` |
| Text colour | `255 255 255` `#FFFFFF` | `color` |
| Border colour | `38 38 38` `#262626` | `color` |
| Show section divider | `bordered-section` → true | `checkbox` |
| Padded variant | `section-spacing--padded` | `checkbox` / `select` |

---

## 12. Collection list — "our collections"

- **Prestige section type:** `collection-list` (`shopify-section--collection-list`)
- **Live section ID:** `template--18814156636208__collection_list_gpXjxV`
- **Renders:** a centred `h2` heading, then a draggable carousel of 8 collection cards. Each card
  is an `<a>` wrapping an image with a bottom-centred outline **button** carrying the card label
  (note: the label is a `<button tabindex="-1">`, not the collection title — so the label is a
  per-block text setting, not `collection.title`).
- **Block-based:** **yes** — 8 blocks. Proposed block type `collection` with settings
  `collection`, `label`, `image` (override), `button_style`.
- **Colour scheme:** section `scheme-1`; every card's content overlay uses `scheme-4`
  (white text over transparent).

Tokens: `--collection-list-item-size: 84vw` (<700 px) → `62vw` (≥700 px) → `unset` with
`--collection-list-items-per-row: 2` at ≥1150 px; `--collection-list-gap: 1.5rem` (24 px) →
`1.875rem` (30 px) at ≥1150 px. Card overlay `--content-over-media-overlay: 0 0 0 / 0.0`,
height preset `content-over-media--md`, images use `zoom-image group-hover:zoom`.

| # | Card label (live) | Collection URL | Image (CDN file) | Intrinsic size | Alt text |
|---|---|---|---|---|---|
| 1 | `for her` | `/collections/for-her` | `WhatsApp_Image_2025-09-25_at_1.05.14_AM.jpg?v=1759267955` | 1600 × 1600 | `FOR HER` |
| 2 | `FOR Him` | `/collections/for-him` | `For_Him.png?v=1759518964` | 1600 × 1600 | `FOR HIM` |
| 3 | `bundles` | `/collections/bundles` | `Artboard_1.png?v=1759677906` | 1100 × 1500 | `Bundles` |
| 4 | `body lotion` | `/collections/body-lotion` | `Artboard_3_1.jpg?v=1759147740` | 3507 × 4982 | `Body lotion` |
| 5 | `unisex` | `/collections/unisex` | `Unisex.png?v=1759518990` | 1600 × 1600 | `UNISEX` |
| 6 | `original creation` | `/collections/original-creations` | `MG_4160.jpg?v=1759268144` | 1600 × 1600 | `Original Creations` |
| 7 | `best sellers` | `/collections/best-sellers` | `MG_4168.jpg?v=1759268008` | 1600 × 1600 | `BEST SELLERS` |
| 8 | `new drops` | `/collections/new-drops` | `MG_4172.jpg?v=1759267985` | 1600 × 1600 | `new drops` |

All 8 images are served from `/cdn/shop/collections/` — i.e. they are the **collection featured
images**, not section-level uploads. Card labels differ in case from the collection titles in
`raw/collections.json` (`FOR HER` vs `for her`, `Original Creations` vs `original creation`),
confirming the label is an independent editable string.

| Content slot | Live value | Schema type |
|---|---|---|
| Section heading | `our collections` (`<h2 class="h2">`) | `inline_richtext` |
| Heading alignment | `justify-self-center text-center` | `select` |
| Card label (per block) | see table above | `text` |
| Card collection (per block) | see table above | `collection` |
| Card image (per block) | collection featured image; overridable | `image_picker` |
| Card image alt | collection title | `text` |
| Card button style | `button button--outline` | `select` |
| Card content position | `place-self-end-center text-center` | `select` |
| Card overlay colour | `0 0 0` `#000000` | `color` |
| Card overlay opacity | `0.0` | `range` (%) |
| Card colour scheme | `scheme-4` | `color_scheme` |
| Card height preset | `content-over-media--md` | `select` |
| Hover zoom | `zoom-image group-hover:zoom` | `checkbox` |
| Items per row (≥1150 px) | `2` | `range` |
| Item width (mobile) | `84vw` | `range` (vw) |
| Item width (700–1149 px) | `62vw` | `range` (vw) |
| Gap (mobile / ≥1150 px) | `1.5rem` = 24 px / `1.875rem` = 30 px | `range` (px) |
| Layout | carousel (`scroll-area bleed lg:unbleed`, `allow-drag`, `group-cells`) | `select` |
| Prev/next buttons | `circle-button circle-button--lg`, on hover | `checkbox` + `select` |
| Colour scheme | `scheme-1` | `color_scheme` |
| Show section divider | `bordered-section` → true | `checkbox` |

---

## 13. Scrolling content #1 — "Signature Luxury"

- **Prestige section type:** `scrolling-content`
- **Live section ID:** `template--18814156636208__scrolling-content-1`
- Identical construction to §11, different copy, opposite direction and slightly larger padding.
- **Block-based:** yes — one text item.

| Content slot | Live value | Schema type |
|---|---|---|
| Item text (block) | **`Signature Luxury`** | `inline_richtext` |
| Scroll direction | `direction="left"` | `select` |
| Scroll speed | `speed="0.1"` | `range` |
| Font size | `clamp(32px … 64px)` (same as §11) | `range` |
| Gap between repeats | `--scrolling-content-content-gap: clamp(30px … 30px)` → fixed 30 px | `range` (px) |
| Section vertical spacing | `--section-vertical-spacing: clamp(20px … 46px)` | `range` (px) |
| Background colour | `0 0 0` `#000000` | `color` |
| Text colour | `255 255 255` `#FFFFFF` | `color` |
| Border colour | `38 38 38` `#262626` | `color` |
| Show section divider | `bordered-section` → true | `checkbox` |

---

## 14. Media grid — "Uncover Hidden Gems"

- **Prestige section type:** `media-grid` (`shopify-section--media-grid`)
- **Live section ID:** `template--18814156636208__media-grid`
- **Renders:** a centred `h2` and three equal tiles inside `.container--lg`, each tile an `<a>`
  around an image with a centred `h3` label and an outline button.
- **Block-based:** **yes** — 3 blocks. Proposed block type `image` (Prestige also supports `video`).
- **Colour scheme:** section `scheme-1`; each tile's overlay content uses `scheme-4`.

Tokens: `--media-grid-row-height: 180px` (<700 px) → `290px` (≥700 px);
`--media-grid-gap: 0.5rem` (8 px) → `0.75rem` (12 px) at ≥1150 px.
Every tile: `--media-grid-item-column-span: 4; --media-grid-item-row-span: 2` — i.e. a
**12-column** grid with three 4-column tiles, 2 rows tall (≈ 580 px desktop).
The rendered `sizes="(max-width: 699px) 100vw, 420px"` confirms `.container--lg` = 1260 px
(1260 ÷ 3 = 420).

| Tile | Heading (live) | Button label | Link | Image (CDN file) | Intrinsic size | Alt |
|---|---|---|---|---|---|---|
| 1 | `ORIGINAL CREATIONS` | `TRY NOW` | `/collections/original-creations` | `Original_Creations_1.jpg?v=1759267663` | 1600 × 1600 | `""` |
| 2 | `BODY SPLASHES` | `SHOP NOW` | `/collections/body-splash` | `Body_Splash.jpg?v=1759267660` | 1600 × 1600 | `""` |
| 3 | `body LOTION` | `SHOP NOW` | `/collections/body-lotion` | `MG_7385.jpg?v=1759147726` | 3507 × 4982 | `""` |

| Content slot | Live value | Schema type |
|---|---|---|
| Section heading | `Uncover Hidden Gems` (`<h2 class="h2">`) | `inline_richtext` |
| Heading alignment | `justify-self-center text-center` | `select` |
| Tile heading (per block) | see table (`<p class="h3">`) | `inline_richtext` |
| Tile button label (per block) | see table | `text` |
| Tile link (per block) | see table | `url` |
| Tile image (per block) | see table | `image_picker` |
| Tile image alt | `""` (empty on all three) | `text` |
| Tile media type | image | `select` (image / video) |
| Tile column span | `4` of 12 | `range` |
| Tile row span | `2` | `range` |
| Tile overlay colour | `0 0 0` `#000000` | `color` |
| Tile overlay opacity | `0.0` | `range` (%) |
| Tile colour scheme | `scheme-4` | `color_scheme` |
| Tile content position | `place-self-center text-center` | `select` |
| Button style | `button button--outline` | `select` |
| Hover zoom | `zoom-image group-hover:zoom` | `checkbox` |
| Reveal on scroll | `reveal-on-scroll="true"` | `checkbox` |
| Row height (mobile / ≥700 px) | `180px` / `290px` | `range` (px) |
| Grid gap (mobile / ≥1150 px) | `0.5rem` = 8 px / `0.75rem` = 12 px | `range` (px) |
| Container width | `.container--lg` = 1260 px | `select` / `range` |
| Colour scheme | `scheme-1` | `color_scheme` |
| Show section divider | absent → false | `checkbox` |

---

## 15. Apps (empty)

- **Prestige section type:** `apps` (`shopify-section--apps`)
- **Live section ID:** `template--18814156636208__17765002303c384e0a`
- **Renders:** nothing. The element is
  `<section id="shopify-section-template--18814156636208__17765002303c384e0a"
  class="shopify-section shopify-section--apps">\n</section>` — an empty `apps` section sitting
  between the media grid and the footer group.
- The **Shopify Inbox** chat app is loaded on the page
  (`shopify-inbox-1295/assets/inbox-chat-loader.js`, `shopify-chat-bundle-selector.js`), but it is
  injected outside this section, so which app block (if any) this section is meant to host is
  **not determinable from captured data**.
- **Recommendation for rebuild:** keep one empty `apps` section available in the homepage template
  so merchants can drop app blocks in without code changes.

---

## 16. Text with icons (3 USPs)

- **Prestige section type:** `text-with-icons` (`shopify-section--text-with-icons`),
  member of `footer-group` — so it renders on **every** page (homepage, PDP, collection, page).
- **Live section ID:** `sections--18814157226032__text-with-icons`
- **Renders:** three USP columns, each an inline SVG picto + a bold `h6` label + a paragraph.
  On mobile it collapses to a swipeable carousel with page dots (`disabled-on="sm"` → carousel
  only below 700 px); on ≥700 px it is a static 3-up row.
- **Block-based:** **yes** — 3 `.text-with-icons__item` blocks, `aria-label="Item n of 3"`.
  Proposed block type `item`.
- **Colour scheme:** `scheme-1`; wrapper `section-spacing section-spacing--tight bordered-section`.

| # | Icon (class) | Heading (live) | Body (live) |
|---|---|---|---|
| 1 | `icon-picto-return` | **`14 days return`** | `Returns are accepted for items in their original, unused sealed condition.` |
| 2 | `icon-picto-operator` | **`support 24/7`** | `Reach out to us via DM<br/>Email: contact@siwafragrances.com<br/><br/>` |
| 3 | `icon-picto-lock` | **`Payment Protection`** | `Your payment details are encrypted and secure.` |

Each icon is emitted **twice** per block — one `class="sm:hidden"` copy and one
`class="hidden sm:block"` copy — i.e. Prestige supports a separate mobile icon size/variant.
Both copies here use `width="24"` and `stroke-width="2"`.

| Content slot | Live value | Schema type |
|---|---|---|
| Item icon (per block) | `picto-return` / `picto-operator` / `picto-lock` (theme icon library) | `select` (icon name) |
| Item custom icon image | none | `image_picker` |
| Item icon size (desktop) | `width="24"` | `range` (px) |
| Item icon size (mobile) | `width="24"` | `range` (px) |
| Item icon stroke width | `2` | `range` |
| Item icon colour | inherits `currentColor` = `28 28 28` `#1C1C1C` | `color` |
| Item heading (per block) | see table (`<p class="h6"><strong>`) | `inline_richtext` |
| Item body (per block) | see table (`prose`) | `richtext` |
| Item link | none | `url` |
| Item alignment | `text-center` mobile → `sm:text-start` desktop | `select` |
| Icon alignment | `justify-items-center` → `sm:justify-items-start` | `select` |
| Gap icon↔text | `v-stack gap-6` | `range` (px) |
| Gap heading↔body | `v-stack gap-2` | `range` (px) |
| Outer stack gap | `v-stack gap-8` | `range` (px) |
| Carousel below breakpoint | `disabled-on="sm"` (carousel only < 700 px) | `select` |
| Allow swipe | `allow-swipe` | `checkbox` |
| Page dots | `page-dots sm:hidden`, 3 buttons | `checkbox` |
| Border colour | `var(--text-color) / 0.15` | `color` |
| Colour scheme | `scheme-1` | `color_scheme` |
| Show section divider | `bordered-section` → true | `checkbox` |
| Vertical spacing preset | `section-spacing--tight` | `select` |

---

## 17. Footer

- **Prestige section type:** `footer` (`shopify-section--footer`), `footer-group`
- **Live section ID:** `sections--18814157226032__footer`
- **Renders:** three blocks in a row (two link lists + a newsletter block), then a social-icon row,
  then the copyright aside.
- **Block-based:** **yes** — 3 blocks: `footer__block--links` × 2, `footer__block--newsletter` × 1.
  Proposed block types `links`, `newsletter`, plus Prestige's `text`, `image`, `menu`.
- **Colour scheme:** `scheme-3` — text `255 255 255` `#FFFFFF` on `28 28 28` `#1C1C1C`,
  border `62 62 62` `#3E3E3E`.
- **Layout token:** `--footer-content-justify-items: space-between`.

Block 1 — links, heading `Main menu` (`<p class="h6">`), 10 items:

| Label | URL |
|---|---|
| HOME | `/` |
| SHOP ALL | `/collections/all` |
| ORIGINAL CREATIONS | `/collections/original-creations` |
| FOR HIM | `/collections/for-him` |
| FOR HER | `/collections/for-her` |
| UNISEX | `/collections/unisex` |
| BUNDLES | `/collections/bundles` |
| BODY SPLASH | `/collections/body-splash` |
| BODY LOTION | `/collections/body-lotion` |
| CONTACT US | `/pages/contact` |

Block 2 — links, heading `MORE INFORMATION`, 4 items:

| Label | URL |
|---|---|
| SEARCH | `/search` |
| REFUND POLICY | `/policies/refund-policy` |
| ABOUT US | `/pages/about-us` |
| PRIVACY POLICY | `/policies/privacy-policy` |

Block 3 — newsletter: heading `Newsletter`, body
`Sign up to our newsletter to receive exclusive offers.`, e-mail input (placeholder + floating
label `E-mail`, `enterkeyhint="send"`), submit button `Subscribe`, hidden
`contact[tags] = newsletter`, posts to `/contact#newsletter-form-sections--18814157226032__footer`.

Social icons (4, all `target="_blank" rel="noopener"`):

| Network | URL | aria-label |
|---|---|---|
| Facebook | `https://www.facebook.com/share/1AYNy8M7mJ/?mibextid=wwXIfr` | `Follow on Facebook` |
| Instagram | `https://www.instagram.com/siwafragrances?igsh=MXE0anh6NXlnYzFmaw==` | `Follow on Instagram` |
| TikTok | `https://www.tiktok.com/@siwafragrances?_t=ZS-8zhBvV3DKCe&_r=1` | `Follow on TikTok` |
| WhatsApp | `https://api.whatsapp.com/message/VLSFRC5URF6EP1?autoload=1&app_absent=0` | `Follow on WhatsApp` |

| Content slot | Live value | Schema type |
|---|---|---|
| Block 1 heading | `Main menu` | `text` |
| Block 1 menu | 10-item linklist (above) | `link_list` |
| Block 2 heading | `MORE INFORMATION` | `text` |
| Block 2 menu | 4-item linklist (above) | `link_list` |
| Newsletter heading | `Newsletter` | `text` |
| Newsletter body | `Sign up to our newsletter to receive exclusive offers.` | `richtext` |
| Newsletter input label/placeholder | `E-mail` | `text` |
| Newsletter button label | `Subscribe` | `text` |
| Social icons | 4 URLs above | theme-level `url` × network |
| Social icon size | `width="24"` | `range` (px) |
| Social icon style | `social-media--list` with `branding-colors--*` classes | `select` |
| Copyright line | `© 2026 - Siwa Fragrances` (`heading text-subdued text-xxs`) | `inline_richtext` |
| "Powered by Shopify" link | present but with an empty label (` `) | `checkbox` |
| Payment icons | **not rendered** | `checkbox` |
| Locale / currency selector | **not rendered** | `checkbox` |
| Block layout | `--footer-content-justify-items: space-between` | `select` |
| Block gaps | `v-stack gap-4 sm:gap-5` (heading↔list), `gap-2.5` (list items) | `range` (px) |
| Colour scheme | `scheme-3` | `color_scheme` |

---

## 18. Main product (PDP)

- **Prestige section type:** `main-product` (`shopify-section--main-product`)
- **Live section ID:** `template--18814156767280__main` (captured on `/products/sundaze`,
  product id `8032720257072`)
- **Renders:** a 2-column product layout — gallery left, sticky info column right, description
  below the gallery on desktop — plus a sticky add-to-cart bar and a quick-buy modal template.
- **Block-based:** **yes**, heavily. Blocks in DOM order (`data-block-id` / `data-block-type`):

| # | `data-block-id` | `data-block-type` | Rendered content (live) |
|---|---|---|---|
| 1 | `title` | `title` | `<h1 class="product-title h3">Sundaze</h1>` |
| 2 | `price` | `price` | `LE 500.00` (`sale-price h4 text-subdued`) |
| 3 | `payment_terms` | `payment-terms` | Shop Pay installments form (empty — `offers_shop_pay_installments: false`) |
| 4 | `separator` | `separator` | `<hr>` |
| 5 | `vendor` | `vendor` | `Power Of You Giorgio Armani` → `/collections/vendors?q=…` |
| 6 | `variant_picker` | `variant-picker` | legend `Size:`, block swatches `30 ml` / `50 ml` / `100 ml` |
| 7 | `text_XP3cia` | `text` | `<a href="/pages/size-chart-1" title="Size Chart">Size chart</a>` |
| 8 | `quantity_selector` | `quantity-selector` | qty stepper, min 1, step 1, value 1 |
| 9 | `inventory_Ut4wkJ` | `inventory` | `Only a few units left` (`variant-inventory class="inventory text-warning"`) |
| 10 | `volume_pricing_P9F794` | `volume-pricing` | empty |
| 11 | `buy_buttons` | `buy-buttons` | `Add to cart` (`button w-full`) |
| 12 | `description` | `description` | full `body_html` (THE VIBE / blockquote / FRAGRANCE PROFILE / PERFORMANCE & WEAR) |
| 13 | `AU0o0d2txTFZPR05IW__judge_me_reviews_preview_badge_tkKyYf-1` | `@app` | Judge.me preview badge (`No reviews` in the static HTML) |

  The **quick-buy modal template** re-renders a reduced block set: `title`, `price`,
  `payment_terms`, `separator`, `vendor`, `variant_picker`, `quantity_selector`, `buy_buttons`,
  `@app` badge, plus a `View details` link.

- **Colour scheme:** `scheme-1`; wrapper `section-spacing section-spacing--tight`, container
  `.container--lg` (1260 px), **no** `bordered-section`.

Layout tokens:

| Token | Value | Breakpoint |
|---|---|---|
| `--product-grid` | `"product-gallery" "product-info" "product-content" / minmax(0,1fr)` | < 1000 px |
| `--product-grid` | `"product-gallery product-info" auto "product-content product-info" minmax(0,1fr) / minmax(0,0.65fr) minmax(0,0.35fr)` | ≥ 1000 px |

| Content slot | Live value | Schema type |
|---|---|---|
| Gallery layout | `scroll-carousel` + `adaptive-height`, `scroll-area full-bleed md:unbleed` | `select` |
| Gallery zoom | `allow-zoom="3"` (3× ) | `checkbox` + `range` |
| Gallery zoom button | `Zoom picture` (sr-only), `circle-button--sm md:hidden` | `checkbox` |
| Media count (sundaze) | 1 image, media id `30372096606256`, `IMG-6766.jpg?v=1784984707` 1080 × 1080 | (dynamic) |
| Image alt | `Sundaze` (product title) | (dynamic) |
| Desktop column split | `0.65fr / 0.35fr` | `range` / `select` |
| Sticky info column | `<safe-sticky class="product-info">` | `checkbox` |
| Title heading level/size | `h1` element, `h3` type scale | `select` |
| Price size | `h4` | `select` |
| Vendor link target | `/collections/vendors?q=<vendor>` | `checkbox` |
| Variant picker style | `block-swatch` (boxed labels) | `select` (dropdown / swatch / block) |
| Variant option label | `Size:` | (dynamic, from product option) |
| Quantity selector | shown | `checkbox` |
| Inventory notice text | `Only a few units left` | `text` |
| Inventory notice colour | `.inventory { color: #ff0000 }` — hardcoded in a page-level `<style>` | `color` |
| Buy button label | `Add to cart` | `text` |
| Buy button width | `w-full` | `checkbox` |
| Dynamic checkout button | not rendered | `checkbox` |
| Custom text block | `Size chart` → `/pages/size-chart-1` | `richtext` + `url` |
| Separator block | `<hr>` | (block) |
| Description position | `#product-extra-information` below gallery on desktop | `select` |
| Complementary products | `<product-recommendations limit="2" intent="complementary">` (async) | `checkbox` + `range` |
| Sticky add-to-cart bar | `<product-sticky-bar>` present, hides info `sm-max:hidden` | `checkbox` |
| Quick-buy modal | template present | `checkbox` |
| Recently-viewed tracking | `localStorage['theme:recently-viewed-products']` | `checkbox` |
| Colour scheme | `scheme-1` | `color_scheme` |
| Container width | `.container--lg` = 1260 px | `select` |

---

## 19. Apps — Judge.me review widget (PDP)

- **Prestige section type:** `apps` (`shopify-section--apps`)
- **Live section ID:** `template--18814156767280__1759233522bc5ee263`
- **App block ID:** `AZmtCVkNTOWMxaHZIZ__judge_me_reviews_review_widget_ExadyT`
- **Renders:** the Judge.me per-product review widget (`#judgeme_product_reviews`), with a legacy
  fallback markup block containing the histogram, an average-rating summary and a "Write a review"
  link. Wrapper: `scheme-1`, `.container`, `section-spacing`, `bordered-section`.
- **Block-based:** yes — one `@app` block.

| Content slot | Live value | Schema type (if rebuilt natively) |
|---|---|---|
| Widget title | `Customer Reviews` (`jdgm-rev-widg__title`) | `text` |
| Empty state | `Be the first to write a review` | `text` |
| Write-review link | `Write a review` | `text` |
| Widget max width | `max-width: 1200px; margin: 0 auto` (inline) | `range` (px) |
| Product title data | `Sundaze` | (dynamic) |
| Product id | `8032720257072` | (dynamic) |
| Shop average rating | `4.98` | (dynamic) |
| Shop review count | `1176` | (dynamic) |
| Product review count in widget | `data-shop-reviews-count="222"`, `data-average-rating='0.00'`, `data-number-of-reviews='0'` for this product's static markup | (dynamic) |
| Empty-state mode | `data-empty-state="empty_widget"` | `select` |
| Star colour | Judge.me `#ffd700` (`255 215 0`) — matches theme `--star-color` | `color` |
| Section colour scheme | `scheme-1` | `color_scheme` |
| Show section divider | `bordered-section` → true | `checkbox` |

Note: the theme's own star colour token `--star-color: 255 215 0` and Judge.me's `--stars-color:
#ffd700` are the same value maintained in two places. A rebuild must drive both from one setting.

---

## 20. Related products

- **Prestige section type:** `related-products` (`shopify-section--related-products`)
- **Live section ID:** `template--18814156767280__related-products`
- **Renders:** `<product-recommendations class="block" product="8032720257072" limit="10"
  intent="related">` and nothing else. The section is hydrated asynchronously through the
  Product Recommendations API, so **heading text, layout, colour scheme and spacing are not
  determinable from captured data**.
- **Block-based:** no.

| Content slot | Live value | Schema type |
|---|---|---|
| Recommendation intent | `related` | `select` (related / complementary) |
| Products limit | `10` | `range` (1–10) |
| Heading | not determinable from captured data | `inline_richtext` |
| Layout (grid/carousel) | not determinable from captured data | `select` |
| Items per row | not determinable from captured data | `range` |
| Colour scheme | not determinable from captured data | `color_scheme` |

---

## 21. Recently viewed products

- **Prestige section type:** `recently-viewed-products`
  (`shopify-section--recently-viewed-products`)
- **Live section ID:** `template--18814156767280__recently_viewed_products_LGtyH6`
- **Renders:** a centred `h2` heading and a `<recently-viewed-products>` custom element hydrated
  from `localStorage['theme:recently-viewed-products']`. The whole section self-hides via
  `:has(recently-viewed-products:empty) { display: none }`.
- **Block-based:** no.
- **Colour scheme:** `scheme-1`; `section-spacing`, `.container`, `bordered-section`.

| Content slot | Live value | Schema type |
|---|---|---|
| Heading | `Recently viewed products` (`<h2 class="h2">`) | `inline_richtext` |
| Heading alignment | `justify-self-center text-center` | `select` |
| Products count | `products-count="9"` | `range` |
| Exclude current product | `exclude-id="8032720257072"` | `checkbox` |
| Items per row (desktop) | `--product-list-items-per-row: 4` | `range` |
| Items per row (mobile) | `--product-list-items-per-row: 2` | `range` |
| Horizontal spacing factor | `1` | `range` |
| Vertical spacing factor | `1` | `range` |
| Hide when empty | CSS `:has(...:empty){display:none}` | `checkbox` |
| Colour scheme | `scheme-1` | `color_scheme` |
| Show section divider | `bordered-section` → true | `checkbox` |

---

## 22. Main collection

- **Prestige section type:** `main-collection` (`shopify-section--main-collection`)
- **Live section ID:** `template--18814157029424__main` (same ID serves `/collections/all` and
  `/collections/best-sellers` — one shared collection template)
- **Renders:** a toolbar (mobile filter button, sort popover, product count, layout switchers),
  a filter drawer, the product grid and numbered pagination. **No collection banner, no `<h1>`,
  no collection description** are rendered on either captured collection page.
- **Block-based:** no `data-block-id` present.
- **Colour scheme:** `scheme-1`. Wrapper is a plain `.container` inside
  `<div class="color-scheme color-scheme--scheme-1">` with **no `section-spacing` wrapper at all** —
  the section supplies its own rhythm via `v-stack gap-6 sm:gap-12`.

Layout tokens:

| Token | < 700 px | ≥ 700 px | ≥ 1000 px | ≥ 1400 px |
|---|---|---|---|---|
| `--collection-items-per-row-compact` | (unset) | 4 | 4 | 6 |
| `--collection-items-per-row-medium` | 2 | 3 | 3 | 4 |
| `--collection-items-per-row-large` | 1 | 2 | 2 | 3 |
| `--product-list-horizontal-spacing-factor` | 1 | 1 | 1 | 1 |
| `--product-list-vertical-spacing-factor` | 1 | 1 | 1 | 1 |
| `--collection-grid-template` | — | — | `var(--collection-sidebar-width, 0) minmax(0,1fr)` | same |

`--product-list-max-items-per-row-allowed: 99 !important` is force-overridden on this section.
Card `sizes` on desktop: `calc((100vw - 96px) / 3 - (24px / 3 * 2))` → 48 px gutters, **24 px** gap,
3-up "medium" layout active by default (`is-active` on the medium switch).

| Content slot | Live value | Schema type |
|---|---|---|
| Collection banner / title | not rendered on either page | `checkbox` |
| Collection description | not rendered | `checkbox` |
| Collection image | not rendered | `checkbox` |
| Products per page | `18` product cards on page 1 of `/collections/all` (56 total, 4 pages) | `range` |
| Product count label | `56 products` (`collection-toolbar__products-count`) | `checkbox` + `text` |
| "Filter by" button label | `Filter by` | `text` |
| "Sort by" button label | `Sort by` | `text` |
| Sort drawer title | `Sort by` | `text` |
| Sort options | `Featured` (`manual`), `Most relevant`, `Best selling`, `Alphabetically, A-Z` (**selected**), `Alphabetically, Z-A`, `Price, low to high`, `Price, high to low`, `Date, old to new`, `Date, new to old` | (Shopify native) |
| Default sort | `title-ascending` (`aria-selected="true"`) | `select` |
| Filter drawer title | `Filters` | `text` |
| Filters available | `Availability` (`filter.v.availability`, label `In stock only`) and `Price` — **only 2 filter groups** | (Shopify filters) |
| Filter layout | drawer on mobile (`facets-drawer`, `md:hidden`); sidebar slot `--collection-sidebar-width` at ≥1000 px | `select` |
| Layout switcher (mobile) | `large` / `medium` (medium active) | `checkbox` |
| Layout switcher (desktop) | `large` / `medium` (active) / `compact` | `checkbox` |
| Items per row — compact | 4 (≥700 px) → 6 (≥1400 px) | `range` |
| Items per row — medium | 2 / 3 / 3 / 4 | `range` |
| Items per row — large | 1 / 2 / 2 / 3 | `range` |
| Spacing factors | `1` / `1` | `range` |
| Pagination | numbered `1 2 3 4` + next arrow, `/collections/all?page=N` | `select` (paginate / load more / infinite) |
| Toolbar sticky | `<height-observer variable="collection-toolbar">` publishes its height | `checkbox` |
| Colour scheme | `scheme-1` | `color_scheme` |
| Card: vendor / rating / quick-add | all present, same as §7 | `checkbox` × 3 |

---

## 23. Main page (About Us) — supporting evidence

- **Prestige section type:** `main-page` (`shopify-section--main-page`)
- **Live section ID:** `template--18814156701744__main`
- **Renders:** `<h1 class="h2">ABOUT US</h1>` then the page `content` in a `.prose` block.
  Container `.container--xs` (**680 px**), wrapper `section-spacing section-spacing--tight`,
  `scheme-1`, no divider.
- **Live copy:** two paragraphs ("Siwa Fragrances is an esteemed Egyptian maison…" /
  "Our pledge is to redefine luxury…") plus a 3-item list:
  `Exquisite Ingredients`, `Inclusive Pricing`, `Personalized Service`.
  The markup carries `class="ds-markdown-paragraph"` — a leftover class from an external markdown
  editor; it has no theme CSS behind it.

| Content slot | Live value | Schema type |
|---|---|---|
| Page title | `ABOUT US` (`h1`, `h2` type scale) | (dynamic, `page.title`) |
| Show page title | rendered → true | `checkbox` |
| Page content | `page.content` | (dynamic) |
| Container width | `.container--xs` = 680 px | `select` |
| Text alignment | `justify-self-center text-center` (header only) | `select` |
| Colour scheme | `scheme-1` | `color_scheme` |
| Vertical spacing preset | `section-spacing--tight` | `select` |

---

## 24. Cross-cutting observations for the rebuild

| Observation | Evidence | Consequence |
|---|---|---|
| Two `featured-collections` instances use **different** spacing factors (`1` vs `0.2`) | `index.html` inline `<style>` per section | Spacing must be per-instance settings, never a global constant |
| Two `scrolling-content` instances use **different** vertical spacing (`clamp(…,40px)` vs `clamp(…,46px)`) and gaps (`clamp(25→50px)` vs fixed `30px`) | inline `<style>` per section | Same — per-instance |
| `bordered-section` is applied to 7 of 12 body sections | wrapper classes | Needs a per-section "show divider" `checkbox` |
| All hero/tile images have **empty `alt=""`** (slideshow ×2, image-with-text-overlay, all 3 media-grid tiles) | `alt=""` in `<img>` | Expose an `image_alt` `text` setting per media slot |
| Homepage `<title>` is literally `siwafragrances.com` | `raw/pages/index.html` head | SEO gap, not a theme setting — flag to merchant |
| `.inventory { color: #ff0000 }` is injected as raw page CSS after the footer | `index.html` tail | Must become a `color` setting |
| `--shadow-block: px px px rgb(var(--text-primary) / 0.0)` is a malformed value (empty numbers) | `:root` block | The shadow theme settings are unset; rebuild must supply valid defaults |
| Card labels in collection-list differ in case from collection titles | §12 table vs `raw/collections.json` | Labels are independent `text` settings, not `collection.title` |
| Tab labels are inconsistent (`women` vs `WOMEN`) | §7 vs §9 | Confirms free-text tab labels |
| The newsletter popup renders only on the homepage capture | §4 | `only-once` behaviour; do not assume per-template rendering |
| `--container-max-width: 100%` at `:root` | `:root` block | Plain `.container` sections are viewport-wide minus gutters; only `--lg` / `--xs` sections are capped |
