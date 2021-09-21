import { StandardProps } from "@material-ui/core";
import { HvFormElementProps } from "..";

export type HvDatePickerClassKey =
  | "root"
  | "labelContainer"
  | "label"
  | "description"
  | "error"
  | "dropdown"
  | "panel"
  | "action"
  | "icon"
  | "dropdownHeaderInvalid"
  | "dropdownHeaderOpen";

export interface HvDatePickerProps
  extends StandardProps<HvFormElementProps, HvDatePickerClassKey, "onChange"> {
  /**
   * An Object containing the various text associated with the input.
   */
  labels?: {
    /**
     * Apply button label.
     */
    applyLabel?: string;
    /**
     * Cancel button label.
     */
    cancelLabel?: string;
    /**
     * Clear button label.
     */
    clearLabel?: string;
  };

  /**
   * The placeholder value when nothing is selected.
   */
  placeholder?: string;

  /**
   * The initial value of the input when in single calendar mode.
   */
  value?: Date;
  /**
   * The initial value for the start date when in range mode.
   */
  startValue?: Date;
  /**
   * The initial value for the end date when in range mode.
   */
  endValue?: Date;
  /**
   * Flag informing if the the component should be in range mode or in single mode.
   */
  rangeMode?: boolean;
  /**
   * The placement where the calendar should be placed according to the input. Options are `left` or `right`.
   * Note this prop only affects the calendar when in `rangeMode`.
   */
  horizontalPlacement?: "left" | "right";
  /**
   * The calendar locale. If undefined, it uses calendar default
   */
  locale?: string;
  /**
   * Controls if actions buttons are visible at the calendar.
   */
  showActions?: boolean;
  /**
   * Controls if clear button is visible at the calendar,
   * only works if showing actions or in range mode.
   */
  showClear?: boolean;
  /**
   * Callback function to be triggered when the input value is changed
   */
  onChange?: (date?: Date, endDate?: Date) => void;
  /**
   * Callback function to be triggered when the datepicker is closed without applying.
   */
  onCancel?: () => void;
  /**
   * Callback function to be triggered when the datepicker value is cleared.
   */
  onClear?: () => void;
  /**
   * Disable the portal behavior. The children stay within it's parent DOM hierarchy.
   */
  disablePortal?: boolean;
  /**
   * Sets if the calendar container should follow the date picker input out of the screen or stay visible.
   */
  escapeWithReference?: boolean;
  /**
   * An element placed before the Calendar
   */
  startAdornment?: React.ReactNode;
  /**
   * An object containing props to be passed onto the baseDropdown.
   */
  dropdownProps?: React.HTMLAttributes<HTMLDivElement>;
}

export default function HvDatePicker(props: HvDatePickerProps): JSX.Element | null;
