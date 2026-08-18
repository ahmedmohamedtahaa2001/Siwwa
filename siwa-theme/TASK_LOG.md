# Task Log — SIWA Shopify theme

Started: 2026-08-17
Repo: `/ahmed-taha-dev/Siwa/siwa-theme/` (fresh OS 2.0 theme)
Design system: `/ahmed-taha-dev/Siwa/siwa-design-system/` v3.0.0 (loaded, not forked)
Reference: `Planning/02-feature-bible.md`, `Planning/01-market-research.md`
Schema-based: YES — hardcoded values = BLOCKED at every gate

## Owner decisions (locked)

1. **Target is Liquid, not React.** An earlier React/Vite scaffold at
   `/ahmed-taha-dev/Siwa/siwa-component-library/` is abandoned. Its five palettes were
   ported into `assets/siwa-themes.css`; the directory is now dead weight and should be
   deleted.
2. **Fresh OS 2.0 theme**, not Dawn and not an extension of `phlur-clone/generated`
   (which is a fragment: 8 `pl-*` sections, no `layout/`, `config/` or `locales/`).
3. **Five design directions ship as five selectable presets** — one
   `settings.theme_preset` select writing `data-theme` onto `<body>`.
4. **No push to a store.** The only authenticated store is `sorella-custom-avamartech`,
   which is not Siwa. Law 6's live preview is deferred; Gate 4 evidence is
   `shopify theme check` (0 offenses) + local Playwright render across
   5 presets × en/ar × 375/768/1440. The `?preview_theme_id=` link gets wired in when a
   Siwa store is linked.

## Gate 0 — Codebase analysis: **PASS**

Two read-only agents ran in parallel.

**A-01a (CSS + Liquid conventions)** — full class inventory of `siwa-components.css`
(~25 components with exact required DOM), `siwa-base.css` utilities, the bilingual
machinery, phlur-clone's Liquid idioms, and the existing validator's rule coverage.

**A-01b (content + copy)** — six trust gaps verbatim, the P0/P1 component inventory,
and the bilingual copy deck keyed for `locales/*.json`.

### Confirmed baseline
- Naming convention for new files: `sections/siwa-<component>.liquid`,
  `snippets/siwa-<name>.liquid`, `assets/siwa-<component>.css`. Root class
  `siwa-<component>`, elements `__el`, modifiers `--mod`. Never `pl-*`.
- CSS load order is mandatory and belongs in `layout/theme.liquid`, not per section:
  `siwa-tokens.css` → `siwa-base.css` → `siwa-components.css` → `siwa-themes.css`.
  Do **not** load `phlur-siwa-tokens.css` (achromatic Phlur overlay — it would
  override the palette).
- `phlur-clone` shares **no classes and no tokens** with the Siwa DS. Useful as a Liquid
  conventions reference only. `phlur-clone/mapping/siwa-tokens.json` is stale v2.0.0 and
  carries the five colour values that failed AA — never read it.
- The design system ships **zero JavaScript**. Nav toggle, megamenu `aria-expanded`,
  drawer open/close/focus-trap/Escape, scrim, the `.js` flag, the IntersectionObserver
  behind `.siwa-reveal`, search combobox keys, quiz state, stepper, toast lifecycle —
  all unwritten. `.siwa-reveal` content stays invisible until
  `document.documentElement.classList.add('js')` runs in the head.
- `.sr-only` is the design system's visually-hidden class. `.visually-hidden` (Dawn's
  name, used in phlur-clone markup) does **not** exist — copy-pasting that markup
  exposes hidden legends.

### Gate 0 findings that change the build

| # | Finding | Consequence |
|---|---|---|
| F1 | The bento and hero **scrims are hardcoded** `rgba(27, 39, 36, …)` in `siwa-components.css` | They do not follow a preset. Nocturne and Desert will show a Siwa-green scrim over their own grounds. Needs a `--scrim-gradient` token + a per-preset override. **Open defect in `siwa-themes.css`.** |
| F2 | `.siwa-grid` sets `--grid-cols` inside `@media` at specificity (0,1,0) | An inline `style="--grid-cols:3"` — the natural way to wire a Shopify `columns` setting — wins at every viewport and kills the mobile collapse. Emit a class instead. |
| F3 | 17 components in DESIGN.md §3 have **no CSS at all** (SiteFooter, AnnouncementBar, ArticleCard/Body, ProvenienceCard, DiscoveryKit, ReviewsSection, comparison, Authenticity…) | Footer + announcement bar are unavoidable for any theme — highest-priority new CSS. |
| F4 | No cart line item, pagination, breadcrumb, accordion, tabs, filter bar, PDP gallery or PDP layout grid anywhere | All net-new CSS for the P0 templates. |
| F5 | The existing `validator.mjs` covers ~6 of DESIGN.md §9's 19 CI rules, is CSS-only, and cannot see Liquid | Every markup rule (img alt, icon-button aria-label, badge-on-thumbnail, target size, one-primary-per-fold, tester-not-primary, empty-state-link) is unreachable. A Siwa validator needs a Liquid/HTML pass. |
| F6 | `--font-display`, `--font-ui`, `--spacing-card`, `--spacing-bento-gap`, `--spacing-inline` exist in `siwa-tokens.css` but are **missing from `tokens.json`** | Any regeneration from JSON silently drops them and breaks `body` and `.siwa-bento`. Token-pipeline owner needs to know. |

### Blocking copy decisions (human, not agent)

`locales/ar.json` cannot be authored past a stub until #1 is answered; the rest block
individual keys.

1. **The Oracle's Arabic name** — "الحكيم" or "النبي". The bible says test both before
   committing. It is the most-repeated proper noun in the store. Mitigation: one key
   (`siwa.brand.oracle_name`) interpolated everywhere, so the decision changes one value.
2. **Free-shipping threshold** — bible says 500 EGP, DESIGN.md §7.1 says 1,500 EGP.
   Announcement bar, progress bar, trust strip and footer all reference it.
3. **Non-affiliation disclaimer** — three non-identical versions exist. Counsel picks one.
   Gates `en.default.json` shipping at all.
4. **Empty bag / empty search next action** — "Start with a tester →" (DESIGN) vs
   "Let the Oracle guide you" (bible). Two destinations, one string.
5. **Gap 7** ("Will my order arrive safely?") exists only in the bible's v2.0 half, and
   two P0 components cite it. In scope or dead copy?
6. Unwritten copy: Oracle step 6 question, `compass.result.east`, WhatsApp Oracle Q3/Q4,
   English counterparts for the two Arabic-only strings, and **the entire error-message
   set** (five named Second Crossing failure conditions have no customer-facing message).

### Scope corrections from A-01b
- `UnboxingSequenceShowcase` **does not exist** anywhere in the bible — new scope with no
  spec. `PaymentMethodIcons` and `ReturnPolicyBanner` are not named components either;
  their work lives inside `G-02 SiteFooter`, `C-10 TrustSignalBar` and `P-09`.
- P0 components missing from the original brief and now added: `A-01 Button`,
  `L-08 BentoGrid`, `C-02 FeatureRow`, `C-03 SectionHeading`, `C-10 TrustSignalBar`,
  `D-02 ScentFamilyFilter`, `E-04 GiftOptionsPanel`, `QuizStep/Choice/Progress/Result`,
  `ScentMapVisualizer`, `WhyChosenBlock`, `DiscoveryKitOffer`, `PackageInsertCard`,
  `ReportConcernButton`, `WhichOneForYouHelper`, `BothTriedReviews`,
  `DynamicProductSuggestion`, Hero, Search + autocomplete, and the whole PF-01
  bilingual stack.
- Narrower than stated: `P-13` is P0 for the **top 5–10 pairings only**;
  `D-03` is P0 for **pre-built kits only**; `E-07` is P0 **only** as the Oracle-result
  loyalty prompt.

## Gate 1 — Implementation: **PASS** (ST-01, ST-02)

### ST-02 — the three global sections · agent A-02 · PASS

`sections/siwa-announcement-bar.liquid` (405) · `assets/siwa-announcement-bar.css` (219) ·
`sections/siwa-header.liquid` (558) · `assets/siwa-header.css` (183) ·
`sections/siwa-footer.liquid` (490) · `assets/siwa-footer.css` (326).

Leader verification, run independently of the agent's own report:

| Check | Result |
|---|---|
| `shopify theme check` | 13 files, **0 offenses** |
| `node tools/validate-siwa.mjs` | **0 errors, 0 warnings**, 1 documented waiver |
| Raw hex / rgb() in the new CSS and Liquid | none |
| Physical inline-axis properties | none |
| Literal `z-index` | none |
| `<script>` / `{% javascript %}` in any section | none |
| Locale key parity | 129 en keys, 133 ar — no key missing; the 4 extra are correct Arabic CLDR plural forms of `accessibility.bag_count` |

Two items A-02 raised that belonged to the Leader, both now done:
- **Section groups.** A statically rendered `{% section %}` ignores its
  `presets`, so a fresh install would have shown an empty announcement bar.
  `sections/header-group.json` and `footer-group.json` now hold the bar, header
  and footer, and `layout/theme.liquid` uses `{% sections %}`. A merchant can
  reorder the bar against the header, or add a second promotional section above
  the nav, without a developer.
- **The Desert inset shadow.** Flagged by the validator as a commerce-layer
  shadow; on inspection it is `inset 0 -2px` drawing an underline, not
  elevation. Rule interpretation recorded in DEVIATIONS.md #8 — `inset` is
  permitted, every outset shadow on the commerce layer is still an error.

Left open by A-02, tracked: persistent announcement dismissal needs one line in
`siwa-theme.js` (currently `:target`-based, so it resets on the next page view);
search autocomplete's combobox layer; the cart-count announcement node is in
place and wired for whoever builds the cart drawer.

### ST-01 — foundation · Leader

`tools/validate-siwa.mjs` was written to close Gate 0 finding F5. It covers all
13 errors and 6 warnings of DESIGN.md §9 over **both** Liquid and CSS, and adds
four rules this theme needs that the design system predates: hardcoded
customer-facing copy, locale-key integrity across both dictionaries,
schema/markup agreement (a declared-but-unread setting is a dead Customizer
control; a read-but-undeclared setting is a blocker), and dangling
behaviour-layer wiring (a `data-siwa-*` hook the script does not implement is a
dead control).

It is layer-aware where phlur-clone's validator was not: radius and shadow are
judged against the commerce/editorial boundary and against each direction's
`--radius-commerce` / `--shadow-commerce`, so legitimate editorial rules no
longer produce false errors.

Waivers are per-file, per-rule, require a written reason, and are **printed** in
the run rather than hidden — a suppression is a visible decision, not a way to
make the build quiet.

**Verified by negative test**, not by a clean run: a deliberately broken section
and stylesheet produced 16 errors and 2 warnings, one per claimed rule
(physical property, raw colour, z-index, commerce radius, commerce shadow,
outline without a ring, missing alt, unlabelled icon button, unbadged product
card, hardcoded copy, tester-as-primary, missing locale key in both
dictionaries, undeclared setting, dead setting, dead `data-siwa-*` hook,
section-level JavaScript, empty state with no way out). The files were then
removed and the tree re-verified clean.

### Foundation files (ST-01)
- `siwa-theme/` skeleton: `assets/ config/ layout/ locales/ sections/ snippets/ templates/ blocks/ tools/`
- `assets/siwa-tokens.css`, `siwa-base.css`, `siwa-components.css` copied from the design system, unmodified.
- `assets/siwa-themes.css` — all five presets as `[data-theme]` token blocks; preset
  levers (`--radius-commerce`, `--shadow-commerce`, `--label-transform`, `--border-width`,
  `--ornament-display`, `--media-hover-scale`, `--accent-glow`); per-preset Arabic family
  and leading swap; `.on-dark` band re-expressed in tokens; invariant rules (price never
  gold, focus never removed, CTA/badge label inks, reduced motion).
- `tools/check-contrast.mjs` copied (still single-palette — needs the five-preset port).

### Next, in order
1. Port `tools/check-contrast.mjs` to parse all five `[data-theme]` blocks. ~35 pairs each
   including the new `on-primary` / `on-original` / `on-impression` / `on-verified` /
   `silver-strong` / `info` / band pairs. **Nothing downstream is trustworthy until it exits 0.**
2. Fix F1 — tokenise the two hardcoded scrims per preset.
3. `layout/theme.liquid` (load order, `.js` flag inline before the stylesheets,
   `data-theme` on `<body>`, `lang`/`dir` from `request.locale`, skip link first in body),
   `config/settings_schema.json` (theme_preset select + globals),
   `locales/en.default.json` + `ar.json` seeded from the copy deck,
   minimal `templates/*.json`, `.theme-check.yml`. Then `shopify theme check` → 0 offenses.
4. Delete `/ahmed-taha-dev/Siwa/siwa-component-library/`.
5. Gate 1 fan-out: one implementation agent per P0 section, schema-first, each with its
   QA triad (T → C → V).

## Deviations from the design system (ledger)

To be written to `DEVIATIONS.md`. Currently:
1. **Preset layer added.** v3.0.0 assumes one palette. Five presets re-point tokens on a
   `[data-theme]` scope — the same mechanism `.on-dark` already uses.
2. **Papyrus rounds and softens the commerce layer** (14px radius, resting shadow),
   breaking principles 3 and 4. Carried by `--radius-commerce` / `--shadow-commerce`, so
   the other four presets are untouched.
3. **Nocturne is a full dark theme.** §12 decision 4 warns against ad-hoc token
   re-mapping; this is a designed palette gated by the contrast checker instead.
4. **Nocturne lifts the catalog trio's luminance** so the stamps read on an ink ground,
   and flips their label inks. Hues and meanings are unchanged.

---

# Homepage build — Phlur structure · Oasis Minimal · Siwa data

Started: 2026-08-18
Plan: `HOMEPAGE-PLAN.md`
Brief: build the homepage with phlur.com's layout and structure, in the Oasis
Minimal direction, carrying every applicable feature from
`Planning/02-feature-bible.md`, populated from `siwafragrances-audit`.

## Gate 0 — Codebase and reference analysis: **PASS**

Three read-only agents ran in parallel. None of them wrote a file.

**A-01a — phlur layout forensics.** The measured homepage is seven content
sections between the header and footer groups: hero-banner 623.4px →
product-carousel 557.3px → editorial 200px → hero-banner 608.4px →
product-carousel 557.3px → collection-grid 757.7px → closing banner 540px.
Container 1265px, cards 300px wide at a 20px gap on a CSS scroll-snap track with
no JavaScript, collection tiles at 3:4, radius 0 and no shadow anywhere.
It also found that `phlur-clone/generated/templates/index.json` wires only six of
the seven — the closing banner phlur actually renders was never added.

**A-01b — feature bible homepage spec.** The bible is four passes, not two: two
markdown passes and two plain-text passes, and the plain-text passes carry an
entire PART FOUR (PF-01 Bilingual, PF-02 WhatsApp, PF-03 Performance) that
exists nowhere in the markdown. PF-01 and PF-03 are both P0 and both cover "full
website UI", so they bind the homepage despite being absent from the "primary"
version.

The decisive finding: **the bible never defines homepage sections 1–6.** It
anchors only Section 7 (the Oracle explainer) and Section 8 (tester + Discovery
Kit), plus the Oracle as "one of the two primary CTAs" in the hero — and it
never names the second CTA. Everything else about homepage ordering is
unspecified, which is precisely the gap phlur's structure fills.

**A-01c — Siwa audit data spec.** 19 collections, 60 products, 170 variants, EGP
350–2300. All 60 products carry the dupe reference in Shopify's `vendor` field —
16 read "Siwa Fragrances"/"Siwa original creation" (Originals) and 44 name a
third-party house (Impressions). `gift-boxes` and `black-friday-2025` have zero
live products. 14 of 60 products are fully sold out and 59 of 170 variants are
out of stock. `product_type` is null on 59 of 60 and 19 of 60 products have no
tags at all.

### Gate 0 findings that changed the build

| # | Finding | Consequence |
|---|---|---|
| H1 | The bible defines no homepage sections 1–6 | Phlur's structure supplies the ordering; the bible supplies the jobs of slots 4 and 7. Recorded as the plan's section map. |
| H2 | Gap 6 ("is this brand real") has **no homepage placement anywhere in the bible** | Phlur's slot 3 is a brand statement. Deviation D-3 fills it with real Siwa "Our Story" copy — the only trust gap otherwise homeless. |
| H3 | The dupe reference lives in `vendor`, which JSON-LD emits as `brand` | A competitor is being declared the manufacturer. The theme reads the `catalog_metafield` first and treats `vendor` as a last-resort fallback; it does not encode the defect. |
| H4 | Two collections are empty; 14 products are sold out | Every product surface needs a real empty state, and the product row needs an in-stock-only option. |
| H5 | The workflow skill's mandatory spacing group names `padding_left`/`padding_right` | A physical inline-axis property is a CI **error** in this theme (principle 5). Deviation D-2: sections ship the established logical group. |

## Gate 1a — shared snippets (ST-03): **PASS**

`snippets/siwa-button.liquid` (73) · `snippets/siwa-catalog-badge.liquid` (88) ·
`snippets/siwa-product-card.liquid` (~200) · `assets/siwa-product-card.css` (Leader).

Leader verification, run independently of the agent's own report:

| Check | Result |
|---|---|
| `shopify theme check` | 16 files, **0 offenses** |
| `node tools/validate-siwa.mjs` | **0 errors, 0 warnings**, 1 pre-existing waiver |
| Raw hex / rgb() / literal z-index / physical properties in the new files | none |
| `.visually-hidden` (which does not exist in this theme) | none |
| Hardcoded customer-facing sentences | none |
| `.siwa-card__link::after` stretch-anchor claimed by the agent | verified present at `siwa-components.css:324` |

Two Leader corrections on top of the agent's delivery:

- **Status stamps moved back over the media.** A-02 put sold-out and sale in
  `.siwa-card__body`, correctly reasoning that `.siwa-badge--overlay` has only
  one anchor and a second overlay badge would cover the catalog stamp — the one
  badge that may never be hidden. But phlur and the live Siwa site both stamp
  over the media, and 14 of 60 products are sold out, so the body was the wrong
  trade. Added `assets/siwa-product-card.css` with a `.siwa-card__badges` column
  that takes over the anchor and lets the badges inside go static, catalog stamp
  always first. The design system CSS stays byte-for-byte unmodified.
- **`z-index: auto` removed** from that stylesheet — the validator flags any
  literal z-index, and a static box does not take one anyway.

Left open by A-02 and accepted: `catalog.untagged_warning` is a full sentence
inside a `white-space: nowrap` stamp and will overflow its card. That is
deliberate — an untagged product should look broken until it is tagged.

## Design direction

`settings_data.current.theme_preset` and the `theme_preset` schema default are
both now **`oasis`** (Oasis Minimal). Contrast re-run after the change: 200 pairs
across 5 presets, 0 failures.
