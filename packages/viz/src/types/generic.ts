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

/** Sampling functions */
export type HvChartSampling =
  | "none"
  | "average"
  | "min"
  | "max"
  | "sum"
  | "lttb";

/** Tooltip type */
export const tooltipType = ["single", "multiple"] as const;
export type HvChartTooltipType = (typeof tooltipType)[number];

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

export interface HvChartTooltipParams {
  title?: string | number;
  series?: {
    name?: string;
    value?: string | number;
    color?: string;
  }[];
}

export interface HvChartTooltip {
  /** Whether to show the tooltip or not. Defaults to `true`. */
  show?: boolean;
  /** Tooltip type: single line or multiple lines modes. The single line mode should only be used when there's one series. Defaults to `multiple`. */
  type?: HvChartTooltipType;
  /** Formatter for the value in the tooltip. */
  valueFormatter?: (value?: string | number) => string;
  /** Formatter for the title in the tooltip. */
  titleFormatter?: (value?: string | number) => string;
  /** Custom tooltip. */
  component?:
    | string
    | ((params?: HvChartTooltipParams) => string | HTMLElement | HTMLElement[]);
}

export interface HvChartGrid {
  /** Distance between the grid and the top of the container. */
  top?: string | number;
  /** Distance between the grid and the right side of the container. */
  right?: string | number;
  /** Distance between the grid and the left side of the container. */
  left?: string | number;
  /** Distance between the grid and the bottom of the container. */
  bottom?: string | number;
}
