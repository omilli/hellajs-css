/**
 * Helper functions for the theme system
 */

/**
 * Converts camelCase string to kebab-case (CSS style naming)
 *
 * @param str - camelCase string to convert
 * @returns Kebab-case string with hyphens
 */
export function toKebabCase(str: string): string {
  // Handle vendor prefixes (e.g. WebkitTransform -> -webkit-transform)
  if (/^[A-Z]/.test(str)) {
    const vendor = str.charAt(0).toLowerCase() + str.slice(1);
    return "-" + vendor.replace(/([A-Z])/g, "-$1").toLowerCase();
  }
  // Regular camelCase to kebab conversion
  return str.replace(/([A-Z])/g, "-$1").toLowerCase();
}

/**
 * Checks if something is a CSS prop value or nested rule
 *
 * @param value - Value to check
 * @returns True if the value is a property value, false if it's a nested rule
 */
export function isPropertyValue(value: any): boolean {
  return typeof value !== "object" || value === null || value instanceof Array;
}

/**
 * Builds a proper CSS selector
 *
 * @param key - Current selector
 * @param parentSelector - Parent selector context
 * @returns Properly formatted CSS selector
 */
export function createSelector(key: string, parentSelector: string): string {
  // Handle at-rules
  if (key.startsWith("@")) {
    return `${key}`;
  }

  // Handle parent references
  if (key.startsWith("&")) {
    return parentSelector + key.substring(1);
  }

  // Handle comma-separated selectors (from merge function)
  if (key.includes(",")) {
    return key; // Return as-is without adding parent selector
  }

  // Handle pseudo-elements, pseudo-classes, and combinators
  if (
    key.startsWith(":") ||
    key.startsWith("::") ||
    key.startsWith(">") ||
    key.startsWith("+") ||
    key.startsWith("~")
  ) {
    return `${parentSelector}${key}`;
  }

  // Standard nesting
  return parentSelector ? `${parentSelector} ${key}` : key;
}

/**
 * Combines CSS rules with identical property-value pairs
 *
 * @param css - CSS string to optimize
 * @returns Optimized CSS with combined selectors for identical rules
 */
export function combineIdenticalRules(css: string): string {
  // Store rule bodies and their associated selectors
  const ruleMap: Record<string, string[]> = {};

  // Regular expression to match CSS rules
  const rulePattern = /([^{]+)\s*{\s*([^}]+)\s*}/g;
  let match;

  // Extract all rules
  while ((match = rulePattern.exec(css)) !== null) {
    const selector = match[1].trim();
    // Skip rules with commas as they might already be combined
    if (selector.includes(",") || selector.startsWith("@")) continue;

    // Preserve original indentation and formatting in rule body
    const ruleBody = match[2].trim();

    if (!ruleMap[ruleBody]) {
      ruleMap[ruleBody] = [];
    }
    ruleMap[ruleBody].push(selector);
  }

  // Replace original rules with combined ones
  let optimizedCss = css;

  for (const [ruleBody, selectors] of Object.entries(ruleMap)) {
    // Only combine if there are multiple selectors for the same rule
    if (selectors.length > 1) {
      // Create individual rule patterns to replace
      for (const selector of selectors) {
        const pattern = new RegExp(
          `${selector.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
          )}\\s*{\\s*${ruleBody.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*}`,
          "g"
        );
        // Remove individual rules (except the first one which will be replaced with combined rule)
        if (selector !== selectors[0]) {
          optimizedCss = optimizedCss.replace(pattern, "");
        }
      }

      // Replace first instance with combined rule
      const firstSelector = selectors[0];
      const pattern = new RegExp(
        `${firstSelector.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&"
        )}\\s*{\\s*${ruleBody.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*}`,
        "g"
      );
      const combinedSelector = selectors.join(", ");
      optimizedCss = optimizedCss.replace(
        pattern,
        `${combinedSelector} {\n  ${ruleBody}\n}`
      );
    }
  }

  // Clean up excessive newlines
  optimizedCss = optimizedCss.replace(/\n{3,}/g, "\n\n");

  return optimizedCss;
}
