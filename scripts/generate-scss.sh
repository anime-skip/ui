#!/bin/bash
set -e

yarn tailwindcss-export-config \
    --config=src/lib/tailwind.preset.js \
    --destination=src/lib/scss/theme \
    --format=scss \
    --flat=true
