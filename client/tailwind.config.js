/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#F4F4F5',
          DEFAULT: '#0A0A0A',
          dark: '#0A0A0A',
        },
        status: {
          green: {
            bg: '#F4F4F5',
            text: '#0A0A0A',
          },
          orange: {
            bg: '#2C2C2C',
            text: '#FFFFFF',
          },
          blue: {
            bg: '#0A0A0A',
            text: '#FFFFFF',
          },
          grey: {
            bg: '#F4F4F5',
            text: '#71717A',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'modal': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      borderWidth: {
        '0.5': '0.5px',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
      animation: {
        slideUp: 'slideUp 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
}
