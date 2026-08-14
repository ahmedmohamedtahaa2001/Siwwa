# 5 — `commerce.*`

What connects a product to other products. Every key here feeds a named feature in
`../feature-doc/index.html` — "Basket building" and "Scent quiz".

**Almost none of it is asked of the owner.** Most is computable from the fragrance layer.

---

## 1. Keys

| Key | Type | Who supplies it | Feeds |
|---|---|---|---|
| `commerce.layering_compatible` | `boolean` | **derived** — `product_line` is `layering`, or a body-care product | whether the layering picker shows |
| `commerce.layering_partners` | `list.product_reference` | **derived** — §2 | the picker |
| `commerce.layering_note` / `_ar` | `single_line_text_field` | owner, only if the default reads badly | the suggestion line |
| `commerce.bundle_eligible` | `boolean` | **derived** — every non-bundle product | BYO bundle |
| `commerce.discovery_eligible` | `boolean` | **derived** — every perfume | discovery set |
| `commerce.bundle_items` | `list.product_reference` | **derived** — §3 | the 3 bundles only |
| `commerce.cross_sell` | `list.product_reference` | **derived** — §4 | "you might also like" |
| `commerce.quiz_tags` | `list.single_line_text_field` | **derived** — §5 | the quiz |

The workbook asks for none of these. They appear on its Auto-calculated sheet.

---

## 2. Layering — the highest brand-fit feature

The situation (`../Planning/BENCHMARK.md Part 1 §3.7`):

- `layering-vanilla` is the **#1 product by reviews: 98 @ 5.00★**
- a full layering line exists — Apple, Lychee, Pistachio, Vanilla
- so does `layering-30-ml-bundle` (12 variants)
- so do body splash and body lotion, as layering partners
- **and there is no layering guidance anywhere on the site**

`BENCHMARK.md Part 1 §3.7` calls it *"the lowest-effort revenue feature on this list"*.

### 2.1 Partners are computed, not typed

The pairing rule that works without asking anyone: **a layering product pairs with any perfume whose
families do not already overlap it.** Vanilla layers under an aquatic; it adds nothing to a gourmand
that is already vanilla-led.

So `layering_partners` = the 4 layering products, ranked for a given product by family distance —
computed from `fragrance.families`, which the owner is filling anyway.

The suggestion *line* differs by direction ("add vanilla for a warm base" is not "add Mawj for a
fresh opening"), so `layering_note` stays available as an override — but it defaults to a template
over the partner's dominant family.

### 2.2 The rule that gets broken

All four layering products are **inspired-by** — they clone Kayali (`02-identity.md §2.1`).

> The layering picker uses **UI Chrome only**. No Cultural Accent, no heritage, on the store's most
> popular product.

---

## 3. Bundles — `bundle_items` fixes a live bug

The three bundles currently encode their contents **in the option names**:

```
layering-30-ml-bundle → options: "Layering Lychee", "Layerng Pistachio", "size"
```

`Layerng Pistachio` is a typo, and **Prestige renders the option name as the variant-picker legend**
— so the customer sees it (`../reference-analysis/03-DATA-SCHEMA.md §4.2`).

`commerce.bundle_items` as `list.product_reference` fixes all three at once: contents become data,
the option returns to `Size`, and the typo disappears. The values are derivable from the option
names themselves, so this is a migration script, not a questionnaire.

> Related but separate: bundle compare-at prices are overstated — `layering-30-ml-bundle` shows
> 1,650 against a real 1,350, `marshmallow-bundle` 1,250 against 1,075
> (`../reference-analysis/README.md` finding #9). A pricing issue, not a schema one, but any
> "save X" computed from these fields will inherit the error.

---

## 4. `cross_sell` — computed from families

"You might also like" is a similarity query, not an editorial one: **products sharing at least two
scent families, nearest in price, excluding the same product line.**

That is computable the moment `fragrance.families` is populated, which is why it is not on the
workbook. Distinguish it from layering:

| | `layering_partners` | `cross_sell` |
|---|---|---|
| Means | **wear them together** | you might also like |
| Where | layering module + card | lower PDP |
| Price | resolves to the bundle SKU | separate |
| Firewall | inherits the displayed product's register | same |

Merging them breaks both modules — different logic, different CTA.

---

## 5. `quiz_tags` — and the boundary

The quiz is ranked #5 in `BENCHMARK.md Part 1 §3.5`, and its architecture comes from Skylar
(`../Planning/DIRECTION.md Part 2 §4.2A`). The valuable part is that **the output can be a
combination, not a product**:

```
answers → a primary scent + a suggested layering partner → both added to cart together
```

`quiz_tags` is what makes an answer resolve to a product — and it is derivable from
`families` + `gender_leaning` + `season_best`, so it is generated rather than authored.

> ⚠️ **These tags are internal; the customer never sees them.** The persona names and result copy
> belong to the `persona` metaobject and are written by brand voice —
> `DIRECTION.md Part 2 §4.2B` draws that line explicitly.

> ⚠️ **The quiz question set itself is not documented anywhere.** Both reference quizzes (Skylar and
> Oakcha) are JS-rendered and could not be read; `DIRECTION.md Part 2 §9` logs it as an open item.
> So `quiz_tags` has a shape but not yet a question flow.

---

## 6. Deliberately not a metafield

| Considered | Where it belongs |
|---|---|
| `back_in_stock_demand` (notify-me counter) | **The app, not the product.** Siwa has **10 products fully sold out, 49 of 158 variants out**, and 8 explicit restock pleas in reviews (`BENCHMARK.md Part 1 §3.8`) — but the counter lives in the back-in-stock app |
| `reviews.rating` / `.rating_count` | `07-structured-data.md §3` — Judge.me writes them |
