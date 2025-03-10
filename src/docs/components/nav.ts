import { HellaElement } from "@hellajs/core";
import { appRouter } from "../app";

const navTrigger: HellaElement<"input"> = {
  tag: "input",
  type: "checkbox",
  id: "nav",
  // @ts-ignore
  "aria-hidden": "true",
};

const navLabel: HellaElement<"label"> = {
  tag: "label",
  // @ts-ignore
  for: "nav",
  // @ts-ignore
  "aria-label": "Toggle menu",
  content: [
    {
      tag: "span",
    },
    {
      tag: "span",
    },
    {
      tag: "span",
    },
  ],
};

const navLinks = ["text", "table"];

export const NavComponent: HellaElement = {
  tag: "header",
  classes: "menu",
  content: [
    navTrigger,
    navLabel,
    {
      tag: "nav",
      content: [
        {
          tag: "ul",
          content: navLinks.map((link) => ({
            tag: "li",
            content: {
              tag: "a",
              onclick: () => appRouter.navigate(`/${link}`),
              content: link,
            },
          })),
        },
      ],
    },
  ],
};
