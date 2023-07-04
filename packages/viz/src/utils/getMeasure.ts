import { Arrayable } from "@hitachivantara/uikit-react-core";

import {
  HvBarChartMeasures,
  HvDonutChartMeasure,
  HvLineChartMeasures,
} from "@viz/types";

export const getMeasure = (
  name: string,
  msr: Arrayable<HvLineChartMeasures | HvBarChartMeasures> | HvDonutChartMeasure
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
