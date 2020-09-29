import * as React from "react";
import { StandardProps } from "@material-ui/core";
// eslint-disable-next-line import/no-unresolved
import { Config, Layout, PlotData as PlotlyPlotData } from "plotly.js";

export type PlotData = PlotlyPlotData;
export type PlotLayout = Layout;
export type PlotConfig = Config;

export type HvPlotClassKey = "";

export interface HvPlotProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvPlotClassKey> {
  /**
   * Plotly data object.
   */
  data: PlotData[];
  /**
   * Plotly layout object.
   */
  layout?: PlotLayout;
  /**
   * Plotly config object.
   */
  config?: PlotConfig;
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
  /**
   * Plot revision
   */
  revision?: number;
}

export default function HvPlot(props: HvPlotProps): JSX.Element | null;
