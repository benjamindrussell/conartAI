/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-bg': "url('./assets/backgroundImg.png')",
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
  },
  plugins: [],
}
}
