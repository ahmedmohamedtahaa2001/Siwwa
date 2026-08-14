#!/usr/bin/env python3
"""
Measure phlur.com Product Detail Page geometry from Wayback snapshots.

The live origin returns 403 to every automated client (Cloudflare), exactly as
recorded in reference-phlur/PHLUR-SPEC.md for the homepage capture. The archive
preserves the DOM and the theme stylesheets, which is what layout extraction
needs. The `if_` modifier serves the snapshot without the Wayback toolbar, so
document geometry is the page's own.

Output: reference-phlur/pdp/phlur-pdp-measure-<viewport>.json
        reference-phlur/pdp/screens/*.png

Usage: python3 tools/measure-phlur-pdp.py
"""
import json
import os
import sys

from playwright.sync_api import sync_playwright

OUT = os.path.join(os.path.dirname(__file__), "..", "reference-phlur", "pdp")
SCREENS = os.path.join(OUT, "screens")

# handle -> (wayback timestamp, product type)
TARGETS = [
    ("vanilla-cream-duo-body-mists", "20260507071628", "bundle"),
    ("missing-person-50ml", "20260714051904", "single"),
    ("solar-power-50ml", "20250916135128", "single"),
    ("apricot-privee-50ml", "20250624153557", "single"),
]

VIEWPORTS = [("1440", 1440, 900), ("768", 768, 1024), ("375", 375, 812)]

# Extraction runs in the page. Mirrors the shape of phlur-measure-1440.json so
# the PDP capture reads the same way as the homepage capture.
JS = r"""
() => {
  const box = el => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return {
      x: Math.round(r.x),
      y: Math.round(r.y + window.scrollY),
      w: Math.round(r.width),
      h: Math.round(r.height)
    };
  };
  const type = el => {
    if (!el) return null;
    const c = getComputedStyle(el);
    return {
      font: c.fontFamily, size: c.fontSize, weight: c.fontWeight,
      lh: c.lineHeight, ls: c.letterSpacing, transform: c.textTransform,
      color: c.color
    };
  };
  const txt = el => el ? el.innerText.replace(/\s+/g, ' ').trim().slice(0, 220) : null;
  const m = el => {
    if (!el) return null;
    const c = getComputedStyle(el);
    return {
      sel: el.className && el.className.toString
             ? el.className.toString().slice(0, 90) : '',
      box: box(el), type: type(el),
      bg: c.backgroundColor, border: c.border, radius: c.borderRadius,
      pad: c.padding, margin: c.margin, display: c.display, gap: c.gap,
      cols: c.gridTemplateColumns, justify: c.justifyContent,
      align: c.alignItems, position: c.position, top: c.top,
      overflow: c.overflow, text: txt(el)
    };
  };
  const q = s => document.querySelector(s);
  const qa = s => Array.from(document.querySelectorAll(s));

  const out = {};
  out.viewport = { w: innerWidth, h: innerHeight };
  out.page = { h: document.documentElement.scrollHeight };
  out.bodyBg = getComputedStyle(document.body).backgroundColor;

  // ---- :root custom properties actually declared by the theme -------------
  const props = {};
  for (const sheet of Array.from(document.styleSheets)) {
    let rules; try { rules = sheet.cssRules; } catch (e) { continue; }
    if (!rules) continue;
    for (const rule of Array.from(rules)) {
      if (!rule.selectorText || !/(^|,)\s*:root\s*$/.test(rule.selectorText)) continue;
      for (const name of Array.from(rule.style)) {
        if (name.startsWith('--')) props[name] = rule.style.getPropertyValue(name).trim();
      }
    }
  }
  out.rootProps = props;

  // ---- section stack -----------------------------------------------------
  out.sections = qa('[id^=shopify-section-]').map((el, i) => ({
    i,
    id: el.id.replace(/^shopify-section-/, '').replace(/^(sections|template)--\d+__/, ''),
    rawId: el.id,
    box: box(el),
    bg: getComputedStyle(el).backgroundColor,
    pad: getComputedStyle(el).padding
  })).filter(s => s.box && s.box.h > 0);

  // ---- page rail ---------------------------------------------------------
  const pw = q('.page-width');
  out.rail = pw ? { box: box(pw), pad: getComputedStyle(pw).padding,
                    maxWidth: getComputedStyle(pw).maxWidth } : null;

  // ---- hero: gallery + buy box ------------------------------------------
  const grid = q('.product.grid');
  const media = q('.product__media-wrapper');
  const info = q('.product__info-container');
  out.hero = {
    grid: grid ? { box: box(grid), display: getComputedStyle(grid).display,
                   cols: getComputedStyle(grid).gridTemplateColumns,
                   gap: getComputedStyle(grid).gap,
                   cls: grid.className } : null,
    media: m(media),
    info: m(info)
  };

  // ---- gallery ----------------------------------------------------------
  const sw = q('.productSwiper');
  const slides = qa('.productSwiper .swiper-slide');
  const thumbs = qa('.productThumbSwiper .swiper-slide, [class*=thumb] .swiper-slide');
  out.gallery = {
    root: m(sw),
    slideCount: slides.length,
    slides: slides.slice(0, 8).map(s => box(s)),
    firstImg: (() => {
      const im = q('.productSwiper img');
      if (!im) return null;
      const b = m(im);
      b.natural = { w: im.naturalWidth, h: im.naturalHeight };
      b.magnify = im.className;
      return b;
    })(),
    ratioVar: (() => {
      const c = q('.product-media-container');
      return c ? c.getAttribute('style') : null;
    })(),
    thumbCount: thumbs.length,
    thumbs: thumbs.slice(0, 8).map(t => box(t)),
    badge: m(q('.pdp-discount-note span')),
    pagination: m(q('.productSwiper .swiper-pagination, .swiper-pagination-custom'))
  };

  // ---- buy box, in DOM order --------------------------------------------
  out.buyBox = {
    container: m(info),
    sticky: info ? getComputedStyle(info).position : null,
    titleRow: m(q('.product__title .flex-container-row')),
    h1: m(q('.product__title h1')),
    rating: m(q('.oke-sr')),
    ratingValue: txt(q('.oke-sr-rating')),
    ratingCount: txt(q('.oke-sr-count')),
    variantTitle: m(q('.variant-title')),
    tagline: m(q('.tagline')),
    subtitle: m(q('.product__text.subtitle')),
    scentRail: (() => {
      const w = q('.scent-collection-wrapper');
      if (!w) return null;
      const items = qa('.scentCollectionSwiper .swiper-slide');
      return {
        wrap: m(w),
        label: m(q('.variant-link-title')),
        itemCount: items.length,
        items: items.slice(0, 8).map(it => ({
          box: box(it),
          img: box(it.querySelector('img')),
          text: txt(it),
          active: it.className.includes('active')
        })),
        track: m(q('.scentCollectionSwiper .swiper-wrapper'))
      };
    })(),
    membership: m(q('.join-membership-wrap')),
    form: m(q('product-form.main-form')),
    atc: (() => {
      const b = q('.product-form__submit');
      if (!b) return null;
      const o = m(b);
      o.priceInside = txt(b.querySelector('span'));
      o.compareAt = m(b.querySelector('.pdp-compare-at'));
      o.height = getComputedStyle(b).height;
      return o;
    })(),
    qty: m(q('.quantity__input, [class*=quantity]')),
    paymentBadges: m(q('[class*=payment], [class*=shop-pay]')),
    usp: qa('[class*=usp] li, [class*=trust] li').slice(0, 6).map(e => txt(e))
  };

  // ---- accordion ---------------------------------------------------------
  const accs = qa('.Phlur-Accordion .js_accordion');
  out.accordion = {
    root: m(q('.Phlur-Accordion')),
    count: accs.length,
    items: accs.map(a => ({
      title: txt(a.querySelector('.summary__title')),
      open: a.className.includes('open'),
      header: m(a.querySelector('.accordion-header-wrap')),
      content: m(a.querySelector('.accordion_content')),
      icon: m(a.querySelector('.icon-plus-rotate'))
    }))
  };

  // ---- downstream bands --------------------------------------------------
  const band = sel => {
    const el = q(sel);
    if (!el) return null;
    return {
      box: box(el),
      bg: getComputedStyle(el).backgroundColor,
      pad: getComputedStyle(el).padding,
      heading: m(el.querySelector('h2, h3, [class*=title]')),
      imgCount: el.querySelectorAll('img').length,
      firstImg: box(el.querySelector('img')),
      text: txt(el)
    };
  };
  out.bands = {
    breadcrumbs: band('[id*=breadcrumbs]'),
    scentNotes: band('[id*=product-scent-notes]'),
    relatedCollection: band('[id*=product-related-collection]'),
    quotes: band('[id*=perfume-quotes]'),
    relatedProducts: band('[id*=related-products]'),
    stickyCta: (() => {
      const el = q('[id*=pdp-sticky-cta]');
      if (!el) return null;
      const inner = el.firstElementChild;
      return {
        box: box(el), inner: m(inner),
        position: inner ? getComputedStyle(inner).position : null,
        text: txt(el)
      };
    })(),
    footer: band('[id*=footer]')
  };

  // ---- scent notes detail (Siwa cares about this band) -------------------
  const sn = q('[id*=product-scent-notes]');
  out.scentNotes = sn ? {
    box: box(sn),
    headings: qa('[id*=product-scent-notes] h2, [id*=product-scent-notes] h3')
      .slice(0, 8).map(e => ({ t: txt(e), type: type(e), box: box(e) })),
    items: qa('[id*=product-scent-notes] li, [id*=product-scent-notes] [class*=note]')
      .slice(0, 12).map(e => ({ t: txt(e), box: box(e) })),
    imgs: qa('[id*=product-scent-notes] img').slice(0, 8).map(e => ({
      src: (e.getAttribute('src') || '').slice(-70), box: box(e)
    }))
  } : null;

  // ---- related products grid --------------------------------------------
  const rp = q('[id*=related-products]');
  out.relatedGrid = rp ? {
    box: box(rp),
    cards: qa('[id*=related-products] .swiper-slide, [id*=related-products] li')
      .slice(0, 8).map(e => box(e)),
    track: m(rp.querySelector('.swiper-wrapper')),
    heading: m(rp.querySelector('h2, [class*=title]'))
  } : null;

  return out;
}
"""


def main():
    os.makedirs(SCREENS, exist_ok=True)
    results = {}
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for label, vw, vh in VIEWPORTS:
            for handle, ts, ptype in TARGETS:
                # 1440 gets all four products; narrower viewports only the two
                # current captures, which is where the responsive rules live.
                if label != "1440" and handle not in (
                    "vanilla-cream-duo-body-mists", "missing-person-50ml"):
                    continue
                url = f"https://web.archive.org/web/{ts}if_/https://phlur.com/products/{handle}"
                key = f"{handle}@{label}"
                ctx = browser.new_context(
                    viewport={"width": vw, "height": vh},
                    device_scale_factor=1,
                    user_agent=("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                                "AppleWebKit/537.36 (KHTML, like Gecko) "
                                "Chrome/124.0.0.0 Safari/537.36"),
                )
                page = ctx.new_page()
                try:
                    page.goto(url, wait_until="domcontentloaded", timeout=120_000)
                    page.wait_for_timeout(6000)
                    # Trigger lazy media and reveal animations, then return to top.
                    for frac in (0.25, 0.5, 0.75, 1.0):
                        page.evaluate(
                            "f => window.scrollTo(0, document.body.scrollHeight*f)", frac)
                        page.wait_for_timeout(900)
                    page.evaluate("window.scrollTo(0,0)")
                    page.wait_for_timeout(1500)
                    # Wayback sometimes still injects chrome; drop it before measuring.
                    page.evaluate(
                        "document.querySelectorAll('#wm-ipp-base,#wm-ipp,#donato')"
                        ".forEach(e=>e.remove())")
                    data = page.evaluate(JS)
                    data["_meta"] = {"url": url, "handle": handle,
                                     "productType": ptype, "snapshot": ts,
                                     "viewport": label}
                    results[key] = data
                    page.screenshot(
                        path=os.path.join(SCREENS, f"phlur-pdp-{handle}-{label}.png"),
                        full_page=True)
                    print(f"OK   {key}  page_h={data['page']['h']} "
                          f"sections={len(data['sections'])}", flush=True)
                except Exception as e:
                    print(f"FAIL {key}: {type(e).__name__}: {str(e)[:160]}", flush=True)
                    results[key] = {"error": f"{type(e).__name__}: {str(e)[:300]}",
                                    "_meta": {"url": url, "handle": handle,
                                              "viewport": label}}
                finally:
                    ctx.close()
        browser.close()

    path = os.path.join(OUT, "phlur-pdp-measure.json")
    with open(path, "w") as fh:
        json.dump(results, fh, indent=2)
    print(f"\nwrote {path}")
    ok = sum(1 for v in results.values() if "error" not in v)
    print(f"{ok}/{len(results)} captures succeeded")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
