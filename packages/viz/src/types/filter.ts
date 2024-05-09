export type HvChartFilterOperation =
  | "is"
  | "isNot"
  | "contains"
  | "notContains"
  | "greaterThan"
  | "greaterThanOrEqual"
  | "lessThan"
  | "lessThanOrEqual"
  | "between"
  | "ends"
  | "notEnds"
  | "starts"
  | "notStarts";

export type HvChartFilter = {
  field: string;
  operation: HvChartFilterOperation;
  value: string | string[] | number | number[];
};
