import { HvChartEmptyCellMode } from "./generic";

/** Sampling functions */
export type HvChartSampling =
  | "none"
  | "average"
  | "min"
  | "max"
  | "sum"
  | "lttb";

/** Aggregation functions */
export type HvChartAggregation = "sum" | "average" | "min" | "max" | "count";

interface BaseMeasures {
  /** Column name. */
  field: string;
  /** Aggregation function to use. If no `agg` is defined, it will default to `sum`. */
  agg?: HvChartAggregation;
  /** Formatter for the value. This will be used in the tooltips and overrides the tooltip's value formatter. */
  valueFormatter?: (value?: string | number) => string;
}

interface AxisMeasures {
  /** Id of the yAxis. */
  yAxis?: string;
  /**
   * Stack name to use when the measure should be stacked.
   *
   * Measures stacked together have the same name.
   *
   * If not specified, it defaults to the global `stacked` prop.
   */
  stack?: string;
  /** Sampling function to use. */
  sampling?: HvChartSampling;
}

export interface LineFullMeasures extends BaseMeasures, AxisMeasures {
  /** Whether to hide the symbol for data points. Defaults to `false`. */
  hideSymbol?: boolean;
  /** Whether the area under the lines should be filled. If not specified, it defaults to the global `area` prop. */
  area?: boolean;
  /** Sets opacity of the filled area if `area` is true. If not specified, it defaults to the global `areaOpacity` prop. */
  areaOpacity?: number;
  /** Strategy to use when there are empty cells. If not specified, it defaults to the global `emptyCellMode` prop. */
  emptyCellMode?: HvChartEmptyCellMode;
}

export interface BarFullMeasures extends BaseMeasures, AxisMeasures {}

export interface DonutFullMeasures extends BaseMeasures {}

export type HvLineChartMeasures = string | LineFullMeasures;

export type HvBarChartMeasures = string | BarFullMeasures;

export type HvDonutChartMeasure = string | DonutFullMeasures;
