# Siwa — Component Library

**85 components × 5 variants = 425 variants**, built on the Siwa design system and rendered with
the real 56-product catalogue. No build step, no framework, no dependencies. Plain HTML + CSS + JS.

Covers the full 78-component brief: Primitives (15) · Product (15) · Navigation (9) ·
Commerce (10) · Discovery (6) · Content (12) · Social Proof (5) · Layout (7) · Marketing (6).
Every variant carries a **When to use** note.

**Seven components were added 2026-08-13** for the Shopify theme transplant (`../siwa-theme/`):

| Component | Group | Why it was added |
|---|---|---|
| `Card` | Primitives | Base container the card patterns compose. No existing equivalent. |
| `ProductCardLayout` | Product | The *layout styles* the theme exposes as a setting — six since the card was unified: minimal · editorial · compact · hero · feature (full bleed) · vintage, plus `bare` for image-led pages. `ProductCard` above documents the five *states* — same `.pcard` markup and CSS, two axes, not a fork. |
| `CollectionCard` | Content | The library had `CollectionGrid` (a grid), not the tile it arranges. |
| `FeatureCard` | Content | The library had `IconWithText` — one of the five feature layouts. |
| `ProductGridLayout` | Product | The five *grid styles* the theme exposes as a setting. `ProductGrid` above documents its states — same `.pgrid` CSS, two axes. |
| `PriceContrast` | Product | The library had `InspiredByBlock` (one inline treatment), not the five-variant module. **Ships default OFF and without the retail figure — legal gate.** |
| `HeritageBlock` | Content | The library had `ProductStoryBlock` (a per-product story), not heritage storytelling with chapters and artisan attribution. |

The theme's image container reuses the existing `Image`/`.pimg` primitive rather than adding a
rival. Per-component documentation lives in [`docs/`](docs/).

## Run it

```bash
cd /ahmed-taha-dev/Siwa/component-library
python3 -m http.server 8787 --bind 127.0.0.1
# → http://127.0.0.1:8787
```

## Share it

```bash
cloudflared tunnel --url http://127.0.0.1:8787 --no-autoupdate
```

⚠️ **A `trycloudflare` quick tunnel is ephemeral.** The URL dies when the process stops and a new
one is issued on every run. It is fine for review, not for a link you circulate. For a durable
link, see *Durable hosting* below.

## Files

```
component-library/
├── index.html            Shell: sidebar nav, masthead, mount points
├── css/tokens.css        Design tokens — verbatim from ../Planning/DesignSystem.md
├── css/components.css    All 78 component styles
├── css/library.css       Documentation chrome (deliberately quiet)
├── js/data.js            56 real products, generated from ../product-data/product-data.json
├── js/library.js         Component registry + renderers + interaction layer
└── img/                  6 real photographs from ../instagram-assets/
```

## What is real vs. illustrative

| Real | Illustrative |
|---|---|
| 56 products, prices, variants, stock states | `InspiredByBlock` **original retail prices** — placeholders, not sourced |
| Review counts and averages | `ReviewSummary` histogram shape (derived from the known 5★ skew) |
| Arabic customer review bodies | Filter counts in `FilterBar` |
| 6 campaign photographs | Sillage ratings (new metafield data — does not exist yet) |
| Free-shipping threshold (1,500 EGP) | Quiz question set |

## Radius: sharp, not 10px

The 78-component brief specifies `10px` and "no sharp corners". The client direction of
2026-08-12 asks for **sharp corners**, and it is newer, so it wins: `--r-md` and `--r-full` are
both `0`, and `Planning/DesignSystem.md §7` was updated to match. This also aligns the rebuild
with the live store, which already runs `border-radius: 0` sitewide.

**To revert:** set `--r-md: 10px` and `--r-full: 9999px` in `css/tokens.css`. One line, no other
changes needed — every component reads the token.

## Deviations from `Planning/DesignSystem.md` — deliberate, documented

The spec's own §10 QA checklist requires WCAG AA. Five specified colour pairs miss it. Measured:

| Pair | Spec | Ratio | Library ships |
|---|---|---|---|
| `button-primary` | `#fff` on `--primary` | **3.48:1** ✗ | `--on-primary: #212012` → **4.72:1** ✓ |
| `badge-in-stock` | `#fff` on `--success` | **3.84:1** ✗ | `--success-aa: #6d5949` → **5.31:1** ✓ |
| vintage body copy | `--text-secondary` on Sailcloth | **2.35:1** ✗ | `--text-secondary-aa: #7d6a5b` → **4.62:1** ✓ |

Both values are shown side by side in the **Foundations → Contrast audit** table on the page.
Nothing was silently changed; the original tokens remain defined.

## Where each pattern comes from

| Component | Source |
|---|---|
| Header dual-track nav, collection naming | Amouage — `Planning/DIRECTION.md` Part 1 §2.1 |
| Kershef texture, `vintage-surface` | Widian — §2.2 · DesignSystem §10 |
| `stamp` provenance, artisan credit | Kahina — §2.3 |
| Footer four-pillar naming | Fueguia — §2.4 |
| `BundleBuilder`, `GiftMessage`, `ReferralWidget` | Snif — §2.5 |
| `InspiredByBlock`, `IntensityScale`, `FilterBar` house facet | Oakcha — `Planning/DIRECTION.md` Part 2 §3 |
| `ScentQuiz` layering output, card note descriptors | Skylar — §4 |

Oakcha and Skylar are **tactical only** — they set what a module contains and how it behaves,
never how it sounds or looks (doc 14 §1 firewall).

## Known gaps

- `ProductImage` gallery uses three stand-in images; only 4 of 56 products have real photography.
- `Search` matches client-side over the embedded catalogue — no predictive-search API.
- `Wishlist` writes to `localStorage` but does not rehydrate on load.
- Quiz answers are not scored; `QuizResults` returns a fixed layering pair.
- No dark mode — the design system does not specify one.
- The original 36 components predate the per-variant **When to use** notes; the 42 added for the
  78-component brief all carry them.
- `Icon` ships a placeholder for the Siwan sunburst. The real motif must be drawn from the
  embroidery reference, not substituted with a star.
- Persona names in Arabic (الإلهة / الشاعر / الملهمة / الوريث / الرحّالة) need translation sign-off.

## Durable hosting

The quick tunnel is temporary. For a permanent link, this directory is a static site and deploys
as-is to any of:

- **Cloudflare Pages** — `npx wrangler pages deploy . --project-name siwa-components`
- **Netlify** — `npx netlify deploy --dir . --prod`
- **GitHub Pages** — `git init && git add . && git commit -m "component library"`, push, enable Pages
- **Surge** — `npx surge . siwa-components.surge.sh`

All four need an account login. None require a build step.

## Section variants — `sections.html`

**21 page sections × 6 designs = 126 compositions**, each assembled from the 78 components and
tagged with the feature codes it implements from `../feature-doc/`.

Sections are *arrangements*, not new parts — nothing in `js/sections.js` forks a component. They
compose the public API `window.SIWA.ui` exposed by `js/library.js`.

```
component-library/
├── sections.html         Browse by section (21 sections)
├── css/sections.css      Gallery chrome + band presets
└── js/sections.js        THE definitions — 126 designs + the feature table
```

`../feature-docs/index.html` renders **the same definitions** regrouped by feature, so the two
views cannot drift. One source, two projections.

### Serve it

These pages reach across directories, so serve from the **`Siwa/` root**:

```bash
python3 -m http.server 8790 --bind 127.0.0.1 --directory /ahmed-taha-dev/Siwa
# component library → /component-library/index.html
# section variants  → /component-library/sections.html
# feature programme → /feature-docs/index.html
# homepage          → /homepage/index.html
```

Pages outside `component-library/` set `window.SIWA_IMG_BASE` before loading `library.js` so
product photography resolves. `feature-docs/index.html` is the reference implementation.

### Feature coverage

29 of the 30 programme features have at least one section design. **F-04 (subscription and
loyalty) has none** — it is marked *Specified* in the programme and the commercial model is
undecided, so designing for it would be speculation rather than work.
