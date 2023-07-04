import { useMemo } from "react";

import type { EChartsOption } from "echarts-for-react/lib/types";

import { getAxisType } from "@viz/utils";
import { HvAxisChartCommonProps } from "@viz/types/common";
import { HvChartAxisType } from "@viz/types";

interface HvXAxisHookProps {
  xAxis: HvAxisChartCommonProps["xAxis"];
  defaultType?: HvChartAxisType;
  scale?: boolean;
}

export const useXAxis = ({
  xAxis,
  defaultType = "categorical",
  scale = false,
}: HvXAxisHookProps) => {
  const option = useMemo<Pick<EChartsOption, "xAxis">>(() => {
    return {
      xAxis: {
        id: xAxis?.id,
        type: getAxisType(xAxis?.type) ?? getAxisType(defaultType),
        name: xAxis?.name,
        scale,
        axisLabel: {
          rotate: xAxis?.labelRotation ?? 0,
          formatter: xAxis?.labelFormatter,
        },
        max: xAxis?.maxValue === "max" ? "dataMax" : xAxis?.maxValue,
        min: xAxis?.minValue === "min" ? "dataMin" : xAxis?.minValue,
      },
    };
  }, [xAxis, scale, defaultType]);

  return option;
};
