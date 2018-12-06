"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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
var muiInput = {
  root: {
    border: "1px solid ".concat(_palette.default.secondary.light),
    background: _palette.default.background.default,
    height: 40,
    maxHeight: 44,
    minWidth: 70,
    margin: 10,
    fontWeight: 400,
    fontSize: 14,
    lineHeight: "14px",
    "&:hover,&:focus&:active": {
      borderColor: _palette.default.primary.light
    }
  },
  inputType: {
    height: 25
  }
};
var _default = muiInput;
exports.default = _default;
//# sourceMappingURL=muiInput.js.map