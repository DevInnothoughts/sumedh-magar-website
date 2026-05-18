/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './services/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1BA39C',
          50: '#E6F7F6',
          100: '#CCF0ED',
          200: '#99E1DB',
          300: '#66D2C9',
          400: '#33C3B7',
          500: '#1BA39C',
          600: '#158F89',
          700: '#107B76',
          800: '#0C5B57',
          900: '#083C39',
        },
        secondary: {
          DEFAULT: '#003366',
          50: '#E6EBF2',
          100: '#CCD7E5',
          200: '#99AFCB',
          300: '#6687B1',
          400: '#335F97',
          500: '#003366',
          600: '#002952',
          700: '#001F3D',
          800: '#001429',
          900: '#000A14',
        },
        accent: {
          DEFAULT: '#26D0C7',
          light: '#52DBD4',
          dark: '#1BB5AD',
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        success: {
          DEFAULT: '#10B981',
          light: '#34D399',
          dark: '#059669',
        },
        warning: {
          DEFAULT: '#F59E0B',
          light: '#FBBF24',
          dark: '#D97706',
        },
        error: {
          DEFAULT: '#EF4444',
          light: '#F87171',
          dark: '#DC2626',
        },
        navy: {
          DEFAULT: '#003366',
          light: '#004488',
          dark: '#002244',
        },
        teal: {
          DEFAULT: '#1BA39C',
          light: '#26D0C7',
          dark: '#158F89',
        },
        silver: {
          DEFAULT: '#E6E6E6',
          light: '#F5F5F5',
          dark: '#CCCCCC',
        },
        gold: {
          DEFAULT: '#F59E0B',
        },
      },
      fontFamily: {
        sans: ['var(--font-open-sans)', 'Open Sans', 'sans-serif'],
        heading: ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 10px 40px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
