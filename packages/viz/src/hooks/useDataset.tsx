import { useMemo } from "react";

import { internal } from "arquero";

import { HvEChartsOption } from "../types/common";

export const useDataset = (data: internal.ColumnTable) => {
  const option = useMemo<Pick<HvEChartsOption, "dataset">>(() => {
    return {
      dataset: {
        source: data.columnNames().reduce(
          (acc, c) => ({
            ...acc,
            [c]: data.array(c),
          }),
          {}
        ),
      },
    };
  }, [data]);

  return option;
};
