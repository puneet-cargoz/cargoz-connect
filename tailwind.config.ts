import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#f3f0ff",
          100: "#e9e3ff",
          200: "#d4c8ff",
          300: "#b39dff",
          400: "#9470ff",
          500: "#7957ff",
          600: "#6a3fff",
          700: "#5a2be0",
          800: "#4a23ba",
          900: "#3d1f97",
        },
        teal: {
          50:  "#f0faf9",
          100: "#d9f2ef",
          200: "#b3e5df",
          300: "#7dd1c9",
          400: "#40bcaa",
          500: "#32a894",
          600: "#278a79",
          700: "#216e61",
          800: "#1d5850",
          900: "#1a4a43",
        },
      },
      fontFamily: {
        sans:    ["Lato", "system-ui", "sans-serif"],
        heading: ["Outfit", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
