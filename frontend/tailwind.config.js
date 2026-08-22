// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   darkMode: "class",
//   theme: {
//     extend: {
//       colors: {
//         brand: {
//           50: '#ecfdf5',
//           100: '#d1fae5',
//           500: '#10b981',
//           600: '#059669',
//           700: '#047857',
//         }
//       }
//     },
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],

  darkMode: "class",

  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff7fa",
          100: "#ffe8f0",
          200: "#fbd0df",
          300: "#f7b0c8",
          400: "#f28eaf",
          500: "#ed6f9b",
          600: "#df5b8a",
          700: "#c94977",
          800: "#a83b62",
          900: "#8a3454",
        },

        blush: {
          50: "#fffafd",
          100: "#fff4f8",
          200: "#ffe8f0",
          300: "#fbd0df",
          400: "#f6adc5",
          500: "#ed6f9b",
        },
      },
    },
  },

  plugins: [],
};