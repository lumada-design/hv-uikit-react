import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import clsx from "clsx";
import isNil from "lodash/isNil";
import { withStyles } from "@material-ui/core";
import { setId, isKeypress, KeyboardCodes } from "../../utils";
import HvTypography from "../../Typography";
import styles from "./styles";
import { HvFormElementContext } from "../../Forms/FormElement";
import { isRange } from "../utils";

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
  const { elementId, elementValue, elementLocale, descriptors = {} } = useContext(
    HvFormElementContext
  );
  const { HvLabel } = descriptors;

  const [editedValue, setEditedValue] = useState(null);
  const [displayValue, setDisplayValue] = useState("");
  const [weekDayDisplay, setWeekDayDisplay] = useState("");

  const localId = id ?? setId(elementId, "calendarHeader");
  const localLocale = locale ?? elementLocale;

  // TODO: This component should not be setting the global moment locale because it affects all instances of components
  // that are using the moment library
  moment.locale(localLocale);

  const preLocalValue = value ?? elementValue;
  let localValue = preLocalValue;

  if (isRange(preLocalValue)) {
    localValue = showEndDate ? preLocalValue.endDate : preLocalValue.startDate;
  }

  const localeFormat = moment.localeData().longDateFormat("L");
  const isValidValue = moment.utc(localValue, "L").isValid();

  useEffect(() => {
    if (isValidValue) {
      setDisplayValue(moment.utc(localValue, "L").format("D MMM YYYY"));
      setWeekDayDisplay(moment.utc(localValue, "L").format("ddd"));
    } else {
      setDisplayValue(localValue);
      setWeekDayDisplay("");
    }
  }, [localValue, isValidValue, localLocale]);

  const onBlurHandler = (event, onChangeFunc) => {
    if (isNil(editedValue)) return;
    if (editedValue === "") {
      setEditedValue(null);
      return;
    }
    const dateParsed = moment.utc(editedValue, "L");
    onChangeFunc?.(event, dateParsed.toDate());
    setEditedValue(null);
  };

  const keyDownHandler = (event, onChangeFunc) => {
    if (isKeypress(event, KeyboardCodes.Enter)) {
      if (isNil(editedValue) || editedValue === "") return;
      event.preventDefault();
      const dateParsed = moment.utc(editedValue, "L");
      onChangeFunc?.(event, dateParsed.toDate());
      setEditedValue(null);
    }
  };

  const onFocusHandler = event => {
    const formattedDate = isValidValue ? moment.utc(localValue).format("L") : localValue;
    setEditedValue(formattedDate);
    onFocus?.(event, formattedDate);
  };

  const onChangeHandler = event => {
    setEditedValue(event.target.value);
  };

  return (
    <div
      id={localId}
      className={clsx(classes.root, {
        [classes.invalid]: !isValidValue
      })}
    >
      {weekDayDisplay && (
        <div className={classes.headerDayOfWeek}>
          <HvTypography variant="normalText">{weekDayDisplay}</HvTypography>
        </div>
      )}
      <div className={classes.headerDate}>
        <input
          id={setId(localId, "header-input")}
          placeholder={localeFormat}
          value={editedValue ?? displayValue}
          className={classes.input}
          onBlur={event => onBlurHandler(event, onChange)}
          onFocus={onFocusHandler}
          onChange={onChangeHandler}
          onKeyDown={event => keyDownHandler(event, onChange)}
          aria-labelledby={HvLabel?.[0]?.id}
          {...others}
        />
      </div>
    </div>
  );
};

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
    PropTypes.shape({ startDate: PropTypes.instanceOf(Date), endDate: PropTypes.instanceOf(Date) })
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
  showEndDate: PropTypes.bool
};

export default withStyles(styles, { name: "HvCalendarHeader" })(HvCalendarHeader);
