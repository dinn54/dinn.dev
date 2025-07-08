import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      //design system
      screens: {
        tab: "26.25rem", // 420px
        pc: "80rem", // 1280px
      },
      colors: {
        custom: "#333333",
        "home-light": "#f8fbe8",
        "home-dark": "#3b4933",
        "about-light": "#f8fcf4",
        "about-dark": "#475d52",
        "projects-light": "#fefcf9",
        "projects-dark": "#5a5d50",
        "review-light": "#f4f6ff",
        "review-dark": "#454a5f",

        "button-green-light": "#7A8D66",
        "button-green-dark": "#627A53",
        "button-gold-light": "#D3BB76",
        "button-gold-dark": "#8B7A3B",
        "button-blue-light": "#6A7DE7",
        "button-blue-dark": "#5162BD",

        "util-scrollbar-blue-light": "#bac1e6",
        "util-scrollbar-blue-dark": "#525b91",
        "util-scrollbar-gray-light": "#d9d9d9",
        "util-scrollbar-gray-dark": "#5c5c5c",

        "util-input-light": "#f3f4f6",
        "util-input-dark": "#5c5c5c",
        "util-input-text": "#B5BBC4",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        noto: ["var(--font-noto)", "sans-serif"],
        sans: ["var(--font-inter)", "var(--font-noto)", "sans-serif"],
      },
      fontSize: {
        p12: "0.75rem", // 12px
        p14: "0.875rem", // 14px
        p16: "1rem", // 16px
        p18: "1.125rem", // 18px
        p20: "1.25rem", // 20px
        p24: "1.5rem", // 24px
        p28: "1.75rem", // 28px
        p30: "1.875rem", // 30px
        p32: "2rem", // 32px
        p36: "2.25rem", // 36px
        p38: "2.375rem", // 38px
        p40: "2.5rem", // 40px
        p52: "3.25rem", // 52px
      },
      fontWeight: {
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      lineHeight: {
        base: "1.1",
        p45: "1.45", // 145%
      },
      letterSpacing: {
        base: "-0.02em",
        mp5: "-0.005em",
        mp25: "-0.025em",
      },
      borderRadius: {
        p12: "0.75rem",
        p20: "1.25rem",
      },
      width: {
        p194: "12.125rem", // 194px
      },
      height: {
        p50: "3.125rem", // 50px
      },
      padding: {
        p38: "2.375rem", //38px
      }
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function ({ matchUtilities, theme }: { matchUtilities: any; theme: any }) {
      matchUtilities(
        {
          "shadow-color": (value: string) => ({
            "--shadow-color": value,
          }),
        },
        { values: theme("colors") },
      );
    },
  ],
};
export default config;
