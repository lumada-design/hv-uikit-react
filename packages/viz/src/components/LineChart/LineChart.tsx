import {
  HvBaseChart,
  HvBaseChartClasses,
  HvBaseChartCommonProps,
  HvBaseChartLineProps,
} from "../BaseChart";

export interface HvLineChartClasses extends HvBaseChartClasses {}

export interface HvLineChartProps
  extends HvBaseChartCommonProps,
    HvBaseChartLineProps {
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvLineChartClasses;
}

/**
 * A line chart or line plot or line graph is a type of chart which displays information as a series of data points
 * connected by straight line segments. It is a basic type of chart common in many fields.
 */
export const HvLineChart = ({
  area = false,
  emptyCellMode = "void",
  areaOpacity = 0.5,
  ...others
}: HvLineChartProps) => {
  return (
    <HvBaseChart
      type="line"
      area={area}
      emptyCellMode={emptyCellMode}
      areaOpacity={areaOpacity}
      {...others}
    />
  );
};
