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
          500: '#609b68',
          600: '#47794b',
          700: '#3e6e44',
          800: '#365f3d',
          900: '#305436',
          950: '#29492f',
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
