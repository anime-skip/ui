module.exports = {
  presets: [require('./src/lib/tailwind.preset')],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
};
