/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import React from "react";
import PropTypes from "prop-types";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import iconPositions from "./iconPositions";
import validationStates from "./validationStates";
import validationTypes from "./validationTypes";

const valueSize = Object.freeze({
  valid: "valid",
  big: "big",
  small: "small"
});

class HvInput extends React.Component {
  constructor(props) {
    super(props);
    const { validationState, value, inputTextConfiguration } = props;
    if (validationState === validationStates.valid) {
      this.state = {
        validationState,
        value,
        infoText: inputTextConfiguration.infoText
      };
    } else if (validationState === validationStates.invalid) {
      this.state = {
        validationState,
        value,
        infoText: inputTextConfiguration.warningText
      };
    } else {
      this.state = {
        validationState,
        value,
        infoText: inputTextConfiguration.infoText
      };
    }
  }

  /**
   * Chooses the correct icon to used depending on several situations like:
   *
   * - Is disabled.
   * - No validation.
   * - Is filled.
   * - Is empty.
   * - Is valid.
   *
   * @param {Object} classes - The Jss object containing the class names to be used.
   * @param {Bool} disabled - A flag used to determine if the input is disabled.
   * @param {String} iconPosition - Where the icon should be placed, accepted values are ´left´ and ´right´.
   * @param {String} validationState - What is the current validation state of the input, accepted values are ´filled´, ´empty´, ´valid´, ´invalid´.
   * @param {String} validationType - What kind of default validation is the input performing, accepted values are ´none´, ´number´, ´´email.
   * @param {Number} maxCharQuantity - What is the maximum quantity of characters accepted.
   * @param {Number} minCharQuantity - What is the minimum quantity of characters accepted.
   * @param {Function} validation - The Custom validation function provided by the user.
   * @returns
   */
  prepareIcon = (
    classes,
    disabled,
    iconPosition,
    validationState,
    validationType,
    maxCharQuantity,
    minCharQuantity,
    validation
  ) => {
    const adornment = {
      endAdornment: null,
      startAdornment: null
    };

    if (disabled) {
      return adornment;
    }

    if (
      validationState !== validationStates.filled &&
      (validationState === validationStates.empty ||
        (validationType === validationTypes.none &&
          maxCharQuantity === null &&
          minCharQuantity === null &&
          !validation))
    ) {
      return adornment;
    }

    let icon = (
      <div className={classes.iconContainer}>
        <div className={classNames(classes.icon, classes.iconClear)} />
      </div>
    );

    switch (validationState) {
      default:
        return adornment;
      case validationStates.filled:
        icon = (
          <div
            className={classes.iconContainer}
            onMouseDown={this.handleClear}
            role="button"
            tabIndex={0}
            onKeyDown={this.handleClear}
          >
            <div className={classNames(classes.icon, classes.iconClear)} />
          </div>
        );
        break;
      case validationStates.valid:
        icon = (
          <div className={classes.iconContainer}>
            <div className={classNames(classes.icon, classes.iconValid)} />
          </div>
        );
        break;
      case validationStates.invalid:
        icon = (
          <div className={classes.iconContainer}>
            <div className={classNames(classes.icon, classes.iconInvalid)} />
          </div>
        );
        break;
    }

    switch (iconPosition) {
      default:
      case iconPositions.right:
        adornment.endAdornment = icon;
        break;
      case iconPositions.left:
        adornment.startAdornment = icon;
        break;
    }

    return adornment;
  };

  /**
   *  Performs the validation of the inputted value the avaible validations are:
   *
   * -none
   * -number
   * -email
   * -custom
   *
   * @param {String} value - the inputted value.
   * @returns {Boolean} - true if valid false if not.
   */
  validateInput = value => {
    const { validation, validationType } = this.props;
    if (validation) {
      return validation(value);
    }
    switch (validationType) {
      default:
      case validationTypes.none:
        return true;
      case validationTypes.number:
        return this.isNumeric(value);
      case validationTypes.email:
        return this.isEmail(value);
    }
  };

  /**
   * Validates if the value is within the accepted length range.
   *
   * @param {String} value - the inputted value.
   * @returns {Boolean} - true if valid false if not.
   */
  validateCharLength = value => {
    const { maxCharQuantity, minCharQuantity } = this.props;
    if (maxCharQuantity === null && minCharQuantity === null) {
      return valueSize.valid;
    }
    if (minCharQuantity !== null && value.length < minCharQuantity) {
      return valueSize.small;
    }
    if (maxCharQuantity !== null && value.length > maxCharQuantity) {
      return valueSize.big;
    }
    return valueSize.valid;
  };

  /**
   * Updates the states while the input is being entered.
   *
   * @param {String} value - the inputted value.
   * @param {*} infoText - the text below the input.
   */
  manageInputValueState = (value, infoText) => {
    if (value && value !== "") {
      this.setState({
        validationState: validationStates.filled,
        infoText,
        value
      });
    } else {
      this.setState({
        validationState: validationStates.empty,
        infoText,
        value
      });
    }
  };

  /**
   * Clears the input value from the state and refocus the input.
   *
   * Note: given than the input component from material doesn't offer any api to focus
   * this timeout with a node focus was used to solve the problem
   * because the reference to the input is lost when the component is updated.
   */
  handleClear = () => {
    const { inputTextConfiguration } = this.props;
    this.manageInputValueState("", inputTextConfiguration.infoText);
    setTimeout(() => {
      this.node.children[1].children[0].focus();
    });
  };

  /**
   * Updates the state while is being inputted, also executes the user onChange
   * allowing the customization of the input if required.
   *
   * @param {Object} event - The event provided by the material ui input
   */
  onChangeHandler = event => {
    const { onChange, inputTextConfiguration } = this.props;
    const { value } = event.target;
    const newValue = onChange(value);
    this.manageInputValueState(newValue, inputTextConfiguration.infoText);
  };

  /**
   * Validates the input updating the state and modifying the info text, also executes
   * the user provided onBlur passing the current validation status and value.
   *
   * @returns {undefined}
   */
  onBlurHandler = () => {
    const { value } = this.state;
    const { onBlur, inputTextConfiguration, isRequired } = this.props;

    if (!value || value === "") {
      if (isRequired) {
        this.setState({
          validationState: validationStates.invalid,
          infoText: inputTextConfiguration.requiredWarningText
        });
        onBlur(value, validationStates.invalid);
        return;
      }
      this.setState({
        validationState: validationStates.empty,
        infoText: inputTextConfiguration.infoText
      });
      onBlur(value, validationStates.empty);
      return;
    }

    const valueSizeStatus = this.validateCharLength(value);
    const valid = this.validateInput(value);

    if (valid && valueSizeStatus === valueSize.valid) {
      this.setState({
        validationState: validationStates.valid,
        infoText: inputTextConfiguration.infoText
      });
      onBlur(value, validationStates.valid);
      return;
    }

    if (valueSizeStatus === valueSize.big) {
      this.setState({
        validationState: validationStates.invalid,
        infoText: inputTextConfiguration.maxCharQuantityWarningText
      });
    } else if (valueSizeStatus === valueSize.small) {
      this.setState({
        validationState: validationStates.invalid,
        infoText: inputTextConfiguration.minCharQuantityWarningText
      });
    } else {
      this.setState({
        validationState: validationStates.invalid,
        infoText: inputTextConfiguration.warningText
      });
    }

    onBlur(value, validationStates.invalid);
  };

  /**
   * Updates the state putting again the value from the state because the input value is
   * not automatically manage, it also executes the onFocus function from the user passing the value
   */
  onFocusHandler = () => {
    const { value } = this.state;
    const { onFocus, inputTextConfiguration } = this.props;
    this.manageInputValueState(value, inputTextConfiguration.infoText);
    onFocus(value);
  };

  /**
   * Checks if the value is a number.
   *
   * @param {Number || String} num - The value to test.
   * @returns {Boolean} - ´true´ if the value is a number ´false´ otherwise.
   */
  isNumeric = num => !Number.isNaN(Number(num));

  /**
   * Checks if the value is an email
   *
   * @param {String} email - The value to test.
   * @returns {Boolean} - ´true´ if the value is an email ´false´ otherwise.
   */
  isEmail = email => {
    const regexp = new RegExp(
      "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
    );
    return regexp.test(email);
  };

  render() {
    const {
      inputTextConfiguration,
      classes,
      password,
      name,
      disabled,
      isRequired,
      iconPosition,
      validationType,
      maxCharQuantity,
      minCharQuantity,
      validation
    } = this.props;

    const { validationState, value, infoText } = this.state;

    let classNamesRoot = classes.inputRoot;
    let classInfoText = classes.infoText;
    let label = inputTextConfiguration.inputLabel;

    if (disabled) {
      classNamesRoot = classes.inputRootDisabled;
    }

    if (validationState === validationStates.invalid) {
      classInfoText = classes.warningInfoText;
    }

    if (isRequired) {
      label = `${label}*`;
    }

    const adornment = this.prepareIcon(
      classes,
      disabled,
      iconPosition,
      validationState,
      validationType,
      maxCharQuantity,
      minCharQuantity,
      validation
    );

    return (
      <div
        ref={node => {
          this.node = node;
        }}
        className={classes.container}
      >
        <Typography variant="subtitle2" className={classes.label}>
          {label}
        </Typography>
        <Input
          autoFocus
          onBlur={this.onBlurHandler}
          onFocus={this.onFocusHandler}
          value={value}
          disabled={disabled}
          placeholder={inputTextConfiguration.placeholder}
          type={password ? "password" : "text"}
          classes={{
            input: classes.input,
            focused: classes.inputRootFocused,
            disabled: classes.inputDisabled
          }}
          className={classNamesRoot}
          onChange={this.onChangeHandler}
          inputProps={{ name }}
          endAdornment={adornment.endAdornment}
          startAdornment={adornment.startAdornment}
        />
        <Typography variant="body2" className={classInfoText}>
          {infoText}
        </Typography>
      </div>
    );
  }
}

HvInput.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied to the button.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * An Object containing the various text associated with the input.
   *
   * -inputLabel: the label on top of the input.
   * -placeholder: the placeholder value of the input.
   * -infoText: the default value of the info text below the input.
   * -warningText: the value when a validation fails.
   * -maxCharQuantityWarningText: the message that appear when there are too many characters.
   * -minCharQuantityWarningText: the message that appear when there are too few characters.
   */
  inputTextConfiguration: PropTypes.shape({
    inputLabel: PropTypes.string,
    placeholder: PropTypes.string,
    infoText: PropTypes.string,
    warningText: PropTypes.string,
    maxCharQuantityWarningText: PropTypes.string,
    minCharQuantityWarningText: PropTypes.string,
    requiredWarningText: PropTypes.string
  }),
  /**
   * The input name property in the dom.
   */
  name: PropTypes.string,
  /**
   * If ´true´ the input is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If ´true´ the input value must be filled on blur or else the validation fails.
   */
  isRequired: PropTypes.bool,
  /**
   * If ´true´ the input is of type password hiding the value.
   */
  password: PropTypes.bool,
  /**
   * The function that will be executed onChange, allows modification of the input,
   * it receives the value and must return a value otherwise the input will be empty.
   */
  onChange: PropTypes.func,
  /**
   * The function that will be executed onBlur, allows checking the validation state,
   * it receives the value and the validation state (´empty´, ´filled´, ´invalid´, ´valid´).
   */
  onBlur: PropTypes.func,
  /**
   * The function that will be executed onBlur, allows checking the value state,
   * it receives the value.
   */
  onFocus: PropTypes.func,
  /**
   * The custom validation function, it receives the value and must return
   * either ´true´ for valid or ´false´ for invalid, default validations would only
   * occur if this function is null or undefined
   */
  validation: PropTypes.func,
  /**
   * The initial value of the input.
   */
  value: PropTypes.string,
  /**
   * The initial state of the input.
   * 
   * note: Is recommended you use the provided validationStates object to set this value.
   */
  validationState: PropTypes.oneOf(["empty", "filled", "invalid", "valid"]),
  /**
   * The icon position of the input.
   * 
   * note: Is recommended you use the provided iconPositions object to set this value.
   */
  iconPosition: PropTypes.oneOf(["left", "right"]),
  /**
   * The maximum allowed length of the characters, if this value is null no check
   * will be perfom.
   */
  maxCharQuantity: PropTypes.number,
  /**
   * The minimum allowed length of the characters, if this value is null no check
   * will be perfom.
   */
  minCharQuantity: PropTypes.number,
  /**
   * Which type of default validation should the input perform.
   * 
   * note: Is recommended you use the provided ValidationTypes object to set this value.
   */
  validationType: PropTypes.oneOf(["none", "number", "email"])
};

HvInput.defaultProps = {
  password: false,
  inputTextConfiguration: {
    inputLabel: "",
    placeholder: "enter value",
    infoText: "",
    warningText: "something wrong",
    maxCharQuantityWarningText: "The value is too big",
    minCharQuantityWarningText: "The value is too short",
    requiredWarningText: "The value is required"
  },
  name: "",
  iconPosition: "right",
  validation: null,
  maxCharQuantity: null,
  minCharQuantity: null,
  validationType: validationTypes.none,
  value: "",
  validationState: validationStates.empty,
  disabled: false,
  isRequired: false,
  onChange: value => value,
  onBlur: () => {},
  onFocus: () => {}
};

export default HvInput;
