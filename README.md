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

## Customization System

Our library uses a unique dual-layer customization system:

### 1. Build-time Customization (SCSS)

Every component defines its default values using SCSS variables with `!default`:

```scss
// Define defaults that can be overridden before import
$table-width: 100% !default;
$table-margin: 1.5rem 0 !default;
$table-border-collapse: collapse !default;
```

Override these by setting variables before importing:

```scss
// Your project's main.scss
$table-width: 90%;
@use "@ssg/elements/table";
```

### 2. Runtime Customization (CSS)

Every property uses CSS variables with SCSS fallbacks:

```scss
table {
  width: var(--table-width, #{$table-width});
  margin: var(--table-margin, #{$table-margin});
}
```

This enables runtime customization via CSS:

```css
/* Global customization */
:root {
  --table-width: 90%;
}

/* Component-specific customization */
.compact-table {
  --table-margin: 0.5rem 0;
}
```

### Theme System

Colors and other theme values are managed through a central theme system:

```scss
// Light mode defaults
--color-text: #333333;
--color-background: #ffffff;

// Dark mode via attribute
[data-theme="dark"] {
  --color-text: #eeeeee;
  --color-background: #222222;
}
```
