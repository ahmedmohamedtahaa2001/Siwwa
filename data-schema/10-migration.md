# 10 — Migration

One question: **what can be done today without anyone writing a word?**

More than expected — and the research moved the line considerably.

---

## 1. Three waves

| | Wave | Effort | Fields |
|---|---|---|---:|
| **A** | **Computed** — script only, no human judgement | hours | ~18 |
| **B** | **Researched** — already resolved, needs verification | days | ~5 |
| **C** | **Authored** — written from scratch, bilingual | weeks | ~14 |

The order binds: each wave unlocks the next.

---

## 2. ⚠️ Step zero

> **Export `vendor` for all 56 before touching it.**

Those 40 designer strings had exactly one source. They are now also captured, split and enriched in
**`reference-fragrances.json`** — but confirm that file covers all 40 before clearing anything
(`../reference-analysis/03-DATA-SCHEMA.md §9.5` risk #1).

Intact copies also exist in `../reference-analysis/raw/products.json` and
`../product-data/product-data.json` (2026-07-27 snapshot). **Verify both still hold 56 products
first** — and if the store has moved since, take a fresh capture.

---

## 3. Wave A — computed

| Field | Computed from | Coverage after |
|---|---|---:|
| `vendor` = `"Siwa Fragrances"` | constant | 56 / 56 |
| `identity.product_line` | `vendor` + the handle lists in `02-identity.md §2` | 56 / 56 |
| `identity.launch_date` | `published_at` | 56 / 56 |
| `identity.badge` | review count vs a threshold | 23 / 56 |
| `fragrance.season_best` | family 1, via the map in `03-fragrance.md §6` | follows families |
| `fragrance.card_descriptors` | families 1–3 joined | follows families |
| `commerce.*` (all 8 keys) | families, line, price — `05-commerce.md` | follows families |
| `images[].alt` | title + Arabic name + concentration | 65 / 65 |
| `tags` | line + badge + gender + season | 56 / 56 |
| `options[].name` → `Size` | normalisation | 62 / 62 |
| `options[].values` → 5 values | normalisation | 158 / 158 |
| `compare_at_price` `"0.00"` → `null` | cleanup | 66 variants |
| `barcode` free text → empty | cleanup | 8 products |
| `variants[].sku` | existing root + size (`01-core-fields.md §5`) | 41 / 56 |
| `reviews.rating` + `.rating_count` | **enable metafields in Judge.me** | 54 / 56 |
| `category` — two corrections | `belle-riche`, `layering-vanilla` → `Eaux de Parfum` | — |
| `fragrance.gender_leaning` | `Men` / `Women` / `Unisex` tags | **21 / 56** ⚠ |

> ⚠️ **`gender_leaning` resolves to 21, not 35.** 35 products carry a gender tag, but **18 of them
> carry `Men` and `Women` together** — which is not the same as `unisex`. Those 18 are left blank
> for a human (`03-fragrance.md §7`). The 21 that resolve are 17 unambiguous + 4 tagged `Unisex`.

### 3.1 Two things that can ship **today**, on the current theme

`../Planning/BENCHMARK.md Part 1 §5.3` notes both are independent of the whole rebuild:

1. **`aggregateRating`** — enable Judge.me metafields, wire them into the Product schema.
   1,212 reviews at 4.98★ currently produce zero stars in Google; 54 products qualify.
2. **Back-in-stock notifications** — 10 products fully sold out, 49 of 158 variants out, and 8
   explicit restock pleas in the reviews including *"always sold out"* on `citrine`.

> ⚠️ **Corpus conflict:** `03-DATA-SCHEMA.md §4.6` says **59 variants / 8 products**, while `§10` of
> the same file and `BENCHMARK.md Part 1` fn 7 say **49 / 10**. Counted directly from
> `../product-data/product-data.json`: **49 of 158 variants, 10 products fully out.** `§4.6` is the
> stale figure.

**Neither needs a single key from this folder.**

---

## 4. Wave B — researched, needs verification

`reference-fragrances.json` resolved the inspired-by layer entirely.

| Field | Source | Available | Human work |
|---|---|---:|---|
| `inspired_by.house` | vendor split + verification | **40 / 40** | spot-check the 25 house names |
| `inspired_by.fragrance` | same | **40 / 40** | spot-check |
| `fragrance.top/heart/base_notes` | the originals' published pyramids | **40** | ⚠ verify against the actual juice |
| `fragrance.families` | the originals' Fragrantica accords | **40** | verify |
| `fragrance.top/heart/base_notes` | Siwa's own labelled tiers | **3** | extract names from the sentences |
| `story.the_vibe` | Format A `THE VIBE` + Format B `Persona` | 6 | clean the HTML |
| `story.long_form` | Format B `The Story` | 5 | clean the HTML |

Two entries carry weaker evidence and should be checked first: **`bleu-exclusive`** (Chanel
publishes no full pyramid) and **`marasi`** (Xerjoff keeps the Join the Club composition secret — the
notes are community-attributed).

**Clean the HTML before migrating any description:** 10 products carry inline `style=` that
overrides the theme's typography, 20 wrap text in empty `<span>`, and `sundaze` carries
`data-path-to-node` editor artifacts (`03-DATA-SCHEMA.md §3.4`).

---

## 5. Wave C — authored

What is genuinely left:

| Item | Count | Note |
|---|---:|---|
| Fragrance data for products with no reference | **13** | the 7 originals + 6 body-care — full olfactory authoring |
| `fragrance.intensity` · `sillage` · `longevity_hours` | **56 each** | ⚠ nothing can derive these; only the oil knows |
| `identity.title_ar` | 16 | `mawj` has its label to work from |
| `story.the_vibe` | 51 | plus `long_form` |
| Every `_ar` field | all layers | **not translation — writing** |
| `story.*` heritage (4 fields) | 16 | subject to `06-story.md §5` |
| `variants[].grams` | **158** | `0` on all of them today; no weight-based shipping is possible |
| Persona and collection names | — | ⛔ reserved for brand voice |

### 5.1 The 17 untagged products carry a double cost

17 products have an empty `tags` array, **16 of them among the newest** — tagging stopped around
2025-09 (`03-DATA-SCHEMA.md §6`). So the Wave A tag mapping runs on 39, and those 17 need
`gender_leaning` authored as well.

Among them: **`pink-allure`**, a 2026 flagship original with the cleanest note data in the
catalogue, and **`bleu-exclusive`**, a product with 19 reviews at 5.00★.

---

## 6. Open decisions that block fields

None of these is a technical decision, and none can be settled by this document.

| # | Decision | Blocks | Owner |
|---|---|---|---|
| 1 | **`Extrait` or `Eau de Parfum`?** The bottles say one, the JSON-LD says the other | `fragrance.concentration` · `product_type` | the team |
| 2 | **Show the original's retail price** — a legal posture, not a UX choice | `inspired_by.retail_price_egp` · `.retail_price_date` | ⚠️ **counsel** — `../Planning/DIRECTION.md Part 2 §3.2C` |
| 3 | **Persona and collection names** | `identity.persona` · `.collection_story` · the `persona` metaobject | brand voice |
| 4 | **6 originals or 8?** `vendor` says 6, the collection says 8 | `product_line` boundaries | needs Admin API |
| 5 | **The ≥27 unpublished products** — admin holds 83+, the storefront 56 | the whole migration scope | needs Admin API |
| 6 | **A Siwan cultural consultant** before shipping heritage material | `story.cultural_note` · `.artisan_credit` · the palette | `BENCHMARK.md Part 2 §6.6` |
| 7 | **Mood/occasion filtering** — no exemplar anywhere in the corpus | `fragrance.occasion`, currently deferred | `DIRECTION.md Part 2 §8` |

Decisions 1 and 2 are asked once on the workbook's **Settings** sheet, so they are visible rather
than buried.

---

## 7. Risk register

The full list is `03-DATA-SCHEMA.md §9.5`; these are the ones this folder introduces or sharpens.

| # | Risk | Mitigation |
|---|---|---|
| 1 | Clearing `vendor` before exporting → **40 strings gone permanently** | §2 |
| 2 | `compare_at_price = "0.00"` reads truthy → phantom sale badges on 66 variants | test `compare_at_price > price` |
| 3 | Shipping facets before the backfill → 21 products vanish from the gender facet | fill `gender_leaning` first |
| 4 | Treating the 18 "structured" products as ready seed data | their tiers are **sentences** (`03-fragrance.md §3`) |
| 5 | **Treating the researched pyramids as Siwa's own composition** | they describe the *original*; the workbook marks them as suggestions and one house publishes nothing at all |
| 6 | Heritage `story.*` on an inspired-by product | firewall breach — a QA blocker (`02-identity.md §3`) |
| 7 | `artisan_credit` without a real collaboration | a claim, not data (`06-story.md §5`) |
| 8 | A new namespace for Judge.me ratings | use `reviews.*` — the app writes it |
| 9 | Storing counters (`product_count`) | compute at render; the store already has this bug in `products_count` |
| 10 | The 2026-07-27 snapshot ageing | reviews already moved **1,176 → 1,212** unaided. Re-capture before the real migration |

---

## 8. Definition of done

- [ ] `identity.product_line` populated **56 / 56** — the firewall does not work without it
- [ ] `product-register.liquid` reads `product_line` instead of `vendor`
- [ ] `vendor` = `"Siwa Fragrances"` on all 56, with the 40 strings exported and split
- [ ] `aggregateRating` emitting on at least 54 PDPs
- [ ] No product holds both `inspired_by.*` and `story.cultural_note`
- [ ] No facet is live on a field below 100% coverage
- [ ] `shopify theme check` clean, and the hardcoded-value scan diffed against the Phase 0 baseline
      (`../CLAUDE.md §4`, Phase 3)
- [ ] A working preview link handed over (`../CLAUDE.md §5`)
