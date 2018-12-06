"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _styles = require("@material-ui/core/styles");

var _theme = _interopRequireDefault(require("@hv-ui/themes/dist/theme"));

var _muiAppBar = _interopRequireDefault(require("./overrides/muiAppBar"));

var _muiInput = _interopRequireDefault(require("./overrides/muiInput"));

var _muiInputAdornment = _interopRequireDefault(require("./overrides/muiInputAdornment"));

var _muiToolbar = _interopRequireDefault(require("./overrides/muiToolbar"));

var _typography = _interopRequireDefault(require("./typography"));

var _palette = _interopRequireDefault(require("./palette"));

/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */
var muiTheme = (0, _styles.createMuiTheme)({
  shadows: Array(25).fill("none"),
  palette: _palette.default,
  typography: _typography.default,
  shape: {
    borderRadius: 0
  },
  props: {
    MuiButtonBase: {
      disableRipple: true
    },
    MuiInput: {
      disableUnderline: true
    }
  },
  overrides: {
    MuiAppBar: {
      root: _muiAppBar.default.root,
      colorDefault: _muiAppBar.default.colorDefault
    },
    MuiInput: {
      root: _muiInput.default.root,
      inputType: _muiInput.default.inputType
    },
    MuiInputAdornment: {
      root: _muiInputAdornment.default.root,
      positionStart: _muiInputAdornment.default.positionStart,
      positionEnd: _muiInputAdornment.default.positionEnd
    },
    MuiToolbar: {
      root: _muiToolbar.default.root,
      gutters: _muiToolbar.default.gutters,
      dense: _muiToolbar.default.dense
    }
  }
});
muiTheme.spacing = (0, _objectSpread2.default)({}, muiTheme.spacing, _theme.default.spacing);

var _default = Object.assign({}, muiTheme, {
  hv: _theme.default
});

exports.default = _default;
//# sourceMappingURL=index.js.map