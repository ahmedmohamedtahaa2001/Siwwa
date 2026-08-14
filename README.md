# Siwa Fragrances — Repository Guide

**Start here.** This file explains **what each folder is for** and **where to go for what**.
It deliberately contains no store facts — those live in the folders below, each with one owner.

> **Project:** rebuild the Shopify storefront for **Siwa Fragrances**
> (https://siwafragrances.com) — an Egyptian "inspired-by" perfume house.
> **State:** audit and direction are done; the theme has not been built.
> ⚠️ **This repository has no version control. Deletions are irreversible.**

---

## 1. The seven folders, in the order you'd use them

```
Siwa/
├── reference-analysis/   1. WHAT THE LIVE STORE IS        — the audit (evidence)
├── product-data/         2. WHAT WE KNOW PER PRODUCT      — the curated catalogue
├── instagram-assets/     3. WHAT THE BRAND LOOKS LIKE     — real creative
├── Planning/             4. WHAT IT SHOULD BECOME         — benchmarks + design system
├── data-schema/          5. WHAT THE PRODUCT DATA MUST BE — the target metafield model
├── component-library/    6. THE DESIGN SYSTEM, BUILT      — CSS/JS implementation
└── skills/               7. HOW TO BUILD IT               — agent methodology
```

The flow is **evidence → direction → implementation**. Anything describing the store *as it is*
belongs on the left; anything describing what it *should be* belongs on the right. That is the
single rule that resolves most "where does this go?" questions.

---

## 2. Folder by folder

### `reference-analysis/` — the live-store audit *(13 MB, the largest folder)*

A read-only forensic audit of the live Shopify store, captured **2026-07-27**. Ten numbered
documents (`00`–`09`) plus a 12 MB raw capture.

**Enter through [`reference-analysis/README.md`](reference-analysis/README.md)** — the corpus map.
It names the single owning document for every fact, tracks known drift, and gives reading paths
by task.

| Sub-item | What it is |
|---|---|
| `00`–`09` numbered docs | Brand · structure · design tokens · data schema · products · sections · reviews · copy · assets · Shopify schema mapping |
| `raw/` | **Ground truth.** The actual scrape — `products.json` and `reviews_complete.json` are authoritative |
| `_CORRECTIONS.md` | **Authoritative figures.** Any number anywheres that conflicts with this file is wrong |
| `PROJECT-CONTEXT.md` | Repo state, the proposed-redesign conflict, build methodology, open decisionss 

**Nothing here describes the future.** If a document proposes rather than records, it belongs in
`Planning/`.

### `product-data/` — the curated per-product catalogue

| File | What it is |
|---|---|
| `PRODUCT-DATA.md` | 2,406 lines — one filled data sheet per product |
| `PRODUCT-TEMPLATE.md` | The empty schema every product uses |
| `product-data.json` | Machine-readable twin — 56 products, ~20 fields each |

**Derived from** `reference-analysis/raw/` (catalogue + reviews) and `instagram-assets/` (social).
It is a **working layer**, not evidence: it merges, normalises and extends the raw capture into
the shape the rebuild needs. When the two disagree, **`raw/` wins**.

### `instagram-assets/` — the brand's real visual identity *(3 MB)*

18 images across 11 posts, 4 products, captured **2026-07-28**, matched against the catalogue.

This folder carries the project's most important single finding, documented in its own
[`README.md`](instagram-assets/README.md): **Instagram and the website are two different brands.**
The bottles are bilingual (Arabic + Latin), the photography is fully art-directed, and per-scent
colour worlds already exist — none of which the website shows.

Read its README before any design work. It also holds per-product `<handle>.json` demo records
whose `_provenance` blocks mark each field **real / derived / demo_placeholder** — check that
block before treating any number there as a business fact.

### `Planning/` — the direction *(what the store should become)*

| File | What it answers |
|---|---|
| `DesignSystem.md` | **The proposed design system** — two palettes, bilingual type, vintage layer |
| `BENCHMARK.md Part 1` | Feature gaps vs feature-rich stores worldwide |
| `BENCHMARK.md Part 2` | Identity, vibe, lore — and the Siwa Oasis lore audit |
| `DIRECTION.md Part 1` | **The selected five** — Amouage · Widian · Kahina · Fueguia · Snif |
| `DIRECTION.md Part 2` | Oakcha + Skylar, scoped to mechanics · **the active reference roster** |

Each file is two former documents merged into Parts, with the original section numbering kept
inside each Part. Cite as `BENCHMARK.md Part 1 §3.4`.

### `data-schema/` — the target product data model

What a product must look like in Shopify **after** migration, so the features in `feature-doc/`
can be built at all. Eleven markdown files — the seven metafield layers, the metaobject
definitions, two worked examples and a migration plan — plus two data files:

| File | What it is |
|---|---|
| **`siwa-product-data.xlsx`** | The merchant workbook — 7 sheets, built on *ask only for what cannot be worked out*. 43 of 56 note rows arrive pre-filled; everything derivable is a live formula on an "Auto-calculated" sheet. Regenerate with `tools/build-product-workbook.py` |
| **`reference-fragrances.json`** | The 40 designer originals the catalogue references, resolved from the `vendor` strings into house + fragrance + published note pyramid + Fragrantica accords (researched 2026-08-13) |

**Enter through [`data-schema/README.md`](data-schema/README.md).**

| Owns | Cites (never restates) |
|---|---|
| The target metafield model — namespaces, keys, types, validations, and the two-register firewall rules | Every store fact: `reference-analysis/` for the audit, `_CORRECTIONS.md` for figures, `Planning/` for the reference patterns |

It is a **spec plus a backlog**, not a description: coverage today is **zero on every key**, since
the store has no metafields at all. `data-schema/10-migration.md` ranks the backlog and lists the
seven open decisions that block specific fields.

### `component-library/` — the design system, implemented

| Path | What it is |
|---|---|
| `css/tokens.css` | The `DesignSystem.md` palette as CSS custom properties |
| `css/components.css`, `css/library.css` | Component styles |
| `js/data.js` | 56 real products, generated from `product-data/product-data.json` |
| `img/` | 6 product photographs from `instagram-assets/` |

`Planning/DesignSystem.md` is the **spec**; this folder is the **build**. When they disagree, the
spec wins — or the spec gets updated deliberately, never silently.

⚠️ **There is no HTML file anywhere in this folder**, so nothing currently renders it. It needs an
entry page before it can be reviewed in a browser.

### `skills/` — how the work gets done

| Path | What it is | Origin |
|---|---|---|
| `MultiAgentsWorkFlow.md` | 3,580 lines — **the governing build methodology.** Six Development Laws, phase gates, agent roster, the zero-hardcoded-values Prime Directive | This project |
| `epic-design/SKILL.md` | Cinematic 2.5D scroll-storytelling web design | Third-party |
| `vintage/SKILL.md`, `vintage/DESIGN.md` | 1950s–90s nostalgia design system | Third-party (typeui.sh) |

⚠️ **Two different kinds of thing share this folder.** `MultiAgentsWorkFlow.md` is *how this
project builds*; the two subfolders are *generic design skills* imported from elsewhere. Only the
first is binding. Consider splitting them if the distinction keeps causing confusion.

---

## 3. The three name clashes that cause confusion

These are the specific collisions worth memorising.

| Looks like a duplicate | Actually |
|---|---|
| `reference-analysis/02-DESIGN-SYSTEM.md` **vs** `Planning/DesignSystem.md` | **Different things.** `02` documents the **live site's** 147 tokens (monochrome, Poppins, 0px radius). `Planning/` proposes a **new** system (two palettes, serif + Arabic, 10px radius). They must never be reconciled — one is a record, the other a proposal |
| `reference-analysis/raw/products.json` **vs** `product-data/product-data.json` | **Source vs derived.** `raw/` is the untouched scrape and is authoritative. `product-data/` is the curated, normalised, extended version for the rebuild |
| `Planning/DesignSystem.md` **vs** `component-library/css/tokens.css` | **Spec vs build.** The markdown is the source of truth; the CSS implements it |

Plus one structural oddity: **`Planning/` numbering starts at `10`**, and `12` is missing. Both
are deliberate — the sequence continues the audit's `00`–`09`, and `12` was absorbed into `13`.

---

## 4. Where to start, by task

| If you are… | Go to |
|---|---|
| **New to the project** | this file → `reference-analysis/README.md` → `reference-analysis/PROJECT-CONTEXT.md` |
| **Looking up a store fact** | `reference-analysis/README.md §2` — it names the owning document |
| **Checking a number** | `reference-analysis/_CORRECTIONS.md` first, always |
| **Doing design or brand work** | `Planning/BENCHMARK.md` Part 2 → `Planning/DIRECTION.md` Part 1 → `instagram-assets/README.md` → `Planning/DesignSystem.md` |
| **Doing features / UX** | `Planning/BENCHMARK.md` Part 1 → `Planning/DIRECTION.md` Part 2 |
| **Building the theme** | `skills/MultiAgentsWorkFlow.md` → `reference-analysis/09-SCHEMA-MAPPING.md` → `Planning/DesignSystem.md` → `component-library/` |
| **Working with product data** | `product-data/PRODUCT-TEMPLATE.md` → `product-data/PRODUCT-DATA.md` → `reference-analysis/raw/products.json` |
| **Designing metafields / migrating the catalogue** | `data-schema/README.md` → the layer you need → `data-schema/10-migration.md` |

---

## 5. Rules that keep this tidy

1. **One fact, one owner.** If a figure appears outside its owning document, write it as a
   citation, not a fresh assertion. `reference-analysis/README.md §2` holds the ownership table.
   This is the rule that stops the corpus drifting.
2. **Evidence never mixes with direction.** `reference-analysis/` records; `Planning/` proposes.
   A document that does both belongs in `Planning/` with its evidence cited.
3. **Derived data cites its source.** `product-data/` and `component-library/` are generated
   layers — each should name what it was generated from, as `js/data.js` already does.
4. **No version control.** Read before you overwrite; nothing here is recoverable.

---

## 6. Open items

| Item | Where it's tracked |
|---|---|
| Live review count has drifted from the capture (needs a re-scrape) | `reference-analysis/README.md §5.2` |
| The vendor/dupe posture — keep, or migrate to an `inspired_by` metafield? | `reference-analysis/PROJECT-CONTEXT.md §7.4` |
| Is `Planning/DesignSystem.md` an approved direction? No decision record exists | `reference-analysis/PROJECT-CONTEXT.md §7.1` |
| Rebuild vs. refit — never stated | `reference-analysis/PROJECT-CONTEXT.md §7.2` |
| `component-library/` has no HTML entry point | §2 above |
| Five contrast pairs in `DesignSystem.md` fail its own WCAG AA checklist | `Planning/DesignSystem.md` §1, §8, §10 |
