import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Info } from "@hitachivantara/uikit-react-icons";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import localizedFormat from "dayjs/plugin/localizedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import clsx from "clsx";
import isNil from "lodash/isNil";
import { withStyles } from "@mui/styles";
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
  locale,
  classes,
  onChange,
  showEndDate,
  onFocus,
  ...others
}) => {
  const { elementId } = useContext(HvFormElementContext);
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
      const weekday = new Intl.DateTimeFormat(locale, { weekday: "short" }).format(localValue);
      setDisplayValue(formatDMY(localValue, locale));
      setEditedValue(null);
      setWeekdayDisplay(weekday);
    }
  }, [localValue, locale]);

  const handleNewDate = (event, date) => {
    // attempt to format in locale data, or fallback to default
    const localeParsedDate = dayjs(date, localeFormat);

    const isValidInput = localeParsedDate.isValid();
    const dateParsed = isValidInput ? localeParsedDate.toDate() : dayjs(date).toDate();
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
    if (!isKeypress(event, Enter) || isNil(editedValue) || editedValue === "") return;
    event.preventDefault();

    handleNewDate(event, editedValue);
  };

  const onFocusHandler = (event) => {
    if (!localValue) return;
    const formattedDate = isValidValue ? dayjs(localValue).locale(locale).format("L") : editedValue;
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
        className={clsx(classes.root, {
          [classes.invalid]: !isValidValue && inputValue !== "",
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
      {!isValidValue && inputValue !== "" && (
        <div role="presentation" className={classes.inputBorderContainer} />
      )}
      <div style={{ height: 32 }}>
        {!isValidValue && inputValue !== "" && (
          <HvTypography
            component="span"
            variant="normalText"
            className={classes.invalidMessageStyling}
          >
            <Info color="acce3" iconSize="S" />
            Invalid date
          </HvTypography>
        )}
      </div>
    </>
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
  locale: PropTypes.string.isRequired,
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
