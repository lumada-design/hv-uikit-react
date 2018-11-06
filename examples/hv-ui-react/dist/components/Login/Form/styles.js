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
      position: "absolute",
      width: "280px",
      margin: 0,
      padding: 0
    },
    remember: {
      color: "white",
      height: 0
    },
    input: {
      width: "280px",
      margin: "0 0 20px 0"
    },
    button: {
      width: "120px",
      margin: 0,
      position: "absolute",
      right: 0,
      top: 145
    }
  };
};

var _default = styles;
exports["default"] = _default;