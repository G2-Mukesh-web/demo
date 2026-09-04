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
          'surface-light': 'var(--color-bg-linen)',
          warm: 'var(--color-bg-warm)',
          stone: 'var(--color-bg-stone)',
          sage: 'var(--color-bg-sage)',
          forest: '#303A35',
          linen: '#EFEFEA',
          dark: 'var(--color-bg-dark)',
          'dark-surface': 'var(--color-bg-dark-surface)',
          footer: 'var(--color-bg-footer)',
        },
        forest: {
          DEFAULT: '#303A35',
          light: '#3D4943',
          dark: '#242C28',
          deep: '#1D211F',
          border: 'rgba(245, 243, 237, 0.12)',
        },
        linen: {
          DEFAULT: '#EFEFEA',
          surface: '#F5F5F0',
          border: 'rgba(48, 58, 53, 0.12)',
        },
        terracotta: {
          DEFAULT: '#C27D66',
          hover: '#A8624E',
        },
        ink: {
          primary: 'var(--color-ink-primary)',
          light: 'var(--color-ink-light)',
          muted: 'var(--color-ink-muted)',
          subtle: 'var(--color-ink-subtle)',
          'dark-muted': 'var(--color-ink-dark-muted)',
          'dark-subtle': 'var(--color-ink-dark-subtle)',
        },
        accent: {
          brass: 'var(--color-accent-brass)',
          'brass-hover': 'var(--color-accent-brass-hover)',
          terracotta: 'var(--color-accent-terracotta)',
          'terracotta-hover': 'var(--color-accent-terracotta-hover)',
          detail: 'var(--color-accent-detail)',
        },
        border: {
          light: 'var(--color-border-light)',
          warm: 'var(--color-border-warm)',
          dark: 'var(--color-border-dark)',
          deep: 'var(--color-border-deep)',
          card: 'var(--color-border-card)',
          hover: 'var(--color-border-hover)',
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
        'full': '4px',
      },
      boxShadow: {
        'subtle': 'var(--shadow-subtle)',
        'card': 'var(--shadow-card)',
        'lift': 'var(--shadow-lift)',
      },
    },
  },
  plugins: [],
}
