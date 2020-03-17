import { StandardProps } from "@material-ui/core";
import { HvPlotProps } from "./Plot";

export interface HvChartProps extends StandardProps<HvPlotProps, HvChartClassKey> {
  /**
   * Title of the chart.
   */
  title?: string;
  /**
   * Subtitle of the chart.
   */
  subtitle?: string;
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
}

export type HvChartClassKey = "root" | "titleContainer" | "subtitle" | "paddingTop";

export default function HvChart(props: HvChartProps): JSX.Element | null;
