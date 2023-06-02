import * as React from "react";
import { StandardProps } from "@mui/material";

export interface DateRangeProp {
  startDate: Date;
  endDate?: Date;
}

export type HvCalendarClassKey = "rangeCalendarContainer" | "singleCalendar";

export type visibilitySelectorActions =
  | "previous_month"
  | "next_month"
  | "previous_year"
  | "next_year"
  | "month";

export interface HvCalendarProps
  extends StandardProps<React.HTMLAttributes<HTMLElement>, HvCalendarClassKey, "onChange"> {
  /**
   * Locale to be used by the calendar.
   */
  locale?: string;
  /**
   * Date that the calendar would show.
   * if using the object format the calendar enter in range mode showing two calendars
   */
  value?: Date | DateRangeProp;
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
  onChange?: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined,
    value: Date | DateRangeProp
  ) => void;
  /**
   * Callback function to be triggered when the selected date input has changed.
   */
  onInputChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined,
    value: Date | DateRangeProp,
    position: "left" | "right"
  ) => void;
  /**
   * Callback function to be triggered when the user clicks on the month or year selector.
   * it receives the action that was pressed:
   * previous_month, next_month, previous_year, next_year,month
   */
  onVisibleDateChange?: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined,
    action: visibilitySelectorActions,
    value: Date | DateRangeProp
  ) => void;
  /**
   * Text to show in the header on range mode.
   */
  label?: string;
  /**
   * The maximum selectable date after this all values are disabled.
   */
  maximumDate?: string;
  /**
   * The minimum selectable date before this all values are disabled.
   */
  minimumDate?: string;
  /**
   * An element placed before the Calendar
   */
  startAdornment: React.ReactNode;
  /**
   * An element placed before the Calendar
   */
  invalidDateLabel?: string;
}

export default function HvCalendar(props: HvCalendarProps): JSX.Element | null;
