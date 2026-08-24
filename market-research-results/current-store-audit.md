# Siwa Fragrances — Current Store Audit

**Evidence date:** 2026-08-24
**Store:** https://siwafragrances.com/
**Audit basis:** the repository snapshot only; no Shopify Admin, analytics, checkout, theme source, or live browser session was available for this assignment.

## 1. What is actually in this repository

This folder is an exported public-store audit, not the storefront implementation. It contains:

- a Shopify public product-feed snapshot (`raw/products-2026-08-24.json`);
- normalized product and variant CSV exports;
- a product/variant summary (`audit-summary.json`);
- public `robots.txt` and sitemap-index snapshots;
- a proposed fragrance JSON Schema (`product-schema.json`);
- a prior narrative audit (`README.md`).

There is no Liquid theme, JavaScript/CSS, design source, screenshot set, analytics export, app configuration, checkout configuration, or performance trace. Consequently, this report can assess catalog structure and the storefront observations recorded in `README.md`, but cannot verify responsive behavior, accessibility, Core Web Vitals, checkout friction, app conflicts, or actual conversion rates.

## 2. Current platform and architecture

The captured store is Shopify using Prestige theme 11.1.0. The public architecture observed in the snapshot includes product, collection, page, blog, account, search and cart surfaces. The sitemap index separates products, collections, pages and blogs, and also advertises an agentic-discovery sitemap. `robots.txt` exposes Shopify UCP/MCP discovery endpoints while blocking transactional, duplicate-filter and preview URLs.

The commercial model represented in the catalog is a mixture of:

- Siwa-named perfumes inspired by third-party fragrances;
- products described as Siwa original creations;
- body splash and body lotion;
- multi-item bundles.

The data model is still Shopify-generic. Fragrance-specific facts mostly live in unstructured HTML descriptions, titles, option labels, tags, or the `vendor` field.

## 3. Catalog baseline

| Metric | Repository evidence |
|---|---:|
| Products | 61 |
| Variants | 173 |
| Available variants | 128 |
| Unavailable variants | 45 (26.0%) |
| Price range | EGP 350–2,300 |
| Mean variant price | EGP 1,006.30 |
| Blank product types | 60 of 61 (98.4%) |
| Blank SKUs | 59 of 173 (34.1%) |
| Products with one image | 55 of 61 (90.2%) |
| Products with no description/image | 0 |
| Variants with a real compare-at price | 19 variants across 4 products |

Only **Silk Vanilla Body Lotion** has a non-empty product type (`body lotion`). The available tags are extremely shallow: Men (30), Women (27), Best Selling (24), new (9), Unisex (4), and Bundles (3).

## 4. Product-data audit

### 4.1 Critical identity problems

`vendor` is not being used consistently as the manufacturer/brand. It frequently contains the reference scent and brand—examples in the feed include `Lost Cherry Tom Ford`, `Guidance Amouage`, and `Bleu De Chanel L’exclusif`—while a few records use `Siwa Fragrances` or `Siwa original creation`. This creates ambiguity for customers, Google product data, reporting and channel feeds.

SKU quality is materially worse than the blank count alone suggests:

- 59 variants have no SKU;
- among the 114 variants with a SKU, only 42 unique values exist;
- 110 populated-SKU variants belong to a duplicated-SKU group;
- 38 populated SKU values are duplicated, generally reused across sizes of one product.

The sellable unit is the variant, so each size or bundle combination needs its own stable SKU. Product-level SKU reuse undermines inventory reconciliation, fulfillment, returns, attribution and marketplace feeds.

### 4.2 Options and units are inconsistent

Ten distinct option-name strings represent broadly the same size concept. They include `size`, `Size`, `Layering Vanilla (size)`, `layering vanilla (size)`, `Silk Vanilla Body Lotion ( size )`, and the typo `Layerng Pistachio`.

Variant values likewise mix `30 ml`, `30`, `30ML`, `125ml`, and compound bundle strings such as `125ML / 120 ml / 100ML`. This prevents dependable size filters, price-per-ml calculations, inventory analysis, or recommendation logic. Bundle component quantities should be modeled as components, not encoded into a single presentation string only.

### 4.3 Taxonomy is insufficient for fragrance shopping

The catalog can express broad audience and merchandising status through tags, but cannot reliably answer high-intent questions such as:

- woody, gourmand, citrus, floral or amber;
- top, heart and base notes;
- concentration;
- projection and longevity;
- summer versus winter suitability;
- office, date, evening or gifting use;
- original creation versus inspired-by;
- available size and price per ml.

Because 98.4% of `product_type` values are blank, even basic separation of perfume, splash, lotion and bundle is unreliable outside hand-built collections.

### 4.4 Descriptions are present but not standardized

Every product has `body_html`, but completeness is not the same as decision usefulness. Short examples include Coco Woods (name plus one notes line), Marshmallow Bundle (discount statement only), and Layering bundle (a brief promotion). Other records include note pyramids in loosely formatted prose. Formatting, capitalization, spacing and terminology differ between records.

Descriptions need a consistent, scannable contract: short scent story, family, note pyramid, concentration, performance, best seasons/occasions, inspiration disclosure, size, use/care, and fulfillment/returns. Claims such as longevity should be supported and expressed consistently rather than improvised per product.

### 4.5 Images are the largest visible content deficit

Fifty-five products have only one image. For a sensory, premium product, this leaves major questions unanswered: bottle detail, packaging, scale, atomizer, label legibility, gift presentation, and lifestyle context. The public feed also does not expose image alt text, so accessibility and image-search quality cannot be established from this snapshot.

Use a minimum decision set rather than an arbitrary gallery count: front packshot, alternate/bottle detail, packaging and scale, and one scent/lifestyle visual. Bundles additionally need a clear component-layout image.

### 4.6 Pricing and availability hygiene

The feed uses `compare_at_price = 0.00` on 69 variants. Zero is not a meaningful former price; normalize it to null unless the Shopify/theme integration explicitly requires otherwise. Only 19 variants across four products have a non-zero compare-at price.

With 45 unavailable variants, the experience needs deliberate behavior for partially and fully unavailable products: clear size-level status, back-in-stock capture, alternative-size guidance, and substitute recommendations. Inventory quantities and replenishment dates are not exposed, so the operational cause cannot be determined here.

## 5. Storefront UX and conversion audit

The recorded storefront has a solid baseline: clear audience/category navigation, seasonal/new/best-seller merchandising, search, collection filters for price and availability, sorting, product-card ratings, quick add/choose options, cart drawer, account login, newsletter, bundles and a free-shipping message above EGP 1,500.

### What currently supports conversion

- Local EGP pricing and a visible free-shipping threshold reduce basic uncertainty.
- Men, women, unisex, originals, bundles and body products create understandable entry points.
- Best sellers, new drops and seasonal merchandising provide shortcuts for undecided shoppers.
- Ratings, sale states and stock states appear before the product detail page.
- Bundles and layering products create an existing path to higher average order value.
- A 14-day return message, payment-protection claim and support promise provide a trust foundation.

### Evidence-backed conversion gaps

1. **Discovery stops at broad categories.** Price and availability filters do not reflect how fragrance shoppers choose. Family, notes, mood, season, occasion, performance, concentration and size should become structured filters.
2. **Product cards risk identity confusion.** When the `vendor` value is a third-party scent/brand phrase, it can appear as though that party is the seller or maker. Cards should lead with Siwa, then use a clearly labeled “Inspired by …” line where applicable.
3. **Product pages lack a dependable decision hierarchy.** Unstructured descriptions and one-image galleries force extra interpretation. The page should answer smell, strength, wear context, size/value, delivery, returns and authenticity/inspiration questions near the buying controls.
4. **Purchase reassurance is too remote or vague.** The prior observation notes “Reach out via DM.” Replace this with a direct WhatsApp/support action and show delivery estimate, payment/COD methods if applicable, return eligibility and free-shipping progress beside add-to-cart.
5. **Review credibility needs detail.** The homepage reportedly showed 4.98 from 1,244 reviews, while ratings are tightly clustered near five stars. Show per-product counts, verified-purchase status, dates, review media, fit/scent tags and a complete rating distribution—including neutral and negative reviews.
6. **Stock loss is not being recovered.** With 26% of variants unavailable, sold-out size selections need notifications and intelligent alternatives rather than dead ends.
7. **Visual polish is inconsistent.** Examples in the captured data include `FOR Him`, `body LOTION`, `Layerng`, inconsistent size casing, and visible currency forms that reportedly alternate among `LE`, Arabic `ج.م`, and `EGP`.
8. **Trust and legal positioning need sharper separation.** “Original creation” and “inspired by” should be explicit attributes and badges with consistent, reviewed wording. Third-party affiliation should never be implied.

## 6. SEO, structured data and discoverability

The foundation is serviceable: Shopify-managed sitemap coverage, crawl rules designed to suppress duplicate/filter URLs, a relevant homepage title, and a representative `ProductGroup` JSON-LD implementation with size variants, EGP offers and availability.

Repository-recorded risks:

- representative JSON-LD omitted `aggregateRating`/`review` despite visible ratings;
- repeated SKUs weaken variant identity in structured data;
- generic category and nearly empty `product_type` reduce classification quality;
- overloaded vendor/brand meaning may misrepresent brand identity;
- key fragrance terms remain trapped in prose and cannot consistently power collection copy, internal search or feeds.

Review markup should only be added if it exactly matches visible first-party product review content and current search-engine eligibility rules. Canonicals, metadata quality, Merchant Center diagnostics and Search Console performance require live/admin validation.

## 7. Assessment of the proposed `product-schema.json`

The proposed schema is a useful direction: it separates `brand` and `inspired_by`, introduces note pyramids, families, audience, seasons, occasions and performance, and requires unique-looking variant fields, image alt text and SEO fields.

It is not yet production-complete:

- It does not require `audience`, `notes`, `fragrance_families`, `performance`, `seasons`, or `occasions`, so records can validate without the very discovery fields the redesign needs.
- It says nothing about SKU uniqueness across variants; JSON Schema alone may need a custom validation rule for this.
- Currency is hard-coded into `price_egp` rather than modeled as `{amount, currency}`.
- It lacks lifecycle/status fields (`draft`, active, discontinued), timestamps and publication/channel status.
- It lacks normalized bundle components and quantities.
- It lacks inventory policy, backorder/preorder state, inventory quantity source, lead time and restock estimate.
- It lacks barcode format validation and identifiers such as GTIN where applicable.
- It lacks URL at product/variant level, swatch/display labels, and variant-level media bindings.
- It lacks localized Arabic/English content despite the Egyptian market context.
- It lacks ingredient/allergen/safety/care fields and defensible claim provenance.
- Free-form occasions and concentration will drift without controlled vocabularies.
- `performance` needs either evidence/methodology or clearly subjective labels; otherwise it creates misleading precision.
- `rating` needs source, distribution and last-synced time, not just average/count.
- The image object needs role, position, focal point and variant association.

The implementation should use Shopify variants for genuinely sellable choices and typed metafields/metaobjects for fragrance facts, inspiration references, bundle composition and content blocks. A separate validation/export layer should enforce cross-record rules that Shopify and JSON Schema cannot.

## 8. Recommended target data domains

| Domain | Required data |
|---|---|
| Identity | product ID, handle, Siwa brand, display title, product type, collection/line, original vs inspired status |
| Inspiration | reference scent, reference brand, standardized disclaimer, legal-review status |
| Olfactive | controlled families, top/heart/base notes, key accords, concentration |
| Fit | audience, seasons, occasions, mood, projection, longevity band |
| Variant | unique SKU, normalized `volume_ml`, price amount/currency, compare-at price or null, barcode, weight, availability |
| Bundle | component product/variant IDs, quantity, substitution rules, computed savings |
| Content | short description, scent story, usage/care, safety/ingredients where relevant, translations |
| Media | URL, alt, role, position, dimensions, variant bindings |
| Commerce | delivery promise source, return eligibility, inventory policy, restock state |
| Social proof | rating average/count/distribution, source, verified count, sync timestamp |
| SEO | title, description, canonical, index status, structured-data category |
| Governance | completeness score, owner, last reviewed, claim source, lifecycle status |

## 9. Prioritized remediation

### P0 — make the catalog trustworthy (1–2 weeks)

1. Define canonical controlled vocabularies and field ownership.
2. Assign a unique SKU to every one of the 173 variants; resolve both 59 blanks and all reused values.
3. Set product type on every product and standardize the single option label to `Size` where appropriate.
4. Parse sizes into numeric `volume_ml`; model bundle components separately.
5. Set `brand = Siwa Fragrances`; move third-party references into structured `inspired_by` fields with reviewed disclaimer copy.
6. Replace zero compare-at prices with null and audit the four genuinely discounted products.
7. Fix spelling, casing, unit and currency-display inconsistencies.

### P1 — rebuild the decision experience (2–5 weeks)

1. Populate typed scent attributes for all products and expose them through search/filter UI.
2. Apply one product-detail content hierarchy across the catalog.
3. Produce decision-useful image sets; prioritize best sellers and paid-traffic landing products first.
4. Add delivery, payment, return and direct support reassurance at the add-to-cart area.
5. Add size-level stock messaging, back-in-stock capture and close alternatives.
6. Present original/inspired status consistently on cards, product pages, collections and schema.

### P2 — improve conversion and learning (5–10 weeks)

1. Build a scent finder on the normalized attributes.
2. Add explainable “similar scent” and layering recommendations rather than generic related products.
3. Introduce a sample/discovery path with credit toward a full bottle if operationally viable.
4. Add bundle-builder logic with visible savings and compatibility guidance.
5. Instrument product view, variant select, filter, search, zero results, scent-finder completion, add-to-cart, back-in-stock, checkout and purchase events.
6. Test product-page hierarchy, reassurance placement and imagery on mobile using conversion and margin—not clicks alone—as decision metrics.

## 10. Implementation constraints and validation needs

- **No theme source:** component feasibility, app coupling and Prestige customization effort are unknown.
- **No analytics:** no claim about “high” or “low” conversion can be made; funnel baselines and traffic mix are required.
- **No admin access:** inventory quantities, metafields, Markets, translations, shipping, payment/COD and app data cannot be verified.
- **No checkout test:** payment friction, address validation, shipping rates and abandoned-checkout behavior are unknown.
- **No browser/performance capture:** accessibility, mobile layout, JavaScript errors and Core Web Vitals remain untested.
- **Public feed limitations:** alt text, cost/margin, inventory quantities and operational metadata are not present.

Before redesign implementation, obtain the current theme export, Shopify metafield definitions, app list, GA4/Shopify funnel for at least 90 days, top landing pages/queries, device split, returns reasons, stockout history, shipping/payment rules and a representative checkout recording. These determine which gaps are merely content debt and which are genuine conversion blockers.

## 11. Success scorecard

Track both implementation completeness and customer outcomes:

- 100% variants with a unique, nonblank SKU;
- 100% products with product type, original/inspired status and normalized size;
- 100% perfumes with family, notes, concentration, season, occasion and performance data;
- 100% active hero products with a complete decision-useful media set;
- product-view → add-to-cart, add-to-cart → checkout and checkout → purchase by device/source;
- search usage, zero-result rate, filter usage and conversion after filtering;
- unavailable-variant view rate and back-in-stock recovery;
- bundle attachment, average order value and gross margin;
- review coverage and rating distribution by product;
- returns/refunds by product, size and reason;
- Core Web Vitals and accessibility defects by template.

## Bottom line

Siwa does not need a larger catalog or more homepage sections first. It needs a reliable fragrance data layer and a product page that turns that data into confident decisions. The current store already has the essential Shopify commerce surfaces and good merchandising entry points, but product identity, variant identity, scent taxonomy, imagery, stock recovery and purchase reassurance are inconsistent. Fixing those foundations will make later features—scent finder, smart recommendations, bundles, SEO feeds and personalization—both credible and maintainable.
