"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */
// TODO: review how styles are injected in test time
var styles = function styles(theme) {
  return {
    menu: {
      display: "flex",
      flex: 1,
      justifyContent: "left",
      marginLeft: "".concat(theme.spacing.lg, "px"),
      "& > a": {
        paddingRight: "".concat(theme.spacing.xs, "px")
      },
      "& > a:last-child": {
        paddingRight: "0px"
      }
    },
    listItem: {
      position: "relative",
      width: "unset",
      maxWidth: "170px",
      padding: "0 ".concat(theme.spacing.xs, "px 0 ").concat(theme.spacing.xs, "px")
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
      lineHeight: "32px"
    },
    selected: {
      "& p": {
        fontWeight: "bold",
        color: theme.palette.hitachi ? theme.palette.hitachi.main : undefined
      }
    },
    selector: {
      position: "absolute",
      width: "100%",
      height: "100%",
      top: -7,
      left: 0,
      borderTop: "4px solid ".concat(theme.palette.hitachi ? theme.palette.hitachi.main : undefined)
    }
  };
};

var _default = styles;
exports.default = _default;
//# sourceMappingURL=styles.js.map