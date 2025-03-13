/**
 * Creates a 2D translation transform
 * @param x - X-axis translation value
 * @param y - Optional Y-axis translation value
 * @returns CSS translate() function string
 * @example
 * translate('10px', '20px') // -> "translate(10px, 20px)"
 */
export const translate = (x: string, y?: string): string =>
  y !== undefined ? `translate(${x}, ${y})` : `translate(${x})`;

/**
 * Creates an X-axis translation transform
 * @param x - X-axis translation value
 * @returns CSS translateX() function string
 * @example
 * translateX('10px') // -> "translateX(10px)"
 */
export const translateX = (x: string): string => `translateX(${x})`;

/**
 * Creates a Y-axis translation transform
 * @param y - Y-axis translation value
 * @returns CSS translateY() function string
 * @example
 * translateY('20px') // -> "translateY(20px)"
 */
export const translateY = (y: string): string => `translateY(${y})`;

/**
 * Creates a Z-axis translation transform
 * @param z - Z-axis translation value
 * @returns CSS translateZ() function string
 * @example
 * translateZ('30px') // -> "translateZ(30px)"
 */
export const translateZ = (z: string): string => `translateZ(${z})`;

/**
 * Creates a 3D translation transform
 * @param x - X-axis translation value
 * @param y - Y-axis translation value
 * @param z - Z-axis translation value
 * @returns CSS translate3d() function string
 * @example
 * translate3d('10px', '20px', '30px') // -> "translate3d(10px, 20px, 30px)"
 */
export const translate3d = (x: string, y: string, z: string): string =>
  `translate3d(${x}, ${y}, ${z})`;

/**
 * Creates a 2D rotation transform
 * @param angle - Rotation angle with unit (e.g., '45deg')
 * @returns CSS rotate() function string
 * @example
 * rotate('45deg') // -> "rotate(45deg)"
 */
export const rotate = (angle: string): string => `rotate(${angle})`;

/**
 * Creates an X-axis rotation transform
 * @param angle - Rotation angle with unit
 * @returns CSS rotateX() function string
 * @example
 * rotateX('45deg') // -> "rotateX(45deg)"
 */
export const rotateX = (angle: string): string => `rotateX(${angle})`;

/**
 * Creates a Y-axis rotation transform
 * @param angle - Rotation angle with unit
 * @returns CSS rotateY() function string
 * @example
 * rotateY('45deg') // -> "rotateY(45deg)"
 */
export const rotateY = (angle: string): string => `rotateY(${angle})`;

/**
 * Creates a Z-axis rotation transform
 * @param angle - Rotation angle with unit
 * @returns CSS rotateZ() function string
 * @example
 * rotateZ('45deg') // -> "rotateZ(45deg)"
 */
export const rotateZ = (angle: string): string => `rotateZ(${angle})`;

/**
 * Creates a 3D rotation transform
 * @param x - X-axis vector component
 * @param y - Y-axis vector component
 * @param z - Z-axis vector component
 * @param angle - Rotation angle with unit
 * @returns CSS rotate3d() function string
 * @example
 * rotate3d(1, 0, 0, '45deg') // -> "rotate3d(1, 0, 0, 45deg)"
 */
export const rotate3d = (
  x: number,
  y: number,
  z: number,
  angle: string
): string => `rotate3d(${x}, ${y}, ${z}, ${angle})`;

/**
 * Creates a 2D scaling transform
 * @param x - X-axis scaling factor
 * @param y - Optional Y-axis scaling factor
 * @returns CSS scale() function string
 * @example
 * scale(1.5, 2) // -> "scale(1.5, 2)"
 */
export const scale = (x: number, y?: number): string =>
  y !== undefined ? `scale(${x}, ${y})` : `scale(${x})`;

/**
 * Creates an X-axis scaling transform
 * @param x - X-axis scaling factor
 * @returns CSS scaleX() function string
 * @example
 * scaleX(1.5) // -> "scaleX(1.5)"
 */
export const scaleX = (x: number): string => `scaleX(${x})`;

/**
 * Creates a Y-axis scaling transform
 * @param y - Y-axis scaling factor
 * @returns CSS scaleY() function string
 * @example
 * scaleY(2) // -> "scaleY(2)"
 */
export const scaleY = (y: number): string => `scaleY(${y})`;

/**
 * Creates a Z-axis scaling transform
 * @param z - Z-axis scaling factor
 * @returns CSS scaleZ() function string
 * @example
 * scaleZ(1.5) // -> "scaleZ(1.5)"
 */
export const scaleZ = (z: number): string => `scaleZ(${z})`;

/**
 * Creates a 3D scaling transform
 * @param x - X-axis scaling factor
 * @param y - Y-axis scaling factor
 * @param z - Z-axis scaling factor
 * @returns CSS scale3d() function string
 * @example
 * scale3d(1.5, 2, 1) // -> "scale3d(1.5, 2, 1)"
 */
export const scale3d = (x: number, y: number, z: number): string =>
  `scale3d(${x}, ${y}, ${z})`;

/**
 * Creates a 2D skew transform
 * @param x - X-axis skew angle
 * @param y - Optional Y-axis skew angle
 * @returns CSS skew() function string
 * @example
 * skew('10deg', '20deg') // -> "skew(10deg, 20deg)"
 */
export const skew = (x: string, y?: string): string =>
  y !== undefined ? `skew(${x}, ${y})` : `skew(${x})`;

/**
 * Creates an X-axis skew transform
 * @param angle - Skew angle with unit
 * @returns CSS skewX() function string
 * @example
 * skewX('10deg') // -> "skewX(10deg)"
 */
export const skewX = (angle: string): string => `skewX(${angle})`;

/**
 * Creates a Y-axis skew transform
 * @param angle - Skew angle with unit
 * @returns CSS skewY() function string
 * @example
 * skewY('10deg') // -> "skewY(10deg)"
 */
export const skewY = (angle: string): string => `skewY(${angle})`;

/**
 * Creates a 2D transformation matrix
 * @param a - Scale X
 * @param b - Skew Y
 * @param c - Skew X
 * @param d - Scale Y
 * @param tx - Translate X
 * @param ty - Translate Y
 * @returns CSS matrix() function string
 * @example
 * matrix(1, 0, 0, 1, 10, 20) // -> "matrix(1, 0, 0, 1, 10, 20)"
 */
export const matrix = (
  a: number,
  b: number,
  c: number,
  d: number,
  tx: number,
  ty: number
): string => `matrix(${a}, ${b}, ${c}, ${d}, ${tx}, ${ty})`;

/**
 * Creates a 3D transformation matrix
 * @param values - The 16 values of the 4x4 matrix
 * @returns CSS matrix3d() function string
 * @example
 * matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 10, 20, 30, 1) // -> "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 10, 20, 30, 1)"
 */
export const matrix3d = (...values: number[]): string =>
  `matrix3d(${values.join(", ")})`;

/**
 * Creates a perspective transformation
 * @param length - The distance to the z=0 plane
 * @returns CSS perspective() function string
 * @example
 * perspective('500px') // -> "perspective(500px)"
 */
export const perspective = (length: string): string => `perspective(${length})`;
