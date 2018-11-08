"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _AppBar = _interopRequireDefault(require("@material-ui/core/AppBar"));

var _Toolbar = _interopRequireDefault(require("@material-ui/core/Toolbar"));

var _Logo = _interopRequireDefault(require("../Logo"));

var _Menu = _interopRequireDefault(require("../Menu"));

var _User = _interopRequireDefault(require("../User"));

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
  function Main(_ref) {
    var classes = _ref.classes,
        menuData = _ref.menuData,
        userData = _ref.userData,
        userLogout = _ref.userLogout,
        useRouter = _ref.useRouter;
    return _react["default"].createElement(_AppBar["default"], {
      color: "default"
    }, _react["default"].createElement(_Toolbar["default"], null, _react["default"].createElement(_Logo["default"], null), _react["default"].createElement(_Menu["default"], {
      menuData: menuData,
      useRouter: useRouter
    }), _react["default"].createElement(_User["default"], {
      userData: userData,
      logout: userLogout
    })));
  }

  return Main;
}();

Main.propTypes = {
  classes: _propTypes["default"].instanceOf(Object).isRequired,
  menuData: _propTypes["default"].instanceOf(Array),
  userData: _propTypes["default"].instanceOf(Object),
  userLogout: _propTypes["default"].instanceOf(Function),
  useRouter: _propTypes["default"].bool
};
Main.defaultProps = {
  menuData: [],
  userData: {},
  userLogout: null,
  useRouter: false
};
var _default = Main;
exports["default"] = _default;