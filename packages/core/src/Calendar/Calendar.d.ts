import * as React from "react";
import { StandardProps } from "@material-ui/core";

export interface HvCalendarProps
  extends StandardProps<React.HTMLAttributes<HTMLElement>, HvCalendarClassKey, "onChange"> {
  /**
   * Styles applied from the theme.
   */
  /**
   * Identifier.
   */
  id?: string;
  /**
   * Locale to be used by the calendar.
   */
  locale?: string;
  /**
   * Date that should be used as the starting selected date for the calendar.
   */
  selectedDate?: Date;
  /**
   * Date that will be used to know which month and year should be displayed on the calendar. The value of the day is
   * irrelevant.
   */
  visibleDate?: Date;
  /**
   * Controls the visible month of the Calendar
   */
  visibleMonth?: string;
  /**
   * Controls the visible month of the Calendar
   */
  visibleYear?: string;
  /**
   * Callback function to be triggered when the selected date has changed.
   */
  onChange?: (date?: string) => void;
  /**
   * Callback function to be triggered when visible date has changed.
   */
  handleVisibleDateChange?: (date?: string) => void;

  /**
   * Indicates if the calendar is being used in ranged mode.
   */
  rangeMode?: boolean;
  /**
   * Text to show in the header on range mode.
   */
  label?: string;
  /**
   * Controls the current highlighted dates of the calendar.
   */
  valueRange?: Date;
  /**
   * The maximum selectable date after this all values are disabled.
   */
  maximumDate?: string;
  /**
   * The minimum selectable date before this all values are disabled.
   */
  minimumDate?: string;
}

export type HvCalendarClassKey =
  | "calendarContainer"
  | "relativeWrapper"
  | "calendarWrapper"
  | "calendarGrid"
  | "navigationContainer"
  | "focusSelection"
  | "navigationMonth"
  | "calendarDay"
  | "calendarDate"
  | "calendarDateNotInMonth"
  | "calendarDateSelected"
  | "calendarDateInvalid"
  | "calendarDateInSelectionRange"
  | "calendarDateDisabled"
  | "calendarMonthlyGrid"
  | "normalWidth"
  | "rangeModeWidth"
  | "calendarMonthlyCell"
  | "calendarMonthlyCellSelected";

export default function HvCalendar(props: HvCalendarProps): JSX.Element | null;
