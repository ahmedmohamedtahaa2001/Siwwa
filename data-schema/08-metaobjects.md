# 8 — Metaobjects

A metafield holds a value on one product. A metaobject holds an **entity** shared across products —
`Vanilla` written once, with its icon and Arabic name, referenced by twelve products.

The store has **zero metaobjects** today (`../reference-analysis/03-DATA-SCHEMA.md §7`).

Three definitions, in order of importance.

---

## 1. `fragrance_note` — the keystone

Referenced from `fragrance.top_notes` / `heart_notes` / `base_notes` as
`list.metaobject_reference`.

| Key | Type | Required | Note |
|---|---|:--:|---|
| `name` | `single_line_text_field` | ✅ | Fragrantica vocabulary |
| `name_ar` | `single_line_text_field` | ✅ | bilingual is not optional |
| `family` | `single_line_text_field` | ✅ | choices — the Fragrantica accords in `03-fragrance.md §4` |
| `icon` | `file_reference` | ➖ | SVG — the Oakcha iconed-tier pattern |
| `description` | `multi_line_text_field` | ➖ | for a note landing page |
| `description_ar` | `multi_line_text_field` | ➖ | |

```json
{ "name": "Vanilla", "name_ar": "فانيليا", "family": "Vanilla", "icon": "note-vanilla.svg" }
```

### 1.1 How many, and which

**151 distinct notes**, extracted from the published pyramids of the 40 fragrances this catalogue
references (`reference-fragrances.json`). That is the seed vocabulary shipped in the workbook's
Lists sheet, and it will grow as the 13 unreferenced originals are authored.

This is a real answer to a question the audit could not answer: before the research, the note count
was unknowable because the 18 products with tiers wrote them as sentences
(`03-fragrance.md §3`).

### 1.2 Source

`../Planning/DIRECTION.md Part 1 §8` names **Fragrantica** as the note dictionary, and `Part 2 §6`
says to use its **flat vocabulary with multiple values per product** — not Oakcha's compounds.

> ⚠️ Fragrantica **blocks automated fetching** (HTTP 403, re-confirmed 2026-08-13). The 151 names
> came from search results reporting Fragrantica entries, cross-checked against the houses' own
> sites, Basenotes and Parfumo. `DIRECTION.md Part 1 §8` says to open it manually before treating it
> as a build spec — that still applies.

### 1.3 What it unlocks

- a "shop by note" filter — impossible today in any form
- the iconed note pyramid (`../siwa-theme/snippets/note-pyramid.liquid`, variant `iconed`)
- "other fragrances with this note"
- quiz classification
- and the radial `coco-woods` pattern — **that diagram already exists in this repo and is the
  highest-engagement post in the asset set** (`../Planning/BENCHMARK.md Part 2 §6.8`). The design is
  done; only the data was missing.

---

## 2. `designer_house` — the 40 only

Referenced from `inspired_by.house`.

| Key | Type | Required |
|---|---|:--:|
| `name` | `single_line_text_field` | ✅ |
| `slug` | `single_line_text_field` | ✅ |
| `country` | `single_line_text_field` | ➖ |

**25 houses across 40 products**, already resolved in `reference-fragrances.json` — the full
distribution is in `04-inspired-by.md §2.1`.

> **`product_count` is not a field.** Any stored counter goes stale the moment a product is
> published or removed. Count the products referencing the metaobject at render time.
>
> The store already demonstrates this failure in another form: collection `products_count` counts
> unpublished products too, so `for-him` reports 83 against a published catalogue of 56
> (`03-DATA-SCHEMA.md §5.1`).

**Rendering requirement:** counts must appear beside each house in the facet, as Oakcha's do
(`../Planning/DIRECTION.md Part 2 §3.2B`).

---

## 3. `persona` — the shape is ready, the names are not

Referenced from `identity.persona`; feeds the quiz.

| Key | Type |
|---|---|
| `name` / `name_ar` | `single_line_text_field` |
| `tagline` / `tagline_ar` | `single_line_text_field` |
| `description` / `description_ar` | `multi_line_text_field` |
| `image` | `file_reference` |
| `scent_families` | `list.single_line_text_field` |
| `quiz_match_tags` | `list.single_line_text_field` |

### 3.1 Why there are no names here

`DIRECTION.md Part 2 §4.2B` sets the boundary explicitly:

> ⚠️ **Naming boundary.** Take the *tier structure*. Do **not** take the phrase "Core Scents" —
> naming is identity territory and belongs to the Persona system (Okhtein/Penhaligon's model).

**Any list of names in this document would be invention, and this document does not own that
decision.**

What is on record as a model:

| Reference | The model |
|---|---|
| **Okhtein** (Egyptian) | Collections named as archetypes — **Goddess · Poet · Muse · Heir · Nomad**. A luxury Egyptian house, globally legible, unmistakably Egyptian (`BENCHMARK.md Part 2 §3`, archetype C) |
| **Penhaligon's Portraits** | A connected cast — "olfactory fiction", one animal bottle-cap per character (`DIRECTION.md Part 1 §8`) |
| **Skylar** | The "Core Scents" tier structure — the mechanic only, **not the phrase** |

### 3.2 The opening that is already there

**"Explore your Persona" is the most repeated line on the current site, 5 products use "Persona" in
their copy, and it connects to nothing** (`BENCHMARK.md Part 1 §3.5` · `Part 2 §4` fn 7).

The word is already the brand's; the system is what was never built.
`BENCHMARK.md Part 2 §6.7` lists it as item 7: *"Build the Persona system."*

Whichever personas are chosen, they anchor to **the 16 originals** — that is Skylar's anchor-scent
tier (`DIRECTION.md Part 2 §4.2B`), and it is the same place the brand story lives.

---

## 4. Deliberately not metaobjects

| Candidate | Why not |
|---|---|
| `size` | 5 closed values that live as option values. A metaobject adds structure with no payoff |
| `collection_story` | Possibly useful later, but the naming is an open decision (`02-identity.md §4`). Start as `single_line_text_field`; promote it if it needs fields |
| `review` | Judge.me owns reviews. Any second copy goes stale |
