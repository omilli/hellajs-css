/**
 * CSS Grid and Flexbox related functions
 */

/**
 * Creates a CSS Grid repeat pattern
 * @param count - Number of repetitions or 'auto-fill'/'auto-fit'
 * @param pattern - The pattern to repeat
 * @returns CSS repeat() function string
 * @example
 * repeat(3, '1fr') // -> "repeat(3, 1fr)"
 */
export const repeat = (count: number | string, pattern: string): string =>
  `repeat(${count}, ${pattern})`;

/**
 * Enables CSS Grid masonry layout mode
 * @returns CSS masonry keyword string
 * @example
 * masonry() // -> "masonry"
 */
export const masonry = (): string => "masonry";

/**
 * Inherits grid tracks from parent grid
 * @returns CSS subgrid keyword string
 * @example
 * subgrid() // -> "subgrid"
 */
export const subgrid = (): string => "subgrid";
