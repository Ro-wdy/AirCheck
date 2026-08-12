/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0F14',
        surface: '#151B23',
        teal: '#4FD1C5',
        healthy: '#3DDC84',
        degraded: '#F5A623',
        critical: '#F55050',
      },
    },
  },
  plugins: [],
}
