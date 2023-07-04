/** Order functions */
export type HvChartOrder = "asc" | "desc";

type FullSortBy = {
  /** Column name. */
  field: string;
  /** Order function to use. If no `order` is defined, it will default to `asc`. */
  order?: HvChartOrder;
};

export type HvChartSortBy = string | FullSortBy;
