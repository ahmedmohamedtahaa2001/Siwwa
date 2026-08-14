# Input

## Purpose
Every form control that takes typed text: search, newsletter, gift message, contact form, discount
code, review submission. Bilingual and RTL-ready from the start.

## Variants

| # | Name | Class | When to use |
|---|---|---|---|
| 1 | Minimal | `.input` | Default. Canvas fill, hairline border. |
| 2 | Filled | `.input--filled` | On a canvas ground where a bordered box feels heavy. Newsletter rows. |
| 3 | Soft | `.input` | Identical to minimal while `--r-md` is 0. Diverges automatically if the client reverts radius to 10px. |
| 4 | Dark | `.input--dark` | Forms on `--surface-dark` — footer newsletter, dark promo strips. |
| 5 | Icon leading | `.field--icon` | Search and filter fields. The glyph swaps sides under RTL. |

Variant 3 has **no CSS of its own by design**. Both read `--r-md`, so a single token change
reinstates the difference. Duplicating the rule would fork the decision.

## Settings

| Setting ID | Type | Label | Default | Notes |
|---|---|---|---|---|
| `label` | text | Label | — | **Required.** Always rendered. |
| `id` | — | — | `field` | Required, unique. Pairs label to control. |
| `placeholder` | text | Placeholder | — | Never a substitute for the label. |
| `type` | select | Field type | `text` | `text` \| `email` \| `tel` \| `number` \| `search` \| `textarea` |
| `required` | checkbox | Required | `false` | |
| `input_style` | select | Style | `minimal` | `minimal` \| `filled` \| `soft` \| `dark` \| `icon` |
| `icon` | select | Icon | — | Only when `input_style` is `icon`. |
| `hint` | text | Help text | — | Wired via `aria-describedby`. |
| `error` | text | Error message | — | Sets `aria-invalid`. |

## Usage

```liquid
{% render 'input',
   id: 'NewsletterEmail',
   name: 'contact[email]',
   type: 'email',
   label: 'general.newsletter.label' | t,
   placeholder: section.settings.newsletter_placeholder,
   input_style: 'filled',
   required: true,
   autocomplete: 'email' %}
```

## Dependencies
- `css/components.css` — `.field`, `.input`, `.textarea`, `.field__hint`, `.field__err`,
  `.input--filled`, `.input--dark`, `.field--icon`
- `snippets/icon.liquid`

## Accessibility
- A real `<label>` is always rendered and always tied by `id`. A placeholder is never the label —
  it disappears on focus and is invisible to some screen readers.
- The error state is **never colour-only**: it carries visible text plus `aria-invalid="true"`,
  and both hint and error are joined into `aria-describedby`.
- Contrast: ink on Sailcloth (filled) **12.47:1**; on-dark on Black Mesa (dark) **10.55:1**.
- ⚠ **Known finding.** The minimal variant's border is `--hairline` on canvas: **1.71:1**, below
  the 3:1 WCAG 1.4.11 requires for a control boundary. This is the highest-impact instance of the
  system-wide hairline finding, because here the border is the only thing identifying the control.
  Not changed unilaterally — the spec owns the token. Darkening `--hairline` to about `#978b76`
  clears 3:1, and the value is exposed as a theme setting.

## RTL and bilingual
The icon uses `inset-inline-start`, so it moves to the right in Arabic with no direction rule.
`--lh-body` loosens from 1.6 to 1.7 under `[dir="rtl"]` because Arabic needs the extra leading.
Labels and placeholders both come from locale keys or settings, so both translate.
