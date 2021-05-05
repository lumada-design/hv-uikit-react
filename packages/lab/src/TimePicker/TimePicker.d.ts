import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { HvFormElementProps, HvBaseDropdownProps } from "@hv/uikit-react-core";

export type HvTimePickerClassKey =
  | "root"
  | "input"
  | "label"
  | "timePopperContainer"
  | "separator"
  | "periodContainer"
  | "formElementRoot"
  | "dropdownPlaceholder"
  | "iconBaseRoot"
  | "error"
  | "labelContainer"
  | "description"
  | "dropdownHeaderInvalid"
  | "dropdownPlaceholderDisabled"
  | "dropdownHeaderOpen";

export interface HvTimePickerProps
  extends StandardProps<HvFormElementProps, HvTimePickerClassKey, "onChange"> {
  /**
   * Class names to be applied.
   */
  className: string;

  /**
   * Id to be applied to the form element root node.
   */
  id?: string;

  /**
   * The form element name.
   */
  name?: string;

  /**
   * The value of the form element.
   *
   * When defined the value state becomes controlled.
   */
  value?: any;
  /**
   * When uncontrolled, defines the initial value.
   */
  defaultValue?: any;

  /**
   * Indicates that user input is required on the form element.
   */

  required?: boolean;

  /**
   * Indicates that user input is disabled on the form element.
   */

  disabled?: boolean;

  /**
   * The label of the form element.
   *
   * The form element must be labeled for accessibility reasons.
   * If not provided, an aria-label or aria-labelledby must be provided instead.
   */
  label?: string;
  /**
   * The status of the form element.
   *
   * Valid is correct, invalid is incorrect and standBy means no validations have run.
   *
   * When uncontrolled and unspecified it will default to "standBy" and change to either "valid"
   * or "invalid" after any change to the state.
   */
  status?: "standBy" | "valid" | "invalid";
  /**
   * The error message to show when `status` is "invalid". Defaults to "Required".
   */
  statusMessage?: React.ReactNode;

  /**
   * If the time should be presented in 12 or 24 hour format.
   * If undefined, the component will use a format according to the passed locale.
   * If defined, it will "override" the default value given by the locale
   */
  timeFormat?: "12" | "24" | undefined;
  /**
   * Locale that will provide the time format(12 or 24 hour format)
   * It is "overwritten" by the timeFormat prop
   */
  locale?: string;

  /**
   * Default value for the hours picker
   * @deprecated use defaultValue instead
   */
  hours?: number;
  /**
   * Default value for the minutes picker
   * @deprecated use defaultValue instead
   */
  minutes?: number;
  /**
   * Default value for the seconds picker
   * @deprecated use defaultValue instead
   */
  seconds?: number;
  /**
   * Default value for the period picker
   * @deprecated use defaultValue instead
   */
  period?: string;

  /**
   * Callback function to be triggered when the input value is changed.
   * It is invoked with a object param with the following props:
   *  - hours (in a 24h format)
   *  - minutes
   *  - seconds
   *  - period
   *
   * It is always invoked with the hours in a 24h format
   */
  onChange?: (timeIn24Format: object) => void;

  /**
   * Provide additional descriptive text for the form element.
   */
  description?: React.ReactNode;

  /**
   * Disable the portal behavior. The children stay within it's parent DOM hierarchy.
   */
  disablePortal?: boolean;

  /**
   * Sets if the calendar container should follow the date picker input out of the screen or stay visible.
   */
  escapeWithReference?: boolean;

  /**
   * Extra properties to be passed to the timepicker dropdown.
   */
  dropdownProps: HvBaseDropdownProps;
}

export default function HvTimePicker(props: HvTimePickerProps): JSX.Element | null;
