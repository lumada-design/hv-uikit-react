import * as React from "react";
import { StandardProps } from "@mui/material";

import { HvFormStatus } from "../Forms/FormElement";

export type HvRadioGroupClassKey =
  | "root"
  | "label"
  | "group"
  | "vertical"
  | "horizontal"
  | "invalid"
  | "error";

export interface HvRadioGroupProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvRadioGroupClassKey, "onChange"> {
  /**
   * Id to be applied to the form element root node.
   */
  id?: string;

  /**
   * The form element name.
   *
   * It is propagated to the children radio buttons, unless they already have one (which they shouldn't).
   */
  name?: string;
  /**
   * The value of the form element, represented in one of the child radio buttons values.
   *
   * When defined the radio button group state becomes controlled.
   */
  value?: any;
  /**
   * When uncontrolled, defines the initial value.
   */
  defaultValue?: any;

  /**
   * The label of the form element.
   *
   * The form element must be labeled for accessibility reasons.
   * If not provided, an aria-label or aria-labelledby must be provided instead.
   */
  label?: React.ReactNode;
  /**
   * @ignore
   */
  "aria-label"?: string;
  /**
   * @ignore
   */
  "aria-labelledby"?: string;
  /**
   * Provide additional descriptive text for the form element.
   */
  description?: React.ReactNode;

  /**
   * Indicates that the form element is disabled.
   * If `true` the state is propagated to the children radio buttons.
   */
  disabled?: boolean;
  /**
   * Indicates that the form element is not editable.
   * If `true` the state is propagated to the children radio buttons.
   */
  readOnly?: boolean;
  /**
   * Indicates that user input is required on the form element.
   * If `true` the state is propagated to the children radio buttons' input element.
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
   * Identifies the element that provides an error message for the radio group.
   *
   * Will only be used when the validation status is invalid.
   */
  "aria-errormessage"?: string;

  /**
   * The callback fired when the value changes.
   */
  onChange?: (event: Event, value: any) => void;

  /**
   * Indicates whether the radio buttons group's orientation is horizontal or vertical.
   *
   * Defaults to vertical.
   */
  orientation?: "vertical" | "horizontal";

  /**
   * The radio buttons that are part of the group.
   *
   * Their state will always be controlled by the group.
   * However the individual radio button onChange callback will still be called if defined.
   */
  children: React.ReactNode;
}

export default function HvRadioGroup(props: HvRadioGroupProps): JSX.Element | null;
