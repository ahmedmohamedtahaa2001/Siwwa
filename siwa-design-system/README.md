# Siwa Design System v3.0.0

The single source of truth for how every Siwa surface looks and behaves.

Read **[`DESIGN.md`](DESIGN.md)** first — it is the specification. This file is just how to install
and work with it.

```
siwa-design-system/
├── DESIGN.md                    the specification — principles, tokens, components, rules
├── README.md                    you are here
├── tokens/
│   ├── tokens.json              machine-readable source of truth
│   └── siwa-tokens.css          emitted custom properties
├── css/
│   ├── siwa-base.css            reset · type · layout · bilingual · utilities
│   └── siwa-components.css      every component class
├── tools/
│   └── check-contrast.mjs       recomputes every colour pair, exits 1 on failure
└── preview/
    └── index.html               living reference — open in a browser, toggle RTL
```

---

## Install

Copy into the theme and load **in this order** — the cascade depends on it:

```
tokens/siwa-tokens.css      → theme/assets/siwa-tokens.css
css/siwa-base.css           → theme/assets/siwa-base.css
css/siwa-components.css     → theme/assets/siwa-components.css
```

In `layout/theme.liquid`, before `</head>`:

```liquid
<script>document.documentElement.classList.add('js');</script>

{{ 'siwa-tokens.css'     | asset_url | stylesheet_tag }}
{{ 'siwa-base.css'       | asset_url | stylesheet_tag }}
{{ 'siwa-components.css' | asset_url | stylesheet_tag }}

{%- comment -%} Optional — the Phlur geometry overlay, if in use {%- endcomment -%}
{{ 'phlur-siwa-tokens.css' | asset_url | stylesheet_tag }}
```

The inline `js` class must run **before** the stylesheets. It is what allows `.siwa-reveal` to start
hidden; without it, scrollytelling content renders immediately instead of never appearing.

On the `<html>` element:

```liquid
<html lang="{{ request.locale.iso_code }}" dir="{{ request.locale.iso_code == 'ar' | ternary }}">
```

Setting `lang="ar" dir="rtl"` is the *only* thing needed to switch the store to Arabic. The font
pair, the tracking, the casing, the leading and the entire layout mirror from there.

---

## Quick start

Open the reference page:

```bash
open preview/index.html      # or: python3 -m http.server -d preview
```

Toggle **عربي / RTL** in the top bar to check every component in Arabic. Tab through the page to see
the focus token on each ground.

Check the palette after any colour edit:

```bash
node tools/check-contrast.mjs        # 29 pairs, exits 1 on any failure
node tools/check-contrast.mjs --md   # regenerate the DESIGN.md §2.1 table
```

---

## The three decisions v3.0.0 settled

v3.0.0 merged Siwa DS v2.0.0 with the "Premium Cozy" ecommerce spec. They conflicted on
fundamentals; the full ledger is [`DESIGN.md` §11](DESIGN.md#11--conflict-ledger). The three that
shape everything else:

1. **Palette — v2.0.0's warm Egyptian family.** Parchment, sand, deep green-black ink, rationed
   gold. The Premium Cozy palette is not used.
2. **Shape — two-tier.** The commerce layer stays stamped at 0–2px. Only the editorial and overlay
   layers round (16–24px). The test: *if the customer can transact with it, it does not round.*
3. **Bilingual — full Arabic and RTL parity.** Every inline-axis property is logical. Arabic
   tracking, casing and leading are handled once at the token level, never per component.

---

## Working with it

**Never author a raw value.** No hex, no px, no ms, no z-index in a component. If the token you need
does not exist, add it to `tokens/tokens.json`, mirror it into `tokens/siwa-tokens.css`, and re-run
the contrast check. Never inline it.

**Pick the layer before you write CSS.**

| | Commerce | Editorial |
|---|---|---|
| Members | button · input · card · badge · grid · selector | bento · modal · drawer · story section |
| Radius | 0–2px | 16–24px |
| Shadow | none, at rest **and** on hover | permitted |

**Logical properties only.** `padding-inline-start`, not `padding-left`. `inset-inline-end`, not
`right`. `text-align: start`, not `left`. There are exactly two documented exceptions — CSS
gradients and `order` — and both are mirrored explicitly under `[dir="rtl"]`.

**The seven principles** ([`DESIGN.md` §1](DESIGN.md#1--principles)) are ordered. When two conflict,
the lower number wins:

1. One gold CTA per fold
2. Never colour alone
3. Stamped, not rounded — on the commerce layer
4. No shadow outside the editorial and overlay layers
5. Logical properties, always
6. The price is never gold
7. The tester is a first-class CTA

---

## Two things that will trip you up

**`--colors-border` is decorative.** It measures 1.70:1 and may never be the only boundary of a
control. Inputs, selects, chips, size tiles and steppers use `--colors-border-strong` (3.02:1).

**Seven colour pairs clear their floor by less than 0.05.** They were solved as the smallest possible
shift from v2.0.0's hues, so the corrections stay invisible next to the originals. The cost is that
any change to `--colors-surface` or `--colors-primary` re-opens all seven at once.
`tools/check-contrast.mjs` warns about them on every run. Do not adjust them by eye.

---

## Status

[`DESIGN.md` §3](DESIGN.md#3--component-registry) carries the full component registry, reconciled
against the Feature Bible's IDs — this closes the "open seam" flagged in
[`../Planning/README.md`](../Planning/README.md).

- **12 components** fully specified with CSS shipped
- **12 components** tokenised — CSS shipped, prose spec still to write
- **17 components** open — tracked in [`DESIGN.md` §12](DESIGN.md#12--open), each becomes a §3 spec
  before its feature ships

**Known follow-up:** `phlur-clone` was built against v2.0.0. Its
`mapping/siwa-tokens.json` should be repointed at `tokens/tokens.json` and its override ledger
re-validated — five colour corrections in v3.0.0 touch three of its seven documented overrides.

---

## Related

| Document | What it answers |
|---|---|
| [`../Planning/01-market-research.md`](../Planning/01-market-research.md) | Where Siwa is entering and what the guardrails are |
| [`../Planning/02-feature-bible.md`](../Planning/02-feature-bible.md) | Which features get built, and in which phase |
| [`DESIGN.md`](DESIGN.md) | How every one of those features is allowed to look and behave |
