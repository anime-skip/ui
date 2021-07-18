#!/bin/bash
set -e

# touch src/lib/styles/variables-theme.scss
yarn -s tailwindcss-export-config \
    --config=src/lib/tailwind.preset.js \
    --destination=src/lib/styles/variables-theme \
    --format=scss \
    --flat=true
