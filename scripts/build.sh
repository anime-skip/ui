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
echo -e "\n/* compiled tailwind styles for components */\n" | cat - lib/style.css > lib/.temp.css && mv lib/.temp.css lib/style.css
echo "" >> lib/style.css
function appendCssToStyles {
    # $1: The path to the .css file who's content will be appended
    echo "Appending $1"
    echo -e "\n/* $1 */\n" >> lib/style.css
    cat "$1" >> lib/style.css
}
function appendScssToStyles {
    # $1: The path to the .scss file who's content will be compiled and appended
    echo "Appending $1"
    echo -e "\n/* $1 */\n" >> lib/style.css
    yarn -s sass "$1" lib/.temp.css 
    cat lib/.temp.css >> lib/style.css
    rm -rf lib/.temp.css*
}
function prependCssToStyles {
    # $1: The path to the .css file who's content will be prepended
    echo "Prepending $1"
    echo -e  "/* $1 */\n" | cat - "$1" | cat - lib/style.css > lib/.temp.css
    mv lib/.temp.css lib/style.css
}
prependCssToStyles "src/lib/scss/imports.css"
appendCssToStyles  "src/lib/scss/tailwind.css"
appendCssToStyles  "src/lib/scss/fonts.css"
appendCssToStyles  "src/lib/scss/defaults.css"
appendScssToStyles "src/lib/scss/utilities.scss"

# Remove source mappings from compiled SCSS
sed -i '/\/\*\# sourceMappingURL=.temp.css.map \*\//d' lib/style.css

# Copy package.json to build from the source
cp package.json lib/
