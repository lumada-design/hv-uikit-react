import { useMemo } from "react";
import { Arrayable } from "@hitachivantara/uikit-react-core";

import { HvBoxplotMeasure, HvChartData, HvChartFilter } from "../types";
import { useBoxplotData } from "./useBoxplotData";

interface HvDataHookProps {
  data: HvChartData;
  groupBy?: string;
  measures: Arrayable<HvBoxplotMeasure>;
  filters?: Arrayable<HvChartFilter>;
}

export const useBoxplot = ({
  data,
  groupBy,
  measures,
  filters,
}: HvDataHookProps) => {
  const measuresFields = useMemo(() => {
    if (measures == null) return {};
    if (typeof measures === "string") return { [measures]: undefined };
    if (Array.isArray(measures)) {
      return measures.reduce<{ [key: string]: string | undefined }>(
        (acc, value) => {
          let field: string | undefined;
          if (typeof value === "string") {
            field = value;
          } else {
            field = value.field;
          }
          return {
            ...acc,
            [field]: typeof value === "string" ? undefined : value.yAxis,
          };
        },
        {},
      );
    }
    return { [measures.field]: measures.yAxis };
  }, [measures]);

  const chartData = useBoxplotData({
    data,
    groupBy,
    measures: measuresFields,
    filters,
  });

  const boxplotData = useMemo(() => {
    const setData = {};
    Object.keys(measuresFields).forEach((m) => {
      setData[m] = [];
      Object.keys(chartData).forEach((key) => {
        setData[m].push(chartData[key][m]);
      });
    });

    const sources: any[] = [];
    const transforms: any[] = [];
    const series: any[] = [];

    Object.keys(measuresFields).forEach((m, index) => {
      sources.push({
        source: setData[m],
        id: m,
      });
      transforms.push({
        fromDatasetId: m,
        transform: {
          type: "boxplot",
          config: {
            itemNameFormatter: (params) => Object.keys(chartData)[params.value],
          },
        },
      });
      series.push({
        name: m,
        type: "boxplot",
        datasetIndex: Object.keys(measuresFields).length + index,
        yAxisId: measuresFields[m],
      });
    });

    const datasets = {
      dataset: [...sources, ...transforms],
      series,
    };

    return datasets;
  }, [chartData, measuresFields]);

  return boxplotData;
};
