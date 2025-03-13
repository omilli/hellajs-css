import { StyleConfig } from "./types";
import { themeVars, collectedStyles, processDefaultValues } from "./store";
import {
  createSelector,
  isPropertyValue,
  getNestedStyles,
  getNestedSelectors,
} from "./utils";
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
  config: StyleConfig,
  parentSelector = ""
): string {
  const properties: string[] = [];
  const nestedRules: string[] = [];

  // Process each key in the config
  for (const key in config) {
    // Skip special properties from the nest function
    if (key === "__styles") continue;

    const value = config[key as keyof StyleConfig];

    // Check if this value is a special nested selector object
    const nestedSelectors = getNestedSelectors(value);
    if (nestedSelectors && parentSelector) {
      // This is a nested selector (created by nest function)
      // Get the styles to apply
      const styles = getNestedStyles(value);
      if (styles) {
        // Create combined selectors with the parent - completely ignoring the key
        const combinedSelectors = nestedSelectors
          .map((sel) =>
            sel.startsWith("&")
              ? parentSelector + sel.substring(1)
              : `${parentSelector}${sel}`
          )
          .join(", ");

        // Process the styles with the combined selector
        const nestedCss = styleConfigToCss(styles, combinedSelectors);
        nestedRules.push(nestedCss);
      }
    } else if (typeof value === "object" && !isPropertyValue(value)) {
      // This is a regular nested selector or at-rule
      const selector = createSelector(key, parentSelector);

      // Special handling for comma-separated selectors
      // When parentSelector contains multiple comma-separated selectors,
      // and we're adding a nested selector, we need to distribute it to each part
      if (parentSelector && parentSelector.includes(",")) {
        const parts = parentSelector.split(",").map((part) => part.trim());
        // Create a new comma-separated selector by combining each parent part with the key
        const distributedSelector = parts
          .map((part) => createSelector(key, part))
          .join(", ");

        const nestedCss = styleConfigToCss(
          value as StyleConfig,
          distributedSelector
        );
        nestedRules.push(nestedCss);
      } else {
        // Normal case - single parent selector
        const nestedCss = styleConfigToCss(value as StyleConfig, selector);
        nestedRules.push(nestedCss);
      }
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
