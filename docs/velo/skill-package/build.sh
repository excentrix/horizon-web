#!/usr/bin/env bash
# Repackage the velo-content skill: refresh the bundled context snapshot + re-zip.
# Run from docs/velo/skill-package/  →  produces velo-content.zip (upload-ready).
set -euo pipefail
cd "$(dirname "$0")"

DOCS=".."
RES="velo-content/resources"
mkdir -p "$RES"

# Snapshot the live context docs into the package (SKILL.md is hand-maintained).
for f in PRODUCT VOICE CHANNELS CONTENT SEO_GEO DISTRIBUTION STATE ROADMAP; do
  cp "$DOCS/$f.md" "$RES/$f.md"
done

rm -f velo-content.zip
zip -r velo-content.zip velo-content -x ".*" >/dev/null
echo "Rebuilt velo-content.zip"
unzip -l velo-content.zip | tail -n +4 | head -n -2 | awk '{print "  "$4}'
