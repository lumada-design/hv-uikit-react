import { forwardRef } from "react";
import ReactECharts from "echarts-for-react/lib/core";
import { ScatterChart } from "echarts/charts";
import {
  DatasetComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  TooltipComponent,
} from "echarts/components";
import * as echarts from "echarts/core";
import { Arrayable } from "@hitachivantara/uikit-react-core";

import { HvBaseChart } from "../BaseChart";
import {
  HvChartTooltipClasses,
  useData,
  useDataset,
  useDataZoom,
  useGrid,
  useLegend,
  useOption,
  useSeries,
  useTooltip,
  useXAxis,
  useYAxis,
} from "../hooks";
import { HvAxisChartCommonProps, HvChartCommonProps } from "../types/common";
import { HvScatterPlotMeasure } from "../types/measures";

// Register chart components
echarts.use([
  ScatterChart,
  DatasetComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomSliderComponent,
  DataZoomInsideComponent,
  MarkLineComponent,
]);

export interface HvScatterPlotClasses extends HvChartTooltipClasses {}

export interface HvScatterPlotProps
  extends HvChartCommonProps,
    Omit<HvAxisChartCommonProps, "stack"> {
  /** Columns to measure on the plot. */
  measures: Arrayable<HvScatterPlotMeasure>;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvScatterPlotClasses;
}

/**
 * A scatter plot is a type of chart which displays dots to represent two numeric variables.
 * This type of chart is used to determine the relationship between two variables.
 */
export const HvScatterPlot = forwardRef<ReactECharts, HvScatterPlotProps>(
  (props, ref) => {
    const {
      yAxis,
      xAxis,
      horizontalRangeSlider,
      grid,
      data,
      groupBy,
      splitBy,
      sortBy,
      measures,
      seriesNameFormatter,
      legend,
      classes,
      tooltip,
      width,
      height,
      onOptionChange,
      ...others
    } = props;

    const chartData = useData({ data, groupBy, measures, splitBy, sortBy });

    const chartDataset = useDataset(chartData);

    const chartYAxis = useYAxis({
      axes: Array.isArray(yAxis) || yAxis == null ? yAxis : [yAxis],
    });

    const chartXAxis = useXAxis({ type: "continuous", ...xAxis });

    const chartSlider = useDataZoom({
      showHorizontal: horizontalRangeSlider?.show,
    });

    const chartGrid = useGrid({ ...grid });

    const chartSeries = useSeries({
      type: "scatter",
      data: chartData,
      groupBy,
      measures,
      nameFormatter: seriesNameFormatter,
    });

    const chartLegend = useLegend({
      ...legend,
      series: chartSeries.series,
    });

    const chartTooltip = useTooltip({
      ...tooltip,
      trigger: "axis",
      measures,
      classes,
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
      <HvBaseChart
        ref={ref}
        option={option}
        width={width}
        height={height}
        {...others}
      />
    );
  },
);
