"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

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
    root: (0, _defineProperty2.default)({
      position: "absolute",
      width: "100%",
      height: 40,
      backgroundColor: theme.palette.grey.inspire
    }, theme.breakpoints.down("500"), {
      minWidth: "320px"
    }),
    labelLeft: (0, _defineProperty2.default)({
      float: "left",
      marginTop: 10,
      marginLeft: 20,
      fontSize: "16px",
      letterSpacing: "0.02em",
      lineHeight: "20px",
      fontWeight: "600",
      color: theme.palette.grey.foggy
    }, theme.breakpoints.down("500"), {
      display: "none"
    }),
    labelRight: (0, _defineProperty2.default)({
      float: "right",
      marginTop: 12,
      marginRight: 20,
      fontSize: "12px",
      letterSpacing: "0.02em",
      lineHeight: "16px",
      fontWeight: "400",
      color: theme.palette.grey.foggy
    }, theme.breakpoints.down("500"), {
      minWidth: "320px",
      float: "left",
      marginLeft: 20,
      fontSize: "11px"
    })
  };
};

var _default = styles;
exports.default = _default;
//# sourceMappingURL=styles.js.map