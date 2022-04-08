module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    backgroundSize: {
      'auto': 'auto',
      'cover': 'cover',
      'contain': 'contain',
      '300': '300%',
    },
    extend: {
      animation: {
        move: 'move 5s alternate infinite',
        slideDown: 'slideDown 3s alternate'
      },
      keyframes: {
        move: {
          'from': {
            backgroundPosition: '0%',
          },
          'to': {
            backgroundPosition: '100% 100%'
          }
        },
        slideDown: {
          'from': {
            opacity: '0',
            transform: 'translateY(-2rem)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
      },
    },
  },
  plugins: [],
}
