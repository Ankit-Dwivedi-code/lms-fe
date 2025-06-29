/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      colors: {
        neon: {
          pink: '#ff007f',
          cyan: '#00ffff',
          purple: '#9b5de5',
        },
      },
      boxShadow: {
        'neon-pink': '0 0 10px #ff007f, 0 0 20px #ff007f',
        'neon-cyan': '0 0 10px #00ffff, 0 0 20px #00ffff',
        'neon-purple': '0 0 10px #9b5de5, 0 0 20px #9b5de5',
      },
    },
  },
  plugins: [],
};
