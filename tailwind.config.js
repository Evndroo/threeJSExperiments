/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {},
  plugins: [
    require("tailwind-typewriter")({
      wordsets: {
        ellipsis: {
          words: ["...."],
          repeat: -1,
          eraseSpeed: 0,
          typeSpeed: 10,
          pauseBetween: 1,
          caretColor: "transparent",
        },
      },
    }),
  ],
};
