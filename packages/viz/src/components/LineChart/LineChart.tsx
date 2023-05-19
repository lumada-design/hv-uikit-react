import { useVizTheme } from "@viz/hooks";
import ReactECharts from "echarts-for-react/lib/core";
import { LineChart } from "echarts/charts";
import {
  DatasetComponent,
  GridComponent,
  MarkLineComponent,
  TooltipComponent,
  AriaComponent,
  LegendComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import * as echarts from "echarts/core";
import { useMemo } from "react";
import { AxisType } from "@viz/types";

// Register chart components
echarts.use([
  LineChart,
  CanvasRenderer,
  GridComponent,
  DatasetComponent,
  MarkLineComponent,
  AriaComponent,
  TooltipComponent,
  LegendComponent,
]);

interface Axis {
  /**
   * Type of axis.
   *
   * Defaults to `category` for `xAxis` and `value` for `yAxis`.
   */
  type?: AxisType;
  /**
   * Formatter for the axis labels.
   */
  labelFormatter?:
    | ((value?: string | number, index?: number) => string)
    | string;
  /**
   * Axis name.
   */
  name?: string;
  /**
   * Rotation of the axis labels.
   *
   * Defaults to `0`.
   */
  labelRotation?: number;
}

interface XAxis extends Axis {
  /**
   * Dimension to use for the `xAxis`.
   */
  dimension: string;
}

export interface HvLineChartProps {
  /**
   * Chart data.
   */
  data?:
    | (string | number)[][]
    | Record<string, string | number>[]
    | Record<string, (string | number)[]>;
  /**
   * Data dimensions, i.e. columns.
   */
  dimensions?: string[];
  /**
   * Options for the x axis.
   *
   * `xAxis` will be of type `category` by default.
   */
  xAxis: XAxis;
  /**
   * Options for the y axis.
   *
   * `yAxis` will be of type `value` by default.
   */
  yAxis?: Axis;
  /**
   * Options for the tooltip.
   *
   * The tooltip is shown by default.
   */
  tooltip?: {
    /**
     * Whether to show the tooltip or not.
     *
     * Defaults to `true`.
     */
    show?: boolean;
    /**
     * Formats the value in the tooltip.
     */
    valueFormatter?:
      | ((value?: string | number, index?: number) => string)
      | string;
  };
  /**
   * Options for the legend.
   *
   * If multiple series are defined, the legend will appear by default.
   */
  legend?: {
    /**
     * Whether to show the legend or not.
     *
     * Defaults to `true`.
     */
    show?: boolean;
  };
  /**
   * Chart type.
   *
   * The `type` provided in `series` will override this one.
   *
   * Defaults to `line`.
   */
  type?: "line" | "area";
  /**
   * Series to be shown in the chart.
   */
  series: {
    /**
     * Dimension to use for the `yAxis`.
     */
    dimension: string;
    /**
     * Chart type for the series.
     *
     * Defaults to `line`.
     */
    type?: "line" | "area";
    /**
     * Series name. This name will be used in the tooltip and legend.
     *
     * If this is not set, the dimension names will be used.
     */
    name?: string;
  }[];
}

/**
 * A line chart or line plot or line graph is a type of chart which displays information as a series of data points
 * connected by straight line segments. It is a basic type of chart common in many fields.
 * Our implementation leverages the ECharts charting library.
 *
 * The data provided to the chart should describe a table where the `dimensions` of your chart are the table columns
 * and `data` can have different formats to describe the rows:
 *
 * - 2D array where each array is a table row:
 *
 * ```
 * [
 *  ["January", 5929],
 *  ["February", 2393],
 *  ["March", 1590],
 *  ["April", 7817],
 * ]
 * ```
 *
 * - Object array where each object is a table row:
 *
 * ```
 * [
 *  { month: "January", sales: 5929 },
 *  { month: "February", sales: 2393 },
 *  { month: "March", sales: 1590 },
 *  { month: "April", sales: 7817 },
 * ]
 * ```
 *
 * - Object where each key is a dimension:
 *
 * ```
 * {
 *   month: ["January", "February", "March", "April"],
 *   sales: [5929, 2393, 1590, 7817],
 * }
 * ```
 */
export const HvLineChart = ({
  dimensions,
  data,
  xAxis,
  yAxis,
  tooltip,
  series,
  legend,
  type = "line",
}: HvLineChartProps) => {
  const { theme } = useVizTheme();

  const chartData = useMemo(() => {
    return {
      dataset: {
        sourceHeader: false,
        dimensions,
        source: data,
      },
    };
  }, [data, dimensions]);

  const chartXAxis = useMemo(() => {
    return {
      xAxis: {
        type: xAxis?.type || "category",
        name: xAxis?.name,
        axisLabel: {
          rotate: xAxis?.labelRotation ?? 0,
          formatter: xAxis?.labelFormatter,
        },
      },
    };
  }, [xAxis]);

  const chartYAxis = useMemo(() => {
    return {
      yAxis: {
        type: yAxis?.type || "value",
        name: yAxis?.name,
        axisLabel: {
          rotate: yAxis?.labelRotation ?? 0,
          formatter: yAxis?.labelFormatter,
        },
      },
    };
  }, [yAxis]);

  const chartSeries = useMemo(() => {
    return {
      series: series.map((s) => {
        return {
          encode: {
            x: xAxis.dimension,
            y: s.dimension,
          },
          type: "line",
          name: s.name || s.dimension,
          areaStyle: s.type
            ? s.type === "area"
              ? {}
              : undefined
            : type === "area"
            ? {}
            : undefined,
        };
      }),
    };
  }, [series, xAxis, type]);

  const chartTooltip = useMemo(() => {
    return {
      tooltip: {
        show: tooltip?.show ?? true,
        trigger: "axis",
        valueFormatter: tooltip?.valueFormatter,
      },
    };
  }, [tooltip]);

  const chartLegend = useMemo(() => {
    return {
      legend: {
        show: legend?.show ?? chartSeries.series.length > 1,
      },
    };
  }, [chartSeries, legend]);

  return (
    <ReactECharts
      echarts={echarts}
      option={{
        aria: {
          enabled: true,
        },
        ...chartData,
        ...chartXAxis,
        ...chartYAxis,
        ...chartSeries,
        ...chartTooltip,
        ...chartLegend,
      }}
      theme={theme}
    />
  );
};
