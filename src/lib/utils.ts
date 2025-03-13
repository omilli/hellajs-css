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

/**
 * Checks if an object is marked for direct nesting (should skip property key)
 *
 * @param obj - Object to check
 * @returns True if the object is marked for direct nesting
 */
export function isDirectNesting(obj: any): boolean {
  return (
    obj &&
    Object.getOwnPropertyDescriptor(obj, "__DIRECT_NEST__")?.value === true
  );
}

/**
 * Gets nested selectors from an object created by nest()
 *
 * @param obj - Object to check
 * @returns Array of selectors or null if not a nested selector
 */
export function getNestedSelectors(obj: any): string[] | null {
  if (!obj) return null;
  const selectors = Object.getOwnPropertyDescriptor(
    obj,
    "__NESTED_SELECTORS__"
  )?.value;
  return Array.isArray(selectors) ? selectors : null;
}

/**
 * Gets styles from a nested selector object
 *
 * @param obj - Object to extract styles from
 * @returns The styles object or null if not found
 */
export function getNestedStyles(obj: any): any {
  return obj?.__styles || null;
}
