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
    },
    // container: {
    //   padding: "3.5rem",
    // },
  },
  plugins: [],
};
