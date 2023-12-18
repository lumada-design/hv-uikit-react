import { forwardRef } from "react";

import * as echarts from "echarts/core";
import { PieChart } from "echarts/charts";
import {
  DatasetComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import ReactECharts from "echarts-for-react/lib/core";

import {
  HvChartTooltipClasses,
  useData,
  useDataset,
  useGrid,
  useLegend,
  useOption,
  useSeries,
  useTooltip,
} from "../hooks";

import { HvBaseChart } from "../BaseChart";
import { HvChartCommonProps } from "../types/common";
import { HvDonutChartMeasure } from "../types";

// Register chart components
echarts.use([
  PieChart,
  DatasetComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
]);

export interface HvDonutChartClasses extends HvChartTooltipClasses {}

export interface HvDonutChartProps extends HvChartCommonProps {
  /** Column to measure. */
  measure: HvDonutChartMeasure;
  /** Type: regular or thin. Defaults to `regular`. */
  type?: "regular" | "thin";
  /** Formatter for the slices names used on the tooltips and legend. */
  slicesNameFormatter?: (value?: string) => string;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvDonutChartClasses;
}

/**
 * Donut charts nicely convey the part-whole relationship and they have become
 * the most recognizable chart types for representing proportions in business and data statistics.
 */
export const HvDonutChart = forwardRef<ReactECharts, HvDonutChartProps>(
  (props, ref) => {
    const {
      data,
      groupBy,
      classes,
      legend,
      tooltip,
      measure: measures,
      sortBy,
      grid,
      width,
      height,
      type = "regular",
      slicesNameFormatter,
      onOptionChange,
    } = props;

    const chartData = useData({ data, groupBy, measures, sortBy });

    const chartDataset = useDataset(chartData);

    const chartSeries = useSeries({
      type: "pie",
      data: chartData,
      groupBy,
      measures,
      radius: type === "thin" ? ["65%", "70%"] : ["55%", "70%"],
    });

    const chartLegend = useLegend({
      ...legend,
      show: legend?.show ?? true,
      icon: "square",
      series: chartSeries.series,
      formatter: slicesNameFormatter,
    });

    const chartTooltip = useTooltip({
      ...tooltip,
      measures,
      classes,
      nameFormatter: slicesNameFormatter,
    });

    const chartGrid = useGrid({ ...grid });

    const option = useOption({
      option: {
        ...chartSeries,
        ...chartDataset,
        ...chartLegend,
        ...chartTooltip,
        ...chartGrid,
      },
      onOptionChange,
    });

    return (
      <HvBaseChart ref={ref} option={option} width={width} height={height} />
    );
  }
);
