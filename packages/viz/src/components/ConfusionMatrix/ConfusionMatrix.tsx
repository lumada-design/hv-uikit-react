import { useMemo } from "react";

import { Arrayable, ExtractNames } from "@hitachivantara/uikit-react-core";

import * as echarts from "echarts/core";
import { HeatmapChart } from "echarts/charts";
import {
  VisualMapComponent,
  GridComponent,
  TooltipComponent,
} from "echarts/components";

import {
  HvVisualMapHookProps,
  useData,
  useGrid,
  useTooltip,
  useVisualMap,
  useXAxis,
  useYAxis,
} from "@viz/hooks";
import { getGroupKey } from "@viz/utils";

import { HvBaseChart } from "../BaseChart";
import { useClasses } from "./ConfusionMatrix.styles";
import {
  HvChartCommonProps,
  HvChartXAxis,
  HvChartYAxis,
} from "../../types/common";
import { HvChartTooltip } from "../../types/tooltip";
import { HvConfusionMatrixMeasure } from "../../types/measures";
import { useColorScale, useGridLayout, useSeries } from "./utils";
import {
  HvConfusionMatrixFormat,
  HvConfusionMatrixColorScale,
  HvConfusionMatrixValuesProps,
} from "./types";

// Register chart components
echarts.use([
  HeatmapChart,
  VisualMapComponent,
  GridComponent,
  TooltipComponent,
]);

export type HvConfusionMatrixClasses = ExtractNames<typeof useClasses>;

export interface HvConfusionMatrixProps
  extends Omit<HvChartCommonProps, "tooltip"> {
  /** Column to measure. */
  measure: HvConfusionMatrixMeasure;
  /** Columns to use to split the measure. */
  splitBy?: Arrayable<string>;
  /**
   * Column to use for the delta confusion matrix.
   *
   * It can be set to `true` in case the `measure` already has the calculations for the delta confusion matrix.
   */
  delta?: boolean | string;
  /** Options for the xAxis, i.e. the horizontal axis. */
  xAxis?: HvChartXAxis;
  /** Options for the yAxis, i.e. the vertical axis. */
  yAxis?: HvChartYAxis;
  /** Tooltip options. */
  tooltip?: Omit<HvChartTooltip, "type">;
  /** Format of the confusion matrix. Defaults to `square`. */
  format?: HvConfusionMatrixFormat;
  /** Properties to customize the prediction values. */
  valuesProps?: HvConfusionMatrixValuesProps;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvConfusionMatrixClasses;
  /**
   * Color scale of the confusion matrix.
   *
   * If an array of two strings is provided, the first and second values are the lower and upper ends of the scale, respectively.
   * An array of objects can also be used to create a custom scale.
   * If `delta` is not provided, a default color scale is used when `colorScale` is not defined: `[base-light, cat3]`.
   */
  colorScale?: [string, string] | HvConfusionMatrixColorScale[];
}

/**
 * Confusion Matrix is a table displaying the performance of a predictive model.
 * Typically the columns show the predicted class and the rows the expected class.
 * The main diagonal counts the positive matches while the cells outside it count the mismatches between predicted and expected.
 */
export const HvConfusionMatrix = ({
  legend,
  groupBy,
  measure,
  sortBy,
  splitBy,
  grid,
  data: dataProp,
  tooltip,
  xAxis,
  yAxis,
  colorScale: colorScaleProp,
  delta,
  valuesProps,
  width,
  height,
  format = "square",
  classes: classesProp,
}: HvConfusionMatrixProps) => {
  const { classes } = useClasses(classesProp);

  const groupByKey = getGroupKey(groupBy);

  const chartData = useData({
    data: dataProp,
    groupBy,
    measures: [measure],
    sortBy: sortBy ?? groupBy, // automatically orders x axis to create the confusion matrix
    splitBy,
    delta: typeof delta === "string" ? delta : undefined,
  });

  const colorScale = useColorScale({
    delta: !!delta,
    data: chartData,
    custom: colorScaleProp,
    filterKey: groupByKey,
  });

  const chartVisualMap = useVisualMap({
    show: colorScale?.pieces != null,
    type: colorScale?.pieces != null ? "piecewise" : "continuous",
    ...(colorScale as Pick<
      HvVisualMapHookProps,
      "max" | "min" | "colorScale" | "pieces"
    >),
    ...legend,
  });

  const chartTooltip = useTooltip({
    component: (params) => {
      const value = params?.series?.[0].value;
      const fmtValue =
        typeof measure !== "string" && measure.valueFormatter
          ? measure.valueFormatter(value)
          : tooltip?.valueFormatter
          ? tooltip?.valueFormatter(value)
          : value;
      const ftmTitle = tooltip?.titleFormatter
        ? tooltip.titleFormatter(params?.title)
        : params?.title;

      const content = `${ftmTitle} - ${params?.series?.[0].name}: ${fmtValue}`;

      return `
        <div class="${classes.tooltipRoot}">
            <div class="${classes.tooltipContainer}">
                <div>
                    <p class="${classes.tooltipText}">${content}</p>
                </div>
            </div>
        </div>`;
    },
    ...tooltip,
  });

  const chartYAxis = useYAxis({
    axes: [
      {
        type: "categorical",
        name: "True Label",
        position: "left",
        ...yAxis,
        nameProps: {
          location: "center",
          padding:
            yAxis?.nameProps?.location == null ||
            yAxis?.nameProps?.location === "center"
              ? yAxis?.position === "right"
                ? [50, 0, 0, 0]
                : [0, 0, 50, 0]
              : undefined,
          ...yAxis?.nameProps,
        },
        data: chartData
          .columnNames()
          .filter((p) => p !== groupByKey)
          .reverse(),
      },
    ],
  });

  const chartXAxis = useXAxis({
    name: "Predicted Value",
    position: "top",
    ...xAxis,
    nameProps: {
      location: "center",
      padding:
        xAxis?.nameProps?.location == null ||
        xAxis?.nameProps?.location === "center"
          ? xAxis?.position === "bottom"
            ? [30, 0, 0, 0]
            : [0, 0, 30, 0]
          : undefined,
      ...xAxis?.nameProps,
    },
    data: chartData.array(groupByKey),
  });

  const chartSeries = useSeries({
    data: chartData,
    filterKey: groupByKey,
    valuesProps,
    delta: !!(delta && colorScale == null),
  });

  const chartGridLayout = useGridLayout({
    data: chartData,
    format,
    filterKey: groupByKey,
    visualMapVisible: chartVisualMap.visualMap.show,
    visualMapYPosition: chartVisualMap.visualMap.top,
    xAxisPosition: chartXAxis.xAxis.position,
  });

  const chartGrid = useGrid({
    // If sizes are provided, the grid size should automatically adapt to the values provided
    width: width != null ? undefined : chartGridLayout.size.width,
    height: height != null ? undefined : chartGridLayout.size.height,
    ...chartGridLayout.padding,
    ...grid,
  });

  const size = useMemo(() => {
    return {
      width,
      // Echarts has a problem were the height is always set to 300px
      // Thus, we need to update the height to make sure the chart is not cut out
      height:
        height ??
        chartGridLayout.size.height +
          chartGridLayout.padding.bottom +
          chartGridLayout.padding.top,
    };
  }, [
    chartGridLayout.padding.bottom,
    chartGridLayout.padding.top,
    chartGridLayout.size.height,
    height,
    width,
  ]);

  const options = useMemo(() => {
    return {
      ...chartVisualMap,
      ...chartTooltip,
      ...chartGrid,
      ...chartXAxis,
      ...chartYAxis,
      ...chartSeries,
    };
  }, [
    chartVisualMap,
    chartTooltip,
    chartGrid,
    chartYAxis,
    chartSeries,
    chartXAxis,
  ]);

  return <HvBaseChart options={options} {...size} />;
};
