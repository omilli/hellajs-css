/**
 * CSS shape functions for clip-path and shape-outside
 */

/**
 * Creates a circle shape
 * @param radius - Optional circle radius
 * @returns CSS circle() function string
 * @example
 * circle('50%') // -> "circle(50%)"
 */
export const circle = (radius?: string): string =>
  radius ? `circle(${radius})` : "circle()";

/**
 * Creates an ellipse shape
 * @param xRadius - Optional horizontal radius
 * @param yRadius - Optional vertical radius
 * @returns CSS ellipse() function string
 * @example
 * ellipse('50%', '25%') // -> "ellipse(50% 25%)"
 */
export const ellipse = (xRadius?: string, yRadius?: string): string =>
  xRadius && yRadius ? `ellipse(${xRadius} ${yRadius})` : "ellipse()";

/**
 * Creates an inset shape
 * @param top - Top offset
 * @param right - Right offset
 * @param bottom - Bottom offset
 * @param left - Left offset
 * @param round - Optional border radius
 * @returns CSS inset() function string
 * @example
 * inset('10px', '20px', '30px', '40px') // -> "inset(10px 20px 30px 40px)"
 */
export const inset = (
  top: string,
  right: string,
  bottom: string,
  left: string,
  round?: string
): string =>
  round
    ? `inset(${top} ${right} ${bottom} ${left} round ${round})`
    : `inset(${top} ${right} ${bottom} ${left})`;

/**
 * Creates a polygon shape
 * @param fillRule - Optional fill rule
 * @param points - Polygon points
 * @returns CSS polygon() function string
 * @example
 * polygon('nonzero', '50% 0%', '100% 50%', '50% 100%', '0% 50%') // -> "polygon(nonzero, 50% 0%, 100% 50%, 50% 100%, 0% 50%)"
 */
export const polygon = (fillRule?: string, ...points: string[]): string =>
  fillRule && (fillRule === "nonzero" || fillRule === "evenodd")
    ? `polygon(${fillRule}, ${points.join(", ")})`
    : `polygon(${points.join(", ")})`;

/**
 * Creates a path shape
 * @param svgPath - SVG path data
 * @returns CSS path() function string
 * @example
 * path('M 10 10 H 90 V 90 H 10 Z') // -> "path('M 10 10 H 90 V 90 H 10 Z')"
 */
export const path = (svgPath: string): string => `path('${svgPath}')`;
