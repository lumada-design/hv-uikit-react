import { StandardProps } from "@material-ui/core";
import { HvPlotProps } from "./Plot";

export type HvChartClassKey = "root";

export type TooltipElementObject = {
  color: string;
  name: string;
  value: number | string;
};

export type TooltipDataObject = {
  title: string;
  elements: TooltipElementObject[];
};

export interface HvChartProps extends StandardProps<HvPlotProps, HvChartClassKey> {
  /**
   * An Id passed on to the component
   */
  id?: string;
  /**
   * Defines if should use a single or multiline tooltip.
   */
  tooltipType?: "single" | "multiple";
  /**
   * Custom tooltip element to be displayed
   */
  tooltip?: (data: TooltipDataObject) => Element;
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
