import { HvChartProps } from "../Chart";

export interface HvBarchartProps extends HvChartProps {
  /**
   * Sets is the chart is stack.
   */
  stack: boolean;
  /**
   * Sets is the chart is horizontal.
   */
  horizontal: boolean;
}

export default function HvBarchart(props: HvBarchartProps): JSX.Element | null;
