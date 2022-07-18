import * as React from "react";
import { StandardProps } from "@mui/material";
import { HvButtonCategories } from "../Button";

export type HvMultiButtonClassKey =
  | "root"
  | "vertical"
  | "labelText"
  | "button"
  | "isSelected"
  | "isUnselected";

export interface HvMultiButtonProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvMultiButtonClassKey, "onChange"> {
  /**
   * If all the buttons are disabled.
   */
  disabled?: boolean;
  /**
   * If the MultiButton is to be displayed vertically.
   */
  vertical?: boolean;
  /**
   * Category of button to use
   */
  category?: HvButtonCategories;
}

export default function HvMultiButton(props: HvMultiButtonProps): JSX.Element | null;
