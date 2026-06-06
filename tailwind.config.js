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
      // All unused animation keyframes removed (drift, shimmer, wave, floaty, pulseGlow)
      // to reduce unused CSS in the bundle.
    },
  },
  plugins: [],
};