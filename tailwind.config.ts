import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  theme: {
    transitionDuration: {
      DEFAULT: '300ms'
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      spacing: {
        '0.125/10': '1.25%',
        '0.25/10': '2.5%',
        '0.5/10': '5%',
        '0.75/10': '5%',
        '0/10': '0%',
        '1/10': '10%',
        '2/10': '20%',
        '3/10': '30%',
        '4/10': '40%',
        '5/10': '50%',
        '6/10': '60%',
        '7/10': '70%',
        '8/10': '80%',
        '9/10': '90%',
        '10/10': '100%',
        '10': '10dvh',
        '20': '20dvh',
        '25': '25dvh',
        '35': '25dvh',
        '50': '50dvh',
        '75': '75dvh',
        '100': '100dvh',
      },
      colors: {
        'gray': '#373737',
        'gray-dark': '#282828',
        'heavy': '#1B1B1B',
        'light': '#242424',
        'blue': '#545FE2',
        'blue-hover': '#444DD0',
        'lightly': '#7A7A7A',
        'heavily': '#464646',
      },
      fontSize: {
        '0.25': '0.25dvh',
        '0.5': '0.5dvh',
        '1': '1dvh',
        '1.25': '1.25dvh',
        '1.5': '1.5dvh',
        '2': '2dvh',
        '3': '3dvh',
        '4': '4dvh',
        '5': '5dvh',
        '10': '10dvh',
        '20': '20dvh',
        '25': '25dvh',
        '50': '50dvh',
        '75': '75dvh',
        '100': '100dvh',
        'sm': '0.5dvw',
        'md': '0.75dvw',
        'lg': '1dvw',
        'xl': '1.25dvw',
        '1.5xl': '1.75dvw',
        '2xl': '2.5dvw',
        '3xl': '3.75dvw',
        '4xl': '5dvw',
      }
    },
  },
  plugins: [],
}
export default config
