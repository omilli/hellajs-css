import { Flatten, StyleConfig } from "./types";
import { collectCssVars, createCssVars } from "./variables";
import { styleConfigToCss } from "./css";
import { collectedStyles } from "./store";

// Public API exports
export * from "./types";
export { generateCss, generateStyles } from "./css";

/**
 * Creates a theme with CSS variables
 *
 * @param args - Theme name and variables or just variables
 * @returns Processed theme object
 */
export const createTheme = <T extends {}>(
  ...args: [string, T] | [T]
): Flatten<T> => {
  const themeName = typeof args[0] === "string" ? args[0] : "";
  const vars = typeof args[0] === "string" ? args[1] : args[0];

  // Collect CSS variables for the specific theme - all vars go to root
  collectCssVars(vars, themeName, "", "", true);

  return createCssVars<T>(...args) as unknown as Flatten<T>;
};

/**
 * Creates component-specific variables
 *
 * @param args - Component name and variables or just variables
 * @returns Processed variables object
 */
export const createVars = <T extends {}>(...args: [string, T] | [T]): T => {
  const themeName = typeof args[0] === "string" ? args[0] : "";
  const vars = typeof args[0] === "string" ? args[1] : args[0];

  // Only collect light/dark vars for CSS output
  collectCssVars(vars, themeName, "", "", false);

  return createCssVars<T>(...args);
};

/**
 * Creates CSS styles from a style configuration object
 *
 * @param config - Style configuration
 * @returns The original config for chaining
 */
export function createStyle(config: StyleConfig): StyleConfig {
  // Convert the style config to CSS
  const css = styleConfigToCss(config, "");

  // Add to collection
  if (css) {
    collectedStyles.push(css);
  }

  return config;
}
