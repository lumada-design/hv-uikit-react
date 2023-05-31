import { useState, useEffect, useRef, useMemo } from "react";
import clsx from "clsx";

import { Time as TimeIcon } from "@hitachivantara/uikit-react-icons";
import {
  HvFormElement,
  HvBaseDropdown,
  HvLabel,
  HvWarningText,
  HvInfoMessage,
  setId,
  useUniqueId,
  useControlled,
  HvTypography,
  useSavedState,
  HvFormElementProps,
  HvBaseDropdownProps,
} from "../..";

import {
  TimeFormat,
  getFormattedTime,
  getHoursForTimeFormat,
  getTimeFormatForLocale,
  getTimeWithFormat24,
  timeIsEqual,
  timeIsValid,
} from "./utils";
import { UnitTimePicker } from "./UnitTimePicker";
import { PeriodPicker } from "./PeriodPicker";

export type HvTimePickerClassKey =
  | "root"
  | "input"
  | "label"
  | "timePopperContainer"
  | "separator"
  | "periodContainer"
  | "formElementRoot"
  | "dropdownPlaceholder"
  | "iconBaseRoot"
  | "error"
  | "labelContainer"
  | "description"
  | "dropdownHeaderInvalid"
  | "dropdownPlaceholderDisabled"
  | "dropdownHeaderOpen";

export interface HvTimePickerValue {
  hours: number;
  minutes: number;
  seconds: number;
  period?: "AM" | "PM";
}

export interface HvTimePickerProps
  extends Omit<
    HvFormElementProps,
    "classes" | "onChange" | "value" | "defaultValue" | "readOnly"
  > {
  /** Id to be applied to the form element root node. */
  id?: string;
  /** Current value of the form element. */
  value?: HvTimePickerValue;
  /** When uncontrolled, defines the initial value. */
  defaultValue?: HvTimePickerValue;
  /** Indicates that user input is required on the form element. */
  required?: boolean;
  /** Indicates that the form element is disabled. */
  disabled?: boolean;
  /** Indicates that the form element is in read only mode. */
  readOnly?: boolean;
  /** The placeholder value when no time is selected. */
  placeholder?: string;
  /** The placeholder of the hours input. */
  hoursPlaceholder?: string;
  /** The placeholder of the minutes input. */
  minutesPlaceholder?: string;
  /** The placeholder of the seconds input. */
  secondsPlaceholder?: string;
  /**
   * If the time should be presented in 12 or 24 hour format.
   * If undefined, the component will use a format according to the passed locale.
   * If defined, it will "override" the default value given by the locale
   */
  timeFormat?: TimeFormat;
  /** Locale that will provide the time format(12 or 24 hour format). It is "overwritten" by `timeFormat` */
  locale?: string;

  classes?: Partial<Record<HvTimePickerClassKey, string>>;

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
  onChange?: (timeIn24Format: HvTimePickerValue) => void;

  /**
   * Callback called when dropdown changes the expanded state.
   *
   * @param {object} event The event source of the callback.
   * @param {boolean} open If the dropdown new state is open (`true`) or closed (`false`).
   */
  onToggle?: (event: Event, open: boolean) => void;

  /**
   * Disable the portal behavior. The children stay within it's parent DOM hierarchy.
   */
  disablePortal?: boolean;

  /** Sets if the calendar container should follow the date picker input out of the screen or stay visible. */
  escapeWithReference?: boolean;

  /** Extra properties to be passed to the TimePicker's dropdown. */
  dropdownProps?: Partial<HvBaseDropdownProps>;
}

/**
 * A TimePicker component used to choose the time.
 */
export const HvTimePicker = ({
  classes = {},
  className,

  id,
  name,

  required = false,
  disabled = false,
  readOnly = false,

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

  timeFormat: timeFormatProp,
  locale,

  onToggle: onToggleCallback,

  // misc properties:
  disablePortal = true,
  escapeWithReference = true,
  dropdownProps,
  ...others
}: HvTimePickerProps) => {
  // #region STATE
  const elementId = useUniqueId(id, "hvtimepicker");

  const timeFormat = useMemo<TimeFormat>(
    () => timeFormatProp ?? getTimeFormatForLocale(locale),
    [timeFormatProp, locale]
  );

  const is12Hour = useMemo(() => timeFormat === "H12", [timeFormat]);
  const is24Hour = useMemo(() => timeFormat === "H24", [timeFormat]);

  const [value, setValue, rollbackValue, lastValidValue] = useSavedState<
    HvTimePickerValue | undefined
  >(() => {
    const v = valueProp ?? defaultValueProp;

    if (!v) return undefined;

    return {
      ...v,
      hours: getHoursForTimeFormat(v.hours, timeFormat),
    };
  });

  const [validationMessage] = useControlled(statusMessage, "Required");
  const [validationState, setValidationState] = useControlled(
    status,
    "standBy"
  );

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
      let { hours: h, period: p } = currentValue.current;
      if (is12Hour) {
        if (h == null || h < 12) {
          p = "AM";
        } else {
          p = "PM";
          if (h > 12) {
            h -= 12;
          }
        }
      } else {
        if (p === "AM") {
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
        valueProp?.hours == null || valueProp.hours < 12 ? "AM" : "PM";

      setValue(
        valueProp != null
          ? {
              hours:
                valueProp?.hours != null
                  ? getHoursForTimeFormat(
                      valueProp.hours,
                      currentTimeFormat.current
                    )
                  : null,
              minutes: valueProp?.minutes,
              seconds: valueProp?.seconds,
              period: currentTimeFormat.current === "H12" ? dayPeriod : null,
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
    ((status !== undefined && statusMessage !== undefined) ||
      (status === undefined && required));

  const isStateInvalid = validationState === "invalid";

  let errorMessageId;
  if (isStateInvalid) {
    errorMessageId = canShowError
      ? setId(elementId, "error")
      : ariaErrorMessage;
  }

  return (
    <HvFormElement
      id={id}
      name={name}
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
          {hasLabels && <HvLabel label={label} className={classes.label} />}
          {hasDescription && (
            <HvInfoMessage className={classes.description}>
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
          placeholder: disabled
            ? classes.dropdownPlaceholderDisabled
            : classes.dropdownPlaceholder,
          header: isStateInvalid ? classes.dropdownHeaderInvalid : undefined,
          headerOpen: classes.dropdownHeaderOpen,
        }}
        variableWidth
        placement="right"
        adornment={
          <TimeIcon
            color={disabled ? "atmo5" : "acce1"}
            className={classes.iconBaseRoot}
          />
        }
        expanded={isOpen}
        onToggle={onToggle}
        onContainerCreation={(ref) => {
          ref?.getElementsByTagName("input")[0]?.focus();
        }}
        aria-haspopup="dialog"
        aria-label={ariaLabel}
        aria-labelledby={
          [label && setId(elementId, "label"), ariaLabelledBy]
            .join(" ")
            .trim() || undefined
        }
        aria-invalid={isStateInvalid ? true : undefined}
        aria-errormessage={errorMessageId}
        aria-describedby={
          [description && setId(elementId, "description"), ariaDescribedBy]
            .join(" ")
            .trim() || undefined
        }
        disablePortal={disablePortal}
        disabled={disabled}
        readOnly={readOnly}
        popperProps={{
          modifiers: [
            { name: "preventOverflow", enabled: escapeWithReference },
          ],
        }}
        {...dropdownProps}
      >
        <div className={classes.timePopperContainer}>
          <UnitTimePicker
            placeholder={hoursPlaceholder}
            unit={is24Hour ? "HOUR_24" : "HOUR_12"}
            unitValue={value?.hours}
            onChangeUnitTimeValue={handleHoursChange}
          />
          <span className={classes.separator}>:</span>
          <UnitTimePicker
            placeholder={minutesPlaceholder}
            unit="MINUTE"
            unitValue={value?.minutes}
            onChangeUnitTimeValue={handleMinutesChange}
          />
          <span className={classes.separator}>:</span>
          <UnitTimePicker
            placeholder={secondsPlaceholder}
            unit="SECOND"
            unitValue={value?.seconds}
            onChangeUnitTimeValue={handleSecondsChange}
          />
          {is12Hour && (
            <PeriodPicker
              onChangePeriod={handleChangePeriod}
              period={value?.period}
            />
          )}
        </div>
      </HvBaseDropdown>
      {canShowError && (
        <HvWarningText disableBorder className={classes.error}>
          {validationMessage}
        </HvWarningText>
      )}
    </HvFormElement>
  );
};
