"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = require("path");

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
      user: {
        position: "absolute",
        textAlign: "right",
        right: 20
      },
      userInfo: {
        "float": "left",
        marginTop: 12,
        marginRight: 10,
        "& p": {
          color: theme.palette.text.main
        }
      },
      userName: {
        color: theme.palette.text.main,
        textTransform: "capitalize",
        fontSize: "15px",
        fontWeight: "400",
        lineHeight: "16px"
      },
      userRole: {
        color: theme.palette.text.secondary,
        textTransform: "capitalize",
        fontSize: "13px",
        fontWeight: "400",
        lineHeight: "20px"
      },
      userButton: {
        color: theme.palette.text.main,
        width: 40
      },
      userIcon: {
        fontSize: 35
      }
    };
  }

  return styles;
}();

var _default = styles;
exports["default"] = _default;