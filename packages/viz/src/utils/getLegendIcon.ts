import { HvChartLegendIcon } from "@viz/types/legend";

export const getLegendIcon = (icon: HvChartLegendIcon) => {
  switch (icon) {
    case "square":
      return "path://M0,0L16,0L16,16L0,16L0,0Z";
    case "line":
    default:
      return "path://M0,0L16,0L16,2L0,2Z";
  }
};
