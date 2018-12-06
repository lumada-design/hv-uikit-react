"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createTypography = _interopRequireDefault(require("@material-ui/core/styles/createTypography"));

var _theme = _interopRequireDefault(require("@hv-ui/themes/dist/theme"));

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
var _default = (0, _createTypography.default)(_palette.default, {
  useNextVariants: true,
  suppressDeprecationWarnings: true,
  fontFamily: _theme.default.typography.fontFamily,
  body1: {
    fontSize: _theme.default.typography.normalText.fontSize,
    letterSpacing: _theme.default.typography.normalText.letterSpacing,
    lineHeight: _theme.default.typography.normalText.lineHeight,
    fontWeight: _theme.default.typography.normalText.fontWeight
  },
  body2: {},
  subtitle1: {},
  subtitle2: {
    fontSize: _theme.default.typography.labelText.fontSize,
    letterSpacing: _theme.default.typography.labelText.letterSpacing,
    lineHeight: _theme.default.typography.labelText.lineHeight,
    fontWeight: _theme.default.typography.labelText.fontWeight
  }
});

exports.default = _default;
//# sourceMappingURL=typography.js.map