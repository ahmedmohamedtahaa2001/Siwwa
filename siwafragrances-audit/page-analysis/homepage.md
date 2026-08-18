# Homepage — `/`

**Template:** `index` · **Measured:** 2026-08-16 · **Page height:** 6338px @1440 · 5968px @375

| Viewport | Height | Grid | Nav |
|---|---|---|---|
| 1440 desktop | 6338px | 4-up product grids | inline nav row |
| 768 tablet | — | 3-up | hamburger |
| 375 mobile | 5968px | 2-up | hamburger |

## Section order (top → bottom)

| # | Shopify section type | Height @1440 | Content |
|---|---|---|---|
| 1 | `announcement_bar` | 40px | `EXPLORE YOUR PERSONA. FREE SHIPPING ORDERS OVER 1500` |
| 2 | `header` | 153px | Centred logo, right icon cluster, nav row below |
| 3 | `slideshow` | 672px | Hero — "Summer.2026" |
| 4 | `featured_collections` | 760px | **NEW IN** — MEN \| WOMEN tabs |
| 5 | `image-with-text-overlay` | 576px | **OUR BUNDLES** |
| 6 | `featured-collections` | 795px | **BEST SELLERS** — MEN \| WOMEN tabs |
| 7 | Judge.me testimonials | 628px | **Customers are saying** |
| 8 | `scrolling-content` | 187px | Marquee — `TRUE ELEGANCE` |
| 9 | `collection_list` | 792px | **OUR COLLECTIONS** |
| 10 | `scrolling-content` | 199px | Marquee — `SIGNATURE LUXURY` |
| 11 | `media-grid` | 807px | **UNCOVER HIDDEN GEMS** |
| 12 | `text-with-icons` | 275px | Trust row |
| 13 | `footer` | 607px | 3-column dark footer |

Plus three always-present overlay sections rendered at height 0: `cart-drawer`, `newsletter-popup`, `privacy-banner`.

## Section detail

### 3 · Slideshow (hero)
Full-bleed photograph — a Siwa extrait bottle standing in rippling water over golden sand. The
**"Summer.2026" script wordmark is baked into the image**, not web type. Overlay text is bottom-left:
eyebrow `SUMMER DROP`, headline `THE SEASON HAS ARRIVED`. Two CTAs sit side by side — `SHOP ALL`
(solid white, dark text) and `SUMMER COLLECTION` (dark fill). The header renders **transparent over
this section only**, with a white logo and white nav; every other template gets a solid white header.

Single slide — no rotation observed.

### 4 & 6 · Featured collections (NEW IN / BEST SELLERS)
Identical component used twice. Centred eyebrow (`NEW IN` / `BEST SELLERS`), then a **MEN | WOMEN tab
switcher** with the active tab underlined, then a 4-up product grid, then a single centred CTA
(`VIEW MEN NEW DROPS` / `VIEW ALL MEN BEST SELLERS`).

The tabs map to four separate collections: `men-new-drops` (8), `women-new-drops` (9),
`men-best-sellers` (17), `women-best-sellers` (11).

Verified working: both tab panels are rendered server-side and toggled client-side. Switching to
WOMEN correctly swaps both the product set and the CTA (`View MEN NEW DROPS` → `View WOMEN NEW
DROPS`), and `aria-selected` updates on the tabs. No defect here.

### 5 · Image with text overlay (OUR BUNDLES)
Full-bleed photograph of three bottles on sand with rope and driftwood. Left-aligned overlay:
eyebrow `OFFERS & DISCOUNTS`, headline `OUR BUNDLES`, outlined-on-image `SHOP NOW` button.

### 7 · Judge.me testimonials
Heading `Customers are saying`, aggregate row `★★★★★ 4.98 · (1,225) · ✅ Verified`, then a carousel of
individual reviews in light-grey cards — review body, stars, reviewer name, and a link to the product.
**Most review text is in Arabic** while the interface is entirely English.

### 8 & 10 · Scrolling marquees
Full-bleed black bands, white uppercase type at roughly `--text-h1` scale, animating horizontally.
Copy: `TRUE ELEGANCE` and `SIGNATURE LUXURY`, each repeating.

### 9 · Collection list (OUR COLLECTIONS)
Heading `our collections`, then a 2-up grid of tall image tiles with centred outlined-on-image buttons
(`FOR HER`, `FOR HIM`). 8 images / 8 links.

### 11 · Media grid (UNCOVER HIDDEN GEMS)
Heading with a two-tone treatment — `UNCOVER` in near-black, `HIDDEN GEMS` in a warm brown. Three
equal tiles: **ORIGINAL CREATIONS** (`TRY NOW`), **BODY SPLASHES** (`SHOP NOW`), **BODY LOTION**
(`SHOP NOW`). Label and button are centred over the photograph in white.

Geometry checked at 375 / 768 / 1000 / 1280 / 1440 — heading and button are cleanly stacked at every
breakpoint with no overlap (e.g. @1440 heading ends y=5078, button starts y=5102). Headings wrap to
two lines below 1280px. In the full-page screenshot the white label and white outlined button *read*
as merged, but that is a **contrast** problem, not a layout one: both are pure white set directly on
pale sand/stone photography with no scrim or text shadow.

> **Content defect —** the third tile's label is `body LOTION` — lowercase word followed by an
> uppercase one. Because `--product-card-text-transform`/heading transform is `uppercase` in some
> contexts and not others, this renders inconsistently against its two siblings.

### 12 · Trust icons
Three columns, thin-line icon above bold uppercase title above body copy:
`14 DAYS RETURN` · `SUPPORT 24/7` · `PAYMENT PROTECTION`. Appears on every template.

## Copy inventory

| Slot | Text |
|---|---|
| Announcement | EXPLORE YOUR PERSONA. FREE SHIPPING ORDERS OVER 1500 |
| Hero eyebrow / headline | SUMMER DROP / THE SEASON HAS ARRIVED |
| Marquee 1 / 2 | TRUE ELEGANCE / SIGNATURE LUXURY |
| Newsletter pop-in | A GIFT FOR YOUR FIRST SIWA ORDER — Subscribe to our newsletter and receive 50 EGP off your first purchase with Siwa Fragrances → `GET MY DISCOUNT` |
| Footer newsletter | Sign up to our newsletter to receive exclusive offers. → `SUBSCRIBE` |
| Legal | © 2026 - SIWA FRAGRANCES |

## Issues found

| Severity | Issue |
|---|---|
| **High** | `<title>` is literally `siwafragrances.com`. No meta description, no `og:image`. This is the store's most valuable page and it has no SEO or social metadata. |
| **High** | Nothing indicates the free-shipping threshold anywhere in the cart — the promise in the announcement bar is never reinforced at the point of decision. |
| Medium | Media-grid tiles set pure-white text and outlined buttons directly on pale photography with no scrim — legibility depends entirely on which part of the image sits behind the text. |
| Low | Media-grid tile label reads `body LOTION` (mixed case) against `ORIGINAL CREATIONS` / `BODY SPLASHES`. |
| Low | Newsletter pop-in fires immediately on load, over the hero. |
| Low | Two marquee bands within four sections of each other is repetitive. |
