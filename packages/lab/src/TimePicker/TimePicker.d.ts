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
   * Id to be applied to the form element root node.
   */
  id?: string;

  /**
   * When uncontrolled, defines the initial value.
   */
  defaultValue?: any;

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
  dropdownProps?: HvBaseDropdownProps;
}

export default function HvTimePicker(props: HvTimePickerProps): JSX.Element | null;
