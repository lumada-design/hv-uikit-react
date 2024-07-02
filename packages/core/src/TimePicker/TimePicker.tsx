import { forwardRef, useMemo, useRef, useState } from "react";
import { Time } from "@internationalized/date";
import { useForkRef } from "@mui/material/utils";
import { useTimeField } from "@react-aria/datepicker";
import {
  TimeFieldStateOptions,
  useTimeFieldState,
} from "@react-stately/datepicker";
import { Time as TimeIcon } from "@hitachivantara/uikit-react-icons";

import { HvBaseDropdown, HvBaseDropdownProps } from "../BaseDropdown";
import {
  HvFormElement,
  HvFormElementProps,
  HvFormStatus,
  HvInfoMessage,
  HvLabel,
  HvWarningText,
} from "../Forms";
import { useControlled } from "../hooks/useControlled";
import { useDefaultProps } from "../hooks/useDefaultProps";
import { useUniqueId } from "../hooks/useUniqueId";
import { ExtractNames } from "../utils/classes";
import { setId } from "../utils/setId";
import { Placeholder } from "./Placeholder";
import { staticClasses, useClasses } from "./TimePicker.styles";
import { Unit } from "./Unit";

const toTime = (value?: HvTimePickerValue | null) => {
  if (!value) return value;
  const { hours, minutes, seconds } = value;
  return new Time(hours, minutes, seconds);
};

const getFormat = (timeFormat?: TimeFormat) => {
  if (timeFormat == null) return 24;
  return timeFormat === "12" ? 12 : 24;
};

export { staticClasses as timePickerClasses };

export type TimeFormat = "12" | "24";

export type HvTimePickerClasses = ExtractNames<typeof useClasses>;

export type HvTimePickerClassKey =
  | "root"
  | "input"
  | "label"
  | "placeholder"
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

export type HvTimePickerValue = {
  hours: number;
  minutes: number;
  seconds: number;
};

export interface HvTimePickerProps
  extends Omit<
    HvFormElementProps,
    "classes" | "value" | "defaultValue" | "onChange"
  > {
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvTimePickerClasses;
  /** Current value of the element when _controlled_. Follows the 24-hour format. */
  value?: HvTimePickerValue | null;
  /** Initial value of the element when _uncontrolled_. Follows the 24-hour format. */
  defaultValue?: HvTimePickerValue | null;
  /** The placeholder value when no time is selected. */
  placeholder?: string;
  /** The placeholder of the hours input. */
  hoursPlaceholder?: string;
  /** The placeholder of the minutes input. */
  minutesPlaceholder?: string;
  /** The placeholder of the seconds input. */
  secondsPlaceholder?: string;
  /**
   * Whether the time picker should show the AM/PM 12-hour clock or the 24-hour one.
   * If undefined, the component will use a format according to the passed locale.
   */
  timeFormat?: TimeFormat;
  /** Whether to show the seconds when using the native time picker */
  showSeconds?: boolean;
  /** Locale that will provide the time format(12 or 24 hour format). It is "overwritten" by `showAmPm` */
  locale?: string;
  /** Whether the dropdown is expandable. */
  disableExpand?: boolean;
  /**
   * Callback function to be triggered when the input value is changed.
   * It is invoked with a `{hours, minutes, seconds}` object, always in the 24h format
   */
  onChange?: (value: HvTimePickerValue) => void;
  /** Callback called when dropdown changes the expanded state. */
  onToggle?: (event: Event, isOpen: boolean) => void;
  /** Disable the portal behavior. The children stay within it's parent DOM hierarchy. */
  disablePortal?: boolean;
  /** Sets if the calendar container should follow the date picker input out of the screen or stay visible. */
  escapeWithReference?: boolean;
  /** Extra properties to be passed to the TimePicker's dropdown. */
  dropdownProps?: Partial<HvBaseDropdownProps>;
  /**
   * The label of the form element.
   *
   * The form element must be labeled for accessibility reasons.
   * If not provided, an aria-label or aria-labelledby must be provided instead.
   */
  label?: React.ReactNode;
  /**
   * Provide additional descriptive text for the form element.
   */
  description?: React.ReactNode;
}

/**
 * A Time Picker allows the user to choose a specific time or a time range.
 */
export const HvTimePicker = forwardRef<HTMLDivElement, HvTimePickerProps>(
  (props, ref) => {
    const {
      classes: classesProp,
      className,

      id: idProp,
      name,
      required = false,
      disabled = false,
      readOnly = false,
      label,

      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      description,
      "aria-describedby": ariaDescribedBy,
      status,
      statusMessage,
      "aria-errormessage": ariaErrorMessage,

      placeholder,
      hoursPlaceholder = "hh",
      minutesPlaceholder = "mm",
      secondsPlaceholder = "ss",

      value: valueProp,
      defaultValue: defaultValueProp,

      timeFormat,
      showSeconds,
      disableExpand,
      locale = "en",

      onToggle,
      onChange,

      // misc properties:
      disablePortal = true,
      escapeWithReference = true,
      dropdownProps = {},
      ...others
    } = useDefaultProps("HvTimePicker", props);

    const id = useUniqueId(idProp);

    const { classes, cx } = useClasses(classesProp);

    const timeFieldRef = useRef<HTMLDivElement>(null);

    const { ref: refProp, ...otherDropdownProps } = dropdownProps;
    const dropdownForkedRef = useForkRef(ref, refProp);

    const stateProps: TimeFieldStateOptions = {
      value: toTime(valueProp),
      defaultValue: toTime(defaultValueProp),
      label,
      locale,
      isRequired: required,
      isReadOnly: readOnly,
      isDisabled: disabled,
      granularity: "second",
      hourCycle: getFormat(timeFormat),
      onChange: (value) => {
        const { hour: hours, minute: minutes, second: seconds } = value;
        onChange?.({ hours, minutes, seconds });
      },
    };
    const state = useTimeFieldState(stateProps);
    const { labelProps, fieldProps, descriptionProps } = useTimeField(
      {
        ...stateProps,
        id,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        "aria-describedby": ariaDescribedBy,
      },
      state,
      timeFieldRef,
    );

    const [open, setOpen] = useState(false);

    const [validationMessage] = useControlled(statusMessage, "Required");
    const [validationState] = useControlled<HvFormStatus>(status, "standBy");

    const placeholders = useMemo(
      () => ({
        hour: hoursPlaceholder,
        minute: minutesPlaceholder,
        second: secondsPlaceholder,
      }),
      [hoursPlaceholder, minutesPlaceholder, secondsPlaceholder],
    );

    // the error message area will only be created if:
    // - an external element that provides an error message isn't identified via aria-errormessage AND
    //   - both status and statusMessage properties are being controlled OR
    //   - status is uncontrolled and required is true
    const canShowError =
      ariaErrorMessage == null &&
      ((status !== undefined && statusMessage !== undefined) ||
        (status === undefined && required));

    const isStateInvalid = validationState === "invalid";
    const errorMessageId = isStateInvalid
      ? canShowError
        ? setId(id, "error")
        : ariaErrorMessage
      : undefined;

    return (
      <HvFormElement
        name={name}
        required={required}
        disabled={disabled}
        status={validationState}
        className={cx(classes.root, className)}
        {...others}
      >
        {(label || description) && (
          <div className={classes.labelContainer}>
            {label && (
              <HvLabel
                label={label}
                className={classes.label}
                {...labelProps}
              />
            )}
            {description && (
              <HvInfoMessage
                className={classes.description}
                {...descriptionProps}
              >
                {description}
              </HvInfoMessage>
            )}
          </div>
        )}

        <HvBaseDropdown
          ref={dropdownForkedRef}
          role="combobox"
          variableWidth
          disabled={disabled}
          readOnly={readOnly}
          placeholder={
            placeholder && !state.value ? (
              placeholder
            ) : (
              <Placeholder
                ref={timeFieldRef}
                name={name}
                state={state}
                placeholders={placeholders}
                className={cx(classes.placeholder, {
                  [classes.placeholderDisabled]: disabled,
                })}
                {...fieldProps}
              />
            )
          }
          classes={{
            header: cx(classes.dropdownHeader, {
              [classes.dropdownHeaderInvalid]: isStateInvalid,
            }),
            panel: classes.dropdownPanel,
            headerOpen: classes.dropdownHeaderOpen,
          }}
          placement="right"
          adornment={
            <TimeIcon
              color={disabled ? "secondary_60" : undefined}
              className={classes.icon}
            />
          }
          expanded={open}
          onToggle={(evt, newOpen) => {
            if (disableExpand) return;
            setOpen(newOpen);
            onToggle?.(evt, newOpen);
          }}
          onContainerCreation={(containerRef) => {
            containerRef?.getElementsByTagName("input")[0]?.focus();
          }}
          aria-haspopup="dialog"
          aria-label={ariaLabel}
          aria-labelledby={fieldProps["aria-labelledby"]}
          aria-describedby={fieldProps["aria-describedby"]}
          aria-invalid={isStateInvalid ? true : undefined}
          aria-errormessage={errorMessageId}
          disablePortal={disablePortal}
          popperProps={{
            modifiers: [
              { name: "preventOverflow", enabled: escapeWithReference },
            ],
          }}
          {...otherDropdownProps}
        >
          <div ref={timeFieldRef} className={classes.timePopperContainer}>
            {state.segments.map((segment, i) => (
              <Unit
                key={i}
                state={state}
                segment={segment}
                placeholder={placeholders[segment.type]}
                onAdd={() => state.increment(segment.type)}
                onSub={() => state.decrement(segment.type)}
                onChange={(evt, val) => {
                  state.setSegment(segment.type, Number(val));
                }}
              />
            ))}
          </div>
        </HvBaseDropdown>

        {canShowError && (
          <HvWarningText
            id={setId(id, "error")}
            disableBorder
            className={classes.error}
          >
            {validationMessage}
          </HvWarningText>
        )}
      </HvFormElement>
    );
  },
);
