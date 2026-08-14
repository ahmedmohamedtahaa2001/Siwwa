# Review card

## Purpose
One customer review. PDP review lists, homepage carousels, featured testimonials.
This is the component carrying the store's single strongest asset.

## ⚠ Review content is never authored

Every field comes from a Judge.me review object passed in as `review`. No review text, author,
rating or date may be typed into a schema setting — **a fabricated review is a fabricated
endorsement.** The one place a merchant chooses anything is *which* real review to feature; even
there the content is echoed from the review object.

## ⚠ Reviews stay loud

`DIRECTION.md` Part 1 §2.1: do not copy Amouage's review restraint. Amouage sells at $395 and can
afford silence. Siwa sells at ~$19 with **4.98★ from 1,212 reviews** (live, 2026-08-12) — prominence
is the strategy, not decoration.

## Variants

| # | Name | Class | When to use |
|---|---|---|---|
| 1 | Minimal list item | `.review` | PDP default. Monogram, name, stars, date, body, verified. |
| 2 | Featured testimonial | `.review--featured` | Full body, product name, location. Serif body at 19px. |
| 3 | Carousel card | `.review--carousel` | Homepage. Centred, short quote (80 chars), large stars. |
| 4 | Detailed PDP | `.review--detailed` | Adds variant purchased, helpful votes, shop reply. No truncation. |
| 5 | Vintage testimonial | `.review--vintage` | Pull-quote on the vintage surface, one Cultural Accent colour. |

## Settings

| Setting ID | Type | Label | Default | Notes |
|---|---|---|---|---|
| `review` | object | — | — | Required. Judge.me review object. |
| `style` | select | Style | `list` | |
| `truncate_length` | range 80–400 | Truncate at | 200 | 0 disables. `detailed` forces 0. |
| `show_verified` | checkbox | Show verified badge | `true` | |
| `show_product` | checkbox | Show product name | `false` | |
| `accent_color` | select | Cultural accent | `none` | Vintage variant only |

## Expected review shape

```liquid
{ author, location, rating, date, title, body, verified,
  product, variant, helpful_votes, reply, language, url }
```

## Dependencies
`star-rating` · `css/components.css` (`.review` and modifiers)

## Accessibility
- The monogram avatar is `aria-hidden` — the author's name follows it as text.
- Stars are one `role="img"` with a single spoken label, not five separate images.
- `verified` is text, not a colour or an icon alone.
- Truncated reviews expose a real "Read full review" link, never a JS-only expander.

## RTL and bilingual
**Arabic review bodies are real in this catalogue.** `.review__body[lang="ar"]` sets the Arabic
family, `direction: rtl`, right alignment and 1.7 leading — so an Arabic review renders correctly
*even while the surrounding page is English*. The `language` field on the review object drives it.
