import { useMemo } from "react";
import { desc, escape, internal, not } from "arquero";
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
import {
  getGroupKey,
  getHvArqueroCombinedFilters,
  normalizeColumnName,
  processTableData,
} from "../utils";

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
  filters: filtersProp,
  delta,
}: HvDataHookProps): internal.ColumnTable => {
  const groupByKey = getGroupKey(groupBy);

  const chartData = useMemo<ColumnTable>(() => {
    // Converting data to arquero table data and normalizing the columns name
    const { data: processedData, mapping } = processTableData(data);
    let tableData = processedData;

    // Filter data right away
    if (filtersProp) {
      const filters = (
        Array.isArray(filtersProp) ? filtersProp : [filtersProp]
      ).map((filter) => ({
        ...filter,
        field: normalizeColumnName(filter.field), // normalize
      }));

      tableData = tableData.filter(
        escape((row) => getHvArqueroCombinedFilters(row, filters)),
      );
    }

    const groupByFields = (
      groupBy ? (Array.isArray(groupBy) ? groupBy : [groupBy]) : []
    ).map((value) => normalizeColumnName(value)); // normalize

    const splitByFields = (
      Array.isArray(splitBy) ? splitBy : splitBy != null ? [splitBy] : []
    ).map((value) => normalizeColumnName(value)); // normalize

    let measuresFields: { [key: string]: string } = {};
    if (typeof measures === "string") {
      const normalizedMeasure = normalizeColumnName(measures); // normalize
      measuresFields[normalizedMeasure] = getAgFunc("sum", normalizedMeasure);
    } else if (Array.isArray(measures)) {
      measuresFields = measures.reduce<{ [key: string]: string }>(
        (acc, value) => {
          let field: string;
          let agFunction: HvChartAggregation;
          if (typeof value === "string") {
            field = normalizeColumnName(value); // normalize
            agFunction = "sum";
          } else {
            field = normalizeColumnName(value.field); // normalize
            agFunction = value.agg ?? "sum";
          }
          return {
            ...acc,
            [field]: getAgFunc(agFunction, field),
          };
        },
        {},
      );
    } else if (measures != null) {
      const normalizedMeasure = normalizeColumnName(measures.field); // normalize
      measuresFields[normalizedMeasure] = getAgFunc(
        measures.agg ?? "sum",
        normalizedMeasure,
      );
    }

    let sortByFields: { [key: string]: HvChartOrder } = {};
    if (typeof sortBy === "string") {
      const normalizedSort = normalizeColumnName(sortBy); // normalize
      sortByFields[normalizedSort] = "asc";
    } else if (Array.isArray(sortBy)) {
      sortByFields = sortBy.reduce<{ [key: string]: HvChartOrder }>(
        (acc, value) => {
          let field: string;
          let orderFunction: HvChartOrder;
          if (typeof value === "string") {
            field = normalizeColumnName(value); // normalize;
            orderFunction = "asc";
          } else {
            field = normalizeColumnName(value.field); // normalize
            orderFunction = value.order ?? "asc";
          }
          return {
            ...acc,
            [field]: orderFunction,
          };
        },
        {},
      );
    } else if (sortBy != null) {
      const normalizedSort = normalizeColumnName(sortBy.field); // normalize
      sortByFields[normalizedSort] = sortBy.order ?? "asc";
    }

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
          const normalizedMeasure = normalizeColumnName(curr); // normalize
          const normalizedDelta = normalizeColumnName(delta); // normalize
          return {
            ...acc,
            [normalizedMeasure]: `d => d.${normalizedMeasure} - d.${normalizedDelta}`,
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

    // sort by sortBy fields
    if (Object.keys(sortByFields).length > 0) {
      tableData = tableData.orderby(
        ...Object.keys(sortByFields)
          // only sort by fields that are in the table, ignore the rest
          .filter((key) => allFields.includes(key))
          .map((key) => (sortByFields[key] === "desc" ? desc(key) : key)),
      );
    }

    // Revert the normalized names to the ones given by the user
    const reversedMapping = {};
    for (const column of tableData.columnNames()) {
      if (mapping[column] != null) {
        reversedMapping[column] = mapping[column];
      } else {
        reversedMapping[column] = column;
      }
    }
    tableData = tableData.select(reversedMapping);

    // if a derived field was created, remove the original fields
    if (groupByFields.length > 1) {
      tableData = tableData.select(not(...groupByFields));
    }

    return tableData;
  }, [
    data,
    filtersProp,
    groupBy,
    splitBy,
    measures,
    sortBy,
    delta,
    groupByKey,
  ]);

  return chartData;
};
