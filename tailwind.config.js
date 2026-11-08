/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Komoot Signature Palette
        komoot: {
          green: '#72A422',
          'green-hover': '#63921B',
          'green-dark': '#4F6814',
          'green-light': '#F1F7E8',
          dark: '#1C241E',
          charcoal: '#2D352F',
          muted: '#5F6B62',
          border: '#E3E7E3',
          bg: '#F7F8F7',
          surface: '#FFFFFF',
        },
        canopy: {
          950: '#152419',
          900: '#1C2E21',
          800: '#263D2C',
          700: '#34523B',
          600: '#476E51',
          100: '#E8EFE9',
          50: '#F4F7F4',
        },
        basalt: {
          950: '#111713',
          900: '#1C241E',
          800: '#2B352E',
          700: '#3D4A40',
          600: '#5A685D',
          400: '#8A998E',
          300: '#B8C4BB',
        },
        mist: {
          50: '#F7F8F7',
          100: '#EFF2EF',
          200: '#E3E7E3',
          300: '#CED4CE',
          400: '#AAB3AA',
        },
        ember: {
          600: '#72A422', // Mapped to primary action green for unified outdoor feel
          500: '#83BA27',
          400: '#9AD134',
          700: '#5E891A',
        },
        'trail-green': '#72A422',
        'status-warn': '#E58A1F',
        'status-danger': '#E04040',
      },
      fontFamily: {
        serif: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'], // Komoot uses clean modern bold sans for all headers!
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'komoot': '0 2px 8px -2px rgba(28, 36, 30, 0.08), 0 1px 4px -1px rgba(28, 36, 30, 0.04)',
        'komoot-lg': '0 12px 32px -4px rgba(28, 36, 30, 0.12), 0 4px 12px -2px rgba(28, 36, 30, 0.06)',
        'subtle': '0 1px 3px 0 rgba(15, 36, 25, 0.05), 0 1px 2px -1px rgba(15, 36, 25, 0.05)',
        'elevated': '0 10px 30px -5px rgba(28, 36, 30, 0.12), 0 4px 6px -2px rgba(28, 36, 30, 0.04)',
      },
      borderRadius: {
        'komoot': '16px',
        'komoot-lg': '24px',
      }
    },
  },
  plugins: [],
}
