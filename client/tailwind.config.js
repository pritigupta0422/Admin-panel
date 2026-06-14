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
          light: '#f4f4f5',
          DEFAULT: '#0a0a0a',
          dark: '#000000',
        },
        status: {
          green: {
            bg: '#0a0a0a',
            text: '#ffffff',
          },
          orange: {
            bg: '#fafafa',
            text: '#71717a',
          },
          blue: {
            bg: '#fafafa',
            text: '#71717a',
          },
          red: {
            bg: '#f4f4f5',
            text: '#3f3f46',
          },
          grey: {
            bg: '#f4f4f5',
            text: '#3f3f46',
          }
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 1px 3px rgba(0, 0, 0, 0.06)',
        'premium-card': '0 2px 6px rgba(0, 0, 0, 0.08)',
        'modal': '0 20px 40px -10px rgba(0, 0, 0, 0.1)',
        'btn-hover': '0 4px 12px rgba(0, 0, 0, 0.2)',
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

