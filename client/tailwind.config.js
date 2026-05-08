/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        espresso: '#2a160d',
        crema: '#f6e7cf',
        latte: '#d6b28c',
        copper: '#b86b3d',
        mocha: '#5b321f',
      },
      boxShadow: {
        glow: '0 24px 80px rgba(184, 107, 61, 0.35)',
      },
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};
