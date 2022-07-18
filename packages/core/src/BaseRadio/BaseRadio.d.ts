import { StandardProps, RadioProps } from "@mui/material";

export type HvBaseRadioClassKey = "root" | "disabled" | "focusVisible";

export interface HvBaseRadioProps
  extends StandardProps<RadioProps, HvBaseRadioClassKey, "onChange"> {
  /**
   * Id to be applied to the root node.
   */
  id?: string;

  /**
   * The input name.
   */
  name?: string;
  /**
   * The value of the input.
   *
   * The default value is "on".
   */
  value?: any;

  /**
   * Indicates that user input is required.
   */
  required?: boolean;
  /**
   * Indicates that the input is not editable.
   */
  readOnly?: boolean;
  /**
   * Indicates that the input is disabled.
   */
  disabled?: boolean;

  /**
   * If `true` the radio button is selected, if set to `false` the radio button is not selected.
   *
   * When defined the radio button state becomes controlled.
   */
  checked?: boolean;
  /**
   * When uncontrolled, defines the initial checked state.
   */
  defaultChecked?: boolean;

  /**
   * The callback fired when the radio button is pressed.
   */
  onChange?: (event: Event, checked: boolean, value: any) => void;

  /**
   * Whether the selector should use semantic colors.
   */
  semantic?: boolean;

  /**
   * Properties passed on to the input element.
   */
  inputProps?: object;
}

export default function HvBaseRadio(props: HvBaseRadioProps): JSX.Element | null;
