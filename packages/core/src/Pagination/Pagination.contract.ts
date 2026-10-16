import type { HvContract } from "../types/contract";
import type { HvPaginationProps } from "./Pagination";

export const contract = {
  name: "HvPagination",
  purpose: "Lets users move between pages of a table or list.",
  rules: ["data/states"],
  states: {
    pages:
      "Total number of pages; required for the page input and last-page control.",
    page: "Current page, zero-based; controlled together with onPageChange.",
    pageSize: "Rows per page; controlled together with onPageSizeChange.",
    showPageSizeOptions:
      "Shows the rows-per-page selector; pair it with pageSizeOptions.",
    showPageJump: "Shows the page input for jumping to a page.",
    labels: "Accessible names and texts of the controls; translate them.",
  },
  antiPatterns: [
    {
      id: "hooks",
      dont: "Wire page, pages and page size by hand when using useHvTable.",
      why: "They drift from the table's own pagination state.",
      instead:
        "Use useHvPagination and spread getHvPaginationProps() onto HvPagination.",
    },
    {
      id: "placement",
      dont: "Place HvPagination outside the table's HvTableSection.",
      why: "It loses the section layout and its link to the table.",
      instead: "Put it after the table inside the same HvTableSection.",
    },
    {
      id: "one-page",
      dont: "Remove HvPagination when there is a single page.",
      why: "The layout jumps as data changes.",
      instead:
        "Keep it rendered and pass canPrevious and canNext (or getHvPaginationProps) so its controls disable when there is nothing to page.",
    },
  ],
  a11y: {
    requirements: [
      "All controls are labelled through labels; keep them localized.",
      "The page input announces the current page and total.",
    ],
  },
} as const satisfies HvContract<HvPaginationProps>;
