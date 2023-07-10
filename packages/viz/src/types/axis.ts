/**
 * Axis types:
 * continuous: continuous data
 * categorical: discrete/categorical data
 * time: continuous time data
 */
export type HvChartAxisType = "continuous" | "categorical" | "time";

/** Axis definition */
export interface HvChartAxis {
  id?: string;
  /** Type: continuous, categorical, or time data. Defaults varies per visualization type and axis orientation. */
  type?: HvChartAxisType;
  /** Formatter for the labels on the axis. */
  labelFormatter?:
    | ((value?: string | number, index?: number) => string)
    | string;
  /** Rotation of the labels on the axis. Defaults to `0`. */
  labelRotation?: number;
  /** Name used for the axis. */
  name?: string;
  /** Maximum value on the axis. Set this property to `max` to use the maximum data value. */
  maxValue?:
    | string
    | number
    | "max"
    | ((obj: {
        max: string | number;
        min: string | number;
      }) => string | number);
  /** Minimum value on the axis. Set this property to `min` to use the maximum data value. */
  minValue?:
    | string
    | number
    | "min"
    | ((obj: {
        max: string | number;
        min: string | number;
      }) => string | number);
}
