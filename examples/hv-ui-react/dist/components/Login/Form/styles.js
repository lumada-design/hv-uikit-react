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
var styles = function () {
  function styles(theme) {
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
        margin: "0 0 15px 0"
      },
      label: {
        color: "#414141",
        fontSize: "14px",
        letterSpacing: "0.02em",
        lineHeight: "35px",
        fontWeight: "400"
      },
      button: {
        width: "120px",
        margin: 0,
        position: "absolute",
        right: 0,
        top: 200
      }
    };
  }

  return styles;
}();

var _default = styles;
exports["default"] = _default;