import type * as CSS from "csstype";

/**
 * Represents valid CSS selectors supported in our theming system.
 * It includes:
 * - HTML element tags (e.g., "div", "span")
 * - CSS at-rules (e.g., "@media")
 * - CSS pseudo-classes/elements (e.g., ":hover", "::after")
 * - Special identifiers "light" and "dark" used for theming.
 */
export type CSSSelector =
  | keyof HTMLElementTagNameMap
  | CSS.AtRules
  | CSS.Pseudos
  | "light"
  | "dark";

/**
 * Main type for style configuration.
 * Users can define styles either with a structured mapping (StyleConfigBase)
 * or with a generic key-value mapping (StyleConifigGeneric).
 */
export type StyleConfig = StyleConfigBase | StyleConifigGeneric;

/**
 * Base mapping for style configuration.
 * Keys are restricted to HTML elements or CSS at-rules,
 * and values can be nested style rules (StyleConfigRules) or direct CSS properties.
 */
export type StyleConfigBase = {
  [key in keyof HTMLElementTagNameMap | CSS.AtRules]?:
    | StyleConfigRules
    | CSS.Properties;
};

/**
 * Generic style configuration type for arbitrary keys.
 * Useful for custom selectors or non-standard elements not covered by HTML tag names or at-rules.
 */
export type StyleConifigGeneric = {
  [key: string]: StyleConfigValidValues;
};

/**
 * Represents a set of style rules.
 * This can either be a typed mapping using valid CSS selectors (StyleConfigTypedRules)
 * or a generic mapping (StyleConifigGeneric).
 */
export type StyleConfigRules = StyleConfigTypedRules | StyleConifigGeneric;

/**
 * Typed style rules using valid CSS selectors as keys.
 * Each key can be any valid CSS selector, mapping to either nested rules or CSS properties.
 */
export type StyleConfigTypedRules = {
  [key in CSSSelector]?: StyleConfigValidValues;
};

/**
 * Defines valid values in a style configuration.
 * Values can be nested style rules or a direct mapping to CSS properties.
 */
export type StyleConfigValidValues = StyleConfigRules | CSS.Properties;

/**
 * Interface for defining a theme configuration.
 * Each key corresponds to a theme variable that may have a single value
 * or light/dark variants. The optional 'light' and 'dark' properties allow for mode-specific overrides.
 */
export interface ThemeConfig {
  [key: string]: ThemeValue<any>;
  light?: Record<string, any>;
  dark?: Record<string, any>;
}

/**
 * Holds the generated CSS variables and the complete CSS string.
 * 'variables' is an array of individual variable definitions,
 * and 'css' is the assembled CSS output.
 */
export interface CSSVariableSet {
  variables: string[];
  css: string;
}

/**
 * Computes the value type for a theme variable.
 * - If both 'light' and 'dark' values are provided, returns a union of the two.
 * - If only one mode is provided, returns that value.
 * - If a complex object is provided, applies the type recursively.
 */
export type ThemeValue<T> = T extends { light: infer L; dark: infer D }
  ? L | D
  : T extends { light: infer L }
  ? L
  : T extends { dark: infer D }
  ? D
  : T extends Record<string, any>
  ? { [K in keyof T]: ThemeValue<T[K]> }
  : T;

/**
 * Represents the final, flattened theme.
 * Removes 'light' and 'dark' keys from the type and resolves each property
 * to its computed ThemeValue. It also mixes in root level ThemeValue for direct access.
 */
export type FlattenedTheme<T> = {
  [K in keyof T as K extends "light" | "dark" ? never : K]: ThemeValue<T[K]>;
} & ThemeValue<T>;

/**
 * Tracks the default value assigned to a theme variable.
 * Contains:
 * - 'value': the CSS default value.
 * - 'count': number of times this default has been referenced.
 * - 'refCounts': mapping of individual variable references to how many times they occur.
 * - 'optimized': flag indicating if the default has been optimized into a shared variable.
 */
export interface DefaultValueEntry {
  value: string;
  count: number;
  refCounts: Record<string, number>;
  optimized: boolean;
}

/**
 * Enumerates the supported theme modes:
 * - "light": For light mode specific variables.
 * - "dark": For dark mode specific variables.
 * - "root": For base theme variables not mode-specific.
 */
export type ThemeMode = "light" | "dark" | "root";
