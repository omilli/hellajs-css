import type * as CSS from "csstype";

// Common CSS selectors we support - HTML elements, properties, rules, etc
export type CssSelector =
  | keyof HTMLElementTagNameMap
  | CSS.AtRules
  | CSS.Pseudos
  | "light"
  | "dark";

// The main style config types - this is how users define their styles
export type StyleConfig = StyleConfigBase | StyleConifigGeneric;

export type StyleConfigBase = {
  [key in keyof HTMLElementTagNameMap | CSS.AtRules]?:
    | StyleConfigRules
    | CSS.Properties;
};

export type StyleConifigGeneric = {
  [key: string]: StyleConfigValidValues;
};

export type StyleConfigRules = StyleConfigTypedRules | StyleConifigGeneric;

export type StyleConfigTypedRules = {
  [key in CssSelector]?: StyleConfigValidValues;
};

export type StyleConfigValidValues = StyleConfigRules | CSS.Properties;

// Basic theme structure that can have light/dark modes
export interface ThemeConfig {
  [key: string]: ThemeValue<any>;
  light?: Record<string, any>;
  dark?: Record<string, any>;
}

// Just holds CSS variables and their rendered output
export interface CssVariableSet {
  variables: string[];
  css: string;
}

// Helper type for proper theme type inference
export type ThemeValue<T> = T extends { light: infer L; dark: infer D }
  ? L | D
  : T extends { light: infer L }
  ? L
  : T extends { dark: infer D }
  ? D
  : T extends Record<string, any>
  ? { [K in keyof T]: ThemeValue<T[K]> }
  : T;

// What the theme looks like after flattening light/dark variants
export type FlattenedTheme<T> = {
  [K in keyof T as K extends "light" | "dark" ? never : K]: ThemeValue<T[K]>;
} & ThemeValue<T>;

// Keeps track of default values and how often they're used
export interface DefaultValueEntry {
  value: string;
  count: number;
  refCounts: Record<string, number>;
  optimized: boolean;
}

// The different theme modes we support
export type ThemeMode = "light" | "dark" | "root";
