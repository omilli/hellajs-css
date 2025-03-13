import * as CSS from "csstype";
import {
  FlattenedTheme,
  StyleConfig,
  StyleConfigValidValues,
  ThemeConfig,
} from "./types";
import { collectCssVars, createCssVars } from "./variables";
import { convertConfigToCss } from "./config";
import { themeVars, collectedStyles, processDefaultValues } from "./store";
import {
  generateRootCssVariables,
  generateDarkThemeCssVariables,
} from "./generate";
import { combineIdenticalRules } from "./utils";

// Regular exports
export * from "./types";
export * from "./functions";
export { clearCssCache } from "./cache";

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
 * Can be called with either a style config object or an array of selectors and a styles object.
 *
 * @param {StyleConfig | (string[] | (keyof HTMLElementTagNameMap | CSS.AtRules | CSS.Pseudos)[])} configOrSelectors - Style config or array of selectors
 * @param {StyleConfigValidValues} [styles] - Style object when using array of selectors
 * @returns {StyleConfig} The resulting style configuration
 */
export function style(
  configOrSelectors:
    | StyleConfig
    | (string[] | (keyof HTMLElementTagNameMap | CSS.AtRules | CSS.Pseudos)[]),
  styles?: StyleConfigValidValues
): StyleConfig {
  let config: StyleConfig;

  // Check if the first argument is an array (selectors)
  if (Array.isArray(configOrSelectors) && styles) {
    // Create a combined selector string
    const combinedSelector = configOrSelectors.join(",");

    // Build the config object with combined selector
    config = {
      [combinedSelector]: styles,
    };
  } else {
    // Handle as normal style config
    config = configOrSelectors as StyleConfig;
  }

  // Convert the style config to CSS
  const css = convertConfigToCss(config, "");

  // Add to collection
  if (css) {
    collectedStyles.push(css);
  }

  return config;
}

/**
 * Nests selectors by preserving the parent selector context
 * @param selectors Array of CSS selectors to combine with parents
 * @param styles Style object to apply to the nested selectors
 * @returns A special object that will be processed to include parent selectors
 */
export function nested(
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

/**
 * Generates complete CSS including theme variables and collected styles
 *
 * @param includeStyles - Include collected styles in output
 * @returns Complete CSS string with variables and styles
 */
export function css(includeStyles = true): string {
  // Prep the CSS
  processDefaultValues();

  const cssChunks: string[] = [];

  // Add root vars
  cssChunks.push(generateRootCssVariables().css);

  // Add dark theme if we have any dark mode vars
  if (Object.keys(themeVars.dark).length > 0) {
    cssChunks.push(generateDarkThemeCssVariables().css);
  }

  // Tack on the styles if needed
  if (includeStyles && collectedStyles.length > 0) {
    cssChunks.push(collectedStyles.join("\n\n"));
  }

  const rawCss = cssChunks.join("\n") + "\n";

  // Optimize the CSS by combining identical rules
  const optimizedCss = combineIdenticalRules(rawCss);

  // Ensure consistent spacing between rules
  return optimizedCss.replace(/\n{3,}/g, "\n\n");
}
