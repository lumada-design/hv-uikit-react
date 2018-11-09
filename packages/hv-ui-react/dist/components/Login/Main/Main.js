"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Form = _interopRequireDefault(require("../Form"));

/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */
var Container = function Container(_ref) {
  var classes = _ref.classes,
      login = _ref.login;
  return _react["default"].createElement("div", {
    className: classes.root
  }, _react["default"].createElement("div", {
    className: classes.rightContainer
  }, _react["default"].createElement(_Typography["default"], {
    className: classes.title
  }, "Welcome"), _react["default"].createElement("div", {
    className: classes.formContainer
  }, _react["default"].createElement(_Form["default"], {
    login: login
  }))));
};

Container.propTypes = {
  classes: _propTypes["default"].instanceOf(Object).isRequired,
  login: _propTypes["default"].instanceOf(Function).isRequired
};
var _default = Container;
exports["default"] = _default;