import { StandardProps } from "@material-ui/core";

import { HvBaseCheckBoxProps } from "../BaseCheckBox";
import { HvFormStatus } from "../Forms/FormElement";

export interface HvCheckBoxProps extends StandardProps<HvBaseCheckBoxProps, HvCheckBoxClassKey> {
  /**
   * The label of the form element.
   *
   * The form element must be labeled for accessibility reasons.
   * If not provided, an aria-label or aria-labelledby must be inputted via inputProps.
   */
  label?: React.ReactNode;

  /**
   * The status of the form element.
   *
   * Valid is correct, invalid is incorrect and standBy means no validations have run.
   *
   * When uncontrolled and unspecified it will default to "standBy" and change to either "valid"
   * or "invalid" after any change to the state.
   */
  status?: HvFormStatus;
  /**
   * The error message to show when `status` is "invalid". Defaults to "Required".
   */
  statusMessage?: React.ReactNode;
}

export type HvCheckBoxClassKey = "root" | "container" | "disabled" | "checkBox" | "label";

export default function HvCheckBox(props: HvCheckBoxProps): JSX.Element | null;
