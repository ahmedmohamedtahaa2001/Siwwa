# 4 — `inspired_by.*`

**The 40 only. On the 16 originals this namespace is a firewall breach** — `02-identity.md §3`.

---

## 1. Keys

| Key | Type | Coverage today | Who supplies it |
|---|---|---:|---|
| `inspired_by.house` | `metaobject_reference` → `designer_house` | 0 / 56 | **derived** — resolved in `reference-fragrances.json` |
| `inspired_by.fragrance` | `single_line_text_field` | 0 / 56 | **derived** — same |
| `inspired_by.retail_price_egp` | `money` | 0 / 56 | ⏸ **blocked** — §4 |
| `inspired_by.retail_price_date` | `date` | 0 / 56 | ⏸ blocked |
| `inspired_by.disclaimer` | `single_line_text_field` | 0 / 56 | one catalogue-wide answer |

**The owner is asked for none of this.** All 40 references were resolved from the `vendor` strings
and verified against the houses' published catalogues on 2026-08-13.

---

## 2. Why two keys and not one

`03-DATA-SCHEMA.md §9.1` proposed a single `custom.inspired_by`.
`../Planning/DIRECTION.md Part 2 §3.2B` corrects it, for a practical reason: the vendor string fuses
house and fragrance.

```
"Bleu De Chanel L'exclusif"   →  Chanel                     · Bleu de Chanel L'Exclusif
"Layton PDM"                  →  Parfums de Marly           · Layton
"Grand Soir MFK"              →  Maison Francis Kurkdjian   · Grand Soir
"40 Knots Xerjoff"            →  Xerjoff                    · 40 Knots
"Symphony LV"                 →  Louis Vuitton              · Symphony
"Oud Cadenza MC"              →  Maison Crivelli            · Oud Cadenza
```

Unsplit, a "house" facet yields **40 entries of one product each** — a list, not a facet. The target
is Oakcha's: houses **with counts** (`DIRECTION.md Part 2 §3.1`).

Two vendor strings did not name their house at all and were identified by research:
**`Summer Hammer` → Lorenzo Pazzaglia** and **`Angels' Share Paradis` → By Kilian**.

### 2.1 Houses after normalisation, with counts

Counted directly from `reference-fragrances.json`: **40 products across 25 houses.**

| House | Siwa products |
|---|---:|
| Louis Vuitton | **5** |
| Kayali | **5** |
| Parfums de Marly | 3 |
| Jean Paul Gaultier | 3 |
| Chanel · Giorgio Armani · Maison Crivelli | 2 each |
| Amouage · Burberry · Bvlgari · By Kilian · Giardini di Toscana · Initio Parfums Privés · Lorenzo Pazzaglia · Maison Francis Kurkdjian · Matière Première · Narciso Rodriguez · Nishane · Prada · Roja Parfums · Sospiro · Stéphane Humbert Lucas 777 · Valentino · Xerjoff · Yves Saint Laurent | 1 each |
| **25 houses** | **40** |

This matches the Kayali figure in `../Planning/DIRECTION.md Part 1 §7` (5) and resolves the
Louis Vuitton grouping, which the audit could only estimate from mixed strings (`LV`, `Louis
Vuitton`).

> The long tail is the point. A facet led by Louis Vuitton (5) and Kayali (5) gives a real browse
> path — *"show me everything inspired by Louis Vuitton"*. `BENCHMARK.md Part 1 §3.3` calls this the
> differentiated facet.

**Counts must render**, as Oakcha's do (`DIRECTION.md Part 2 §3.2B`) — and they are computed from
the products, never stored (`08-metaobjects.md §2`).

---

## 3. Before and after

```jsonc
// before — Google is told the brand is Chanel
{ "vendor": "Bleu De Chanel L'exclusif" }

// after
{
  "vendor": "Siwa Fragrances",
  "inspired_by.house":     "→ metaobject: chanel",
  "inspired_by.fragrance": "Bleu de Chanel L'Exclusif"
}
```

On the page this is one line carrying up to three facts — house, fragrance, and the original's
price — placed under the price and above the notes (`DIRECTION.md Part 2 §3.2A`).

---

## 4. ⚠️ The original's price is a legal decision

`DIRECTION.md Part 2 §3.2C` is explicit:

> **Making the dupe claim louder is a legal-posture decision, not a UX one.** … Oakcha operates in
> the US; Siwa operates in Egypt. **Get counsel before shipping the retail-price comparison** — the
> module can ship without it and still work.

In practice:

| | |
|---|---|
| `inspired_by.house` + `.fragrance` | ✅ ship — this is what fixes the `brand.name` leak |
| `inspired_by.retail_price_egp` | ⛔ **schema yes, values no**, pending counsel |

The workbook reflects this: showing the original's price is a **Settings** toggle defaulted to
**No**, with the reason stated on the sheet.

`retail_price_date` exists because the original's price moves. A figure captured two years ago and
shown as a live comparison is a false claim; any renderer must check the date first.

Type is `money`, not `number_integer` — it carries the currency, and the store is single-market EGP
by design (`DIRECTION.md Part 1 §9.4`).

The broader vendor/dupe posture remains open in `../reference-analysis/PROJECT-CONTEXT.md §7.4` and
`BENCHMARK.md Part 2 §5`.

---

## 5. `disclaimer`

| Value | Meaning |
|---|---|
| `independent_interpretation` | An independent interpretation, not the original |
| `not_affiliated` | No affiliation with the house named |

**The wording is not here.** The key selects *which* disclaimer; the text lives in `locales/en.json`
and `locales/ar.json`. That is the Prime Directive (`../CLAUDE.md §3`) and it also means a lawyer
reviews one file, not 40 products.

Today's state is the opposite failure: the claim is *"made everywhere visually and almost nowhere
verbally"* (`../reference-analysis/07-COPY-CONTENT.md §12.5`) — **one product** says it in prose,
and the other 39 encode it in a field Google reads as the brand.

---

## 6. Where it renders

| Surface | The 40 | The 16 |
|---|:--:|:--:|
| PDP price-contrast line | ✅ | ❌ |
| Product card line | ✅ | ❌ |
| Designer facet | ✅ inspired-by collection only | ❌ |
| `designer_house` landing page | ✅ | — |

`DIRECTION.md Part 2 §5`: *"Inspired-by collection — facet scoped to this collection only"* and
*"Originals collection — **No designer facet**"*.
