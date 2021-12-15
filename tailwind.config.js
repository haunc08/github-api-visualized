const navHeight = '4.5rem';
const mainPadding = '1rem';

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      spacing: {
        'nav-h': navHeight,
        'main-p': mainPadding,
        'content-h': `calc(100vh - ${navHeight} - ${mainPadding})`,
        128: '32rem',
      },
      fontSize: {
        '1/2': '50%',
      },
    },
  },
  plugins: [],
};
