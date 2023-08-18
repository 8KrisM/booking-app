/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#009E83',
        bgDark: '#1a1625',
        bgLight: '#ffffff',
        darkText: '#F2F2F2',
        darkPick: '#1f1f33',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}

