# 08 — ASSET INVENTORY

Reference: https://siwafragrances.com/ · Theme: Prestige 11.1.0 (theme asset folder `t/4`)
· Shop CDN prefix: `https://cdn.shopify.com/s/files/1/0648/9577/8864/`
· Storefront-relative CDN prefix: `//siwafragrances.com/cdn/shop/`
Audit date: 2026-07-27.

All URLs below are transcribed verbatim from `raw/products.json` and the captured HTML in
`raw/pages/`. Shopify serves both hostnames for the same objects: `products.json` returns the
canonical `cdn.shopify.com/s/files/1/0648/9577/8864/files/…` form, while the rendered HTML uses the
domain-proxied `//siwafragrances.com/cdn/shop/files/…` form. **They are the same files.** Every URL
carries a `?v=<epoch>` cache-buster; those are preserved because they identify the exact upload.

---

## 1. Asset counts at a glance

| Class | Count | Source of truth |
|---|---|---|
| Product images | **65** across 56 products | `raw/products.json` → `images[]` |
| Collection images | 8 (all used in homepage collection list) | `raw/pages/index.html` → `/cdn/shop/collections/` |
| Theme/section content images (slideshow, overlay, media-grid, page heroes) | 9 distinct files (7 desktop + mobile variants) | `raw/pages/index.html`, `pages_*.html` |
| Logo | 1 | header, all pages |
| Favicon | **0** — none declared | full-text scan of `raw/pages/index.html` |
| Video assets | **0** | scan for `.mp4`, `<video>`, youtube/vimeo URLs |
| Theme CSS bundles | 1 (`theme.css`) | `raw/pages/index.html` |
| Theme JS bundles | 3 (`vendor.min.js`, `theme.js`, `photoswipe.min.js`) | importmap in `raw/pages/index.html` |
| Theme SVG assets referenced from CSS | 2 (`checkmark.svg`, `cursor-zoom-in.svg`) | CSS custom properties |
| Font files | 8 (4 weights/styles × woff2 + woff) | `@font-face` blocks |
| Payment / trust badge icons | **0 image assets** | see §8 |
| App-provided CSS/JS | 4 (Judge.me ×3, Shopify Inbox ×1) | `<link>` / `<script>` tags |

---

## 2. Product images — complete inventory (65)

`alt` is the value stored on the Shopify image object. **All 65 are `null`.** The alt text that
appears in rendered HTML (`alt="Lost On You"`, `alt="Sundaze"`, …) is Prestige's Liquid fallback to
`product.title`, not merchant-authored alt. See §10 for why that matters.

| Product handle | Pos | Full CDN URL | W×H | `alt` |
|---|---|---|---|---|
| `sundaze` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/IMG-6766.jpg?v=1784984707` | 1080×1080 | `null` |
| `vanilla-91` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/C8C728AE-A095-4A70-A6C1-87DE3302578F.jpg?v=1778889129` | 1080×1080 | `null` |
| `vanilla-91` | 2 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/129BA2AA-F4DE-46A8-BD2E-DA03FFE389E2.png?v=1778889129` | 1254×1254 | `null` |
| `siwa-trail` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/siwa-trail.jpg?v=1757237357` | 1080×1080 | `null` |
| `pink-arrogance` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/068E4637-6A79-41AB-80D5-7658C653F7BC.jpg?v=1776984937` | 1080×1080 | `null` |
| `pink-allure` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/D45DDE71-48A7-4B1C-BE46-ACA593B54BA0.jpg?v=1776984937` | 1080×1080 | `null` |
| `lost-on-you` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/06EE0A47-1E7B-4AE1-ACF0-BA56D57994D1.jpg?v=1776984174` | 1080×1080 | `null` |
| `aurableu` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/3BA9765B-63D6-4CE5-9C0D-73CD8D312E09.jpg?v=1776982158` | 1080×1080 | `null` |
| `absolute-drunk` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/IMG-4136.jpg?v=1773500269` | 1080×1080 | `null` |
| `bleu-exclusive` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/IMG-3917.jpg?v=1772197842` | 1080×1080 | `null` |
| `belle-riche` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/belle-riche-4.jpg?v=1757237388` | 1080×1080 | `null` |
| `bare-glow` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/1EC1A752-2428-4549-B869-4EC86C442142.jpg?v=1762369369` | 1080×1080 | `null` |
| `bleu-intense` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/BleuIntense.jpg?v=1760996810` | 1080×1080 | `null` |
| `silk-vanilla-body-lotion` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/CopyofSilkVanillaLotion.jpg?v=1759145417` | 1080×1080 | `null` |
| `mango-pineapple` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/Mango-Pineapple.jpg?v=1757237439` | 1080×1080 | `null` |
| `vanilla-bundle` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/IMG-1919.png?v=1760902182` | 1080×1440 | `null` |
| `drunk-gold` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/Drunk-Gold.jpg?v=1757237426` | 1080×1080 | `null` |
| `marshmallow-bundle` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/body-splash-marshmellow.jpg?v=1759230513` | 1350×1350 | `null` |
| `marshmallow` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/Marshmallow-Splash.jpg?v=1757237416` | 1080×1080 | `null` |
| `lagoon-flair` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/Lagoon-Flair.jpg?v=1757237409` | 1080×1080 | `null` |
| `boujee-blush` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/Boujee-Blush.jpg?v=1757237407` | 1080×1080 | `null` |
| `sweet-oud` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/sweet-oud-1.jpg?v=1757237407` | 1080×1080 | `null` |
| `sweet-oud` | 2 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/Sweet-Oud.jpg?v=1757237407` | 1151×2048 | `null` |
| `libre-desire` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/libre-desire-1.jpg?v=1757237390` | 1080×1080 | `null` |
| `sweet-rum` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/sweet-rum.jpg?v=1757237382` | 1080×1080 | `null` |
| `sweet-rum` | 2 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/MG_0973-scaled.jpg?v=1757237382` | 1600×2127 | `null` |
| `sweet-rum` | 3 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/copy-of-brown-beige-minimalist-face-mist-features-instagram-post_png_85708ae2-29a7-4237-91f8-1bd663d1321d.png?v=1757237385` | 1600×1600 | `null` |
| `apple-pie` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/apple-pie.jpg?v=1757237368` | 1080×1080 | `null` |
| `apple-pie` | 2 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/MG_0974-scaled.jpg?v=1757237368` | 1600×2150 | `null` |
| `apple-pie` | 3 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/brown-beige-minimalist-face-mist-features-instagram-post-4.png-4.png?v=1757237373` | 1600×1600 | `null` |
| `silk-vanilla` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/silk-vanilla.jpg?v=1757237366` | 1080×1080 | `null` |
| `silk-vanilla` | 2 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/MG_0975-scaled.jpg?v=1757237366` | 1600×1999 | `null` |
| `silk-vanilla` | 3 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/copy-of-brown-beige-minimalist-face-mist-features-instagram-post_png.png?v=1757237371` | 1600×1600 | `null` |
| `gourmet` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/gourmet.jpg?v=1757237361` | 1080×1080 | `null` |
| `gourmet` | 2 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/IMG_7982-1-scaled.jpg?v=1757237362` | 1600×2133 | `null` |
| `chocolate-creme` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/chocolate-creme.jpg?v=1757237347` | 1080×1080 | `null` |
| `layering-30-ml-bundle` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/artboard-3.jpg?v=1759230575` | 1350×1350 | `null` |
| `coffee-vanilla` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/coffee-vanilla-1.jpg?v=1757237333` | 1080×1080 | `null` |
| `layering-apple` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/layering-apple.jpg?v=1757237330` | 1080×1080 | `null` |
| `caramel-vanigliato` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/caramel-vanigliato.jpg?v=1757237320` | 1080×1080 | `null` |
| `luna-di-roma` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/Luna_Di_Roma.jpg?v=1758472096` | 1080×1080 | `null` |
| `coco-woods` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/coco-woods.jpg?v=1757237298` | 1080×1080 | `null` |
| `soul-poudree` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/Soul_Poudree.jpg?v=1758472096` | 1080×1080 | `null` |
| `iris-elixir` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/iris-elixir-1.jpg?v=1757237280` | 1080×1080 | `null` |
| `hot-male` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/hot-male.jpg?v=1757237269` | 1080×1080 | `null` |
| `marasi` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/marasi.jpg?v=1757237266` | 1080×1080 | `null` |
| `hibiscusex` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/hibiscusex.jpg?v=1757237253` | 1080×1080 | `null` |
| `male-elixir` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/male-elixir.jpg?v=1757237253` | 1080×1080 | `null` |
| `layering-lychee` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/Layering_Lychee.jpg?v=1758472098` | 1080×1080 | `null` |
| `stellar-nights` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/Stellar_Nights.jpg?v=1758471182` | 1080×1080 | `null` |
| `hot-vanilla` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/hot-vanilla.jpg?v=1757237229` | 1080×1080 | `null` |
| `layering-pistachio` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/layering-pistachio.jpg?v=1757237217` | 1080×1080 | `null` |
| `layering-vanilla` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/layering-vanilla1.jpg?v=1757237216` | 1080×1080 | `null` |
| `mango-on-woods` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/mango-on-woods.jpg?v=1757237206` | 1080×1080 | `null` |
| `pacific-elixir` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/pacific-elixir.jpg?v=1757237205` | 1080×1080 | `null` |
| `carnal-trail` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/CarnalTrail.jpg?v=1759184604` | 1080×1080 | `null` |
| `insane-pineapple` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/insane-pineapple.jpg?v=1757237187` | 1080×1080 | `null` |
| `lady-killer` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/lady-killer.jpg?v=1757237176` | 1080×1080 | `null` |
| `irresistible-vanilla` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/Irresistible_Vanilla.jpg?v=1758472102` | 1080×1080 | `null` |
| `summer-elegance` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/summer-elegance.jpg?v=1757237165` | 1080×1080 | `null` |
| `mawj` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/mawj.jpg?v=1757237116` | 1080×1080 | `null` |
| `summer-holidays` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/summer-holidays.jpg?v=1757237094` | 1080×1080 | `null` |
| `citrine` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/citrine.jpg?v=1757237068` | 1080×1080 | `null` |
| `soiree` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/CopyofWebsiteBottle_1.jpg?v=1759185131` | 1080×1080 | `null` |
| `alluring-rose` | 1 | `https://cdn.shopify.com/s/files/1/0648/9577/8864/files/alluring-rose.jpg?v=1757237015` | 1080×1080 | `null` |

### 2.1 Images per product

| Images | Products | Handles |
|---|---|---|
| 1 | **50** | all except the six below |
| 2 | 3 | `vanilla-91`, `sweet-oud`, `gourmet` |
| 3 | 3 | `sweet-rum`, `apple-pie`, `silk-vanilla` |

Total 65 images ÷ 56 products = **1.16 images per product**.

### 2.2 Variant-level featured images

8 variants (of 158) carry a `featured_image`; every one of them is the `100 ml` variant, and every
one points at an image already in the product's `images[]` array — so no additional assets exist at
variant level.

| Product | Variant | Image file | W×H |
|---|---|---|---|
| `belle-riche` | `100 ml` | `belle-riche-4.jpg?v=1757237388` | 1080×1080 |
| `mango-pineapple` | `100 ml` | `Mango-Pineapple.jpg?v=1757237439` | 1080×1080 |
| `drunk-gold` | `100 ml` | `Drunk-Gold.jpg?v=1757237426` | 1080×1080 |
| `lagoon-flair` | `100 ml` | `Lagoon-Flair.jpg?v=1757237409` | 1080×1080 |
| `boujee-blush` | `100 ml` | `Boujee-Blush.jpg?v=1757237407` | 1080×1080 |
| `libre-desire` | `100 ml` | `libre-desire-1.jpg?v=1757237390` | 1080×1080 |
| `gourmet` | `100 ml` | `IMG_7982-1-scaled.jpg?v=1757237362` | 1600×2133 |
| `alluring-rose` | `100 ml` | `alluring-rose.jpg?v=1757237015` | 1080×1080 |

The remaining 150 variants have `featured_image: null`, so size swatches do not change the gallery.

---

## 3. Collection images (8)

Served from `/cdn/shop/collections/`. All eight are used by the homepage `collection_list` section
(`template--18814156636208__collection_list_gpXjxV`) and are also the collection banner images.
`alt` here **is** populated — Prestige falls back to `collection.title`.

| # | Collection | Full URL | W×H | Rendered `alt` |
|---|---|---|---|---|
| 1 | `for-her` | `https://siwafragrances.com/cdn/shop/collections/WhatsApp_Image_2025-09-25_at_1.05.14_AM.jpg?v=1759267955` | 1600×1600 | `FOR HER` |
| 2 | `for-him` | `https://siwafragrances.com/cdn/shop/collections/For_Him.png?v=1759518964` | 1600×1600 | `FOR HIM` |
| 3 | `bundles` | `https://siwafragrances.com/cdn/shop/collections/Artboard_1.png?v=1759677906` | 1100×1500 | `Bundles` |
| 4 | `body-lotion` | `https://siwafragrances.com/cdn/shop/collections/Artboard_3_1.jpg?v=1759147740` | 3507×4982 | `Body lotion` |
| 5 | `unisex` | `https://siwafragrances.com/cdn/shop/collections/Unisex.png?v=1759518990` | 1600×1600 | `UNISEX` |
| 6 | `original-creations` | `https://siwafragrances.com/cdn/shop/collections/MG_4160.jpg?v=1759268144` | 1600×1600 | `Original Creations` |
| 7 | `best-sellers` | `https://siwafragrances.com/cdn/shop/collections/MG_4168.jpg?v=1759268008` | 1600×1600 | `BEST SELLERS` |
| 8 | `new-drops` | `https://siwafragrances.com/cdn/shop/collections/MG_4172.jpg?v=1759267985` | 1600×1600 | `new drops` |

Responsive hint on all eight: `sizes="(max-width: 699px) 100vw, (max-width: 1149px) 50vw, 50vw"`,
`loading="lazy"`, class `zoom-image group-hover:zoom`, `draggable="false"`.

⚠️ Tile 4 (`Artboard_3_1.jpg`, 3507×4982 = 17.5 MP) is delivered into a slot that is at most **50vw
wide**. It is the single most oversized asset on the site. Tile 3 is the only 1100×1500 (3:4) file in
a set that is otherwise square — it will crop differently from its neighbours.

---

## 4. Theme / section content images

Every one of these is a merchant-uploaded file in `/cdn/shop/files/` placed via a section setting —
these are the images a rebuild must re-upload and re-attach to section schema.

| Section (id) | Role | Full URL | W×H | `alt` | Loading |
|---|---|---|---|---|---|
| `sections--18814157193264__header` | Logo (desktop + mobile) | `https://siwafragrances.com/cdn/shop/files/logo_6e889a1e-1178-440e-8bfb-249d5b777e14.png?v=1775298245` | 6543×3337 | `Siwa Fragrances` | eager, `sizes="110px"` |
| `template--18814156636208__slideshow` | Slide 1 — desktop `<img>` | `https://siwafragrances.com/cdn/shop/files/Summer.jpg?v=1776355287` | 896×1200 | `""` (empty) | `fetchpriority="high"`, `sizes="100vw"` |
| `template--18814156636208__slideshow` | Slide 1 — mobile `<source>` (`max-width: 699px`) | `https://siwafragrances.com/cdn/shop/files/Summer.jpg?v=1776355287` | 896×1200 | — | — |
| `template--18814156636208__image-with-text-overlay-1` | Desktop `<img>` | `https://siwafragrances.com/cdn/shop/files/Bundles_1.png?v=1759677715` | 2500×900 | `""` (empty) | eager, `sizes="100vw"` |
| `template--18814156636208__image-with-text-overlay-1` | Mobile `<source>` (`max-width: 699px`) | `https://siwafragrances.com/cdn/shop/files/Artboard_1_1.png?v=1759677715` | 1100×1500 | — | — |
| `template--18814156636208__media-grid` | Tile 1 → `/collections/original-creations` | `https://siwafragrances.com/cdn/shop/files/Original_Creations_1.jpg?v=1759267663` | 1600×1600 | `""` (empty) | lazy, `sizes="(max-width: 699px) 100vw, 420px"` |
| `template--18814156636208__media-grid` | Tile 2 → `/collections/body-splash` | `https://siwafragrances.com/cdn/shop/files/Body_Splash.jpg?v=1759267660` | 1600×1600 | `""` (empty) | lazy, same `sizes` |
| `template--18814156636208__media-grid` | Tile 3 → `/collections/body-lotion` | `https://siwafragrances.com/cdn/shop/files/MG_7385.jpg?v=1759147726` | 3507×4982 | `""` (empty) | lazy, same `sizes` |
| `template--18814156701744__slideshow_6aQJg6` | Page hero — desktop (about-us, our-story, our-comitments — **shared**) | `https://siwafragrances.com/cdn/shop/files/About_Us.png?v=1759517000` | 3200×1200 | `""` (empty) | `fetchpriority="high"`, `sizes="100vw"` |
| `template--18814156701744__slideshow_6aQJg6` | Page hero — mobile `<source>` | `https://siwafragrances.com/cdn/shop/files/About_Us_1.png?v=1759517328` | 1200×1600 | — | — |
| `template--18814156668976__slideshow_jf4Rh7` | Contact hero — desktop | `https://siwafragrances.com/cdn/shop/files/Contact_Us.png?v=1759517001` | 3200×1200 | `""` (empty) | `fetchpriority="high"`, `sizes="100vw"` |
| `template--18814156668976__slideshow_jf4Rh7` | Contact hero — mobile `<source>` | `https://siwafragrances.com/cdn/shop/files/Contact_Us_2.png?v=1759678148` | 1200×1600 | — | — |

Notes for a rebuild:

- **Three brand pages share one hero section id** (`template--18814156701744__slideshow_6aQJg6`), so
  about-us, our-story and our-comitments all render the identical `About_Us.png`. That is a single
  section shared by one page template, not three configured heroes.
- The image-with-text-overlay uses **two different files** for desktop and mobile
  (`Bundles_1.png` 2500×900 vs `Artboard_1_1.png` 1100×1500) — a genuine art-directed pair. The
  slideshow, by contrast, uses **the same file** for both breakpoints, so its `<source>` element
  buys nothing.
- Every section image has `alt=""` (empty string, not missing) — Prestige emits `alt=""` when the
  Shopify file has no alt text. Decorative-by-default is defensible for the marquee backgrounds but
  not for the media-grid tiles, which are the sole content of clickable links (§10).

---

## 5. Logo and favicon

### Logo

| Property | Value |
|---|---|
| URL | `https://siwafragrances.com/cdn/shop/files/logo_6e889a1e-1178-440e-8bfb-249d5b777e14.png?v=1775298245` |
| Intrinsic size | **6543 × 3337 px** (21.8 MP) |
| Format | PNG |
| Rendered width | `110px` desktop (`--header-logo-width: 110px`), `80px` mobile |
| `alt` | `Siwa Fragrances` |
| Markup | `<h1 class="header__logo"><a href="/"><span class="sr-only">Siwa Fragrances</span><img …></a></h1>` |
| Served `srcset` | `…&width=220 220w, …&width=330 330w` (2× and 3× of the 110px slot) |

The source file is 6543 px wide for a 110 px rendering slot — a ~60× linear oversample. Shopify's
CDN resizes on the fly so the *delivered* asset is only 220/330 px wide, but the stored original is
needlessly heavy and any future non-Shopify use of it will be. A rebuild should re-export the logo at
a sane master size (e.g. 660 px wide, or an SVG).

### Favicon

**None.** `raw/pages/index.html` contains no `<link rel="icon">`, no `rel="shortcut icon"`, and no
`rel="apple-touch-icon"`. The only `<link rel>` values present are `canonical`, `preconnect`,
`preload`, `stylesheet`, and `dns-prefetch`. The store therefore falls back to the browser default
favicon. **This is a real gap in the reference site**, not a capture artefact — a rebuild should add
one.

---

## 6. Video assets

**None.** Searched all captured HTML (`raw/pages/*.html`, `raw/products/*.html`) for `.mp4`,
`<video`, `youtube`, `vimeo`, and `video_url`.

- No `<video>` elements exist.
- No `.mp4` / `.webm` / `.mov` URLs exist.
- The strings `video_url`, `youtube_url_text`, `YouTube video URL`, `Youtube URL here` **do** appear
  — but exclusively inside the **Judge.me** app's embedded JS settings blob (review-video upload
  form labels). They are app UI strings, not site media.
- The slideshow section declares `autoplay-pause-on-video` and `media-type="image"` on its slide —
  Prestige boilerplate for a slideshow that *can* hold video; this one does not.

---

## 7. Theme asset files (`/cdn/shop/t/4/assets/`)

The `t/4` path segment identifies the live theme's asset directory.

| Asset | Full URL (with version) | Loaded as | Where |
|---|---|---|---|
| `theme.css` | `//siwafragrances.com/cdn/shop/t/4/assets/theme.css?v=41905930618406843701784986633` | `<link rel="stylesheet">` | all pages |
| `vendor.min.js` | `//siwafragrances.com/cdn/shop/t/4/assets/vendor.min.js?v=53886175772894603331775995594` | `<script type="module">` + importmap key `vendor` | all pages |
| `theme.js` | `//siwafragrances.com/cdn/shop/t/4/assets/theme.js?v=180335519002586168071775995594` | `<script type="module">` + importmap key `theme` | all pages |
| `photoswipe.min.js` | `//siwafragrances.com/cdn/shop/t/4/assets/photoswipe.min.js?v=13374349288281597431775995594` | importmap key `photoswipe` (lazy, PDP gallery zoom) | declared on all pages, used on PDP |
| `checkmark.svg` | `//siwafragrances.com/cdn/shop/t/4/assets/checkmark.svg?v=5588600397216680941775995614` | CSS custom property `--checkmark-svg-url: url(…)` | `:root` in inline theme CSS |
| `cursor-zoom-in.svg` | `//siwafragrances.com/cdn/shop/t/4/assets/cursor-zoom-in.svg?v=42284069417148430011775995614` | CSS custom property `--cursor-zoom-in-svg-url: url(…)` | `:root` in inline theme CSS |

`theme.css` carries a materially newer version hash (`…1784986633`) than the JS bundles
(`…1775995594`), i.e. the stylesheet has been edited after the last full theme upload — consistent
with the admin theme name "Updated copy of Prestige".

**All other icons are inline SVG**, emitted directly into the markup by Liquid snippets rather than
loaded as files. Observed inline icon classes: `icon-arrow-left`, `icon-arrow-right`, `icon-close`,
`icon-hamburger`, `icon-minus`, `icon-plus`, `icon-dropdown-chevron`, `icon-star-rating`,
`icon-picto-return`, `icon-picto-operator`, `icon-picto-lock`, `icon-facebook`, `icon-instagram`,
`icon-tiktok`, `icon-whatsapp`. The star icon has its fill hard-coded to `#ffd700` in the path
(`fill="#ffd700"`), matching `--star-color: 255 215 0`.

### Shopify platform scripts (not theme assets)

| URL | Purpose |
|---|---|
| `/cdn/shopifycloud/importmap-polyfill/es-modules-shim.2.4.0.js` | importmap polyfill |
| `/checkouts/internal/preloads.js?locale=en-EG` | checkout preload |
| `//siwafragrances.com/cdn/shopifycloud/shop-js/modules/v2/loader.init-shop-cart-sync.en.esm.js` | Shop cart sync |
| `//siwafragrances.com/cdn/shopifycloud/storefront/assets/storefront/load_feature-1bd60354.js` | storefront features |
| `//cdn.shopify.com/shopifycloud/storefront/assets/storefront/origin_trials-5059b83f.js` | origin trials |
| `https://siwafragrances.com/cdn/shopifycloud/perf-kit/shopify-perf-kit-3.7.0.min.js` | performance monitoring |
| `https://cdn.shopify.com/storefront/web-components/account.js` | account web components |
| `https://cdn.shopify.com/storefront/standard-actions.js` | standard actions |

### App assets

| App | Asset URL |
|---|---|
| Judge.me (`judgeme-657`) | `https://cdn.shopify.com/extensions/019fa440-b46f-7094-9ecf-aac8c6e13872/judgeme-657/assets/shopify_v2.css` |
| Judge.me | `https://cdn.shopify.com/extensions/019fa440-b46f-7094-9ecf-aac8c6e13872/judgeme-657/assets/loader.js` |
| Judge.me | `https://cdn.shopify.com/extensions/019fa440-b46f-7094-9ecf-aac8c6e13872/judgeme-657/assets/carousels.js` + `carousels.css` |
| Shopify Inbox (`shopify-inbox-1295` → `-1296`) ⚠ | `https://cdn.shopify.com/extensions/019fa465-9654-78e7-9e8e-b0ba9d2963a7/shopify-inbox-1295/assets/shopify-chat-bundle-selector.js`<br>The re-scraped captures serve `019fa4d6-3dc2-7f61-ad74-0fc6d8b144f6/shopify-inbox-1296/…` — the app auto-updated between scrape passes. **App-extension asset URLs are version-pinned and rotate without notice; never hard-code them in a theme.** |

Judge.me also ships an **inline base64 WOFF font** (`@font-face { font-family: 'JudgemeStar'; src: url("data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAAScAA0…") }`) and an inline
base64 SVG quote mark (`--quote-bg: url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94…')`, gold
`#ffd700`). DNS prefetch hints are emitted for `cdn.judge.me`, `cdn1.judge.me`, `api.judge.me`.

---

## 8. Payment / trust badge icons

**There are no payment badge image assets on this site.**

| Evidence | Result |
|---|---|
| Search of `raw/pages/index.html` for `payment_icons`, `/i/payment`, `shopifycloud/…/payment*.svg` | no matches |
| Footer `div.footer__aside` contents | contains only the `© 2026 - Siwa Fragrances` paragraph |
| `raw/meta.json` → `shopify_pay_enabled_card_brands` | `[]` (empty array) |
| `raw/meta.json` → `offers_shop_pay_installments` | `false` |
| Only `payment`-related string rendered anywhere | the USP body copy `Your payment details are encrypted and secure.` |

Trust signalling on this site is delivered entirely by **inline SVG pictograms in the
text-with-icons section** — not by payment-brand artwork:

| Trust block | Icon (inline SVG, 24px, `stroke-width="2"`, `viewBox="0 0 24 24"`) |
|---|---|
| `14 days return` | `icon-picto-return` |
| `support 24/7` | `icon-picto-operator` |
| `Payment Protection` | `icon-picto-lock` |

Each pictogram is emitted **twice** per block — one copy with `class="sm:hidden"` and one with
`class="hidden sm:block"` — a Prestige pattern for swapping icon sizes at breakpoints. It doubles
the inline SVG payload for zero visual difference here, since both copies use `width="24"` and
identical paths.

A rebuild that wants payment badges must first enable card brands in Shopify Payments; the theme
will then render them. Do not hand-author badge images.

---

## 9. Fonts

Both heading and body use **Poppins** — a single-family system (`--heading-font-family: Poppins,
sans-serif`, `--text-font-family: Poppins, sans-serif`).

⚠️ **The task brief expected `fonts.shopifycdn.com` URLs. That host appears only once, as a
`preconnect` hint.** The actual font files are served from the shop's own proxied CDN path,
`//siwafragrances.com/cdn/fonts/poppins/…`. Both facts are recorded below.

| Weight | Style | Format | Full URL |
|---|---|---|---|
| 400 | normal | woff2 | `//siwafragrances.com/cdn/fonts/poppins/poppins_n4.0ba78fa5af9b0e1a374041b3ceaadf0a43b41362.woff2` |
| 400 | normal | woff | `//siwafragrances.com/cdn/fonts/poppins/poppins_n4.214741a72ff2596839fc9760ee7a770386cf16ca.woff` |
| 400 | italic | woff2 | `//siwafragrances.com/cdn/fonts/poppins/poppins_i4.846ad1e22474f856bd6b81ba4585a60799a9f5d2.woff2` |
| 400 | italic | woff | `//siwafragrances.com/cdn/fonts/poppins/poppins_i4.56b43284e8b52fc64c1fd271f289a39e8477e9ec.woff` |
| 700 | normal | woff2 | `//siwafragrances.com/cdn/fonts/poppins/poppins_n7.56758dcf284489feb014a026f3727f2f20a54626.woff2` |
| 700 | normal | woff | `//siwafragrances.com/cdn/fonts/poppins/poppins_n7.f34f55d9b3d3205d2cd6f64955ff4b36f0cfd8da.woff` |
| 700 | italic | woff2 | `//siwafragrances.com/cdn/fonts/poppins/poppins_i7.42fd71da11e9d101e1e6c7932199f925f9eea42d.woff2` |
| 700 | italic | woff | `//siwafragrances.com/cdn/fonts/poppins/poppins_i7.ec8499dbd7616004e21155106d13837fff4cf556.woff` |

Loading strategy:

| Directive | Value |
|---|---|
| `<link rel="preconnect">` | `https://fonts.shopifycdn.com` (crossorigin) |
| `<link rel="preload">` | `//siwafragrances.com/cdn/fonts/poppins/poppins_n4.0ba78fa5af9b0e1a374041b3ceaadf0a43b41362.woff2` as `font/woff2`, crossorigin — **emitted twice** (duplicate preload, one is wasted) |
| `font-display` | `fallback` on all four `@font-face` blocks |

Only **two weights** are loaded (400 and 700). `--heading-font-weight: 400`, so headings render at
Regular with `letter-spacing: 0.18em` and `text-transform: uppercase` doing the visual work — there
is no light/medium/semibold in the system. A rebuild should not introduce weights 300/500/600
without adding the corresponding font files.

Judge.me additionally loads its own inline base64 `JudgemeStar` WOFF (see §7) — the only non-Poppins
face on the site.

---

## 10. Asset-quality audit

### 10.1 Alt text — the headline finding

| Metric | Value |
|---|---|
| Product images with merchant-authored `alt` in `products.json` | **0 of 65 (0%)** |
| Product images where `alt` is `null` | **65 of 65 (100%)** |
| Section/theme content images with non-empty `alt` | **0 of 8** (all render `alt=""`) |
| Logo `alt` | present (`Siwa Fragrances`) — the only real alt on the site |
| Collection images with `alt` | 8 of 8 — but auto-filled from `collection.title`, not authored |

**What this means in practice.** Prestige is defensive: for product images it falls back to
`product.title`, so a screen reader hears "Lost On You", "Sundaze", "Vanilla 91". That is
*adequate* for a product grid and is why the deficiency is invisible in a casual audit. Two places
where the fallback does **not** save the site:

1. **Media-grid tiles.** All three (`Original_Creations_1.jpg`, `Body_Splash.jpg`, `MG_7385.jpg`)
   render `alt=""` and are the entire content of an `<a>` wrapping the tile. The visible label
   (`ORIGINAL CREATIONS`, `BODY SPLASHES`, `body LOTION`) is a sibling `<p class="h3">` inside the
   same anchor, so the link is not *nameless* — but the image itself contributes nothing and any
   change to that markup breaks the accessible name.
2. **Multi-image products.** Where a product has 2–3 images (`sweet-rum`, `apple-pie`,
   `silk-vanilla`, `vanilla-91`, `sweet-oud`, `gourmet`), every image gets the **identical**
   fallback alt — e.g. three images all announced as "Apple Pie". The gallery is unnavigable by
   assistive tech.

**Rebuild action:** author alt text on all 65 product images and all section images. This is a
one-time content task in Shopify admin, independent of the theme, and it carries over automatically.

### 10.2 Images per product — thin catalogue media

| Metric | Value | Comment |
|---|---|---|
| Average images per product | **1.16** | Very low. Shopify merchandising guidance is 3–5. |
| Products with exactly 1 image | **50 of 56 (89%)** | No alternate angle, no scale reference, no lifestyle shot. |
| Products with ≥3 images | 3 (`sweet-rum`, `apple-pie`, `silk-vanilla`) | All three are body splashes — the only product line with a full shoot. |
| Variants with a distinct image | 0 | 8 variants reference an image, but always one already in the product gallery. |

Consequence for the rebuild: **the PDP gallery, the product-card hover-image swap, and any
"secondary image on hover" pattern have nothing to show for 89% of the catalogue.** Prestige's
`product-card__image--primary` / `--secondary` pair degrades silently, but a rebuild should not
design a layout that assumes a second image exists.

### 10.3 Dimension consistency

| Dimension | Count | Share |
|---|---|---|
| 1080×1080 | **53** | 81.5% |
| 1600×1600 | 3 | 4.6% |
| 1350×1350 | 2 | 3.1% |
| 1254×1254 | 1 | 1.5% |
| 1600×2150 | 1 | 1.5% |
| 1600×2133 | 1 | 1.5% |
| 1600×2127 | 1 | 1.5% |
| 1600×1999 | 1 | 1.5% |
| 1151×2048 | 1 | 1.5% |
| 1080×1440 | 1 | 1.5% |

| Aspect ratio | Count |
|---|---|
| 1:1 (square) | **59 of 65 (90.8%)** |
| ~3:4 (0.75) | 3 |
| ~4:5 (0.80) | 1 |
| ~0.74 | 1 |
| ~9:16 (0.56) | 1 |

The theme applies `aspect-square` to product-card images, so the six non-square files are
**centre-cropped on every grid** — `sweet-oud`'s 1151×2048 (9:16 portrait) loses roughly 44% of its
height. Those six are all secondary images, so the crop is not visible on primary cards, but it will
be in the PDP gallery thumbnails.

Verdict: **the primary-image set is consistent** (1080×1080 square is the de facto standard);
inconsistency is confined to the secondary images added ad hoc.

### 10.4 Formats

| Format | Count | Share |
|---|---|---|
| JPG | 60 | 92.3% |
| PNG | 5 | 7.7% |
| WebP / AVIF | **0 stored** | — |

No WebP or AVIF is stored, but this is **not** a delivery problem: Shopify's image CDN negotiates
modern formats automatically from the `?v=` + `&width=` URLs, so browsers receive WebP regardless.
The five PNGs (`129BA2AA-…png`, `IMG-1919.png`, and the three Canva `…instagram-post….png` files) are
photographic content stored losslessly — they will be larger at origin than a JPG equivalent, but
again the CDN mitigates it.

Section/theme images add: `Bundles_1.png`, `Artboard_1_1.png`, `For_Him.png`, `Unisex.png`,
`Artboard_1.png`, `About_Us.png`, `About_Us_1.png`, `Contact_Us.png`, `Contact_Us_2.png`,
`logo_….png` — the design-export assets are PNG throughout, the photographic ones JPG. That split is
sensible.

### 10.5 Oversized and undersized assets

**Oversized (stored master far larger than any rendering slot):**

| Asset | Stored size | Delivered into | Overshoot |
|---|---|---|---|
| `logo_6e889a1e-….png` | 6543×3337 (21.8 MP) | a 110 px-wide header slot | ~60× linear |
| `Artboard_3_1.jpg` (body-lotion collection) | 3507×4982 (17.5 MP) | ≤50vw collection card | ~4–5× linear |
| `MG_7385.jpg` (media-grid tile 3) | 3507×4982 (17.5 MP) | a 420 px-wide tile | ~8× linear |
| `About_Us.png` / `Contact_Us.png` | 3200×1200 | 100vw hero | acceptable at 2× on wide screens |
| `MG_0974-scaled.jpg` (apple-pie) | 1600×2150 (3.4 MP) | product-card / gallery | mild |

**Undersized (stored master smaller than the slot can demand):**

| Asset | Stored size | Slot | Risk |
|---|---|---|---|
| `Summer.jpg` (homepage slideshow) | **896×1200** | full-bleed `sizes="100vw"` hero, `content-over-media--lg` | On any viewport wider than ~896 px the hero is upscaled. Its own `srcset` requests `width=1000` and `width=1200` — **larger than the source**, so the CDN cannot honour them. This is the most visible quality defect on the site. |
| `Bundles_1.png` (overlay, desktop) | 2500×900 | `sizes="100vw"` | adequate to ~2500 px, thin above that |

The `Summer.jpg` case is worth calling out to the rebuild team explicitly: the slideshow's `srcset`
literally lists `&width=1000 1000w, &width=1200 1200w` against an 896 px-wide original. Re-shoot or
re-export that hero at ≥2400 px wide.

### 10.6 Filename hygiene

| Pattern | Count | Example |
|---|---|---|
| Clean slug matching the product handle | 32 | `siwa-trail.jpg`, `layering-pistachio.jpg` |
| Ad-hoc / CamelCase / no-separator | 13 | `BleuIntense.jpg`, `CopyofWebsiteBottle_1.jpg` |
| iOS/UUID export | 7 | `C8C728AE-A095-4A70-A6C1-87DE3302578F.jpg` |
| Camera/phone `IMG-*` | 5 | `IMG-6766.jpg`, `IMG-3917.jpg`, `IMG-4136.jpg` |
| Canva / design-tool export | 5 | `CopyofSilkVanillaLotion.jpg`, `brown-beige-minimalist-face-mist-features-instagram-post-4.png-4.png` |
| Studio raw (`_MG_` / `-scaled`) | 3 | `MG_0973-scaled.jpg` |

Notable specimens:

- `brown-beige-minimalist-face-mist-features-instagram-post-4.png-4.png` — a **double `.png`
  extension**, and a filename that still advertises the Canva template it came from ("face mist",
  which is not what this brand sells).
- `WhatsApp_Image_2025-09-25_at_1.05.14_AM.jpg` — the `for-her` collection banner is a WhatsApp
  forward, filename intact.
- `CopyofSilkVanillaLotion.jpg`, `CopyofWebsiteBottle_1.jpg`, `Copy of…` prefixes — duplicated
  assets never renamed.
- `-scaled` suffix on four files — a WordPress/Elementor export artefact, consistent with the
  Elementor markup found embedded in the `/pages/our-story` content (see `07-COPY-CONTENT.md` §8.2).
  This catalogue was migrated from a WordPress site.
- `layering-vanilla1.jpg`, `coffee-vanilla-1.jpg`, `libre-desire-1.jpg`, `sweet-oud-1.jpg`,
  `belle-riche-4.jpg` — trailing numerals from repeated re-uploads.

Filenames do not affect rendering, but they are a strong signal that image production is ad hoc
rather than pipelined, which corroborates the 1.16-images-per-product finding.

### 10.7 Loading and performance flags observed

| Behaviour | Detail |
|---|---|
| `fetchpriority="high"` | applied to the slideshow LCP image and both page-hero images — correct |
| `loading="eager"` | first ~3 product cards per carousel and the logo |
| `loading="lazy"` | all remaining product cards, collection cards, media-grid tiles |
| `srcset` breadth | product cards get up to 16 widths (200w → 2400w); collection cards similar — Shopify CDN generated, no action needed |
| Duplicate `<link rel="preload">` for `poppins_n4…woff2` | emitted twice in `<head>` — a real (small) waste |
| Duplicate inline pictogram SVGs in text-with-icons | each of the 3 icons emitted twice (mobile/desktop copies) with identical paths and identical `width="24"` |
| `<source>` element on the homepage slideshow | points at the **same file** as the `<img>` — no art-direction benefit, pure overhead |

---

## 11. Gaps and limitations

| Gap | Detail |
|---|---|
| File byte sizes | **Not determinable from captured data.** `products.json` exposes pixel dimensions only; no `Content-Length` was captured. All "oversized" judgements above are pixel-based, not byte-based. |
| ~~24 of 56 PDP HTML captures unusable~~ — **RESOLVED** | The 24 `raw/products/*.html` files that returned a Cloudflare `Verifying your connection...` interstitial in the first scrape pass have been **re-scraped successfully; all 56 of 56 PDP captures are now valid**. **Re-checking the 24 recovered files adds no theme, section or layout assets** — see §11.1. (`raw/products/*.js.json` was *not* re-fetched; ~25 remain challenge responses. Use `raw/products.json`, which is complete.) |
| Collection banner rendering | `raw/pages/collections_all.html` and `collections_best-sellers.html` render no banner image in the captured markup, so it is not determinable whether the 8 collection images are also used as page banners or only as collection-list tiles. |
| `/pages/size-chart-1` | Linked from every PDP but not captured — any image assets on it are unknown. |
| Blog `/blogs/news` | Not captured — article images unknown. |
| Policy pages | Not captured. |
| ~~Judge.me review media~~ — **PARTIALLY RESOLVED** | `raw/jdgm_all.json` (0 bytes) and `raw/jdgm_settings.json` (404 HTML) are still unusable, but the recovered PDP captures expose the review media that *is* server-rendered on page 1 of each widget: **5 customer-uploaded review photos, 0 videos** — see §11.2. Media attached to reviews on pages 2+ of any widget remains **not determinable from captured data**. |
| Favicon | Confirmed absent from the HTML — this is a finding, not a gap. |

### 11.1 Re-check of the 24 recovered PDP captures — asset delta

Every asset URL (`.png|.jpg|.jpeg|.webp|.gif|.svg|.woff/.woff2|.mp4|.webm|.avif`) was re-extracted
from all 56 PDP captures and the 24 recovered files were diffed against the 32 that succeeded first
time.

| Asset class | New assets found in the 24 recovered pages |
|---|---|
| Theme assets (`/assets/…`) | **0** — byte-identical set |
| Theme sections rendering images | **0** — no `shopify-section-*` id appears in the recovered pages that was not already present |
| Fonts | **0** |
| Collection / banner / hero images | **0** |
| Product images | **0 net new** — the 36 distinct URLs that appear only in these pages are the recovered products' own gallery images, already inventoried in full from `raw/products.json` (which was always complete). They add host/protocol variants (`https://siwafragrances.com/cdn/shop/files/…` and `http://…`) of files already counted, not new files. |
| **Judge.me review photos** | **2 new** (`carnal-trail`, `coco-woods`) — see §11.2 |
| App-extension bundles | **0 new files**, but the Shopify Inbox extension version bumped `shopify-inbox-1295` → `shopify-inbox-1296` between passes (§6) |

**Conclusion: the asset inventory in §1–§10 was not missing any theme or section imagery.** The PDP
template is uniform across all 56 products — every PDP pulls the same theme assets and differs only
in its own product gallery. The one substantive addition from the recovery is review-photo media.

### 11.2 Judge.me review photos (newly recoverable)

5 of the 241 server-rendered review bodies (2.1 %) carry a customer-uploaded photo. **Zero reviews
carry video** (`jdgm-rev__vids` is empty on all 241).

| Product | Image URL (original) |
|---|---|
| `carnal-trail` | `https://review-images.judgeme.com/siwa-fragrances/1776029567__image__original.jpg` |
| `chocolate-creme` | `https://judgeme.imgix.net/siwa-fragrances/1778446432__1778446428932-unnamed__original.jpg` |
| `coco-woods` | `https://review-images.judgeme.com/siwa-fragrances/1781878667__1781878665004-whatsappimage2026-06-19at0__original.jpeg` |
| `siwa-trail` | `https://judgeme.imgix.net/siwa-fragrances/1761655213__1761655196198-img20251021141120__original.jpg` |
| `vanilla-bundle` | `https://judgeme.imgix.net/siwa-fragrances/1770806412__image__original.jpg` |

Notes for the rebuild:

- **Two different CDN hosts are in use** — `judgeme.imgix.net` (older uploads, resized via
  `?auto=format&w=…`) and `review-images.judgeme.com` (newer uploads, resized via
  `?quality=80&width=…`). Both must be allowed if a CSP or image-proxy allowlist is introduced.
- Judge.me requests each photo **twice at two widths**: `…&w=160` for the thumbnail `data-src` and
  `…&w=1024` for the lightbox `href` / `data-mfp-src`. Thumbnails are lazy (`data-src`, class
  `jdgm--loading`), so they cost nothing above the fold.
- `alt` is the hard-coded literal `"User picture"` on all five — **no per-image alt text**,
  consistent with the store-wide zero-alt-text finding.
- Filenames leak provenance (`whatsappimage2026-06-19at0…`, `img20251021141120`, `unnamed`) exactly
  as the merchant's own product filenames do (§10.6).
- The settings CSS already configures a gallery affordance
  (`.jdgm-gallery__thumbnail-wrapper:before{content:"See more"}` at the 8th thumbnail), so the
  review-photo gallery **must be carried into the rebuild** even though only 5 photos exist today.
