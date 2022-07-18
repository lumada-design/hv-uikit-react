import * as React from "react";
import { StandardProps } from "@mui/material";

export type Semantic =
  | "sema1"
  | "sema2"
  | "sema3"
  | "sema4"
  | "sema5"
  | "sema6"
  | "sema7"
  | "sema8"
  | "sema9"
  | "sema10"
  | "sema11"
  | "sema12"
  | "sema13"
  | "sema14"
  | "sema15"
  | "sema16"
  | "sema17"
  | "sema18"
  | "sema19";

export type IconSize = "XS" | "S" | "M" | "L";

export type HvIconBaseClassKey = "root" | "xs" | "s" | "m" | "l";

export interface HvIconBaseProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvIconBaseClassKey, "color"> {
  /**
   * An array of strings representing the colors to override in the icon.
   * Each element inside the array will override a diferent color.
   */
  color?: string | string[];

  /**
   * A string that will override the viewbox of the svg
   */
  viewbox?: string;

  /**
   * A string that will override the height of the svg
   */
  height?: string | number;

  /**
   * A string that will override the width of the svg
   */
  width?: string | number;

  /**
   * Sets one of the standard sizes of the icons
   */
  iconSize?: IconSize;

  /**
   * Sets one of the standard semantic palette colors of the icon
   */
  semantic?: Semantic;

  /**
   * Inverts the background-foreground on semantic icons
   */
  inverted?: boolean;

  /**
   * Props passed down to the svg element.
   */
  svgProps?: any;
}

export default function HvIconBase(props: HvIconBaseProps): JSX.Element | null;
