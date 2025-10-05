module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
      extend: {
      maxWidth: {
        '8xl': '90rem', // 1440px
        '9xl': '100rem', // 1600px (optional, if you want even wider)
      },
     },
  },
  plugins: [],
}
