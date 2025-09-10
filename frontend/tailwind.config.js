// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: {
            DEFAULT: "#047857",   // main green
            dark: "#065f46",      // dark hover
            light: "#10b981",     // accent green
          },
          gold: {
            DEFAULT: "#FFD700",   // real gold
            dark: "#b8860b",      // dark goldenrod
            light: "#ffec8b",     // pale golden
          },
          neutral: {
            DEFAULT: "#374151",   // dark gray text
            light: "#6b7280",     // light gray text
            bg: "#f9fafb",        // background
          },
        },
      },
    },
  },
  plugins: [],
};
