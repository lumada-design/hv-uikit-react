import {
  HvBaseChart,
  HvBaseChartBarProps,
  HvBaseChartClasses,
  HvBaseChartCommonProps,
} from "../BaseChart";

export interface HvBarChartClasses extends HvBaseChartClasses {}

export interface HvBarChartProps
  extends HvBaseChartCommonProps,
    HvBaseChartBarProps {
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvBarChartClasses;
}

/**
 * A bar chart is a chart or graph that presents categorical data with rectangular bars.
 */
export const HvBarChart = ({
  data,
  groupBy,
  splitBy,
  measures,
  sortBy,
  xAxis,
  yAxis,
  legend,
  tooltip,
  seriesNameFormatter,
  stack,
  horizontalRangeSlider,
  classes,
  horizontal = false,
  grid,
}: HvBarChartProps) => {
  return (
    <HvBaseChart
      type="bar"
      data={data}
      groupBy={groupBy}
      splitBy={splitBy}
      measures={measures}
      sortBy={sortBy}
      yAxis={yAxis}
      xAxis={xAxis}
      tooltip={tooltip}
      legend={legend}
      seriesNameFormatter={seriesNameFormatter}
      stack={stack}
      horizontalRangeSlider={horizontalRangeSlider}
      horizontal={horizontal}
      classes={classes}
      grid={grid}
    />
  );
};
