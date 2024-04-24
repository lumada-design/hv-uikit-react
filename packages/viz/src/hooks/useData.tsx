import { useMemo } from "react";
import { desc, escape, from, internal, not, table } from "arquero";
import type ColumnTable from "arquero/dist/types/table/column-table";
import { Arrayable } from "@hitachivantara/uikit-react-core";

import {
  HvBarChartMeasures,
  HvChartAggregation,
  HvChartData,
  HvChartOrder,
  HvDonutChartMeasure,
  HvLineChartMeasures,
  HvScatterPlotMeasure,
} from "../types";
import { HvAxisChartCommonProps, HvChartCommonProps } from "../types/common";
import { getFilterFunction, getGroupKey } from "../utils";

const getAgFunc = (func: HvChartAggregation, field: string) =>
  func === "count" ? "count()" : `${func}(d["${field}"])`;

interface HvDataHookProps {
  data: HvChartData;
  groupBy: HvChartCommonProps["groupBy"];
  measures:
    | Arrayable<HvLineChartMeasures | HvBarChartMeasures | HvScatterPlotMeasure>
    | HvDonutChartMeasure;
  splitBy?: HvAxisChartCommonProps["splitBy"];
  sortBy?: HvChartCommonProps["sortBy"];
  filters?: HvChartCommonProps["filters"];
  delta?: string;
}

export const useData = ({
  data,
  groupBy,
  measures,
  sortBy,
  splitBy,
  filters,
  delta,
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
                [measures.field]: getAgFunc(
                  measures.agg ?? "sum",
                  measures.field,
                ),
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

    // --- Confusion matrix ---
    // Recalculate the measures columns according to the delta column
    if (delta) {
      const deltaExpression = Object.keys(measuresFields).reduce(
        (acc, curr) => {
          return {
            ...acc,
            [curr]: `d => d.${curr} - d.${delta}`,
          };
        },
        {},
      );

      tableData = tableData.derive(deltaExpression);
    }

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
        { after: groupByFields[groupByFields.length - 1] },
      );
    }

    // apply filters
    if (filters) {
      const filtersArray = Array.isArray(filters) ? filters : [filters];
      // combine filter functions into a single function. only rows that pass all filters will be included
      const combinedFilterFunction = (row) => {
        return filtersArray.every((filter) => {
          const { field, operation, value } = filter;
          const filterFunction = getFilterFunction(operation, field, value);
          return filterFunction(row);
        });
      };
      tableData = tableData.filter(escape(combinedFilterFunction));
    }

    // sort by sortBy fields
    if (Object.keys(sortByFields).length > 0) {
      tableData = tableData.orderby(
        ...Object.keys(sortByFields)
          // only sort by fields that are in the table, ignore the rest
          .filter((key) => allFields.includes(key))
          .map((key) => (sortByFields[key] === "desc" ? desc(key) : key)),
      );
    }

    // if a derived field was created, remove the original fields
    if (groupByFields.length > 1) {
      tableData = tableData.select(not(...groupByFields));
    }

    return tableData;
  }, [data, groupBy, splitBy, measures, sortBy, delta, filters, groupByKey]);

  return chartData;
};
