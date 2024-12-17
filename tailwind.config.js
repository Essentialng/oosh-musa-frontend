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
        // darkBg: '#6B728E',
        darkText: '#F5F5F7',
        deepBg: '#17153B',
        // deepBg: '#404258',
        deepLight: '#EEEDEB',
        newtral_pri: '#4A4947',
        newtral_sec: '#D8D2C2'
      },
      fontFamily: {
        sans: ["Graphik", "sans-serif"],
        serif: ["Merriweather", "serif"],
        Mon: ["Montserrat", "sans-serif"],
        // roboto: ['"Roboto"', "sans-serif"],
        recoleta: ['Recoleta', 'sans-serif'],
        inter: ["Inter", "sans-serif"],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse': 'pulse 2s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'pulse-delayed': 'pulse 2s ease-in-out 2s infinite',
        'glow': 'glow 8s ease-in-out infinite',
        'glow-delayed': 'glow 6s ease-in-out 1s infinite',
        'glow-slow': 'glow 8s ease-in-out infinite',
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