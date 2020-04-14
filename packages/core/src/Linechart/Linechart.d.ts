import { HvChartProps } from "../Chart";

export interface HvLinechartProps extends HvChartProps {
  /**
   * Sets the type of graph.
   */
  type?: "line" | "area" | "stack";
  /**
   * Defines it should present a range slider.
   */
  rangeSlider?: boolean;
}

export default function HvLinechart(props: HvLinechartProps): JSX.Element | null;
