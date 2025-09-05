import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#e6e6e6',
            maxWidth: 'none',
            a: {
              color: '#4a90e2',
              '&:hover': {
                color: '#60a5fa',
              },
            },
            h1: {
              color: '#ffffff',
            },
            h2: {
              color: '#ffffff',
            },
            h3: {
              color: '#ffffff',
            },
            h4: {
              color: '#ffffff',
            },
            h5: {
              color: '#ffffff',
            },
            h6: {
              color: '#ffffff',
            },
            strong: {
              color: '#ffffff',
            },
            code: {
              color: '#ff6b6b',
            },
            blockquote: {
              borderLeftColor: '#4a90e2',
              color: '#d1d5db',
            },
            hr: {
              borderColor: '#374151',
            },
            'thead th': {
              color: '#ffffff',
            },
          },
        },
        invert: {
          css: {
            color: '#e6e6e6',
            a: {
              color: '#4a90e2',
              '&:hover': {
                color: '#60a5fa',
              },
            },
            h1: {
              color: '#ffffff',
            },
            h2: {
              color: '#ffffff',
            },
            h3: {
              color: '#ffffff',
            },
            h4: {
              color: '#ffffff',
            },
            h5: {
              color: '#ffffff',
            },
            h6: {
              color: '#ffffff',
            },
            strong: {
              color: '#ffffff',
            },
            code: {
              color: '#ff6b6b',
            },
            blockquote: {
              borderLeftColor: '#4a90e2',
              color: '#d1d5db',
            },
            hr: {
              borderColor: '#374151',
            },
            'thead th': {
              color: '#ffffff',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config
