"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */
var styles = function styles(theme) {
  return {
    root: {
      border: "1px solid ".concat(theme.palette.grey.plain)
    },
    info: {
      borderTop: "4px solid ".concat(theme.palette.status.success)
    },
    warning: {
      borderTop: "4px solid ".concat(theme.palette.status.alert)
    },
    critical: {
      borderTop: "4px solid ".concat(theme.palette.status.error)
    }
  };
};

var _default = styles;
exports["default"] = _default;