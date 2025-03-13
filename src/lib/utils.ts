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
