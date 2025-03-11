import { theme } from "../lib";

export const resetStyles = theme.rules({
  "*,*::before,*::after": {
    boxSizing: "border-box",
  },
  "*": {
    margin: 0,
  },
  "img,picture,video,canvas,svg": {
    display: "block",
    maxWidth: "100%",
  },
});
