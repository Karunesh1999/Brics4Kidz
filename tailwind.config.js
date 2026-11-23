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
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',

        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
          border: 'hsl(var(--card-border) / <alpha-value>)',
        },

        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
          hover: 'hsl(var(--primary-hover) / <alpha-value>)',
        },

        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
          hover: 'hsl(var(--secondary-hover) / <alpha-value>)',
        },

        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
          hover: 'hsl(var(--accent-hover) / <alpha-value>)',
        },

        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },

        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },

        surface: {
          lowest: 'hsl(var(--surface-lowest) / <alpha-value>)',
          low: 'hsl(var(--surface-low) / <alpha-value>)',
          container: 'hsl(var(--surface-container) / <alpha-value>)',
          high: 'hsl(var(--surface-high) / <alpha-value>)',
          highest: 'hsl(var(--surface-highest) / <alpha-value>)',
        },

        border: 'hsl(var(--border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',

        success: {
          DEFAULT: 'hsl(var(--success) / <alpha-value>)',
          foreground: 'hsl(var(--success-foreground) / <alpha-value>)',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning) / <alpha-value>)',
          foreground: 'hsl(var(--warning-foreground) / <alpha-value>)',
        },
        info: {
          DEFAULT: 'hsl(var(--info) / <alpha-value>)',
          foreground: 'hsl(var(--info-foreground) / <alpha-value>)',
        },
        stripe: {
          DEFAULT: 'hsl(var(--stripe-purple) / <alpha-value>)',
          hover: 'hsl(var(--stripe-purple-hover) / <alpha-value>)',
        },
      },
      borderRadius: {
        'sm': 'calc(var(--radius) - 4px)',
        'DEFAULT': 'var(--radius)',
        'md': 'calc(var(--radius) - 2px)',
        'lg': 'var(--radius)',
        'xl': 'calc(var(--radius) + 6px)',
        '2xl': 'calc(var(--radius) + 12px)',
        'full': '9999px',
      },
      spacing: {
        'gutter-xs': '4px',
        'gutter-sm': '8px',
        'gutter-md': '16px',
        'gutter-lg': '24px',
        'gutter-xl': '32px',
        'section': '32px',
        'page-margin': '16px',
      },
      fontFamily: {
        'display': ['"Spline Sans"', 'sans-serif'],
        'headline': ['"Spline Sans"', 'sans-serif'],
        'title': ['"Spline Sans"', 'sans-serif'],
        'body': ['"Montserrat"', 'sans-serif'],
        'label': ['"Montserrat"', 'sans-serif'],
        'mono': ['"Space Mono"', 'monospace'],
      },
      fontSize: {
        'display-lg': ['36px', { lineHeight: '42px', letterSpacing: '-0.5px', fontWeight: '700' }],
        'display-lg-mobile': ['28px', { lineHeight: '34px', letterSpacing: '-0.25px', fontWeight: '700' }],
        'headline-lg': ['24px', { lineHeight: '30px', letterSpacing: '-0.2px', fontWeight: '700' }],
        'headline-md': ['20px', { lineHeight: '26px', letterSpacing: '0px', fontWeight: '700' }],
        'title-md': ['16px', { lineHeight: '22px', letterSpacing: '0px', fontWeight: '700' }],
        'body-lg': ['16px', { lineHeight: '24px', letterSpacing: '0px', fontWeight: '500' }],
        'body-md': ['14px', { lineHeight: '20px', letterSpacing: '0px', fontWeight: '500' }],
        'body-sm': ['12px', { lineHeight: '18px', letterSpacing: '0.1px', fontWeight: '500' }],
        'label-lg': ['14px', { lineHeight: '18px', letterSpacing: '0.2px', fontWeight: '700' }],
        'label-sm': ['11px', { lineHeight: '14px', letterSpacing: '0.4px', fontWeight: '700' }],
        'mono-md': ['13px', { lineHeight: '18px', letterSpacing: '0px', fontWeight: '700' }],
      },
    },
  },
  plugins: [],
}
