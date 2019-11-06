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

const InputAdornment = ({
  classes,
  validationState,
  validationIconVisible,
  customFixedIcon,
  handleClear,
  onlyCustomIcon,
  disableClear
}) => (
  <div className={classes.iconFlexBox}>
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
      {!onlyCustomIcon &&
        !disableClear && 
        validationState === validationStates.filled && <Close className={classes.closeBox} />}
      {!onlyCustomIcon &&
        validationIconVisible &&
        validationState === validationStates.valid && <Success semantic="sema1" className={classes.box} />}
      {!onlyCustomIcon &&
        validationIconVisible &&
        validationState === validationStates.invalid && <Unsuccess semantic="sema4" className={classes.box} />}
    </div>
    {!isNil(customFixedIcon) && (
      <div className={classes.icon}>{customFixedIcon}</div>
    )}
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
  validationIconVisible: PropTypes.bool,
  /**
   * a custom icon to be added into the input.
   */
  customFixedIcon: PropTypes.node,
  /**
   * The function that will be executed when the icon is clicked
   */
  handleClear: PropTypes.func,
  /**
   * forces the adornment to contain only the custom icon
   */
  onlyCustomIcon: PropTypes.bool,
  /**
   * If `true` the clear button is disabled if `false` is enable
   */
  disableClear: PropTypes.bool,
  /**
   * The theme passed by the provider.
   */
  theme: PropTypes.instanceOf(Object)
};

InputAdornment.defaultProps = {
  validationIconVisible: true,
  onlyCustomIcon: undefined,
  disableClear: false,
  validationState: validationStates.empty,
  customFixedIcon: null,
  handleClear: value => value,
  theme: null
};

export default InputAdornment;
