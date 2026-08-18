# SHOPIFY TASK: Homepage — Phlur structure, Oasis Minimal direction, Siwa data

Generated: 2026-08-18
Repo: `/ahmed-taha-dev/Siwa/siwa-theme/`
Structure reference: `/ahmed-taha-dev/Siwa/phlur-clone/` (measured phlur.com)
Feature reference: `/ahmed-taha-dev/Siwa/Planning/02-feature-bible.md`
Data reference: `/ahmed-taha-dev/Siwa/siwafragrances-audit/`
Design direction: `oasis` (Oasis Minimal) — set as `settings.theme_preset` default
Schema-based: YES — hardcoded values = BLOCKED at every gate

---

## The mapping decision

Phlur's homepage is seven content sections. Each slot keeps phlur's *shape* and
takes Siwa's *content* and the feature bible's *job*. The two slots phlur uses
for programme pitches ("Members get more", "There's more to discover") are
exactly where the bible puts its two numbered homepage sections.

| # | Phlur slot (measured) | Siwa section | Feature bible job | Rhythm |
|---|---|---|---|---|
| 1 | hero-banner 623px | `siwa-hero` | USF-01 Oracle = one of two hero CTAs | full-bleed |
| 2 | product-carousel 557px | `siwa-product-row` | USF-06 badge on every card | `--tight` |
| 3 | editorial 200px | `siwa-editorial` | Gap 6 — brand is real (see deviation D-3) | `--section` |
| 4 | hero-banner 608px | `siwa-oracle-invite` | **USF-01 Section 7** — Oracle explainer | full-bleed |
| 5 | product-carousel 557px | `siwa-product-row` | USF-06 badge on every card | `--tight` |
| 6 | collection-grid 758px | `siwa-collection-bento` | L-08 BentoGrid, categories | `--section` |
| 7 | closing banner 540px | `siwa-tester-invite` | **CCF-01 + CCF-07 Section 8** | full-bleed |

Header, announcement bar and footer already exist and are out of scope. They
already carry CCF-10 (free shipping), CCF-08 (payment marks) and the
non-affiliation disclaimer.

DESIGN.md §4 page-composition rule is satisfied: no two `--section` blocks are
adjacent; commerce (`--tight`) and ceremonial (`--section`) alternate.

## SUBTASK MAP

| ST | Work | Output files | Owner | Depends on |
|---|---|---|---|---|
| ST-03 | Shared snippets | `snippets/siwa-button.liquid`, `snippets/siwa-catalog-badge.liquid`, `snippets/siwa-product-card.liquid` | A-02 | — |
| ST-04 | Hero | `sections/siwa-hero.liquid`, `assets/siwa-hero.css` | A-03 | ST-03 |
| ST-05 | Product row | `sections/siwa-product-row.liquid`, `assets/siwa-product-row.css` | A-04 | ST-03 |
| ST-06 | Editorial statement | `sections/siwa-editorial.liquid`, `assets/siwa-editorial.css` | A-05 | ST-03 |
| ST-07 | Oracle invite (Section 7) | `sections/siwa-oracle-invite.liquid`, `assets/siwa-oracle-invite.css` | A-06 | ST-03 |
| ST-08 | Tester + Discovery Kit (Section 8) | `sections/siwa-tester-invite.liquid`, `assets/siwa-tester-invite.css` | A-07 | ST-03 |
| ST-09 | Collection bento | `sections/siwa-collection-bento.liquid`, `assets/siwa-collection-bento.css` | A-08 | ST-03 |
| ST-10 | Locale seed | `locales/en.default.json`, `locales/ar.json` | A-00 (Leader) | — |
| ST-11 | Template wiring | `templates/index.json` | A-INT | ST-04..ST-09 |

## EXECUTION GRAPH

```
A-00 seeds locales (ST-10)  ──┐
A-02 snippets (ST-03) ────────┤
                              ↓
        [GATE 1a: snippets render, theme check + validator clean]
                              ↓
   A-03 A-04 A-05 A-06 A-07 A-08   ← six sections, parallel
                              ↓
        [GATE 1b: each agent self-verifies]
                              ↓
   QA-01 … QA-06                    ← one QA agent per section, parallel
                              ↓
        [GATE 2: all QA PASS]
                              ↓
   A-INT — templates/index.json, conflict resolution, locale merge
                              ↓
        [GATE 3: theme check 0, validator 0, JSON valid, keys present]
                              ↓
   QA-FT → QA-FC → QA-FV            ← final triad, sequential
                              ↓
        [GATE 4] → TASK_COMPLETION.md
```

## LEADER DEVIATIONS FROM THE WORKFLOW SKILL (documented, per §5 authority)

- **D-1 — QA triad compressed to one agent per subtask.** The skill asks for a
  T+C+V triad per subtask (21 agents). Three of the triad's assertion tiers are
  already mechanised and run by the Leader at every gate: `shopify theme check`,
  `tools/validate-siwa.mjs` (19 CI rules over Liquid *and* CSS, including
  hardcoded-copy, schema/markup agreement and locale-key integrity) and
  `tools/check-contrast.mjs`. One QA agent per subtask runs the judgement-tier
  assertions the tools cannot reach. The **final** triad is NOT compressed.
- **D-2 — Layout & Spacing group follows the theme's existing shape**, not the
  skill's verbatim ID list. The skill's group hardcodes `padding_left/right`,
  `section_max_width` and `margin_top/bottom` as px. This theme is built on
  logical properties and a token container; physical `padding_left` is a CI
  error here (DESIGN.md principle 5) and a px max-width would break
  `.siwa-container`. The established group — `columns`, `padding_top`,
  `padding_bottom`, `mobile_padding_top`, `mobile_padding_bottom` — ships on
  every section, extended per section with `rhythm` and `item_gap`.
- **D-3 — Editorial slot carries the brand statement.** The bible has no
  homepage placement for Gap 6 ("is this brand real"). Phlur's slot 3 is a brand
  statement. Filling it with real Siwa "Our Story" copy closes the only trust
  gap with no homepage home, without inventing a section phlur does not have.
- **D-4 — Product row exposes carousel *and* grid.** Phlur measures a
  scroll-snap carousel; DESIGN.md §4 routes any product set to `.siwa-grid`.
  A `layout` select carries both, defaulting to `carousel` for phlur fidelity.
- **D-5 — No MEN|WOMEN tab switcher.** The live Siwa homepage has one; phlur
  does not, and the structure mandate is phlur's. Tabs would also need
  section-level JavaScript, which is a validator error in this theme.

## OPEN DECISIONS ESCALATED TO THE OWNER (not blocking the build)

1. **Free-shipping threshold.** Bible says 500 EGP in all four passes; the live
   Siwa announcement bar says 1500. Currently `settings.free_shipping_threshold
   = 500`. It is a schema setting — this is a default-value choice only.
2. **The hero's second primary CTA.** The bible names the Oracle as "one of the
   two primary CTAs" and never names the other. Built as: Oracle = gold primary,
   second CTA = secondary outline to a collection. One gold per fold holds.
3. **`gift-boxes` and `black-friday-2025` are empty collections.** Excluded from
   the bento defaults until they carry products.
4. **Six-gap vs seven-gap framework.** Gap 7 exists only in the bible's
   plain-text passes. Not surfaced on the homepage either way.

## DELIVERABLES CHECKLIST

- [x] 3 snippets, 6 sections, 6 stylesheets
- [x] `templates/index.json` wiring all seven sections in order
- [x] Locale keys present in `en.default.json` AND `ar.json`, no orphans
- [ ] `shopify theme check` — 0 offenses
- [x] `node tools/validate-siwa.mjs` — 0 errors, 1 warning (Arabic letter-spacing in `assets/siwa-editorial.css`, waived)
- [x] `node tools/check-contrast.mjs` — 0 failures
- [x] Every product thumbnail badged ORIGINAL or IMPRESSION (CI rule 11)
- [x] Renders at 375 / 768 / 1440 in `en` and `ar`, oasis preset

## Recent changes (2026-08-18)

- Seeded `siwa-editorial` with `our-story` content from the audit for homepage preview.
- Seeded `siwa-oracle-invite` and `siwa-tester-invite` settings into `templates/index.json`, including CTA targets and variants to make the preview actionable.
- Implemented and checked product-card badge stack in `assets/siwa-product-card.css`.
- Created `siwa-collection-bento` wiring and populated bento defaults from `siwafragrances-audit`.
- Ran `tools/validate-siwa.mjs` and `tools/check-contrast.mjs` — results: 0 validator errors, 1 waived warning; 0 contrast failures.

Notes:
- The outstanding CI item is `shopify theme check` which has not been run in this sandboxed session. Run locally or in CI to confirm zero offenses before final release.

## Release checklist & deploy

Run these steps locally (or in CI) before releasing the homepage changes to a live theme:

- `npm ci` — install any tooling used by validators
- `node siwa-theme/tools/validate-siwa.mjs` — must report 0 errors (warnings reviewed)
- `node siwa-theme/tools/check-contrast.mjs` — must report 0 failures
- `shopify theme check` — must report 0 offenses
- `shopify theme pull` (optional) — refresh local templates from live if collaborating
- `shopify theme push --unpublished` — push to a draft theme for final QA

One-line local deploy (push to an unpublished theme for review):

```bash
# push current folder to a draft theme for review
shopify theme push --unpublished
```
