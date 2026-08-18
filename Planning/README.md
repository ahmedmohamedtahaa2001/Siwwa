# Siwa — Planning

Three documents. Read them in this order — each one is the input to the next.

| # | Document | What it answers |
|---|---|---|
| 1 | [`01-market-research.md`](01-market-research.md) | Where Siwa is entering, what the market leaders do, where they fail, and what the legal guardrails are |
| 2 | [`02-feature-bible.md`](02-feature-bible.md) | Which features get built, which trust gap each one closes, and what phase it ships in |
| 3 | [`../siwa-design-system/DESIGN.md`](../siwa-design-system/DESIGN.md) | How every one of those features is allowed to look and behave |

The spine running through all three: **luxury as pilgrimage, not luxury as excess.** The market
research establishes that the premise has no equivalent in the current market. The feature bible
turns the premise into a build list. The design system makes the premise enforceable in code —
rationed gold, stamped geometry, tonal depth, bilingual parity.

---

## The Six Trust Gaps

Every feature in `02-feature-bible.md` exists to close at least one of these. If a proposed
feature closes none, it does not ship.

| Gap | The fear | Closed by |
|---|---|---|
| 1 | "I can't smell it before I buy it." | Oracle quiz, note pyramids, scent filters, Discovery Kit, The Reading |
| 2 | "Is this actually authentic?" | Authenticity system, provenance cards, batch codes, catalog separation |
| 3 | "Will it last on my skin?" | Longevity bars, The Reading, structured reviews, projection descriptors |
| 4 | "What if I hate it after buying full-size?" | Tester tier, return policy, COD, Discovery Kit |
| 5 | "Does this feel worth the money?" | Premium unboxing, gifting, personalization, loyalty, Return the Bottle |
| 6 | "Is this brand real — or just packaging?" | Egyptian production specificity, founder voice, the actual myth told concretely |

---

## Phase Summary

| Phase | Window | Feature count | Headline items |
|---|---|---|---|
| **Pre-launch** | Before Day 1 | 10 gates | Catalog separation, legal review, packaging standard, payment stack, mobile audit |
| **P0** | Launch | USF-01, USF-03, USF-06, CCF-01…CCF-10, SF-05 | The Oracle, tester CTA, note pyramids, Discovery Kit, comparison pages |
| **P1** | Month 2–3 | USF-02, USF-05, SF-01…SF-04, SF-08 | The Reading, The Compass, loyalty, gifting hub, TikTok Shop |
| **P2** | Month 4–6 | USF-04, SF-06, SF-07 | Return the Bottle, referral, subscription, first Siwa original |

Hard date: the **Gifting Hub must be live by October 1**. 40% of annual fragrance sales occur in Q4.

---

## Open Seam — Component Registry

`02-feature-bible.md` addresses components by registry ID (`P-01 ProductCard`, `C-07 ProvenienceCard`,
`E-02 BadgeStamp`, `D-01 OracleQuiz`, …). The design system specifies components by name and does not
yet carry those IDs. Where the two documents already meet:

| Feature Bible ID | Design System §3 component |
|---|---|
| `P-01 ProductCard` | `product-card` (§3.4) |
| `C-02 FeatureRow` | `feature-row` (§3.9) |
| `E-02 BadgeStamp` | `badge-stamp` (§3.3) |
| `G-01 SiteNav` | `primary-nav` (§3.5) |
| `G-02 SiteFooter` | `footer` (§3.6) |
| `L-02 ProductGrid` | `product-grid` (§3.10) |
| `L-07 Modal` | `modal` / `drawer` (§3.7) |

Everything else the Feature Bible names is **not yet specified** in the design system — including all
of `D-01 OracleQuiz`, `P-04 NotePyramid`, `P-06 LongevityProjectionBar`, `P-07 SizeSelector`,
`P-09 ProductTrustStrip`, `P-11 ReviewsSection`, `P-13 OriginalVsImpressionComparison`,
`C-07 ProvenienceCard`, `C-10 TrustSignalBar`, `E-04 GiftOptionsPanel`, `E-06 ShippingProgressBar`,
`E-07 LoyaltyPointsDisplay`, `G-03 AnnouncementBar`, and the USF-specific components
(`ReadingInput/Output`, `CompassTool/Result`, `ReturnBottleFlow`, `BundleBuilder`, `AuthenticityBlock`).

Some of these overlap with the design system's own `[PLACEHOLDER]` list in §12 (filter chip, quantity
stepper, promo code input, scent-family tag, search overlay, wishlist, skeleton loader). Reconciling
the two lists into one component registry — with a design-system spec per ID, in the §3 format
(intent → lore anchor → anatomy → variants → states → RTL → responsive → a11y) — is the next
document to write.

---

## Non-Negotiables Carried Across All Three Documents

1. **Catalog separation.** `ORIGINAL` or `IMPRESSION` stated in the first line of every PDP and
   badged on every thumbnail. No mixed grid without badges.
2. **Non-affiliation disclaimer** on every Impression PDP, every comparison page, and every article
   referencing an external brand.
3. **Never use a referenced brand's name** as a product title, page title, or URL. Body copy only.
4. **The tester is a first-class CTA** — equal visual weight to "Add to bag", never `btn-primary`
   unless it is the only CTA on the surface.
5. **One gold CTA per fold.** The design system's first principle and the store's conversion
   discipline are the same rule.
6. **Premium packaging on every order**, from the 85 EGP tester up. No plain boxes, ever.
7. **Trademark attorney review** of all product names, comparison language, and disclaimer text
   before any public-facing copy ships.
