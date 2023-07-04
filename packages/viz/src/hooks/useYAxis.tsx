import { useMemo } from "react";

import type { EChartsOption } from "echarts-for-react/lib/types";
import type { YAXisComponentOption } from "echarts/types/dist/echarts";

import { getAxisType } from "@viz/utils";
import { HvAxisChartCommonProps } from "@viz/types/common";
import { HvChartAxisType } from "@viz/types";

interface HvYAxisHookProps {
  yAxis: HvAxisChartCommonProps["yAxis"];
  defaultType?: HvChartAxisType;
}

export const useYAxis = ({
  yAxis,
  defaultType = "continuous",
}: HvYAxisHookProps) => {
  const option = useMemo<Pick<EChartsOption, "yAxis">>(() => {
    if (!yAxis || !Array.isArray(yAxis)) {
      return {
        yAxis: {
          id: yAxis?.id,
          type: getAxisType(yAxis?.type) ?? getAxisType(defaultType),
          name: yAxis?.name,
          axisLabel: {
            rotate: yAxis?.labelRotation ?? 0,
            formatter: yAxis?.labelFormatter,
          },
          max: yAxis?.maxValue === "max" ? "dataMax" : yAxis?.maxValue,
          min: yAxis?.minValue === "min" ? "dataMin" : yAxis?.minValue,
        },
      };
    }

    return {
      yAxis: yAxis.map<YAXisComponentOption>((axis) => ({
        id: axis?.id,
        type: getAxisType(axis?.type) ?? "value",
        name: axis?.name,
        axisLabel: {
          rotate: axis?.labelRotation ?? 0,
          formatter: axis?.labelFormatter,
        },
        max: axis?.maxValue === "max" ? "dataMax" : axis?.maxValue,
        min: axis?.minValue === "min" ? "dataMin" : axis?.minValue,
      })),
    };
  }, [yAxis, defaultType]);

  return option;
};
