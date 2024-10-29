/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightBg: 'white',
        lightText: '#F5EFFF',
        darkBg: '#4E31AA',
        darkText: '#F5F5F7',
        deepBg: '#17153B',
        deepLight: '#EEEDEB'
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse': 'pulse 4s ease-in-out infinite',
        'pulse-slow': 'pulse 6s ease-in-out infinite',
        'pulse-delayed': 'pulse 4s ease-in-out 2s infinite',
        'glow': 'glow 8s ease-in-out infinite',
        'glow-delayed': 'glow 8s ease-in-out 3s infinite',
        'glow-slow': 'glow 10s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.5' },
        }
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}