"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _withConfig = _interopRequireDefault(require("../../config/withConfig"));

/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */
var HvLink = function () {
  function HvLink(props) {
    var classes = props.classes,
        children = props.children,
        href = props.href,
        config = props.config,
        useRouter = props.useRouter;

    var handleClick = function () {
      function handleClick(e) {
        if (useRouter && config.router) {
          e.preventDefault();
          config.router.push(href);
        }
      }

      return handleClick;
    }();

    return _react["default"].createElement("a", {
      href: href,
      onClick: handleClick,
      className: classes.a
    }, children);
  }

  return HvLink;
}();

HvLink.propTypes = {
  classes: _propTypes["default"].instanceOf(Object).isRequired,
  children: _propTypes["default"].node.isRequired,
  href: _propTypes["default"].string.isRequired,
  config: _propTypes["default"].instanceOf(Object).isRequired,
  useRouter: _propTypes["default"].bool
};
HvLink.defaultProps = {
  useRouter: false
};

var _default = (0, _withConfig["default"])(HvLink);

exports["default"] = _default;