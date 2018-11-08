"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _withStyles = _interopRequireDefault(require("@material-ui/core/styles/withStyles"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _AccountCircle = _interopRequireDefault(require("@material-ui/icons/AccountCircle"));

var _styles = _interopRequireDefault(require("./styles"));

/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */
var User = function () {
  function User(_ref) {
    var classes = _ref.classes,
        userData = _ref.userData,
        logout = _ref.logout;
    if (!userData) return "";
    return _react["default"].createElement("div", {
      className: classes.user
    }, _react["default"].createElement("div", {
      className: classes.userInfo
    }, _react["default"].createElement(_Typography["default"], {
      className: classes.userName
    }, userData.name), _react["default"].createElement(_Typography["default"], {
      className: classes.userRole
    }, userData.role)), _react["default"].createElement(_IconButton["default"], {
      className: classes.userButton,
      onClick: function () {
        function onClick() {
          return logout();
        }

        return onClick;
      }()
    }, _react["default"].createElement(_AccountCircle["default"], {
      className: classes.userIcon
    })));
  }

  return User;
}();

User.propTypes = {
  classes: _propTypes["default"].instanceOf(Object).isRequired,
  userData: _propTypes["default"].instanceOf(Object),
  logout: _propTypes["default"].instanceOf(Function)
};
User.defaultProps = {
  userData: null,
  logout: null
};

var _default = (0, _withStyles["default"])(_styles["default"], {
  withTheme: true
})(User);

exports["default"] = _default;