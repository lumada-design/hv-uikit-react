import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { Calendar } from "@hv/uikit-react-icons";
import clsx from "clsx";
import { setId, useSavedState, useLabels } from "../utils";
import {
  HvActionContainer,
  HvBaseDropdown,
  HvButton,
  HvCalendar,
  HvLabel,
  HvFormElement,
  HvTypography,
} from "..";
import styles from "./styles";
import withId from "../withId";
import { DEFAULT_LOCALE, isDate } from "../Calendar/utils";
import { getDateLabel, isVisibleDate, validateLocale } from "./utils";
import useVisibleDate from "../Calendar/useVisibleDate";

const DEFAULT_LABELS = {
  applyLabel: "Apply",
  cancelLabel: "Cancel",
  title: "",
  placeholder: "Select a date",
  rangeStart: "Start date",
  rangeEnd: "End date",
};

/**
 * A graphical widget which allows the user to select a date.
 */
const HvDatePicker = ({
  id,
  className,
  labels: labelsProp,
  classes,
  disabled = false,
  value,
  startValue,
  endValue,
  rangeMode = false,
  startAdornment,
  horizontalPlacement = "right",
  locale: localeProp = DEFAULT_LOCALE,
  showActions = false,
  onChange,
  disablePortal = true,
  escapeWithReference = true,
  ...others
}) => {
  const labels = useLabels(DEFAULT_LABELS, labelsProp);
  const [locale, setLocale] = useState(validateLocale(localeProp));
  const [calendarOpen, setCalendarOpen] = useState(false);

  const [startDate, setStartDate, rollbackStartDate] = useSavedState(
    rangeMode ? startValue : value
  );
  const [endDate, setEndDate, rollbackEndDate] = useSavedState(endValue);

  const [visibleDate, setVisibleDate, onVisibleDateChange] = useVisibleDate(startDate);

  useEffect(() => {
    setStartDate(rangeMode ? startValue : value, true);
    setEndDate(endValue, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, startValue, endValue, rangeMode]);

  useEffect(() => {
    setLocale(validateLocale(localeProp));
  }, [localeProp]);

  useEffect(() => {
    if (!startDate || isVisibleDate(startDate, visibleDate)) return;
    setVisibleDate(startDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate]);

  /**
   * Handles the `Apply` action. Both single and ranged modes are handled here.
   */
  const handleApply = () => {
    setStartDate(startDate, true);
    setEndDate(endDate ?? startDate, true);

    onChange?.(startDate, endDate);

    setCalendarOpen(false);
  };

  /**
   * Handles the `Cancel` action. Both single and ranged modes are handled here.
   */
  const handleCancel = () => {
    rollbackStartDate();
    rollbackEndDate();

    setCalendarOpen(false);
  };

  const handleCalendarClose = () => {
    const shouldSave = !(rangeMode || showActions);
    shouldSave ? handleApply() : handleCancel();
  };

  const handleToggle = (evt, open) => {
    setCalendarOpen(open);
    if (!open) handleCalendarClose();
  };

  const handleDateChange = (event, newDate) => {
    if (!isDate(newDate)) return;

    const autoSave = !showActions && !rangeMode;

    if (rangeMode) {
      if (!startDate || (startDate && endDate) || newDate < startDate) {
        setStartDate(newDate);
        setEndDate(null);
      } else {
        setEndDate(newDate);
      }
    } else {
      setStartDate(newDate, autoSave);
    }

    if (autoSave) {
      setCalendarOpen(false);
      onChange?.(newDate);
    }
  };

  const handleInputDateChange = (event, newDate, position) => {
    if (!isDate(newDate)) return;

    if (!rangeMode) {
      handleDateChange(event, newDate);
      return;
    }

    if (position === "left") {
      setStartDate(newDate > endDate ? endDate : newDate);
    } else if (position === "right") {
      setEndDate(newDate < startDate ? startDate : newDate);
    }
  };

  /**
   * Renders the container for the action elements.
   */
  const renderActions = () => (
    <HvActionContainer>
      <HvButton
        id={setId(id, "action", "apply")}
        className={classes.action}
        category="ghost"
        onClick={handleApply}
      >
        {labels.applyLabel}
      </HvButton>
      <HvButton
        id={setId(id, "action", "cancel")}
        className={classes.action}
        category="ghost"
        onClick={handleCancel}
      >
        {labels.cancelLabel}
      </HvButton>
    </HvActionContainer>
  );

  const renderInput = (dateString) => (
    <HvTypography variant={dateString ? "normalText" : "placeholderText"}>
      {dateString || labels.placeholder}
    </HvTypography>
  );

  const dateValue = rangeMode ? { startDate, endDate } : startDate;

  return (
    <HvFormElement
      id={id}
      disabled={disabled}
      className={clsx(classes.root, className)}
      value={dateValue}
      locale={locale}
      {...others}
    >
      <HvLabel id={setId(id, "label")} className={classes.label} label={labels.title}>
        <HvBaseDropdown
          role="dialog"
          classes={{ root: classes.dropdown, panel: classes.panel }}
          disabled={disabled}
          disablePortal={disablePortal}
          placement={horizontalPlacement}
          expanded={calendarOpen}
          onToggle={handleToggle}
          onClickOutside={handleCalendarClose}
          placeholder={renderInput(getDateLabel(dateValue, rangeMode, locale))}
          adornment={<Calendar className={classes.icon} color={disabled ? "atmo5" : undefined} />}
          popperProps={{ modifiers: { preventOverflow: { escapeWithReference } } }}
        >
          {
            /* eslint-disable jsx-a11y/no-noninteractive-tabindex */
            // necessary because `HvBaseDropdown` re-render auto-focus
          }
          <div tabIndex={0} />
          <HvCalendar
            id={setId(id, "calendar")}
            startAdornment={startAdornment}
            onChange={handleDateChange}
            onInputChange={handleInputDateChange}
            onVisibleDateChange={onVisibleDateChange}
            {...visibleDate}
          />
          {(rangeMode || showActions) && renderActions()}
        </HvBaseDropdown>
      </HvLabel>
    </HvFormElement>
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
    placeholder: PropTypes.string,
  }),
  /**
   * A Jss Object used to override or extend the styles applied to the input/calendar box.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * The initial value of the input when in single calendar mode.
   */
  value: PropTypes.instanceOf(Date),
  /**
   * The initial value for the start date when in range mode.
   */
  startValue: PropTypes.instanceOf(Date),
  /**
   * The initial value for the end date when in range mode.
   */
  endValue: PropTypes.instanceOf(Date),
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
   * If `true` the datepicker is disabled unable to be interacted, if `false` it is enabled.
   */
  disabled: PropTypes.bool,
  /**
   * Disable the portal behavior. The children stay within it's parent DOM hierarchy.
   */
  disablePortal: PropTypes.bool,
  /**
   * Sets if the calendar container should follow the date picker input out of the screen or stay visible.
   */
  escapeWithReference: PropTypes.bool,
  /**
   * An element placed before the Calendar
   */
  startAdornment: PropTypes.node,
};

export default withStyles(styles, { name: "HvDatePicker", index: 1 })(withId(HvDatePicker));
