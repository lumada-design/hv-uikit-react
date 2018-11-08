"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _miLoginBg = _interopRequireDefault(require("./mi-login-bg.png"));

var _miHitachiLogo = _interopRequireDefault(require("./mi-hitachi-logo.png"));

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
        flex: 1,
        display: "flex",
        width: "100%",
        background: "url(".concat(_miLoginBg["default"], ") 0 / cover fixed"),
        justifyContent: "flex-end"
      },
      rightContainer: {
        width: "30%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      },
      title: {
        position: "absolute",
        top: "15%",
        color: "#414141",
        fontSize: "24px",
        letterSpacing: "0.02em",
        lineHeight: "30px",
        fontWeight: "600",
        zIndex: 1
      },
      formContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "auto",
        position: "relative",
        width: "100%",
        height: "100%",
        background: "rgba(249,249,249,0.8)",
        "&:before": {
          zIndex: "-1",
          content: '""',
          width: "100%",
          height: "100%",
          background: "url(".concat(_miLoginBg["default"], ") 0 / cover fixed"),
          position: "absolute",
          filter: "blur(2px)"
        }
      }
    };
  }

  return styles;
}();

var _default = styles;
exports["default"] = _default;