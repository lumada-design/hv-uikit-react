import { Arrayable } from "@hitachivantara/uikit-react-core";

import type {
  HvBarChartMeasures,
  HvChartAxisType,
  HvChartFilter,
  HvChartFilterOperation,
  HvDonutChartMeasure,
  HvLineChartMeasures,
} from "..";
import { HvChartCommonProps } from "../types/common";
import { HvChartLegendIcon } from "../types/legend";
import { HvScatterPlotMeasure } from "../types/measures";

export const getAxisType = (type?: HvChartAxisType) => {
  switch (type) {
    case "categorical":
      return "category";
    case "time":
      return "time";
    case "continuous":
      return "value";
    default:
      return undefined;
  }
};

export const getGroupKey = (groupBy: HvChartCommonProps["groupBy"]) =>
  Array.isArray(groupBy) ? groupBy.join("_") : groupBy;

export const getLegendIcon = (icon: HvChartLegendIcon) => {
  switch (icon) {
    case "circle":
      return "circle";
    case "square":
      return "path://M0,0L16,0L16,16L0,16L0,0Z";
    case "line":
    default:
      return "path://M0,0L16,0L16,2L0,2Z";
  }
};

export const getMeasure = (
  name: string,
  msr:
    | Arrayable<HvLineChartMeasures | HvBarChartMeasures | HvScatterPlotMeasure>
    | HvDonutChartMeasure,
):
  | HvLineChartMeasures
  | HvBarChartMeasures
  | HvDonutChartMeasure
  | HvScatterPlotMeasure => {
  const measureName = name.split("_")[0];
  const measuresArray = Array.isArray(msr) ? msr : [msr];
  // find the measure in measures array or return the first one
  return (
    measuresArray.find((m) => {
      if (typeof m === "string") {
        return m === measureName;
      }
      return m.field === measureName;
    }) ?? measuresArray[0]
  );
};

export const getFilterFunction = (
  operation: HvChartFilterOperation,
  field: HvChartFilter["field"],
  value: HvChartFilter["value"],
): Function => {
  switch (operation) {
    case "is": {
      const valueArray = Array.isArray(value) ? value : [value];
      return (row: any) => valueArray.includes(row[field]);
    }
    case "isNot": {
      const valueArray = Array.isArray(value) ? value : [value];
      return (row: any) => !valueArray.includes(row[field]);
    }
    case "contains":
      return (row: any) => row[field].includes(value);
    case "greaterThan":
      return (row: any) =>
        row[field] > (Array.isArray(value) ? value[0] : value);
    case "greaterThanOrEqual":
      return (row: any) =>
        row[field] >= (Array.isArray(value) ? value[0] : value);
    case "lessThan":
      return (row: any) =>
        row[field] < (Array.isArray(value) ? value[0] : value);
    case "lessThanOrEqual":
      return (row: any) =>
        row[field] <= (Array.isArray(value) ? value[0] : value);
    case "between":
      return (row: any) => row[field] >= value[0] && row[field] <= value[1];

    default:
      throw new Error("Unsupported operation");
  }
};
