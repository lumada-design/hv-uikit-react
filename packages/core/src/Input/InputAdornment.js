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

import Success from "@hv/uikit-react-icons/dist/DawnTheme/Success.sema1.S";
import Close from "@hv/uikit-react-icons/dist/DawnTheme/Close.XS";
import Unsuccess from "@hv/uikit-react-icons/dist/DawnTheme/Fail.sema4.S";

import validationStates from "./validationStates";

const InputAdornment = ({ classes, validationState, handleClear, theme }) => {
  const stl = {
    height: `${theme.hv.spacing.md}px`,
    width: `${theme.hv.spacing.md}px`
  };

  return (
    <div
      className={classNames(classes.icon, {
        [classes.iconClear]: validationState === validationStates.filled
      })}
      {...validationState === validationStates.filled && {
        onMouseDown: () => handleClear(),
        role: "button",
        tabIndex: -1,
        onKeyDown: () => handleClear()
      }}
    >
      {validationState === validationStates.filled && <Close style={stl} />}
      {validationState === validationStates.valid && <Success style={stl} />}
      {validationState === validationStates.invalid && (
        <Unsuccess style={stl} />
      )}
    </div>
  );
};

InputAdornment.propTypes = {
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * The initial state of the input.
   *
   * note: Is recommended you use the provided validationStates object to set this value.
   */
  validationState: PropTypes.oneOf(["empty", "filled", "invalid", "valid"]),
  /**
   * The function that will be executed when the icon is clicked
   */
  handleClear: PropTypes.func,
  /**
   * The theme passed by the provider.
   */
  theme: PropTypes.instanceOf(Object)
};

InputAdornment.defaultProps = {
  validationState: validationStates.empty,
  handleClear: value => value,
  theme: null
};

export default InputAdornment;
