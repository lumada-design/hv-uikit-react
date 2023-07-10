import { useMemo } from "react";

import { internal } from "arquero";

import type { EChartsOption } from "echarts-for-react/lib/types";

export const useDataset = (data: internal.ColumnTable) => {
  const option = useMemo<Pick<EChartsOption, "dataset">>(() => {
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
