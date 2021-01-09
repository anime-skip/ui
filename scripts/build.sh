#!/bin/bash
set -e
rm -rf lib/* esm/* cjs/*

yarn build:tailwind-scss
yarn build:es
yarn build:js
yarn build:js_css
yarn build:types

mkdir -p lib/scss
cp src/lib/scss/* lib/scss
# cp -r src/lib/components lib/components
cp src/lib/tailwind.preset.js lib/tailwind.js

yarn tsc -p tsconfig.build.json
# cat src/@types/shims-vue.d.ts >> lib/components/index.d.ts
