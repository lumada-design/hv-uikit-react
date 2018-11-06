"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _CardHeader = _interopRequireDefault(require("@material-ui/core/CardHeader"));

var _ErrorRounded = _interopRequireDefault(require("@material-ui/icons/ErrorRounded"));

var _CheckCircle = _interopRequireDefault(require("@material-ui/icons/CheckCircle"));

/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */
var Header = function Header(_ref) {
  var classes = _ref.classes,
      event = _ref.event;
  var name = event.name,
      createdDate = event.createdDate;
  var criticality = event.criticality || "";

  var CriticalityIcon = function CriticalityIcon() {
    switch (criticality.toLowerCase()) {
      case "info":
        return _react["default"].createElement(_CheckCircle["default"], {
          className: (0, _classnames["default"])(classes.icon, classes.info)
        });

      case "warning":
        return _react["default"].createElement(_ErrorRounded["default"], {
          className: (0, _classnames["default"])(classes.icon, classes.warning)
        });

      case "critical":
        return _react["default"].createElement(_ErrorRounded["default"], {
          className: (0, _classnames["default"])(classes.icon, classes.critical)
        });

      default:
        return null;
    }
  };

  return _react["default"].createElement(_CardHeader["default"], {
    title: name,
    className: classes.root,
    subheader: createdDate,
    action: _react["default"].createElement(CriticalityIcon, null),
    classes: {
      title: classes.title,
      subheader: classes.subheader
    }
  });
};

Header.propTypes = {
  classes: _propTypes["default"].instanceOf(Object).isRequired,
  event: _propTypes["default"].instanceOf(Object).isRequired
};
var _default = Header;
exports["default"] = _default;