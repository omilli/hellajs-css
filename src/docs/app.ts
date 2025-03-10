import { CleanupFunction, HellaElement, render } from "@hellajs/core";
import { afterNavigate, router } from "@hellajs/router";
import { NavComponent } from "./components/nav";

const appRouter = router();

let currentRoute: HellaElement = {
  tag: "div",
  content: "loading...",
};

let currentComponent: CleanupFunction;

appRouter.start({
  "/": "/text",
  "/text": async () => {
    currentRoute = (await import("./pages/text")).TextComponent;
  },
  "/table": async () => {
    currentRoute = (await import("./pages/table")).TableComponent;
  },
});

afterNavigate(["*"], () => {
  if (currentComponent) {
    currentComponent();
  }
  currentComponent = render(
    () => ({
      tag: "main",
      content: [NavComponent, currentRoute],
    }),
    "#app"
  );
});

export { appRouter };
