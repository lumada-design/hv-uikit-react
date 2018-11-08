"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */
var HvButton = function () {
  function HvButton(props) {
    var classes = props.classes,
        children = props.children,
        disabled = props.disabled;
    return _react["default"].createElement(_Button["default"], {
      className: classes.root,
      disabled: disabled,
      disableRipple: true
    }, children);
  }

  return HvButton;
}();

HvButton.propTypes = {
  classes: _propTypes["default"].instanceOf(Object).isRequired,
  children: _propTypes["default"].string.isRequired,
  disabled: _propTypes["default"].bool
};
HvButton.defaultProps = {
  disabled: false
};
var _default = HvButton;
exports["default"] = _default;