import { useMemo } from "react";

import { HvEChartsOption } from "../types/common";

interface HvDataZoomHookProps {
  showHorizontal?: boolean;
}

export const useDataZoom = ({ showHorizontal }: HvDataZoomHookProps) => {
  const option = useMemo<Pick<HvEChartsOption, "dataZoom">>(() => {
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
