/** @type {import('tailwindcss').Config} */

// Colors sampled directly from the official Síkat-Aurora brand deck.
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Signature yellow — carries the pill labels and icon accents
        gold: { DEFAULT: "#FBC21B", bright: "#FFC60B", soft: "#FEF3D0" },
        // Navy is the workhorse: headlines AND body copy
        navy: { DEFAULT: "#1D4A6F", deep: "#174367", ink: "#0F2A42" },
        primary: { DEFAULT: "#EC670A", dark: "#CE5806", soft: "#FDF0E6", foreground: "#ffffff" },
        crimson: { DEFAULT: "#BD0005", soft: "#FBEAEA" },
        forest: { DEFAULT: "#006B1E", soft: "#E6F2E9" },
        sky: { DEFAULT: "#9DD4F2", soft: "#EAF6FD" },
        cream: "#FBF9F6",
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(29,74,111,0.04), 0 6px 20px rgba(29,74,111,0.06)",
        "card-hover": "0 2px 4px rgba(29,74,111,0.06), 0 16px 36px rgba(29,74,111,0.12)",
        cta: "0 4px 14px rgba(236,103,10,0.25)",
        modal: "0 24px 60px rgba(15,42,66,0.28)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
}
