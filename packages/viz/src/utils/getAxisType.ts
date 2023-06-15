import { HvChartAxisType } from "@viz/types";

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
