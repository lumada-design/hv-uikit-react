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

    const { theme, activeTheme } = useVizTheme();

    const currentTheme = useRef<string | undefined>(theme);
    const chartRef = useRef<ReactECharts>(null);

    const forkedRef = useForkRef<ReactECharts>(ref, chartRef);

    const [initialOption, setInitialOption] = useState<HvEChartsOption>(option);

    useEffect(() => {
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

      return () => {
        // Dispose the instance of the chart when the component unmounts. This ensures that
        // the chart theme will update when the theme changes.
        instance.dispose();
      };
    }, [theme, option, activeTheme]);

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
