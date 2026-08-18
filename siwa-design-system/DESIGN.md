# Siwa Design System

**Version 3.0.0** · supersedes 2.0.0 · status: implementation-ready

This document is the single authority on how every Siwa surface is allowed to look and behave.
It is the third of the three planning documents — [`01-market-research.md`](../Planning/01-market-research.md)
establishes the opening, [`02-feature-bible.md`](../Planning/02-feature-bible.md) decides what gets
built, and this decides what it is permitted to be.

The spine is unchanged: **luxury as pilgrimage, not luxury as excess.** Every rule below exists to
make that premise enforceable in code rather than aspirational in a deck.

---

## §0 · What v3.0.0 unified

v3.0.0 merges two inputs that disagreed on fundamentals:

| Input | Contributed |
|---|---|
| **Siwa DS v2.0.0** | Warm Egyptian palette · stamped geometry · rationed gold · bilingual parity · motion, z-index and layout scales · the numbered principles |
| **"Premium Cozy" spec** | Bento layout system · full ecommerce component coverage (PDP, bundles, quiz, search, mega menu) · the type ramp · content and microcopy standards |

Where they conflicted, the resolution is recorded in **[§11 Conflict ledger](#11--conflict-ledger)**.
Three decisions were made by the project owner and are not open for re-litigation by an implementer:

1. **Palette** — v2.0.0's warm Egyptian family is authoritative. The Premium Cozy palette is not used.
2. **Shape** — two-tier. The commerce layer stays stamped; only the editorial and overlay layers round.
3. **Bilingual** — full Arabic and RTL parity is retained.

Five v2.0.0 colour tokens turned out to fail their own accessibility floor and have been corrected
against measured contrast. Those corrections are in [§11.1](#111--corrections-to-v200) and are the
only reason a v2.0.0 hex differs from a v3.0.0 hex.

**Files**

```
siwa-design-system/
├── DESIGN.md                  ← this document
├── README.md                  install + load order
├── tokens/
│   ├── tokens.json            machine-readable source of truth
│   └── siwa-tokens.css        emitted custom properties
├── css/
│   ├── siwa-base.css          reset · type · layout · bilingual · utilities
│   └── siwa-components.css    every component class
└── preview/index.html         living reference — open it in a browser
```

---

## §1 · Principles

Seven rules. They are ordered — when two conflict, the lower number wins.

### 1. One gold CTA per fold.

Gold is the scarcest thing in the system. It marks the single action Siwa wants taken on the screen
in front of the customer. A second gold element in the same fold does not double the signal, it
halves it.

Gold is permitted on: the primary CTA fill, a display accent at ≥24px, a meaningful icon or stroke
(`--colors-primary-strong`), and headings on dark bands. Gold is forbidden on: body text, prices,
badges, borders of ordinary controls, and any surface large enough to read as a background.

### 2. Never colour alone.

Every state that means something carries at least two channels. Selected is border **and** ground.
Error is colour **and** icon **and** text. A link is colour **and** underline. Longevity is a bar
**and** a number. This is SC 1.4.1, and it is also just how a system survives a greyscale print,
a sun-bleached phone screen, and a colour-blind customer.

### 3. Stamped, not rounded — on the commerce layer.

Anything that carries a price, a CTA, or a form value has a radius of 0–2px. It is a stamp pressed
into the surface, not a bubble floating on it.

v3.0.0 opens one exception: the **editorial layer** — bento tiles, story sections, modals and
drawers — rounds to 16–24px. This is where warmth is allowed to live. The boundary is not
aesthetic preference, it is a testable rule: *if the element can be transacted with, it does not
round.* See [§2.4](#24--shape).

### 4. No shadow outside the editorial and overlay layers.

A product card does not lift. Its hover state is the media scaling and the title underlining, both
of which cost nothing and read in every browser. Shadow is reserved for surfaces that genuinely sit
above the page: modals, drawers, mega menus, and bento tiles on hover.

### 5. Logical properties, always.

`padding-inline-start`, never `padding-left`. `inset-inline-end`, never `right`. `text-align: start`,
never `text-align: left`. This is free in Latin and it is the only reason the Arabic store works at
all. A physical inline-axis property is a CI error, not a style preference. The two documented
exceptions are CSS gradients and `order`, neither of which accepts a logical keyword — both are
mirrored explicitly under `[dir="rtl"]`.

### 6. The price is never gold.

Always `--colors-text`. On cards, on the PDP, on bundle totals, on the cart, in search results.
Gold on a price reads as a markdown sticker; ink on a price reads as a fact. Prices are also always
`--font-mono` with tabular numerals so that a column of them aligns and an RTL paragraph never
reorders the digits inside one.

### 7. The tester is a first-class CTA.

Equal visual weight to "Add to bag" — same height, same type size, same footprint. It takes the
outline treatment rather than the gold fill, and it is **never** `--primary` unless it is the only
CTA on the surface. Trust gap 4 ("what if I hate it after buying full-size") is closed by making
the low-risk option look like a real option, not a consolation.

---

## §2 · Tokens

Never author a raw value. If a value you need does not exist as a token, the answer is to add a
token to `tokens/tokens.json` and re-emit — not to inline a hex, a pixel, or a millisecond.

### 2.1 · Colour

```
GROUND     --colors-background      #f7f5ee   warm parchment — the page
           --colors-surface         #eae0c4   sand — cards, wells, media
           --colors-surface-hover   #d3cab0   sand, pressed
           --colors-surface-dark    #2f3932   deep green-black — inverted bands

INK        --colors-text            #1b2724   body, price, labels
           --colors-text-secondary  #6f6156   meta, captions
           --colors-heading         #6b4a28   section headings
           --colors-heading-alt     #50251c   display headings
           --colors-on-dark         #d3d8d1   ink on dark bands

GOLD       --colors-primary         #b38145   CTA fill · display accent ≥24px
           --colors-primary-strong  #a5773f   gold as a meaningful stroke or icon
           --colors-secondary       #e1b160   light gold — dark grounds only

LINE       --colors-border          #e4b68a   decorative hairline ONLY
           --colors-border-strong   #997a5c   form controls · anything SC 1.4.11 covers
           --colors-hairline-accent #b8bdbd   cool hairline, dark bands

SEMANTIC   --colors-link            #845a48
           --colors-success         #586851
           --colors-warning         #8b5823
           --colors-danger          #9c3b2c
           --colors-tag             #66634e

CATALOG    --colors-original        #6b4a28   ORIGINAL stamp
           --colors-impression      #2f3932   IMPRESSION stamp
           --colors-verified        #586851   VERIFIED stamp
```

#### Verified contrast

This table is the output of [`tools/check-contrast.mjs`](tools/check-contrast.mjs), not a
hand-written estimate. Regenerate it with `node tools/check-contrast.mjs --md` after any palette
edit. If the numbers here and the script's output ever disagree, this document is the one that is
wrong.

| Token | Ground | Ratio | Floor | Verdict |
|---|---|---|---|---|
| `--colors-text` `#1b2724` | background | 14.13:1 | 4.5:1 | **AAA** |
| `--colors-text` `#1b2724` | surface | 11.71:1 | 4.5:1 | **AAA** |
| `--colors-text-secondary` `#6f6156` | background | 5.47:1 | 4.5:1 | **AA** |
| `--colors-text-secondary` `#6f6156` | surface | 4.53:1 | 4.5:1 | **AA** |
| `--colors-heading` `#6b4a28` | background | 7.30:1 | 4.5:1 | **AAA** |
| `--colors-heading-alt` `#50251c` | background | 11.86:1 | 4.5:1 | **AAA** |
| `--colors-link` `#845a48` | background | 5.44:1 | 4.5:1 | **AA** |
| `--colors-link` `#845a48` | surface | 4.51:1 | 4.5:1 | **AA** |
| `--colors-danger` `#9c3b2c` | background | 6.26:1 | 4.5:1 | **AA** |
| `--colors-danger` `#9c3b2c` | surface | 5.19:1 | 4.5:1 | **AA** |
| `--colors-success` `#586851` | background | 5.48:1 | 4.5:1 | **AA** |
| `--colors-success` `#586851` | surface | 4.54:1 | 4.5:1 | **AA** |
| `--colors-warning` `#8b5823` | background | 5.47:1 | 4.5:1 | **AA** |
| `--colors-warning` `#8b5823` | surface | 4.54:1 | 4.5:1 | **AA** |
| `--colors-tag` `#66634e` | background | 5.56:1 | 4.5:1 | **AA** |
| `--colors-tag` `#66634e` | surface | 4.61:1 | 4.5:1 | **AA** |
| `--colors-primary-strong` `#a5773f` | background | 3.63:1 | 3.0:1 | **AA** |
| `--colors-primary-strong` `#a5773f` | surface | 3.01:1 | 3.0:1 | **AA** |
| `--colors-border-strong` `#997a5c` | background | 3.64:1 | 3.0:1 | **AA** |
| `--colors-border-strong` `#997a5c` | surface | 3.02:1 | 3.0:1 | **AA** |
| `--colors-primary` `#b38145` | background | 3.13:1 | 3.0:1 | **AA** (non-text / ≥24px) |
| `--colors-on-dark` `#d3d8d1` | surface-dark | 8.28:1 | 4.5:1 | **AAA** |
| `--colors-secondary` `#e1b160` | surface-dark | 6.08:1 | 4.5:1 | **AA** |
| ink label on gold CTA | `--colors-primary` `#b38145` | 4.51:1 | 4.5:1 | **AA** |
| background label on ink fill | `--colors-text` `#1b2724` | 14.13:1 | 4.5:1 | **AAA** |
| ORIGINAL stamp label | `--colors-original` `#6b4a28` | 7.30:1 | 4.5:1 | **AAA** |
| IMPRESSION stamp label | `--colors-impression` `#2f3932` | 8.28:1 | 4.5:1 | **AAA** |
| VERIFIED stamp label | `--colors-verified` `#586851` | 5.48:1 | 4.5:1 | **AA** |
| SALE stamp label | `--colors-danger` `#9c3b2c` | 6.26:1 | 4.5:1 | **AA** |

**29 pairs, zero failures.**

Seven of them clear their floor by less than 0.05 and the script flags them on every run:
`--colors-text-secondary`, `--colors-link`, `--colors-success` and `--colors-warning` on sand
(4.51–4.54 against 4.5), `--colors-primary-strong` and `--colors-border-strong` on sand
(3.01–3.02 against 3.0), and the ink label on the gold CTA (4.51 against 4.5). That is by
construction — each was solved as the *smallest* shift from its v2.0.0 hue that clears the floor,
so the correction stays invisible next to the original. The consequence is that **any** change to
`--colors-surface` or `--colors-primary` re-opens all seven. Do not nudge these by eye; change the
token and re-run the script.

Two tokens carry hard usage limits that the CSS cannot enforce for you:

- **`--colors-border` `#e4b68a` measures 1.70:1.** It is a decorative hairline. It may divide two
  regions; it may never be the only thing marking the boundary of a control. Use
  `--colors-border-strong` for inputs, selects, chips, size tiles, and steppers.
- **`--colors-primary` `#b38145` measures 3.13:1 on parchment.** It clears SC 1.4.11 for non-text
  and SC 1.4.3 for large text at ≥24px. It is not a body-text colour and never will be.

#### Inverted bands

Put `.on-dark` on any section sitting on `--colors-surface-dark`. It re-points the semantic ink
tokens so components need no dark variants of their own — a `.siwa-card` inside `.on-dark` is
already correct.

### 2.2 · Type

**Families** — v2.0.0's bilingual pair set, unchanged.

```
--font-display-latin   'Fraunces', Georgia, 'Times New Roman', serif
--font-ui-latin        'Inter', -apple-system, BlinkMacSystemFont, …
--font-display-arabic  'Aref Ruqaa', 'Markazi Text', Georgia, serif
--font-ui-arabic       'IBM Plex Sans Arabic', 'Tajawal', Arial, sans-serif
--font-mono            'JetBrains Mono', 'Fira Code', 'Courier New', monospace
```

Author against `--font-display` and `--font-ui`. `siwa-tokens.css` resolves them per language, so
a component never names a script-specific family. All faces load with `font-display: swap`.

**Ramp** — merged in from the Premium Cozy spec, re-expressed as `clamp()` so the mobile step is
automatic and there is no `@media` block re-declaring type sizes.

| Token | Mobile | Desktop | Use |
|---|---|---|---|
| `--text-hero` | 32px | 48px | homepage hero only |
| `--text-h1` | 28px | 36px | page titles, PDP product name |
| `--text-h2` | 24px | 30px | section headers |
| `--text-h3` | 24px | 24px | card titles, bento titles |
| `--text-body-lg` | 18px | 18px | product descriptions, hero subhead |
| `--text-body` | 16px | 16px | default |
| `--text-body-sm` | 14px | 14px | meta, captions, buttons |
| `--text-label` | 12px | 12px | uppercase eyebrows, badges |

Weights 300–700. Leading: display 1.10 · heading 1.25 · body 1.60. Tracking: display −0.01em ·
label 0.12em · button 0.08em — **Latin only**, see [§5](#5--bilingual-and-rtl).

Body copy is capped at `--measure` (68ch). A full-bleed paragraph is a bug.

### 2.3 · Space

4px base, from v2.0.0.

```
1→4px  2→8px  3→12px  4→16px  6→24px  8→32px  12→48px  16→64px  24→96px
```

Two section rhythms, and the choice is semantic rather than visual:

- **`--spacing-section` 72px** — editorial, story, brand surfaces. The ceremonial rhythm. v2.0.0's
  value, kept because the pacing *is* the pilgrimage premise.
- **`--spacing-section-tight` 48px** — dense commerce surfaces: collection grids, cart, account,
  search results. The Premium Cozy value, kept for the places where 72px would read as drift.

Both collapse to 48px / 32px below 768px.

### 2.4 · Shape

The two-tier rule, stated so it can be checked mechanically:

| Layer | Radius | Members |
|---|---|---|
| **Commerce** | `--rounded-none` 0px, or `--rounded-sm` 2px | button · input · select · chip · badge · product card · size tile · stepper · bundle · quiz answer |
| **Editorial** | `--rounded-editorial` 16px · `--rounded-bento` 24px | bento tile · modal · drawer · feature-row media |
| **Circle** | `--rounded-full` | icon button · dot · avatar · progress track |

> **Test:** can the customer transact with this element — click it to buy, type a value into it,
> read a price off it? Then its radius is 0–2px. A circle is not a rounded rectangle and is always
> allowed.

`--rounded-full` on the commerce layer is permitted only for genuinely circular things. A pill-shaped
button is a violation; a 44px round icon button is not.

### 2.5 · Elevation

Mirrors shape exactly.

```
--shadow-none        none                   commerce layer, at rest AND on hover
--shadow-editorial   0 4px 20px rgba(27,39,36,.10)    bento hover, mega menu
--shadow-modal       0 8px 32px + 0 2px 8px           modal, drawer
```

**Focus** is a two-ring token, not a glow:

```
--focus-ring: 0 0 0 2px var(--colors-background), 0 0 0 4px var(--colors-text);
```

The inner ring punches the focused element out of whatever ground it sits on; the outer ink ring
measures 14.13:1 on parchment and 11.71:1 on sand. The Premium Cozy spec proposed a gold halo at
24% alpha — that resolves to roughly 3:1 at best and fails as a sole focus indicator on sand.
On dark bands `--focus-ring-dark` swaps the outer ring to `--colors-secondary` (6.08:1).

### 2.6 · Motion

```
--duration-fast    120ms   colour, border, small state changes
--duration-medium  240ms   drawers, menus, transforms
--duration-slow    400ms   media scale, progress fills
--duration-story   800ms   scrollytelling reveal only

--easing-default   cubic-bezier(0.25, 0.10, 0.25, 1.00)
--easing-enter     cubic-bezier(0.00, 0.00, 0.20, 1.00)
--easing-exit      cubic-bezier(0.40, 0.00, 1.00, 1.00)
```

`prefers-reduced-motion: reduce` collapses all four durations to 0ms at the token level, so a
component gets it for free. Reveal animations force their **end** state under reduced motion —
content is never withheld behind an animation that will not play. The same applies without
JavaScript: `.siwa-reveal` only starts hidden when `.js` is present on `<html>`.

### 2.7 · Layout

```
--grid-max-width      1200px       --nav-height   64px
--grid-outer-gutter     24px       --measure      68ch
--grid-gutter           16px       --tap-min      44px
                                   --control-h    48px
```

Breakpoints — declared as tokens for documentation, written as literals in `@media` because
custom properties are not valid there:

```
480px  mobile   ·  768px  tablet  ·  1200px  desktop  ·  1440px  desktop-lg
```

### 2.8 · Z-index

Never author a literal. The full ladder:

```
base 0 · card-badge 10 · sticky-nav 100 · drawer 200 · scrim 300 · modal 301 · toast 400
```

---

## §3 · Component registry

The registry reconciles the Feature Bible's component IDs with this system's classes — the open
seam flagged in [`Planning/README.md`](../Planning/README.md). Status is honest:

- **✅ Specified** — spec below and CSS shipped in `css/siwa-components.css`.
- **🔶 Tokenised** — CSS shipped, prose spec not yet written. Buildable, not yet auditable.
- **⬜ Open** — neither. Listed so it is tracked rather than forgotten. See [§12](#12--open).

| ID | Component | Class | Layer | Status |
|---|---|---|---|---|
| `A-01` | Button | `.siwa-button` | commerce | ✅ [3.1](#31--a-01-button) |
| `E-02` | BadgeStamp | `.siwa-badge` | commerce | ✅ [3.2](#32--e-02-badgestamp) |
| `P-01` | ProductCard | `.siwa-card` | commerce | ✅ [3.3](#33--p-01-productcard) |
| `L-02` | ProductGrid | `.siwa-grid` | commerce | ✅ [3.4](#34--l-02-productgrid) |
| `L-08` | BentoGrid *(new)* | `.siwa-bento` | editorial | ✅ [3.5](#35--l-08-bentogrid-new-in-v300) |
| `G-01` | SiteNav + mega menu | `.siwa-nav` | commerce | ✅ [3.6](#36--g-01-sitenav) |
| `L-07` | Modal / Drawer | `.siwa-modal` `.siwa-drawer` | editorial | ✅ [3.7](#37--l-07-modal--drawer) |
| `P-07` | SizeSelector (incl. tester) | `.siwa-size` | commerce | ✅ [3.8](#38--p-07-sizeselector) |
| `P-04` | NotePyramid | `.siwa-pyramid` | commerce | ✅ [3.9](#39--p-04-notepyramid) |
| `P-06` | LongevityProjectionBar | `.siwa-meter` | commerce | ✅ [3.10](#310--p-06-longevityprojectionbar) |
| — | Hero (static) | `.siwa-hero` | editorial | ✅ [3.11](#311--hero) |
| — | Search + autocomplete | `.siwa-search` | commerce | ✅ [3.12](#312--search--autocomplete) |
| `C-02` | FeatureRow / scrollytelling | `.siwa-feature-row` | editorial | 🔶 |
| `C-03` | SectionHeading | `.siwa-section-heading` | editorial | 🔶 |
| `C-10` `P-09` | TrustSignalBar / ProductTrustStrip | `.siwa-trust` | commerce | 🔶 |
| `E-06` | ShippingProgressBar | `.siwa-progress` | commerce | 🔶 |
| `P-05` `D-02` | ScentFamilyTag / filter chip | `.siwa-chip` | commerce | 🔶 |
| `D-01` | OracleQuiz | `.siwa-quiz` | commerce | 🔶 |
| `SF-03` | BundleBuilder | `.siwa-bundle` | commerce | 🔶 |
| — | Form field / input | `.siwa-field` `.siwa-input` | commerce | 🔶 |
| — | QuantityStepper | `.siwa-stepper` | commerce | 🔶 |
| — | Alert / Toast | `.siwa-alert` `.siwa-toast` | commerce | 🔶 |
| — | Empty state | `.siwa-empty` | commerce | 🔶 |
| — | Skeleton | `.siwa-skeleton` | commerce | 🔶 |
| `G-02` | SiteFooter | — | commerce | ⬜ |
| `G-03` `C-11` | AnnouncementBar / Strip | — | commerce | ⬜ |
| `C-04` `C-05` | ArticleCard / ArticleBody | — | editorial | ⬜ |
| `C-07` | ProvenienceCard | — | editorial | ⬜ |
| `D-03` | DiscoveryKit | — | commerce | ⬜ |
| `E-04` | GiftOptionsPanel | — | commerce | ⬜ |
| `E-05` | PromoCodeInput | — | commerce | ⬜ |
| `E-07` | LoyaltyPointsDisplay | — | commerce | ⬜ |
| `P-11` `P-12` | ReviewsSection / WriteReviewModal | — | commerce | ⬜ |
| `P-13` | OriginalVsImpressionComparison | — | commerce | ⬜ |
| `USF-02` | ReadingInput / ReadingOutput | — | commerce | ⬜ |
| `USF-05` | CompassTool / CompassResult | — | commerce | ⬜ |
| `USF-04` | ReturnBottleFlow | — | commerce | ⬜ |
| `CCF-03` | AuthenticityBlock | — | commerce | ⬜ |
| — | Wishlist | — | commerce | ⬜ |

Specs use the v2.0.0 format: **intent → lore anchor → anatomy → variants → states → RTL →
responsive → a11y**.

---

### 3.1 · `A-01` Button

**Intent.** Carry every committed action in the store, and make the hierarchy between them legible
before the customer reads a word of the label.

**Lore anchor.** The stamp. A seal pressed into wax does not glow or float — it is either pressed
or it is not. Buttons are 0px, filled or outlined, nothing in between.

**Anatomy.** Inline flex · min-height `--control-h` (48px) · padding-inline `--spacing-6` ·
`--text-body-sm` semibold uppercase at `--tracking-button` · 1px border · radius 0.

**Variants.**

| Variant | Ground | Border | Label | Use |
|---|---|---|---|---|
| `--primary` | `--colors-primary` gold | gold | `--colors-text` (4.51:1) | the one action per fold |
| `--tester` | transparent | ink 1px | ink | the tester tier — principle 7 |
| `--secondary` | transparent | ink 1px | ink | equal-weight alternate |
| `--quiet` | transparent | `--colors-border-strong` | `--colors-text-secondary` | tertiary, non-committal |
| `--text` | none | none | `--colors-link`, underlined | inline navigation |
| `--icon` | transparent, `--rounded-full` | none | ink | 44×44 icon-only |

`--tester` and `--secondary` are visually identical by design — principle 7 requires the tester to
match the alternate CTA exactly. They are separate classes so that a CI rule can assert the tester
is never `--primary` on a surface that has another CTA.

**States.** Hover inverts fill and label. Focus-visible applies `--focus-ring`. Active is instant
(no translate — the stamp does not bounce). Disabled goes `--colors-surface-hover` ground with
`--colors-text-secondary` label and `cursor: not-allowed`; use `aria-disabled` rather than the
`disabled` attribute where the button must stay focusable to explain itself. `aria-busy="true"`
hides the label and shows a spinner — the attribute carries the meaning, the spinner is decoration.

**RTL.** Nothing to do. Padding is inline, gap is logical, the label direction follows the document.
Icons that encode direction (arrows) must be mirrored by the icon set, not by CSS.

**Responsive.** `--block` for full-width in cart and checkout on mobile. `--sm` drops the visual box
to 40px and extends the hit area to 44px with a transparent `::after` — the target never shrinks
even when the box does.

**Accessibility.** Real `<button>` or `<a>`, never a div. Icon-only variants require `aria-label`.
Loading state sets `aria-busy` and keeps the accessible name stable. 44×44 minimum target
throughout.

---

### 3.2 · `E-02` BadgeStamp

**Intent.** State what a product *is* before the customer has to ask. This component carries
non-negotiable 1 — catalog separation — and it is the highest-stakes component in the system.

**Lore anchor.** The cartouche. A name enclosed and stamped, declaring what the thing is.

**Anatomy.** Inline flex · `--spacing-1`/`--spacing-2` padding · `--text-label` semibold uppercase
at `--tracking-label` · radius 0 · no shadow.

**Variants.** `--original` (ground `--colors-original`) · `--impression` (ground
`--colors-impression`) · `--verified` (ground `--colors-verified`) · `--new` (ink outline) ·
`--soldout` (`--colors-surface-hover`) · `--sale` (`--colors-danger`). `--overlay` positions it over
media at `inset-inline-start`.

**Rules that are not negotiable.**

- `ORIGINAL` or `IMPRESSION` appears on **every** product thumbnail and in the **first line** of
  **every** PDP. A mixed grid without badges does not ship.
- The three catalog colours are never re-mapped, re-themed, or used for anything else.
- The badge is never the only carrier of the distinction — the PDP states it in prose too
  (principle 2).
- A referenced brand's name never appears in a product title, page title, or URL. Body copy only,
  with the non-affiliation disclaimer.

**States.** Static. A badge is not interactive and must never be a button.

**RTL.** `inset-inline-start` mirrors for free. `text-transform` is neutralised for Arabic in
`siwa-base.css` — Arabic does not case, and forcing it produces nothing.

**Responsive.** Unchanged. The badge never shrinks below `--text-label`.

**Accessibility.** The badge is real text, never an image or a background. On a card where the
badge sits over media, it is inside the card's accessible name so a screen reader reaches
"Impression, Oud Nights, 1,450 EGP" in one pass.

---

### 3.3 · `P-01` ProductCard

**Intent.** Present a product at grid scale with exactly enough information to choose, and nothing
that competes with the photograph.

**Lore anchor.** The specimen on the shelf — lit, labelled, unadorned.

**Anatomy.** Media well (1:1, `--colors-surface` ground, `object-fit: contain` — bottles are
photographed on transparent and must not be cropped) → badge overlay at inline-start → wishlist at
inline-end → body: eyebrow, title (2-line clamp), price.

**Maximum four elements in the body.** Eyebrow, title, price, and at most one of {rating, size
range}. Anything more is a PDP.

**Variants.** `--compact` (drops the eyebrow, tightens the body) for carousels, search results, and
cart line items.

**States.** Hover and focus-within scale the media to 1.03 and underline the title. **No shadow, no
lift, no border change** — principle 4. The whole card is a link via `.siwa-card__link::after`
stretching over the card; the wishlist button sits above it on the z-ladder so it stays separately
clickable.

**RTL.** Badge and wishlist swap sides automatically. `text-align: start` on the body. The price is
`unicode-bidi: isolate` so "1,450 EGP" stays one LTR run inside an Arabic paragraph.

**Responsive.** 4 columns → 3 at 1200px → 2 at 768px. The card never goes single-column; two
columns on a phone is the correct density for fragrance browsing.

**Accessibility.** The title is the accessible name of the card link. Media `alt` describes the
product and the shot ("Oud Nights 50ml, amber glass bottle, front"). The wishlist button carries
`aria-label` and `aria-pressed`. Price is preceded by a visually hidden "Sale price:" when a
strikethrough original is shown.

**Rule 6 applies here first.** `.siwa-card__price` is `--colors-text`. Not gold. Ever.

---

### 3.4 · `L-02` ProductGrid

**Intent.** The default arrangement for any set of products.

**Anatomy.** CSS grid, `--grid-cols` columns (default 4), row gap `--spacing-8`, column gap
`--grid-gutter`. Row gap exceeds column gap deliberately — it separates rows of cards without
widening the grid.

**Responsive.** 4 → 3 (1200px) → 2 (768px, gaps tighten to `--spacing-6` / `--grid-gutter-xs`).

**Accessibility.** A grid of links is a list. Wrap in `<ul>`/`<li>` so a screen reader announces
"list, 24 items". Filter and sort changes announce the new count via `aria-live="polite"`.

---

### 3.5 · `L-08` BentoGrid *(new in v3.0.0)*

**Intent.** Modular editorial and category storytelling on the homepage and collection pages. This
is the Premium Cozy spec's principal contribution and the one place in the system where Siwa is
allowed to be soft.

**Lore anchor.** The tiled courtyard — panels of different sizes, one field, one grout line.

**Anatomy.** 4-column grid, `--spacing-bento-gap` (24px), auto-rows min 200px. Tiles are
`--rounded-bento` (24px), padded `--spacing-card`, `--colors-surface` ground, flex column
justified to the end so content sits at the bottom of the tile.

**Variants.** `--w2` `--w3` `--w4` span columns; `--h2` spans rows. `--photo` places a full-bleed
image behind a mandatory gradient scrim. `--promo` inverts to `--colors-surface-dark`.

**Do.**
- Mix at least three span configurations per grid. A bento of equal tiles is just a grid.
- One headline and at most two lines of body per tile. More than that is a section, not a tile.
- Always scrim photo tiles. The scrim is what makes the 4.5:1 claim true regardless of which image
  a merchandiser uploads next month.

**Don't.**
- Put a `P-01 ProductCard` inside a bento tile. Products live in `L-02`. Bento is for categories,
  editorial, and promotion.
- Put two gold elements in one bento fold. A `--promo` tile with a gold CTA is one gold; the rest of
  the fold gets none (principle 1).
- Give a tile a resting shadow. Shadow appears on hover and focus-within only.

**States.** Hover and focus-within lift 2px and apply `--shadow-editorial`. This is the exception
principle 4 grants the editorial layer.

**RTL.** Grid spans are direction-agnostic — the whole layout mirrors with no override. Only the
`--photo` scrim needs a `[dir="rtl"]` variant where it is horizontal.

**Responsive.** 4 → 2 columns at 1200px (`--w3`/`--w4` collapse to span 2) → 1 column at 768px,
where every span resets, the gap drops to `--spacing-4`, padding drops to `--spacing-6`, and the
radius steps down to `--rounded-editorial` (24px on a 350px-wide tile reads as a toy).

**Accessibility.** Each tile is a single link with one accessible name. Do not nest a link inside a
linked tile. Photo tiles state their `alt` on the image; decorative background photography takes
`alt=""` and the tile's name comes from its heading.

---

### 3.6 · `G-01` SiteNav

**Intent.** Get to any category in one gesture, on any device, in either language.

**Anatomy.** Sticky, `--z-sticky-nav`, `--nav-height` 64px, parchment ground with a
`--colors-border` hairline and a `backdrop-filter` blur behind a `@supports` guard. Logo (display
face) → link list → actions (search, account, bag).

**Mega menu.** Absolutely positioned, full-bleed inline, 4-column grid, `--shadow-editorial`.
Column titles are `--text-label` uppercase; links are 44px tall blocks.

**States.** The trigger's `aria-expanded` toggles with `[hidden]` on the panel. Chevron rotates
180° on the block axis — a chevron is not mirrored in RTL, only inline-axis arrows are.

**RTL.** The list, the actions, and the mega-menu grid all mirror from logical properties. The
mobile drawer's off-screen transform is the one place a `[dir="rtl"]` override is required:
`translateX(-101%)` becomes `translateX(101%)`. 101% rather than 100% so the panel clears its own
shadow.

**Responsive.** Below 1200px the link list becomes a full-height off-canvas drawer and the mega menu
flattens into it in static flow with no shadow. `100dvh` rather than `100vh` so mobile browser
chrome does not clip the last link.

**Accessibility.**
- Trigger carries `aria-expanded`; the panel is `[hidden]` when closed.
- Opening moves focus to the first link in the panel.
- `Escape` closes and returns focus to the trigger.
- The open mobile drawer traps focus.
- Bag count: the number is decorative, the button carries `aria-label="Bag, 2 items"`, and cart
  changes announce through an `aria-live="polite"` region.
- The skip link (`.siwa-skip-link`) is the first focusable element in `<body>`.

---

### 3.7 · `L-07` Modal / Drawer

**Intent.** Hold a focused task — quick view, size guide, cart, filters — without losing the page
behind it.

**Anatomy.** Modal: centred by `.siwa-modal-layer` (grid `place-items: center`), max 560px,
`--rounded-editorial`, `--shadow-modal`. Drawer: inline-end, max 420px, full block height, head /
scrollable body / foot. Both sit over `.siwa-scrim` at `--z-scrim`.

Centring is done by the layer, not a `translate(-50%)` — a transform-centred element has to be
mirrored for RTL and drifts on subpixel widths.

**RTL.** The drawer's inline-end anchor mirrors for free; only the off-screen transform needs the
`[dir="rtl"]` override.

**Accessibility.** `role="dialog"` `aria-modal="true"` with `aria-labelledby` pointing at the head.
Focus moves in on open and returns to the invoker on close. `Escape` closes. Focus is trapped while
open. Background scroll is locked. `<dialog>` with `showModal()` gives most of this natively and is
the preferred implementation.

---

### 3.8 · `P-07` SizeSelector

**Intent.** Choose a size — and make the tester tier read as a legitimate first choice, not a
downgrade. This component carries principle 7 and closes trust gap 4.

**Anatomy.** A `fieldset` of radio inputs rendered as tiles: name + price, `--colors-border-strong`
1px, radius `--rounded-sm`, min-height 44px.

**Variants.** `--tester` uses a dashed border. That is the *only* difference — same height, same
type size, same padding, same footprint as the 50ml tile. A tester tile that is visibly smaller or
quieter than the others is a violation of principle 7.

**States.** Selected carries **two** channels (principle 2): 2px ink border **and**
`--colors-surface` ground **and** semibold label. Disabled goes hairline, muted, struck through.
Focus-visible ring is applied to the tile via `:has(:focus-visible)`, since the input itself is
visually hidden.

**Accessibility.** Native radios inside a `fieldset` with a `legend` — keyboard and screen-reader
behaviour is free and correct. The input is hidden with `opacity: 0` and zero size rather than
`display: none`, so it stays focusable. Price changes on selection announce through
`aria-live="polite"`.

---

### 3.9 · `P-04` NotePyramid

**Intent.** Let a customer understand a fragrance they cannot smell. Closes trust gap 1, the single
largest objection in the category.

**Lore anchor.** The strata of a dig — top, heart, base, read downward through time.

**Anatomy.** Three tiers, each a two-column grid: a `--text-label` uppercase tier name at
`minmax(88px, auto)`, and a wrapped set of `.siwa-chip` note tags. Tiers are separated by
`--colors-border` hairlines, not boxes.

**RTL.** Grid columns mirror automatically; the label column moves to the inline-start side, which
in Arabic is the right. No override.

**Accessibility.** A description list (`<dl>`) — `<dt>` "Top notes", `<dd>` the list — so the
relationship survives without the visual grid. Note tags that are non-interactive must not be
`<button>`.

---

### 3.10 · `P-06` LongevityProjectionBar

**Intent.** State how a fragrance performs in numbers rather than adjectives. Closes trust gap 3.

**Anatomy.** Label row (name + numeric value) over a 6px `--rounded-full` track, fill
`--colors-primary-strong` at `--meter-value`.

**Rule.** The **numeric label is mandatory.** A bar alone encodes the value in length only, which
fails principle 2 and SC 1.4.1. "Longevity — 7 hours" with a bar, never a bar alone.

**Accessibility.** `role="meter"` with `aria-valuenow` / `aria-valuemin` / `aria-valuemax` /
`aria-valuetext` ("7 hours"), or a plain `<meter>`. The visible number is the same value, not a
rounding of it.

---

### 3.11 · Hero

**Intent.** One image, one message, one action.

**Rule.** **Static. No carousel.** Both source documents forbid it independently and the reasoning
is the same: a carousel splits the message, and every slide after the first is seen by almost
nobody. If there are three things to say, the second and third are bento tiles.

**Anatomy.** Min-height 500px desktop / 400px mobile · full-bleed media · mandatory horizontal
gradient scrim · content block max 600px at `--spacing-8` padding, inline-start aligned.

**RTL.** The scrim gradient is the one place a physical direction is unavoidable — CSS gradients
accept no logical keyword. `to right` is mirrored to `to left` under `[dir="rtl"]`. Everything else
follows the content flow.

**Accessibility.** The hero image carries descriptive `alt` — it is content, not decoration. The
scrim is what guarantees 4.5:1 for the overlaid text; without it the contrast depends on whichever
photograph is uploaded next. Headline is the page `<h1>` on the homepage.

---

### 3.12 · Search + autocomplete

**Intent.** Reach a product in three keystrokes.

**Behaviour.** Open the dropdown after **3 characters**. Debounce **300ms**. Show at most **5
suggestions** and **3 product previews**. Highlight the matched substring with `<mark>` — styled as
bold + underline, not a yellow ground, so it survives principle 2.

**Empty result.** Never a bare "No results." — "No results for *oud nights*. Browse Orientals →".

**Accessibility.** The combobox pattern: `role="combobox"` with `aria-expanded`, `aria-controls`,
and `aria-activedescendant`; the list is `role="listbox"`, options are `role="option"` with
`aria-selected`. Arrow keys move `aria-activedescendant` without moving DOM focus. `Escape` closes
and restores the typed value. Result count announces via `aria-live="polite"`.

---

## §4 · Layout systems

| System | Class | When |
|---|---|---|
| Product grid | `.siwa-grid` | any set of products |
| Bento | `.siwa-bento` | categories, editorial, promotion |
| Feature row | `.siwa-feature-row` | alternating image/text story sections |
| Container | `.siwa-container` | 1200px max, gutters, centred |
| Section | `.siwa-section` / `--tight` | vertical rhythm — 72px ceremonial / 48px commerce |
| Stack | `.siwa-stack` | uniform vertical gaps via `--stack-gap` |
| Cluster | `.siwa-cluster` | wrapping horizontal groups |

**Page composition rule.** A homepage alternates ceremonial and commerce rhythm: hero →
`--tight` featured grid → `--section` bento → `--tight` grid → `--section` story. Never two
`--section` blocks in a row; the pacing flattens.

---

## §5 · Bilingual and RTL

Arabic is not a translation layer bolted on at the end. It is a first-class rendering of the same
components, and the system is built so that it costs nothing per component.

**Mechanism.** `<html lang="ar" dir="rtl">` swaps `--font-display` and `--font-ui` to the Arabic
pair. Every component already uses logical properties, so the layout mirrors with no per-component
work.

**What changes for Arabic, at the token level, once:**

| Property | Latin | Arabic | Why |
|---|---|---|---|
| `--tracking-*` | 0.12em label, 0.08em button | **0em** | Arabic is a joined script. Letter-spacing severs the joins and renders the word broken. |
| `text-transform` | `uppercase` on labels, buttons, badges | **none** | Arabic has no case. The declaration does nothing but signal that nobody checked. |
| `--leading-body` | 1.60 | **1.80** | Arabic ascenders/descenders and diacritics need the room. |
| `--leading-heading` | 1.25 | **1.45** | same |
| Font size | base | optically smaller at equal px | the Arabic UI face is chosen to compensate; do not scale per component |

**Latin fragments inside Arabic copy** — brand names, "50ml", batch codes — must be marked
`<span lang="en">` so they render in the Latin face rather than the Arabic one.

**Numbers and prices** are `--font-mono` with `unicode-bidi: isolate`, so "1,450 EGP" stays one
unbroken LTR run inside an RTL paragraph instead of having its digits and currency reordered.

**Icons.** Directional icons (arrows, chevrons pointing inline) are mirrored by the icon set, not by
a CSS transform. Non-directional icons (a bag, a heart, a downward chevron) are never mirrored.

**Testing.** Every component ships an RTL screenshot. The check is: no horizontal overflow, badges
and cards mirrored, no severed Arabic glyphs, no reordered numerals.

---

## §6 · Accessibility

WCAG 2.2 AA is the floor, not the target. Everything here is testable.

### 6.1 · Keyboard

- Every interactive element reachable by `Tab`, in visual order.
- Mega menu and drawers trap focus while open; `Escape` closes and returns focus to the invoker.
- Custom widgets (combobox, quiz, size selector) use native elements underneath wherever possible —
  the size selector is radios, the quiz is buttons, search is the ARIA combobox pattern.
- The skip link is the first focusable element in `<body>`.
- **Test:** complete a purchase from homepage to confirmation without touching a mouse.

### 6.2 · Focus

`--focus-ring` is a two-ring token — inner ring in the ground colour, outer ring in ink. It measures
14.13:1 on parchment and 11.71:1 on sand, and it is visible on media, on photography, and on gold.
Never set `outline: none` without applying it.

### 6.3 · Colour and contrast

- Body text ≥ 4.5:1; large text (≥24px, or ≥18.66px bold) ≥ 3:1; UI components and meaningful
  graphics ≥ 3:1.
- The verified table in [§2.1](#21--colour) is the reference. Re-run it after **any** palette edit.
- Never colour alone (principle 2).
- `--colors-border` (1.70:1) is never a control's only boundary.

### 6.4 · Target size

WCAG 2.2 SC 2.5.8 (AA) requires **24×24 CSS px**. SC 2.5.5 (AAA) requires **44×44**.

> The Premium Cozy source document stated "48px × 48px (WCAG 2.2 AA)". That is not what the
> standard says — 48px is neither the AA nor the AAA threshold. Siwa's house floor is **44×44**,
> which exceeds AA and meets AAA, with `--control-h` at 48px as the comfortable default for
> primary controls.

Where a design calls for a control smaller than 44px, keep the visual box and extend the hit area
with a transparent `::after` (as `.siwa-button--sm` and `.siwa-chip` do). Adjacent targets are
separated by at least `--spacing-2`.

### 6.5 · Screen readers

- Every image has `alt`. Product shots: product name + angle or detail. Decorative background
  photography: `alt=""` with the name coming from the adjacent heading.
- Icon-only buttons have `aria-label`.
- Dynamic changes — cart count, filter results, price on variant change, search result count —
  announce via `aria-live="polite"`.
- Form errors are associated with `aria-describedby` and are specific ("Email format is incorrect.
  Example: you@example.com"), never "Invalid input."
- Landmarks: one `<main>`, `<nav>` with a label, `<footer>` with `contentinfo`.

### 6.6 · Motion

`prefers-reduced-motion: reduce` collapses every duration token to 0ms. Reveal animations force
their end state. No parallax, no auto-advancing anything, no video with sound on load.

---

## §7 · Content and tone

### 7.1 · Voice

**Concise.** "Add to bag", not "Click here to add this item to your shopping bag."
**Confident.** "Free shipping over 1,500 EGP", not "We offer free shipping if you qualify."
**Specific.** "Lasts 6–8 hours on skin", not "Long-lasting."
**Sensory, then technical.** "Smoke over cold stone" before "Birch tar, iso E super."

The founder voice is concrete. The myth is told through specifics — the workshop, the oasis, the
batch — never through adjectives about luxury.

### 7.2 · Microcopy

| Context | Don't | Do |
|---|---|---|
| Empty bag | "Your bag is empty." | "Your bag is empty. Start with a tester →" |
| Out of stock | "Currently unavailable." | "Out of stock. Notify me when it returns →" |
| No search results | "No results found." | "No results for *oud nights*. Browse Orientals →" |
| Form error | "Invalid input." | "Email format is incorrect. Example: you@example.com" |
| Impression PDP, line 1 | "Inspired by a famous scent." | "**IMPRESSION** — Siwa's interpretation. Not affiliated with, endorsed by, or connected to any other house." |

**Every empty state carries a next action.** An empty state without a link out is a dead end.

### 7.3 · Legal copy — not optional

- The non-affiliation disclaimer appears on every Impression PDP, every comparison page, and every
  article referencing an external brand.
- A referenced brand's name never appears in a product title, page title, or URL. Body copy only.
- All product names, comparison language, and disclaimer text go through trademark attorney review
  before shipping.

---

## §8 · Anti-patterns

| # | Prohibited | Instead |
|---|---|---|
| 1 | Hero carousel | One static hero. Secondary messages become bento tiles. |
| 2 | Resting shadow on a product card | Media scale + title underline on hover |
| 3 | Radius > 2px on anything transactable | `--rounded-none`. Radius lives on the editorial layer. |
| 4 | Gold on a price | `--colors-text`, always (principle 6) |
| 5 | Two gold elements in one fold | One (principle 1) |
| 6 | Tester CTA rendered smaller or quieter than the main CTA | Identical footprint (principle 7) |
| 7 | Mixed Original/Impression grid without badges | Badge every thumbnail (non-negotiable 1) |
| 8 | Physical `left`/`right`/`margin-left` | Logical properties (principle 5) |
| 9 | `letter-spacing` or `text-transform` on Arabic | Neutralised at the token level |
| 10 | Low-contrast text as an aesthetic choice | Accessibility outranks aesthetics |
| 11 | "Click here" / "Learn more" | "Shop Orientals", "Read the batch notes" |
| 12 | Pop-up on page load | Exit-intent, or after 30 seconds |
| 13 | Auto-playing video with sound | Muted, with a visible play control |
| 14 | Product card with more than 4 body elements | Move it to the PDP |
| 15 | Generic stock photography | Real product and workshop photography |
| 16 | Raw hex, px, or ms in a component | A token |
| 17 | A literal `z-index` | The z-ladder (§2.8) |
| 18 | A bar, dot, or swatch as the only carrier of a value | Add the number or the label (principle 2) |

---

## §9 · CI rules

These are mechanically checkable. `phlur-clone/agents/validator.mjs` already runs the v2.0.0 subset;
these are the v3.0.0 rules it should be extended to cover.

**Error (blocks the build)**

1. A physical inline-axis property (`left`, `right`, `margin-left`, `padding-right`, `text-align:
   left|right`, `border-left`, `border-right`) outside the two documented gradient/`order` exceptions.
2. A raw hex, `rgb()`, or `hsl()` colour in a component file.
3. A raw `px` value where a `--spacing-*` token exists.
4. A literal `z-index`.
5. `border-radius` > 2px on a commerce-layer selector.
6. `box-shadow` on a commerce-layer selector.
7. `outline: none` without an accompanying `box-shadow: var(--focus-ring)`.
8. A contrast pair below its floor, computed from `tokens.json`.
9. An `<img>` without an `alt` attribute.
10. An icon-only button without `aria-label`.
11. A product thumbnail without an `ORIGINAL` or `IMPRESSION` badge.
12. `--colors-primary` used as a `color` on text below 24px.
13. A target smaller than 44×44 with no hit-area extension.

**Warning**

14. More than one `.siwa-button--primary` in a section.
15. `letter-spacing` or `text-transform` inside a `[lang="ar"]` block.
16. A `.siwa-bento__tile--photo` with no scrim.
17. More than 4 elements in `.siwa-card__body`.
18. `.siwa-button--tester` rendered as `--primary` on a surface with another CTA.
19. An empty state with no outbound link.

### QA checklist

**Visual** — spacing from `--spacing-*` · radius from `--rounded-*` and layer-correct · colour from
semantic tokens · type from `--text-*`, no inline `font-size`.

**Accessibility** — axe DevTools clean · keyboard-only purchase completes · focus visible on every
control · contrast table re-run · screen-reader pass on PDP and checkout.

**Responsive** — 375 / 768 / 1024 / 1440 · bento collapses to one column · grid holds two columns on
mobile · no horizontal scroll · targets ≥ 44px.

**Bilingual** — every component screenshotted in `ar` · no severed glyphs · no reordered numerals ·
no overflow · Latin fragments marked `lang="en"`.

**Performance** — WebP with JPEG fallback · critical CSS inlined · `font-display: swap` · non-critical
JS deferred · media lazy-loaded below the fold.

**Commerce** — variant selection shows clearly · Add to bag has loading and success states · bundle
savings shown · related products from a real algorithm · search does synonyms.

---

## §10 · Build order

Mapped onto the Feature Bible's phases rather than invented anew.

| Phase | Window | Design system work |
|---|---|---|
| **Pre-launch** | before day 1 | Tokens · base · Button · BadgeStamp · ProductCard · ProductGrid · SiteNav · Modal/Drawer. Catalog separation enforced in CI. |
| **P0** | launch | Hero · Bento · SizeSelector w/ tester · NotePyramid · Search · TrustStrip · DiscoveryKit · OracleQuiz · comparison page |
| **P1** | month 2–3 | FeatureRow/scrollytelling · BundleBuilder · GiftOptionsPanel · loyalty display · ReviewsSection · **Gifting Hub — hard date Oct 1** |
| **P2** | month 4–6 | ReturnBottleFlow · subscription surfaces · CompassTool · ProvenienceCard |
| **Ongoing** | — | Close out §12. Every ⬜ becomes a §3 spec before its feature ships. |

---

## §11 · Conflict ledger

Every point where the two source documents disagreed, and what won.

| # | Conflict | v2.0.0 | Premium Cozy | Resolution |
|---|---|---|---|---|
| 1 | Palette | warm Egyptian | golden/teal/espresso | **v2.0.0.** Owner decision. Already implemented in `phlur-clone`, on-brand for the pilgrimage premise. |
| 2 | Border radius | 0px stamped | 24px bento | **Two-tier.** Owner decision. Commerce 0–2px, editorial 16–24px. Principle 3 restated with an explicit boundary test. |
| 3 | Shadow | modal layer only | on every card hover | **Two-tier**, mirroring #2. Commerce never; editorial and overlay yes. |
| 4 | Price colour | never gold (rule 6) | `--primary-dark` | **v2.0.0.** Rule 6 kept verbatim, extended to bundle totals. |
| 5 | Typography | Fraunces + Inter + Arabic pair | Inter only | **v2.0.0 families**, **Premium Cozy ramp**. The ramp was the genuine gap in v2.0.0; the families were the genuine gap in Premium Cozy. |
| 6 | Section rhythm | 72px | 48px | **Both**, semantically split — `--spacing-section` 72px editorial, `--spacing-section-tight` 48px commerce. |
| 7 | Token naming | `--colors-*` `--spacing-*` `--rounded-*` | `--primary` `--space-*` `--radius-*` | **v2.0.0 names.** `phlur-clone`'s generated assets reference them directly; renaming breaks that output for no gain. |
| 8 | Focus indicator | — | gold glow at 24% alpha | **Replaced.** The gold halo resolves to ~3:1 and fails as a sole indicator on sand. Two-ring ink token instead. |
| 9 | Target size | 44px | "48px (WCAG 2.2 AA)" | **44px house floor.** The cited AA figure is incorrect — AA is 24×24, AAA is 44×44. See §6.4. |
| 10 | Bento promo tile | — | ground `--primary` (gold) | **Amended.** A gold-ground tile plus a gold CTA breaks principle 1. Promo tiles invert to `--colors-surface-dark`. |
| 11 | Bilingual | full RTL parity | not addressed | **v2.0.0.** Owner decision. Extended with the Arabic tracking/case/leading overrides. |
| 12 | Hero carousel | prohibited | prohibited | **Agreement.** Recorded because it is the one thing both documents banned independently. |
| 13 | Contrast figures | — | table with errors | **Discarded and recomputed.** See §11.2. |

### 11.1 · Corrections to v2.0.0

Five colour tokens shipped in v2.0.0 below their own stated AA floor. Corrected here. Every
correction is the smallest luminance shift that clears 4.5:1 on **both** parchment and sand — the
hue is unchanged and the shift is imperceptible side by side.

| Token | v2.0.0 | Measured | v3.0.0 | Now |
|---|---|---|---|---|
| `--colors-text-secondary` | `#a38f7e` | **2.84:1** bg / **2.35:1** surface | `#6f6156` | 5.47 / 4.53 |
| `--colors-link` | `#8b5f4c` | 5.01 bg / **4.16** surface | `#845a48` | 5.44 / 4.51 |
| `--colors-tag` | `#8e8a6c` | **3.21** bg / **2.66** surface | `#66634e` | 5.56 / 4.61 |
| `--colors-warning` | `#b9752f` | **3.41** bg / **2.83** surface | `#8b5823` | 5.47 / 4.54 |
| `--colors-success` | `#5c6c54` | 5.16 bg / **4.28** surface | `#586851` | 5.48 / 4.54 |

`--colors-text-secondary` was the serious one: at 2.84:1 every caption, every product-card eyebrow,
and every form hint in the store failed AA.

**Additions:**

- `--colors-border-strong` `#997a5c` — v2.0.0 had only `--colors-border` at 1.70:1, which cannot
  legally be a form control's boundary under SC 1.4.11.
- `--colors-primary-strong` `#a5773f` — gold that still reads at 3:1 on sand, for icons and strokes
  that carry meaning.
- `--colors-primary` moved `#b18044` → `#b38145`, a 1% luminance lift, so an ink label on a gold CTA
  reaches 4.51:1 instead of 4.43:1.
- `--colors-original` / `--colors-impression` / `--colors-verified` — catalog separation had no
  reserved colours in v2.0.0 despite being non-negotiable 1.

### 11.2 · The Premium Cozy contrast table

The source document's WCAG section was checked and is not reliable. The headline error:

| Claim | Actual |
|---|---|
| `#dba449` on `#fefefb` — "4.8:1 ✓ AA" | **2.21:1 — fails** |
| `#34261e` on `#fefefb` — "12.5:1" | 14.41:1 (understated, passes) |
| `#036984` on `#fefefb` — "5.2:1" | 6.19:1 (understated, passes) |

The gold figure is wrong by more than a factor of two, and the document used it to authorise gold
text. Nothing from that table was carried forward; §2.1 was computed from scratch.

---

## §12 · Open

Tracked, not forgotten. Each becomes a §3 spec before its feature ships.

**Components with no spec and no CSS** — `G-02 SiteFooter` · `G-03 AnnouncementBar` /
`C-11 AnnouncementStrip` · `C-04 ArticleCard` · `C-05 ArticleBody` · `C-07 ProvenienceCard` ·
`D-03 DiscoveryKit` · `E-04 GiftOptionsPanel` · `E-05 PromoCodeInput` · `E-07 LoyaltyPointsDisplay` ·
`P-11 ReviewsSection` · `P-12 WriteReviewModal` · `P-13 OriginalVsImpressionComparison` ·
`USF-02 ReadingInput/Output` · `USF-05 CompassTool/Result` · `USF-04 ReturnBottleFlow` ·
`CCF-03 AuthenticityBlock` · Wishlist.

**Components with CSS but no prose spec (🔶 in §3)** — FeatureRow · SectionHeading · TrustStrip ·
ShippingProgressBar · Chip · OracleQuiz · BundleBuilder · form field · QuantityStepper · Alert /
Toast · Empty state · Skeleton.

**Decisions still to make**

1. **Icon set.** Nothing chosen. Needs to ship directional and non-directional variants for RTL.
2. **Photography direction.** The system assumes bottles shot on transparent over sand
   (`object-fit: contain`). Lifestyle photography for bento tiles has no direction yet.
3. **Arabic display face.** `Aref Ruqaa` is specified but not licence-verified for web use at
   Siwa's traffic tier.
4. **Dark mode.** `.on-dark` handles inverted *bands*. A full dark theme is not specified and
   should not be attempted by re-mapping tokens ad hoc.
5. **Email and packaging.** Out of scope here; packaging is non-negotiable 6 and needs its own
   standard.

**Reconciliation with `phlur-clone`.** The Phlur geometry overlay was built against v2.0.0.
`phlur-clone/mapping/siwa-tokens.json` should be repointed at `tokens/tokens.json`, and the overlay
re-validated against the corrected palette — the five colour corrections change three of the seven
entries in its override ledger.

---

*Siwa Design System v3.0.0. Everything above is defensible against WCAG 2.2, the market research,
or the brand premise. If a rule cannot be traced to one of those three, it does not belong here.*
