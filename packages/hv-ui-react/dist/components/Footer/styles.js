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
        width: "100%",
        height: 40,
        backgroundColor: theme.palette.grey.inspire
      },
      labelLeft: {
        "float": "left",
        marginTop: 10,
        marginLeft: 20,
        fontSize: "16px",
        letterSpacing: "0.02em",
        lineHeight: "20px",
        fontWeight: "600",
        color: theme.palette.grey.foggy
      },
      labelRight: {
        "float": "right",
        marginTop: 12,
        marginRight: 20,
        fontSize: "12px",
        letterSpacing: "0.02em",
        lineHeight: "16px",
        fontWeight: "400",
        color: theme.palette.grey.foggy
      }
    };
  }

  return styles;
}();

var _default = styles;
exports["default"] = _default;