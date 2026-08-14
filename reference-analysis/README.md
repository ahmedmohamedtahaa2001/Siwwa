# Siwa Fragrances — Reference Analysis

Deep audit of **https://siwafragrances.com/** — captured **2026-07-27**.

Produced under `../skills/MultiAgentsWorkFlow.md` (Phase 0 §0C reference-spec intake + the A-01
Codebase/Reference Agent brief). Read-only audit: nothing on the live store was modified.

Scope as agreed: **full catalog scrape, no screenshots.**

---

> **This file is the corpus map.** It indexes every document, names the **single owning
> document for every fact**, tracks known drift, and gives reading paths by task.
> *(Merged 2026-08-12 — the former `INDEX.md` is folded in here; there is now one entry point,
> not two. No content was removed.)*

---

## 1. Documents in this folder

### Part 1 — the live-store audit (captured 2026-07-27)

| Doc | Lines | What it answers |
|---|---:|---|
| **[00-OVERVIEW.md](00-OVERVIEW.md)** | 408 | Who the brand is, the business model, the full tech stack, store vitals |
| **[01-SITE-STRUCTURE.md](01-SITE-STRUCTURE.md)** | 557 | Every URL, every template, every section stack, the nav trees |
| **[02-DESIGN-SYSTEM.md](02-DESIGN-SYSTEM.md)** | 1,022 | Colour, type, spacing, components, breakpoints — 147 tokens |
| **[03-DATA-SCHEMA.md](03-DATA-SCHEMA.md)** | 1,011 | Product/variant/collection model, JSON-LD, metafield proposal |
| **[04-PRODUCTS.md](04-PRODUCTS.md)** | 756 | All 56 products, pricing ladders, notes index, inventory |
| **[05-SECTIONS-INVENTORY.md](05-SECTIONS-INVENTORY.md)** | 1,025 | Every section anatomised into editable content slots |
| **[06-REVIEWS.md](06-REVIEWS.md)** | 1,135 | Judge.me config, 820-review corpus, ratings, demand signals |
| **[07-COPY-CONTENT.md](07-COPY-CONTENT.md)** | 1,010 | Complete copy deck + brand voice analysis |
| **[08-ASSETS.md](08-ASSETS.md)** | 586 | Every image, font, icon, CDN URL + quality audit |
| **[09-SCHEMA-MAPPING.md](09-SCHEMA-MAPPING.md)** | 973 | **Reference values → Shopify schema defaults.** Feeds implementation agents |

### Part 2 — external benchmarking → moved to `../Planning/`

The competitive, identity and reference documents now live alongside the design system in
**[`../Planning/`](../Planning/)** — they are forward-looking direction, not a record of the live
store:

| Doc | What it answers |
|---|---|
| [BENCHMARK.md Part 1](../Planning/BENCHMARK.md) | Feature gaps vs feature-rich stores worldwide |
| [BENCHMARK.md Part 2](../Planning/BENCHMARK.md) | Identity, vibe, lore — and the Siwa Oasis lore audit |
| [DIRECTION.md Part 1](../Planning/DIRECTION.md) | The selected five — Amouage · Widian · Kahina · Fueguia · Snif |
| [DIRECTION.md Part 2](../Planning/DIRECTION.md) | Oakcha + Skylar, firewalled to mechanics · **the active roster** |
| [DesignSystem.md](../Planning/DesignSystem.md) | The proposed design system |

> **The split:** this folder records **what the live store is**; `../Planning/` decides **what it
> should become**. A document that proposes rather than records belongs there, not here.

Supporting: **[_CORRECTIONS.md](_CORRECTIONS.md)** (authoritative figures — supersedes any conflict) ·
**[PROJECT-CONTEXT.md](PROJECT-CONTEXT.md)** (repo state, build methodology, open decisions).

Sibling set: **`../instagram-assets/`** (the brand's real visual identity — 18 images, the
bilingual bottle lockup).

**This directory: 10 audit documents + 4 meta files + 12 MB raw corpus.**

> **Store vitals, tech stack and the vendor/dupe business model live in
> [00-OVERVIEW.md](00-OVERVIEW.md) §2–4** — the owning document. They are not restated here.

---

## 2. Fact ownership — who to cite

| Fact domain | Owner | Do not restate in |
|---|---|---|
| Review counts, averages, rating distribution | **`_CORRECTIONS.md`** (figures) → `06-REVIEWS.md` (analysis) | 00 · 01 · 03 · 04 · 05 · 07 · Planning/10 · README · PROJECT-CONTEXT |
| Product/variant/price/stock data | **`raw/products.json`** → `04-PRODUCTS.md` | 00 · 03 · 08 · README · PROJECT-CONTEXT |
| Tech stack, theme, apps, store vitals | **`00-OVERVIEW.md` §3–4** | README · PROJECT-CONTEXT |
| URLs, templates, section stacks, nav | **`01-SITE-STRUCTURE.md`** | 00 · PROJECT-CONTEXT |
| Design tokens (**live site**) | **`02-DESIGN-SYSTEM.md`** | 05 · 08 · 09 · README · PROJECT-CONTEXT |
| Vendor/dupe anomaly | **`03-DATA-SCHEMA.md` §2** | 00 §2 · 07 §12.5 · README |
| JSON-LD, metafields, proposed schema | **`03-DATA-SCHEMA.md` §7–9** | 06 · Planning/10 |
| Copy strings, brand voice | **`07-COPY-CONTENT.md`** | 00 §1 · 05 |
| Images, fonts, CDN, alt-text audit | **`08-ASSETS.md`** | 02 · 04 |
| Shopify schema defaults for the build | **`09-SCHEMA-MAPPING.md`** | 02 · 05 |
| Feature gaps vs competitors | **`../Planning/BENCHMARK.md` Part 1** | DIRECTION.md |
| Identity, lore, Siwan cultural material | **`../Planning/BENCHMARK.md` Part 2** | DIRECTION.md |
| Selected-five deep analysis · secondary bench | **`../Planning/DIRECTION.md` Part 1 §2, §8** | BENCHMARK.md |
| **The active reference roster** | **`../Planning/DIRECTION.md` Part 2 §8** | BENCHMARK.md |
| Design system / tokens for the **rebuild** | **`../Planning/DesignSystem.md`** | all |
| Instagram creative, bottle lockup, colour worlds | **`../instagram-assets/README.md`** | Planning/11 |

> Note the one deliberate pair: `02-DESIGN-SYSTEM.md` owns the **live site's** tokens;
> `../Planning/DesignSystem.md` owns the **proposed** ones. They describe different things and
> must not be reconciled.

---

## 3. Top 10 findings for a rebuild

1. **No `aggregateRating` in JSON-LD** — verified 0 occurrences across all 56 PDPs. 1,176 reviews at
   4.98★ producing zero star rich-snippets in Google; 54 of 56 products would qualify today.
   Highest-value fix available. → `03-DATA-SCHEMA.md §8`
2. **Tag coverage is broken** — 17 products have an empty `tags` array, 21 have no gender tag,
   including 9 of the 10 published in 2026. The nav is tag-driven, so ~35% of the catalog is
   unreachable by browsing. → `04-PRODUCTS.md §6`
3. **Two product templates, two page templates** — `…767280` (50 EDP/bundle SKUs) and `…291568`
   (6 body-splash/lotion), each with its own Judge.me section ID. A one-template rebuild collapses
   both. → `01-SITE-STRUCTURE.md §3`
4. **Imagery blocks the theme's own features** — 50 of 56 products have exactly one image, no variant
   has a `featured_image`, and **100% of product images have `null` alt**. Prestige's hover-second-image
   and variant-image switching are inert. → `08-ASSETS.md`
5. **Zero metafields, zero metaobjects** — the entire content model lives in `body_html`, across
   5 incompatible description formats (A=1 / B=5 / C=12 / D=24 / E=14). Only **18 of 56** expose
   machine-readable notes, using **13 different tier-label spellings**. → `03-DATA-SCHEMA.md §3`
6. **Spacing is per-instance, not global** — the two `featured-collections` differ in spacing factor
   (1 vs 0.2), the two `scrolling-content` in padding (40 vs 46px). Presets would flatten the design.
   → `09-SCHEMA-MAPPING.md`
7. **The skill's mandatory range bounds can't express this site.** `section_max_width` at
   `min 800, step 40` cannot reach the measured **1260px** or **680px**; padding needs `step 2`
   (measured 46 / 25.6 / 8 / 12px). Widen the ranges or the layout silently snaps wrong.
   → `09-SCHEMA-MAPPING.md Part A`
8. **Rating skew needs a decision** — 804 of 820 are 5★, **zero below 4★**. `autopublish: false` is
   the strongest evidence (manual approval), and dissent is *not* concentrated in small samples.
   Documented as five ranked mechanisms with evidence, not accusation. → `06-REVIEWS.md §4`
9. **Discounts are overstated** — `layering-30-ml-bundle` shows compare-at 1,650 against a real 1,350;
   `marshmallow-bundle` 1,250 vs 1,075. 66 variants carry a junk `"0.00"` compare-at. → `04-PRODUCTS.md §4`
10. **Demand signal: restocks.** 8 explicit pleas across 5 products. `citrine` (20 reviews, 5.00★,
    tagged `Best Selling`, fully sold out) has a customer writing *"always sold out"*.
    `alluring-rose` likewise: 24 reviews at 4.96★, every variant out. → `06-REVIEWS.md §6`

Also live: **9 of 19 collections, 2 of 5 pages and the blog are navigation orphans**; the red
`#C31111` colour scheme is defined everywhere and applied nowhere; `--shadow-block` is emitted
malformed; `.inventory{color:#ff0000}` is raw injected CSS; and there is **no favicon declared**.

---

## 4. Raw corpus (`raw/` — 12 MB)

| Path | Contents |
|---|---|
| `products.json` | Complete 56-product catalog — **authoritative** for product data |
| `collections.json` | 19 collections (note: `products_count` is publication-blind, see `03 §5`) |
| `products/<handle>.html` | **All 56 PDPs, verified valid** |
| `products/<handle>.js.json` | Product JS objects — 31 valid captures; `products.json` is authoritative |
| `pages/` | Homepage, 4 content pages, 2 collection pages |
| `reviews_complete.json` | **Authoritative** review data — 54 products + 241 review bodies |
| `description_formats.json` | Per-product description-format classification |
| `sitemap*.xml` | Full 83-URL inventory |
| `meta.json`, `cart.js`, `handles.txt`, `jdgm_settings.json`, `rescrape.sh` | Store meta, cart snapshot, handles, Judge.me config, capture script |

### Capture integrity

The first scrape pass hit Cloudflare rate limiting: 24 of 56 PDPs returned challenge pages, which
silently registered as zero-review products. This was caught during the audit, the pages were
re-scraped with throttling, and **all 56 are now valid**. Every review figure in these documents was
re-derived from the complete capture, and the affected documents carry correction callouts.
Products worst affected — `layering-vanilla` (98 reviews), `mawj` (68), `hibiscusex` (56) — are the
store's actual bestsellers and were entirely invisible in the first pass.

---

## 5. Drift & contradiction register

State as of 2026-08-12.

### 3.1 Dossier excluded but still the primary comparable in doc 10 ✅ FIXED
The client excluded Dossier on 2026-08-12; `../Planning/BENCHMARK.md Part 1` still carried it as a
Tier 1 row, a feature-matrix column and a cited source pattern in six recommendations.
**Resolution:** **removed entirely** — Tier 1 row deleted, matrix column dropped from 28 rows,
all prose references rewritten. Only the exclusion note remains. **Doc 14 §8 is the authoritative
roster.**

### 3.2 The review count has moved and 11 files are stale ⚠️ OPEN
`1,176 @ 4.98★` is the 2026-07-27 capture figure and appears in **11 documents**. The live
shop-level figure on 2026-08-12 is **1,212**.
**Resolution:** recorded in `_CORRECTIONS.md` as a dated drift note. The audit figures remain
correct *as of the capture date* — they are not errors, they are snapshots. Do not mass-edit
them; cite the capture date instead. Closing this properly needs a fresh capture.

### 3.3 Doc 11 stated `Planning/DesignSystem.md` does not exist ✅ FIXED
True when written; the file was created on 2026-08-12.
**Resolution:** corrected in doc 11 (2 places). `skills/` has since been repopulated — see §3.9.

### 3.4 `README.md` gave the wrong Shopify Inbox extension ID ✅ FIXED
README said `shopify-inbox-1296`. The raw capture (`raw/pages/index.html`) says **`1295`**, as do
7 other documents. `08-ASSETS.md §6` explains the discrepancy: the app auto-updated between
scrape passes, so `1296` appears in the *re-scraped* captures only.
**Resolution:** README corrected to `1295`. `1296` now appears only in `08-ASSETS.md`, where the
version bump is explained — the canonical treatment of this fact.

### 3.5 `_AGENT-CONTEXT.md` contained a claim the audit refuted ✅ FIXED
It asserted all `body_html` follows a `THE VIBE → blockquote → FRAGRANCE PROFILE` template.
`00-OVERVIEW.md §4.3` measured this and found it true of **1 product of 56** (`sundaze`).
**Resolution:** **file deleted.** The claim had propagated into `02-DESIGN-SYSTEM.md`, which was
also corrected. Five other citations to it (in 00 and 04) were repointed to primary evidence.

### 3.6 `PROJECT-CONTEXT.md §1` documented a file tree that did not match the repo ✅ FIXED
It listed seven files under `Skills/`; the directory was empty at the time.
**Resolution:** tree rewritten to reality, with the empty `skills/` flagged. §6 of that document
is now the **only surviving record of the build methodology** — noted there explicitly.

### 3.7 Structural redundancy — three overlapping entry points ✅ FIXED
`README.md`, `PROJECT-CONTEXT.md` and `_AGENT-CONTEXT.md` each restated the store's identity,
stack, vitals and findings.
**Resolution:** `_AGENT-CONTEXT.md` deleted. `PROJECT-CONTEXT.md` cut 336 → 97 lines. README's
"store in one table" and "what this store actually is" removed in favour of a pointer to
`00-OVERVIEW.md`. **Nothing unique was lost** — §5, §6, §7 of PROJECT-CONTEXT are intact.

### 3.8 Reference-doc overlap ✅ FIXED
Oakcha appeared in 4 docs, Snif in 4, Amouage in 4, Skylar in 4 — layered refinement, but doc 12
was a superseded intermediate.
**Resolution:** `12-REFERENCE-SET.md` **deleted** after its three unique assets — the
dupe-list-is-reference-list table, the secondary bench, and the what-not-to-copy list — were
absorbed into `../Planning/DIRECTION.md` Part 1 §7–9.

### 3.9 `skills/` is empty ⚠️ OPEN
`PROJECT-CONTEXT.md` once documented seven skill files including the 3,580-line
`MultiAgentsWorkFlow.md` that governs the build. **All are gone.** `PROJECT-CONTEXT.md §6` is the
only surviving summary. Recover the originals before relying on the methodology.

---

## 6. Reading paths

| If you are… | Read, in order |
|---|---|
| **New to the project** | `README.md` → `00-OVERVIEW.md` → this index |
| **Picking up project state** | `PROJECT-CONTEXT.md` (repo state, open decisions) → this index |
| **Building the theme** | `09-SCHEMA-MAPPING.md` → `05-SECTIONS-INVENTORY.md` → `01-SITE-STRUCTURE.md` → `../Planning/DesignSystem.md` |
| **Working on the data model** | `03-DATA-SCHEMA.md` → `04-PRODUCTS.md` → `raw/products.json` |
| **Working on design/brand** | `../Planning/BENCHMARK.md Part 2` → `../Planning/DIRECTION.md Part 1` → `../instagram-assets/README.md` → `../Planning/DesignSystem.md` |
| **Working on features/UX** | `../Planning/BENCHMARK.md Part 1` → `../Planning/DIRECTION.md Part 2` |
| **Checking a number** | `_CORRECTIONS.md` → the owning doc in §2 → `raw/` |

---

## 7. The maintenance rule

> **One fact, one owner. Everything else cites.**
>
> If a figure appears outside its owning document, it must be written as a citation
> (`— see 06-REVIEWS.md §2`), not restated as a fresh assertion. When a number changes, it should
> need changing in exactly one place plus this index.

The corpus does **not** have a copy-paste problem — a scan for shared lines across every doc
found **exactly one** duplicated line. What it has is *restatement drift*: the same fact
re-worded independently in up to 14 files, so a change in the underlying store silently
invalidates all of them. §3 lists what has already drifted.

---

## 8. Consolidation history

| Action | Result |
|---|---|
| **`12-REFERENCE-SET.md` deleted** | Unique content absorbed into what is now `Planning/DIRECTION.md` Part 1 §7–9 |
| **`_AGENT-CONTEXT.md` deleted** | Contained a refuted claim; inbound citations repointed |
| **`PROJECT-CONTEXT.md` trimmed 336 → 97** | Restatements of 00/01/02/README removed; §5–§7 kept intact |
| **`README.md` trimmed** | Store vitals + business model now point to `00-OVERVIEW.md` |
| **Dossier stripped from `10`** | Tier 1 row, matrix column (28 rows) and all prose references |
| **`raw/` cleaned 13 MB → 12 MB** | 25 invalid Cloudflare `.js.json` stubs · two superseded review JSONs · scrape-run artifacts (`cf_cookies.txt`, `blocked.txt`, `still_blocked.txt`, `rescrape.log`, empty `jdgm_all.json`) |
| **Docs 10 · 11 · 13 · 14 moved to `../Planning/`** | Joined `DesignSystem.md`; cross-references repointed both ways |
| **Those four merged into 2 (2026-08-12)** | `BENCHMARK.md` (10+11) and `DIRECTION.md` (13+14) — content preserved whole as Parts |
| **`INDEX.md` folded into this README** | One corpus map instead of two overlapping ones |

**The resulting split:** `reference-analysis/` is now purely **the record of the live store**.
`../Planning/` is **everything forward-looking** — benchmarks, references, direction, design system.

**Kept deliberately:** `README.md` (the conventional entry point) and `PROJECT-CONTEXT.md` — its
§6 is the only surviving record of the governing build methodology.

**Not touched:** the 10 Tier A audit documents. Their internal restatements are citations of the
capture, not drift, and §2 above governs which one owns each fact.

---

## 9. Next step

`09-SCHEMA-MAPPING.md` is the handoff artifact. It carries per-section
`Setting id | Type | Label | Observed value | Proposed default` tables, the 11 mandatory
Layout & Spacing defaults derived from measured tokens (**64/64/48/48/0/0/1920/24/40/40/20**),
a global-tokens → `settings_schema.json` map, and **35 catalogued zero-hardcode violations** —
ready to brief Implementation Agents against.
