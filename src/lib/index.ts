import * as CSS from "csstype";
import {
  FlattenedTheme,
  StyleConfig,
  StyleConfigValidValues,
  ThemeConfig,
} from "./types";
import { collectCssVars, createCssVars } from "./variables";
import { styleConfigToCss } from "./css";
import { collectedStyles } from "./store";

// Regular exports
export * from "./types";
export * from "./functions";
export { css } from "./css";
export { clearCssCache } from "./generators";

/**
 * Applies a theme configuration and collects CSS variables for the specified theme.
 *
 * @template T - The type of the theme configuration.
 * @param args - Either a tuple containing a theme name and a theme configuration object, or just a theme configuration object.
 * @returns The flattened theme configuration.
 */
export function theme<T extends ThemeConfig>(
  ...args: [string, T] | [T]
): FlattenedTheme<T> {
  const themeName = typeof args[0] === "string" ? args[0] : "";
  const vars = typeof args[0] === "string" ? args[1] : args[0];

  // Collect CSS variables for the specific theme - all vars go to root
  collectCssVars(vars, themeName, "", "", true);

  return createCssVars<T>(...args) as unknown as FlattenedTheme<T>;
}

/**
 * A function to handle theme variables and collect them for CSS output.
 *
 * @template T - A generic type extending a record with string keys and any values.
 * @param {...[string, T] | [T]} args - The arguments can either be a string followed by a record of variables, or just a record of variables.
 * @returns {T} - Returns the processed theme variables.
 */
export function vars<T extends Record<string, any>>(
  ...args: [string, T] | [T]
): T {
  const themeName = typeof args[0] === "string" ? args[0] : "";
  const vars = typeof args[0] === "string" ? args[1] : args[0];

  // Only collect light/dark vars for CSS output
  collectCssVars(vars, themeName, "", "", false);

  return createCssVars<T>(...args);
}

/**
 * Converts the provided style configuration to CSS and adds it to the collection of styles.
 *
 * @param {StyleConfig} config - The style configuration to be converted to CSS.
 * @returns {StyleConfig} The original style configuration.
 */
export function style(config: StyleConfig): StyleConfig {
  // Convert the style config to CSS
  const css = styleConfigToCss(config, "");

  // Add to collection
  if (css) {
    collectedStyles.push(css);
  }

  return config;
}

/**
 * Merges an array of selectors with a style object
 * @param selectors Array of CSS selectors to combine
 * @param styles Style object to apply to all selectors
 * @returns An object with the combined selector as key and styles as value
 */
export function merge(
  selectors:
    | (keyof HTMLElementTagNameMap | CSS.AtRules | CSS.Pseudos)[]
    | string[],
  styles: StyleConfigValidValues
): StyleConfigValidValues {
  // Join selectors with commas to create a combined selector
  const combinedSelector = selectors.join(",");

  // Return an object with the combined selector as the only key
  return {
    [combinedSelector]: styles,
  };
}

/**
 * Nests selectors by preserving the parent selector context
 * @param selectors Array of CSS selectors to combine with parents
 * @param styles Style object to apply to the nested selectors
 * @returns A special object that will be processed to include parent selectors
 */
export function nest(
  selectors: string[],
  styles: StyleConfigValidValues
): StyleConfigValidValues {
  // Instead of creating separate &:hover and &:focus rules,
  // create a special flag that will be recognized during CSS generation
  const result = { __styles: styles };

  // Store the selectors array for use during CSS generation
  Object.defineProperty(result, "__NESTED_SELECTORS__", {
    value: selectors,
    enumerable: false,
  });

  // Mark this object as a special nested selector group
  Object.defineProperty(result, "__DIRECT_NEST__", {
    value: true,
    enumerable: false,
  });

  return result;
}

// Current active theme state
let activeTheme: string = "light";

/**
 * Sets the active theme for the application.
 *
 * This function updates the `data-theme` attribute on the document's root element
 * to the specified theme and sets the `activeTheme` variable to the new theme.
 *
 * @param theme - The name of the theme to set as active.
 */
export function setActiveTheme(theme: string): void {
  document.documentElement.setAttribute("data-theme", theme);
  activeTheme = theme;
}

/**
 * Retrieves the currently active theme.
 *
 * @returns {string} The name of the active theme.
 */
export function getActiveTheme(): string {
  return activeTheme;
}

// Toggle between two themes
/**
 * Toggles between two themes and sets the active theme to the new theme.
 *
 * @param theme1 - The first theme option.
 * @param theme2 - The second theme option.
 * @returns The new active theme after toggling.
 */
export function toggleTheme(theme1: string, theme2: string): string {
  const newTheme = activeTheme === theme1 ? theme2 : theme1;
  setActiveTheme(newTheme);
  return newTheme;
}
