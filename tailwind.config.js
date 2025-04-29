/** @type {import('tailwindcss').Config} */
  module.exports = {
    content: [
      "./index.html",  // Specify your HTML files here
      "./src/**/*.{html,js}", // If you have additional JS files
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['"Work Sans"', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }