/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Inter',
      }, 
      gridTemplateColumns: {
        'main': '30% 70%',
      },
      colors: {
        primary: '#D9D9D9',
        secondary: {
          def: '#2C302E',
          dark: '#201c1c',
        },
        success: '#4BB543',
        danger: '#DB3838',
        white: '#FBFCFF'
      },
    },
  },
  plugins: [],
}