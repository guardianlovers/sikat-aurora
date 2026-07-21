/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#E55C14",
          dark: "#C94F0F",
          soft: "#FEF3EC",
          foreground: "#ffffff",
        },
        gold: "#F5C200",
        navy: { DEFAULT: "#0D1F2D", deep: "#04090F" },
        ocean: { DEFAULT: "#1A3F5C", soft: "#EEF4FA" },
        teal: { DEFAULT: "#0E6B8C", soft: "#E8F4F8" },
        sky: "#A8D4F0",
        forest: "#155222",
        ink: "#4A5568",
        cream: "#F7F4F0",
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(13,31,45,0.04), 0 8px 24px rgba(13,31,45,0.05)",
        "card-hover": "0 2px 4px rgba(13,31,45,0.05), 0 14px 32px rgba(13,31,45,0.10)",
        cta: "0 4px 14px rgba(229,92,20,0.28)",
        modal: "0 20px 50px rgba(4,9,15,0.25)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
}
