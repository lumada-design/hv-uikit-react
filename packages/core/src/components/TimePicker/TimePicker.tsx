import { useState, useRef, useMemo } from "react";
import { ClassNames } from "@emotion/react";
import { Time } from "@internationalized/date";
import { useTimeField } from "@react-aria/datepicker";
import {
  TimeFieldStateOptions,
  useTimeFieldState,
} from "@react-stately/datepicker";

import { Time as TimeIcon } from "@hitachivantara/uikit-react-icons";
import {
  HvFormElement,
  HvBaseDropdown,
  HvLabel,
  HvWarningText,
  HvInfoMessage,
  HvFormElementProps,
  HvBaseDropdownProps,
  getClasses,
  useControlled,
  useUniqueId,
  setId,
} from "../..";

import { Unit } from "./Unit";
import { Placeholder } from "./Placeholder";
import { styles } from "./TimePicker.styles";

const toTime = (value?: HvTimePickerValue) => {
  if (!value) return undefined;
  const { hours, minutes, seconds } = value;
  return new Time(hours, minutes, seconds);
};

const getFormat = (timeFormat?: TimeFormat) => {
  if (timeFormat == null) return 24;
  return timeFormat === "12" ? 12 : 24;
};

type TimePickerKey = keyof typeof styles;

const cc = getClasses(Object.keys(styles) as TimePickerKey[], "HvTimePicker");

export { cc as timePickerClasses };

export type TimeFormat = "12" | "24";

export type HvTimePickerClasses = Record<TimePickerKey, string>;

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
    "classes" | "value" | "defaultValue" | "onChange" | "onFocus" | "onBlur"
  > {
  /** Id to be applied to the form element root node. */
  id?: string;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: Partial<HvTimePickerClasses>;
  /** Current value of the element when _controlled_. Follows the 24-hour format. */
  value?: HvTimePickerValue;
  /** Initial value of the element when _uncontrolled_. Follows the 24-hour format. */
  defaultValue?: HvTimePickerValue;
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
}

/**
 * A Time Picker allows the user to choose a specific time or a time range.
 */
export const HvTimePicker = (props: HvTimePickerProps) => {
  const {
    classes = {},
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
    dropdownProps,
    ...others
  } = props;
  const id = useUniqueId(idProp, "hvtimepicker");
  const ref = useRef<HTMLDivElement>(null);

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
  const { labelProps, fieldProps } = useTimeField(
    {
      ...stateProps,
      id,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
    },
    state,
    ref
  );

  const [open, setOpen] = useState(false);

  const [validationMessage] = useControlled(statusMessage, "Required");
  const [validationState] = useControlled(status, "standBy");

  const placeholders = useMemo(
    () => ({
      hour: hoursPlaceholder,
      minute: minutesPlaceholder,
      second: secondsPlaceholder,
    }),
    [hoursPlaceholder, minutesPlaceholder, secondsPlaceholder]
  );

  // the error message area will only be created if:
  // - an external element that provides an error message isn't identified via aria-errormessage AND
  //   - both status and statusMessage properties are being controlled OR
  //   - status is uncontrolled and required is true
  const canShowError =
    ariaErrorMessage == null &&
    ((status !== undefined && statusMessage !== undefined) ||
      (status === undefined && required));

  const is12HrFormat = state.segments[5] != null;
  const isStateInvalid = validationState === "invalid";
  const errorMessageId = isStateInvalid
    ? canShowError
      ? setId(id, "error")
      : ariaErrorMessage
    : undefined;

  return (
    <ClassNames>
      {({ css, cx }) => (
        <HvFormElement
          name={name}
          required={required}
          disabled={disabled}
          status={validationState}
          className={cx(cc.root, css(styles.root), classes.root, className)}
          {...others}
        >
          {(label || description) && (
            <div
              className={cx(
                cc.labelContainer,
                css(styles.labelContainer),
                classes.labelContainer
              )}
            >
              {label && (
                <HvLabel
                  label={label}
                  className={cx(cc.label, css(styles.label), classes.label)}
                  {...labelProps}
                />
              )}
              {description && (
                <HvInfoMessage
                  className={cx(
                    cc.description,
                    css(styles.description),
                    classes.description
                  )}
                >
                  {description}
                </HvInfoMessage>
              )}
            </div>
          )}

          <div className={css({ width: is12HrFormat ? 220 : 200 })}>
            <HvBaseDropdown
              role="combobox"
              variableWidth
              disabled={disabled}
              readOnly={readOnly}
              placeholder={
                placeholder && !state.value ? (
                  placeholder
                ) : (
                  <Placeholder
                    ref={ref}
                    name={name}
                    state={state}
                    placeholders={placeholders}
                    className={cx(
                      cc.placeholder,
                      css(styles.placeholder),
                      classes.placeholder,
                      disabled &&
                        cx(
                          cc.placeholderDisabled,
                          css(styles.placeholderDisabled),
                          classes.placeholderDisabled
                        )
                    )}
                    {...fieldProps}
                  />
                )
              }
              classes={{
                header: cx(
                  cc.dropdownHeader,
                  css(styles.dropdownHeader),
                  // TODO: move styles to HvBaseDropdown
                  css({ display: "flex", justifyContent: "space-between" }),
                  classes.dropdownHeader,
                  isStateInvalid &&
                    cx(
                      cc.dropdownHeaderInvalid,
                      css(styles.dropdownHeaderInvalid),
                      classes.dropdownHeaderInvalid
                    )
                ),
                panel: css(styles.dropdownPanel),
                headerOpen: cx(
                  cc.dropdownHeaderOpen,
                  css(styles.dropdownHeaderOpen),
                  classes.dropdownHeaderOpen
                ),
              }}
              placement="right"
              adornment={
                <TimeIcon
                  color={disabled ? "secondary_60" : undefined}
                  className={cx(cc.icon, css(styles.icon), classes.icon)}
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
              aria-invalid={isStateInvalid ? true : undefined}
              aria-errormessage={errorMessageId}
              disablePortal={disablePortal}
              popperProps={{
                modifiers: [
                  { name: "preventOverflow", enabled: escapeWithReference },
                ],
              }}
              {...dropdownProps}
            >
              <div
                ref={ref}
                className={cx(
                  cc.timePopperContainer,
                  css(styles.timePopperContainer),
                  classes.timePopperContainer
                )}
              >
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
          </div>

          {canShowError && (
            <HvWarningText
              id={setId(id, "error")}
              disableBorder
              className={cx(cc.error, css(styles.error), classes.error)}
            >
              {validationMessage}
            </HvWarningText>
          )}
        </HvFormElement>
      )}
    </ClassNames>
  );
};
