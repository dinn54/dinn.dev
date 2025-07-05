/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      //design system
      screens:{
        tab: '26.25rem',   // 420px
        pc: '80rem',       // 1280px
      },
      colors:{
        home: {
          light: '#f8fbe8',
          dark: '#3b4933',
        },
        about: {
          light: '#f8fcf4',
          dark: '#475d52',
        },
        projects: {
          light: '#fefcf9',
          dark: '#5a5d50',
        },
        review: {
          light: '#f4f6ff',
          dark: '#454a5f',
        },
        button: {
          green: {
            light: '#7A8D66',
            dark: '#627A53',
          },
          gold: {
            light: '#D3BB76',
            dark: '#8B7A3B',
          },
          blue: {
            light: '#6A7DE7',
            dark: '#5162BD',
          },
        },
        util: {
          scrollbar: {
            blue: {
              light: '#bac1e6',
              dark: '#525b91',
            },
            gray: {
              light: '#d9d9d9',
              dark: '#5c5c5c',
            },
          },
          input: {
            light: '#f3f4f6',
            dark: '#5c5c5c',
            text: '#B5BBC4'
          },
        },
      },
      fontFmaily: {
        inter: ['var(--font-inter)', 'sans-serif'],
        noto: ['var(--font-noto)', 'sans-serif'],
        sans: ['var(--font-inter)', 'var(--font-noto)', 'sans-serif'],
      },
      fontSize: {
        '12': '0.75rem',   // 12px
        '14': '0.875rem',  // 14px
        '16': '1rem',      // 16px
        '18': '1.125rem',  // 18px
        '20': '1.25rem',   // 20px
        '24': '1.5rem',    // 24px
        '28': '1.75rem',   // 28px
        '30': '1.875rem',  // 30px
        '32': '2rem',      // 32px
        '36': '2.25rem',   // 36px
        '38': '2.375rem',  // 38px
        '40': '2.5rem',    // 40px
        '52': '3.25rem',   // 52px
      },
      fontWeight: {
        'regular': 400,
        'medium': 500,
        'semibold': 600,
        'bold': 700,
      },
      lineHeight: {
        'base': '1.1',
      },
      letterSpacing: {
        'base': '-0.02em'
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