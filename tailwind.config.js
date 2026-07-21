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
        display: ["Fraunces", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(13,31,45,0.03)",
        "card-hover": "0 1px 2px rgba(13,31,45,0.04), 0 10px 28px rgba(13,31,45,0.07)",
        cta: "none",
        modal: "0 24px 60px rgba(4,9,15,0.28)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
}
