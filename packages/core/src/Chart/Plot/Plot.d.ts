import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { PlotData as PlotlyPlotData, Layout, Config } from "@types/plotly.js";

export interface PlotData extends PlotlyPlotData {}
export interface PlotLayout extends Layout {}
export interface PlotConfig extends Config {}

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

export type HvPlotClassKey = "";

export default function HvPlot(props: HvPlotProps): JSX.Element | null;
