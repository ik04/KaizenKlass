import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#201f25",
        "custom-blue": "#4592AF",
        "primary-complement": "#16151A",
      },
      fontFamily: {
        display: ['"Big Shoulders Display"', "sans"],
        base: ['"Josefin Sans"', "sans"],
      },
    },
  },
  plugins: [],
};
export default config;
