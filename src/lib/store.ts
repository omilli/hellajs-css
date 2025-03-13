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
  {
    value: string;
    count: number;
    refCounts: Record<string, number>; // Track each reference and its usage count
    optimized: boolean; // Flag to track if this default has been optimized
  }
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

// Parse collected styles and extract variable references with default values
export function parseCollectedStyles(): void {
  const varPattern = /var\(\s*--([a-zA-Z0-9-]+)\s*,\s*([^)]+)\s*\)/g;

  // Create a new array to hold the processed styles
  const processedStyles: string[] = [];

  for (let i = 0; i < collectedStyles.length; i++) {
    const style = collectedStyles[i];

    // Find all variable references with default values
    let match;
    while ((match = varPattern.exec(style)) !== null) {
      const varName = match[1];
      const defaultValue = match[2].trim();

      // Track this variable reference
      trackDefaultValue(varName, defaultValue);
    }

    // Add the original style to processed array
    processedStyles.push(style);
  }

  // Clear and replace with processed styles
  collectedStyles.length = 0;
  collectedStyles.push(...processedStyles);
}

// Process default values and add common ones to root variables
export function processDefaultValues(): void {
  // Process collected styles first to extract any var() usage
  parseCollectedStyles();

  for (const [key, data] of Object.entries(defaultValues)) {
    // Skip already optimized values
    if (data.optimized) continue;

    // Find references used 3+ times with this default value
    for (const [refName, refCount] of Object.entries(data.refCounts)) {
      if (refCount >= 3) {
        // For frequently used values, add to root with the reference name
        themeVars.root[`--${refName}`] = data.value;
        data.optimized = true;
        break;
      }
    }
  }

  // Now process the collected styles and replace with optimized references
  optimizeCollectedStyles();
}

// Optimize collected styles by replacing repeated var() references
export function optimizeCollectedStyles(): void {
  const varPattern = /var\(\s*--([a-zA-Z0-9-]+)\s*,\s*([^)]+)\s*\)/g;

  // Create a new array to hold the optimized styles
  const optimizedStyles: string[] = [];

  for (let i = 0; i < collectedStyles.length; i++) {
    let style = collectedStyles[i];

    // Replace var references with optimized versions
    style = style.replace(varPattern, (match, varName, defaultValue) => {
      const trimmedDefault = defaultValue.trim();
      // If this var has been optimized to root, use the simplified reference
      if (themeVars.root[`--${varName}`] === trimmedDefault) {
        return `var(--${varName})`;
      }
      return match; // Keep original if not optimized
    });

    optimizedStyles.push(style);
  }

  // Replace with optimized styles
  collectedStyles.length = 0;
  collectedStyles.push(...optimizedStyles);
}

// Get optimized var reference
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
