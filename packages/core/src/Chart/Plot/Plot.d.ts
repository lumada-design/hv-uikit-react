import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { PlotData, Layout, Config } from "@types/plotly.js";

export interface HvPlotProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvPlotClassKey> {
  /**
   * Plotly data object.
   */
  data: PlotData[];
  /**
   * Plotly layout object.
   */
  layout: Layout;
  /**
   * Plotly config object.
   */
  config: Config;
  /**
   * OnHover function.
   */
  onHover?: (data: PlotData) => void;
  /**
   * OnUnHover function.
   */
  onUnHover?: (data: PlotData) => void;
  /**
   * Function to be call after plot render.
   */
  afterPlot?: (data: PlotData, ref: any) => void;
}

export type HvPlotClassKey = "";

export default function HvPlot(props: HvPlotProps): JSX.Element | null;
