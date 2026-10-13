/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f1f7ef',
          100: '#e0eedb',
          200: '#c1dbba',
          300: '#99c38d',
          400: '#70a760',
          500: '#518b43',
          600: '#397330',
          700: '#2d5c29',
          800: '#264a24',
          900: '#203e20',
          950: '#102c1d',
        },
        accent: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Nunito', '"Space Grotesk"', 'ui-sans-serif', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(32, 62, 32, 0.18)',
      },
    },
  },
  plugins: [],
}
