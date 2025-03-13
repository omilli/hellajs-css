/**
 * CSS mathematical functions for calculations and transformations.
 * These functions enable complex mathematical operations directly in CSS.
 */

// Trigonometric functions
/**
 * Calculates the sine of an angle
 * @param angle - Angle value with unit (e.g., '45deg')
 * @returns {string} CSS sin() function
 * @example
 * sin('45deg') // -> "sin(45deg)"
 */
export const sin = (angle: string): string => `sin(${angle})`;

/**
 * Calculates the cosine of an angle
 * @param angle - Angle value with unit
 * @returns {string} CSS cos() function
 */
export const cos = (angle: string): string => `cos(${angle})`;

export const tan = (angle: string): string => `tan(${angle})`;
export const asin = (value: number): string => `asin(${value})`;
export const acos = (value: number): string => `acos(${value})`;
export const atan = (value: number): string => `atan(${value})`;
export const atan2 = (y: number, x: number): string => `atan2(${y}, ${x})`;

// Power and roots
/**
 * Calculates a number raised to a power
 * @param base - Base number
 * @param exponent - Power to raise the base to
 * @returns {string} CSS pow() function
 * @example
 * pow(2, 3) // -> "pow(2, 3)"
 */
export const pow = (base: number, exponent: number): string =>
  `pow(${base}, ${exponent})`;

/**
 * Calculates the square root of a number
 * @param value - Number to calculate square root of
 * @returns {string} CSS sqrt() function
 */
export const sqrt = (value: number): string => `sqrt(${value})`;

export const hypot = (...values: number[]): string =>
  `hypot(${values.join(", ")})`;

// Exponential and logarithmic
export const log = (value: number, base?: number): string =>
  base ? `log(${value}, ${base})` : `log(${value})`;
export const exp = (value: number): string => `exp(${value})`;

// Other math functions
export const abs = (value: string): string => `abs(${value})`;
export const sign = (value: string): string => `sign(${value})`;
export const mod = (value: number, divisor: number, method?: string): string =>
  method ? `mod(${value}, ${divisor}, ${method})` : `mod(${value}, ${divisor})`;
export const round = (value: string, strategy?: string): string =>
  strategy ? `round(${value}, ${strategy})` : `round(${value})`;
export const floor = (value: string): string => `floor(${value})`;
export const ceil = (value: string): string => `ceil(${value})`;
