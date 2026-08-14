# Image container

## Purpose
Responsive image wrapper with aspect-ratio control, srcset, lazy loading and an optional scrim for
text-over-image. Used by every card, hero and editorial block.

**This is the Liquid transplant of the library's existing `Image` primitive.** It renders the same
`.pimg` class the gallery uses — no second image convention was introduced. It adds two ratios
(3:4 and 21:9) and the scrim, which the gallery did not have.

## Variants

| # | Ratio | When to use |
|---|---|---|
| 1 | 4:5 portrait | Product card default — matches the bottle proportion. |
| 2 | 16:9 landscape | Hero and feature rows. Editorial and video posters. |
| 3 | 1:1 square | Collection tiles, carousels, thumbnails, Instagram grid. |
| 4 | 3:4 portrait | Editorial and storytelling. Added for the theme. |
| 5 | 21:9 cinematic | Ultra-wide oasis and Shali Fortress photography. Added for the theme. |

Aspect ratio is emitted as an **inline value**, not one of five fixed classes, so a section can
expose it as a free schema setting rather than a five-way select.

## Settings

| Setting ID | Type | Label | Default | Notes |
|---|---|---|---|---|
| `image` | image_picker | Image | — | Falls back to `placeholder_svg_tag`. |
| `ratio` | select | Aspect ratio | `4x5` | `4x5` \| `16x9` \| `1x1` \| `3x4` \| `21x9` |
| `focal` | select | Focal point | `center` | `center` \| `top` \| `bottom` |
| `zoom` | checkbox | Zoom on hover | `false` | `.pimg--zoom`, 1.06 scale. |
| `scrim_opacity` | range 0–80 | Overlay opacity | `0` | 0 renders no scrim element at all. |
| `alt` | text | Alt text | — | Overrides `image.alt`. |
| `loading` | — | — | `lazy` | Set `eager` above the fold **only**. |

## Usage

```liquid
{% render 'image-container',
   image: section.settings.hero_image,
   ratio: '21x9',
   scrim_opacity: section.settings.overlay_opacity,
   loading: 'eager',
   fetch_priority: 'high',
   sizes: '100vw' %}
```

## Dependencies
- `css/components.css` — `.pimg`, `.pimg__ph`, `.pimg--zoom`, `.pimg--top/--bottom`, `.pimg__scrim`

## Accessibility
- **Alt text.** `08-ASSETS.md` records an alt-text gap on the live store (1.16 images per product,
  alt largely absent). The snippet falls back to `image.alt`, then the caller's `alt`, then renders
  `alt=""` — correctly marking the image decorative — rather than inventing a description from the
  product title. Closing the gap is a content task, not a markup one.
- `image_tag` emits width and height, so the box is reserved and there is no layout shift.
- The scrim is `aria-hidden` and `pointer-events: none`.
- **Text over an image must have its own contrast checked** against the darkest point of the scrim.
  A scrim is not a substitute for a contrast measurement.
- The zoom transform is disabled by the `prefers-reduced-motion` block in `tokens.css`.

## RTL and bilingual
The wrapper is directionally neutral. Note that photography containing Latin text (labels, packshots
with English copy) does not mirror and may read oddly beside Arabic — a content consideration for
`instagram-assets/`, not a markup one.
