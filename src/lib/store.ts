// Store for theme variables and styles

// Store collected CSS variables by theme
export const themeVars = {
  root: {} as Record<string, string>, // Default theme (no prefix)
  light: {} as Record<string, string>, // Light mode variables
  dark: {} as Record<string, string>, // Dark mode variables
};

// Track default values used in var() declarations and their usage count
export const defaultValues: Record<
  string,
  { value: string; count: number; varName?: string }
> = {};

// Store all collected styles
export const collectedStyles: string[] = [];

// Reset stored variables and styles (useful for testing)
export function resetStore(): void {
  Object.keys(themeVars.root).forEach((key) => delete themeVars.root[key]);
  Object.keys(themeVars.light).forEach((key) => delete themeVars.light[key]);
  Object.keys(themeVars.dark).forEach((key) => delete themeVars.dark[key]);
  Object.keys(defaultValues).forEach((key) => delete defaultValues[key]);
  collectedStyles.length = 0;
}

// Add a default value to tracking
export function trackDefaultValue(varRef: string, defaultValue: string): void {
  const key = `${defaultValue}`;
  if (!defaultValues[key]) {
    defaultValues[key] = { value: defaultValue, count: 0 };
  }
  defaultValues[key].count++;

  // Associate this variable reference with the default value
  // Use component prefix from varRef when available
  if (!defaultValues[key].varName) {
    // Extract component name from the variable reference (e.g., "table" from "table-text-color")
    const componentPrefix = varRef.split("-")[0];
    defaultValues[key].varName = `--${componentPrefix}-default-${key.replace(
      /[^a-zA-Z0-9-]/g,
      "-"
    )}`;
  }
}

// Process default values and add common ones to root
export function processDefaultValues(
  countThreshold: number = 3,
  lengthThreshold: number = 15
): void {
  for (const [key, data] of Object.entries(defaultValues)) {
    // Optimize if:
    // 1. Used multiple times (exceeds count threshold) OR
    // 2. Complex value (exceeds length threshold) used at least twice
    if (
      data.count >= countThreshold ||
      (data.value.length >= lengthThreshold && data.count >= 2)
    ) {
      // Add to root variables
      themeVars.root[data.varName!] = data.value;
    }
  }
}

// Get optimized var reference
export function getVarReference(varRef: string, defaultValue: string): string {
  const key = `${defaultValue}`;
  const data = defaultValues[key];

  // Use root variable reference if this value was optimized
  // Check either count threshold or (length threshold and count >= 2)
  if (
    data &&
    (data.count >= 3 || (defaultValue.length >= 15 && data.count >= 2)) &&
    data.varName
  ) {
    // For optimized values, reference the root variable
    return `var(--${varRef}, var(${data.varName}))`;
  }

  // Otherwise use inline default
  return `var(--${varRef}, ${defaultValue})`;
}
