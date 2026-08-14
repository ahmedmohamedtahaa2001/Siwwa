# Card

## Purpose
The base container behind every Phase 2 pattern — product card, collection card, feature card,
testimonial card. It owns surface, padding and elevation; the patterns own their content.

**This component is new** (added 2026-08-13). It was the only primitive in the theme brief with no
existing equivalent in the library. It is registered in `js/library.js` as `Card` (Primitives) and
appears in the gallery like any other component.

## Variants

| # | Name | Class | When to use |
|---|---|---|---|
| 1 | Flat tonal | `.card--flat` | Default. Tonal elevation on Sailcloth — depth without a shadow. |
| 2 | Hairline border | `.card--hairline` | On a Sailcloth ground where a flat card would disappear. |
| 3 | Hover lift | `.card--lift` | Grids where the whole card is clickable. Rises on `:focus-within` too. |
| 4 | Vintage surface | `.card--vintage` + `.vintage-surface` | Heritage storytelling and Originals. Never nav, forms or checkout. |
| 5 | Dark | `.card--dark` | Footer strips and dark sections. |

Elevation follows `DesignSystem.md` §6: tonal steps, shadow only under modals. No card casts one.

## Settings

| Setting ID | Type | Label | Default | Notes |
|---|---|---|---|---|
| `style` | select | Card style | `flat` | `flat` \| `hairline` \| `lift` \| `vintage` \| `dark` |
| `padding` | range 8–48 | Padding | — | px. Overrides `--card-pad`. Omit to use the token. |
| `href` | url | Link | — | Present → the whole card becomes `<a>`. |
| `tag` | — | — | `div` | Structural: `div` \| `article` \| `li`. Not merchant-facing. |

## Usage

A snippet cannot wrap caller markup, so content is captured and passed in:

```liquid
{%- capture card_body -%}
  {% render 'image-container', image: product.featured_image, ratio: '4x5' %}
  <h3>{{ product.title }}</h3>
{%- endcapture -%}

{% render 'card',
   style: section.settings.card_style,
   href: product.url,
   content: card_body %}
```

## Dependencies
- `css/tokens.css` — `.vintage-surface` and its grain/vignette/edge-wear effects
- `css/components.css` — `.card` and modifiers

## Accessibility
- When `href` is set the card renders as `<a>`. **Do not nest another link inside it** — pass the
  link as the card itself, or drop `href` and link the title instead.
- `.card--lift` reacts to `:focus-within` as well as `:hover`, so keyboard users get the same cue.
- The lift transform is disabled wholesale by the `prefers-reduced-motion` block in `tokens.css`.
- `card--dark`: on-dark text on Black Mesa is **10.55:1**.
- `card--hairline`: the border is **1.71:1** against canvas, below WCAG 1.4.11's 3:1 for control
  boundaries. Pre-existing across the design system — see `../README.md`. It is decorative here
  rather than the sole means of identifying a control, so the risk is lower than on `.input`.

## RTL and bilingual
Padding is symmetric and the card has no directional affordance, so it mirrors with no extra rule.
`.vintage-surface` effects are radial and directionally neutral.

## ⚠ Two-register note
`vintage` is a heritage treatment. Use it for the 16 Originals and storytelling surfaces only.
On an inspired-by product it breaks the firewall — `Planning/BENCHMARK.md` Part 2 §5.
