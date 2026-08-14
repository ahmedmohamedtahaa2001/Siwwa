# AUTHORITATIVE CORRECTIONS — supersedes earlier figures

These figures were re-derived after recovering all 56 PDP captures (24 were initially
Cloudflare interstitials). Any number in any document that conflicts with this file is WRONG
and must be corrected to match.

> ## ⏱ DRIFT NOTE — added 2026-08-12
>
> Every figure below is a **snapshot of the 2026-07-27 capture** and remains correct as of that
> date. The live store has since moved:
>
> | Metric | Capture (2026-07-27) | Live (2026-08-12) |
> |---|---|---|
> | Shop-wide review count | **1,176** | **1,212** |
> | Shop-wide average rating | 4.98 ★ | 4.98 ★ (unchanged) |
>
> `1,176` appears in **11 documents**. Those are **not errors** — they are dated snapshots.
> **Do not mass-edit them.** Cite the capture date instead. Derived figures (the 820
> attributable, the 356 unattributed gap) have not been re-derived against the new total and
> should not be quoted as current without a fresh capture.
>
> Also observed live on 2026-08-12: a **Bundles promo section** now renders on the homepage
> between "New In" and "Best Sellers" — not present in the captured section stack
> (`01-SITE-STRUCTURE.md §5`).
>
> Drift register: `README.md §5`.

## 1. REVIEW FIGURES (was: "344 reviews / 4.986★ / 31 of 56 products")

| Metric | AUTHORITATIVE VALUE | Source |
|---|---|---|
| Shop-wide review count | **1,176** | Judge.me `data-shop-review-count="1176"`, identical on all 56 PDPs + homepage carousel |
| Shop-wide average rating | **4.98 ★** | Judge.me `data-shop-average-rating="4.98"` |
| Reviews attributable to published products | **820** | sum of per-product `data-number-of-reviews` across 56 valid PDP captures |
| Weighted average of those 820 | **4.9807 ★** | computed |
| Products WITH reviews | **54 of 56** | `raw/reviews_complete.json` |
| Products WITHOUT reviews | **2** — `soiree`, `sundaze` | both recently created |
| Review bodies captured (page 1 of each widget) | **241** | `raw/reviews_complete.json` → `bodies[]` |
| Unattributed gap | **356** (1,176 − 820) | corroborates the ≥27 unpublished/deleted products finding |

Top products by review count (THE EARLIER TOP-LIST WAS WRONG — these were all mis-recorded
as zero because their PDP capture was a Cloudflare page):

| Handle | Avg | Count |
|---|---|---|
| layering-vanilla | 5.00 | 98 |
| mawj | 4.99 | 68 |
| boujee-blush | 4.97 | 59 |
| hibiscusex | 4.98 | 56 |
| drunk-gold | 5.00 | 46 |
| caramel-vanigliato | 4.95 | 43 |
| lady-killer | 4.96 | 26 |
| alluring-rose | 4.96 | 24 |
| marasi | 5.00 | 23 |
| bare-glow | 4.95 | 21 |
| citrine | 5.00 | 20 |
| bleu-exclusive | 5.00 | 19 |
| coffee-vanilla | 5.00 | 18 |
| irresistible-vanilla | 4.94 | 18 |
| coco-woods | 4.94 | 16 |

Full per-product table: `raw/reviews_complete.json`.

Lowest-rated products (the only ones below 4.90): `luna-di-roma` 4.78 (9), `insane-pineapple` 4.80 (5).

## 2. DESCRIPTION FORMAT / FRAGRANCE NOTES (was variously "23", "~30", "38")

Authoritative classification of all 56 `body_html` values (`raw/description_formats.json`):

| Format | Count | Description |
|---|---|---|
| A | **1** | `THE VIBE` + `FRAGRANCE PROFILE` (only `sundaze`) |
| B | **5** | Persona / The Story |
| C | **12** | name + accord triplet + labelled note tiers |
| D | **24** | free prose, no labelled tiers |
| E | **14** | minimal / boilerplate (<200 chars) |

**Machine-readable fragrance notes (≥2 labelled tiers): 18 of 56.** Handles:
absolute-drunk, aurableu, bleu-exclusive, bleu-intense, caramel-vanigliato, citrine,
coffee-vanilla, hot-male, iris-elixir, layering-apple, lost-on-you, luna-di-roma,
mango-pineapple, pink-allure, pink-arrogance, soul-poudree, sundaze, sweet-oud.

**13 distinct tier-label spellings** are in use — `Top Notes:` (7), `Heart Notes:` (7),
`Base Notes:` (7), `Top notes:` (5), `Base notes:` (5), `Top notes :` (4), `Middle notes :` (4),
`Base notes :` (4), `Middle notes:` (3), `Top:` (2), `Heart:` (2), `Base:` (2), `Heart notes:` (2).
Note both `Heart` and `Middle` are used for the same tier. Any metafield migration must normalise these.

`body_html` length: min 59 chars, max 1,363, median 227.

## 3. CAPTURE COMPLETENESS

All 56 PDP HTML captures in `raw/products/` are now valid (verified: every file contains
`jdgm-prev-badge` or `shopify-section--main-product`). Any statement in a document that
"24 captures are Cloudflare interstitials" describes the FIRST capture pass only and must be
reworded to note the data was subsequently recovered — the analysis should now reflect 56/56.

NOTE (updated 2026-08-12): the ~25 `raw/products/*.js.json` files that were Cloudflare challenge
responses have since been **deleted**; 31 valid captures remain. Prefer `raw/products.json`
(complete, authoritative) for product data.
