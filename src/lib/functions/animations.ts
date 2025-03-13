/**
 * Creates CSS animation timing functions and keyframes
 */

/**
 * Creates a cubic-bezier timing function
 * @param x1 - First control point X coordinate
 * @param y1 - First control point Y coordinate
 * @param x2 - Second control point X coordinate
 * @param y2 - Second control point Y coordinate
 */
export const cubic = (x1: number, y1: number, x2: number, y2: number): string =>
  `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;

/**
 * Creates a stepping timing function
 * @param count - Number of steps
 * @param direction - Direction of steps ('start' or 'end')
 */
export const steps = (
  count: number,
  direction: "start" | "end" = "end"
): string => `steps(${count}, ${direction})`;

/**
 * Creates an ease-in timing function with customizable bezier points
 */
export const easeIn = (
  x1: number = 0.42,
  y1: number = 0,
  x2: number = 1,
  y2: number = 1
): string => `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;

/**
 * Creates an ease-out timing function with customizable bezier points
 */
export const easeOut = (
  x1: number = 0,
  y1: number = 0,
  x2: number = 0.58,
  y2: number = 1
): string => `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;

/**
 * Creates an ease-in-out timing function with customizable bezier points
 */
export const easeInOut = (
  x1: number = 0.42,
  y1: number = 0,
  x2: number = 0.58,
  y2: number = 1
): string => `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;

/**
 * Creates a linear timing function
 */
export const linear = (): string => "linear";

/**
 * Creates a spring timing function
 * @param mass - Spring mass
 * @param stiffness - Spring stiffness
 * @param damping - Damping factor
 * @param velocity - Initial velocity
 */
export const spring = (
  mass: number,
  stiffness: number,
  damping: number,
  velocity: number
): string => `spring(${mass} ${stiffness} ${damping} ${velocity})`;
