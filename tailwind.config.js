module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      Roboto: ['Roboto', 'sans-serif'], // Ensure fonts with spaces have " " surrounding it.
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
    require('tailwind-scrollbar-hide'),
  ],
}
