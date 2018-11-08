"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Card = _interopRequireDefault(require("@material-ui/core/Card"));

var _Header = _interopRequireDefault(require("../Header"));

var _Content = _interopRequireDefault(require("../Content"));

var _Footer = _interopRequireDefault(require("../Footer"));

/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */
var Main = function () {
  function Main(props) {
    var classes = props.classes,
        data = props.data,
        useRouter = props.useRouter;
    var criticality = data.criticality || "";
    var status = (0, _classnames["default"])((0, _defineProperty2["default"])({}, classes["".concat(criticality.toLowerCase())], criticality));
    return _react["default"].createElement(_Card["default"], {
      className: (0, _classnames["default"])(classes.root, status)
    }, _react["default"].createElement(_Header["default"], {
      data: data
    }), _react["default"].createElement(_Content["default"], {
      data: data
    }), _react["default"].createElement(_Footer["default"], {
      data: data,
      useRouter: useRouter
    }));
  }

  return Main;
}();

Main.propTypes = {
  classes: _propTypes["default"].instanceOf(Object).isRequired,
  data: _propTypes["default"].instanceOf(Object).isRequired,
  useRouter: _propTypes["default"].bool
};
Main.defaultProps = {
  useRouter: false
};
var _default = Main;
exports["default"] = _default;