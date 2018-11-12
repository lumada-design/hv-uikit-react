"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _CardActions = _interopRequireDefault(require("@material-ui/core/CardActions"));

var _withConfig = _interopRequireDefault(require("../../../config/withConfig"));

var _Button = _interopRequireDefault(require("../../Button"));

var _Link = _interopRequireDefault(require("../../Link"));

/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */
var Footer = function Footer(_ref) {
  var classes = _ref.classes,
      data = _ref.data,
      basePath = _ref.basePath,
      useRouter = _ref.useRouter;
  var path = "".concat(basePath).concat(data.id);
  return _react["default"].createElement(_CardActions["default"], {
    className: classes.root
  }, _react["default"].createElement(_Link["default"], {
    href: path,
    useRouter: useRouter
  }, _react["default"].createElement(_Button["default"], null, "View")), _react["default"].createElement(_Button["default"], {
    disabled: true
  }, "Dismiss"), _react["default"].createElement(_Button["default"], {
    disabled: true
  }, "Assign"));
};

Footer.propTypes = {
  classes: _propTypes["default"].instanceOf(Object).isRequired,
  data: _propTypes["default"].instanceOf(Object).isRequired,
  basePath: _propTypes["default"].string.isRequired,
  useRouter: _propTypes["default"].bool.isRequired
};

var _default = (0, _withConfig["default"])(Footer);

exports["default"] = _default;