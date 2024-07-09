import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderColor: {
        green_main: '#33D999',
        darker: "#0f0f0f",
        dark: "#141414",
        lighter_dark: "#282828",
      },
      backgroundColor: {
        green_main: '#33D999',
        dark_green_main: '#2E8B57',
        gray_darker: "#E9E9E9",
        dark: "#141414",
        darker: "#0f0f0f",
        lighter_dark: "#1E1E1E",
      },
      textColor: {
        green_main: '#33D999',
        dark_green_main: '#2E8B57',
        lighter_dark: "#383838",
      },
      animation: {
        'cycle': 'cycle 4s infinite',
        'fade-in': 'fade-in 0.3s ease-in-out forwards',
      },
      keyframes: {
        'cycle': {
          '0%': { opacity: '30%' },
          '50%': { opacity: '100%' },
          '100%': { opacity: '30%' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
