"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _createPalette = _interopRequireDefault(require("@material-ui/core/styles/createPalette"));

var _theme = _interopRequireDefault(require("@hv-ui/themes/dist/theme"));

/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */
var palette = (0, _createPalette.default)({
  common: _theme.default.palette.common,
  primary: {
    light: _theme.default.palette.primary.light,
    main: _theme.default.palette.primary.main
  },
  secondary: {
    light: _theme.default.palette.secondary.light,
    main: _theme.default.palette.secondary.main
  },
  hitachi: {
    light: _theme.default.palette.hitachi.light,
    main: _theme.default.palette.hitachi.main
  },
  status: _theme.default.palette.status,
  support: _theme.default.palette.support
});
palette.grey = (0, _objectSpread2.default)({}, palette.grey, _theme.default.palette.grey);
var _default = palette;
exports.default = _default;
//# sourceMappingURL=palette.js.map