import { cache } from "./cache";
import { themeVars } from "./store";
import { CSSVariableSet } from "./types";

/**
 * Generates a set of CSS variables for the root element, including both regular root variables
 * and light theme variables as defaults.
 *
 * @returns An object containing the generated CSS variables as an array of strings
 * and the concatenated CSS string.
 */
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

/**
 * Generates a set of CSS variables for the dark theme.
 *
 * @returns An object containing the generated CSS variables as an array of strings
 * and the concatenated CSS string.
 */
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

/**
 * Determines whether the CSS for a given cache key should be regenerated.
 *
 * @param cacheKey - The cache key to check.
 * @param includeStyles - Whether to consider styles in the check.
 * @returns Whether the CSS should be regenerated.
 */
export function shouldRegenerateCSS(
  cacheKey: string,
  includeStyles: boolean = true
): boolean {
  return Boolean(
    !cache.has(cacheKey) ||
      (includeStyles && cache.get(cacheKey)?.includes("NEEDS_STYLES"))
  );
}
