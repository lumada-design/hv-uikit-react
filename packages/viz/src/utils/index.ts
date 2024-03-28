import { Arrayable } from "@hitachivantara/uikit-react-core";

import type {
  HvBarChartMeasures,
  HvChartAxisType,
  HvDonutChartMeasure,
  HvLineChartMeasures,
} from "..";
import { HvChartCommonProps } from "../types/common";
import { HvChartLegendIcon } from "../types/legend";

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
    | Arrayable<HvLineChartMeasures | HvBarChartMeasures>
    | HvDonutChartMeasure,
): HvLineChartMeasures | HvBarChartMeasures | HvDonutChartMeasure => {
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
