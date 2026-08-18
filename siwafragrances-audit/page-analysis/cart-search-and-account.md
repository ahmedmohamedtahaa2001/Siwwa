# Cart, search, account and content templates

## Cart

Two surfaces: a **drawer** (`cart-drawer#cart-drawer`, right slide-in ~450px) used everywhere, and a
full `/cart` page (title `Your Shopping Cart`).

Drawer anatomy, top to bottom:

| Element | Detail |
|---|---|
| Header | `CART` + `✕` |
| Line item | vendor · title · price · variant · qty stepper `− 1 +` · `Remove` link |
| Cross-sell | `COMPLETE WITH` — carousel with dot pagination, inline `Add to cart` per item |
| Note | `Add order note` |
| Footer CTA | full-width black `CHECKOUT • LE 380.00` |

Cart API verified working (`/cart/add.js` → 200, `/cart.js` returns `currency: EGP`,
`requires_shipping: true`, empty `attributes`). No cart attributes or custom line properties are in use.

**Gap:** the announcement bar promises *free shipping over 1500*, but the cart shows no progress
toward that threshold — the highest-leverage AOV mechanic on the store is missing at the exact moment
it would work.

## Checkout

Shopify-hosted checkout. Per the store's own `robots.txt`, agents must not complete checkout or
payment, so **the audit stops at cart → checkout hand-off and no order was placed.** Payment method
badges are not displayed on the storefront; `shopify-digital-wallet` is present in `<head>` and
Shop Pay is wired up (`shop.app` pre-auth iframe on load).

## Search

- Trigger: header magnifier, `aria-controls="header-search-…"`.
- Endpoint: `/search/suggest.json` (predictive), verified 200.
- UI: full-width panel drops below the header.
  - **Left — `SUGGESTIONS`:** query completions with the matched substring bolded
    (`layering **vanilla**`, `**vanilla** coco`, `silk **vanilla** lotion`…)
  - **Right — `PRODUCTS` tab:** 4 product cards with vendor, title, price, stars
  - Footer: `VIEW ALL RESULTS` black button
- Only a `PRODUCTS` tab is present — no collection, page or article results surfaced.

## Account

`shop.app` account modules load (`account.js`, Shop Pay pre-auth). Login is reachable from the header
person icon and from a `LOGIN` link pinned to the bottom of the mobile nav drawer. `/account/login`
returns a redirect stub rather than HTML, consistent with **new customer accounts** (one-time-code
sign-in) rather than classic accounts.

No wishlist exists anywhere on the site.

## Content pages

| URL | Title | Meta desc | H1 | Body | Linked from |
|---|---|---|---|---|---|
| `/pages/about-us` | ABOUT US | 320ch | ✓ | 1082ch | Footer |
| `/pages/our-story` | OUR STORY | 320ch (duplicate) | ✓ | 954ch | **nowhere** |
| `/pages/our-comitments` | OUR COMITMENTS | 320ch (duplicate) | ✓ | 1098ch | **nowhere** |
| `/pages/contact` | Contact | — | ✗ | 696ch | Nav `CONTACT US` |
| `/pages/size-chart-1` | Size Chart | — | ✗ | 1233ch | PDP `Size chart` link |
| `/policies/refund-policy` | Refund policy | — | ✓ | 2109ch | Footer |
| `/policies/privacy-policy` | Privacy policy | — | ✓ | 7952ch | Footer |
| `/policies/contact-information` | Contact information | — | ✓ | 620ch | — |
| `/blogs/news` | News | — | ✓ | 606ch | **nowhere** — blog is empty |

### Brand copy (verbatim)

**About us**
> Siwa Fragrances is an esteemed Egyptian maison, weaving heritage and identity into every bottle. We
> exist to elevate your daily ritual with scents that are both a personal signature and a profound
> connection to culture, all while embracing unparalleled comfort.
>
> Our pledge is to redefine luxury, making it authentically Egyptian and accessible. By fusing
> masterful craftsmanship with exceptional value, we earn your trust—proving local quality rivals the
> world's best.
>
> Exquisite Ingredients · Inclusive Pricing · Personalized Service

**Our story**
> Producing high quality niche perfumes which suit different tastes
>
> Siwa.. A breathtaking Egyptian oasis of impressive beauty where golden sands, shining sun eye and
> crystal salty lakes..
>
> A distinctive bouquet of high-quality and carefully selected perfumes specially presented for you
> inspired by the beauty and charm of Siwa Oasis.. Made in Egypt according to standards and
> international requirements

### Missing policies

These are linked nowhere but are the conventional Shopify policy URLs, and all three **return 404**:

- `/policies/shipping-policy`
- `/policies/terms-of-service`
- `/policies/legal-notice`

For a store that ships physical goods and advertises a shipping threshold and a 14-day return
window, having no shipping policy and no terms of service is a genuine commercial and compliance gap.

## Issues found

| Severity | Issue |
|---|---|
| **High** | No shipping policy and no terms of service — both 404. |
| **High** | Cart has no free-shipping progress indicator despite the site-wide 1500 EGP promise. |
| Medium | `our-story` and `our-comitments` are orphan pages — real brand content with no route in. |
| Medium | `about-us`, `our-story` and `our-comitments` share one identical 320-character meta description. |
| Medium | Page slug and title are misspelled: `our-comitments` / `OUR COMITMENTS` (should be *commitments*). |
| Medium | `/blogs/news` exists and is in the sitemap with zero articles. |
| Low | `/pages/contact` and `/pages/size-chart-1` have no H1. |
| Low | `size-chart-1` handle carries a stale `-1` suffix. |
| Low | No wishlist; no payment-method badges on the storefront. |
