# Review widget

## Purpose
The full review presentation — PDP review lists, homepage carousels, aggregate ratings.
This module carries the store's strongest competitive asset.

## Variants

| # | Name | When to use |
|---|---|---|
| 1 | Judge.me embed | **Default and safest.** The app's own widget, styled to match tokens. |
| 2 | Custom list | Review cards rendered from a review array. Merchandising surfaces. |
| 3 | Summary + featured | Aggregate, then N featured reviews, then "see all". |
| 4 | Histogram | Star distribution beside the list, filterable by rating. |
| 5 | Testimonial carousel | Top-rated reviews as large cards. Homepage. |

## ⚠ Prefer `embed`

The full list, submission form, photo uploads, voting and moderation all live in Judge.me.
Re-implementing them against the API means re-implementing **all** of it — including moderation,
which is where the liability is. `embed` renders the app's own div and lets it hydrate. The custom
variants are for merchandising surfaces where the reviews are already in hand.

## ⚠ Not verified against a live store

No store credentials exist in this repository. The Judge.me markup follows `06-REVIEWS.md` §4
(theme app extension `judgeme-657`, widget version 3.0) but **has not been run**. The classes
`jdgm-widget`, `jdgm-preview-badge`, `jdgm-review-widget` and the `data-id` attribute are the app's
hydration contract — renaming any of them silently removes every review on the site.

## ⚠ Aggregate figures are never hardcoded

4.98★ / 1,212 is the **live figure at 2026-08-12**, and it moves — it was 1,176 at the 2026-07-27
capture (`_CORRECTIONS.md` drift note). Nothing in this module writes a number. The aggregate comes
from `shop.metafields.judgeme.all_reviews_rating` / `all_reviews_count`.

`03-DATA-SCHEMA.md` §7 warns those are stored inside a settings blob as **unrendered template
strings**, so they may resolve empty. When they do, the aggregate block is **omitted** rather than
filled with a stale constant. Verify against the live store before relying on it.

## Reviews stay loud
`DIRECTION.md` Part 1 §2.1. Amouage sells at $395 and can afford review restraint. Siwa sells at
~$19 with a 4.98★ average across four figures of reviews. Prominence is the strategy.

## Settings

| Setting ID | Type | Label | Default |
|---|---|---|---|
| `widget_style` | select | Style | `embed` |
| `show_histogram` | checkbox | Show star distribution | `false` |
| `show_summary` | checkbox | Show aggregate | `true` |
| `featured_count` | range 0–10 | Featured reviews | 3 |
| `allow_filtering` | checkbox | Filter by rating | `false` |
| `review_style` | select | Review card style | `list` |

## Accessibility
- Histogram rows are **real `<button>`s** when filtering is on and inert text when it is off —
  never a `<div>` with a click handler.
- Each bar carries a text equivalent; a bar alone conveys nothing.
- Two of 56 products genuinely have no reviews (`soiree`, `sundaze`); the widget renders nothing
  rather than an empty frame.
