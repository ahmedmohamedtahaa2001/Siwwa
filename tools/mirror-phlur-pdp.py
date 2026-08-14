#!/usr/bin/env python3
"""
Build a local, renderable mirror of the captured phlur.com PDPs.

Why a mirror rather than rendering the archive directly: web.archive.org serves
a single `id_` document fine, but returns HTTP 498 to a browser that requests
the page plus its ~30 subresources. The homepage capture hit the same wall from
the live origin (Cloudflare 403) and solved it with the archive; the PDP capture
solves the archive's own rate limit by fetching each asset once, over curl, and
rewriting the document to point at local copies.

What this gives, and what it does not:
  - EXACT: everything CSS drives — the 50/50 hero split, buy box width and
    rhythm, accordion metrics, band padding, the sticky column, breakpoints.
  - NOT AVAILABLE: swiper slide widths, which the carousel library computes in
    JS at runtime. Those are read from Phlur's authored config instead, never
    guessed. Scripts are stripped deliberately: they would call home to the
    archive and re-trigger the block.

Usage: python3 tools/mirror-phlur-pdp.py
"""
import os
import re
import subprocess
import sys
import time

BASE = os.path.join(os.path.dirname(__file__), "..", "reference-phlur", "pdp", "raw")
CSSDIR = os.path.join(BASE, "css")
SNAP = "20260507071628"

PAGES = ["vanilla-cream-duo.html", "missing-person-50ml.html",
         "solar-power-50ml.html", "apricot-privee-50ml.html"]

UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36")


def fetch(url, dest, tries=3):
    if os.path.exists(dest) and os.path.getsize(dest) > 200:
        return True
    for attempt in range(tries):
        r = subprocess.run(
            ["curl", "-sSL", "--compressed", "-m", "90", "-A", UA, url, "-o", dest],
            capture_output=True)
        if r.returncode == 0 and os.path.exists(dest) and os.path.getsize(dest) > 200:
            head = open(dest, "rb").read(200)
            if b"404 Not Found" not in head and b"Too Many Requests" not in head:
                return True
        time.sleep(8 * (attempt + 1))
    return False


def main():
    os.makedirs(CSSDIR, exist_ok=True)

    # 1. Collect every theme stylesheet referenced across the four documents.
    wanted = {}
    for page in PAGES:
        path = os.path.join(BASE, page)
        if not os.path.exists(path):
            continue
        html = open(path, encoding="utf-8", errors="replace").read()
        for m in re.finditer(r'href="([^"]*?/assets/([a-zA-Z0-9._-]+\.css)(\?[^"]*)?)"', html):
            wanted[m.group(2)] = m.group(1)

    print(f"{len(wanted)} unique stylesheets referenced")
    ok = 0
    for i, (name, href) in enumerate(sorted(wanted.items()), 1):
        dest = os.path.join(CSSDIR, name)
        if os.path.exists(dest) and os.path.getsize(dest) > 200:
            ok += 1
            print(f"  [{i:2}/{len(wanted)}] {name:38} cached")
            continue
        src = href if href.startswith("http") else "https:" + href
        # Route through the archive at the same snapshot the document came from.
        src = re.sub(r"^https?://", "", src)
        url = f"https://web.archive.org/web/{SNAP}id_/https://{src}"
        got = fetch(url, dest)
        ok += got
        print(f"  [{i:2}/{len(wanted)}] {name:38} {'ok' if got else 'FAIL'}")
        time.sleep(3)

    print(f"\n{ok}/{len(wanted)} stylesheets available")

    # 2. Rewrite each document against the local copies.
    for page in PAGES:
        path = os.path.join(BASE, page)
        if not os.path.exists(path):
            continue
        html = open(path, encoding="utf-8", errors="replace").read()

        # Theme stylesheets -> local files.
        def local_css(m):
            name = m.group(2)
            if os.path.exists(os.path.join(CSSDIR, name)):
                return f'href="css/{name}"'
            return 'href="about:blank"'
        html = re.sub(r'href="([^"]*?/assets/([a-zA-Z0-9._-]+\.css)(\?[^"]*)?)"',
                      local_css, html)

        # Scripts would call the archive and re-trigger the 498; drop them.
        html = re.sub(r"<script\b[^>]*>.*?</script>", "", html, flags=re.S)
        html = re.sub(r"<script\b[^>]*/?>", "", html)
        # Remote fonts/CDN CSS and images: neutralise so nothing blocks paint.
        html = re.sub(r'<link[^>]+href="https?://(?!.*css/)[^"]*"[^>]*>', "", html)
        html = re.sub(r'(<img[^>]+)src="//[^"]*"', r'\1src=""', html)
        html = re.sub(r'srcset="[^"]*"', "", html)

        out = path.replace(".html", ".local.html")
        open(out, "w", encoding="utf-8").write(html)
        print(f"wrote {os.path.basename(out)}  ({len(html)//1024}KB)")

    return 0


if __name__ == "__main__":
    sys.exit(main())
