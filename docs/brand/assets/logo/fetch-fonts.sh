#!/usr/bin/env bash
# Fetch the OFL fonts the logo generator needs into ./fonts (git-ignored).
# Bricolage Grotesque (wordmarks) + Geist Mono ("by excentrix" tag).
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p fonts
UA="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36"
get() { # family-query  outfile
  url=$(curl -sS -A "$UA" "https://fonts.googleapis.com/css2?family=$1" \
        | grep -oE 'https://[^)]+\.ttf' | head -1)
  echo "$2 <- $url"
  curl -sS -o "fonts/$2" "$url"
}
get "Bricolage+Grotesque:wght@600" bricolage-600.ttf
get "Geist+Mono:wght@500"          geist-mono-500.ttf
echo "done -> ./fonts"
