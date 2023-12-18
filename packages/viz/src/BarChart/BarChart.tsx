import { forwardRef } from "react";

import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";
import {
  DatasetComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomSliderComponent,
  DataZoomInsideComponent,
} from "echarts/components";
import ReactECharts from "echarts-for-react/lib/core";

import { Arrayable } from "@hitachivantara/uikit-react-core";

import {
  useXAxis,
  useYAxis,
  useDataZoom,
  useGrid,
  useData,
  useDataset,
  useSeries,
  useLegend,
  useTooltip,
  useOption,
  HvChartTooltipClasses,
} from "@viz/hooks";

import { HvBarChartMeasures } from "../types";
import { HvBaseChart } from "../BaseChart";
import { HvAxisChartCommonProps, HvChartCommonProps } from "../types/common";

// Register chart components
echarts.use([
  BarChart,
  DatasetComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomSliderComponent,
  DataZoomInsideComponent,
]);

export interface HvBarChartClasses extends HvChartTooltipClasses {}

export interface HvBarChartProps
  extends HvAxisChartCommonProps,
    HvChartCommonProps {
  /**  Columns to measure on the chart. */
  measures: Arrayable<HvBarChartMeasures>;
  /** Whether the bar chart should be horizontal. Defaults to `false`. */
  horizontal?: boolean;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvBarChartClasses;
}

/**
 * A bar chart is a chart or graph that presents categorical data with rectangular bars.
 */
export const HvBarChart = forwardRef<ReactECharts, HvBarChartProps>(
  (props, ref) => {
    const {
      yAxis,
      xAxis,
      horizontal = false,
      horizontalRangeSlider,
      grid,
      data,
      groupBy,
      splitBy,
      sortBy,
      stack,
      seriesNameFormatter,
      measures,
      legend,
      tooltip,
      classes,
      height,
      width,
      onOptionChange,
    } = props;

    const chartData = useData({ data, groupBy, sortBy, splitBy, measures });

    const chartDataset = useDataset(chartData);

    const chartYAxis = useYAxis({
      axes: Array.isArray(yAxis) || yAxis == null ? yAxis : [yAxis],
      defaultType: horizontal ? "categorical" : "continuous",
    });

    const chartXAxis = useXAxis({
      type: horizontal ? "continuous" : "categorical",
      ...xAxis,
    });

    const chartSlider = useDataZoom({
      showHorizontal: horizontalRangeSlider?.show,
    });

    const chartGrid = useGrid({ ...grid });

    const chartSeries = useSeries({
      type: "bar",
      data: chartData,
      groupBy,
      measures,
      stack,
      nameFormatter: seriesNameFormatter,
      horizontal,
    });

    const chartLegend = useLegend({
      ...legend,
      series: chartSeries.series,
      icon: "square",
    });

    const chartTooltip = useTooltip({
      ...tooltip,
      trigger: "axis",
      measures,
      classes,
      horizontal,
    });

    const option = useOption({
      option: {
        ...chartYAxis,
        ...chartXAxis,
        ...chartSlider,
        ...chartGrid,
        ...chartDataset,
        ...chartSeries,
        ...chartLegend,
        ...chartTooltip,
      },
      onOptionChange,
    });

    return (
      <HvBaseChart ref={ref} option={option} width={width} height={height} />
    );
  }
);
