import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        orbit: {
          '0%': {
            transform: 'rotate(calc(var(--angle) * 1deg)) translateY(calc(var(--radius) * 1px)) rotate(calc(var(--angle) * -1deg))',
          },
          '100%': {
            transform: 'rotate(calc(var(--angle) * 1deg + 360deg)) translateY(calc(var(--radius) * 1px)) rotate(calc((var(--angle) * -1deg) - 360deg))',
          },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.55', transform: 'scale(0.92)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        },
        'edge-glow': {
          '0%, 100%': {
            filter: 'drop-shadow(0 0 2px rgba(14,165,255,0.35)) drop-shadow(0 0 6px rgba(14,165,255,0.2))',
          },
          '50%': {
            filter: 'drop-shadow(0 0 6px rgba(14,165,255,0.65)) drop-shadow(0 0 12px rgba(14,165,255,0.45))',
          },
        },
      },
      animation: {
        orbit: 'orbit calc(var(--duration) * 1s) linear infinite',
        'glow-pulse': 'glow-pulse 20s ease-in-out infinite',
        'edge-glow': 'edge-glow 20s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
