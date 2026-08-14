# Chip / Filter tag

## Purpose
Compact toggle for scent families, collection facets, size selection and active-filter pills.
Powers the faceted browsing that `BENCHMARK.md` Part 1 flags as a gap — the live store has no tag,
vendor or size facets at all.

## Variants

| # | Name | Class | When to use |
|---|---|---|---|
| 1 | Inactive neutral | `.chip` | Default unselected facet. Sailcloth fill, hairline border. |
| 2 | Active dark | `.chip[aria-pressed="true"]` | Selected facet. Ink fill, canvas label. |
| 3 | Scent tag | `.chip--scent` | Fragrance family labels. Incense fill — a different job from a facet. |
| 4 | Outlined | `.chip--outline` | On a Sailcloth ground where the filled chip has no contrast. |
| 5 | Removable | `.chip--removable` | Active filters shown above a grid, each with a close control. |

## Settings

| Setting ID | Type | Label | Default | Notes |
|---|---|---|---|---|
| `text` | text | Label | — | From a setting or a locale key. |
| `style` | select | Style | `neutral` | `neutral` \| `active` \| `scent` \| `outline` \| `removable` |
| `active` | checkbox | Active | `false` | Sets `aria-pressed`. |
| `count` | number | Facet count | — | Rendered muted. |
| `url` | url | Link | — | Present → renders `<a>` for navigation instead of `<button>` for toggling. |
| `removable` | checkbox | Removable | `false` | Shows the close control. |

## Usage

```liquid
{%- comment -%} Facet toggle {%- endcomment -%}
{% render 'chip', text: value.label, count: value.count, active: value.active %}

{%- comment -%} Active filter, removable {%- endcomment -%}
{% render 'chip', style: 'removable', text: value.label, url: value.url_to_remove %}
```

## Dependencies
- `css/components.css` — `.chip`, `.chip--scent`, `.chip--outline`, `.chip--removable`, `.chip__x`
- `snippets/icon.liquid`
- `locales/*.json` — `collections.filters.remove_filter`

## Accessibility
- Renders `<button>` with `aria-pressed` when it toggles state, `<a>` with `aria-current` when it
  navigates. The two are not interchangeable — a facet that changes the URL is a link.
- The close control carries an accessible name built from the filter's own label
  (`"Remove filter Gourmand"`), not a bare "×".
- Contrast: ink on Sailcloth **15.04:1**; canvas on ink (active) **15.04:1**;
  heading on Incense (scent) **4.83:1**.
- ⚠ The neutral and outline borders are `--hairline` at **1.71:1** — the system-wide finding in
  `../README.md`. The chip's fill differentiates it even when the border is imperceptible, so this
  is lower-risk than on `.input`.

## RTL and bilingual
Gap, padding and the close control all use logical properties — the chip mirrors with no direction
rule. The `×` glyph is directionally neutral and is deliberately **not** flipped.
