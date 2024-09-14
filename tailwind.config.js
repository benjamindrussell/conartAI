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
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeIn1: 'fadeIn 2s ease-in-out',
        fadeIn2: 'fadeIn 5s ease-in-out',
        fadeIn3: 'fadeIn 6s ease-in-out',
      },
  },
  plugins: [],
}
}
