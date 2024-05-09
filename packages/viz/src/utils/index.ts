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
  const valueArray = Array.isArray(value) ? value : [value];
  if (valueArray.length === 0) return () => true;

  switch (operation) {
    case "is": {
      return (row: any) => valueArray.includes(row[field]);
    }
    case "isNot": {
      return (row: any) => !valueArray.includes(row[field]);
    }
    case "contains":
      return (row: any) => {
        let include = false;
        for (const val of valueArray) {
          if (row[field].includes(val)) {
            include = true;
          }
        }
        return include;
      };
    case "notContains":
      return (row: any) => {
        let include = true;
        for (const val of valueArray) {
          if (row[field].includes(val)) {
            include = false;
          }
        }
        return include;
      };
    case "greaterThan":
      return (row: any) => {
        let include = false;
        for (const val of valueArray) {
          if (row[field] > val) {
            include = true;
          }
        }
        return include;
      };
    case "greaterThanOrEqual":
      return (row: any) => {
        let include = false;
        for (const val of valueArray) {
          if (row[field] >= val) {
            include = true;
          }
        }
        return include;
      };
    case "lessThan":
      return (row: any) => {
        let include = false;
        for (const val of valueArray) {
          if (row[field] < val) {
            include = true;
          }
        }
        return include;
      };
    case "lessThanOrEqual":
      return (row: any) => {
        let include = false;
        for (const val of valueArray) {
          if (row[field] <= val) {
            include = true;
          }
        }
        return include;
      };
    case "between":
      return (row: any) => row[field] >= value[0] && row[field] <= value[1];
    case "ends":
      return (row: any) => {
        let include = false;
        for (const val of valueArray) {
          if (String(row[field]).endsWith(String(val))) {
            include = true;
          }
        }
        return include;
      };
    case "notEnds":
      return (row: any) => {
        let include = true;
        for (const val of valueArray) {
          if (String(row[field]).endsWith(String(val))) {
            include = false;
          }
        }
        return include;
      };
    case "starts":
      return (row: any) => {
        let include = false;
        for (const val of valueArray) {
          if (String(row[field]).startsWith(String(val))) {
            include = true;
          }
        }
        return include;
      };
    case "notStarts":
      return (row: any) => {
        let include = true;
        for (const val of valueArray) {
          if (String(row[field]).startsWith(String(val))) {
            include = false;
          }
        }
        return include;
      };

    default:
      throw new Error("Unsupported operation");
  }
};
