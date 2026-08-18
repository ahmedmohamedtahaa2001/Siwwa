# Deviations from Siwa Design System v3.0.0

Every place this theme departs from `siwa-design-system/DESIGN.md`, why, and what
keeps the departure honest. A deviation that is not in this file is a bug.

The design system CSS itself is **unmodified** — `assets/siwa-tokens.css`,
`siwa-base.css` and `siwa-components.css` are byte-for-byte copies. Every
departure below lives in `assets/siwa-themes.css`, which loads last, so the
design system can be re-copied from source at any time without losing this work
and without merge conflicts.

---

## 1 · A preset layer was added

**v3.0.0 assumes one palette.** This theme ships five selectable design
directions, chosen once in the Customizer (`settings.theme_preset`) and written
onto `<body data-theme="…">`.

**Mechanism.** Each direction re-points the design system's own token names
inside a `[data-theme='…']` scope. This is not a new technique — it is exactly
what `.on-dark` already does in `siwa-tokens.css` (re-point the semantic tokens,
let every component follow). Specificity `(0,1,1)` on `body[data-theme]` beats
`:root` comfortably without touching a single component rule.

**Why scoped rather than `:root`.** Nesting. `/pages/preset-preview` renders all
five directions on one page, each in its own scope, so the team can compare them
on identical components. Blocks on `:root` could not do that.

**What this costs.** A component author must never hardcode a value that a
direction might change. That was already the rule (§2, "never author a raw
value"); the preset layer makes breaking it visible immediately, because the
component will look wrong in four directions out of five.

---

## 2 · Papyrus rounds and softens the commerce layer

**Breaks:** principle 3 ("stamped, not rounded — on the commerce layer") and
principle 4 ("no shadow outside the editorial and overlay layers").

**What changed.** Papyrus sets `--radius-commerce: 14px` and
`--shadow-commerce: 0 2px 8px rgba(58,53,46,.09)`. Buttons, inputs, cards,
badges and size tiles round and carry a resting shadow **in that direction
only**.

**Why.** Papyrus is the gifting and mobile-first direction — the face a
first-time gift buyer meets on a phone. The brief asked for a warm, approachable
direction, and "approachable" in this category is carried by radius and soft
elevation more than by anything else.

**How the other four are protected.** The rule became a *token* rather than a
global constant. Archive, Oasis and Desert hold `--radius-commerce: 0px` and
`--shadow-commerce: none`; Nocturne holds `2px` / `none`. A section author writes
`border-radius: var(--radius-commerce)` and never learns which direction is
active, so the stamped behaviour of the other four is not something anyone has to
remember.

**What did not change.** The *laws* still hold in Papyrus: the price is ink and
mono, the tester CTA keeps the primary CTA's footprint, no state is carried by
colour alone, the catalog trio is untouched, and focus stays two-ring.

---

## 3 · Nocturne is a full dark theme

**Tension with:** §12 decision 4 — "A full dark theme is not specified and should
not be attempted by re-mapping tokens ad hoc."

**Why this is not what §12 warns against.** Nocturne is not an ad-hoc re-map. It
is a palette designed against its own grounds and gated by
`tools/check-contrast.mjs`, which recomputes every pair in every direction on
every run and exits non-zero on a single failure. Nocturne clears the same 40
pairs Archive does, at the same floors.

**Design decisions worth recording.**
- `--colors-surface-dark` in Nocturne is `#0b0f0c` — *deeper* than the page, not
  lighter. An inverted band inside a dark theme goes deeper. A light band would
  have stranded `--colors-secondary`, which is defined as light gold for dark
  grounds, and every `.on-dark` semantic would have needed its own fork.
- `--focus-ring` swaps its outer ring to `--colors-secondary` (light gold), since
  an ink ring is invisible on an ink page.
- `--accent-glow` is non-zero here and inert everywhere else, so a section can
  write `box-shadow: var(--accent-glow)` unconditionally.

---

## 4 · Nocturne lifts the catalog trio's luminance

**Tension with:** non-negotiable 1 — "The three catalog colours are never
re-mapped, re-themed, or used for anything else."

**What changed.** In Nocturne only: `--colors-original` `#6b4a28` → `#c9a15f`,
`--colors-impression` `#2f3932` → `#8f9c96`, `--colors-verified` `#586851` →
`#8aae7d`, with their label inks flipped to the page ink.

**Why.** At their light-theme values, an ORIGINAL stamp on a `#121714` page is a
dark brown block on a near-black ground — the stamp disappears, and with it the
one thing that tells a customer what they are looking at. Non-negotiable 1 exists
to protect the *distinction*, and keeping the literal hex would have destroyed
the distinction it was written to protect.

**What is preserved.** Hue and meaning. Original stays the warm brown-gold,
Impression the cool green-grey, Verified the green. The three remain mutually
distinguishable, none is borrowed for another purpose, and each label/ground pair
is checked at 4.5:1 like every other pair. The other four directions carry the
v3.0.0 hexes unchanged.

---

## 5 · Tokens added that v3.0.0 never emitted

All declared in `siwa-themes.css` §0 and given a value by every direction.

| Token | Why it was needed |
|---|---|
| `--colors-silver` · `--colors-silver-strong` | v3.0.0 names silver as the Impression line's accent and never tokenises it. The obvious reading, `#7c8583`, measures **2.88:1** on sand and fails SC 1.4.11 as a meaningful stroke; the shipped value is the smallest darkening that clears 3:1 on both grounds. |
| `--colors-on-primary` | `siwa-components.css` hardcodes the gold CTA's label to `--colors-text`. On Nocturne that is near-white on gold — **2:1**. The ink on a fill is now its own token, checked like any other pair. |
| `--colors-on-original` · `--colors-on-impression` · `--colors-on-verified` | Same problem on the stamps, which hardcode their label to `--colors-background`. |
| `--colors-info` | The semantic set had success, warning, danger and tag but no informational colour. |
| `--colors-surface-raised` | A sheet over a card needs a third ground. |
| `--colors-shimmer` | `.siwa-skeleton` had no token of its own. |
| `--scrim-rgb` | See #6. |
| `--radius-commerce` · `--shadow-commerce` | See #2. |
| `--border-width` · `--border-width-strong` · `--rule-weight` | Desert draws 2–3px ink borders where Oasis draws 1px hairlines. Without a token this becomes a per-section conditional. |
| `--label-transform` | Papyrus sets labels in sentence case; the other four uppercase. Also how Arabic's casing is neutralised in one declaration instead of per component. |
| `--ornament-display` · `--ornament-size` | Whether a direction draws a mark before a label. Collapses to `none` with no markup change. |
| `--media-hover-scale` | Principle 4 says the card does not lift, the media scales. How far is a direction's decision, and it must go to `1` under reduced motion. |
| `--accent-glow` | Nocturne's luminous accent; inert elsewhere. |
| `--band-surface` · `--band-surface-hover` · `--band-text-secondary` · `--band-border` · `--band-border-strong` | `.on-dark` in `siwa-tokens.css` re-points the band with literal warm hexes, correct for Archive and wrong for the other four. The band is now expressed in tokens each direction supplies. |

---

## 6 · The two scrims were tokenised

**Problem found in Gate 0.** `siwa-components.css` hardcodes the bento scrim
(`.siwa-bento__media::after`) and the hero scrim (`.siwa-hero__media::after`,
plus its `[dir="rtl"]` mirror) to `rgba(27, 39, 36, …)`. They are the only two
colour runs in the design system that are not tokenised, and being gradients they
would not follow a direction — Nocturne and Desert would show an Archive-green
wash over their own grounds.

**Why it mattered more than it looks.** §3.5 and §3.11 make the scrim the thing
that guarantees 4.5:1 for text over a photograph *regardless of which image a
merchandiser uploads next month*. A scrim that does not match its ground is not
a cosmetic bug.

**Fix.** `--scrim-rgb` holds a bare triplet per direction; the three rules are
overridden in `siwa-themes.css` §9 with `rgb(var(--scrim-rgb) / α)` at the same
alpha stops. Nocturne's scrim goes *below* its page ground so it still reads as
separation rather than as a flat tint.

**Upstream.** These two runs should be tokenised in the design system itself.

---

## 7 · Remote fonts

`RemoteAsset` is disabled in `.theme-check.yml`. The five directions name ten
type families between them and all load from Google Fonts, so switching direction
or locale never waits on a font request. Shopify Fonts carries none of Aref
Ruqaa, Amiri, Noto Kufi Arabic, Baloo Bhaijaan 2, Archivo Black or Cormorant
Garamond. Revisit when the faces are self-hosted — and note that §12 decision 3
flags Aref Ruqaa as not yet licence-verified for web use at Siwa's traffic tier.

---

## 8 · Rule interpretation: an inset shadow is a drawn rule, not elevation

`tools/validate-siwa.mjs` permits `box-shadow: inset …` on the commerce layer
and still errors on any outset shadow.

**Reasoning.** CI rule 6 forbids `box-shadow` on a commerce-layer selector
because principle 4 forbids *lift* — "a product card does not lift". An inset
shadow cannot lift anything; it paints inside the box. Desert underlines an open
nav item with `inset 0 -2px 0 var(--colors-text)`, which is a drawn rule that
happens to use the shadow property because a border would change the element's
size. Erroring on it would push authors toward a worse implementation
(a `::after` pseudo-element) to satisfy a rule about a visual effect it does not
produce.

**Scope of the concession.** `inset` only. Every outset shadow on the commerce
layer is still an error, which is the case principle 4 was written for.

---

## Open items inherited from Gate 0, not deviations

- `--font-display`, `--font-ui`, `--spacing-card`, `--spacing-bento-gap` and
  `--spacing-inline` exist in `siwa-tokens.css` but are missing from
  `tokens.json`. Regenerating the CSS from the JSON would silently drop them and
  break `body` and `.siwa-bento`. Belongs to whoever owns the token pipeline.
- The design system ships no JavaScript. Everything its stylesheets imply —
  drawer, mega menu, dialog, scrim, focus trap, scroll reveals, live region — is
  implemented once in `assets/siwa-theme.js` and documented at the top of that
  file. Sections wire to its data attributes and write no JS of their own.
