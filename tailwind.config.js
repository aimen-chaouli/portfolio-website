/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "index.html",
    "contact.html",
    "projects.html",
    "project-absence.html",
    "project-website.html",
    "project-pos.html",
    "project-inventory.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        accent: {
          DEFAULT: "#38bdf8",
          hover: "#7dd3fc",
        },
        ink: {
          950: "#0a0a0a",
          900: "#111111",
          800: "#1a1a1a",
        },
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out forwards",
        "fade-in": "fade-in 0.8s ease-out forwards",
      },
    },
  },
  plugins: [],
};
