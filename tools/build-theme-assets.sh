#!/usr/bin/env bash
# ============================================================
# Siwa — build theme assets from the component library
# ------------------------------------------------------------
# The component library is the ONE source of truth for design tokens and
# component CSS. siwa-theme/assets/*.css are GENERATED copies, never
# hand-edited — the house rule is "derived data cites its source".
#
# Edit:      component-library/css/tokens.css
#            component-library/css/components.css
# Then run:  tools/build-theme-assets.sh
#
# Shopify requires assets/ to be flat, so the library's two files map to
# two theme assets with a provenance header prepended to each.
# ============================================================
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$ROOT/component-library/css"
DEST="$ROOT/siwa-theme/assets"

if [ ! -d "$SRC" ]; then
  echo "error: component library CSS not found at $SRC" >&2
  exit 1
fi

mkdir -p "$DEST"

emit() {
  local src_file="$1" dest_file="$2" src_rel="$3"
  {
    printf '/* ============================================================\n'
    printf '   GENERATED FILE — DO NOT EDIT\n'
    printf '   Source: %s\n' "$src_rel"
    printf '   Rebuild: tools/build-theme-assets.sh\n'
    printf '   Edits made here are lost on the next build.\n'
    printf '   ============================================================ */\n\n'
    cat "$src_file"
  } > "$dest_file"
  printf '  %-28s <- %s (%s lines)\n' "$(basename "$dest_file")" "$src_rel" "$(wc -l < "$src_file" | tr -d ' ')"
}

echo "Building theme assets:"
emit "$SRC/tokens.css"     "$DEST/siwa-tokens.css"     "component-library/css/tokens.css"
emit "$SRC/components.css" "$DEST/siwa-components.css" "component-library/css/components.css"
echo "Done -> siwa-theme/assets/"
