import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { HvLabelProps } from "../Forms/Label";
import { HvFormStatus } from "../Forms/FormElement";

export type HvSwitchClassKey =
  | "root"
  | "label"
  | "error";

export interface HvSwitchProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvSwitchClassKey, "onChange"> {
  /**
   * Denotes selection state of switch component.
   */
  checked?: boolean;
  /**
   * Denotes if component is active or not.
   */
  disabled?: boolean;
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
  labelProps: HvLabelProps;
  /**
   * Value assigned to the Switch Component.
   */
  value?: string;
  /**
   * Callback function to be triggered when the input value is changed
   */
  onChange: (event: Event, state: boolean) => void;
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

export default function HvSwitch(props: HvSwitchProps): JSX.Element | null;
