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
        primary: '#111827',
        secondary: '#374151',
        dark: '#000000',
        light: '#F8F8F8',
        border: '#E5E7EB',
        success: '#16A34A',
        danger: '#DC2626',
        accent: '#111827',
      }
    },
  },
  plugins: [],
}
