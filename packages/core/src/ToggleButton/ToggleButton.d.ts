import { StandardProps } from "@mui/material";
import { HvButtonProps } from "../Button";

export type HvToggleButtonClassKey = "";

export interface HvToggleButtonProps extends StandardProps<HvButtonProps, HvToggleButtonClassKey> {
  /**
   * When uncontrolled, defines the initial selected state.
   */
  defaultSelected?: boolean;
  /**
   * Defines if the button is selected.
   * When defined the button state becomes controlled.
   */
  selected?: boolean;
  /**
   * Icon for when selected. Ignored if the component has children.
   */
  selectedIcon?: React.ReactNode;
  /**
   * Icon for when not selected. Ignored if the component has children.
   */
  notSelectedIcon?: React.ReactNode;
}

export default function HvToggleButton(props: HvToggleButtonProps): JSX.Element | null;
