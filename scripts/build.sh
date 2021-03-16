#!/bin/bash
set -e

# Clean lib/
mkdir -p lib
rm -rf lib/*

# Build library
./scripts/generate-scss.sh
node scripts/generate-theme-vars.js
yarn vite build

# Copy in direct files
cp src/lib/tailwind.preset.js lib/
cp src/lib/scss/theme.scss lib/

# Add tailwind setup and utils to style.css
echo -e "\n" >> lib/style.css
cat src/lib/scss/tailwind.css >> lib/style.css

echo -e "\n" >> lib/style.css
cat src/lib/scss/fonts.css >> lib/style.css

echo -e "\n" >> lib/style.css
cat src/lib/scss/defaults.css >> lib/style.css

echo -e "\n" >> lib/style.css
yarn sass src/lib/scss/utilities.scss lib/.temp.css 
cat lib/.temp.css >> lib/style.css
rm -rf lib/.temp.css*

# Copy package.json to build from the source
cp package.json lib/
