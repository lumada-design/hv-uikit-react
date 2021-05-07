import { StandardProps } from "@material-ui/core";
import React from "react";

import { HvBaseCheckBoxProps } from "../BaseCheckBox";
import { HvFormStatus } from "../Forms/FormElement";
import { HvLabelProps } from "../Forms/Label";

export type HvCheckBoxClassKey =
  | "root"
  | "container"
  | "invalidContainer"
  | "disabled"
  | "checkBox"
  | "invalidCheckbox"
  | "label"
  | "focusVisible"
  | "labelTypography";

export interface HvCheckBoxProps extends StandardProps<HvBaseCheckBoxProps, HvCheckBoxClassKey> {
  /**
   * The label of the form element.
   *
   * The form element must be labeled for accessibility reasons.
   * If not provided, an aria-label or aria-labelledby must be inputted via inputProps.
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
   * The error message to show when the validation status is "invalid".
   *
   * Defaults to "Required" when the status is uncontrolled and no `aria-errormessage` is provided.
   */
  statusMessage?: React.ReactNode;
  /**
   * Identifies the element that provides an error message for the checkbox.
   *
   * Will only be used when the validation status is invalid.
   */
  "aria-errormessage"?: string;
}

export default function HvCheckBox(props: HvCheckBoxProps): JSX.Element | null;
