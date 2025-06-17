/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        NuraBold: ["NuraBold", "sans-serif"],
        varien: ["varien", "sans-serif"],
        NuraNormal: ["NuraNormal", "sans-serif"],
      },
    },
  },
  plugins: [],
};
