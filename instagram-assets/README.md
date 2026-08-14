# Instagram → Catalog Matched Dataset

**Captured 2026-07-28** from `instagram.com/siwafragrances`, matched against
`reference-analysis/raw/products.json` (catalog snapshot 2026-07-27).

**18 images across 11 posts, 4 products.** Machine-readable: `matched-data.json`.

```
instagram-assets/
├── mawj/             6 images  (3 posts, all carousels)  + mawj.json
├── pink-allure/      6 images  (3 posts)                 + pink-allure.json
├── coco-woods/       4 images  (3 posts)                 + coco-woods.json
└── tobacco-vanilla/  2 images  (2 posts)                 + tobacco-vanilla.json   ⚠️ no catalog match
```

Filenames are `<shortcode>_<frame>.jpg` — traceable to `instagram.com/p/<shortcode>/`.

### `<handle>.json` — the demo product records

Added 2026-07-28. One per product, in the same folder as its imagery. They merge the
catalogue record, the Judge.me reviews and the Instagram capture into the **superset schema
the redesign needs** — notes as tiered objects, per-ml value metrics, per-fragrance colour
tokens, written alt text, occasion/season guidance — none of which the live store holds.

Every file opens with a `_provenance` block splitting each field into **`real`**
(verbatim from a capture), **`derived`** (arithmetic or convention applied to real data) and
**`demo_placeholder`** (invented to fill the layout). Read it before treating any number as
a fact about the business. `known_gaps` carries the data problems each product has.

One deliberate omission: **no review quote is invented anywhere.** Tobacco Vanilla, which has
no reviews, ships with `count: 0` and an empty quote list rather than fabricated testimonials.

---

## The headline finding

**Instagram and the website are two different brands.**

The live store is monochrome Poppins, all-caps at 0.18em tracking, zero border-radius, one
product image per PDP with `null` alt text. The Instagram feed is a fully art-directed
campaign: every fragrance shot in its own colour world, on location or on set, at
1080–1638px, with copy far better than the product descriptions.

The website is not under-designed relative to its budget. It is under-designed relative to
**assets the brand already owns.**

### What the bottles prove

All four products share one bottle: clear glass cylinder, black gloss cap, matte black
wraparound label. The lockup is fixed —

```
    SIWA FRAGRANCES        ← two lines, letterspaced small caps
      Product Name         ← SERIF
   EXTRAIT DE PARFUM       ← small caps
```

Two consequences:

1. **The label type is a serif.** The live site is Poppins-only. `Planning/DesignSystem.md`
   proposes a serif display face and was flagged in `PROJECT-CONTEXT.md §5` as an
   unconfirmed direction that contradicts the live site. The packaging independently
   supports it — the serif redesign is closer to the real brand than the live theme is.
2. **The labels say "EXTRAIT DE PARFUM."** The PDP JSON-LD declares category
   `"Eaux de Parfum"`. One of the two is wrong, and the JSON-LD one is what Google reads.

---

## Per-product summary

| | Mawj | Pink Allure | Coco Woods | Tobacco Vanilla |
|---|---|---|---|---|
| Catalog match | ✅ | ✅ | ✅ | ❌ **none** |
| Vendor | Siwa Fragrances | Siwa original creation | *Vanilla Powder Matiere Premiere* (dupe ref) | — |
| Tags | Best Selling, Men | **empty** | Men, Women | — |
| Prices (EGP) | 800 / 1100 / 1850 | 590 / 850 / 1400 | 850 / 1300 / 2300 | unknown |
| Stock | all in | all in | **100ml sold out** | unknown |
| Reviews | **4.99★ · 68** | 5.00★ · 14 | 4.94★ · 16 | — |
| Notes in `body_html` | prose only | **3 clean tiers** | 4 words | — |
| IG images | 6 | 6 | 4 | 2 |
| Best IG engagement | 47 likes | 41 likes | **122 likes / 16 comments** | 101 likes |
| Colour world | sea teal → navy | blush pink | cream + raw wood | autumn ochre + amber |

### Mawj — `mawj`
Aquatic, masculine, elemental. Best asset is **`mawj/DOTzj9WFZwB_1.jpg` (1638×2047)** — bottle
on a white salt ledge, navy sea horizon, pale sky gradient, glassy reflection, and a large
clean area at the top that takes a headline overlay. The strongest hero candidate in the set.

Voice: *"Not all waves are meant to be chased. Some are meant to be worn."*

Co-marketed with **Marasi** in 2 of 3 posts. No cross-sell exists between the two PDPs.

### Pink Allure — `pink-allure`
Blush, soft-focus, glass-and-liquid refraction. Marketed as a **duo with Pink Arrogance**
in 2 of 3 posts — there is no bundle, no cross-sell and no collection joining them.

Has the **best structured notes in the catalog** (clean Top / Heart / Base tiers, format B
"Persona / The Story") — and a commenter still had to ask *"notes?"*, because no template
renders them as anything but a paragraph.

Its `tags` array is **empty**, so it is unreachable through FOR HER, UNISEX, or any other
tag-driven nav route — for a 2026 flagship launch.

### Coco Woods — `coco-woods`
The most valuable single asset. **`coco-woods/DXH731vCike_1.jpg` (1440×1920)** is a finished
**fragrance-pyramid diagram**: bottle on a raw wooden plinth against warm cream, with three
circular ingredient thumbnails down the left — coconut, vanilla pods, wood chips — each joined
by a thin gold leader line to `TOP NOTES: Coconut` / `MIDDLE NOTES: Vanilla` /
`BASE NOTES: Wood & Musk`.

That is a **design spec for the fragrance-notes component** that `03-DATA-SCHEMA.md` proposes
as a metafield. It is also the highest-engagement post in the whole set (122 likes, 16
comments) — the notes breakdown is what people respond to.

Meanwhile the actual `body_html` is two lines: *"Coco Woods / Notes: Vanilla, musk, coconut
powder, palo santo."* The Instagram captions describe the product better than the store does.

The 2300 EGP 100ml — the most expensive variant in the entire catalog — is **sold out** with
no back-in-stock capture.

### ⚠️ Tobacco Vanilla — no catalog record
**Not in the 56-product catalog.** No handle, no title, no vendor match. (Two unrelated
products merely mention tobacco in their notes.) Both posts are dated Jan–Feb 2026, *before*
the 2026-07-27 capture, so "created later" is ruled out — it is unpublished, discontinued,
or pending relaunch.

This is a concrete instance of the **356-review gap** in `_CORRECTIONS.md` (1,176 shop-wide
vs 820 attributable ⇒ 27+ unpublished products). A commenter asking *"موجوده؟"* ("is it
available?") corroborates it.

It also has the **best photograph in the set** — `tobacco-vanilla/DUEWP1fCO4Q_1.jpg`
(1440×1920), bottle on dry autumn leaves in raked warm light with vanilla pods laid across
the foreground — and the most literary copy, at 101 and 68 likes with 24+ comments.

**Blocked for a template page** until the client supplies price, sizes and stock.

---

## What the comments are telling you

Across all 11 posts, the same four things recur:

| Signal | Examples | Fix |
|---|---|---|
| **Price opacity** | "Price?", "السعر", "ب كام", "Hm"/"HM" (*bekam* — how much) — on nearly every post | Price in-caption, and a link to the PDP |
| **Restock demand** | "It might be available again. Please 😢", "E3mlolha restock b2aaa", "موجوده؟" | Back-in-stock notification |
| **Notes not discoverable** | "notes?", "Details plz", "what is the notes for it" | The Coco Woods pyramid, as a component |
| **Gender ambiguity** | "it is for ladies, right?" (on a product tagged *both* Men and Women) | Explicit wear guidance |

None of this is served by the current site. Every post has no price, no notes, no stock
state and no PDP link.

---

## Palettes extracted (per-fragrance colour worlds)

| Product | | | | | |
|---|---|---|---|---|---|
| **Mawj** | `#7FA9A6` sea teal | `#1F4E79` horizon navy | `#AFCFE3` sky | `#F2F3EF` salt | `#141414` label |
| **Pink Allure** | `#EBD3D2` blush | `#F2DCDC` petal | `#B98A8C` rose shadow | `#FBF1F0` highlight | `#171416` label |
| **Coco Woods** | `#EFE9E0` cream | `#A8886A` raw wood | `#5B3A28` warm brown | `#C6A87C` gold hairline | `#1A1714` label |
| **Tobacco Vanilla** | `#C89A3C` ochre | `#8C5A2B` rust | `#D9A441` amber juice | `#E8C98A` highlight | `#3B2617` shadow |

Every one of these is **warm-neutral with a single saturated accent** — except Mawj, which is
the cool outlier. That is exactly the structure `Planning/DesignSystem.md` describes, and it
suggests the design system should carry a **per-product accent token** rather than one global
gold.

---

## Caveats

- Captured **logged-out**, so some frames are served below their upload resolution
  (848–1131px rather than 1080–1440px). Full-resolution originals would need either an
  authenticated session or the client's own asset library.
- Like/comment counts are as of 2026-07-28 and will drift.
- Carousel frame counts reflect what the logged-out player exposed. A carousel could have
  more frames behind the login wall.
- Palette hex values are read from the imagery, not sampled programmatically — treat as
  art-direction guidance, not final tokens.
