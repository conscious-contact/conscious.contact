/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{njk,md}", "./src/**/*.svg",],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['"Roboto Flex"', 'sans-serif'],
        'petrona': ['"Petrona"', 'serif']
      },
    },
    container: {
      center: true
    }
  },
  plugins: [],
}

