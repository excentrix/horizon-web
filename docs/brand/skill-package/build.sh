#!/usr/bin/env bash
# Repackage the `brand` skill: refresh the bundled brand spec + logo kit, then re-zip.
# Run from docs/brand/skill-package/  →  produces brand.zip (upload-ready).
set -euo pipefail
cd "$(dirname "$0")"

DOCS=".."
RES="brand/resources"
mkdir -p "$RES"

# Snapshot the live brand docs into the package (SKILL.md is hand-maintained).
for f in README COLORS TYPOGRAPHY LOGO COMPONENTS; do
  cp "$DOCS/$f.md" "$RES/$f.md"
done

# Canonical tokens.
cp "$DOCS/assets/tokens.css"  "$RES/tokens.css"
cp "$DOCS/assets/tokens.json" "$RES/tokens.json"

# The ready-to-use logo kit (assets + README + generator), minus fetched fonts / scratch.
rm -rf "$RES/logo"
mkdir -p "$RES/logo"
cp -r "$DOCS/assets/logo/." "$RES/logo/"
rm -rf "$RES/logo/fonts" "$RES/logo/_probe.png" "$RES/logo/.gitignore"

rm -f brand.zip
zip -r brand.zip brand -x ".*" >/dev/null
echo "Rebuilt brand.zip"
unzip -l brand.zip | tail -n +4 | head -n -2 | awk '{print "  "$4}'
