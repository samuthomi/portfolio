#!/bin/bash
# usage: checkurls.sh BASE_URL < urls.txt
while read -r p; do printf '%s ' "$p"; curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" "$1$p" | sed "s#$1##"; done
