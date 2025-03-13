import { themeVars } from "./store";

/**
 * Interface for CSS variable structure
 */
export interface CssVariableSet {
  variables: string[];
  css: string;
}

/**
 * Generate root CSS variables including light theme defaults
 * @returns Formatted CSS string for root variables
 */
export function generateRootCssVariables(): CssVariableSet {
  const vars: string[] = [":root {"];

  // Add regular root variables
  for (const [varName, value] of Object.entries(themeVars.root)) {
    vars.push(`  ${varName}: ${value};`);
  }

  // Add light theme variables as defaults
  for (const [varName, value] of Object.entries(themeVars.light)) {
    // Use the variable name without the theme prefix
    const normalizedVarName = varName.replace(/^--light-/, "--");
    vars.push(`  ${normalizedVarName}: ${value};`);
  }
  vars.push("}\n");

  return {
    variables: vars,
    css: vars.join("\n"),
  };
}

/**
 * Generate dark theme variables with media query
 * @returns Formatted CSS string for dark theme variables
 */
export function generateDarkThemeCssVariables(): CssVariableSet {
  const vars: string[] = ["@media (prefers-color-scheme: dark) {", "  :root {"];

  for (const [varName, value] of Object.entries(themeVars.dark)) {
    // Use the variable name without the theme prefix
    const normalizedVarName = varName.replace(/^--dark-/, "--");
    vars.push(`    ${normalizedVarName}: ${value};`);
  }

  vars.push("  }");
  vars.push("}\n");

  return {
    variables: vars,
    css: vars.join("\n"),
  };
}

/**
 * Cache for memoization of CSS generation
 */
export const cssCache = new Map<string, string>();

/**
 * Store CSS in cache with optional metadata
 */
export function setCssCache(
  key: string,
  css: string,
  metadata: string = ""
): void {
  cssCache.set(key, metadata ? `${css}<!--${metadata}-->` : css);
}

/**
 * Get CSS from cache
 */
export function getCssCache(key: string): string | undefined {
  const value = cssCache.get(key);
  return value?.split("<!--")[0]; // Remove metadata if present
}

/**
 * Generate a unique cache key for style config
 */
export function generateCacheKey(obj: object): string {
  return JSON.stringify(obj);
}

/**
 * Check if CSS needs to be regenerated
 */
export function shouldRegenerateCSS(
  cacheKey: string,
  includeStyles: boolean = true
): boolean {
  return Boolean(
    !cssCache.has(cacheKey) ||
      (includeStyles && cssCache.get(cacheKey)?.includes("NEEDS_STYLES"))
  );
}

/**
 * Clear the CSS generator cache
 */
export function clearCssCache(): void {
  cssCache.clear();
}
