import React, { useContext } from "react";
import { setId } from "~/utils";
import { HvFormElementContext, HvFormElementValueContext } from "~/components";
import { isRange } from "./utils";
import { HvSingleCalendar } from "./SingleCalendar";
import calendarClasses, { HvCalendarClasses } from "./calendarClasses";
import clsx from "clsx";
import { StyledRangeCalendarContainer, StyledRoot } from "./Calendar.styles";

export const HvCalendar = ({
  classes,
  id,
  locale = "en-US",
  value,
  visibleMonth,
  visibleYear,
  rightVisibleMonth,
  rightVisibleYear,
  minimumDate,
  maximumDate,
  startAdornment,
  onChange,
  onInputChange,
  onVisibleDateChange,
  ...others
}: HvCalendarProps) => {
  const { elementId } = useContext(HvFormElementContext);
  const elementValue = useContext(HvFormElementValueContext);
  const localValue = value ?? elementValue;
  const localId = id ?? setId(elementId, "single-calendar");
  const rangeMode = isRange(localValue);
  const rightCalendarId = setId(localId, "single-calendar-right");
  const clampedMonth =
    visibleMonth && visibleMonth % 13 > 0 ? visibleMonth % 13 : 1;

  const singleCalendar = (
    <HvSingleCalendar
      id={localId}
      locale={locale}
      value={localValue}
      visibleMonth={clampedMonth}
      visibleYear={visibleYear}
      minimumDate={minimumDate}
      maximumDate={maximumDate}
      onChange={onChange}
      onInputChange={(evt, date) =>
        onInputChange && onInputChange(evt, date, "left")
      }
      onVisibleDateChange={onVisibleDateChange}
      {...others}
    />
  );

  const rangeCalendar = (
    <StyledRangeCalendarContainer
      className={clsx(
        calendarClasses.rangeCalendarContainer,
        classes?.rangeCalendarContainer
      )}
    >
      <HvSingleCalendar
        className={clsx(
          calendarClasses.singleCalendar,
          classes?.singleCalendar
        )}
        id={localId}
        locale={locale}
        value={localValue}
        visibleMonth={clampedMonth}
        visibleYear={visibleYear}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        onChange={onChange}
        onInputChange={(evt, date) =>
          onInputChange && onInputChange(evt, date, "left")
        }
        onVisibleDateChange={(event, action, index) =>
          onVisibleDateChange?.(event, action, index, "left")
        }
        {...others}
      />

      <HvSingleCalendar
        className={clsx(
          calendarClasses.singleCalendar,
          classes?.singleCalendar
        )}
        id={rightCalendarId}
        locale={locale}
        value={localValue}
        visibleMonth={rightVisibleMonth}
        visibleYear={rightVisibleYear}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        onChange={onChange}
        onInputChange={(evt, date) =>
          onInputChange && onInputChange(evt, date, "right")
        }
        onVisibleDateChange={(event, action, index) => {
          onVisibleDateChange?.(event, action, index, "right");
        }}
        showEndDate
        {...others}
      />
    </StyledRangeCalendarContainer>
  );

  return (
    <StyledRoot className={clsx(calendarClasses.root, classes?.root)}>
      {startAdornment}
      {rangeMode ? rangeCalendar : singleCalendar}
    </StyledRoot>
  );
};

export interface DateRangeProp {
  startDate: Date;
  endDate?: Date;
}

export type VisibilitySelectorActions =
  | "previous_month"
  | "next_month"
  | "previous_year"
  | "next_year"
  | "month"
  | "month_year";

export interface HvCalendarProps {
  /**
   * Styles applied from the theme.
   */
  classes?: HvCalendarClasses;
  /**
   * Identifier.
   */
  id?: string;
  /**
   * The calendar locale. If undefined, it defaults to en-US
   *
   */
  locale?: string;
  /**
   * Date that the calendar would show.
   * if using the object format the calendar enter in range mode showing two calendars
   */
  value?: DateRangeProp | Date;
  /**
   * Controls the visible month of the Calendar
   */
  visibleMonth?: number;
  /**
   * Controls the visible year of the Calendar
   */
  visibleYear?: number;
  /**
   * Controls the visible month of the Calendar on the right side of the datepicker
   */
  rightVisibleMonth?: number;
  /**
   * Controls the visible year of the Calendar on the right side of the datepicker
   */
  rightVisibleYear?: number;
  /**
   * Callback function to be triggered when the selected date has changed.
   */
  onChange?: (
    event:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | undefined,
    value: Date | DateRangeProp
  ) => void;
  /**
   * Callback function to be triggered when the selected date input has changed.
   */
  onInputChange?: (
    event:
      | React.ChangeEvent<
          HTMLTextAreaElement | HTMLInputElement | HTMLButtonElement
        >
      | undefined,
    value: Date | DateRangeProp,
    position: "left" | "right"
  ) => void;
  /**
   * Callback function to be triggered when the user clicks on the month or year selector.
   * it receives the action that was pressed:
   * previous_month, next_month, previous_year, next_year,month
   */
  onVisibleDateChange?: (
    event:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | undefined,
    action: VisibilitySelectorActions,
    value?: Date | DateRangeProp | number,
    position?: "left" | "right"
  ) => void;
  /**
   * The maximum selectable date after this all values are disabled.
   */
  maximumDate?: Date;
  /**
   * The minimum selectable date before this all values are disabled.
   */
  minimumDate?: Date;
  /**
   * An element placed before the Calendar
   */
  startAdornment?: React.ReactNode;
  /**
   * Indicates if header should display the day of week.
   */
  showDayOfWeek?: boolean;
}
