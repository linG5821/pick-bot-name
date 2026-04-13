/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // 使用 class 策略
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          cyan: '#00ffff',
          magenta: '#ff00ff',
          yellow: '#ffff00',
        },
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
