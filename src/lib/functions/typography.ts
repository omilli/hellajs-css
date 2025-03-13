/**
 * CSS typography and font-related functions for handling
 * font formats, features, and variations
 */

/**
 * Specifies the format of a font resource
 * @param formatType - Font format type (e.g., 'woff2', 'woff', 'truetype')
 * @returns {string} CSS format() function
 * @example
 * format('woff2') // -> 'format("woff2")'
 */
export const format = (formatType: string): string => `format("${formatType}")`;

/**
 * References a locally installed font
 * @param fontName - Name of the local font
 * @returns {string} CSS local() function
 * @example
 * local('Arial') // -> 'local("Arial")'
 */
export const local = (fontName: string): string => `local("${fontName}")`;

/**
 * Specifies the format of a font resource (alternative syntax)
 * @param format - Font format identifier
 * @returns {string} CSS font-format() function
 */
export const fontFormat = (format: string): string =>
  `font-format("${format}")`;

/**
 * Specifies font technology requirements
 * @param tech - Font technology identifier
 * @returns {string} CSS font-tech() function
 */
export const fontTech = (tech: string): string => `font-tech("${tech}")`;

/**
 * Creates a font source list
 * @param sources - List of font source declarations
 * @returns {string} CSS src descriptor
 * @example
 * src(
 *   local('Arial'),
 *   url('arial.woff2') + ' ' + format('woff2')
 * )
 */
export const src = (...sources: string[]): string =>
  `src(${sources.join(", ")})`;

/**
 * Applies a stylistic alternate
 * @param featureValue - OpenType feature value
 * @returns {string} CSS stylistic() function
 * @example
 * stylistic('2') // -> 'stylistic(2)'
 */
export const stylistic = (featureValue: string): string =>
  `stylistic(${featureValue})`;

/**
 * Applies a styleset
 * @param featureValues - OpenType feature values
 * @returns {string} CSS styleset() function
 */
export const styleset = (...featureValues: string[]): string =>
  `styleset(${featureValues.join(", ")})`;

/**
 * Applies a character variant
 * @param featureValues - OpenType feature values
 * @returns {string} CSS character-variant() function
 */
export const characterVariant = (...featureValues: string[]): string =>
  `character-variant(${featureValues.join(", ")})`;

/**
 * Applies a swash
 * @param featureValue - OpenType feature value
 * @returns {string} CSS swash() function
 */
export const swash = (featureValue: string): string => `swash(${featureValue})`;

/**
 * Applies ornaments
 * @param featureValue - OpenType feature value
 * @returns {string} CSS ornaments() function
 */
export const ornaments = (featureValue: string): string =>
  `ornaments(${featureValue})`;

/**
 * Applies an annotation
 * @param featureValue - OpenType feature value
 * @returns {string} CSS annotation() function
 */
export const annotation = (featureValue: string): string =>
  `annotation(${featureValue})`;
