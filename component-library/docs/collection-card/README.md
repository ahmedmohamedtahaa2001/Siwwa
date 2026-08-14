# Collection card

## Purpose
A single collection tile. The unit that `collection-grid` and `featured-collections` arrange.

## Variants

| # | Name | Class | When to use |
|---|---|---|---|
| 1 | Image + title overlay | `.ccard--overlay` | Dense grids where the photograph carries meaning. |
| 2 | Split image / text | `.ccard--split` | Title needs room; count is worth stating. |
| 3 | Minimal text | `.ccard--minimal` | Quiet rows. No background, sits on the canvas. |
| 4 | Cinematic wide | `.ccard--cinematic` | 21:9. One collection as a full-width statement. |
| 5 | Heritage tile | `.ccard--heritage` | Vintage surface, embroidery rule in one Cultural Accent. |

## ⚠ Two-register note — merchant-enforced, not code-enforced

`heritage` and `accent_color` belong to collections genuinely about Siwan heritage — the Originals,
an Oasis collection. A collection of inspired-by dupes styled as heritage is a firewall breach.

Unlike `product-card`, **this cannot be enforced in code**: a collection has no vendor to test. It
is surfaced as schema `info` text and stated here. If a rule-based guard is wanted later, tagging
heritage collections and testing the tag would work.

## ⚠ Product counts are unreliable — `show_count` defaults off

`05-COLLECTIONS.md` records `products_count` values that exceed the entire 56-product catalogue:
`for-him` 83, `for-her` 80, `perfumes` 82. Shopify's live `collection.products_count` will be
correct, but do not port the captured figures, and check the live value before turning this on.

## Settings

| Setting ID | Type | Label | Default | Notes |
|---|---|---|---|---|
| `collection` | collection | Collection | — | Required |
| `image` | image_picker | Image | `collection.image` | Override |
| `title` / `title_ar` | text | Title / Arabic title | `collection.title` | Arabic at equal weight |
| `description` | text | Tagline | — | |
| `style` | select | Style | `overlay` | |
| `show_count` | checkbox | Show product count | `false` | See above |
| `cta_label` | text | Link label | — | Rendered as inert text — see below |
| `accent_color` | select | Cultural accent | `none` | Heritage only |
| `scrim_opacity` | range 0–80 | Overlay opacity | per variant | |

## Accessibility
- The **whole card is one `<a>`**. `cta_label` renders as an `aria-hidden` span styled like a
  button — a real nested link or button inside an anchor is invalid markup and creates a confusing
  tab order. One card, one tab stop, one destination.
- The image's alt falls back to the collection title.
- Overlay and cinematic variants put text on a photograph: **check contrast against the darkest
  point of the image**, not against the scrim colour alone. The scrim is adjustable for exactly
  this reason.

## RTL and bilingual
`inset-inline`, `padding-inline` and logical insets throughout. `title_ar` renders beneath the
Latin title in the Arabic display family at the same optical weight.
