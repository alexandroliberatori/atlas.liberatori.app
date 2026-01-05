/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        atlas: {
          bg: '#020617',
          gold: '#f59e0b',
          'gold-light': '#fbbf24',
          'gold-dark': '#d97706',
          text: '#e2e8f0',
          'text-muted': '#94a3b8',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'fog-gradient': 'radial-gradient(circle, transparent 30%, rgba(2, 6, 23, 0.95) 70%)',
        'gold-shimmer': 'linear-gradient(90deg, #d97706 0%, #fbbf24 50%, #d97706 100%)',
      },
      boxShadow: {
        'gold': '0 0 20px rgba(245, 158, 11, 0.3)',
        'gold-lg': '0 0 40px rgba(245, 158, 11, 0.4)',
      },
      animation: {
        'fog-pulse': 'fogPulse 4s ease-in-out infinite',
        'gold-glow': 'goldGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fogPulse: {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '0.9' },
        },
        goldGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(245, 158, 11, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(245, 158, 11, 0.5)' },
        },
      },
    },
  },
  plugins: [],
}
