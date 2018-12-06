"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _withStyles = _interopRequireDefault(require("@material-ui/core/styles/withStyles"));

var _List = _interopRequireDefault(require("@material-ui/core/List"));

var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));

var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Link = _interopRequireDefault(require("../../Link"));

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
var Menu = function Menu(_ref) {
  var classes = _ref.classes,
      menuData = _ref.menuData,
      basePath = _ref.basePath,
      useRouter = _ref.useRouter;
  if (!menuData) return "";
  var menu = menuData.map(function (elem, i) {
    var key = "".concat(elem.label, "_").concat(i);
    var path = "".concat(basePath).concat(elem.path);
    return _react.default.createElement(_Link.default, {
      key: key,
      href: path,
      useRouter: useRouter
    }, _react.default.createElement(_ListItem.default, {
      button: true,
      className: classes.listItem
    }, _react.default.createElement("div", {
      className: (0, _classnames.default)(elem.isActive ? classes.selector : "")
    }), _react.default.createElement(_ListItemText.default, {
      disableTypography: true,
      className: (0, _classnames.default)(classes.listItemText, elem.isActive ? classes.selected : "")
    }, _react.default.createElement(_Typography.default, {
      className: classes.label
    }, elem.label))));
  });
  return _react.default.createElement(_List.default, {
    className: classes.menu
  }, menu);
};

Menu.propTypes = {
  classes: _propTypes.default.instanceOf(Object).isRequired,
  menuData: _propTypes.default.instanceOf(Array),
  basePath: _propTypes.default.string.isRequired,
  useRouter: _propTypes.default.bool.isRequired
};
Menu.defaultProps = {
  menuData: null
};
var _default = Menu;
exports.default = _default;
//# sourceMappingURL=Menu.js.map