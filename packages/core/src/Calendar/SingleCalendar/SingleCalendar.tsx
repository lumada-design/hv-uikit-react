import { useState, useMemo } from "react";

import { isKey } from "../../utils/keyboardUtils";
import { setId } from "../../utils/setId";

import { ExtractNames } from "../../utils/classes";
import { HvTypography } from "../../Typography";

import { ViewMode } from "../enums";
import { isRange, isDate, getWeekdayNamesList } from "../utils";
import { generateCalendarModel } from "../model";
import { HvComposedNavigation, HvMonthSelector } from "../CalendarNavigation";
import { DateRangeProp, VisibilitySelectorActions } from "../types";

import { HvCalendarCell } from "./CalendarCell";
import { HvCalendarHeader } from "../CalendarHeader/CalendarHeader";

import { staticClasses, useClasses } from "./SingleCalendar.styles";

export { staticClasses as singleCalendarClasses };

export type HvSingleCalendarClasses = ExtractNames<typeof useClasses>;

export const HvSingleCalendar = ({
  classes: classesProp,
  className,
  id,
  locale = "en-US",
  value,
  visibleMonth,
  visibleYear,
  minimumDate,
  maximumDate,
  showEndDate,
  showDayOfWeek,
  showTime = false,
  rangeSide = "start",
  invalidDateLabel,
  children,
  onChange,
  onInputChange,
  onVisibleDateChange,
  ...others
}: HvSingleCalendarProps) => {
  // TODO: refactor this out
  // const { HvCalendarHeader } = useContext(HvFormElementDescriptorsContext);

  const { classes, cx } = useClasses(classesProp);

  const today = new Date();
  const localValue = value ?? today;

  const [calViewMode, setCalViewMode] = useState<ViewMode>("calendar");

  const rangeMode = isRange(localValue);
  const isDateSelectionMode = rangeMode && !isDate(localValue.endDate);
  const calModel = rangeMode
    ? generateCalendarModel(localValue.startDate, visibleMonth, visibleYear)
    : generateCalendarModel(localValue, visibleMonth, visibleYear);
  const firstDayOfCurrentMonth = new Date(calModel.year, calModel.month - 1, 1);
  const firstDayOfCurrentMonthTime = firstDayOfCurrentMonth.getTime();

  const listWeekdayNames = useMemo(() => getWeekdayNamesList(locale), [locale]);

  const handleChange = (event: any, date: Date | DateRangeProp) => {
    event?.preventDefault();
    onChange?.(event, date);
  };

  const getNavChild = (event: KeyboardEvent, siblings: any, i: number) => {
    if (isKey(event, "ArrowLeft")) return siblings[i - 1];
    if (isKey(event, "ArrowRight")) return siblings[i + 1];
    if (isKey(event, "ArrowUp")) return siblings[i - 7];
    if (isKey(event, "ArrowDown")) return siblings[i + 7];
    return undefined;
  };

  const handleKeyDown = (event: any) => {
    // This code is very brittle and should be managed with the focus wrapper
    const el = document?.activeElement;
    const parent = el?.parentElement?.parentElement;
    const siblings =
      parent != null
        ? Array.from(
            parent.getElementsByClassName(classes.cellContainer as string)
          )
        : [];
    const elIndex = el ? siblings.indexOf(el) : 0;

    if (isKey(event, "Enter")) {
      (el as HTMLElement).focus();
      return;
    }

    const child = getNavChild(event, siblings, elIndex);

    if (child) {
      const inMonth = child.getAttribute("data-in-month");
      if (inMonth === "true") {
        event?.preventDefault();
        child?.focus();
      }
    }
  };

  const renderWeekLabel = (dayName: string, index: number) => (
    <HvTypography key={index} variant="label" className={classes.calendarDay}>
      {dayName}
    </HvTypography>
  );

  /** Renders the element representing the received date. */
  const renderCalendarDate = (currentDate: Date) => {
    return (
      <HvCalendarCell
        classes={classes}
        key={currentDate.toString()}
        tabIndex={currentDate.getTime() === firstDayOfCurrentMonthTime ? 0 : -1}
        value={currentDate}
        today={today}
        calendarValue={localValue}
        rangeMode={rangeMode}
        isDateSelectionMode={isDateSelectionMode}
        locale={locale}
        firstDayOfCurrentMonth={firstDayOfCurrentMonth}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    );
  };

  const headerValue = useMemo(() => {
    return new Date(
      isRange(value)
        ? value[rangeSide === "start" ? "startDate" : "endDate"] ?? ""
        : value ?? ""
    );
  }, [rangeSide, value]);

  return (
    <div className={cx(classes.calendarContainer, className)} {...others}>
      <div id={id} className={classes.calendarWrapper}>
        <HvCalendarHeader
          id={setId(id, "header")}
          locale={locale}
          value={headerValue}
          showTime={showTime}
          showEndDate={showEndDate && !isDateSelectionMode}
          showDayOfWeek={showDayOfWeek}
          invalidDateLabel={invalidDateLabel}
          onChange={handleChange}
        />
        {calViewMode === "calendar" && (
          <div>
            <HvComposedNavigation
              id={id}
              locale={locale}
              onChange={onVisibleDateChange}
              onViewModeChange={setCalViewMode}
              visibleYear={visibleYear || today.getFullYear()}
              visibleMonth={visibleMonth || today.getMonth() + 1}
            />
            <div
              className={classes.calendarGrid}
              // @ts-ignore TODO: review
              aria-controls={HvCalendarHeader?.[0]?.id}
            >
              {listWeekdayNames.map(renderWeekLabel)}
              {calModel.dates.map(renderCalendarDate)}
            </div>
          </div>
        )}
        {calViewMode === "monthly" && (
          <HvMonthSelector
            id={id}
            locale={locale}
            onChange={onVisibleDateChange}
            onViewModeChange={setCalViewMode}
            visibleMonth={visibleMonth || today.getMonth() + 1}
            rangeMode={rangeMode}
          />
        )}
      </div>
    </div>
  );
};

export interface HvSingleCalendarProps {
  /**
   * Styles applied from the theme.
   */
  classes?: HvSingleCalendarClasses;
  /**
   * Identifier.
   */
  id?: string;
  /**
   * The class name to add at the root of the single calendar
   */
  className?: string;
  /**
   * The calendar locale.
   *
   */
  locale: string;
  /**
   * Date that the calendar would show.
   */
  value?: Date | DateRangeProp;
  /**
   * Date that will be used to know which month and year should be displayed on the calendar. The value of the day is
   * irrelevant.
   */
  visibleDate?: Date;
  /**
   * Controls the visible month of the Calendar
   */
  visibleMonth?: number;
  /**
   * Controls the visible month of the Calendar
   */
  visibleYear?: number;
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
    value: Date,
    position?: "left" | "right"
  ) => void;
  /**
   * Callback function to be triggered when visible date has changed.
   */
  onVisibleDateChange?: (
    event:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | undefined,
    action: VisibilitySelectorActions,
    value?: Date | DateRangeProp | number
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
   * Indicates if header should display end date in a date range.
   */
  showEndDate?: boolean;
  /**
   * Indicates if header should display the day of week.
   */
  showDayOfWeek?: boolean;
  /**
   * Info about range side
   */
  rangeSide?: "start" | "end";
  /**
   * Indicates if header should display time selector.
   */
  showTime?: boolean;
  /**
   * Content on the upper part of the calendar.
   */
  children?: React.ReactNode;
  /**
   * Label shown when date is invalid.
   */
  invalidDateLabel?: string;
}
