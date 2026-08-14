# Testimonial card

## Purpose
Curated praise that is **not** a Judge.me review: brand endorsements, press quotes, video reviews,
influencer quotes.

## How this differs from `review-card`

| | `review-card` | `testimonial-card` |
|---|---|---|
| Source | Judge.me review object | Merchant-authored schema settings |
| Verified | Yes, by purchase | No |
| Fields as settings | **Never** | Yes — legitimately |

Because a testimonial is curated, its fields are legitimately schema settings. **That is not a
licence to invent praise.** If the quote did not happen, it does not go here.

## Variants

| # | Name | Class | When to use |
|---|---|---|---|
| 1 | Quote + author | `.quote` | Cleanest. Serif quote with a gold rule, author and role. |
| 2 | Avatar + quote | `.tcard` | Adds a photo or monogram. Optional stars. |
| 3 | Video testimonial | `.tcard` + `.tcard__play` | Poster with a play control, quote below. |
| 4 | Press quote | `.tcard` + `.tcard__logo` | Publication logo, quote, "Read article". |
| 5 | Heritage | `.tcard--heritage` | Serif italic, author in small caps, Cultural Accent quote mark. |

## Settings

| Setting ID | Type | Label | Default |
|---|---|---|---|
| `quote` | text | Quote | — (required) |
| `author` | text | Author | — |
| `author_role` | text | Role / location | — |
| `image` | image_picker | Photo or video poster | — |
| `publication_logo` | image_picker | Publication logo | — |
| `publication_name` | text | Publication name | — |
| `video_url` | url | Video URL | — |
| `link_url` / `link_label` | url / text | Link | — |
| `rating` | range 1–5 | Stars | — |
| `style` | select | Style | `quote` |
| `accent_color` | select | Cultural accent | `none` |

## Dependencies
`image-container` · `star-rating` · `button` · `icon` · `css/components.css` (`.tcard`, `.quote`)

## Accessibility
- Uses `<figure>` / `<blockquote>` / `<figcaption>` so the quote and its attribution are
  programmatically associated.
- The play control is a real link with an accessible name, not a click-handled `<div>`.
- `publication_name` doubles as the logo's alt text — a logo image with no name is unusable to a
  screen reader.
- The decorative opening quote mark is `aria-hidden`; the quote itself already has quotation
  semantics from `<blockquote>`.

## RTL and bilingual
`.quote` uses `border-inline-start`, so the accent rule moves to the right in Arabic.
The heritage quote mark is a Latin `&ldquo;` — for an Arabic-first testimonial, prefer variant 1,
whose styling is direction-neutral.
