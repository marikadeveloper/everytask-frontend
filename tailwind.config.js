import {nextui} from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          primary: {
            DEFAULT: "#000000",
            foreground: "#ffffff",
          },
          focus: "#000000",
        },
      },
      /*dark: {
        colors: {
          primary: {
            DEFAULT: "#ffffff",
            foreground: "#000000",
          },
          focus: "#ffffff",
        },
      },*/
    },
  })],
}