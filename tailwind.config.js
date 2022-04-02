module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    backgroundSize: {
      'auto': 'auto',
      'cover': 'cover',
      'contain': 'contain',
      '300': '300%',
    },
    extend: {
      animation: {
        move: 'move 5s alternate infinite'
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
      },
    },
  },
  plugins: [],
}
