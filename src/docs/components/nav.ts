import { HellaElement, html } from "@hellajs/core";
import { appRouter } from "../app";

const { input, label, span, header, nav, ul, li, a } = html;

// @ts-ignore
const navTrigger = input({
  type: "checkbox",
  id: "nav",
  "aria-hidden": "true",
});

const navLabel = label(
  // @ts-ignore
  { for: "nav", "aria-label": "Toggle menu" },
  [span(), span(), span()]
);

const navLinks = ["text", "table"];

export const NavComponent: HellaElement = header(
  {
    classes: "menu",
  },
  [
    navTrigger,
    navLabel,
    nav([
      ul(
        navLinks.map((link) =>
          li([
            a(
              {
                onclick: () => appRouter.navigate(`/${link}`),
              },
              link
            ),
          ])
        )
      ),
    ]),
  ]
);
