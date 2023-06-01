import { useState, useRef, useMemo } from "react";
import { ClassNames } from "@emotion/react";
import { Time } from "@internationalized/date";
import { useDateSegment, useTimeField } from "@react-aria/datepicker";
import {
  DateFieldState,
  DateSegment,
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
  theme,
} from "../..";

import { UnitTimePicker } from "./UnitTimePicker";

export type TimeFormat = "H12" | "H24";

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
    "classes" | "value" | "defaultValue" | "onChange"
  > {
  /** Id to be applied to the form element root node. */
  id?: string;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: Partial<Record<HvTimePickerClassKey, string>>;
  /** Whether to show the native time picker instead */
  native?: boolean;
  /** Current value of the form element. */
  value?: HvTimePickerValue;
  /** When uncontrolled, defines the initial value. */
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
   * If the time should be presented in 12 or 24 hour format.
   * If undefined, the component will use a format according to the passed locale.
   */
  timeFormat?: TimeFormat;
  /** Locale that will provide the time format(12 or 24 hour format). It is "overwritten" by `timeFormat` */
  locale?: string;

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

  /** Callback called when dropdown changes the expanded state. */
  onToggle?: (event: Event, isOpen: boolean) => void;

  /** Disable the portal behavior. The children stay within it's parent DOM hierarchy. */
  disablePortal?: boolean;

  /** Sets if the calendar container should follow the date picker input out of the screen or stay visible. */
  escapeWithReference?: boolean;

  /** Extra properties to be passed to the TimePicker's dropdown. */
  dropdownProps?: Partial<HvBaseDropdownProps>;
}

const toTime = (value?: HvTimePickerValue) => {
  if (!value) return undefined;
  const { hours, minutes, seconds } = value;
  return new Time(hours, minutes, seconds);
};

interface InlineSegmentProps {
  segment: DateSegment;
  state: DateFieldState;
  placeholder: string;
}

const InlineSegment = ({ segment, state, placeholder }: InlineSegmentProps) => {
  const ref = useRef(null);
  const { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <div ref={ref} {...segmentProps}>
      {(() => {
        if (segment.type === "literal") return segment.text;
        if (segment.isPlaceholder) return placeholder ?? segment.text;
        return segment.text.padStart(2, "0");
      })()}
    </div>
  );
};

/**
 * A Time Picker allows the user to choose a specific time or a time range.
 */
export const HvTimePicker = (props: HvTimePickerProps) => {
  const {
    classes = {},
    className,

    id,
    name,

    native = false,
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
    hoursPlaceholder = "HH",
    minutesPlaceholder = "MM",
    secondsPlaceholder = "SS",

    value: valueProp,
    defaultValue: defaultValueProp,

    timeFormat: timeFormatProp,
    locale = "en",

    onToggle,

    // misc properties:
    disablePortal = true,
    escapeWithReference = true,
    dropdownProps,
    ...others
  } = props;

  const is12Hour = timeFormatProp === "H12";
  const state = useTimeFieldState({
    value: toTime(valueProp),
    defaultValue: toTime(defaultValueProp),
    label,
    locale,
    granularity: "second",
    hourCycle: is12Hour ? 12 : 24,
  });
  const ref = useRef(null);
  const { labelProps, fieldProps } = useTimeField(props as any, state, ref);
  const [open, setOpen] = useState(false);

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

  const isStateInvalid = state.validationState === "invalid";

  const placeholders = useMemo(
    () => ({
      hour: hoursPlaceholder,
      minute: minutesPlaceholder,
      second: secondsPlaceholder,
    }),
    [hoursPlaceholder, minutesPlaceholder, secondsPlaceholder]
  );

  const validationMessage = statusMessage ?? "Required";

  const elementValue = useMemo(() => {
    if (state.value == null) return "";
    const { hour, minute, second } = state.value as any;

    return [hour, minute, second]
      .map((el) => String(el).padStart(2, "0"))
      .join(":");
  }, [state.value]);

  return (
    <ClassNames>
      {({ css, cx }) => (
        <HvFormElement
          id={id}
          name={name}
          required={required}
          disabled={disabled}
          status={state.validationState}
          label={label}
          classes={{
            root: classes.formElementRoot,
          }}
          className={cx(className, classes.root)}
          {...others}
        >
          {(hasLabels || hasDescription) && (
            <div className={classes.labelContainer}>
              {hasLabels && (
                <HvLabel
                  label={label}
                  className={classes.label}
                  {...labelProps}
                />
              )}
              {hasDescription && (
                <HvInfoMessage className={classes.description}>
                  {description}
                </HvInfoMessage>
              )}
            </div>
          )}
          <input
            name={name}
            required={required}
            readOnly={readOnly}
            disabled={disabled}
            {...(native
              ? { type: "time", defaultValue: elementValue, step: 1 }
              : { type: "hidden", value: elementValue })}
          />
          <HvBaseDropdown
            role="combobox"
            style={{ width: 200 }} // TODO
            placeholder={
              <div
                ref={ref}
                style={{ display: "flex", gap: 2 }}
                {...fieldProps}
              >
                {state.segments.map((segment) => (
                  <InlineSegment
                    key={segment.type}
                    segment={segment}
                    state={state}
                    placeholder={placeholders[segment.type]}
                  />
                ))}
              </div>
            }
            classes={{
              placeholder: disabled
                ? classes.dropdownPlaceholderDisabled
                : classes.dropdownPlaceholder,
              header: css({ display: "flex", justifyContent: "space-between" }),
              panel: css({ border: `1px solid ${theme.colors.secondary_80}` }),
              headerOpen: classes.dropdownHeaderOpen,
            }}
            variableWidth
            placement="right"
            adornment={<TimeIcon color={disabled ? "atmo5" : undefined} />}
            expanded={open}
            onToggle={(evt, newOpen) => {
              setOpen(newOpen);
              onToggle?.(evt, newOpen);
            }}
            onContainerCreation={(containerRef) => {
              containerRef?.getElementsByTagName("input")[0]?.focus();
            }}
            aria-haspopup="dialog"
            aria-label={ariaLabel}
            aria-invalid={isStateInvalid ? true : undefined}
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
            <div
              className={css({
                backgroundColor: theme.colors.atmo1,
                zIndex: 10,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: theme.space.xs,
                userSelect: "none",
                minWidth: "175px",
              })}
            >
              {state.segments.map((segment) => (
                <UnitTimePicker
                  {...segment}
                  key={segment.type}
                  placeholder={
                    placeholders[segment.type] || segment.placeholder
                  }
                  onAdd={() => state.increment(segment.type)}
                  onSub={() => state.decrement(segment.type)}
                  onChange={(evt, val) =>
                    state.setSegment(segment.type, Number(val))
                  }
                />
              ))}
            </div>
          </HvBaseDropdown>
          {canShowError && (
            <HvWarningText disableBorder className={classes.error}>
              {validationMessage}
            </HvWarningText>
          )}
        </HvFormElement>
      )}
    </ClassNames>
  );
};
