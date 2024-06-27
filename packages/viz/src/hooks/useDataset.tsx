import { useMemo } from "react";
import { internal } from "arquero";

import { HvEChartsOption } from "../types/common";

export const useDataset = (data: internal.ColumnTable) => {
  return useMemo<Pick<HvEChartsOption, "dataset">>(() => {
    return {
      dataset: {
        source: data.columnNames().reduce((acc, c) => {
          acc[c] = data.array(c);
          return acc;
        }, {}),
      },
    };
  }, [data]);
};
