/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');
const defaultColors = require('tailwindcss/colors');

module.exports = {
  darkMode: ['class'], // ✅ Added dark mode support
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/stories/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/Widgets/MintWidget/**/*.{ts,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-main)'],
      serif: ['Garamond', 'serif'],
      mono: ['Courier New', 'monospace'],
    },
    screens: {
      all: '1px',
      xs: '480px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        border: '#E8ECFD', // ⚠️ Overridden by "border: hsl(var(--border))" below
        black: '#010101',
        white: '#ffffff',
        background: 'hsl(var(--background))', // ✅ Added from new config
        foreground: 'hsl(var(--foreground))', // ✅ Added from new config

        gray: {
          ...defaultColors.gray,
          150: '#EBEDF0',
          250: '#404040',
          350: '#6B6B6B',
        },

        primary: {
          50: '#E6EDF9',
          100: '#CDDCF4',
          200: '#A7C2EC',
          300: '#82A8E4',
          400: '#5385D2',
          500: '#051531',
          600: '#1D4685',
          700: '#162A4A',
          800: '#11213B',
          900: '#0D192C',
          apollo: '#546CF1',
          apolloSecondary: '#546CF1',
          apolloHovered: '#3A53D9',
          toastSuccess: '#5FFF82',
          toastWarning: '#FFB546',
          toastError: '#FF4646',
          DEFAULT: 'hsl(var(--primary))', // ⚠️ Same key as existing (same value)
          foreground: 'hsl(var(--primary-foreground))', // ✅ Added
        },

        shade: {
          primary: '#262966',
          secondary: '#666666',
          mute: '#999999',
          cardLight: '#F5F7FF',
          card: '#FFFFFF',
          foreground: '#FFFFFF',
          background: '#F2F2FA',
          divider: '#E8ECFD',
          selected: '#C7D9FE80',
        },

        accent: {
          DEFAULT: 'hsl(var(--accent))', // ✅ Added
          foreground: 'hsl(var(--accent-foreground))', // ✅ Added
          50: '#FAEAF8',
          100: '#F2C1EA',
          200: '#EA98DC',
          300: '#E26ECE',
          400: '#DA45C0',
          500: '#D631B9',
          600: '#C02CA6',
          700: '#952281',
          800: '#6B185C',
          900: '#400E37',
        },

        red: {
          100: '#EBBAB8',
          200: '#DF8D8A',
          300: '#D25F5B',
          400: '#C5312C',
          500: '#BF1B15',
          600: '#AB1812',
          700: '#85120E',
          800: '#5F0D0A',
          900: '#390806',
        },

        green: {
          50: '#D3E3DB',
          100: '#BED5C9',
          200: '#93BAA6',
          300: '#679F82',
          400: '#3C835E',
          500: '#27764d',
          600: '#236A45',
          700: '#1F5E3D',
          800: '#17462E',
          900: '#0F2F1E',
        },

        secondary: {
          DEFAULT: 'hsl(var(--secondary))', // ✅ Added
          foreground: 'hsl(var(--secondary-foreground))', // ✅ Added
        },

        muted: {
          DEFAULT: 'hsl(var(--muted))', // ✅ Added
          foreground: 'hsl(var(--muted-foreground))', // ✅ Added
        },

        destructive: {
          DEFAULT: 'hsl(var(--destructive))', // ✅ Added
          foreground: 'hsl(var(--destructive-foreground))', // ✅ Added
        },

        card: {
          DEFAULT: 'hsl(var(--card))', // ✅ Added
          foreground: 'hsl(var(--card-foreground))', // ✅ Added
        },

        popover: {
          DEFAULT: 'hsl(var(--popover))', // ✅ Added
          foreground: 'hsl(var(--popover-foreground))', // ✅ Added
        },

        input: 'hsl(var(--input))', // ✅ Added
        ring: 'hsl(var(--ring))', // ✅ Added

        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },

      fontSize: {
        xxs: '0.7rem',
        xs: '0.775rem',
        sm: '0.85rem',
        md: '0.95rem',
      },

      spacing: {
        88: '22rem',
        100: '26rem',
        112: '28rem',
        128: '32rem',
        144: '36rem',
      },

      borderRadius: {
        none: '0',
        sm: 'calc(var(--radius) - 4px)', // ⚠️ Conflict: old sm was '0.20rem'
        DEFAULT: '0.30rem',
        md: 'calc(var(--radius) - 2px)', // ⚠️ Conflict: old md was '0.40rem'
        lg: 'var(--radius)', // ⚠️ Conflict: old lg was '0.50rem'
        full: '9999px',
      },

      blur: {
        xs: '3px',
      },

      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;',
      },

      transitionProperty: {
        height: 'height, max-height',
        spacing: 'margin, padding',
      },

      maxWidth: {
        'xl-1': '39.5rem',
      },

      boxShadow: {
        error: 'inset 0px 0px 16px 0px rgba(236,70,100,0.25)', // ✅ Added
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // ✅ Added
    require('tailwindcss-animate'), // ✅ Added
  ],
};
