/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Síkat-Aurora brand colors (same as public site)
        gold: { DEFAULT: "#FBC21B", bright: "#FFC60B", soft: "#FEF3D0" },
        navy: { DEFAULT: "#1D4A6F", deep: "#174367", ink: "#0F2A42" },
        primary: { DEFAULT: "#EC670A", dark: "#CE5806", soft: "#FDF0E6", foreground: "#ffffff" },
        crimson: { DEFAULT: "#BD0005", soft: "#FBEAEA" },
        forest: { DEFAULT: "#006B1E", soft: "#E6F2E9" },
        sky: { DEFAULT: "#9DD4F2", soft: "#EAF6FD" },
        cream: "#FBF9F6",
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Poppins", "ui-sans-serif", "sans-serif"],
      },
    },
  },
  plugins: [],
}
