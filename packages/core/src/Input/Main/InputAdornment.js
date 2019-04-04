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
import theme from "@hv/uikit-common-themes/dist/theme";

import Success from "@hv/uikit-react-icons/Level0.S";
import Close from "@hv/uikit-react-icons/Close.S";
import Unsuccess from "@hv/uikit-react-icons/Level5.S";

import validationStates from "./validationStates";

const stl = {
  height: `${theme.spacing.md}px`,
  width: `${theme.spacing.md}px`
};

const InputAdornment = ({ classes, validationState, handleClear }) => (
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
    {validationState === validationStates.valid && <Success style={stl} color={["none", theme.palette.semantic.sema1]} />}
    {validationState === validationStates.invalid && <Unsuccess style={stl} color={["none", theme.palette.semantic.sema6]} />}
  </div>
);

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
  handleClear: PropTypes.func
};

InputAdornment.defaultProps = {
  validationState: validationStates.empty,
  handleClear: value => value
};

export default InputAdornment;
