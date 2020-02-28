/*  TODO: Review accessibility */

/*  eslint-disable  jsx-a11y/click-events-have-key-events */
/*  eslint-disable jsx-a11y/no-static-element-interactions */

import React from "react";
import PropTypes from "prop-types";

import SearchIcon from "@hv/uikit-react-icons/dist/Generic/Search";
import CloseIcon from "@hv/uikit-react-icons/dist/Generic/Close";

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
    const { placeholder, classes, searchInput } = this.props;
    const { value } = this.state;
    const inputValue = searchInput !== undefined ? searchInput : value;

    const hasInputValue = inputValue && inputValue !== "";

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
          value={inputValue}
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
  onValidate: PropTypes.func,
  /**
   * The initial value to be used by the input
   */
  searchInput: PropTypes.string
};

HvSearchBox.defaultProps = {
  value: "",
  placeholder: "Search",
  searchInput: undefined,
  onChange: () => {},
  onValidate: undefined
};

export default HvSearchBox;
