---
name: shopify-multi-agent-workflow
description: >
  Full multi-agent orchestration framework for ANY Shopify theme development task.
  Use this skill whenever a user presents a Shopify task — building sections, editing layouts,
  adding features, fixing bugs, migrating themes, or managing store content — and you need
  a structured, quality-controlled execution plan with multiple specialized agents.
  ALWAYS trigger this skill when: the user says "do this shopify task", pastes client
  requirements for a Shopify store, asks to build/edit/fix anything in a Shopify theme, or
  provides a task description. Also trigger when the user mentions schema-based approach,
  pixel-perfect cloning, Liquid sections, metafields, JSON templates, or Claude Code
  multi-agent loops for Shopify. This skill must be used even for partial tasks — the agent
  structure prevents implementation mistakes that only appear at QA time.
  Core constraint enforced by ALL agents: ZERO hardcoded values — every text string, color,
  spacing, URL, and option MUST be a schema setting or metafield. No exceptions ever.
---

# ═══════════════════════════════════════════════════════════════
# SHOPIFY MULTI-AGENT WORKFLOW — ULTIMATE SINGLE-FILE REFERENCE
# ═══════════════════════════════════════════════════════════════
#
# This single file contains EVERYTHING:
#   - Core laws and non-negotiable rules
#   - Phase 0: Task intake & codebase analysis
#   - Phase 1: Agent plan generation
#   - Phase 2: Execution order & gate system
#   - Phase 3: Schema-based enforcement rules
#   - All agent briefs (Leader, Codebase, Implementation, QA Triads,
#     Integration, Final QA Triad)
#   - Schema patterns library (copy-paste ready)
#   - QA assertions reference (all tiers)
#   - Agent plan output template
#   - Live preview rules
#   - Conditional agents roster
# ═══════════════════════════════════════════════════════════════


# ╔══════════════════════════════════════════════════════════════╗
# ║  SECTION 1: CORE LAWS — READ BEFORE ANYTHING ELSE           ║
# ╚══════════════════════════════════════════════════════════════╝

## The Prime Directive (Applies to EVERY Agent, EVERY Subtask, EVERY File)

> 🚫 **ZERO hardcoded values.**
> Every piece of content, color, image, text, or URL that a merchant might want to change
> MUST be a `schema` setting (sections/blocks) or a metafield. This is non-negotiable.
> If any agent produces hardcoded values, QA agents MUST flag it as a BLOCKER and the
> pipeline HALTS until fixed. "I wasn't sure if it needed to be a setting" is NOT an
> acceptable reason — if in doubt, make it a setting.

## The Six Development Laws (All Agents Enforce All Six)

**Law 1 — NO HARDCODED CONTENT**
Every heading, paragraph, image, video, CTA button, color, and spacing value must be mapped
to a fully editable `{% schema %}` block so it is 100% manageable via the Shopify Theme
Customizer. There are no exceptions. Structural HTML elements (`<div>`, `<h2>`, `<button>`),
CSS class names, and Liquid control flow (`{% if %}`, `{% for %}`) MAY be hardcoded.
Everything content-related CANNOT be.

**Law 2 — NATIVE LIQUID & FUNCTIONALITY**
Write clean Liquid files (`.liquid`), synced with responsive CSS/JS in `assets/`. Never
output static HTML/CSS mockups pretending to be Shopify sections. The output must be real
Shopify theme code that works with `shopify theme dev`.

**Law 3 — REAL DYNAMICS**
All product grids, collections, cart drawers, and toggles must be genuinely dynamic using
Shopify loops (`{% for product in collection.products %}`) and the Shopify AJAX API where
needed. No fake/static product cards. No hardcoded product counts. Repeating items are ALWAYS
blocks, never a fixed `{% for i in (1..3) %}`.

**Law 4 — SCAFFOLD INTEGRATION**
Work directly on top of the existing downloaded repository scaffold. Maintain `shopify theme
check` linting compliance with **0 offenses** at all times. Respect the existing naming
convention discovered by the Codebase Agent. Do not introduce a new naming pattern.

**Law 5 — SCHEMA-FIRST ORDER**
Implementation Agents MUST write the complete `{% schema %}` block FIRST, have it approved
by the Leader, then write the Liquid markup. Never write markup before schema. Never.

**Law 6 — LIVE PREVIEW AFTER EVERY CHANGE (MANDATORY)**
Every time theme files are changed — and again when a task or subtask is declared done —
the dev server MUST be running and the **SHAREABLE live test preview URL** shared with
the user. The user is NEVER given `http://127.0.0.1:9292` — localhost is for internal
agent QA only (curl checks, Playwright). The user gets the same links `shopify theme dev`
prints in its output:

- **Preview link (share this):** `https://{store}.myshopify.com/?preview_theme_id={DEV_THEME_ID}`
  — renders the development theme on the real storefront, works from any device/browser,
  and reflects file changes as `shopify theme dev` syncs them.
- **Editor link (also share):** `https://admin.shopify.com/store/{store-handle}/themes/{DEV_THEME_ID}/editor`
  — opens the Theme Customizer on the development theme.

```bash
# Start the dev server in the background, capturing output (only if not already running)
shopify theme dev > /tmp/theme-dev.log 2>&1 &

# Wait for startup, then extract the SHAREABLE preview link — this is what goes to the user:
sleep 10
grep -oE 'https://[a-z0-9-]+\.myshopify\.com/\?preview_theme_id=[0-9]+' /tmp/theme-dev.log | head -1

# Fallback if the log link isn't found — construct it from the development theme ID:
shopify theme list --json | python3 -c "
import json, sys
themes = json.load(sys.stdin)
dev = next(t for t in themes if t.get('role') == 'development')
print(dev['id'])
"
# Then share: https://{store}.myshopify.com/?preview_theme_id={THAT_ID}
```

Rules for live preview:
- Trigger: after any edit to `sections/`, `snippets/`, `blocks/`, `assets/`, `config/`,
  `layout/`, `locales/`, or `templates/`, and at every QA gate and completion report.
- Reuse, don't stack: if `shopify theme dev` is already running, DO NOT spawn a second
  one. It syncs changes automatically. Confirm it's alive and re-share the SHAREABLE URL
  (the `?preview_theme_id=` link — re-extract it from the log if needed).
- Report: every final message to the user MUST include the
  `https://{store}.myshopify.com/?preview_theme_id={id}` link (never localhost) and which
  pages/sections to navigate to see the change.
- Multi-agent runs: the Leader owns the preview server. Implementation and QA agents verify
  against `http://127.0.0.1:9292` internally, but every user-facing report carries the
  shareable link. Gate 4 is invalid without a shareable live preview the user can open.
- If the server fails to start (auth expired, store not linked), surface the exact error
  and the command the user needs to run (e.g., `shopify auth login`). Never silently skip.


# ╔══════════════════════════════════════════════════════════════╗
# ║  SECTION 2: HOW TO USE THIS SKILL                           ║
# ╚══════════════════════════════════════════════════════════════╝

When triggered with a Shopify task, you (Claude) do NOT execute the task directly.
You GENERATE the orchestration plan. The plan is handed to Claude Code (or the user's
multi-agent environment) which executes it.

Your job when this skill is triggered:
1. Read and fully understand the task
2. Run Phase 0 — Codebase Analysis (yourself, before spawning agents)
3. Decompose into subtasks
4. Decide the agent roster
5. Generate the full agent plan using the templates in Section 9
6. Output the complete plan document

The user then takes that plan and runs it in Claude Code with sub-agents.


# ╔══════════════════════════════════════════════════════════════╗
# ║  SECTION 3: PHASE 0 — TASK INTAKE & CODEBASE ANALYSIS       ║
# ╚══════════════════════════════════════════════════════════════╝

Run this before writing a single agent instruction. These steps are done by YOU (the skill),
not by an agent. The Codebase Agent (A-01) runs its own deeper analysis later.

## 0A. Task Decomposition

Break the task into subtasks. A subtask is a unit of work that:
- Has a clear, verifiable output (a file changed, a section created, a feature working)
- Can be done by one agent without depending on another in-progress subtask
- Takes ≤ 2 hours of focused work

Write subtasks as:
```
ST-01: [verb] [what] → [expected output file/result]
ST-02: [verb] [what] → [expected output file/result]
```

**When to split a subtask into two:**
- Implementation touches more than 3 different files
- Estimated work exceeds 2 hours
- One part has a dependency on external data (API, metafields, CSV)
- Schema changes affect multiple sections (schema change = own subtask)

## 0B. Codebase Audit Checklist

Before writing agent instructions, these bash commands establish the baseline.
Either you run them, or you instruct the Leader to run them as part of Gate 0.

```bash
# 1. Theme structure overview
ls -la sections/ snippets/ blocks/ assets/ config/ locales/ templates/ layout/

# 2. OS 2.0 confirmation
ls templates/*.json | wc -l
cat templates/index.json | head -30

# 3. Full Liquid file map
find . -name "*.liquid" | sort | grep -E "^./(sections|snippets|blocks|layout)/"

# 4. Schema baseline — understand existing settings patterns
cat config/settings_schema.json | python3 -m json.tool | head -100

# 5. Existing section naming pattern (MUST enforce consistency)
ls sections/ | sed 's/-[^-]*$//' | sort -u

# 6. Snippet naming pattern
ls snippets/ | head -20

# 7. Asset naming pattern (CSS/JS)
ls assets/ | grep -E "\.(css|js)$" | head -20

# 8. CSS custom properties (design tokens) — what variables exist?
grep -h "^\s*--" assets/*.css | sort -u | head -30

# 9. CSS architecture — per-section or monolithic?
ls assets/*.css | wc -l
ls assets/*.css

# 10. Hardcoded value scan BASELINE (run BEFORE implementation, diff AFTER)
grep -rn --include="*.liquid" \
  -E '(rgba?\([0-9]|#[0-9a-fA-F]{3,6}|font-size:\s*[0-9]|"[A-Z][a-z]{4,}")' \
  sections/ snippets/ blocks/ \
  | grep -v "{{.*settings\|schema\|t }}" | head -30

# 11. Task-specific keyword search
ls sections/ | grep -i "[KEYWORD_FROM_TASK]"
grep -r "[KEYWORD]" templates/*.json

# 12. Metafield namespaces in use
grep -rn "metafields\." sections/ snippets/ | grep -oP 'metafields\.\w+\.\w+' | sort -u

# 13. Git status
git status
git log --oneline -5

# 14. Playwright/visual QA setup check
ls -la .playwright* playwright* tests/ 2>/dev/null || echo "No Playwright config found"
```

## 0C. Reference URL / Design Spec

If the user provided a reference URL (e.g., vegamour.com) or screenshots:
- Note the URL for the Codebase Agent and Final Verifier (QA-FV)
- Use it for schema defaults — e.g., if the reference hero is 600px tall, default = 600
- Do NOT hardcode pixel values — expose them as `range` schema defaults
- The QA-FV agent will use Playwright to screenshot both the reference and implementation

## 0D. Decide Agent Roster

Core agents (always present): A-00, A-01, one Implementation Agent per subtask,
one QA triad (T+C+V) per subtask, A-INT, QA-FT, QA-FC, QA-FV.

Add conditional agents based on the task:

| Agent ID | Role | Add When |
|---|---|---|
| A-RTL | RTL Agent | Task involves Arabic/RTL — consult `shopify-bidirectional-localization` skill |
| A-PERF | Performance Agent | Section has images, videos, or heavy JS |
| A-DATA | Data Migration Agent | Task involves metafields, CSV imports, or product data |
| A-TRANS | Translation Agent | Task adds new Liquid strings needing `ar.json` keys |
| A-ASSET | Asset Agent | Task requires new CSS/JS files in `assets/` |
| A-TMPL | Template Agent | Task creates or modifies `templates/*.json` |
| A-DEPLOY | Deploy Agent | Task needs Shopify CLI push or GitHub Actions |

**Agent count formula:**
```
Total = 10 (core) + (N_subtasks × 3 subtask QA) + conditional_agents
Example: 3-subtask task with RTL + assets = 10 + 9 + 2 = 21 agents
```


# ╔══════════════════════════════════════════════════════════════╗
# ║  SECTION 4: PHASE 1 — GENERATE THE AGENT PLAN               ║
# ╚══════════════════════════════════════════════════════════════╝

Once Phase 0 is complete, produce the plan with this structure:

```
# SHOPIFY TASK: [Task Name]
# Generated: [date]
# Repo: [REPO_PATH]
# Reference: [REFERENCE_URL or "none"]
# Schema-based: YES — hardcoded values = BLOCKED at every gate

## AGENT ROSTER
[table: Agent ID | Role | Subtask | Runs After]

## SUBTASK MAP
[ST-01 through ST-NN with owner agent, output files, dependencies]

## EXECUTION GRAPH
[dependency diagram — see Phase 2]

## AGENT BRIEFS
[one filled brief per agent — use templates from Section 6-8]

## QA GATES
[Gate 0 through Gate 4 conditions]

## DELIVERABLES CHECKLIST
[final list of files that must exist at completion]
```

Use Section 6 through Section 8 of this skill to write each agent brief.


# ╔══════════════════════════════════════════════════════════════╗
# ║  SECTION 5: PHASE 2 — EXECUTION ORDER & GATE SYSTEM         ║
# ╚══════════════════════════════════════════════════════════════╝

## Execution Pipeline (Never Skip a Gate)

```
A-00 (Leader) starts → creates TASK_LOG.md
         ↓
A-01 (Codebase Agent) — READ-ONLY analysis
         ↓
[GATE 0: Leader reviews A-01 report — naming convention, baseline, architecture confirmed]
         ↓
Implementation Agents (parallel if no deps, sequential if ST-02 depends on ST-01)
A-02 (ST-01) ─────────────────────────────────────┐
A-03 (ST-02, if independent) ─────────────────────┤  ← parallel
A-04 (ST-03, if independent) ─────────────────────┘
         ↓
[GATE 1: each Implementation Agent self-verifies and reports complete]
         ↓
Subtask QA Triads (one triad per subtask, triads are parallel, each triad is sequential)
[QA-T-01 → QA-C-01 → QA-V-01] ← ST-01 triad (all 3 sequential)
[QA-T-02 → QA-C-02 → QA-V-02] ← ST-02 triad (parallel to ST-01 triad)
[QA-T-03 → QA-C-03 → QA-V-03] ← ST-03 triad (parallel to others)
         ↓
[GATE 2: ALL subtask QA triads PASS — all 3 agents in all triads]
         ↓
A-INT (Integration Agent) — assembles, resolves conflicts, wires templates
         ↓
[GATE 3: Integration PASS — no Liquid errors, JSON valid, locale keys present]
         ↓
Final QA Triad (sequential)
QA-FT (Final Tester)
         ↓
QA-FC (Final Checker) — only after QA-FT PASS
         ↓
QA-FV (Final Verifier) — only after QA-FC PASS
         ↓
[GATE 4: All 3 Final QA agents PASS]
         ↓
A-00 (Leader) writes TASK_COMPLETION.md
Live preview URL confirmed and shared with user ✅
```

## Gate Definitions

| Gate | Condition to PASS | On FAIL |
|---|---|---|
| Gate 0 | A-01 report complete: naming convention, CSS architecture, hardcoded baseline, task impact analysis all documented | Re-run A-01 with specific gaps to fill |
| Gate 1 | All implementation agents have completed self-verification checklist | Fix and retry (no limit) |
| Gate 2 | ALL subtask QA triads: QA-T PASS AND QA-C PASS AND QA-V PASS | Return to implementation agent with specific failure reason. Max 2 retries per subtask before escalating to human |
| Gate 3 | A-INT: conflict detection clean, templates wired, settings_schema valid JSON, all locale keys present, full theme check 0 errors | Return to specific agent that caused the conflict |
| Gate 4 | QA-FT PASS AND QA-FC PASS AND QA-FV PASS | Return to specific agent that owns the failing files |

## Leader's Gate Authority

The Leader agent (A-00) has full authority to:
- BLOCK any agent's output and send it back for revision with specific failure reason
- HALT the entire pipeline if a hardcoded value is discovered (no proceeding until fixed)
- SKIP an optional agent if the task clearly does not need it (must document the skip reason)
- ADD an unplanned agent if an unexpected complexity is discovered during any phase
- FAIL the task and request human input if Gate 2 fails twice on the same subtask
- RESTART from any gate if a downstream issue reveals a fundamental upstream error


# ╔══════════════════════════════════════════════════════════════╗
# ║  SECTION 6: PHASE 3 — SCHEMA-BASED ENFORCEMENT RULES        ║
# ╚══════════════════════════════════════════════════════════════╝

## What MUST Be a Schema Setting (Never Hardcode These)

| Content Type | Correct Setting Type |
|---|---|
| Any text string (heading, body, button, label, badge) | `text`, `richtext`, or `inline_richtext` |
| Any image | `image_picker` |
| Any color (background, text, border, overlay, icon) | `color` |
| Any URL or link | `url` |
| Any number (count, height, size, duration, columns) | `range` or `number` |
| Show/hide toggles | `checkbox` |
| Layout or style choices | `select` |
| Videos | `video` or `video_url` |
| Product references | `product` |
| Collection references | `collection` |
| Font choices | `font_picker` |
| Color backgrounds (supports gradients) | `color_background` |

## What CAN Be Hardcoded (Structural Only)

- HTML element types: `<div>`, `<section>`, `<h2>`, `<button>`, `<ul>`, `<li>`
- CSS class names that map to the theme's design system
- Liquid logic operators: `if`, `for`, `unless`, `case`, `assign`, `capture`
- Asset references for JS/CSS files: `{{ 'section-name.css' | asset_url | stylesheet_tag }}`
- Liquid filters: `| money`, `| image_url: width: 1200`, `| t`
- Structural HTML attributes: `type="submit"`, `method="post"`, `enctype="multipart/form-data"`

## Mandatory "Layout & Spacing" Schema Group (EVERY Section, No Exceptions)

The merchant MUST be able to control the margin and padding of every section directly from
the Shopify Theme Customizer. Never fix spacing in CSS. Every section schema MUST include
this "Layout & Spacing" group with these exact IDs (all `range` inputs; defaults taken
from a Playwright audit of the reference site):

```json
{
  "type": "header",
  "content": "Layout & Spacing"
},
{
  "type": "range",
  "id": "padding_top",
  "label": "Padding top (desktop)",
  "min": 0, "max": 200, "step": 4, "unit": "px", "default": 60
},
{
  "type": "range",
  "id": "padding_bottom",
  "label": "Padding bottom (desktop)",
  "min": 0, "max": 200, "step": 4, "unit": "px", "default": 60
},
{
  "type": "range",
  "id": "padding_left",
  "label": "Padding left (desktop)",
  "min": 0, "max": 120, "step": 4, "unit": "px", "default": 40
},
{
  "type": "range",
  "id": "padding_right",
  "label": "Padding right (desktop)",
  "min": 0, "max": 120, "step": 4, "unit": "px", "default": 40
},
{
  "type": "range",
  "id": "margin_top",
  "label": "Margin top",
  "min": 0, "max": 120, "step": 4, "unit": "px", "default": 0
},
{
  "type": "range",
  "id": "margin_bottom",
  "label": "Margin bottom",
  "min": 0, "max": 120, "step": 4, "unit": "px", "default": 0
},
{
  "type": "range",
  "id": "section_max_width",
  "label": "Max width",
  "min": 800, "max": 1920, "step": 40, "unit": "px", "default": 1440
},
{
  "type": "range",
  "id": "item_gap",
  "label": "Gap between items",
  "min": 0, "max": 80, "step": 4, "unit": "px", "default": 24
},
{
  "type": "header",
  "content": "Mobile Spacing"
},
{
  "type": "range",
  "id": "mobile_padding_top",
  "label": "Padding top (mobile)",
  "min": 0, "max": 120, "step": 4, "unit": "px", "default": 40
},
{
  "type": "range",
  "id": "mobile_padding_bottom",
  "label": "Padding bottom (mobile)",
  "min": 0, "max": 120, "step": 4, "unit": "px", "default": 40
},
{
  "type": "range",
  "id": "mobile_padding_horizontal",
  "label": "Horizontal padding (mobile)",
  "min": 0, "max": 60, "step": 4, "unit": "px", "default": 16
}
```

Wire these into the section via scoped `{% style %}` so each instance is independently tunable:

```liquid
{% style %}
  #shopify-section-{{ section.id }} .section-inner {
    padding: {{ section.settings.padding_top }}px {{ section.settings.padding_right }}px
             {{ section.settings.padding_bottom }}px {{ section.settings.padding_left }}px;
    margin-top: {{ section.settings.margin_top }}px;
    margin-bottom: {{ section.settings.margin_bottom }}px;
    max-width: {{ section.settings.section_max_width }}px;
    gap: {{ section.settings.item_gap }}px;
  }
  @media (max-width: 749px) {
    #shopify-section-{{ section.id }} .section-inner {
      padding-top: {{ section.settings.mobile_padding_top }}px;
      padding-bottom: {{ section.settings.mobile_padding_bottom }}px;
      padding-left: {{ section.settings.mobile_padding_horizontal }}px;
      padding-right: {{ section.settings.mobile_padding_horizontal }}px;
    }
  }
{% endstyle %}
```

## Full Customizer Control Matrix (QA Agents Fail Anything Not On This Matrix)

EVERYTHING visual must be admin-controllable from the Theme Customizer. Per section
(and per block where applicable), expose settings for ALL of the following:

| Category | What Must Be Controllable | Setting Types |
|---|---|---|
| **Typography** | Font family, font weight, font size, line height, letter spacing — per text element (heading, subheading, body, button label) | `font_picker`, `range` (size/weight/line-height/spacing), `select` |
| **Text color** | Every text element's color including hover state for links and buttons | `color` |
| **Media** | Image OR video choice per slot; separate media per breakpoint (desktop/tablet/mobile); alt text; focal point; aspect ratio; object-fit behavior | `image_picker`, `video`, `video_url`, `select`, `text` |
| **Spacing** | Padding and margin of the section itself via the mandatory Layout & Spacing group above; gaps and inner spacing — desktop AND mobile | `range` |
| **Borders** | Border width, border color, border radius (per card/button/image/container) | `range`, `color` |
| **Layout** | Grid vs flexbox; columns per breakpoint (desktop/tablet/mobile); direction; alignment; justification; wrap; reverse | `select`, `range`, `checkbox` |
| **Icons** | Icon source (library select or custom image), icon size, icon color, icon stroke width, icon position, show/hide | `select`, `image_picker`, `range`, `color`, `checkbox` |
| **Content** | Every heading, paragraph, label, badge, CTA text, CTA link, subheading, eyebrow text | `text`, `inline_richtext`, `richtext`, `url` |
| **Backgrounds** | Background color/gradient, background image, background video, overlay color, overlay opacity | `color`, `color_background`, `image_picker`, `video_url`, `range` |

**QA agents MUST fail any section where a visual property from this matrix is fixed in CSS
with no corresponding schema setting.**

## Responsive Media Pattern (Use This Exact Pattern for All Media Settings)

```liquid
{% if section.settings.media_type == 'video' and section.settings.video != blank %}
  {{ section.settings.video | video_tag:
    autoplay: true,
    loop: true,
    muted: true,
    controls: false,
    class: 'section__video' }}
{% elsif section.settings.video_url != blank and section.settings.media_type == 'video_url' %}
  <iframe src="{{ section.settings.video_url }}" frameborder="0" allowfullscreen
    class="section__video-iframe"></iframe>
{% else %}
  <picture>
    {% if section.settings.image_mobile != blank %}
      <source media="(max-width: 749px)"
        srcset="{{ section.settings.image_mobile | image_url: width: 750 }}">
    {% endif %}
    {% if section.settings.image_tablet != blank %}
      <source media="(max-width: 989px)"
        srcset="{{ section.settings.image_tablet | image_url: width: 1100 }}">
    {% endif %}
    {{
      section.settings.image_desktop
      | image_url: width: 2000
      | image_tag:
        loading: 'lazy',
        alt: section.settings.image_alt | default: section.settings.heading,
        class: 'section__image',
        widths: '375, 750, 1100, 1500, 2000'
    }}
  </picture>
{% endif %}
```

The corresponding schema settings:
```json
{
  "type": "select",
  "id": "media_type",
  "label": "Media type",
  "options": [
    { "value": "image", "label": "Image" },
    { "value": "video", "label": "Uploaded video" },
    { "value": "video_url", "label": "Video URL (YouTube/Vimeo)" }
  ],
  "default": "image"
},
{ "type": "image_picker", "id": "image_desktop", "label": "Image (desktop)" },
{ "type": "image_picker", "id": "image_tablet", "label": "Image (tablet, optional)" },
{ "type": "image_picker", "id": "image_mobile", "label": "Image (mobile, optional)" },
{ "type": "text", "id": "image_alt", "label": "Image alt text" },
{ "type": "video", "id": "video", "label": "Video (uploaded)" },
{ "type": "video_url", "id": "video_url", "label": "Video URL (YouTube or Vimeo)",
  "accept": ["youtube", "vimeo"] }
```


# ╔══════════════════════════════════════════════════════════════╗
# ║  SECTION 7: AGENT BRIEFS — LEADER & CODEBASE                ║
# ╚══════════════════════════════════════════════════════════════╝

## ─────────────────────────────────────────────────────────────
## A-00 — LEADER AGENT
## ─────────────────────────────────────────────────────────────

### Identity
You are the **Leader Agent (A-00)** for this Shopify task. You do NOT write Liquid, CSS,
or JS code. Your job is to orchestrate all other agents, enforce quality gates, and ensure
every output meets the Core Laws before the pipeline advances.

### Your Mission
Task: **[TASK_NAME]**
Repo: **[REPO_PATH]**
Reference URL: **[REFERENCE_URL]** *(if any)*
Subtasks: **[list ST-01 through ST-NN]**

### Non-Negotiable Rules You Enforce
1. 🚫 **Zero hardcoded values** — ANY hardcoded text, color, image, URL, or spacing value
   a merchant might change = HALT pipeline until fixed.
2. 🏗️ **Schema-first** — Implementation Agents write `{% schema %}` FIRST, then get approval,
   then write Liquid markup. Any agent that skips this = sent back immediately.
3. ✅ **Gate-first** — No agent advances past a gate until ALL conditions are met.
4. 🖥️ **Live preview mandatory** — After every implementation change, `shopify theme dev`
   MUST be running and the SHAREABLE preview URL (`https://{store}.myshopify.com/?preview_theme_id={id}`,
   never localhost) shared. Gate 4 is invalid without a live preview.
5. 📋 **Log everything** — Maintain TASK_LOG.md with every decision, gate result, and
   deviation from the original plan.

### Your Startup Sequence

**Step 1 — Create TASK_LOG.md**
Create this file immediately:
```markdown
# Task Log: [TASK_NAME]
Started: [timestamp]
Repo: [REPO_PATH]
Reference: [REFERENCE_URL]

## Subtask Breakdown
ST-01: [description] → [files]
ST-02: [description] → [files]
...

## Agent Roster
[list all agents]

## Gate Log
(filled in as pipeline runs)
```

**Step 2 — Brief and spawn A-01 (Codebase Agent)**
```
A-01 — your mission is to READ AND REPORT ONLY on the Shopify theme at [REPO_PATH].
Run all analysis steps from your brief. Do NOT modify any files.
Return a complete Codebase Analysis Report covering:
1. Theme architecture (OS version, template count, section count)
2. Naming conventions (sections, snippets, CSS, JS)
3. Schema pattern baseline (global colors, fonts, typical structure)
4. Hardcoded values baseline (every instance, with file:line)
5. CSS architecture (per-section vs monolithic, all design tokens / CSS custom properties)
6. Task impact analysis (files to modify, files to create, potential conflicts)
7. Git status (branch, clean/dirty, last commit)
8. Recommendations for Implementation Agents
```

**Step 3 — Gate 0: Review A-01 report**
Before proceeding, verify all of the following:
- [ ] Naming convention confirmed and documented (e.g., `gro-egypt-*.liquid`)
- [ ] All existing schema patterns noted so implementation maintains consistency
- [ ] Hardcoded values baseline logged (for diffing after implementation)
- [ ] CSS architecture understood (where does new CSS go?)
- [ ] All CSS custom properties listed (for implementation to reference)
- [ ] Task impact analysis complete (which files touched, which created)
- [ ] Git status clean (or deviations noted)

If A-01 report is incomplete → send back with specific gaps. Do NOT proceed to Gate 1.

**Step 4 — Brief Implementation Agents**
For each subtask ST-XX, spawn an Implementation Agent with its brief filled in from
the Section 7 template below. Include the A-01 report data so each agent knows:
- Naming convention to use
- CSS architecture to follow
- CSS custom properties available
- Baseline hardcoded values (so they don't add new ones)

Parallel spawning rules:
- Subtasks with no dependencies → spawn ALL simultaneously
- ST-02 depends on ST-01 → spawn A-03 only after A-02 reports complete
- Document dependency reason in TASK_LOG.md

**Step 5 — Gate 1: Implementation complete**
After each Implementation Agent reports complete:
- [ ] Self-verification checklist submitted and all boxes checked
- [ ] Schema written before markup (confirmed in report)
- [ ] Files saved to correct paths per naming convention
- [ ] Agent documents any deliberate structural decisions

**Step 6 — Run Subtask QA Triads**
For each completed subtask, spawn in strict order:
1. **QA-T-XX** (Subtask Tester) — functional testing
2. **QA-C-XX** (Subtask Checker) — schema compliance, hardcoded value scan
3. **QA-V-XX** (Subtask Verifier) — requirement traceability, customizer UX

QA-C-XX spawns ONLY after QA-T-XX returns PASS.
QA-V-XX spawns ONLY after QA-C-XX returns PASS.

If any agent returns FAIL → send back to Implementation Agent with the exact failure
reason from the QA report. Max 2 retries per subtask. If 3rd attempt fails → HALT
pipeline and escalate to human with full failure report.

Multiple subtask triads can run in parallel (ST-01 triad alongside ST-02 triad).

**Gate 2:** All subtask QA triads PASS — meaning QA-T, QA-C, AND QA-V all PASS for
every subtask. One FAIL anywhere = the whole gate fails.

**Step 7 — Brief Integration Agent (A-INT)**
After Gate 2, spawn A-INT with:
- List of ALL files created/modified by all subtasks
- All subtask reports for context
- Template wiring requirements (if any subtasks need sections added to pages)
- Locale key requirements (if any new `| t` keys were added)

**Gate 3:** A-INT reports PASS — conflict detection clean, templates wired correctly,
settings_schema valid JSON, all locale keys present in `en.default.json`, full
`shopify theme check` returns 0 errors.

**Step 8 — Run Final QA Triad**
Spawn in strict order:
1. **QA-FT** (Final Tester) — end-to-end functional test, all JSON files valid
2. **QA-FC** (Final Checker) — definitive hardcoded value audit across ALL files
3. **QA-FV** (Final Verifier) — Playwright visual QA, requirement sign-off matrix

**Gate 4:** All three Final QA agents PASS. One FAIL = specific agent returned to,
with exact failure reason.

**Step 9 — Write TASK_COMPLETION.md**
After Gate 4 PASS:

```markdown
# Task Completion Report
Task: [TASK_NAME]
Completed: [timestamp]

## What Was Built
[2-3 paragraph summary]

## Files Created
- sections/[name].liquid — [N] lines — [purpose]
- assets/[name].css — [N] lines — [purpose]
- assets/[name].js — [N] lines — [purpose if applicable]

## Files Modified
- templates/[page].json — added [section] to order
- config/settings_schema.json — added [group] group
- locales/en.default.json — added [N] new keys

## Schema Settings Added
[list every new setting id with its type — this is for the merchant to know what's controllable]

## QA Results
Gate 0 — Codebase Analysis: PASS
Gate 1 — Implementation: PASS (ST-01, ST-02, ...)
Gate 2 — Subtask QA: PASS (all triads)
Gate 3 — Integration: PASS
Gate 4 — Final QA: PASS

## Live Preview
Preview URL (shareable): https://[store].myshopify.com/?preview_theme_id=[DEV_THEME_ID]
Customizer URL: https://admin.shopify.com/store/[store-handle]/themes/[DEV_THEME_ID]/editor
Navigate to: [specific pages/sections to view the change]

## Manual Steps Required in Shopify Admin
[anything the merchant must do: add section to page, fill in metafields, publish theme, etc.]

## Git Commit Suggestion
feat(shopify): [task name in lowercase]

- Add [section-name] section with [N] schema settings
- Add responsive CSS with mobile-first layout
- Wire to [page] template
- All values schema-controlled — zero hardcoded content

Closes: [issue/ticket if any]
```

**Step 10 — Confirm live preview is running and share the SHAREABLE URL**
The final message to the user MUST include:
- The shareable live preview link `https://{store}.myshopify.com/?preview_theme_id={id}`
  as a clickable link (extracted from the `shopify theme dev` output — NEVER localhost)
- The Customizer editor link for the dev theme
- Which specific pages to navigate to
- A note about which sections to look at in the Customizer

### TASK_LOG.md Format
```markdown
# Task Log: [TASK_NAME]
Started: [timestamp]

## Gate 0 — Codebase Analysis
Status: [PASS/FAIL/PENDING]
A-01 report received: [yes/no]
Naming convention: [pattern]
CSS architecture: [type]
Hardcoded baseline: [count found]
Notes: [anything important]

## Gate 1 — Implementation
ST-01: [PASS/FAIL] | Agent: A-02 | Files: [list] | Time: [timestamp]
ST-02: [PASS/FAIL] | Agent: A-03 | Files: [list] | Time: [timestamp]

## Gate 2 — Subtask QA
ST-01: Tester [P/F] | Checker [P/F] | Verifier [P/F]
ST-02: Tester [P/F] | Checker [P/F] | Verifier [P/F]
Retries: [list any subtask that needed retry and why]

## Gate 3 — Integration
Status: [PASS/FAIL]
Conflicts found: [count]
Conflicts resolved: [yes/no]
Template wiring: [complete/pending]
Theme check: [0 errors / N errors]

## Gate 4 — Final QA
Final Tester: [P/F] | [timestamp]
Final Checker: [P/F] | [timestamp]
Final Verifier: [P/F] | [timestamp]

## Deviations from Plan
[Any plan changes made mid-execution and why]

## Human Escalations
[Any point where human input was required and what decision was made]
```


## ─────────────────────────────────────────────────────────────
## A-01 — CODEBASE AGENT
## ─────────────────────────────────────────────────────────────

### Identity
You are the **Codebase Analysis Agent (A-01)**. You READ and REPORT. You do NOT modify
any files under any circumstances. Your report is the foundation every other agent builds
on — accuracy is everything. A wrong assumption from your report cascades into bugs
across all implementation agents.

### Your Mission
Analyze the Shopify theme at: **[REPO_PATH]**
Task context: **[TASK_NAME]**

### READ-ONLY. DO NOT MODIFY ANY FILES. EVER.

### Analysis Steps

#### Step 1 — Theme Architecture
```bash
# OS 2.0 confirmation (templates/*.json = OS 2.0)
ls templates/*.json | wc -l
cat templates/index.json

# Full structure map
find . -name "*.liquid" | sort | grep -E "^./(sections|snippets|blocks|layout)/"

# Count files per type
echo "Sections: $(ls sections/*.liquid 2>/dev/null | wc -l)"
echo "Snippets: $(ls snippets/*.liquid 2>/dev/null | wc -l)"
echo "Blocks: $(ls blocks/*.liquid 2>/dev/null | wc -l)"
echo "Templates: $(ls templates/*.json 2>/dev/null | wc -l)"
```
Report: Is this OS 2.0? What is the template structure? Are blocks used?

#### Step 2 — Naming Conventions (CRITICAL — Implementation agents will follow these)
```bash
# Section naming pattern
ls sections/ | head -40

# Snippet naming pattern
ls snippets/ | head -20

# Block naming pattern (if any)
ls blocks/ 2>/dev/null | head -20

# Asset naming pattern (CSS/JS)
ls assets/*.css assets/*.js 2>/dev/null | head -30

# Derive the common prefix/pattern
ls sections/ | sed 's/-[^-]*$//' | sort | uniq -c | sort -rn | head -10
```
Report: What exact prefix/pattern do sections use? (e.g., `gro-egypt-*`, `sorella-*`,
`dawn-*`, or custom?) This exact pattern MUST be used by all Implementation Agents.

#### Step 3 — Schema Pattern Baseline
```bash
# Sample 2-3 existing sections to understand the schema conventions
for section in $(ls sections/ | head -3); do
  echo "=== $section ==="
  grep -A 200 "{% schema %}" "sections/$section" | head -80
  echo ""
done

# Check settings_schema for brand-level colors, fonts, global tokens
python3 -c "
import json
schema = json.load(open('config/settings_schema.json'))
for group in schema:
    print(f'[{group.get(\"name\",\"?\")}]')
    for s in group.get('settings', []):
        if 'id' in s:
            print(f'  {s[\"type\"]:15} {s[\"id\"]}')
"
```
Report: What schema patterns are used (tag type, class, presets structure)? What global
color/font settings exist that Implementation Agents should reference?

#### Step 4 — Hardcoded Value Baseline Scan (CRITICAL — Document Every Instance)
```bash
echo "=== HARDCODED COLORS ==="
grep -rn --include="*.liquid" -E '#[0-9a-fA-F]{3,6}|rgba?\([0-9]' \
  sections/ snippets/ | grep -v "{{.*settings\|schema\|{%-\s*comment" | head -30

echo "=== HARDCODED TEXT STRINGS ==="
grep -rn --include="*.liquid" -E '"[A-Z][a-z]{4,}"' \
  sections/ snippets/ | grep -v "{{.*| t }}" \
  | grep -v 'class=\|id=\|data-\|aria-\|schema\|label\|name\|type\|default' | head -20

echo "=== HARDCODED PIXEL VALUES IN LIQUID ==="
grep -rn --include="*.liquid" -E 'style="[^"]*[0-9]+px' sections/ snippets/ | head -10

echo "=== HARDCODED IMAGE SRC ==="
grep -rn --include="*.liquid" -E 'src="/' sections/ snippets/ \
  | grep -v "{{.*settings\.\|{{.*image\|asset_url" | head -10

echo "=== HARDCODED HREF URLS ==="
grep -rn --include="*.liquid" -E 'href="https?://' sections/ snippets/ \
  | grep -v "{{.*settings\.\|{{.*url" | head -10
```
Report: Log EVERY hardcoded value found with file:line. These are the baseline.
Any NEW hardcoded values introduced by Implementation Agents = violations.

#### Step 5 — CSS Architecture
```bash
# CSS file count and names
echo "Total CSS files: $(ls assets/*.css 2>/dev/null | wc -l)"
ls assets/*.css 2>/dev/null

# JS file count and names
echo "Total JS files: $(ls assets/*.js 2>/dev/null | wc -l)"
ls assets/*.js 2>/dev/null

# CSS custom properties (design tokens)
echo "=== CSS CUSTOM PROPERTIES (design tokens) ==="
grep -h "^\s*--" assets/*.css 2>/dev/null | sort -u | head -50

# Check if CSS is per-section or monolithic
ls assets/*.css | grep -c "section\|gro\|sorella\|custom" 2>/dev/null || echo "Mostly base CSS"
```
Report: How is CSS organized — per-section files, one monolithic base.css, or hybrid?
What CSS custom properties exist? Implementation Agents must use these tokens.

#### Step 6 — Task-Specific File Impact Analysis
```bash
# Check for existing similar sections (would this task create a duplicate?)
ls sections/ | grep -i "[KEYWORD_FROM_TASK]"

# Check JSON templates for current section assignments
grep -r "[KEYWORD]" templates/*.json 2>/dev/null | head -10

# Check existing metafield namespaces in use
grep -rn "metafields\." sections/ snippets/ 2>/dev/null \
  | grep -oP 'metafields\.\w+\.\w+' | sort -u | head -20

# Check for any existing JS that might conflict
grep -rn "document\.\|window\." assets/*.js 2>/dev/null | grep "const \|let \|var " | head -20
```
Report: Which existing files need to be modified? Which new files need to be created?
Are there potential conflicts (same section name, same CSS class, same JS global)?

#### Step 7 — Git Status
```bash
git status
git log --oneline -10
git branch
```
Report: Is the repo clean? What branch? Any uncommitted changes to be aware of?

### Your Output Format (Fill Every Section)

```markdown
# Codebase Analysis Report
Task: [TASK_NAME]
Repo: [REPO_PATH]
Analyst: A-01 Codebase Agent
Timestamp: [datetime]

## Theme Architecture
- OS Version: [1.0 / 2.0]
- Template count: [N]
- Section count: [N]
- Snippet count: [N]
- Block count: [N]
- Uses blocks directory: [yes/no]

## Naming Convention (ALL Implementation Agents MUST Follow This)
- Sections: [exact pattern — e.g., `gro-egypt-{name}.liquid`]
- Snippets: [exact pattern]
- CSS files: [exact pattern — e.g., `gro-egypt-{name}.css`]
- JS files: [exact pattern]
- New files for this task should be named: [specific examples]

## Schema Patterns (Reference for Implementation Agents)
- Section tag type used: [section / div / article / etc]
- Presets structure: [describe — do existing sections have presets?]
- Block usage pattern: [how are blocks typically structured?]
- Global colors available (from settings_schema.json):
  [list: id → label → type]
- Global fonts available:
  [list: id → label → type]

## Hardcoded Values Baseline
[ALL instances found — this is the "before" state]
| File | Line | Type | Value | Notes |
|---|---|---|---|---|
| sections/x.liquid | 42 | color | #1a1a1a | heading color |

## CSS Architecture
- Structure: [per-section / monolithic / hybrid]
- CSS files in assets/: [list]
- Design tokens (CSS custom properties):
  | Variable | Value | Used For |
  |---|---|---|
  | --color-primary | #5B3EB0 | brand purple |

## Task Impact Analysis
Files to MODIFY:
- [file] — reason

Files to CREATE:
- [file] — reason

Potential conflicts:
- [describe any conflicts or "none found"]

Metafield namespaces in use:
- [list or "none found"]

## Git Status
- Branch: [name]
- Status: [clean / dirty — list uncommitted files]
- Last 5 commits: [log]

## Recommendations for Implementation Agents
[Any non-obvious things:
 - "Don't use .btn class — it's already global in base.css and will conflict"
 - "The brand's primary color is --color-brand: #5B3EB0 — use this variable"
 - "All existing sections use `tag: section` in their schema"
 - "There's already a hero section — name the new one differently"]
```

Hand this complete report to the Leader Agent (A-00) for Gate 0 approval before proceeding.


# ╔══════════════════════════════════════════════════════════════╗
# ║  SECTION 8: AGENT BRIEFS — IMPLEMENTATION & QA TRIADS       ║
# ╚══════════════════════════════════════════════════════════════╝

## ─────────────────────────────────────────────────────────────
## A-0X — IMPLEMENTATION AGENT (One Per Subtask)
## ─────────────────────────────────────────────────────────────

### Identity
You are **Implementation Agent A-[ID]**, responsible for subtask **[ST-XX]**.
You write real, production-ready Shopify Liquid code that works with `shopify theme dev`.

### Your Subtask
**[ST-XX]: [Verb] [What] → [Expected output file(s)]**

Context from Codebase Agent (A-01 report):
- Naming convention to use: **[from A-01 report]**
- CSS architecture: **[per-section / monolithic / hybrid — from A-01 report]**
- CSS custom properties available: **[list from A-01 report]**
- Existing schema patterns: **[from A-01 report]**
- Hardcoded baseline to not exceed: **[count from A-01 report]**

Reference design URL: **[URL]** *(if visual task)*

### THE PRIME DIRECTIVE
> 🚫 **ZERO hardcoded values.**
> If in doubt → make it a setting.
> Schema-first → no markup until schema is approved.
> Native Liquid → no static mockups.

### Implementation Order (MANDATORY — Never Deviate)

#### Step 1 — Write the Schema FIRST (Before Any Markup)

Write the complete `{% schema %}` block. Do not write a single line of HTML until
the Leader reviews and approves the schema.

Mandatory groups in EVERY section:
1. Content settings (all text, images, CTAs)
2. Appearance settings (colors, typography, borders)
3. Layout settings (columns, alignment, direction)
4. The mandatory "Layout & Spacing" group (see Section 6 of this skill for the full group)
5. Presets with starter content so the section looks good out of the box

Schema structure template:
```json
{
  "name": "Section Display Name",
  "tag": "section",
  "class": "shopify-section [additional-class]",
  "settings": [
    { "type": "header", "content": "Content" },
    {
      "type": "inline_richtext",
      "id": "heading",
      "label": "Heading",
      "default": "Default Text That Matches Reference Design"
    },
    {
      "type": "richtext",
      "id": "subheading",
      "label": "Subheading",
      "default": "<p>Default subheading</p>"
    },
    { "type": "header", "content": "Appearance" },
    {
      "type": "color",
      "id": "heading_color",
      "label": "Heading color",
      "default": "#1a1a1a"
    },
    { "type": "header", "content": "Layout" },
    {
      "type": "select",
      "id": "columns",
      "label": "Columns (desktop)",
      "options": [
        { "value": "2", "label": "2 columns" },
        { "value": "3", "label": "3 columns" },
        { "value": "4", "label": "4 columns" }
      ],
      "default": "3"
    },
    { "type": "header", "content": "Layout & Spacing" },
    // ... ALL 12 spacing settings from Section 6 of this skill
  ],
  "blocks": [
    {
      "type": "item",
      "name": "Item",
      "settings": [
        { "type": "image_picker", "id": "image", "label": "Image" },
        { "type": "text", "id": "image_alt", "label": "Image alt text" },
        { "type": "inline_richtext", "id": "title", "label": "Title", "default": "Item Title" },
        { "type": "richtext", "id": "description", "label": "Description",
          "default": "<p>Item description</p>" },
        { "type": "text", "id": "cta_label", "label": "Button label", "default": "Learn More" },
        { "type": "url", "id": "cta_url", "label": "Button link" }
      ]
    }
  ],
  "presets": [
    {
      "name": "Section Display Name",
      "blocks": [
        { "type": "item" },
        { "type": "item" },
        { "type": "item" }
      ]
    }
  ],
  "max_blocks": 12
}
```

**Wait for Leader approval on the schema before proceeding to Step 2.**

#### Step 2 — Write Liquid Markup

After schema approval, write the full Liquid markup:

```liquid
{%- comment -%} Section: [name] | Owner: A-[ID] | Task: [TASK_NAME] {%- endcomment -%}

{% style %}
  #shopify-section-{{ section.id }} .section-inner {
    padding: {{ section.settings.padding_top }}px {{ section.settings.padding_right }}px
             {{ section.settings.padding_bottom }}px {{ section.settings.padding_left }}px;
    margin-top: {{ section.settings.margin_top }}px;
    margin-bottom: {{ section.settings.margin_bottom }}px;
    max-width: {{ section.settings.section_max_width }}px;
    gap: {{ section.settings.item_gap }}px;
  }
  @media (max-width: 749px) {
    #shopify-section-{{ section.id }} .section-inner {
      padding-top: {{ section.settings.mobile_padding_top }}px;
      padding-bottom: {{ section.settings.mobile_padding_bottom }}px;
      padding-left: {{ section.settings.mobile_padding_horizontal }}px;
      padding-right: {{ section.settings.mobile_padding_horizontal }}px;
    }
  }
  /* Any other schema-driven CSS values for this section instance */
  #shopify-section-{{ section.id }} .section__heading {
    color: {{ section.settings.heading_color }};
    font-size: {{ section.settings.heading_size }}px;
  }
{% endstyle %}

<div class="[section-name]-wrapper">
  <div class="[section-name] section-inner" id="[section-name]-{{ section.id }}">

    {% if section.settings.heading != blank %}
      <h2 class="[section-name]__heading">{{ section.settings.heading }}</h2>
    {% endif %}

    {% if section.settings.subheading != blank %}
      <div class="[section-name]__subheading">{{ section.settings.subheading }}</div>
    {% endif %}

    <div class="[section-name]__grid [section-name]__grid--{{ section.settings.columns }}-col">
      {% for block in section.blocks %}
        {% case block.type %}
          {% when 'item' %}
            <div class="[section-name]__item" {{ block.shopify_attributes }}>
              {% if block.settings.image != blank %}
                {{
                  block.settings.image
                  | image_url: width: 800
                  | image_tag:
                    loading: 'lazy',
                    alt: block.settings.image_alt | default: block.settings.title,
                    class: '[section-name]__item-image',
                    widths: '375, 600, 800'
                }}
              {% endif %}
              {% if block.settings.title != blank %}
                <h3 class="[section-name]__item-title">{{ block.settings.title }}</h3>
              {% endif %}
              {% if block.settings.description != blank %}
                <div class="[section-name]__item-desc">{{ block.settings.description }}</div>
              {% endif %}
              {% if block.settings.cta_label != blank and block.settings.cta_url != blank %}
                <a href="{{ block.settings.cta_url }}"
                   class="[section-name]__item-cta btn btn--primary">
                  {{ block.settings.cta_label }}
                </a>
              {% endif %}
            </div>
        {% endcase %}
      {% endfor %}
    </div>

  </div>
</div>

{% schema %}
{ ... complete schema from Step 1 ... }
{% endschema %}
```

Liquid rules:
- Reference settings: `{{ section.settings.SETTING_ID }}`
- Reference block settings: `{{ block.settings.SETTING_ID }}`
- Use `{% for block in section.blocks %}` for repeating content
- Wrap conditionals: `{% if section.settings.show_X %} ... {% endif %}`
- Add `{{ block.shopify_attributes }}` inside EVERY block's root element
- Use `{% style %}` for schema-driven CSS values (not `<style>` — Shopify requires `{% style %}`)
- Wrap section-scoped CSS with `#shopify-section-{{ section.id }}`
- Never use inline `style=""` attributes with hardcoded values

#### Step 3 — Write CSS File

Create `assets/[naming-convention-name].css`:

```css
/* ============================================================
   Section: [name]
   Task: [TASK_NAME]
   Owner: A-[ID]
   ============================================================ */

/* Wrapper */
.[section-name]-wrapper {
  width: 100%;
  overflow: hidden;
}

/* Inner container — spacing controlled via {% style %} block in Liquid */
.[section-name] {
  margin-inline: auto;
}

/* Grid layout */
.[section-name]__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr); /* mobile: 1 col */
  gap: inherit; /* gap from schema setting via parent */
}

@media (min-width: 750px) {
  .[section-name]__grid--2-col { grid-template-columns: repeat(2, 1fr); }
  .[section-name]__grid--3-col { grid-template-columns: repeat(3, 1fr); }
  .[section-name]__grid--4-col { grid-template-columns: repeat(4, 1fr); }
}

/* Item */
.[section-name]__item {
  display: flex;
  flex-direction: column;
}

/* Image */
.[section-name]__item-image {
  width: 100%;
  height: auto;
  display: block;
}

/* Typography — sizes from settings, use CSS variables for brand colors */
.[section-name]__heading {
  /* font-size set via {% style %} from schema setting */
  /* color set via {% style %} from schema setting */
  font-family: var(--font-heading-family, inherit);
  font-weight: var(--font-heading-weight, 600);
}

/* Links and buttons inherit theme variables */
.[section-name]__item-cta {
  /* style via theme's .btn .btn--primary classes */
  display: inline-flex;
  align-items: center;
  margin-top: auto;
}
```

CSS rules:
- Use CSS custom properties from A-01's design token list for brand colors/fonts
- Mobile-first (base = mobile, `@media (min-width: 750px)` for tablet, `@media (min-width: 990px)` for desktop)
- Namespace ALL classes to the section: `.[section-name]__` prefix
- Never use hardcoded hex colors in CSS — use `var(--color-name)` or accept from schema via `{% style %}`
- No `!important` unless overriding an immovable theme default
- No `position: fixed` unless intentional (drawers, modals, sticky headers)
- No `@import` — all CSS loaded via `theme.liquid`

#### Step 4 — Write JS File (if needed)

Create `assets/[naming-convention-name].js`:

```javascript
/* ============================================================
   Section: [name]
   Task: [TASK_NAME]
   Owner: A-[ID]
   ============================================================ */

(function () {
  'use strict';

  // RTL awareness
  const isRTL = document.documentElement.dir === 'rtl';

  // Initialize all instances of this section
  function initSectionName() {
    const sections = document.querySelectorAll('.[section-name]');
    sections.forEach(initSingleSection);
  }

  function initSingleSection(section) {
    // ... section-specific logic ...
    // Example: carousel initialization, tab switching, accordion, etc.
    const direction = isRTL ? -1 : 1;
    // ... use direction for left/right behavior ...
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSectionName);
  } else {
    initSectionName();
  }

  // Re-run after Shopify Customizer section updates
  document.addEventListener('shopify:section:load', function (event) {
    if (event.target.querySelector('.[section-name]')) {
      initSingleSection(event.target.querySelector('.[section-name]'));
    }
  });
})();
```

JS rules:
- No inline JS in Liquid — all JS in `assets/`
- Wrap in IIFE or use custom element class to avoid global scope pollution
- RTL-aware: check `document.documentElement.dir === 'rtl'`
- Handle `shopify:section:load` for Customizer live reload
- No `console.log()` in production code

#### Step 5 — Self-Verification Checklist (Complete Before Reporting to Leader)

Run this checklist manually BEFORE submitting your implementation report:

```
SCHEMA COMPLIANCE
□ Schema written BEFORE markup? (not after)
□ Schema JSON is valid? (parseable)
□ ALL 12 Layout & Spacing settings included?
□ All settings have: type, id, label
□ All visible-text settings have: default value
□ Presets defined with starter blocks?
□ max_blocks defined if blocks are used?
□ Block names are merchant-friendly (not "block_1")?

HARDCODED VALUE CHECK
□ Zero hardcoded text strings in Liquid output?
□ Zero hardcoded colors in Liquid or inline styles?
□ Zero hardcoded images (all via image_picker)?
□ Zero hardcoded URLs (all via url settings)?
□ Zero hardcoded pixel values in inline styles?
□ CSS uses var(--) or inherits from schema via {% style %}?

LIQUID QUALITY
□ All blocks have {{ block.shopify_attributes }}?
□ {% style %} used (not <style>) for schema-driven CSS?
□ Section wrapped in #shopify-section-{{ section.id }} scope?
□ All images use image_url + image_tag (not raw <img src>)?
□ All images have loading="lazy" (hero may use eager)?
□ All images have alt from settings (not hardcoded)?
□ Liquid tags balanced (every if has endif, every for has endfor)?
□ No undefined variables without | default: ''?

CODE QUALITY
□ CSS class names namespaced to section?
□ Mobile-first CSS (min-width queries, not max-width)?
□ No global CSS class pollution?
□ No JS global variable pollution?
□ No console.log() left in JS?
□ shopify:section:load handled for Customizer?

FILES & NAMING
□ Files saved to correct paths?
□ Files follow naming convention from A-01 report?
□ Comment header at top of each file?
```

Run syntax check:
```bash
# If Shopify CLI available (preferred)
shopify theme check sections/[your-section].liquid

# Manual Liquid tag balance check
python3 -c "
import re
content = open('sections/[name].liquid').read()
for tag in ['if', 'for', 'unless', 'capture', 'form', 'case', 'paginate']:
    opens = len(re.findall(rf'{{% *{tag}\b', content))
    closes = len(re.findall(rf'{{% *end{tag}\b', content))
    status = '✅' if opens == closes else '❌'
    print(f'{status} {tag}: {opens} opens, {closes} closes')
"

# Schema JSON validation
python3 -c "
import re, json
content = open('sections/[name].liquid').read()
m = re.search(r'{%-?\s*schema\s*-?%}(.*?){%-?\s*endschema\s*-?%}', content, re.DOTALL)
if m:
    schema = json.loads(m.group(1))
    print(f'✅ Schema valid — {len(schema.get(\"settings\",[]))} settings, {len(schema.get(\"blocks\",[]))} block types')
    print(f'   Has presets: {\"presets\" in schema}')
else:
    print('❌ No schema block found')
"
```

### Your Output Report (Submit to Leader A-00)

```markdown
# ST-[XX] Implementation Complete
Agent: A-[ID]
Subtask: [description]
Timestamp: [datetime]

## Files Created/Modified
- sections/[name].liquid — [N] lines
- assets/[name].css — [N] lines
- assets/[name].js — [N] lines (if applicable)
- templates/[page].json — modified to add section (if applicable)

## Schema Summary
Settings count: [N]
Settings IDs: [list all ids with types]
Block types: [list block type names]
Block settings per block: [N]
Presets: [yes — name, starter block count]

## Self-Verification Checklist
[paste completed checklist with ✅/❌ for each item]

## Syntax Check Results
[paste shopify theme check output or manual check results]

## Notes for QA Agents
[anything non-obvious:
 - "The carousel JS requires the section to have at least 2 blocks to initialize"
 - "Color settings default to brand values from CSS tokens — see var(--color-primary)"
 - "The image_tablet setting is optional — section degrades to desktop image if not set"]

## Deliberate Structural Decisions
[any item that IS hardcoded for structural reasons with justification:
 - "The form method='post' is hardcoded — this is a structural HTML requirement, not content"
 - "The SVG arrow icon is hardcoded — it's a UI element, not merchant content"]
```

Ready for Subtask QA Triad: QA-T-[XX] → QA-C-[XX] → QA-V-[XX].


## ─────────────────────────────────────────────────────────────
## QA-T-[XX] — SUBTASK TESTER
## ─────────────────────────────────────────────────────────────

### Identity
You are the **Subtask Tester (QA-T-[XX])** for subtask **[ST-XX]**. You test functionality
and behavior. You approach this as someone who has never seen the code — only what the feature
should DO from the user's perspective.

### Prerequisite
Only run after Implementation Agent A-[ID] has submitted their implementation report.

### Testing Protocol

#### Test 1 — Liquid Syntax Validation
```bash
# Preferred: Shopify CLI
shopify theme check sections/[name].liquid 2>&1

# Fallback: manual tag balance
python3 -c "
import re
content = open('sections/[name].liquid').read()
for tag in ['if', 'for', 'unless', 'capture', 'form', 'case', 'paginate']:
    opens = len(re.findall(rf'{{% *{tag}\b', content))
    closes = len(re.findall(rf'{{% *end{tag}\b', content))
    status = '✅' if opens == closes else '❌'
    print(f'{status} {tag}: {opens} opens, {closes} closes')
"
```

#### Test 2 — Schema JSON Validity
```bash
python3 -c "
import re, json
content = open('sections/[name].liquid').read()
m = re.search(r'{%-?\s*schema\s*-?%}(.*?){%-?\s*endschema\s*-?%}', content, re.DOTALL)
if m:
    schema = json.loads(m.group(1).strip())
    print('✅ Schema valid JSON')
    print(f'   Settings: {len(schema.get(\"settings\", []))}')
    print(f'   Block types: {[b[\"type\"] for b in schema.get(\"blocks\", [])]}')
    print(f'   Has presets: {\"presets\" in schema}')
    print(f'   Has max_blocks: {\"max_blocks\" in schema}')
    presets = schema.get('presets', [])
    for p in presets:
        print(f'   Preset \"{p[\"name\"]}\": {len(p.get(\"blocks\", []))} starter blocks')
else:
    print('❌ No schema block found — BLOCKER')
"
```

#### Test 3 — Functional Behavior (via shopify theme dev)
```bash
# Ensure dev server is running
shopify theme dev --store=[store-handle]
# Navigate to http://127.0.0.1:9292/[relevant-page]  (internal QA only — the user gets
# the shareable https://{store}.myshopify.com/?preview_theme_id={id} link, per Law 6)
```
Verify:
- [ ] No Liquid render errors (Shopify error screen = RED background = FAIL)
- [ ] Section renders visually on the page
- [ ] No browser console errors (open DevTools → Console)
- [ ] Section appears in Customizer "Add Section" panel
- [ ] All settings appear correctly labeled in Customizer sidebar
- [ ] Changing each setting updates the preview in real-time
- [ ] Adding a block adds a new item
- [ ] Removing a block removes the item
- [ ] Reordering blocks via drag-and-drop works

#### Test 4 — Edge Cases
- [ ] Section with ZERO blocks — renders gracefully (no broken layout, no JS error)
- [ ] Section with MAX blocks (max_blocks value) — layout holds, no overflow
- [ ] All text settings blank — section renders gracefully (hides empty elements)
- [ ] No image selected — graceful fallback (shows placeholder or hides cleanly)
- [ ] Very long text strings (100+ chars) — layout doesn't break
- [ ] Mobile viewport (390px) — no horizontal scroll, no overlapping elements
- [ ] Tablet viewport (768px) — layout transitions correctly

### Your Output

```markdown
# Subtask Test Report — ST-[XX]
Agent: QA-T-[XX]
File tested: sections/[name].liquid
Timestamp: [datetime]

## Test Results
| Test | Status | Notes |
|---|---|---|
| Liquid syntax (shopify theme check) | PASS/FAIL | [N errors found] |
| Schema JSON valid | PASS/FAIL | |
| Settings count | PASS/FAIL | Expected [N], found [N] |
| Block types defined | PASS/FAIL | [list types] |
| Has presets | PASS/FAIL | [N starter blocks] |
| Has max_blocks | PASS/FAIL | |
| Renders without errors | PASS/FAIL | |
| Customizer settings visible | PASS/FAIL | |
| Settings update preview | PASS/FAIL | |
| Blocks add/remove/reorder | PASS/FAIL | |
| Edge: zero blocks | PASS/FAIL | |
| Edge: max blocks | PASS/FAIL | |
| Edge: all settings empty | PASS/FAIL | |
| Edge: no image selected | PASS/FAIL | |
| Edge: long text | PASS/FAIL | |
| Mobile (390px) | PASS/FAIL | |
| Tablet (768px) | PASS/FAIL | |

## Overall: PASS / FAIL

## Issues Found (if FAIL)
[Each issue: file:line — description — severity: BLOCKER / MINOR]

## Recommendation
[PASS → QA-C-[XX] can proceed]
OR
[FAIL → RETURN to A-[ID] with these specific issues: ...]
```


## ─────────────────────────────────────────────────────────────
## QA-C-[XX] — SUBTASK CHECKER
## ─────────────────────────────────────────────────────────────

### Identity
You are the **Subtask Checker (QA-C-[XX])** for subtask **[ST-XX]**. You enforce schema
compliance and code quality. You are the HARDCODED VALUE DETECTOR. No value escapes you.
Your job is the most critical in the pipeline — you block hardcoded values from ever
reaching the merchant.

### Prerequisite
Only run after QA-T-[XX] has returned PASS.

### Checking Protocol

#### Check 1 — Hardcoded Value Scan (Most Important)
```bash
file="sections/[name].liquid"

echo "=== HARDCODED COLORS ==="
grep -n "#[0-9a-fA-F]\{3,6\}\|rgba\?(" "$file" | grep -v "schema\|{%-\s*comment"
# ANY output here (outside schema defaults) = VIOLATION

echo "=== HARDCODED TEXT STRINGS ==="
grep -n '"[A-Z][a-z]\{4,\}' "$file" \
  | grep -v "schema\|settings\.\|block\.\|label\|info\|content\|name\|default\|placeholder\|type\|class\|id\|aria\|data-"
# Any text that will render to the page and isn't from settings = VIOLATION

echo "=== HARDCODED IMAGE SRC ==="
grep -n 'src="/' "$file" | grep -v "{{.*image\|settings\."
# ANY output = VIOLATION

echo "=== HARDCODED HREF URLS ==="
grep -n 'href="https\?://' "$file" | grep -v "{{.*settings\.\|{{.*url"
# ANY output = VIOLATION

echo "=== INLINE STYLE VIOLATIONS ==="
grep -n 'style="[^{]' "$file" | grep -v "{% if\|{% unless\|{{"
# Inline styles with hardcoded values = VIOLATION

# CSS file check
cssfile="assets/[name].css"
echo "=== HARDCODED COLORS IN CSS ==="
grep -n "color:\s*#\|background:\s*#\|background-color:\s*#\|border.*#" "$cssfile" \
  | grep -v "var(--\|/\*"
# Should use var(--token) or inherit from schema via {% style %}
```

#### Check 2 — Schema Completeness (Bidirectional)
```bash
python3 -c "
import re, json
content = open('sections/[name].liquid').read()

liquid_section_refs = set(re.findall(r'section\.settings\.(\w+)', content))
liquid_block_refs = set(re.findall(r'block\.settings\.(\w+)', content))

m = re.search(r'{%-?\s*schema\s*-?%}(.*?){%-?\s*endschema\s*-?%}', content, re.DOTALL)
schema = json.loads(m.group(1))

defined_section = {s['id'] for s in schema.get('settings', []) if 'id' in s}
defined_block = set()
for block in schema.get('blocks', []):
    defined_block.update(s['id'] for s in block.get('settings', []) if 'id' in s)

print('=== Section Settings ===')
missing = liquid_section_refs - defined_section
if missing: print(f'❌ Referenced but NOT defined: {missing}')
unused = defined_section - liquid_section_refs
if unused: print(f'⚠️  Defined but NOT referenced: {unused}')
if not missing and not unused: print('✅ Perfect coverage')

print('=== Block Settings ===')
missing_b = liquid_block_refs - defined_block
if missing_b: print(f'❌ Referenced but NOT defined: {missing_b}')
unused_b = defined_block - liquid_block_refs
if unused_b: print(f'⚠️  Defined but NOT referenced: {unused_b}')
if not missing_b and not unused_b: print('✅ Perfect coverage')
"
```

#### Check 3 — Layout & Spacing Group Presence
```bash
python3 -c "
import re, json
content = open('sections/[name].liquid').read()
m = re.search(r'{%-?\s*schema\s*-?%}(.*?){%-?\s*endschema\s*-?%}', content, re.DOTALL)
schema = json.loads(m.group(1))
ids = [s.get('id','') for s in schema.get('settings', [])]
required = ['padding_top','padding_bottom','padding_left','padding_right',
            'margin_top','margin_bottom','section_max_width','item_gap',
            'mobile_padding_top','mobile_padding_bottom','mobile_padding_horizontal']
for r in required:
    status = '✅' if r in ids else '❌ MISSING'
    print(f'{status} {r}')
"
```

#### Check 4 — Naming Convention Compliance
```bash
# Expected naming pattern: [NAMING_CONVENTION from A-01 report]
ls -la sections/ | grep "[name]"
ls -la assets/ | grep "[name]"
# Verify the file names match the convention
```

#### Check 5 — Block Shopify Attributes
```bash
# Every block in the schema must have {{ block.shopify_attributes }} in the markup
python3 -c "
import re, json
content = open('sections/[name].liquid').read()
m = re.search(r'{%-?\s*schema\s*-?%}(.*?){%-?\s*endschema\s*-?%}', content, re.DOTALL)
schema = json.loads(m.group(1))
block_count = len(schema.get('blocks', []))
attr_count = content.count('shopify_attributes')
print(f'Block types in schema: {block_count}')
print(f'shopify_attributes occurrences: {attr_count}')
if attr_count >= block_count and block_count > 0:
    print('✅ All blocks have shopify_attributes')
elif block_count == 0:
    print('✅ No blocks defined (no shopify_attributes needed)')
else:
    print('❌ Missing shopify_attributes — some blocks will not be selectable in Customizer')
"
```

#### Check 6 — {% style %} Used (Not <style>)
```bash
grep -n "<style>" sections/[name].liquid
# Should return nothing — must use {% style %} not <style>
grep -n "{% style %}" sections/[name].liquid
# Should return at least 1 line (for the spacing CSS block)
```

#### Check 7 — Image Tag Pattern
```bash
grep -n "<img" sections/[name].liquid | grep -v "image_tag\|image_url"
# Should return nothing — all images must use Liquid image_url + image_tag filters
grep -n "loading=" sections/[name].liquid | grep -v '"lazy"\|"eager"'
# All loading attributes should be 'lazy' or 'eager' (hero)
```

### Your Output

```markdown
# Schema Compliance Report — ST-[XX]
Agent: QA-C-[XX]
File checked: sections/[name].liquid, assets/[name].css
Timestamp: [datetime]

## Hardcoded Value Audit
| Check | Instances Found | Status |
|---|---|---|
| Hardcoded colors in Liquid | [N] | ✅ PASS (0) / ❌ FAIL |
| Hardcoded text strings | [N] | ✅ PASS (0) / ❌ FAIL |
| Hardcoded image src | [N] | ✅ PASS (0) / ❌ FAIL |
| Hardcoded href URLs | [N] | ✅ PASS (0) / ❌ FAIL |
| Inline style violations | [N] | ✅ PASS (0) / ❌ FAIL |
| CSS hardcoded colors | [N] | ✅ PASS (0) / ❌ FAIL |

## Schema Completeness
| Check | Result |
|---|---|
| Section settings referenced in Liquid | [N] |
| Section settings defined in schema | [N] |
| Undefined references | [list or "none"] |
| Unused definitions | [list or "none — warning only"] |
| Block settings referenced in Liquid | [N] |
| Block settings defined in schema | [N] |

## Layout & Spacing Group
| Setting ID | Present |
|---|---|
| padding_top | ✅/❌ |
| padding_bottom | ✅/❌ |
| padding_left | ✅/❌ |
| padding_right | ✅/❌ |
| margin_top | ✅/❌ |
| margin_bottom | ✅/❌ |
| section_max_width | ✅/❌ |
| item_gap | ✅/❌ |
| mobile_padding_top | ✅/❌ |
| mobile_padding_bottom | ✅/❌ |
| mobile_padding_horizontal | ✅/❌ |

## Structural Checks
| Check | Status |
|---|---|
| Naming convention correct | PASS/FAIL |
| block.shopify_attributes present | PASS/FAIL |
| Presets defined | PASS/FAIL |
| {% style %} used (not <style>) | PASS/FAIL |
| Images use image_url + image_tag | PASS/FAIL |
| CSS uses var(--) or schema-driven values | PASS/FAIL |

## Overall: PASS / FAIL

## Violations Found (BLOCKERS — must fix before proceeding)
[Each violation: file:line — description — required fix]

## Warnings (non-blocking but should fix)
[list]

## Recommendation
[PASS → QA-V-[XX] can proceed]
OR
[FAIL → RETURN to A-[ID] with these specific violations: ...]
```


## ─────────────────────────────────────────────────────────────
## QA-V-[XX] — SUBTASK VERIFIER
## ─────────────────────────────────────────────────────────────

### Identity
You are the **Subtask Verifier (QA-V-[XX])** for subtask **[ST-XX]**. You do the final
sign-off. You verify the subtask actually delivers what was required and is integration-ready.

### Prerequisite
Only run after BOTH QA-T-[XX] AND QA-C-[XX] have returned PASS.

### Verification Protocol

#### Verification 1 — Requirement Traceability
Map EVERY original requirement from the task brief to its implementation:
```
Requirement: "[exact requirement text from task brief]"
→ Implemented as: settings.[id] type [type] / blocks.[type] / feature [X]
→ Evidence: sections/[name].liquid line [N] / assets/[name].css line [N]
Status: ✅ Satisfied / ❌ Missing / ⚠️ Partially satisfied
```

#### Verification 2 — Customizer UX Quality
Check that the Customizer experience will be intuitive for non-technical merchants:
- [ ] Section name is Title Case and clearly describes what the section does
- [ ] Setting labels are plain English (NOT: `bg_color_hex`, `img_picker_desktop` — YES: `Background color`, `Desktop image`)
- [ ] `info` text provided for any setting with non-obvious behavior
- [ ] Settings logically grouped with `header` separators (Content → Appearance → Layout → Spacing)
- [ ] Defaults match the reference design so the section looks good immediately after adding
- [ ] Block names are clear and merchant-friendly
- [ ] select options are human-readable (NOT: `col_3`, YES: `3 columns`)
- [ ] range inputs have appropriate min, max, step, and unit values

#### Verification 3 — Integration Readiness
- [ ] No CSS class names that conflict with existing theme sections
- [ ] No JS global variables that could clash with theme or other sections
- [ ] CSS properly scoped to `.[section-name]__` prefix
- [ ] Section can be added alongside existing sections on any page without visual conflicts
- [ ] Section handles the case where it's the only section on a page

#### Verification 4 — Visual Spot-Check Against Reference
If a reference URL was provided:
- [ ] Layout structure matches the reference design
- [ ] Content hierarchy matches (heading size → subheading → body text)
- [ ] Spacing proportions are approximately correct (within schema defaults)
- [ ] Card/item structure matches reference
- [ ] CTA button position and style matches reference

#### Verification 5 — Accessibility Quick-Check
```bash
# All images must have alt text from settings
grep -n "image_tag" sections/[name].liquid | grep -v "alt:"
# Should return 0 results (all image_tag calls have alt:)

# Check for aria-label on interactive elements without visible text
grep -n "<button\|<a " sections/[name].liquid | grep -v "aria-label\|>.*<" | head -10
```

### Your Output

```markdown
# Verification Report — ST-[XX]
Agent: QA-V-[XX]
Subtask: [description]
Timestamp: [datetime]

## Requirement Traceability
| # | Requirement | Implementation Evidence | Status |
|---|---|---|---|
| 1 | [req text] | settings.[id] / blocks.[type] / file:line | ✅/❌/⚠️ |
| 2 | ... | | |

## Customizer UX Quality
| Check | Status | Notes |
|---|---|---|
| Section name clear | PASS/FAIL | |
| Setting labels plain English | PASS/FAIL | |
| Info text on complex settings | PASS/FAIL | |
| Logical setting grouping | PASS/FAIL | |
| Defaults match reference | PASS/FAIL | |
| Block names clear | PASS/FAIL | |
| Select options readable | PASS/FAIL | |
| Range min/max/step appropriate | PASS/FAIL | |

## Integration Readiness
| Check | Status |
|---|---|
| No CSS class conflicts | PASS/FAIL |
| No JS global conflicts | PASS/FAIL |
| CSS properly scoped | PASS/FAIL |
| Compatible alongside other sections | PASS/FAIL |

## Visual Match (against reference [URL])
[Description of how implementation compares to reference — layout, spacing, hierarchy]

## Accessibility
| Check | Status |
|---|---|
| All images have alt from settings | PASS/FAIL |
| Interactive elements have aria-label if needed | PASS/FAIL |

## Overall: PASS / FAIL

## Sign-off
ST-[XX] is [READY FOR INTEGRATION / NEEDS REVISION].

Notes for Integration Agent (A-INT):
[anything A-INT should be aware of when assembling this subtask]
```

Report to Leader Agent (A-00) for Gate 2 decision.


# ╔══════════════════════════════════════════════════════════════╗
# ║  SECTION 9: AGENT BRIEFS — INTEGRATION & FINAL QA TRIAD     ║
# ╚══════════════════════════════════════════════════════════════╝

## ─────────────────────────────────────────────────────────────
## A-INT — INTEGRATION AGENT
## ─────────────────────────────────────────────────────────────

### Identity
You are the **Integration Agent (A-INT)**. You assemble all verified subtasks into a
coherent, conflict-free whole. You do NOT re-implement anything. You resolve conflicts,
wire templates, validate JSON, and confirm the assembled theme passes full check.

### Prerequisite
ALL subtask QA triads (QA-T + QA-C + QA-V for every subtask) must have PASSED.

### Your Mission
Assemble **[TASK_NAME]** from:
- ST-01: [description] → [files]
- ST-02: [description] → [files]
- ST-NN: [description] → [files]

### Integration Steps

#### Step 1 — CSS Conflict Detection
```bash
# Check for duplicate CSS class names across new files
grep -h "^\." assets/[new-file-1].css assets/[new-file-2].css 2>/dev/null | sort | uniq -d
# Duplicate classes = naming conflict — one of them needs renaming

# Broader check: any class used in multiple new CSS files
for cls in $(grep -h "^\." assets/[new-file-1].css | sed 's/{.*//'); do
  count=$(grep -l "$cls" assets/[new-file-1].css assets/[new-file-2].css 2>/dev/null | wc -l)
  if [ "$count" -gt 1 ]; then echo "CONFLICT: $cls"; fi
done
```

#### Step 2 — JS Global Conflict Detection
```bash
# Check for duplicate top-level function/variable names across new JS files
grep -h "^function \|^const \|^let \|^var " assets/[new-file-1].js assets/[new-file-2].js 2>/dev/null \
  | sort | uniq -d
# Any output = potential global pollution conflict
```

#### Step 3 — Template Wiring (Add Sections to Pages)
For any subtask that requires a section to appear on a page:
```bash
# Inspect current template before modifying
cat templates/[page].json | python3 -m json.tool

# Wire the section programmatically (safer than manual edit)
python3 -c "
import json, uuid

template = json.load(open('templates/[page].json'))
section_id = '[section-name]-[unique-suffix]'  # e.g., 'hero-banner-main'

if section_id not in template.get('order', []):
    template.setdefault('order', []).append(section_id)
template.setdefault('sections', {})[section_id] = {
    'type': '[section-filename-without-extension]',
    'settings': {},
    'blocks': {}
}
with open('templates/[page].json', 'w') as f:
    json.dump(template, f, indent=2)
print('✅ Template updated')
"

# Validate immediately after
python3 -c "import json; json.load(open('templates/[page].json')); print('✅ Valid JSON')"
```

#### Step 4 — Settings Schema Integration
If any subtask added a new group to `config/settings_schema.json`:
```bash
python3 -c "
import json
schema = json.load(open('config/settings_schema.json'))
print(f'✅ settings_schema.json valid — {len(schema)} groups')

# Check for duplicate group names
names = [g.get('name', '') for g in schema]
from collections import Counter
dupes = [n for n, c in Counter(names).items() if c > 1]
if dupes:
    print(f'❌ Duplicate group names: {dupes}')
else:
    print('✅ No duplicate group names')

# Check for duplicate setting IDs
all_ids = [(s['id'], g.get('name')) for g in schema for s in g.get('settings', []) if 'id' in s]
id_counts = Counter(id for id, _ in all_ids)
dupes_ids = [(id, [g for i, g in all_ids if i == id]) for id, c in id_counts.items() if c > 1]
if dupes_ids:
    for id, groups in dupes_ids:
        print(f'❌ Duplicate setting ID \"{id}\" in groups: {groups}')
else:
    print(f'✅ All {len(all_ids)} setting IDs unique')
"
```

#### Step 5 — Locale Key Verification
```bash
python3 -c "
import re, json, glob

# Load and flatten en.default.json
def flatten(d, prefix=''):
    keys = set()
    for k, v in d.items():
        full = f'{prefix}.{k}' if prefix else k
        if isinstance(v, dict):
            keys.update(flatten(v, full))
        else:
            keys.add(full)
    return keys

en = json.load(open('locales/en.default.json'))
en_keys = flatten(en)

# Find all t-filter references in all new/modified Liquid files
new_files = [
    'sections/[name1].liquid',
    'sections/[name2].liquid',
]
for f in new_files:
    content = open(f).read()
    refs = re.findall(r\"'([^']+)'\s*\|\s*t\", content)
    for ref in refs:
        if ref not in en_keys:
            print(f'❌ Missing in en.default.json: \"{ref}\" (referenced in {f})')
        else:
            print(f'✅ {ref}')
"
```

#### Step 6 — Full Theme Syntax Check
```bash
# Full theme check (preferred)
shopify theme check --path . 2>&1 | tee /tmp/theme-check-integration.txt
grep -E "ERROR|WARNING" /tmp/theme-check-integration.txt | wc -l
echo "Total issues above ↑ (must be 0 errors)"

# Fallback: check all new/modified Liquid files manually
for file in sections/[name1].liquid sections/[name2].liquid; do
  echo "=== $file ==="
  python3 -c "
import re
content = open('$file').read()
for tag in ['if', 'for', 'unless', 'capture', 'form', 'case', 'paginate']:
    opens = len(re.findall(rf'{{% *{tag}\b', content))
    closes = len(re.findall(rf'{{% *end{tag}\b', content))
    status = '✅' if opens == closes else '❌'
    print(f'  {status} {tag}: {opens}/{closes}')
"
done
```

#### Step 7 — JSON File Integrity
```bash
# All JSON files must be valid
for f in config/settings_schema.json templates/*.json locales/*.json; do
  python3 -c "
import json, sys
try:
    json.load(open('$f'))
    print('✅ $f')
except Exception as e:
    print(f'❌ $f: {e}')
    sys.exit(1)
"
done
```

#### Step 8 — Final File Manifest
```bash
git status --short
git diff --stat
```

### Your Output

```markdown
# Integration Report
Agent: A-INT
Task: [TASK_NAME]
Timestamp: [datetime]

## Conflict Resolution
| Type | Conflicts Found | Resolution Applied |
|---|---|---|
| CSS class names | [N] | [how resolved or "none"] |
| JS globals | [N] | [how resolved or "none"] |
| Schema setting IDs (global) | [N] | [how resolved or "none"] |
| settings_schema group names | [N] | [how resolved or "none"] |

## Template Wiring
| Template | Section Added | Status |
|---|---|---|
| templates/[page].json | [section-name] | ✅ |

## Settings Schema
- Total groups: [N]
- Total settings: [N]
- Duplicate group names: [none / list]
- Duplicate setting IDs: [none / list]
- Valid JSON: ✅ / ❌

## Locale Keys
- New t-filter keys added: [N]
- All keys present in en.default.json: ✅ / ❌ [list missing]

## Theme Check
- Errors: [0 / N]
- Warnings: [0 / N]
- Full compliance: [YES / NO]

## JSON Integrity
| File | Status |
|---|---|
| config/settings_schema.json | ✅ |
| templates/[page].json | ✅ |
| locales/en.default.json | ✅ |

## File Manifest (all changes)
[output of git status --short and git diff --stat]

## Integration: PASS / FAIL
[If PASS: ready for Final QA Triad]
[If FAIL: specific issues and which agent to return to]
```

Report to Leader Agent (A-00) for Gate 3 decision.


## ─────────────────────────────────────────────────────────────
## QA-FT — FINAL TESTER
## ─────────────────────────────────────────────────────────────

### Identity
You are the **Final Tester (QA-FT)**. You test the COMPLETE implemented task end-to-end.
You approach this as a merchant who just installed a new theme and is seeing it for the
first time. Can a non-technical merchant use this effectively?

### Prerequisite
Integration Agent (A-INT) must have returned PASS at Gate 3.

### End-to-End Test Suite

#### Test 1 — Full Shopify Theme Check
```bash
shopify theme check --path . 2>&1 | tee /tmp/final-theme-check.txt
echo "=== ERRORS ==="
grep "ERROR" /tmp/final-theme-check.txt
echo "=== WARNINGS ==="
grep "WARNING" /tmp/final-theme-check.txt
echo "=== SUMMARY ==="
grep -E "^[0-9]+" /tmp/final-theme-check.txt | tail -3
# GOAL: 0 ERRORs. Warnings reviewed and documented.
```

#### Test 2 — All JSON File Integrity
```bash
for f in config/settings_schema.json templates/*.json locales/*.json; do
  python3 -c "
import json
try:
    json.load(open('$f'))
    print('✅ $f')
except Exception as e:
    print(f'❌ $f: {e}')
"
done
```

#### Test 3 — Live Render Test
```bash
# Ensure shopify theme dev is running
# If not running: shopify theme dev --store=[store-handle] > /tmp/theme-dev.log 2>&1 &
# Internal QA URL: http://127.0.0.1:9292/[page-url]
```
Navigate to the relevant page and verify:
- [ ] Page loads without Liquid render errors (no red error screen)
- [ ] All new sections appear on the page
- [ ] No browser console errors (DevTools → Console)
- [ ] Network tab: no 404 errors for new CSS/JS assets
- [ ] SHAREABLE live preview URL (`https://{store}.myshopify.com/?preview_theme_id={id}`)
      extracted from the theme dev output, confirmed loading, and shared with user

#### Test 4 — Customizer Full Walk-through
In Shopify Admin → Online Store → Themes → Customize:
For each new section:
- [ ] Section appears in the "Add Section" panel
- [ ] Section name is clear and correct
- [ ] Clicking the section in the sidebar shows ALL settings
- [ ] Every setting is labeled correctly (no ID-like labels e.g. `heading_color_hex`)
- [ ] Changing each setting updates the live preview in real-time
- [ ] Adding a block adds a new item to the section
- [ ] Removing a block removes it cleanly
- [ ] Reordering blocks works (drag handles visible)
- [ ] Setting all text settings to blank does not break the layout
- [ ] Undo (Cmd+Z / Ctrl+Z) works without breaking anything
- [ ] Save → navigate to live preview → section renders correctly

#### Test 5 — Mobile Responsiveness
```bash
# In Chrome DevTools → Toggle device toolbar → select iPhone 12 Pro (390px)
```
- [ ] No horizontal scrollbar on mobile
- [ ] No overlapping elements
- [ ] Text is readable (no overflow, no clipping)
- [ ] Images scale correctly
- [ ] Buttons are tappable (min 44px touch target)
- [ ] Column layout changes from desktop to mobile as designed

#### Test 6 — Cross-Section Compatibility
- [ ] Add new section BEFORE an existing section on a page → no visual conflicts
- [ ] Add new section AFTER an existing section → no visual conflicts
- [ ] No JS errors when multiple sections coexist on the same page
- [ ] No CSS conflicts between new and existing sections (check for shared class names)

#### Test 7 — Performance Spot-Check
```bash
# All images must have lazy loading (except first hero image which can be eager)
grep -n "image_tag" sections/[new-sections].liquid | grep -v "loading:"
# Should return 0 results (all image_tag calls specify loading:)

# No stylesheet_tag inside section files (CSS should be in theme.liquid)
grep -rn "stylesheet_tag" sections/[new-sections].liquid
# Should return 0 results

# No render-blocking inline scripts
grep -rn "<script>" sections/[new-sections].liquid
# Should return 0 results (JS in assets/, not inline)
```

### Your Output

```markdown
# Final Test Report
Agent: QA-FT
Task: [TASK_NAME]
Timestamp: [datetime]

## Test Results
| Test | Status | Notes |
|---|---|---|
| shopify theme check: errors | PASS (0 errors) / FAIL | [N errors] |
| shopify theme check: warnings | PASS/NOTE | [N warnings — list] |
| All JSON valid | PASS/FAIL | |
| All sections render (no Liquid errors) | PASS/FAIL | |
| No browser console errors | PASS/FAIL | |
| No 404 for CSS/JS assets | PASS/FAIL | |
| Customizer: all sections visible | PASS/FAIL | |
| Customizer: all settings labeled | PASS/FAIL | |
| Customizer: live preview updates | PASS/FAIL | |
| Customizer: blocks add/remove/reorder | PASS/FAIL | |
| Empty settings: layout holds | PASS/FAIL | |
| Mobile (390px): no horizontal scroll | PASS/FAIL | |
| Mobile (390px): no overlapping | PASS/FAIL | |
| Mobile: images scale correctly | PASS/FAIL | |
| Cross-section: no visual conflicts | PASS/FAIL | |
| Cross-section: no JS errors | PASS/FAIL | |
| Images have lazy loading | PASS/FAIL | |
| No inline stylesheet_tag in sections | PASS/FAIL | |
| No inline <script> in sections | PASS/FAIL | |
| Live preview URL active (shareable) | PASS/FAIL | https://[store].myshopify.com/?preview_theme_id=[id] |

## Overall: PASS / FAIL

## Issues Found (if FAIL)
[Each issue: file:line — description — severity: BLOCKER / MINOR]

## Recommendation
[PASS → QA-FC can proceed]
OR
[FAIL → RETURN to Leader with specific issues for routing to responsible agent]
```


## ─────────────────────────────────────────────────────────────
## QA-FC — FINAL CHECKER
## ─────────────────────────────────────────────────────────────

### Identity
You are the **Final Checker (QA-FC)**. You run the definitive schema compliance audit
across the ENTIRE task output — ALL files combined. You are the absolute last line of
defense against hardcoded values reaching production. You audit everything mercilessly.

### Prerequisite
QA-FT must have returned PASS.

### Final Compliance Audit

#### Audit 1 — Global Hardcoded Value Scan (All New/Modified Files)
```bash
echo "========================================="
echo "FINAL HARDCODED VALUE AUDIT — ALL FILES"
echo "========================================="

for file in [LIST ALL NEW .liquid FILES]; do
  echo ""
  echo "━━━ $file ━━━"

  echo "  Colors:"
  result=$(grep -n "#[0-9a-fA-F]\{3,6\}\|rgba\?([0-9]" "$file" \
    | grep -v "{% schema\|%}\|{%-\|comment")
  [ -n "$result" ] && echo "  ❌ $result" || echo "  ✅ None"

  echo "  Text strings:"
  result=$(grep -n '"[A-Z][a-z]\{4,\}"' "$file" \
    | grep -v "schema\|settings\.\|block\.\|label\|info\|content\|name\|default\|placeholder\|type\|class\|id\|aria\|data-")
  [ -n "$result" ] && echo "  ❌ $result" || echo "  ✅ None"

  echo "  Inline styles:"
  result=$(grep -n 'style="[^{]' "$file" | grep -v "{% if\|{{")
  [ -n "$result" ] && echo "  ❌ $result" || echo "  ✅ None"

  echo "  Hardcoded image src:"
  result=$(grep -n 'src="/' "$file" | grep -v "{{.*settings\.\|{{.*image\|asset_url")
  [ -n "$result" ] && echo "  ❌ $result" || echo "  ✅ None"

  echo "  Hardcoded href:"
  result=$(grep -n 'href="https\?://' "$file" | grep -v "{{.*settings\.\|{{.*url")
  [ -n "$result" ] && echo "  ❌ $result" || echo "  ✅ None"
done

echo ""
for file in [LIST ALL NEW .css FILES]; do
  echo "━━━ $file ━━━"
  result=$(grep -n "color:\s*#\|background\(-color\)\?:\s*#\|border.*:\s*[0-9].*#" "$file" \
    | grep -v "var(--\|/\*")
  [ -n "$result" ] && echo "  ❌ Hardcoded colors: $result" || echo "  ✅ Uses CSS custom properties"
done
```

#### Audit 2 — Schema Coverage for All New Sections
```bash
python3 -c "
import re, json

sections = [
    'sections/[name1].liquid',
    'sections/[name2].liquid',
]

for section_file in sections:
    print(f'\n━━━ {section_file} ━━━')
    content = open(section_file).read()

    liquid_section = set(re.findall(r'section\.settings\.(\w+)', content))
    liquid_block = set(re.findall(r'block\.settings\.(\w+)', content))

    m = re.search(r'{%-?\s*schema\s*-?%}(.*?){%-?\s*endschema\s*-?%}', content, re.DOTALL)
    schema = json.loads(m.group(1))

    defined_section = {s['id'] for s in schema.get('settings', []) if 'id' in s}
    defined_block = set()
    for block in schema.get('blocks', []):
        defined_block.update(s['id'] for s in block.get('settings', []) if 'id' in s)

    print(f'  Section: {len(liquid_section)} referenced, {len(defined_section)} defined')
    missing = liquid_section - defined_section
    if missing: print(f'  ❌ Undefined: {missing}')
    else: print('  ✅ Section coverage complete')

    print(f'  Blocks: {len(liquid_block)} referenced, {len(defined_block)} defined')
    missing_b = liquid_block - defined_block
    if missing_b: print(f'  ❌ Undefined block settings: {missing_b}')
    else: print('  ✅ Block coverage complete')

    # Layout & Spacing check
    ids = [s.get('id','') for s in schema.get('settings', [])]
    required = ['padding_top','padding_bottom','padding_left','padding_right',
                'margin_top','margin_bottom','section_max_width','item_gap',
                'mobile_padding_top','mobile_padding_bottom','mobile_padding_horizontal']
    missing_spacing = [r for r in required if r not in ids]
    if missing_spacing:
        print(f'  ❌ Missing spacing settings: {missing_spacing}')
    else:
        print('  ✅ Layout & Spacing group complete (all 11 settings)')
"
```

#### Audit 3 — Settings Schema Global Validation
```bash
python3 -c "
import json
from collections import Counter

schema = json.load(open('config/settings_schema.json'))
print(f'Total groups: {len(schema)}')

names = [g.get('name','') for g in schema]
name_dupes = [n for n, c in Counter(names).items() if c > 1]
if name_dupes: print(f'❌ Duplicate group names: {name_dupes}')
else: print('✅ No duplicate group names')

all_ids = [(s['id'], g.get('name')) for g in schema for s in g.get('settings',[]) if 'id' in s]
id_dupes = [id for id, c in Counter(id for id,_ in all_ids).items() if c > 1]
if id_dupes:
    for dup in id_dupes:
        groups = [g for i,g in all_ids if i == dup]
        print(f'❌ Duplicate setting ID \"{dup}\" in: {groups}')
else:
    print(f'✅ All {len(all_ids)} setting IDs unique')
"
```

#### Audit 4 — Block Attributes Completeness
```bash
python3 -c "
import re, json, glob

for f in glob.glob('sections/*.liquid'):
    content = open(f).read()
    m = re.search(r'{%-?\s*schema\s*-?%}(.*?){%-?\s*endschema\s*-?%}', content, re.DOTALL)
    if not m: continue
    schema = json.loads(m.group(1))
    block_count = len(schema.get('blocks', []))
    attr_count = content.count('shopify_attributes')
    if block_count > 0:
        status = '✅' if attr_count >= block_count else '❌'
        print(f'{status} {f}: {block_count} block types, {attr_count} shopify_attributes')
"
```

#### Audit 5 — {% style %} vs <style> Usage
```bash
for file in sections/[name1].liquid sections/[name2].liquid; do
  style_tag=$(grep -c "<style>" "$file" 2>/dev/null || echo 0)
  liquid_style=$(grep -c "{% style %}" "$file" 2>/dev/null || echo 0)
  if [ "$style_tag" -gt 0 ]; then
    echo "❌ $file: uses <style> ($style_tag times) — must use {% style %}"
  else
    echo "✅ $file: uses {% style %} ($liquid_style times) correctly"
  fi
done
```

### Your Output

```markdown
# Final Compliance Report
Agent: QA-FC
Task: [TASK_NAME]
Timestamp: [datetime]

## Hardcoded Value Summary (All New Files)
| File | Colors | Text | Inline Styles | Hardcoded src | Hardcoded href | Status |
|---|---|---|---|---|---|---|
| sections/[name1].liquid | 0 | 0 | 0 | 0 | 0 | ✅ |
| sections/[name2].liquid | 0 | 0 | 0 | 0 | 0 | ✅ |
| assets/[name1].css | uses var(--) | — | — | — | — | ✅ |

## Schema Coverage
| Section | Section Settings (def/ref) | Block Settings (def/ref) | Gap |
|---|---|---|---|
| [name1] | [N]/[N] | [N]/[N] | None / [list] |
| [name2] | [N]/[N] | [N]/[N] | None / [list] |

## Layout & Spacing Group
| Section | All 11 Settings Present | Status |
|---|---|---|
| [name1] | Yes/No | ✅/❌ |

## Settings Schema Global
- Total groups: [N]
- Total settings: [N]
- Duplicate group names: [none / list]
- Duplicate setting IDs: [none / list]
- Valid JSON: ✅

## Block Attributes
| Section | Block Types | shopify_attributes Uses | Status |
|---|---|---|---|
| [name] | [N] | [N] | ✅ |

## {% style %} Compliance
| Section | Uses {% style %} | Uses <style> (violation) | Status |
|---|---|---|---|
| [name] | Yes | No | ✅ |

## Overall: PASS / FAIL

## BLOCKERS (must fix before QA-FV proceeds):
[list each with file:line and required fix]

## Warnings (non-blocking):
[list]

## Recommendation
[PASS → QA-FV can proceed]
OR
[FAIL → RETURN to [specific agent] for [specific violations]]
```


## ─────────────────────────────────────────────────────────────
## QA-FV — FINAL VERIFIER (VISUAL QA + PLAYWRIGHT)
## ─────────────────────────────────────────────────────────────

### Identity
You are the **Final Verifier (QA-FV)**. You run visual QA with Playwright, verify the
complete task against the original requirements, and give the final PASS that unlocks
writing the completion report and sharing the live preview. Your PASS ends the pipeline.

### Prerequisite
BOTH QA-FT AND QA-FC must have returned PASS.

### Visual Verification Protocol

#### Step 1 — Playwright Screenshot Capture
```javascript
// Save as: qa/playwright-verify.js
// Run with: node qa/playwright-verify.js

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  // Create output directory
  fs.mkdirSync('qa/screenshots', { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const LOCAL_URL = 'http://127.0.0.1:9292';       // shopify theme dev
  const REFERENCE_URL = '[REFERENCE_URL]';           // from task brief
  const PAGE_PATH = '/[page-url]';                   // e.g., '/', '/collections/all'

  // ─── Desktop screenshots ───────────────────────────────────
  await page.setViewportSize({ width: 1440, height: 900 });

  // Implementation
  await page.goto(`${LOCAL_URL}${PAGE_PATH}`);
  await page.waitForLoadState('networkidle');
  await page.screenshot({
    path: 'qa/screenshots/implementation-desktop.png',
    fullPage: true
  });
  console.log('✅ Desktop screenshot: implementation');

  // Reference
  if (REFERENCE_URL && REFERENCE_URL !== '[REFERENCE_URL]') {
    await page.goto(REFERENCE_URL);
    await page.waitForLoadState('networkidle');
    await page.screenshot({
      path: 'qa/screenshots/reference-desktop.png',
      fullPage: true
    });
    console.log('✅ Desktop screenshot: reference');
  }

  // ─── Mobile screenshots ────────────────────────────────────
  await page.setViewportSize({ width: 390, height: 844 });

  await page.goto(`${LOCAL_URL}${PAGE_PATH}`);
  await page.waitForLoadState('networkidle');
  await page.screenshot({
    path: 'qa/screenshots/implementation-mobile.png',
    fullPage: true
  });
  console.log('✅ Mobile screenshot: implementation');

  // ─── Tablet screenshots ────────────────────────────────────
  await page.setViewportSize({ width: 768, height: 1024 });

  await page.goto(`${LOCAL_URL}${PAGE_PATH}`);
  await page.waitForLoadState('networkidle');
  await page.screenshot({
    path: 'qa/screenshots/implementation-tablet.png',
    fullPage: true
  });
  console.log('✅ Tablet screenshot: implementation');

  // ─── Section-specific screenshots ─────────────────────────
  // Scroll to each new section and capture focused screenshots
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${LOCAL_URL}${PAGE_PATH}`);
  await page.waitForLoadState('networkidle');

  const sections = await page.$$('[id^="shopify-section-"]');
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const id = await section.getAttribute('id');
    await section.scrollIntoViewIfNeeded();
    await section.screenshot({
      path: `qa/screenshots/section-${i + 1}-${id}.png`
    });
    console.log(`✅ Section screenshot: ${id}`);
  }

  await browser.close();
  console.log('\nAll screenshots saved to qa/screenshots/');
})();
```

Run:
```bash
mkdir -p qa/screenshots
cd [REPO_PATH]
npm init -y 2>/dev/null; npm install playwright 2>/dev/null
npx playwright install chromium
node qa/playwright-verify.js
```

#### Step 2 — Visual Comparison
```bash
# If ImageMagick is available, generate pixel diff:
convert qa/screenshots/reference-desktop.png qa/screenshots/implementation-desktop.png \
  -metric PSNR -compare -format "%[distortion]" info: 2>&1
# Higher PSNR = more similar
# >40 = excellent match
# 30-40 = acceptable match
# <30 = significant visual deviation — investigate

# If ImageMagick not available, compare manually:
# Open both screenshots side by side and check:
# - Layout structure
# - Spacing proportions
# - Typography hierarchy
# - Image placement
# - Color palette
```

#### Step 3 — Requirement Sign-off Matrix
For EVERY original requirement from the task brief, confirm it is delivered:

```
| # | Original Requirement | Implementation Evidence | Status |
|---|---|---|---|
| 1 | "[exact text from brief]" | settings.[id] in sections/[name].liquid:L[N] | ✅ |
| 2 | "[exact text]" | blocks.item.settings.[id] | ✅ |
| N | ... | | |
```

#### Step 4 — Merchant UX Complete Walk-through
Simulate a first-time merchant using the Customizer for the first time:

1. Open Shopify Admin → Online Store → Themes → Customize
2. Navigate to a page containing the new section(s)
3. For each new section:
   - [ ] Section appears in Add Section panel with clear name
   - [ ] Clicking opens the section in sidebar
   - [ ] All settings visible with clear labels (not raw IDs)
   - [ ] Changing text setting updates preview immediately
   - [ ] Changing color setting updates preview immediately
   - [ ] Changing image picker: preview updates
   - [ ] Changing range/number: preview updates
   - [ ] Adding a block: new item appears
   - [ ] Removing a block: item disappears cleanly
   - [ ] Reordering blocks: drag handle visible and works
   - [ ] Setting all optional fields to blank: layout is still acceptable
4. [ ] Undo (Cmd+Z) after any change: state reverts correctly
5. [ ] Save theme: no errors in console
6. [ ] Navigate to live page (not Customizer preview): section renders correctly

#### Step 5 — Accessibility Audit
```bash
# Images must have alt text from settings
for file in sections/[new-sections].liquid; do
  echo "=== $file ==="
  # image_tag without alt
  grep -n "image_tag" "$file" | grep -v "alt:"
  # <img> without alt
  grep -n "<img" "$file" | grep -v "alt="
done
# Both should return 0 results

# Interactive elements without accessible labels
grep -n "<button" sections/[name].liquid | grep -v 'aria-label\|>.*[A-Za-z].*<'
# Buttons with no visible text need aria-label
```

#### Step 6 — Live Preview Confirmation
```bash
# Confirm shopify theme dev is running and accessible (internal check)
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:9292/
# Should return 200

# Extract and confirm the SHAREABLE preview link — this is the URL reported to the user
PREVIEW_URL=$(grep -oE 'https://[a-z0-9-]+\.myshopify\.com/\?preview_theme_id=[0-9]+' /tmp/theme-dev.log | head -1)
echo "Shareable preview: $PREVIEW_URL"
curl -s -o /dev/null -w "%{http_code}" -L "$PREVIEW_URL"
# Should return 200
```

### Your Output

```markdown
# Final Verification Report
Agent: QA-FV
Task: [TASK_NAME]
Timestamp: [datetime]

## Visual QA
- Desktop (1440px): [matches reference / minor deviations / significant deviation]
- Mobile (390px): [responsive / issues: describe]
- Tablet (768px): [responsive / issues: describe]
- PSNR score (desktop): [value] — [excellent >40 / acceptable 30-40 / investigate <30]

## Screenshot Artifacts
- qa/screenshots/implementation-desktop.png ✅
- qa/screenshots/implementation-mobile.png ✅
- qa/screenshots/implementation-tablet.png ✅
- qa/screenshots/reference-desktop.png [✅ / N/A — no reference URL provided]

## Requirement Sign-off Matrix
| # | Requirement | Evidence | Status |
|---|---|---|---|
| 1 | [req] | [evidence] | ✅/❌ |

## Merchant Customizer UX Walk-through
| Check | Status |
|---|---|
| Section in Add Section panel | ✅ |
| All settings labeled clearly | ✅ |
| Text settings update preview | ✅ |
| Color settings update preview | ✅ |
| Image picker updates preview | ✅ |
| Range settings update preview | ✅ |
| Blocks add correctly | ✅ |
| Blocks remove correctly | ✅ |
| Blocks reorder (drag) | ✅ |
| Empty settings: layout holds | ✅ |
| Undo works correctly | ✅ |
| Save works without errors | ✅ |
| Live page renders after save | ✅ |

## Accessibility
| Check | Status |
|---|---|
| All images have alt text from settings | ✅/❌ |
| Buttons have visible text or aria-label | ✅/❌ |

## Live Preview
- Shareable URL: https://[store].myshopify.com/?preview_theme_id=[DEV_THEME_ID]
- Customizer URL: https://admin.shopify.com/store/[store-handle]/themes/[DEV_THEME_ID]/editor
- Status: [running / not running]
- Pages to navigate to: [list page URLs]

## 🟢 FINAL VERDICT: PASS / 🔴 FINAL VERDICT: FAIL

## Deployment Ready
[YES — hand to Leader A-00 for TASK_COMPLETION.md and live preview share]
[NO — return to [specific agent] for [specific issue]]
```

Report to Leader Agent (A-00). If PASS → Leader writes TASK_COMPLETION.md and shares
the live preview URL with the user. The task is complete. 🎉


# ╔══════════════════════════════════════════════════════════════╗
# ║  SECTION 10: SCHEMA PATTERNS LIBRARY                        ║
# ╚══════════════════════════════════════════════════════════════╝

Copy-paste patterns for common section types. Always adapt to the task's naming convention
and add the mandatory Layout & Spacing group from Section 6.

## Pattern A — Hero Banner (Image + Text + CTA)

```liquid
{% schema %}
{
  "name": "Hero Banner",
  "tag": "section",
  "class": "shopify-section",
  "settings": [
    { "type": "header", "content": "Background" },
    { "type": "image_picker", "id": "image_desktop", "label": "Background image (desktop)" },
    { "type": "image_picker", "id": "image_mobile", "label": "Background image (mobile)" },
    { "type": "text", "id": "image_alt", "label": "Image alt text" },
    { "type": "color", "id": "overlay_color", "label": "Overlay color", "default": "#000000" },
    { "type": "range", "id": "overlay_opacity", "label": "Overlay opacity",
      "min": 0, "max": 100, "step": 5, "unit": "%", "default": 30 },
    { "type": "header", "content": "Content" },
    { "type": "inline_richtext", "id": "eyebrow", "label": "Eyebrow text" },
    { "type": "inline_richtext", "id": "heading", "label": "Heading", "default": "Hero Heading" },
    { "type": "richtext", "id": "subheading", "label": "Subheading",
      "default": "<p>Hero subheading text</p>" },
    { "type": "select", "id": "text_alignment", "label": "Text alignment",
      "options": [
        { "value": "left", "label": "Left" },
        { "value": "center", "label": "Center" },
        { "value": "right", "label": "Right" }
      ], "default": "center" },
    { "type": "header", "content": "Typography" },
    { "type": "color", "id": "heading_color", "label": "Heading color", "default": "#ffffff" },
    { "type": "range", "id": "heading_size", "label": "Heading font size",
      "min": 24, "max": 96, "step": 2, "unit": "px", "default": 56 },
    { "type": "color", "id": "body_color", "label": "Body text color", "default": "#ffffff" },
    { "type": "header", "content": "Primary Button" },
    { "type": "text", "id": "cta_primary_label", "label": "Button label", "default": "Shop Now" },
    { "type": "url", "id": "cta_primary_url", "label": "Button link" },
    { "type": "color", "id": "cta_primary_bg", "label": "Button background", "default": "#ffffff" },
    { "type": "color", "id": "cta_primary_text", "label": "Button text color", "default": "#000000" },
    { "type": "header", "content": "Secondary Button" },
    { "type": "checkbox", "id": "show_secondary_cta", "label": "Show secondary button",
      "default": false },
    { "type": "text", "id": "cta_secondary_label", "label": "Button label", "default": "Learn More" },
    { "type": "url", "id": "cta_secondary_url", "label": "Button link" },
    { "type": "header", "content": "Layout" },
    { "type": "range", "id": "section_height", "label": "Section height",
      "min": 300, "max": 900, "step": 20, "unit": "px", "default": 600 },
    { "type": "range", "id": "mobile_height", "label": "Section height (mobile)",
      "min": 200, "max": 600, "step": 20, "unit": "px", "default": 400 },
    { "type": "header", "content": "Layout & Spacing" }
    // ... ALL 11 spacing range settings from Section 6 ...
  ],
  "presets": [{ "name": "Hero Banner" }]
}
{% endschema %}
```

## Pattern B — Cards Grid (Blocks)

```liquid
{% schema %}
{
  "name": "Cards Grid",
  "tag": "section",
  "class": "shopify-section",
  "settings": [
    { "type": "header", "content": "Section Header" },
    { "type": "inline_richtext", "id": "heading", "label": "Section heading",
      "default": "Our Features" },
    { "type": "richtext", "id": "description", "label": "Section description" },
    { "type": "select", "id": "heading_alignment", "label": "Heading alignment",
      "options": [
        { "value": "left", "label": "Left" },
        { "value": "center", "label": "Center" }
      ], "default": "center" },
    { "type": "header", "content": "Grid Layout" },
    { "type": "select", "id": "columns_desktop", "label": "Columns (desktop)",
      "options": [
        { "value": "2", "label": "2 columns" },
        { "value": "3", "label": "3 columns" },
        { "value": "4", "label": "4 columns" }
      ], "default": "3" },
    { "type": "select", "id": "columns_tablet", "label": "Columns (tablet)",
      "options": [
        { "value": "1", "label": "1 column" },
        { "value": "2", "label": "2 columns" }
      ], "default": "2" },
    { "type": "select", "id": "card_alignment", "label": "Card content alignment",
      "options": [
        { "value": "left", "label": "Left" },
        { "value": "center", "label": "Center" }
      ], "default": "center" },
    { "type": "header", "content": "Card Appearance" },
    { "type": "color", "id": "card_bg", "label": "Card background", "default": "#ffffff" },
    { "type": "range", "id": "card_border_radius", "label": "Card corner radius",
      "min": 0, "max": 40, "step": 2, "unit": "px", "default": 8 },
    { "type": "checkbox", "id": "card_shadow", "label": "Show card shadow", "default": true },
    { "type": "header", "content": "Layout & Spacing" }
    // ... ALL 11 spacing range settings from Section 6 ...
  ],
  "blocks": [
    {
      "type": "card",
      "name": "Card",
      "settings": [
        { "type": "image_picker", "id": "image", "label": "Card image" },
        { "type": "text", "id": "image_alt", "label": "Image alt text" },
        { "type": "select", "id": "image_ratio", "label": "Image aspect ratio",
          "options": [
            { "value": "square", "label": "Square (1:1)" },
            { "value": "portrait", "label": "Portrait (3:4)" },
            { "value": "landscape", "label": "Landscape (4:3)" }
          ], "default": "square" },
        { "type": "inline_richtext", "id": "title", "label": "Title", "default": "Card Title" },
        { "type": "richtext", "id": "description", "label": "Description",
          "default": "<p>Card description text</p>" },
        { "type": "text", "id": "cta_label", "label": "Button label" },
        { "type": "url", "id": "cta_url", "label": "Button link" },
        { "type": "text", "id": "badge_text", "label": "Badge text (optional)" }
      ]
    }
  ],
  "presets": [
    {
      "name": "Cards Grid",
      "blocks": [
        { "type": "card" },
        { "type": "card" },
        { "type": "card" }
      ]
    }
  ],
  "max_blocks": 12
}
{% endschema %}
```

## Pattern C — Testimonials / Reviews

```liquid
{% schema %}
{
  "name": "Testimonials",
  "tag": "section",
  "class": "shopify-section",
  "settings": [
    { "type": "inline_richtext", "id": "heading", "label": "Section heading",
      "default": "What Our Customers Say" },
    { "type": "select", "id": "layout", "label": "Layout",
      "options": [
        { "value": "grid", "label": "Grid" },
        { "value": "carousel", "label": "Carousel / Slider" }
      ], "default": "carousel" },
    { "type": "color", "id": "star_color", "label": "Star color", "default": "#f5a623" },
    { "type": "color", "id": "card_bg", "label": "Card background", "default": "#f9f9f9" },
    { "type": "header", "content": "Layout & Spacing" }
    // ... ALL 11 spacing range settings from Section 6 ...
  ],
  "blocks": [
    {
      "type": "testimonial",
      "name": "Testimonial",
      "settings": [
        { "type": "range", "id": "rating", "label": "Star rating",
          "min": 1, "max": 5, "step": 1, "default": 5 },
        { "type": "richtext", "id": "quote", "label": "Review text",
          "default": "<p>This product is amazing! Highly recommend.</p>" },
        { "type": "text", "id": "author_name", "label": "Reviewer name", "default": "Happy Customer" },
        { "type": "text", "id": "author_location", "label": "Location (optional)" },
        { "type": "image_picker", "id": "author_image", "label": "Reviewer photo (optional)" },
        { "type": "checkbox", "id": "verified", "label": "Verified purchase badge",
          "default": true },
        { "type": "text", "id": "product_name", "label": "Product reviewed (optional)" }
      ]
    }
  ],
  "presets": [
    {
      "name": "Testimonials",
      "blocks": [
        { "type": "testimonial" },
        { "type": "testimonial" },
        { "type": "testimonial" }
      ]
    }
  ],
  "max_blocks": 30
}
{% endschema %}
```

## Pattern D — Product Feature Section (with Metafields)

```liquid
{% schema %}
{
  "name": "Product Feature",
  "tag": "section",
  "class": "shopify-section",
  "settings": [
    { "type": "product", "id": "product", "label": "Featured product" },
    { "type": "select", "id": "layout", "label": "Layout",
      "options": [
        { "value": "image-left", "label": "Image left" },
        { "value": "image-right", "label": "Image right" }
      ], "default": "image-left" },
    { "type": "header", "content": "Content Visibility" },
    { "type": "checkbox", "id": "show_description", "label": "Show product description",
      "default": true },
    { "type": "checkbox", "id": "show_price", "label": "Show price", "default": true },
    { "type": "checkbox", "id": "show_rating", "label": "Show rating", "default": true },
    { "type": "checkbox", "id": "show_add_to_cart", "label": "Show Add to Cart button",
      "default": true },
    { "type": "header", "content": "Custom Content Override" },
    { "type": "inline_richtext", "id": "custom_heading", "label": "Custom heading (overrides product title)" },
    { "type": "richtext", "id": "custom_description", "label": "Custom description (overrides product description)" },
    { "type": "header", "content": "Layout & Spacing" }
    // ... ALL 11 spacing settings ...
  ],
  "presets": [{ "name": "Product Feature" }]
}
{% endschema %}
```

## Common Liquid Patterns (Copy-paste Ready)

### Image Output (Always Use This)
```liquid
{{
  section.settings.image
  | image_url: width: 1200
  | image_tag:
    loading: 'lazy',
    alt: section.settings.image_alt | default: section.settings.heading | default: '',
    class: '[section-name]__image',
    widths: '375, 600, 750, 900, 1100, 1440'
}}
```

### Color with Opacity (Schema-Driven)
```liquid
{%- assign overlay_color = section.settings.overlay_color -%}
{%- assign overlay_alpha = section.settings.overlay_opacity | divided_by: 100.0 -%}
{% style %}
  #shopify-section-{{ section.id }} .overlay {
    background-color: {{ overlay_color | color_modify: 'alpha', overlay_alpha }};
  }
{% endstyle %}
```

### Conditional Content Visibility
```liquid
{% if section.settings.show_heading and section.settings.heading != blank %}
  <h2 class="[section-name]__heading">{{ section.settings.heading }}</h2>
{% endif %}
```
The schema: `{ "type": "checkbox", "id": "show_heading", "label": "Show heading", "default": true }`

### Schema-Driven Section Scoped CSS (Full Pattern)
```liquid
{% style %}
  #shopify-section-{{ section.id }} {
    background-color: {{ section.settings.background_color }};
  }
  #shopify-section-{{ section.id }} .section-inner {
    padding: {{ section.settings.padding_top }}px {{ section.settings.padding_right }}px
             {{ section.settings.padding_bottom }}px {{ section.settings.padding_left }}px;
    margin-top: {{ section.settings.margin_top }}px;
    margin-bottom: {{ section.settings.margin_bottom }}px;
    max-width: {{ section.settings.section_max_width }}px;
    gap: {{ section.settings.item_gap }}px;
  }
  #shopify-section-{{ section.id }} .section__heading {
    color: {{ section.settings.heading_color }};
    font-size: {{ section.settings.heading_size }}px;
    letter-spacing: {{ section.settings.heading_letter_spacing }}em;
  }
  @media (max-width: 749px) {
    #shopify-section-{{ section.id }} .section-inner {
      padding-top: {{ section.settings.mobile_padding_top }}px;
      padding-bottom: {{ section.settings.mobile_padding_bottom }}px;
      padding-left: {{ section.settings.mobile_padding_horizontal }}px;
      padding-right: {{ section.settings.mobile_padding_horizontal }}px;
    }
    #shopify-section-{{ section.id }} .section__heading {
      font-size: {{ section.settings.mobile_heading_size }}px;
    }
  }
{% endstyle %}
```

### AJAX Add to Cart
```liquid
<form action="/cart/add" method="post" enctype="multipart/form-data"
      class="[section-name]__form" data-type="add-to-cart-form">
  <input type="hidden" name="id"
         value="{{ product.selected_or_first_available_variant.id }}">
  <input type="hidden" name="quantity" value="1">
  {% if section.settings.show_add_to_cart %}
    <button type="submit" name="add"
            class="btn btn--primary [section-name]__add-to-cart"
            {% unless product.selected_or_first_available_variant.available %}disabled{% endunless %}>
      {% if product.selected_or_first_available_variant.available %}
        {{ 'products.product.add_to_cart' | t }}
      {% else %}
        {{ 'products.product.sold_out' | t }}
      {% endif %}
    </button>
  {% endif %}
</form>
```

### Metafield Access (Always Nil-Check)
```liquid
{%- assign custom_value = product.metafields.custom.field_name.value -%}
{% if custom_value != blank %}
  <p class="[section-name]__custom">{{ custom_value }}</p>
{% endif %}
```


# ╔══════════════════════════════════════════════════════════════╗
# ║  SECTION 11: QA ASSERTIONS REFERENCE (ALL TIERS)            ║
# ╚══════════════════════════════════════════════════════════════╝

## Tier 1 — BLOCKERS (Must PASS Before Deployment)

### Schema Assertions
- [ ] `{% schema %}` block exists in every `.liquid` section file
- [ ] Schema JSON is valid (parseable with `json.loads()`)
- [ ] All settings have: `type`, `id`, `label` fields
- [ ] All settings with visible text have `default` values
- [ ] All `image_picker` settings have no hardcoded fallback src in Liquid
- [ ] Presets defined so section is drag-drop ready in Customizer
- [ ] All blocks have `{{ block.shopify_attributes }}` on root element
- [ ] `max_blocks` defined if blocks are used
- [ ] Layout & Spacing group with all 11 settings present in every section
- [ ] `{% style %}` used (not `<style>`) for schema-driven CSS

### Hardcoded Value Assertions
- [ ] Zero hardcoded hex colors in `.liquid` files (outside schema defaults)
- [ ] Zero hardcoded hex colors in `.css` files (use `var(--token)` instead)
- [ ] Zero hardcoded text strings in `.liquid` output (all from settings or `| t`)
- [ ] Zero hardcoded image `src` paths in `.liquid` (all from `image_picker` settings)
- [ ] Zero hardcoded `href` URLs (all from `url` settings)
- [ ] Zero inline `style=""` attributes with hardcoded values

### Liquid Assertions
- [ ] All `{% if %}` tags have matching `{% endif %}`
- [ ] All `{% for %}` tags have matching `{% endfor %}`
- [ ] All `{% capture %}` tags have matching `{% endcapture %}`
- [ ] All `{% form %}` tags have matching `{% endform %}`
- [ ] All `{% case %}` tags have matching `{% endcase %}`
- [ ] No undefined variables accessed without `| default: ''`
- [ ] No `{{ product.metafields.X.Y }}` accessed without nil check

### JSON File Assertions
- [ ] `config/settings_schema.json` passes JSON validation
- [ ] All `templates/*.json` pass JSON validation
- [ ] All `locales/*.json` pass JSON validation
- [ ] No duplicate setting IDs in `settings_schema.json`
- [ ] No duplicate group names in `settings_schema.json`

### Live Preview Assertions
- [ ] `shopify theme dev` is running (localhost 9292 responds — internal check only)
- [ ] Shareable preview link extracted: `https://{store}.myshopify.com/?preview_theme_id={id}`
- [ ] Section renders without Liquid errors on the target page
- [ ] SHAREABLE live preview URL (never localhost) shared with user in every gate report

---

## Tier 2 — WARNINGS (Should Fix, Not Blocking)

### Performance Assertions
- [ ] All `<img>` tags have `loading="lazy"` (hero/LCP image: `loading="eager"`)
- [ ] LCP image has `fetchpriority="high"`
- [ ] New CSS files loaded via `theme.liquid`, not inline `stylesheet_tag` in sections
- [ ] No `@import` in CSS files
- [ ] JS files use `defer` or loaded at bottom of `<body>` (or via `theme.liquid`)
- [ ] Images use `image_url: width: N` to serve appropriately sized images
- [ ] `widths:` parameter used in `image_tag` for responsive srcset

### Accessibility Assertions
- [ ] All `<img>` have `alt` attribute (from setting, `| default: ''` for decorative)
- [ ] Interactive elements have `aria-label` if no visible text
- [ ] Color contrast ratio ≥ 4.5:1 for body text
- [ ] Color contrast ratio ≥ 3:1 for large text / UI elements
- [ ] Focus states visible (not removed with `outline: none` without replacement)
- [ ] Form labels present for all form inputs

### Code Quality Assertions
- [ ] CSS classes namespaced to section (e.g., `.[section-name]__` not global `.btn`)
- [ ] No `!important` in new CSS unless overriding an immovable theme default
- [ ] No `position: fixed` unless intentional (drawers, modals, sticky headers)
- [ ] Mobile-first CSS (min-width queries, not max-width except for overrides)
- [ ] No `console.log()` left in production JS
- [ ] No hardcoded pixel values in inline styles (all via schema + {% style %})

### Customizer UX Assertions
- [ ] Section name is Title Case and merchant-friendly
- [ ] Setting labels are plain English (not `bg_color_hex` or `img_picker_1`)
- [ ] `info` text added to any setting with non-obvious behavior
- [ ] Settings logically grouped with `header` separators
- [ ] `range` settings have appropriate `min`, `max`, `step`, `unit` values
- [ ] `select` settings have 2-6 options (not too many to be overwhelming)
- [ ] Defaults match the reference design — section looks good immediately after adding

---

## Tier 3 — BEST PRACTICES (Nice to Have)

### Developer Experience
- [ ] Comment at top of Liquid: `{%- comment -%}Section: [name] | Task: [task]{%- endcomment -%}`
- [ ] Complex Liquid logic has inline comments explaining non-obvious behavior
- [ ] CSS has section header comment: `/* === Section: [name] === */`
- [ ] JS has section header comment with version/task info

### Schema Best Practices
- [ ] Use `inline_richtext` for headings (supports bold/italic/links inline)
- [ ] Use `richtext` for paragraph content (full block editor)
- [ ] Use `text` for short labels, names, button text, and badge content
- [ ] Provide `placeholder` for `text` and `richtext` settings to guide merchants
- [ ] Color settings default to the brand's color tokens (from A-01 CSS token list)
- [ ] Block presets filled with realistic dummy content matching the reference design

### Visual QA Best Practices
- [ ] Section looks good with only default settings (no customization required)
- [ ] Section degrades gracefully when all optional settings are left blank
- [ ] Desktop (1440px), tablet (768px), and mobile (390px) all verified visually
- [ ] Dark mode (if theme supports it) tested — colors and contrasts hold

---

## Quick Assertion Runner (Python)

Save as `qa/run_assertions.py` and run against any new section:

```python
#!/usr/bin/env python3
"""
Quick assertion runner for Shopify schema compliance.
Usage: python3 qa/run_assertions.py sections/[new-section].liquid [...]
"""
import re, json, glob, sys

errors = []
warnings = []
info = []

def blocker(condition, message):
    if not condition:
        errors.append(f"❌ BLOCKER: {message}")

def warning(condition, message):
    if not condition:
        warnings.append(f"⚠️  WARNING: {message}")

# ── JSON Files ──────────────────────────────────────────────────────────────
print("── JSON File Validation ──")
for f in (glob.glob('config/settings_schema.json') +
          glob.glob('templates/*.json') +
          glob.glob('locales/*.json')):
    try:
        json.load(open(f))
        info.append(f"✅ {f}")
    except Exception as e:
        blocker(False, f"{f} invalid JSON: {e}")

# ── Settings Schema Duplicate Check ─────────────────────────────────────────
try:
    schema = json.load(open('config/settings_schema.json'))
    all_ids = [(s['id'], g.get('name')) for g in schema
               for s in g.get('settings', []) if 'id' in s]
    from collections import Counter
    dupes = [id for id, c in Counter(i for i,_ in all_ids).items() if c > 1]
    blocker(not dupes, f"Duplicate setting IDs in settings_schema.json: {dupes}")
except: pass

# ── Liquid Files ─────────────────────────────────────────────────────────────
liquid_files = sys.argv[1:] if len(sys.argv) > 1 else glob.glob('sections/*.liquid')

for f in liquid_files:
    print(f"\n── {f} ──")
    content = open(f).read()

    # Schema exists
    has_schema = bool(re.search(r'{%-?\s*schema\s*-?%}', content))
    blocker(has_schema, f"{f}: no schema block found")

    if has_schema:
        m = re.search(r'{%-?\s*schema\s*-?%}(.*?){%-?\s*endschema\s*-?%}',
                      content, re.DOTALL)
        try:
            schema = json.loads(m.group(1))

            # Presets
            blocker('presets' in schema, f"{f}: no presets defined")

            # Max blocks
            if schema.get('blocks'):
                blocker('max_blocks' in schema, f"{f}: blocks defined but no max_blocks")

            # Block shopify_attributes
            block_count = len(schema.get('blocks', []))
            attr_count = content.count('shopify_attributes')
            blocker(block_count == 0 or attr_count >= block_count,
                    f"{f}: {block_count} block types but only {attr_count} shopify_attributes")

            # Layout & Spacing group
            all_ids = [s.get('id','') for s in schema.get('settings', [])]
            spacing_ids = ['padding_top', 'padding_bottom', 'padding_left', 'padding_right',
                           'margin_top', 'margin_bottom', 'section_max_width', 'item_gap',
                           'mobile_padding_top', 'mobile_padding_bottom', 'mobile_padding_horizontal']
            missing_spacing = [s for s in spacing_ids if s not in all_ids]
            blocker(not missing_spacing,
                    f"{f}: missing Layout & Spacing settings: {missing_spacing}")

            # Schema coverage
            liquid_refs = set(re.findall(r'section\.settings\.(\w+)', content))
            liquid_block_refs = set(re.findall(r'block\.settings\.(\w+)', content))
            defined = {s['id'] for s in schema.get('settings', []) if 'id' in s}
            defined_block = set()
            for block in schema.get('blocks', []):
                defined_block.update(s['id'] for s in block.get('settings', []) if 'id' in s)
            missing_defs = liquid_refs - defined
            missing_block_defs = liquid_block_refs - defined_block
            blocker(not missing_defs, f"{f}: settings referenced but not defined: {missing_defs}")
            blocker(not missing_block_defs,
                    f"{f}: block settings referenced but not defined: {missing_block_defs}")

        except json.JSONDecodeError as e:
            blocker(False, f"{f}: schema JSON invalid: {e}")

    # Hardcoded colors (outside schema block)
    liquid_only = re.sub(r'{%-?\s*schema\s*-?%}.*?{%-?\s*endschema\s*-?%}',
                         '', content, flags=re.DOTALL)
    hardcoded_colors = re.findall(r'#[0-9a-fA-F]{3,6}', liquid_only)
    blocker(not hardcoded_colors, f"{f}: hardcoded colors: {hardcoded_colors}")

    # {% style %} not <style>
    style_tag = content.count('<style>')
    blocker(style_tag == 0, f"{f}: uses <style> tag — must use {{% style %}}")

    # Image loading
    imgs = re.findall(r'<img[^>]+>', content)
    for img in imgs:
        if 'loading=' not in img:
            warning(False, f"{f}: <img> without loading attribute: {img[:60]}")

    # Tag balance
    for tag in ['if', 'for', 'unless', 'capture', 'form', 'case', 'paginate']:
        opens = len(re.findall(rf'{{% *{tag}\b', content))
        closes = len(re.findall(rf'{{% *end{tag}\b', content))
        blocker(opens == closes,
                f"{f}: unbalanced {{% {tag} %}}: {opens} opens, {closes} closes")

    # console.log in associated JS
    js_file = f.replace('sections/', 'assets/').replace('.liquid', '.js')
    try:
        js = open(js_file).read()
        warning('console.log' not in js, f"{js_file}: console.log() left in production code")
    except FileNotFoundError:
        pass

# ── Summary ──────────────────────────────────────────────────────────────────
print(f"\n{'═'*60}")
print(f"BLOCKERS: {len(errors)}")
for e in errors: print(e)
print(f"\nWARNINGS: {len(warnings)}")
for w in warnings: print(w)
print(f"{'═'*60}")
if errors:
    print("❌ FAIL — fix all BLOCKERs before proceeding")
    sys.exit(1)
else:
    print("✅ PASS — all Tier 1 assertions satisfied")
    sys.exit(0)
```

Usage:
```bash
# Check a specific section
python3 qa/run_assertions.py sections/[new-section].liquid

# Check all sections
python3 qa/run_assertions.py

# Check multiple specific sections
python3 qa/run_assertions.py sections/[name1].liquid sections/[name2].liquid
```


# ╔══════════════════════════════════════════════════════════════╗
# ║  SECTION 12: AGENT PLAN OUTPUT TEMPLATE                     ║
# ╚══════════════════════════════════════════════════════════════╝

When triggered with a task, output this complete plan document (filled in):

```
# ════════════════════════════════════════════════════════════
# SHOPIFY MULTI-AGENT TASK PLAN
# Task: [TASK_NAME]
# Generated: [DATE]
# Repo: [REPO_PATH]
# Reference: [REFERENCE_URL or "none"]
# Schema-based: ACTIVE — hardcoded values BLOCKED at every gate
# ════════════════════════════════════════════════════════════

## TASK SUMMARY
[2-3 sentence description of what will be built/changed and why]

## SUBTASK BREAKDOWN

| ID | Description | Output Files | Dependencies | Agent |
|---|---|---|---|---|
| ST-01 | [verb + what] | sections/[n].liquid, assets/[n].css | none | A-02 |
| ST-02 | [verb + what] | sections/[n].liquid | none | A-03 |
| ST-03 | [verb + what] | templates/[page].json | ST-01, ST-02 | A-04 |

## AGENT ROSTER

| Agent ID | Role | Assigned To | Runs After |
|---|---|---|---|
| A-00 | Leader | All orchestration | — starts immediately |
| A-01 | Codebase Agent | Full theme analysis | A-00 spawns |
| A-02 | Implementation | ST-01 | Gate 0 |
| A-03 | Implementation | ST-02 | Gate 0 (parallel with A-02) |
| A-04 | Implementation | ST-03 | Gate 0 + ST-01 complete |
| QA-T-01 | Subtask Tester | ST-01 | A-02 done |
| QA-C-01 | Subtask Checker | ST-01 | QA-T-01 PASS |
| QA-V-01 | Subtask Verifier | ST-01 | QA-C-01 PASS |
| QA-T-02 | Subtask Tester | ST-02 | A-03 done |
| QA-C-02 | Subtask Checker | ST-02 | QA-T-02 PASS |
| QA-V-02 | Subtask Verifier | ST-02 | QA-C-02 PASS |
| QA-T-03 | Subtask Tester | ST-03 | A-04 done |
| QA-C-03 | Subtask Checker | ST-03 | QA-T-03 PASS |
| QA-V-03 | Subtask Verifier | ST-03 | QA-C-03 PASS |
| A-INT | Integration Agent | All files | Gate 2 all PASS |
| QA-FT | Final Tester | Full task | Gate 3 |
| QA-FC | Final Checker | Full task | QA-FT PASS |
| QA-FV | Final Verifier | Full task | QA-FC PASS |

Total agents: [N]

## EXECUTION GRAPH

A-00 ──────────────────────────────────────────────────────────
  └─► A-01 (Codebase)
            │
         [Gate 0]
         ╱   ╲
      A-02   A-03  ← parallel (no deps)
       │      │
      A-04 ←──┘  ← sequential (needs ST-01 output)
       │
    [Gate 1]
    ╱   ╲   ╲
[QA-01] [QA-02] [QA-03]  ← triads run parallel, each is sequential T→C→V
    │       │       │
    └───────┴───────┘
         [Gate 2]
            │
          A-INT
            │
         [Gate 3]
            │
     QA-FT → QA-FC → QA-FV
            │
         [Gate 4]
            │
     TASK_COMPLETION.md + Live Preview ✅

## SCHEMA COMPLIANCE REMINDER (All Agents Read This)
> 🚫 ZERO hardcoded values.
> Text, color, image, URL, number → schema setting.
> Structural HTML, CSS classes, Liquid logic → may be hardcoded.
> Layout & Spacing group (11 settings) mandatory in every section.
> {% style %} not <style>.
> Schema written BEFORE markup. Always.

## INDIVIDUAL AGENT BRIEFS
[for each agent, paste the filled brief from Sections 7-9 of this skill]

## QA GATES SUMMARY

| Gate | Condition | On FAIL |
|---|---|---|
| Gate 0 | A-01 report complete and approved | Re-run A-01 |
| Gate 1 | All implementation agents self-verified | Fix and retry |
| Gate 2 | All subtask triads: T+C+V all PASS | Return to implementor, max 2 retries |
| Gate 3 | A-INT: conflicts clean, JSON valid, 0 theme check errors | Fix and retry |
| Gate 4 | QA-FT + QA-FC + QA-FV all PASS | Return to responsible agent |

## DELIVERABLES CHECKLIST

At task completion, these MUST all exist:
- [ ] sections/[name].liquid — new section file(s)
- [ ] assets/[name].css — section styles
- [ ] assets/[name].js — section JS (if needed)
- [ ] config/settings_schema.json — updated (if global settings added)
- [ ] templates/[page].json — updated (sections wired to pages)
- [ ] locales/en.default.json — updated (if new t-filter keys added)
- [ ] qa/screenshots/implementation-desktop.png
- [ ] qa/screenshots/implementation-mobile.png
- [ ] qa/screenshots/reference-desktop.png (if reference URL provided)
- [ ] TASK_LOG.md (Leader's running log)
- [ ] TASK_COMPLETION.md (final report)
- [ ] shopify theme dev running, shareable preview link
      (https://[store].myshopify.com/?preview_theme_id=[id]) shared with user ✅

## GIT COMMIT SUGGESTION

feat([scope]): [task name in lowercase]

- Add [section-name] section with [N] schema settings + full Layout & Spacing control
- Add [section-name].css with mobile-first responsive layout
- Wire to [page] template
- All visual values schema-controlled — zero hardcoded content
- Playwright screenshots archived in qa/screenshots/

Closes: [issue/ticket]
```


# ╔══════════════════════════════════════════════════════════════╗
# ║  SECTION 13: QUICK REFERENCE CARD                           ║
# ╚══════════════════════════════════════════════════════════════╝

## When This Skill is Triggered
→ Any Shopify task: building sections, editing layouts, adding features, fixing bugs,
  migrating themes, managing store content, pixel-perfect cloning, RTL localization.

## What You (Claude) Do
→ Do NOT execute the task.
→ Run Phase 0 (read the codebase, decompose subtasks, decide agents).
→ Generate the full agent plan document from Section 12.
→ Hand the plan to the user for execution in Claude Code.

## Agent Count Formula
```
Core:       A-00 + A-01 + 1 per subtask + 3 QA per subtask + A-INT + 3 Final QA = 10 + (N×4)
Optional:   A-RTL, A-PERF, A-DATA, A-TRANS, A-ASSET, A-TMPL, A-DEPLOY
```

## The Pipeline (Never Skip a Gate)
```
A-00 → A-01 → [Gate 0] → Implementation(s) → [Gate 1]
→ Subtask QA Triads (T→C→V per subtask) → [Gate 2]
→ A-INT → [Gate 3]
→ QA-FT → QA-FC → QA-FV → [Gate 4]
→ TASK_COMPLETION.md + Live Preview URL
```

## Hardcoded Value Rules (Zero Tolerance)
```
ALWAYS schema settings:  text, colors, images, URLs, numbers, toggles, layout choices
ALLOWED hardcoded:        HTML tags, CSS class names, Liquid control flow, asset references
MANDATORY in every section: Layout & Spacing group (11 range settings)
MANDATORY style tag:      {% style %} NOT <style>
```

## Schema-First Order (Non-Negotiable)
```
1. Write {% schema %} with ALL settings
2. Get Leader approval
3. Write Liquid markup
4. Write CSS file (mobile-first, use CSS custom properties)
5. Write JS file (IIFE, RTL-aware, handle shopify:section:load)
6. Self-verify checklist
7. Report to Leader
```

## Live Preview Rule
```
After EVERY file change → confirm shopify theme dev is running (background, log captured)
URL for the user     → https://{store}.myshopify.com/?preview_theme_id={id}  (SHAREABLE)
                       + Customizer: https://admin.shopify.com/store/{handle}/themes/{id}/editor
                       NEVER give the user http://127.0.0.1:9292 (internal QA only)
Every gate report    → include the shareable preview URL
Gate 4 invalid       → without a confirmed shareable live preview
```