/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-desktop-bg": "url('./public/images/newServer.png')", // Define your custom background
        n4bg: "url('./public/images/n4bg.png')",
        homebg: "url('./public/images/homebg.png')",
      },
      container: {
        center: true,
        screens: {
          sm: "640px", // Wider for small screens
          md: "960px", // More space for medium screens
          lg: "1200px", // Proper width for large screens
          xl: "1440px", // Good for extra-large screens
          "2xl": "1600px", // Max width for ultra-wide screens
        },
      },
      fontFamily: {
        oswald: ["Oswald", "sans-serif"],
        bebas: ["Bebas Neue", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
    // container: {
    //   padding: "3.5rem",
    // },
  },
  plugins: [],
};
