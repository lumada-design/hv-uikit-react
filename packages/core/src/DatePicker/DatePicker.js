import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { Calendar } from "@hv/uikit-react-icons";
import clsx from "clsx";
import { setId, useSavedState } from "../utils";
import {
  HvActionContainer,
  HvBaseDropdown,
  HvButton,
  HvCalendar,
  HvLabel,
  HvFormElement,
  HvTypography
} from "..";
import styles from "./styles";
import withLabels from "../withLabels";
import withId from "../withId";
import { DEFAULT_LOCALE, isDate, isSameDay } from "../Calendar/utils";
import { getDateLabel, validateLocale } from "./utils";
import { NAV_OPTIONS } from "../Calendar/enums";

const DEFAULT_LABELS = {
  applyLabel: "Apply",
  cancelLabel: "Cancel",
  title: "",
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
  rangeMode = false,
  horizontalPlacement = "right",
  locale: localeProp = DEFAULT_LOCALE,
  showActions = false,
  onChange,
  disablePortal = true,
  escapeWithReference = true,
  ...others
}) => {
  const [locale, setLocale] = useState(validateLocale(localeProp));
  const [calendarOpen, setCalendarOpen] = useState(false);

  const [startDate, setStartDate, rollbackStartDate] = useSavedState(
    rangeMode ? startValue : value
  );
  const [endDate, setEndDate, rollbackEndDate] = useSavedState(endValue);

  const visibleDate = (isDate(startDate) && startDate) || new Date();
  const [visibleMonth, setVisibleMonth] = useState(visibleDate?.getMonth() + 1);
  const [visibleYear, setVisibleYear] = useState(visibleDate?.getFullYear());

  useEffect(() => {
    setStartDate(rangeMode ? startValue : value, true);
    setEndDate(endValue, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, startValue, endValue, rangeMode]);

  useEffect(() => {
    setLocale(validateLocale(localeProp));
  }, [localeProp]);

  useEffect(() => {
    if (!calendarOpen) return;
    setVisibleMonth(visibleDate?.getMonth() + 1);
    setVisibleYear(visibleDate?.getFullYear());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendarOpen]);

  const handleVisibleDateChange = (event, action, index) => {
    switch (action) {
      case NAV_OPTIONS.PREVIOUS_MONTH: {
        const previousMonth = visibleMonth - 1;
        if (previousMonth < 1) {
          setVisibleMonth(12);
          setVisibleYear(visibleYear - 1);
        } else {
          setVisibleMonth(previousMonth);
        }
        break;
      }
      case NAV_OPTIONS.NEXT_MONTH: {
        const nextMonth = visibleMonth + 1;
        if (nextMonth > 12) {
          setVisibleMonth(1);
          setVisibleYear(visibleYear + 1);
        } else {
          setVisibleMonth(nextMonth);
        }
        break;
      }
      case NAV_OPTIONS.PREVIOUS_YEAR:
        setVisibleYear(visibleYear - 1);
        break;
      case NAV_OPTIONS.NEXT_YEAR:
        setVisibleYear(visibleYear + 1);
        break;
      case NAV_OPTIONS.MONTH:
        setVisibleMonth(index);
        break;
      default:
        break;
    }
  };

  /**
   * Handles the `Apply` action. Both single and ranged modes are handled here.
   */
  const handleApply = () => {
    setStartDate(startDate, true);
    setEndDate(endDate, true);

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

  const handleCalendarClickAway = () => {
    const shouldSave = !(rangeMode || showActions);
    shouldSave ? handleApply() : handleCancel();
  };

  const handleDateChange = (event, newDate) => {
    const autoSave = !showActions && !rangeMode;

    if (!isDate(newDate) || isSameDay(startDate, newDate) || isSameDay(endDate, newDate)) return;

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

  /**
   * Renders the container for the action elements.
   */
  const renderActions = () => (
    <HvActionContainer>
      <HvButton id={setId(id, "action", "apply")} category="ghost" onClick={handleApply}>
        {labels.applyLabel}
      </HvButton>
      <HvButton id={setId(id, "action", "cancel")} category="ghost" onClick={handleCancel}>
        {labels.cancelLabel}
      </HvButton>
    </HvActionContainer>
  );

  const renderInput = dateString => (
    <HvTypography variant={dateString ? "normalText" : "placeholderText"}>
      {dateString || labels.placeholder}
    </HvTypography>
  );

  const dateValue = rangeMode ? { startDate, endDate } : startDate;

  return (
    <HvFormElement id={id} className={clsx(classes.root, className)} value={dateValue} {...others}>
      {labels.title && (
        <HvLabel id={setId(id, "label")} className={classes.label} label={labels.title} />
      )}
      <HvBaseDropdown
        classes={{ root: classes.dropdown, panel: classes.panel }}
        disablePortal={disablePortal}
        placement={horizontalPlacement}
        expanded={calendarOpen}
        onToggle={(evt, open) => setCalendarOpen(open)}
        onClickOutside={handleCalendarClickAway}
        placeholder={renderInput(getDateLabel(dateValue, rangeMode, locale))}
        adornment={<Calendar className={classes.icon} />}
        popperProps={{ modifiers: { preventOverflow: { escapeWithReference } } }}
      >
        <HvCalendar
          id={setId(id, "calendar")}
          visibleMonth={visibleMonth}
          visibleYear={visibleYear}
          onVisibleDateChange={handleVisibleDateChange}
          onChange={handleDateChange}
          locale={locale}
        />
        {(rangeMode || showActions) && renderActions()}
      </HvBaseDropdown>
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
    placeholder: PropTypes.string
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
   * Disable the portal behavior. The children stay within it's parent DOM hierarchy.
   */
  disablePortal: PropTypes.bool,
  /**
   * Sets if the calendar container should follow the date picker input out of the screen or stay visible.
   */
  escapeWithReference: PropTypes.bool
};

export default withStyles(styles, { name: "HvDatePicker" })(
  withLabels(DEFAULT_LABELS)(withId(HvDatePicker))
);
