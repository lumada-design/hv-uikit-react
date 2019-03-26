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
import Typography from "@material-ui/core/Typography";
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
    const { value } = this.props;
    this.state = {
      currentValueLength: value.length
    };
  }

  /**
   * Updates the length of the string while is being inputted, also executes the user onChange
   * allowing the customization of the input if required.
   *
   * @param {String} value - The value provided by the HvInput
   */
  onChangeHandler = value => {
    const { onChange, maxCharQuantity } = this.props;
    const newValue = onChange(value);

    const textAreaValue =
      isNil(maxCharQuantity) || newValue.length < maxCharQuantity
        ? newValue
        : newValue.substring(0, maxCharQuantity);

    this.setState({
      currentValueLength: textAreaValue.length
    });

    return textAreaValue;
  };

  render() {
    const {
      classes,
      inputTextConfiguration,
      maxCharQuantity,
      rows,
      value,
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
          inputTextConfiguration={inputTextConfiguration}
          value={value}
          onChange={this.onChangeHandler}
          multiline
          rows={rows}
          disabled={disabled}
          validate={false}
          iconVisible={false}
        />
        {maxCharQuantity ? (
          <div className={classes.characterCounter}>
            <Typography
              className={classNames(classes.inline, {
                [classes.currentCounter]: !disabled,
                [classes.disabled]: disabled
              })}
              variant="subtitle2"
            >
              {currentValueLength}
            </Typography>
            <Typography
              className={classNames(classes.inline, classes.separator, {
                [classes.maxCharacter]: !disabled,
                [classes.disabled]: disabled
              })}
              variant="body2"
            >
              /
            </Typography>
            <Typography
              className={classNames(classes.inline, {
                [classes.maxCharacter]: !disabled,
                [classes.disabled]: disabled
              })}
              variant="body2"
            >
              {maxCharQuantity}
            </Typography>
          </div>
        ) : null}
      </>
    );
  }
}

// [classes.currentCounter]:!disabled,[classes.disabled]:disabled

HvTextArea.propTypes = {
  /**
   *  Styles applied to the Drawer Paper element.
   */
  classes: PropTypes.PropTypes.shape({
    /**
     * The class applied on the text area input box.
     */
    input: PropTypes.string,
    /**
     * The class applied on the character counter.
     */
    characterCounter: PropTypes.string,
    /**
     * The class controlling the layout of the counter.
     */
    inline: PropTypes.string,
    /**
     * The class applied to the separator element of the character counter.
     */
    separator: PropTypes.string,
    /**
     * The class applied to the max counter element of the character counter.
     */
    maxCharacter: PropTypes.string,
    /**
     * The class applied to the current counter element of the character counter.
     */
    currentCounter: PropTypes.string,
    /**
     * The class applied to the character counter when it is disabled.
     */
    disabled: PropTypes.string
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
   */
  inputTextConfiguration: PropTypes.shape({
    inputLabel: PropTypes.string,
    placeholder: PropTypes.string
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
   * The initial value of the text area.
   */
  value: PropTypes.string,
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
  inputTextConfiguration: {
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
  maxCharQuantity: undefined,
  onChange: value => value
};

export default HvTextArea;
