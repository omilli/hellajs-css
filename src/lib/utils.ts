// Helper utilities for theme system

// Helper to determine if a value is a CSS property value or a nested rule
export function isPropertyValue(value: any): boolean {
  return typeof value !== "object" || value === null || value instanceof Array;
}

// Helper to create a proper CSS selector based on parent and current selector
export function createSelector(key: string, parentSelector: string): string {
  // Handle special cases
  if (key.startsWith("@")) {
    // This is an at-rule
    return `${key}`;
  }

  if (key.startsWith("&")) {
    // This is a parent reference
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
