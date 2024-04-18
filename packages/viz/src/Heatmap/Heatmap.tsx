import { forwardRef } from "react";
import ReactECharts from "echarts-for-react/lib/core";
import { HeatmapChart } from "echarts/charts";
import { TooltipComponent, VisualMapComponent } from "echarts/components";
import * as echarts from "echarts/core";
import { ExtractNames, useTheme } from "@hitachivantara/uikit-react-core";

import { HvBaseChart } from "../BaseChart";
import {
  useOption,
  useTooltip,
  useVisualMap,
  useXAxis,
  useYAxis,
} from "../hooks";
import { HvChartTooltip } from "../types";
import { HvChartCommonProps, XAxis, YAxis } from "../types/common";
import { useClasses } from "./Heatmap.styles";

// Register chart components
echarts.use([HeatmapChart, TooltipComponent, VisualMapComponent]);

export type HvHeatmapClasses = ExtractNames<typeof useClasses>;

export type HvHeatmapItem = Array<number | string>;

export type HvHeatmapData = Array<HvHeatmapItem>;

export interface HvHeatmapProps
  extends Omit<
    HvChartCommonProps,
    "data" | "groupBy" | "sortBy" | "grid" | "legend" | "tooltip"
  > {
  /** The name of the heatmap */
  name?: string;
  /** The data to use on the heatmap */
  data?: HvHeatmapData;
  /** The min value of the Heatmap */
  min: number;
  /** The max value of the Heatmap */
  max: number;
  /** The X axis defintion */
  xAxis?: XAxis;
  /** The Y axis definition. */
  yAxis?: YAxis;
  /** The tooltip options. */
  tooltip?: Omit<HvChartTooltip, "type">;
  /** Color scale of the confusion matrix. Accepts an array of strings spanning from the lower to the upper ends of the scale. */
  colorScale?: string[];
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvHeatmapClasses;
}

/**
 * A Heatmap uses color gradients to represent data intensity across a surface.
 */
export const HvHeatmap = forwardRef<ReactECharts, HvHeatmapProps>(
  (props, ref) => {
    const {
      name,
      data,
      min,
      max,
      colorScale,
      xAxis,
      yAxis,
      classes: classesProp,
      tooltip,
      width,
      height,
      onOptionChange,
      ...others
    } = props;

    const { classes } = useClasses(classesProp);
    const { colors } = useTheme();

    const chartTooltip = useTooltip({
      component: (params) => {
        const value = params?.value;
        const title = params?.title;

        const valueToShow = value
          ? `${yAxis?.data?.[value?.[1]]} - ${xAxis?.data?.[value?.[0]]}: ${params?.series?.[0]?.name}`
          : "-";

        return `
          <div class="${classes.tooltipRoot}">
            <div class="${classes.tooltipContainer}">
              <div>
              <p class="${classes.tooltipText}">${title}</p>
              <p class="${classes.tooltipText}">${valueToShow}</p>
              </div>
            </div>
          </div>`;
      },
      ...tooltip,
    });

    const chartXAxis = useXAxis({ type: "categorical", ...xAxis });
    const chartYAxis = useYAxis({
      defaultType: "categorical",
      axes: yAxis ? [yAxis] : [],
    });

    const chartVisualMap = useVisualMap({
      min,
      max,
      orient: "horizontal",
      left: "center",
      calculable: true,
      position: {
        y: "bottom",
      },
      colorScale: colorScale || [colors?.cat1_180 || "", colors?.cat1_20 || ""],
    });

    const option = useOption({
      option: {
        xAxis: chartXAxis.xAxis,
        yAxis: chartYAxis.yAxis,
        visualMap: chartVisualMap.visualMap,
        series: [
          {
            name,
            type: "heatmap",
            data,
            label: {
              show: true,
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
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
