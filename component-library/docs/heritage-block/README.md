# Heritage / storytelling block

## Purpose
Siwan storytelling: the oasis, the ingredients, the making, the people.

**This is the one place the Cultural Accent Set belongs.** Everywhere else it is firewalled off.
Here it is the point — the embroidery palette carries the identity that `BENCHMARK.md` Part 2 finds
almost entirely absent from the current site.

## Variants

| # | Name | When to use |
|---|---|---|
| 1 | Text + image split | The workhorse. Alternate sides down a story page. |
| 2 | Pull quote | One sentence carrying a screen. Vintage surface optional. |
| 3 | Timeline / chapters | Chronology — the oasis, the ingredients, the making. |
| 4 | Artisan attribution | Photo, name, role, quote, product connection. Kahina model. |
| 5 | Full-width cinematic | 21:9 landscape, text overlaid, one Cultural Accent CTA. |

## ⚠ And it must be true

Content to surface (`BENCHMARK.md` Part 2 §2–3): Amazigh identity and the Siwi language; Shali
Fortress; the Temple of the Oracle and Alexander; Kershef salt-clay-mud architecture; the Sunburst
motif; dates, olives and salt as ingredients.

The Kahina model §3 recommends is **quantified** ethics — "X% of revenue to a named partner",
countable items, named cooperatives. Unquantified warmth is exactly what it warns against.

Every field is merchant-authored precisely so that a person who knows the truth writes it.
**Nothing here is generated, and nothing should be invented to fill the layout.**

## ⚠ Artisan attribution names real people

The `artisan` variant publishes a name, a photograph and a quote. **Consent is a prerequisite, not
a nicety.** Do not populate it with stock photography of unnamed people — that is the precise
opposite of the Kahina model it imitates.

## Settings

| Setting ID | Type | Label | Default |
|---|---|---|---|
| `heading` / `heading_ar` | text | Heading / Arabic heading | — |
| `body` / `body_ar` | richtext | Body / Arabic body | — |
| `image` | image_picker | Image | — |
| `quote` / `attribution` | text | Quote / attribution | — |
| `provenance` | text | Provenance detail | — |
| `block_style` | select | Layout | `split` |
| `accent_color` | select | Cultural accent | `none` |
| `enable_vintage` | checkbox | Vintage treatment | `false` |
| `blocks` | array | Chapters or artisans | — |

## Accessibility
- Quotes use `<figure>`/`<blockquote>`/`<figcaption>` so attribution is programmatically linked.
- Chapter numbers and accent rules are `aria-hidden` — decorative.
- The cinematic variant puts text on a photograph: **check contrast against the darkest point of
  the image**, not the scrim colour. `scrim_opacity` is adjustable for exactly this.

## RTL and bilingual
`heading_ar` and `body_ar` render at equal visual weight, not as footnotes — the physical bottles
already carry Arabic. The timeline's connecting line and markers use logical properties.
