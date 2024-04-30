export type HvChartFilterOperation =
  | "is"
  | "isNot"
  | "contains"
  | "greaterThan"
  | "greaterThanOrEqual"
  | "lessThan"
  | "lessThanOrEqual"
  | "between";

export type HvChartFilter = {
  field: string;
  operation: HvChartFilterOperation;
  value: string | string[] | number | number[];
};
