/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textStroke: {
        '1': '1px',
        '2': '2px',
        '3': '3px',
      },
      textStrokeColor: {
        'white': '#ffffff',
        'black': '#000000',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-stroke-1': {
          '-webkit-text-stroke': '1px',
        },
        '.text-stroke-2': {
          '-webkit-text-stroke': '2px',
        },
        '.text-stroke-3': {
          '-webkit-text-stroke': '3px',
        },
        '.text-stroke-white': {
          '-webkit-text-stroke-color': '#ffffff',
        },
        '.text-stroke-black': {
          '-webkit-text-stroke-color': '#000000',
        },
      }
      addUtilities(newUtilities)
    },
  ],
} 