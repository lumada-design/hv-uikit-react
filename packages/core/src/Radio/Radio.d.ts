import { StandardProps } from "@mui/material";

import { HvBaseRadioProps } from "../BaseRadio";
import { HvFormStatus } from "../Forms/FormElement";
import { HvLabelProps } from "../Forms/Label";

export type HvRadioClassKey =
  | "root"
  | "container"
  | "invalidContainer"
  | "disabled"
  | "radio"
  | "invalidRadio"
  | "label"
  | "focusVisible";

export interface HvRadioProps extends StandardProps<HvBaseRadioProps, HvRadioClassKey> {
  /**
   * The label of the form element.
   *
   * The form element must be labeled for accessibility reasons.
   * If not provided, an aria-label or aria-labelledby must be provided.
   */
  label?: React.ReactNode;
  /**
   * Properties passed on to the label element.
   */
  labelProps?: HvLabelProps;
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
   * The error message to show when `status` is "invalid".
   */
  statusMessage?: React.ReactNode;
  /**
   * Identifies the element that provides an error message for the radio button.
   *
   * Will only be used when the validation status is invalid.
   */
  "aria-errormessage"?: string;
}

export default function HvRadio(props: HvRadioProps): JSX.Element | null;
