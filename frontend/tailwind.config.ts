import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        velora: {
          violet: '#7C6CFF',
          blue: '#6EA8FE',
          cyan: '#8EE3EF',
          ink: '#1F2430',
          paper: '#F7F7FB',
          night: '#0F1220',
          panel: '#171A2B',
        },
      },
      boxShadow: {
        glow: '0 10px 30px rgba(124, 108, 255, 0.18)',
        soft: '0 12px 40px rgba(18, 25, 38, 0.08)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backgroundImage: {
        'velora-light': 'radial-gradient(circle at top left, rgba(124,108,255,.22), transparent 32%), radial-gradient(circle at top right, rgba(142,227,239,.2), transparent 28%), linear-gradient(180deg, #ffffff 0%, #f7f7fb 100%)',
        'velora-dark': 'radial-gradient(circle at top left, rgba(154,140,255,.18), transparent 32%), radial-gradient(circle at top right, rgba(121,225,234,.14), transparent 28%), linear-gradient(180deg, #0f1220 0%, #12172a 100%)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
