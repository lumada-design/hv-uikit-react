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
import classNames from "classnames";
import PropTypes from "prop-types";
import isNil from "lodash/isNil";
import Success from "@hv/uikit-react-icons/dist/Generic/Success";
import Close from "@hv/uikit-react-icons/dist/Generic/CloseXS";
import Unsuccess from "@hv/uikit-react-icons/dist/Generic/Fail";

import validationStates from "./validationStates";

function onKeyDownClear(e, handleClear) {
  const EnterKeyCode = 13;

  if (e.keyCode === EnterKeyCode) {
    handleClear();
  }
};

const InputAdornment = ({
  classes,
  showValidationIcon,
  validationState,
  customFixedIcon,
  handleClear,
  showClear
}) => (
  <div className={classes.adornmentsBox}>
    {showValidationIcon &&
      validationState === validationStates.valid && <Success semantic="sema1" className={classNames(classes.adornmentIconBox, classes.icon)} />}
    {showValidationIcon &&
      validationState === validationStates.invalid && <Unsuccess semantic="sema4" className={classNames(classes.adornmentIconBox, classes.icon)} />}

    {showClear &&
      validationState === validationStates.filled && 
        <div
          className={classes.adornmentButton}
          role="button"
          tabIndex="-1"
          onMouseDown={handleClear}
          onKeyDown={(e) => onKeyDownClear(e, handleClear)}
        >
          <Close
            className={classNames(classes.adornmentIconBox, classes.icon)}
          />
        </div>}

    {!isNil(customFixedIcon) && (
      <>{React.cloneElement(customFixedIcon, {className: classNames(classes.adornmentIconBox, classes.icon, customFixedIcon.props.className)})}</>
    )}
  </div>
);

InputAdornment.propTypes = {
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes: PropTypes.instanceOf(Object).isRequired,

  /**
   * If `true` the validation icon is shown, if `false` it is not
   */
  showValidationIcon: PropTypes.bool,
  /**
   * The state of the input.
   *
   * note: Is recommended you use the provided validationStates object to set this value.
   */
  validationState: PropTypes.oneOf(["empty", "filled", "invalid", "valid"]),

  /**
   * If `true` the clear button is shown, if `false` it is not
   */
  showClear: PropTypes.bool,
  /**
   * The function that will be executed when the icon is clicked
   */
  handleClear: PropTypes.func,

  /**
   * a custom icon to be added into the input.
   */
  customFixedIcon: PropTypes.node
};

InputAdornment.defaultProps = {
  showValidationIcon: true,
  validationState: validationStates.empty,

  showClear: true,
  handleClear: value => value,

  customFixedIcon: null
};

export default InputAdornment;
