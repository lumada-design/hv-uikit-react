"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("@material-ui/core/styles");

var _2 = _interopRequireWildcard(require("."));

var _theme = _interopRequireDefault(require("../theme"));

/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */
var HvProvider = function HvProvider(_ref) {
  var children = _ref.children,
      theme = _ref.theme,
      router = _ref.router,
      defaults = _ref.defaults;

  var pTheme = _lodash["default"].merge(_theme["default"], theme);

  var pConfig = _lodash["default"].assign(_2["default"], defaults, {
    router: router
  });

  return _react["default"].createElement(_styles.MuiThemeProvider, {
    theme: pTheme,
    sheetsManager: new Map()
  }, _react["default"].createElement(_2.ConfigProvider, {
    value: pConfig
  }, children));
};

HvProvider.propTypes = {
  children: _propTypes["default"].node.isRequired,
  theme: _propTypes["default"].instanceOf(Object),
  router: _propTypes["default"].instanceOf(Object),
  defaults: _propTypes["default"].instanceOf(Object)
};
HvProvider.defaultProps = {
  theme: null,
  router: null,
  defaults: null
};
var _default = HvProvider;
exports["default"] = _default;