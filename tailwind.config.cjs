/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0b1120',
        steel: '#1a2332',
        charcoal: '#2d2d2d',
        accent: '#f97316',
        ink: '#e5edf7',
        mist: '#94a3b8',
        pine: '#16324f'
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(249,115,22,0.25), 0 24px 60px rgba(2,6,23,0.45)'
      },
      backgroundImage: {
        rugged: 'linear-gradient(135deg, rgba(26,35,50,0.96), rgba(11,17,32,0.92))',
        aurora: 'radial-gradient(circle at top left, rgba(249,115,22,0.28), transparent 30%), radial-gradient(circle at top right, rgba(59,130,246,0.18), transparent 24%)'
      }
    }
  },
  plugins: []
};
