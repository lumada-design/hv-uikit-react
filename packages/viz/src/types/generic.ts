/**
 * Axis types:
 * continuous: Continuous data
 * categorical: Discrete/categorical data
 * time: Continuous time data
 */
export type HvChartAxisType = "continuous" | "categorical" | "time";

/** Aggregation functions */
export type HvChartAggregation = "sum" | "average" | "min" | "max" | "count";

/** Data type */
export type HvChartDataType = "table" | "row";

/** Empty cell mode */
export const hvChartEmptyCellMode = ["connect", "void"] as const;
export type HvChartEmptyCellMode = (typeof hvChartEmptyCellMode)[number];
