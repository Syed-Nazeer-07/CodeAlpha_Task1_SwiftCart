/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#2563EB',
        dark: '#0F172A',
        light: '#F8FAFC',
        accent: '#F59E0B',
      }
    },
  },
  plugins: [],
}
