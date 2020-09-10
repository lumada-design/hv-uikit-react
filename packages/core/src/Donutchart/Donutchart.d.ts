import { HvChartProps } from "../Chart";

export interface HvDonutchartProps extends HvChartProps {
  /**
   * Sets the type of graph.
   */
  type?: "regular" | "thin";
}

export default function HvDonutchart(props: HvDonutchartProps): JSX.Element | null;
