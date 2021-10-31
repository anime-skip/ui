![Available Components](/.github/assets/components.png)

# Anime Skip UI

Vue component library for all of Anime Skip, using [TailwindCSS](https://tailwindcss.com/docs), powering the website and web extension

```bash
echo "@anime-skip:registry=https://npm.pkg.github.com/" >> .npmrc
pnpm add @anime-skip/ui
```

<br/>

## Contributing

See the [contributing guidelines](https://github.com/anime-skip/docs/wiki) for all of Anime Skip

<br/>

## Get Started

1. Install the library:

   ```bash
   echo "@anime-skip:registry=https://npm.pkg.github.com/" >> .npmrc
   pnpm add @anime-skip/ui
   ```
   
1. [Setup TailwindCSS](https://tailwindcss.com/docs/guides/vue-3-vite#setting-up-tailwind-css), stopping after the "Create your configuration files" steps

3. Modify the tailwind config
   ```js
   // tailwind.config.js
   module.exports = {
     presets: [require('@anime-skip/ui/tailwind.preset')],
     purge: [
       './index.html',
       './src/**/*.{vue,js,ts,jsx,tsx}',
       './node_modules/@anime-skip/ui/ui.*.js',
     ],
   };
   ```
1. Create a PostCSS config file
   ```js
   module.exports = {
     plugins: [require('tailwindcss'), require('autoprefixer')],
   };
   ```
1. Import the styles in your main entrypoint
   ```js
   import '@anime-skip/ui/tailwind.css';
   ```
   
<br/>

## Usage

This library is not documented yet. Play around with the code to see what changes, then use the components in your code

