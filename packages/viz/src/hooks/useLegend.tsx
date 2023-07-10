import { useMemo } from "react";

import type { EChartsOption } from "echarts-for-react/lib/types";

import { getLegendIcon } from "@viz/utils";
import { HvChartLegend, HvChartLegendIcon } from "@viz/types/legend";

interface HvLegendHookProps {
  show?: HvChartLegend["show"];
  direction?: HvChartLegend["direction"];
  position?: HvChartLegend["position"];
  series?: Pick<EChartsOption, "series.series">;
  icon?: HvChartLegendIcon;
  formatter?: string | ((value?: string) => string);
}

export const useLegend = ({
  series,
  show,
  icon,
  formatter,
  position: positionProp,
  direction = "horizontal",
}: HvLegendHookProps) => {
  const option = useMemo<Pick<EChartsOption, "legend">>(() => {
    const position: Record<string, string> = { y: positionProp?.y ?? "top" };
    if (positionProp?.x != null && positionProp?.x !== "center") {
      position[positionProp.x] = positionProp.x;
    } else {
      position.x = "center";
    }

    return {
      legend: {
        show: show ?? (Array.isArray(series) && series.length > 1),
        itemGap: 20,
        formatter,
        orient: direction,
        ...position,
        ...(icon && { icon: getLegendIcon(icon) }),
        ...(!icon && {
          data:
            show !== false && Array.isArray(series)
              ? series.map((s) => {
                  return {
                    name: s.name as string,
                    icon: getLegendIcon(
                      (s as any).areaStyle != null ? "square" : "line"
                    ),
                  };
                })
              : undefined,
        }),
      },
    };
  }, [series, show, icon, formatter, positionProp, direction]);

  return option;
};
