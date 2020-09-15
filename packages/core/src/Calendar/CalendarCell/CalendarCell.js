import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import withTooltip from "../../withTooltip";
import {
  getDateISO,
  getFormattedDate,
  isSameDay,
  isSameMonth,
  dateInProvidedValueRange,
  checkIfDateIsDisabled
} from "../utils";
import HvTypography from "../../Typography";
import styles from "./styles";

const HvCalendarCell = ({
  classes,
  onChange,
  calendarValue,
  firstDayOfCurrentMonth,
  arrowKeysFocus,
  value,
  isDateSelectionMode,
  today,
  locale,
  minimumDate,
  maximumDate,
  rangeMode,
  ...others
}) => {
  const { startDate, endDate } = calendarValue;
  const isCellToday = isSameDay(value, today);
  const isCellSelected = calendarValue && isSameDay(value, calendarValue);
  const inMonth = isSameMonth(value, firstDayOfCurrentMonth);
  const isCellAfterStartingDate = rangeMode ? value >= startDate : false;
  const isCellStartingDate = rangeMode ? isSameDay(value, startDate) : false;
  const isDateInSelectionRange =
    calendarValue && rangeMode ? dateInProvidedValueRange(value, calendarValue) : false;
  const isDateDisabled =
    minimumDate || maximumDate ? checkIfDateIsDisabled(value, minimumDate, maximumDate) : false;
  const startBookend = isSameDay(startDate, value);
  const endBookend = isSameDay(endDate, value);

  const onClickFunc = event => {
    onChange(event, value);
  };

  const DateDisplay = () => (
    <div
      className={clsx(classes.cellContainer, { [classes.focusSelection]: inMonth })}
      onClick={!isDateDisabled ? onClickFunc : undefined}
      onKeyDown={event => arrowKeysFocus(event, onClickFunc, 7)}
      role="button"
      tabIndex={0}
      {...others}
    >
      <HvTypography
        variant={isCellToday ? "highlightText" : "normalText"}
        className={clsx(classes.calendarDate, {
          [classes.calendarDateSelected]: inMonth && isCellSelected,
          [classes.calendarDateNotInMonth]: !inMonth,
          [classes.calendarDateInSelectionRange]: inMonth && rangeMode && isDateInSelectionRange,
          [classes.calendarDateDisabled]: isDateDisabled,
          [classes.startBookend]:
            inMonth && ((startBookend && rangeMode) || (isCellStartingDate && isDateSelectionMode)),
          [classes.endBookend]: inMonth && endBookend && rangeMode
        })}
      >
        {value.getUTCDate()}
      </HvTypography>
    </div>
  );

  const tooltipContainerProps = {
    className: clsx({
      [classes.cellsInRange]:
        inMonth && rangeMode && isDateSelectionMode && isCellAfterStartingDate,
      [classes.cellsOutsideRange]: rangeMode && !(isDateSelectionMode && isCellAfterStartingDate)
    })
  };

  const DateTooltipWrapper = withTooltip(
    DateDisplay,
    getFormattedDate(value, locale),
    undefined,
    undefined,
    undefined,
    tooltipContainerProps
  );
  // TODO: Maybe we could have a custom tooltip for the calendar to avoid passing so many subprops
  return <DateTooltipWrapper key={getDateISO(value)} />;
};

HvCalendarCell.propTypes = {
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * Identifier.
   */
  id: PropTypes.string,
  /**
   * The text to be shown on the main part of the header.
   */
  calendarValue: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
    PropTypes.shape({ startDate: PropTypes.instanceOf(Date), endDate: PropTypes.instanceOf(Date) })
  ]),
  /**
   * The text to be shown on the main part of the header.
   */
  value: PropTypes.instanceOf(Date),
  /**
   * Locale to be used by the calendar.
   */
  locale: PropTypes.string,
  /**
   * Callback to define the input date.
   */
  onChange: PropTypes.func,
  /**
   * Callback to handle input onFocus.
   */
  onFocus: PropTypes.func,
  calendarModel: PropTypes.instanceOf(Object),
  arrowKeysFocus: PropTypes.func,
  today: PropTypes.instanceOf(Date),
  minimumDate: PropTypes.instanceOf(Date),
  maximumDate: PropTypes.instanceOf(Date),
  firstDayOfCurrentMonth: PropTypes.instanceOf(Date),
  isDateSelectionMode: PropTypes.bool,
  rangeMode: PropTypes.bool
};

export default withStyles(styles, { name: "HvCalendarCell" })(HvCalendarCell);
