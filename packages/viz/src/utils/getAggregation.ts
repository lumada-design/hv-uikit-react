import { HvChartAggregation } from "@viz/types";

export const getAggregation = (func: HvChartAggregation, field: string) =>
  func === "count" ? "count()" : `${func}(d["${field}"])`;
