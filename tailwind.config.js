/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'soft-blush': '#F5E6EA',
        'rose-accent': '#C2185B',
        'deep-plum': '#3D2A2A',
        'rose-pink': '#D81B60',
        'muted-rose': '#E91E63',
        'lavender': '#E8D5FF',
        'peach': '#FFE5D9',
        'gold': '#D4AF37',
        'coral': '#E57373',
        'warm-gray': '#6B5B73',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glam-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
        'soft-gradient': 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        'rose-gradient': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'sunset-gradient': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(233, 30, 99, 0.3)',
        'glow-lg': '0 0 40px rgba(233, 30, 99, 0.4)',
        'soft': '0 2px 15px rgba(0, 0, 0, 0.08)',
        'elegant': '0 10px 40px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}

