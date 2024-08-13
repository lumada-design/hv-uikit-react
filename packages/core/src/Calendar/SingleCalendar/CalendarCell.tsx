import { useRef } from "react";
import {
  useDefaultProps,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";

import { HvTypography } from "../../Typography";
import CalendarModel from "../model";
import { DateRangeProp } from "../types";
import {
  checkIfDateIsDisabled,
  dateInProvidedValueRange,
  isDateRangeProp,
  isSameDay,
  isSameMonth,
} from "../utils";
import { staticClasses, useClasses } from "./CalendarCell.styles";

export { staticClasses as calendarCellClasses };

export type HvCalendarCellClasses = ExtractNames<typeof useClasses>;

export const HvCalendarCell = (props: HvCalendarCellProps) => {
  const {
    classes: classesProp,
    onChange,
    onKeyDown,
    calendarValue,
    firstDayOfCurrentMonth,
    value,
    isDateSelectionMode,
    today,
    locale,
    minimumDate,
    maximumDate,
    rangeMode = false,
    ...others
  } = useDefaultProps("HvCalendarCell", props);

  const { classes, cx } = useClasses(classesProp);

  const buttonEl = useRef<HTMLButtonElement>(null);

  const startDate = isDateRangeProp(calendarValue)
    ? calendarValue.startDate
    : undefined;
  const endDate = isDateRangeProp(calendarValue)
    ? calendarValue.endDate
    : undefined;
  const isCellToday = isSameDay(value, today);
  const isCellSelected = isSameDay(calendarValue, value);
  const inMonth = isSameMonth(value, firstDayOfCurrentMonth);
  const isCellAfterStartingDate =
    rangeMode && value && startDate ? value >= startDate : false;
  const isCellStartingDate = rangeMode ? isSameDay(value, startDate) : false;
  const isDateInSelectionRange =
    calendarValue && rangeMode
      ? dateInProvidedValueRange(value, calendarValue)
      : false;
  const isDateDisabled = checkIfDateIsDisabled(value, minimumDate, maximumDate);
  const startBookend = isSameDay(startDate, value);
  const endBookend = isSameDay(endDate, value);
  const isSelecting = isDateSelectionMode && isCellAfterStartingDate;

  const handleClick = (event: React.SyntheticEvent) => {
    if (value) {
      onChange?.(event, value);
      if (buttonEl.current) setTimeout(() => buttonEl?.current?.focus());
    }
  };

  const handleKeyDown = (event: any) => {
    onKeyDown?.(event);
  };

  const renderDate = () => (
    <button
      ref={buttonEl}
      type="button"
      className={cx(classes.cellContainer, {
        [classes.focusSelection]: inMonth,
      })}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={isDateDisabled || !inMonth}
      data-in-month={inMonth}
      {...others}
    >
      <HvTypography
        variant={isCellToday ? "label" : "body"}
        className={cx(classes.calendarDate, {
          [classes.calendarDateSelected]: inMonth && isCellSelected,
          [classes.calendarDateNotInMonth]: !inMonth,
          [classes.calendarDateInSelectionRange]:
            inMonth && rangeMode && isDateInSelectionRange,
          [classes.calendarDateDisabled]: isDateDisabled,
          [classes.startBookend]:
            inMonth &&
            ((startBookend && rangeMode) ||
              (isCellStartingDate && isDateSelectionMode)),
          [classes.endBookend]: inMonth && endBookend && rangeMode,
        })}
      >
        {value?.getDate()}
      </HvTypography>
    </button>
  );

  return (
    <div
      className={cx(classes.dateWrapper, {
        [classes.cellsInRange]: inMonth && rangeMode && isSelecting,
        [classes.cellsOutsideRange]: rangeMode && !isSelecting,
      })}
      data-calendar-cell="calendarCell"
    >
      {renderDate()}
    </div>
  );
};

export interface HvCalendarCellProps {
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes?: HvCalendarCellClasses;
  /**
   * Identifier.
   */
  id?: string;
  /**
   * The text to be shown on the main part of the header.
   */
  calendarValue?: string | Date | DateRangeProp;
  /**
   * The text to be shown on the main part of the header.
   */
  value?: Date;
  /**
   * Locale to be used by the calendar.
   */
  locale?: string;
  /**
   * Callback to define the input date.
   */
  onChange?: (event: React.SyntheticEvent, value: Date | DateRangeProp) => void;
  /**
   * Callback to handle input onFocus.
   */
  onFocus?: React.FocusEventHandler<any>;

  calendarModel?: CalendarModel;
  onKeyDown?: (event: KeyboardEvent) => void;

  today?: Date;
  minimumDate?: Date;
  maximumDate?: Date;
  firstDayOfCurrentMonth?: Date;
  isDateSelectionMode?: boolean;
  rangeMode?: boolean;
  tabIndex?: number;
}

export default HvCalendarCell;
