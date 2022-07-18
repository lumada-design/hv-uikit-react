import { StandardProps } from "@mui/material";
import { HvFormElementProps, HvBaseDropdownProps } from "@hitachivantara/uikit-react-core";

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

export interface HvTimePickerValue {
  hours: number;
  minutes: number;
  seconds: number;
  period?: "AM" | "PM";
}
export interface HvTimePickerProps
  extends StandardProps<
    HvFormElementProps,
    HvTimePickerClassKey,
    "onChange" | "value" | "defaultValue" | "readOnly"
  > {
  /**
   * Id to be applied to the form element root node.
   */
  id?: string;

  /**
   * Current value of the form element.
   */
  value?: HvTimePickerValue | null | undefined;
  /**
   * When uncontrolled, defines the initial value.
   */
  defaultValue?: HvTimePickerValue | null | undefined;

  /**
   * The placeholder value when no time is selected.
   */
  placeholder?: string;

  /**
   * The placeholder of the hours input.
   */
  hoursPlaceholder?: string;
  /**
   * The placeholder of the minutes input.
   */
  minutesPlaceholder?: string;
  /**
   * The placeholder of the seconds input.
   */
  secondsPlaceholder?: string;

  /**
   * If the time should be presented in 12 or 24 hour format.
   * If undefined, the component will use a format according to the passed locale.
   * If defined, it will "override" the default value given by the locale
   */
  timeFormat?: "12" | "24" | 12 | 24 | undefined;
  /**
   * Locale that will provide the time format(12 or 24 hour format)
   * It is "overwritten" by the timeFormat prop
   */
  locale?: string;

  /**
   * Allow starting with an empty value by not defaulting to the current time.
   * This should become the default behavior when the component is promoted to core.
   */
  disableDefaultValue?: boolean;

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
  period?: "AM" | "PM";

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
  onChange?: (timeIn24Format: HvTimePickerValue) => void;

  /**
   * Callback called when dropdown changes the expanded state.
   *
   * @param {object} event The event source of the callback.
   * @param {boolean} open If the dropdown new state is open (`true`) or closed (`false`).
   */
  onToggle?: (event: Event, open: boolean) => void;

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
