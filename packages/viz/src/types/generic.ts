/**
 * Axis types:
 * continuous: continuous data
 * categorical: discrete/categorical data
 * time: continuous time data
 */
export type HvChartAxisType = "continuous" | "categorical" | "time";

/** Aggregation functions */
export type HvChartAggregation = "sum" | "average" | "min" | "max" | "count";

/** Order functions */
export type HvChartOrder = "asc" | "desc";

/** Empty cell mode */
export const emptyCellMode = ["connect", "void"] as const;
export type HvChartEmptyCellMode = (typeof emptyCellMode)[number];

/** Axis definition */

export interface HvChartAxis {
  id?: string;
  /** Type: continuous, categorical, or time data. Defaults varies per visualization type and axis orientation. */
  type?: HvChartAxisType;
  /** Formatter for the labels on the vertical axis. */
  labelFormatter?:
    | ((value?: string | number, index?: number) => string)
    | string;
  /** Rotation of the labels on the vertical axis. Defaults to `0`. */
  labelRotation?: number;
  /** Name used on the vertical axis. */
  name?: string;
  /** Maximum value on the vertical axis. Set this property to `max` to use the maximum data value. */
  maxValue?:
    | string
    | number
    | "max"
    | ((obj: {
        max: string | number;
        min: string | number;
      }) => string | number);
  /** Minimum value on the vertical axis. Set this property to `min` to use the maximum data value. */
  minValue?:
    | string
    | number
    | "min"
    | ((obj: {
        max: string | number;
        min: string | number;
      }) => string | number);
}
