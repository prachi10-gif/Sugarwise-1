/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#0A0F1E',
        'midnight-secondary': '#0E1628',
        tealAccent: '#00D4B4',
        amberAccent: '#FFB347',
        dangerAccent: '#FF4757',
        glassBg: 'rgba(10, 15, 30, 0.6)',
        glassBorder: 'rgba(255, 255, 255, 0.08)',
        'glass-border-teal': 'rgba(0, 212, 180, 0.15)',
      },
      backdropBlur: {
        glass: '20px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-teal': '0 0 30px rgba(0, 212, 180, 0.15)',
        'glow-teal-bright': '0 0 40px rgba(0, 212, 180, 0.3)',
        'glow-amber': '0 0 15px rgba(255, 179, 71, 0.3)',
        'glow-green': '0 0 20px rgba(34, 197, 94, 0.5)',
        'glow-danger': '0 0 20px rgba(255, 71, 87, 0.3)',
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        dissolve: 'dissolve 2s ease-out forwards',
        'particle-float': 'particle-float 2s ease-out forwards',
        scan: 'scan 3s linear infinite',
      },
      opacity: {
        glass: '0.7',
      },
    },
  },
  plugins: [],
}
