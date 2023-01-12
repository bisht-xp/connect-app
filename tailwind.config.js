module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        500: '500px',
        100: '100px'
      },
      fontFamily: {
        roboto:['Roboto', "sans-serif"]
      }
    },
  },
  plugins: [],
}