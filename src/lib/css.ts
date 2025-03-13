import { StyleConfig } from "./types";
import { themeVars, collectedStyles, processDefaultValues } from "./store";
import { createSelector, isPropertyValue } from "./utils";
import {
  generateRootCssVariables,
  generateDarkThemeCssVariables,
} from "./generators";

// Generate CSS from collected variables with theme support
export function generateCss(includeStyles = true): string {
  // Process default values and optimize CSS before generating
  processDefaultValues();

  const cssChunks: string[] = [];

  // Generate root variables
  cssChunks.push(generateRootCssVariables().css);

  // Generate dark theme with media query
  if (Object.keys(themeVars.dark).length > 0) {
    cssChunks.push(generateDarkThemeCssVariables().css);
  }

  // Include collected styles if requested
  if (includeStyles && collectedStyles.length > 0) {
    cssChunks.push(collectedStyles.join("\n\n"));
  }

  return cssChunks.join("\n") + "\n";
}

// Export a function that returns only the styles (no variables)
export function generateStyles(): string {
  return collectedStyles.join("\n\n");
}

// Convert a style config object to CSS string
export function styleConfigToCss(
  config: StyleConfig,
  parentSelector = ""
): string {
  const properties: string[] = [];
  const nestedRules: string[] = [];

  // Process each key in the config
  for (const key in config) {
    const value = config[key as keyof StyleConfig];

    if (typeof value === "object" && !isPropertyValue(value)) {
      // This is a nested selector or at-rule
      const selector = createSelector(key as string, parentSelector);
      const nestedCss = styleConfigToCss(value as StyleConfig, selector);
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
