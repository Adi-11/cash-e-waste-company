module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      extradark: "var(--color-bg)",
      button: "var(--color-button)",
      transparent: "transparent",
      primary: {
        DEFAULT: "var(--color-primary)",
      },
      secondary: {
        DEFAULT: "var(--color-secondary)",
        dark: "var(--color-secondary-dark)",
      },
      white: "#fff",
      black: "#000",
      accent: "var(--color-accent)",
      darkwave: "var(--color-darkwave)",
    },
  },
  plugins: [],
};
