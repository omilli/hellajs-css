import { html } from "@hellajs/core";

const { $, table, thead, tbody, tr, th, td, h1, h2 } = html;

const basicTable = table([
  thead(tr([th("Name"), th("Role"), th("Department")])),
  tbody([
    tr([td("John Doe"), td("Developer"), td("Engineering")]),
    tr([td("Jane Smith"), td("Designer"), td("Design")]),
  ]),
]);

const complexTable = table([
  thead([
    // @ts-ignore
    tr([th({ colspan: "4" }, "Quarterly Sales Report")]),
    tr([th("Region"), th("Q1"), th("Q2"), th("Growth")]),
  ]),
  tbody([
    tr([td("North"), td("$10,000"), td("$12,000"), td("+20%")]),
    tr([td("South"), td("$8,000"), td("$9,500"), td("+18.75%")]),
  ]),
]);

export const TableComponent = $([
  h1("Tables"),
  h2("1. Basic Table"),
  basicTable,
  h2("2. Complex Table"),
  complexTable,
]);
