/**
 * Creates an RGB color value
 * @param r - Red component (0-255)
 * @param g - Green component (0-255)
 * @param b - Blue component (0-255)
 * @returns CSS rgb() function string
 */
export const rgb = (r: number, g: number, b: number): string =>
  `rgb(${r}, ${g}, ${b})`;

/**
 * Creates an RGBA color value with alpha transparency
 * @param r - Red component (0-255)
 * @param g - Green component (0-255)
 * @param b - Blue component (0-255)
 * @param a - Alpha channel (0-1)
 * @returns CSS rgba() function string
 */
export const rgba = (r: number, g: number, b: number, a: number): string =>
  `rgba(${r}, ${g}, ${b}, ${a})`;

/**
 * Creates an HSL color value
 * @param h - Hue angle (0-360)
 * @param s - Saturation percentage (0-100)
 * @param l - Lightness percentage (0-100)
 * @returns CSS hsl() function string
 */
export const hsl = (h: number, s: number, l: number): string =>
  `hsl(${h}, ${s}%, ${l}%)`;

/**
 * Creates an HSLA color value with alpha transparency
 * @param h - Hue angle (0-360)
 * @param s - Saturation percentage (0-100)
 * @param l - Lightness percentage (0-100)
 * @param a - Alpha channel (0-1)
 * @returns CSS hsla() function string
 */
export const hsla = (h: number, s: number, l: number, a: number): string =>
  `hsla(${h}, ${s}%, ${l}%, ${a})`;

/**
 * Creates an HWB color value
 * @param h - Hue angle (0-360)
 * @param w - Whiteness percentage (0-100)
 * @param b - Blackness percentage (0-100)
 * @returns CSS hwb() function string
 */
export const hwb = (h: number, w: number, b: number): string =>
  `hwb(${h} ${w}% ${b}%)`;

/**
 * Creates a LAB color value
 * @param l - Lightness percentage (0-100)
 * @param a - Green-red axis value
 * @param b - Blue-yellow axis value
 * @returns CSS lab() function string
 */
export const lab = (l: number, a: number, b: number): string =>
  `lab(${l}% ${a} ${b})`;

/**
 * Creates an LCH color value
 * @param l - Lightness percentage (0-100)
 * @param c - Chroma value
 * @param h - Hue angle (0-360)
 * @returns CSS lch() function string
 */
export const lch = (l: number, c: number, h: number): string =>
  `lch(${l}% ${c} ${h})`;

/**
 * Creates an OKLAB color value (perceptually uniform color space)
 * @param l - Lightness value
 * @param a - Green-red axis value
 * @param b - Blue-yellow axis value
 * @returns CSS oklab() function string
 */
export const oklab = (l: number, a: number, b: number): string =>
  `oklab(${l} ${a} ${b})`;

/**
 * Creates an OKLCH color value (perceptually uniform color space with polar coordinates)
 * @param l - Lightness value
 * @param c - Chroma value
 * @param h - Hue angle (0-360)
 * @returns CSS oklch() function string
 */
export const oklch = (l: number, c: number, h: number): string =>
  `oklch(${l} ${c} ${h})`;

/**
 * Creates a color value in a specified color space
 * @param colorSpace - Color space identifier (e.g., 'display-p3', 'rec2020')
 * @param values - Color values for the specified color space
 * @returns CSS color() function string
 */
export const color = (colorSpace: string, values: string[]): string =>
  `color(${colorSpace} ${values.join(" ")})`;

/**
 * Mixes two colors according to the specified method and optional percentage
 * @param method - Color interpolation method (e.g., 'in srgb', 'in lab')
 * @param color1 - First color
 * @param color2 - Second color
 * @param percentage - Optional percentage for the second color
 * @returns CSS color-mix() function string
 */
export const colorMix = (
  method: string,
  color1: string,
  color2: string,
  percentage?: number
): string =>
  percentage !== undefined
    ? `color-mix(${method}, ${color1}, ${color2} ${percentage}%)`
    : `color-mix(${method}, ${color1}, ${color2})`;

/**
 * Selects the color with highest contrast against a base color
 * @param color - Base color to compare against
 * @param candidates - List of color candidates
 * @returns CSS color-contrast() function string
 */
export const colorContrast = (color: string, ...candidates: string[]): string =>
  `color-contrast(${color} vs ${candidates.join(", ")})`;

/**
 * Creates an opacity filter
 * @param amount - Opacity value (0-1)
 * @returns CSS opacity() function string
 */
export const opacity = (amount: number): string => `opacity(${amount})`;
