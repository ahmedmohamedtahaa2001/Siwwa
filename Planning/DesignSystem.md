# Siwa — Design System

## Overview

Siwa's system runs on **two palettes with two different jobs**, not one.

1. **UI Chrome Palette** — sand, cream, mud, and one gold accent. This carries the actual e-commerce interface: nav, buttons, cards, forms, checkout. It's calm and recedes behind product photography, the way Pinterest's cream chrome recedes behind pin imagery.
2. **Cultural Accent Set** — five colors drawn directly from real Siwan embroidery (palm green, date red, date yellow, desert brown, black). This is used sparingly, outside the core UI, to carry the brand's actual heritage: the "Our Story" page, authenticity badges, packaging call-outs, and Arabic typographic moments. It is **not** a chrome palette and must never leak into buttons, nav, or high-frequency UI — that would recreate the "too many gold accents" problem this system already solved, just with a second color.

This split exists because the brand has a real gap: the product itself (real jars, real Instagram content) already carries Arabic script, cinematic warmth, and per-scent color worlds — but the website currently strips all of that out and ships English-only, black-and-white, storyless UI. The UI Chrome Palette was never meant to carry the *entire* cultural identity by itself; it was designed to be a quiet, sellable interface. The Cultural Accent Set is the second half of the system that actually closes the gap between "what the jar says" and "what the website shows."

**A color palette cannot fix naming, language, or storytelling problems by itself.** This doc documents where color *does* help (surface hierarchy, badges, dividers, iconography) and flags clearly where the fix is not a color at all (product naming, bilingual copywriting, photography direction, motif usage). See **§9 — What Color Cannot Fix** at the end of this document.

---

## 1. UI Chrome Palette

All 12 tokens sit on a single sand → cream → mud spectrum, plus one gold accent. No green, no blue, no cool gray. Depth and hierarchy come from moving along this one warm scale.

### Brand & Accent
- **Unforgettably Gold** (`{colors.primary}` — `#b18044`): the brand's only saturated UI accent. Primary CTA buttons, active nav state, price emphasis, focus rings.
- **Cameleer** (`{colors.primary-alt}` — `#e1b160`): lighter, warmer gold. Sale badges, button hover/pressed state, highlight pills.

### Surface
- **Near White** (`{colors.canvas}` — `#f7f5ee`): base page canvas. Primary nav, page body, modal background.
- **Sailcloth** (`{colors.surface-card}` — `#eae0c4`): warm-cream card and section background, one tonal step down from canvas. Product cards, alternating feature rows, category tiles.
- **Gobi Desert** (`{colors.hairline}` — `#ccbca0`): light sand tone. 1px card borders, dividers.
- **Desert Dust** (`{colors.surface-hover}` — `#e4b68a`): hover/highlight background for interactive rows and secondary surfaces.

### Text
- **Black Mesa** (`{colors.ink}` — `#212012`): primary headlines, nav links, body text, logo.
- **Torrefacto Roast** (`{colors.heading}` — `#50251c`): section headings, product names, deep oud-brown.
- **Zinc Blend** (`{colors.text-secondary}` — `#a38f7e`): supporting copy, metadata, product subtitles.
- **Spicy Mix** (`{colors.link}` — `#8b5f4c`): inline links, secondary button text.

### Semantic
- **Dusty Canyon** (`{colors.success}` — `#987d69`): in-stock badges, success confirmations — a mud tone standing in for the conventional green. Pair with a checkmark icon or explicit "In Stock" label; color alone doesn't read as strongly as green would.
- **Incense** (`{colors.tag}` — `#b09b7e`): filter chips, scent-family tags, neutral labels.
- **Cameleer** (`{colors.sale}` — `#e1b160`): sale/discount badges (text uses `{colors.heading}`, never white).

### Depth
- **Black Mesa** (`{colors.surface-dark}` — `#212012`): footer, dark CTA strips, dark section backgrounds. Doubles as the darkest text color and darkest surface.
- **On Dark** (`{colors.on-dark}` — `#d4cfc2`): text on `{colors.surface-dark}`.

---

## 2. Cultural Accent Set — real Siwan embroidery colors

Traditional Siwan embroidery uses five colors, each tied to a specific element of oasis life. These are historically and culturally specific — they are not a designer's palette, they're inherited. This set exists to give the brand a second, restrained register for moments that are explicitly about heritage rather than commerce.

| Token | Color | Hex | The real thing | Where it comes from |
|---|---|---|---|---|
| `{cultural.palm-green}` | Palm Green | `#4f5734` | The date palm frond itself | Siwa's 300,000 palm trees, the oasis's namesake ("Field of Trees") |
| `{cultural.date-red}` | Date Red | `#8f3a2e` | Ripe date fruit | Siwa is one of Egypt's great date-growing oases |
| `{cultural.date-yellow}` | Date Yellow | `#977f3a` | Unripe/golden date fruit | The other stage of the same harvest as Date Red |
| `{cultural.desert-brown}` | Desert Brown | `#865431` | The open sand beyond the cultivated oasis | The desert that surrounds and defines the oasis edge |
| `{cultural.embroidery-black}` | Embroidery Black | `#212012` (shared with `{colors.ink}` / Black Mesa) | Outline and grounding thread in Siwan embroidery | Deliberately shared with the UI ink color so the two palettes never visually clash |

### Rules for the Cultural Accent Set
- **Never in core UI.** Not in buttons, nav, filter chips, form inputs, checkout, or price display. If it starts appearing in high-frequency interface, it has been misused.
- **One accent color per cultural moment**, same discipline as gold in the UI palette — don't use all five at once outside of an explicit embroidery-motif graphic.
- **Correct uses:**
  - "Our Story" / heritage page: pull-quotes, section dividers, a thin embroidery-pattern rule between paragraphs
  - Authenticity badge on Arabic-named products (e.g. "أصيل" / "Authentic Siwan Recipe") — small badge, one Cultural Accent color, never full-bleed
  - Packaging call-outs and unboxing content ported to the website (product detail page "from the source" module)
  - Silversmithing / craft-story imagery captions
  - A restrained embroidery-inspired line motif for section breaks — never a busy repeating pattern
- **Incorrect uses:**
  - Recoloring the primary CTA button in Date Red "to stand out more"
  - Using Palm Green as a second success/in-stock color alongside Dusty Canyon — pick one system per concept, don't mix
  - Embroidery pattern as a background texture behind body text (fails legibility, becomes decoration instead of meaning)

---

## 3. When to use which palette

| Surface | Palette | Why |
|---|---|---|
| Nav, buttons, forms, checkout, price | UI Chrome | High-frequency — needs to stay calm and sellable |
| Product grid / PDP core layout | UI Chrome | Same reasoning — the bottle photography should lead |
| "Our Story" page hero and section dividers | Cultural Accent | This is the one page whose entire job is heritage storytelling |
| Authenticity / "Siwan-made" badges | Cultural Accent (single color, small) | Signals heritage without becoming the whole page |
| Scent-world accent per fragrance (matching Instagram's per-scent color worlds) | Neither — see §9 | This is a photography/art-direction problem, not a token problem |
| Footer | UI Chrome (`{colors.surface-dark}`) | Consistency with rest of chrome |
| Packaging-replica content blocks (PDP "from the source" module) | Cultural Accent | Directly mirrors what's printed on the physical jar |

---

## 4. Typography — bilingual system

The current site is English-only. The physical product is bilingual (Arabic + Latin, e.g. "SIWA FRAGRANCES ← موج ← EXTRAIT DE PARFUM"). The type system must support both scripts natively, not as an afterthought.

### Latin
**Display / editorial:** a serif (Canela, Tiempos, or equivalent) for hero headlines, product names on detail pages, pull quotes.
**UI / body:** a clean geometric-humanist sans (Inter, General Sans) for nav, buttons, body copy, metadata.

### Arabic
**Display / editorial:** a warm Arabic serif/Naskh-style face with real calligraphic presence — **Aref Ruqaa** or **Markazi Text** — paired to feel like the Latin serif's sibling, not a system fallback. Used for the Arabic product name treatment on PDPs (e.g. موج) and any heritage-page headline.
**UI / body:** **IBM Plex Sans Arabic** or **Tajawal** for nav, buttons, and body copy — both have well-supported weight ranges that match Inter's structure, so Latin/Arabic UI text can sit side by side without one script looking heavier or more casual than the other.

### Pairing rule
Every place the Latin serif appears in a bilingual moment (hero headline, product name, "Our Story" pull-quote), the Arabic serif equivalent appears at matching visual weight — not smaller, not lighter, not "translated in the footnote." The two scripts are co-equal, mirroring how the physical packaging already treats them.

### Hierarchy

| Token | Size | Weight | Line height | Use |
|---|---|---|---|---|
| `{typography.display-xl}` | 56px | 400 (serif) | 1.15 | Hero headline |
| `{typography.display-lg}` | 36px | 400 (serif) | 1.2 | Section heading, collection title |
| `{typography.heading-lg}` | 22px | 500 (sans) | 1.3 | Modal title |
| `{typography.heading-lg}` **@600** | 22px | **600 (sans)** | 1.3 | **Product card title** — client direction 2026-08-14. Was `{typography.heading-md}` 17px/500, which sat only 4px and half a weight step above the 13px subtitle beneath it; the card's main text now leads it outright. 600 is the heaviest weight the Inter subset loads. |
| `{typography.heading-md}` | 17px | 500 (sans) | 1.35 | Section subhead; card title in the compact and bare skins, which keep their own smaller size |
| `{typography.body-md}` | 16px | 400 (sans) | 1.6 | Body copy, product description |
| `{typography.body-strong}` | 16px | 500 (sans) | 1.6 | Nav links, form labels |
| `{typography.body-sm}` | 13px | 400 (sans) | 1.5 | Metadata, product subtitle |
| `{typography.caption}` | 11px | 500 (sans) | 1.4 | Badge text, footer copyright |
| `{typography.button-md}` | 13px | 500 (sans) | 1 | Standard button label |
| `{typography.price}` | 15px | 500 (sans) | 1 | Price display — always `{colors.ink}`, never gold |
| `{typography.arabic-display}` | matches display-lg/xl | Aref Ruqaa / Markazi Text | 1.3 | Arabic product name, heritage headline |
| `{typography.arabic-body}` | matches body-md/strong | IBM Plex Sans Arabic / Tajawal | 1.7 | Arabic body copy, nav, labels |

RTL note: line-height runs slightly looser on Arabic body text (1.7 vs 1.6) — Arabic script needs marginally more vertical breathing room at the same point size.

---

## 5. Layout

### Spacing system
- **Base unit:** 8px.
- **Tokens:** `{spacing.xxs}` (4px) · `{spacing.xs}` (8px) · `{spacing.sm}` (12px) · `{spacing.md}` (16px) · `{spacing.lg}` (24px) · `{spacing.xl}` (32px) · `{spacing.section}` (72px).
- **Section rhythm:** 72px between major page blocks.
- **Product grid gutters:** 16px.
- **Card padding:** 16px internal (image inset, not full-bleed).

### Grid & container
- **Max width:** 1200px content area, 24px outer gutters.
- **Product grid:** 4 columns desktop, 3 tablet, 2 mobile-landscape, 1 mobile. Fixed 4:5 aspect ratio per card.
- **Feature row:** asymmetric 2-column split, alternating left/right image + copy.
- **Footer:** 4-column link grid desktop → 2-up tablet → accordion mobile.
- **RTL support:** the grid must mirror correctly when Arabic is the primary reading direction on a given page/locale — feature-row alternation, nav cluster order, and card internal alignment all flip.

---

## 6. Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| 0 — Flat | No border, no shadow | Default for product cards, feature rows, footer |
| 1 — Tonal step | `{colors.surface-card}` on `{colors.canvas}` | Primary "elevation" — depth from warmth, not shadow |
| 2 — Hairline border | 1px solid `{colors.hairline}` | Card borders, dividers, input borders |
| 3 — Modal scrim + soft shadow | Dark scrim + 16px ambient shadow | Cart drawer, quick-view modal |

---

## 7. Shapes

| Token | Value | Use |
|---|---|---|
> **Revised 2026-08-12 — sharp corners throughout, on client direction.**
> The previous values (`md` 10px, `full` 9999px) are superseded. Every corner in the system is
> now square. This aligns the rebuild with the live store, which already runs `border-radius: 0`
> sitewide (`reference-analysis/02-DESIGN-SYSTEM.md`), and it removes the one point where the
> proposed system softened an otherwise severe brand. The three tokens are retained rather than
> collapsed to a single value so the decision can be reversed in one place.

| `{rounded.none}` | 0px | Footer, primary nav, full-width dark CTA strips |
| `{rounded.md}` | **0px** *(was 10px)* | Buttons, inputs, product cards, feature cards |
| `{rounded.full}` | **0px** *(was 9999px)* | Filter chips, badges, avatar marks |

**Consequences to hold to:**
- Chips and badges are now **rectangles**, not pills. Give them slightly tighter horizontal
  padding (`10px` → `8px`) so they do not read as buttons.
- The avatar mark on `review-card` is a **square monogram**, not a circle.
- Nothing else in the system changes — radius was the only soft edge in it.

---

## 8. Components

### Buttons
**`button-primary`** — background `{colors.primary}`, text `#ffffff`, padding `10px 20px`, height 40px, rounded `{rounded.md}`. Hover/pressed: background → `{colors.primary-alt}`, text → `{colors.heading}`.
**`button-secondary`** — transparent, 1px border `{colors.hairline}`, text `{colors.ink}`.
**`button-tertiary`** — ghost link, text `{colors.link}`, no border.

### Filter & tag chips
**`filter-chip`** / **`filter-chip-active`** — default: `{colors.surface-card}` bg, `{colors.ink}` text, rounded `{rounded.full}`; active: `{colors.ink}` bg, white text.
**`scent-tag`** — background `{colors.tag}` (`#b09b7e`), text `{colors.heading}` (not white — Incense is too light for white text to clear contrast), rounded `{rounded.full}`.

### Badges
**`badge-sale`** — background `{colors.sale}`, text `{colors.heading}`, rounded `{rounded.full}`.
**`badge-in-stock`** — background `{colors.success}` (`#987d69`), text `#ffffff`, rounded `{rounded.full}`. Pair with a checkmark icon.
**`badge-authentic-siwan`** *(new — Cultural Accent Set)* — background `{cultural.date-red}` or `{cultural.desert-brown}` (pick one per product line, stay consistent), text `#ffffff`, rounded `{rounded.full}`, padding `3px 10px`, type `{typography.caption}`. Used only on the ~2 products (and future additions) with genuine Arabic naming and heritage-recipe framing — not applied brand-wide, since that would dilute it into decoration.

### Cards & containers
**`product-card`** — `{colors.surface-card}` bg, rounded `{rounded.md}`, 16px padding, 1px `{colors.hairline}` border. Inset image, `{typography.heading-lg}` @600 title, `{typography.body-sm}` subtitle, `{typography.price}` price, `{component.button-primary}` bottom-right. On an inspired-by product the subtitle reads *"Inspired by ‹house›"*, and the **house name alone** takes 600 weight and `{colors.heading}` while the framing phrase stays `{colors.text-secondary}` — the house is the claim a customer scans for, the phrase is only what frames it.
**`feature-card`** — alternating `{colors.canvas}` / `{colors.surface-card}`, 32px padding. Pairs 4:5 portrait image with `{typography.display-lg}` headline.
**`modal-card`** — `{colors.canvas}` bg, rounded `{rounded.md}`, 32px padding, 16px ambient shadow over 50%-opacity scrim.
**`dark-cta-strip`** — `{colors.surface-dark}` bg, `{colors.on-dark}` text, `{typography.display-lg}`, `48px 32px` padding.
**`heritage-block`** *(new — Cultural Accent Set)* — `{colors.canvas}` bg, rounded `{rounded.md}`, 32px padding, thin top rule in one Cultural Accent color (2px, not a fill). Used on "Our Story" and PDP "from the source" modules. Pulls in `{typography.arabic-display}` for any Arabic pull-quote, matched weight to its Latin counterpart per §4.

### Navigation
**`primary-nav`** — `{colors.canvas}` bg, `{colors.ink}` text, 64px height, serif "SIWA" wordmark left (Arabic wordmark سيوة should sit adjacent at matching visual weight where the locale is bilingual, not swapped out), centered links, right cluster (search, bag, CTA).

### Footer
**`footer-section`** — `{colors.surface-dark}` bg, `{colors.on-dark}` text, 4-column link grid, wordmark + "© 2026 Siwa" in `{typography.caption}`.

---

## 9. What Color Cannot Fix

This system solves surface hierarchy, brand-color scarcity, and gives heritage content a real (if restrained) visual register. It does **not** solve:

- **Product naming.** 53 of 56 products carry Western names (Lady Killer, Boujee Blush, Sundaze) while the two Arabic-named products (موج, مراسي) outperform them. A color token can't rename a product — this needs a naming strategy decision from the brand team, informed by the fact that the Arabic-named products are already the proof of concept.
- **Bilingual copywriting.** §4 gives you the typographic tools to display Arabic at equal weight to Latin; it doesn't write the Arabic copy. "Our Story" needs real Arabic content, not a translated afterthought in a footnote.
- **Amazigh identity, specific landmarks (Shali Fortress, Temple of the Oracle).** These are photography, illustration, and copywriting decisions — motif and location references — not color tokens. The Cultural Accent Set gives you a palette to render these motifs in *if and when* they're designed, but doesn't design them.
- **Per-scent color worlds** (the cinematic, Instagram-native treatment where each fragrance has its own mood). This is an art-direction and photography brief, not a token system — trying to solve it with more color tokens would just recreate the "too many accents" problem this document exists to prevent.

**In one line:** the UI Chrome Palette makes the store calm and sellable; the Cultural Accent Set gives heritage moments a real, restrained voice; neither one writes the story, renames the products, or art-directs the photography — those are the next briefs.

---

## 10. Vintage Treatment Layer — 1920s–30s expedition ephemera

### Context and goal
The brand wants a vintage mood — aged-paper authenticity, archival distance, period elegance — layered onto specific high-emotion surfaces (hero, editorial, product storytelling, badges), without introducing a second color system. Every aging effect below is achieved with **existing Siwa tokens only**. No sepia, teal, or burgundy hex from any external vintage reference is introduced. The era target stays 1920s–30s desert-expedition and oracle-pilgrimage ephemera (stamped passports, specimen cards, engraved print culture) — consistent with the brand's already-established lore, not a generic mid-century retro look.

### Where this layer applies — and where it must not
| Applies | Does not apply |
|---|---|
| Hero sections, "Our Story" page, product storytelling blocks | Nav, buttons, forms, checkout, filter chips |
| Badges (`badge-authentic-siwan`, seasonal/collection badges) | Price display, in-stock badges |
| Editorial feature rows, pull-quotes | Product grid card chrome (image/price/CTA stay clean) |

This mirrors the existing rule: vintage treatment is for low-frequency, high-emotion surfaces only — never high-frequency UI. Applying grain, vignette, or engraved borders to buttons or nav would undermine the "calm, sellable interface" that §1 exists to protect.

### Color modifiers (token-only, no new hex)
| Skill's instruction | Siwa implementation |
|---|---|
| Reduce saturation, mute | Use `{colors.surface-card}` / `{colors.hairline}` / `{colors.text-secondary}` rather than `{colors.primary}` gold or `{colors.sale}` — the muted end of the existing scale already does this |
| Medium, aged contrast | Body copy on vintage surfaces sits in `{colors.text-secondary}` (Zinc Blend) rather than full-contrast `{colors.ink}`, echoing faded print |
| Sepia temperature shift | Already inherent — the entire Siwa palette is warm. No shift needed, no teal counter-accent |
| Slightly faded brightness | Photography grading should sit a touch below full brightness/contrast, consistent with `{colors.surface-card}` and `{colors.surface-hover}` tonal range — never crushed to black, never blown to white |

### Visual effects (implementation-ready)
- **`effect-paper-grain`** — subtle noise/grain texture at 3–5% opacity, tinted `{colors.hairline}` (Gobi Desert), applied only to `vintage-surface` backgrounds (see below). Must not run under body text blocks longer than ~2 lines — grain under long-form text fails legibility.
- **`effect-vignette`** — radial darkening toward the corners only, using `{colors.ink}` (Black Mesa) at 8–12% opacity max, transparent at center. Never a full-surface tint.
- **`effect-dust-specks`** — sparse micro-texture at 2–4% opacity in `{colors.text-secondary}` (Zinc Blend). Decorative only; must sit behind content, never over text.
- **`effect-edge-wear`** — 1px `{colors.hairline}` border with a slightly irregular/engraved corner treatment (e.g. a subtle notch or double-rule at corners), evoking a specimen card or stamped document edge. Replaces a plain hairline border only on `vintage-surface` components — standard `product-card` keeps its clean 1px border.
- **Explicitly not used:** color-shift "yellowing" as a separate effect — Siwa's palette is already yellow/sand-shifted by design, so a literal yellowing filter would double up and muddy the base tokens.

### Component: `vintage-surface`
- Background: `{colors.surface-card}` (Sailcloth) or `{colors.canvas}`, with `effect-paper-grain` layered at low opacity.
- Border: `effect-edge-wear` treatment in `{colors.hairline}`.
- Optional corner: `effect-vignette`, max 12% opacity.
- Text: headline in existing serif `{typography.display-lg}` / Arabic `{typography.arabic-display}` per §4 — no font substitution. Body in `{colors.text-secondary}` per the contrast modifier above.
- Gold rule stays intact: **one gold threshold per vintage-surface fold maximum** (a single `{colors.primary}` CTA or accent line) — the vintage layer doesn't relax this, it makes the gold read even more like a rare, deliberate mark against an aged surface.
- States: default (as above); no hover/focus state needed since this is a static editorial surface, not an interactive component — if a CTA sits inside it, the CTA uses standard `button-primary` states unmodified.

### Period elements → concrete UI patterns
- **Stamped/passport motif** → small `{typography.caption}` label in a bordered box (`effect-edge-wear`), used for provenance details ("Distilled in Siwa," batch numbers) — text in `{colors.heading}`, border in `{colors.hairline}`.
- **Specimen-card framing** → `vintage-surface` applied to ingredient/note call-outs on the PDP (e.g. a card describing a single note like "Desert amber" with an engraved-style border).
- **Engraved print culture / formal framing** → pull-quotes on "Our Story" set in the serif display type with a thin `{colors.hairline}` rule above and below, centered, generous whitespace — classical, not decorative.
- **Documentary/archival photography direction** → product and lifestyle photography graded slightly desaturated and warm, never crushed contrast, consistent with the "faded brightness" modifier above. This is a photography brief, not a CSS effect — flag for the photographer/retoucher, not implementable in code alone.

### Accessibility acceptance criteria
- Grain, dust-speck, and vignette effects must not reduce text contrast below WCAG AA (4.5:1 for body text, 3:1 for large text) at any opacity — test the final composited surface, not the base token alone.
- `effect-vignette` must never darken the area directly behind body copy; restrict it to corners/edges away from text blocks.
- Engraved/edge-wear borders must not be the sole means of conveying a card boundary for screen-reader or low-vision users — pair with sufficient background contrast between `vintage-surface` and its parent canvas.

### Anti-patterns
- Applying `effect-paper-grain` or `effect-vignette` to `product-card`, `button-primary`, `primary-nav`, or any checkout component.
- Introducing a "faded teal" or "burgundy" accent anywhere, including inside `vintage-surface` — if a second accent is needed for a vintage moment, use `{cultural.date-red}` or `{cultural.desert-brown}` under the existing Cultural Accent Set rules (§2), never a new hex.
- Letting grain/texture run under long-form body text (breaks legibility, becomes noise rather than atmosphere).
- Using more than one gold threshold inside a single `vintage-surface` fold.

### QA checklist
- [ ] Vintage effects appear only on hero, "Our Story," editorial, and badge surfaces — confirmed absent from nav, forms, checkout, product grid chrome
- [ ] No new color tokens introduced; every effect traces to an existing `{colors.*}` or `{cultural.*}` token
- [ ] Grain/vignette/dust opacity values stay within the ranges specified above
- [ ] Text contrast on every `vintage-surface` instance passes WCAG AA at the effect's default opacity
- [ ] No more than one gold (`{colors.primary}`) accent per `vintage-surface` fold
- [ ] Engraved/edge-wear border does not appear on standard `product-card`, `button-primary`, or nav components
