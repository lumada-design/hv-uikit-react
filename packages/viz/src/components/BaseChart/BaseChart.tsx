import { useEffect, useRef, useState } from "react";

import { AriaComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import * as echarts from "echarts/core";

import ReactECharts from "echarts-for-react/lib/core";
import type { EChartsOption } from "echarts-for-react/lib/types";

import { useVizTheme } from "@viz/hooks";

// Register chart components
echarts.use([CanvasRenderer, AriaComponent]);

export interface HvBaseChartProps {
  options: EChartsOption;
  width?: echarts.ResizeOpts["width"];
  height?: echarts.ResizeOpts["height"];
}

/**
 * Base chart.
 */
export const HvBaseChart = ({ options, width, height }: HvBaseChartProps) => {
  const { theme } = useVizTheme();

  const currentTheme = useRef<string | undefined>(theme);
  const chartRef = useRef<ReactECharts>(null);
  const isMounted = useRef<boolean>(false);

  const [initialOption, setInitialOption] = useState<EChartsOption>({
    aria: {
      enabled: true,
    },
    animation: false,
    ...options,
  });

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    // when the theme changes echarts destroys the chart and mounts it again
    // thus we need to reset the initial option
    if (theme !== currentTheme.current) {
      setInitialOption({
        aria: {
          enabled: true,
        },
        animation: false,
        ...options,
      });
      currentTheme.current = theme;
      return;
    }

    const instance = chartRef.current?.getEchartsInstance();

    if (!instance) return;

    instance.setOption(
      {
        ...options,
      },
      {
        replaceMerge: ["xAxis", "yAxis", "series", "dataset"],
      }
    );
  }, [theme, options]);

  return (
    <ReactECharts
      ref={chartRef}
      echarts={echarts}
      option={initialOption}
      theme={theme}
      notMerge
      {...((width || height) && {
        style: { width, height },
      })}
    />
  );
};
