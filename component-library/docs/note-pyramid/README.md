# Note pyramid / fragrance profile

## Purpose
The scent breakdown — top, heart and base notes. PDP centrepiece, and the hero card's supporting
detail. Modelled on Oakcha's iconed tiers and Siwa's own Coco Woods Instagram post.

## ⚠ Read this before using it: the data does not exist yet

| Fact | Figure | Source |
|---|---|---|
| Products with machine-readable notes (≥2 labelled tiers) | **18 of 56** | `_CORRECTIONS.md` §2 |
| Distinct tier-label spellings in use | **13** | `_CORRECTIONS.md` §2 |
| Custom metafields on the store | **0** | `03-DATA-SCHEMA.md` §7 |

`Heart` and `Middle` are both used for the same tier. The `fragrance` namespace is a
**recommendation**, not something that exists. For roughly **38 of 56 products this component will
render its empty state today** — and that is the correct behaviour. It must never invent notes.

### Three-step resolution

1. `product.metafields.fragrance.{top,heart,base}_notes` — the target state.
2. A parser over `product.description`, normalising the 13 spellings. **Lossy**: it downcases for
   matching, so note names are re-capitalised with CSS `text-transform`.
3. Nothing found → the empty state, or nothing at all with `hide_when_empty`.

The rendered element carries `data-notes-source="metafield|parsed|none"` so the gap is auditable
in the page rather than invisible.

## Variants

| # | Name | Class | When to use |
|---|---|---|---|
| 1 | Three tiers iconed | `.pyramid` | Default. Note names as scent chips beside a tier glyph. |
| 2 | Pyramid graphic | `.pyramid--graphic` | Visual triangle, apex to base. Decorative PDP moment. |
| 3 | Minimal list | `.pyramid--list` | Densest. Labelled rows, no icons. Cards and compact PDPs. |
| 4 | Radial diagram | `.pyramid--radial` | Concentric rings — the Coco Woods pattern. |
| 5 | Heritage provenance | `.pyramid--heritage` | Serif labels, Cultural Accent rules, provenance sub-label. **Originals only.** |

## Settings

| Setting ID | Type | Label | Default | Notes |
|---|---|---|---|---|
| `product` | product | Product | — | Required |
| `style` | select | Style | `iconed` | |
| `show_icons` | checkbox | Show tier icons | true for `iconed` | |
| `hide_when_empty` | checkbox | Hide when no notes | `false` | Renders nothing at all |
| `accent_color` | select | Cultural accent | `none` | Heritage variant, Originals only |
| `heading` | text | Heading | — | Optional |

## Usage

```liquid
{% render 'note-pyramid',
   product: product,
   style: section.settings.note_pyramid_style,
   hide_when_empty: true %}
```

## Recommended fix

A metafield migration into the `fragrance` namespace, normalising `Heart`/`Middle` and the 13
spellings, would move all 56 products to step 1 and let the parser be deleted. That is a data task
and is out of scope for the component.

## Accessibility
- Tier glyphs are `aria-hidden`; the tier is named in text.
- Notes are comma-split into chips for the iconed variant; each chip is inert text, not a control.
- The empty state is real, readable text — not a blank box.

## RTL and bilingual
Tier labels come from `products.notes.*` in both locales. Note *values* are product data and are
currently English only; translating them needs the metafield migration first.
