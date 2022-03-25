const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "media",
  theme: {
    // boxShadow: {
    //   DEFAULT: "0px 10px 30px rgba(209, 213, 223, 0.5)",
    // },
    extend: {
      fontSize: {
        "7xl": [
          "4rem",
          {
            lineHeight: "4rem",
          },
        ],
        "8xl": [
          "5rem",
          {
            lineHeight: "1.2",
          },
        ],
      },
      colors: {
        umbrel: "#5351FB",
        slate: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
      },
    },
  },
  purge: ["./src/**/*.html", "./src/**/*.vue"],
  plugins: [],
};
