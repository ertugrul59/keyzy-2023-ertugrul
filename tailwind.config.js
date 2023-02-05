/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      navy: "#273043",
      honey: "#F39237",
      magenta: "#BF1363",
      azure: "#0E79B2",
      parchment: "#FBFFF1",
    },
    extend: {
      textUnderlineOffset: {
        setOffset: "-0.2px",
      },
    },
    screens: {
      // mobile: { max: "399px" },
      tablet: { min: "768px", max: "1023px" },
      desktop: { min: "1024px" },
    },
  },
  plugins: [],
};
