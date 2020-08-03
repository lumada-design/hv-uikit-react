import * as React from "react";
import { StandardProps } from "@material-ui/core";

export type HvFormStatus =
  | "standBy"
  | "valid"
  | "invalid"

export interface HvFormElementProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvFormElementClassKey> {
  /**
   * Components that will receive the form context values.
   */
  children: React.ReactNode;
  /**
   * Represents the status of this form element, 
   * where valid is correct, invalid is incorrect and standby means no validations had run.
   * this value will be propagated to the childrens through the context.
   */
  status?: HvFormStatus;
  /**
   * Represents the values this form element will inject into the children.
   */
  value?: any;
}

export type HvFormElementClassKey =
  | "root"

export default function HvFormElement(props: HvFormElementProps): JSX.Element | null;
