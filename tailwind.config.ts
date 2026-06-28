import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './tina/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          white: '#ffffff',
          offwhite: '#eae8e6',
          muted: '#a39a9a',
          black: '#000000',
        },
      },
      fontFamily: {
        sans: ['var(--font-body)', 'sans-serif'],
      },
      fontSize: {
        'h1': ['72px', { fontWeight: '500', letterSpacing: '-5.04px', lineHeight: '1' }],
        'h2': ['48px', { fontWeight: '500', letterSpacing: '-2px', lineHeight: '1' }],
        'h3': ['32px', { fontWeight: '500', letterSpacing: '-2px', lineHeight: '1' }],
        'body': ['24px', { fontWeight: '400', letterSpacing: '-0.72px', lineHeight: 'normal' }],
        'meta': ['16px', { fontWeight: '400', letterSpacing: '-0.32px', lineHeight: 'normal' }],
        'nav': ['16px', { fontWeight: '400', letterSpacing: '-0.48px', lineHeight: 'normal' }],
      },
    },
  },
  plugins: [],
};

export default config;
