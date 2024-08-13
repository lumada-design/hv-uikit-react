import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import localizedFormat from "dayjs/plugin/localizedFormat";
import {
  useDefaultProps,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";

import {
  HvFormElementContext,
  HvFormElementDescriptorsContext,
  HvFormElementValueContext,
} from "../../Forms";
import { HvInput, HvInputProps } from "../../Input";
import { HvTypography } from "../../Typography";
import { isKey } from "../../utils/keyboardUtils";
import { setId } from "../../utils/setId";
import { DateRangeProp } from "../types";
import { formatToLocale, isDate, isRange, isSameDay } from "../utils";
import { staticClasses, useClasses } from "./CalendarHeader.styles";

export { staticClasses as calendarHeaderClasses };

export type HvCalendarHeaderClasses = ExtractNames<typeof useClasses>;

dayjs.extend(localeData);
dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);

export const HvCalendarHeader = (props: HvCalendarHeaderProps) => {
  const {
    id,
    value,
    locale = "en-US",
    classes: classesProp,
    onChange,
    showEndDate,
    showDayOfWeek = false,
    onFocus,
    invalidDateLabel = "Invalid Date",
  } = useDefaultProps("HvCalendarHeader", props);

  const { classes, cx } = useClasses(classesProp);

  const { elementId } = useContext(HvFormElementContext);
  const elementValue = useContext(HvFormElementValueContext);
  const { label } = useContext(HvFormElementDescriptorsContext);

  let localValue: string | Date | DateRangeProp | undefined =
    value ?? elementValue ?? "";
  if (isRange(localValue)) {
    localValue = showEndDate ? localValue.endDate : localValue.startDate;
  }

  const [dateValue, setDateValue] = useState<
    string | Date | DateRangeProp | undefined
  >(localValue);
  const [editedValue, setEditedValue] = useState<string | null>(null);
  const [displayValue, setDisplayValue] = useState("");
  const [weekdayDisplay, setWeekdayDisplay] = useState("");

  const localId = id ?? setId(elementId, "calendarHeader");

  const inputValue = editedValue ?? displayValue;
  const localeFormat = dayjs().locale(locale).localeData().longDateFormat("L");

  const [isValidValue, setIsValidValue] = useState(
    inputValue.length === 0 || (!!inputValue && dayjs(localValue).isValid()),
  );

  const validateInput = (incomingValid: any) =>
    incomingValid === undefined || dayjs(incomingValid).isValid();

  useEffect(() => {
    const valid = validateInput(localValue);
    setIsValidValue(valid);
    if (valid) {
      if (!localValue) {
        setDisplayValue("");
        setEditedValue(null);
        setWeekdayDisplay("");
        return;
      }
      const weekday = new Intl.DateTimeFormat(locale, {
        weekday: "short",
      }).format(isDate(localValue) ? localValue : 0);
      setDisplayValue(formatToLocale(localValue, locale));
      setEditedValue(null);
      setWeekdayDisplay(weekday);
    }
  }, [localValue, locale]);

  const handleNewDate = (event: any, date: string) => {
    // attempt to format in locale data, or fallback to default
    const localeParsedDate = dayjs(date, localeFormat);

    const isValidInput = localeParsedDate.isValid();
    const dateParsed = isValidInput
      ? localeParsedDate.toDate()
      : dayjs(date).toDate();
    // prevent extra updates
    if (!isSameDay(dateParsed, dateValue)) {
      setDateValue(dateParsed);
      onChange?.(event, dateParsed);
    }

    setIsValidValue(isValidInput);
    if (isValidInput) {
      setEditedValue(null);
    }
  };

  const onBlurHandler: HvInputProps["onBlur"] = (event) => {
    if (editedValue == null) return;
    if (editedValue === "") {
      setIsValidValue(true);
      setEditedValue(null);
      return;
    }
    handleNewDate(event, editedValue);
  };

  const keyDownHandler: HvInputProps["onKeyDown"] = (event) => {
    if (!isKey(event, "Enter") || editedValue == null || editedValue === "")
      return;
    event.preventDefault();

    handleNewDate(event, editedValue);
  };

  const onFocusHandler: HvInputProps["onFocus"] = (event) => {
    if (!localValue) return;
    const formattedDate =
      isValidValue && isDate(localValue)
        ? dayjs(localValue).locale(locale).format("L")
        : editedValue;
    setEditedValue(formattedDate);
    onFocus?.(event, formattedDate);
  };

  const onChangeHandler: HvInputProps["onChange"] = (event, val) => {
    setEditedValue(val);
  };

  const isInvalid = !isValidValue && inputValue !== "";

  // This component needs to be further refactored
  // It's not possible to clear the date
  // In a new major there's no need for all these classes
  return (
    <div
      id={localId}
      className={cx(classes.root, {
        [classes.invalid]: isInvalid,
      })}
    >
      {showDayOfWeek && (
        <HvTypography className={classes.headerDayOfWeek}>
          {weekdayDisplay || "\u00A0"}
        </HvTypography>
      )}
      <HvInput
        type="text"
        id={setId(localId, "header-input")}
        className={classes.headerDate}
        classes={{
          input: classes.input,
          inputBorderContainer: classes.inputBorderContainer,
          error: classes.invalidMessageStyling,
        }}
        placeholder={localeFormat}
        value={inputValue}
        aria-labelledby={label?.[0]?.id}
        onBlur={onBlurHandler}
        onFocus={onFocusHandler}
        onChange={onChangeHandler}
        onKeyDown={keyDownHandler}
        status={isInvalid ? "invalid" : "valid"}
        statusMessage={invalidDateLabel}
      />
    </div>
  );
};

// TODO: refactor this out
HvCalendarHeader.formElementType = "HvCalendarHeader";

export interface HvCalendarHeaderProps {
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes?: HvCalendarHeaderClasses;
  /**
   * Identifier.
   */
  id?: string;
  /**
   * The text to be shown on the main part of the header.
   */
  value?: string | Date | DateRangeProp;
  /**
   * Locale to be used by the calendar.
   */
  locale?: string;
  /**
   * Callback to define the input date.
   */
  onChange?: (
    event:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | undefined,
    value: Date | DateRangeProp,
  ) => void;
  /**
   * Callback to handle input onFocus.
   */
  onFocus?: (
    event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>,
    formattedDate: string | null,
  ) => void;
  /**
   * Indicates if header should display end date in a date range.
   */
  showEndDate?: boolean;
  /**
   * Indicates if header should display the day of week.
   */
  showDayOfWeek?: boolean;
  /**
   * Label shown when date is invalid.
   */
  invalidDateLabel?: string;
}
