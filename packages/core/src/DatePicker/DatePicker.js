import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import isNil from "lodash/isNil";
import { ClickAwayListener, Popper, withStyles } from "@material-ui/core";
import CalendarIcon from "@hv/uikit-react-icons/dist/Calendar";
import clsx from "clsx";
import { isKeypress, KeyboardCodes, setId } from "../utils";
import Typography from "../Typography";
import Calendar from "../Calendar";
import Actions from "./Actions";
import styles from "./styles";
import withLabels from "../withLabels";
import withId from "../withId";
import {
  convertISOStringDateToDate,
  DEFAULT_LOCALE,
  getDateISO,
  getFormattedDate,
  isDate,
  isValidLocale
} from "../Calendar/utils";

const DEFAULT_LABELS = {
  applyLabel: "Apply",
  cancelLabel: "Cancel",
  title: undefined,
  placeholder: "Select a date",
  rangeStart: "Start date",
  rangeEnd: "End date"
};

/**
 * A graphical widget which allows the user to select a date.
 */
const HvDatePicker = ({
  id,
  className,
  labels,
  classes,
  value,
  startValue,
  endValue,
  rangeMode,
  horizontalPlacement,
  locale,
  showActions,
  onChange,
  theme,
  disablePortal,
  escapeWithReference
}) => {
  /**
   * Triggered right before the Render() function of the components.
   * Here we can update the state when a prop is changed.
   *
   * @static
   * @param {Object} props - The new props object.
   * @param {Object} state - The current state object.
   *
   * @returns {Object} - The updated state
   * @memberOf HvDatePicker
   */

  const validateLocale = useCallback(() => (isValidLocale(locale) ? locale : DEFAULT_LOCALE), [
    locale
  ]);

  const [datepickerLocale, setCalLocale] = useState(validateLocale(locale));

  const [startSelectedDate, setStartSelectedDate] = useState();
  const [endSelectedDate, setEndSelectedDate] = useState();
  const [tempStartSelectedDate, setTempStartSelectedDate] = useState();
  const [tempEndSelectedDate, setTempEndSelectedDate] = useState();

  const [startVisibleDate, setStartVisibleDate] = useState();
  const [endVisibleDate, setEndVisibleDate] = useState();
  const [tempSelectedDate, setTempSelectedDate] = useState();

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [created, setCreated] = useState();

  // eslint-disable-next-line no-unused-vars
  const [calendarPlacement, setCalendarPlacement] = useState();
  const [calendarFlipped, setCalendarFlipped] = useState();

  const calculatedSelectedDate = dateValue =>
    dateValue && dateValue !== "" ? convertISOStringDateToDate(dateValue) : null;

  const [selectedDate, setSelectedDate] = useState(calculatedSelectedDate(value));

  useEffect(() => {
    // update state
    if (rangeMode) {
      const calcStartSelectedDate =
        startValue && startValue !== "" ? convertISOStringDateToDate(startValue) : null;
      const calcEndSelectedDate =
        endValue && endValue !== "" ? convertISOStringDateToDate(endValue) : null;
      // Range mode state
      setStartSelectedDate(calcStartSelectedDate);
      setEndSelectedDate(calcEndSelectedDate);
      setTempStartSelectedDate(calcStartSelectedDate);
      setTempEndSelectedDate(calcEndSelectedDate);
      setStartVisibleDate(null);
      setEndVisibleDate(null);
    } else {
      setSelectedDate(calculatedSelectedDate(value));
      setTempSelectedDate(calculatedSelectedDate(value));
    }
  }, [value, startValue, endValue, rangeMode]);

  useEffect(() => {
    setCalLocale(validateLocale(locale));
  }, [locale, validateLocale]);

  /**
   * Resolves the state using the received props.
   *
   * @memberOf HvDatePicker
   */

  /**
   * Changes the calendar open state according to the received flag.
   *
   * @param {boolean} open - Opens / closes the calendar according to this flag.
   * @memberOf HvDatePicker
   */

  const createCalendarPlacement = data => {
    const { flipped, placement } = data;
    if (!created) {
      setCalendarPlacement(placement);
      setCalendarFlipped(flipped);
      setCreated(true);
    }
  };

  /**
   * Updates the calendar placement in case the Popper placement changed.
   *
   * @param {Object} data - The data provided by the popper plugin.
   * @memberOf HvDatePicker
   */
  const updateCalendarPlacement = data => {
    if (calendarFlipped !== data.flipped) {
      setCalendarPlacement(data.placement);
      setCalendarFlipped(data.flipped);
    }
  };

  /**
   * Set the date in the input, and changes the calendar visibility (hide).
   *
   * @param {Date} date - Date value that was selected.
   * @param closeCalendar
   * @memberOf HvDatePicker
   */
  const setSingleDate = (date, closeCalendar) => {
    setSelectedDate(date);
    setTempSelectedDate(date);

    setCalendarOpen(!closeCalendar);

    if (typeof onChange === "function") {
      onChange(getDateISO(date));
    }
  };

  /**
   * Set the date in the input, and changes the calendar visibility (hide).
   *
   * @param {Date} startDate - Start date value that was selected.
   * @param {Date} endDate - End date value that was selected.
   * @memberOf HvDatePicker
   */
  const setRangeDate = (startDate, endDate) => {
    setStartSelectedDate(startDate);
    setEndSelectedDate(endDate);

    setCalendarOpen(false);

    if (typeof onChange === "function") {
      onChange(getDateISO(startDate), getDateISO(endDate));
    }
  };

  /**
   * Handles the `Apply` action. Both single and ranged modes are handled here.
   *
   * @memberOf HvDatePicker
   */
  const handleApplyAction = () => {
    if (rangeMode) {
      if (tempStartSelectedDate && tempEndSelectedDate) {
        setRangeDate(tempStartSelectedDate, tempEndSelectedDate);
      }
    } else {
      tempSelectedDate ? setSingleDate(tempSelectedDate, true) : undefined;
    }
  };

  /**
   * Cancels the date selection and closes the Calendar component.
   *
   * @memberOf HvDatePicker
   */
  const cancelDateSelection = () => {
    if (rangeMode) {
      setTempStartSelectedDate(startSelectedDate);
      setTempEndSelectedDate(endSelectedDate);
    } else {
      setTempSelectedDate(selectedDate);
    }

    setCalendarOpen(false);
  };

  /**
   * Handles the click on the Calendar icon inside the input.
   *
   * @memberOf HvDatePicker
   */

  const [calendarAnchorElement, setCalendarAnchorElement] = useState();

  const handleCalendarIconClick = event => {
    const { currentTarget } = event;

    setCalendarAnchorElement(currentTarget);
    setCalendarOpen(!calendarOpen);
  };

  /**
   * Handles the `Cancel` action. Both single and ranged modes are handled here.
   *
   * @memberOf HvDatePicker
   */
  const handleCancelAction = () => {
    cancelDateSelection();
  };

  /**
   * Handle keyboard click in the input.
   *
   * @param event
   */
  const handleKeyboardClick = event => {
    if (isKeypress(event, KeyboardCodes.Enter)) {
      handleCalendarIconClick(event);
    }
  };

  /**
   * Handles the event of clicking away from the Calendar.
   *
   * @param {Object} event - The event triggered when clicking outside of the calendar container.
   * @memberOf HvDatePicker
   */
  const handleCalendarClickAway = event => {
    if (event.target.id !== `${id}`) {
      cancelDateSelection();
    }
  };

  /**
   * Gets the formatted selected value to be displayed on the input.
   *
   * @memberOf HvDatePicker
   */
  const getFormattedSelectedDate = () => {
    if (rangeMode) {
      if (isDate(startSelectedDate) && isDate(endSelectedDate)) {
        return `${getFormattedDate(startSelectedDate, locale)} - ${getFormattedDate(
          endSelectedDate,
          datepickerLocale
        )}`;
      }
    }

    return isDate(selectedDate) ? getFormattedDate(selectedDate, datepickerLocale) : "";
  };

  /**
   * Single Calendar
   */

  /**
   * Handles the `handleDateChange` action from the Calendar component when in single mode. If the `showActions` prop
   * is set to false then the date is immediately applied and the Calendar closed, otherwise the Calendar remains open.
   *
   * @param {Date} date - Date value received from the Calendar component.
   * @param {boolean} closeCalendar - if it should close the date picker.
   * @memberOf HvDatePicker
   */
  const handleSingleCalendarDateChange = (date, closeCalendar = true) => {
    // const { showActions } = props;

    if (!showActions) {
      setSingleDate(date, closeCalendar);
    } else {
      setTempSelectedDate(date);
    }
  };

  /**
   * Range Calendars functions
   */

  /**
   * Handles the `handleDateChange` action from the Calendar component associated to the Start/End date when in range mode.
   *
   * @param {Date} date - Date value received from the Calendar component.
   * @memberOf HvDatePicker
   */
  const handleCalendarDateChange = (date, origin) => {
    if (origin === "start") {
      if (tempStartSelectedDate !== date) {
        setTempStartSelectedDate(date);
        if (tempEndSelectedDate === null) {
          setTempEndSelectedDate(date);
        } else if (date > tempEndSelectedDate) {
          setTempEndSelectedDate(date);
        }
      }
    } else if (origin === "end") {
      if (tempEndSelectedDate !== date) {
        setTempEndSelectedDate(date);
        if (tempStartSelectedDate === null) {
          setTempStartSelectedDate(date);
        } else if (tempEndSelectedDate > date) {
          setTempStartSelectedDate(date);
        }
      }
    }
  };

  /**
   * Renders the Label element.
   *
   * @memberOf HvDatePicker
   */
  const renderLabel = () => {
    return (
      <Typography
        id={setId(id, "label")}
        variant="highlightText"
        component="label"
        className={classes.label}
      >
        {labels.title}
      </Typography>
    );
  };

  /**
   * Renders the container for the action elements.
   *
   * @memberOf HvDatePicker
   */
  const renderActions = () => {
    const actionLabels = {
      applyLabel: labels.applyLabel,
      cancelLabel: labels.cancelLabel
    };

    if (rangeMode) {
      return (
        <div className={classes.rangeCalendarsFooter}>
          <div className={classes.rangeFooterLeft} />
          <div className={classes.rangeFooterRight}>
            <Actions
              id={setId(id, "action")}
              onCancel={() => handleCancelAction()}
              onApply={() => handleApplyAction()}
              labels={actionLabels}
            />
          </div>
        </div>
      );
    }

    return (
      <div className={classes.singleCalendarFooter}>
        <Actions
          id={setId(id, "action")}
          onCancel={() => handleCancelAction()}
          onApply={() => handleApplyAction()}
          labels={actionLabels}
        />
      </div>
    );
  };

  /**
   * Renders one calendar component.
   *
   * @memberOf Calendar
   */
  const renderSingleCalendar = () => {
    return (
      <div className={classes.calendarContainer}>
        <Calendar
          id={setId(id, "calendar")}
          handleDateChange={(date, close) => handleSingleCalendarDateChange(date, close)}
          selectedDate={tempSelectedDate}
          locale={datepickerLocale}
          rangeMode={rangeMode}
          flipped={calendarFlipped}
        />
        {showActions && renderActions()}
      </div>
    );
  };

  /**
   * Renders two calendar for range mode.
   *
   * @memberOf Calendar
   */

  const renderRangeCalendars = () => {
    return (
      <div className={classes.rangeMainContainer}>
        <div className={classes.rangeCalendarsContainer}>
          <div className={classes.rangeLeftCalendarContainer}>
            <Calendar
              id={setId(id, "calendar-start")}
              handleDateChange={date => handleCalendarDateChange(date, "start")}
              selectedDate={tempStartSelectedDate}
              visibleDate={startVisibleDate}
              locale={datepickerLocale}
              rangeMode={rangeMode}
              label={labels.rangeStart}
              flipped={calendarFlipped}
              inDatepicker
            />
          </div>

          <div className={classes.rangeRightCalendarContainer}>
            <Calendar
              id={setId(id, "calendar-end")}
              handleDateChange={date => handleCalendarDateChange(date, "end")}
              selectedDate={tempEndSelectedDate}
              visibleDate={endVisibleDate}
              locale={datepickerLocale}
              rangeMode={rangeMode}
              label={labels.rangeEnd}
              flipped={calendarFlipped}
              inDatepicker
            />
          </div>
        </div>
        {renderActions()}
      </div>
    );
  };

  /**
   * Renders the input.
   *
   * @memberOf Calendar
   */
  const renderInput = () => {
    const naming = {
      "aria-label": isNil(labels) || isNil(labels.title) ? "Date input" : undefined,
      "aria-labelledby": labels && labels.title ? setId(id, "label") : undefined
    };

    return (
      <>
        {labels && labels.title && renderLabel()}
        <div
          className={clsx(className, classes.root, {
            [classes.inputCalendarOpen]: calendarOpen,
            [classes.inputCalendarClosed]: !calendarOpen
          })}
          onKeyDown={handleKeyboardClick}
          onClick={handleCalendarIconClick}
          role="button"
          tabIndex={0}
          id={id}
          {...naming}
        >
          <input
            className={classes.input}
            value={getFormattedSelectedDate()}
            placeholder={labels.placeholder}
            type="text"
            readOnly
            tabIndex={-1}
            {...naming}
          />
          <CalendarIcon tabIndex={-1} className={classes.icon} />
        </div>
      </>
    );
  };

  /**
   * Renders the Popper component with the calendars inside.
   *
   * @memberOf HvDatePicker
   */
  const renderPopper = () => {
    const RenderCalendar = rangeMode ? renderRangeCalendars() : renderSingleCalendar();
    return (
      <Popper
        id={setId(id, "tooltip")}
        open={calendarOpen}
        placement={horizontalPlacement === "left" ? "bottom-start" : "bottom-end"}
        anchorEl={calendarAnchorElement}
        disablePortal={disablePortal}
        popperOptions={{
          onCreate: createCalendarPlacement,
          onUpdate: updateCalendarPlacement
        }}
        modifiers={{
          preventOverflow: {
            // Follows the anchor element outside of the boundaries.
            escapeWithReference
          }
        }}
        style={{
          zIndex: `${calendarFlipped ? theme.zIndex.tooltip : 1}`
        }}
      >
        <ClickAwayListener onClickAway={handleCalendarClickAway}>
          <div>
            {!calendarFlipped && (
              <div className={clsx(classes.popperRoot, classes.listBorderDown)} />
            )}
            <div
              className={clsx(classes.popperRoot, {
                [classes.calendarOpenDown]: calendarOpen && !calendarFlipped,
                [classes.calendarOpenUp]: calendarOpen && calendarFlipped
              })}
            >
              {RenderCalendar}
            </div>
            {calendarFlipped && <div className={clsx(classes.popperRoot, classes.listBorderUp)} />}
          </div>
        </ClickAwayListener>
      </Popper>
    );
  };

  /**
   * Renders the DatePicker component.
   *
   * @returns
   * @memberOf HvDatePicker
   */

  return (
    <div className={classes.datePickerContainer}>
      {renderInput()}
      {renderPopper()}
    </div>
  );
};

HvDatePicker.propTypes = {
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * Class name to be applied.
   */
  className: PropTypes.string,
  /**
   * An object containing all the labels for the datepicker.
   */
  labels: PropTypes.shape({
    /**
     * Apply button label.
     */
    applyLabel: PropTypes.string,
    /**
     * Cancel button label.
     */
    cancelLabel: PropTypes.string,
    /**
     * Text above the input/dropdown.
     */
    title: PropTypes.string,
    /**
     * Start date label.
     */
    rangeStart: PropTypes.string,
    /**
     * End date label.
     */
    rangeEnd: PropTypes.string,
    /**
     * Text inside the input/dropdown
     */
    placeholder: PropTypes.string
  }),
  /**
   * A Jss Object used to override or extend the styles applied to the input/calendar box.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * The initial value of the input when in single calendar mode.
   */
  value: PropTypes.string,
  /**
   * The initial value for the start date when in range mode.
   */
  startValue: PropTypes.string,
  /**
   * The initial value for the end date when in range mode.
   */
  endValue: PropTypes.string,
  /**
   * Flag informing if the the component should be in range mode or in single mode.
   */
  rangeMode: PropTypes.bool,
  /**
   * The placement where the calendar should be placed according to the input. Options are `left` or `right`.
   * Note this prop only affects the calendar when in `rangeMode`.
   */
  horizontalPlacement: PropTypes.oneOf(["left", "right"]),
  /**
   * The calendar locale. If undefined, it uses calendar default
   */
  locale: PropTypes.string,
  /**
   * Controls if actions buttons are visible at the calendar.
   */
  showActions: PropTypes.bool,
  /**
   * Callback function to be triggered when the input value is changed
   */
  onChange: PropTypes.func,
  /**
   * The theme object provided by the withStyles component.
   */
  theme: PropTypes.instanceOf(Object).isRequired,
  /**
   * Disable the portal behavior. The children stay within it's parent DOM hierarchy.
   */
  disablePortal: PropTypes.bool,
  /**
   * Sets if the calendar container should follow the date picker input out of the screen or stay visible.
   */
  escapeWithReference: PropTypes.bool
};

HvDatePicker.defaultProps = {
  id: undefined,
  rangeMode: false,
  horizontalPlacement: "left",
  value: undefined,
  startValue: undefined,
  endValue: undefined,
  locale: DEFAULT_LOCALE,
  showActions: false,
  onChange: undefined,
  disablePortal: true,
  escapeWithReference: true
};

export default withStyles(styles, { name: "HvDatePicker", withTheme: true })(
  withLabels(DEFAULT_LABELS)(withId(HvDatePicker))
);
