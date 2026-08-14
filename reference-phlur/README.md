# Drop folder — phlur.com layout reference

phlur.com blocks automated access (Cloudflare, HTTP 403 on every content
path; only robots.txt returns 200). Its robots.txt asks automated clients
not to browse and points them at an MCP endpoint we cannot reach from this
session. So the capture has to come from a human browser.

Drop EITHER of these here and say the word — I will parse it and rebuild
the homepage layout against it.

## Option A — full-page screenshot (fastest)

Chrome:   open phlur.com → Cmd/Ctrl+Shift+P → type "screenshot"
          → "Capture full size screenshot"
Firefox:  right-click the page → "Take Screenshot" → "Save full page"

Save as:  reference-phlur/phlur-desktop.png
Mobile:   DevTools → device toolbar (Cmd/Ctrl+Shift+M) → iPhone → repeat
          → reference-phlur/phlur-mobile.png

A screenshot is enough on its own. Band order, grid counts, card shapes,
rail-vs-tile, where reviews and UGC sit — all of it is visible.

## Option B — saved HTML (more precise)

Cmd/Ctrl+S → "Webpage, Complete" (or "Single File" / .mhtml)
Save as:  reference-phlur/phlur.html

This gives the real DOM: section order, grid column counts, breakpoints,
and the class names behind each band.

## Or just paste the screenshot into the chat

That is how the product-card spec arrived, and it worked precisely.

## What happens next

Layout and structure only — band order, grids, card shapes, rhythm.
Copy, imagery and components stay Siwa's own: the campaign photography,
the real 56-product catalogue, the existing component library.

Price register differs sharply (Phlur ~$99 vs Siwa ~800-2,300 EGP), so
per DIRECTION.md Part 2 §1 the reference governs WHAT is shown and HOW it
behaves, never how it sounds or looks. Reviews stay loud, prices stay
visible, the two-register firewall stays intact.
