/**
 * Creates a CSS calc expression for calculations
 * @param expression - Mathematical expression to compute
 * @returns CSS calc() function string
 * @example
 * calc('100% - 50px') // -> "calc(100% - 50px)"
 */
export const calc = (expression: string): string => `calc(${expression})`;

/**
 * Returns the smallest value from a list of values
 * @param values - List of values to compare
 * @returns CSS min() function string
 * @example
 * min('10px', '20px', '30px') // -> "min(10px, 20px, 30px)"
 */
export const min = (...values: string[]): string => `min(${values.join(", ")})`;

/**
 * Returns the largest value from a list of values
 * @param values - List of values to compare
 * @returns CSS max() function string
 * @example
 * max('10px', '20px', '30px') // -> "max(10px, 20px, 30px)"
 */
export const max = (...values: string[]): string => `max(${values.join(", ")})`;

/**
 * Constrains a value between a minimum and maximum value
 * @param min - Minimum value
 * @param preferred - Preferred value
 * @param max - Maximum value
 * @returns CSS clamp() function string
 * @example
 * clamp('10px', '20px', '30px') // -> "clamp(10px, 20px, 30px)"
 */
export const clamp = (min: string, preferred: string, max: string): string =>
  `clamp(${min}, ${preferred}, ${max})`;

/**
 * Creates a range between minimum and maximum values for grid layouts
 * @param min - Minimum size
 * @param max - Maximum size
 * @returns CSS minmax() function string
 * @example
 * minmax('100px', '1fr') // -> "minmax(100px, 1fr)"
 */
export const minmax = (min: string, max: string): string =>
  `minmax(${min}, ${max})`;

/**
 * Restricts a box to a given dimension while ensuring it can grow/shrink to fit content
 * @param dimension - The preferred dimension value
 * @returns CSS fit-content() function string
 * @example
 * fitContent('200px') // -> "fit-content(200px)"
 */
export const fitContent = (dimension: string): string =>
  `fit-content(${dimension})`;

/**
 * Sets size to the maximum content width/height
 * @returns CSS max-content keyword string
 * @example
 * maxContent() // -> "max-content"
 */
export const maxContent = (): string => "max-content";

/**
 * Sets size to the minimum content width/height
 * @returns CSS min-content keyword string
 * @example
 * minContent() // -> "min-content"
 */
export const minContent = (): string => "min-content";

/**
 * Converts pixels to rem units
 * @param value - The pixel value to convert
 * @param divisor - Optional divisor
 * @returns CSS rem value string
 * @example
 * rem(1) // -> "1rem"
 * rem(1, 2) // -> "0.5rem"
 */
export const rem = (value: number, divisor?: number): string =>
  divisor ? `rem(${value}, ${divisor})` : `${value}rem`;

/**
 * Creates pixel unit values
 * @param values - Numeric values to convert to pixels
 * @returns Space-separated pixel values string
 * @example
 * px(10, 20, 30) // -> "10px 20px 30px"
 */
export const px = (...values: number[]): string =>
  values.map((value) => `${value}px`).join(" ");

/**
 * Creates em unit values
 * @param values - Numeric values to convert to ems
 * @returns Space-separated em values string
 * @example
 * em(1, 1.5, 2) // -> "1em 1.5em 2em"
 */
export const em = (...values: number[]): string =>
  values.map((value) => `${value}em`).join(" ");

/**
 * Creates percentage unit values
 * @param values - Numeric values to convert to percentages
 * @returns Space-separated percentage values string
 * @example
 * perc(50, 75, 100) // -> "50% 75% 100%"
 */
export const perc = (...values: number[]): string =>
  values.map((value) => `${value}%`).join(" ");

/**
 * Creates viewport height unit values
 * @param values - Numeric values to convert to vh
 * @returns Space-separated vh values string
 * @example
 * vh(50, 75, 100) // -> "50vh 75vh 100vh"
 */
export const vh = (...values: number[]): string =>
  values.map((value) => `${value}vh`).join(" ");

/**
 * Creates viewport width unit values
 * @param values - Numeric values to convert to vw
 * @returns Space-separated vw values string
 * @example
 * vw(50, 75, 100) // -> "50vw 75vw 100vw"
 */
export const vw = (...values: number[]): string =>
  values.map((value) => `${value}vw`).join(" ");
