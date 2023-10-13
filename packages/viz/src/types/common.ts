import { Arrayable } from "@hitachivantara/uikit-react-core";

import { HvChartTooltip } from "./tooltip";
import { HvChartGrid } from "./grid";
import { HvChartData } from "./generic";
import { HvChartSortBy } from "./sort";
import { HvChartLegend } from "./legend";
import { HvChartHorizontalRangeSlider } from "./slider";
import { HvChartAxis } from "./axis";

// Note: These types should not be exported at the moment since they can change over time.

// The "EChartsOption" type is set as "any" which is not very helpful.
// This type was created to have something a little bit more specific.
export type HvEChartsOption = Record<string, any>;

/** Props common among all charts. */
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
  /** Chart width. */
  width?: number;
  /** Chart height. */
  height?: number;
  /**
   * Callback called when the ECharts option changes.
   * This prop can be used to customize the option before rendering the chart.
   * For more information about the ECharts option and the available properties, take a look at their [documentation](https://echarts.apache.org/en/option.html).
   */
  onOptionChange?: (option: HvEChartsOption) => HvEChartsOption;
}

export interface HvChartXAxis extends HvChartAxis {
  /** Position of the axis. */
  position?: "top" | "bottom";
}

export interface HvChartYAxis extends HvChartAxis {
  /** Position of the axis. */
  position?: "left" | "right";
}

/** Axis charts (line and bar) common props  */
export interface HvAxisChartCommonProps {
  /** Columns to use to split the measures. */
  splitBy?: Arrayable<string>;
  /** Options for the xAxis, i.e. the horizontal axis. */
  xAxis?: HvChartXAxis;
  /** Options for the yAxis, i.e. the vertical axis. */
  yAxis?: HvChartYAxis | [HvChartYAxis, HvChartYAxis];
  /** Stack name to use when all the series should be stacked together. If not provided, the series are not stacked. */
  stack?: string;
  /** Ranger slider options for the horizontal axis. */
  horizontalRangeSlider?: HvChartHorizontalRangeSlider;
  /** Formatter for the series names used on the tooltips and legend. */
  seriesNameFormatter?: (value?: string) => string;
}
