/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {},
      colors: {
        cloud: "#2D3250",
        blue: "#424769",
        "slate-blue": "#7077A1",
        peach: "#F6B17A",
        "outer-space": "#2a2734",
      },
    },
  },
  plugins: [],
};
