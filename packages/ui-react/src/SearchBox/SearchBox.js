/**
 * Copyright (c) 2019 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import React from "react";
import PropTypes from "prop-types";

import SearchIcon from "@hv-ui/icons/core/S-icons/Search16";
import CloseIcon from "@hv-ui/icons/core/S-icons/Close16";

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
    const { onChange } = this.props;
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

    const hasInputValue = value && value != "";

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
  onChange: PropTypes.func
};

HvSearchBox.defaultProps = {
  value: "",
  placeholder: "Search",
  onChange: () => {}
};

export default HvSearchBox;
