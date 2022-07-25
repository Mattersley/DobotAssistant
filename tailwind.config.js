// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue'],
      serif: ['ui-serif'],
      mono: ['Monofur', 'ui-monospace', 'monospace'],
      display: ['Intro', 'Oswald'],
      body: ['Open Sans'],
    },
    maxWidth: {
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
    },
    extend: {
      borderRadius: {
        full: '60px',
      },
      colors: {
        current: 'currentColor',
        donutPink: '#CC99CC',
        donutPurple: '#800080',
        donutGradientPink: '#FFE6FA',
        donutGradientGreen: '#E3FDF5',
        lime: colors.lime,
      },
      height: {
        calcHeight: '90vh',
        labelHeight: '120px',
        labelPrintHeight: '100px',
        cardHeight: '336px',
        cardPrintHeight: '316px',
      },
      fontSize: {
        tiny: '.5rem',
      },
      margin: {
        labelMargins: '4px',
      },
      transitionProperty: {
        height: 'height',
        width: 'width',
      },
      width: {
        mainWidth: 'calc(100vw - 16rem)',
        cardWidth: '192px',
        cardPrintWidth: '172px',
        calcWidth: '90vw',
        labelWidth: '216px',
        labelPrintWidth: '196px',
      },
    },
  },
  variants: {
    extend: { display: ['group-hover'] },
  },
  plugins: [
    // eslint-disable-next-line global-require,import/no-extraneous-dependencies
    require('@tailwindcss/forms'),
  ],
}
