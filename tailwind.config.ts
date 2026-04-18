import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        ui: ['var(--font-ui)', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          navy: '#0F2D5E',
          blue: '#1A56DB',
          teal: '#0694A2',
          amber: '#D97706',
        },
        surface: {
          white: '#FAFAF8',
          light: '#F3F4F6',
        },
        border: '#E5E7EB',
        text: {
          primary: '#111827',
          secondary: '#4B5563',
          muted: '#9CA3AF',
        },
      },
    },
  },
  plugins: [],
};
export default config;
