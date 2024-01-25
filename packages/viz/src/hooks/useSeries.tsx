import { useMemo } from "react";

import { Arrayable } from "@hitachivantara/uikit-react-core";

import {
  BarSeriesOption,
  LineSeriesOption,
  PieSeriesOption,
} from "echarts/charts";

import { internal } from "arquero";

import { getGroupKey, getMeasure } from "../utils";
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
import { BarFullMeasures, LineFullMeasures } from "../types/measures";

interface HvSeriesHookProps {
  type: "line" | "bar" | "pie";
  data: internal.ColumnTable;
  groupBy: HvChartCommonProps["groupBy"];
  measures:
    | Arrayable<HvLineChartMeasures | HvBarChartMeasures>
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
        .map<LineSeriesOption | BarSeriesOption | PieSeriesOption>((c) => {
          const measure = getMeasure(c, measures);

          let pieOps: PieSeriesOption = {};
          let lineOps: LineSeriesOption = {};
          let barOps: BarSeriesOption = {};

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
                ? (measure as LineFullMeasures | BarFullMeasures).sampling
                : undefined;
            const yAxisId =
              typeof measure !== "string"
                ? (measure as LineFullMeasures | BarFullMeasures).yAxis
                : undefined;
            const stackName =
              typeof measure !== "string"
                ? (measure as LineFullMeasures | BarFullMeasures).stack ??
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
                  ? !(measure as LineFullMeasures).hideSymbol
                  : true;
              const connectNulls =
                typeof measure !== "string" &&
                (measure as LineFullMeasures).emptyCellMode
                  ? (measure as LineFullMeasures).emptyCellMode === "connect"
                  : emptyCellMode === "connect";
              const isArea =
                typeof measure !== "string"
                  ? (measure as LineFullMeasures).area ?? area
                  : area;
              const aOpacity =
                typeof measure !== "string"
                  ? (measure as LineFullMeasures).areaOpacity ?? areaOpacity
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
          } as LineSeriesOption | BarSeriesOption | PieSeriesOption;
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
