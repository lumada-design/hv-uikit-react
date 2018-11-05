"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _palette = _interopRequireDefault(require("../palette"));

/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */
var muiButton = {
  root: {
    color: _palette["default"].primary.main,
    cursor: "pointer",
    borderRadius: 0,
    height: 40,
    maxHeight: 44,
    minHeight: 30,
    minWidth: 70,
    margin: 10,
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "14px",
    "&:hover,&:focus": {},
    "&:active": {},
    "&$disabled": {}
  },
  sizeSmall: {
    fontSize: "14px",
    padding: "7px 12px"
  },
  containedPrimary: {
    "&$disabled": {
      backgroundColor: _palette["default"].primary.main,
      color: _palette["default"].primary.contrastText,
      opacity: "0.5"
    }
  }
};
var _default = muiButton;
exports["default"] = _default;