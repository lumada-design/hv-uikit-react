import * as React from "react";
import { StandardProps } from "@material-ui/core";

export type HvFormStatus = "standBy" | "valid" | "invalid";

export type HvFormElementClassKey = "root";

export interface HvFormElementProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvFormElementClassKey, "onChange"> {
  /**
   * Components that will receive the form context values.
   */
  children?: React.ReactNode;

  /**
   * Name of the form element.
   *
   * Part of a name/value pair, should be the name property of the undeling native input.
   */
  name?: string;
  /**
   * Current value of the form element.
   *
   * Part of a name/value pair, should be the value property of the undeling native input.
   */
  value?: any;

  /**
   * The label of the form element.
   *
   * The form element must be labeled for accessibility reasons.
   * If not provided, an aria-label or aria-labelledby must be provided instead.
   */
  label?: React.ReactNode;
  /**
   * Provide additional descriptive text for the form element.
   */
  description?: React.ReactNode;

  /**
   * Whether the form element is disabled.
   */
  disabled?: boolean;
  /**
   * Indicates that the form element is not editable.
   */
  readOnly?: boolean;
  /**
   * Indicates that user input is required on the form element.
   */
  required?: boolean;

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
   * Identifies the element that provides an error message for the form element.
   *
   * Will only be used when the validation status is invalid.
   */
  "aria-errormessage"?: string;

  /**
   * The callback fired when the value changes.
   */
  onChange?: (event: Event, value: any) => void;
}

export default function HvFormElement(props: HvFormElementProps): JSX.Element | null;
