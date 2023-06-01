import { useState, useMemo } from "react";
import { clsx } from "clsx";
import isNil from "lodash/isNil";
import { setId, keyboardCodes, isKeypress } from "@core/utils";
import { ViewMode } from "../enums";
import { isRange, isDate, getWeekdayNamesList } from "../utils";
import { generateCalendarModel } from "../model";
import { HvComposedNavigation, HvMonthSelector } from "../CalendarNavigation";
import { DateRangeProp, VisibilitySelectorActions } from "..";
import {
  StyledCalendarContainer,
  StyledCalendarGrid,
  StyledCalendarWrapper,
} from "./SingleCalendar.styles";
import singleCalendarClasses, {
  HvSingleCalendarClasses,
} from "./singleCalendarClasses";
import { HvCalendarCell } from "./CalendarCell";
import { HvCalendarWeekLabel } from "../CalendarWeekLabels";
import { HvCalendarHeader } from "../CalendarHeader/CalendarHeader";

const { Enter, ArrowLeft, ArrowRight, ArrowUp, ArrowDown } = keyboardCodes;

export const HvSingleCalendar = ({
  classes,
  className,
  id,
  locale = "en-US",
  value,
  visibleMonth,
  visibleYear,
  minimumDate,
  maximumDate,
  onChange,
  onInputChange,
  onVisibleDateChange,
  showEndDate,
  showDayOfWeek,
  invalidDateLabel,
  children,
  ...others
}: HvSingleCalendarProps) => {
  // TODO: refactor this out
  // const { HvCalendarHeader } = useContext(HvFormElementDescriptorsContext);

  const today = new Date();
  const localValue = isNil(value) ? today : value;

  const [calViewMode, setCalViewMode] = useState<ViewMode>("calendar");

  const rangeMode = isRange(localValue);
  const isDateSelectionMode = rangeMode && !isDate(localValue.endDate);
  const calModel = rangeMode
    ? generateCalendarModel(localValue.startDate, visibleMonth, visibleYear)
    : generateCalendarModel(localValue, visibleMonth, visibleYear);
  const firstDayOfCurrentMonth = new Date(calModel.year, calModel.month - 1, 1);
  const firstDayOfCurrentMonthTime = firstDayOfCurrentMonth.getTime();

  const listWeekdayNames = useMemo(
    () => getWeekdayNamesList(locale, "narrow"),
    [locale]
  );

  const handleChange = (event, date: Date | DateRangeProp) => {
    event?.preventDefault();
    onChange?.(event, date);
  };

  const handleInputChange = (event, date) => {
    event?.preventDefault();
    onInputChange?.(event, date);
  };

  const getNavChild = (event: KeyboardEvent, siblings, i: number) => {
    if (isKeypress(event, ArrowLeft)) return siblings[i - 1];
    if (isKeypress(event, ArrowRight)) return siblings[i + 1];
    if (isKeypress(event, ArrowUp)) return siblings[i - 7];
    if (isKeypress(event, ArrowDown)) return siblings[i + 7];
    return undefined;
  };

  const handleKeyDown = (event) => {
    // This code is very brittle and should be managed with the focus wrapper
    const el = document?.activeElement;
    const parent = el?.parentElement?.parentElement;
    const siblings =
      parent != null
        ? [
            ...parent.getElementsByClassName(
              singleCalendarClasses.cellContainer as string
            ),
          ]
        : [];
    const elIndex = el ? siblings.indexOf(el) : 0;

    if (isKeypress(event, Enter)) {
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

  /**
   * Renders the element representing the received date.
   *
   * @param currentDate - The array representing the date [YYYY, MM, DD].
   * @memberOf Calendar
   */
  const renderCalendarDate = (currentDate) => {
    return (
      <HvCalendarCell
        classes={classes}
        key={currentDate}
        tabIndex={currentDate.getTime() === firstDayOfCurrentMonthTime ? 0 : -1}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={currentDate}
        today={today}
        calendarValue={localValue}
        rangeMode={rangeMode}
        isDateSelectionMode={isDateSelectionMode}
        locale={locale}
        firstDayOfCurrentMonth={firstDayOfCurrentMonth}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
      />
    );
  };

  return (
    <StyledCalendarContainer
      className={clsx(
        className,
        singleCalendarClasses.calendarContainer,
        classes?.calendarContainer
      )}
      {...others}
    >
      <StyledCalendarWrapper
        id={id}
        className={clsx(
          singleCalendarClasses.calendarWrapper,
          classes?.calendarWrapper
        )}
      >
        <HvCalendarHeader
          id={setId(id, "header")}
          locale={locale}
          onChange={handleInputChange}
          showEndDate={showEndDate && !isDateSelectionMode}
          showDayOfWeek={showDayOfWeek}
          invalidDateLabel={invalidDateLabel}
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
            <StyledCalendarGrid
              className={clsx(
                singleCalendarClasses.calendarGrid,
                classes?.calendarGrid
              )}
              aria-controls={HvCalendarHeader?.[0]?.id}
            >
              <HvCalendarWeekLabel labels={listWeekdayNames} />
              {calModel.dates.map(renderCalendarDate)}
            </StyledCalendarGrid>
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
      </StyledCalendarWrapper>
    </StyledCalendarContainer>
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
  value?: string | Date | DateRangeProp;
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
    value: Date | DateRangeProp,
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
   * Content on the upper part of the calendar.
   */
  children?: React.ReactNode;
  /**
   * Label shown when date is invalid.
   */
  invalidDateLabel?: string;
}
