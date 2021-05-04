import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import clsx from "clsx";

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
} from "@hv/uikit-react-core";
import { Time as TimeIcon } from "@hv/uikit-react-icons";
import UnitTimePicker from "./UnitTimePicker";
import { TimePickerUnits, TimeFormat, PeriodPickerOptions } from "./enums";
import { getFormattedTime, getTimeFormatForLocale } from "./timePickerFormatter";
import { getHoursForTimeFormat, getTimeWithFormat24 } from "./timePickerConverter";

import PeriodPicker from "./PeriodPicker";
import styles from "./styles";

/**
 * A TimePicker component used to choose the time, following specifications provided by Design System. Still in development.
 */

const HvTimePicker = ({
  classes,
  className,
  id,
  name,

  value: valueProp,
  defaultValue: defaultValueProp,

  required = false,
  disabled = false,
  label,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  description,
  "aria-describedby": ariaDescribedBy,
  status,
  statusMessage,
  timeFormat: chosenTimeFormat,
  locale: localeProp,
  onChange,
  hours = new Date().getHours(),
  minutes = new Date().getMinutes(),
  seconds = 0,
  period: chosenTimePeriod,
  disablePortal = true,
  escapeWithReference = true,
  ...others
}) => {
  const localeFromProvider = useLocale();

  const locale = localeProp || localeFromProvider;

  const timeFormat = chosenTimeFormat || getTimeFormatForLocale(locale);

  // fallback to the deprecated properties
  // we shouldn't do that when promoting to core
  // as it makes impossible to start with an empty value
  const defaultValue = defaultValueProp ?? {
    hours,
    minutes,
    seconds,
  };

  const [value, setValue] = useControlled(valueProp, defaultValue);

  const selectedTime = {
    hours: getHoursForTimeFormat(value.hours, timeFormat),
    minutes: value.minutes,
    seconds: value.seconds,
    period:
      timeFormat === TimeFormat.H24
        ? undefined
        : chosenTimePeriod || (value.hours < 12 ? PeriodPickerOptions.AM : PeriodPickerOptions.PM),
  };

  const [validationMessage] = useControlled(statusMessage, "Required");
  const [validationState, setValidationState] = useControlled(status, "standBy");

  const handleTimeChange = (updatedTimeObject) => {
    const selectedTimeIn24Format = getTimeWithFormat24(updatedTimeObject, timeFormat);

    // this will only run if value is uncontrolled
    setValue(selectedTimeIn24Format);

    onChange?.(selectedTimeIn24Format);
  };

  const elementId = useUniqueId(id, "hvtimepicker");

  const validateInput = (timeChangeState) => {
    setValidationState(() => {
      // this will only run if status is uncontrolled
      if (required && timeChangeState) {
        return "invalid";
      }
      return "valid";
    });
  };

  /**
   * Handles the change of the hours value
   * @param {Number} hours - selected hours
   * @memberof HvTimePicker
   */
  const handleHoursChange = (updatedHours) => {
    const newSelectedTime = {
      ...selectedTime,
      hours: updatedHours,
    };

    const hourInputState =
      (timeFormat === 24 && updatedHours <= 24) || (timeFormat === 12 && updatedHours <= 12);

    validateInput(hourInputState);
    handleTimeChange(newSelectedTime);
  };

  /**
   * Handles the change of the minutes value
   * @param {Number} minutes - selected minutes
   * @memberof HvTimePicker
   */
  const handleMinutesChange = (updatedMinutes) => {
    const newSelectedTime = {
      ...selectedTime,
      minutes: updatedMinutes,
    };

    const minutesInputState = updatedMinutes >= 0 || updatedMinutes <= 59;

    validateInput(minutesInputState);
    handleTimeChange(newSelectedTime);
  };

  /**
   * Handles the change of the seconds value
   * @param {Number} seconds - selected seconds
   * @memberof HvTimePicker
   */
  const handleSecondsChange = (updatedSeconds) => {
    const newSelectedTime = {
      ...selectedTime,
      seconds: updatedSeconds,
    };

    const secondsInputState = updatedSeconds >= 0 || updatedSeconds <= 59;

    validateInput(secondsInputState);
    handleTimeChange(newSelectedTime);
  };

  const setFocusToContent = (containerRef) => {
    containerRef?.getElementsByTagName("input")[0]?.focus();
  };

  /**
   * Handles the change of the period (am/pm)
   * @param {String} period - selected period
   * @memberof HvTimePicker
   */
  const handleChangePeriod = (updatedPeriod) => {
    const newSelectedTime = {
      ...selectedTime,
      period: updatedPeriod,
    };
    handleTimeChange(newSelectedTime);
  };

  const RenderTimePickerContent = () => {
    const separator = <span className={classes.separator}>:</span>;
    return (
      <div className={classes.timePopperContainer} role="tooltip">
        <UnitTimePicker
          unit={
            timeFormat === TimeFormat.H24
              ? TimePickerUnits.HOUR_24.type
              : TimePickerUnits.HOUR_12.type
          }
          unitValue={selectedTime.hours}
          onChangeUnitTimeValue={handleHoursChange}
        />
        {separator}
        <UnitTimePicker
          unit={TimePickerUnits.MINUTE.type}
          unitValue={selectedTime.minutes}
          onChangeUnitTimeValue={handleMinutesChange}
        />
        {separator}
        <UnitTimePicker
          unit={TimePickerUnits.SECOND.type}
          unitValue={selectedTime.seconds}
          onChangeUnitTimeValue={handleSecondsChange}
        />
        {timeFormat === TimeFormat.H12 && (
          <div className={classes.periodContainer}>
            <PeriodPicker onChangePeriod={handleChangePeriod} period={selectedTime.period} />
          </div>
        )}
      </div>
    );
  };

  const hasLabels = label != null;
  const hasDescription = description != null;

  // error message area will only be needed if the status is being controlled
  // or if required is true
  const canShowError = status !== undefined || required;

  return (
    <HvFormElement
      id={setId(elementId, "timepicker")}
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
            <HvLabel
              id={setId(elementId, "label")}
              htmlFor={setId(elementId, "input")}
              label={label}
              className={classes.label}
            />
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
        placeholder={getFormattedTime(selectedTime)}
        classes={{
          placeholder: classes.dropdownPlaceholder,
        }}
        variableWidth
        placement="right"
        adornment={<TimeIcon className={classes.iconBaseRoot} />}
        onContainerCreation={setFocusToContent}
        aria-haspopup="dialog"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-invalid={validationState === "invalid" ? true : undefined}
        aria-errormessage={validationState === "invalid" ? setId(elementId, "error") : undefined}
        aria-describedby={
          [description && setId(elementId, "description"), ariaDescribedBy].join(" ").trim() ||
          undefined
        }
        disablePortal={disablePortal}
        disabled={disabled}
        popperProps={{ modifiers: [{ name: "preventOverflow", enabled: escapeWithReference }] }}
      >
        <RenderTimePickerContent />
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
  value: PropTypes.string,
  /**
   * When uncontrolled, defines the initial input value.
   */
  defaultValue: PropTypes.string,

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
   * The status of the form element.
   *
   * Valid is correct, invalid is incorrect and standBy means no validations have run.
   *
   * When uncontrolled and unspecified it will default to "standBy" and change to either "valid"
   * or "invalid" after any change to the state.
   */
  status: PropTypes.oneOf(["standBy", "valid", "invalid"]),
  /**
   * The error message to show when `status` is "invalid". Defaults to "Required".
   */
  statusMessage: PropTypes.node,

  /**
   * If the time should be presented in 12 or 24 hour format.
   * If undefined, the component will use a format according to the passed locale.
   * If defined, it will "override" the default value given by the locale
   */
  timeFormat: PropTypes.oneOf([TimeFormat.H12, TimeFormat.H24, undefined]),

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
};

export default withStyles(styles, { name: "HvTimePicker" })(HvTimePicker);
