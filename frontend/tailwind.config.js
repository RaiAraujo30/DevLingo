/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '35': 'repeat(35, minmax(0, 1fr))',
      },
      // Suas cores personalizadas
      colors: {
        "ggom-1": "rgba(4, 40, 63, 1)",
        "ggom-2": "rgba(0, 91, 82, 1)",
        "ggom-3": "rgba(158, 193, 49, 1)",
        "ggom-4": "rgba(219, 242, 38, 1)",
        "ggom-5": "rgba(214, 212, 142, 1)"
      },
    },
  },
  plugins: [],
}
