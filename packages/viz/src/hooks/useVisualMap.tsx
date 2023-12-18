import { useMemo } from "react";

import { getLegendIcon } from "../utils";
import { HvChartLegend } from "../types";
import { HvEChartsOption } from "../types/common";

export interface HvVisualMapHookProps {
  show?: boolean;
  pieces?: Record<string, string | number>[];
  max?: number;
  min?: number;
  colorScale?: string[];
  type?: "continuous" | "piecewise";
  // Uses the same props as the legend
  position?: HvChartLegend["position"];
  direction?: HvChartLegend["direction"];
}

export const useVisualMap = ({
  show = true,
  direction = "horizontal",
  type = "continuous",
  pieces,
  max,
  min,
  colorScale,
  position: positionProp,
}: HvVisualMapHookProps) => {
  const option = useMemo<Pick<HvEChartsOption, "visualMap">>(() => {
    return {
      visualMap: {
        type,
        show,
        ...(pieces && {
          pieces,
        }),
        ...(type === "piecewise" && {
          itemSymbol: getLegendIcon("square"),
          itemGap: 20,
          itemHeight: 16,
          itemWidth: 16,
        }),
        ...(colorScale && {
          max,
          min,
          inRange: {
            color: colorScale,
          },
        }),
        orient: direction,
        top: positionProp?.y || "top",
        left: positionProp?.x || "center",
      },
    };
  }, [
    colorScale,
    direction,
    max,
    min,
    pieces,
    positionProp?.x,
    positionProp?.y,
    show,
    type,
  ]);

  return option;
};
