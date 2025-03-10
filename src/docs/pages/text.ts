import { HellaElement, html } from "@hellajs/core";

const { $, h1, h2, h3, h4, h5, h6, p, ul, ol, li, pre, code, blockquote, hr } =
  html;

const intro = $([
  h2("1. Introduction"),
  p(
    "Welcome to the typography showcase of our CSS library. This page demonstrates the various text styles and elements that our library supports, ensuring a consistent and beautiful presentation across your web projects."
  ),
]);

const headings = $([
  h2("2. Headings"),
  h1("Heading 1"),
  h2("Heading 2"),
  h3("Heading 3"),
  h4("Heading 4"),
  h5("Heading 5"),
  h6("Heading 6"),
]);

const paragraphs = $([
  h2("3. Paragraphs"),
  p(
    "This is a standard paragraph. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  ),
]);

const lists = $([
  h2("4. Lists"),
  ul([
    li("The first item in a list"),
    li("Hey, it's the second!"),
    li("What have you heard about the third?"),
  ]),
  ol([
    li("How many ways can we list?"),
    li("Let us enumerate the ways"),
    li("Yarp"),
  ]),
]);

const blockquotes = $([
  h2("5. Blockquotes"),
  blockquote(
    "This is a blockquote. It is used to highlight a section of text as a quote or excerpt from another source."
  ),
]);

const codes = $([
  h2("6. Code"),
  p(["Here's an example of ", code("inline code"), " within a paragraph."]),
  pre(
    code(`function greet(name: string) {
    console.log(\`Hello, \${name}!\`);
  }`)
  ),
]);

const hRule = $([
  h2("7. Horizontal Rule"),
  p("Content above the horizontal rule."),
  hr(),
  p("Content below the horizontal rule."),
]);

export const TextComponent = $([
  h1("Typography"),
  intro,
  headings,
  paragraphs,
  lists,
  blockquotes,
  codes,
  hRule,
]);
