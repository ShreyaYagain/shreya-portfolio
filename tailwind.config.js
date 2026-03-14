/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        wallpoet: ['Wallpoet', 'monospace'],
        'share-tech': ['Share Tech Mono', 'monospace'],
        inconsolata: ['Inconsolata', 'monospace'],
        orbitron: ['Orbitron', 'sans-serif'],
        unbounded: ['Unbounded', 'sans-serif'],
        caveat: ['Caveat', 'cursive'],
        'caveat-brush': ['Caveat Brush', 'cursive'],
        cormorant: ['Cormorant Garamond', 'serif'],
        'eb-garamond': ['EB Garamond', 'serif'],
      },
    },
  },
  plugins: [],
}
