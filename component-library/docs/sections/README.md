# Sections — Phase 4

24 Shopify sections, each with a complete `{% schema %}`. Every one composes the Phase 1–3
snippets; **none contains component CSS or markup of its own.**

Detailed notes live in each section's own `{% comment %}` header — that is where a developer
looks. This file is the map and the decisions.

## The 24

### Core — always present

| Section | Variants | Notes |
|---|---|---|
| `header` | flat · logo-left · mega · sticky · bilingual | Menu is a `link_list`, not blocks — Navigation already owns structure |
| `footer` | light · dark · minimal · mega · heritage | **Carries the clickable contact links the live store lacks** |
| `announcement-bar` | static · rotating · countdown · sticky · bilingual | Messages are blocks |
| `cart-drawer` | simple · recommended · shipping · layering · bundle | Free-shipping threshold is a setting (default 1,500 EGP) |
| `newsletter-popup` | modal · bar · two-step × time/exit/scroll triggers | Native `<dialog>` |

### Templates

| Section | Variants | Notes |
|---|---|---|
| `main-product` | standard · sticky · tabs · wide · heritage | **Two templates, one section** — see below |
| `main-collection` | sidebar · topbar · drawer · chips · infinite | AJAX facets over a real form |

### Content

| Section | Variants |
|---|---|
| `hero` | image · slideshow · split · video · cinematic |
| `featured-collections` | tabs · carousel · grid · mega · storytelling |
| `storytelling` | single · two-column · timeline · cinematic · artisan |
| `reviews` | carousel · grid · single · trust · video |
| `image-text-overlay` | centered · aligned · split · parallax · vintage |
| `text-columns` | icon · split · overlay · step · heritage |
| `media-grid` | even · asymmetric |

### Commerce & utility

| Section | Notes |
|---|---|
| `scent-quiz` | Hosts quiz-flow. The largest missing feature per BENCHMARK Part 1 §3.5 |
| `layering` | Hosts layering-picker |
| `scrolling-marquee` | 1–2 rows, reversible, motion-suppressed |
| `faq` | `<details>`/`<summary>` — works with zero JavaScript |
| `contact-form` | Native `{% form 'contact' %}` + clickable contact block |
| `rich-text` · `video` · `instagram-feed` · `logo-list` · `spacer` | Utility |

## Decision: two product templates, one section

`01-SITE-STRUCTURE.md` §545 records that the live store's two product templates (50 default,
6 body-splash/lotion) **differ in their Judge.me app section IDs**, and instructs: *"Must be
recreated as two `product.*.json` templates and reassigned per product."*

So the split lives in `templates/product.json` and `templates/product.body-splash.json` — two
template files, each with its own block configuration and therefore its own Judge.me app block
instance. Both render `main-product.liquid`.

- **Duplicating the section** would fork ~400 lines of Liquid to vary a handful of settings.
- **Merging the templates** would collapse the two Judge.me instances into one and break reviews
  on six products.

The template layer is exactly where Shopify intends this distinction. Assign the body-splash
template to the six products in the admin.

## Decision: the footer's contact links are the point

`00-OVERVIEW.md` §5 and anomaly 9: the live store prints its email address and WhatsApp number as
**plain text with no `mailto:`, `tel:` or `wa.me` anchor anywhere** — a grep across every captured
page returned zero. Its own copy tells customers to "reach out", then gives them nothing to tap.

`footer` and `contact-form` both carry a contact block that makes all three clickable. The real
values ship as schema **defaults** — they are settings, so a merchant can change them, but nobody
has to type them in to get a working footer.

`tel:` strips spaces and punctuation from the displayed number; the display keeps its formatting.

## Where merchant-facing text lives

| File | Holds |
|---|---|
| `locales/en.default.json` / `ar.json` | Storefront strings customers read |
| `locales/en.default.schema.json` | Theme-editor labels merchants read |

**505 `t:` keys** are referenced across the theme. Arabic storefront strings are complete,
including plural forms (`zero`/`one`/`two`/`few`/`many`/`other`).

⚠ **`ar.schema.json` was not authored.** Theme-editor labels are English only. That affects the
merchant editing the theme, not the customer browsing it — the storefront is fully bilingual. Add
it if the store will be administered in Arabic.

## Accessibility decisions worth keeping

- **Tabs** (`product-grid`, `main-product`) are real ARIA tabs with roving tabindex and arrow keys,
  reversed under RTL. Inactive panels use `hidden`, staying out of the tab order.
- **FAQ** uses `<details name="...">` — one-open-at-a-time is browser behaviour, not JavaScript.
- **Popup** is a native `<dialog>`, so focus trapping, Escape and the backdrop come free.
- **Drawer** moves focus in, restores it on close, and closes on Escape.
- **Rotating hero and announcement** stop on hover, on focus-within, and permanently once a control
  is used — WCAG 2.2.2. `autoplay` defaults **off**.
- **Marquee** is `aria-hidden` with a visually-hidden static equivalent, and the
  `prefers-reduced-motion` block in `tokens.css` stops it dead.
- **Facets** are real inputs in a real `<form>`: with JavaScript off the page reloads filtered.
- **Collection cards** are one `<a>` with one tab stop; the CTA renders as inert text.
- **Marquee, parallax, card lift** all respect `prefers-reduced-motion`; parallax additionally
  bails on coarse pointers.

## Still open

| Item | Blocks |
|---|---|
| Judge.me markup never run against a live install | Ratings on every surface |
| `ar.schema.json` not authored | Arabic theme editor |
| Metafields (`fragrance.*`, `inspired_by.*`) do not exist | Notes, Arabic titles, price contrast |
| Facets not configured in Search & Discovery | Tag, vendor and size filtering |
| Persona archetypes undefined | Quiz `persona` variant |
| Vendor/dupe posture undecided | `product-register.liquid` — one file changes |
