/** @type {import('tailwindcss').Config} */
module.exports = {
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
      backgroundColor: {
        "black-20": "rgba(0,0,0,0.2)",
        "white-20": "rgba(255, 255, 255, 0.5)",
      },
      borderColor: {
        "black-20": "rgba(0,0,0,0.2)",
        "white-20": "rgba(255, 255, 255, 0.13)",
      },
      fontFamily: {
        sans: ['Montserrat'],
        serif: ['Montserrat'],
        mono: ['Montserrat'],
        display: ['Montserrat'],
        body: ['Montserrat']
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
};
