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
  horizontal = false,
  ...others
}: HvBarChartProps) => {
  return <HvBaseChart type="bar" horizontal={horizontal} {...others} />;
};
