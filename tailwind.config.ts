import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f8f4ec",
          100: "#efe4d2",
          200: "#dcc9a4",
          300: "#c9ae77",
          400: "#bc9a58",
          500: "#af8738",
          600: "#8c6b2d",
          700: "#6a5022",
          800: "#483517",
          900: "#261a0b"
        }
      },
      boxShadow: {
        soft: "0 20px 80px rgba(20, 18, 12, 0.2)"
      },
      letterSpacing: {
        wideplus: "0.22em"
      }
    }
  },
  plugins: []
};

export default config;
