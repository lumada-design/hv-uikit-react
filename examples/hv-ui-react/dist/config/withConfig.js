"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _configContext = require("./configContext");

/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */
var withConfig = function withConfig(Component) {
  return function (props) {
    return _react["default"].createElement(_configContext.ConfigConsumer, null, function (config) {
      return _react["default"].createElement(Component, (0, _extends2["default"])({}, props, {
        config: config
      }));
    });
  };
};

var _default = withConfig;
exports["default"] = _default;