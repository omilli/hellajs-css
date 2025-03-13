import { createStyle, createTheme, createVars } from "./lib";
import { rgba } from "./lib/functions";
import { rem } from "./lib/units";

// Example usage showing proper types
const theme = createTheme({
  spacing: {
    sm: rem(1),
  },
  colors: {
    light: {
      background: "#fff",
      text: "#222",
      border: "#ddd",
    },
    dark: {
      background: "#222",
      text: "#fff",
      border: "#999",
    },
  },
});

const table = createVars("table", {
  text: {
    color: rgba(0, 0, 0, 0.87),
  },
});

createStyle({
  table: {
    tr: {
      color: table.text.color,
    },
    th: {
      color: table.text.color,
    },
    td: {
      color: table.text.color,
    },
  },
});
