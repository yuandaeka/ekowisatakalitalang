/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canopy: {
          950: '#0F2419',
          900: '#143323',
          800: '#1B3B2B',
          700: '#234D38',
          600: '#2E6349',
          100: '#E2EBE5',
          50: '#F1F5F2',
        },
        basalt: {
          950: '#111211',
          900: '#1C1E1D',
          800: '#2A2E2C',
          700: '#3D4240',
          600: '#525856',
          400: '#8B9390',
          300: '#B0B7B4',
        },
        mist: {
          50: '#F6F7F4',
          100: '#EDF0EB',
          200: '#E4E7E0',
          300: '#CBD1C7',
          400: '#AAB3A5',
        },
        ember: {
          600: '#D95D39',
          500: '#E87250',
          400: '#F08D71',
          700: '#B84524',
        },
        'trail-green': '#2E6F40',
        'status-warn': '#D97706',
        'status-danger': '#DC2626',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(15, 36, 25, 0.05), 0 1px 2px -1px rgba(15, 36, 25, 0.05)',
        'elevated': '0 10px 30px -5px rgba(15, 36, 25, 0.08), 0 4px 6px -2px rgba(15, 36, 25, 0.04)',
        'glow-ember': '0 0 25px -5px rgba(217, 93, 57, 0.35)',
      },
    },
  },
  plugins: [],
}

