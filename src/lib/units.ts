/**
 * CSS unit helper functions for type-safe CSS value generation
 */

type CSSUnit = string | number;

/**
 * Formats a value or multiple values with px units
 * @example px(10) => "10px"
 * @example px(10, 20) => "10px 20px"
 */
export function px(...values: CSSUnit[]): string {
  return values.map((value) => `${value}px`).join(" ");
}

/**
 * Formats a value or multiple values with rem units
 * @example rem(1.5) => "1.5rem"
 * @example rem(1, 2.5) => "1rem 2.5rem"
 */
export function rem(...values: CSSUnit[]): string {
  return values.map((value) => `${value}rem`).join(" ");
}

/**
 * Formats a value or multiple values with em units
 * @example em(1.2) => "1.2em"
 * @example em(0.8, 1) => "0.8em 1em"
 */
export function em(...values: CSSUnit[]): string {
  return values.map((value) => `${value}em`).join(" ");
}

/**
 * Formats a value or multiple values with percentage
 * @example perc(100) => "100%"
 * @example perc(50, 75) => "50% 75%"
 */
export function perc(...values: CSSUnit[]): string {
  return values.map((value) => `${value}%`).join(" ");
}

/**
 * Formats a value or multiple values with vh units
 * @example vh(100) => "100vh"
 * @example vh(50, 75) => "50vh 75vh"
 */
export function vh(...values: CSSUnit[]): string {
  return values.map((value) => `${value}vh`).join(" ");
}

/**
 * Formats a value or multiple values with vw units
 * @example vw(100) => "100vw"
 * @example vw(50, 75) => "50vw 75vw"
 */
export function vw(...values: CSSUnit[]): string {
  return values.map((value) => `${value}vw`).join(" ");
}

/**
 * Create a CSS calc() expression
 * @example calc("100% - 20px") => "calc(100% - 20px)"
 */
export function calc(expression: string): string {
  return `calc(${expression})`;
}

/**
 * Create a CSS clamp() expression
 * @example clamp("1rem", "5vw", "2rem") => "clamp(1rem, 5vw, 2rem)"
 */
export function clamp(min: string, preferred: string, max: string): string {
  return `clamp(${min}, ${preferred}, ${max})`;
}
