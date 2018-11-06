"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _hitachiLogo = _interopRequireDefault(require("./hitachi-logo.png"));

var _lumadaLogo = _interopRequireDefault(require("./lumada-logo.png"));

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
    companylogoContainer: {
      position: "relative",
      height: 28,
      width: 230
    },
    companyLogoImage: {
      position: "absolute",
      background: "url(".concat(_hitachiLogo["default"], ") no-repeat"),
      backgroundSize: "100px 28px",
      backgroundPosition: "0",
      width: 120,
      height: 28,
      borderRight: "1px solid ".concat(theme.palette.grey.rainy)
    },
    companyLogoText: {
      position: "absolute",
      marginLeft: 140,
      top: -4
    },
    companyLogoText1: {
      color: theme.palette.text.main,
      fontSize: "12px",
      fontWeight: "200",
      letterSpacing: "0.3px"
    },
    companyLogoText2: {
      color: theme.palette.text.main,
      fontSize: "14px",
      fontWeight: "bold",
      letterSpacing: "3.2px",
      lineHeight: "12px"
    }
  };
};

var _default = styles;
exports["default"] = _default;