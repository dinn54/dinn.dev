import type { Config } from "tailwindcss";
import scrollbarHide from "tailwind-scrollbar-hide";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      //design system
      screens: {
        // tab: "28.125rem", // 450px
        tab: "37.5rem", //600px

        pc: "64.0625rem", // 1025px
        max: "90.063rem", //1441px
      },
      colors: {
        "default-dark": "#3a3a3a",
        "custom-green": "#6b8e23",
        "home-light": "#f8fbe8",
        "home-dark": "#3b4933",
        "about-light": "#EEF8E4",
        "about-dark": "#475d52",
        "projects-light": "#F9F3E8",
        "projects-dark": "#5a5d50",
        "review-light": "#f4f6ff",
        "review-dark": "#454a5f",

        "button-green-light": "#7A8D66",
        "button-green-dark": "#627A53",
        "button-gold-light": "#D3BB76",
        "button-gold-dark": "#8B7A3B",
        "button-blue-light": "#6A7DE7",
        "button-blue-dark": "#5162BD",

        "util-tech-stack-orange-bg": "#fdf6e1",
        "util-tech-stack-orange-bg-dark": "#746d57",
        "util-project-card-description-text": "#858585",
        "util-tech-stack-orange-text": "#EA9732",

        "util-scrollbar-blue-light": "#bac1e6",
        "util-scrollbar-blue-dark": "#525b91",
        "util-scrollbar-gray-light": "#d9d9d9",
        "util-scrollbar-gray-dark": "#5c5c5c",

        "util-container-bg-dark": "#4A4A4A",
        "util-input-light": "#f3f4f6",
        "util-input-dark": "#5c5c5c",
        "util-input-text": "#B5BBC4",

        "yellow-100-dark": "#625842",
        "blue-100-dark": "#003b5a",
        "fuchsia-100-dark": "#5c003b",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        noto: ["var(--font-noto)", "sans-serif"],
        sans: ["var(--font-inter)", "var(--font-noto)", "sans-serif"],
      },
      fontSize: {
        p8: "0.5rem", // 8px
        p9: "0.5625rem", // 9px
        p10: "0.625rem", // 10px
        p12: "0.75rem", // 12px
        p14: "0.875rem", // 14px
        p16: "1rem", // 16px
        p17: "1.0625rem", // 17px
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
        p24: "1.5rem",
      },
      width: {
        p194: "12.125rem", // 194px
        p180: "11.25rem", // 180px
        p166: "10.375rem", // 166px
      },
      height: {
        p38: "2.375rem", // 38px
        p50: "3.125rem", // 50px
        p47: "2.9375rem", // 47px
        p44: "2.75rem", // 44px
      },
      padding: {
        p38: "2.375rem", //38px
      },
    },
  },
  plugins: [
    scrollbarHide,
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
