/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#050a13',
        'primary-variant': '#1b1e26',
        accent: '#03e8f9',
        'accent-variant': '#fd6413',
        text: '#ffffff',
        white: '#ffffff',
        black: '#050a13',
        blue: '#03e8f9',
        orange: '#fd6413',
        gray: '#1b1e26',
      },
      maxWidth: {
        'container': '1200px',
      },
      backgroundImage: {
        'home-bg': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' %3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='0' y2='1' gradientTransform='rotate(267,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%23050A13'/%3E%3Cstop offset='1' stop-color='%231B1E26'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpattern id='b' width='14' height='14' patternUnits='userSpaceOnUse'%3E%3Ccircle fill='%23013A3F' cx='7' cy='7' r='7'/%3E%3C/pattern%3E%3Crect width='100%25' height='100%25' fill='url(%23a)'/%3E%3Crect width='100%25' height='100%25' fill='url(%23b)' fill-opacity='0.09'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}

