/**
 * CSS target-related functions for managing counters and text references
 */

/**
 * Creates a counter reference targeting a specific URL
 * @param url - Target URL
 * @param name - Counter name
 * @param style - Optional counter style
 * @returns CSS target-counter() function string
 * @example
 * targetCounter('#section1', 'count') // -> "target-counter(#section1, count)"
 */
export const targetCounter = (
  url: string,
  name: string,
  style?: string
): string =>
  style
    ? `target-counter(${url}, ${name}, ${style})`
    : `target-counter(${url}, ${name})`;

/**
 * Creates a nested counter reference targeting a specific URL
 * @param url - Target URL
 * @param name - Counter name
 * @param separator - String to separate counter values
 * @param style - Optional counter style
 * @returns CSS target-counters() function string
 * @example
 * targetCounters('#list', 'items', '.') // -> "target-counters(#list, items, '.')"
 */
export const targetCounters = (
  url: string,
  name: string,
  separator: string,
  style?: string
): string =>
  style
    ? `target-counters(${url}, ${name}, "${separator}", ${style})`
    : `target-counters(${url}, ${name}, "${separator}")`;

/**
 * References text content from a target element
 * @param url - Target URL
 * @param target - Optional target specifier
 * @returns CSS target-text() function string
 * @example
 * targetText('#heading') // -> "target-text(#heading)"
 */
export const targetText = (url: string, target?: string): string =>
  target ? `target-text(${url}, ${target})` : `target-text(${url})`;

/**
 * Creates a leader for table of contents or similar constructs
 * @param style - Optional leader style
 * @returns CSS leader() function string
 * @example
 * leader('dotted') // -> "leader(dotted)"
 */
export const leader = (style?: string): string =>
  style ? `leader(${style})` : "leader()";
