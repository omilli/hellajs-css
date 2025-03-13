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
