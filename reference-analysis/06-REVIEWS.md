# 06 — REVIEW SYSTEM & REVIEW CORPUS

Reference: https://siwafragrances.com/ · Shop `3c3u3n-qt.myshopify.com` · Theme Prestige 11.1.0
Audit date: 2026-07-27 · All data re-derived from `raw/` by direct parse of the captured HTML.

---

## 0. DATA-PROVENANCE NOTE — READ FIRST

`raw/jdgm_settings.json` and `raw/jdgm_all.json` are **not usable**: the first is a Judge.me
`404 Not Found` HTML page, the second is 0 bytes. Everything in this document that concerns
Judge.me configuration was re-extracted from `window.jdgmSettings` inline in the PDP HTML.

**Capture status: 56 of 56 PDPs valid — RESOLVED.** The first capture pass returned Shopify/Cloudflare
`"Verifying your connection..."` bot-challenge interstitials for 24 of the 56 `raw/products/*.html`
files. **Those 24 pages were subsequently re-scraped successfully.** Every file in `raw/products/`
is now a real PDP capture (177–186 KB, `jdgmSettings` + `jdgm-prev-badge` + full Judge.me widget
markup present). Verified by re-parse:

| Capture status | Count | Evidence |
|---|---|---|
| Real PDP HTML (Judge.me present) | **56** | `jdgm-prev-badge` with `data-average-rating`/`data-number-of-reviews` present in all 56; `jdgm-histogram__row` ×5 present in all 56 |
| Bot-challenge interstitial | **0** | — |

Every figure in this document has been **re-derived over all 56 captures**. The earlier
"344 reviews / 31 of 56 products" figure described the *first, partial* capture pass only and has
been superseded throughout — see `_CORRECTIONS.md`.

| Superseded figure | Corrected, verified figure |
|---|---|
| 344 attributable reviews | **820** |
| 31 products with reviews | **54 of 56** (`soiree` and `sundaze` are the only zeros) |
| 4.986 ★ weighted | **4.9807 ★** weighted / **4.98049 ★** histogram-exact |
| 131 review bodies | **241** |
| 5★ 339 / 4★ 5 | **5★ 804 / 4★ 16** |

Two limits remain and are *not* capture failures — they are properties of the live storefront:

1. Only **page 1** of each product's review widget is server-rendered (`pagination: 5`). The 241
   captured bodies are all that exist in HTML; pages 2+ load from `api.judge.me`.
2. Judge.me declares **1,176** shop-wide reviews but only **820** are attributable to the 56 published
   products. The **356-review gap** is discussed in §2.3.

Also note: `raw/products/*.js.json` was **not** re-fetched and ~25 of those files may still be
challenge responses. Product data in this document comes from `raw/products.json`, which is complete.

---

## 1. REVIEW PLATFORM — JUDGE.ME

### 1.1 App identity

| Property | Value | Source |
|---|---|---|
| App | Judge.me Product Reviews | `raw/products/boujee-blush.html` |
| Theme-app-extension handle | **`judgeme-657`** | `https://cdn.shopify.com/extensions/019fa440-b46f-7094-9ecf-aac8c6e13872/judgeme-657/assets/` |
| Extension UUID | `019fa440-b46f-7094-9ecf-aac8c6e13872` | asset URLs |
| Core app block | `shopify://apps/judge-me-reviews/blocks/judgeme_core/61ccd3b1-a9f2-4160-9fe9-4fec8413e5d8` | `<!-- BEGIN app block -->` comment |
| `platform` | `shopify` | `jdgmSettings.platform` |
| `widget_version` | `3.0` | `jdgmSettings.widget_version` |
| `locale` / `shop_locale` | `en` / `en` | `jdgmSettings` |
| `can_be_branded` | `false` | `jdgmSettings` |
| `remove_judgeme_branding` | `false` | `jdgmSettings` |
| Shop reply display name | `Siwa Fragrances` | `jdgmSettings.reply_name_text` |

Assets loaded (all pages carrying the core block):

| Asset | URL |
|---|---|
| Core CSS | `…/judgeme-657/assets/shopify_v2.css` |
| Loader | `…/judgeme-657/assets/loader.js` |
| Carousel JS (homepage only) | `…/judgeme-657/assets/carousels.js` |
| Carousel CSS (homepage only) | `…/judgeme-657/assets/carousels.css` |
| Testimonials carousel entry (homepage only) | `…/judgeme-657/assets/testimonials_carousel.js` |
| Media carousel entry (conditional, unused — `carousel_type` is `testimonials`) | `…/judgeme-657/assets/media_carousel.js` |
| Paginate/API endpoint | `https://api.judge.me/reviews/reviews_for_widget` |
| DNS-prefetch hints | `cdn.judge.me`, `cdn1.judge.me`, `api.judge.me` |

### 1.2 Widget types actually deployed

| Widget | Deployed? | Where | Block / element id |
|---|---|---|---|
| **Core script block** (`judgeme_core`) | Yes | every page (theme app embed) | `shopify://apps/judge-me-reviews/blocks/judgeme_core/61ccd3b1-…` |
| **Preview badge** (star + count) | Yes — **twice per PDP** | `main-product` section, product-info block stack | `shopify-block-AU0o0d2txTFZPR05IW__judge_me_reviews_preview_badge_tkKyYf` and `…tkKyYf-1` |
| **Review widget** (full list + histogram + pagination) | Yes | PDP `shopify-section--apps` | `shopify-block-AZmtCVkNTOWMxaHZIZ__judge_me_reviews_review_widget_ExadyT` |
| **Histogram** (5→1 bar chart) | Yes | inside the review widget | `.jdgm-histogram`, `widget_show_histogram: true` |
| **Testimonials carousel** | Yes | homepage `shopify-section--apps` (DOM position 10) | `shopify-block-AdGJjWk43R1pNOVBuV__judge_me_reviews_testimonials_carousel_PDLRxp` |
| Review snippet widget | Configured (CSS tokens emitted) but **no instance rendered** in any captured page | — | `--jdgm-snippet-*` tokens present, `.jdgm-review-snippet-widget` never instantiated |
| Floating reviews tab | No | `floating_reviews_tab_install_preference: "none"` | — |
| Verified-count badge | No | `verified_reviews_count_badge_install_preference: false` | — |
| All-reviews text badge | No | `all_reviews_text_install_preference: false` | — |
| Judge.me medals | No | `judgeme_medals_install_preference: false` | — |
| Popup / "recent review" widget | Not rendered | settings present but no markup | — |
| Q&A | No | `enable_question_anwser: false`, `data-number-of-questions='0'` on every product | — |
| Reviews grid widget | No | no markup | — |

Notes:
- The **second `shopify-section--apps` section on the homepage**
  (`template--18814156636208__17765002303c384e0a`, DOM position 15) is **empty** — `<section …></section>`
  with no block inside. It is a vestigial section, not a second Judge.me widget.
- The preview badge appears **twice** because Prestige renders two `product-info` block stacks
  (desktop and mobile/sticky). Block-id suffixes are `…tkKyYf-1` (after `description`) and
  `…tkKyYf-2` (after `buy_buttons`). Both are `data-block-type="@app"` and sit **last** in their stack.
- Preview badges are emitted with `data-template='manual-installation'`. This matters: the injected
  CSS kills `data-template="product"`, `"collection"` and `"index"` badges outright, so only the
  manually-placed app-block instances survive.

### 1.3 PDP section stack — where the review widget sits

DOM order in `raw/products/boujee-blush.html`:

| # | `section id` | Role |
|---|---|---|
| 1 | `sections--18814157193264__announcement_bar_6BNjyF` | announcement bar |
| 2 | `sections--18814157193264__header` | header |
| 3 | `sections--18814157258800__cart-drawer` | cart drawer |
| 4 | `sections--18814157258800__newsletter-popup` | newsletter popup |
| 5 | `sections--18814157258800__privacy-banner` | privacy banner |
| 6 | `template--18814156767280__main` | **main-product** (contains both preview badges) |
| 7 | **`template--18814156767280__1759233522bc5ee263`** | **`shopify-section--apps` → Judge.me review widget** |
| 8 | `template--18814156767280__related-products` | `<product-recommendations limit="10" intent="related">` |
| 9 | `template--18814156767280__recently_viewed_products_LGtyH6` | recently viewed |
| 10 | `sections--18814157226032__text-with-icons` | text with icons |
| 11 | `sections--18814157226032__footer` | footer |

The apps section wrapper carries Prestige classes:
`color-scheme color-scheme--scheme-1 color-scheme--bg-54922f2e920ba8346f6dc0fba343d673 section-spacing bordered-section`
with an inner `.container`. The widget root itself is inline-styled `max-width: 1200px; margin: 0 auto;`.

Review-widget root attributes (boujee-blush):

```
<div id='judgeme_product_reviews' class='jdgm-widget jdgm-review-widget'
     data-product-title='Boujee Blush' data-id='7735877206064' data-product-id='7735877206064'
     data-widget="review" data-shop-reviews="false" data-shop-reviews-count="222"
     data-cart-eligible-template="false" data-shop-average-rating="4.98"
     data-shop-review-count="1176" data-empty-state="empty_widget"
     data-entry-point="review_widget.js" data-entry-key="review-widget/main.js"
     data-block-id="AZmtCVkNTOWMxaHZIZ__judge_me_reviews_review_widget_ExadyT"
     data-customer-logged-in="false" style='max-width: 1200px; margin: 0 auto;'>
```

`data-shop-average-rating="4.98"` and `data-shop-review-count="1176"` are **identical on all 56
captured PDPs**, the homepage and the collection pages — these are Judge.me's store-level aggregates
(see §2.3).

### 1.4 Homepage testimonials carousel

Section `template--18814156636208__17592337449e486738`, DOM position 10 (between
`featured-collections-2` and `scrolling-content-2`).

| Setting | Value |
|---|---|
| `carousel_type` | `testimonials` |
| `reviews_selection` | **`custom_products`** (hand-picked, not "all reviews") |
| `product_ids` | `[7735874814000, 7735877206064, 7735873568816, 7735877500976, 7924236714032, 7909727961136, 7776920109104, 7735874322480]` |
| `star_rating` | **`5_star`** — only 5★ reviews are eligible for the carousel |
| `max_reviews` | `20` |
| `min_reviews` | `1` |
| `transition_speed` | `5` |
| `quote_marks_size` | `hidden` |
| `stars_size` / `verified_badge_style` | `medium` / `icon` |
| `product_name_text_size` | `small` |
| `show_sample_reviews` | `false` |
| `show_reviewer_name` | `null` (falls back to `featured_carousel_show_reviewer: true`) |
| Header `<h2 class="jdgm-title">` | **"Customers are saying"** |
| Header info | `4.98 ★ (1176)` + `Verified` badge |
| `shop_aggregates.reviewCount` | `1176`; inline `const averageRating = 4.98` |

Hand-picked product IDs → handles:

| Product ID | Handle | Title |
|---|---|---|
| 7735874814000 | `layering-vanilla` | Layering Vanilla |
| 7735877206064 | `boujee-blush` | Boujee Blush |
| 7735873568816 | `mawj` | Mawj |
| 7735877500976 | `drunk-gold` | Drunk Gold |
| 7924236714032 | `absolute-drunk` | Absolute Drunk |
| 7909727961136 | `bleu-exclusive` | Bleu Exclusive |
| 7776920109104 | `bare-glow` | Bare Glow |
| 7735874322480 | `lady-killer` | Lady killer |

The carousel renders **client-side only** — the server HTML ships `class="jdgm-widget
jdgm-testimonials-carousel jdgm-hidden"` with zero review cards; content is fetched by
`testimonials_carousel.js`. A rebuild cannot rely on server-rendered carousel content.

Carousel inline CSS custom properties (scoped to the carousel element, **not** `--jdgm-*` prefixed):

| Property | Value | Hex / note |
|---|---|---|
| `--max-width` | `1200px` | |
| `--text-color` | `#000000` | `0 0 0` |
| `--card-color` | `#f9f9f9` | `249 249 249` |
| `--border-radius` | *(empty)* | inherits default |
| `--border` | `none` | |
| `--box-shadow` | `none` | |
| `--quote-bg` | inline base64 SVG quote glyph, `fill="#ffd700"` | `255 215 0` |
| `--quote-aspect` | `1.52` | |
| `--quote-size` | *(empty)* | |
| `--text-size` / `--text-size-mobile` | `24px` / `20px` | |
| `--line-clamp` / `--line-clamp-mobile` | `3` / `4` | |
| `--stars-size` | `24px` | |
| `--stars-color` | `#ffd700` | `255 215 0` |
| `--product-name-size` | `16px` | |
| `--arrows-color` | `#000000` | `0 0 0` |

### 1.5 `window.jdgmSettings` — configuration

598 keys total. Extracted from `raw/products/boujee-blush.html` (identical on every captured PDP,
homepage and collection page). Copy/label strings omitted; behavioural, structural and colour
settings tabulated below.

**Coupon / discount-for-review**

| Key | Value |
|---|---|
| `enable_coupons` | **`false`** |
| `coupon_receiving_condition` | `any_review` |
| `coupon_value_type` | `percentage` |
| `coupon_value_percentage` | **`10`** |
| `coupon_value_fixed_amount` | `0` |
| `coupon_discount_type` | `single` |
| `coupon_tier_text_enabled` / `_percentage` / `_fixed_amount` | `false` / `10` / `0` |
| `coupon_tier_photo_enabled` / `_percentage` / `_fixed_amount` | `false` / `10` / `0` |
| `coupon_tier_video_enabled` / `_percentage` / `_fixed_amount` | `false` / `10` / `0` |
| `coupon_promo_invited_eligible` | `true` |
| `coupon_promo_web_eligible` | `false` |

Reading: a **10 % single-use percentage coupon for any review** is fully configured, but the master
switch `enable_coupons` is currently `false`. The configuration exists and has been set up
deliberately (values are non-default in the `_percentage` fields); whether it was on historically is
**not determinable from captured data**.

**Pagination / volume**

| Key | Value | Effect |
|---|---|---|
| `pagination` | **`5`** | legacy review widget: 5 reviews per page (matches `.jdgm-paginate data-per-page='5'`) |
| `product_review_widget_per_page` | `10` | new (revamp) widget; revamp is off |
| `all_reviews_pagination` | `100` | all-reviews page |
| `all_reviews_widget_v2025_reviews_per_page` | `10` | v2025 widget; disabled |
| `all_reviews_page_load_reviews_on` | `scroll` | |
| `widget_pagination_type` | `standard` | numbered pages, not "load more" |
| `default_sort_method` | `most-recent` | confirmed by timestamps descending on every PDP |
| `widget_advanced_speed_features` | `5` | |
| `widget_load_with_code_splitting` | `true` | |

**Moderation / submission flow**

| Key | Value |
|---|---|
| `autopublish` | **`false`** — reviews require admin approval |
| `disable_web_reviews` | `false` |
| `write_review_button_visibility` | `everyone` |
| `require_verification_before_submit` | `false` |
| `customer_account_validation_enabled` | `true` |
| `review_verification_email_status` | `always` |
| `modal_write_review_flow` | `true` |
| `rating_only_reviews_enabled` | `false` |
| `widget_rating_preset_default` | `5` — **the star selector is pre-filled at 5★** |
| `show_review_guidance_text` | `true` (`one_star…="Poor"`, `five_star…="Great"`) |
| `show_negative_reviews_help_screen` | `false` |
| `new_review_flow_help_screen_rating_threshold` | `3` |
| `widget_show_review_title_input` / `show_review_title_input` | `false` / `false` |
| `enable_review_pictures` | `true` |
| `enable_review_videos` | `false` |
| `enable_custom_form` | `false` |
| `request_store_review_after_product_review` | `true` |
| `request_review_other_products_in_order` | `false` |
| `redirect_reviewers_invited_via_email` | `external_form` |

**Widget display**

| Key | Value |
|---|---|
| `widget_theme` | `default` |
| `widget_title` | `Customer Reviews` |
| `widget_show_histogram` | `true` |
| `widget_hide_border` | `false` |
| `widget_round_style` | `false` |
| `widget_social_share` | `false` |
| `widget_thumb` (helpful votes) | `false` |
| `widget_review_location_show` / `widget_show_country_flag` | `false` / `false` |
| `show_reviewer_avatar` | `true` (initial-letter avatar) |
| `widget_reviewer_anonymous` | `Anonymous` |
| `widget_show_photo_gallery` | `false` |
| `widget_add_search_bar` | `false` |
| `widget_show_product_medals` / `widget_show_store_medals` | `true` / `true` |
| `widget_show_ai_summary` | `false` |
| `widget_show_review_keywords` | `false` |
| `widget_show_verified_branding` | `true` |
| `widget_show_collected_via_shop_app` | `true` |
| `widget_show_collected_by_judgeme` | `false` |
| `widget_multilingual_sorting_enabled` | `false` |
| `widget_translate_review_content_enabled` | `false` (`…_method: manual`) |
| `default_reviewer_name_has_non_latin` | **`true`** — Judge.me detected non-Latin reviewer names |
| `verified_badge_placement` | `left-of-reviewer-name` |
| `verified_badge_text` / `widget_verified_text` | `Verified` / `Verified` |
| `review_dates` | `true`; `review_date_format` = `mm/dd/yyyy` |
| `preview_badge_stars_count` | `5-stars` |
| `hide_badge_preview_if_no_reviews` | `true` |
| `badge_hide_text` | `false` (but CSS hides it — see §1.6) |
| `enforce_center_preview_badge` | `false` |
| `review_widget_revamp_enabled` | **`false`** — store is on the legacy widget |
| `all_reviews_widget_v2025_enabled` | `false` |
| `custom_forms_style` | `horizontal` |

**Transparency badges — all suppressed**

| Key | Value |
|---|---|
| `transparency_badges_collected_via_store_invite` | `false` |
| `transparency_badges_from_another_provider` | `false` |
| `transparency_badges_collected_from_store_visitor` | `false` |
| `transparency_badges_collected_by_verified_review_provider` | `false` |
| `transparency_badges_earned_reward` | `false` |

The markup still emits `<div class='jdgm-rev__transparency-badge' data-badge-type=…>` for every
review; the settings CSS then hides each type with `display:none !important`. **The provenance data
is in the DOM but invisible to shoppers.** This is how §5.2 recovers the invitation/visitor split.

**SEO / structured data**

| Key | Value | Consequence |
|---|---|---|
| `remove_microdata_snippet` | **`true`** | no `itemprop="ratingValue"` microdata (verified: 0 occurrences) |
| `disable_json_ld` | `false` | |
| `enable_json_ld_products` | **`false`** | **no `aggregateRating` anywhere on the PDP** (verified: 0 occurrences of `aggregateRating` in `boujee-blush.html`) |

The Prestige-emitted `ProductGroup` JSON-LD carries `brand`, `category`, `hasVariant`, `offers` —
but **no `aggregateRating` / `review` node**. The store is not eligible for star rich results.
This is a concrete, fixable defect a rebuild should address.

**Colour settings in `jdgmSettings`**

| Key | Value | RGB triplet | Note |
|---|---|---|---|
| `widget_primary_color` | `#000000` | `0 0 0` | |
| `widget_secondary_color` | `#FFFFFF` | `255 255 255` | `widget_enable_secondary_color: true` |
| `widget_star_color` | `#FFD700` | `255 215 0` | matches theme `--star-color` |
| `badge_star_color` | `#FFD700` | `255 215 0` | |
| `widget_rating_filter_color` | `#fbcd0a` | `251 205 10` | |
| `widget_load_more_color` | `#108474` | `16 132 116` | Judge.me brand teal — **unused defaults** |
| `all_reviews_text_color` | `#108474` | `16 132 116` | unused (widget not installed) |
| `verified_count_badge_color` | `#108474` | `16 132 116` | unused |
| `featured_carousel_header_background_color` | `#108474` | `16 132 116` | unused (carousel header is theme-styled) |
| `featured_carousel_full_star_background` | `#108474` | `16 132 116` | unused |
| `featured_carousel_arrow_color` | `#000000` | `0 0 0` | |
| `review_snippet_widget_star_color` | `#108474` | `16 132 116` | leaks into emitted CSS, widget not rendered |
| `review_form_text_color` | `#333333` | `51 51 51` | |
| `review_form_background_color` | `#ffffff` | `255 255 255` | |
| `review_form_field_background_color` | `#fafafa` | `250 250 250` | |
| `review_form_button_text_color` | `#ffffff` | `255 255 255` | |
| `review_form_modal_overlay_color` | `#000000` | `0 0 0` | |
| `review_form_corner_style` | `square` | — | matches theme `--button-border-radius: 0.0rem` |
| `medals_widget_background_color` | `#ffffff` | `255 255 255` | unused |

**Custom-CSS slots — all empty**

`widget_review_custom_css`, `preview_badge_custom_css`, `featured_carousel_custom_css`,
`floating_tab_custom_css`, `all_reviews_widget_custom_css`, `medals_widget_custom_css`,
`verified_badge_custom_css`, `all_reviews_text_custom_css` — every one is `""`. All visual
customisation is driven by the settings keys, not hand-written CSS.

### 1.6 `--jdgm-*` CSS tokens

Emitted inline in `<style class='jdgm-settings-style'>` at `:root`.

| Token | Value | RGB triplet | Controls |
|---|---|---|---|
| `--jdgm-primary-color` | `#000` | `0 0 0` | widget primary (links, active states) |
| `--jdgm-secondary-color` | `#fff` | `255 255 255` | widget secondary/background |
| `--jdgm-star-color` | `gold` (= `#FFD700`) | `255 215 0` | review-widget stars |
| `--jdgm-write-review-text-color` | `white` (= `#FFFFFF`) | `255 255 255` | "Write a review" button label |
| `--jdgm-write-review-bg-color` | `#000000` | `0 0 0` | "Write a review" button fill |
| `--jdgm-paginate-color` | `#000` | `0 0 0` | pagination numbers |
| `--jdgm-border-radius` | `0` | — | matches theme `--button-border-radius: 0.0rem` |
| `--jdgm-reviewer-name-color` | `#000000` | `0 0 0` | author name |

Snippet-widget tokens (scoped to `.jdgm-review-snippet-widget`, **widget never rendered**):

| Token | Value | RGB triplet |
|---|---|---|
| `--jdgm-snippet-card-color` | `#fff` | `255 255 255` |
| `--jdgm-snippet-text-color` | `#000` | `0 0 0` |
| `--jdgm-snippet-lighter-text-color` | `#7B7B7B` | `123 123 123` |
| `--jdgm-snippet-star-color` | `#108474` | `16 132 116` |
| `--jdgm-snippet-border-radius` | `8px` | — |
| `--jdgm-snippet-arrows-bg-color` | `#fff` | `255 255 255` |
| `--jdgm-snippet-arrows-color` | `#000` | `0 0 0` |

Hard-coded rules in the same style block (not tokenised — a rebuild must reproduce these
or the widget will not match the theme):

| Selector | Declaration | Effect |
|---|---|---|
| `.jdgm-histogram__bar-content` | `background-color:#000` (`0 0 0`) | histogram bars are black, not gold |
| `.jdgm-rev[data-verified-buyer=true] .jdgm-rev__icon:after`, `.jdgm-rev__buyer-badge` | `color:white; background-color:#000` | verified badge = white-on-black |
| `.jdgm-preview-badge .jdgm-star` | `color:#FFD700` (`255 215 0`) | preview-badge stars gold |
| `.jdgm-prev-badge[data-average-rating='0.00']` | `display:none !important` | badge hidden on unreviewed products |
| `.jdgm-rev-widg__title` | `visibility:hidden` | **"Customer Reviews" heading is hidden** |
| `.jdgm-rev-widg__summary-text` | `visibility:hidden` | **"Based on N reviews" is hidden** |
| `.jdgm-prev-badge__text` | `visibility:hidden` | **"N reviews" text next to PDP stars is hidden** |
| `.jdgm-author-all-initials`, `.jdgm-author-last-initial` | `display:none !important` | full author names shown |
| `.jdgm-preview-badge[data-template="product" \| "collection" \| "index"]` | `display:none !important` | only `manual-installation` badges survive |
| `.jdgm-review-widget[data-from-snippet="true"]` (+ 5 sibling rules) | `display:none !important` | snippet-injected duplicates suppressed |
| `.jdgm-rev__transparency-badge[data-badge-type=…]` × 7 types | `display:none !important` | all provenance badges hidden |
| `.jdgm-rev__pics .jdgm-rev__product-picture` (both breakpoints) | `display:none` | product thumbnail in review pics hidden |
| `.jdgm-rev__prod-link-prefix:before` | `content:'about'` | |
| `.jdgm-rev__variant-label:before` | `content:'Variant: '` | |
| `.jdgm-full-rev__replier::before` | `content:'Siwa Fragrances'` | shop reply byline |

**Net visual result:** the PDP review section renders with *no heading and no "Based on N reviews"
line* — only a gold star row, a black histogram, and the review list. Any rebuild that re-enables
those elements will visibly diverge from the reference.

---

## 2. AGGREGATE METRICS

### 2.1 Attributable totals across all 56 PDPs

Derived by summing `data-number-of-reviews` across all **56** real PDP captures.

| Metric | Value |
|---|---|
| Products with ≥1 review | **54** |
| Products with 0 reviews | **2** — `soiree`, `sundaze` (both recently created) |
| Total attributable reviews | **820** |
| Count-weighted average | **4.9807 ★** |
| Average recomputed from summed histograms | **4.98049 ★** — (804×5 + 16×4) / 820 |
| Coverage vs 56-product catalogue | **96.4 %** of SKUs |
| Coverage vs Judge.me's shop-declared 1,176 | **69.7 %** — see §2.3 for the 356-review gap |

The two averages differ by 0.0002 — pure rounding in Judge.me's per-product `data-average-rating`
(2 dp). The histogram-derived figure is the exact one, and the per-product histograms sum exactly
to each product's `data-number-of-reviews` on all 56 pages (verified: zero discrepancies).

### 2.2 Distribution across the 54 reviewed products

| Average rating | Products | Handles |
|---|---|---|
| Exactly **5.00** | **41** (75.9 %) | all except the 13 below |
| 4.99 | 1 | `mawj` |
| 4.98 | 1 | `hibiscusex` |
| 4.97 | 1 | `boujee-blush` |
| 4.96 | 2 | `alluring-rose`, `lady-killer` |
| 4.95 | 2 | `bare-glow`, `caramel-vanigliato` |
| 4.94 | 2 | `coco-woods`, `irresistible-vanilla` |
| 4.92 | 2 | `hot-vanilla`, `lagoon-flair` |
| 4.80 | 1 | `insane-pineapple` |
| 4.78 | 1 | `luna-di-roma` |
| < 4.70 | **0** | — |

Lowest-rated product in the entire catalogue: **`luna-di-roma` at 4.78** (9 reviews: 7×5★, 2×4★).
Only two products sit below 4.90.

Review-count distribution (n = 54; mean 15.2, median 9):

| Reviews per product | Products | Share of products | Reviews |
|---|---|---|---|
| 1 | 3 | 5.6 % | 3 |
| 2–4 | 9 | 16.7 % | 28 |
| 5–9 | 17 | 31.5 % | 118 |
| 10–19 | 14 | 25.9 % | 187 |
| 20–49 | 7 | 13.0 % | 203 |
| 50+ | 4 | 7.4 % | 281 |

Concentration:

| Cohort | Reviews | Share of 820 |
|---|---|---|
| Top 1 (`layering-vanilla`) | 98 | **12.0 %** |
| **Top 5** (`layering-vanilla`, `mawj`, `boujee-blush`, `hibiscusex`, `drunk-gold`) | **327** | **39.9 %** |
| Top 10 | 464 | 56.6 % |
| Bottom 15 (≤5 reviews each) | 46 | 5.6 % |

Social proof is heavily concentrated but less so than the partial capture suggested: five SKUs carry
40 % of all attributable reviews, ten carry 57 %. **Note that the four highest-volume products
(`layering-vanilla` 98, `mawj` 68, `hibiscusex` 56, `caramel-vanigliato` 43) were all mis-recorded as
zero in the first capture pass** — the earlier "top 5" list was an artefact of which pages happened
to load.

### 2.3 Store-wide picture and the 356-review gap

Two independent sources describe review volume; both are now fully recovered.

**(a) Judge.me's own shop aggregate** — byte-identical on all **56** PDPs, the homepage and the
collection pages:

| Attribute | Value | Location |
|---|---|---|
| `data-shop-average-rating` | **`4.98`** | review-widget root |
| `data-shop-review-count` | **`1176`** | review-widget root |
| `data-shop-reviews-count` | `222` | review-widget root (shop-level, not product-level, reviews) |
| `shop_aggregates.reviewCount` | `1176` | homepage carousel init script |
| `const averageRating` | `4.98` | homepage carousel init script |
| Carousel header, rendered | `4.98 ★ (1176)` | `pages/index.html` |

**(b) Theme-rendered rating metafields on product cards.** Prestige renders
`<span class="rating-badge" title="N reviews">` + `aria-label="X out of 5.0 stars"` from the
`reviews.rating` / `reviews.rating_count` metafields Judge.me writes. These appear on collection
pages, the homepage carousels and PDP related-product rails. Harvesting every `<product-card>`
across all captured HTML recovers **38 handles** with card-level rating data.

**Cross-validation result: every one of the 38 card counts matches its product's PDP
`data-number-of-reviews` exactly — zero discrepancies.** (The card `aria-label` is rounded to
1 dp, so it cannot resolve 4.94 vs 4.95, but the counts are exact.) The theme metafield and the
Judge.me widget are therefore in sync, which matters for the rebuild: a Liquid-rendered rating badge
can be driven from `product.metafields.reviews.*` without a Judge.me JS round-trip, and it will not
drift from the widget.

**The 356-review gap.** Reconciling the two sources:

| Metric | Value |
|---|---|
| Judge.me shop-declared total | **1,176** at **4.98 ★** |
| Attributable to the 56 published products (sum of PDP `data-number-of-reviews`) | **820** at **4.9807 ★** |
| **Unattributed** | **356** — 30.3 % of all reviews |
| `data-shop-reviews-count` (shop-level, not product-level) | 222 |

The gap is **not** a capture artefact — all 56 published PDPs are now captured and their counts are
verified against the theme metafields. It is **review equity stranded on products that are no longer
published**:

- `raw/meta.json` reports `published_products_count: 56`, and both `raw/products.json` and
  `sitemap_products_1.xml` list exactly those same 56 handles — so 56 is the complete *published*
  catalogue, with no capture shortfall to absorb the difference.
- `raw/collections.json` reports collection `products_count` values that are impossible against 56
  published products (`for-him` 83, `perfumes` 82, `for-her` 80, `unisex` 50; 498 across 19
  collections). Those counts include unpublished/draft members, evidencing **substantial delisted
  inventory** — see `04-PRODUCTS.md` and `00-OVERVIEW.md` §8 point 6.
- Judge.me retains reviews for products removed from the storefront; they keep counting toward
  `data-shop-review-count` but attach to no live product page.
- A further slice is the **222** `data-shop-reviews-count` — reviews written about the *shop* rather
  than any product, which also roll into the 1,176 but have no PDP to appear on.

**Migration consequence:** any rebuild that iterates published products and copies their reviews
will carry **820 of 1,176** and silently lose **356** — and the storefront-wide "4.98 ★ (1176)"
badge that the homepage carousel renders would then be unsupportable. Export the Judge.me review
corpus at the *shop* level, not per published product, and decide deliberately what to do with the
orphaned 356.

**Rating floor.** Across all 820 attributable reviews the lowest per-product average is **4.78**
(`luna-di-roma`) and the lowest individual rating anywhere in the captured histograms is **4★**
(§4.1). No 1–3★ review exists on any published product.

**Correct figures to carry into the rebuild: 1,176 shop-wide reviews at 4.98 ★, of which 820 are
attributable across 54 of 56 products at 4.9807 ★.**

---

## 3. PER-PRODUCT REVIEW TABLE (all 54 reviewed products — complete)

Re-derived from all 56 PDP captures. Histogram values are Judge.me's exact `data-frequency`
attributes parsed from `jdgm-histogram__row`; averages and counts are the `jdgm-prev-badge`
`data-average-rating` / `data-number-of-reviews` attributes. "On page" = review bodies
server-rendered in page 1 of the widget (capped at 5 by `pagination: 5`). Sorted by review count
descending. **Coverage: 56 of 56 products, 100 %** — every product exposes a full 5-row histogram,
and every histogram sums exactly to its product's declared review count.

| # | Handle | Title | Avg ★ | Count | 5★ | 4★ | 3★ | 2★ | 1★ | On page |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `layering-vanilla` | Layering Vanilla | 5.00 | 98 | 98 | 0 | 0 | 0 | 0 | 5 |
| 2 | `mawj` | Mawj | 4.99 | 68 | 67 | 1 | 0 | 0 | 0 | 5 |
| 3 | `boujee-blush` | Boujee Blush | 4.97 | 59 | 57 | 2 | 0 | 0 | 0 | 5 |
| 4 | `hibiscusex` | Hibiscusex | 4.98 | 56 | 55 | 1 | 0 | 0 | 0 | 5 |
| 5 | `drunk-gold` | Drunk Gold | 5.00 | 46 | 46 | 0 | 0 | 0 | 0 | 5 |
| 6 | `caramel-vanigliato` | Caramel vanigliato | 4.95 | 43 | 41 | 2 | 0 | 0 | 0 | 5 |
| 7 | `lady-killer` | Lady killer | 4.96 | 26 | 25 | 1 | 0 | 0 | 0 | 5 |
| 8 | `alluring-rose` | Alluring Rose | 4.96 | 24 | 23 | 1 | 0 | 0 | 0 | 5 |
| 9 | `marasi` | Marasi | 5.00 | 23 | 23 | 0 | 0 | 0 | 0 | 5 |
| 10 | `bare-glow` | Bare Glow | 4.95 | 21 | 20 | 1 | 0 | 0 | 0 | 5 |
| 11 | `citrine` | Citrine | 5.00 | 20 | 20 | 0 | 0 | 0 | 0 | 5 |
| 12 | `bleu-exclusive` | Bleu Exclusive | 5.00 | 19 | 19 | 0 | 0 | 0 | 0 | 5 |
| 13 | `coffee-vanilla` | Coffee Vanilla | 5.00 | 18 | 18 | 0 | 0 | 0 | 0 | 5 |
| 14 | `irresistible-vanilla` | Irresistible Vanilla | 4.94 | 18 | 17 | 1 | 0 | 0 | 0 | 5 |
| 15 | `coco-woods` | Coco Woods | 4.94 | 16 | 15 | 1 | 0 | 0 | 0 | 5 |
| 16 | `pink-allure` | Pink Allure | 5.00 | 14 | 14 | 0 | 0 | 0 | 0 | 5 |
| 17 | `lagoon-flair` | Lagoon Flair | 4.92 | 13 | 12 | 1 | 0 | 0 | 0 | 5 |
| 18 | `silk-vanilla` | Silk Vanilla | 5.00 | 13 | 13 | 0 | 0 | 0 | 0 | 5 |
| 19 | `hot-vanilla` | Hot Vanilla | 4.92 | 12 | 11 | 1 | 0 | 0 | 0 | 5 |
| 20 | `male-elixir` | Male Elixir | 5.00 | 11 | 11 | 0 | 0 | 0 | 0 | 5 |
| 21 | `mango-pineapple` | Mango Pineapple | 5.00 | 11 | 11 | 0 | 0 | 0 | 0 | 5 |
| 22 | `soul-poudree` | Soul Poudree | 5.00 | 11 | 11 | 0 | 0 | 0 | 0 | 5 |
| 23 | `vanilla-bundle` | Vanilla Bundle | 5.00 | 11 | 11 | 0 | 0 | 0 | 0 | 5 |
| 24 | `carnal-trail` | Carnal Trail | 5.00 | 10 | 10 | 0 | 0 | 0 | 0 | 5 |
| 25 | `layering-pistachio` | Layering Pistachio | 5.00 | 10 | 10 | 0 | 0 | 0 | 0 | 5 |
| 26 | `apple-pie` | Apple Pie | 5.00 | 9 | 9 | 0 | 0 | 0 | 0 | 5 |
| 27 | `hot-male` | Hot Male | 5.00 | 9 | 9 | 0 | 0 | 0 | 0 | 5 |
| 28 | `luna-di-roma` | Luna Di Roma | 4.78 | 9 | 7 | 2 | 0 | 0 | 0 | 5 |
| 29 | `aurableu` | Aurableu | 5.00 | 8 | 8 | 0 | 0 | 0 | 0 | 5 |
| 30 | `chocolate-creme` | Chocolate Creme | 5.00 | 8 | 8 | 0 | 0 | 0 | 0 | 5 |
| 31 | `bleu-intense` | Bleu Intense | 5.00 | 7 | 7 | 0 | 0 | 0 | 0 | 5 |
| 32 | `libre-desire` | Libre Desire | 5.00 | 7 | 7 | 0 | 0 | 0 | 0 | 5 |
| 33 | `pacific-elixir` | Pacific Elixir | 5.00 | 7 | 7 | 0 | 0 | 0 | 0 | 5 |
| 34 | `silk-vanilla-body-lotion` | Silk Vanilla Body Lotion | 5.00 | 7 | 7 | 0 | 0 | 0 | 0 | 5 |
| 35 | `summer-holidays` | Summer Holidays | 5.00 | 7 | 7 | 0 | 0 | 0 | 0 | 5 |
| 36 | `sweet-rum` | Sweet Rum | 5.00 | 7 | 7 | 0 | 0 | 0 | 0 | 5 |
| 37 | `gourmet` | Gourmet | 5.00 | 6 | 6 | 0 | 0 | 0 | 0 | 5 |
| 38 | `iris-elixir` | Iris elixir | 5.00 | 6 | 6 | 0 | 0 | 0 | 0 | 5 |
| 39 | `layering-lychee` | Layering Lychee | 5.00 | 6 | 6 | 0 | 0 | 0 | 0 | 5 |
| 40 | `insane-pineapple` | Insane Pineapple | 4.80 | 5 | 4 | 1 | 0 | 0 | 0 | 5 |
| 41 | `marshmallow` | Marshmallow | 5.00 | 5 | 5 | 0 | 0 | 0 | 0 | 5 |
| 42 | `siwa-trail` | Siwa Trail | 5.00 | 5 | 5 | 0 | 0 | 0 | 0 | 5 |
| 43 | `belle-riche` | Belle Riche | 5.00 | 4 | 4 | 0 | 0 | 0 | 0 | 4 |
| 44 | `lost-on-you` | Lost On You | 5.00 | 4 | 4 | 0 | 0 | 0 | 0 | 4 |
| 45 | `marshmallow-bundle` | Marshmallow Bundle | 5.00 | 4 | 4 | 0 | 0 | 0 | 0 | 4 |
| 46 | `pink-arrogance` | Pink Arrogance | 5.00 | 4 | 4 | 0 | 0 | 0 | 0 | 4 |
| 47 | `layering-30-ml-bundle` | Layering bundle | 5.00 | 3 | 3 | 0 | 0 | 0 | 0 | 3 |
| 48 | `stellar-nights` | Stellar Nights | 5.00 | 3 | 3 | 0 | 0 | 0 | 0 | 3 |
| 49 | `absolute-drunk` | Absolute Drunk | 5.00 | 2 | 2 | 0 | 0 | 0 | 0 | 2 |
| 50 | `summer-elegance` | summer elegance | 5.00 | 2 | 2 | 0 | 0 | 0 | 0 | 2 |
| 51 | `vanilla-91` | Vanilla 91 | 5.00 | 2 | 2 | 0 | 0 | 0 | 0 | 2 |
| 52 | `layering-apple` | Layering Apple | 5.00 | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| 53 | `mango-on-woods` | Mango on woods | 5.00 | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| 54 | `sweet-oud` | Sweet Oud | 5.00 | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| — | `soiree` | Soiree | 0.00 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| — | `sundaze` | Sundaze | 0.00 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| | **TOTAL** | | **4.9807** | **820** | **804** | **16** | **0** | **0** | **0** | **241** |

`soiree` and `sundaze` are the only two products with zero reviews; both are recent additions and
both render an empty histogram (all five rows `data-frequency='0'`), which the settings CSS then
hides via `.jdgm-prev-badge[data-average-rating='0.00']{display:none !important}`.

The **241** page-1 bodies are 29.4 % of the 820 attributable reviews and 20.5 % of the 1,176
shop-wide total. All 54 reviewed products contribute at least one body; 42 of them contribute the
full page-1 maximum of 5.

---

## 4. RATING HISTOGRAM ANALYSIS

### 4.1 Store-wide distribution (sum of all 56 per-product histograms)

Re-parsed directly from `jdgm-histogram__row` `data-rating` / `data-frequency` pairs in every one of
the 56 `raw/products/*.html` captures. **Histogram coverage is 56 of 56 products (100 %)** — every
PDP renders the full five-row histogram server-side, including the two zero-review products, so
nothing is estimated or interpolated here.

| Stars | Reviews | Share | Bar |
|---|---|---|---|
| ★★★★★ | **804** | **98.05 %** | `████████████████████████████████████████` |
| ★★★★☆ | **16** | 1.95 % | `▊` |
| ★★★☆☆ | **0** | 0.00 % | |
| ★★☆☆☆ | **0** | 0.00 % | |
| ★☆☆☆☆ | **0** | 0.00 % | |
| | **820** | 100 % | mean **4.98049** |

The 16 4★ ratings are spread over **13 of the 54 reviewed products**:

| Product | 4★ | Total | Product | 4★ | Total |
|---|---|---|---|---|---|
| `boujee-blush` | 2 | 59 | `bare-glow` | 1 | 21 |
| `caramel-vanigliato` | 2 | 43 | `irresistible-vanilla` | 1 | 18 |
| `luna-di-roma` | 2 | 9 | `coco-woods` | 1 | 16 |
| `mawj` | 1 | 68 | `lagoon-flair` | 1 | 13 |
| `hibiscusex` | 1 | 56 | `hot-vanilla` | 1 | 12 |
| `lady-killer` | 1 | 26 | `insane-pineapple` | 1 | 5 |
| `alluring-rose` | 1 | 24 | | | |

**Not one review below 4★ exists anywhere on any published product.** Across 820 ratings the
probability mass below 4★ is exactly zero — the fuller capture more than doubled the corpus
(344 → 820) and did not surface a single 1★, 2★ or 3★.

### 4.2 What this implies — observation, with evidence

This distribution is extreme even by e-commerce standards (typical Shopify beauty stores using
Judge.me publish 3–8 % of reviews at ≤3★). Four mechanisms in the captured data can each contribute;
the evidence does not isolate which dominates, and none of them constitutes wrongdoing.

| # | Mechanism | Evidence in captured data | Assessment |
|---|---|---|---|
| 1 | **Manual pre-publication moderation** | `jdgmSettings.autopublish: false` — every review requires admin approval before it appears | Structurally sufficient to produce a 0 %-below-4★ corpus. This is the single strongest explanatory factor. |
| 2 | **Star selector pre-set to 5** | `widget_rating_preset_default: 5` — the form opens with 5 stars already selected; a reviewer must actively downgrade | Anchoring effect; magnitude unquantifiable here |
| 3 | **Invitation-only sourcing** | 199 of 241 captured bodies (82.6 %) carry `data-badge-type=review_collected_via_store_invitation`; only 42 (17.4 %) are `review_collected_from_store_visitor` | Post-purchase e-mail invites skew positive vs unsolicited traffic. The ratio is stable at 241 bodies as it was at 131 |
| 4 | **Discount-for-review coupon** | A 10 % single-use percentage coupon for `any_review` is fully configured — but the master switch `enable_coupons` is **`false`** at capture time, and `coupon_promo_web_eligible` is `false` | **The coupon is NOT active now.** Whether it was active during the collection window (2025-10-19 → 2026-07-27) is **not determinable from captured data.** `coupon_promo_invited_eligible: true` means invited reviewers remain eligible if the switch is flipped. |
| 5 | **Small sample** | 3 products have exactly 1 review; 12 have ≤4. Median count is 9, mean 15.2 | Small-sample effects fully explain per-product 5.00s but not the *aggregate* absence of any ≤3★ across 820 |

Additional supporting observations:

- **The full capture weakens one earlier inference and strengthens another.** With only 31 products
  visible it looked as though all 5 non-5★ ratings sat on the five highest-volume products. Over all
  54 products the 4★ rate is essentially flat with volume — **1.86 % on products with ≥20 reviews vs
  2.01 % on products with <10** — so dissent is *not* concentrated where samples are largest. That
  removes "small sample" as an explanation for the aggregate and leaves moderation and sourcing as
  the load-bearing factors.
- **The floor is a hard floor, not a thin one.** 820 ratings with zero results below 4★ is a much
  stronger constraint than 344 with zero. Under any plausible unmoderated distribution, 820 draws
  would be expected to produce several ≤3★ reviews.
- The `data-shop-average-rating` of **4.98** across **1,176** store-wide reviews is consistent with the
  820 attributable reviews' 4.9807, so the skew is a property of the store, not of the capture — and
  the 356 unattributed reviews (§2.3) must themselves average ≈4.98 for the shop figure to hold.
- No shop replies exist anywhere (§5.6) — a store that never publicly answers criticism has, in this
  corpus, never had criticism to answer.

**Recommended framing for the rebuild:** treat the 4★-and-above histogram as *the reference store's
current state*, not a target. If the rebuild changes `autopublish` or enables coupons, the
distribution will move and the histogram component must handle 1–3★ bars gracefully — which the
current CSS does (`.jdgm-histogram__bar-content{background-color:#000}` applies to all five rows),
but which has never been exercised in production.

---

## 5. REVIEW CONTENT ANALYSIS

Corpus: **241 review bodies**, server-rendered on page 1 of the review widget across all **54**
reviewed PDPs. This is **29.4 %** of the 820 attributable reviews and **20.5 %** of the 1,176
shop-wide total. Pages 2+ are loaded from `api.judge.me` and were not captured.

### 5.1 Corpus shape

| Metric | Value |
|---|---|
| Reviews with bodies | **241** |
| Products contributing bodies | **54 of 56** (all reviewed products) |
| Rating distribution | **240 × 5★, 1 × 4★** — the single captured 4★ body is `insane-pineapple`, Ahmed Samir, 2025-11-11: `محتاجه ثبات اكتر ومده فوحان اكثر` ("needs more longevity and more projection") |
| Distinct author strings | **148** |
| Anonymous | **83** (34.4 %) |
| Author names in Arabic script | 12 distinct (13 reviews) |
| Review titles | **0** — `widget_show_review_title_input: false`; every `<b class='jdgm-rev__title'>` is empty |
| Location shown | 0 — `widget_review_location_show: false` |
| `data-review-language` | empty on all 241 — Judge.me did **not** language-tag any review |
| Reviews with photos | **5** (2.1 %) — `carnal-trail`, `chocolate-creme`, `coco-woods`, `siwa-trail`, `vanilla-bundle` |
| Reviews with videos | 0 (`jdgm-rev__vids` empty on all 241) |
| Helpful votes | **2 total** across 2 reviews (`insane-pineapple`, `vanilla-bundle`); `widget_thumb: false` so the control is not rendered — these are legacy values |
| Date range | **2025-10-19** → **2026-07-27** (9.3 months) |

Two corrections to the earlier 131-body reading: **review photos do exist** (5 of them) and there is
**one 4★ body in the corpus**. A rebuild must therefore render the review-gallery markup
(`jdgm-rev__pics`, and the `.jdgm-gallery` "See more" affordance the settings CSS configures) —
the earlier conclusion that no review imagery exists was an artefact of the partial capture.

### 5.2 Verification & provenance (recoverable only from hidden DOM attributes)

| Attribute | Value | Count | Share |
|---|---|---|---|
| `data-verified-buyer='true'` | verified purchaser | **218** | 90.5 % |
| `data-verified-buyer='false'` | unverified | 23 | 9.5 % |
| `data-badge-type=review_collected_via_store_invitation` | post-purchase e-mail invite | **199** | 82.6 % |
| `data-badge-type=review_collected_from_store_visitor` | unsolicited on-site | 42 | 17.4 % |

Both ratios are within a percentage point of the 131-body reading, so they are stable properties of
the corpus rather than sampling noise. Both transparency badge types are hidden by the settings CSS
(§1.6), so shoppers see the black "Verified" buyer badge but **not** the invited-vs-organic
distinction.

### 5.3 Language mix

| Segment | Reviews | Share |
|---|---|---|
| Contains Arabic script (ا–ي) | **65** | **27.0 %** |
| Latin script only | 176 | 73.0 % |
| — of which **Arabizi** (Egyptian Arabic in Latin letters / numerals) | **19** | 7.9 % of corpus |
| — of which Egyptian slang loanwords inside English sentences | see §5.4 | — |

The Arabic-script share rose from 24.4 % (131 bodies) to **27.0 %** (241 bodies), and the Arabizi
count nearly tripled to 19 — the bilingual character of the corpus is *more* pronounced in the full
capture, not less. Combined, **35 % of all captured review bodies are Arabic in language even though
100 % of them sit in a `locale: en` widget.**

Judge.me's own `default_reviewer_name_has_non_latin: true` confirms it detected non-Latin reviewer
names, yet `widget_multilingual_sorting_enabled` and `widget_translate_review_content_enabled` are
both `false` and every `data-review-language` is empty — **the store runs a de-facto bilingual
review corpus on a monolingual (`locale: en`) widget with no translation or language filter.**

Verbatim Arabizi examples (Latin letters, Arabic grammar; `7`=ح, `2`=ء, `3`=ع, `5`=خ):

| Body | Product |
|---|---|
| `Ahla scent bgd yareet tenazeloha tani 🩷🩷` | `alluring-rose` |
| `Nzlohaaaa taniiii please 🥹` | `alluring-rose` |
| `Msh tbe3yaaaaaaa😍😍😍😍😍` | `chocolate-creme` |
| `Khateraaa creamyy awyy wl scent tohfaa nfs rehet choco musk mn gher ay scent alcoholic ,perfectttt` | `chocolate-creme` |
| `Bgd tuhfaaa awee w btsbat gedan el notes el fyha kul wahda fyha btban lama thda fl awel btkun coffe w baad kda chocolate w vanilla momayaxen awe w el atomiser tuhfa` | `coffee-vanilla` |
| `7elw awy` | `mango-pineapple` |
| `E3mlolha restock b2aaa` | `pink-allure` |
| `5teeeeeraaaa♥️` | `pink-arrogance` |
| `Tohfffaaaa awe aweee` | `pink-arrogance` |
| `To7faaa` | `bare-glow` |
| `To7fa` | `hot-male` |
| `gamila gda wallahy` | `hot-vanilla` |
| `my favorite helwa gedan w sabta` | `layering-lychee` |
| `very sweet w tuhfa ll summer` | `layering-lychee` |
| `Helwa gedn` | `marasi` |
| `Khatera wallahi it lasts days on clothes and a full day on skin❤️` | `caramel-vanigliato` |
| `Absolutely to7fa the scent is really good and even the hydrate it gives is so deep` | `silk-vanilla-body-lotion` |
| `Really elegent and unique and it lasts forever bgd ♥️` | `siwa-trail` |
| `The scent is so lovely bgd I got so many compliments on it and I'll definitely purchase it again✨.` | `apple-pie` |

### 5.4 Themes (keyword + Arabic-equivalent matching over all 241 bodies)

| Theme | Reviews | Share | Match set |
|---|---|---|---|
| **Longevity / staying power** | **48** | **19.9 %** | `last(s/ing)`, `long-lasting`, `stays`, `hours`, `ثبات/ثابت/تثبت`, `ساع…`, `btsbat` |
| Sweet / gourmand descriptor | **24** | 10.0 % | `sweet`, `vanilla`, `sugar`, `gourmand`, `candy`, `حلو`, `فانيل…` |
| Sillage / projection / strength | 11 | 4.6 % | `projection`, `strong`, `powerful`, `sillage`, `فواح/فوح`, `متفجر` |
| **Restock / stock-out** | **8** | 3.3 % | see §6 |
| Packaging / delivery / service | 7 | 2.9 % | `packaging`, `service`, `atomiser`, `delivery`, `تغليف`, `خدمة` |
| Dupe-vs-original comparison | 7 | 2.9 % | `original`, `og`, `dupe`, `copy`, `تطابق/مطابق`, `نسخ…` |
| Compliments received from others | 6 | 2.5 % | `compliment` |
| Repeat-purchase intent | 5 | 2.1 % | `again`, `Nth time to order`, `تاني` |
| Value / price | 3 | 1.2 % | `price`, `worth`, `سعر`, `قيمة مقابل سعر` |

**Longevity is the dominant purchase driver by a wide margin** — at 19.9 % it is twice the rate of
the next theme, and it nearly doubled in share versus the 131-body reading (11.5 %). The fuller
capture makes this the single clearest content finding: shoppers evaluate these fragrances on
*ثبات* (staying power) before anything else. PDP copy, filters and any future review-highlight
component should lead with it.

**"تحفة / tohfa" is the single most frequent evaluative word in the corpus** — Egyptian slang for
"a masterpiece". It appears in **31 of 241 reviews (12.9 %)** across **15 orthographic variants**:
`تحفه` (11), `تحفة` (8), `تحفههه` (2), `tuhfa` (2), and one each of `To7faaa`, `To7fa`, `to7fa`,
`tohfa`, `tohfaa`, `Tohfffaaaa`, `tuhfaaa`, `tuhfaaaaaaa`, `Touhfaaaaa`, `touhfaaa`, `تووووحفه`.
A further **7** reviews use the `خطير / khateer / 5teer` ("insane/deadly-good") family across 7
distinct spellings (`Khatera`, `Khateraaa`, `5teeeeeraaaa`, `خطيرة`, `خطييييرة`, `خطيرةةة`,
`خطيييييييرررررررر`).

Any rebuild that adds review keyword extraction, search or filtering must be transliteration-aware:
a naive `tohfa` match catches 1 of the 31 occurrences, and an Arabic-only match catches 21 of 31.
Neither script alone is sufficient.

### 5.5 Style metrics

Recomputed over all **241** bodies.

| Metric | Value | (131-body reading) |
|---|---|---|
| Mean body length | **39.7 characters** | 43.4 |
| **Mean word count** | **7.24 words** | 7.79 |
| Median body length | **19 characters** | 22 |
| Median word count | **4 words** | — |
| Shortest | 1 character (`.` — `drunk-gold`, 2026-05-19; 4 more bodies are `.` or `..`) | same |
| Longest | 452 characters (`mango-pineapple`, 2026-07-05) | same |
| Reviews containing ≥1 emoji | **41 (17.0 %)** | 28 (21.4 %) |
| Reviews using elongated spelling (≥3 repeated chars, e.g. `taniiii`, `looooove`) | **31 (12.9 %)** | 21 (16.0 %) |

Every style metric moved *down* with the fuller corpus: the median review is now **4 words / 19
characters**, and both the emoji rate and the elongation rate fell by ~3–4 points. The 131-body
sample over-represented the expressive tail. The corpus is even terser than it first appeared.

Word-count buckets:

| Bucket | Reviews | Share |
|---|---|---|
| 1 word | **62** | 25.7 % |
| 2–5 words | **87** | 36.1 % |
| 6–15 words | 58 | 24.1 % |
| 16–40 words | 30 | 12.4 % |
| 40+ words | 4 | 1.7 % |

**61.8 % of reviews are five words or fewer, and one in four is a single word.** A review card
designed around a 3-line clamp (as the carousel is: `--line-clamp: 3`) will look mostly empty. The
reference widget's list layout handles this; a card-grid rebuild would not. Design the review
component for a one-word body as the *modal* case, not the edge case.

Emoji frequency (by number of reviews containing them):

| Emoji | Reviews | Emoji | Reviews |
|---|---|---|---|
| ❤ (incl. ❤️ / ❤️‍🔥) | **18** | ✨ | 2 |
| ♥ | 6 | 👏 🩷 🥹 🫶 😃 💗 💕 🤪 🥰 🌸 😭 🙏 🏻 | 1 each |
| 🤩 | 5 | | |
| 😍 | 5 | | |
| 🔥 | 3 | | |

Raw glyph counts (a single review often repeats one emoji 5–7×): ❤ 42, 😍 17, 🔥 10, ♥ 9, 🤩 8,
🫶 3, 💗 3. A rebuild must not strip or normalise emoji — they carry a meaningful share of the
sentiment, and repetition is the intensity marker. Note that ❤ appears in 18 reviews but 42 times.

### 5.6 Shop replies

**Zero.** Across all **56** captured PDPs, all **241** `<div class='jdgm-rev__reply'>` blocks are
empty (verified by re-parse). The reply byline is configured (`reply_name_text: "Siwa Fragrances"`,
injected as `.jdgm-full-rev__replier::before{content:'Siwa Fragrances'}`) but has never been used on
any server-rendered review. Reply styling must still be carried over — it is one admin action away
from being visible.

### 5.7 Review volume timeline (241 captured bodies, by month)

| Month | Reviews | | Month | Reviews |
|---|---|---|---|---|
| 2025-10 (from 19th) | 4 | | 2026-03 | 18 |
| 2025-11 | 9 | | 2026-04 | 24 |
| 2025-12 | 12 | | 2026-05 | 24 |
| 2026-01 | 14 | | **2026-06** | **72** |
| 2026-02 | 14 | | 2026-07 (to 27th) | **50** |

The shape holds and sharpens: **2026-06 is the peak month at 72 bodies** and June + July alone
account for **122 of 241 (50.6 %)**. Caveat unchanged: this is *page-1-only* data sorted
`most-recent`, so recent months are structurally over-represented. It is a valid signal of
*recency*, not of true monthly volume — but with 54 products contributing instead of 31, the
recency bias is now uniform across the catalogue rather than concentrated on whichever pages loaded.

### 5.8 Representative verbatim quotes (30)

Drawn from the full **241**-body corpus and re-selected to span all four of the store's
highest-volume products (which the earlier 131-body table could not include at all), both scripts,
both registers, and the full length range. All quotes are public customer reviews on the live
storefront. Reproduced exactly, including spelling, emoji and repetition. Multi-paragraph and
multi-line bodies are shown as consecutive code spans.

| # | Product | Author | Date | ★ | Verified | Review (verbatim) |
|---|---|---|---|---|---|---|
| 1 | Layering Vanilla | Salma Osama | 2026-07-22 | 5★ | ✓ | `بجد تحفه سواء ريحه لثبات للتغليف ١٠ من ١٠` |
| 2 | Layering Vanilla | Nada Nader | 2026-06-27 | 5★ | ✓ | `Love it very warm` |
| 3 | Mawj | محمد ابوعوف | 2026-07-08 | 5★ | ✓ | `جميله جدا و اما تركز فيها تحس فعلا بأجواء البحر و الصيف و بتفضل لفترة طويله من الحاجات المميزة فعلاً` |
| 4 | Mawj | Ramy Magdy | 2026-07-20 | 5★ | ✓ | `Perfect, i got 3 compliments on the 1st day wearing it` |
| 5 | Boujee Blush | Eman Emara | 2026-07-06 | 5★ | ✓ | `I looooooveeeeee ittttt, so sweet and the projection is top notch frrr` |
| 6 | Boujee Blush | Hajar | 2026-07-13 | 5★ | ✓ | `حلوه اوي ثابته اوي و بجد و كمان جربت bare glow جميله اوي بردو و ثبات مش طبيعي` |
| 7 | Hibiscusex | Jana Mohammed | 2026-06-29 | 5★ | ✓ | `Hibiscusex smells amazing with great depth. Although the intial top notes are like a slap in the face, the moment it settles the aroma is very intoxicating. It lasts DAYS on clothes that have even WASHED. Just amazing! I think I just found my new signature scent. <3` |
| 8 | Drunk Gold | Ahmed Hossam | 2026-04-29 | 5★ | ✓ | `A wonderful and long-lasting scent` |
| 9 | Caramel vanigliato | Anonymous | 2026-07-17 | 5★ | ✓ | `Khatera wallahi it lasts days on clothes and a full day on skin❤️` |
| 10 | Caramel vanigliato | Amaal Ahmed | 2026-06-03 | 5★ | ✓ | `الريحة دافية كريمية حاسة الكراميل والفانيلا متوازنين مديني احساس آيس كريم و ثباته بجد حلو جدا حبيته اوي❤️❤️` |
| 11 | Lady killer | Anonymous | 2026-04-03 | 5★ | ✗ | `اشتريت منها و عايز اشتري منها تاني وللأسف آوت أوف ستوك` |
| 12 | Alluring Rose | Israa | 2026-06-06 | 5★ | ✓ | `Ahla scent bgd yareet tenazeloha tani 🩷🩷` |
| 13 | Marasi | Amr Ibrahim | 2026-07-08 | 5★ | ✓ | `رائع ويستحق التجربه` |
| 14 | Citrine | Disha | 2026-06-21 | 5★ | ✗ | `Was amazing..but always sold out..` |
| 15 | Bare Glow | Darin | 2026-07-05 | 5★ | ✓ | `Smells amazing and the vanillia in it is addictive and not the gourmand type , it's so mature and elegant type of way and more creamy than burberry goddess` |
| 16 | Irresistible Vanilla | Saramohamed | 2026-04-22 | 5★ | ✗ | `احلي حاجه أنا شميتها في حياتي البيرفيوم irresistible فعلا بجد يستاهل كل جنيه و ندماني اني مجبتش الفول سايز دي مش هتبقي آخر مره اجيب البيرفيوم دي ان شاء الله` |
| 17 | Irresistible Vanilla | Anonymous | 2026-06-06 | 5★ | ✗ | `حلو اوي اوي انا جبته من الريفيوهات عالموقع مع انهم عالصفحة بتاعت الفيس ماجابوش سيرته بجد مش واخد حقه هادي وانثوي جدا ودافي وحميمي رائع رائع رائع` |
| 18 | Coco Woods | Omar | 2026-06-19 | 5★ | ✓ | `This might be the best fragrance I've used by far, not only that it has got me A LOT of compliments, but it also made feel happier about life for some reason.` `I believe it was worth the 20mins you had me wait till someone showed up at the store Haha.` |
| 19 | Coffee Vanilla | Hanatamer | 2026-07-17 | 5★ | ✗ | `Bgd tuhfaaa awee w btsbat gedan el notes el fyha kul wahda fyha btban lama thda fl awel btkun coffe w baad kda chocolate w vanilla momayaxen awe w el atomiser tuhfa` |
| 20 | Chocolate Creme | Yasmine Hesham | 2026-01-10 | 5★ | ✓ | `Khateraaa creamyy awyy wl scent tohfaa nfs rehet choco musk mn gher ay scent alcoholic ,perfectttt` |
| 21 | Mango Pineapple | Fadi Ghattas | 2026-07-05 | 5★ | ✓ | `Hiiiii siwa` `I ordered last moth Boujee Blush from the website for a friend’s birthday` `And bought mango pineapple from your store this weekend and` `Honestly, this perfume really surprised me. It smells clean, elegant, and lasts for hours without being too strong. I’ve gotten several compliments while wearing it,two of my colleges compliments the smell of mango this morning and it quickly became one of my favorites` `Thank you siwa.` `🤩❤️❤️❤️❤️❤️❤️` |
| 22 | Carnal Trail | Riyadh Ibraheem | 2026-04-12 | 5★ | ✗ | `من السعودية` `اجمل عطر اشتريته من المحل، كل العطور جميلة وثباتها قوي، بس هذا جدا مميز من ناحية الرائحة والثبات، العلب جميلة والتغليف جدا راقي` `الله يوفقكم تجربة جميلة واكيد راح تتكرر` `عقبال ماتفتحون عندنا في الرياض` |
| 23 | Insane Pineapple | Ahmed Samir | 2025-11-11 | 4★ | ✓ | `محتاجه ثبات اكتر ومده فوحان اكثر` |
| 24 | Luna Di Roma | FATIMA ABED | 2026-06-19 | 5★ | ✓ | `It smells soooooo good better than the original and it lasted so long on me` |
| 25 | Iris elixir | Anonymous | 2026-05-28 | 5★ | ✓ | `برفيوم ولا غلطة نسبة تطابق عالية جدا ، ثبات وفوحان ولا أروع` `قيمة مقابل سعر` `بجد برافوو` |
| 26 | Layering Lychee | Sondos Tarek | 2026-07-11 | 5★ | ✓ | `Ten out of ten chefs kiss🤪😍😍💕` |
| 27 | Siwa Trail | حنان سامي | 2026-06-14 | 5★ | ✓ | `عجبني جدا و فوحانه و ثباته رائع لسه ماستخدمتوش كفايه بس جربته اول ما وصلني الريحة كانت فواحة وثابته فترة طويله، بالنسبة للريحة نفسها فهي مش بالظبط الزوق المتعودة عليه لكن عجبني و حسيته ينفع لمناسبة و خررجة بالليل اكتر من النهار شيك جدا بصراحة ، دمتم مميزين و الله ♥️♥️♥️🙏🏻` |
| 28 | Pacific Elixir | Anonymous | 2026-04-14 | 5★ | ✗ | `يا ريت لو يبقي فيه ستوك منه` |
| 29 | Soul Poudree | Radwa Ahmed | 2026-03-31 | 5★ | ✓ | `excellent fragrance that lasts for more than 24 hours. Its scent is fresh, clean, and feminine, smells like luxurious makeup.` |
| 30 | Hot Vanilla | Mahmoud Taymour | 2026-03-02 | 5★ | ✓ | `gamila gda wallahy` |

Additional short-form specimens illustrating the dominant register — this is what a *typical* review
looks like, and roughly a quarter of the corpus is this short:
`FANTASY` (Absolute Drunk), `تحفة` (Apple Pie), `ممتاز` (Stellar Nights), `ممتازة` (Citrine),
`رائع` (Marshmallow), `تحفههه` (Layering Vanilla), `اداء مثالي` (Drunk Gold), `ثبات وفواحه` (Mawj),
`Intoxicating` (Hibiscusex), `Very sexy` (Coco Woods), `The best` (Citrine), `قوية اوي`
(Pacific Elixir), `روعه` (Insane Pineapple), `خطيييييييرررررررر` (Marshmallow Bundle),
`MASTERPIECE ❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥` (Marshmallow Bundle), `Touhfaaaaa` (Libre Desire),
`More than great ❤️❤️❤️❤️ tuhfaaaaaaa` (Gourmet), `5teeeeeraaaa♥️` (Pink Arrogance),
`.` (Drunk Gold, Hot Vanilla ×2, Irresistible Vanilla, Soul Poudree).

**Data-quality note for the migration:** `coco-woods` carries a near-duplicate pair — author `Dalia`,
2026-06-27 and 2026-06-28, identical body text (`It's perfect... a unique scent that gives sweet,
attractive signature`). Both are published and both count toward the product's 16. De-duplicate on
import, or carry the duplication knowingly.

---

## 6. RESTOCK DEMAND SIGNAL

Re-examined across all **241** bodies. The signal is **stronger and broader than the 131-body reading
showed**: 8 pleas (was 5), across **5 products** (was 2), and it now includes two of the store's
`Best Selling`-tagged SKUs.

Every review in the corpus mentioning restock, stock-out or "bring it back":

| # | Product | Handle | Author | Date | Verified | Review (verbatim) |
|---|---|---|---|---|---|---|
| 1 | Alluring Rose | `alluring-rose` | Marvel Raafat | 2026-07-09 | ✓ | `Please make it available again, always getting compliments about it 🤩` |
| 2 | Alluring Rose | `alluring-rose` | Israa | 2026-06-06 | ✓ | `Ahla scent bgd yareet tenazeloha tani 🩷🩷` ("best scent honestly, please bring it back") |
| 3 | Alluring Rose | `alluring-rose` | Anonymous | 2026-05-21 | ✗ | `Nzlohaaaa taniiii please 🥹` ("release it agaaain pleeease") |
| 4 | Alluring Rose | `alluring-rose` | Anonymous | 2026-04-08 | ✗ | `Got many compliments on this pls restock` |
| 5 | **Citrine** | `citrine` | Disha | 2026-06-21 | ✗ | `Was amazing..but always sold out..` |
| 6 | **Lady killer** | `lady-killer` | Anonymous | 2026-04-03 | ✗ | `اشتريت منها و عايز اشتري منها تاني وللأسف آوت أوف ستوك` ("I bought it and want to buy it again but unfortunately it's out of stock") |
| 7 | **Pacific Elixir** | `pacific-elixir` | Anonymous | 2026-04-14 | ✗ | `يا ريت لو يبقي فيه ستوك منه` ("I wish there were stock of it") |
| 8 | Pink Allure | `pink-allure` | Anonymous | 2026-07-16 | ✗ | `E3mlolha restock b2aaa` ("do a restock already") |

Tabulated by product:

| Handle | Title | Restock mentions | Reviews on page 1 | **Share of page-1 reviews that are restock pleas** | Total reviews | Variant availability (`raw/products.json`) | Tags |
|---|---|---|---|---|---|---|---|
| `alluring-rose` | Alluring Rose | **4** | 5 | **80 %** | 24 | **30 ml ✗ · 50 ml ✗ · 100 ml ✗ — fully sold out** | `Women` |
| `citrine` | Citrine | 1 | 5 | 20 % | 20 | **30 ml ✗ · 50 ml ✗ · 100 ml ✗ — fully sold out** | `Best Selling`, `Men` |
| `lady-killer` | Lady killer | 1 | 5 | 20 % | 26 | 30 ml ✓ · 50 ml ✓ · 100 ml ✓ — in stock now | `Best Selling`, `Men` |
| `pacific-elixir` | Pacific Elixir | 1 | 5 | 20 % | 7 | 30 ml ✓ · 50 ml ✓ · 100 ml ✓ — in stock now | `Men`, `Women` |
| `pink-allure` | Pink Allure | 1 | 5 | 20 % | 14 | 30 ml ✓ · 50 ml ✓ · 100 ml ✓ — in stock now | — |
| All others (49) | — | 0 | 216 | 0 % | 729 | — | — |

**Findings**

1. **`alluring-rose` is still the store's single clearest lost-revenue signal.** It is completely
   sold out across all three variants, yet **4 of its 5 most-recent reviews are explicit restock
   requests**, spanning 2026-04-08 → 2026-07-09 — three months of unmet demand still accumulating.
   Two of the four also volunteer that the scent generates compliments, i.e. it drives
   word-of-mouth. It carries 24 reviews at 4.96★ and is tagged only `Women` — it is **not** in
   `Best Selling`.
2. **`citrine` is the finding the partial capture missed entirely.** Its PDP was a Cloudflare page in
   the first pass. It is **fully sold out across all three variants**, carries **20 reviews at a
   perfect 5.00★**, is tagged **`Best Selling`** — and a reviewer states flatly that it is
   *"always sold out"*, i.e. this is a **chronic, repeated** stock-out on a best-seller, not a
   one-off. Alongside `alluring-rose` it is the second unambiguous lost-revenue product.
3. **Three products are in stock now but were out recently** — `lady-killer` (26 reviews, 4.96★,
   `Best Selling`), `pacific-elixir` and `pink-allure`. Each has one customer who used the review
   form to report the stock-out. That the complaints resolve without the review being edited or
   removed means **the review corpus is functioning as an unmanaged back-in-stock queue** and its
   contents go stale silently.
4. **Related latent-demand requests** (not restock, but unmet product demand) worth capturing:
   - `siwa-trail`, Mohamed Ahmed, 2026-01-04: `I hope that youmake 100 ml from it soon` — a
     size-range request. `siwa-trail` currently has no 100 ml variant (and is itself fully sold out).
   - `silk-vanilla`, Anonymous, 2026-05-04: `نفسي اشتري الويب سايت كلوا بجد من كتر حلاوته😭❤️`
     ("I wish I could buy the whole website") — bundle/set upsell signal.
   - `carnal-trail`, Riyadh Ibraheem, 2026-04-12, writing **from Saudi Arabia**:
     `عقبال ماتفتحون عندنا في الرياض` ("hoping you open [a store] here in Riyadh"). The store ships
     to **EG only** (`ships_to_countries: ["EG"]`) — this is a documented international demand signal
     against a single-market storefront.
   - `bleu-intense`, Kareem El oraby, 2026-06-06: `Amazing but needs to be a little fresh to smell
     like the original more` — product-reformulation feedback.
5. **Sold-out state is widespread and is a live UX problem for the rebuild.** Across all 56 products:
   **10 are fully sold out** (carrying **87 reviews** between them — `alluring-rose` 24, `citrine` 20,
   `vanilla-bundle` 11, `bleu-intense` 7, `silk-vanilla-body-lotion` 7, `iris-elixir` 6, `siwa-trail`
   5, `lost-on-you` 4, `absolute-drunk` 2, `sweet-oud` 1) and a further **18 are partially sold out**,
   including the four highest-review products after `layering-vanilla`: `boujee-blush` (59 reviews,
   100 ml ✗), `hibiscusex` (56, 50 ml ✗ + 30 ml ✗), `drunk-gold` (46) and `marasi` (23). A rebuild
   should surface a **back-in-stock notification** on the PDP and on the sold-out variant swatch —
   the review corpus proves customers are currently using the review form as a substitute
   restock-request channel.

Caveat: this analysis covers only the **241 page-1 bodies** (29.4 % of the 820 attributable reviews).
All 56 PDPs are now captured, so there is no longer a blocked-page blind spot — but restock requests
on **pages 2+** of each widget are still **not determinable from captured data**. Eight is a floor,
not a total; scaled naively by the 29.4 % body coverage the true figure is likely ~25–30.

---

## 7. WHAT A REBUILD MUST PRESERVE

### 7.1 Integration points by template

| Template | Judge.me element | Implementation | Mandatory |
|---|---|---|---|
| **All pages** | `judgeme_core` app embed | theme app embed block `shopify://apps/judge-me-reviews/blocks/judgeme_core/61ccd3b1-a9f2-4160-9fe9-4fec8413e5d8` — emits `window.jdgmSettings`, `<style class='jdgm-settings-style'>`, DNS-prefetch and `loader.js` | **Yes** — every other widget is inert without it |
| **product** | Preview badge ×2 | app block `judge_me_reviews_preview_badge`, appended as the **last block** of each `product-info` block stack (desktop + mobile) | **Yes** |
| **product** | Review widget | app block `judge_me_reviews_review_widget` inside a dedicated `shopify-section--apps` section placed **between `main-product` and `related-products`** | **Yes** |
| **index** | Testimonials carousel | app block `judge_me_reviews_testimonials_carousel` inside a `shopify-section--apps` section at **DOM position 10** (after `featured-collections-2`, before `scrolling-content-2`) | **Yes** |
| **index** | Empty apps section (pos. 15) | `<section class="shopify-section shopify-section--apps"></section>` with no block — vestigial | No — safe to drop |
| **collection / index / search / related rails** | Star rating on product cards | **Theme-native**, NOT a Judge.me widget — Prestige `<span class="rating-badge">` reading `product.metafields.reviews.rating` / `.rating_count` | **Yes** |
| **all-reviews page** | — | Not installed (`all_reviews_text_install_preference: false`) | No |
| **cart / other** | Popup, floating tab, medals, snippet widget, verified-count badge | All disabled | No |

### 7.2 Product-card rating badge (theme-side, must be rebuilt in Liquid)

Exact reference markup:

```html
<span class="rating-badge" title="2 reviews">
  <div class="rating-badge__stars" role="img" aria-label="5.0 out of 5.0 stars">
    <svg aria-hidden="true" focusable="false" width="12" class="icon icon-star-rating" viewBox="0 0 12 11">
      <path d="M6 0v8.635L2.292 11 3.48 6.87 0 4.202l4.443-.187L6 0Zm0 0v8.635L9.708 11 8.52 6.87 12 4.202l-4.443-.187L6 0Z" fill="#ffd700"/>
    </svg>
    <!-- ×5 -->
  </div>
  <span class="smallcaps text-xxs text-subdued">(5.0)</span>
</span>
```

| Property | Value |
|---|---|
| Star fill | `#ffd700` = `255 215 0` (theme `--star-color`) |
| Star SVG width | `12` px, `viewBox="0 0 12 11"` |
| Path | dual-subpath star (left half + right half) enabling half-star fill |
| Count label | `title="N reviews"` attribute (tooltip only, not visible text) |
| Visible label | `(X.X)` — average to **1 decimal**, `.smallcaps.text-xxs.text-subdued` |
| a11y | `role="img"` + `aria-label="X out of 5.0 stars"` |
| Placement | after `.product-card__info`, inside `<product-card>` |
| Data source | `product.metafields.reviews.rating` (`rating` type) and `product.metafields.reviews.rating_count` — written by Judge.me, read by the theme |

Rebuild requirement: the theme must continue to read the `reviews.rating` / `reviews.rating_count`
metafield namespace. If those metafields are lost in migration, **every product card across the
homepage, all 19 collection pages and the related-product rails loses its stars**, independently of
whether the Judge.me app blocks are re-added.

### 7.3 Visual contract checklist

| Must reproduce | Value |
|---|---|
| Widget max-width | `1200px`, `margin: 0 auto` |
| Section wrapper | `.color-scheme--scheme-1` + `.section-spacing` + `.bordered-section` + `.container` |
| `--jdgm-primary-color` / `--jdgm-secondary-color` | `#000` / `#fff` |
| `--jdgm-star-color` | `gold` (`#FFD700`, `255 215 0`) |
| `--jdgm-border-radius` | `0` (must match theme `--button-border-radius: 0.0rem`) |
| `--jdgm-write-review-bg-color` / text | `#000000` / `white` |
| Histogram bar fill | `#000` (`0 0 0`) — **black, not gold** |
| Verified buyer badge | white text on `#000` |
| Widget title `Customer Reviews` | **hidden** (`visibility:hidden`) |
| Summary text `Based on N reviews` | **hidden** (`visibility:hidden`) |
| Preview-badge count text | **hidden** (`visibility:hidden`) — only stars visible on the PDP |
| Preview badge on 0-review products | hidden (`[data-average-rating='0.00']{display:none}`) |
| Transparency badges (all 7 types) | hidden |
| Pagination | numbered, `5` per page, `data-url='https://api.judge.me/reviews/reviews_for_widget'` |
| Sort | `most-recent` |
| Carousel heading | `<h2 class="jdgm-title">Customers are saying</h2>` + `4.98 ★ (1176)` + `Verified` |
| Carousel tokens | `--card-color:#f9f9f9`, `--stars-color:#ffd700`, `--text-size:24px/20px`, `--line-clamp:3/4`, `--max-width:1200px` |

### 7.4 Settings that must be carried across (not defaults)

`pagination: 5` · `autopublish: false` · `widget_show_histogram: true` ·
`widget_rating_preset_default: 5` · `widget_show_review_title_input: false` ·
`enable_review_pictures: true` · `enable_review_videos: false` · `enable_question_anwser: false` ·
`widget_thumb: false` · `widget_social_share: false` · `widget_review_location_show: false` ·
`review_widget_revamp_enabled: false` (legacy widget) · `all_reviews_widget_v2025_enabled: false` ·
all five `transparency_badges_*: false` · `reply_name_text: "Siwa Fragrances"` ·
coupon block (`enable_coupons: false`, `coupon_value_percentage: 10`, `coupon_receiving_condition: any_review`).

### 7.5 Defects to fix rather than replicate

| # | Defect | Evidence | Fix |
|---|---|---|---|
| 1 | **No `aggregateRating` structured data.** Zero star rich-snippet eligibility despite **1,176** shop-wide reviews at 4.98★ (820 attributable across 54 products at 4.9807★). | `remove_microdata_snippet: true`, `enable_json_ld_products: false`; **re-verified across all 56 PDPs: `aggregateRating` occurrences = 0, `ratingValue` occurrences = 0.** The only JSON-LD emitted is `ProductGroup` + `BreadcrumbList` (56/56) | Emit `aggregateRating` in the theme's own Product/ProductGroup JSON-LD from the `reviews.rating` metafields (theme-side, avoids duplicate-schema conflicts with the app) |
| 2 | **Bilingual corpus on a monolingual widget.** 27.0 % of captured bodies are Arabic-script plus a further 7.9 % Arabizi — 35 % of the corpus; no language tagging, sorting or filtering. | all `data-review-language=''`; `widget_multilingual_sorting_enabled: false` | Enable Judge.me multilingual sorting, or add a client-side script/Latin toggle |
| 3 | **Review count invisible on the PDP.** `.jdgm-prev-badge__text` and `.jdgm-rev-widg__summary-text` are both `visibility:hidden` — a shopper sees five gold stars with no "59 reviews" anchor. | settings CSS §1.6 | Deliberate design choice; flag to the client. Restoring the count is the single highest-leverage social-proof change and costs one CSS rule. |
| 4 | **Restock demand routed through the review form.** 8 reviews across 5 products are restock/stock-out pleas; `alluring-rose` (24 reviews) and `citrine` (20 reviews, `Best Selling`) are both fully sold out. 10 products are fully sold out, carrying 87 reviews. | §6 | Add a back-in-stock notification form to the PDP for unavailable variants |
| 5 | **No shop replies ever published.** Reply markup and byline are configured but unused. | §5.6 | Preserve reply styling; recommend the client start replying |
| 6 | **Vestigial empty apps section** on the homepage (`…__17765002303c384e0a`) renders an empty `<section>`. | `pages/index.html` | Remove from the new `index.json` |
| 7 | **Snippet-widget CSS shipped on every page** for a widget that is never rendered (`--jdgm-snippet-*` tokens + ~15 rules). | §1.6 | Dead weight; disable the snippet widget in Judge.me admin |

---

## 8. SOURCE TRACE

| Claim group | Derived from |
|---|---|
| §1 platform, app-block ids, asset URLs, DOM placement | `raw/products/boujee-blush.html`, `raw/pages/index.html`, `raw/pages/collections_all.html` |
| §1.5 `jdgmSettings` (598 keys) | `window.jdgmSettings` inline in `raw/products/boujee-blush.html` (identical on all 56 PDPs) |
| §1.6 CSS tokens & rules | `<style class='jdgm-settings-style'>` in the same file |
| §2.1–2.2, §3, §4.1 | `data-average-rating`, `data-number-of-reviews`, `.jdgm-histogram__row[data-rating][data-frequency]` re-parsed from **all 56** `raw/products/*.html` (post-recovery). Per-product histograms sum exactly to each `data-number-of-reviews`; per-product avg/count match `raw/reviews_complete.json` on all 54 reviewed handles with zero discrepancies |
| §2.3 store-wide totals & 356 gap | `data-shop-review-count` / `data-shop-average-rating` on the widget root (identical across all 56 PDPs); `<span class="rating-badge" title="N reviews">` harvested from every `<product-card>` in `raw/pages/*.html` + `raw/products/*.html` (38 handles, all matching their PDP counts exactly); `raw/meta.json` `published_products_count`; `raw/collections.json` `products_count`; `raw/sitemap_products_1.xml` |
| §5 content analysis (**241 bodies**) | `.jdgm-rev` blocks re-parsed from **all 56** PDPs; extraction reproduces `raw/reviews_complete.json` → `bodies[]` exactly (241/241 product+author+text triples match) — `data-verified-buyer`, `data-review-id`, `data-score`, `.jdgm-rev__timestamp[data-content]`, `.jdgm-rev__author`, `.jdgm-rev__title`, `.jdgm-rev__body`, `.jdgm-rev__transparency-badge[data-badge-type]`. Bodies match `raw/reviews_extracted.json`; dates, verified flags, badge types and empty titles are **new** (absent from that file). |
| §6 availability cross-reference | `raw/products.json` → `variants[].available` |
| §7.2 card markup | `raw/pages/collections_all.html` |
| §7.5 defect 1 | `aggregateRating` / `ratingValue` string search + JSON-LD `@type` census across all 56 `raw/products/*.html` |
| Unusable | `raw/jdgm_settings.json` (404 page), `raw/jdgm_all.json` (0 bytes), `raw/products/*.js.json` (~25 still bot-challenge responses — **not** re-fetched; use `raw/products.json` instead). **`raw/products/*.html` is fully usable: 56/56 recovered.** |
