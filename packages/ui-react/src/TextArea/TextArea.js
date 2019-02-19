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
import Input from "../Input";

const TextArea = ({
  classes,
  inputTextConfiguration,
  rows,
  value,
  onChange,
  disabled
}) => (
  <Input
    classes={{
      input: classes.input
    }}
    inputTextConfiguration={inputTextConfiguration}
    value={value}
    onChange={onChange}
    multiline
    rows={rows}
    disabled={disabled}
    validate={false}
    iconVisible={false}
  />
);

TextArea.propTypes = {
  /**
   *  Styles applied to the Drawer Paper element
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * An Object containing the various text associated with the input.
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
    placeholder: PropTypes.string,
    infoText: PropTypes.string,
    warningText: PropTypes.string,
    maxCharQuantityWarningText: PropTypes.string,
    minCharQuantityWarningText: PropTypes.string,
    requiredWarningText: PropTypes.string
  }),
  /**
   * The number of rows of the textbox
   */
  rows: PropTypes.number,
  /**
   * The initial value of the input.
   */
  value: PropTypes.string,
  /**
   * The function that will be executed onChange, allows modification of the input,
   * it receives the value and must return a value otherwise the input will be empty.
   */
  onChange: PropTypes.func,
  /**
   * If ´true´ the input is disabled.
   */
  disabled: PropTypes.bool
};

TextArea.defaultProps = {
  inputTextConfiguration: {
    inputLabel: "",
    placeholder: "enter value",
    infoText: "",
    warningText: "something wrong",
    maxCharQuantityWarningText: "The value is too big",
    minCharQuantityWarningText: "The value is too short",
    requiredWarningText: "The value is required"
  },
  rows: 1,
  disabled: false,
  value: "",
  onChange: value => value
};

export default TextArea;
