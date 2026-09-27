/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070B14',
          900: '#0B1120',
          850: '#0F172A',
          800: '#1E293B',
          700: '#334155',
          600: '#475569',
        },
        brand: {
          primary: '#0F172A',
          secondary: '#1E293B',
          accent: '#2563EB',
          'accent-hover': '#1D4ED8',
          'accent-light': '#EFF6FF',
          cyan: '#06B6D4',
          'cyan-dark': '#0891B2',
          purple: '#6366F1',
        },
        risk: {
          low: '#10B981',
          'low-dark': '#059669',
          'low-bg': '#ECFDF5',
          'low-border': '#A7F3D0',
          warning: '#F59E0B',
          'warning-dark': '#D97706',
          'warning-bg': '#FFFBEB',
          'warning-border': '#FDE68A',
          high: '#EF4444',
          'high-dark': '#DC2626',
          'high-bg': '#FEF2F2',
          'high-border': '#FECACA',
        },
        surface: {
          bg: '#F8FAFC',
          card: '#FFFFFF',
          sidebar: '#0B1120',
          header: '#FFFFFF',
          border: '#E2E8F0',
          'border-light': '#F1F5F9',
        },
        content: {
          primary: '#0F172A',
          secondary: '#475569',
          muted: '#64748B',
          subtle: '#94A3B8',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.03)',
        'card-hover': '0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.03)',
        'card-elevated': '0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.03)',
        'glow-blue': '0 0 25px -5px rgba(37, 99, 235, 0.3)',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.3)',
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.3)',
        'glow-rose': '0 0 25px -5px rgba(239, 68, 68, 0.3)',
      },
    },
  },
  plugins: [],
}
