/**
 * A cache implemented as a Map to store key-value pairs of strings.
 * Used to store generated CSS for faster re-rendering.
 */
export const cache = new Map<string, string>();

/**
 * Sets the CSS cache with the given key and CSS content.
 * Optionally, metadata can be included as an HTML comment.
 *
 * @param key - The key to identify the cached CSS.
 * @param css - The CSS content to be cached.
 * @param [metadata=""] - Optional metadata to be included as an HTML comment.
 */
export function setCssCache(
  key: string,
  css: string,
  metadata: string = ""
): void {
  cache.set(key, metadata ? `${css}<!--${metadata}-->` : css);
}

/**
 * Gets the CSS content from the cache with the given key.
 *
 * @param key - The key to identify the cached CSS.
 */
export function getCssCache(key: string): string | undefined {
  const value = cache.get(key);
  return value?.split("<!--")[0]; // Remove metadata if present
}

/**
 * Optimizes CSS by combining identical rules and caches the result.
 *
 * @param key - The key to identify the cached CSS.
 * @param css - The CSS content to optimize and cache.
 * @param [metadata=""] - Optional metadata to be included as an HTML comment.
 * @returns The optimized CSS content.
 */
export function optimizeAndCacheCSS(
  key: string,
  css: string,
  metadata: string = ""
): string {
  // Import here to avoid circular dependency
  const { combineIdenticalRules } = require("./utils");

  // Optimize the CSS by combining identical rules
  const optimizedCss = combineIdenticalRules(css);

  // Cache the result
  setCssCache(key, optimizedCss, metadata);

  return optimizedCss;
}

/**
 * Generates a cache key from an object by stringifying it.
 *
 * @param obj - The object to generate a cache key from.
 */
export function generateCacheKey(obj: object): string {
  return JSON.stringify(obj);
}

/**
 * Clears the CSS cache.
 */
export function clearCssCache(): void {
  cache.clear();
}
