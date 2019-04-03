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

import SearchIcon from "@hv/uikit-react-icons/dist/Search.S";
import CloseIcon from "@hv/uikit-react-icons/dist/Close.S";

class HvSearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value
    };
  }

  /**
   * Updates the state and fires callback
   */
  changeInputValue = value => {
    const { onChange, onValidate } = this.props;
    if (onValidate && !onValidate(value)) return;
    this.setState({ value });
    onChange(value);
  };

  /**
   * Handles the change of the input
   *
   * @param {Object} event - The event that triggered the action
   */
  handleInputChange = event => {
    const currentValue = event.target.value;
    this.changeInputValue(currentValue);
  };

  /**
   * Handles the clear of the input
   */
  handleInputClear = () => {
    this.changeInputValue("");
  };

  render() {
    const { placeholder, classes } = this.props;
    const { value } = this.state;

    const hasInputValue = value && value !== "";

    const iconRenderer = hasInputValue ? (
      <span onClick={this.handleInputClear}>
        <CloseIcon className={classes.iconClear} />
      </span>
    ) : (
      <SearchIcon className={classes.icon} />
    );

    return (
      <div
        className={
          hasInputValue ? classes.rootWithInput : classes.rootWithoutInput
        }
      >
        <input
          className={classes.input}
          value={value}
          placeholder={placeholder}
          type="text"
          onChange={this.handleInputChange}
        />
        {iconRenderer}
      </div>
    );
  }
}

HvSearchBox.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied to the search box.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * The initial value of the input
   */
  value: PropTypes.string,
  /**
   * The placeholder value of the input
   */
  placeholder: PropTypes.string,
  /**
   * The function that will be executed when the input changes,
   * it receives the input value
   */
  onChange: PropTypes.func,
  /**
   * The function that use to validate input,
   */
  onValidate: PropTypes.func
};

HvSearchBox.defaultProps = {
  value: "",
  placeholder: "Search",
  onChange: () => {},
  onValidate: undefined
};

export default HvSearchBox;
