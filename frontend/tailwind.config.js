/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Sarabun', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        book: {
          bg: '#FAF8F5',
          card: '#FFFFFF',
          accent: '#B45309',
          accentHover: '#92400E',
          dark: '#1C1917',
          muted: '#78716C',
          border: '#E7E5E4'
        }
      }
    },
  },
  plugins: [],
}
