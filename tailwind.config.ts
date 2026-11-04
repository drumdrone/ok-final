import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    // ── 8px grid (Wayfair "Rule of 8") ─────────────────────────────
    // Every line-height is a multiple of 8px, so text blocks always
    // land on the grid. Font sizes follow a 4/8-step scale.
    // Ratio-based leading (relaxed/tight/snug) is deliberately removed:
    // a ratio × font-size rarely lands on 8px. Use leading-{4,6,8,…}.
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1rem" }], //    12 / 16
      sm: ["0.875rem", { lineHeight: "1.5rem" }], // 14 / 24
      base: ["1rem", { lineHeight: "1.5rem" }], //   16 / 24
      lg: ["1.125rem", { lineHeight: "2rem" }], //   18 / 32  (lead copy)
      xl: ["1.25rem", { lineHeight: "1.5rem" }], //  20 / 24  (card titles)
      "2xl": ["1.5rem", { lineHeight: "2rem" }], //  24 / 32
      "3xl": ["2rem", { lineHeight: "2.5rem" }], //  32 / 40
      "4xl": ["2.5rem", { lineHeight: "3rem" }], //  40 / 48
      "5xl": ["3rem", { lineHeight: "3.5rem" }], //  48 / 56
      "6xl": ["4rem", { lineHeight: "4.5rem" }], //  64 / 72
      "7xl": ["4.5rem", { lineHeight: "5rem" }], //  72 / 80
      "8xl": ["6rem", { lineHeight: "6rem" }], //    96 / 96
      "9xl": ["8rem", { lineHeight: "8rem" }], //   128 / 128
    },
    lineHeight: {
      none: "1",
      "4": "1rem",
      "6": "1.5rem",
      "8": "2rem",
      "10": "2.5rem",
      "12": "3rem",
      "14": "3.5rem",
      "16": "4rem",
      "18": "4.5rem",
      "20": "5rem",
    },
    extend: {
      colors: {
        // PLAN.md §2 steel + cool crimson accent (logo-adjacent)
        // Průmyslový Design Systém — charcoal neutrals (#F5F7F9 → #1C2023)
        steel: {
          50: "#f5f7f9",
          100: "#e8ebee",
          200: "#d1d5d8",
          300: "#b3b9be",
          400: "#898f94",
          500: "#666c70",
          600: "#4d5256",
          700: "#3a3f43",
          800: "#2a2e31",
          900: "#1f2225",
          950: "#1c2023",
        },
        // signal / brand red #CC1827 with deep-crimson hover #A80118
        accent: {
          50: "#fdeaec",
          100: "#fbced3",
          400: "#e2404f",
          500: "#cc1827",
          600: "#a80118",
          700: "#880314",
        },
        // technical blue (indicators, EDM technology)
        tech: {
          50: "#eaf2fb",
          100: "#cfe1f5",
          500: "#2171cc",
          600: "#1a5aa6",
          700: "#154984",
        },
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        display: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      container: {
        center: true,
        // Cap at max-w-7xl (1280px) so .container matches the homepage,
        // header and footer at every breakpoint, including 2xl.
        screens: {
          sm: "100%",
          md: "100%",
          lg: "100%",
          xl: "1280px",
          "2xl": "1280px",
        },
        padding: {
          DEFAULT: "1.5rem",
          lg: "2rem",
        },
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) both",
      },
    },
  },
  plugins: [],
} satisfies Config;
