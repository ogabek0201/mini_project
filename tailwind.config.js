/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode:'class',
  theme: {
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '770px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '639px'},

      'm': {'max': '500px'},
      // => ]@media (max-width: 639px) { ... }
    },
    container: {
      screens: {
        // mobile: "600px",
        tablet: "900px",
        desktop: "1400px",
      },
    },
  },
  plugins: [],
}
