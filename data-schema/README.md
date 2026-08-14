# Siwa — Product Data Schema

**What a product must look like in Shopify after migration**, so the features in
`../feature-doc/index.html` can be built at all.

Written 2026-08-13 against the audit in `../reference-analysis/` (captured 2026-07-27, drift noted
2026-08-12) and the reference roster in `../Planning/`.

---

## 0. Where this sits

| Folder | Answers |
|---|---|
| `../reference-analysis/03-DATA-SCHEMA.md` | **What exists today** — the audit; its §9 sketches a migration |
| `../product-data/` | **What we hold** — the 56 products as captured |
| **`data-schema/` (here)** | **What must exist** — every field, its type, its source, and who fills it |

> **Ownership rule (`../CLAUDE.md §6`).** This folder does not restate audit figures. Every number
> here is a citation — `_CORRECTIONS.md` for figures, `03-DATA-SCHEMA.md` for the data model,
> `04-PRODUCTS.md` for products. Where this folder and its source disagree, **the source wins.**

This folder owns exactly two things: the **target metafield model**, and
**`reference-fragrances.json`** — the 40 designer originals resolved into house, fragrance and
composition.

---

## 1. The layers

```
Product
├── 1. Core Shopify fields ........ 01-core-fields.md      cleanup + tag taxonomy
├── 2. identity.* ................. 02-identity.md         naming, line, the firewall key
├── 3. fragrance.* ................ 03-fragrance.md        the keystone
├── 4. inspired_by.* .............. 04-inspired-by.md      the 40 only
├── 5. commerce.* ................. 05-commerce.md         layering, bundles, quiz
├── 6. story.* .................... 06-story.md            vibe + heritage
└── 7. JSON-LD output ............. 07-structured-data.md  what Google sees
    + metaobjects ................. 08-metaobjects.md
    + worked examples ............. 09-examples.md
    + migration plan .............. 10-migration.md
```

Two data files sit alongside:

| File | What it is |
|---|---|
| **`siwa-product-data.xlsx`** | The merchant workbook — what the owner actually fills in (§6) |
| **`reference-fragrances.json`** | The 40 originals: house, fragrance, note pyramid, Fragrantica accords (§5) |

---

## 2. Namespaces

No `siwa.` prefix — every namespace on this store is Siwa's, and Shopify scopes them already.

| Namespace | Carries | Status |
|---|---|---|
| `fragrance.*` | notes, accords, concentration, performance, family | ✅ already named in `../reference-analysis/03-DATA-SCHEMA.md §9.1` and read by shipped Liquid (`../siwa-theme/snippets/note-pyramid.liquid`) |
| `identity.*` | Arabic name, product line, persona, provenance | 🆕 absorbs two keys currently misfiled under `fragrance.*` (§4) |
| `inspired_by.*` | house, original fragrance, its price | ✅ named in `../Planning/DIRECTION.md Part 2 §3.2A` |
| `commerce.*` | layering, bundles, cross-sell, quiz | 🆕 |
| `story.*` | vibe, heritage, artisan credit | 🆕 replaces `custom.the_story` |
| `reviews.*` | rating, rating count | ✅ the namespace **Judge.me itself writes** — do not invent another |
| `custom.*` | **unused** | default grab-bag; everything has a clearer home |

### 2.1 Deliberate departures from `03-DATA-SCHEMA.md §9`

| Audit proposal | Decision here | Why |
|---|---|---|
| `custom.inspired_by` (one key) | `inspired_by.house` + `.fragrance` + `.retail_price_egp` | The vendor string fuses house and fragrance (`Bleu De Chanel L'exclusif`). One key gives a facet of 40 single-item entries — useless. `DIRECTION.md Part 2 §3.2B` |
| `custom.the_story` | `story.the_vibe` + 5 more | The story is not one field |
| `custom.badge` | `identity.badge` | Belongs to identity |
| `custom.bundle_items` | `commerce.bundle_items` | Same |
| `fragrance.gender` | `fragrance.gender_leaning` | Avoids collision with a `gender:` tag |
| `fragrance.family` as a free list | **Fragrantica main accords**, closed set | `DIRECTION.md Part 2 §6` — flat vocabulary, multiple values per product, no Oakcha-style compounds |

---

## 3. The rule everything obeys — the two-register firewall

The catalogue is not one thing. **16 products are Siwa's own, 40 reference a designer fragrance**
(`03-DATA-SCHEMA.md §2.3`), and `../Planning/BENCHMARK.md Part 2 §5` rules that heritage belongs to
the 16 and commercial framing to the 40 — **never both on one page**.

In code the split lives in exactly one file: `../siwa-theme/snippets/product-register.liquid`,
which returns `original` or `inspired`. It derives that from `vendor` today; after migration it
reads `identity.product_line`, and **nothing else in the theme changes.**

```
register = "original"  (16)          register = "inspired"  (40)
  ✅ Cultural Accent Set               ✅ inspired_by.* and price contrast
  ✅ Arabic name at equal weight       ✅ designer facet
  ✅ story.* in full                   ✅ UI Chrome only
  ✅ badge-authentic-siwan             ❌ Cultural Accent — a firewall breach
  ❌ price contrast. Ever.             ❌ heritage fields of story.*
```

Sources: `Planning/DesignSystem.md §2` · `Planning/DIRECTION.md Part 2 §1, §5` ·
`Planning/BENCHMARK.md Part 2 §5`.

---

## 4. One deliberate change to shipped code

Three lines read two keys from the wrong namespace:

| File | Line | Today | Becomes |
|---|---:|---|---|
| `../siwa-theme/snippets/product-card.liquid` | 182 | `metafields.fragrance.title_ar` | `metafields.identity.title_ar` |
| `../siwa-theme/snippets/product-card.liquid` | 191 | `metafields.fragrance.provenance` | `metafields.identity.provenance` |
| `../siwa-theme/snippets/note-pyramid.liquid` | 189 | `metafields.fragrance.provenance` | `metafields.identity.provenance` |

A name and an origin are **identity**, not scent — and `identity.product_line`, the firewall key,
cannot live in a namespace called `fragrance`. To reject this change, keep both keys where they are
and delete them from `02-identity.md`; nothing else depends on it.

---

## 5. `reference-fragrances.json` — the 40 originals

The `vendor` field holds 40 unique designer strings and nothing else does
(`03-DATA-SCHEMA.md §9.5` risk #1). This file splits each into **house + fragrance** and attaches
the original's **published note pyramid and Fragrantica main accords**, researched 2026-08-13.

Two things to know before using it:

1. **Fragrantica blocks automated fetching** (HTTP 403, re-confirmed 2026-08-13; already recorded in
   `DIRECTION.md Part 1 §8`). Each pyramid was read from search results reporting the Fragrantica
   entry, cross-checked against the house's own site, Basenotes or Parfumo where available.
2. **These are the originals' compositions, not Siwa's.** They are a starting point for the merchant
   to correct against the actual juice.

**One validation exists.** `sundaze` is the only Siwa product that publishes its own pyramid
(`03-DATA-SCHEMA.md §3.2`). The independently researched pyramid for Armani Power Of You matches it
note for note. That is one confirmation, not proof for the other 39. Two entries carry explicit
weaker-evidence flags: `bleu-exclusive` (Chanel publishes no full pyramid) and `marasi` (Xerjoff
keeps the Join the Club composition secret; the notes are community-attributed).

---

## 6. `siwa-product-data.xlsx` — the merchant workbook

The specification above is for whoever writes the Liquid. **The workbook is for the business
owner**, and it is built on one principle: *ask only for what cannot be worked out.*

| | |
|---|---|
| Generated by | `../tools/build-product-workbook.py` — rerun any time |
| Built from | `../product-data/product-data.json` + `reference-fragrances.json` |
| Size | 7 sheets · 56 products · 151-note vocabulary · 48 Fragrantica accords |

**Sheets:** `Read me` · `Settings` (3 catalogue-wide answers) · `Products` (the only long sheet) ·
`Heritage` (16 rows) · `Auto-calculated` · `Progress` · `Lists`.

### What the owner is asked for

Notes per tier · scent families · intensity · sillage · longevity · gender · Arabic name ·
description EN/AR · and for the 16 originals, four heritage fields. That is all.

### What is never asked, because it is computed

`register` · per-product concentration · `product_type` · season · badge · launch date · image alt
text · card descriptors · tags · cross-sells · JSON-LD brand. All of it appears on the
**Auto-calculated** sheet as live formulas — visible rather than hidden, so it is obvious that
dropping the questions did not drop the data.

### What is pre-filled

**43 of 56 note rows arrive already populated** — 40 from the researched originals, 3 from products
whose own descriptions carry labelled tiers. They are colour-coded as suggestions to be checked,
never as answers. Scent families arrive pre-filled for the same 40 from Fragrantica's accords.

### How the firewall is enforced

Heritage is a **separate 16-row sheet**, not a set of columns on the main sheet. The 40 inspired-by
products are absent from it, so the rule cannot be broken by typing in the wrong row. Note that the
four Layering products sit on the inspired side — they reference Kayali (`02-identity.md §2.1`).

---

## 7. Rules for anyone writing Liquid against this

1. **Never read a metafield without a nil check** (`../skills/MultiAgentsWorkFlow.md`, QA checklist
   line 3155). Coverage today is **zero on every key** — the empty state is the default case.
2. **Never invent data.** No notes, render the empty state. `note-pyramid.liquid` does this
   correctly; follow it.
3. **The Prime Directive still applies.** The metafield carries the *value*; labels and surrounding
   copy are `{% schema %}` settings or `locales/*.json` (`../CLAUDE.md §3`).
4. **Never read `vendor` outside `product-register.liquid`** — it is not a brand on 40 of 56
   products.
5. **Test `compare_at_price > price`**, not mere presence — 66 variants hold `"0.00"`.

---

## 8. Reading paths

| If you are… | Read |
|---|---|
| The business owner | `siwa-product-data.xlsx` → its **Read me** sheet. Nothing else. |
| Building the PDP | `03-fragrance.md` → `04-inspired-by.md` → `06-story.md` → `09-examples.md` |
| Building filters | `01-core-fields.md` → `03-fragrance.md` → `08-metaobjects.md` |
| Doing SEO | `07-structured-data.md` |
| Running the migration | `10-migration.md` first |
| Checking what changed | §2.1 and §4 above |

---

## 9. The ground truth this rests on

**Coverage today is zero on every key in this folder.** The store has **no metafields and no
metaobjects** (`03-DATA-SCHEMA.md §7`). What does exist:

- **18 of 56** products have labelled note tiers, across **13 label spellings** — and even those 18
  are written as *sentences*, not note names (`03-fragrance.md §3`)
- **40 of 56** carry the inspired-by reference, trapped in `vendor` — now resolved in
  `reference-fragrances.json`
- **5** have accords · **9** occasions · **2** longevity
- **zero** have an Arabic name, a scent family, a persona or a season as a field

So this folder is a **specification plus a backlog**. `10-migration.md` sequences it.
