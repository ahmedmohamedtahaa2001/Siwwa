# 9 — Two worked examples

One product from each register, in its final shape.

| Mark | Meaning |
|---|---|
| *(unmarked)* | **Real value** from `../product-data/product-data.json` or `../reference-analysis/raw/` |
| `🔎` | **Researched** — from `reference-fragrances.json`, the referenced original's published data |
| `⚙` | **Computed** — not asked of anyone |
| `✍` | **Authored** — no source exists; a human writes it |
| `⛔` | Forbidden on this register; filling it is a firewall breach |
| `⏸` | Blocked on an open decision (`01-core-fields.md §3` or `04-inspired-by.md §4`) |

Nothing here is invented — the same rule `../product-data/PRODUCT-DATA.md §1` works to:
*"nothing is inferred or invented."*

---

## 1. `mawj` — original

A Siwa original · Arabic on the bottle label · **#2 in the store by reviews (68 @ 4.99★)** · the
salt-ledge photograph · description Format D (free prose, no labelled tiers).

```jsonc
{
  "core": {
    "title":        "Mawj",
    "handle":       "mawj",
    "vendor":       "Siwa Fragrances",         // already correct — one of the 16
    "product_type": "⏸",                       // waits on the concentration decision
    "category":     "Eaux de Parfum",
    "published_at": "2022-06-29",
    "tags":         "⚙ line:originals, status:best-seller, gender:masculine, season:…",
    "options":      [ { "name": "Size", "values": ["30 ml", "50 ml", "100 ml"] } ],  // was "size"
    "variants": [
      { "size": "30 ml",  "price": "800.00",  "compare_at": null, "available": true, "sku": "✍", "grams": "✍" },
      { "size": "50 ml",  "price": "1100.00", "compare_at": null, "available": true, "sku": "✍", "grams": "✍" },
      { "size": "100 ml", "price": "1850.00", "compare_at": null, "available": true, "sku": "✍", "grams": "✍" }
    ],
    "images": [ { "src": "mawj.jpg", "position": 1, "alt": "⚙" } ]   // one image only
  },

  "identity": {
    "title_ar":         "✍ موج",               // the bottle label confirms it; still typed once
    "product_line":     "originals",           // ⚙ derived from vendor
    "provenance":       "✍",
    "collection_story": "⏸",
    "persona":          "⏸",
    "launch_date":      "2022-06-29",          // ⚙ from published_at
    "badge":            "best-seller"          // ⚙ from 68 reviews
  },

  "fragrance": {
    "concentration":     "⏸",                  // one catalogue-wide answer
    "top_notes":         "✍",                  // Format D — no tiers, and no original to reference
    "heart_notes":       "✍",
    "base_notes":        "✍",
    "families":          "✍",
    "card_descriptors":  "⚙ built from families",
    "intensity":         "✍",
    "sillage":           "✍",
    "longevity_hours":   "✍",
    "season_best":       "⚙ from family 1",
    "gender_leaning":    "masculine"           // ⚙ from the Men tag — ⚠ review it, the copy reads aquatic
  },

  "inspired_by": "⛔",                          // original — the whole namespace is off

  "commerce": {
    "layering_compatible": "⚙", "layering_partners": "⚙",
    "bundle_eligible": "⚙", "discovery_eligible": "⚙",
    "cross_sell": "⚙", "quiz_tags": "⚙"
  },

  "story": {
    "the_vibe":          "✍",
    "the_vibe_ar":       "✍",
    "origin_detail":     "✍",                  // ✅ allowed — original
    "ingredient_source": "✍",                  // ✅ allowed
    "artisan_credit":    "✍",                  // ✅ allowed — subject to 06-story.md §5
    "cultural_note":     "✍"                   // ✅ allowed — the first thing to write in this layer
  },

  "reviews": {
    "rating":       { "value": "4.99", "scale_min": 1, "scale_max": 5 },   // Judge.me
    "rating_count": 68
  }
}
```

**`mawj` in one line:** 6 real values · 6 computed · 2 blocked · **the rest authored.** It has the
richest story potential in the catalogue and the thinnest fragrance data.

The one usable seed sits in its own description: `Mawj Citrus , marine, woody Luxurios blend of sea
notes, watery notes, ozonic notes … bitter orange, pineapple … vetiver, violet, iris, jasmine …
oud, musk and sandalwood.` Those are real note names — **they just are not assigned to tiers**, so a
human has to split them. The workbook shows this text beside the note columns.

---

## 2. `bleu-exclusive` — inspired-by

References Bleu de Chanel L'Exclusif · **`tags` completely empty** · published 2026-02-27 ·
19 reviews @ 5.00★ · Format C — it has tiers, but written as sentences.

```jsonc
{
  "core": {
    "title":        "Bleu Exclusive",
    "handle":       "bleu-exclusive",
    "vendor":       "Siwa Fragrances",          // was "Bleu De Chanel L'exclusif" ⚠
    "product_type": "⏸",
    "category":     "Eaux de Parfum",
    "published_at": "2026-02-27",
    "tags":         "⚙ line:inspired-by, …",    // was [] — completely empty
    "options":      [ { "name": "Size", "values": ["30 ml", "50 ml", "100 ml"] } ],  // already "Size" ✅
    "variants": [
      { "size": "30 ml",  "price": "750.00",  "compare_at": null, "available": true },
      { "size": "50 ml",  "price": "1100.00", "compare_at": null, "available": true },
      { "size": "100 ml", "price": "1900.00", "compare_at": null, "available": true }
    ],
    "images": [ { "src": "IMG-3917.jpg", "position": 1, "alt": "⚙" } ]
  },

  "identity": {
    "title_ar":         "✍ optional on the 40",
    "product_line":     "inspired-by",          // ⚙
    "provenance":       "⛔",
    "collection_story": "⛔",
    "persona":          "⏸",                    // personas are open to both registers
    "launch_date":      "2026-02-27",           // ⚙
    "badge":            null                    // ⚙ 19 reviews, below the threshold
  },

  "fragrance": {
    "concentration":   "⏸",
    "top_notes":       "🔎 —",                  // Chanel publishes no full pyramid for L'Exclusif
    "heart_notes":     "🔎 —",
    "base_notes":      "🔎 Sandalwood, Labdanum, Amber, Woody Notes",
    "families":        "🔎 Woody, Aromatic, Amber",
    "intensity":       "✍",
    "sillage":         "✍",
    "longevity_hours": "✍",
    "season_best":     "⚙ Autumn (from Woody)",
    "gender_leaning":  "✍ the copy is written for men, but there is no tag"
  },

  "inspired_by": {
    "house":             "🔎 Chanel",                     // split from the vendor string
    "fragrance":         "🔎 Bleu de Chanel L'Exclusif",
    "retail_price_egp":  "⏸",                             // ⚠ counsel first
    "retail_price_date": "⏸",
    "disclaimer":        "independent_interpretation"
  },

  "commerce": { "…": "⚙ all derived" },

  "story": {
    "the_vibe":          "✍ the current 1,051-character description has usable material",
    "the_vibe_ar":       "✍",
    "long_form":         "✍",
    "origin_detail":     "⛔",
    "ingredient_source": "⛔",
    "artisan_credit":    "⛔",
    "cultural_note":     "⛔"
  },

  "reviews": { "rating": { "value": "5.0", "scale_min": 1, "scale_max": 5 }, "rating_count": 19 }
}
```

---

## 3. The difference, in two lines

```
mawj            inspired_by = ⛔ entirely   ·  heritage story = ✅ entirely
bleu-exclusive  inspired_by = ✅ entirely   ·  heritage story = ⛔ entirely
```

**That is the firewall in the data.** A product with both filled is a breach and must be caught at
the QA gate (`../CLAUDE.md §3` — a gate failure halts the pipeline). In the merchant workbook it
cannot happen, because heritage is a separate 16-row sheet.

---

## 4. What the two examples show

| | `mawj` | `bleu-exclusive` |
|---|:--:|:--:|
| Real core values | 6 | 6 |
| Researched (`🔎`) | 0 | **5** |
| Computed (`⚙`) | 8 | 8 |
| Left to author (`✍`) | **13** | 6 |
| Blocked on a decision (`⏸`) | 4 | 4 |

**The counter-intuitive result:** the inspired-by product arrives more complete than the original,
because its reference fragrance has a published composition and the original has nothing to
reference.

Which restates the finding in `../Planning/BENCHMARK.md Part 2 §5` in data terms — **the 16
originals, the products the entire brand story hangs on, are the poorest-documented part of the
catalogue**: *"the originals aren't just under-told — they're under-merchandised."*

The 13 products needing fragrance data written from scratch are exactly the originals plus the
body-care line. That is where the owner's time goes.
