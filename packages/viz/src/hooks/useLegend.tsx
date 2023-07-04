import { useMemo } from "react";

import type { EChartsOption } from "echarts-for-react/lib/types";

import { getLegendIcon } from "@viz/utils";
import { HvChartLegendIcon } from "@viz/types/legend";

interface HvLegendHookProps {
  series?: Pick<EChartsOption, "series.series">;
  show?: boolean;
  icon?: HvChartLegendIcon;
  formatter?: string | ((value?: string) => string);
}

export const useLegend = ({
  series,
  show,
  icon,
  formatter,
}: HvLegendHookProps) => {
  const option = useMemo<Pick<EChartsOption, "legend">>(() => {
    return {
      legend: {
        show: show ?? (Array.isArray(series) && series.length > 1),
        itemGap: 20,
        formatter,
        ...(icon && { icon: getLegendIcon(icon) }),
        ...(!icon && {
          data:
            show !== false && Array.isArray(series)
              ? series.map((s) => {
                  return {
                    name: s.name as string,
                    icon: getLegendIcon(
                      (s as any).areaStyle != null || s.type === "bar"
                        ? "square"
                        : "line"
                    ),
                  };
                })
              : undefined,
        }),
      },
    };
  }, [series, show, icon, formatter]);

  return option;
};
