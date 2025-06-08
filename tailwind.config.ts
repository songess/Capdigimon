import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'slide-in': {
          '0%': {
            opacity: '0',
            transform: 'translateX(-100%)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'slide-out': {
          '0%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
          '100%': {
            opacity: '0',
            transform: 'translateX(100%)',
          },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'spin-sequence': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'content-in': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'content-out': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-30px)' },
        },
        resize: {
          '0%': { borderRadius: '0px 0px 0px 0px' },
          '7.5%': { height: '70%', borderRadius: '0px 0px 100px 100px' },
          '50%': { height: '70%', borderRadius: '0px 0px 100px 100px' },
          '57.5%': { height: '100%', borderRadius: '0px 0px 0px 0px' },
          '100%': { borderRadius: '0px 0px 0px 0px' },
        },
        rounded: {
          '0%': { borderRadius: '9999px 9999px 9999px 9999px' },
          '7.5%': { borderRadius: '9999px 0 9999px 0' },
          '50%': { borderRadius: '9999px 0 9999px 0' },
          '57.5%': { borderRadius: '9999px 9999px 9999px 9999px' },
          '100%': { borderRadius: '9999px 9999px 9999px 9999px' },
        },
      },
      animation: {
        'slide-in': 'slide-in 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-out': 'slide-out 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'fade-out': 'fade-out 0.5s ease-out forwards',
        'gdsc-spin': 'spin-sequence 20s linear infinite',
        'gdsc-spin-slow': 'spin-sequence 30s linear infinite',
        'gdsc-spin-reverse': 'spin-sequence 25s linear infinite reverse',
        'gdsc-float': 'float 6s ease-in-out infinite',
        'gdsc-float-slow': 'float 8s ease-in-out infinite',
        'content-in': 'content-in 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'content-in-slow': 'content-in 1s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'content-in-more-slow': 'content-in 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'content-out': 'content-out 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'gdsc-resize': 'resize 3s ease-in-out infinite',
        'gdsc-rounded': 'rounded 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
