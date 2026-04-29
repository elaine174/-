/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        rice: '#FAF8F3',
        forest: {
          DEFAULT: '#2D5A3D',
          light: '#3A7A54',
          dark: '#1E3D2A',
        },
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E8D48A',
          dark: '#A8882E',
        },
        sage: '#E8F4ED',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'float-delay': 'float 3s ease-in-out 1s infinite',
        'float-slow': 'float 5s ease-in-out infinite',
        'bounce-soft': 'bounce-soft 2s ease-in-out infinite',
        'star-pop': 'star-pop 0.4s ease-out forwards',
        'slide-up': 'slide-up 0.5s ease-out forwards',
        'fade-in': 'fade-in 0.4s ease-out forwards',
        'scale-in': 'scale-in 0.3s ease-out forwards',
        'confetti-fall': 'confetti-fall 2s ease-in forwards',
        'spin-slow': 'spin 6s linear infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        'wiggle': 'wiggle 0.5s ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(3deg)' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'star-pop': {
          '0%': { transform: 'scale(0) rotate(-20deg)', opacity: 0 },
          '60%': { transform: 'scale(1.3) rotate(5deg)', opacity: 1 },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: 1 },
        },
        'slide-up': {
          '0%': { transform: 'translateY(30px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.85)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        'confetti-fall': {
          '0%': { transform: 'translateY(-20px) rotate(0deg)', opacity: 1 },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: 0 },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201, 168, 76, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(201, 168, 76, 0)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-8deg)' },
          '75%': { transform: 'rotate(8deg)' },
        },
      },
    },
  },
  plugins: [],
};
