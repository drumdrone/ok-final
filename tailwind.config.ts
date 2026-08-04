import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // PLAN.md §2 steel + cool crimson accent (logo-adjacent)
        steel: {
          50: "#f5f7fa",
          100: "#e4e9f0",
          200: "#c9d3df",
          300: "#a1b1c4",
          400: "#7288a2",
          500: "#526a87",
          600: "#3f536d",
          700: "#354458",
          800: "#2d394a",
          900: "#1c2431",
          950: "#111721",
        },
        accent: {
          50: "#fff1f3",
          100: "#ffe0e4",
          400: "#e83a52",
          500: "#c8102e",
          600: "#a50d26",
          700: "#860b1f",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
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
