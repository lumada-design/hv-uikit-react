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
import classNames from "classnames";
import deprecatedPropType from "@material-ui/core/utils/deprecatedPropType";
import HvTypography from "../Typography";
import Input from "../Input";

/**
 * A text area component wrapping the input box, it allows the input of paragraph of text.
 * alongside this it can provide a validation for the max character quantity
 *
 * @class HvTextArea
 * @extends {React.Component}
 */
class HvTextArea extends React.Component {
  constructor(props) {
    super(props);
    const { value, initialValue } = this.props;
    const val = value || initialValue;
    this.state = {
      currentValueLength: val !== undefined ? this.limitValue(val).length : 0
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { inputValue: nextValue, maxCharQuantity } = nextProps;
    const { currentValueLength: oldLength } = prevState;

    if (nextValue !== undefined) {
      const nextLength =
        nextValue.length > maxCharQuantity ? maxCharQuantity : nextValue.length;

      if (nextLength !== oldLength) {
        return {
          currentValueLength: nextLength
        };
      }
    }
    return null;
  }

  /**
   * Limit the string to the maxCharQuantity length.
   *
   * @param value - string to evaluate
   * @returns {string|*} - string according the limit
   */
  limitValue = value => {
    const { maxCharQuantity } = this.props;

    if (value === undefined) return value;

    return isNil(maxCharQuantity) || value.length < maxCharQuantity
      ? value
      : value.substring(0, maxCharQuantity);
  };

  /**
   * Updates the length of the string while is being inputted, also executes the user onChange
   * allowing the customization of the input if required.
   *
   * @param {String} value - The value provided by the HvInput
   */
  onChangeHandler = value => {
    const { onChange } = this.props;

    const newValue = onChange(this.limitValue(value));

    const textAreaValue = this.limitValue(newValue);

    this.setState({
      currentValueLength: textAreaValue.length
    });

    return newValue;
  };

  render() {
    const {
      classes,
      className,
      id,
      inputTextConfiguration,
      labels,
      maxCharQuantity,
      rows,
      value,
      initialValue,
      inputValue,
      disabled
    } = this.props;

    const { currentValueLength } = this.state;

    return (
      <>
        <Input
          classes={{
            container: classes.container,
            input: classes.input
          }}
          className={className}
          id={id}
          labels={inputTextConfiguration || labels}
          value={this.limitValue(value)}
          initialValue={this.limitValue(initialValue)}
          inputValue={this.limitValue(inputValue)}
          onChange={this.onChangeHandler}
          multiline
          rows={rows}
          disabled={disabled}
          validate={false}
          iconVisible={false}
        />
        {maxCharQuantity ? (
          <div className={classes.characterCounter}>
            <HvTypography
              className={classNames(classes.inline, {
                [classes.currentCounter]: !disabled,
                [classes.disabled]: disabled
              })}
              variant="labelText"
            >
              {currentValueLength}
            </HvTypography>
            <HvTypography
              className={classNames(classes.inline, classes.separator, {
                [classes.maxCharacter]: !disabled,
                [classes.disabled]: disabled
              })}
              variant="infoText"
            >
              /
            </HvTypography>
            <HvTypography
              className={classNames(classes.inline, {
                [classes.maxCharacter]: !disabled,
                [classes.disabled]: disabled
              })}
              variant="infoText"
            >
              {maxCharQuantity}
            </HvTypography>
          </div>
        ) : null}
      </>
    );
  }
}

// [classes.currentCounter]:!disabled,[classes.disabled]:disabled

HvTextArea.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   *  Styles applied to the Drawer Paper element.
   */
  classes: PropTypes.PropTypes.shape({
    /**
     * Style applied on the text area input box.
     */
    input: PropTypes.string,
    /**
     * Style applied on the character counter.
     */
    characterCounter: PropTypes.string,
    /**
     * Style controlling the layout of the counter.
     */
    inline: PropTypes.string,
    /**
     * Style applied to the separator element of the character counter.
     */
    separator: PropTypes.string,
    /**
     * Style applied to the max counter element of the character counter.
     */
    maxCharacter: PropTypes.string,
    /**
     * Style applied to the current counter element of the character counter.
     */
    currentCounter: PropTypes.string,
    /**
     * Style applied to the character counter when it is disabled.
     */
    disabled: PropTypes.string,
    /**
     * Style applied to the input container.
     */
    container: PropTypes.string
  }).isRequired,
  /**
   * An Object containing the various text associated with the text area.
   *
   * -inputLabel: the label on top of the input.
   * -placeholder: the placeholder value of the input.
   * -infoText: the default value of the info text below the input.
   * -warningText: the value when a validation fails.
   * -maxCharQuantityWarningText: the message that appears when there are too many characters.
   * -minCharQuantityWarningText: the message that appears when there are too few characters.
   * -requiredWarningText: the message that appears when the input is empty and required.
   *  @deprecated Instead use the labels property
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
    })
  ),
  /**
   * An Object containing the various text associated with the text area.
   *
   * -inputLabel: the label on top of the input.
   * -placeholder: the placeholder value of the input.
   * -infoText: the default value of the info text below the input.
   * -warningText: the value when a validation fails.
   * -maxCharQuantityWarningText: the message that appears when there are too many characters.
   * -minCharQuantityWarningText: the message that appears when there are too few characters.
   * -requiredWarningText: the message that appears when the input is empty and required.
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
   * The maximum allowed length of the characters, if this value is null or undefined no check
   * will be performed.
   */
  maxCharQuantity: PropTypes.number,
  /**
   * The number of rows of the text area
   */
  rows: PropTypes.number,
  /**
   * The initial value of the input.
   * @deprecated will be replace by initialValue
   */
  value: PropTypes.string,
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
   * The function that will be executed onChange, allows modification of the input,
   * it receives the value and must return a value otherwise the input will be empty.
   */
  onChange: PropTypes.func,
  /**
   * If ´true´ the text area is disabled.
   */
  disabled: PropTypes.bool
};

HvTextArea.defaultProps = {
  className: "",
  id: undefined,
  inputTextConfiguration: undefined,
  labels: {
    inputLabel: "",
    placeholder: "",
    warningText: "",
    maxCharQuantityWarningText: "",
    minCharQuantityWarningText: "",
    requiredWarningText: ""
  },
  rows: 1,
  disabled: false,
  value: "",
  initialValue: "",
  inputValue: undefined,
  maxCharQuantity: undefined,
  onChange: value => value
};

export default HvTextArea;
