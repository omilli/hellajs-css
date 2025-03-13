/**
 * Creates a blur filter effect
 * @param radius - The radius of the blur (e.g., '5px')
 * @returns CSS blur() function string
 */
export const blur = (radius: string): string => `blur(${radius})`;

/**
 * Creates a brightness filter effect
 * @param amount - Brightness factor (0 = black, 1 = normal, >1 = brighter)
 * @returns CSS brightness() function string
 */
export const brightness = (amount: number): string => `brightness(${amount})`;

/**
 * Creates a contrast filter effect
 * @param amount - Contrast factor (0 = gray, 1 = normal, >1 = higher contrast)
 * @returns CSS contrast() function string
 */
export const contrast = (amount: number): string => `contrast(${amount})`;

/**
 * Creates a grayscale filter effect
 * @param amount - Amount of conversion (0 = normal, 1 = fully grayscale)
 * @returns CSS grayscale() function string
 */
export const grayscale = (amount: number): string => `grayscale(${amount})`;

/**
 * Creates a sepia filter effect
 * @param amount - Amount of conversion (0 = normal, 1 = fully sepia)
 * @returns CSS sepia() function string
 */
export const sepia = (amount: number): string => `sepia(${amount})`;

/**
 * Creates a hue rotation filter effect
 * @param angle - Color wheel rotation angle (e.g., '90deg')
 * @returns CSS hue-rotate() function string
 */
export const hueRotate = (angle: string): string => `hue-rotate(${angle})`;

/**
 * Creates an inversion filter effect
 * @param amount - Amount of inversion (0 = normal, 1 = fully inverted)
 * @returns CSS invert() function string
 */
export const invert = (amount: number): string => `invert(${amount})`;

/**
 * Creates a saturation filter effect
 * @param amount - Saturation factor (0 = unsaturated, 1 = normal, >1 = more saturated)
 * @returns CSS saturate() function string
 */
export const saturate = (amount: number): string => `saturate(${amount})`;

/**
 * Creates a drop shadow filter effect
 * @param x - Horizontal offset
 * @param y - Vertical offset
 * @param blur - Optional blur radius
 * @param color - Optional shadow color
 * @returns CSS drop-shadow() function string
 */
export const dropShadow = (
  x: string,
  y: string,
  blur?: string,
  color?: string
): string =>
  color
    ? `drop-shadow(${x} ${y} ${blur} ${color})`
    : blur
    ? `drop-shadow(${x} ${y} ${blur})`
    : `drop-shadow(${x} ${y})`;

/**
 * Creates a backdrop filter effect
 * @param filters - The filter effects to apply to the area behind an element
 * @returns CSS backdrop-filter() function string
 */
export const backdropFilter = (filters: string): string =>
  `backdrop-filter(${filters})`;

/**
 * Creates a linear gradient background
 * @param direction - Gradient direction (e.g., 'to bottom')
 * @param colorStops - Color stops for the gradient
 * @returns CSS linear-gradient() function string
 */
export const linearGradient = (
  direction: string,
  ...colorStops: string[]
): string => `linear-gradient(${direction}, ${colorStops.join(", ")})`;

/**
 * Creates a radial gradient background
 * @param shape - Gradient shape (e.g., 'circle at center')
 * @param colorStops - Color stops for the gradient
 * @returns CSS radial-gradient() function string
 */
export const radialGradient = (
  shape: string,
  ...colorStops: string[]
): string => `radial-gradient(${shape}, ${colorStops.join(", ")})`;

/**
 * Creates a conic gradient background
 * @param position - Starting position and angle (e.g., 'from 0deg at center')
 * @param colorStops - Color stops for the gradient
 * @returns CSS conic-gradient() function string
 */
export const conicGradient = (
  position: string,
  ...colorStops: string[]
): string => `conic-gradient(from ${position}, ${colorStops.join(", ")})`;

/**
 * Creates a repeating linear gradient background
 * @param direction - Gradient direction
 * @param colorStops - Color stops for the gradient
 * @returns CSS repeating-linear-gradient() function string
 */
export const repeatingLinearGradient = (
  direction: string,
  ...colorStops: string[]
): string =>
  `repeating-linear-gradient(${direction}, ${colorStops.join(", ")})`;

/**
 * Creates a repeating radial gradient background
 * @param shape - Gradient shape
 * @param colorStops - Color stops for the gradient
 * @returns CSS repeating-radial-gradient() function string
 */
export const repeatingRadialGradient = (
  shape: string,
  ...colorStops: string[]
): string => `repeating-radial-gradient(${shape}, ${colorStops.join(", ")})`;

/**
 * Creates a repeating conic gradient background
 * @param position - Starting position and angle
 * @param colorStops - Color stops for the gradient
 * @returns CSS repeating-conic-gradient() function string
 */
export const repeatingConicGradient = (
  position: string,
  ...colorStops: string[]
): string =>
  `repeating-conic-gradient(from ${position}, ${colorStops.join(", ")})`;
