import * as React from "react";
import { StandardProps } from "@mui/material";

export interface DateRangeProp {
  startDate?: Date;
  endDate: Date;
}

export type HvHeaderClassKey =
  | "rangeLabel"
  | "background"
  | "headerDayOfWeek"
  | "headerDate"
  | "invalid"
  | "input";

export interface HvHeaderCalendarProps
  extends StandardProps<
    React.HTMLAttributes<HTMLElement>,
    HvHeaderClassKey,
    "onChange" | "onBlur" | "onFocus"
  > {
  /**
   * Locale to be used by the calendar header.
   */
  locale?: string;
  /**
   * Date that the calendar header would show.
   */
  value?: string | Date | DateRangeProp;
  /**
   * Callback function to be triggered when the selected date has changed.
   */
  onChange?: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined,
    value: string | Date | DateRangeProp
  ) => void;
  /**
   * Indicates if header should display end date in a date range.
   */
  showEndDate?: boolean;
  /**
   * Label shown when date is invalid.
   */
  invalidDateLabel: string;
}

export default function HvHeaderCalendar(props: HvHeaderCalendarProps): JSX.Element | null;
