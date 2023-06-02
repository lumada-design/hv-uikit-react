/**
 * Axis types:
 * continuous: continuous data
 * categorical: discrete/categorical data
 * time: continuous time data
 */
export type HvChartAxisType = "continuous" | "categorical" | "time";

/** Aggregation functions */
export type HvChartAggregation = "sum" | "average" | "min" | "max" | "count";

/** Empty cell mode */
export const emptyCellMode = ["connect", "void"] as const;
export type HvChartEmptyCellMode = (typeof emptyCellMode)[number];
