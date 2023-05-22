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
        },
      },
    },
  },
};
