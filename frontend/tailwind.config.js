/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-brown': '#A1824A',
        'custom-beige': '#F5F0E5',
        'custom-green': '#009963',
        'custom-lightGreen': '#33b366'
        
        
      },
    },
  },
  plugins: [],
}