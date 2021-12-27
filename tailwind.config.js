/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  presets: [require('./src/lib/tailwind.preset')],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media',
  prefix: 'as-',
};
