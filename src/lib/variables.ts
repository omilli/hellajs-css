import {
  themeVars,
  trackDefaultValue,
  getVarReference,
  processDefaultValues,
} from "./store";

// Process CSS variables from theme objects
export function collectCssVars(
  obj: any,
  prefix: string = "",
  parentKey: string = "",
  theme: string = "",
  isTheme: boolean = false // true for createTheme, false for createVars
): void {
  for (const key in obj) {
    const value = obj[key];
    const isLightOrDark = key === "light" || key === "dark";

    // Determine which theme this property belongs to
    const currentTheme = isLightOrDark ? key : theme;

    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      if (isLightOrDark) {
        // When we encounter light/dark, process its children with that theme
        collectCssVars(value, prefix, parentKey, currentTheme, isTheme);
      } else {
        // For normal objects, maintain hierarchy and pass down any theme context
        const newParentKey = parentKey ? `${parentKey}-${key}` : key;
        collectCssVars(value, prefix, newParentKey, currentTheme, isTheme);
      }
    } else {
      // For leaf values, store with appropriate theme and key structure
      const fullKey = parentKey ? `${parentKey}-${key}` : key;
      const varName = `--${fullKey}`;

      // For createTheme: add all vars to root
      // For createVars: only add light/dark theme vars to root
      if (isTheme || currentTheme) {
        const targetTheme = currentTheme || "root";
        themeVars[targetTheme as keyof typeof themeVars][varName] = value;
      }
    }
  }
}

// Convert JS object structure to CSS variable references
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
    const newPrefix = prefix ? `${prefix}-${key}` : key;

    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      // Create nested structure in the output object (omitting light/dark)
      storage[key] = {};
      // Recursively process nested objects
      convertJsVarsToCss(value, newPrefix, storage[key]);
    } else {
      // Set variable reference, ensuring it points to the right CSS var
      // Remove any theme prefix from the variable reference
      const varReference = newPrefix.replace(/^(light|dark)-/, "");

      // Track the default value for potential optimization
      trackDefaultValue(varReference, value);

      // Store the optimized variable reference
      storage[key] = getVarReference(varReference, value);
    }
  }
}

// Base function to handle variable creation
export function createCssVars<T extends {}>(...args: [string, T] | [T]): T {
  const processedVars = {} as T;
  const themeName = typeof args[0] === "string" ? args[0] : "";
  const vars = typeof args[0] === "string" ? args[1] : args[0];

  convertJsVarsToCss(vars, themeName, processedVars);

  // Process default values to determine which ones should move to root
  processDefaultValues();

  return processedVars;
}
