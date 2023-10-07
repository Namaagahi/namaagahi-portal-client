/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors")
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
          'fade-in-down': {
              '0%': {
                  opacity: '0',
                  // transform: 'translateY(-10px)'
              },
              '100%': {
                  opacity: '1',
                  // transform: 'translateY(0)'
              },
          },
          'fade-out-down': {
              'from': {
                  opacity: '1',
                  // transform: 'translateY(0px)'
              },
              'to': {
                  opacity: '0',
                  // transform: 'translateY(10px)'
              },
          },
          'fade-in-up': {
              '0%': {
                  opacity: '0',
                  // transform: 'translateY(10px)'
              },
              '100%': {
                  opacity: '1',
                  // transform: 'translateY(0)'
              },
          },
          'fade-out-up': {
              'from': {
                  opacity: '1',
                  // transform: 'translateY(0px)'
              },
              'to': {
                  opacity: '0',
                  // transform: 'translateY(10px)'
              },
          }
      },
      animation: {
          'fade-in-down': 'fade-in-down 0.5s ease-out',
          'fade-out-down': 'fade-out-down 0.5s ease-out',
          'fade-in-up': 'fade-in-up 0.5s ease-out',
          'fade-out-up': 'fade-out-up 0.5s ease-out'
      }, 
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        darkModeBg: '#000000',
        lightModeBg: '#ffffff',
        primary: "#4a4b69",
        secondary: '#C9BBCF',
        bgform: '#8B6B95',
        buttonHover: "#faa75c",
        red: colors.red,
        blue: colors.blue,
        black: colors.black,
        white: colors.white,
        gray: colors.gray,
        emerald: colors.emerald,
        indigo: colors.indigo,
        yellow: colors.yellow,
        green: colors.green,
        violet: colors.violet,
        grayborder: "#E5E5E5",
      },
      fontFamily: {
        sans: ['var(--font-sahel)']
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}
