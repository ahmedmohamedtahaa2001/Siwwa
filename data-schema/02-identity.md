# 2 — `identity.*`

What the product **is** — and, more importantly, what is allowed to appear on it.

`identity.product_line` is the only key in this folder that changes the *shape* of a page rather
than its contents.

---

## 1. Keys

| Key | Type | Validation | Required | Coverage today | Who supplies it |
|---|---|---|---|---:|---|
| `identity.title_ar` | `single_line_text_field` | — | originals | 0 / 56 | **owner** |
| `identity.subtitle` | `single_line_text_field` | ≤ 60 chars | no | 0 / 56 | owner |
| `identity.subtitle_ar` | `single_line_text_field` | ≤ 60 chars | no | 0 / 56 | owner |
| `identity.product_line` | `single_line_text_field` | choices — §2 | **yes, 56/56** | 0 / 56 | **derived** |
| `identity.provenance` | `single_line_text_field` | — | no | 0 / 56 | owner |
| `identity.collection_story` | `single_line_text_field` | choices, TBD | no | 0 / 56 | ⏸ open decision |
| `identity.persona` | `metaobject_reference` → `persona` | — | no | 0 / 56 | ⏸ open decision |
| `identity.launch_date` | `date` | — | yes | — | **derived** from `published_at` |
| `identity.badge` | `single_line_text_field` | choices — §5 | no | 0 / 56 | **derived** |

`title_ar` and `provenance` are read by shipped Liquid under `fragrance.*` today — three lines to
change, listed in `README.md §4`.

**`launch_date` is derived, never typed.** `published_at` is populated 56/56 and spans 2021-08-20 →
2026-07-25 (`../reference-analysis/03-DATA-SCHEMA.md §1.1`).

> ⚠️ `created_at` is not a substitute: 45 products share `2025-09-07` (a bulk import) and
> `updated_at` is **identical across all 56** (a store-wide touch). Neither is a launch date.

---

## 2. `product_line` — the partition, and it sums to 56

Five mutually exclusive values:

| Value | Count | Which | Register |
|---|---:|---|---|
| `originals` | **7** | `mawj` + the six marked `Siwa original creation`: `chocolate-creme`, `coffee-vanilla`, `gourmet`, `irresistible-vanilla`, `pink-allure`, `pink-arrogance` | `original` |
| `inspired-by` | **36** | the remaining EDPs whose vendor names a designer fragrance | `inspired` |
| `layering` | **4** | `layering-apple`, `layering-lychee`, `layering-pistachio`, `layering-vanilla` | **`inspired`** ⚠️ |
| `body-care` | **6** | `apple-pie`, `marshmallow`, `silk-vanilla`, `sweet-rum`, `vanilla-91`, `silk-vanilla-body-lotion` | `original` |
| `bundle` | **3** | `layering-30-ml-bundle`, `marshmallow-bundle`, `vanilla-bundle` | `original` |
| | **56** | | **16 original / 40 inspired** ✅ |

### 2.1 The Layering line is inspired-by

All four clone Kayali — their vendors are `Eden Juicy Apple kayali`,
`Eden Sparkling Lychee 39 Kayali`, `Yum Pistachio Gelato Kayali`, `Vanilla 28 Kayali`
(`03-DATA-SCHEMA.md §2.2`, and now resolved in `reference-fragrances.json`).

Which means:

> **`layering-vanilla` — the store's #1 product by reviews (98 @ 5.00★) — gets no Cultural Accent
> and no heritage block.** It is a commercial product.

That is not an oversight; it follows directly from `../Planning/BENCHMARK.md Part 2 §5`. Any design
that assumes "the layering line is Siwa's own identity" breaches the firewall.

### 2.2 An open count discrepancy

`vendor` says **6** products are `Siwa original creation`. The `original-creations` collection
reports **8** (`03-DATA-SCHEMA.md §2.3`) — and collection counts include unpublished products
(`§5.1`), so the 8 may be 6 published + 2 drafts.

**Do not guess.** This needs Admin API access; logged in `10-migration.md §6`.

---

## 3. The firewall

```liquid
{%- capture register -%}{%- render 'product-register', product: product -%}{%- endcapture -%}
{%- assign register = register | strip -%}
```

| Element | `original` (16) | `inspired` (40) |
|---|:---:|:---:|
| Cultural Accent Set (`DesignSystem.md §2`) | ✅ | ❌ |
| `badge-authentic-siwan` | ✅ | ❌ |
| `heritage-block` | ✅ | ❌ |
| `identity.title_ar` at equal weight to the Latin name | ✅ | ➖ if written |
| `story.origin_detail` / `.ingredient_source` / `.artisan_credit` / `.cultural_note` | ✅ | ❌ |
| `story.the_vibe` / `.long_form` | ✅ | ✅ |
| `inspired_by.*` and price contrast | ❌ **ever** | ✅ |
| Designer facet | ❌ | ✅ |
| `note-pyramid` variant `heritage` | ✅ | ❌ (use `iconed`) |

Sources: `../Planning/DIRECTION.md Part 2 §5` (the integration map, line by line) ·
`Planning/DesignSystem.md §2–3` · `Planning/BENCHMARK.md Part 2 §5`.

> **Derived from `vendor` today, from `product_line` tomorrow.** Once `identity.product_line` is
> populated 56/56, change `product-register.liquid` to read it. **No other theme file changes** —
> that is why the snippet exists.

In the merchant workbook the firewall is enforced structurally: heritage lives on a **separate
16-row sheet**, so the 40 inspired-by products cannot be given heritage by accident.

---

## 4. `provenance`, `collection_story`, `persona`

| Key | Carries | Decided by |
|---|---|---|
| `provenance` | A short origin line beside the product name on the vintage card | brand voice |
| `collection_story` | The narrative collection — Amouage model | ⏸ **open** |
| `persona` | Reference to a `persona` metaobject | ⏸ **open** |

> ⚠️ **Persona and collection names are not a data decision.** `DIRECTION.md Part 2 §4.2B` draws the
> line explicitly: take the *tier structure*, not the *words*. The reference models are Okhtein
> (Goddess / Poet / Muse / Heir / Nomad) and Penhaligon's Portraits — but Siwa's own set is written
> by whoever owns brand voice, in both languages, not by this document.
>
> The **schema** is ready (`08-metaobjects.md`). The values await a decision.
>
> Worth knowing: **"Explore your Persona" is the most repeated line on the current site and points
> at nothing** (`BENCHMARK.md Part 2 §4` fn 7). The word is already the brand's.

---

## 5. `identity.badge` — derived

One merchandising badge, separate from sale and stock badges.

| Value | Source |
|---|---|
| `best-seller` | review count ≥ a threshold set once on the workbook's Settings sheet |
| `new-drop` | `identity.launch_date` within the last N days |
| `limited` | manual |
| `staff-pick` | manual |

The pattern is Skylar's (`DIRECTION.md Part 2 §4.2D`) — **the mechanic only**. The words a customer
reads live in `locales/en.json` and `locales/ar.json`.

---

## 6. Two real products

```jsonc
// mawj — original
{
  "identity.title_ar":     "موج",          // owner writes it; the bottle label confirms it
  "identity.product_line": "originals",    // derived
  "identity.launch_date":  "2022-06-29",   // derived from published_at
  "identity.badge":        "best-seller"   // derived from 68 reviews
}

// bleu-exclusive — inspired-by
{
  "identity.title_ar":     null,           // optional on the 40
  "identity.product_line": "inspired-by",
  "identity.launch_date":  "2026-02-27",
  "identity.badge":        null,           // 19 reviews, below the threshold
  "identity.provenance":   null            // filling this would breach the firewall
}
```

Full examples in `09-examples.md`.
