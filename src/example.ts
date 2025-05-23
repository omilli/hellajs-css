import type * as CSS from "csstype";
import { style, vars, nested, rem, theme } from "./lib";

const appTheme = theme({
  spacing: {
    s: rem(1),
  },
  light: {
    colors: {
      text: "black",
      background: "white",
    },
  },
  dark: {
    colors: {
      text: "white",
      background: "black",
    },
  },
});

// Define text variables
export const textVars = vars({
  htmlFontSize: "100%",
  fontFamily:
    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Ubuntu, Roboto, Oxygen, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  codeFontFamily:
    "ui-monospace, SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace",
  space: {
    s: rem(0.5),
    m: rem(1),
    l: rem(1.5),
  },
  heading: {
    marginBottom: rem(1),
    overflowWrap: "break-word" as CSS.Properties["overflowWrap"],
    lineHeight: 1.2,
    fontSizes: {
      h1: "clamp(2rem, 5vw, 3rem)",
      h2: "clamp(1.75rem, 4vw, 2.5rem)",
      h3: "clamp(1.5rem, 3vw, 2.25rem)",
      h4: "clamp(1.25rem, 2vw, 1.75rem)",
      h5: "1.25rem",
      h6: "1rem",
    },
  },
  paragraph: {
    fontSize: rem(1),
    lineHeight: 1.5,
    margin: `${rem(1)} 0`,
  },
  link: {
    decoration: "underline",
    cursor: "pointer",
  },
  list: {
    margin: `${rem(1)} 0`,
    paddingLeft: rem(2),
    nestedMargin: `${rem(0.25)} 0`,
  },
  blockquote: {
    padding: rem(1),
    margin: `${rem(1)} 0`,
  },
  small: {
    fontSize: "0.8em",
  },
  code: {
    fontSize: "0.9em",
    padding: "0.2em 0.4em",
  },
  pre: {
    padding: rem(1),
  },
  hr: {
    borderWidth: "1px",
    margin: `${rem(1.5)} 0`,
  },
});

style({
  body: {
    fontFamily: textVars.fontFamily,
    lineHeight: textVars.paragraph.lineHeight,
    WebkitFontSmoothing: "antialiased",
    margin: 0,
    color: appTheme.colors.text,
    backgroundColor: appTheme.colors.background,
  },
});

style(["h1", "h2", "h3", "h4", "h5", "h6"], {
  margin: `${textVars.space.l} 0 ${textVars.heading.marginBottom}`,
  overflowWrap: textVars.heading.overflowWrap,
  lineHeight: textVars.heading.lineHeight,
});

style({
  p: {
    fontSize: textVars.paragraph.fontSize,
    lineHeight: textVars.paragraph.lineHeight,
    margin: textVars.paragraph.margin,
    overflowWrap: textVars.heading.overflowWrap,
  },
  a: {
    color: "var(--color-link)",
    textDecoration: textVars.link.decoration,
    cursor: textVars.link.cursor,
    states: nested([":hover", ":focus"], {
      color: "var(--color-link-hover)",
    }),
  },
});

style(["ul", "ol"], {
  margin: textVars.list.margin,
  paddingLeft: textVars.list.paddingLeft,
});

style(["ul ul"], {
  margin: textVars.list.nestedMargin,
});

style(["ol ol"], {
  margin: textVars.list.nestedMargin,
});

style({
  blockquote: {
    padding: textVars.blockquote.padding,
    margin: textVars.blockquote.margin,
    background: appTheme.colors.background,
  },
  code: {
    fontFamily: textVars.codeFontFamily,
    fontSize: textVars.code.fontSize,
    padding: textVars.code.padding,
    background: appTheme.colors.background,
  },
  pre: {
    overflow: "auto",
    padding: textVars.pre.padding,
    background: appTheme.colors.background,
  },
  hr: {
    border: 0,
    borderTop: `${textVars.hr.borderWidth} solid ${appTheme.colors.text}`,
    margin: textVars.hr.margin,
  },
});
