/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderColor: {
        gray_border: '#D8D8D8',
      },
      backgroundColor: {
        green_main: '#79CD3A',
      },
      textColor: {
        green_main: '#79CD3A',
        dark_green_main: '#66AC28',
      },
    },
  },
  plugins: [],
}
