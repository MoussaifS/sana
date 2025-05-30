// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}', // If you used src/
    './src/components/**/*.{js,ts,jsx,tsx,mdx}', // If you used src/
    './src/app/**/*.{js,ts,jsx,tsx,mdx}', // If you used src/
    './pages/**/*.{js,ts,jsx,tsx,mdx}', // If you did NOT use src/
    './components/**/*.{js,ts,jsx,tsx,mdx}', // If you did NOT use src/
    './app/**/*.{js,ts,jsx,tsx,mdx}', // If you did NOT use src/
  ],
  theme: {
    extend: {
      colors: {
        'sana-primary': '#006B35', // Deep Green
        'sana-accent': '#D4AF37',  // Gold
        'sana-neutral': {
          light: '#F5F5DC', // A light beige (example, adjust as needed)
          DEFAULT: '#F0E68C', // Khaki/Sand (example, adjust as needed)
          dark: '#D2B48C',   // Tan (example, adjust as needed)
        },
      },
      fontFamily: {
        elmessiri: ['var(--font-el-messiri)', 'sans-serif'],
      },
      // Add Airbnb-like spacing if desired (optional, start with Tailwind defaults)
      // spacing: {
      //   '128': '32rem',
      // }
    },
  },
  plugins: [],
}
export default config