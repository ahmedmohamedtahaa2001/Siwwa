# Siwa — Shopify theme

The deployable Liquid layer. It carries **no design of its own**: every class it renders is
defined in `../component-library/`, and every asset in `assets/` is a generated copy.

> **Status: all four phases built.** Tokens and primitives (Phase 1), patterns (Phase 2), modules
> (Phase 3) and 24 sections (Phase 4). `shopify theme check`: **74 files, 0 offenses.**
>
> Not yet verified: the Judge.me markup has never run against a live install, because this
> repository has no store credentials.

## Why a theme folder and not a component-per-folder tree

Shopify requires `sections/`, `snippets/` and `assets/` to be **flat**. A path like
`sections/hero/hero.liquid` is not loaded. So the documentation structure and the deployable
structure are separated:

| Purpose | Location |
|---|---|
| Deployable theme | `siwa-theme/` — flat, theme-check clean |
| Per-component docs, variants, settings | `../component-library/docs/<name>/` |
| Component CSS + tokens (source of truth) | `../component-library/css/` |

## Build

```bash
# after editing component-library/css/*.css
tools/build-theme-assets.sh
```

`assets/siwa-tokens.css` and `assets/siwa-components.css` are **generated**. Editing them directly
loses the change on the next build. Edit the library instead.

## Check

```bash
cd siwa-theme && shopify theme check
```

Result: **74 files inspected, 0 offenses.**

## Deploy

No store credentials exist in this repository (`reference-analysis/PROJECT-CONTEXT.md` §7.6), so
the theme has not been pushed and no `?preview_theme_id=` link exists. To deploy:

```bash
shopify theme push --unpublished --store <store>.myshopify.com
```

## Structure

```
siwa-theme/
├── .theme-check.yml
├── layout/theme.liquid          The bilingual spine. Settings -> CSS custom properties.
├── config/
│   ├── settings_schema.json     Tokens as merchant settings: colour, type, layout, radius.
│   └── settings_data.json
├── locales/
│   ├── en.default.json          Storefront strings
│   ├── ar.json                  Arabic, including plural forms (zero/one/two/few/many/other)
│   └── en.default.schema.json   Theme-editor labels
├── snippets/
│   ├── icon.liquid              Inline SVG by name, ported from the library's ICON map
│   ├── button.liquid            5 variants
│   ├── badge.liquid             5 variants + the two-register firewall
│   ├── card.liquid              5 variants
│   ├── input.liquid             5 variants
│   ├── chip.liquid              5 variants
│   └── image-container.liquid   5 ratios
├── assets/                      GENERATED — see Build
├── sections/                    Phase 4
└── templates/                   Phase 1 placeholders; real templates arrive with sections
```

## How bilingual works

`layout/theme.liquid` reads `request.locale.iso_code`. Arabic sets `dir="rtl"` on `<html>`, which
triggers the `[dir="rtl"]` block in `tokens.css` to swap `--font-display` and `--font-ui` for the
Arabic families and loosen body leading from 1.6 to 1.7. `title`, `description` and `canonical`
follow the locale. Components mirror through logical properties, not direction-specific rules.

Arabic is added under **Settings → Languages** in the admin, then translated. Shopify's font picker
has no Arabic families, so the Arabic stacks are text settings with an optional webfont URL.

## The two rules that outrank convenience

1. **Zero hardcoded content.** No visible string is written in a snippet. If a merchant might want
   to change it, it is a setting or a locale key.
2. **The two-register firewall.** Cultural Accent colours appear only on the 16 Originals and on
   heritage storytelling — never on the 40 inspired-by products. `badge.liquid` enforces this in
   code rather than trusting its caller.
