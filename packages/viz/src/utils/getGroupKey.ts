import { HvChartCommonProps } from "@viz/types/common";

export const getGroupKey = (groupBy: HvChartCommonProps["groupBy"]) =>
  Array.isArray(groupBy) ? groupBy.join("_") : groupBy;
