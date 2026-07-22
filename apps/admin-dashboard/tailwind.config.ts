import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#7B1C1C",
          dark: "#5C1414",
          light: "#9B2525",
          50: "#FEF4F4",
          100: "#FEE2E2",
          200: "#FECACA",
          800: "#4A1010",
          900: "#3D0D0D",
        },
        gold: {
          DEFAULT: "#C9A84C",
          light: "#E8C97A",
          dark: "#9A7A2E",
          50: "#FFFBEB",
          100: "#FEF3C7",
        },
        cream: {
          DEFAULT: "#F5F0EA",
          50: "#FAF8F4",
          100: "#F5F0EA",
          200: "#EDE5D8",
          300: "#DDD5C5",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.65rem", { lineHeight: "1rem" }],
      },
      boxShadow: {
        card: "0 1px 4px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        "card-md": "0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",
        dialog: "0 20px 60px rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.10)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          from: { opacity: "0", transform: "scale(0.97)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.2s ease-out",
        "slide-in": "slide-in 0.25s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
