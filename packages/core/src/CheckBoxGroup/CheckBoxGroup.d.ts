import * as React from "react";
import { StandardProps } from "@material-ui/core";

import { HvFormStatus } from "../Forms/FormElement";

export type HvCheckBoxGroupClassKey =
  | "root"
  | "label"
  | "group"
  | "vertical"
  | "horizontal"
  | "invalid"
  | "selectAll"
  | "error";

export interface HvCheckBoxGroupProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvCheckBoxGroupClassKey, "onChange"> {
  /**
   * Id to be applied to the form element root node.
   */
  id?: string;

  /**
   * The form element name.
   *
   * It is propagated to the children checkboxes, unless they already have one.
   */
  name?: string;
  /**
   * The value of the form element. An array of values represented in the child checkboxes.
   *
   * When defined the checkbox group state becomes controlled.
   */
  value?: any[];
  /**
   * When uncontrolled, defines the initial value.
   */
  defaultValue?: any[];

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
   * If `true` the state is propagated to the children checkboxes.
   */
  disabled?: boolean;
  /**
   * Indicates that the form element is not editable.
   * If `true` the state is propagated to the children checkboxes.
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
   * The error message to show when the validation status is "invalid".
   *
   * Defaults to "Required" when the status is uncontrolled and no `aria-errormessage` is provided.
   */
  statusMessage?: React.ReactNode;
  /**
   * Identifies the element that provides an error message for the checkbox group.
   *
   * Will only be used when the validation status is invalid.
   */
  "aria-errormessage"?: string;

  /**
   * The callback fired when the value changes.
   */
  onChange?: (event: Event, value: any) => void;

  /**
   * Indicates whether the checkbox group's orientation is horizontal or vertical.
   *
   * Defaults to vertical.
   */
  orientation?: "vertical" | "horizontal";
  /**
   * Indicates if an aditional select all checkbox should be shown.
   */
  showSelectAll?: boolean;
  /**
   * The label of the select all checkbox. Defaults to "All".
   */
  selectAllLabel?: string;

  /**
   * The checkboxes that are part of the group.
   *
   * Their state will always be controlled by the group.
   * However the individual checkbox onChange callback will still be called if defined.
   */
  children: React.ReactNode;
}

export default function HvCheckBoxGroup(props: HvCheckBoxGroupProps): JSX.Element | null;
