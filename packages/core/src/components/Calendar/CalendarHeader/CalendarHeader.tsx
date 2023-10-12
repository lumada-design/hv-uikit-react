import { useState, useEffect, useContext } from "react";

import { Info } from "@hitachivantara/uikit-react-icons";

import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import localizedFormat from "dayjs/plugin/localizedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";

import isNil from "lodash/isNil";

import {
  HvFormElementContext,
  HvFormElementValueContext,
  HvFormElementDescriptorsContext,
} from "@core/components/Forms";
import { isKey } from "@core/utils/keyboardUtils";
import { setId } from "@core/utils/setId";

import { HvTypography } from "@core/components/Typography";
import { ExtractNames } from "@core/utils/classes";
import { useDefaultProps } from "@core/hooks";
import { isRange, isSameDay, formatToLocale, isDate } from "../utils";
import { DateRangeProp } from "../types";
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
    ...others
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
    inputValue.length === 0 || (!!inputValue && dayjs(localValue).isValid())
  );

  const validateInput = (incomingValid) =>
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

  const handleNewDate = (event, date) => {
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

  const onBlurHandler = (event) => {
    if (isNil(editedValue)) return;
    if (editedValue === "") {
      setIsValidValue(true);
      setEditedValue(null);
      return;
    }
    handleNewDate(event, editedValue);
  };

  const keyDownHandler = (event) => {
    if (!isKey(event, "Enter") || isNil(editedValue) || editedValue === "")
      return;
    event.preventDefault();

    handleNewDate(event, editedValue);
  };

  const onFocusHandler = (event) => {
    if (!localValue) return;
    const formattedDate =
      isValidValue && isDate(localValue)
        ? dayjs(localValue).locale(locale).format("L")
        : editedValue;
    setEditedValue(formattedDate);
    onFocus?.(event, formattedDate);
  };

  const onChangeHandler = (event) => {
    setEditedValue(event.target.value);
  };
  return (
    <>
      <div
        id={localId}
        className={cx(classes.root, {
          [classes.invalid]: !isValidValue && inputValue !== "",
        })}
      >
        {showDayOfWeek && (
          <HvTypography className={classes.headerDayOfWeek}>
            {weekdayDisplay || "\u00A0"}
          </HvTypography>
        )}

        <div className={classes.headerDate}>
          <input
            type="text"
            id={setId(localId, "header-input")}
            placeholder={localeFormat}
            value={inputValue}
            className={classes.input}
            onBlur={onBlurHandler}
            onFocus={onFocusHandler}
            onChange={onChangeHandler}
            onKeyDown={keyDownHandler}
            aria-labelledby={label?.[0]?.id}
            {...others}
          />
        </div>
      </div>
      {!isValidValue && inputValue !== "" && (
        <div role="presentation" className={classes.inputBorderContainer} />
      )}
      <div style={{ height: 32 }}>
        {!isValidValue && inputValue !== "" && (
          <HvTypography
            component="span"
            variant="body"
            className={classes?.invalidMessageStyling}
          >
            <Info color="brand" iconSize="S" />
            {invalidDateLabel}
          </HvTypography>
        )}
      </div>
    </>
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
    value: Date | DateRangeProp
  ) => void;
  /**
   * Callback to handle input onFocus.
   */
  onFocus?: (
    event: React.FocusEventHandler<any>,
    formattedDate: string | null
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
