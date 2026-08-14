# Feature card

## Purpose
USPs and service promises, "how it works" steps, and heritage storytelling blocks. Five distinct
layouts sharing one settings surface.

## Variants

| # | Name | Class | When to use |
|---|---|---|---|
| 1 | Icon + heading + body | `.usp__i` | Service promises — 14-day return, support, payment protection. |
| 2 | Image left, text right | `.iwt` | Alternating rows down a story page. Reverses with `reverse`. |
| 3 | Text over image | `.fcard--overlay` | Mid-page statements. Serif heading on a scrim. |
| 4 | Numbered step | `.fcard--step` | How-it-works and layering flows. Large gold numeral. |
| 5 | Heritage block | `.fcard--heritage` | Arabic + Latin at equal weight, accent rule, provenance line. |

Variant 1 reuses the library's existing `.usp__i` tile rather than restyling it — the live store
already has this section and it works.

## Bilingual at equal weight

`heading_ar` is **not** a translation footnote. In the heritage variant it renders at the same
optical size and colour as the Latin heading, stacked beneath it. The physical bottles already
carry Arabic; the website dropping it is precisely the gap this closes
(`BENCHMARK.md` Part 2 §4).

## ⚠ Two-register note
`heritage` and `accent_color` are for genuine Siwan content — the oasis, Amazigh identity, the
Siwi language, Kershef architecture, Shali Fortress, the Sunburst motif, named cooperatives. Not
for dressing up a dupe.

## Settings

| Setting ID | Type | Label | Default |
|---|---|---|---|
| `heading` / `heading_ar` | text | Heading / Arabic heading | — |
| `body` / `body_ar` | richtext | Body / Arabic body | — |
| `image` | image_picker | Image | — |
| `icon` | select | Icon | — |
| `number` | text | Step number | — |
| `provenance` | text | Provenance detail | — |
| `cta_label` / `cta_url` | text / url | Button | — |
| `style` | select | Layout | `icon` |
| `reverse` | checkbox | Reverse split | `false` |
| `accent_color` | select | Cultural accent | `none` |
| `scrim_opacity` | range 0–80 | Overlay opacity | 45 |

## Dependencies
`image-container` · `button` · `icon` · `css/components.css` (`.fcard`, `.usp__i`, `.iwt`)

## Accessibility
- `heading_tag` keeps the outline correct — `h2` when the card is a section's main unit, `h3`
  inside a grid under a section heading.
- The step number is `aria-hidden`: "01" spoken before every heading is noise.
- Overlay text sits on a photograph — check contrast against the darkest point of the image.
- Icons are decorative; the heading carries the meaning.

## RTL and bilingual
`.iwt--rev` reverses via `direction: rtl` on the grid with children reset to `ltr`, so the visual
order swaps without the text direction changing. Under an Arabic page this composes correctly —
verify `reverse` visually when both are in play, as the two flips can cancel out.
