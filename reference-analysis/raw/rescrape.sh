#!/bin/bash
cd /ahmed-taha-dev/Siwa/reference-analysis/raw
UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
ok=0; fail=0
for pass in 1 2 3; do
  while read -r h; do
    [ -z "$h" ] && continue
    if grep -qi 'jdgm-prev-badge\|shopify-section--main-product' "products/$h.html" 2>/dev/null; then continue; fi
    curl -sL --max-time 40 --compressed \
      -A "$UA" \
      -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8' \
      -H 'Accept-Language: en-US,en;q=0.9' \
      -H 'Accept-Encoding: gzip, deflate, br' \
      -H 'Sec-Fetch-Dest: document' -H 'Sec-Fetch-Mode: navigate' -H 'Sec-Fetch-Site: none' \
      -H 'Upgrade-Insecure-Requests: 1' \
      -H 'Referer: https://siwafragrances.com/collections/all' \
      --cookie-jar cf_cookies.txt --cookie cf_cookies.txt \
      "https://siwafragrances.com/products/$h" -o "products/$h.html"
    sleep 5
  done < blocked.txt
  sleep 10
done
for h in $(cat blocked.txt); do
  if grep -qi 'jdgm-prev-badge\|shopify-section--main-product' "products/$h.html" 2>/dev/null; then ok=$((ok+1)); else fail=$((fail+1)); echo "STILL BLOCKED: $h"; fi
done
echo "RESCRAPE COMPLETE: recovered=$ok still_blocked=$fail"
