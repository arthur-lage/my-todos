module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        mxl: { max: "1140px" },
        desktop: { max: "1050px" },
        tablet: { max: "670px" },
        phone: { max: "480px" },
        small: { max: "425px" },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
