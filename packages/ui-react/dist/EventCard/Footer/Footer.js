"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _CardActions = _interopRequireDefault(require("@material-ui/core/CardActions"));

var _Button = _interopRequireDefault(require("../../Button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      event = _ref.event;
  var id = event.id;
  return _react.default.createElement(_CardActions.default, {
    className: classes.root
  }, _react.default.createElement(_Button.default, null, "View"), _react.default.createElement(_Button.default, {
    disabled: true
  }, "Dismiss"), _react.default.createElement(_Button.default, {
    disabled: true
  }, "Assign"));
};

Footer.propTypes = {
  classes: _propTypes.default.instanceOf(Object).isRequired,
  event: _propTypes.default.instanceOf(Object).isRequired
};
var _default = Footer;
exports.default = _default;