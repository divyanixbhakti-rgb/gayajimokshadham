/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        saffron: {
          DEFAULT: '#D9531E',
          light: '#E8774A',
          dark: '#B03E12',
        },
        golden: {
          DEFAULT: '#E5A93C',
          light: '#F2C469',
          dark: '#C78A1F',
        },
        maroon: {
          DEFAULT: '#58111A',
          light: '#7A1B28',
          dark: '#3D0B12',
        },
        sand: {
          DEFAULT: '#F5EBE0',
          light: '#FAF3EA',
          dark: '#E8D8C4',
        },
        parchment: '#FDFBF7',
        charcoal: '#211C1D',
        ratri: '#0C101C',
        'ratri-panel': '#141A2B',
        'ratri-edge': '#232B42',
      },
      fontFamily: {
        display: ['"Cinzel"', '"Rozha One"', 'serif'],
        heading: ['"Rozha One"', '"Cinzel"', 'serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 24px rgba(229, 169, 60, 0.35)',
        'glow-lg': '0 0 48px rgba(229, 169, 60, 0.45)',
        card: '0 6px 24px -8px rgba(33, 28, 29, 0.16)',
        'card-lg': '0 18px 48px -12px rgba(33, 28, 29, 0.28)',
      },
      backgroundImage: {
        manuscript:
          'radial-gradient(circle at 15% 20%, rgba(229,169,60,0.10), transparent 45%), radial-gradient(circle at 85% 10%, rgba(217,83,30,0.08), transparent 40%), radial-gradient(circle at 60% 90%, rgba(88,17,26,0.06), transparent 45%)',
        'ratri-glow':
          'radial-gradient(circle at 20% 0%, rgba(229,169,60,0.14), transparent 50%), radial-gradient(circle at 85% 20%, rgba(217,83,30,0.10), transparent 45%)',
      },
      keyframes: {
        bellSwing: {
          '0%, 100%': { transform: 'rotate(-7deg)' },
          '50%': { transform: 'rotate(7deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '45%': { opacity: '0.72' },
          '60%': { opacity: '0.95' },
          '75%': { opacity: '0.8' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        omSpin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'bell-swing': 'bellSwing 2.4s ease-in-out infinite',
        'bell-swing-fast': 'bellSwing 1.1s ease-in-out 2',
        marquee: 'marquee 32s linear infinite',
        flicker: 'flicker 3.2s ease-in-out infinite',
        floaty: 'floaty 5s ease-in-out infinite',
        'om-spin': 'omSpin 60s linear infinite',
        shimmer: 'shimmer 3.5s linear infinite',
      },
    },
  },
  plugins: [],
};
