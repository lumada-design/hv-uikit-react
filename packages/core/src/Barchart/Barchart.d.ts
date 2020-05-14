import { HvChartProps } from "../Chart";

export interface HvBarchartProps extends HvChartProps {
  /**
   * Sets if the chart is stack.
   */
  stack?: boolean;
  /**
   * Sets if the chart is horizontal.
   */
  horizontal?: boolean;
}

export default function HvBarchart(props: HvBarchartProps): JSX.Element | null;
