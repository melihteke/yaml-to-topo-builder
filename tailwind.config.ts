import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9eaff',
          200: '#bcdaff',
          300: '#8ec2ff',
          400: '#5aa0ff',
          500: '#357dfb',
          600: '#1f5ee6',
          700: '#1a4bb8',
          800: '#173f95',
          900: '#132f70',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(15,23,42,0.06), 0 4px 16px rgba(15,23,42,0.06)',
      },
    },
  },
  plugins: [],
};

export default config;
