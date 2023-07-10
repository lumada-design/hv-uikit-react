import { useMemo } from "react";

import { from, internal, not, table, desc } from "arquero";
import type ColumnTable from "arquero/dist/types/table/column-table";

import { Arrayable } from "@hitachivantara/uikit-react-core";

import {
  HvBarChartMeasures,
  HvChartAggregation,
  HvChartOrder,
  HvLineChartMeasures,
  HvChartData,
  HvDonutChartMeasure,
} from "@viz/types";
import { getAgFunc, getGroupKey } from "@viz/utils";
import { HvAxisChartCommonProps, HvChartCommonProps } from "@viz/types/common";

interface HvDataHookProps {
  data: HvChartData;
  groupBy: HvChartCommonProps["groupBy"];
  measures:
    | Arrayable<HvLineChartMeasures | HvBarChartMeasures>
    | HvDonutChartMeasure;
  splitBy?: HvAxisChartCommonProps["splitBy"];
  sortBy?: HvChartCommonProps["sortBy"];
}

export const useData = ({
  data,
  groupBy,
  measures,
  sortBy,
  splitBy,
}: HvDataHookProps): internal.ColumnTable => {
  const groupByKey = getGroupKey(groupBy);

  const chartData = useMemo<ColumnTable>(() => {
    let tableData: ColumnTable;
    if (data instanceof internal.ColumnTable) {
      tableData = data;
    } else if (Array.isArray(data)) {
      tableData = from(data);
    } else {
      tableData = table(data);
    }

    const groupByFields = groupBy
      ? Array.isArray(groupBy)
        ? groupBy
        : [groupBy]
      : [];

    const splitByFields = Array.isArray(splitBy)
      ? splitBy
      : splitBy != null
      ? [splitBy]
      : [];

    const measuresFields: { [key: string]: string } =
      measures == null
        ? {}
        : typeof measures === "string"
        ? { [measures]: getAgFunc("sum", measures) }
        : Array.isArray(measures)
        ? measures.reduce<{ [key: string]: string }>((acc, value) => {
            let field: string;
            let agFunction: HvChartAggregation;
            if (typeof value === "string") {
              field = value;
              agFunction = "sum";
            } else {
              field = value.field;
              agFunction = value.agg ?? "sum";
            }

            return {
              ...acc,
              [field]: getAgFunc(agFunction, field),
            };
          }, {})
        : {
            [measures.field]: getAgFunc(measures.agg ?? "sum", measures.field),
          };

    const sortByFields: { [key: string]: HvChartOrder } =
      sortBy == null
        ? {}
        : typeof sortBy === "string"
        ? { [sortBy]: "asc" }
        : Array.isArray(sortBy)
        ? sortBy.reduce<{ [key: string]: HvChartOrder }>((acc, value) => {
            let field: string;
            let orderFunction: HvChartOrder;
            if (typeof value === "string") {
              field = value;
              orderFunction = "asc";
            } else {
              field = value.field;
              orderFunction = value.order ?? "asc";
            }

            return {
              ...acc,
              [field]: orderFunction,
            };
          }, {})
        : { [sortBy.field]: sortBy.order ?? "asc" };

    const allFields = [
      ...groupByFields,
      ...splitByFields,
      ...Object.keys(measuresFields),
    ];

    // remove unneeded fields
    tableData = tableData.select(...allFields);

    // group by groupBy fields
    if (groupByFields.length > 0) {
      tableData = tableData.groupby(groupByFields);
    }

    if (splitByFields.length > 0) {
      // pivot by splitBy fields
      tableData = tableData.pivot(splitByFields, measuresFields);
    } else {
      // if there is no splitBy fields, just aggregate measures fields
      tableData = tableData.rollup(measuresFields);
    }

    // if grouped by multiple fields, create a new joint field
    // as the line chart doesn't implement hierarchical axis label grouping
    if (groupByFields.length > 1) {
      const expression = `d => ${groupByFields
        .map((field) => `d.${field}`)
        .join(" + '_' + ")}`;

      tableData = tableData.derive(
        { [groupByKey]: expression },
        { after: groupByFields[groupByFields.length - 1] }
      );
    }

    // sort by sortBy fields
    if (Object.keys(sortByFields).length > 0) {
      tableData = tableData.orderby(
        ...Object.keys(sortByFields)
          // only sort by fields that are in the table, ignore the rest
          .filter((key) => allFields.includes(key))
          .map((key) => (sortByFields[key] === "desc" ? desc(key) : key))
      );
    }

    // if a derived field was created, remove the original fields
    if (groupByFields.length > 1) {
      tableData = tableData.select(not(...groupByFields));
    }

    return tableData;
  }, [data, groupBy, groupByKey, splitBy, measures, sortBy]);

  return chartData;
};
