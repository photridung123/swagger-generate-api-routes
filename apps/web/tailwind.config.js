/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust paths as necessary
  ],
  theme: {
    extend: {},
  },
  safelist: [
    {
      pattern: /w-\d+/,
    },
    {
      pattern: /h-\d+/,
    },
  ],
  plugins: [],
};
