/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import classNames from "classnames";
import { isKeypress, KeyboardCodes } from "@hv/uikit-common-utils/dist";
import HvTypography from "../../../Typography";

const format = date => date.format("D MMM, YYYY");

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
      localeFormat: moment().creationData().locale._longDateFormat.L
    };
  }

  static getDerivedStateFromProps(props, state) {
    const value = props.inputDate ? moment(props.inputDate, "L").utc() : null;

    if (!value.isSame(state.prevValue, "date")) {
      return {
        prevValue: value,
        showValue: value ? format(value) : null,
        value,
        weekDay: value && value.isValid() ? value.format("ddd") : null
      };
    }
    return null;
  }

  /**
   * Choose the value that should be displayed in the input.
   *
   * @param shouldCloseCalendar
   * @param isInvalid
   * @param value
   * @param formatShowValue
   * @param showValue
   * @returns {*}
   */
  chooseShowValue = (
    shouldCloseCalendar,
    isInvalid,
    value,
    formatShowValue,
    showValue
  ) => {
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

      if (!prevValue.isSame(value, "date") || shouldCloseCalendar) {
        this.setState({
          isInvalid: false,
          showValue: newShowValue,
          value: momentDate,
          prevValue: momentDate,
          weekDay: momentDate.format("ddd")
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
        showValue: value.format("L")
      });
  };

  /**
   * At Enter key validate the data.
   *
   * @param event
   */
  onKeyDownHandler = event => {
    if (isKeypress(event, KeyboardCodes.Enter)) {
      this.checkInputData(true);
    }
  };

  /**
   * Set the states in each interaction of the input.
   *
   * @param event
   */
  onChangeHandler = event => {
    const newValue = event.target.value;
    this.setState({
      value: newValue,
      showValue: newValue
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
          id={`${id}-header`}
          className={classNames(classes.background, {
            [classes.invalid]: isInvalid
          })}
        >
          <div className={classes.headerDayOfWeek}>
            <HvTypography variant="normalText">{weekDay}</HvTypography>
          </div>
          <div className={classes.headerDate}>
            <input
              id={`${id}-header-input`}
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
  id: PropTypes.string.isRequired,
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
  inputDate: null,
  topText: null
};

export default Header;
