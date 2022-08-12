import { HvBaseSwitchProps } from "../../..";

export interface HvSwitchColumnCellProps {
   /**
   * Whether the switch is checked or not.
   */
  checked: boolean;
  /**
   * The switch label.
   */
  value: number | string | undefined;
  /**
   * The value of the switch.
   */
  switchLabel: string;
  /**
   * The right switch label.
   */
  falseLabel?: string;
  /**
   * The left switch label.
   */
  trueLabel?: string;
  /**
   * Extra props to be passed to the switch.
   */
  switchProps?: HvBaseSwitchProps;
}

