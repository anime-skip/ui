#!/bin/bash
set -e

# touch src/lib/styles/variables-theme.scss
tailwindcss-export-config \
    --config src/lib/tailwind.preset.js \
    --destination src/lib/styles/variables-theme \
    --format scss \
    --flat true \
    --quoted-keys true

# Fix lint
INPUT_FILE="src/lib/styles/variables-theme.scss"
TEMP_OUTPUT="src/lib/styles/variables-theme.scss-temp"
PATTERN="1 / -1"
while read -r line
do
  [[ ! $line =~ "$PATTERN" ]] && echo "$line"
done <"$INPUT_FILE" > "$TEMP_OUTPUT"
mv "$TEMP_OUTPUT" "$INPUT_FILE"
