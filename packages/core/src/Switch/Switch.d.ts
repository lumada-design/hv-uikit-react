import * as React from "react";
import { StandardProps } from "@material-ui/core";

export interface HvSwitchLabelsProp {
  left: string;
  right: string;
}

export interface HvSwitchProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvSwitchClassKey> {
  /**
   * Denotes selection state of switch component.
   */
  checked?: boolean;
  /**
   * Denotes if component is active or not.
   */
  disabled?: boolean;
  /**
   * An Object containing the various text associated with the switch.
   *
   * - left: Label placed at the left of the switch.
   * - right: Label placed at the right of the switch.
   */
  labels?: HvSwitchLabelsProp;
  /**
   * Value assigned to the Switch Component.
   */
  value?: string;
  /**
   * Determine if labels should be displayed alongside component
   */
  showLabels?: boolean;
  /**
   * Determine if custom icon in button should be displayed
   * */
  displayIconChecked?: boolean;
}

export type HvSwitchClassKey =
  | "root"
  | "switch"
  | "switchBase"
  | "disabledLabel"
  | "labelSelected"
  | "labelDeselected"
  | "checkedIcon"
  | "checked"
  | "track"
  | "thumb"
  | "disabled";

export default function HvSwitch(props: HvSwitchProps): JSX.Element | null;
