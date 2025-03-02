// @ts-check
import { fontFamily } from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import {heroui} from "@heroui/theme";

/** @type {import("tailwindcss/types").Config } */
const config = {
  content: [
    './node_modules/pliny/**/*.js',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,tsx}',
    './data/**/*.mdx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        // sans: ['var(--font-space-grotesk)', ...fontFamily.sans],

        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        primary: colors.pink,
        gray: colors.gray,
      },
      zIndex: {
        60: '60',
        70: '70',
        80: '80',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.600')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2': {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
            },
            h3: {
              fontWeight: '600',
            },
            code: {
              color: theme('colors.indigo.500'),
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.400')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    heroui(),
    forms,
    typography,
    ({ addBase, theme }) => {
      addBase({
        'a, button': {
          outlineColor: theme('colors.primary.500'),
          '&:focus-visible': {
            outline: '2px solid',
            borderRadius: theme('borderRadius.DEFAULT'),
            outlineColor: theme('colors.primary.500'),
          },
        },
      })
    },
  ],
}

export default config
