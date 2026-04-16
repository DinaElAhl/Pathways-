/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#dceaff',
          200: '#bfd8ff',
          300: '#93bdff',
          400: '#6098ff',
          500: '#3b74ff',
          600: '#2555f5',
          700: '#1c41d8',
          800: '#1c38ad',
          900: '#1d3689',
          950: '#152256',
        },
        accent: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'ui-sans-serif', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(28, 56, 173, 0.25)',
      },
    },
  },
  plugins: [],
}
