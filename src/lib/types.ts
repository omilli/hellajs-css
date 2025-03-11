import type * as CSS from "csstype";

export type Selector =
  | keyof HTMLElementTagNameMap
  | keyof CSS.StandardLonghandProperties
  | keyof CSS.VendorLonghandPropertiesHyphen
  | CSS.AtRules
  | CSS.Pseudos
  | "light"
  | "dark";

export type StyleConfig = {
  [key in Selector]?: StyleConfig | CSS.Properties;
};

// Type for flattening theme with proper type inference
export type ThemeValue<T> = T extends { light: infer L; dark: infer D }
  ? L | D
  : T extends { light: infer L }
  ? L
  : T extends { dark: infer D }
  ? D
  : T extends Record<string, any>
  ? { [K in keyof T]: ThemeValue<T[K]> }
  : T;

export type Flatten<T> = {
  [K in keyof T as K extends "light" | "dark" ? never : K]: ThemeValue<T[K]>;
} & ThemeValue<T>;
