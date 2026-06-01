/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#050214',
        abyss: '#0D0524',
        royal: '#4C1D95',
        glow: '#7C3AED',
        gold: '#F5C542',
        luxe: '#FFD86B',
      },
      boxShadow: {
        glow: '0 0 40px rgba(192, 132, 252, 0.28), 0 0 120px rgba(245, 197, 66, 0.12)',
      },
      backgroundImage: {
        'mesh-radial': 'radial-gradient(circle at top left, rgba(168, 85, 247, 0.25), transparent 34%), radial-gradient(circle at right center, rgba(245, 197, 66, 0.12), transparent 28%), linear-gradient(180deg, #0D0524 0%, #050214 100%)',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        luxury: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -14px, 0)' },
        },
        drift: {
          '0%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(28px, -24px, 0) scale(1.1)' },
          '100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        wave: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-24px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.45', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.08)' },
        },
      },
      animation: {
        floaty: 'floaty 7s ease-in-out infinite',
        drift: 'drift 14s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
        wave: 'wave 12s ease-in-out infinite',
        pulseGlow: 'pulseGlow 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};