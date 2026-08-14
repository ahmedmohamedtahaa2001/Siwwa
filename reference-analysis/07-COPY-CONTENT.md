# 07 — COPY & CONTENT DECK

Reference: https://siwafragrances.com/ · Theme: Prestige 11.1.0 · Locale `en` · Currency EGP
Audit date: 2026-07-27 · All strings below are extracted verbatim from `raw/` — tags stripped,
HTML entities unescaped, casing and punctuation preserved exactly as authored.

**How to read this document.** Every row is a string a rebuild must be able to reproduce as a
schema default, a locale key, or page content. Where the string is theme-default (Prestige/Shopify
boilerplate) rather than merchant-authored, it is labelled **theme default** so implementers do not
waste time re-authoring it. Where a string is app-owned (Judge.me / Shopify Inbox) it is labelled
**app**.

---

## 0. Source-file provenance

| Copy area | Extracted from |
|---|---|
| Announcement bar, header, footer, all homepage sections | `raw/pages/index.html` |
| Newsletter popup, privacy banner, cart drawer | `raw/pages/index.html` (overlay-group sections) |
| PDP copy patterns, tabs, badges, inventory strings | `raw/pages/pdp_sample.html`, `raw/products/*.html`, `raw/products.json` |
| Collection page controls | `raw/pages/collections_all.html`, `raw/pages/collections_best-sellers.html` |
| Brand pages | `raw/pages/pages_about-us.html`, `pages_our-story.html`, `pages_our-comitments.html`, `pages_contact.html` |
| Product descriptions, vendor "inspired-by" strings | `raw/products.json` (`body_html`, `vendor`) |
| Collection labels | `raw/collections.json` |
| Judge.me widget strings | `raw/pages/index.html` (embedded `jdgmSettings` JSON) |

---

## 1. Announcement bar

Section: `sections--18814157193264__announcement_bar_6BNjyF` · component `<announcement-bar-carousel>`
· `autoplay="3"` · colour scheme `scheme-3` (white text on `28 28 28` / `#1C1C1C`).

| # | Message (verbatim) | Markup | Link |
|---|---|---|---|
| 1 | `Explore your Persona. Free shipping orders over 1500` | `<p class="prose heading is-selected"><strong>…</strong></p>` | none |

**Rotation:** the carousel component is present and `autoplay="3"` is set, but **only one message
exists in the DOM**. There are no rotating messages on the captured pages — a rebuild needs exactly
one announcement block. Font size token: `--announcement-bar-font-size: 0.625rem` (mobile) /
`0.6875rem` (≥999px). Not sticky (`--announcement-bar-is-sticky: 0`).

Note the copy has no currency unit — it reads "over 1500", not "over 1500 EGP" or "LE 1500".
Reproduce as-is.

---

## 2. Header / navigation

Section: `sections--18814157193264__header`. Logo is wrapped in the page `<h1>` on every template
(`<h1 class="header__logo">`), with an `sr-only` text fallback.

| Label (exact casing) | Element | href | `data-title` |
|---|---|---|---|
| `Siwa Fragrances` | `h1.header__logo` → `span.sr-only` + `img alt` | `/` | — |
| `HOME` | primary nav | `/` | `HOME` |
| `SHOP ALL` | primary nav | `/collections/all` | `SHOP ALL` |
| `ORIGINAL CREATIONS` | primary nav | `/collections/original-creations` | `ORIGINAL CREATIONS` |
| `FOR HIM` | primary nav | `/collections/for-him` | `FOR HIM` |
| `FOR HER` | primary nav | `/collections/for-her` | `FOR HER` |
| `UNISEX` | primary nav | `/collections/unisex` | `UNISEX` |
| `BUNDLES` | primary nav | `/collections/bundles` | `BUNDLES` |
| `BODY SPLASH` | primary nav | `/collections/body-splash` | `BODY SPLASH` |
| `BODY LOTION` | primary nav | `/collections/body-lotion` | `BODY LOTION` |
| `CONTACT US` | primary nav | `/pages/contact` | `CONTACT US` |
| `Navigation menu` | `sr-only`, mobile hamburger | — | theme default |
| `Search` | `sr-only` + search input `aria-label` | `/search` | theme default |
| `Cart` | `sr-only` on cart button; also cart-drawer header | `/cart` | theme default |
| `Login` | mobile sidebar footer link | `/account/login` | theme default |
| `Close` | `sr-only` on all drawer/dialog close buttons | — | theme default |
| `Skip to content` | first `sr-only` link in `<body>` | `#main` | theme default |
| `Search for...` | search input `placeholder` | — | theme default |

The mobile sidebar menu repeats the same 10 nav labels verbatim, then adds `Login`.

**Casing pattern:** all 10 merchant-authored nav labels are ALL-CAPS in the source string itself,
*and* the theme applies `--heading-text-transform: uppercase`. A rebuild that authors them in title
case will still render uppercase, but the underlying string in the menu should be stored ALL-CAPS to
match.

---

## 3. Homepage — section by section

Sections in DOM order. Prestige renders most "headings" as `<p class="h1|h2|h3|h6">` rather than real
heading tags; the class is the visual size token, given here because it drives the rebuild.

### 3.1 Slideshow (`template--18814156636208__slideshow`)

One slide only. `autoplay="4"`, `allow-transparent-header`, content max-width `800px`,
text colour `255 255 255` / `#FFFFFF`, placement `place-self-end-start text-start`.

| Role | Copy | Element | Link / button style |
|---|---|---|---|
| Eyebrow | `Summer Drops` | `p.h6` | — |
| Headline | `THE SEASON HAS ARRIVED` | `p.h1` | — |
| CTA 1 | `Shop All` | `a.button` | `https://siwafragrances.com/collections/all` · bg `255 255 255` `#FFFFFF`, text `0 0 0` `#000000` |
| CTA 2 | `Summer Collection` | `a.button` | `/collections/summer-collection` · bg `28 28 28` `#1C1C1C`, text `255 255 255` `#FFFFFF` |

### 3.2 Featured collections — "new in" (`template--18814156636208__featured_collections_EGrx3j`)

| Role | Copy | Element |
|---|---|---|
| Section eyebrow | `new in` | `p.h6.text-center > strong` |
| Tab 1 (selected) | `men` | `button.h2` (`aria-current="true"`) |
| Tab 2 | `women` | `button.h2` |
| View-all link, tab 1 | `View MEN NEW DROPS` | `a` → `/collections/men-new-drops` |
| View-all link, tab 2 | `View WOMEN NEW DROPS` | `a` → `/collections/women-new-drops` |
| Carousel controls | `Previous` / `Next` | `sr-only` (theme default) |

### 3.3 Image with text overlay (`template--18814156636208__image-with-text-overlay-1`)

Colour scheme `scheme-4` (transparent overlay, white text). Overlay opacity `0 0 0 / 0.0`.

| Role | Copy | Element | Link |
|---|---|---|---|
| Eyebrow | `OFFERS & DISCOUNTS` | `p.h6` | — |
| Headline | `OUR BUNDLES` | `p.h2` | — |
| CTA | `Shop NOW` | `a.button.button--outline` | `/collections/bundles` · outline `255 255 255` `#FFFFFF`, text `28 28 28` `#1C1C1C` |

Note the mixed casing `Shop NOW` — authored inconsistently vs `SHOP NOW` elsewhere. Preserve it.

### 3.4 Featured collections — "BEST SELLERS" (`template--18814156636208__featured-collections-2`)

| Role | Copy | Element |
|---|---|---|
| Section eyebrow | `BEST SELLERS` | `p.h6.text-center > strong` |
| Tab 1 (selected) | `men` | `button.h2` |
| Tab 2 | `WOMEN` | `button.h2` |
| View-all link, tab 1 | `View all MEN BEST SELLERS` | `a` → `/collections/men-best-sellers` |
| View-all link, tab 2 | `View ALL WOMEN BEST SELLERS` | `a` → `/collections/women-best-sellers` |

Casing is inconsistent across the two tab sets (`men`/`women` vs `men`/`WOMEN`) and across the two
view-all links (`View all …` vs `View ALL …`). This is authored inconsistency, not a rendering
artefact — the DOM strings differ.

### 3.5 Reviews carousel — Judge.me app block (`template--18814156636208__17592337449e486738`)

App block `judge_me_reviews_testimonials_carousel_PDLRxp`. **app** — these strings live in Judge.me
settings, not in the theme.

| Copy | Source key |
|---|---|
| `Customers are saying` | `testimonials_carousel_title` (also `cards_carousel_title`) — rendered as `<h2 class="jdgm-title">` |
| `4.98 ★ (1176)` | rendered from `averageRating = 4.98` and `shop_aggregates.reviewCount = 1176` |
| `Verified` | `jdgm-verified-badge-header` (carries class `jdgm-hidden` — not visible) |
| `Let customers speak for us` | `featured_carousel_title` (not used by this block) |
| `Real customer stories` | `videos_carousel_title` (not used by this block) |
| `from {{ n }} reviews` | `featured_carousel_count_text` (not used by this block) |

⚠️ **The two review numbers are both real — they count different populations.** The widget prints
`1176` reviews at `4.98 ★`, sourced from `shop_aggregates.reviewCount` in the Judge.me payload
(also `data-shop-review-count="1176"` / `data-shop-average-rating="4.98"`, identical on all 56 PDPs).
Summing `data-number-of-reviews` across all 56 published product pages gives **820 reviews across
54 of 56 products at a 4.9807 ★ weighted average** (only `soiree` and `sundaze` have zero).

The **356-review difference** is not a capture gap — all 56 PDPs are captured and their per-product
counts match the theme's `reviews.rating_count` metafields exactly. It is review equity attached to
**products that have been unpublished or deleted**: `raw/meta.json` reports
`published_products_count: 56`, yet `raw/collections.json` reports collection `products_count`
values that are impossible against 56 published products (`for-him` 83, `perfumes` 82, `for-her` 80,
`unisex` 50 — 498 across 19 collections). Judge.me keeps counting reviews for delisted products in
the shop aggregate; they have no live PDP to appear on. A further slice is
`data-shop-reviews-count="222"` — reviews written about the *shop* rather than a product. Full
reconciliation is in `06-REVIEWS.md` §2.3.

Copy implication: **`1176` and `4.98 ★` are the correct storefront-wide figures to render**, but they
are app-generated and drift daily — a rebuild must bind them to the live aggregate, never hard-code
them. Do not substitute the 820 figure in shop-wide copy; it under-counts by 30 %.

### 3.6 Scrolling content 2 — marquee (`template--18814156636208__scrolling-content-2`)

| Copy | Element | Motion |
|---|---|---|
| `True Elegance` | `p.scrolling-content__text.heading` | `<marquee-text speed="0.1" direction="right">` |

Single item, repeated by the marquee component. Background `0 0 0` / `#000000`, text
`255 255 255` / `#FFFFFF`, border `38 38 38` / `#262626`. Font size `clamp(32px … 64px)`.

### 3.7 Collection list (`template--18814156636208__collection_list_gpXjxV`)

| Role | Copy | Element |
|---|---|---|
| Section heading | `our collections` | `h2.h2` (a real `<h2>`) |

Eight tiles, each a `<a class="collection-card">` whose label is rendered as a
`button.button--outline` (`tabindex="-1"`), overlaid on the collection image with scheme-4.

| # | Tile label (verbatim) | href | Image `alt` |
|---|---|---|---|
| 1 | `for her` | `/collections/for-her` | `FOR HER` |
| 2 | `FOR Him` | `/collections/for-him` | `FOR HIM` |
| 3 | `bundles` | `/collections/bundles` | `Bundles` |
| 4 | `body lotion` | `/collections/body-lotion` | `Body lotion` |
| 5 | `unisex` | `/collections/unisex` | `UNISEX` |
| 6 | `original creation` | `/collections/original-creations` | `Original Creations` |
| 7 | `best sellers` | `/collections/best-sellers` | `BEST SELLERS` |
| 8 | `new drops` | `/collections/new-drops` | `new drops` |

Tile labels are authored in **lowercase** (except the odd `FOR Him`) and rely on the theme's
`text-transform: uppercase` to render as caps. The `alt` text — which is the *collection title* from
`raw/collections.json`, not the tile label — is a different casing again. Note tile 6 says
`original creation` (singular) while the collection title is `Original Creations` (plural).

### 3.8 Scrolling content 1 — marquee (`template--18814156636208__scrolling-content-1`)

| Copy | Element | Motion |
|---|---|---|
| `Signature Luxury` | `p.scrolling-content__text.heading` | `<marquee-text speed="0.1" direction="left">` |

Same styling as 3.6; opposite scroll direction.

### 3.9 Media grid (`template--18814156636208__media-grid`)

| Role | Copy | Element |
|---|---|---|
| Section heading | `Uncover Hidden Gems` | `h2.h2` (a real `<h2>`) |

Three tiles, each `<a class="media-grid__item">` spanning 4 columns × 2 rows:

| # | Tile heading | Tile CTA | href |
|---|---|---|---|
| 1 | `ORIGINAL CREATIONS` (`p.h3`) | `TRY NOW` (`button.button--outline`) | `/collections/original-creations` |
| 2 | `BODY SPLASHES` (`p.h3`) | `SHOP NOW` (`button.button--outline`) | `/collections/body-splash` |
| 3 | `body LOTION` (`p.h3`) | `SHOP NOW` (`button.button--outline`) | `/collections/body-lotion` |

Tile 3's `body LOTION` casing is authored exactly like that. Tile 2 says `BODY SPLASHES` (plural)
while the collection is `Body Splash` (singular).

### 3.10 Trailing app section (`template--18814156636208__17765002303c384e0a`)

Renders empty in the capture — no copy. `<section>` contains no app block output.

---

## 4. The three USP blocks (text-with-icons)

Section: `sections--18814157226032__text-with-icons` — part of the **footer group**, so it appears on
the homepage, every PDP, and every collection page. Carousel on mobile (`disabled-on="sm"`), three
columns on desktop. Colour scheme `scheme-1`. Verbatim, with line breaks preserved:

| # | Heading (`p.h6 > strong`) | Body (`div.prose > p`) | Prestige icon |
|---|---|---|---|
| 1 | `14 days return` | `Returns are accepted for items in their original, unused sealed condition.` | `icon-picto-return` |
| 2 | `support 24/7` | `Reach out to us via DM`<br>`Email: contact@siwafragrances.com` | `icon-picto-operator` |
| 3 | `Payment Protection` | `Your payment details are encrypted and secure.` | `icon-picto-lock` |

Block 2's raw HTML is `Reach out to us via DM<br/>Email: contact@siwafragrances.com<br/><br/>` — it
ends with **two trailing `<br/>`** (an authoring artefact, reproduce or clean at rebuild discretion).

Carousel dot labels (theme default, `sr-only`): `Go to item 1`, `Go to item 2`, `Go to item 3`.
Each slide carries `aria-label="Item 1 of 3"` … `"Item 3 of 3"`.

---

## 5. Newsletter popup

Section: `sections--18814157258800__newsletter-popup` · `<newsletter-popup>` · colour scheme
`scheme-3` (dark) · `only-once` · `apparition-delay="5"` (seconds) · `title="Newsletter popup"`.

| Role | Copy (verbatim) | Element |
|---|---|---|
| Heading | `A Gift for Your First Siwa Order` | `p.h4` |
| Body / offer | `Subscribe to our newsletter and receive 50 EGP off your first purchase with Siwa Fragrances` | `div.prose` |
| Field label + placeholder | `E-mail` | `input[type=email][placeholder]` + `label.floating-label` |
| Submit CTA | `Get My Discount` | `button.button[type=submit]` |
| Close | `Close` | `sr-only` (theme default) |

Form posts to `/contact#newsletter-sections--18814157258800__newsletter-popup` with hidden
`contact[tags] = newsletter`. **The discount offer is stated as "50 EGP off your first purchase"** —
there is no code shown, no minimum, and no expiry in the copy. Note the offer is phrased in `EGP`
while the announcement bar and prices use `LE`/`1500` — inconsistent currency notation across the
site.

On `raw/pages/pdp_sample.html` the popup section renders **empty** (`only-once` suppression), so all
popup copy must be sourced from the homepage capture.

---

## 6. Privacy / cookie banner

Section: `sections--18814157258800__privacy-banner` · `<privacy-banner>` · scheme `scheme-3` (dark).

| Role | Copy (verbatim) | Element |
|---|---|---|
| Heading | `🍪 Cookie policy` | `p.h6` |
| Body | `We use cookies and similar technologies to provide the best experience on our website. Refer to our Privacy Policy for more information.` | `div.prose.text-xs > p` |
| Accept | `Accept` | `button.link.text-xs[data-action="accept"]` |
| Decline | `Decline` | `button.link.text-xs.text-subdued[data-action="decline"]` |
| Close | `Close` | `sr-only` |

The heading string **starts with the 🍪 emoji followed by a space** — `🍪 Cookie policy`. Body copy
mentions "our Privacy Policy" as plain text; it is **not** hyperlinked in the DOM.

---

## 7. Cart drawer

Section: `sections--18814157258800__cart-drawer` · `<cart-drawer aria-label="Cart">` · scheme-1.

| Role | Copy | Element | Status |
|---|---|---|---|
| Drawer title | `Cart` | `p.h4[slot="header"]` | theme default |
| Empty state | `Your cart is empty` | `p.h5.text-center` | theme default |

No merchant customisation of cart copy in the captured state (cart was empty — `raw/cart.js`
confirms an empty cart, so line-item, subtotal and checkout-button strings are **not determinable
from captured data**).

---

## 8. Brand pages — full text

These four pages are short and carry the brand voice; reproduced complete.

### 8.1 `/pages/about-us`

- Sections: `template--18814156701744__slideshow_6aQJg6` (image-only hero, **no text**), then
  `template--18814156701744__main`.
- `<title>`: `ABOUT US` · meta description = the two body paragraphs concatenated.
- Page heading: `<h1 class="h2">ABOUT US</h1>` — container `container--xs`.

> **ABOUT US**
>
> Siwa Fragrances is an esteemed Egyptian maison, weaving heritage and identity into every bottle. We exist to elevate your daily ritual with scents that are both a personal signature and a profound connection to culture, all while embracing unparalleled comfort.
>
> Our pledge is to redefine luxury, making it authentically Egyptian and accessible. By fusing masterful craftsmanship with exceptional value, we earn your trust—proving local quality rivals the world's best.
>
> - **Exquisite Ingredients**
> - **Inclusive Pricing**
> - **Personalized Service**

Markup notes: paragraphs carry `class="ds-markdown-paragraph"` and wrap their text in a bare
`<span>` — the signature of copy pasted out of an AI chat UI (DeepSeek's markdown class). The
three-item list is an unordered `<ul>`, each `<li>` containing `<p><strong><span>…`. The em dash in
"trust—proving" is a true em dash with no surrounding spaces. Apostrophe in "world's" is a straight
ASCII `'` here (contrast §8.3, which uses a curly `’`).

### 8.2 `/pages/our-story`

- Same hero image section as About Us (identical `About_Us.png` asset), no hero text.
- `<title>`: `OUR STORY`. Page heading: `<h1 class="h2">OUR STORY</h1>`.

> **OUR STORY**
>
> Producing high quality niche perfumes which suit different tastes
>
> Siwa..
>
> A breathtaking Egyptian oasis of impressive beauty where golden sands, shining sun eye and crystal salty lakes..
>
> A distinctive bouquet of high-quality and carefully selected perfumes specially presented for you inspired by the beauty and charm of Siwa Oasis.. Made in Egypt according to standards and international requirements

Markup notes: this page's body is **pasted Google-SERP HTML** — the prose is buried inside
`div.elementor-element`, `div.TzHB6b.cLjAic`, `div.LuVEUc.OTFaAf`, `data-hveid`/`data-ved`
attributes and a `data-attrid="kc:/local:merchant_description"` node with `lang="ar-EG"`. The
`data-long-text` attribute preserves an alternate original wording:
`"Siwa Fragrance / A breathtaking Egyptian oasis of impressive beauty, where golden sands, shining sun eye and crystal salty lakes.. / …"`
(note "Siwa Fragrance" singular and a comma after "beauty" that the rendered version drops). A
rebuild should re-author this as clean rich text — the wrapper markup is pure paste debris.
The distinctive double-dot terminator `..` appears three times and is deliberate brand voice.

### 8.3 `/pages/our-comitments`

Handle is misspelled in the URL (`our-comitments`) **and** the on-page heading says
`OUR COMITMENTS`. Preserve the URL for redirects; the heading typo is a fix candidate.

- `<title>`: `OUR COMITMENTS`. Page heading: `<h1 class="h2">OUR COMITMENTS</h1>`.

> **OUR COMITMENTS**
>
> At Siwa Fragrances, our promise is built on three pillars:
>
> 1. **Uncompromised Quality:** We craft luxurious, long-lasting scents using the world’s finest ingredients, ensuring sophistication in every bottle.
> 2. **Honest Value:** We believe luxury should be accessible. By focusing on the juice, not the hype, we deliver exceptional quality at revolutionary prices.
> 3. **Egyptian Excellence:** We are dedicated to reshaping the landscape of local luxury, building trust by proving Egyptian craftsmanship can rival the world’s best.
>
> **Join us in redefining luxury.**

Markup notes: an ordered `<ol>` (unlike About Us's `<ul>`), each `<li>` opening with
`<strong>Label:</strong>`. Curly apostrophes `’` throughout.

### 8.4 `/pages/contact`

Three sections: hero slideshow (image only, no text) → contact form → rich text.

- `<title>`: `Contact`.

**Contact form section** (`template--18814156668976__contact-form`, `h2.h2`):

| Role | Copy | Element |
|---|---|---|
| Section heading | `Contact` | `h2.h2` |
| Field 1 | `Name` | placeholder + `label.floating-label`, `name="contact[name]"`, required |
| Field 2 | `E-mail` | placeholder + label, `name="contact[email]"`, required, `dir="ltr"` |
| Field 3 | `Message` | placeholder + label, `textarea[name="contact[body]"]`, `rows="4"`, required |
| Submit | `Send message` | `button.button` |

**Rich text section** (`template--18814156668976__rich_text_GFEiqV`, container `container--sm`, centred):

> **contact us**
>
> **WhatsApp us for any inquiries +201066250757**
>
> **Store location: Cairo, Nasr City, The Garden Kiosk Three**

Markup notes: the heading `contact us` is lowercase in source, rendered as `<p class="h1">` (not a
real heading tag), and appears *below* a section already headed `Contact` — a duplicate-heading
pattern. Both body lines are fully wrapped in `<strong>`. The address line ends with
`<br/></strong><br/>` — trailing break artefacts.

**Merchant contact points across the site** (for a rebuild's contact/settings block):

| Channel | Value | Where it appears |
|---|---|---|
| Email | `contact@siwafragrances.com` | USP block 2 (footer group, all pages) |
| WhatsApp (phone) | `+201066250757` | contact page rich text |
| WhatsApp (link) | `https://api.whatsapp.com/message/VLSFRC5URF6EP1?autoload=1&app_absent=0` | footer social icons |
| Facebook | `https://www.facebook.com/share/1AYNy8M7mJ/?mibextid=wwXIfr` | footer social icons |
| Instagram | `https://www.instagram.com/siwafragrances?igsh=MXE0anh6NXlnYzFmaw==` | footer social icons |
| TikTok | `https://www.tiktok.com/@siwafragrances?_t=ZS-8zhBvV3DKCe&_r=1` | footer social icons |
| Store address | `Cairo, Nasr City, The Garden Kiosk Three` | contact page rich text |
| Shop address (Shopify) | New Cairo, Cairo, EG | `raw/meta.json` |

---

## 9. Footer

Section: `sections--18814157226032__footer` · colour scheme `scheme-3` (white text on `28 28 28` /
`#1C1C1C`) · `--footer-content-justify-items: space-between`.

### 9.1 Menu block 1

| Heading | `Main menu` (`p.h6`) |
|---|---|

| Label | href |
|---|---|
| `HOME` | `/` |
| `SHOP ALL` | `/collections/all` |
| `ORIGINAL CREATIONS` | `/collections/original-creations` |
| `FOR HIM` | `/collections/for-him` |
| `FOR HER` | `/collections/for-her` |
| `UNISEX` | `/collections/unisex` |
| `BUNDLES` | `/collections/bundles` |
| `BODY SPLASH` | `/collections/body-splash` |
| `BODY LOTION` | `/collections/body-lotion` |
| `CONTACT US` | `/pages/contact` |

Identical to the header nav — the footer block is the same linklist.

### 9.2 Menu block 2

| Heading | `MORE INFORMATION` (`p.h6`) |
|---|---|

| Label | href |
|---|---|
| `SEARCH` | `/search` |
| `REFUND POLICY` | `/policies/refund-policy` |
| `ABOUT US` | `/pages/about-us` |
| `PRIVACY POLICY` | `/policies/privacy-policy` |

⚠️ Neither footer menu links to `/pages/our-story`, `/pages/our-comitments`, or
`/pages/size-chart-1` — those four brand pages exist in `raw/sitemap_pages_1.xml` but are
**orphaned from site navigation**. Only `about-us` and `contact` are reachable from the chrome.

### 9.3 Newsletter block

| Role | Copy | Element |
|---|---|---|
| Heading | `Newsletter` | `p.h6` |
| Body | `Sign up to our newsletter to receive exclusive offers.` | `div.prose.text-subdued > p` |
| Field | `E-mail` | placeholder + `label.floating-label.text-xs` |
| Submit | `Subscribe` | `button.button` |

Form posts to `/contact#newsletter-form-sections--18814157226032__footer`, hidden
`contact[tags] = newsletter`. Note the footer newsletter copy is **different from and softer than**
the popup's — no discount is mentioned here, and the CTA is generic `Subscribe` rather than
`Get My Discount`.

### 9.4 Social icons

Four `<li class="social-media__item">` entries, icon-only, with `aria-label`s:

| `aria-label` | Icon class |
|---|---|
| `Follow on Facebook` | `icon-facebook` |
| `Follow on Instagram` | `icon-instagram` |
| `Follow on TikTok` | `icon-tiktok` |
| `Follow on WhatsApp` | `icon-whatsapp` |

### 9.5 Payment icons

**None.** A full-text scan of `raw/pages/index.html` for payment-icon markup
(`payment_icons`, `/i/payment`, `shopifycloud/…/payment`) returns no matches, and the
`footer__aside` block contains only the copyright line. The only "payment" string on the homepage is
the USP body text `Your payment details are encrypted and secure.`

Corroborating evidence from `raw/meta.json`: `"shopify_pay_enabled_card_brands": []` and
`"offers_shop_pay_installments": false` — the store has no card brands configured, which is why
Prestige renders no payment badge row. A rebuild should **not** invent payment icons; if they are
wanted, they must be enabled at the Shopify payments level first.

### 9.6 Copyright

| Copy | Element |
|---|---|
| `© 2026 - Siwa Fragrances` | `p.heading.text-subdued.text-xxs` inside `div.footer__aside` |

Rendered as `©`, space, year, space, hyphen-minus, space, shop name. Followed by an empty
`<a rel="nofollow" href="https://www.shopify.com?utm_campaign=poweredby…"> </a>` (a single space —
the "Powered by Shopify" label is blanked out).

---

## 10. PDP copy patterns

### 10.1 Product-page chrome (theme strings, `raw/pages/pdp_sample.html` + `raw/products/*.html`)

| Copy | Element / context | Status |
|---|---|---|
| `Zoom picture` | `sr-only` on gallery zoom trigger | theme default |
| `Sale price` | `sr-only` inside `<sale-price>` | theme default |
| `Regular price` | `sr-only` inside compare-at price | theme default |
| `Size:` | variant picker legend (`option_name` + colon) | merchant option name |
| `30 ml` / `50 ml` / `100 ml` | block swatch labels | merchant option values |
| `Size chart` | rich-text block linking `/pages/size-chart-1` (`title="Size Chart"`) | **merchant-authored** |
| `Variant` | `noscript` select floating label | theme default |
| `Decrease quantity` / `Increase quantity` | `sr-only` on quantity buttons | theme default |
| `Change quantity` | quantity input `aria-label` | theme default |
| `Add to cart` | primary buy button | theme default |
| `Choose options` | product-card CTA when the product has variants | theme default |
| `In stock` | `<variant-inventory class="inventory text-success">` | theme default |
| `Only a few units left` | low-stock inventory state | theme default |
| `Out of stock` | inventory state | theme default |
| `Sold out` | `<sold-out-badge class="badge badge--sold-out">` | theme default |
| `On sale` | `<on-sale-badge class="badge badge--on-sale">` | theme default |
| `New` | custom badge (`--custom-badge-background: 28 28 28` / `#1C1C1C`) | merchant metafield/tag driven |
| `Recently viewed products` | `<h2 class="h2">` in `…__recently_viewed_products_LGtyH6` | theme default |
| `Cancel review` | Judge.me `widget_close_form_text` | app |

Inventory-state occurrence counts across the captured HTML: `Only a few units left` ×15,
`Out of stock` ×7, `In stock` ×5.

**Related products heading: there is none.** The section
`template--18814156767280__related-products` renders only
`<product-recommendations product="…" limit="10" intent="related">` with **no heading element** —
recommendations are fetched client-side from the Section Rendering API, so no heading text exists in
any captured PDP. `Recently viewed products` is the only heading in that region and appears in
**all 56 of 56 PDP captures** (re-verified after the 24 previously-blocked pages were recovered).

Also present but never populated in the capture: `<div data-block-type="volume-pricing">` (empty).

Price display uses the shop money format `LE {{amount}}` (`raw/meta.json`), producing strings like
`LE 500.00`, `From LE 750.00`, `LE 1,050.00`. Collection facet inputs show the Arabic currency
abbreviation `ج.م` (see §11) — the two notations coexist on the site.

### 10.2 Judge.me review-widget copy on PDPs (**app**)

| Copy | Judge.me setting key |
|---|---|
| `Customer Reviews` | `widget_title` |
| `Be the first to write a review` | `widget_no_review_text` |
| `Write a review` | `widget_open_form_text` |
| `Cancel review` | `widget_close_form_text` |
| `Refresh page` | `widget_refresh_page_text` |
| `Based on {{ number_of_reviews }} review/reviews` | `widget_summary_text` |
| `Display name` | `widget_name_field_text` / `widget_name_placeholder_text` |
| `Verified Name (public)` | `widget_verified_name_field_text` |
| `Email address` | `widget_email_field_text` |
| `Your email address` | `widget_email_placeholder_text` |
| `Verified Email (private, can not be edited)` | `widget_verified_email_field_text` |
| `This field is required.` | `widget_required_field_error_text` |
| `Please enter a valid email address.` | `widget_email_field_error_text` |
| `Rating` | `widget_rating_field_text` |
| `No reviews` | inline rating-badge text when count = 0 |

All are Judge.me defaults — none were customised by the merchant.

### 10.3 Product description templates — the real picture

⚠️ **Correction to prior assumptions.** The shared audit context describes a consistent editorial
template (`THE VIBE` → `blockquote` → `FRAGRANCE PROFILE` → notes list). A field-by-field scan of all
56 `body_html` values in `raw/products.json` shows this is **not** a site-wide pattern:

| Marker string | Products containing it (of 56) |
|---|---|
| `THE VIBE` | **1** (`sundaze`) |
| `FRAGRANCE PROFILE` | **1** (`sundaze`) |
| `If you love … this is your scent.` | **1** (`sundaze`) |
| `PERFORMANCE & WEAR` | **1** (`sundaze`) |
| `Main Accords` | 1 (`sundaze`) |
| `Longevity` | 1 (`sundaze`) |
| `Persona` | 5 (`pink-arrogance`, `pink-allure`, `lost-on-you`, `aurableu`, `absolute-drunk`) |
| `The Story` | 5 (same five) |
| `Notes` / `Notes:` | 13 |
| `Top:` / `Heart:` / `Base:` (as a labelled trio) | 2 |
| `Best For` | 7 |
| `Inspired by` (in body copy) | 2 |
| `vitamin E` (body-splash boilerplate) | 5 |
| Empty `body_html` | 0 |

Description length ranges from **73 chars** (`coco-woods`) to **2,023 chars** (`citrine`); median is
well under 400. So the site has **four distinct description formats**, layered chronologically —
newest products get the richest template:

**Format A — the full editorial template (1 product, `sundaze`, newest).** This is the template to
standardise on if a rebuild wants consistency:

```
<h4>THE VIBE</h4>
<p>A radiant, sunkissed gourmand that blends juicy passionfruit with creamy vanilla and warm
   amber. Sundaze radiates magnetic warmth invigorating at first spray, then settling into a rich,
   addictive skin trail.</p>
<blockquote><p><b>If you love <i>Armani Power of You</i>, this is your scent.</b></p></blockquote>
<h4>FRAGRANCE PROFILE</h4>
<ul>
  <li><b>Main Accords:</b> Tropical Fruit • Creamy Solar Florals • Warm Bourbon Vanilla</li>
  <li><b>Top:</b> Passionfruit, Bitter Orange &amp; Lemon</li>
  <li><b>Heart:</b> Frangipani &amp; Solar Accords</li>
  <li><b>Base:</b> Madagascar Vanilla, Benzoin &amp; Labdanum</li>
</ul>
<p><b>PERFORMANCE &amp; WEAR</b></p>
<ul>
  <li><b>Longevity:</b> 7–8 Hours <i>(Transforms from vibrant fruit into a long-lasting
      vanilla-amber base)</i></li>
  <li><b>Projection / Sillage:</b> Moderate <i>(Creates a radiant, noticeable halo without
      overpowering the room)</i></li>
  <li><b>Best For:</b> Golden hour, warm weather, evening dates &amp; everyday signature wear</li>
</ul>
```

Structural notes: section labels are `<h4>` and ALL-CAPS; `PERFORMANCE & WEAR` is *not* an `<h4>` —
it is `<p><b>`, an inconsistency inside the template itself. Bullet separators use `•`. Ranges use
an en dash (`7–8 Hours`). Parentheticals are italicised. Every node carries `data-path-to-node` /
`data-index-in-node` attributes — Shopify's rich-text editor artefacts, safe to strip.

**Format B — "Persona / The Story" (5 products).** Two `<strong>`-labelled prose blocks, no notes
list, no inspired-by blockquote. Example (`pink-arrogance`):

> **Persona**
> She doesn’t wait to be noticed. She decides when she is.
> Confident, composed, and always in control. There’s a quiet sharpness to her presence… soft at first, but never weak.
>
> **The Story**
> Pink Arrogance isn’t about being sweet. It’s about being certain.
> It opens with a bright floral lift, where orange blossom and neroli meet a soft almond nuance, creating a start that feels clean but with a subtle edge.

**Format C — name + 3-word accord line + notes list (majority, ~30 products).** The most common
shape:

> **Drunk Gold**
> Liquid gold. Intoxication in every drop
> Woody, sweet, fruity
> Notes: Cognac, liquor, raspberry, praline, tonka

or, with formal note tiers:

> **Coffee Vanilla**
> Gourmand Coffee Vanilla fragrance for men & women.
> Top notes: Coffee and Amaretto.
> Middle notes: Ice cream and Vanilla.
> Base notes: Brown Sugar and Vanilla.

Note the note-tier label set is inconsistent across products: `Top / Heart / Base` (sundaze,
mango-pineapple, bleu-intense) vs `Top notes / Middle notes / Base notes` (coffee-vanilla,
layering-apple, luna-di-roma, soul-poudree, iris-elixir, hot-male, sweet-oud). Spacing before the
colon also varies (`Top notes :` in luna-di-roma, soul-poudree, iris-elixir, hot-male).

**Format D — body-splash / lotion boilerplate (5 products).** A single templated sentence:

> `<Product name>` · `A long-lasting body splash enriched with vitamin E, blending warm vanilla, delicate <X>, sweet <Y>, and rich <Z> for a sensual, irresistible scent that lingers all day.`

Verbatim instances: `apple-pie` ("delicate Apple, sweet praline, and rich cinnamon … all day"),
`silk-vanilla` ("delicate orchid, sweet sugar, and rich amber … all day"), `sweet-rum` ("warm
vanilla, delicate dates, sweet praline, and rich cinnamon … lingers all night"), `marshmallow`
("sweet, warm blend of vanilla, sugar, and fluffy marshmallow"), `vanilla-91` ("blending creamy
vanilla, soft jasmine petals and glowing sandalwood…", ends with the single word `Limited`).

Lotion variant (`silk-vanilla-body-lotion`): *"Lightweight lotion enriched with Vitamin E,
Panthenol, Shea Butter & Cocoa Butter. Deeply hydrates, absorbs quickly, and leaves skin silky
smooth with a warm vanilla scent."*

**Bundle copy** is its own micro-format:

| Handle | Copy |
|---|---|
| `marshmallow-bundle` | `Marshmallow Bundle` / `Enjoy additional 10% off when you buy marshmallow bundle !` |
| `layering-30-ml-bundle` | `Pay less get more!` / `Enjoy a bundle of our three top layering perfumes with 15%` |
| `vanilla-bundle` | `Vanilla Bundle – Your Everyday Glow in Luxury..` / `Sink into the warm, creamy essence of Silk Vanilla.` / `This luxurious bundle features:` / `Layering Vanilla Perfume – a rich, long-lasting scent that wraps you in sensual comfort.` / `Silk Vanilla Body Lotion (125 ml) – deeply moisturizing with Shea Butter, Cocoa Butter & Vitamin E for a soft, radiant feel.` / `Silk Vanilla Body Splash (125 ml) – a fresh touch of e…` |

### 10.4 PDP SEO copy

Only **one** of 56 products has a custom SEO title:

| Handle | `<title>` | Meta description |
|---|---|---|
| `sundaze` | `Sundaze Perfume \| Armani Power of You Alternative in Egypt` | `Get the radiant warmth of Armani Power of You at a fraction of the price. Sundaze by siwafragrances offers premium longevity & sillage. Free shipping options available in Egypt.` |
| all others | product title only (e.g. `Absolute Drunk`, `Lagoon Flair`) | auto-generated from `body_html` — **all 56 of 56 emit a non-empty `<meta name="description">`** (re-verified across the complete capture) |

The `sundaze` pair is the only place on the site where the dupe positioning is stated **explicitly
in SEO copy** — "Alternative", "at a fraction of the price". Everywhere else the inspired-by claim is
carried implicitly by the `vendor` field (§11.4).

Page-level titles elsewhere: homepage `<title>` is `siwafragrances.com` (unset — a real SEO gap),
`/collections/all` is `Products`, `/collections/best-sellers` is `BEST SELLERS`.

---

## 11. Collection-page copy

Section `template--18814157029424__main`. All strings below are Prestige/Shopify defaults — the
merchant customised none of them. Collections carry **no descriptions** (all 19 `description` fields
in `raw/collections.json` are empty), so no collection-level body copy exists.

| Copy | Context |
|---|---|
| `Filter by` | facet drawer heading |
| `Sort by` | sort dropdown label |
| `Featured` / `Most relevant` / `Best selling` / `Alphabetically, A-Z` / `Alphabetically, Z-A` / `Price, low to high` / `Price, high to low` / `Date, old to new` / `Date, new to old` | sort options |
| `Availability` | facet group |
| `In stock only` | availability facet value |
| `Price` | facet group |
| `ج.م` | currency symbol prefix on price-range inputs |
| `from price` / `to price` | price-range input `aria-label`s |
| `0` / `2300` (all) · `0` / `2100` (best-sellers) | price-range input placeholders = catalogue min/max |
| `View results` | facet drawer apply button |
| `2` `3` `4` | pagination page numbers |

Collection titles as authored (`raw/collections.json`) — these become the H1 on each collection page
and the labels in the homepage collection list:

| Handle | Title (verbatim) | Products |
|---|---|---|
| `best-sellers` | `BEST SELLERS` | 24 |
| `black-friday-2025` | `Black Friday Offer` | 0 |
| `body-lotion` | `Body lotion` | 1 |
| `body-splash` | `Body Splash` | 6 |
| `bundles` | `Bundles` | 11 |
| `for-her` | `FOR HER` | 80 |
| `for-him` | `FOR HIM` | 83 |
| `gift-boxes` | `Gift Boxes` | 1 |
| `men-best-sellers` | `MEN BEST SELLERS` | 17 |
| `men-new-drops` | `men new drops` | 7 |
| `new-drops` | `new drops` | 30 |
| `original-creations` | `Original Creations` | 8 |
| `perfumes` | `perfumes` | 82 |
| `ramadan-drops` | `Ramadan Drops` | 6 |
| `siwa-perfumes` | `siwa fragrances` | 51 |
| `summer-collection` | `Summer Collection` | 21 |
| `unisex` | `UNISEX` | 50 |
| `women-best-sellers` | `WOMEN BEST SELLERS` | 11 |
| `women-new-drops` | `women new drops` | 9 |

Collection title casing is unsystematic: ALL-CAPS (`BEST SELLERS`, `FOR HER`, `UNISEX`), Title Case
(`Summer Collection`, `Gift Boxes`), sentence case (`Body lotion`), and all-lowercase
(`perfumes`, `new drops`, `siwa fragrances`). The theme's uppercase transform masks this on the
storefront, but it will surface anywhere the raw title is used (page titles, alt text, admin).

`black-friday-2025` has 0 products — a stale seasonal collection still published.

---

## 12. Brand voice analysis

Twelve observations, each traceable to a quoted string.

1. **The positioning line is "Explore your Persona."** It sits in the announcement bar on every
   page — the single most-repeated brand statement on the site — and the word recurs as a *product
   description section label* in five PDPs (`<strong>Persona</strong>` in `pink-arrogance`,
   `pink-allure`, `lost-on-you`, `aurableu`, `absolute-drunk`). The brand's core promise is identity,
   not scent: *"Persona — She doesn’t wait to be noticed. She decides when she is."* Any rebuild
   should treat "Persona" as a reserved brand term, not incidental copy.

2. **Two voices coexist and do not match.** The corporate pages are formal and agency-written —
   *"Siwa Fragrances is an esteemed Egyptian maison, weaving heritage and identity into every
   bottle"*, *"our promise is built on three pillars"*. The product copy is colloquial and, at times,
   blunt: *"If you want to smell the sexiest person in this world Wear it !"* (`carnal-trail`),
   *"Its like a date night in a fancy restaurant Its a lady killer !"* (`lady-killer`),
   *"It is irresistible !"* (`irresistible-vanilla`). The rebuild will need to decide which voice
   wins, because the current site runs both.

3. **The value proposition is explicitly "luxury minus the markup."** *"We believe luxury should be
   accessible. By focusing on the juice, not the hype, we deliver exceptional quality at
   revolutionary prices"* (`our-comitments`); *"By fusing masterful craftsmanship with exceptional
   value"* (`about-us`); *"Get the radiant warmth of Armani Power of You at a fraction of the
   price"* (sundaze meta description). "Accessible", "Inclusive Pricing", "revolutionary prices" and
   "a fraction of the price" are the pricing vocabulary.

4. **National identity is a stated pillar, not a decoration.** *"authentically Egyptian and
   accessible"*, *"proving local quality rivals the world's best"* (about-us), *"Egyptian
   Excellence: … proving Egyptian craftsmanship can rival the world's best"* (our-comitments),
   *"Made in Egypt according to standards and international requirements"* (our-story). The
   rival-the-world's-best claim is made **twice, near-verbatim**, on two different pages.

5. **The inspired-by claim is almost never phrased in prose — it is encoded in a data field.** The
   Shopify `vendor` field carries the designer original (`Power Of You Giorgio Armani`,
   `Bleu De Chanel L'exclusif`, `Layton PDM`, `Angels' Share Paradis`, `40 Knots Xerjoff`,
   `Nishane Hacivat`, `Grand Soir MFK`, `Le Male Elixir JPG`, `Delina La Rosée Parfums de Marly`)
   and Prestige renders it as the product-card "vendor" line above the product title, linking to
   `/collections/vendors?q=…`. Only **one** product states the comparison in words —
   `sundaze`'s blockquote: *"**If you love *Armani Power of You*, this is your scent.**"* — and only
   one SEO title uses the word *"Alternative"*. The claim is therefore made everywhere visually and
   almost nowhere verbally: legally cautious, editorially inconsistent.

6. **Uppercase is a design token doing the work of emphasis.** `--heading-text-transform: uppercase`
   with `--heading-letter-spacing: 0.18em` means source strings render as caps regardless of how
   they are typed — which is exactly why the source strings are chaotic: `for her`, `FOR Him`,
   `body lotion`, `body LOTION`, `unisex`, `BODY SPLASHES`, `Shop NOW`, `SHOP NOW`, `View all MEN
   BEST SELLERS` vs `View ALL WOMEN BEST SELLERS`. Nobody noticed because the CSS hides it. A
   rebuild should normalise the stored strings and keep the transform.

7. **Sentence fragments and comma-strings are the house style for scent description.** Almost every
   Format-C product opens with a bare three-word accord line: *"Sweet, woody"* (`lagoon-flair`),
   *"Vanilla, Rum, Tobacco"* (`carnal-trail`), *"Citrus, marine, woody"* (`mawj`),
   *"Marine, salty, woody"* (`marasi`), *"Yum powdery, sweet, fruity"* (`boujee-blush`). Capitalisation
   within these triplets is inconsistent (`Vanilla, Rum, Tobacco` vs `Sweet, woody`).

8. **Scene-setting narrative appears in the older catalogue.** A cluster of products opens with a
   short cinematic vignette in past tense: *"On the deck of a majestic yacht, a gentleman basked in
   the lap of luxury as he sailed across the azure waters"* (`marasi`); *"In a classy hotel bar,
   amidst the soft glow of candlelight and the whispers of conversations, a couple shared a moment
   of intimacy on their elegant date night"* (`hibiscusex`); *"In the dimly lit streets of a
   cosmopolitan city, a man strolled confidently, leaving a trail of allure in his wake"*
   (`male-elixir`). This is a distinct, older editorial mode the newer "Persona / The Story" format
   replaced.

9. **Recurring lexicon.** High-frequency adjectives across descriptions: *warm, creamy, sweet, rich,
   long-lasting, sensual, irresistible, effortless, refined, elegant, addictive, magnetic, quiet
   confidence*. Nouns of promise: *presence, trail, signature, aura, glow, ritual*. The word
   *"sexy"* appears unhedged in three products (`carnal-trail`, `irresistible-vanilla`,
   `layering-vanilla`: *"Sensual vanilla perfume ideal for layering & sexy."*) — a register the
   corporate pages never use.

10. **Punctuation quirks are consistent enough to read as voice, not typos.** The double-dot
    terminator `..` recurs across pages and products: *"Siwa.."*, *"crystal salty lakes.."*,
    *"charm of Siwa Oasis.."*, *"it's a journey..now within your reach"* (`siwa-trail`),
    *"Vanilla Bundle – Your Everyday Glow in Luxury.."*. Exclamation marks are preceded by a space:
    *"Wear it !"*, *"It is irresistible !"*, *"Very comforting & gives a cooling effect !"*,
    *"Where Gourmand Scent meets buttery Warmth !"*. Ampersands are used in place of "and" freely.

11. **Second-person address is used for benefit, third-person for character.** Benefit copy speaks to
    the reader — *"We exist to elevate your daily ritual"*, *"Your payment details are encrypted and
    secure"*, *"specially presented for you"*, *"Join us in redefining luxury."* Character copy
    describes an archetype in third person — *"A man who doesn't follow the room… he owns it"*
    (`absolute-drunk`), *"For those who move with lightness and clarity"* (`aurableu`). The ellipsis
    in *"doesn't follow the room… he owns it"* is a single `…` character.

12. **Transactional copy is terse and under-specified.** The announcement bar says *"Free shipping
    orders over 1500"* with no currency and no verb ("on"/"for" is missing). The popup offers
    *"50 EGP off your first purchase"* with no code, minimum, or expiry. The returns block is
    *"14 days return"* (not "14-day returns"). Two currency notations coexist — `LE` in prices, `EGP`
    in the popup, `ج.م` in collection filters, and a bare `1500` in the announcement bar. This is the
    highest-value copy-cleanup opportunity in a rebuild.

---

## 13. Complete CTA / microcopy string table

Every user-facing short string found in the captured HTML, with location. Use this as the locale /
schema-default reference. **M** = merchant-authored (must be re-entered in the rebuild),
**T** = Prestige theme default (comes free with the theme), **A** = app-owned (Judge.me).

| String (verbatim) | Location | Element | Src |
|---|---|---|---|
| `Explore your Persona. Free shipping orders over 1500` | announcement bar, all pages | `p.prose.heading > strong` | M |
| `Siwa Fragrances` | header logo alt + `sr-only`; copyright | `h1.header__logo` | M |
| `Skip to content` | top of `<body>`, all pages | `a.sr-only` | T |
| `Navigation menu` | mobile hamburger | `sr-only` | T |
| `HOME` | header nav, footer menu | `a.block.h6` | M |
| `SHOP ALL` | header nav, footer menu | `a.block.h6` | M |
| `ORIGINAL CREATIONS` | header nav, footer menu | `a.block.h6` | M |
| `FOR HIM` | header nav, footer menu | `a.block.h6` | M |
| `FOR HER` | header nav, footer menu | `a.block.h6` | M |
| `UNISEX` | header nav, footer menu | `a.block.h6` | M |
| `BUNDLES` | header nav, footer menu | `a.block.h6` | M |
| `BODY SPLASH` | header nav, footer menu | `a.block.h6` | M |
| `BODY LOTION` | header nav, footer menu | `a.block.h6` | M |
| `CONTACT US` | header nav, footer menu | `a.block.h6` | M |
| `Search` | header icon `sr-only`; search input `aria-label` | `sr-only` | T |
| `Search for...` | search drawer input | `input[placeholder]` | T |
| `Cart` | header icon `sr-only`; cart drawer title | `sr-only` / `p.h4` | T |
| `Your cart is empty` | cart drawer empty state | `p.h5.text-center` | T |
| `Login` | mobile sidebar menu | `a` | T |
| `Close` | every drawer / dialog close button | `sr-only` | T |
| `A Gift for Your First Siwa Order` | newsletter popup | `p.h4` | M |
| `Subscribe to our newsletter and receive 50 EGP off your first purchase with Siwa Fragrances` | newsletter popup | `div.prose` | M |
| `Get My Discount` | newsletter popup submit | `button.button` | M |
| `E-mail` | popup + footer newsletter + contact form | `input[placeholder]`, `label.floating-label` | T |
| `🍪 Cookie policy` | privacy banner | `p.h6` | M |
| `We use cookies and similar technologies to provide the best experience on our website. Refer to our Privacy Policy for more information.` | privacy banner | `div.prose.text-xs > p` | M |
| `Accept` | privacy banner | `button.link.text-xs` | T |
| `Decline` | privacy banner | `button.link.text-xs.text-subdued` | T |
| `Summer Drops` | homepage slideshow eyebrow | `p.h6` | M |
| `THE SEASON HAS ARRIVED` | homepage slideshow headline | `p.h1` | M |
| `Shop All` | homepage slideshow CTA 1 | `a.button` → `/collections/all` | M |
| `Summer Collection` | homepage slideshow CTA 2 | `a.button` → `/collections/summer-collection` | M |
| `new in` | featured-collections 1 eyebrow | `p.h6 > strong` | M |
| `men` | featured-collections 1 & 2 tab | `button.h2` | M |
| `women` | featured-collections 1 tab | `button.h2` | M |
| `WOMEN` | featured-collections 2 tab | `button.h2` | M |
| `View MEN NEW DROPS` | featured-collections 1 | `a` → `/collections/men-new-drops` | M |
| `View WOMEN NEW DROPS` | featured-collections 1 | `a` → `/collections/women-new-drops` | M |
| `BEST SELLERS` | featured-collections 2 eyebrow | `p.h6 > strong` | M |
| `View all MEN BEST SELLERS` | featured-collections 2 | `a` → `/collections/men-best-sellers` | M |
| `View ALL WOMEN BEST SELLERS` | featured-collections 2 | `a` → `/collections/women-best-sellers` | M |
| `OFFERS & DISCOUNTS` | image-with-text-overlay eyebrow | `p.h6` | M |
| `OUR BUNDLES` | image-with-text-overlay headline | `p.h2` | M |
| `Shop NOW` | image-with-text-overlay CTA | `a.button.button--outline` → `/collections/bundles` | M |
| `Customers are saying` | Judge.me testimonials carousel | `h2.jdgm-title` | A |
| `4.98 ★ (1176)` | Judge.me carousel header | `span.jdgm-rating-text` | A |
| `Verified` | Judge.me carousel (hidden) | `.jdgm-verified-badge-header.jdgm-hidden` | A |
| `True Elegance` | scrolling-content-2 marquee | `p.scrolling-content__text.heading` | M |
| `our collections` | collection-list heading | `h2.h2` | M |
| `for her` | collection-list tile 1 | `button.button--outline` | M |
| `FOR Him` | collection-list tile 2 | `button.button--outline` | M |
| `bundles` | collection-list tile 3 | `button.button--outline` | M |
| `body lotion` | collection-list tile 4 | `button.button--outline` | M |
| `unisex` | collection-list tile 5 | `button.button--outline` | M |
| `original creation` | collection-list tile 6 | `button.button--outline` | M |
| `best sellers` | collection-list tile 7 | `button.button--outline` | M |
| `new drops` | collection-list tile 8 | `button.button--outline` | M |
| `Signature Luxury` | scrolling-content-1 marquee | `p.scrolling-content__text.heading` | M |
| `Uncover Hidden Gems` | media-grid heading | `h2.h2` | M |
| `ORIGINAL CREATIONS` | media-grid tile 1 heading | `p.h3` | M |
| `TRY NOW` | media-grid tile 1 CTA | `button.button--outline` | M |
| `BODY SPLASHES` | media-grid tile 2 heading | `p.h3` | M |
| `SHOP NOW` | media-grid tiles 2 & 3 CTA | `button.button--outline` | M |
| `body LOTION` | media-grid tile 3 heading | `p.h3` | M |
| `14 days return` | USP block 1 (footer group) | `p.h6 > strong` | M |
| `Returns are accepted for items in their original, unused sealed condition.` | USP block 1 | `div.prose > p` | M |
| `support 24/7` | USP block 2 | `p.h6 > strong` | M |
| `Reach out to us via DM` | USP block 2 | `div.prose > p` | M |
| `Email: contact@siwafragrances.com` | USP block 2 | `div.prose > p` | M |
| `Payment Protection` | USP block 3 | `p.h6 > strong` | M |
| `Your payment details are encrypted and secure.` | USP block 3 | `div.prose > p` | M |
| `Go to item 1` / `Go to item 2` / `Go to item 3` | USP carousel dots | `sr-only` | T |
| `Previous` / `Next` | every carousel control | `sr-only` | T |
| `Main menu` | footer block 1 heading | `p.h6` | M |
| `MORE INFORMATION` | footer block 2 heading | `p.h6` | M |
| `SEARCH` | footer block 2 | `a.link-faded` → `/search` | M |
| `REFUND POLICY` | footer block 2 | `a.link-faded` → `/policies/refund-policy` | M |
| `ABOUT US` | footer block 2 | `a.link-faded` → `/pages/about-us` | M |
| `PRIVACY POLICY` | footer block 2 | `a.link-faded` → `/policies/privacy-policy` | M |
| `Newsletter` | footer newsletter heading | `p.h6` | M |
| `Sign up to our newsletter to receive exclusive offers.` | footer newsletter body | `div.prose.text-subdued > p` | M |
| `Subscribe` | footer newsletter submit | `button.button` | T |
| `Follow on Facebook` / `Follow on Instagram` / `Follow on TikTok` / `Follow on WhatsApp` | footer social icons | `a[aria-label]` | T |
| `© 2026 - Siwa Fragrances` | footer aside | `p.heading.text-subdued.text-xxs` | T (auto) |
| `Zoom picture` | PDP gallery | `sr-only` | T |
| `Sale price` | PDP + product cards | `sr-only` in `sale-price` | T |
| `Regular price` | product cards with compare-at | `sr-only` | T |
| `Size:` | PDP variant picker legend | `legend` | M (option name) |
| `Size chart` | PDP block under variant picker | `a[href="/pages/size-chart-1"][title="Size Chart"]` | M |
| `Variant` | PDP `noscript` select | `label.floating-label` | T |
| `Decrease quantity` / `Increase quantity` | PDP quantity selector | `sr-only` | T |
| `Change quantity` | PDP quantity input | `aria-label` | T |
| `Add to cart` | PDP buy button, in-stock single-variant cards | `button` | T |
| `Choose options` | product cards with variants | `a`/`button` | T |
| `In stock` | PDP inventory | `variant-inventory.text-success > span` | T |
| `Only a few units left` | PDP inventory (low stock) | `variant-inventory > span` | T |
| `Out of stock` | PDP inventory | `variant-inventory > span` | T |
| `Sold out` | product-card badge | `sold-out-badge.badge--sold-out` | T |
| `On sale` | product-card badge | `on-sale-badge.badge--on-sale` | T |
| `New` | product-card custom badge | `.badge` | M (tag-driven) |
| `Recently viewed products` | PDP section heading | `h2.h2` | T |
| `Customer Reviews` | PDP review widget | Judge.me `widget_title` | A |
| `Be the first to write a review` | PDP review widget, 0 reviews | Judge.me | A |
| `Write a review` | PDP review widget | Judge.me `widget_open_form_text` | A |
| `No reviews` | PDP rating badge, 0 reviews | Judge.me inline | A |
| `Filter by` | collection page | facet drawer heading | T |
| `Sort by` | collection page | select label | T |
| `Featured` / `Most relevant` / `Best selling` / `Alphabetically, A-Z` / `Alphabetically, Z-A` / `Price, low to high` / `Price, high to low` / `Date, old to new` / `Date, new to old` | collection sort options | `option` | T |
| `Availability` | collection facet group | `legend` | T |
| `In stock only` | collection facet value | `label` | T |
| `Price` | collection facet group | `legend` | T |
| `ج.م` | collection price-range inputs | prefix span | T (locale) |
| `from price` / `to price` | collection price inputs | `aria-label` | T |
| `View results` | collection facet drawer | `button` | T |
| `Contact` | contact page form section heading | `h2.h2` | M |
| `Name` | contact form | `input[placeholder]` + label | T |
| `Message` | contact form | `textarea[placeholder]` + label | T |
| `Send message` | contact form submit | `button.button` | T |
| `contact us` | contact page rich text heading | `p.h1` | M |
| `WhatsApp us for any inquiries +201066250757` | contact page rich text | `p > strong` | M |
| `Store location: Cairo, Nasr City, The Garden Kiosk Three` | contact page rich text | `p > strong` | M |
| `ABOUT US` | about page heading | `h1.h2` | M |
| `OUR STORY` | our-story page heading | `h1.h2` | M |
| `OUR COMITMENTS` | our-comitments page heading | `h1.h2` | M |
| `Exquisite Ingredients` / `Inclusive Pricing` / `Personalized Service` | about page list | `li > p > strong > span` | M |
| `Uncompromised Quality:` / `Honest Value:` / `Egyptian Excellence:` | our-comitments list | `li > strong` | M |
| `Join us in redefining luxury.` | our-comitments closing line | `p > strong` | M |

---

## 14. Gaps and limitations of this copy deck

| Gap | Detail |
|---|---|
| ~~24 of 56 PDP captures are unusable for copy~~ — **RESOLVED** | The 24 `raw/products/*.html` files that returned a Cloudflare `Verifying your connection...` interstitial in the first scrape pass have been **re-scraped successfully. All 56 of 56 PDP captures are now valid**, so rendered PDP chrome is available for every product and this is no longer a gap. (`raw/products/*.js.json` was *not* re-fetched — ~25 of those remain challenge responses; use `raw/products.json`, which is complete.) |
| Cart line-item / checkout copy | Cart was empty at capture (`raw/cart.js`). Subtotal, checkout button, quantity-update and cart-note strings are **not determinable from captured data**. |
| Search results page copy | `/search` was not captured. Empty-state, result-count and predictive-search strings are **not determinable from captured data**. |
| 404 page copy | Not captured. |
| Policy page copy | `/policies/refund-policy` and `/policies/privacy-policy` are linked from the footer but were not captured. |
| `/pages/size-chart-1` | Linked from every PDP and listed in `raw/sitemap_pages_1.xml`, but not captured — the size-chart table content is **not determinable from captured data**. |
| Blog copy | `/blogs/news` exists (`raw/sitemap_blogs_1.xml`) but was not captured. |
| Related-products heading | No heading exists in the DOM; content is loaded client-side. |
| Homepage `<title>` | Renders as `siwafragrances.com` — the shop's SEO title is unset, not a capture artefact. |
