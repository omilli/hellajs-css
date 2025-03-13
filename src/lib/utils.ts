/**
 * Helper functions for the theme system
 */

/**
 * Checks if something is a CSS prop value or nested rule
 *
 * @param value - Value to check
 * @returns True if the value is a property value, false if it's a nested rule
 */
export function isPropertyValue(value: any): boolean {
  return typeof value !== "object" || value === null || value instanceof Array;
}

/**
 * Builds a proper CSS selector
 *
 * @param key - Current selector
 * @param parentSelector - Parent selector context
 * @returns Properly formatted CSS selector
 */
export function createSelector(key: string, parentSelector: string): string {
  // Handle at-rules
  if (key.startsWith("@")) {
    return `${key}`;
  }

  // Handle parent references
  if (key.startsWith("&")) {
    return parentSelector + key.substring(1);
  }

  // Handle pseudo-elements, pseudo-classes, and combinators
  if (
    key.startsWith(":") ||
    key.startsWith("::") ||
    key.startsWith(">") ||
    key.startsWith("+") ||
    key.startsWith("~")
  ) {
    return `${parentSelector}${key}`;
  }

  // Standard nesting
  return parentSelector ? `${parentSelector} ${key}` : key;
}

/**
 * Converts kebab-case to camelCase
 */
export function kebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

/**
 * Converts camelCase to kebab-case
 */
export function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * Combines multiple style objects into one
 */
export function mergeStyles(
  ...styles: Record<string, any>[]
): Record<string, any> {
  return styles.reduce((acc, style) => {
    Object.entries(style).forEach(([key, value]) => {
      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value) &&
        acc[key] &&
        typeof acc[key] === "object"
      ) {
        acc[key] = mergeStyles(acc[key], value);
      } else {
        acc[key] = value;
      }
    });
    return acc;
  }, {});
}
