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

import Success from "@hv-ui/icons/core/S-icons/Level0Success16Color";
import Close from "@hv-ui/icons/core/S-icons/Close16";
import Unsuccess from "@hv-ui/icons/core/S-icons/Level5Unsuccess16Color";

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
      onKeyDown: () => handleClear(),
    }}
  >
    {validationState === validationStates.filled && <Close style={stl} />}
    {validationState === validationStates.valid && <Success style={stl} />}
    {validationState === validationStates.invalid && <Unsuccess style={stl} />}
  </div>
);

export default InputAdornment;
