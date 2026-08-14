# Siwa Fragrances — Project State & Open Decisions

> **Scope, revised 2026-08-12.** This file was originally a self-contained briefing that
> restated the whole audit. Those restatements have been **removed** — they duplicated
> `00-OVERVIEW.md`, `01-SITE-STRUCTURE.md`, `02-DESIGN-SYSTEM.md`, `README.md` and
> `_CORRECTIONS.md`, and had begun to drift from them.
>
> What remains is what **only this file records**: the repository's own state, the proposed-redesign
> conflict, the build methodology, and the open decisions nobody has made.
>
> For store facts start at **[README.md](README.md)** — it names the owning document for every
> fact domain.

---

## 1. What this repository is

```
/ahmed-taha-dev/Siwa/
├── README.md                        ← the repository guide: what each folder is for
├── reference-analysis/              The live-store audit (10 docs) + 12 MB raw capture
├── product-data/                    Curated per-product catalogue, derived from raw/
├── instagram-assets/                18 images — the brand's real visual identity
├── Planning/                        Direction: DesignSystem.md + 4 benchmark docs
├── component-library/               The design system built: CSS tokens, components, js/data.js
└── skills/                          MultiAgentsWorkFlow.md + 2 third-party design skills
```

**Folder-level orientation now lives in [`../README.md`](../README.md)** — including the three
name clashes that cause confusion. This section records only what is *unusual* about the repo.

**There is no theme codebase in this repo.** No `.liquid`, no `package.json`, no git. It is a
planning, audit and design workspace. `component-library/` is the closest thing to code — CSS and
data only, with **no HTML entry point**, so nothing renders yet.

⚠️ **No version control.** Every deletion here is irreversible.

---

## 5. ⚠️ The proposed redesign — and its conflict with the live site

`Planning/DesignSystem.md` specifies a **completely different visual system** from what is live.
It is a **target redesign, not documentation of the current site.**

> ⚠️ **This section analyses the *original* 219-line design doc, which has since been replaced.**
> The table below is kept because the live-vs-proposed *conflict* it documents is still real and
> still undecided (§7.1). But its specific token names — Shadow Warrior, French Silver, Cactus,
> Wilderness — are **from the superseded version** and do not appear in the current file. For the
> tokens actually in force, read `Planning/DesignSystem.md` directly.

| | **Live site (Prestige)** | **Planning/DesignSystem.md (proposed)** |
|---|---|---|
| Mood | Monochrome brutal-minimal | Warm desert / oasis editorial |
| Accent | none (red defined, unused) | **Unforgettably Gold `#b18044`** — single accent |
| Canvas | `#FFFFFF` | **Near White `#f7f5ee`** |
| Cards | white | **Sailcloth `#eae0c4`** (tonal-depth elevation, no shadows) |
| Text | `#1C1C1C` | **Shadow Warrior `#1b2724`** + **Torrefacto Roast `#50251c`** headings |
| Type | Poppins for everything | **Serif display** (Canela/Tiempos-class) + geometric-humanist sans |
| Headings | UPPERCASE @ 0.18em | Sentence case, **no negative tracking** |
| Radius | **0px everywhere** | **10px** on cards/buttons, **pill** on chips — "no sharp-cornered interactive elements" |
| Elevation | flat | tonal steps, shadow only under modals |
| Grid | 4-up / 2-up | 4 / 3 / 2 / 1 at 1440 / 1200 / 768 / 480 |
| Section rhythm | per-instance | 72px desktop → 48 tablet → 32 mobile |
| Container | 85rem xl | 1200px, 24px gutters |
| Footer | light | **Jet Set `#2f3932`** dark |

Other proposed tokens: `Cameleer #e1b160` (hover/sale), `Desert Dust #e4b68a` (hover surface), `French Silver #b8bdbd` (the *only* cool tone, borders only), `Zinc Blend #a38f7e` (secondary text), `Spicy Mix #8b5f4c` (links), `Cactus #5c6c54` (in-stock), `Wilderness #8e8a6c` (tags), `On Dark #d3d8d1`. Spacing base 8px. Touch targets ≥44×44 (WCAG AA).

Its own stated gaps: **no dark mode**, **no cart/checkout components specified**, **hover states incomplete**.

⚠️ **Two things to flag:**
- The doc repeatedly benchmarks against **Pinterest** ("unlike Pinterest's edge-to-edge pin", "same discipline as Pinterest's system"), suggesting it was generated from a Pinterest-referenced design-system template. Whether Pinterest is a deliberate reference for a fragrance brand is an open question.
- **This redesign is a total break from the live site.** Nothing about it is a migration path — it is a from-scratch visual identity. Nobody has recorded a decision confirming that's the intent.

---
## 6. The build methodology (how work is meant to be executed)

`../skills/MultiAgentsWorkFlow.md` (3,580 lines) is the governing framework. Key non-negotiables:

> **Prime Directive: ZERO hardcoded values.** Every heading, paragraph, image, colour, spacing value, CTA, and URL a merchant might want to change MUST be a `{% schema %}` setting or a metafield. QA agents flag violations as BLOCKERS and the pipeline HALTS.

**The Six Development Laws:**
1. **No hardcoded content** — structural HTML, CSS class names and Liquid control flow may be hardcoded; content never.
2. **Native Liquid & functionality** — real `.liquid` sections that work under `shopify theme dev`, never static HTML mockups.
3. **Real dynamics** — genuine `{% for product in collection.products %}` loops and the AJAX API. Repeating items are always **blocks**, never `{% for i in (1..3) %}`.
4. **Scaffold integration** — work on the downloaded theme scaffold, maintain `shopify theme check` at **0 offenses**, respect existing naming conventions.
5. **Schema-first order** — write the complete `{% schema %}` block FIRST, get Leader approval, *then* write markup. Never the reverse.
6. **Live preview after every change** (mandatory) — share the `?preview_theme_id=` link.

**Phases:** 0 (task intake + codebase audit) → 1 (agent plan generation) → 2 (execution order + gate system) → 3 (schema enforcement). Agent roster: Leader, Codebase, Implementation, QA Triads, Integration, Final QA Triad.

`09-SCHEMA-MAPPING.md` is the **designated handoff artifact** into this pipeline. It carries per-section `Setting id | Type | Label | Observed value | Proposed default` tables, the 11 mandatory Layout & Spacing defaults derived from measured tokens (**64/64/48/48/0/0/1920/24/40/40/20**), a global-tokens → `settings_schema.json` map, and **35 catalogued zero-hardcode violations**.

---
## 7. Open questions / things that don't add up

Flag these rather than assuming:

1. **Is `Planning/DesignSystem.md` an approved direction?** It contradicts the live site on every axis (§5). No decision record exists either way.
2. **Rebuild vs. refit?** No doc states whether the goal is a new theme, a fork of Prestige, or fixing the live one in place. The methodology assumes a "downloaded repository scaffold" that isn't in this repo.
3. **`skills/` has been partially restored** (2026-08-12). `MultiAgentsWorkFlow.md` is back at its full 3,580 lines, so §6 below is a summary of a live file rather than the last record of a lost one. Two third-party design skills (`epic-design/`, `vintage/`) now sit alongside it. **Still missing:** the five other project skills this document once listed, including `sorella-brand-voice-profile.md`.
4. **The vendor/dupe posture** — carried forward as-is, or changed? Affects SEO, legal exposure, and the whole browse architecture.
5. **The unattributed-review gap** implies ≥27 products were unpublished or deleted. Nobody has confirmed what they were. Figures: `_CORRECTIONS.md`. One concrete instance found: **Tobacco Vanilla**, which has Instagram creative but no catalog record (`../instagram-assets/README.md`).
6. **No Shopify credentials, store access, or theme scaffold** are present in this repo. The MCP-based skills (CRO agent, theme tweaks, description rewriter) all assume a connected Shopify MCP.

---
