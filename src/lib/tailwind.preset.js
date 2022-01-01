const defaultTheme = require('tailwindcss/defaultTheme');

const toHex = d => d.toString(16); // convert a decimal value to hex
const toDecimal = h => parseInt(h, 16); // convert a hex value to decimal

function mix(overlay, base, overlayOpacity = 50) {
  let color = '#';

  for (let i = 1; i <= 6; i += 2) {
    // loop through each of the 3 hex pairs—red, green, and blue
    const v1 = toDecimal(overlay.substr(i, 2)); // extract the current pairs
    const v2 = toDecimal(base.substr(i, 2));

    // combine the current pairs from each source color, according to the specified weight
    let val = toHex(Math.floor(v2 + (v1 - v2) * (overlayOpacity / 100.0)));

    while (val.length < 2) {
      val = '0' + val;
    } // prepend a '0' if val results in a single digit

    color += val; // concatenate val to our new color string
  }

  return color; // PROFIT!
}

function toRgb(hex) {
  hex = hex.replace('#', '');
  return {
    r: toDecimal(hex.substring(0, 2)),
    g: toDecimal(hex.substring(2, 4)),
    b: toDecimal(hex.substring(4, 6)),
  };
}

const primaryColor = {
  50: '#e1f5fe',
  100: '#b3e6fb',
  200: '#81d5f9',
  300: '#4ec4f6', // * primary
  400: '#25b8f5',
  500: '#00abf4', // * brand
  600: '#009de5',
  700: '#008ad1',
  800: '#0079bd',
  900: '#00599c',
};

const secondaryColor = {
  50: '#f0e8f9',
  100: '#d7c7f0',
  200: '#bda2e7',
  300: '#a27bde',
  400: '#8d5dd6', // * primary
  500: '#793fce', // * brand
  600: '#6f3ac7',
  700: '#6131be',
  800: '#552bb7',
  900: '#411ea8',
};

const complementaryColor = {
  50: '#fbe7e4',
  100: '#fdc8b3',
  200: '#faa582',
  300: '#f78250',
  400: '#f46726',
  500: '#f04d00',
  600: '#e64700',
  700: '#d94100',
  800: '#cb3900',
  900: '#b32c00',
};

const analogousColor = {
  50: '#f3f9e9',
  100: '#e0f1c7',
  200: '#cce7a3',
  300: '#b6dd7d',
  400: '#a5d65e',
  500: '#95ce3f',
  600: '#85be37',
  700: '#6fa92d',
  800: '#5b9523',
  900: '#34730f',
};

const background = '#142026';
const control = mix('#000000', background, 60);

/**
 * Create a color that can be changed through a CSS variable, meaning it's theme-able
 *
 * https://tailwindcss.com/docs/customizing-colors#using-css-variables
 */
function themedColor(variable, defaultHexColor) {
  const { r, g, b } = toRgb(defaultHexColor);
  const defaultRgb = `${r} ${g} ${b}`;
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}, ${defaultRgb}))`;
    }
    return `rgb(var(${variable}, ${defaultRgb}) / ${opacityValue})`;
  };
}

module.exports = {
  safelist: [
    // Checkbox colors styles
    'as-fill-on-primary',
    'as-fill-on-primary-variant',
    'as-fill-on-secondary',
    'as-fill-on-secondary-variant',
    'as-fill-on-surface',
    'as-fill-on-error',
    'as-text-on-primary',
    'as-text-on-primary-variant',
    'as-text-on-secondary',
    'as-text-on-secondary-variant',
    'as-text-on-surface',
    'as-text-on-error',
  ],
  theme: {
    colors: {
      transparent: '#00000000',

      // Palettes
      primaryPalette: primaryColor,
      secondaryPalette: secondaryColor,
      complementaryPalette: complementaryColor,
      analogousPalette: analogousColor,

      // Colors
      primary: themedColor('--as-theme-primary', primaryColor[300]),
      'primary-variant': themedColor('--as-theme-primary-variant', primaryColor[700]),
      'primary-dark': themedColor('--as-theme-primary', primaryColor[500]),
      secondary: themedColor('--as-theme-secondary', secondaryColor[400]),
      'secondary-variant': themedColor('--as-theme-secondary-variant', secondaryColor[700]),
      background: themedColor('--as-theme-background', background),
      error: themedColor('--as-theme-error', mix('#ffffff', complementaryColor[500], 40)),
      'error-variant': themedColor(
        '--as-theme-error-variant',
        mix('#ffffff', complementaryColor[700], 10)
      ),
      success: themedColor('--as-theme-success', mix('#ffffff', analogousColor[500], 32)),
      control: themedColor('--as-theme-control', control),
      'control-variant': themedColor('--as-theme-control-variant', mix('#000000', control, 64)),
      'control-disabled': themedColor(
        '--as-theme-control-disabled',
        mix('#ffffff', background, 10)
      ),
      'control-highlight': themedColor(
        '--as-theme-control-highlight',
        mix('#ffffff', background, 20)
      ),

      // On Surfaces
      'on-primary': themedColor('--as-theme-on-primary', '#000000'),
      'on-primary-variant': themedColor('--as-theme-on-primary-variant', '#ffffff'),
      'on-secondary': themedColor('--as-theme-on-secondary', '#ffffff'),
      'on-secondary-variant': themedColor('--as-theme-on-secondary-variant', '#ffffff'),
      'on-surface': themedColor('--as-theme-on-surface', '#ffffff'),
      'on-error': themedColor('--as-theme-on-error', '#000000'),
      'on-success': themedColor('--as-theme-on-success', '#000000'),

      // Misc
      'timeline-foreground': themedColor('--as-theme-timeline-foreground', primaryColor[500]),
      'timeline-background': themedColor('--as-theme-timeline-background', '#40667A'),
    },
    background: theme => ({
      // Surfaces
      'surface-1': themedColor(
        '--as-theme-surface-1',
        mix('#ffffff', theme('colors.background'), 5)
      ),
      'surface-2': themedColor(
        '--as-theme-surface-2',
        mix('#ffffff', theme('colors.background'), 7)
      ),
      'surface-3': themedColor(
        '--as-theme-surface-3',
        mix('#ffffff', theme('colors.background'), 8)
      ),
      'surface-4': themedColor(
        '--as-theme-surface-4',
        mix('#ffffff', theme('colors.background'), 9)
      ),
      'surface-6': themedColor(
        '--as-theme-surface-6',
        mix('#ffffff', theme('colors.background'), 11)
      ),
      'surface-8': themedColor(
        '--as-theme-surface-8',
        mix('#ffffff', theme('colors.background'), 12)
      ),
      'surface-12': themedColor(
        '--as-theme-surface-12',
        mix('#ffffff', theme('colors.background'), 14)
      ),
      'surface-16': themedColor(
        '--as-theme-surface-16',
        mix('#ffffff', theme('colors.background'), 15)
      ),
      'surface-24': themedColor(
        '--as-theme-surface-24',
        mix('#ffffff', theme('colors.background'), 16)
      ),
    }),
    fill: theme => ({
      primary: theme('colors.primary'),
      'primary-variant': theme('colors.primary-variant'),
      'timeline-foreground': theme('colors.timeline-foreground'),
      secondary: theme('colors.secondary'),
      'secondary-variant': theme('colors.red'),
      surface: theme('colors.surface'),
      error: theme('colors.error'),
      success: theme('colors.success'),

      'on-primary': theme('colors.on-primary'),
      'on-primary-variant': theme('colors.on-primary-variant'),
      'on-secondary': theme('colors.on-secondary'),
      'on-secondary-variant': theme('colors.red'),
      'on-surface': theme('colors.on-surface'),
      'on-error': theme('colors.on-error'),
      'on-success': theme('colors.on-success'),
    }),
    opacity: {
      0: '0',
      hover: '0.06',
      active: '0.12',
      divider: '0.12',
      low: '0.38',
      medium: '0.64',
      high: '0.87',
      100: '1',
    },
    fontFamily: {
      body: ['Roboto', 'Helvetica', ...defaultTheme.fontFamily.sans],
      mono: ['Overpass Mono', ...defaultTheme.fontFamily.mono],
    },
    extend: {
      fontFamily: {
        heading: ['Overpass', 'Avenir', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
