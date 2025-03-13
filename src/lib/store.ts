import { DefaultValueEntry, ThemeMode } from "./types";

/** Theme variable storage by theme mode */
export const themeVars: Record<ThemeMode, Record<string, string>> = {
  root: {} /** Base theme variables */,
  light: {} /** Light theme overrides */,
  dark: {} /** Dark theme overrides */,
};

/** Default value tracking storage */
export const defaultValues: Record<string, DefaultValueEntry> = {};

/** Collected CSS style storage */
export const collectedStyles: string[] = [];

/**
 * Resets all stored variables and styles
 */
export function resetStore(): void {
  Object.keys(themeVars.root).forEach((key) => delete themeVars.root[key]);
  Object.keys(themeVars.light).forEach((key) => delete themeVars.light[key]);
  Object.keys(themeVars.dark).forEach((key) => delete themeVars.dark[key]);
  Object.keys(defaultValues).forEach((key) => delete defaultValues[key]);
  collectedStyles.length = 0;
}

// Keep tabs on default values so we can optimize them later
export function trackDefaultValue(varRef: string, defaultValue: string): void {
  const key = `${defaultValue}`;

  if (!defaultValues[key]) {
    defaultValues[key] = {
      value: defaultValue,
      count: 0,
      refCounts: {},
      optimized: false,
    };
  }

  // Track this specific reference
  if (!defaultValues[key].refCounts[varRef]) {
    defaultValues[key].refCounts[varRef] = 0;
  }
  defaultValues[key].refCounts[varRef]++;
  defaultValues[key].count++;
}

/**
 * Extract variable references with default values from collected styles
 */
export function extractVariableReferences(): void {
  const varPattern = /var\(\s*--([a-zA-Z0-9-]+)\s*,\s*([^)]+)\s*\)/g;
  const processedStyles: string[] = [];

  for (let i = 0; i < collectedStyles.length; i++) {
    const style = collectedStyles[i];
    let match;

    while ((match = varPattern.exec(style)) !== null) {
      const varName = match[1];
      const defaultValue = match[2].trim();
      trackDefaultValue(varName, defaultValue);
    }

    processedStyles.push(style);
  }

  // Replace with processed styles
  collectedStyles.length = 0;
  collectedStyles.push(...processedStyles);
}

/**
 * Process default values and add common ones to root variables
 */
export function processDefaultValues(): void {
  // Extract variable references first
  extractVariableReferences();

  // Find frequently used defaults and optimize them
  for (const [key, data] of Object.entries(defaultValues)) {
    if (data.optimized) continue;

    for (const [refName, refCount] of Object.entries(data.refCounts)) {
      if (refCount >= 3) {
        // For frequently used values, add to root with the reference name
        themeVars.root[`--${refName}`] = data.value;
        data.optimized = true;
        break;
      }
    }
  }

  // Update styles with optimized references
  optimizeStyles();
}

/**
 * Optimize collected styles by replacing repeated var() references
 */
export function optimizeStyles(): void {
  const varPattern = /var\(\s*--([a-zA-Z0-9-]+)\s*,\s*([^)]+)\s*\)/g;
  const optimizedStyles: string[] = [];

  for (const style of collectedStyles) {
    let optimizedStyle = style.replace(
      varPattern,
      (match, varName, defaultValue) => {
        const trimmedDefault = defaultValue.trim();

        // If this var has been optimized to root, use the simplified reference
        if (themeVars.root[`--${varName}`] === trimmedDefault) {
          return `var(--${varName})`;
        }

        return match; // Keep original if not optimized
      }
    );

    optimizedStyles.push(optimizedStyle);
  }

  // Replace with optimized styles
  collectedStyles.length = 0;
  collectedStyles.push(...optimizedStyles);
}

/**
 * Get optimized variable reference
 */
export function getVarReference(varRef: string, defaultValue: string): string {
  const key = `${defaultValue}`;
  const data = defaultValues[key];

  // If the variable exists in root, use direct reference
  if (themeVars.root[`--${varRef}`] !== undefined) {
    return `var(--${varRef})`;
  }

  // Check if this reference is used enough times to justify optimization
  if (data && data.refCounts[varRef] >= 3) {
    // Add to root and mark as optimized
    themeVars.root[`--${varRef}`] = defaultValue;
    data.optimized = true;
    return `var(--${varRef})`;
  }

  // Otherwise use inline default
  return `var(--${varRef}, ${defaultValue})`;
}
