/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "../../packages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: [
        "Inter",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif",
      ],
      mono: ["Menlo", "Monaco", "Courier New", "monospace"],
    },
    extend: {
      colors: {
        dark: {
          100: "#f4f4f4",
          200: "#efefef",
          300: "#d2d2d2",
          400: "#c2c2c2",
          500: "#b2b2b2",
          600: "#74767c",
          700: "#8a8a8a",
          800: "#515151",
        },
      },
    },
  },
};
