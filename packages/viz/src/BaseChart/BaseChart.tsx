import { forwardRef, useEffect, useRef, useState } from "react";

import { useForkRef } from "@mui/material/utils";

import { AriaComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import * as echarts from "echarts/core";
import ReactECharts from "echarts-for-react/lib/core";

import { useVizTheme } from "../hooks";
import { HvEChartsOption } from "../types/common";

// Register chart components
echarts.use([CanvasRenderer, AriaComponent]);

export interface HvBaseChartProps {
  /** ECharts option. */
  option: HvEChartsOption;
  /** Charts width. */
  width?: echarts.ResizeOpts["width"];
  /** Charts height. */
  height?: echarts.ResizeOpts["height"];
}

/**
 * Base chart.
 */
export const HvBaseChart = forwardRef<ReactECharts, HvBaseChartProps>(
  (props, ref) => {
    const { option, width, height } = props;

    const { theme } = useVizTheme();

    const currentTheme = useRef<string | undefined>(theme);
    const chartRef = useRef<ReactECharts>(null);
    const isMounted = useRef<boolean>(false);

    const forkedRef = useForkRef<ReactECharts>(ref, chartRef);

    const [initialOption, setInitialOption] = useState<HvEChartsOption>(option);

    useEffect(() => {
      if (!isMounted.current) {
        isMounted.current = true;
        return;
      }

      // when the theme changes echarts destroys the chart and mounts it again
      // thus we need to reset the initial option
      if (theme !== currentTheme.current) {
        setInitialOption(option);
        currentTheme.current = theme;
        return;
      }

      const instance = chartRef.current?.getEchartsInstance();

      if (!instance) return;

      instance.setOption(option, {
        replaceMerge: ["xAxis", "yAxis", "series", "dataset"],
      });
    }, [theme, option]);

    return (
      <ReactECharts
        ref={forkedRef}
        echarts={echarts}
        option={initialOption}
        theme={theme}
        notMerge
        style={{
          width: width || "100%",
          height: height || "100%",
        }}
      />
    );
  }
);
