# Badge

## Purpose
Small status marker on product cards, PDP galleries and collection tiles. Communicates one fact —
on sale, in stock, new, best-selling, authentically Siwan — and nothing more.

## Variants

| # | Name | Class | When to use |
|---|---|---|---|
| 1 | Sale | `.badge--sale` | Cameleer fill. Only when a compare-at price actually exists. |
| 2 | In stock | `.badge--stock` | With the check glyph. 49 of 158 variants are out of stock, so this carries real information. |
| 3 | Authentic Siwan | `.badge--authentic` | **Originals only.** The one badge using the Cultural Accent Set. |
| 4 | New drop | `.badge--new` | Recently created products. Sailcloth fill with a hairline border. |
| 5 | Best seller | `.badge--bestseller` | Gold border, heading label. Top sellers by review count. |

`.badge--soldout` and `.badge--tag` (scent family) also exist in the library.

## Settings

| Setting ID | Type | Label | Default | Notes |
|---|---|---|---|---|
| `text` | text | Badge text | locale string | Falls back to the locale key for `type`. |
| `type` | select | Badge type | `new` | `sale` \| `in-stock` \| `sold-out` \| `authentic` \| `new` \| `best-seller` |
| `show_icon` | checkbox | Show icon | `false` | Only `in-stock` and `best-seller` have glyphs. |
| `product` | product | Product | — | Optional. Enables the firewall check. |

## Usage

```liquid
{% render 'badge', type: 'in-stock', show_icon: true %}
{% render 'badge', type: 'authentic', product: product %}
```

## ⚠ Two-register firewall — enforced in the snippet

`authentic` is the only badge drawing on the Cultural Accent Set (`--date-red`). It must never
appear on one of the 40 inspired-by products. The snippet does not trust its caller: pass
`product` and an `authentic` badge on a non-Original **silently downgrades to `new`**.

An Original is currently identified by `product.vendor` matching `siwa-fragrances` or
`siwa-original-creation`. When the vendor field migrates to an `inspired_by` metafield
(`reference-analysis/PROJECT-CONTEXT.md` §7.4 — still an open decision), `badge.liquid` is the
single place that changes.

Source: `Planning/BENCHMARK.md` Part 2 §5.

## Dependencies
- `css/components.css` — `.badge` and modifiers, `.badge__icon`
- `snippets/icon.liquid`
- `locales/*.json` — `products.badges.*`

## Accessibility
- Contrast: heading on Cameleer **6.57:1**; white on darkened Dusty Canyon **4.5:1+**;
  white on date red passes; best-seller label (heading on canvas) **11.86:1**.
- **AA correction:** the brief specified gold text on canvas for best-seller — **3.19:1**, below
  the 4.5:1 floor for an 11px uppercase label. The build keeps the gold *border* (3.19:1 clears
  the 3:1 non-text floor) and sets the label to `--heading`. Same visual read, compliant.
- Status is never colour-only: every badge carries text.
- A badge is not a control. It has no focus state and must not be made clickable.

## RTL and bilingual
Arabic strings come from `locales/ar.json`. `products.badges.authentic` renders "أصيل · سيوي".
Letter-spacing and uppercasing are Latin-only conventions and are visually inert in Arabic —
acceptable, but do not add more of them.
