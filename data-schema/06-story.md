# 6 — `story.*`

The only layer the firewall splits **inside itself**: two fields for all 56, four for the 16
originals alone.

---

## 1. Keys

| Key | Type | Available to | Coverage today |
|---|---|---|---:|
| `story.the_vibe` | `multi_line_text_field` | all 56 | 6 / 56 as prose |
| `story.the_vibe_ar` | `multi_line_text_field` | all 56 | 0 / 56 |
| `story.long_form` | `rich_text_field` | all 56 | 5 / 56 as prose |
| `story.long_form_ar` | `rich_text_field` | all 56 | 0 / 56 |
| `story.origin_detail` (+`_ar`) | `single_line_text_field` | **the 16 only** | 0 / 56 |
| `story.ingredient_source` (+`_ar`) | `single_line_text_field` | **the 16 only** | 0 / 56 |
| `story.artisan_credit` (+`_ar`) | `single_line_text_field` | **the 16 only** | 0 / 56 |
| `story.cultural_note` (+`_ar`) | `multi_line_text_field` | **the 16 only** | 0 / 56 |

**Every key has an `_ar` twin.** Not optional: `../CLAUDE.md §6` ("bilingual by default"), and
`../Planning/BENCHMARK.md Part 2 §1` establishes that **the bottle itself is already bilingual** —
`SIWA FRAGRANCES` → `موج` → `EXTRAIT DE PARFUM`. The website is the only place Arabic was removed.

`identity.persona` carries the persona link; the names and descriptions live on the metaobject, not
repeated per product.

---

## 2. Above and below the line

```
story.the_vibe / long_form ......... all 56
  ↑ the copy changes by register, but the field exists for both

story.origin_detail ................ the 16 only
story.ingredient_source ............
story.artisan_credit ...............
story.cultural_note ................
  ↑ filling any of these on an inspired-by product is a firewall breach
```

The reason is written out in `BENCHMARK.md Part 2 §5`:

> Oasis lore draped over a Chanel clone is thin, and it is thin in a way customers and press notice…
> **The lore belongs to the 16, not the 56.**

That is not a style preference — it is the recorded decision `product-register.liquid` implements.
In the merchant workbook it is enforced structurally: **Heritage is a separate 16-row sheet.**

---

## 3. `the_vibe` and `long_form` — what exists

Descriptions are written in **5 incompatible formats**
(`../reference-analysis/_CORRECTIONS.md §2`):

| Format | Count | Contains |
|---|---:|---|
| A | 1 | `THE VIBE` + `FRAGRANCE PROFILE` — the richest template, on one product (`sundaze`) |
| B | **5** | `Persona` / `The Story` — **the best copy in the catalogue** |
| C | 12 | name + accords + labelled note tiers |
| D | 24 | free prose |
| E | 14 | minimal (under 200 characters) |

- `story.the_vibe` ← the `THE VIBE` paragraph from A and the `Persona` paragraph from B → **6 products**
- `story.long_form` ← `The Story` from B → **5 products**

So **51 of 56 need writing.**

> ⚠️ The five Format B products are `absolute-drunk`, `aurableu`, `lost-on-you`, `pink-allure`,
> `pink-arrogance` — three inspired-by, two originals. The best copy in the store was written across
> both registers, and that is fine: `the_vibe` and `long_form` are open to both. Only the four
> heritage fields are restricted.

**Clean before migrating:** 10 products carry inline `style="font-size:16px…"` that overrides the
theme's typography, 20 wrap text in empty `<span>`, and `sundaze` alone carries `data-path-to-node`
artifacts from Shopify's newer editor (`../reference-analysis/03-DATA-SCHEMA.md §3.4`).

---

## 4. The four heritage fields — what they draw on

None exist in any capture. `BENCHMARK.md Part 2 §2` lists the available lore and how much of it the
brand currently uses: **none**.

| Asset | What it is | Used today | Feeds |
|---|---|:--:|---|
| Amazigh identity | Siwans are **not ethnically Arab**; they speak **Siwi**, a Berber language spoken nowhere else in Egypt | ❌ | `cultural_note` |
| Kershef architecture | Buildings of salt and mud quarried from the lakes | ❌ | `origin_detail` |
| Shali Fortress | The 13th-century kershef citadel | ❌ | `cultural_note` |
| Temple of the Oracle | Oracle of Amun; **Alexander crossed the desert in 331 BC** to consult it | ❌ | `cultural_note` |
| Siwan embroidery | A **five-colour** palette — palm green, date red, date yellow, desert brown, black | ❌ | ← the origin of the Cultural Accent Set |
| The sunburst motif | The signature Siwan pattern, tied to Amun-Ra | ❌ | `cultural_note` |
| Silver bridal jewellery | Layered engraved silver (*twet wat*), mother-of-pearl, shells | ❌ | `cultural_note` |
| Salt lakes and springs | The material the architecture is made from | ➖ one photo | `ingredient_source` |

The lore on the site today is **one paragraph on an orphan page** (`/pages/our-story`, linked from
nothing): *"golden sands, shining sun eye and crystal salty lakes.."* — which describes any desert.

---

## 5. ⚠️ `artisan_credit` has a precondition

`BENCHMARK.md Part 2 §6.6` and `../Planning/DIRECTION.md Part 1 §2` set out the Kahina model:
**credit the craft by name, not as decoration.** The counter-example is recorded too — Adrère
Amellal backgrounds Siwan culture into atmosphere, and the corpus names that **the failure mode to
avoid**.

> `story.artisan_credit` gets a value **only if a real collaboration exists.** "Label embroidery by
> the Siwa Women's Cooperative" is an honest sentence if it is true and a fabrication if it is not —
> and the fabrication is worse than leaving the field empty.

The same applies to `identity.badge = authentic-siwan`: `Planning/DesignSystem.md §8` restricts that
badge to products that genuinely carry Arabic naming and a heritage recipe — *"not brand-wide, since
that would dilute it into decoration."*

And `BENCHMARK.md Part 2 §6.2` recommends bringing in a **Siwan cultural consultant** before
shipping any of this material or the palette.

The workbook states this on the Heritage sheet itself, in red, above the input rows.

---

## 6. Where to start

`mawj` is the case every piece of evidence points at (`BENCHMARK.md Part 2 §5`):

- a Siwa original · an Arabic name (**موج**) · **Arabic actually printed on the label**
- the best photograph in the asset set — on a salt ledge
- **#2 in the store by reviews: 68 @ 4.99★**
- and its current description already opens `Citrus , marine, woody`

So `story.cultural_note` for `mawj` is the first thing written in this layer, and the standard the
other 15 are measured against.

The rest: `pink-allure` (a 2026 flagship whose **`tags` array is empty**, so it is unreachable by
any tag-driven browse route) · `pink-arrogance` · `gourmet` · `chocolate-creme` · `coffee-vanilla` ·
`irresistible-vanilla` · the six body-care products · the three bundles.
