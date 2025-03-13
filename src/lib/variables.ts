import {
  themeVars,
  trackDefaultValue,
  getVarReference,
  processDefaultValues,
} from "./store";
import { ThemeMode } from "./types";
import { toKebabCase } from "./utils";

/**
 * Goes through the theme object and builds CSS vars
 *
 * @param obj - Source object with variable definitions
 * @param prefix - Optional prefix for variable names
 * @param parentKey - Key path for nested properties
 * @param theme - Current theme context ("light", "dark", or "")
 * @param isTheme - Whether this is a theme definition (vs component vars)
 */
export function collectCssVars(
  obj: any,
  prefix: string = "",
  parentKey: string = "",
  theme: string = "",
  isTheme: boolean = false
): void {
  for (const key in obj) {
    const value = obj[key];
    const isThemeVariant = key === "light" || key === "dark";

    // Determine which theme this property belongs to
    const currentTheme = isThemeVariant ? key : theme;

    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      if (isThemeVariant) {
        // Process light/dark variants with that theme context
        collectCssVars(value, prefix, parentKey, currentTheme, isTheme);
      } else {
        // For normal objects, maintain hierarchy and pass down any theme context
        // Convert key to kebab-case for CSS variables
        const kebabKey = toKebabCase(key);
        const newParentKey = parentKey ? `${parentKey}-${kebabKey}` : kebabKey;
        collectCssVars(value, prefix, newParentKey, currentTheme, isTheme);
      }
    } else {
      // For leaf values, store with appropriate theme and key structure
      // Convert key to kebab-case for CSS variables
      const kebabKey = toKebabCase(key);
      const fullKey = parentKey ? `${parentKey}-${kebabKey}` : kebabKey;
      const varName = `--${prefix ? `${prefix}-${fullKey}` : fullKey}`;

      // For createTheme: add all vars to their respective theme
      // For createVars: only add light/dark theme vars to those themes
      if (isTheme || currentTheme) {
        const targetTheme = currentTheme || "root";
        themeVars[targetTheme as ThemeMode][varName] = value;
      }
    }
  }
}

/**
 * Takes JS vars and turns them into CSS var references
 *
 * @param obj - Source object with variable definitions
 * @param prefix - Prefix for variable names
 * @param storage - Target object to store CSS variable references
 */
export function convertJsVarsToCss(
  obj: any,
  prefix: string,
  storage: Record<string, any>
): void {
  for (const key in obj) {
    // Skip light/dark keys in resulting structure
    if (key === "light" || key === "dark") {
      // Process children of light/dark directly at parent level
      convertJsVarsToCss(obj[key], prefix, storage);
      continue;
    }

    const value = obj[key];
    const kebabKey = toKebabCase(key);
    const newPrefix = prefix ? `${prefix}-${kebabKey}` : kebabKey;

    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      // Create nested structure in the output object (omitting light/dark)
      storage[key] = {};
      // Recursively process nested objects
      convertJsVarsToCss(value, newPrefix, storage[key]);
    } else {
      // Set variable reference, ensuring it points to the right CSS var
      // Remove any theme prefix from the variable reference and ensure kebab case
      let varReference = newPrefix.replace(/^(light|dark)-/, "");

      // Track the default value for potential optimization
      trackDefaultValue(varReference, value);

      // Store the optimized variable reference
      storage[key] = getVarReference(varReference, value);
    }
  }
}

/**
 * Takes an object and returns CSS vars
 *
 * @param args - Variable configuration with optional prefix
 * @returns Processed variables object with CSS references
 */
export function createCssVars<T extends {}>(...args: [string, T] | [T]): T {
  const processedVars = {} as T;
  const prefix = typeof args[0] === "string" ? args[0] : "";
  const vars = typeof args[0] === "string" ? args[1] : args[0];

  // Convert JS object to CSS variable references
  convertJsVarsToCss(vars, prefix, processedVars);

  // Process default values to determine which ones should move to root
  processDefaultValues();

  return processedVars;
}
