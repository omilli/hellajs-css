/**
 * Helper functions for the theme system
 */

/**
 * Converts camelCase string to kebab-case (CSS style naming)
 *
 * @param str - camelCase string to convert
 * @returns Kebab-case string with hyphens
 */
export function toKebabCase(str: string): string {
  // Handle vendor prefixes (e.g. WebkitTransform -> -webkit-transform)
  if (/^[A-Z]/.test(str)) {
    const vendor = str.charAt(0).toLowerCase() + str.slice(1);
    return "-" + vendor.replace(/([A-Z])/g, "-$1").toLowerCase();
  }
  // Regular camelCase to kebab conversion
  return str.replace(/([A-Z])/g, "-$1").toLowerCase();
}

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

  // Handle comma-separated selectors (from merge function)
  if (key.includes(",")) {
    return key; // Return as-is without adding parent selector
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
