# Siwa — Homepage

The Siwa Fragrances homepage: sixteen sections, built on `../component-library/`, rendered with the
real 56-product catalogue, and wired to the feature programme in `../feature-doc/`.

No build step, no framework, no dependencies — plain HTML + CSS + JS, the same architecture as the
component library. Bilingual EN/AR throughout: one toggle flips `dir`, the type families, the
numerals, the layout mirroring, the `<title>`, meta description, canonical and the JSON-LD.

## Run it

```bash
python3 -m http.server 8791 --bind 127.0.0.1 --directory /ahmed-taha-dev/Siwa
# → http://127.0.0.1:8791/homepage/index.html
```

Serve from the **`Siwa/` root**, not from `homepage/` — the page reaches up into
`../component-library/` for the design system, the catalogue and the photography.

## Files

```
homepage/
├── index.html          Document shell, 16 mount points, meta, critical CSS
├── css/homepage.css    Section layout, depth, motion — composes the library, never forks it
├── js/config.js        ALL content: copy, prices, links, handles, quiz, facets, SEO
└── js/homepage.js      Renderers, locale/RTL, cart, quiz, facets, motion, analytics
```

Consumed, never modified: `../component-library/css/tokens.css` (palette, type, spacing, radius),
`css/components.css` (`.btn` `.chip` `.stars` `.input` `.langtog` `.stamp` …),
`js/data.js` (56 real products), `img/` (the 3 real photographs).

## The sixteen sections

| # | Section | Feature codes |
|---|---|---|
| 1 | Announcement bar | F-02 |
| 2 | Header — dual-track: commerce ∣ House of Siwa | A-03, A-04 |
| 3 | Hero — 5 depth layers, parallax, float loop | E-01 |
| 4 | **USP bar, directly under the hero** | E-05, D-03 |
| 5 | **Reviews, loud** — 4.98★, distribution histogram | D-02 |
| 6 | **Scent finder** — 3 questions → 5 personas → a *pair* | A-02 |
| 7 | **Shop by mood** — live facets with counts | A-01 |
| 8 | Original Creations — Siwan mark, provenance stamp, notes | B-02, E-03 |
| 9 | Inspired By — neutral mark, price contrast | B-04 |
| 10 | **Build your set** — bundle builder ∣ layering | C-01, C-02 |
| 11 | House of Siwa — four pillars, vintage layer, attribution | E-02, E-04 |
| 12 | Best sellers rail — ranked by real review count | — |
| 13 | Reviews showcase — sortable, verified | D-02 |
| 14 | Recently viewed | A-05 |
| 15 | Stay close — referral (WhatsApp-first) + newsletter | F-01, F-02 |
| 16 | Footer | — |

Plus, in the overlays: cart drawer with **free-shipping progress**, **cross-sell driven by shared
scent family**, and **gift messaging** (C-03, F-03, C-04); predictive search (A-04); wishlist that
rehydrates from `localStorage` (C-05); and **back-in-stock capture on every sold-out card** (D-04).

## What changed from the first pass, and why

The first build was a faithful transcription of the section brief. It read as a stack of bordered
boxes on one flat cream ground — correct, and inert. This pass rebuilds it for conversion:

- **Rhythm.** The page now alternates ground — dark hero → dark USP → cream proof → canvas → cream
  → canvas → **dark House of Siwa** → canvas → cream → dark close. No two adjacent sections read
  the same, so the eye keeps moving.
- **A cinematic hero.** Five depth layers (kershef ground, gold atmosphere, horizon rule, the
  bottle, type), rAF parallax, a 9s float loop, and display type at `clamp(52px, 8.5vw, 116px)`.
- **Cards became photography, not boxes.** Borderless, image-led, hairline and CTA revealed on
  hover, price and CTA bottom-anchored so a row aligns regardless of line count.
- **Three interactive conversion features replaced three static cards.** The old "Discovery" row
  linked out to pages that do not exist. It is now a working quiz, working facets, and a working
  bundle builder — all operating on the real catalogue.
- **Social proof got loud.** 4.98★ at 108px with a real distribution histogram, above every grid.

## Zero hardcoded content

`config.js` holds every merchant-editable value; `index.html`, `homepage.css` and `homepage.js`
hold none. This is MultiAgentsWorkFlow **Law 1** in static form, and it makes the Liquid port
mechanical rather than a rewrite:

| Here | Becomes |
|---|---|
| a top-level `config.js` key | one `{% schema %}` block |
| a leaf `{en, ar}` pair | one `text`/`richtext` setting + locale entries |
| an array (nav, facets, quiz questions, personas, USP, footer) | schema **blocks**, never a fixed loop |
| a product handle | a `product` / `collection` setting |

Products are referenced **by handle only** — every title, price, rating, review count, note and
stock state resolves from the catalogue at render time, so nothing here can go stale on its own.

## Deviations and judgement calls — deliberate, documented

**1. The `vintage` skill was not used as written.** `skills/vintage/` is a third-party 1950s–90s
system on a teal `#008080` / silver `#C0C0C0` palette with Silkscreen pixel type. Applied to an
Egyptian perfume house it would destroy the brand. The project has **its own** vintage layer —
`DesignSystem.md §10`, already implemented in `tokens.css` as paper grain, vignette and the
`.stamp` motif — and that is what ships, restricted to the House of Siwa pillars and the
provenance mark. `Siwa/README.md §2` says only `MultiAgentsWorkFlow.md` is binding; the other two
skill folders are generic imports.

**2. `epic-design` applied with restraint.** Its depth model, parallax, masked line reveals,
staged entrances, GPU-safe property list and reduced-motion rule are all in. Its heavier
scrollytelling patterns (pinned scrub timelines, card stacks, section peels) are not: this is a
storefront whose job is to shorten the path to a product page, and the skill's own note says to
run `page-cro` *after*. It also mandates GSAP via CDN — rejected, because the component library
has no dependencies and a CDN script is a third-party request on the critical path. Parallax runs
off one `requestAnimationFrame` loop instead.

**3. White on gold is gone.** The brief specifies `#fff` on `#b18044` — 3.48:1, fails AA. The page
uses the library's `--on-primary` (#212012, 4.72:1).

**4. Sharp corners, not 10px.** `tokens.css` ships `--r-md: 0` per the client direction of
2026-08-12, which post-dates the brief. Reverting is one line in tokens.

**5. Two added AA tokens.** `--text-secondary-aa` and `--link` clear 4.5:1 on `--canvas` but fall
to 3.91:1 and 4.16:1 on `--surface-card`. `--text-secondary-on-card` (5.00:1) and `--link-on-card`
(5.14:1) are applied only on card grounds. `tokens.css` is untouched.

**6. Catalogue figures beat the brief's figures.** The brief quotes Mawj at 850, Layering Vanilla
at 375, Boujee Blush at 925; the catalogue says 800, 450, 500. The page writes no price at all.

**7. No invented numbers.** The brief's "Join 12,000+ subscribers" is not published anywhere by
the store, so `newsletter.socialProof` ships `null` and the line does not render.

**8. Arabic carries equal visual weight, sized by eye.** Aref Ruqaa's optical size runs far larger
than its point size, so the hero Arabic is set at `.72em` of the Latin and renders level with it.
Equal weight is not equal px.

## What is real vs. derived vs. illustrative

| Real | Derived | Illustrative |
|---|---|---|
| 56 products, prices, variants, stock, ratings, review counts | **Scent families** (see below) | `inspiredBy` retail prices — placeholders, not sourced |
| Review bodies in EN and AR, verbatim from the July 2026 capture | Cross-sell pairings (shared family) | Review dates and helpful counts |
| 1,212 @ 4.98★ live, 2026-08-12 | | Persona → product mapping |
| Rating distribution (804×5★, 16×4★ of 820) | | Referral link and code |
| Free-shipping threshold, bundle set price | | |
| Note pyramids for the 18 products that have them | | |

> **Scent families are derived, not authored.** Feature B-01 (the note taxonomy) has not been
> migrated — zero metafields exist and only 18 of 56 products carry parseable notes. Until it
> ships, `config.mood.families` matches keyword lists against each product's title, notes and
> description. The term lists are in config so the mapping stays editable and auditable rather
> than hidden in code. Replace the whole block with a metafield read once B-01 lands.

> **The retail-price contrast is a legal decision, not a UX one.** feature-doc marks B-04
> *Blocked on counsel* — Oakcha operates in the US, Siwa in Egypt. A disclaimer renders under the
> grid, and `config.inspired.showRetailContrast: false` removes every comparison in one edit.

> **The 5★ skew is shown, not smoothed.** 804 of 820 attributable reviews are 5★ with none below
> 4★, under manual approval. `_CORRECTIONS.md` records this as a credibility question to resolve
> before the corpus is promoted externally. The histogram shows it honestly.

## Known gaps

- **Photography is the binding constraint.** 50 of 56 products have exactly one image and 100%
  have null alt text. Only 3 have a primary photo here and 2 have a second, so hover-swap works on
  Mawj and Coco Woods alone; everything else renders the bottle placeholder. This is a photography
  brief, not a code fix (feature-doc B-06).
- **No Siwa Oasis photograph exists in this repo.** Rather than substitute stock desert imagery,
  the House of Siwa ground is woven from the five embroidery colours over the kershef weave. Set
  `config.house.backgroundImage` and it takes over.
- **Arabic product names need translation sign-off.** 12 working renderings in
  `config.productNamesAr`; only `mawj → موج` is attested on the bottle. Missing handles fall back
  to the Latin title — correct behaviour, not a bug.
- **The Siwan sunburst is still placeholder geometry.** The real motif must be drawn from the
  embroidery reference, not substituted with a star.
- **Cultural sign-off is a prerequisite**, not a polish step — stated in the House of Siwa section
  itself rather than buried here (feature-doc E-03).
- Quiz scoring is a simple match count; personas are authored, not learned.
- Cart, wishlist, search and facets are client-side over the embedded catalogue — no Storefront
  API, no predictive-search endpoint.
- No PDP exists, so product clicks are recorded (feeding recently-viewed) and suppressed.

## QA — measured, not assumed

Driven headless in Chromium at 1440px and 390px, both locales:

| Check | Result |
|---|---|
| Console errors / failed requests | **0** |
| All 16 sections render, both locales | pass |
| WCAG AA contrast — 69 pairs across every ground and interactive state | **0 failures** |
| Images without `alt` | **0** |
| Interactive elements without an accessible name | **0** |
| Horizontal overflow at 1440 / 390 | none |
| Locale switch flips dir, lang, title, meta, canonical, numerals, layout | pass |
| Quiz → persona → pair, add both to bag | pass (`The Poet` → Coffee Vanilla + Layering Vanilla) |
| Facets — Woody 33 → +Siwan originals 7 | pass |
| Bundle builder → 1,105 EGP set price, saving 745 EGP, 3 lines added | pass |
| Free-shipping progress, cross-sell, gift note | pass |
| Layering combo → Mawj + Layering Vanilla, 1,250 EGP | pass |
| Back-in-stock capture on sold-out cards | pass |
| Search, rail paging, review sort, recently-viewed | pass |
| Analytics events fired in one session | 28 distinct |
| JSON-LD | Organization + 8 Products with `aggregateRating` (D-01) |

The contrast harness composites `color-mix(…, transparent)` foregrounds over their true rendered
ground — an earlier version mis-parsed Chrome's `color(srgb …)` output as 0–255 and reported ten
false failures.

## Exposed for QA

```js
window.SIWA_HOMEPAGE.setLocale('ar')   // flips the whole document
window.SIWA_HOMEPAGE.locale            // 'en' | 'ar'
window.SIWA_HOMEPAGE.cart              // [{handle, variant, price, qty}]
window.SIWA_HOMEPAGE.wishlist          // [handle]
window.SIWA_HOMEPAGE.ui                // quiz / facet / bundle state
window.SIWA_HOMEPAGE.familiesOf(p)     // derived scent families for a product
window.SIWA_HOMEPAGE.render()          // re-render every section
```

Motion is disabled wholesale under `prefers-reduced-motion` and on coarse pointers; toggle it in
`config.motion` without touching markup.
