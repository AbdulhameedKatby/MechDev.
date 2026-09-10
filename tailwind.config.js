module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: '#0b0438',
        surface: '#110654',
        'surface-elevated': '#180b6e',
        accent: '#0e9954',
        emerald: {
          400: '#12b865',
          500: '#0e9954',
          600: '#0b8246',
        }
      },
      fontFamily: {
        brand: ['Space Grotesk', 'sans-serif'],
      }
    }
  },
  plugins: []
}
