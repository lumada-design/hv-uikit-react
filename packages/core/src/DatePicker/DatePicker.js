import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { Calendar } from "@hitachivantara/uikit-react-icons";
import clsx from "clsx";
import { setId, useSavedState, useLabels } from "../utils";
import {
  HvActionBar,
  HvBaseDropdown,
  HvButton,
  HvCalendar,
  HvLabel,
  HvInfoMessage,
  HvFormElement,
  HvWarningText,
  HvTypography,
  useUniqueId,
  useControlled,
} from "..";
import { isInvalid } from "../Forms/FormElement/validationStates";
import styles from "./styles";
import { isDate } from "../Calendar/utils";
import { getDateLabel } from "./utils";
import useVisibleDate from "./useVisibleDate";
import useLocale from "../Provider/useLocale";
import { NAV_OPTIONS } from "../Calendar/enums";

const DEFAULT_LABELS = {
  applyLabel: "Apply",
  cancelLabel: "Cancel",
  clearLabel: "Clear",
  invalidDateLabel: "Invalid Date",
};

/**
 * A date picker, popup calendar or date range picker is a graphical user
 * interface widget which allows the user to select a date from a calendar.
 */
const HvDatePicker = (props) => {
  const {
    classes,
    className,

    id,
    name,

    required = false,
    disabled = false,

    label,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    description,
    "aria-describedby": ariaDescribedBy,

    onChange,
    onCancel,
    onClear,
    status,
    statusMessage,
    "aria-errormessage": ariaErrorMessage,

    placeholder,

    labels: labelsProp,

    value,
    startValue,
    endValue,

    rangeMode = false,
    startAdornment,
    horizontalPlacement = "right",
    locale: localeProp,
    showActions = false,
    showClear = false,
    disablePortal = true,
    escapeWithReference = true,
    dropdownProps,
    readOnly,
    ...others
  } = props;

  const labels = useLabels(DEFAULT_LABELS, labelsProp);

  const elementId = useUniqueId(id, "hvdatepicker");

  const [validationState, setValidationState] = useControlled(status, "standBy");

  const [validationMessage] = useControlled(statusMessage, "Required");

  const localeFromProvider = useLocale();

  const locale = localeProp || localeFromProvider;

  const [calendarOpen, setCalendarOpen] = useState(false);

  const [startDate, setStartDate, rollbackStartDate] = useSavedState(
    rangeMode ? startValue : value
  );
  const [endDate, setEndDate, rollbackEndDate] = useSavedState(endValue);

  const [visibleDate, dispatchAction] = useVisibleDate(startDate, endDate);

  const focusTarget = useRef();

  useEffect(() => {
    setStartDate(rangeMode ? startValue : value, true);
    setEndDate(endValue, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, startValue, endValue, rangeMode]);

  const endDateIsSet = useRef(false);
  endDateIsSet.current = endDate != null;

  useEffect(() => {
    if (startDate != null) {
      dispatchAction({
        type: NAV_OPTIONS.MONTH_YEAR,
        target: endDateIsSet.current ? "left" : "best",
        year: startDate.getFullYear(),
        month: startDate.getMonth() + 1,
      });
    }
  }, [dispatchAction, startDate]);

  useEffect(() => {
    if (endDate != null) {
      dispatchAction({
        type: NAV_OPTIONS.MONTH_YEAR,
        target: "right",
        year: endDate.getFullYear(),
        month: endDate.getMonth() + 1,
      });
    }
  }, [dispatchAction, endDate]);

  /**
   * Handles the `Apply` action. Both single and ranged modes are handled here.
   */
  const handleApply = () => {
    setStartDate(startDate, true);
    setEndDate(endDate ?? startDate, true);

    onChange?.(startDate, endDate);

    setValidationState(() => {
      // this will only run if status is uncontrolled
      if (required && (!isDate(startDate) || (rangeMode && !isDate(endDate)))) {
        return "invalid";
      }

      return "valid";
    });

    setCalendarOpen(false);
  };

  /**
   * Handles the `Cancel` action. Both single and ranged modes are handled here.
   */
  const handleCancel = () => {
    rollbackStartDate();
    rollbackEndDate();

    onCancel?.();

    setCalendarOpen(false);
  };

  /**
   * Handles the `Cancel` action. Both single and ranged modes are handled here.
   */
  const handleClear = () => {
    setStartDate(undefined, false);
    setEndDate(undefined, false);
    onClear?.();
  };

  const handleCalendarClose = () => {
    const shouldSave = !(rangeMode || showActions);
    if (shouldSave) {
      handleApply();
    } else {
      handleCancel();
    }
  };

  const handleToggle = (evt, open) => {
    /* 
     If evt is null this toggle wasn't triggered by the user.
     instead it was triggered by the baseDropdown useEffect after
     the datepicker changed the expanded value this baseDropdown behavior needs a review
    */
    if (evt === null) return;
    setCalendarOpen(open);
    if (!open) handleCalendarClose();
  };

  const focusOnContainer = () => {
    focusTarget.current?.focus();
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
      onChange?.(newDate);

      setValidationState(() => {
        // this will only run if status is uncontrolled
        if (required && !isDate(newDate)) {
          return "invalid";
        }

        return "valid";
      });

      setCalendarOpen(false);
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
      if (!startDate) {
        setStartDate(newDate > endDate ? endDate : newDate);
        return;
      }
      setEndDate(newDate < startDate ? startDate : newDate);
    }
  };

  /**
   * Renders the container for the action elements.
   */
  const renderActions = () => (
    <HvActionBar
      className={clsx({
        [classes.actionContainer]: showClear,
      })}
    >
      {showClear && (
        <div className={classes.leftContainer}>
          <HvButton
            id={setId(id, "action", "clear")}
            className={classes.action}
            category="ghost"
            onClick={handleClear}
          >
            {labels.clearLabel}
          </HvButton>
        </div>
      )}
      <div className={classes.rightContainer}>
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
      </div>
    </HvActionBar>
  );

  const renderInput = (dateString) => (
    <HvTypography variant={dateString ? "normalText" : "placeholderText"}>
      {(dateString || placeholder) === undefined ? "" : dateString || placeholder}
    </HvTypography>
  );

  const dateValue = rangeMode ? { startDate, endDate } : startDate;

  const hasLabel = label != null;
  const hasDescription = description != null;

  // the error message area will only be created if:
  // - an external element that provides an error message isn't identified via aria-errormessage AND
  //   - both status and statusMessage properties are being controlled OR
  //   - status is uncontrolled and required is true
  const canShowError =
    ariaErrorMessage == null &&
    ((status !== undefined && statusMessage !== undefined) || (status === undefined && required));

  const isStateInvalid = isInvalid(validationState);

  let errorMessageId;
  if (isStateInvalid) {
    errorMessageId = canShowError ? setId(elementId, "error") : ariaErrorMessage;
  }

  return (
    <HvFormElement
      id={id}
      name={name}
      value={dateValue}
      status={validationState}
      disabled={disabled}
      required={required}
      className={clsx(className, classes.root)}
      locale={locale}
      readOnly={readOnly}
      {...others}
    >
      {(hasLabel || hasDescription) && (
        <div className={classes.labelContainer}>
          {hasLabel && (
            <HvLabel id={setId(elementId, "label")} label={label} className={classes.label} />
          )}

          {hasDescription && (
            <HvInfoMessage id={setId(elementId, "description")} className={classes.description}>
              {description}
            </HvInfoMessage>
          )}
        </div>
      )}
      <HvBaseDropdown
        role="combobox"
        classes={{
          root: classes.dropdown,
          panel: classes.panel,
          header: isStateInvalid ? classes.dropdownHeaderInvalid : undefined,
          headerOpen: classes.dropdownHeaderOpen,
        }}
        readOnly={readOnly}
        disabled={disabled}
        disablePortal={disablePortal}
        variableWidth
        placement={horizontalPlacement}
        expanded={calendarOpen}
        onToggle={handleToggle}
        onClickOutside={handleCalendarClose}
        onContainerCreation={focusOnContainer}
        placeholder={renderInput(getDateLabel(dateValue, rangeMode, locale))}
        adornment={<Calendar className={classes.icon} color={disabled ? "atmo5" : undefined} />}
        popperProps={{ modifiers: [{ name: "preventOverflow", enabled: escapeWithReference }] }}
        aria-haspopup="dialog"
        aria-label={ariaLabel}
        aria-labelledby={
          [label && setId(elementId, "label"), ariaLabelledBy].join(" ").trim() || undefined
        }
        aria-invalid={isStateInvalid ? true : undefined}
        aria-errormessage={errorMessageId}
        aria-describedby={
          [description && setId(elementId, "description"), ariaDescribedBy].join(" ").trim() ||
          undefined
        }
        {...dropdownProps}
      >
        <div ref={focusTarget} tabIndex={-1} />
        <HvCalendar
          id={setId(id, "calendar")}
          startAdornment={startAdornment}
          onChange={handleDateChange}
          onInputChange={handleInputDateChange}
          onVisibleDateChange={(_event, type, month, target) => {
            dispatchAction({ type, target, month });
          }}
          locale={locale}
          {...visibleDate}
          invalidDateLabel={labels.invalidDateLabel}
        />
        {(rangeMode || showActions) && renderActions()}
      </HvBaseDropdown>
      {canShowError && (
        <HvWarningText id={setId(elementId, "error")} disableBorder className={classes.error}>
          {validationMessage}
        </HvWarningText>
      )}
    </HvFormElement>
  );
};

HvDatePicker.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the component styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,

    /**
     * Styles applied to the container of the labels elements.
     */
    labelContainer: PropTypes.string,
    /**
     * Styles applied to the label element.
     */
    label: PropTypes.string,
    /**
     * Styles applied to the icon information text.
     */
    description: PropTypes.string,

    /**
     * Styles applied to the error area.
     */
    error: PropTypes.string,

    /**
     * Styles applied to the dropdown.
     */
    dropdown: PropTypes.string,

    panel: PropTypes.string,
    action: PropTypes.string,
    icon: PropTypes.string,
    /**
     * Styles applied to the date picker when invalid.
     */
    dropdownHeaderInvalid: PropTypes.string,
    /**
     * Styles applied to the date picker when opened.
     */
    dropdownHeaderOpen: PropTypes.string,
    /**
     * Styles applied to the container that holds the actions buttons.
     */
    actionContainer: PropTypes.string,
    /**
     * Styles applied to the container that holds the clear button.
     */
    leftContainer: PropTypes.string,
    /**
     * Styles applied to the container that holds the apply and cancel button.
     */
    rightContainer: PropTypes.string,
  }).isRequired,

  /**
   * Id to be applied to the form element root node.
   */
  id: PropTypes.string,

  /**
   * The form element name.
   */
  name: PropTypes.string,

  /**
   * The label of the form element.
   *
   * The form element must be labeled for accessibility reasons.
   * If not provided, an aria-label or aria-labelledby must be provided instead.
   */
  label: PropTypes.node,
  /**
   * @ignore
   */
  "aria-label": PropTypes.string,
  /**
   * @ignore
   */
  "aria-labelledby": PropTypes.string,
  /**
   * Provide additional descriptive text for the form element.
   */
  description: PropTypes.node,
  /**
   * @ignore
   */
  "aria-describedby": PropTypes.string,

  /**
   * The placeholder value when nothing is selected.
   */
  placeholder: PropTypes.string,

  /**
   * Indicates that the form element is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Indicates that user input is required on the form element.
   */
  required: PropTypes.bool,

  /**
   * The status of the form element.
   *
   * Valid is correct, invalid is incorrect and standBy means no validations have run.
   *
   * When uncontrolled and unspecified it will default to "standBy" and change to either "valid"
   * or "invalid" after any change to the state.
   */
  status: PropTypes.oneOf(["standBy", "valid", "invalid"]),
  /**
   * The error message to show when the validation status is "invalid".
   *
   * Defaults to "Required" when the status is uncontrolled and no `aria-errormessage` is provided.
   */
  statusMessage: PropTypes.node,
  /**
   * Identifies the element that provides an error message for the date picker.
   *
   * Will only be used when the validation status is invalid.
   */
  "aria-errormessage": PropTypes.string,

  /**
   * The callback fired when the value changes.
   */
  onChange: PropTypes.func,

  /**
   * The callback fired when user clicks on cancel.
   */
  onCancel: PropTypes.func,

  /**
   * The callback fired when user clicks on clear.
   */
  onClear: PropTypes.func,

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
     * Clear button label.
     */
    clearLabel: PropTypes.string,
    /**
     * Invalid Date label.
     */
    invalidDateLabel: PropTypes.string,
  }),

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
   * Controls if clear button is visible at the calendar,
   * only works if showing actions or in range mode.
   */
  showClear: PropTypes.bool,
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
  /**
   * An object containing props to be passed onto the baseDropdown.
   */
  dropdownProps: PropTypes.instanceOf(Object),
  /**
   * If `true` the DatePicker will be in read only mode, unable to be interacted.
   */
  readOnly: PropTypes.bool,
};

export default withStyles(styles, { name: "HvDatePicker", index: 1 })(HvDatePicker);
