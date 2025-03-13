import { FlattenedTheme, StyleConfig, ThemeConfig } from "./types";
import { collectCssVars, createCssVars } from "./variables";
import { styleConfigToCss } from "./css";
import { collectedStyles } from "./store";

// Regular exports
export * from "./types";
export * from "./functions";
export { generateCss, generateStyles } from "./css";
export { clearCssCache } from "./generators";

// Sets up a new theme with all the CSS vars
export function createTheme<T extends ThemeConfig>(
  ...args: [string, T] | [T]
): FlattenedTheme<T> {
  const themeName = typeof args[0] === "string" ? args[0] : "";
  const vars = typeof args[0] === "string" ? args[1] : args[0];

  // Collect CSS variables for the specific theme - all vars go to root
  collectCssVars(vars, themeName, "", "", true);

  return createCssVars<T>(...args) as unknown as FlattenedTheme<T>;
}

// Makes component-specific vars that can have light/dark variants
export function createVars<T extends Record<string, any>>(
  ...args: [string, T] | [T]
): T {
  const themeName = typeof args[0] === "string" ? args[0] : "";
  const vars = typeof args[0] === "string" ? args[1] : args[0];

  // Only collect light/dark vars for CSS output
  collectCssVars(vars, themeName, "", "", false);

  return createCssVars<T>(...args);
}

// Creates CSS styles from a style configuration object
export function createStyle(config: StyleConfig): StyleConfig {
  // Convert the style config to CSS
  const css = styleConfigToCss(config, "");

  // Add to collection
  if (css) {
    collectedStyles.push(css);
  }

  return config;
}

// Current active theme state
let activeTheme: string = "light";

// Set the active theme
export function setActiveTheme(theme: string): void {
  document.documentElement.setAttribute("data-theme", theme);
  activeTheme = theme;
}

// Get the current active theme
export function getActiveTheme(): string {
  return activeTheme;
}

// Toggle between two themes
export function toggleTheme(theme1: string, theme2: string): string {
  const newTheme = activeTheme === theme1 ? theme2 : theme1;
  setActiveTheme(newTheme);
  return newTheme;
}
