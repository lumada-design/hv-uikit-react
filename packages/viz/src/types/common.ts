import { Arrayable } from "@hitachivantara/uikit-react-core";

import { HvChartTooltip } from "./tooltip";
import { HvChartGrid } from "./grid";
import { HvChartData } from "./generic";
import { HvChartSortBy } from "./sort";
import { HvChartLegend } from "./legend";
import { HvChartHorizontalRangeSlider } from "./slider";
import { HvChartAxis } from "./axis";

// Note: These types should not be exported for now since they can change over time.

/** Props common among all charts.  */
export interface HvChartCommonProps {
  /** Chart data. */
  data: HvChartData;
  /** Columns to use to group the data. */
  groupBy: Arrayable<string>;
  /** Columns to use to sort the data points. */
  sortBy?: Arrayable<HvChartSortBy>;
  /** Tooltip options. */
  tooltip?: HvChartTooltip;
  /** Legend options. */
  legend?: HvChartLegend;
  /** Grid options. */
  grid?: HvChartGrid;
}

/** Axis charts (line and bar) common props  */
export interface HvAxisChartCommonProps {
  /** Columns to use to split the measures. */
  splitBy?: Arrayable<string>;
  /** Options for the xAxis, i.e. the horizontal axis. */
  xAxis?: HvChartAxis;
  /** Options for the yAxis, i.e. the vertical axis. */
  yAxis?: HvChartAxis | [HvChartAxis, HvChartAxis];
  /** Stack name to use when all the series should be stacked together. If not provided, the series are not stacked. */
  stack?: string;
  /** Ranger slider options for the horizontal axis. */
  horizontalRangeSlider?: HvChartHorizontalRangeSlider;
  /** Formatter for the series names used on the tooltips and legend. */
  seriesNameFormatter?: (value?: string) => string;
}
