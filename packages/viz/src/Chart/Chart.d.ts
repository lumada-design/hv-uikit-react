import { StandardProps } from "@material-ui/core";
import { HvPlotProps } from "./Plot";

export type HvChartClassKey = "root";

export interface HvChartProps extends StandardProps<HvPlotProps, HvChartClassKey> {
  /**
   * Defines if should use a single or multiline tooltip.
   */
  tooltipType?: "single" | "multiple";
  /**
   * Defines the X axis title.
   */
  xAxisTitle?: string;
  /**
   * Defines the Y axis title.
   */
  yAxisTitle?: string;
  /**
   * Defines the chart subtitle.
   */
  subtitle?: string;
}

export default function HvChart(props: HvChartProps): JSX.Element | null;
