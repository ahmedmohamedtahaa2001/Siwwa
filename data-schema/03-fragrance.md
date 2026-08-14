# 3 — `fragrance.*`

**The keystone.** `../Planning/BENCHMARK.md Part 1 §3.2` says it plainly: nothing below this line —
filtering, the quiz, "similar scents", the note pyramid — can be built until notes are structured
data instead of prose in `body_html`.

---

## 1. Keys

| Key | Type | Validation | Coverage today | Who supplies it |
|---|---|---|---:|---|
| `fragrance.concentration` | `single_line_text_field` | choices — §2 | 0 / 56 | **one catalogue-wide answer** |
| `fragrance.top_notes` | `list.metaobject_reference` → `fragrance_note` | — | 0 / 56 | owner (43 pre-filled) |
| `fragrance.heart_notes` | `list.metaobject_reference` → `fragrance_note` | — | 0 / 56 | owner (43 pre-filled) |
| `fragrance.base_notes` | `list.metaobject_reference` → `fragrance_note` | — | 0 / 56 | owner (43 pre-filled) |
| `fragrance.families` | `list.single_line_text_field` | Fragrantica accords — §4 | 0 / 56 | owner (40 pre-filled) |
| `fragrance.intensity` | `single_line_text_field` | `subtle` \| `distinct` \| `powerful` | 0 / 56 | **owner** |
| `fragrance.sillage` | `single_line_text_field` | same three | 0 / 56 | **owner** |
| `fragrance.longevity_hours` | `number_integer` | 1–24 | 0 / 56 | **owner** |
| `fragrance.gender_leaning` | `single_line_text_field` | `masculine` \| `feminine` \| `unisex` | 0 / 56 | owner (21 pre-filled) |
| `fragrance.season_best` | `list.single_line_text_field` | 5 values | 0 / 56 | **derived** — §6 |
| `fragrance.card_descriptors` | `single_line_text_field` | 3 words | 0 / 56 | **derived** from families |

Everything is at zero: the store has no metafields (`../reference-analysis/03-DATA-SCHEMA.md §7`).

### 1.1 Dropped from the earlier draft

**`fragrance.accords` is gone.** Fragrantica's "main accords" *are* the family list — carrying both
meant maintaining one concept in two fields. `families` is the survivor, and its vocabulary is
Fragrantica's accord names (§4).

**`fragrance.card_descriptors` is no longer authored.** It is the first three families joined —
"Woody, Aromatic, Amber" — so it is computed, and the Arabic twin comes from translating the family
vocabulary once rather than per product.

**`fragrance.occasion` is deferred.** Mood and occasion filtering **has no exemplar anywhere in the
corpus** (`../Planning/DIRECTION.md Part 2 §2, §8`). If it is wanted it has to be designed from
Siwa's own review corpus (`../reference-analysis/06-REVIEWS.md`), not copied — so it is not asked
for until that decision is made.

---

## 2. `concentration` — one answer, not 56

Candidates: `Extrait de Parfum` · `Eau de Parfum`, plus `Body Splash` and `Body Lotion` which follow
from the product line.

`01-core-fields.md §3` records the contradiction: **the bottles say `EXTRAIT DE PARFUM`, the JSON-LD
says `Eaux de Parfum`**. Until someone settles it, the key stays empty.

Because the answer is the same for every perfume, the workbook asks it **once** on its Settings
sheet and derives the per-product value from there plus the product line.

---

## 3. Notes — the finding that changes the estimate

The audit records **18 of 56** products with "machine-readable" notes
(`../reference-analysis/_CORRECTIONS.md §2`). True — but check what those 18 contain before
planning on them. From `../product-data/product-data.json`, `bleu-exclusive` (one of the 18):

```
Top Notes:   "Soft citrus freshness with aromatic nuances"
Heart Notes: "Creamy sandalwood blended with warm leathery labdanum"
Base Notes:  "Deep woody amber accords enriched with smooth vanilla and refined woods"
```

That is **copy, not vocabulary**. It cannot become chips or metaobject references until a human
reads the sentence and extracts the names (`Sandalwood`, `Labdanum`, `Vanilla`).

### 3.1 What the research changed

`reference-fragrances.json` closes most of this gap. Every inspired-by product references a real
designer fragrance whose composition is published, so **40 pyramids are now available as actual note
names**, plus 3 originals whose own descriptions carry usable tiers.

| State | Count | Work remaining |
|---|---:|---|
| Note names available from the referenced original | **40** | Verify against the actual juice |
| Labelled tiers in Siwa's own copy | 3 | Verify |
| Nothing at all | **13** | Author from scratch |

That is the difference between "38 products to author" and "13". The other 43 become a **review**
task rather than a **writing** task.

> ⚠️ **The 40 are the originals' compositions, not Siwa's.** They are the best available starting
> point and they are labelled as suggestions in the workbook — never as answers. Two carry weaker
> evidence: `bleu-exclusive` (Chanel publishes no full pyramid) and `marasi` (Xerjoff keeps the
> Join the Club composition secret — the notes are community-attributed).
>
> **One validation exists:** `sundaze` is the only Siwa product publishing its own pyramid, and the
> independently researched pyramid for Armani Power Of You matches it note for note.

### 3.2 Why `metaobject_reference` and not text

| | `list.single_line_text_field` | **`list.metaobject_reference`** ✅ |
|---|---|---|
| "Shop by note" filter | ❌ `Vanilla`, `vanilla`, `Madagascar Vanilla` are three values | ✅ one entity |
| Note icon | ❌ | ✅ `fragrance_note.icon` |
| Arabic name | ❌ repeated per product | ✅ once, on the metaobject |
| "Same note" recommendations | ❌ | ✅ |
| Setup cost | lower | **backfill of 56 products** |

`03-DATA-SCHEMA.md §3.5` said the metaobject was only justified if the merchant would backfill all
56. The research means 43 of those 56 now arrive pre-filled — the condition is met more cheaply than
when it was written.

> ⚠️ **This costs one code change.** `../siwa-theme/snippets/note-pyramid.liquid` lines 46–48 treat
> notes as strings (`| default: ''`). With metaobject references it must loop `.value` and read
> `.name` / `.name_ar` / `.icon`. The parser fallback (lines 50–78) stays — it is what runs today.

---

## 4. Scent families — Fragrantica's main accords

The vocabulary is **Fragrantica main-accord names**
(`../Planning/DIRECTION.md Part 1 §8`, `Part 2 §6`), flat, with a product carrying up to three.

The workbook ships 48 of them. Twenty-one are marked ✔ because they appeared directly in the
2026-08-13 research of the 40 referenced fragrances: Amber · Aquatic · Aromatic · Chypre · Citrus ·
Coconut · Floral · Fresh · Fruity · Gourmand · Musky · Nutty · Oud · Powdery · Rose · Salty · Sweet ·
Vanilla · Warm Spicy · White Floral · Woody. The rest are standard Fragrantica accords carried for
coverage.

> ⚠️ **Do not copy Oakcha's sprawl.** They run 80+ values including compounds like
> *Fruity–Gourmand–Sweet*. `DIRECTION.md Part 2 §6` calls that a data-hygiene failure and rejects it
> for a 56-product catalogue.

> ⚠️ Fragrantica **blocks automated fetching** (403, re-confirmed 2026-08-13). Every accord and
> pyramid used here came from search results reporting the Fragrantica entry, cross-checked against
> the house's own site, Basenotes or Parfumo where available. Open Fragrantica manually before
> treating any of it as a build spec.

---

## 5. The three-step scales

`intensity` and `sillage` share one vocabulary — `subtle` / `distinct` / `powerful` — taken from
Oakcha (`DIRECTION.md Part 2 §2`, `§3.1` items 5–6).

`longevity_hours` is **an integer, not text**, because:

- it can be filtered ("lasts more than 8 hours")
- numerals need to render Arabic in RTL — the locale formats, the metafield just holds the number
- the descriptive string ("7–8 hours") lives in `locales/*.json` with the number interpolated

**None of the three can be derived from anything.** They describe the actual oil, so they are among
the few things the owner genuinely has to supply — today longevity appears in 2 of 56 descriptions
and sillage in 1 (`03-DATA-SCHEMA.md §3.4`).

---

## 6. `season_best` — derived from the first family

Mapping applied by the workbook's Auto-calculated sheet (override by typing over the cell):

| Family 1 | Season |
|---|---|
| Aquatic · Marine · Citrus · Fresh · Salty · Ozonic · Tropical · Coconut | Summer |
| Floral · White Floral · Yellow Floral · Green · Rose · Fruity · Iris · Violet · Herbal · Lavender · Aromatic | Spring |
| Woody · Chypre · Mossy · Earthy · Leather · Powdery · Musky · Fresh Spicy · Patchouli · Conifer | Autumn |
| Amber · Gourmand · Vanilla · Sweet · Oud · Tobacco · Warm Spicy · Smoky · Balsamic · Caramel · Cacao · Honey · Nutty | Winter |

It is a heuristic, shown as a formula rather than hidden, so it can be seen and corrected.

---

## 7. `gender_leaning` — why a metafield, and why only 21 resolve

Current tags: `Men` 28 · `Women` 25 · `Unisex` 4 — and **21 products carry no gender tag at all**
(`../reference-analysis/README.md` finding #2). A tag-driven "for him" facet would silently hide 21
products. `03-DATA-SCHEMA.md §9.5` risk #5 requires the backfill before facets ship.

**`Men` + `Women` on the same product ≠ `unisex`.** 35 products carry a gender tag between them,
holding 53 assignments — so **18 products carry both**, against only 4 tagged `Unisex` explicitly
(counted directly from `../product-data/product-data.json`).

Those 18 each need a human decision: genuinely unisex, or double-tagged to appear in two
collections? **No script can answer that**, which is why only 21 of 56 arrive pre-filled.
