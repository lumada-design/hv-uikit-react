import { useMemo } from "react";
import { internal } from "arquero";
import {
  BarSeriesOption,
  LineSeriesOption,
  PieSeriesOption,
  ScatterSeriesOption,
} from "echarts/charts";
import { Arrayable } from "@hitachivantara/uikit-react-core";

import {
  HvBarChartMeasures,
  HvChartEmptyCellMode,
  HvDonutChartMeasure,
  HvLineChartMeasures,
} from "../types";
import {
  HvAxisChartCommonProps,
  HvChartCommonProps,
  HvEChartsOption,
} from "../types/common";
import {
  BarFullMeasure,
  HvScatterPlotMeasure,
  LineFullMeasure,
  ScatterPlotMeasure,
} from "../types/measures";
import { getGroupKey, getMeasure } from "../utils";

interface HvSeriesHookProps {
  type: "line" | "bar" | "pie" | "scatter";
  data: internal.ColumnTable;
  groupBy: HvChartCommonProps["groupBy"];
  measures:
    | Arrayable<HvLineChartMeasures | HvBarChartMeasures | HvScatterPlotMeasure>
    | HvDonutChartMeasure;
  area?: boolean;
  areaOpacity?: number;
  emptyCellMode?: HvChartEmptyCellMode;
  stack?: HvAxisChartCommonProps["stack"];
  nameFormatter?: HvAxisChartCommonProps["seriesNameFormatter"];
  horizontal?: boolean;
  radius?: number | string | (number | string)[];
}

export const useSeries = ({
  groupBy,
  type,
  data,
  measures,
  nameFormatter,
  stack,
  horizontal = false,
  area = false,
  areaOpacity = 0.5,
  emptyCellMode,
  radius,
}: HvSeriesHookProps) => {
  const groupByKey = getGroupKey(groupBy);

  const option: Pick<HvEChartsOption, "series"> = useMemo<
    Pick<HvEChartsOption, "series">
  >(() => {
    return {
      series: data
        .columnNames()
        .filter((c) => c !== groupByKey)
        .map<
          | LineSeriesOption
          | BarSeriesOption
          | PieSeriesOption
          | ScatterSeriesOption
        >((c) => {
          const measure = getMeasure(c, measures);

          let pieOps: PieSeriesOption = {};
          let lineOps: LineSeriesOption = {};
          let barOps: BarSeriesOption = {};
          let scatterOps: ScatterSeriesOption = {};

          // scatter
          if (type === "scatter") {
            const yAxisId =
              typeof measure !== "string"
                ? (measure as ScatterPlotMeasure).yAxis
                : undefined;
            scatterOps = {
              yAxisId,
              encode: {
                x: groupByKey,
                y: c,
              },
            };
          }

          // pie
          if (type === "pie") {
            pieOps = {
              encode: {
                value: c,
                itemName: groupByKey,
              },
              labelLine: {
                show: false,
              },
              label: {
                show: false,
              },
              emphasis: {
                label: {
                  show: false,
                },
              },
              radius,
            };
          }

          // line or bar
          if (type === "line" || type === "bar") {
            const sampling =
              typeof measure !== "string"
                ? (measure as LineFullMeasure | BarFullMeasure).sampling
                : undefined;
            const yAxisId =
              typeof measure !== "string"
                ? (measure as LineFullMeasure | BarFullMeasure).yAxis
                : undefined;
            const stackName =
              typeof measure !== "string"
                ? (measure as LineFullMeasure | BarFullMeasure).stack ??
                  stack ??
                  undefined
                : stack ?? undefined;

            const axisOps = {
              sampling,
              yAxisId,
              stack: stackName,
              encode: horizontal
                ? {
                    x: c,
                    y: groupByKey,
                  }
                : {
                    x: groupByKey,
                    y: c,
                  },
            };

            // bar
            if (type === "bar") {
              barOps = {
                ...axisOps,
                barMaxWidth: 90,
                barMinWidth: 3,
              };
            }

            // line
            if (type === "line") {
              const showSymbol =
                typeof measure !== "string"
                  ? !(measure as LineFullMeasure).hideSymbol
                  : true;
              const connectNulls =
                typeof measure !== "string" &&
                (measure as LineFullMeasure).emptyCellMode
                  ? (measure as LineFullMeasure).emptyCellMode === "connect"
                  : emptyCellMode === "connect";
              const isArea =
                typeof measure !== "string"
                  ? (measure as LineFullMeasure).area ?? area
                  : area;
              const aOpacity =
                typeof measure !== "string"
                  ? (measure as LineFullMeasure).areaOpacity ?? areaOpacity
                  : areaOpacity;

              lineOps = {
                ...axisOps,
                connectNulls,
                showSymbol,
                areaStyle: isArea ? { opacity: aOpacity } : undefined,
              };
            }
          }

          return {
            id: `series~${groupByKey}~${c}`,
            type,
            name: nameFormatter ? nameFormatter(c) : c,
            ...pieOps,
            ...barOps,
            ...lineOps,
            ...scatterOps,
          } as
            | LineSeriesOption
            | BarSeriesOption
            | PieSeriesOption
            | ScatterSeriesOption;
        }),
    };
  }, [
    data,
    groupByKey,
    measures,
    type,
    nameFormatter,
    radius,
    stack,
    horizontal,
    emptyCellMode,
    area,
    areaOpacity,
  ]);

  return option;
};
