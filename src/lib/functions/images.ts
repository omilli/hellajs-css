/**
 * CSS image-related functions for handling image sources,
 * gradients, and image processing operations
 */

/**
 * Creates a URL reference to an image resource
 * @param path - Path to the image resource
 * @returns {string} CSS url() function
 * @example
 * url('/images/bg.png') // -> "url(/images/bg.png)"
 */
export const url = (path: string): string => `url(${path})`;

/**
 * Specifies an image with optional fallbacks
 * @param value - Primary image value
 * @param fallbacks - Optional fallback images
 * @returns {string} CSS image() function
 * @example
 * image('pic.avif', 'pic.webp', 'pic.jpg')
 */
export const image = (value: string, ...fallbacks: string[]): string =>
  fallbacks.length
    ? `image(${value}, ${fallbacks.join(", ")})`
    : `image(${value})`;

/**
 * Creates a cross-fade between multiple images
 * @param images - List of images to cross-fade between
 * @returns {string} CSS cross-fade() function
 * @example
 * crossFade('url(1.jpg) 25%', 'url(2.jpg) 75%')
 */
export const crossFade = (...images: string[]): string =>
  `cross-fade(${images.join(", ")})`;

/**
 * Creates a responsive image set
 * @param items - List of image sources with conditions
 * @returns {string} CSS image-set() function
 * @example
 * imageSet(
 *   'img/pic-1x.jpg 1x',
 *   'img/pic-2x.jpg 2x'
 * )
 */
export const imageSet = (...items: string[]): string =>
  `image-set(${items.join(", ")})`;

/**
 * References a Paint API worklet
 * @param workletName - Name of the registered worklet
 * @param params - Optional parameters for the worklet
 * @returns {string} CSS paint() function
 * @example
 * paint('myGradient', '45deg', 'blue', 'red')
 */
export const paint = (workletName: string, ...params: string[]): string =>
  params.length
    ? `paint(${workletName}, ${params.join(", ")})`
    : `paint(${workletName})`;

/**
 * References an element as an image source
 * @param id - ID of the element to reference
 * @returns {string} CSS element() function
 * @example
 * element('poster') // -> "element(#poster)"
 */
export const element = (id: string): string => `element(#${id})`;
