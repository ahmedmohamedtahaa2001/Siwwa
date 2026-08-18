# Siwa Fragrances — Deep Site Audit

**Site:** https://siwafragrances.com · **Audited:** 16 August 2026
**Method:** Playwright (Chromium) for rendering, interaction and computed styles; direct HTTP for
sitemaps, Shopify JSON endpoints and full-page HTML. 96 pages fetched and parsed, 60 products and 19
collections reconciled against live storefront data, 5 viewports measured.

---

## 1 · Executive summary

Siwa Fragrances is an Egyptian "inspired-by" fragrance house running **Shopify** on the
**Prestige** theme (v11.1.0, theme store #855), a theme copy named *"Updated copy of Prestige"*
(id `141667663920`), on shop `3c3u3n-qt.myshopify.com`. Storefront is EGP / Egypt / English.

**The storefront itself is in good shape.** Prestige is a well-built theme, it is being used close to
stock, the design system is unusually disciplined, images are WebP-optimised by the Shopify CDN,
first paint is fast, and the social proof is genuinely strong — **4.98 stars from 1,225 verified
Judge.me reviews**.

**The problems are in data and discoverability, not in the front end.** Three findings dominate:

1. **The catalogue is not merchandisable.** Size options are spelled 20+ different ways, 59 of 60
   products have no `product_type`, 19 have no tags, and every variant weighs 0 g. This is why
   collection pages offer only two filters, why a size facet cannot exist, and why weight-based
   shipping rates are impossible.
2. **The site is close to invisible to search.** The homepage `<title>` is literally
   `siwafragrances.com`. Every one of the 20 collection pages lacks both an `<h1>` and a meta
   description. 58 of 60 products use the bare product name as their title — yet two products
   (`purevelle`, `sundaze`) already demonstrate the correct pattern.
3. **The `vendor` field holds a competitor's product name and is published as `brand`.** Structured
   data currently tells Google that "Lost On You" is made by the brand "Lost In Paris Roja". This is
   a commercial and legal exposure, not just a data-modelling wrinkle.

Add to that: **35% of variants are out of stock**, 14 products are entirely sold out, two live
collections contain zero products, and there is no shipping policy or terms of service.

**Rebuild complexity: Medium.** The presentation layer is a faithful, near-stock Prestige
implementation and is straightforward to reproduce. The genuine work is catalogue remediation and
an SEO/content layer — neither of which is front-end work.

---

## 2 · Platform and stack

| | |
|---|---|
| Platform | Shopify |
| Shop domain | `3c3u3n-qt.myshopify.com` |
| Theme | Prestige 11.1.0 (theme store id 855) — copy id 141667663920 |
| Currency / market | EGP, Egypt, locale `en`, `dir=ltr` |
| Reviews | Judge.me (`judgeme-707` extension) — 4.98 ★ / 1,225 reviews |
| Analytics / ads | Facebook Pixel (`1058808052839193`) + domain verification, Shopify Web Pixels, Trekkie, Shopify perf-kit |
| Commerce features | Shop Pay, Shop cart sync, Shopify Chat, new customer accounts, consent-tracking API |
| Agentic commerce | `agents.md`, `/.well-known/ucp`, `/api/ucp/mcp`, `sitemap_agentic_discovery.xml` — the store is UCP/MCP-enabled |
| Fonts | Poppins, served from Shopify's font CDN (no Google Fonts request) |

### Performance (warm cache, 1440px desktop)

| Metric | Value |
|---|---|
| TTFB | 23 ms |
| First Contentful Paint | 472 ms |
| Largest Contentful Paint | 1044 ms |
| DOMContentLoaded / Load | 578 ms / 915 ms |
| Requests | 300 |
| Images | 46 — 37 lazy, 46 with `srcset`, 0 missing dimensions |

Image delivery is already correct: the CDN negotiates WebP (124 KB vs 179 KB JPEG for the same
asset), every image carries `width`/`height` so there is no layout shift, and 2% of images lack alt
text. Console errors are limited to benign Shop Pay iframe/CSP noise.

---

## 3 · Sitemap

| Template | Count |
|---|---|
| Home | 1 |
| Product | 60 live (61 in XML sitemap) |
| Collection | 19 |
| Page | 5 |
| Blog / article | 1 / **0** |
| Policy | 2 live, **3 return 404** |
| Cart, search, login, 404 | 4 |

Full URL list and per-collection counts: `sitemap.json`.

**Navigation is flat.** One menu, ten items, no dropdowns or mega-menu on any breakpoint:
`HOME · SHOP ALL · ORIGINAL CREATIONS · FOR HIM · FOR HER · UNISEX · BUNDLES · BODY SPLASH · BODY
LOTION · CONTACT US`. Footer adds only `SEARCH · REFUND POLICY · ABOUT US · PRIVACY POLICY`.

---

## 4 · Design system

Full tokens in `design-system/` and `extracted-styles.css`. The short version:

**Colour** — strictly monochrome. `#FFFFFF` background, `#1C1C1C` text (never pure black), `#DDDDDD`
hairlines. The only chromatic values in the entire system are gold `#FFD700` (sale badge + review
stars) and red `#E32C2B` (sold-out badge). `--accent` is set to the same value as `--text`, so the
theme's accent slot is unused. **All warmth in the brand comes from photography, not CSS.**

**Type** — one family, one weight: Poppins 400. Hierarchy is built entirely from size, uppercase and
a very wide **0.18em letter-spacing** on headings and buttons. That tracking is the single strongest
signature of the site. Body is 14px/1.65. Headings use fluid `clamp()`.

*Not in the CSS:* the "Summer.2026" script wordmark and the italic-serif fragrance-note labels are
baked into image assets. A rebuild must either source those typefaces or re-cut the artwork.

**Shape** — a zero-radius system. Buttons, inputs, badges and swatches are all square. Shadows are
defined but effectively unused; separation comes from hairline borders. The one exception is the
Shopify Chat widget at 16px radius, which is visibly foreign.

**Layout** — container gutter 48px, max widths 440 → 1360px, section spacing 64px. Note that
`--section-vertical-spacing-tight` has been overridden to equal the default, so "tight" sections
aren't actually tighter.

**Breakpoints** — mobile-first: 700px (67 uses), 1000px (33), 1150px (13), 1400px (5). All hover
styling is correctly gated behind `(pointer: fine)`, and `prefers-reduced-motion` is honoured.

**Product grid** — 2-up (375) → 3-up (700) → 3-up + sidebar (1000) → 4-up (1440), with gaps growing
from 35/10px to 64/60px.

**Motion** — buttons animate over 0.45s on `cubic-bezier(.785,.135,.15,.86)` using a
background-size/position *wipe* rather than a colour fade. Drawers 0.25s, inputs 0.1s.

---

## 5 · Catalogue

**60 products · 170 variants · 19 collections · EGP 350–2300** (median 900).

Every live product belongs to at least one collection, and the union of all collections is exactly
the 60 live products — no orphans.

### Availability

| | |
|---|---|
| Out-of-stock variants | **59 / 170 (34.7%)** |
| Fully sold-out products | **14 / 60 (23.3%)** |

Sold out entirely: Siwa Trail, Lost On You, Absolute Drunk, Bleu Intense, Silk Vanilla Body Lotion,
Vanilla Bundle, Sweet Oud, Layering Apple, Stellar Nights, Layering Pistachio, Irresistible Vanilla,
Mawj, Citrine, Alluring Rose.

Several of these are best-sellers — on the homepage BEST SELLERS row, half the visible cards carry a
`SOLD OUT` badge. There is no back-in-stock capture anywhere.

### Pricing data

- **19 genuine discounts**, all on bundles plus *Belle Riche* (15–33% off).
- **69 variants carry `compare_at_price: "0.00"`** — junk data. It happens to be harmless to render
  (Shopify ignores a compare price below the sale price) but it will corrupt any feed, analytics or
  discount logic built on top of it.

### Structure

| Field | State |
|---|---|
| `product_type` | Empty on **59 / 60** (only "body lotion" is set) |
| `tags` | **19 / 60 have none** — Men 30, Women 27, Best Selling 24, new 9, Unisex 4, Bundles 3 |
| `sku` | Missing on **56 / 170** variants |
| `grams` | **0 on all 170 variants** |
| Images | **54 / 60 have exactly one image** |
| Option names | **20+ inconsistent spellings** — see `page-analysis/product-page.md` |

Because gender lives in free-text tags rather than a metafield or product type, and 19 products carry
no tags at all, the FOR HIM / FOR HER / UNISEX collections cannot be complete.

### The `vendor` field

`vendor` stores the designer fragrance each Siwa scent is inspired by — 46 distinct values across 60
products, of which 44 name third-party fragrances (Xerjoff Erba Pura, Layton PDM, Lost In Paris
Roja, Bleu De Chanel, Kayali, Tom Ford Lost Cherry…). It is printed on every product card and
product page, **and emitted as `brand` in `Product`/`ProductGroup` JSON-LD** — verified:

```json
{"@type": "ProductGroup", "name": "Lost On You",
 "brand": {"@type": "Brand", "name": "Lost In Paris Roja"}}
```

The "inspired by" positioning is a legitimate and common business model, and the comparison is
clearly useful to customers. The problem is purely that it occupies the field Shopify, Google
Merchant Center and schema.org all read as *manufacturer*. It belongs in a dedicated
`inspired_by` metafield, with `vendor` set to `Siwa Fragrances`.

---

## 6 · Feature matrix

| Feature | Status |
|---|---|
| Cart drawer + `/cart` page | ✅ |
| Cross-sell in cart (`COMPLETE WITH`) | ✅ |
| Order note | ✅ |
| Predictive search with suggestions | ✅ |
| Collection filtering | ⚠️ Availability + Price only |
| Sorting | ✅ |
| Grid density switcher | ✅ |
| Reviews (Judge.me, 1,225) | ✅ |
| Related products | ✅ |
| Newsletter pop-in + footer signup | ✅ |
| Cookie consent (Accept/Decline) | ✅ |
| Shop Pay / digital wallets | ✅ |
| Customer accounts (new, OTP) | ✅ |
| Shopify Chat | ✅ |
| Facebook Pixel | ✅ |
| Product JSON-LD | ✅ (but wrong `brand`) |
| Agentic commerce (UCP/MCP) | ✅ |
| Size chart | ✅ |
| **Free-shipping progress bar** | ❌ |
| **Back-in-stock notification** | ❌ |
| **Wishlist** | ❌ |
| **Shipping policy / ToS** | ❌ 404 |
| **Collection descriptions** | ❌ 0 / 19 |
| **Blog content** | ❌ 0 articles |
| **Multi-currency / multi-language** | ❌ single EGP/English |
| **Sticky header** | ❌ disabled |
| **Payment badges on storefront** | ❌ |

---

## 7 · Findings, ranked

### Critical

**C1 · `vendor` publishes a third-party fragrance as `brand`.**
Move to an `inspired_by` metafield; set `vendor` to `Siwa Fragrances`. Keep displaying the reference
on the PDP if it converts — just stop declaring it as the manufacturer in structured data.

**C2 · Collection pages have no `<h1>` and no meta description.**
18/20 lack an H1 entirely; 20/20 lack a description. Titles are bare lowercase handles
(`perfumes`, `new drops`). These are the pages that should rank for category demand.

**C3 · Homepage has no SEO or social metadata.**
`<title>` is `siwafragrances.com`; no meta description, no `og:image`. Every share of the homepage
renders as a bare URL.

**C4 · Option naming inconsistency blocks merchandising.**
20+ spellings of one "Size" option (`size`/`Size`, `100 ml`/`100ML`/`100`, product names embedded in
option names, `Layerng` typo). Normalise to one option named `Size` with values `30 ml / 50 ml /
100 ml`, then a size facet becomes possible.

**C5 · No shipping policy, no terms of service.** Both 404 on a store that ships physical goods,
advertises a shipping threshold and offers a 14-day return window.

### High

**H1 · 35% of variants out of stock; 14 products fully sold out** — with no back-in-stock capture.
Every sold-out best-seller is currently a dead end.

**H2 · No free-shipping progress in cart.** The 1500 EGP threshold is announced site-wide and never
mentioned again at the point of purchase.

**H3 · Product titles waste the store's best keyword opportunity.** 58/60 are the bare product name.
`purevelle` and `sundaze` already use the right pattern —
`Purevelle Perfume | Xerjoff Erba Pura Alternative in Egypt` — which targets exactly how this
customer searches. Roll it out catalogue-wide.

**H4 · Two live collections contain zero products** (`gift-boxes`, `black-friday-2025`), both in the
XML sitemap.

**H5 · `product_type` empty on 59/60 and 19 products untagged**, so gender/category collections are
structurally incomplete.

### Medium

- **M1** · Description template (Persona / The Story / Notes / Best For) applied to only 6–14 of 60 products.
- **M2** · 54/60 products have a single image; card hover-swap is inert for 90% of the catalogue.
- **M3** · 69 variants carry `compare_at_price: "0.00"`.
- **M4** · `our-story` and `our-comitments` are orphan pages with real brand copy and no route in.
- **M5** · Slug and title misspelled — `our-comitments` / `OUR COMITMENTS`.
- **M6** · `about-us`, `our-story`, `our-comitments` share one identical meta description.
- **M7** · Price facet labelled `ج.م` while all prices render `LE` — two EGP symbols in one UI.
- **M8** · 56/170 variants have no SKU; all 170 weigh 0 g.
- **M9** · Media-grid tiles set white text on pale photography with no scrim.
- **M10** · Reviews are largely Arabic on an English-only storefront — a strong signal that an Arabic locale is warranted.
- **M11** · `/blogs/news` live and in the sitemap with zero articles.

### Low

- Inconsistent casing across titles and collections (`summer elegance`, `Lady killer`, `perfumes`, `body LOTION`).
- `Best For` list items concatenate without separators on at least one PDP.
- `size-chart-1` handle carries a stale `-1` suffix.
- `black-friday-2025` still exposed in the sitemap.
- Newsletter pop-in fires immediately on load, over the hero.
- Two marquee bands within four sections of each other.

---

## 8 · Recommendations for the rebuild

**Do first — data, before any code.** These fixes pay off on the current site and are prerequisites
for a better one:

1. Normalise the Size option across all 60 products (C4).
2. Move `vendor` → `inspired_by` metafield; set `vendor` = `Siwa Fragrances` (C1).
3. Populate `product_type`, complete tags, add real weights and SKUs (H5, M8).
4. Clear the 69 junk `compare_at_price` values (M3).

**Then the SEO/content layer**, which is where the largest untapped traffic sits:

5. Titles and meta descriptions for home, all 20 collections, and all 60 products — using the
   `<Product> Perfume | <Designer> Alternative in Egypt` pattern already proven on two PDPs (C2, C3, H3).
6. Add an H1 and a short description to every collection page (C2).
7. Publish shipping policy and terms of service (C5).
8. Link `our-story` and `our-commitments` into the footer; fix the slug (M4, M5).

**Commercial mechanics** — likely the fastest revenue wins:

9. Free-shipping progress bar in the cart drawer (H2).
10. Back-in-stock notification on sold-out PDPs (H1).
11. Extend faceting to size, gender and scent family once the data supports it (C4).

**Consider strongly:** an Arabic locale. The customer base is writing its reviews in Arabic on an
English-only storefront (M10).

**Keep as-is.** The visual design is coherent and well-executed — monochrome palette, single-weight
Poppins, 0.18em tracking, zero-radius geometry, photography carrying all the warmth. Reproduce the
tokens in `extracted-styles.css` faithfully. The near-stock Prestige implementation is a feature, not
a shortcoming: it is fast, accessible on hover/reduced-motion, and responsive without custom work.

---

## 9 · Confidence

| Area | Confidence | Note |
|---|---|---|
| Platform, theme, integrations | 10/10 | Read from `Shopify.theme` and asset URLs |
| Product catalogue data | 10/10 | Complete `products.json`, reconciled with per-collection endpoints |
| Design tokens | 10/10 | Resolved custom properties + `getComputedStyle` |
| Responsive behaviour | 9/10 | Measured at 5 widths on collection + home |
| Page structure / sections | 9/10 | Section IDs, heights and headings extracted per template |
| SEO analysis | 9/10 | 96 pages parsed; 15 initially Cloudflare-challenged, all re-fetched and verified |
| Cart / search behaviour | 8/10 | Exercised live; checkout deliberately not completed |
| Performance | 6/10 | Warm-cache single run — directional only, not a substitute for Lighthouse/CrUX |
| Review platform internals | 6/10 | Judge.me aggregate read from the rendered widget, not its API |

**Not covered:** checkout completion (prohibited by the store's `robots.txt` and by policy), admin-side
configuration, live traffic/conversion analytics, email flows, and the 24-ish unpublished products
implied by the gap between stored `products_count` and live catalogue.

---

## 10 · Deliverables

```
siwafragrances-audit/
├── FINAL-AUDIT-REPORT.md          this document
├── products.json                  60 products, 170 variants, full schema
├── sitemap.json                   all URLs, per-collection live vs stored counts, known 404s
├── extracted-styles.css           reconstructed design tokens + components
├── design-system/
│   ├── colors.json                palette with hex + role
│   ├── typography.json            families, scale, tracking, computed samples
│   ├── spacing.json               containers, sections, responsive grid map, breakpoints
│   └── components.json            full component inventory incl. homepage section order
├── content/                       extracted copy per page (11 files) + _index.json
├── page-analysis/
│   ├── homepage.md                section-by-section breakdown
│   ├── collection-page.md         template, facets, responsive table, count reconciliation
│   ├── product-page.md            buy box, vendor finding, description template, variants
│   └── cart-search-and-account.md cart, search, account, content pages, policies
├── screenshots/                   home (1440/768/375), product, collection, cart drawer,
│                                  predictive search, mobile menu
└── raw/                           96 page HTMLs, sitemaps, Shopify JSON, theme.css/js,
                                   CSS variable dumps, colour schemes, SEO parse output
```
