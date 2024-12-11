/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-desktop-bg": "url('./public/images/close_face.webp')", // Define your custom background
        "custom-mobile-bg": "url('./public/images/close_face_mobile.webp')",
      },
    },
    // container: {
    //   padding: "3.5rem",
    // },
  },
  plugins: [],
};
