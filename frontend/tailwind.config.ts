import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          50: "#f0e6ff",
          100: "#d1b3ff",
          200: "#b380ff",
          300: "#944dff",
          400: "#7c26ff",
          500: "#6b00ff",
          600: "#5500cc",
          700: "#400099",
          800: "#2a0066",
          900: "#150033",
        },
        surface: {
          light: "#ffffff",
          dark: "#0a0a0f",
          "dark-card": "#12121a",
          "dark-elevated": "#1a1a2e",
        },
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        glow: "0 0 20px rgba(107, 0, 255, 0.3)",
        "glow-lg": "0 0 40px rgba(107, 0, 255, 0.4)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.12)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "brand-gradient": "linear-gradient(135deg, #6b00ff 0%, #3b82f6 100%)",
        "hero-gradient": "linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "glow-pulse": {
          "0%": { boxShadow: "0 0 20px rgba(107, 0, 255, 0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(107, 0, 255, 0.6)" },
        },
      },
      fontFamily: {
        sans: ["var(--font-nunito)", "Nunito Sans", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
