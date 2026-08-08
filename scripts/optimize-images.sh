#!/bin/sh
#
# Converts screenshots to WebP, in place.
#
# Screenshots of a UI are the worst case for PNG: anti-aliased text and
# gradients defeat its compression, and one crossword grid came to 341 KB. The
# same image as WebP at q82 is 20 KB with nothing visible lost. Every screenshot
# in the repo is WebP for that reason.
#
# Drop a .png or .jpg into src/assets/screens, run `yarn images`, then point the
# import at the .webp. sharp comes from npx rather than package.json: this runs
# when a screenshot changes, which is rarely, and nothing about the build or CI
# should have to install it.
#
# Check the result before committing. q82 is chosen for screenshots of text and
# fine lines; if a particular image shows artifacts, re-run it by hand at a
# higher quality.

set -eu

DIR=src/assets/screens
QUALITY=82

# shellcheck disable=SC2044
sources=$(find "$DIR" -type f \( -name '*.png' -o -name '*.jpg' -o -name '*.jpeg' \))

if [ -z "$sources" ]; then
  echo "No .png or .jpg in $DIR. Screenshots there are already WebP."
  exit 0
fi

echo "$sources" | while read -r source; do
  before=$(wc -c <"$source" | tr -d ' ')
  npx --yes sharp-cli@5 -i "$source" -o "$DIR" -f webp -q "$QUALITY" >/dev/null
  target="${source%.*}.webp"
  after=$(wc -c <"$target" | tr -d ' ')
  rm "$source"
  echo "$(basename "$source") $((before / 1024))K -> $(basename "$target") $((after / 1024))K"
done

echo "Done. Update any import that still points at the old extension."
