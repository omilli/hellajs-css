import { html } from "@hellajs/core";

const { $, table, thead, tbody, tr, th, td, h1, h2 } = html;

const basicTable = table([
  thead([tr([th("Name"), th("Role"), th("Department")])]),
  tbody([
    tr([
      td({ data: { label: "Name" } }, "John Doe"),
      td({ data: { label: "Role" } }, "Developer"),
      td({ data: { label: "Department" } }, "Engineering"),
    ]),
    tr([
      td({ data: { label: "Name" } }, "Jane Smith"),
      td({ data: { label: "Role" } }, "Designer"),
      td({ data: { label: "Department" } }, "Design"),
    ]),
  ]),
]);

export const TableComponent = $([
  h1("Tables"),
  h2("1. Basic Table"),
  basicTable,
]);
