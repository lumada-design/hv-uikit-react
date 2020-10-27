import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import localizedFormat from "dayjs/plugin/localizedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import clsx from "clsx";
import isNil from "lodash/isNil";
import { withStyles } from "@material-ui/core";
import { setId, isKeypress, KeyboardCodes } from "../../utils";
import HvTypography from "../../Typography";
import styles from "./styles";
import {
  HvFormElementContext,
  HvFormElementValueContext,
  HvFormElementDescriptorsContext,
} from "../../Forms/FormElement";
import { isRange, isSameDay, formatDMY } from "../utils";

dayjs.extend(localeData);
dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);

const { Enter } = KeyboardCodes;

const HvCalendarHeader = ({
  id,
  value,
  locale: localeProp,
  classes,
  onChange,
  showEndDate,
  onFocus,
  ...others
}) => {
  const { elementId, elementLocale } = useContext(HvFormElementContext);
  const elementValue = useContext(HvFormElementValueContext);
  const { label } = useContext(HvFormElementDescriptorsContext);

  let localValue = value ?? elementValue ?? "";
  if (isRange(localValue)) {
    localValue = showEndDate ? localValue.endDate : localValue.startDate;
  }

  const [dateValue, setDateValue] = useState(localValue);
  const [editedValue, setEditedValue] = useState(null);
  const [displayValue, setDisplayValue] = useState("");
  const [weekdayDisplay, setWeekdayDisplay] = useState("");

  const localId = id ?? setId(elementId, "calendarHeader");
  const locale = localeProp ?? elementLocale ?? "en";

  const inputValue = editedValue ?? displayValue;
  const localeFormat = dayjs().locale(locale).localeData().longDateFormat("L");
  const isValidValue = !!inputValue && dayjs(localValue).isValid();

  useEffect(() => {
    setDateValue(localValue);
    if (isValidValue) {
      const weekday = new Intl.DateTimeFormat(locale, { weekday: "short" }).format(localValue);
      setDisplayValue(formatDMY(localValue, locale));
      setWeekdayDisplay(weekday);
    } else {
      setDisplayValue(localValue);
      setWeekdayDisplay("");
    }
  }, [localValue, isValidValue, locale]);

  const handleNewDate = (event, date) => {
    // attempt to format in locale data, or fallback to default
    const localeParsedDate = dayjs(date, localeFormat);
    const dateParsed = localeParsedDate.isValid()
      ? localeParsedDate.toDate()
      : dayjs(date).toDate();

    // prevent extra updates
    if (!isSameDay(dateParsed, dateValue)) {
      setDateValue(dateParsed);
      onChange?.(event, dateParsed);
    }
    setEditedValue(null);
  };

  const onBlurHandler = (event) => {
    if (isNil(editedValue)) return;
    if (editedValue === "") {
      setEditedValue(null);
      return;
    }

    handleNewDate(event, editedValue);
  };

  const keyDownHandler = (event) => {
    if (!isKeypress(event, Enter) || isNil(editedValue) || editedValue === "") return;
    event.preventDefault();

    handleNewDate(event, editedValue);
  };

  const onFocusHandler = (event) => {
    const formattedDate = isValidValue ? dayjs(localValue).locale(locale).format("L") : localValue;
    setEditedValue(formattedDate);
    onFocus?.(event, formattedDate);
  };

  const onChangeHandler = (event) => {
    setEditedValue(event.target.value);
  };

  return (
    <div
      id={localId}
      className={clsx(classes.root, {
        [classes.invalid]: !isValidValue,
      })}
    >
      <HvTypography variant="normalText" className={classes.headerDayOfWeek}>
        {weekdayDisplay || "\u00A0"}
      </HvTypography>
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
  );
};

// TODO: refactor this out
HvCalendarHeader.formElementType = "HvCalendarHeader";

HvCalendarHeader.propTypes = {
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * Identifier.
   */
  id: PropTypes.string,
  /**
   * The text to be shown on the main part of the header.
   */
  value: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
    PropTypes.shape({ startDate: PropTypes.instanceOf(Date), endDate: PropTypes.instanceOf(Date) }),
  ]),
  /**
   * Locale to be used by the calendar.
   */
  locale: PropTypes.string,
  /**
   * Callback to define the input date.
   */
  onChange: PropTypes.func,
  /**
   * Callback to handle input onFocus.
   */
  onFocus: PropTypes.func,
  /**
   * Indicates if header should display end date in a date range.
   */
  showEndDate: PropTypes.bool,
};

export default withStyles(styles, { name: "HvCalendarHeader" })(HvCalendarHeader);
