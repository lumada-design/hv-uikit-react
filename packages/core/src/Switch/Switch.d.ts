import * as React from "react";
import { StandardProps } from "@material-ui/core";

export interface HvSwitchLabelsProp {
  /**
   * Label placed at the left of the switch.
   */
  left: string;
  /**
   * Label placed at the right of the switch.
   */
  right: string;
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

export interface HvSwitchProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvSwitchClassKey, "onChange"> {
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
  /**
   * Callback function to be triggered when the input value is changed
   */
  onChange: (event: Event, state: boolean) => void;
}

export default function HvSwitch(props: HvSwitchProps): JSX.Element | null;
