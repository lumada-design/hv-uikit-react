import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { HvLabelProps } from "../Forms/Label";
import { HvFormStatus } from "../Forms/FormElement";
import { HvBaseSwitchProps } from "../BaseSwitch";

export type HvSwitchClassKey = "root" | "label" | "error" | "switchContainer" | "invalidSwitch";

export interface HvSwitchProps
  extends StandardProps<HvBaseSwitchProps, HvSwitchClassKey, "onChange"> {
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
  labelProps?: HvLabelProps;
  /**
   * Value assigned to the Switch Component.
   */
  value?: string;
  /**
   * Callback function to be triggered when the input value is changed
   */
  onChange?: (event: Event, state: boolean) => void;
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
   * Identifies the element that provides an error message for the switch.
   *
   * Will only be used when the validation status is invalid.
   */
  "aria-errormessage"?: string;
}

export default function HvSwitch(props: HvSwitchProps): JSX.Element | null;
