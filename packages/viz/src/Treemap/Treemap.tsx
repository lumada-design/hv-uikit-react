import { forwardRef } from "react";
import ReactECharts from "echarts-for-react/lib/core";
import { TreemapChart } from "echarts/charts";
import { TooltipComponent } from "echarts/components";
import * as echarts from "echarts/core";

import { HvBaseChart } from "../BaseChart";
import { HvChartTooltipClasses, useOption, useTooltip } from "../hooks";
import { HvChartTooltip } from "../types";
import { HvChartCommonProps } from "../types/common";
import { HvTreemapData } from "../types/generic";

// Register chart components
echarts.use([TreemapChart, TooltipComponent]);

export interface HvTreemapChartClasses extends HvChartTooltipClasses {}

export interface HvTreemapChartProps
  extends Omit<
    HvChartCommonProps,
    "data" | "groupBy" | "sortBy" | "grid" | "legend" | "tooltip"
  > {
  /** The name of the treemap */
  name?: string;
  /** The data to use on the treemap */
  data?: HvTreemapData[];
  /** The tooltip options. */
  tooltip?: Omit<HvChartTooltip, "type">;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvTreemapChartClasses;
}

/**
 * A tree map chart visually represents hierarchical data using nested rectangles, with each rectangle's size proportional to the value it represents.
 */
export const HvTreemapChart = forwardRef<ReactECharts, HvTreemapChartProps>(
  (props, ref) => {
    const {
      name,
      data,
      classes,
      width,
      height,
      tooltip,
      onOptionChange,
      ...others
    } = props;

    const chartTooltip = useTooltip({
      ...tooltip,
      type: "single",
      classes,
    });

    const option = useOption({
      option: {
        title: {
          text: name,
          left: "center",
        },
        series: [
          {
            name,
            type: "treemap",
            data,
          },
        ],
        ...chartTooltip,
      },
      onOptionChange,
    });

    return (
      <HvBaseChart
        ref={ref}
        option={option}
        width={width}
        height={height}
        {...others}
      />
    );
  },
);
