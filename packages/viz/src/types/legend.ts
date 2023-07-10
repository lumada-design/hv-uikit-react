export type HvChartLegendIcon = "line" | "square";

export interface HvChartLegend {
  /** Whether to show the legend or not. The legend will appear by default for multiple series. Otherwise, the legend will not be shown. */
  show?: boolean;
  /** Direction of the legend. Defaults to `horizontal`. */
  direction?: "vertical" | "horizontal";
  /** Position of the legend. `x` defaults to `center` and `y` to `top`. */
  position?: {
    x?: "left" | "center" | "right";
    y?: "top" | "center" | "bottom";
  };
}
