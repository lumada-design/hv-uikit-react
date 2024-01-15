import React from "react";
import PropTypes from "prop-types";
import isNil from "lodash/isNil";
import { ClickAwayListener, Popper, withStyles } from "@material-ui/core";
import { Calendar as CalendarIcon } from "@hitachivantara/uikit-react-icons";
import clsx from "clsx";
import { isKeypress, KeyboardCodes, setId } from "../utils";
import Typography from "../Typography";
import Calendar from "./Calendar";
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
  isValidLocale,
} from "./Calendar/utils";

const DEFAULT_LABELS = {
  applyLabel: "Apply",
  cancelLabel: "Cancel",
  title: undefined,
  placeholder: "Select a date",
  rangeStart: "Start date",
  rangeEnd: "End date",
};

/**
 * A graphical widget which allows the user to select a date.
 */
class HvDatePicker extends React.Component {
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
  static getDerivedStateFromProps(props, state) {
    const { rangeMode, locale, value, startValue, endValue } = props;

    const { originalValue, originalStartValue, originalEndValue, locale: stateLocale } = state;

    if (locale !== stateLocale) {
      const validLocale = isValidLocale(locale) ? locale : DEFAULT_LOCALE;
      return {
        ...state,
        locale: validLocale,
      };
    }
    if (
      value !== originalValue ||
      startValue !== originalStartValue ||
      endValue !== originalEndValue
    ) {
      return {
        ...state,
        ...HvDatePicker.resolveStateFromProps(value, startValue, endValue, rangeMode),
      };
    }
    return null;
  }

  /**
   * Resolves the state using the received props.
   *
   * @memberOf HvDatePicker
   */
  static resolveStateFromProps = (value, startValue, endValue, rangeMode) => {
    if (rangeMode) {
      const startSelectedDate =
        startValue && startValue !== "" ? convertISOStringDateToDate(startValue) : null;
      const endSelectedDate =
        endValue && endValue !== "" ? convertISOStringDateToDate(endValue) : null;
      // Range mode state
      return {
        startSelectedDate,
        endSelectedDate,
        tempStartSelectedDate: startSelectedDate,
        tempEndSelectedDate: endSelectedDate,
        originalStartValue: startValue,
        originalEndValue: endValue,
        startVisibleDate: null,
        endVisibleDate: null,
      };
    }

    // Single calendar mode state
    const selectedDate = value && value !== "" ? convertISOStringDateToDate(value) : null;

    return {
      selectedDate,
      tempSelectedDate: selectedDate,
      originalValue: value,
    };
  };

  constructor(props) {
    super(props);

    const { locale } = this.props;

    this.state = {
      created: false,
      ...HvDatePicker.resolveStateFromProps(),
      calendarOpen: false,
      calendarAnchorElement: null,
      locale: isValidLocale(locale) ? locale : DEFAULT_LOCALE,
    };
  }

  /**
   * Changes the calendar open state according to the received flag.
   *
   * @param {boolean} open - Opens / closes the calendar according to this flag.
   * @memberOf HvDatePicker
   */
  setCalendarOpen = (open) => {
    this.setState({
      calendarOpen: open,
    });
  };

  createCalendarPlacement = (data) => {
    const { created } = this.state;
    const { flipped, placement } = data;
    if (!created) {
      this.setState({
        calendarPlacement: placement,
        calendarFlipped: flipped,
        created: true,
      });
    }
  };

  /**
   * Updates the calendar placement in case the Popper placement changed.
   *
   * @param {Object} data - The data provided by the popper plugin.
   * @memberOf HvDatePicker
   */
  updateCalendarPlacement = (data) => {
    const { calendarFlipped } = this.state;
    if (calendarFlipped !== data.flipped) {
      this.setState({
        calendarPlacement: data.placement,
        calendarFlipped: data.flipped,
      });
    }
  };

  /**
   * Handles the `Apply` action. Both single and ranged modes are handled here.
   *
   * @memberOf HvDatePicker
   */
  handleApplyAction = () => {
    const { rangeMode } = this.props;

    if (rangeMode) {
      const { tempStartSelectedDate, tempEndSelectedDate } = this.state;

      if (tempStartSelectedDate && tempEndSelectedDate) {
        this.setRangeDate(tempStartSelectedDate, tempEndSelectedDate);
      }
    } else {
      const { tempSelectedDate } = this.state;

      if (tempSelectedDate) {
        this.setSingleDate(tempSelectedDate, true);
      }
    }
  };

  /**
   * Handles the `Cancel` action. Both single and ranged modes are handled here.
   *
   * @memberOf HvDatePicker
   */
  handleCancelAction = () => {
    this.cancelDateSelection();
  };

  /**
   * Handle keyboard click in the input.
   *
   * @param event
   */
  handleKeyboardClick = (event) => {
    if (isKeypress(event, KeyboardCodes.Enter)) {
      this.handleCalendarIconClick(event);
    }
  };

  /**
   * Handles the click on the Calendar icon inside the input.
   *
   * @memberOf HvDatePicker
   */
  handleCalendarIconClick = (event) => {
    const { currentTarget } = event;

    this.setState(
      (state) => ({
        calendarAnchorElement: currentTarget,
        calendarOpen: !state.calendarOpen,
      }),
      () => {
        const { calendarOpen } = this.state;
        if (!calendarOpen) {
          this.cancelDateSelection();
        }
      }
    );
  };

  /**
   * Handles the event of clicking away from the Calendar.
   *
   * @param {Object} event - The event triggered when clicking outside of the calendar container.
   * @memberOf HvDatePicker
   */
  handleCalendarClickAway = (event) => {
    const { id } = this.props;

    if (event.target.id !== `${id}`) {
      this.cancelDateSelection();
    }
  };

  /**
   * Gets the formatted selected value to be displayed on the input.
   *
   * @memberOf HvDatePicker
   */
  getFormattedSelectedDate = () => {
    const { rangeMode } = this.props;
    const { locale, selectedDate, startSelectedDate, endSelectedDate } = this.state;

    if (rangeMode) {
      if (isDate(startSelectedDate) && isDate(endSelectedDate)) {
        return `${getFormattedDate(startSelectedDate, locale)} - ${getFormattedDate(
          endSelectedDate,
          locale
        )}`;
      }
    }

    return isDate(selectedDate) ? getFormattedDate(selectedDate, locale) : "";
  };

  /**
   * Cancels the date selection and closes the Calendar component.
   *
   * @memberOf HvDatePicker
   */
  cancelDateSelection = () => {
    const { rangeMode } = this.props;
    const { selectedDate, startSelectedDate, endSelectedDate } = this.state;

    if (rangeMode) {
      this.setState({
        tempStartSelectedDate: startSelectedDate,
        tempEndSelectedDate: endSelectedDate,
      });
    } else {
      this.setState({
        tempSelectedDate: selectedDate,
      });
    }

    this.setCalendarOpen(false);
  };

  /**
   * Single Calendar
   */

  /**
   * Set the date in the input, and changes the calendar visibility (hide).
   *
   * @param {Date} date - Date value that was selected.
   * @param closeCalendar
   * @memberOf HvDatePicker
   */
  setSingleDate = (date, closeCalendar) => {
    const { onChange } = this.props;

    this.setState({ selectedDate: date, tempSelectedDate: date });

    this.setCalendarOpen(!closeCalendar);

    if (typeof onChange === "function") {
      onChange(getDateISO(date));
    }
  };

  /**
   * Handles the `handleDateChange` action from the Calendar component when in single mode. If the `showActions` prop
   * is set to false then the date is immediately applied and the Calendar closed, otherwise the Calendar remains open.
   *
   * @param {Date} date - Date value received from the Calendar component.
   * @param {boolean} closeCalendar - if it should close the date picker.
   * @memberOf HvDatePicker
   */
  handleSingleCalendarDateChange = (date, closeCalendar = true) => {
    const { showActions } = this.props;

    if (!showActions) {
      this.setSingleDate(date, closeCalendar);
    } else {
      this.setState({ tempSelectedDate: date });
    }
  };

  /**
   * Range Calendars functions
   */

  /**
   * Set the date in the input, and changes the calendar visibility (hide).
   *
   * @param {Date} startDate - Start date value that was selected.
   * @param {Date} endDate - End date value that was selected.
   * @memberOf HvDatePicker
   */
  setRangeDate = (startDate, endDate) => {
    const { onChange } = this.props;

    this.setState({
      startSelectedDate: startDate,
      endSelectedDate: endDate,
    });

    this.setCalendarOpen(false);

    if (typeof onChange === "function") {
      onChange(getDateISO(startDate), getDateISO(endDate));
    }
  };

  /**
   * Handles the `handleDateChange` action from the Calendar component associated to the Start date when in range mode.
   *
   * @param {Date} date - Date value received from the Calendar component.
   * @memberOf HvDatePicker
   */
  handleRangeCalendarDateStartChange = (date) => {
    const { tempEndSelectedDate } = this.state;

    if (tempEndSelectedDate > date) {
      this.setState({ tempStartSelectedDate: date });
    } else {
      this.setState({
        tempStartSelectedDate: date,
        tempEndSelectedDate: date,
        endVisibleDate: date,
      });
    }
  };

  /**
   * Handles the `handleDateChange` action from the Calendar component associated to the end date when in range mode.
   *
   * @param {Date} date - Date value received from the Calendar component.
   * @memberOf HvDatePicker
   */
  handleRangeCalendarDateEndChange = (date) => {
    const { tempStartSelectedDate } = this.state;

    if (tempStartSelectedDate < date) {
      this.setState({ tempEndSelectedDate: date });
    } else {
      this.setState({
        tempEndSelectedDate: date,
        tempStartSelectedDate: date,
        startVisibleDate: date,
      });
    }
  };

  /**
   * Renderers
   */

  /**
   * Renders the Label element.
   *
   * @memberOf HvDatePicker
   */
  renderLabel = () => {
    const { id, classes, labels } = this.props;
    return (
      <Typography
        id={setId(id, "label")}
        variant="labelText"
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
  renderActions = () => {
    const { classes, labels, rangeMode, id } = this.props;

    const actionLabels = {
      applyLabel: labels.applyLabel,
      cancelLabel: labels.cancelLabel,
    };

    if (rangeMode) {
      return (
        <div className={classes.rangeCalendarsFooter}>
          <div className={classes.rangeFooterLeft} />
          <div className={classes.rangeFooterRight}>
            <Actions
              id={setId(id, "action")}
              onCancel={() => this.handleCancelAction()}
              onApply={() => this.handleApplyAction()}
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
          onCancel={() => this.handleCancelAction()}
          onApply={() => this.handleApplyAction()}
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
  renderSingleCalendar = () => {
    const { classes, showActions, rangeMode, id } = this.props;
    const { tempSelectedDate, locale, calendarFlipped } = this.state;

    return (
      <div className={classes.calendarContainer}>
        <Calendar
          id={setId(id, "calendar")}
          handleDateChange={(date, close) => this.handleSingleCalendarDateChange(date, close)}
          selectedDate={tempSelectedDate}
          locale={locale}
          rangeMode={rangeMode}
          flipped={calendarFlipped}
        />
        {showActions && this.renderActions()}
      </div>
    );
  };

  /**
   * Renders two calendar for range mode.
   *
   * @memberOf Calendar
   */
  renderRangeCalendars = () => {
    const { id, classes, rangeMode, labels } = this.props;
    const {
      tempStartSelectedDate,
      tempEndSelectedDate,
      startVisibleDate,
      endVisibleDate,
      locale,
      calendarFlipped,
    } = this.state;
    return (
      <div className={classes.rangeMainContainer}>
        <div className={classes.rangeCalendarsContainer}>
          <div className={classes.rangeLeftCalendarContainer}>
            <Calendar
              id={setId(id, "calendar-start")}
              handleDateChange={(date) => this.handleRangeCalendarDateStartChange(date)}
              selectedDate={tempStartSelectedDate}
              visibleDate={startVisibleDate}
              locale={locale}
              rangeMode={rangeMode}
              label={labels.rangeStart}
              flipped={calendarFlipped}
            />
          </div>

          <div className={classes.rangeRightCalendarContainer}>
            <Calendar
              id={setId(id, "calendar-end")}
              handleDateChange={(date) => this.handleRangeCalendarDateEndChange(date)}
              selectedDate={tempEndSelectedDate}
              visibleDate={endVisibleDate}
              locale={locale}
              rangeMode={rangeMode}
              label={labels.rangeEnd}
              flipped={calendarFlipped}
            />
          </div>
        </div>
        {this.renderActions()}
      </div>
    );
  };

  /**
   * Renders the input.
   *
   * @memberOf Calendar
   */
  renderInput = () => {
    const { id, className, classes, labels } = this.props;
    const { calendarOpen } = this.state;

    const naming = {
      "aria-label": isNil(labels) || isNil(labels.title) ? "Date input" : undefined,
      "aria-labelledby": labels && labels.title ? setId(id, "label") : undefined,
    };

    return (
      <>
        {labels && labels.title && this.renderLabel()}
        <div
          className={clsx(className, classes.root, {
            [classes.inputCalendarOpen]: calendarOpen,
            [classes.inputCalendarClosed]: !calendarOpen,
          })}
          onKeyDown={this.handleKeyboardClick}
          onClick={this.handleCalendarIconClick}
          role="button"
          tabIndex={0}
          id={id}
          {...naming}
        >
          <input
            ref={(element) => {
              this.inputElement = element;
            }}
            className={classes.input}
            value={this.getFormattedSelectedDate()}
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
  renderPopper = () => {
    const {
      id,
      classes,
      theme,
      rangeMode,
      horizontalPlacement,
      disablePortal,
      escapeWithReference,
    } = this.props;

    const { calendarOpen, calendarAnchorElement, calendarFlipped } = this.state;

    const RenderCalendar = rangeMode ? this.renderRangeCalendars() : this.renderSingleCalendar();
    return (
      <Popper
        id={setId(id, "tooltip")}
        open={calendarOpen}
        placement={horizontalPlacement === "left" ? "bottom-start" : "bottom-end"}
        anchorEl={calendarAnchorElement}
        disablePortal={disablePortal}
        popperOptions={{
          onCreate: this.createCalendarPlacement,
          onUpdate: this.updateCalendarPlacement,
        }}
        modifiers={{
          preventOverflow: {
            // Follows the anchor element outside of the boundaries.
            escapeWithReference,
          },
        }}
        style={{
          zIndex: `${calendarFlipped ? theme.zIndex.tooltip : 1}`,
        }}
      >
        <ClickAwayListener onClickAway={this.handleCalendarClickAway}>
          <div>
            {!calendarFlipped && (
              <div className={clsx(classes.popperRoot, classes.listBorderDown)} />
            )}
            <div
              className={clsx(classes.popperRoot, {
                [classes.calendarOpenDown]: calendarOpen && !calendarFlipped,
                [classes.calendarOpenUp]: calendarOpen && calendarFlipped,
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
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.datePickerContainer}>
        {this.renderInput()}
        {this.renderPopper()}
      </div>
    );
  }
}

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
    placeholder: PropTypes.string,
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
  escapeWithReference: PropTypes.bool,
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
  escapeWithReference: true,
};

export default withStyles(styles, { name: "HvDatePicker", withTheme: true })(
  withLabels(DEFAULT_LABELS)(withId(HvDatePicker))
);
