import { useMemo } from "react";
import { from, internal, table } from "arquero";
import type ColumnTable from "arquero/dist/types/table/column-table";

import { HvChartData } from "../types";

interface HvDataHookProps {
  data: HvChartData;
  groupBy?: string;
  measures: { [key: string]: string | undefined };
}

export const useBoxplotData = ({
  data,
  groupBy,
  measures,
}: HvDataHookProps) => {
  const chartData = useMemo(() => {
    let tableData: ColumnTable;
    if (data instanceof internal.ColumnTable) {
      tableData = data;
    } else if (Array.isArray(data)) {
      tableData = from(data);
    } else {
      tableData = table(data);
    }

    const uniqueGroupBy = new Set(tableData.array(groupBy || "") as string[]);

    const results = {};
    uniqueGroupBy.forEach((group) => {
      results[group] = {};
      Object.keys(measures).forEach((measure) => {
        results[group][measure] = tableData
          .params({ group, groupBy })
          .filter((d, $) => d[$.groupBy] === $.group)
          .array(measure);
      });
    });

    return results;
  }, [data, groupBy, measures]);

  return chartData;
};
