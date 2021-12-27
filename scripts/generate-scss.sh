#!/bin/bash
set -e

# touch src/styles/variables-theme.scss
tailwindcss-export-config \
    --config=src/tailwind.preset.js \
    --destination=src/styles/variables-theme \
    --format=scss \
    --flat=true
    
# Fix lint
INPUT_FILE="src/styles/variables-theme.scss"
TEMP_OUTPUT="src/styles/variables-theme.scss-temp"
PATTERN="1 / -1"
while read -r line
do
  [[ ! $line =~ "$PATTERN" ]] && echo "$line"
done <"$INPUT_FILE" > "$TEMP_OUTPUT"
mv "$TEMP_OUTPUT" "$INPUT_FILE"
