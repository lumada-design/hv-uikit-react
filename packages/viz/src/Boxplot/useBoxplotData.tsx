import { useMemo } from "react";
import { escape, from, internal, table } from "arquero";
import type ColumnTable from "arquero/dist/types/table/column-table";
import { Arrayable } from "@hitachivantara/uikit-react-core";

import { HvChartData, HvChartFilter } from "../types";
import { getHvArqueroCombinedFilters } from "../utils";

interface HvDataHookProps {
  data: HvChartData;
  groupBy?: string;
  measures: { [key: string]: string | undefined };
  filters?: Arrayable<HvChartFilter>;
}

export const useBoxplotData = ({
  data,
  groupBy,
  measures,
  filters,
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

    // Filter data right away
    if (filters) {
      tableData = tableData.filter(
        escape((row) =>
          getHvArqueroCombinedFilters(
            row,
            Array.isArray(filters) ? filters : [filters],
          ),
        ),
      );
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
  }, [data, filters, groupBy, measures]);

  return chartData;
};
