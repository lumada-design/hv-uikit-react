"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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
var Main = function Main(_ref) {
  var classes = _ref.classes,
      menuData = _ref.menuData,
      userData = _ref.userData,
      userLogout = _ref.userLogout,
      basePath = _ref.basePath,
      useRouter = _ref.useRouter,
      companyLogo = _ref.companyLogo,
      productLogo = _ref.productLogo;
  return _react.default.createElement(_AppBar.default, {
    color: "default"
  }, _react.default.createElement(_Toolbar.default, {
    variant: "dense",
    classes: classes.root
  }, _react.default.createElement(_Logo.default, {
    companyLogo: companyLogo,
    productLogo: productLogo
  }), _react.default.createElement(_Menu.default, {
    menuData: menuData,
    basePath: basePath,
    useRouter: useRouter
  }), _react.default.createElement(_User.default, {
    userData: userData,
    logout: userLogout
  })));
};

Main.propTypes = {
  classes: _propTypes.default.instanceOf(Object).isRequired,
  menuData: _propTypes.default.instanceOf(Array),
  userData: _propTypes.default.instanceOf(Object),
  userLogout: _propTypes.default.instanceOf(Function),
  basePath: _propTypes.default.string,
  useRouter: _propTypes.default.bool,
  companyLogo: _propTypes.default.string,
  productLogo: _propTypes.default.string
};
Main.defaultProps = {
  menuData: [],
  userData: {},
  userLogout: null,
  basePath: "",
  useRouter: false,
  companyLogo: null,
  productLogo: null
};
var _default = Main;
exports.default = _default;
//# sourceMappingURL=Main.js.map