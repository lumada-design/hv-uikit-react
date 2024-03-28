import { useCallback, useMemo } from "react";
import type ColumnTable from "arquero/dist/types/table/column-table";
import { useTheme } from "@hitachivantara/uikit-react-core";

import { HvChartXAxis } from "../types/common";
import {
  HvConfusionMatrixColorScale,
  HvConfusionMatrixFormat,
  HvConfusionMatrixValuesProps,
} from "./types";

export const useColorScale = ({
  data,
  delta,
  custom,
  filterKey,
}: {
  data: ColumnTable;
  delta: boolean;
  filterKey: string;
  custom?: [string, string] | HvConfusionMatrixColorScale[];
}) => {
  const { colors } = useTheme();

  const colorScale = useMemo(() => {
    if (custom == null && delta) {
      return;
    }

    if (custom && typeof custom[0] === "object") {
      return {
        pieces: (custom as HvConfusionMatrixColorScale[]).reduce(
          (acc: HvConfusionMatrixColorScale[], curr) => {
            acc.push({
              ...curr,
              color: colors?.[curr.color] || curr.color,
            });
            return acc;
          },
          [],
        ),
      };
    }

    const flatData = data
      .columnNames()
      .filter((p) => p !== filterKey)
      .reduce((acc: number[], c: string) => {
        acc.push(...data.array(c));
        return acc;
      }, []);
    const max = Math.max(...flatData);
    const min = Math.min(...flatData);

    return {
      colorScale: custom || [colors?.base_light || "", colors?.cat3 || ""],
      max,
      min,
    };
  }, [colors, custom, data, filterKey, delta]);

  return colorScale;
};

export const useSeries = ({
  data,
  filterKey,
  delta,
  valuesProps,
}: {
  data: ColumnTable;
  filterKey: string;
  delta: boolean;
  valuesProps?: HvConfusionMatrixValuesProps;
}) => {
  const { colors } = useTheme();

  const getDeltaColor = useCallback(
    (value: number, diagonal: boolean) => {
      if ((diagonal && value > 0) || (!diagonal && value < 0)) {
        return colors?.positive;
      }
      if ((diagonal && value < 0) || (!diagonal && value > 0)) {
        return colors?.negative;
      }

      return colors?.base_light;
    },
    [colors],
  );

  const chartSeries = useMemo(() => {
    return {
      series: {
        id: `series~${filterKey}`,
        type: "heatmap",
        label: {
          show: true,
          ...valuesProps,
          ...(valuesProps?.color && {
            color: colors?.[valuesProps.color] || valuesProps.color,
          }),
        },
        emphasis: {
          disabled: true,
        },
        data: data
          .columnNames()
          .filter((p) => p !== filterKey)
          .reduce((acc: (string | number)[][], c: string, j) => {
            const row: (string | number)[][] = data
              .array(c)
              .reduce((racc, rv, i) => {
                racc.push({
                  value: [data.array(filterKey)[i], c, rv != null ? rv : "-"],
                  ...(delta && {
                    visualMap: false,
                    itemStyle: {
                      color: getDeltaColor(rv, i === j),
                    },
                  }),
                });
                return racc;
              }, []);

            acc.push(...row);
            return acc;
          }, []),
      },
    };
  }, [colors, data, delta, filterKey, getDeltaColor, valuesProps]);

  return chartSeries;
};

const SQUARE_SIZE = 52;

export const useGridLayout = ({
  data,
  filterKey,
  format,
  xAxisPosition,
  visualMapVisible,
  visualMapYPosition,
}: {
  xAxisPosition: HvChartXAxis["position"];
  data: ColumnTable;
  filterKey: string;
  format: HvConfusionMatrixFormat;
  visualMapVisible: boolean;
  visualMapYPosition: "top" | "center" | "bottom";
}) => {
  const size = useMemo(() => {
    const nCols = data.array(filterKey).length;
    const nRows = data.columnNames().filter((p) => p !== filterKey).length;
    const itemHeight = format === "square" ? SQUARE_SIZE : SQUARE_SIZE / 2;

    return {
      padding: {
        bottom:
          xAxisPosition === "bottom" ||
          (visualMapVisible && visualMapYPosition === "bottom")
            ? 60
            : 20,
        top:
          xAxisPosition === "top" ||
          (visualMapVisible && visualMapYPosition === "top")
            ? 60
            : 20,
        ...(visualMapVisible &&
          visualMapYPosition === "bottom" &&
          xAxisPosition === "bottom" && {
            bottom: 100,
          }),
        ...(visualMapVisible &&
          visualMapYPosition === "top" &&
          xAxisPosition === "top" && {
            top: 100,
          }),
        left: 80,
        right: 80,
      },
      size: {
        height: Math.max(itemHeight * nRows, itemHeight * 8),
        width: Math.max(SQUARE_SIZE * nCols, SQUARE_SIZE * 8),
      },
    };
  }, [
    data,
    filterKey,
    format,
    visualMapVisible,
    visualMapYPosition,
    xAxisPosition,
  ]);

  return size;
};
