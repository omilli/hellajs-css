# hellacss

A type-safe CSS-in-JS library with optimized theming and zero runtime overhead.

## Features

- **Zero runtime overhead** - All CSS is generated at build time
- **Type-safe styling** with full TypeScript support and autocompletion
- **Intelligent CSS optimization** that automatically eliminates redundancy
- **Seamless theming system** with light/dark mode support
- **Complete set of CSS helpers** for everything from colors to animations
- **Small bundle size** with no external dependencies
- **Automatic CSS variable management** for cleaner, more maintainable code

## Quick Start

```typescript
import { createStyle, createTheme, generateCss } from "hellacss";

// Define your theme with light/dark variants
const theme = createTheme({
  colors: {
    primary: "#0077ff",
    text: {
      light: "#333333",
      dark: "#ffffff",
    },
    background: {
      light: "#ffffff",
      dark: "#121212",
    },
  },
});

// Create styles with full type safety
createStyle({
  ".button": {
    backgroundColor: theme.colors.primary,
    color: theme.colors.text,
    padding: "10px 15px",
    borderRadius: "4px",
    ":hover": {
      opacity: 0.9,
    },
  },
});

// Generate the CSS at build time
const css = generateCss();
```

## Technical Features

- **Two-tier customization**:
  - Build-time customization via SCSS variables
  - Runtime customization via CSS custom properties
- **Size optimization**: Modular architecture to minimize CSS bundle size
- **No preprocessor dependencies**: Pure JavaScript-based CSS generation
- **Type-safe theming**: Structured theme objects with dot notation paths
- **Automatic CSS variable deduplication**: Common values are automatically optimized
- **Component-specific variables**: Scoped CSS variables to avoid naming collisions
- **Zero runtime CSS-in-JS tax**: All styles are generated at build time

## Detailed Usage

### Creating Themes

Define a theme with light and dark variants:

```typescript
import { createTheme } from "hellacss";

const theme = createTheme({
  colors: {
    text: {
      light: "#333333",
      dark: "#ffffff",
    },
    background: {
      light: "#ffffff",
      dark: "#121212",
    },
    primary: "#0077ff",
    secondary: "#ff3366",
  },
  spacing: {
    small: "0.5rem",
    medium: "1rem",
    large: "2rem",
  },
  fontSizes: {
    small: "0.875rem",
    medium: "1rem",
    large: "1.25rem",
    xlarge: "1.5rem",
  },
});
```

### Component Styles

Create styles with nested selectors, media queries, and more:

```typescript
import { createStyle } from "hellacss";

createStyle({
  ".card": {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",

    ".card-title": {
      fontSize: theme.fontSizes.large,
      color: theme.colors.text,
      marginBottom: theme.spacing.small,
    },

    ".card-content": {
      fontSize: theme.fontSizes.medium,
      color: theme.colors.text,
    },

    "@media (max-width: 768px)": {
      padding: theme.spacing.small,
    },

    ":hover": {
      boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
    },
  },
});
```

### Generating CSS

Generate all CSS for server-side rendering or static output:

```typescript
import { generateCss } from "hellacss";

// Get all CSS including theme variables and collected styles
const css = generateCss();

// Or get only the styles without theme variables
const styles = generateCss(false);
```

### Component Variables

Create component-specific variables that can have light/dark variants:

```typescript
import { createVars, createStyle } from "hellacss";

// Define button-specific variables
const buttonVars = createVars("button", {
  padding: {
    small: "4px 8px",
    medium: "8px 16px",
    large: "12px 24px",
  },
  fontSize: {
    small: "0.75rem",
    medium: "1rem",
    large: "1.25rem",
  },
  borderRadius: "4px",
  colors: {
    background: {
      light: theme.colors.primary,
      dark: `rgba(${theme.colors.primary}, 0.8)`,
    },
  },
});

// Use these variables in styles
createStyle({
  ".button": {
    padding: buttonVars.padding.medium,
    fontSize: buttonVars.fontSize.medium,
    borderRadius: buttonVars.borderRadius,
    backgroundColor: buttonVars.colors.background,

    "&.small": {
      padding: buttonVars.padding.small,
      fontSize: buttonVars.fontSize.small,
    },

    "&.large": {
      padding: buttonVars.padding.large,
      fontSize: buttonVars.fontSize.large,
    },
  },
});
```

### Helper Functions

Use the built-in helper functions for consistent units and values:

```typescript
import { rem, px, rgb, rgba, calc } from "hellacss";

createStyle({
  ".element": {
    padding: rem(1),
    margin: px(10, 15, 10, 15),
    borderBottom: `${px(1)} solid ${rgba(0, 0, 0, 0.1)}`,
    width: calc("100% - 2rem"),
    color: rgb(51, 51, 51),
  },
});
```

## Theme Switching

Toggle between light and dark mode:

```typescript
import { setActiveTheme, toggleTheme, getActiveTheme } from "hellacss";

// Set theme explicitly
setActiveTheme("dark");

// Toggle between light and dark
const newTheme = toggleTheme("light", "dark");
console.log(`Theme is now ${newTheme}`);

// Get current theme
const currentTheme = getActiveTheme();
```
