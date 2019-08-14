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
import isNil from "lodash/isNil";
import Input from "@material-ui/core/Input";
import deprecatedPropType from "@material-ui/core/utils/deprecatedPropType";
import classNames from "classnames";
import InfoS from "@hv/uikit-react-icons/dist/DawnTheme/Info.S";
import HvTypography from "../Typography";
import HvList from "../List";
import validationTypes from "./validationTypes";
import validationStates from "./validationStates";
import { validateCharLength, validateInput } from "./validations";

import InputAdornment from "./InputAdornment";

class HvInput extends React.Component {
  constructor(props) {
    super(props);

    const {
      validationState,
      value,
      initialValue,
      inputTextConfiguration,
      labels
    } = props;

    const definedLabels = inputTextConfiguration || labels;

    const val = value || initialValue;

    this.state = {
      validationState,
      value: val,
      suggestionValues: null,
      infoText:
        validationState === validationStates.invalid
          ? definedLabels.warningText
          : definedLabels.infoText
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { inputValue: nextValue } = nextProps;
    const { value: oldValue } = prevState;

    if (nextValue !== undefined && nextValue !== oldValue) {
      return {
        value: nextValue
      };
    }
    return null;
  }

  /**
   * Updates the states while the input is being entered.
   *
   * @param {String} value - the inputted value.
   * @param {*} infoText - the text below the input.
   */
  manageInputValueState = (value, infoText) => {
    this.setState({
      validationState:
        value && value !== ""
          ? validationStates.filled
          : validationStates.empty,
      infoText,
      value
    });
  };

  /**
   * Clears the input value from the state and refocus the input.
   *
   * Note: given than the input component from material doesn't offer any api to focus
   * this timeout with a node focus was used to solve the problem
   * because the reference to the input is lost when the component is updated.
   */
  handleClear = () => {
    const { inputTextConfiguration, labels, onChange } = this.props;
    const definedLabels = inputTextConfiguration || labels;
    const value = "";
    onChange(value);
    this.manageInputValueState(value, definedLabels.infoText);
    setTimeout(() => {
      this.node.children[1].children[0].focus();
    });
  };

  /**
   * clears the suggestion array.
   */
  suggestionClearHandler = () => {
    this.setState({
      suggestionValues: null
    });
  }

  /**
   * fills of the suggestion array.
   */
  suggestionHandler = value => {
    const { suggestionListCallback } = this.props;
    const suggestionsArray = suggestionListCallback(value);
    if (
      !isNil(suggestionsArray) &&
      Array.isArray(suggestionsArray) &&
      !isNil(suggestionsArray[0].label)
    ) {
      this.setState({
        suggestionValues: suggestionsArray
      });
    } else {
      this.suggestionClearHandler();
    }
  };

  /** 
   * Executes the user callback adds the selection to the state and clears the suggestions.
   */
  suggestionSelectedHandler = item => {
    const { suggestionSelectedCallback } = this.props;
    suggestionSelectedCallback(item);
    this.manageInputValueState(item.label);
    this.suggestionClearHandler();
  }

  /**
   * Updates the state while is being inputted, also executes the user onChange
   * allowing the customization of the input if required.
   *
   * @param {Object} event - The event provided by the material ui input
   */
  onChangeHandler = event => {
    const { onChange, inputTextConfiguration, labels } = this.props;
    const { value } = event.target;
    const definedLabels = inputTextConfiguration || labels;
    const newValue = onChange(value);
    this.suggestionHandler(value);
    this.manageInputValueState(newValue, definedLabels.infoText);
  };

  /**
   * Validates the input updating the state and modifying the info text, also executes
   * the user provided onBlur passing the current validation status and value.
   *
   * @returns {undefined}
   */
  onBlurHandler = () => {
    const { value } = this.state;
    const { onBlur, inputTextConfiguration, labels, isRequired } = this.props;
    const {
      validation,
      validationType,
      minCharQuantity,
      maxCharQuantity
    } = this.props;

    const definedLabels = inputTextConfiguration || labels;

    let validationState;
    let { infoText } = definedLabels;

    if (!value || value === "") {
      if (isRequired) {
        validationState = validationStates.invalid;
        infoText = definedLabels.requiredWarningText;
      } else {
        validationState = validationStates.empty;
      }
    } else {
      const valueSizeStatus = validateCharLength(
        value,
        maxCharQuantity,
        minCharQuantity
      );
      const valid = validateInput(value, validation, validationType);

      if (valid && valueSizeStatus) {
        validationState = validationStates.valid;
      } else if (!valid || !valueSizeStatus) {
        validationState = validationStates.invalid;

        if (maxCharQuantity && value.length > maxCharQuantity) {
          infoText = definedLabels.maxCharQuantityWarningText;
        } else if (minCharQuantity && value.length < minCharQuantity) {
          infoText = definedLabels.minCharQuantityWarningText;
        } else {
          infoText = definedLabels.warningText;
        }
      }
    }

    this.setState({ validationState, infoText });
    this.suggestionClearHandler();
    onBlur(value, validationState);
  };

  /**
   * Updates the state putting again the value from the state because the input value is
   * not automatically manage, it also executes the onFocus function from the user passing the value
   */
  onFocusHandler = () => {
    const { value } = this.state;
    const { onFocus, inputTextConfiguration, labels } = this.props;
    const definedLabels = inputTextConfiguration || labels;
    this.manageInputValueState(value, definedLabels.infoText);
    onFocus(value);
  };

  render() {
    const {
      labels,
      inputTextConfiguration,
      classes,
      className,
      id,
      password,
      disabled,
      isRequired,
      infoIcon,
      iconVisible,
      validationIconVisible,
      iconPosition,
      customFixedIcon,
      validationIconPosition,
      validate,
      showInfo,
      validationType,
      validationState,
      maxCharQuantity,
      minCharQuantity,
      validation,
      externalWarningTextOverride,
      inputProps,
      onChange,
      onBlur,
      onFocus,
      suggestionSelectedCallback,
      suggestionListCallback,
      value,
      autoFocus,
      theme,
      inputValue,
      initialValue,
      ...others
    } = this.props;

    const {
      validationState: stateValidationState,
      value: stateValue,
      infoText,
      suggestionValues
    } = this.state;

    const definedLabels = inputTextConfiguration || labels;

    let label = definedLabels.inputLabel;
    if (isRequired) {
      label = `${label}*`;
    }

    let adornment = (
      <InputAdornment
        classes={classes}
        customFixedIcon={customFixedIcon}
        validationIconVisible={validationIconVisible}
        validationState={stateValidationState}
        handleClear={() => this.handleClear()}
        theme={theme}
      />
    );

    if (disabled) {
      adornment = null;
    }
    if(customFixedIcon === null) {
      if (
        stateValidationState !== validationStates.filled &&
        (stateValidationState === validationStates.empty ||
          (validationType === validationTypes.none &&
            maxCharQuantity === null &&
            minCharQuantity === null &&
            !validation))
      ) {
        adornment = null;
      }
    }

    let validationText;
    if ((validate || showInfo) && !infoIcon) {
      validationText = (
        <HvTypography
          variant={
            stateValidationState !== validationStates.invalid
              ? "infoText"
              : "sText"
          }
          className={classNames(classes.infoText, {
            [classes.textWarning]:
              stateValidationState === validationStates.invalid ||
              externalWarningTextOverride !== null
          })}
        >
          {externalWarningTextOverride || infoText}
        </HvTypography>
      );
    }

    let labelTypography;
    if (label) {
      labelTypography = (
        <HvTypography
          variant="labelText"
          className={classNames(classes.label, {
            [classes.labelDisable]: disabled
          })}
        >
          {label}
        </HvTypography>
      );
    }

    return (
      <div
        ref={node => {
          this.node = node;
        }}
        className={classNames(classes.container, className)}
        id={id}
      >
        <div className={classes.labelContainer}>
          <div>{labelTypography}</div>
          {infoIcon && showInfo && (
            <div title={infoText} className={classes.infoIconContainer}>
              <InfoS />
            </div>
          )}
        </div>
        <Input
          autoFocus={autoFocus}
          onBlur={this.onBlurHandler}
          onFocus={this.onFocusHandler}
          value={stateValue}
          disabled={disabled}
          placeholder={definedLabels.placeholder}
          type={password ? "password" : "text"}
          classes={{
            input: classes.input,
            focused: classes.inputRootFocused,
            disabled: classes.inputDisabled,
            multiline: classes.multiLine
          }}
          className={classNames(classes.inputRoot, {
            [classes.inputRootDisabled]: disabled
          })}
          onChange={this.onChangeHandler}
          inputProps={inputProps}
          {...(iconPosition === "right" ||
            (iconPosition === undefined &&
              validationIconPosition === "right")) &&
            (iconVisible || iconVisible === undefined) &&
            { endAdornment: adornment }}
          {...(iconPosition === "left" || validationIconPosition === "left") &&
            (iconVisible || iconVisible === undefined) &&
            { startAdornment: adornment }}
          {...others}
        />
        {suggestionValues && (
          <div className={classes.suggestionsContainer}>
            <div className={classes.suggestionList}>
              <HvList 
                values={suggestionValues} 
                onClick={this.suggestionSelectedHandler}
              />
            </div>
          </div>
        )}
        {validationText}
      </div>
    );
  }
}

HvInput.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the component styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the container of the input.
     */
    container: PropTypes.string,
    /**
     * Styles applied to input root which is comprising of everything but the labels and descriptions.
     */
    inputRoot: PropTypes.string,
    /**
     * Styles applied to input root when it is disabled.
     */
    inputRootDisabled: PropTypes.string,
    /**
     * Styles applied to input root when it is focused.
     */
    inputRootFocused: PropTypes.string,
    /**
     * Styles applied to input html element.
     */
    input: PropTypes.string,
    /**
     * Styles applied to input html element when it is disabled.
     */
    inputDisabled: PropTypes.string,
    /**
     * Styles applied to input html element when it is multiline mode.
     */
    multiLine: PropTypes.string,
    /**
     * Styles applied to the label element.
     */
    label: PropTypes.string,
    /**
     * Styles applied to the container of the labels elements.
     */
    labelContainer: PropTypes.string,
    /**
     * Styles applied to the icon information container.
     */
    infoIconContainer: PropTypes.string,
    /**
     * Styles applied to the description.
     */
    text: PropTypes.string,
    /**
     * Styles applied to the description when it is showing an information.
     */
    textInfo: PropTypes.string,
    /**
     * Styles applied to the description when it is showing a warning.
     */
    textWarning: PropTypes.string,
    /**
     * Styles applied to the icon.
     */
    icon: PropTypes.string,
    /**
     * Styles applied to the container of the icon.
     */
    iconContainer: PropTypes.string,
    /**
     * Styles applied to the icon used to clean the input.
     */
    iconClear: PropTypes.string,
    /**
     * IE11 specific styling.
     */
    "@global": PropTypes.string
  }).isRequired,
  /**
   * An Object containing the various text associated with the input.
   *
   * - inputLabel: the label on top of the input.
   * - placeholder: the placeholder value of the input.
   * - infoText: the default value of the info text below the input.
   * - warningText: the value when a validation fails.
   * - maxCharQuantityWarningText: the message that appears when there are too many characters.
   * - minCharQuantityWarningText: the message that appears when there are too few characters.
   * - requiredWarningText: the message that appears when the input is empty and required.
   * @deprecated Instead use the labels property
   */
  inputTextConfiguration: deprecatedPropType(
    PropTypes.shape({
      inputLabel: PropTypes.string,
      placeholder: PropTypes.string,
      infoText: PropTypes.string,
      warningText: PropTypes.string,
      maxCharQuantityWarningText: PropTypes.string,
      minCharQuantityWarningText: PropTypes.string,
      requiredWarningText: PropTypes.string
    }),
    "Instead use the labels property"
  ),
  /**
   * An Object containing the various text associated with the input.
   *
   * - inputLabel: the label on top of the input.
   * - placeholder: the placeholder value of the input.
   * - infoText: the default value of the info text below the input.
   * - warningText: the value when a validation fails.
   * - maxCharQuantityWarningText: the message that appears when there are too many characters.
   * - minCharQuantityWarningText: the message that appears when there are too few characters.
   * - requiredWarningText: the message that appears when the input is empty and required.
   */
  labels: PropTypes.shape({
    inputLabel: PropTypes.string,
    placeholder: PropTypes.string,
    infoText: PropTypes.string,
    warningText: PropTypes.string,
    maxCharQuantityWarningText: PropTypes.string,
    minCharQuantityWarningText: PropTypes.string,
    requiredWarningText: PropTypes.string
  }),
  /**
   * Attributes applied to the input element.
   */
  inputProps: PropTypes.instanceOf(Object),
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
   * The function that will be executed to received an array of objects that has a label and id to create list of suggestion
   */
  suggestionListCallback: PropTypes.func,
  /**
   * The function that will be executed after selecting a value in the suggestion list
   */
  suggestionSelectedCallback: PropTypes.func,
  /**
   * If `true` validation is shown, `false` otherwise.
   *  * @deprecated Instead use the showInfo property
   */
  validate: deprecatedPropType(
    PropTypes.bool,
    "Instead use the showInfo property"
  ),
  /**
   * If `true` information label is shown, `false` otherwise.
   */
  showInfo: PropTypes.bool,
  /**
   * The custom validation function, it receives the value and must return
   * either ´true´ for valid or ´false´ for invalid, default validations would only
   * occur if this function is null or undefined
   */
  validation: PropTypes.func,
  /**
   * The initial value of the input.
   * @deprecated Instead use the initialValue property
   */
  value: deprecatedPropType(
    PropTypes.string,
    "Instead use the initialValue property"
  ),
  /**
   * The initial value of the input.
   */
  initialValue: PropTypes.string,
  /**
   * The input value to be set. If used it is the responsibility of the caller to maintain the state.
   * @deprecated will be replaced by value
   */
  inputValue: PropTypes.string,
  /**
   * If `true` it should autofocus.
   */
  autoFocus: PropTypes.bool,
  /**
   * The initial state of the input.
   *
   * note: Is recommended you use the provided validationStates object to set this value.
   */
  validationState: PropTypes.oneOf(["empty", "filled", "invalid", "valid"]),
  /**
   * Show info icon with info label.infoText.
   */
  infoIcon: PropTypes.bool,
  /**
   * If `true` the icon is visible, `false` otherwise
   * @deprecated Instead use the validationIconVisible property
   */
  iconVisible: deprecatedPropType(
    PropTypes.bool,
    " Instead use the validationIconVisible property"
  ),
  /**
   * If `true` the validation icon is visible, `false` otherwise
   */
  validationIconVisible: PropTypes.bool,
  /**
   * The icon position of the input. It is recommended to use the provided iconPositions object to set this value.
   * @deprecated Instead use the validationIconPosition property
   */
  iconPosition: deprecatedPropType(
    PropTypes.oneOf(["left", "right"]),
    "Instead use the validationIconPosition property"
  ),
  /**
   * The icon position of the input. It is recommended to use the provided validationIconPosition object to set this value.
   */
  validationIconPosition: PropTypes.oneOf(["left", "right"]),
  /**
   * a custom icon to be added into the input.
   */
  customFixedIcon: PropTypes.node,
  /**
   * The maximum allowed length of the characters, if this value is null no check
   * will be performed.
   */
  maxCharQuantity: PropTypes.number,
  /**
   * The minimum allowed length of the characters, if this value is null no check
   * will be perform.
   */
  minCharQuantity: PropTypes.number,
  /**
   * Which type of default validation should the input perform. It is recommended to use the provided ValidationTypes object to set this value.
   */
  validationType: PropTypes.oneOf(["none", "number", "email"]),
  /**
   * Overrides any validation with a specific error/warning message to set in the infoText slot.
   */
  externalWarningTextOverride: PropTypes.string,
  /**
   * The theme passed by the provider.
   */
  theme: PropTypes.instanceOf(Object)
};

HvInput.defaultProps = {
  className: "",
  id: undefined,
  password: false,
  inputTextConfiguration: undefined,
  labels: {
    inputLabel: "",
    placeholder: "enter value",
    infoText: "",
    warningText: "something wrong",
    maxCharQuantityWarningText: "The value is too big",
    minCharQuantityWarningText: "The value is too short",
    requiredWarningText: "The value is required"
  },
  inputProps: {},
  customFixedIcon: null,
  infoIcon: false,
  iconVisible: undefined,
  validationIconVisible: true,
  iconPosition: undefined,
  validationIconPosition: "right",
  validate: undefined,
  showInfo: true,
  validation: null,
  maxCharQuantity: null,
  minCharQuantity: null,
  validationType: "none",
  value: undefined,
  initialValue: "",
  inputValue: undefined,
  autoFocus: false,
  validationState: "empty",
  disabled: false,
  isRequired: false,
  suggestionListCallback: () => {},
  suggestionSelectedCallback: () => {},
  onChange: value => value,
  onBlur: () => {},
  onFocus: () => {},
  externalWarningTextOverride: null,
  theme: null
};

export default HvInput;
