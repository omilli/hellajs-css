import { StyleConfig } from "./types";
import { themeVars, collectedStyles } from "./store";
import { createSelector, isPropertyValue } from "./utils";

// Generate CSS from collected variables with theme support
export function generateCss(includeStyles = true): string {
  const cssChunks: string[] = [];

  // Generate root variables
  cssChunks.push(generateRootVariables());

  // Generate dark theme with media query
  if (Object.keys(themeVars.dark).length > 0) {
    cssChunks.push(generateDarkThemeVariables());
  }

  // Include collected styles if requested
  if (includeStyles && collectedStyles.length > 0) {
    cssChunks.push(collectedStyles.join("\n\n"));
  }

  return cssChunks.join("\n") + "\n";
}

// Export a function that returns only the styles (no variables)
export function generateStyles(): string {
  return collectedStyles.join("\n\n");
}

// Generate root variables including light theme defaults
function generateRootVariables(): string {
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

  return vars.join("\n");
}

// Generate dark theme variables with media query
function generateDarkThemeVariables(): string {
  const vars: string[] = ["@media (prefers-color-scheme: dark) {", "  :root {"];

  for (const [varName, value] of Object.entries(themeVars.dark)) {
    // Use the variable name without the theme prefix
    const normalizedVarName = varName.replace(/^--dark-/, "--");
    vars.push(`    ${normalizedVarName}: ${value};`);
  }

  vars.push("  }");
  vars.push("}\n");

  return vars.join("\n");
}

// Convert a style config object to CSS string
export function styleConfigToCss(
  config: StyleConfig,
  parentSelector = ""
): string {
  const properties: string[] = [];
  const nestedRules: string[] = [];

  // Process each key in the config
  for (const key in config) {
    const value = config[key as keyof StyleConfig];

    if (typeof value === "object" && !isPropertyValue(value)) {
      // This is a nested selector or at-rule
      const selector = createSelector(key as string, parentSelector);
      const nestedCss = styleConfigToCss(value as StyleConfig, selector);
      nestedRules.push(nestedCss);
    } else {
      // This is a CSS property
      properties.push(`  ${key}: ${value};`);
    }
  }

  // Build the CSS string
  let css = "";
  if (properties.length > 0) {
    css += `${parentSelector} {\n${properties.join("\n")}\n}`;
  }

  if (nestedRules.length > 0) {
    if (properties.length > 0) css += "\n\n";
    css += nestedRules.join("\n\n");
  }

  return css;
}
