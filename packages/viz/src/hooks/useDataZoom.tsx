import { useMemo } from "react";

import type { EChartsOption } from "echarts-for-react/lib/types";

interface HvDataZoomHookProps {
  showHorizontal?: boolean;
}

export const useDataZoom = ({ showHorizontal }: HvDataZoomHookProps) => {
  const option = useMemo<Pick<EChartsOption, "dataZoom">>(() => {
    return {
      dataZoom: [
        {
          show: showHorizontal ?? false,
          type: "slider",
          orient: "horizontal",
        },
        {
          show: showHorizontal ?? false,
          type: "inside",
          orient: "horizontal",
          zoomOnMouseWheel: "shift",
          moveOnMouseWheel: true,
        },
      ],
    };
  }, [showHorizontal]);

  return option;
};
