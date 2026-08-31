/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: 'var(--color-bg-primary)',
          surface: 'var(--color-bg-surface)',
          warm: 'var(--color-bg-warm)',
          stone: 'var(--color-bg-stone)',
          sage: 'var(--color-bg-sage)',
          dark: 'var(--color-bg-dark)',
          'dark-surface': 'var(--color-bg-dark-surface)',
          footer: 'var(--color-bg-footer)',
        },
        navy: {
          DEFAULT: '#1B2A47',
          surface: '#233352',
          border: '#35435B',
        },
        ivory: {
          DEFAULT: '#FDFBF7',
          border: '#EAE6DF',
        },
        brass: {
          DEFAULT: '#D4AF37',
          hover: '#BF9B2D',
        },
        ink: {
          primary: 'var(--color-ink-primary)',
          muted: 'var(--color-ink-muted)',
          subtle: 'var(--color-ink-subtle)',
          light: 'var(--color-ink-light)',
          'dark-muted': 'var(--color-ink-dark-muted)',
        },
        accent: {
          brass: 'var(--color-accent-brass)',
          'brass-hover': 'var(--color-accent-brass-hover)',
          sage: 'var(--color-accent-brass)',
          'sage-hover': 'var(--color-accent-brass-hover)',
          detail: 'var(--color-accent-detail)',
          terracotta: 'var(--color-accent-detail)',
        },
        border: {
          light: '#EAE6DF',
          warm: '#EAE6DF',
          dark: '#35435B',
          card: '#EAE6DF',
          hover: '#D4AF37',
          sage: 'rgba(212, 175, 55, 0.3)',
        },
      },
      fontFamily: {
        editorial: ['var(--font-display)', 'serif'],
        serif: ['var(--font-serif)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      borderRadius: {
        'none': '0px',
        'xs': '2px',
        'sm': '2px',
        'md': '4px',
        'lg': '4px',
        'xl': '4px',
        '2xl': '4px',
        '3xl': '4px',
        'full': '4px', // Architectural sharp corners - no bubbly pills
      },
      boxShadow: {
        'subtle': 'var(--shadow-subtle)',
        'card': 'var(--shadow-card)',
        'lift': 'var(--shadow-lift)',
      },
      transitionTimingFunction: {
        'editorial': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
    },
  },
  plugins: [],
}
