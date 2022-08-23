import { StandardProps, SwitchProps } from "@material-ui/core";

export type HvBaseSwitchClassKey = "root" | "disabled" | "readOnly";

export interface HvBaseSwitchProps
  extends StandardProps<SwitchProps, HvBaseSwitchClassKey, "onChange"> {
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
   * Is up to the application's logic when to consider the submission of this value.
   * Generally it should be used only when the checkbox is neither unchecked nor indeterminate.
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
   * If `true` the checkbox is selected, if set to `false` the checkbox is not selected.
   *
   * When defined the checkbox state becomes controlled.
   */
  checked?: boolean;
  /**
   * When uncontrolled, defines the initial checked state.
   */
  defaultChecked?: boolean;

  /**
   * The callback fired when the checkbox is pressed.
   */
  onChange?: (event: Event, checked: boolean, value: any) => void;

  /**
   * Properties passed on to the input element.
   */
  inputProps?: object;
}

export default function HvBaseSwitch(props: HvBaseSwitchProps): JSX.Element | null;
