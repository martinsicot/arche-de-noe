/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{html,js}",
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'heading': ['Quicksand', 'sans-serif'],
        'body': ['Open Sans', 'sans-serif'],
      },
      colors: {
        // Theme 1: Arc-en-ciel
        'rainbow': {
          primary: '#87CEEB',
          secondary: '#90EE90',
          accent1: '#FFD700',
          accent2: '#FFB6C1',
          light: '#F5F5F5',
          dark: '#333333',
        },
        // Theme 2: Nature & Inclusion
        'nature': {
          primary: '#9CAF88',
          secondary: '#A7C7E7',
          accent: '#FF9F80',
          light: '#F5F1E8',
          dark: '#4A4A4A',
        },
        // Theme 3: Douceur & Professionnalisme
        'soft': {
          primary: '#4A6FA5',
          secondary: '#FFDAB9',
          accent: '#98D8C8',
          light: '#FAFAFA',
          dark: '#2D2D2D',
        },
      },
    },
  },
  plugins: [],
}
