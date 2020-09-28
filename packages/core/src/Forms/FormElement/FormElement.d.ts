import * as React from "react";
import { StandardProps } from "@material-ui/core";

export type HvFormStatus =
  | "standBy"
  | "valid"
  | "invalid";

export type HvFormElementClassKey =
| "root";

export interface HvFormElementProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvFormElementClassKey> {
  /**
   * Components that will receive the form context values.
   */
  children: React.ReactNode;

  /**
   * Name of the form element.
   * Part of a name/value pair, should be the name property of the undeling native input, if any.
   */
  name?: string;
  /**
   * Current value of the form element.
   * Part of a name/value pair, should be the value property of the undeling native input, if any.
   */
  value?: any;

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
   * Represents the status of this form element, 
   * where valid is correct, invalid is incorrect and standby means no validations had run.
   * this value will be propagated to the childrens through the context.
   */
  status?: HvFormStatus;
}

export default function HvFormElement(props: HvFormElementProps): JSX.Element | null;
