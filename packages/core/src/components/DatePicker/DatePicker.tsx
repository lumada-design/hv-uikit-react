import { useState, useEffect, useRef } from "react";
import { ClassNames } from "@emotion/react";
import styled from "@emotion/styled";
import { clsx } from "clsx";
import { Calendar } from "@hitachivantara/uikit-react-icons";
import { theme } from "@hitachivantara/uikit-styles";
import {
  HvCalendar,
  HvInfoMessage,
  HvWarningText,
  HvCalendarProps,
  HvActionBar,
  HvButton,
  HvFormElement,
  HvTypography,
  HvBaseDropdown,
  HvLabel,
} from "@core/components";
import { useControlled, useLabels, useUniqueId } from "@core/hooks";
import { HvBaseProps } from "@core/types";
import { setId, useSavedState } from "@core/utils";
import { isInvalid } from "../Forms/FormElement/validationStates";
import { isDate } from "../Calendar/utils";
import { getDateLabel } from "./utils";
import useVisibleDate from "./useVisibleDate";
import { NAV_OPTIONS } from "../Calendar/enums";
import datePickerClasses, { HvDatePickerClasses } from "./datePickerClasses";
import { styles } from "./DatePicker.styles";

const DEFAULT_LABELS = {
  applyLabel: "Apply",
  cancelLabel: "Cancel",
  clearLabel: "Clear",
};

export type HvDatePickerStatus = "standBy" | "valid" | "invalid";

export interface HvDatePickerProps
  extends HvBaseProps<HTMLDivElement, { onChange }> {
  /**
   * Class names to be applied.
   */
  className?: string;
  /**
   * A Jss Object used to override or extend the component styles applied.
   */
  classes?: HvDatePickerClasses;
  /**
   * Id to be applied to the form element root node.
   */
  id?: string;

  /**
   * The form element name.
   */
  name?: string;
  /**
   * The label of the form element.
   *
   * The form element must be labeled for accessibility reasons.
   * If not provided, an aria-label or aria-labelledby must be provided instead.
   */
  label?: React.ReactNode;
  /**
   * @ignore
   */
  "aria-label"?: string;
  /**
   * @ignore
   */
  "aria-labelledby"?: string;
  /**
   * Provide additional descriptive text for the form element.
   */
  description?: React.ReactNode;
  /**
   * @ignore
   */
  "aria-describedby"?: string;
  /**
   * The placeholder value when nothing is selected.
   */
  placeholder?: string;

  /**
   * Indicates that the form element is disabled.
   */
  disabled?: boolean;
  /**
   * Indicates that user input is required on the form element.
   */
  required?: boolean;

  /**
   * The status of the form element.
   *
   * Valid is correct, invalid is incorrect and standBy means no validations have run.
   *
   * When uncontrolled and unspecified it will default to "standBy" and change to either "valid"
   * or "invalid" after any change to the state.
   */
  status?: HvDatePickerStatus;
  /**
   * The error message to show when the validation status is "invalid".
   *
   * Defaults to "Required" when the status is uncontrolled and no `aria-errormessage` is provided.
   */
  statusMessage?: React.ReactNode;
  /**
   * Identifies the element that provides an error message for the date picker.
   *
   * Will only be used when the validation status is invalid.
   */
  "aria-errormessage"?: string;

  /**
   * The callback fired when the value changes.
   */
  onChange?: (date?: Date, endDate?: Date) => void;
  /**
   * The callback fired when user clicks on cancel.
   */
  onCancel?: () => void;
  /**
   * The callback fired when user clicks on clear.
   */
  onClear?: () => void;
  /**
   * An object containing all the labels for the datepicker.
   */
  labels?: {
    /**
     * Apply button label.
     */
    applyLabel?: string;
    /**
     * Cancel button label.
     */
    cancelLabel?: string;
    /**
     * Clear button label.
     */
    clearLabel?: string;
  };

  /**
   * The initial value of the input when in single calendar mode.
   */
  value?: Date;
  /**
   * The initial value for the start date when in range mode.
   */
  startValue?: Date;
  /**
   * The initial value for the end date when in range mode.
   */
  endValue?: Date;
  /**
   * Flag informing if the the component should be in range mode or in single mode.
   */
  rangeMode?: boolean;
  /**
   * The placement where the calendar should be placed according to the input. Options are `left` or `right`.
   * Note this prop only affects the calendar when in `rangeMode`.
   */
  horizontalPlacement?: "left" | "right";
  /**
   * The calendar locale. If undefined, it uses calendar default
   */
  locale?: string;

  /**
   * Controls if actions buttons are visible at the calendar.
   */
  showActions?: boolean;
  /**
   * Controls if clear button is visible at the calendar,
   * only works if showing actions or in range mode.
   */
  showClear?: boolean;
  /**
   * Disable the portal behavior. The children stay within it's parent DOM hierarchy.
   */
  disablePortal?: boolean;
  /**
   * Sets if the calendar container should follow the date picker input out of the screen or stay visible.
   */
  escapeWithReference?: boolean;
  /**
   * An element placed before the Calendar
   */
  startAdornment?: React.ReactNode;
  /**
   * An object containing props to be passed onto the baseDropdown.
   */
  dropdownProps?: Object;
  /**
   * If `true` the DatePicker will be in read only mode, unable to be interacted.
   */
  readOnly?: boolean;
  /**
   * Additional props passed to the HvCalendar component.
   */
  calendarProps?: Partial<HvCalendarProps>;
}

/**
 * A date picker, popup calendar or date range picker is a graphical user
 * interface widget which allows the user to select a date from a calendar.
 */
export const HvDatePicker = ({
  classes,
  className,

  id,
  name,

  required = false,
  disabled = false,
  readOnly,

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
  calendarProps,
  ...others
}: HvDatePickerProps) => {
  const labels = useLabels(DEFAULT_LABELS, labelsProp);

  const elementId = useUniqueId(id, "hvdatepicker");

  const [validationState, setValidationState] = useControlled(
    status,
    "standBy"
  );

  const [validationMessage] = useControlled(statusMessage, "Required");

  const locale = localeProp || "en-US";

  const [calendarOpen, setCalendarOpen] = useState(false);

  const [startDate, setStartDate, rollbackStartDate] = useSavedState(
    rangeMode ? startValue : value
  );
  const [endDate, setEndDate, rollbackEndDate] = useSavedState(endValue);

  const [visibleDate, dispatchAction] = useVisibleDate(startDate, endDate);

  const focusTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStartDate(rangeMode ? startValue : value, true);
    setEndDate(endValue, true);
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
        setEndDate(undefined);
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
      if (endDate) setStartDate(newDate > endDate ? endDate : newDate);
    } else if (position === "right") {
      if (!startDate) {
        if (endDate) setStartDate(newDate > endDate ? endDate : newDate);
        return;
      }
      setEndDate(newDate < startDate ? startDate : newDate);
    }
  };

  /**
   * Renders the container for the action elements.
   */
  const renderActions = () => (
    <ClassNames>
      {({ css }) => (
        <HvActionBar
          className={
            showClear
              ? clsx(
                  datePickerClasses.actionContainer,
                  classes?.actionContainer,
                  css(styles.actionContainer)
                )
              : ""
          }
        >
          {showClear && (
            <div
              className={clsx(
                datePickerClasses.leftContainer,
                classes?.leftContainer
              )}
            >
              <HvButton
                id={setId(id, "action", "clear")}
                className={clsx(
                  datePickerClasses.action,
                  classes?.action,
                  css(styles.action)
                )}
                variant="primaryGhost"
                onClick={handleClear}
              >
                {labels?.clearLabel}
              </HvButton>
            </div>
          )}
          <div
            className={clsx(
              datePickerClasses.rightContainer,
              classes?.rightContainer
            )}
          >
            <HvButton
              id={setId(id, "action", "apply")}
              className={clsx(
                datePickerClasses.action,
                classes?.action,
                css(styles.action)
              )}
              variant="primaryGhost"
              onClick={handleApply}
            >
              {labels?.applyLabel}
            </HvButton>
            <HvButton
              id={setId(id, "action", "cancel")}
              className={clsx(
                datePickerClasses.action,
                classes?.action,
                css(styles.action)
              )}
              variant="primaryGhost"
              onClick={handleCancel}
            >
              {labels?.cancelLabel}
            </HvButton>
          </div>
        </HvActionBar>
      )}
    </ClassNames>
  );

  const styledTypography = (dateString, variant, text) => {
    const StyledTypography = styled(HvTypography)({
      color: dateString
        ? theme.colors.secondary
        : theme.datePicker.dropdownPlaceholderColor,
    });

    return <StyledTypography variant={variant}>{text}</StyledTypography>;
  };

  const renderInput = (dateString) =>
    styledTypography(
      dateString,
      theme.datePicker.placeholderVariant,
      (dateString || placeholder) === undefined ? "" : dateString || placeholder
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
    ((status !== undefined && statusMessage !== undefined) ||
      (status === undefined && required));

  const isStateInvalid = isInvalid(validationState);

  let errorMessageId;
  if (isStateInvalid) {
    errorMessageId = canShowError
      ? setId(elementId, "error")
      : ariaErrorMessage;
  }

  return (
    <ClassNames>
      {({ css }) => (
        <HvFormElement
          id={id}
          name={name}
          value={dateValue}
          status={validationState}
          disabled={disabled}
          required={required}
          className={clsx(
            className,
            datePickerClasses.root,
            classes?.root,
            css(styles.root)
          )}
          readOnly={readOnly}
          {...others}
        >
          {(hasLabel || hasDescription) && (
            <div
              className={clsx(
                datePickerClasses.labelContainer,
                classes?.labelContainer,
                css(styles.labelContainer)
              )}
            >
              {hasLabel && (
                <HvLabel
                  id={setId(elementId, "label")}
                  label={label}
                  className={clsx(
                    datePickerClasses.label,
                    classes?.label,
                    css(styles.label)
                  )}
                />
              )}

              {hasDescription && (
                <HvInfoMessage
                  id={setId(elementId, "description")}
                  className={clsx(
                    datePickerClasses.description,
                    classes?.description,
                    css(styles.description)
                  )}
                >
                  {description}
                </HvInfoMessage>
              )}
            </div>
          )}
          <HvBaseDropdown
            role="combobox"
            classes={{
              root: clsx(
                datePickerClasses.dropdown,
                classes?.dropdown,
                css(styles.dropdown)
              ),
              panel: clsx(
                datePickerClasses.panel,
                classes?.panel,
                css(styles.panel)
              ),
              header: isStateInvalid
                ? clsx(
                    datePickerClasses.dropdownHeaderInvalid,
                    classes?.dropdownHeaderInvalid,
                    css(styles.dropdownHeaderInvalid)
                  )
                : undefined,
              headerOpen: clsx(
                datePickerClasses.dropdownHeaderOpen,
                classes?.dropdownHeaderOpen,
                css(styles.dropdownHeaderOpen)
              ),
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
            placeholder={renderInput(
              getDateLabel(dateValue, rangeMode, locale)
            )}
            adornment={
              <Calendar
                className={clsx(
                  datePickerClasses.icon,
                  classes?.icon,
                  css(styles.icon)
                )}
                color={disabled ? "secondary_80" : undefined}
              />
            }
            popperProps={{
              modifiers: [
                { name: "preventOverflow", enabled: escapeWithReference },
              ],
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
              {...calendarProps}
            />
            {(rangeMode || showActions) && renderActions()}
          </HvBaseDropdown>
          {canShowError && (
            <HvWarningText
              id={setId(elementId, "error")}
              disableBorder
              className={clsx(datePickerClasses.error, classes?.error)}
            >
              {validationMessage}
            </HvWarningText>
          )}
        </HvFormElement>
      )}
    </ClassNames>
  );
};
