# CLAUDE.md — Siwa Working Agreement

**Mandatory. Applies to every task in `/ahmed-taha-dev/Siwa`, every session, no exceptions —
including the ones that look too small to need it.**

Project: rebuild the storefront for **Siwa Fragrances** (https://siwafragrances.com), an
Egyptian "inspired-by" perfume house. Bilingual EN/AR throughout.

⚠️ **This repository has no version control.** Nothing here is recoverable. Read a file before
you overwrite it, and never delete without asking.

---

## 1. Before you start working — read these, every time

Do not start from memory, from this file's summaries, or from a previous session's recollection.
Open and read them.

### 1.1 The skills — `/ahmed-taha-dev/Siwa/skills` (use these on every task)

| File | What it governs | Weight |
|---|---|---|
| `skills/MultiAgentsWorkFlow.md` | **The approach.** 3,580 lines: Six Development Laws, phase/gate system, agent roster, QA tiers, and the zero-hardcoded-values Prime Directive. This is the master process document | **Binding on every task** |
| `skills/shopify-expert/SKILL.md` | **Shopify domain expertise.** Liquid, theme architecture, Storefront API, apps, checkout, performance. Names which `references/*.md` to pull in | Binding on all Shopify work |
| `skills/epic-design/SKILL.md` | Cinematic 2.5D scroll-storytelling web design | Design work |
| `skills/vintage/SKILL.md` + `DESIGN.md` | 1950s–90s nostalgia design system | Design work |

`skills/shopify-expert/references/` — load the one matching the task:
`liquid-templating.md` (theme/template work) · `storefront-api.md` (headless) ·
`app-development.md` (apps, OAuth, webhooks) · `checkout-customization.md` (checkout UI
extensions, Functions) · `performance-optimization.md` (speed, assets, caching).

`MultiAgentsWorkFlow.md` is *how this project builds* and is always binding. `epic-design/` and
`vintage/` are imported generic design skills — read them for any design or theme task, but the
project's own direction (§1.2) outranks them where they conflict.

### 1.2 The direction — `/ahmed-taha-dev/Siwa/Planning`

Read all three before any design, feature, or theme decision:

| File | What it answers |
|---|---|
| `Planning/DesignSystem.md` | **The design system spec** — palettes, bilingual type, spacing, radius, the vintage layer |
| `Planning/BENCHMARK.md` | Part 1: feature gaps vs feature-rich stores. Part 2: identity, vibe, lore, the Siwa Oasis lore audit |
| `Planning/DIRECTION.md` | Part 1: the selected five references (Amouage · Widian · Kahina · Fueguia · Snif). Part 2: Oakcha + Skylar, scoped to mechanics — the active reference roster |

Cite as `BENCHMARK.md Part 1 §3.4`. `Planning/` numbering starts at `10` and skips `12` — both
deliberate; the sequence continues the audit's `00`–`09`.

### 1.3 The feature programme — `/ahmed-taha-dev/Siwa/feature-doc`

`feature-doc/index.html` — "Siwa Fragrances — Feature Programme". Read it before building any
section or feature; it is what the homepage and sections are wired to.

> **Name clash:** `feature-docs/` (plural) also exists — "Feature Programme, section by section",
> a later per-section expansion. **`feature-doc/` (singular) is canonical**; skim `feature-docs/`
> when you need the section-level breakdown. Do not treat them as duplicates and do not merge
> them without asking.

### 1.4 Facts about the store

`reference-analysis/` is the read-only forensic audit of the live store (captured 2026-07-27).
Enter through `reference-analysis/README.md` — it names the single owning document for every
fact. **`reference-analysis/_CORRECTIONS.md` holds the authoritative figures**: any number
anywhere that conflicts with it is wrong. `reference-analysis/raw/` is ground truth; where
`product-data/` disagrees with it, `raw/` wins.

`reference-analysis/02-DESIGN-SYSTEM.md` documents the **live site's** tokens (monochrome,
Poppins, 0px radius). `Planning/DesignSystem.md` proposes a **new** system. They are a record and
a proposal — never reconcile them.

---

## 2. Always build from the prebuilt component library

`/ahmed-taha-dev/Siwa/component-library` is the built design system: **78 components × 5 variants
= 390 variants**, plus the section library, rendered with the real 56-product catalogue. Plain
HTML + CSS + JS, no build step, no framework, no dependencies.

```
component-library/
├── index.html          Component gallery — 78 components, every variant, "When to use" notes
├── sections.html       Section variants gallery
├── css/tokens.css      Design tokens, verbatim from ../Planning/DesignSystem.md
├── css/components.css  All 78 component styles
├── css/sections.css    Section styles
├── css/library.css     Documentation chrome only
├── js/data.js          56 real products, generated from ../product-data/product-data.json
├── js/library.js       Component registry, renderers, interaction layer
├── js/sections.js      Section registry and renderers
└── img/                6 real photographs from ../instagram-assets/
```

**The rule:**

1. **Never hand-roll a component or section that the library already has.** Open
   `component-library/index.html` and `sections.html` first and find the existing variant.
2. **Compose the library; never fork it.** `homepage/` is the model — it consumes
   `../component-library/` (tokens, components, data, images) and adds only layout, depth and
   motion in its own `css/homepage.css`. Copy that pattern.
3. **Consume tokens, never literals.** Colour, type, spacing and radius come from
   `css/tokens.css` custom properties. Radius is currently sharp (`--r-md: 0`, `--r-full: 0`)
   per the 2026-08-12 client direction — read from the token, don't restate the value.
4. **If the library genuinely lacks something, add it to the library**, in the library's own
   idiom and registry — then use it. Don't leave a one-off living in a page.
5. **Spec beats build.** When `Planning/DesignSystem.md` and `component-library/css/tokens.css`
   disagree, the spec wins — or the spec is updated deliberately, never silently.

For Shopify theme work, the same applies: sections and snippets are the library's components
transplanted into Liquid, not reinvented in it.

---

## 3. The Prime Directive — zero hardcoded values

From `skills/MultiAgentsWorkFlow.md`, and it outranks convenience and speed:

> 🚫 Every piece of content, colour, image, text, spacing, URL or option a merchant might want to
> change MUST be a `{% schema %}` setting (section/block) or a metafield. If any agent produces
> hardcoded values, QA flags it as a **BLOCKER** and the pipeline **HALTS** until fixed.
> "I wasn't sure if it needed to be a setting" is not acceptable — **if in doubt, make it a
> setting.**

May be hardcoded: structural HTML elements, CSS class names, Liquid control flow. Nothing
content-related.

The static build follows the same rule in its own idiom: all copy, prices, links, handles, facets
and SEO live in a config layer (`homepage/js/config.js`), never inline in a renderer.

The **Six Development Laws** in `MultiAgentsWorkFlow.md` §1 are enforced at every gate. Read them
there; do not paraphrase them from here.

---

## 4. Execution flow

Never jump straight to editing files. Follow the phases in `MultiAgentsWorkFlow.md`:

- **Phase 0** — task intake and codebase analysis. Run the full Codebase Audit Checklist yourself,
  including the hardcoded-value scan **baseline**, before any agent is spawned.
- **Phase 1** — decompose into subtasks (`ST-01`, `ST-02`, …), choose the agent roster, output the
  plan using the Section 9 template.
- **Phase 2** — execute in order, honouring the gates. A gate failure halts the pipeline: fix,
  then re-run the gate.
- **Phase 3** — schema enforcement, implementation QA triad, integration, final QA triad. Nothing
  is "done" until the final triad passes.

---

## 5. Every UI change ends with a `trycloudflare` preview link

**This is not reserved for big tasks.** Any time you touch something the user can *see* — a new
page, a new section or component, a CSS or layout tweak, a copy change on a rendered page, a theme
edit, a one-line colour fix — the task is **not finished** until you have handed over a working URL
that resolves from outside this machine.

Not a screenshot. Not a localhost URL. Not "run this command and open it". Not a file path.

> 🚫 **Never hand back a Claude-hosted page.** Do not publish the user's UI to a claude.ai
> Artifact, and do not substitute any other Claude-hosted rendering for the real thing. The user
> reviews the actual files running off this machine, served through a **`trycloudflare` quick
> tunnel** — that is the only preview channel for this project.

### The procedure — static work (component library, sections, homepage, pages, feature docs)

Serve from the **`Siwa/` root**, not from the subfolder — pages reach up into
`../component-library/` for tokens, catalogue and photography:

```bash
# 1. reuse a server if one is already up on the port; several usually are
ss -ltnp | grep 8791 || \
  python3 -m http.server 8791 --bind 127.0.0.1 --directory /ahmed-taha-dev/Siwa &

# 2. reuse the live tunnel if one is already pointed at that port; otherwise open one
cloudflared tunnel --url http://127.0.0.1:8791 --no-autoupdate
# → https://<random>.trycloudflare.com/homepage/index.html
```

`cloudflared` is installed at `/usr/local/bin/cloudflared` — a quick tunnel needs no account, no
login and no config file. Run it in the background and read the `https://….trycloudflare.com`
hostname out of its output; it appears within a few seconds of start.

Then, every time:

- **Verify before sending.** Open the tunnel URL yourself with Playwright and confirm the page
  renders — a dead link is worse than no link.
- **Deep-link to what you changed** (`…/homepage/index.html`, `…/component-library/sections.html`,
  `…/pdp-phlur/index.html`), not just the tunnel root. If you changed several pages, give a link
  per page.
- **Keep the tunnel alive** for the rest of the session and reuse the same URL for later changes,
  rather than issuing a fresh one per edit.
- **State that it is ephemeral**: a quick tunnel URL dies with the process and a new one is issued
  each run. Fine for review, not for circulating.

### Shopify theme work

Give the preview link for the theme you pushed to:
`https://{store}.myshopify.com/?preview_theme_id={id}`. If the storefront is password-protected,
say so and supply the password alongside the link. This project has **no store credentials
committed** — if a task needs store access, ask for them rather than guessing at a store domain.

If the theme cannot be pushed for any reason, fall back to the static tunnel above and say
explicitly that the link is the local render, not the store.

---

## 6. House rules

- **One fact, one owner.** A figure appearing outside its owning document is a citation, not a
  fresh assertion. `reference-analysis/README.md §2` holds the ownership table.
- **Evidence never mixes with direction.** `reference-analysis/` records what is;
  `Planning/` proposes what should be.
- **Derived data cites its source.** `product-data/` and `component-library/` are generated
  layers — each names what it was generated from, as `js/data.js` does.
- **Match the existing conventions** found in Phase 0 — file naming, CSS architecture, registry
  patterns. Never introduce a second convention alongside one that works.
- **Bilingual by default.** EN/AR: one toggle flips `dir`, type families, numerals, layout
  mirroring, `<title>`, meta description, canonical and JSON-LD. Anything new must survive the
  toggle.
- **Report honestly.** If a gate failed, a check was skipped, or part of the scope is blocked,
  say so explicitly with the output.
- **No version control, still.** Read before overwriting; confirm before deleting.

---

**Summary:** read `skills/` (always `MultiAgentsWorkFlow.md`, plus the matching skill), then
`Planning/` and `feature-doc/`, before touching anything. Build from `component-library/` —
compose it, never fork it, never hand-roll what it already has. Zero hardcoded values, ever.
Finish **every** UI change — new page, new section, or a one-line tweak — by handing over a
verified `trycloudflare` link to the real files. Never a Claude-hosted page.
