import React, { useContext } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import { setId } from "../utils";
import styles from "./styles";
import { HvFormElementContext, HvFormElementValueContext } from "../Forms/FormElement";
import { isRange } from "./utils";
import SingleCalendar from "./SingleCalendar";

const HvCalendar = ({
  classes,
  id,
  locale,
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
}) => {
  const { elementId } = useContext(HvFormElementContext);
  const elementValue = useContext(HvFormElementValueContext);
  const localValue = value ?? elementValue;
  const localId = id ?? setId(elementId, "single-calendar");
  const rangeMode = isRange(localValue);
  const rightCalendarId = setId(localId, "single-calendar-right");
  const clampedMonth = visibleMonth % 13 > 0 ? visibleMonth % 13 : 1;

  const singleCalendar = (
    <SingleCalendar
      id={localId}
      locale={locale}
      value={localValue}
      visibleMonth={clampedMonth}
      visibleYear={visibleYear}
      minimumDate={minimumDate}
      maximumDate={maximumDate}
      onChange={onChange}
      onInputChange={(evt, date) => onInputChange(evt, date, "left")}
      onVisibleDateChange={onVisibleDateChange}
      {...others}
    />
  );

  const rangeCalendar = (
    <div className={classes.rangeCalendarContainer}>
      <SingleCalendar
        className={classes.singleCalendar}
        id={localId}
        locale={locale}
        value={localValue}
        visibleMonth={clampedMonth}
        visibleYear={visibleYear}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        onChange={onChange}
        onInputChange={(evt, date) => onInputChange(evt, date, "left")}
        onVisibleDateChange={(event, action, index) =>
          onVisibleDateChange?.(event, action, index, "left")
        }
        {...others}
      />

      <SingleCalendar
        className={classes.singleCalendar}
        id={rightCalendarId}
        locale={locale}
        value={localValue}
        visibleMonth={rightVisibleMonth}
        visibleYear={rightVisibleYear}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        onChange={onChange}
        onInputChange={(evt, date) => onInputChange(evt, date, "right")}
        onVisibleDateChange={(event, action, index) => {
          onVisibleDateChange?.(event, action, index, "right");
        }}
        showEndDate
        {...others}
      />
    </div>
  );

  return (
    <div className={classes.root}>
      {startAdornment}
      {rangeMode ? rangeCalendar : singleCalendar}
    </div>
  );
};

HvCalendar.propTypes = {
  /**
   * Styles applied from the theme.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * Identifier.
   */
  id: PropTypes.string,
  /**
   * The calendar locale. If undefined, it defaults to en-US
   *
   */
  locale: PropTypes.string,
  /**
   * Date that the calendar would show.
   * if using the object format the calendar enter in range mode showing two calendars
   */
  value: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.shape({ startDate: PropTypes.instanceOf(Date), endDate: PropTypes.instanceOf(Date) }),
  ]),
  /**
   * Controls the visible month of the Calendar
   */
  visibleMonth: PropTypes.number,
  /**
   * Controls the visible year of the Calendar
   */
  visibleYear: PropTypes.number,
  /**
   * Controls the visible month of the Calendar on the right side of the datepicker
   */
  rightVisibleMonth: PropTypes.number,
  /**
   * Controls the visible year of the Calendar on the right side of the datepicker
   */
  rightVisibleYear: PropTypes.number,
  /**
   * Callback function to be triggered when the selected date has changed.
   */
  onChange: PropTypes.func,
  /**
   * Callback function to be triggered when the selected date input has changed.
   */
  onInputChange: PropTypes.func,
  /**
   * Callback function to be triggered when the user clicks on the month or year selector.
   * it receives the action that was pressed:
   * previous_month, next_month, previous_year, next_year,month
   */
  onVisibleDateChange: PropTypes.func,

  /**
   * The maximum selectable date after this all values are disabled.
   */
  maximumDate: PropTypes.instanceOf(Date),
  /**
   * The minimum selectable date before this all values are disabled.
   */
  minimumDate: PropTypes.instanceOf(Date),
  /**
   * An element placed before the Calendar
   */
  startAdornment: PropTypes.node,
};

export default withStyles(styles, { name: "HvCalendar" })(HvCalendar);
