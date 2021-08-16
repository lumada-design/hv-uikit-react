/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

import React, { useState, useContext, useMemo } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import clsx from "clsx";
import isNil from "lodash/isNil";
import { isKeypress, KeyboardCodes, setId } from "../../utils";
import styles from "./styles";
import { HvFormElementDescriptorsContext } from "../../Forms/FormElement";
import { VIEW_MODE, REPRESENTATION_VALUES } from "../enums";
import { isRange, isDate, getWeekdayNamesList } from "../utils";
import { generateCalendarModel } from "../model";
import CalendarCell from "./CalendarCell";
import CalendarHeader from "../CalendarHeader";
import CalendarWeekLabels from "../CalendarWeekLabels";
import { HvComposedNavigation, HvMonthSelector } from "../CalendarNavigation";

const { Enter, ArrowLeft, ArrowRight, ArrowUp, ArrowDown } = KeyboardCodes;

const HvSingleCalendar = ({
  classes,
  className,
  id,
  locale,
  value,
  visibleMonth,
  visibleYear,
  minimumDate,
  maximumDate,
  onChange,
  onInputChange,
  onVisibleDateChange,
  showEndDate,
  children,
  ...others
}) => {
  // TODO: refactor this out
  const { HvCalendarHeader } = useContext(HvFormElementDescriptorsContext);

  const today = new Date();
  const localValue = isNil(value) ? today : value;

  const [calViewMode, setCalViewMode] = useState(VIEW_MODE.CALENDAR);

  // const dateCleared = { ...others };

  const rangeMode = isRange(localValue);
  const isDateSelectionMode = rangeMode && !isDate(localValue.endDate);
  const calModel = rangeMode
    ? generateCalendarModel(localValue.startDate, visibleMonth, visibleYear)
    : generateCalendarModel(localValue, visibleMonth, visibleYear);
  const firstDayOfCurrentMonth = new Date(calModel.year, calModel.month - 1, 1);
  const firstDayOfCurrentMonthTime = firstDayOfCurrentMonth.getTime();

  const listWeekdayNames = useMemo(
    () => getWeekdayNamesList(locale, REPRESENTATION_VALUES.NARROW),
    [locale]
  );

  const handleChange = (event, date) => {
    event?.preventDefault();
    onChange?.(event, date);
  };

  const handleInputChange = (event, date) => {
    event?.preventDefault();
    onInputChange?.(event, date);
  };

  const getNavChild = (event, siblings, i) => {
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
    const siblings = [...parent?.getElementsByClassName(classes.cellContainer)];
    const elIndex = siblings.indexOf(el);

    if (isKeypress(event, Enter)) {
      el?.focus();
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
      <CalendarCell
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
    <div className={clsx(className, classes.calendarContainer)} {...others}>
      <div id={id} className={classes.calendarWrapper}>
        <CalendarHeader
          id={setId(id, "header")}
          locale={locale}
          onChange={handleInputChange}
          showEndDate={showEndDate && !isDateSelectionMode}
          // dateCleared={dateCleared}
        />
        <>
          {calViewMode === VIEW_MODE.CALENDAR && (
            <div>
              <HvComposedNavigation
                id={id}
                locale={locale}
                onChange={onVisibleDateChange}
                onViewModeChange={(viewMode) => setCalViewMode(viewMode)}
                visibleYear={visibleYear || today.getFullYear()}
                visibleMonth={visibleMonth || today.getMonth() + 1}
              />
              <div className={classes.calendarGrid} aria-controls={HvCalendarHeader?.[0]?.id}>
                <CalendarWeekLabels labels={listWeekdayNames} />
                {calModel.dates.map(renderCalendarDate)}
              </div>
            </div>
          )}
          {calViewMode === VIEW_MODE.MONTHLY && (
            <HvMonthSelector
              id={id}
              locale={locale}
              onChange={onVisibleDateChange}
              onViewModeChange={(viewMode) => setCalViewMode(viewMode)}
              visibleMonth={visibleMonth || today.getMonth() + 1}
              rangeMode={rangeMode}
            />
          )}
        </>
      </div>
    </div>
  );
};

HvSingleCalendar.propTypes = {
  /**
   * Styles applied from the theme.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the external div containing the whole calendar.
     */
    calendarContainer: PropTypes.string,
    /**
     * Styles applied to the external div below the calendar wrapper.
     */
    calendarWrapper: PropTypes.string,
    /**
     * Styles applied to the element containing the cells that represents each date.
     */
    calendarGrid: PropTypes.string,
    /**
     * Styles applied to the element containing the buttons to change the visible month and year.
     */
    navigationContainer: PropTypes.string,
    /**
     * Styles applied to the cell when is focused.
     */
    focusSelection: PropTypes.string,
    /**
     * Styles applied to the buttons used to change the months.
     */
    navigationMonth: PropTypes.string,
    /**
     * Styles applied to the cells containing each date.
     */
    calendarDate: PropTypes.string,
    /**
     * Styles applied to the cells when the cell is outside the visible month.
     */
    calendarDateNotInMonth: PropTypes.string,
    /**
     * Styles applied to the cells when the cell is outside the visible month.
     */
    calendarDateSelected: PropTypes.string,
    /**
     * Styles applied to the cells when the cell is not valid.
     */
    calendarDateInvalid: PropTypes.string,
    /**
     * Styles applied to the cells when it is part of the selection.
     */
    calendarDateInSelectionRange: PropTypes.string,
    /**
     * Styles applied to the cells when it is not selectable.
     */
    calendarDateDisabled: PropTypes.string,
    /**
     * Styles applied to the cell when it is at the beginning of the selection.
     */
    startBookend: PropTypes.string,
    /**
     * Styles applied to the cell when it is at the end of the selection.
     */
    endBookend: PropTypes.string,
    /**
     * Styles applied to the cells when it is part of the selection in progress.
     */
    cellsInRange: PropTypes.string,
    /**
     * Styles applied to the cells when it is not part of the selection in progress.
     */
    cellsOutsideRange: PropTypes.string,
    cellContainer: PropTypes.string,
  }).isRequired,
  /**
   * Identifier.
   */
  id: PropTypes.string,
  /**
   * The class name to add at the root of the single calendar
   */
  className: PropTypes.string,
  /**
   * The calendar locale.
   *
   */
  locale: PropTypes.string,
  /**
   * Date that the calendar would show.
   */
  value: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.shape({ startDate: PropTypes.instanceOf(Date), endDate: PropTypes.instanceOf(Date) }),
  ]),
  /**
   * Date that will be used to know which month and year should be displayed on the calendar. The value of the day is
   * irrelevant.
   */
  visibleDate: PropTypes.instanceOf(Date),
  /**
   * Controls the visible month of the Calendar
   */
  visibleMonth: PropTypes.number,
  /**
   * Controls the visible month of the Calendar
   */
  visibleYear: PropTypes.number,
  /**
   * Callback function to be triggered when the selected date has changed.
   */
  onChange: PropTypes.func,
  /**
   * Callback function to be triggered when the selected date input has changed.
   */
  onInputChange: PropTypes.func,
  /**
   * Callback function to be triggered when visible date has changed.
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
   * Indicates if header should display end date in a date range.
   */
  showEndDate: PropTypes.bool,
  /**
   * Content on the upper part of the calendar.
   */
  children: PropTypes.node,
};

export default withStyles(styles, { name: "HvSingleCalendar" })(HvSingleCalendar);
