module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        mxl: { max: "1140px" },
        small: { max: "425px" },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
