import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import { setId, isKeypress, KeyboardCodes } from "../../../utils";
import HvTypography from "../../../Typography";
import styles from "./styles";

const format = (date) => date.format("D MMM YYYY");

class Header extends React.Component {
  constructor(props) {
    super(props);
    const { inputDate, locale } = this.props;
    moment.locale(locale);
    const value = inputDate ? moment(inputDate, "L").utc() : null;
    this.state = {
      prevValue: value,
      showValue: value ? format(value) : null,
      value,
      weekDay: value && value.isValid() ? value.format("ddd") : null,
      isInvalid: false,
      // eslint-disable-next-line no-underscore-dangle
      localeFormat: moment().creationData().locale._longDateFormat.L,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const value = props.inputDate ? moment(props.inputDate, "L").utc() : null;

    if (!value.isSame(state.prevValue, "date")) {
      return {
        prevValue: value,
        showValue: value ? format(value) : null,
        value,
        weekDay: value && value.isValid() ? value.format("ddd") : null,
      };
    }
    return null;
  }

  chooseShowValue = (shouldCloseCalendar, isInvalid, value, formatShowValue, showValue) => {
    let newShowValue;
    if (shouldCloseCalendar) {
      if (!isInvalid) newShowValue = showValue;
      else newShowValue = value;
    } else {
      newShowValue = formatShowValue;
    }
    return newShowValue;
  };

  /**
   * Validate if the input data is a valid date.
   */
  checkInputData = (shouldCloseCalendar = false) => {
    const { prevValue, value, showValue, isInvalid } = this.state;
    const { onSelection } = this.props;
    const momentDate = moment.utc(value, "L");

    if (!momentDate.isValid()) {
      this.setState({ isInvalid: true });
    } else {
      const formatShowValue = format(momentDate);

      const newShowValue = this.chooseShowValue(
        shouldCloseCalendar,
        isInvalid,
        value,
        formatShowValue,
        showValue
      );

      if (!prevValue.isSame(momentDate, "date") || shouldCloseCalendar) {
        this.setState({
          isInvalid: false,
          showValue: newShowValue,
          value: momentDate,
          prevValue: momentDate,
          weekDay: momentDate.format("ddd"),
        });
        onSelection(momentDate.toDate(), shouldCloseCalendar);
      } else {
        this.setState({ showValue: newShowValue });
      }
    }
  };

  /**
   * Onblur it confirms the data.
   */
  onBlurHandler = () => {
    this.checkInputData();
  };

  /**
   * If the value is a valid date, the input must show the date formatted according the locale.
   */
  onFocusHandler = () => {
    const { value } = this.state;
    if (value)
      this.setState({
        showValue: value.format("L"),
      });
  };

  /**
   * At Enter key validate the data.
   *
   * @param event
   */
  onKeyDownHandler = (event) => {
    if (isKeypress(event, KeyboardCodes.Enter)) {
      this.checkInputData(true);
    }
  };

  /**
   * Set the states in each interaction of the input.
   *
   * @param event
   */
  onChangeHandler = (event) => {
    const newValue = event.target.value;
    this.setState({
      value: newValue,
      showValue: newValue,
    });
  };

  render() {
    const { classes, topText, id } = this.props;
    const { showValue, isInvalid, weekDay, localeFormat } = this.state;

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
          })}
        >
          <div className={classes.headerDayOfWeek}>
            <HvTypography variant="normalText">{weekDay}</HvTypography>
          </div>
          <div className={classes.headerDate}>
            <input
              id={setId(id, "header-input")}
              placeholder={localeFormat}
              value={showValue}
              className={classes.input}
              onKeyDown={this.onKeyDownHandler}
              onChange={this.onChangeHandler}
              onBlur={this.onBlurHandler}
              onFocus={this.onFocusHandler}
            />
          </div>
        </div>
      </>
    );
  }
}

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
  onSelection: PropTypes.func.isRequired,
};

Header.defaultProps = {
  id: undefined,
  inputDate: null,
  topText: null,
};

export default withStyles(styles, { name: "HvDatePickerHeader" })(Header);
