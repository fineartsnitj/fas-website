/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      animation: {
        fadeInDown: 'fadeInDown 1s ease-out',
        fadeInUp: 'fadeInUp 1s ease-out',
        floatAnimation: 'floatAnimation 3s infinite',
        glowPulse: 'glowPulse 3s infinite',
        navBarGlow: 'navBarGlow 3s infinite',
      },
      keyframes: {
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatAnimation: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowPulse: {
          '0%, 80%': { textShadow: '0 0 5px rgba(255, 255, 255, 0.3)' },
          '30%': { textShadow: '0 0 20px rgba(255, 255, 255, 0.5)' },
        },
        navBarGlow: {
          '0%, 100%': { boxShadow: '0 5px 15px rgba(255, 255, 255, 0.1)' },
          '50%': { boxShadow: '0 5px 25px rgba(255, 255, 255, 0.2)' },
        },
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        josefin: ['Josefin Sans', 'sans-serif'],
        jockey: ['Jockey One', 'sans-serif'], // Add the font family here
      },
    },
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
  daisyui:{
    themes:['autumn', 'sunset', 'night']
  }
}