/**
 * CSS utility functions for variables, counters, and measurements
 */

/**
 * Creates a CSS custom property (variable) reference with optional fallback
 * @param name - The name of the CSS variable (without --), e.g. "color-primary"
 * @param fallback - Optional fallback value if the variable is not defined
 * @returns {string} CSS var() function
 * @example
 * var_('theme-color') // -> "var(--theme-color)"
 * var_('theme-color', '#fff') // -> "var(--theme-color, #fff)"
 */
export const var_ = (name: string, fallback?: string): string =>
  fallback ? `var(${name}, ${fallback})` : `var(${name})`;

/**
 * Creates a CSS environment variable reference with optional fallback
 * @param name - The name of the environment variable
 * @param fallback - Optional fallback value
 * @returns {string} CSS env() function
 * @example
 * env('safe-area-inset-top') // -> "env(safe-area-inset-top)"
 */
export const env = (name: string, fallback?: string): string =>
  fallback ? `env(${name}, ${fallback})` : `env(${name})`;

/**
 * Creates a CSS counter reference with optional list style
 * @param name - Counter name
 * @param style - Optional counter style (e.g., 'decimal', 'roman')
 * @returns {string} CSS counter() function
 * @example
 * counter('section') // -> "counter(section)"
 * counter('section', 'upper-roman') // -> "counter(section, upper-roman)"
 */
export const counter = (name: string, style?: string): string =>
  style ? `counter(${name}, ${style})` : `counter(${name})`;

/**
 * Creates a nested counter reference with separator and optional style
 * @param name - Counter name
 * @param string - Separator string between counter values
 * @param style - Optional counter style
 * @returns {string} CSS counters() function
 * @example
 * counters('list', '.') // -> "counters(list, ".")"
 */
export const counters = (
  name: string,
  string: string,
  style?: string
): string =>
  style
    ? `counters(${name}, "${string}", ${style})`
    : `counters(${name}, "${string}")`;

/**
 * Creates a list of counter symbols
 * @param type - Symbol type ('cyclic', 'numeric', 'alphabetic', 'symbolic', 'fixed')
 * @param symbols - List of symbols to use
 * @returns {string} CSS symbols() function
 * @example
 * symbols('cyclic', '❤', '♦', '♠', '♣') // -> "symbols(cyclic ❤ ♦ ♠ ♣)"
 */
export const symbols = (type: string, ...symbols: string[]): string =>
  `symbols(${type} ${symbols.join(" ")})`;

/**
 * References list item markers for styling
 * @returns {string} CSS markers keyword
 */
export const markers = (): string => `markers`;

/**
 * Creates an attribute reference
 * @param attributeName - Name of the HTML attribute to reference
 * @returns {string} CSS attr() function
 * @example
 * attr('data-label') // -> "attr(data-label)"
 */
export const attr = (attributeName: string): string => `attr(${attributeName})`;

/**
 * References a running element state
 * @param elementName - Name of the element
 * @returns {string} CSS running() function
 */
export const running = (elementName: string): string =>
  `running(${elementName})`;

/**
 * Creates a toggle between multiple values
 * @param values - List of values to toggle between
 * @returns {string} CSS toggle() function
 * @example
 * toggle('normal', 'bold') // -> "toggle(normal, bold)"
 */
export const toggle = (...values: string[]): string =>
  `toggle(${values.join(", ")})`;

/**
 * Container query width unit
 * @param value - Numeric value
 * @returns {string} CSS container query width unit
 * @example
 * cqw('80') // -> "80cqw"
 */
export const cqw = (value: string): string => `${value}cqw`;

/**
 * Container query height unit
 * @param value - Numeric value
 * @returns {string} CSS container query height unit
 * @example
 * cqh('80') // -> "80cqh"
 */
export const cqh = (value: string): string => `${value}cqh`;

/**
 * Container query inline size unit
 * @param value - Numeric value
 * @returns {string} CSS container query inline size unit
 * @example
 * cqi('80') // -> "80cqi"
 */
export const cqi = (value: string): string => `${value}cqi`;

/**
 * Container query block size unit
 * @param value - Numeric value
 * @returns {string} CSS container query block size unit
 * @example
 * cqb('80') // -> "80cqb"
 */
export const cqb = (value: string): string => `${value}cqb`;

/**
 * Container query minimum size unit
 * @param value - Numeric value
 * @returns {string} CSS container query minimum size unit
 * @example
 * cqmin('80') // -> "80cqmin"
 */
export const cqmin = (value: string): string => `${value}cqmin`;

/**
 * Container query maximum size unit
 * @param value - Numeric value
 * @returns {string} CSS container query maximum size unit
 * @example
 * cqmax('80') // -> "80cqmax"
 */
export const cqmax = (value: string): string => `${value}cqmax`;
