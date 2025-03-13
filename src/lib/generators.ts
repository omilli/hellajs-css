import { themeVars } from "./store";
import { CSSVariableSet } from "./types";

// Spits out the root CSS vars, including light theme defaults
export function generateRootCssVariables(): CSSVariableSet {
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

// Handles dark theme vars wrapped in a media query
export function generateDarkThemeCssVariables(): CSSVariableSet {
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

// Cache to avoid regenerating CSS we've already built
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
