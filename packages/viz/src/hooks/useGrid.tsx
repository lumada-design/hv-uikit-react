import { useMemo } from "react";

import type { EChartsOption } from "echarts-for-react/lib/types";

import { HvChartGrid } from "@viz/types";

interface HvGridHookProps {
  top?: HvChartGrid["top"];
  bottom?: HvChartGrid["bottom"];
  left?: HvChartGrid["left"];
  right?: HvChartGrid["right"];
}

export const useGrid = ({ top, left, right, bottom }: HvGridHookProps) => {
  const option = useMemo<Pick<EChartsOption, "grid">>(() => {
    return {
      // if no value is defined we shouldn't pass anything because echarts doesn't behave well otherwise
      grid: {
        ...(top != null && {
          top,
        }),
        ...(bottom != null && {
          bottom,
        }),
        ...(left != null && {
          left,
        }),
        ...(right != null && {
          right,
        }),
      },
    };
  }, [top, left, right, bottom]);

  return option;
};
