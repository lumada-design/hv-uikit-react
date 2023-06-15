import { HvChartAggregation } from "@viz/types";

export const getAgFunc = (func: HvChartAggregation, field: string) =>
  func === "count" ? "count()" : `${func}(d["${field}"])`;
