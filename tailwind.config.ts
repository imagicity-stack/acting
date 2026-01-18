import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0B0D12',
          light: '#F5F7FA'
        },
        surface: {
          DEFAULT: '#151923',
          elevated: '#1B2030'
        },
        accent: {
          teal: '#3AF1D0',
          violet: '#8B5CFF'
        },
        warning: {
          DEFAULT: '#F59E0B',
          strong: '#EF4444'
        },
        muted: '#8C93A8'
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        xl: '1.25rem',
        '2xl': '1.75rem'
      },
      boxShadow: {
        glass: '0 10px 40px rgba(0, 0, 0, 0.35)',
        glow: '0 0 30px rgba(58, 241, 208, 0.25)'
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at top, rgba(139, 92, 255, 0.25), transparent 60%)',
        'card-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))'
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      },
      animation: {
        shimmer: 'shimmer 1.6s linear infinite'
      }
    }
  },
  plugins: []
};

export default config;
