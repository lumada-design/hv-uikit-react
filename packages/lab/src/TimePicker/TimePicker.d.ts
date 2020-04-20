import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { TimeFormat } from "./enums";

export interface TimePickerLabel {
  /**
   * Time picker label (appears above the input)
   */
  title: string;
  /**
   * Time picker placeholder (appears in the input)
   */
  placeholder: string;
}

export interface HvTimePickerProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvTimePickerClassKey> {
  /**
   * An Object containing the various text associated with the time picker.
   */
  labels?: TimePickerLabel;
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
  locale: string;
  /**
   * Default value for the hours picker
   */
  hours?: number;
  /**
   * Default value for the minutes picker
   */
  minutes?: number;
  /**
   * Default value for the seconds picker
   */
  seconds?: number;
  /**
   * Default value for the period picker
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
  onChange?: (timeIn24Format: object) => {};
}

export type HvTimePickerClassKey =
  | "input"
  | "inputPopperOpenedBelow"
  | "inputPopperOpenedAbove"
  | "inputPopperClosed"
  | "inputContainer"
  | "icon"
  | "timePickerContainer"
  | "label"
  | "timePopperContainer"
  | "popper"
  | "popperBelow"
  | "popperAbove"
  | "separator"
  | "periodContainer";

export default function HvTimePicker(props: HvTimePickerProps): JSX.Element | null;
