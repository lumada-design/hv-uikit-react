import { SyntheticEvent, useRef } from "react";
import clsx from "clsx";
import {
  getDateISO,
  getFormattedDate,
  isSameDay,
  isSameMonth,
  dateInProvidedValueRange,
  checkIfDateIsDisabled,
  isDateRangeProp,
} from "../utils";
import { DateRangeProp } from "../Calendar";
import { HvTooltip, HvTypography } from "~/components";
import { useComputation } from "~/hooks";
import calendarCellClasses, {
  HvCalendarCellClasses,
} from "./calendarCellClasses";
import {
  StyledCalendarDate,
  StyledCellContainer,
  StyledDateWrapper,
} from "./CalendarCell.styles";
import CalendarModel from "../model";

export const HvCalendarCell = ({
  classes,
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
}: HvCalendarCellProps) => {
  const buttonEl = useRef<HTMLButtonElement>(null);
  const [title, computeTitle] = useComputation(() =>
    getFormattedDate(value, locale)
  );

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

  const handleClick = (event: SyntheticEvent) => {
    if (value) {
      onChange?.(event, value);
      if (buttonEl.current) setTimeout(() => buttonEl?.current?.focus());
    }
  };

  const handleKeyDown = (event) => {
    onKeyDown?.(event);
  };

  const renderDate = () => (
    <StyledCellContainer
      ref={buttonEl}
      type="button"
      className={clsx(
        calendarCellClasses.cellContainer,
        classes?.cellContainer,
        inMonth &&
          clsx(calendarCellClasses.focusSelection, classes?.focusSelection)
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={isDateDisabled || !inMonth}
      data-in-month={inMonth}
      {...others}
    >
      <StyledCalendarDate
        variant={isCellToday ? "highlightText" : "normalText"}
        className={clsx(
          calendarCellClasses.calendarDate,
          classes?.calendarDate,
          inMonth &&
            isCellSelected &&
            clsx(
              calendarCellClasses.calendarDateSelected,
              classes?.calendarDateSelected
            ),
          !inMonth &&
            clsx(
              calendarCellClasses.calendarDateNotInMonth,
              classes?.calendarDateNotInMonth
            ),
          inMonth &&
            rangeMode &&
            isDateInSelectionRange &&
            clsx(
              calendarCellClasses.calendarDateInSelectionRange,
              classes?.calendarDateInSelectionRange
            ),
          isDateDisabled &&
            clsx(
              calendarCellClasses.calendarDateDisabled,
              classes?.calendarDateDisabled
            ),
          inMonth &&
            ((startBookend && rangeMode) ||
              (isCellStartingDate && isDateSelectionMode)) &&
            clsx(calendarCellClasses.startBookend, classes?.startBookend),
          inMonth &&
            endBookend &&
            rangeMode &&
            clsx(calendarCellClasses.endBookend, classes?.endBookend)
        )}
      >
        {value && value.getDate()}
      </StyledCalendarDate>
    </StyledCellContainer>
  );

  return (
    <HvTooltip
      key={getDateISO(value)}
      enterDelay={600}
      onOpen={computeTitle}
      title={title ? <HvTypography noWrap>{title}</HvTypography> : ""}
    >
      <StyledDateWrapper
        className={clsx(
          calendarCellClasses.dateWrapper,
          classes?.dateWrapper,
          inMonth &&
            rangeMode &&
            isSelecting &&
            clsx(calendarCellClasses.cellsInRange, classes?.cellsInRange),
          rangeMode &&
            !isSelecting &&
            clsx(
              calendarCellClasses.cellsOutsideRange,
              classes?.cellsOutsideRange
            )
        )}
        data-calendar-cell="calendarCell"
      >
        {renderDate()}
      </StyledDateWrapper>
    </HvTooltip>
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
  onChange?: (event: SyntheticEvent, value: Date | DateRangeProp) => void;
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
