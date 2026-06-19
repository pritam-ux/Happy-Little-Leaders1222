/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: {
        xs: '420px',
        '3xl': '1920px',
        '4xl': '2560px',
      },
      fontFamily: {
        sans: ['Inter', 'Nunito', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#FF6B6B',
          50: '#FFF1F1',
          100: '#FFE0E0',
          200: '#FFC1C1',
          300: '#FF9999',
          400: '#FF7B7B',
          500: '#FF6B6B',
          600: '#E64A4A',
          700: '#C73838',
          800: '#9E2929',
          900: '#7A1F1F',
        },
        teal: {
          DEFAULT: '#4ECDC4',
          50: '#EFFCFB',
          100: '#D6F6F3',
          300: '#7DDDD5',
          500: '#4ECDC4',
          600: '#2FB1A8',
          700: '#1F8B83',
        },
        gold: {
          DEFAULT: '#FFD93D',
          100: '#FFF5C2',
          300: '#FFE57A',
          500: '#FFD93D',
          600: '#E5BC1F',
        },
        indigo2: {
          DEFAULT: '#6C63FF',
          100: '#E4E1FF',
          500: '#6C63FF',
          600: '#544BDB',
        },
        coral: {
          DEFAULT: '#FF9F68',
          100: '#FFE1D0',
          500: '#FF9F68',
          600: '#E37E45',
        },
        leaf: {
          DEFAULT: '#8BC34A',
          100: '#E4F2D2',
          500: '#8BC34A',
          600: '#6FA533',
        },
        cream: '#FFFAF1',
        ivory: '#FFF8F0',
        sky2: '#BEE3F8',
        sun: '#FFE7A0',
        peach: '#FFD6BA',
        mint: '#C8F4DE',
        lilac: '#E2D6FF',
        ink: '#1F2A44',
      },
      boxShadow: {
        soft: '0 10px 30px -10px rgba(31, 42, 68, 0.18)',
        pop: '0 18px 40px -12px rgba(255, 107, 107, 0.45)',
        premium: '0 30px 60px -25px rgba(31, 42, 68, 0.25), 0 8px 20px -8px rgba(108, 99, 255, 0.18)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        blob: '60% 40% 55% 45% / 50% 60% 40% 50%',
      },
      backgroundImage: {
        'mesh-warm': 'radial-gradient(at 18% 12%, rgba(255,107,107,0.18) 0px, transparent 45%), radial-gradient(at 82% 8%, rgba(255,217,61,0.22) 0px, transparent 45%), radial-gradient(at 70% 90%, rgba(78,205,196,0.18) 0px, transparent 45%), radial-gradient(at 10% 82%, rgba(108,99,255,0.16) 0px, transparent 45%)',
        'mesh-cool': 'radial-gradient(at 12% 18%, rgba(78,205,196,0.22) 0px, transparent 50%), radial-gradient(at 88% 22%, rgba(108,99,255,0.18) 0px, transparent 50%), radial-gradient(at 50% 90%, rgba(255,159,104,0.18) 0px, transparent 50%)',
        'mesh-cream': 'radial-gradient(at 30% 20%, rgba(255,217,61,0.25) 0px, transparent 45%), radial-gradient(at 80% 80%, rgba(255,107,107,0.18) 0px, transparent 50%)',
        'brand-gradient': 'linear-gradient(135deg, #FF6B6B 0%, #FF9F68 50%, #FFD93D 100%)',
        'cool-gradient': 'linear-gradient(135deg, #4ECDC4 0%, #6C63FF 100%)',
        'warm-gradient': 'linear-gradient(135deg, #FFD93D 0%, #FF9F68 50%, #FF6B6B 100%)',
        'sunset-gradient': 'linear-gradient(135deg, #FF6B6B 0%, #6C63FF 100%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        pulseSoft: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 107, 107, 0.45)' },
          '50%': { boxShadow: '0 0 0 16px rgba(255, 107, 107, 0)' },
        },
        blob: {
          '0%, 100%': { borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%' },
          '33%': { borderRadius: '40% 60% 35% 65% / 60% 40% 60% 40%' },
          '66%': { borderRadius: '55% 45% 65% 35% / 45% 55% 45% 55%' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(0.85)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        wiggle: 'wiggle 2.5s ease-in-out infinite',
        fadeIn: 'fadeIn 300ms ease-out',
        slideUp: 'slideUp 600ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        shimmer: 'shimmer 6s ease-in-out infinite',
        pulseSoft: 'pulseSoft 2.4s ease-out infinite',
        blob: 'blob 14s ease-in-out infinite',
        spinSlow: 'spinSlow 24s linear infinite',
        sparkle: 'sparkle 2.4s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
};
