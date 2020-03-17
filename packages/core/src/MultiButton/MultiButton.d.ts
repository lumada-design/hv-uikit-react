import * as React from "react";
import { StandardProps } from "@material-ui/core";

export interface MultiButtonData {
  id: string;
  value?: string;
  icon?: React.ReactNode;
  selected?: boolean;
  enforced?: boolean;
}

export interface HvMultiButtonProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvMultiButtonClassKey, "onChange"> {
  /**
   * If the MultiButton is to be displayed vertically.
   */
  vertical?: boolean;
  /**
   * If the MultiButton is multi selectable.
   */
  multi?: boolean;
  /**
   * Type of button display.
   *  - Accepted values:
   *    --"label": displays just a text label,
   *    --"icon": displays just an icon,
   *    --"mixed": displays both a label and an icon
   */
  type: "text" | "icon" | "mixed";
  /**
   * Buttons definitions
   */
  buttons: MultiButtonData[];
  /**
   * Callback function to be triggered when the input value is changed
   */
  onChange: (event: React.FormEvent<HTMLDivElement>, checkedItems: MultiButtonData[]) => void;
  /**
   * Specify minimum number of selections in component
   */
  minSelection?: number;
  /**
   * Specify maximum number of selections in component
   */
  maxSelection?: number;
}

export type HvMultiButtonClassKey =
  | "root"
  | "vertical"
  | "labelText"
  | "button"
  | "icon"
  | "isSelected"
  | "isUnselected";

export default function HvMultiButton(props: HvMultiButtonProps): JSX.Element | null;
