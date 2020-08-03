import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import { setId, isKeypress, KeyboardCodes } from "../../utils";
import HvTypography from "../../Typography";
import styles from "./styles";

const Header = ({ id, inputDate, locale, classes, topText, onSelection }) => {
  moment.locale(locale);

  const format = date => {
    return date.format("D MMM YYYY");
  };

  const [inputValue, setInputValue] = useState();
  const [isInvalid, setIsInvalid] = useState(false);
  const [previousInputValue, setPreviousInputValue] = useState();
  const [inputShowValue, setInputShowValue] = useState("");
  const [weekDayDisplay, setWeekDayDisplay] = useState();

  // eslint-disable-next-line no-underscore-dangle
  const localeFormat = moment().creationData().locale._longDateFormat.L;

  useEffect(() => {
    const value = inputDate ? moment(inputDate, "L").utc() : null;
    const dayLabelValue = value && value.isValid() ? value.format("ddd") : null;
    const inputShowInput = format(value);
    setInputValue(value);
    setPreviousInputValue(value);
    setInputShowValue(inputShowInput);
    setWeekDayDisplay(dayLabelValue);
  }, [inputDate]);

  const chooseShowValue = (shouldCloseCalendar, formatShowValue) => {
    let newShowValue;
    if (shouldCloseCalendar) {
      if (!isInvalid) newShowValue = inputShowValue;
      else newShowValue = inputValue;
    } else {
      newShowValue = formatShowValue;
    }
    return newShowValue;
  };

  /**
   * Validate if the input data is a valid date.
   */
  const checkInputData = (shouldCloseCalendar = false) => {
    const momentDate = moment.utc(inputValue, "L");
    if (!momentDate.isValid()) {
      setIsInvalid(true);
    } else {
      const formatShowValue = format(momentDate);
      const newShowValue = chooseShowValue(shouldCloseCalendar, formatShowValue);
      if (!previousInputValue.isSame(momentDate, "date") || shouldCloseCalendar) {
        setIsInvalid(false);
        setInputShowValue(newShowValue);
        setInputValue(momentDate);
        setPreviousInputValue(momentDate);
        setWeekDayDisplay(momentDate.format("ddd"));
        onSelection(momentDate.toDate(), shouldCloseCalendar);
      } else {
        setInputShowValue(newShowValue);
      }
    }
  };

  /**
   * If the value is a valid date, the input must show the date formatted according the locale.
   */
  const onFocusHandler = () => {
    if (inputValue) setInputShowValue(inputValue.format("L"));
  };

  /**
   * At Enter key validate the data.
   *
   * @param event
   */
  const onKeyDownHandler = event => {
    if (isKeypress(event, KeyboardCodes.Enter)) {
      checkInputData(true);
    }
  };

  /**
   * Set the states in each interaction of the input.
   *
   * @param event
   */
  const onChangeHandler = event => {
    const newValue = event.target.value;

    const momentDate = moment.utc(newValue, "L");
    if (momentDate.isValid()) {
      setInputValue(momentDate);
    }
    setInputShowValue(newValue);
  };

  return (
    <>
      {topText && (
        <HvTypography variant="labelText" className={classes.rangeLabel}>
          {topText}
        </HvTypography>
      )}
      <div
        id={setId(id, "header")}
        className={clsx(classes.background, {
          [classes.invalid]: isInvalid,
          [classes.invalid]: false
        })}
      >
        <div className={classes.headerDayOfWeek}>
          <HvTypography variant="normalText">{weekDayDisplay}</HvTypography>
        </div>
        <div className={classes.headerDate}>
          <input
            id={setId(id, "header-input")}
            placeholder={localeFormat}
            value={inputShowValue}
            className={classes.input}
            onKeyDown={onKeyDownHandler}
            onChange={onChangeHandler}
            onBlur={checkInputData}
            onFocus={onFocusHandler}
          />
        </div>
      </div>
    </>
  );
};

Header.propTypes = {
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
  inputDate: PropTypes.instanceOf(Date),
  /**
   * The text to be shown above the header.
   */
  topText: PropTypes.string,
  /**
   * Locale to be used by the calendar.
   */
  locale: PropTypes.string.isRequired,
  /**
   * Callback to define the input date.
   */
  onSelection: PropTypes.func.isRequired
};

Header.defaultProps = {
  id: undefined,
  inputDate: null,
  topText: null
};

export default withStyles(styles, { name: "HvDatePickerHeader" })(Header);
