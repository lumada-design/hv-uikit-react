import type { HvContract } from "../types/contract";
import type { HvTableProps } from "./Table";

export const contract = {
  name: "HvTable",
  parts: [
    "HvTableSection",
    "HvTableContainer",
    "HvTableHead",
    "HvTableBody",
    "HvTableRow",
    "HvTableHeader",
    "HvTableCell",
    "HvBulkActions",
    "HvPagination",
    "HvLoadingContainer",
  ],
  rules: [
    "data/states",
    "components/prefer",
    "date/format",
    "status/semantic-color",
  ],
  variants: {
    default: "Rows packed together, for data users compare and sort.",
    listrow:
      "Rows separated by a small gap, for list-like items where each row is one entry.",
  },
  states: {
    stickyHeader:
      "Keeps the header visible while rows scroll; put the table in HvTableContainer.",
    stickyColumns:
      "Keeps the leading columns visible while the table scrolls horizontally.",
    component:
      'When not "table", the layout is up to the consumer and role="table" is applied.',
  },
  tokens: {
    space: "Cell padding and row gaps use spacing tokens.",
    color: "Theme and variant styling only; no raw colors in cells.",
  },
  antiPatterns: [
    {
      id: "section",
      dont: "Render HvTable outside HvTableSection.",
      why: "The section applies the table layout and spacing.",
      instead:
        "Wrap the table, HvBulkActions and HvPagination in one HvTableSection.",
      enforcement: "checked",
    },
    {
      id: "pagination",
      dont: "Show a table without HvPagination.",
      why: "Users cannot reach rows beyond the first page.",
      instead:
        "Add HvPagination after the table, wired with useHvPagination or page, pages and onPageChange.",
    },
    {
      id: "bulk-actions",
      dont: "Offer actions on many rows through per-row or toolbar buttons.",
      why: "Users can only act on one item at a time.",
      instead: "Use HvBulkActions with useHvRowSelection and useHvBulkActions.",
    },
    {
      id: "native-elements",
      dont: "Use native table, thead, tbody, tr, th or td.",
      why: "The design system styles do not apply.",
      instead:
        "Use HvTable with HvTableHead, HvTableBody, HvTableRow, HvTableHeader and HvTableCell.",
    },
    {
      id: "hooks-state",
      dont: "Keep selection or pagination in local state per table.",
      why: "The hooks keep them consistent with bulk actions.",
      instead:
        "Pass useHvPagination and useHvRowSelection to useHvTable and spread their props.",
    },
  ],
  a11y: {
    role: "table",
    requirements: [
      "Needs an accessible name: a caption or aria-label.",
      "Keep the counts in the HvBulkActions select-all label accurate.",
      "Translate HvPagination labels through its labels prop.",
      "Row and bulk actions stay reachable by keyboard in table order.",
    ],
  },
} as const satisfies HvContract<HvTableProps>;
