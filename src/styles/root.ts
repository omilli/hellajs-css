import { createTheme } from "../lib";

// Light theme colors
export const lightColors = {
  background: "#ffffff",
  text: "#1c1c1c",
  heading: "#222222",
  border: "#dddddd",
  link: "oklch(0.488 0.243 264.376)",
  linkHover: "#3a78d2",
  muted: "#666666",
  accent: "#3a78d2",
  blockquoteBg: "#f9f9f9",
  codeBg: "#f5f5f5",
  shadow: "rgba(0, 0, 0, 0.1)",
};

// Dark theme colors
export const darkColors = {
  background: "#1a1a1a",
  text: "#eeeeee",
  heading: "#ffffff",
  border: "#444444",
  link: "#3a78d2",
  linkHover: "#5a9bd4",
  muted: "#aaaaaa",
  accent: "#5a9bd4",
  blockquoteBg: "#333333",
  codeBg: "#333333",
};

// Set themes
export const initializeThemes = () => {
  createTheme("light", lightColors);
  createTheme("dark", darkColors);
};

export const rootVars = createTheme("light", lightColors);
