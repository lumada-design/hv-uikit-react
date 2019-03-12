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
import classNames from "classnames";
import PropTypes from "prop-types";

import Success from "../../../../ui-icons/core/S-icons/Level0Success16Color";
import Close from "../../../../ui-icons/core/S-icons/Close16";
import Unsuccess from "../../../../ui-icons/core/S-icons/Level5Unsuccess16Color";

import validationStates from "./validationStates";

const stl = {
  height: "30px",
  width: "30px"
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
    {validationState === validationStates.valid && <Success style={stl} />}
    {validationState === validationStates.invalid && <Unsuccess style={stl} />}
  </div>
);

InputAdornment.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied to the button.
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
