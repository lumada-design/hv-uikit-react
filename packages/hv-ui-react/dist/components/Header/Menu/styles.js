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
      menu: {
        display: "flex",
        flex: 1,
        justifyContent: "left",
        marginLeft: "60px"
      },
      listItem: {
        position: "relative",
        width: "unset",
        padding: "0 15px 0 15px"
      },
      listItemText: {
        color: theme.palette.text.main,
        textTransform: "capitalize",
        padding: 0
      },
      label: {
        color: theme.palette.text.main,
        fontSize: "17px",
        letterSpacing: "0.02em",
        lineHeight: "40px"
      },
      selected: {
        "& p": {
          fontWeight: "bold",
          color: theme.palette.hitachi.main
        }
      },
      selector: {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: -12,
        left: 0,
        borderTop: "5px solid ".concat(theme.palette.hitachi.main)
      }
    };
  }

  return styles;
}();

var _default = styles;
exports["default"] = _default;