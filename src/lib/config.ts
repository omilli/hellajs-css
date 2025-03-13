import { getNestedSelectors, getNestedStyles } from "./nesting";
import { StyleConfig } from "./types";
import { createSelector, isPropertyValue, toKebabCase } from "./utils";
/**
 * Transforms style configuration object into valid CSS
 *
 * @param config - Style configuration object
 * @param parentSelector - Parent selector for nested rules
 * @returns Generated CSS string
 */
export function convertConfigToCss(
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
        // For comma-separated parent selectors, we need to distribute each parent to each nested selector
        const parentParts = parentSelector
          .split(",")
          .map((part) => part.trim());

        // Create combined selectors with proper distribution
        const combinedSelectors = [];

        // Distribute each parent to each nested selector
        for (const parent of parentParts) {
          for (const sel of nestedSelectors) {
            combinedSelectors.push(
              sel.startsWith("&")
                ? parent + sel.substring(1)
                : sel.startsWith(":") || sel.startsWith("::")
                ? `${parent}${sel}` // No space for pseudo-classes/elements
                : `${parent} ${sel}` // Space for other selectors
            );
          }
        }

        // Join all combinations with commas
        const fullSelector = combinedSelectors.join(", ");

        // Process the styles with the combined selector
        const nestedCss = convertConfigToCss(styles, fullSelector);
        nestedRules.push(nestedCss);
      }
    } else if (typeof value === "object" && !isPropertyValue(value)) {
      // This is a regular nested selector or at-rule

      // Special handling for comma-separated parent selectors
      if (parentSelector && parentSelector.includes(",")) {
        const parts = parentSelector.split(",").map((part) => part.trim());
        // Create a distributed selector
        const distributedSelector = parts
          .map((part) => createSelector(key, part))
          .join(", ");

        const nestedCss = convertConfigToCss(
          value as StyleConfig,
          distributedSelector
        );
        nestedRules.push(nestedCss);
      } else {
        // Standard case - single parent selector
        const selector = createSelector(key, parentSelector);
        const nestedCss = convertConfigToCss(value as StyleConfig, selector);
        nestedRules.push(nestedCss);
      }
    } else {
      // This is a CSS property - convert camelCase to kebab-case
      const kebabKey = toKebabCase(key);
      properties.push(`  ${kebabKey}: ${value};`);
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
