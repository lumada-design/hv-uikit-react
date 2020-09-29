import { StandardProps } from "@material-ui/core";
import { HvFormElementProps } from "..";

export type HvDatePickerClassKey =
  | "inputCalendarClosed"
  | "inputCalendarOpen"
  | "noBorderTop"
  | "noBorderBottom"
  | "input"
  | "icon"
  | "iconClear"
  | "datePickerContainer"
  | "label"
  | "calendarContainer"
  | "singleCalendarFooter"
  | "rangeMainContainer"
  | "rangeCalendarsContainer"
  | "rangeLeftCalendarContainer"
  | "rangeRightCalendarContainer"
  | "rangeFooterLeft"
  | "rangeFooterRight"
  | "actionsContainer"
  | "borderTopNone"
  | "borderBottomNone"
  | "borderTopDisplay"
  | "borderBottomDisplay"
  | "popperRoot"
  | "listBorderDown"
  | "listBorderUp"
  | "calendarOpenDown"
  | "calendarOpenUp";

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
     * Text above the input/dropdown.
     */
    title?: string;
    /**
     * Start date label.
     */
    rangeStart?: string;
    /**
     * End date label.
     */
    rangeEnd?: string;
    /**
     * Text inside the input/dropdown
     */
    placeholder?: string;
  };
  /**
   * The initial value of the input when in single calendar mode.
   */
  value?: string;
  /**
   * The initial value for the start date when in range mode.
   */
  startValue?: string;
  /**
   * The initial value for the end date when in range mode.
   */
  endValue?: string;
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
   * Callback function to be triggered when the input value is changed
   */
  onChange?: (date?: string) => void;
  /**
   * Disable the portal behavior. The children stay within it's parent DOM hierarchy.
   */
  disablePortal?: boolean;
  /**
   * Sets if the calendar container should follow the date picker input out of the screen or stay visible.
   */
  escapeWithReference?: boolean;
}

export default function HvDatePicker(props: HvDatePickerProps): JSX.Element | null;
