# `@anime-skip/ui`

UI Component library for all of Anime Skip, using [TailwindCSS](https://tailwindcss.com/docs)

## Get Started

1. Setup your `.npmrc` file for the project:
   ```text
   @anime-skip:registry=https://npm.pkg.github.com/
   ```
1. Install the library
   ```bash
   yarn add @anime-skip/ui
   ```
1. Setup [TailwindCSS](https://tailwindcss.com/docs/guides/vue-3-vite#setting-up-tailwind-css), stopping after the "Create your configuration files" steps
1. Create the tailwind config
   ```js
   // tailwind.config.js
   module.exports = {
     presets: [require('@anime-skip/ui/tailwind.preset')],
     purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
   };
   ```
1. Create a PostCSS config file
   ```js
   module.exports = {
     plugins: [require('tailwindcss'), require('autoprefixer')],
   };
   ```

## Contributing

### Deployments

Deployment is automated. Simply merge a PR and it will be deployed.

### Manual Deployments

If you need to do a manual deployment (maybe for a early version or test version), run `./scripts/deploy.sh`.
