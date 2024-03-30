/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // add this line
  ],
  theme: {
    extend: {
      boxShadow: {
        sm: "0px 3px 6px rgba(0, 0, 0, 0.16)", //used
        md: "0px 3px 6px #00000029", //used
        lg: "0px 3px 6px #9E9E9E29",
        xl: "inset 0px 3px 6px #D8D8D829, 0px 3px 6px #7A7A7A29", //used
      },
      borderRadius: {
        sm: "10px",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".flex-center-el": {
          display: "flex",
          "align-items": "center",
          "justify-content": "center",
        },
        ".rotate-y-180": {
          transform: "rotateY(180deg)",
        },
        ".main-transition": {
          "transition-duration": "0.3s",
        },
        ".main-color": {
          color: "#871E35",
        },
        ".sub-color": {
          color: "#1E1E1E",
        },
        ".main-bg": {
          "background-color": "#871E35",
        },
        ".sub-bg": {
          "background-color": "#1E1E1E",
        },
        ".main-btn": {
          "background-color": "#1E1E1E",
          color: "#FFF",
          padding: "1rem 1rem",
          "border-radius": "10px",
          transition: "0.3s",
          display: "block",
          width: "100%",
        },
        ".main-btn:hover": {
          "background-color": "#871E35",
          color: "#FFF",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
