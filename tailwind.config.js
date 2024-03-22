/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js'
    /* src folder, for example */
  ],
  theme: {
    extend: {
      width: {
        '500': '800px', // Añade un tamaño personalizado de 500px
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}