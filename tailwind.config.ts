import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
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
          DEFAULT: "1.25rem",
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
