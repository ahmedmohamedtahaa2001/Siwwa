# Button

## Purpose
The single interactive primitive. Every call to action in the theme renders through it — add to
bag, checkout, shop all, newsletter submit, filter apply. Nothing else may hand-roll a button.

## Variants

| # | Name | Class | When to use |
|---|---|---|---|
| 1 | Minimal | `.btn--secondary` | Secondary actions beside a primary one. Notify-me, continue shopping. |
| 2 | Primary gold | `.btn` | The one action you want taken on the screen. Never two on the same surface. |
| 3 | Dark reverse | `.btn--dark` | On `--surface-dark` strips and the footer, where gold vibrates against the ground. |
| 4 | Ghost link | `.btn--tertiary` | Tertiary navigation that must not compete — "shop all", "read more". |
| 5 | Icon leading | `.btn` + `.btn__icon` | When the glyph adds meaning: add-to-bag, next step, external link. |

The library also ships `.btn--danger` (destructive) and the `sm` / `lg` / `block` sizes.

## Settings

| Setting ID | Type | Label | Default | Notes |
|---|---|---|---|---|
| `label` | text | Button label | — | Required. Merchant-editable, or a locale key. |
| `url` | url | Button link | — | Present → renders `<a>`; absent → `<button>`. |
| `style` | select | Style | `primary` | `minimal` \| `primary` \| `dark` \| `ghost` \| `icon` |
| `icon` | select | Icon | — | Only when `style` is `icon`. |
| `icon_is_directional` | checkbox | Mirror icon in Arabic | `false` | Arrows yes; bag, plus and check no. |
| `size` | select | Size | `md` | `sm` \| `md` \| `lg` |
| `full_width` | checkbox | Full width | `false` | |
| `disabled` | checkbox | Disabled | `false` | |

## Usage

```liquid
{% render 'button',
   label: section.settings.cta_label,
   url: section.settings.cta_url,
   style: section.settings.cta_style %}

{%- comment -%} Icon-leading, mirrored under RTL {%- endcomment -%}
{% render 'button',
   label: 'products.product.add_to_cart' | t,
   style: 'icon',
   icon: 'arrow-right',
   icon_is_directional: true,
   full_width: true %}
```

## Dependencies
- `css/tokens.css` — `--primary`, `--on-primary`, `--r-md`, `--t-button`, `--font-ui`
- `css/components.css` — `.btn` and modifiers, `.btn__icon`
- `snippets/icon.liquid` — for the icon-leading variant

## Accessibility
- Renders `<a>` when a URL is present and `<button>` otherwise, so the element matches the action.
- `:focus-visible` ring is a 2px `--primary` outline at 2px offset, never removed.
- Minimum target 40×40 (`--sm` is 32px high — use it only in dense toolbars, not as a primary tap target).
- A disabled link gets `aria-disabled` plus `tabindex="-1"`; a disabled button gets the real attribute.
- Contrast: ink on gold **4.72:1**, heading on Cameleer hover **6.57:1**, on-dark on dark **10.55:1** — all pass AA.
  The spec's white-on-gold would be 3.48:1 and is not used.

## RTL and bilingual
Padding and gap are logical, so the button mirrors with no direction rule. Directional glyphs flip
only when `icon_is_directional` is set — a bag or plus icon that mirrored would look broken.
Arabic labels use `--font-ar-ui`, swapped at `[dir="rtl"]` in `tokens.css`.

## Notes
- `.btn--danger` uses `--date-red`, which is a Cultural Accent colour. That is a deliberate
  semantic exception for destructive actions and is **not** a two-register violation — it carries
  no heritage meaning. Do not extend the pattern.
