import React, { useState, useEffect, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@mui/styles";

import {
  HvFormElement,
  HvBaseDropdown,
  HvLabel,
  HvWarningText,
  HvInfoMessage,
  setId,
  useUniqueId,
  useControlled,
  useLocale,
  HvTypography,
  useSavedState,
  useDeprecated,
} from "@hitachivantara/uikit-react-core";
import { Time as TimeIcon } from "@hitachivantara/uikit-react-icons";

import { TimePickerUnits, TimeFormat, PeriodPickerOptions } from "./enums";
import { getFormattedTime, getTimeFormatForLocale } from "./timePickerFormatter";
import { getHoursForTimeFormat, getTimeWithFormat24 } from "./timePickerConverter";
import UnitTimePicker from "./UnitTimePicker";
import PeriodPicker from "./PeriodPicker";

import styles from "./styles";

const setFocusToContent = (containerRef) => {
  containerRef?.getElementsByTagName("input")[0]?.focus();
};

const timeIsEqual = (timeA, timeB) => {
  return (
    timeA === timeB ||
    (timeA == null && timeB == null) ||
    (timeA != null &&
      timeB != null &&
      timeA.hours === timeB.hours &&
      timeA.minutes === timeB.minutes &&
      timeA.seconds === timeB.seconds &&
      timeA.period === timeB.period)
  );
};

const timeIsValid = (time, timeFormat) => {
  const hourInputState =
    time?.hours != null &&
    time.hours !== "" &&
    time.hours >= 0 &&
    ((timeFormat === TimeFormat.H24 && time.hours <= 24) ||
      (timeFormat === TimeFormat.H12 && time.hours <= 12));
  const minutesInputState =
    time?.minutes != null && time.minutes !== "" && time.minutes >= 0 && time.minutes <= 59;
  const secondsInputState =
    time?.seconds != null && time.seconds !== "" && time.seconds >= 0 && time.seconds <= 59;

  return hourInputState && minutesInputState && secondsInputState;
};

/**
 * A TimePicker component used to choose the time, following specifications provided by Design System. Still in development.
 */

const HvTimePicker = ({
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

  status,
  statusMessage,
  "aria-errormessage": ariaErrorMessage,

  placeholder,
  hoursPlaceholder = "hh",
  minutesPlaceholder = "mm",
  secondsPlaceholder = "ss",

  value: valueProp,
  defaultValue: defaultValueProp,

  timeFormat: chosenTimeFormat,
  locale: localeProp,

  disableDefaultValue,

  onToggle: onToggleCallback,

  // deprecated properties:
  hours = new Date().getHours(),
  minutes = new Date().getMinutes(),
  seconds = 0,
  period: chosenTimePeriod,

  // misc properties:
  disablePortal = true,
  escapeWithReference = true,
  dropdownProps,
  ...others
}) => {
  useDeprecated("TimePicker", "Please use the TimePicker component in Core");

  // #region STATE
  const elementId = useUniqueId(id, "hvtimepicker");

  const localeFromProvider = useLocale();
  const locale = localeProp || localeFromProvider;
  const timeFormat = useMemo(
    () => (chosenTimeFormat != null ? chosenTimeFormat.toString() : getTimeFormatForLocale(locale)),
    [chosenTimeFormat, locale]
  );

  const [value, setValue, rollbackValue, lastValidValue] = useSavedState(() => {
    // fallback to the deprecated properties
    // we shouldn't do that when promoting to core
    // as it makes impossible to start with an empty value
    const defaultValue =
      defaultValueProp ??
      (disableDefaultValue
        ? null
        : {
            hours,
            minutes,
            seconds,
          });

    const v = valueProp ?? defaultValue;

    return v != null
      ? {
          hours: v?.hours != null ? getHoursForTimeFormat(v.hours, timeFormat) : null,
          minutes: v?.minutes,
          seconds: v?.seconds,
          period:
            timeFormat === TimeFormat.H12
              ? chosenTimePeriod ??
                (v?.hours == null || v.hours < 12 ? PeriodPickerOptions.AM : PeriodPickerOptions.PM)
              : null,
        }
      : null;
  });

  const [validationMessage] = useControlled(statusMessage, "Required");
  const [validationState, setValidationState] = useControlled(status, "standBy");

  const [isOpen, setOpen] = useState(false);
  // #endregion

  // #region SIDE EFFECTS
  const firstRender = useRef(true);
  const currentValue = useRef(value);
  useEffect(() => {
    currentValue.current = value;
  });
  const currentTimeFormat = useRef(timeFormat);
  useEffect(() => {
    currentTimeFormat.current = timeFormat;
  });

  useEffect(() => {
    // allow external changes to the time format (via timeFormat or locale properties)
    if (!firstRender.current && currentValue.current != null) {
      const to12 = timeFormat === TimeFormat.H12;

      let { hours: h, period: p } = currentValue.current;
      if (to12) {
        if (h == null || h < 12) {
          p = PeriodPickerOptions.AM;
        } else {
          p = PeriodPickerOptions.PM;
          if (h > 12) {
            h -= 12;
          }
        }
      } else {
        if (p === PeriodPickerOptions.AM) {
          if (h === 12) {
            h = 0;
          }
        } else if (h < 12) {
          h += 12;
        }
        p = undefined;
      }

      setValue(
        {
          hours: h,
          minutes: currentValue.current.minutes,
          seconds: currentValue.current.seconds,
          period: p,
        },
        true
      );
    }
  }, [setValue, timeFormat]);

  useEffect(() => {
    // allow control of value property
    if (!firstRender.current) {
      const dayPeriod =
        valueProp?.hours == null || valueProp.hours < 12
          ? PeriodPickerOptions.AM
          : PeriodPickerOptions.PM;

      setValue(
        valueProp != null
          ? {
              hours:
                valueProp?.hours != null
                  ? getHoursForTimeFormat(valueProp.hours, currentTimeFormat.current)
                  : null,
              minutes: valueProp?.minutes,
              seconds: valueProp?.seconds,
              period: currentTimeFormat.current === TimeFormat.H12 ? dayPeriod : null,
            }
          : null,
        true
      );
    }
  }, [setValue, valueProp]);

  useEffect(() => {
    // on close, make sure to restore the last valid value
    // (in the case the user closed with some time part invalid)
    if (!firstRender.current && !isOpen) {
      rollbackValue();
    }
  }, [isOpen, rollbackValue]);

  useEffect(() => {
    // run validations on each render
    // (except on the first, remaining in the standBy/untouched state)
    if (!firstRender.current) {
      setValidationState(() => {
        // this will only run if status is uncontrolled
        if (required && lastValidValue == null) {
          return "invalid";
        }
        return "valid";
      });
    }
  });

  useEffect(() => {
    firstRender.current = false;
  }, []);
  // #endregion

  // #region EVENT HANDLERS
  const handleTimeChange = (updatedTimeObject) => {
    if (!timeIsEqual(value, updatedTimeObject)) {
      const valid = timeIsValid(updatedTimeObject, timeFormat);

      // the value only is commited if valid
      setValue(updatedTimeObject, valid);

      if (valid) {
        // always output in 24h format
        onChange?.(getTimeWithFormat24(updatedTimeObject, timeFormat));
      }
    }
  };

  /**
   * Handles the change of the hours value
   * @param {Number} hours - selected hours
   * @memberof HvTimePicker
   */
  const handleHoursChange = (updatedHours) => {
    const newSelectedTime = {
      ...value,
      hours: updatedHours,
    };

    handleTimeChange(newSelectedTime);
  };

  /**
   * Handles the change of the minutes value
   * @param {Number} minutes - selected minutes
   * @memberof HvTimePicker
   */
  const handleMinutesChange = (updatedMinutes) => {
    const newSelectedTime = {
      ...value,
      minutes: updatedMinutes,
    };

    handleTimeChange(newSelectedTime);
  };

  /**
   * Handles the change of the seconds value
   * @param {Number} seconds - selected seconds
   * @memberof HvTimePicker
   */
  const handleSecondsChange = (updatedSeconds) => {
    const newSelectedTime = {
      ...value,
      seconds: updatedSeconds,
    };

    handleTimeChange(newSelectedTime);
  };

  /**
   * Handles the change of the period (am/pm)
   * @param {String} period - selected period
   * @memberof HvTimePicker
   */
  const handleChangePeriod = (updatedPeriod) => {
    const newSelectedTime = {
      ...value,
      period: updatedPeriod,
    };

    handleTimeChange(newSelectedTime);
  };

  const onToggle = (evt, open) => {
    /* 
     If evt is null this toggle wasn't triggered by the user.
     instead it was triggered by the baseDropdown useEffect after
     the change of the expanded property.
    */
    if (evt === null) return;

    onToggleCallback?.(evt, open);

    setOpen(open);
  };
  // #endregion

  const hasLabels = label != null;
  const hasDescription = description != null;

  // the error message area will only be created if:
  // - an external element that provides an error message isn't identified via aria-errormessage AND
  //   - both status and statusMessage properties are being controlled OR
  //   - status is uncontrolled and required is true
  const canShowError =
    ariaErrorMessage == null &&
    ((status !== undefined && statusMessage !== undefined) || (status === undefined && required));

  const isStateInvalid = validationState === "invalid";

  let errorMessageId;
  if (isStateInvalid) {
    errorMessageId = canShowError ? setId(elementId, "error") : ariaErrorMessage;
  }

  return (
    <HvFormElement
      id={id}
      name={name}
      locale={locale}
      required={required}
      disabled={disabled}
      status={validationState}
      classes={{
        root: classes.formElementRoot,
      }}
      className={clsx(className, classes.root)}
      {...others}
    >
      {(hasLabels || hasDescription) && (
        <div className={classes.labelContainer}>
          {hasLabels && (
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
        id={setId(elementId, "timepicker-dropdown")}
        role="combobox"
        placeholder={
          lastValidValue != null ? (
            getFormattedTime(lastValidValue, timeFormat)
          ) : (
            <HvTypography variant="placeholderText">{placeholder}</HvTypography>
          )
        }
        classes={{
          placeholder: disabled ? classes.dropdownPlaceholderDisabled : classes.dropdownPlaceholder,
          header: isStateInvalid ? classes.dropdownHeaderInvalid : undefined,
          headerOpen: classes.dropdownHeaderOpen,
        }}
        variableWidth
        placement="right"
        adornment={
          <TimeIcon color={disabled ? "atmo5" : "acce1"} className={classes.iconBaseRoot} />
        }
        expanded={isOpen}
        onToggle={onToggle}
        onContainerCreation={setFocusToContent}
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
        disablePortal={disablePortal}
        disabled={disabled}
        popperProps={{ modifiers: [{ name: "preventOverflow", enabled: escapeWithReference }] }}
        {...dropdownProps}
      >
        <div className={classes.timePopperContainer}>
          <UnitTimePicker
            id={setId(elementId, "hours")}
            placeholder={hoursPlaceholder}
            unit={
              timeFormat === TimeFormat.H24
                ? TimePickerUnits.HOUR_24.type
                : TimePickerUnits.HOUR_12.type
            }
            unitValue={value?.hours}
            onChangeUnitTimeValue={handleHoursChange}
          />
          <span className={classes.separator}>:</span>
          <UnitTimePicker
            id={setId(elementId, "minutes")}
            placeholder={minutesPlaceholder}
            unit={TimePickerUnits.MINUTE.type}
            unitValue={value?.minutes}
            onChangeUnitTimeValue={handleMinutesChange}
          />
          <span className={classes.separator}>:</span>
          <UnitTimePicker
            id={setId(elementId, "seconds")}
            placeholder={secondsPlaceholder}
            unit={TimePickerUnits.SECOND.type}
            unitValue={value?.seconds}
            onChangeUnitTimeValue={handleSecondsChange}
          />
          {timeFormat === TimeFormat.H12 && (
            <PeriodPicker onChangePeriod={handleChangePeriod} period={value?.period} />
          )}
        </div>
      </HvBaseDropdown>
      {canShowError && (
        <HvWarningText id={setId(elementId, "error")} disableBorder className={classes.error}>
          {validationMessage}
        </HvWarningText>
      )}
    </HvFormElement>
  );
};

HvTimePicker.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied to the input/popper
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the root element.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the input.
     */
    input: PropTypes.string,
    /**
     * Styles applied to the label.
     */
    label: PropTypes.string,
    /**
     * Styles applied to the timePopperContainer.
     */
    timePopperContainer: PropTypes.string,
    /**
     * Styles applied to the separator.
     */
    separator: PropTypes.string,
    /**
     * Styles applied to the period container.
     */
    periodContainer: PropTypes.string,
    /**
     * Styles applied to the form element.
     */
    formElementRoot: PropTypes.string,
    /**
     * Styles applied to the dropdown placeholder.
     */
    dropdownPlaceholder: PropTypes.string,
    /**
     * Styles applied to the icon base.
     */
    iconBaseRoot: PropTypes.string,
    /**
     * Styles applied to the error area.
     */
    error: PropTypes.string,
    /**
     * Styles applied to the container of the labels elements.
     */
    labelContainer: PropTypes.string,
    /**
     * Styles applied to the icon information text.
     */
    description: PropTypes.string,
    /**
     * Styles applied to the dropdown when invalid information text.
     */
    dropdownHeaderInvalid: PropTypes.string,
    /**
     * Styles applied to the dropdown text when invalid.
     */

    dropdownPlaceholderDisabled: PropTypes.string,
    /**
     * Styles applied to the dropdown border when invalid.
     */
    dropdownHeaderOpen: PropTypes.string,
  }).isRequired,
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,

  /**
   * Id to be applied to the form element root node.
   */
  id: PropTypes.string,

  /**
   * The form element name.
   */
  name: PropTypes.string,

  /**
   * The value of the form element.
   */
  value: PropTypes.shape({
    hours: PropTypes.number,
    minutes: PropTypes.number,
    seconds: PropTypes.number,
    period: PropTypes.string,
  }),
  /**
   * When uncontrolled, defines the initial input value.
   */
  defaultValue: PropTypes.shape({
    hours: PropTypes.number,
    minutes: PropTypes.number,
    seconds: PropTypes.number,
    period: PropTypes.string,
  }),

  /**
   * Indicates that user input is required on the form element.
   */
  required: PropTypes.bool,

  /**
   * Indicates that the form element is disabled.
   */
  disabled: PropTypes.bool,

  /**
   * The label of the form element.
   *
   * The form element must be labeled for accessibility reasons.
   * If not provided, an aria-label or aria-labelledby must be provided instead.
   */
  label: PropTypes.string,

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
   * The placeholder value when no time is selected.
   */
  placeholder: PropTypes.string,

  /**
   * The placeholder of the hours input.
   */
  hoursPlaceholder: PropTypes.string,
  /**
   * The placeholder of the minutes input.
   */
  minutesPlaceholder: PropTypes.string,
  /**
   * The placeholder of the seconds input.
   */
  secondsPlaceholder: PropTypes.string,

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
   * Identifies the element that provides an error message for the time picker.
   *
   * Will only be used when the validation status is invalid.
   */
  "aria-errormessage": PropTypes.string,

  /**
   * If the time should be presented in 12 or 24 hour format.
   * If undefined, the component will use a format according to the passed locale.
   * If defined, it will "override" the default value given by the locale
   */
  timeFormat: PropTypes.oneOf([TimeFormat.H12, TimeFormat.H24, 12, 24, undefined]),

  /**
   * Locale that will provide the time format(12 or 24 hour format)
   * It is "overwritten" by the timeFormat prop
   */
  locale: PropTypes.string,

  /**
   * Callback function to be triggered when the input value is changed.
   * It is invoked with a object param with the following props:
   *  - hours (in a 24h format)
   *  - minutes
   *  - seconds
   *  - period
   *
   * It is always invoked with the hours in a 24h format
   */
  onChange: PropTypes.func,

  /**
   * Callback called when dropdown changes the expanded state.
   *
   * @param {object} event The event source of the callback.
   * @param {boolean} open If the dropdown new state is open (`true`) or closed (`false`).
   */
  onToggle: PropTypes.func,

  /**
   * Allow starting with an empty value by not defaulting to the current time.
   * This should become the default behavior when the component is promoted to core.
   */
  disableDefaultValue: PropTypes.bool,

  /**
   * Default value for the hours picker
   * @deprecated use defaultValue instead
   */
  hours: PropTypes.number,
  /**
   * Default value for the minutes picker
   * @deprecated use defaultValue instead
   */
  minutes: PropTypes.number,
  /**
   * Default value for the seconds picker
   * @deprecated use defaultValue instead
   */
  seconds: PropTypes.number,
  /**
   * Default value for the period picker
   * @deprecated use defaultValue instead
   */
  period: PropTypes.string,

  /**
   * Disable the portal behavior. The children stay within it's parent DOM hierarchy.
   */
  disablePortal: PropTypes.bool,

  /**
   * Sets if the calendar container should follow the date picker input out of the screen or stay visible.
   */
  escapeWithReference: PropTypes.bool,
  /**
   * Extra properties to be passed to the timepicker dropdown.
   */
  dropdownProps: PropTypes.instanceOf(Object),
};

export default withStyles(styles, { name: "HvTimePicker" })(HvTimePicker);
