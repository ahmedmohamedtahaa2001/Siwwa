# Product card

## Purpose
The single most important component. Powers collection grids, carousels, related products,
search results and wishlist. Everything the store sells is seen through it first.

## Anatomy — unified, client spec 2026-08-13

One structure everywhere. Every skin below is CSS over *this* markup; none of them
re-orders it, and no page hand-rolls its own card any more.

```
article.pcard
├── div.pimg                      badges · two images, crossfaded on hover
│   ├── a.pimg__link  > img.pimg__img--a  (default)
│   │                   img.pimg__img--b  (hover, where a second frame exists)
│   ├── div.pimg__badges
│   └── button.wish               optional
├── div.pcard__body
│   ├── h3.pcard__title
│   ├── p.pcard__sub              "Inspired by X" / the Arabic name / a subtitle
│   └── p.pcard__notes            held open by `reserveNotes` when absent
├── span.rating-line--split       [stars + score] .......... [(n reviews)]
└── div.pcard__foot               [price] .................. [CTA]
```

The CTA is an option, not a deduction: `add` · `buy` · `notify` · `none`, defaulting to
`notify` when the product is out of stock and `add` otherwise.

Only 2 of 56 products carry a second photograph, so the hover swap is real on those two
and silently absent elsewhere — a photography brief, not a code fix (feature-doc B-06).
The second image is a setting: `window.SIWA_IMG_ALT` in the static build, `product.images[1]`
in the theme.

## Variants

| # | Name | Class | Register | When to use |
|---|---|---|---|---|
| 1 | Minimal commercial | `.pcard` | Inspired-by | The 40 dupes. UI Chrome only, reviews loud, one clear CTA. Default. |
| 2 | Editorial | `.pcard--editorial` | **Originals only** | Arabic + Latin at equal optical weight, note descriptors, muted CTA. |
| 3 | Compact grid | `.pcard--compact` | Either | 6-up grids. Stars only; quick-add on hover/focus. |
| 4 | Feature hero | `.pcard--hero` | Either | One product carrying a section. Excerpt, note pyramid, two CTAs. |
| 5 | Feature, full bleed | `.pcard--feature` | Either | Campaign photography, serif title, roomier body. Cinematic rails. |
| 6 | Vintage storytelling | `.pcard--vintage` | **Originals only** | Sepia image, provenance stamp, one Cultural Accent rule, review as pull-quote. |
| — | Bare | `.pcard--bare` | Either | Borderless and image-led, so a grid of eight reads as photography rather than as boxes. The homepage's register. |

## ⚠ Two-register firewall — enforced in code

`editorial` and `vintage` are heritage treatments and may carry the Cultural Accent Set. On one of
the 40 inspired-by products they are a firewall breach, so **the snippet downgrades them to
`minimal`** and drops `accent_color`. The caller is not trusted.

The register comes from `snippets/product-register.liquid`, which is the *only* place vendor is
tested. When the vendor/dupe posture is settled (`PROJECT-CONTEXT.md` §7.4), that one file changes.

## ⚠ Vendor is not a brand

`product.vendor` holds the **designer fragrance a product is inspired by** — 42 distinct values
across 56 products, e.g. `Bleu De Chanel Parfum`. `04-PRODUCTS.md` §1: *"A rebuild must never
render `product.vendor` as a brand."*

So it renders as "Inspired by X", never as a brand line, and is auto-suppressed on Originals.
Linking it to a vendor facet is the Oakcha designer-facet pattern and is **opt-in** via
`link_vendor`, default **off**, because the posture is undecided.

## Settings

| Setting ID | Type | Label | Default | Notes |
|---|---|---|---|---|
| `product` | product | Product | — | Required |
| `style` | select | Card style | `minimal` | Downgraded on inspired-by for heritage styles |
| `show_vendor` | checkbox | Show inspired-by reference | `true` | Auto-hidden on Originals |
| `link_vendor` | checkbox | Link to designer facet | `false` | See above |
| `show_reviews` | checkbox | Show rating and count | `true` | See the note below before turning off |
| `show_badge` | checkbox | Show badge | `false` | |
| `badge_type` | select | Badge type | `auto` | `auto` = sale, else authentic on Originals, else new |
| `show_notes` | checkbox | Show accords | `false` | Requires `fragrance.accords` metafield |
| `cta_label` | text | Button label | locale string | |
| `accent_color` | select | Cultural accent | `none` | Ignored on inspired-by |
| `image_ratio` | select | Image ratio | per variant | |

## Reviews stay loud

`show_reviews` defaults **true** and should stay true. 4.98★ from 1,212 reviews (live, 2026-08-12)
is the store's strongest competitive asset. `DIRECTION.md` Part 1 §2.1 is explicit that Amouage's
review restraint must not be copied — they sell at $395, Siwa at ~$19. The rating sits above the
price on every variant.

## Usage

```liquid
{% render 'product-card',
   product: product,
   style: section.settings.product_card_style,
   show_reviews: true,
   show_badge: true %}
```

## Dependencies
`product-register` · `image-container` · `badge` · `button` · `price` · `note-pyramid`
· `judgeme-preview-badge` · `css/components.css` (`.pcard` and modifiers)

## ⚠ The Liquid snippet has not been migrated yet

`snippets/product-card.liquid` still emits the pre-unification order (sub above title, no
second image, rating not split) and `siwa-theme/assets/siwa-components.css` is a generated
copy of `css/components.css` taken **before** the unification — do not rebuild it with
`tools/build-theme-assets.sh` until the snippet is migrated, or the theme will get the new
CSS against the old markup. The static build (component library, homepage, theme preview,
both Phlur pages) is fully migrated.

## Accessibility
- The media link is `tabindex="-1"` and `aria-hidden` because the title immediately after it is the
  same destination — otherwise every card produces two identical tab stops.
- `heading_tag` lets the caller keep the page outline sane (`h2` in a section, `h3` in a grid).
- Compact quick-add is hidden on hover **but always visible under `@media (hover: none)`** — on
  touch there is no hover, and hiding the only add control would strand the user.
- Sold-out cards grey the image *and* swap the CTA to "Notify me"; state is never colour-only.

## RTL and bilingual
Arabic titles come from `fragrance.title_ar`, not from `product.title` — Shopify's title is
single-valued per locale. In editorial and vintage they render at the same optical size and colour
as the Latin title, stacked. Absent until the metafield exists; nothing breaks meanwhile.
