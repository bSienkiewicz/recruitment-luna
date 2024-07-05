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
        gray_darker: "#E9E9E9"
      },
      textColor: {
        green_main: '#79CD3A',
        dark_green_main: '#66AC28',
      },
      animation: {
        'cycle': 'cycle 4s infinite',
      },
      keyframes: {
        'cycle': {
          '0%': { opacity: '30%' },
          '50%': { opacity: '100%' },
          '100%': { opacity: '30%' },
        },
      },
    },
  },
  plugins: [],
}
