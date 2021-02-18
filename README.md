# `@anime-skip/ui`

UI Component library for all of Anime Skip, using [TailwindCSS](https://tailwindcss.com/docs)

## Setup

1.  Install along with peer dependencies:

    ```bash
    # Install
    yarn add @anime-skip/ui

    # Peer dependencies
    yarn add -D tailwindcss@npm:@tailwindcss/postcss7-compat @tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
    ```

1.  Create the tailwind config
    ```js
    // tailwind.config.js
    module.exports = {
      presets: [require('@anime-skip/ui/tailwind-preset')],
      purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    };
    ```
1.  Create a PostCSS config file
    ```js
    module.exports = {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    };
    ```
