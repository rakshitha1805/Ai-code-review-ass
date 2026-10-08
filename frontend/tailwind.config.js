/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#070A11',
          card: '#0D1322',
          cardHover: '#131B2E',
          border: '#1E293B',
          cyan: '#00F0FF',
          blue: '#3B82F6',
          purple: '#8B5CF6',
          accent: '#06B6D4',
          darkBg: '#05070D',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'radar-sweep': 'radarSweep 4s linear infinite',
        'scan-line': 'scanLine 2.5s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow-border': 'glowBorder 3s infinite alternate',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 15px rgba(0, 240, 255, 0.4)' },
          '50%': { opacity: 0.6, boxShadow: '0 0 5px rgba(0, 240, 255, 0.1)' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        scanLine: {
          '0%': { top: '0%' },
          '50%': { top: '95%' },
          '100%': { top: '0%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glowBorder: {
          '0%': { borderColor: 'rgba(0, 240, 255, 0.3)' },
          '100%': { borderColor: 'rgba(59, 130, 246, 0.7)' },
        }
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0, 240, 255, 0.35)',
        'neon-blue': '0 0 20px rgba(59, 130, 246, 0.35)',
        'neon-red': '0 0 20px rgba(239, 68, 68, 0.35)',
        'neon-emerald': '0 0 20px rgba(16, 185, 129, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }
    },
  },
  plugins: [],
}
