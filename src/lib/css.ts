import { StyleConfigBase } from "./types";
import { themeVars, collectedStyles, processDefaultValues } from "./store";
import { createSelector, isPropertyValue } from "./utils";
import {
  generateRootCssVariables,
  generateDarkThemeCssVariables,
} from "./generators";

/**
 * Generates complete CSS including theme variables and collected styles
 *
 * @param includeStyles - Include collected styles in output
 * @returns Complete CSS string with variables and styles
 */
export function generateCss(includeStyles = true): string {
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

  return cssChunks.join("\n") + "\n";
}

/**
 * Generates only the collected styles without theme variables
 *
 * @returns CSS string containing only collected styles
 */
export function generateStyles(): string {
  return collectedStyles.join("\n\n");
}

/**
 * Transforms style configuration object into valid CSS
 *
 * @param config - Style configuration object
 * @param parentSelector - Parent selector for nested rules
 * @returns Generated CSS string
 */
export function styleConfigToCss(
  config: StyleConfigBase,
  parentSelector = ""
): string {
  const properties: string[] = [];
  const nestedRules: string[] = [];

  // Process each key in the config
  for (const key in config) {
    const value = config[key as keyof StyleConfigBase];

    if (typeof value === "object" && !isPropertyValue(value)) {
      // This is a nested selector or at-rule
      const selector = createSelector(key, parentSelector);
      const nestedCss = styleConfigToCss(value as StyleConfigBase, selector);
      nestedRules.push(nestedCss);
    } else {
      // This is a CSS property
      properties.push(`  ${key}: ${value};`);
    }
  }

  // Build the CSS string
  let css = "";
  if (properties.length > 0) {
    css += `${parentSelector} {\n${properties.join("\n")}\n}`;
  }

  if (nestedRules.length > 0) {
    if (properties.length > 0) css += "\n\n";
    css += nestedRules.join("\n\n");
  }

  return css;
}
