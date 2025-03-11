# hellacss

## Technical Features

- **Semantic HTML styling**: Direct styling of HTML elements without classes
- **Two-tier customization**:
  - Build-time customization via SCSS variables
  - Runtime customization via CSS custom properties
- **Size optimization**: Modular architecture to minimize CSS bundle size
- **Responsive design**:
  - Fluid typography using clamp, calc, and viewport units
  - Container queries for component-level responsiveness
  - **No preprocessor dependencies**: Pure JavaScript-based CSS generation
  - **Type-safe theming**: Structured theme objects with dot notation paths

## Customization System

hellacss uses a unique dual-layer customization system powered by JavaScript:

### 1. Build-time Customization (JavaScript)

The theme system has three main parts:

```ts
// 1. Define themes with strongly typed objects
const lightTheme = createTheme("light", {
  colors: {
    background: "#ffffff",
    text: "#1c1c1c",
    border: "#dddddd",
  },
});

// 2. Component-specific variables that can reference theme values
const tableVars = createVars("light", {
  textColor: lightTheme.colors.text,
});

// 3. Create styles that use those variables
createStyle(["table"], {
  color: tableVars.textColor,
});

createStyle(["table", "th"], {
  color: tableVars.textColor,
});

// Generate final CSS output
const css = theme.generate();
```

#### Unit Helper Functions

The library includes helper functions for CSS units, e.g:

```ts
import { px, rem, em, perc, vh, vw, calc, clamp } from "./lib/units";

px(10); // "10px"
px(10, 20); // "10px 20px"
rem(2.2); // "2.2rem"
perc(100); // "100%"
calc("100% - 20px"); // "calc(100% - 20px)"
clamp("1rem", "5vw", "2rem"); // "clamp(1rem, 5vw, 2rem)"
```

### 2. Runtime Customization (CSS)

The build process automatically generates CSS variables for every theme property:

```css
/* Root level vars from createTheme() */
:root {
  --colors-background: #ffffff;
  --colors-text: #1c1c1c;
  --colors-border: #dddddd;
}

/* Component styles use vars with fallbacks */
table {
  color: var(--table-text-color, #1c1c1c);
}

table th {
  color: var(--table-text-color, #1c1c1c);
}
```

This enables runtime customization via CSS:

```css
/* Global customization */
:root {
  --colors-background: #f5f5f5;
}

/* Component-specific customization */
.custom-table {
  --table-text-color: blue;
}
```

#### Theme Switching

Switch between themes using the provided API and the system will update all CSS variables automatically.:

```ts
const lightTheme = createTheme("light", {
  /* ... */
});
const darkTheme = createTheme("dark", {
  /* ... */
});

// Switch between themes
theme.setActiveTheme("dark");

// Toggle between themes
theme.toggle("light", "dark");
```
