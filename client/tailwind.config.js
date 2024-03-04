/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary': {
          mellow: '#FFBB5C',
          light: '#FF9B50',
          DEFAULT: '#E25E3E',
          dark: '#C63D2F',
          
        },
       
        'secondary': {
          mellow: '#C5FFF8',
          light: '#96EFFF',
          DEFAULT: '#5FBDFF',
          dark: '#7B66FF',
        },
        'tertiary': {
          light: '#000000',
          DEFAULT: '#000000',
          dark: '#000000',
        },
      },
      fontFamily: {
        roboto: ['Roboto', 'arial', 'sans-serif'],
        gluten: ['Gluten', 'sans-serif']
      }
    },
  },
  plugins: [],
}

