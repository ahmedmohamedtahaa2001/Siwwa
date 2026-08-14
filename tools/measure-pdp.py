#!/usr/bin/env python3
"""
Measure PDP geometry — both the Phlur reference mirror and the Siwa build.

Phlur is read from the local mirror produced by tools/mirror-phlur-pdp.py,
because web.archive.org returns HTTP 498 to a browser requesting a page plus
its ~30 subresources.

Scripts are stripped from the mirror, so swiper-computed slide widths are not
observable here; every other number is CSS-driven and exact. Slide geometry is
read from Phlur's authored config instead — recorded in PHLUR-PDP-SPEC.md.

Usage:
  python3 tools/measure-pdp.py phlur              # reference mirror
  python3 tools/measure-pdp.py siwa <base-url>    # the build
"""
import json
import os
import sys

from playwright.sync_api import sync_playwright

HERE = os.path.dirname(os.path.abspath(__file__))
PDPDIR = os.path.join(HERE, "..", "reference-phlur", "pdp")
RAW = os.path.join(PDPDIR, "raw")
SCREENS = os.path.join(PDPDIR, "screens")

VIEWPORTS = [("1440", 1440, 900), ("768", 768, 1024), ("375", 375, 812)]

PHLUR_JS = r"""
() => {
  const bx = el => { if (!el) return null; const r = el.getBoundingClientRect();
    return {x: Math.round(r.x), y: Math.round(r.y + scrollY),
            w: Math.round(r.width), h: Math.round(r.height)}; };
  const cs = (el, ks) => { if (!el) return null; const c = getComputedStyle(el);
    const o = {}; ks.forEach(k => o[k] = c[k]); return o; };
  const q = s => document.querySelector(s);
  const qa = s => Array.from(document.querySelectorAll(s));
  const TYPE = ['fontSize','fontWeight','lineHeight','letterSpacing','textTransform'];

  return {
    page: {h: document.documentElement.scrollHeight, bodyBg: getComputedStyle(document.body).backgroundColor},
    rail: {box: bx(q('.page-width')), pad: cs(q('.page-width'), ['paddingLeft','paddingRight','maxWidth'])},
    heroGrid: {box: bx(q('.product.grid')),
               style: cs(q('.product.grid'), ['display','gridTemplateColumns','columnGap','rowGap'])},
    media:   {box: bx(q('.product__media-wrapper')), style: cs(q('.product__media-wrapper'), ['maxWidth','width'])},
    info:    {box: bx(q('.product__info-container')),
              style: cs(q('.product__info-container'), ['maxWidth','position','top'])},
    firstSlide: bx(q('.productSwiper .swiper-slide')),
    mediaBox: bx(q('.product-media-container')),
    h1:      {box: bx(q('.product__title h1')), type: cs(q('.product__title h1'), TYPE)},
    variantTitle: {box: bx(q('.variant-title')), type: cs(q('.variant-title'), TYPE)},
    tagline: {box: bx(q('.tagline')), type: cs(q('.tagline'), TYPE),
              style: cs(q('.tagline'), ['borderLeftWidth','marginTop','marginBottom','paddingLeft'])},
    atc:     {box: bx(q('.product-form__submit')),
              style: cs(q('.product-form__submit'), ['height','backgroundColor','color','borderRadius','width'])},
    accordion: {root: bx(q('.Phlur-Accordion')),
                style: cs(q('.Phlur-Accordion'), ['borderTopWidth','marginTop']),
                count: qa('.Phlur-Accordion .js_accordion').length,
                header: {box: bx(q('.Phlur-Accordion .accordion-header-wrap')),
                         style: cs(q('.Phlur-Accordion .accordion-header-wrap'), ['paddingTop','paddingBottom'])},
                icon: bx(q('.Phlur-Accordion .icon-plus-rotate'))},
    scentNotes: {box: bx(q('.scent-notes')),
                 row: cs(q('.scent-notes .flex-container-row'), ['display','gap','flexDirection']),
                 third: {box: bx(q('.scent-notes .flex-one-third')), style: cs(q('.scent-notes .flex-one-third'), ['width','order'])},
                 twoThirds: {box: bx(q('.scent-notes .flex-two-thirds')), style: cs(q('.scent-notes .flex-two-thirds'), ['width','order'])},
                 section: {box: bx(q('.scent-note-section')),
                           style: cs(q('.scent-note-section'), ['borderTopWidth','paddingTop','paddingBottom','fontSize','letterSpacing','lineHeight'])},
                 label: {box: bx(q('.scent-note-section h4')), type: cs(q('.scent-note-section h4'), TYPE),
                         style: cs(q('.scent-note-section h4'), ['width'])}},
    quotes: {box: bx(q('.perfume-quotes')),
             text: {box: bx(q('.perfume-quotes .flex-one-third, .perfume-quotes .flex-one-half')),
                    style: cs(q('.perfume-quotes .flex-one-third, .perfume-quotes .flex-one-half'), ['maxWidth','paddingRight','width'])},
             img: bx(q('.perfume-quotes img'))},
    stickyCta: {box: bx(q('.sticky-cta-wrapper')),
                style: cs(q('.sticky-cta-wrapper'), ['position','bottom','display','justifyContent','minHeight'])},
    sections: qa('[id^=shopify-section-]').map(el => ({
      id: el.id.replace(/^shopify-section-/, '').replace(/^(sections|template)--\d+__/, ''),
      box: bx(el)
    })).filter(s => s.box && s.box.h > 0)
  };
}
"""

SIWA_JS = r"""
() => {
  const bx = el => { if (!el) return null; const r = el.getBoundingClientRect();
    return {x: Math.round(r.x), y: Math.round(r.y + scrollY),
            w: Math.round(r.width), h: Math.round(r.height)}; };
  const cs = (el, ks) => { if (!el) return null; const c = getComputedStyle(el);
    const o = {}; ks.forEach(k => o[k] = c[k]); return o; };
  const q = s => document.querySelector(s);
  const qa = s => Array.from(document.querySelectorAll(s));
  const TYPE = ['fontSize','fontWeight','lineHeight','letterSpacing','textTransform'];

  return {
    page: {h: document.documentElement.scrollHeight, bodyBg: getComputedStyle(document.body).backgroundColor},
    rail: {box: bx(q('.pdp-wrap')), pad: cs(q('.pdp-wrap'), ['paddingLeft','paddingRight','maxWidth'])},
    heroGrid: {box: bx(q('.pdp-hero__grid')),
               style: cs(q('.pdp-hero__grid'), ['display','gridTemplateColumns','columnGap','rowGap'])},
    media:   {box: bx(q('.pdp-hero__media')), style: cs(q('.pdp-hero__media'), ['maxWidth','width'])},
    info:    {box: bx(q('.pdp-hero__buy')),
              style: cs(q('.pdp-hero__buy'), ['maxWidth','position','top'])},
    mediaBox: bx(q('.pdp-gal__main')),
    h1:      {box: bx(q('.pdp-title__h1')), type: cs(q('.pdp-title__h1'), TYPE)},
    variantTitle: {box: bx(q('.pdp-format')), type: cs(q('.pdp-format'), TYPE)},
    tagline: {box: bx(q('.pdp-tagline')), type: cs(q('.pdp-tagline'), TYPE),
              style: cs(q('.pdp-tagline'), ['borderInlineStartWidth','marginTop','marginBottom','paddingInlineStart'])},
    atc:     {box: bx(q('.pdp-atc')),
              style: cs(q('.pdp-atc'), ['height','backgroundColor','color','borderRadius','width'])},
    accordion: {root: bx(q('.pdp-acc')),
                style: cs(q('.pdp-acc'), ['borderTopWidth','marginTop']),
                count: qa('.pdp-acc__item').length,
                header: {box: bx(q('.pdp-acc__btn')),
                         style: cs(q('.pdp-acc__btn'), ['paddingTop','paddingBottom'])},
                icon: bx(q('.pdp-acc__icon'))},
    scentNotes: {box: bx(q('.pdp-notes__row')),
                 row: cs(q('.pdp-notes__row'), ['display','gap','gridTemplateColumns']),
                 third: {box: bx(q('.pdp-notes__tiers')), style: cs(q('.pdp-notes__tiers'), ['width','order'])},
                 twoThirds: {box: bx(q('.pdp-notes__media')), style: cs(q('.pdp-notes__media'), ['width','order'])},
                 section: {box: bx(q('.pdp-notes__tier')),
                           style: cs(q('.pdp-notes__tier'), ['borderTopWidth','paddingTop','paddingBottom'])},
                 label: {box: bx(q('.pdp-notes__label')), type: cs(q('.pdp-notes__label'), TYPE),
                         style: cs(q('.pdp-notes__label'), ['width','flexBasis'])}},
    quotes: {box: bx(q('.pdp-quote__row')),
             text: {box: bx(q('.pdp-quote__text')),
                    style: cs(q('.pdp-quote__text'), ['maxWidth','paddingInlineEnd','width'])},
             img: bx(q('.pdp-quote__media img'))},
    stickyCta: {box: bx(q('.pdp-buybar')),
                style: cs(q('.pdp-buybar'), ['position','bottom','display','justifyContent','minHeight'])},
    sections: qa('main > div, body > div[id^=sec-]').map(el => ({
      id: el.id, box: bx(el)
    })).filter(s => s.box && s.box.h > 0),
    console: window.__errs || []
  };
}
"""


def run(target, base=None):
    os.makedirs(SCREENS, exist_ok=True)
    results = {}
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for label, vw, vh in VIEWPORTS:
            if target == "phlur":
                jobs = [("vanilla-cream-duo", "file://" + os.path.abspath(
                            os.path.join(RAW, "vanilla-cream-duo.local.html"))),
                        ("missing-person-50ml", "file://" + os.path.abspath(
                            os.path.join(RAW, "missing-person-50ml.local.html")))]
                js = PHLUR_JS
            else:
                jobs = [("siwa-pdp", base), ("siwa-pdp-ar", base + "?locale=ar")]
                js = SIWA_JS

            for name, url in jobs:
                ctx = browser.new_context(viewport={"width": vw, "height": vh},
                                          device_scale_factor=1)
                page = ctx.new_page()
                errs = []
                page.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
                page.on("pageerror", lambda e: errs.append("pageerror: " + str(e)))
                try:
                    page.goto(url, wait_until="load", timeout=60_000)
                    page.wait_for_timeout(2500)
                    data = page.evaluate(js)
                    data["consoleErrors"] = errs
                    data["overflow"] = page.evaluate(
                        "document.documentElement.scrollWidth > window.innerWidth")
                    results[f"{name}@{label}"] = data
                    page.screenshot(path=os.path.join(SCREENS, f"{target}-{name}-{label}.png"),
                                    full_page=True)
                    print(f"OK   {name}@{label}  h={data['page']['h']} "
                          f"errs={len(errs)} overflow={data['overflow']}")
                except Exception as e:
                    print(f"FAIL {name}@{label}: {type(e).__name__}: {str(e)[:140]}")
                    results[f"{name}@{label}"] = {"error": str(e)[:300]}
                finally:
                    ctx.close()
        browser.close()

    out = os.path.join(PDPDIR, f"measure-{target}.json")
    with open(out, "w") as fh:
        json.dump(results, fh, indent=2)
    print("wrote", out)


if __name__ == "__main__":
    t = sys.argv[1] if len(sys.argv) > 1 else "phlur"
    run(t, sys.argv[2] if len(sys.argv) > 2 else None)
