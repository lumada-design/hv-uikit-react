import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { HvButtonCategories } from "../Button";

export interface HvMultiButtonProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvMultiButtonClassKey, "onChange"> {
  /**
   * If the MultiButton is to be displayed vertically.
   */
  vertical?: boolean;
  /**
   * Category of button to use
   */
  category: HvButtonCategories;
}

export type HvMultiButtonClassKey =
  | "root"
  | "vertical"
  | "labelText"
  | "button"
  | "isSelected"
  | "isUnselected";

export default function HvMultiButton(props: HvMultiButtonProps): JSX.Element | null;
