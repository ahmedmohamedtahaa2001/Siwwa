# Siwa Fragrances — Market Research, Gap Analysis and Redesign Blueprint

**Prepared:** 24 August 2026
**Market set:** 16 authentic/original and inspired-by fragrance retailers
**Store evidence:** Siwa public Shopify snapshot in this folder

## Executive decision

Siwa's first redesign should not begin with a new visual theme. It should begin with a trustworthy fragrance data layer and a mobile product page that answers six questions immediately:

1. What is this Siwa scent?
2. Is it an original creation or inspired by another scent?
3. What will it smell and feel like?
4. Which size is available and what value am I receiving?
5. When will it arrive, how can I pay, and what is the sealed-product return policy?
6. What evidence supports quality, performance, and customer satisfaction?

The strongest strategic position for Siwa is **Egypt's bilingual, climate-aware scent decision system**: ownable Siwa names and stories, transparent inspiration disclosure, Arabic/English discovery, hot-climate wear guidance, samples that learn customer preferences, and explainable layering and wardrobe recommendations.

## Research method and limits

“Market leader” means a high-scale, mature, or especially instructive benchmark, not a verified revenue or conversion ranking. Private conversion rates are not public, and retailer scale statements are self-reported unless stated otherwise. The research inspected official storefront, product, category, about, guarantee, shipping, returns, and discovery pages as available on the research date.

The authentic/original group covers Sephora, Ulta, FragranceNet, FragranceX, Notino, Faces, and Ounass. The inspired-by group covers Dossier, ALT. Fragrances, Oakcha, The Essence Vault, Noted Aromas, DIVAIN, Oil Perfumery, Perfume Parlour, and Generic Perfumes Kuwait.

Full evidence and direct links are in `research-original-leaders.md` and `research-inspired-leaders.md`.

## What makes the benchmark stores leaders

| Leadership mechanism | Strong examples | Why it supports conversion | Siwa application |
|---|---|---|---|
| Decision compression | Sephora, Ulta, Dossier | Product truth, reviews, variants, delivery, and CTA appear together | Rebuild the mobile purchase zone around the six questions above |
| Familiar reference | DIVAIN, Dossier, ALT | Converts an unknown house scent into a known starting point | Searchable, clearly labeled `Inspired by`, with Siwa name visually primary |
| Structured scent education | Notino, Faces, Dossier | Makes an invisible product understandable | Family, accords, visual note pyramid, mood, occasion, and plain-language hook |
| Concrete trust proof | FragranceNet, FragranceX | Operating history, sourcing, QA, fulfillment, and returns beat generic badges | Publish formulation/QA process, precise policy, support channel, and claim evidence |
| Low-risk trial | DIVAIN, Essence Vault | Samples and credit reduce blind-buy anxiety without making opened full bottles returnable | 2–5 ml discovery path with optional full-bottle credit and wear diary; full bottles are returnable only when sealed and unused |
| Variant/value clarity | FragranceX, Ulta, Essence Vault | Every size/format has an identity, price, stock state, and reason | Unique SKU per variant, unit price, stock/dispatch state, no ambiguous options |
| Review intelligence | Oakcha, Ulta | Review facets answer similarity, longevity, use, and caveats | Verified, variant-linked review prompts and balanced summaries |
| Assortment navigation | Ounass, Sephora | Rich filters turn catalog breadth into usable choice | Family, notes, intensity, climate, season, occasion, size, and status filters |
| Bundle ladder | Essence Vault, Noted Aromas | Moves shoppers from trial to wardrobe and raises AOV | Sample pack → travel set → mix-and-match full size → gift wardrobe |
| Ownable equity | Dossier Originals, Oakcha Signature, Noted | Prevents the business from being only a dupe index | Siwa name, story, packaging, originals, and creative system remain primary |
| Regional relevance | Faces, Ounass, Generic Perfumes | Local payments, language, delivery, and scent culture matter | Arabic/English, EGP, COD/payment clarity, Egyptian climate, oud/musk vocabulary |

The shared engine is: **recognition → scent confidence → quality proof → low-risk trial → clear purchase promise → bundle/retention loop**.

## Current Siwa baseline

| Measure | Current evidence | Risk |
|---|---:|---|
| Products / variants | 61 / 173 | Manageable catalog, but data debt already material |
| Blank product types | 60 of 61 | Category, feed, filtering, and analytics failure |
| Blank SKUs | 59 of 173 | Weak sellable-unit identity |
| Unique populated SKUs | 42 of 114 | 110 variants sit in duplicate-SKU groups |
| Unavailable variants | 45 of 173 (26%) | Lost demand without strong recovery paths |
| One-image products | 55 of 61 (90%) | Low confidence for a sensory/premium product |
| Option-name forms | 10 | Broken normalization and confusing variant UX |
| Useful tags | Six shallow groups | Cannot power scent-led discovery |
| Real compare-at prices | 19 variants across 4 products | Discount claims require careful normalization |

Existing strengths include local EGP pricing, free-shipping messaging, men/women/unisex/original/bundle entry points, best-seller and seasonal merchandising, card ratings, cart/account/newsletter functionality, and a functioning Shopify commerce base.

## Gap matrix

| Area | Benchmark standard | Siwa gap | Required response | Priority |
|---|---|---|---|---|
| Brand identity | Manufacturer/store brand is separate from reference scent | `vendor` often contains the referenced perfume and brand | Set brand to Siwa; model inspiration as its own reviewed entity | P0 |
| Variant identity | Every size/format has unique SKU/identifier | Missing and reused SKUs | Assign stable unique SKU to all 173 variants | P0 |
| Taxonomy | Typed category, family, notes, format, audience | Product type almost universally blank; shallow tags | Controlled vocabularies and typed Shopify metafields | P0 |
| Variant UX | Normal size/format values, price, availability | Ten option labels; mixed `ml` strings and bundle text | Standard `Size`; numeric volume; separate bundle components | P0 |
| Pricing truth | Real RRP/compare price; like-for-like comparison | Zeros and sparse genuine compare-at values | Store null when absent; source/date any reference comparison | P0 |
| Product card | Own name, scent clue, notes/family, proof, price | Vendor may confuse; scent data unavailable | New card hierarchy with inspired badge and note chips | P1 |
| Product page | Rich gallery and decision-ready purchase zone | Mostly one image; prose varies | Standard gallery and PDP content contract | P1 |
| Discovery | Search by brand/reference/note/mood and rich filters | Search plus price/availability filters | Arabic/English aliases, scent filters, explainable result reasons | P1 |
| Trial | Samples, discovery kits, credits | No evidenced systematic trial path | Launch sample set and redeemable credit pilot | P1 |
| Fulfillment trust | ETA, confirmed payment methods, stock, and sealed-only returns at CTA | Claims exist but support and detail are remote/vague | Exact local promise, sealed/unopened return rule, and direct WhatsApp/support beside CTA | P1 |
| Reviews | Counts, distributions, verified status, facets | Very high aggregate impression but limited detail | Variant-linked, verified, balanced review model | P1 |
| Stock recovery | Notify, restock estimate, alternatives | 26% unavailable variants | Back-in-stock plus close alternatives and other sizes | P1 |
| Recommendation | Explainable similarity/layering based on attributes | Generic collection/bundle paths | Structured related, complementary, and layering links | P2 |
| Localization | Regional language, payments, climate, culture | Local currency but no evidenced bilingual scent graph | Arabic/English vocabulary and Desert Climate Mode | P2 |
| Measurement | Events across discovery and funnel | Analytics not included in audit | GA4/Shopify event and experiment framework | P0 before tests |

## Target positioning and value proposition

Recommended core proposition:

> **Find your scent for real Egyptian life.** Explore Siwa originals and transparent interpretations by notes, mood, occasion, and climate—then try before committing.

Supporting proof pillars:

- Siwa name and craft first; inspiration is transparent comparison metadata.
- Bilingual guidance that works for beginners and fragrance enthusiasts.
- Climate-aware expectations instead of universal longevity hype.
- Sample-first buying with credit toward the chosen bottle.
- Full product truth: concentration, ingredients, size, unit value, availability, delivery, and explicit sealed/unopened return eligibility.

Do not position around “cheap copies.” Compete on accessible creative fragrance, decision confidence, local relevance, and transparent value.

## Information architecture

### Primary navigation

- Shop All
- Originals
- Inspired Interpretations
- Find Your Scent
- Discovery Sets
- Bundles & Layering
- Body & Home
- Gifts

Use men/women/unisex as filters and curated landing routes, not the only model of discovery.

### Collections and filters

Start with no more than 8–12 high-value visible filters even though Shopify supports more:

- Product type/status: original, inspired, body, bundle
- Fragrance family
- Dominant note
- Mood/character
- Occasion
- Season/climate fit
- Intensity/projection
- Size
- Audience expression
- Price and availability

Use controlled metaobjects for notes/families so Arabic and English labels, imagery, descriptions, aliases, and landing links remain consistent.

## Product card blueprint

1. Decision-useful hero image.
2. Badge: Original Creation, Inspired Interpretation, Best Seller, New, or Limited.
3. Siwa product name.
4. Clearly secondary “Inspired by [reference]” when applicable.
5. Scent family and up to three dominant note chips.
6. One mood/context line, such as “warm amber for cool evenings.”
7. Rating and review count.
8. Starting price, normalized size, stock state, and quick add/choose size.

On tap/hover, reveal “why it fits” and performance context, not merely a second bottle angle.

## Mobile-first product page blueprint

### First viewport and purchase zone

1. Gallery: packshot, packaging, hand/scale, atomizer/detail, note visual, lifestyle/video.
2. Status badge, Siwa name, inspiration line, and one-sentence sensory promise.
3. Rating count and recommendation percentage.
4. Variant cards with size, format, price, price/ml, and exact availability.
5. Delivery date/range, free-shipping progress toward `[FREE_SHIPPING_THRESHOLD]`, confirmed payment methods, and sealed/unopened return eligibility. The threshold and payment methods must be approved by the business owner using margin, AOV, and operations data; do not display unconfirmed methods.
6. One dominant Add to Cart CTA plus a visible sample option.
7. Four proof chips: concentration, formulation/origin, community performance, and sealed/unopened return policy. Opened or used full bottles are never returnable.
8. Sticky CTA on mobile after the main control scrolls away.

### Below the fold

- Visual opening/heart/dry-down note story.
- Scent Compass profile and “best for” chips.
- Climate and spray guidance with methodology/caveat.
- Structured “matches / differs” original-profile comparison with sourced, dated evidence and legal review.
- Ingredients, allergens, warnings, use, and storage.
- Verified reviews with similarity, longevity, projection, season, occasion, skin/fabric, and city/climate facets.
- “Similar, but fresher/less sweet/stronger” alternatives.
- Layering partners and bundle builder.
- Shipping, sealed/unopened returns, FAQ, support, and brand story.

## Target product data architecture

Use [product-schema-v2.json](./product-schema-v2.json) as the commerce contract. The implementation layers should be:

| Layer | Role |
|---|---|
| Shopify product | Ownable Siwa product identity, lifecycle, description, collection membership |
| Shopify variant | Every sellable size/format with unique SKU, normalized volume, price, stock, barcode, weight |
| Typed product metafields | Product type, inspiration status, olfactory profile, wear context, formulation, claims |
| Metaobjects | Canonical notes, families, reference fragrances, claim evidence, bundles, translations |
| Review system | Verified observation data linked to product and purchased variant |
| Validation/export | Cross-record SKU uniqueness, completeness, controlled terms, feed and JSON-LD validation |

The old `product-schema.json` is directionally useful but should be replaced for implementation by v2 because it hard-codes EGP into field names, leaves core discovery properties optional, lacks localization, claim provenance, bundle components, lifecycle, inventory policy, review distribution, and cross-record validation requirements.

### Required governance rules

- `brand = Siwa Fragrances` for Siwa-manufactured/private-label products.
- Inspiration is null for originals and a structured, legally reviewed object otherwise.
- Every sellable variant has a stable unique SKU; SKU uniqueness needs application-level validation.
- Prices use amount + ISO currency; absent compare-at price is null, never zero.
- Reference price comparisons store source, size, concentration, currency, and checked date.
- Performance claims store method, date, batch/sample, reviewer, and confidence; community observations remain separately labeled.
- Product claims and review-derived observations must never be merged silently.
- Arabic and English aliases live on canonical entities, not as uncontrolled tags.
- Bundle components reference real variant IDs and quantities.
- JSON-LD and Merchant feeds must match visible price, availability, identifiers, ratings, and brand.

Google requires unique variant identifiers in product-variant markup and clear product-group identity. Merchant data should use the actual product brand and correct identifiers; do not use the referenced designer brand as Siwa's brand or invent GTINs.

## Confirmed commercial-policy rules and configurable values

These rules override any benchmark practice or earlier recommendation:

- **No opened-bottle returns:** a full perfume bottle is eligible for return only when sealed, unopened, unused, and otherwise compliant with the confirmed return window. Opened or used bottles are never returnable because the customer changed their mind or disliked the scent.
- **Confirmed payment methods only:** publish only pay-in-full methods that the business owner confirms as currently operational.
- **Payment methods require confirmation:** display only methods the business owner confirms as operational. Candidate methods such as cash on delivery, card, Vodafone Cash, or InstaPay are examples—not approved facts.
- **Free shipping is configurable:** use `[FREE_SHIPPING_THRESHOLD]`, not a hardcoded amount. Confirm it through contribution margin, shipping cost, current AOV, desired AOV lift, and geographic rules.
- **Promotional values are configurable:** use `[SAMPLE_PRICE]`, `[SAMPLE_CREDIT]`, `[DYNAMIC_BUNDLE_DISCOUNT_PCT]`, `[LOYALTY_REORDER_DISCOUNT_PCT]`, and similar variables until owner approval. Any numbers in worked examples below are explicitly illustrative, not offers.

## Spray estimator, lifespan, value, and repurchase engine

### Variant-level calculations

Every sellable fragrance variant stores `volume_ml` and `spray_output_ml`. Default spray output may begin at `0.1 ml/spray`, but it must be configurable by atomizer/product and validated by a measured spray test.

```text
estimated_sprays = volume_ml / spray_output_ml
lifespan_days = estimated_sprays / selected_sprays_per_day
reminder_day = floor(lifespan_days × 0.75)
price_per_ml = variant_price / volume_ml
days_per_currency_unit = lifespan_days / variant_price
```

Usage presets are configurable, with an initial model of light = 2, moderate = 4, and heavy = 8 sprays/day. For an illustrative 50 ml variant using 0.1 ml/spray, the UI would show approximately 500 sprays, 250 light-use days, 125 moderate-use days, or 62 heavy-use days. Clearly label every result as an estimate; atomizer output and personal behavior vary.

### PDP display and larger-size savings

Place a compact “How long will it last?” module directly under the size selector. Let the customer select light/moderate/heavy or enter a custom daily spray count. When multiple sizes exist, show:

- price per ml;
- estimated sprays;
- lifespan at the selected usage level;
- days per EGP;
- absolute and percentage unit-value advantage of a larger variant;
- extra estimated usage days versus the selected smaller size.

Do not describe usage days as literally “free” unless the commercial/legal team approves that language. Calculate savings from current variant prices dynamically; illustrative prices in specifications must not become storefront content.

### Repurchase automation

At purchase or post-purchase, invite the customer to choose usage level; default to moderate only when clearly disclosed. Calculate the estimated depletion date and schedule an opt-in reminder around 75% of lifespan. Email, SMS, and WhatsApp require channel consent and current Egyptian privacy/direct-marketing compliance. The message includes the purchased product and variant, an exact reorder link, current availability, and an optional owner-configured `[LOYALTY_REORDER_DISCOUNT_PCT]`. Recalculate or cancel reminders after repurchase, return, cancellation, or a customer preference change.

Instrument `usage_level_selected`, `replenishment_reminder_scheduled`, `replenishment_reminder_sent`, `replenishment_reminder_opened`, `replenishment_reorder_clicked`, and `replenishment_reorder_purchased`.

## Variant-specific verified reviews

Every review observation must reference `product_id`, `variant_id`, and the originating order line. Display:

- exact perfume name;
- exact purchased variant, such as “50 ml EDP Spray”;
- purchase date (use a privacy-appropriate month/year if needed);
- “Verified purchase — 50 ml EDP” badge;
- review creation date and structured facets.

The review form is sent from order history and pre-fills a locked product/variant reference. On the PDP, offer `All`, `30 ml`, `50 ml`, `100 ml`, or only the actual available variant filters. Aggregate product-level ratings may combine variants, but variant counts and distributions must remain queryable. Performance or value differences by variant must only be stated when sample size is sufficient and formulation/atomizer differences plausibly exist; bottle size alone does not automatically change concentration.

## Transparent inspired-profile comparison

Every inspired interpretation may include a legally reviewed comparison block titled “Inspired by the scent profile of …”; never claim identity, authorization, or affiliation. It has two explicit evidence-backed lists:

### What matches

- olfactory family and overall character;
- shared key notes/accords;
- concentration band when genuinely comparable;
- intended mood, occasion, season, or wear context.

### What differs

- note additions, omissions, or substitutions;
- intentional creative direction;
- brand-tested or sufficiently sampled community longevity difference;
- projection/sillage difference;
- formulation/ingredient differences only when documented and legally safe;
- climate adaptation, labeled as Siwa's creative intent rather than an objective superiority claim.

Each comparison row stores `statement`, `evidence_type`, `source`, `tested_at`, `sample_size`, `confidence`, and `legal_review_status`. Do not publish unsupported hour estimates. Reference-product facts and prices must include source and checked date.

## Side-by-side comparison and dynamic dual-purchase bundle

Add “قارن مع عطر تاني / Compare with another scent” on every eligible PDP. A search modal selects a second product; mobile uses stacked cards or an accessible horizontal table. Compare normalized fields:

- name, family, top/heart/base notes;
- sweetness, freshness, warmth, richness, and intensity;
- season, occasion, and Cairo climate guidance;
- evidence-labeled longevity and sillage;
- equivalent selected size, current price, price/ml, estimated sprays, lifespan, rating, and variant-specific review count.

At the bottom, offer a dynamic two-item bundle using `[DYNAMIC_BUNDLE_DISCOUNT_PCT]`, approved by the owner and constrained by margin, product eligibility, inventory, promotion stacking, and refund allocation rules. The cart stores both real variant IDs plus a promotion/bundle instance ID; it must not create fake catalog products. Revalidate price and stock at add-to-cart and checkout. If either item becomes unavailable, explain the state rather than silently replacing it.

Instrument `compare_started`, `compare_product_selected`, `compare_viewed`, `compare_bundle_offered`, `compare_bundle_added`, and `compare_dual_purchase_completed`.

## Creative features: differentiation and sequencing

| Feature | Customer value | Data dependency | Effort | Sequence |
|---|---|---|---|---|
| Alias-aware bilingual search | Finds scents using English, Arabic, transliteration, original, notes, or mood | Names, reference entities, note graph, aliases | Medium | Phase 1 |
| Try → credit → remember | Reduces risk and creates preference history | Sample SKUs, credit rules, customer profile | Medium | Phase 1 |
| Scent Compass | Transparent visual filtering instead of opaque quiz | Accords and normalized 1–5 axes | Medium | Phase 2 |
| “Similar, but…” controls | Lets shoppers refine less sweet/fresher/stronger | Comparable normalized profiles | Medium | Phase 2 |
| Desert Climate Mode | Local heat/day/night guidance | Climate fit, tested/community evidence | Medium | Phase 2 |
| Layering Lab | Explains pair, order, ratio, and expected accord movement | Layering relationships and recipes | Medium/high | Phase 2 |
| Sample wear diary via QR | Captures opening, heart, dry-down reactions | Samples, sessions, profile storage | Medium | Phase 2 |
| Wardrobe gap finder | Prevents duplicate buying and builds a scent capsule | Owned/tried scents, occasions, profiles | High | Phase 3 |
| Community performance map | City/climate and skin/fabric evidence with sample size | Structured verified reviews at scale | High | Phase 3 |
| Gift-by-memory builder | Creates a bilingual three-sample narrative gift | Product profile, gift flow, QR redemption | High | Phase 3 |
| Transparent value calculator | Normalizes size/concentration without deceptive savings | Current reference source/date and own pricing | Medium | Phase 2 |
| Spray and lifespan estimator | Makes size value and depletion tangible | Variant volume, measured/configurable atomizer output, usage presets | Low/medium | Phase 1 |
| Repurchase reminder engine | Recovers replenishment demand at a predicted moment | Purchased variant, usage choice, consent, reminder state | Medium | Phase 2 |
| Variant-specific reviews | Makes proof traceable to the exact purchased unit | Order line, product/variant IDs, verified-review workflow | Medium | Phase 1 |
| Transparent matches/differences | Builds trust without claiming identity | Reference entity, comparison evidence, legal approval | Medium/high | Phase 2 |
| Side-by-side compare + dynamic pair | Resolves indecision and creates an AOV path | Normalized scent data, variant pricing/stock, configurable discount rules | Medium/high | Phase 2 |

The most defensible bundle is **bilingual search + sample memory + climate evidence**. Competitors can copy a quiz; they cannot quickly copy a high-quality local vocabulary graph and verified Egyptian wear dataset.

## Build roadmap

### Phase 0 — measurement and governance, days 1–5

- Export theme, metafield definitions, app list, policies, shipping/payment rules, and checkout configuration.
- Capture 90 days of Shopify/GA4 funnel, device/source split, search terms, landing pages, stockouts, returns, and margins.
- Define event names and an experiment guardrail: conversion, gross margin, AOV, return rate, and speed.
- Approve vocabulary owners and inspiration/claim wording with appropriate legal review.

### Phase 1 — trustworthy conversion foundation, weeks 1–3

- Fix all 173 SKUs, all product types, option labels, volumes, brand/inspiration separation, null pricing, and spelling/currency consistency.
- Populate core scent fields for best sellers first, then all active perfumes.
- Produce the six-role image set for paid-traffic and best-selling products first.
- Rebuild cards and mobile purchase zone.
- Put ETA, confirmed payment methods, sealed/unopened return rule, `[FREE_SHIPPING_THRESHOLD]` progress, and direct WhatsApp/support by CTA.
- Add stock recovery and close substitutes.
- Launch bilingual aliases and high-value filters.
- Pilot discovery samples with redeemable credit.
- Launch variant-specific verified reviews with order-line-prefilled variant identity and size filters.
- Launch the variant spray/lifespan estimator and larger-size value comparison after measuring atomizer output.

### Phase 2 — guided discovery and AOV, weeks 4–8

- Add Scent Compass, “similar but,” Desert Climate Mode, transparent matches/differences, fair value calculator, and balanced review facets.
- Launch build-3/build-5 bundle flow with progress, stock validation, clear savings, and mobile persistence.
- Add explainable related/complementary products and Layering Lab recipes.
- Launch sample QR wear diary and saved scent profile.
- Launch opt-in repurchase reminders at approximately 75% of estimated variant lifespan.
- Launch two-product comparison and margin-controlled dynamic pair discount `[DYNAMIC_BUNDLE_DISCOUNT_PCT]`.

### Phase 3 — defensible data products, weeks 9–16+

- Publish community performance only after sufficient verified sample size and methodology.
- Add wardrobe gap and gift-by-memory builders.
- Use search/sample/review gaps to guide new original Siwa compositions.
- Extend proven winners into travel/oil/body/home formats; do not expand every scent automatically.

## Experiment plan

Run experiments only after tracking and data correctness are stable.

| Hypothesis | Test | Primary metric | Guardrails |
|---|---|---|---|
| Decision compression reduces uncertainty | New purchase zone vs current | Product view → add to cart | Speed, checkout conversion, returns |
| Sample credit improves first purchase/LTV | Paid set vs set with full credit | 45-day customer conversion | Margin, refund/abuse rate |
| Scent context beats gender-only browsing | Scent-led navigation vs current | Product discovery → PDP → purchase | Zero results, bounce |
| ETA/returns at CTA build confidence | Inline promise vs remote policy | Add to cart and checkout | Support contacts, policy misunderstandings |
| Explainable alternatives recover stockouts | Close substitutes vs generic related | Out-of-stock recovery revenue | Returns and dissatisfaction |
| Structured reviews improve selection | Faceted reviews vs stars/text | PDP conversion | Review completion, moderation load |
| Spray/lifespan estimates improve size choice | Estimator and value table vs standard size selector | Larger-size selection and gross margin | Returns, misunderstanding, page complexity |
| Timed reminders recover replenishment | 75%-lifespan reminder vs holdout | Reminder-attributed repurchase | Consent, unsubscribe, margin |
| Product comparison resolves indecision | Side-by-side compare vs no tool | Compare → purchase | Speed, abandonment |
| Dynamic pair offer raises qualified AOV | Configurable pair offer vs comparison only | Compare → dual purchase | Gross margin, returns, discount leakage |

Segment every result by mobile/desktop, source, new/returning customer, product, variant availability, and inspired/original status. Do not judge tests by clicks alone.

## Success scorecard

### Data completeness

- 100% variants with unique nonblank SKU.
- 100% products with product type and original/inspired status.
- 100% perfume variants with normalized volume and price/currency.
- 100% active perfumes with family, notes, concentration, season, occasion, and climate/performance evidence status.
- 100% priority products with complete decision-useful media roles.

### Commercial and experience

- Product view → add to cart; add to cart → checkout; checkout → purchase.
- Conversion and gross margin by product, device, source, original/inspired, and experiment.
- Search use, zero-result rate, refinements, filter use, and post-search conversion.
- Sample → full bottle conversion and time to conversion.
- Spray estimator view and usage-level selection rate.
- Size-up conversion, price/ml exposure, and gross margin after value comparison.
- Repurchase reminder open, click, conversion, unsubscribe, and incremental lift versus holdout.
- Compare usage rate, second-product selection rate, and compare-to-purchase rate.
- Compare-to-dual-purchase conversion, dynamic-pair AOV, margin, and return rate.
- Bundle attachment, AOV, margin, and component stock failures.
- Unavailable-variant views, notification capture, and substitute recovery.
- Returns/refunds and stated reason by product/variant.
- Review coverage, verified rate, facet distributions, and helpfulness.
- Core Web Vitals and accessibility defects by template.

## Legal, trust, and ethical guardrails

- Use third-party trademarks for clear comparison/inspiration identification only after jurisdiction-specific review; never imply authorization or affiliation.
- Keep the Siwa brand, name, packaging, and story visually primary.
- Avoid “identical,” guaranteed hours, “clean,” vegan, cruelty-free, or safety claims without documented evidence.
- Do not compare unlike size or concentration as though the saving is like-for-like.
- Show reference price source and checked date; allow expired references to stop displaying automatically.
- State beside the purchase control that full bottles are returnable only when sealed, unopened, and unused within the confirmed window; opened or used bottles are never returnable. Explain separate sample, bundle, and personalized-gift rules before purchase.
- Display only owner-confirmed pay-in-full payment methods.
- Keep `[FREE_SHIPPING_THRESHOLD]` and every promotional price/discount variable configurable until margin and AOV approval.
- Publish balanced review summaries with access to underlying reviews and disclosure of syndicated/incentivized content.
- Set a minimum sample size before publishing climate/community performance.

## Immediate next 10 actions

1. Obtain the Shopify Admin/theme/analytics inputs listed in Phase 0.
2. Approve controlled product types, concentration, family, notes, occasion, and climate vocabularies.
3. Correct brand/inspiration modeling and approved disclosure text.
4. Create unique SKU rules and repair all variant identities.
5. Normalize option name, volume, bundle composition, price, and availability.
6. Implement the v2 schema as Shopify metafields/metaobjects plus validation.
7. Enrich the top 10 revenue/traffic products and produce their new image sets.
8. Prototype one mobile PDP and one product card using real enriched data.
9. Instrument the full funnel and establish current baselines.
10. Pilot a small discovery set before investing in advanced recommendation features.

## Research and implementation references

- [Authentic/original leader research](./research-original-leaders.md)
- [Inspired-by leader research](./research-inspired-leaders.md)
- [Current Siwa store audit](./current-store-audit.md)
- [Google product variant structured data](https://developers.google.com/search/docs/appearance/structured-data/product-variants)
- [Google Merchant Center product data specification](https://support.google.com/merchants/answer/7052112)
- [Shopify Search & Discovery filters](https://help.shopify.com/en/manual/online-store/storefront-search/search-and-discovery-filters)
- [Shopify product recommendations](https://help.shopify.com/en/manual/online-store/storefront-search/search-and-discovery-recommendations)
- [Baymard product-page UX research](https://baymard.com/research/product-page)
