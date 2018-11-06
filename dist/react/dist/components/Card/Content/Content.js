"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _CardContent = _interopRequireDefault(require("@material-ui/core/CardContent"));

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */
var Content = function Content(_ref) {
  var classes = _ref.classes,
      event = _ref.event;
  var outcome = event.outcome,
      assignee = event.assignee,
      assetId = event.assetId,
      description = event.description;
  return _react["default"].createElement(_CardContent["default"], {
    className: classes.content
  }, _react["default"].createElement(_Grid["default"], {
    container: true
  }, _react["default"].createElement(_Grid["default"], {
    item: true,
    xs: 4,
    className: classes.item
  }, _react["default"].createElement(_Typography["default"], {
    className: classes.label
  }, "Status"), _react["default"].createElement(_Typography["default"], {
    className: classes.text
  }, outcome ? outcome.toLowerCase() : "")), _react["default"].createElement(_Grid["default"], {
    item: true,
    xs: 8,
    className: classes.item
  }, _react["default"].createElement(_Typography["default"], {
    className: classes.label
  }, "Assignee"), _react["default"].createElement(_Typography["default"], {
    className: classes.text
  }, assignee))), _react["default"].createElement(_Grid["default"], {
    item: true,
    xs: 12,
    className: classes.item
  }, _react["default"].createElement(_Typography["default"], {
    className: classes.label
  }, "Related Assets"), _react["default"].createElement(_Typography["default"], {
    className: classes.text
  }, assetId)), _react["default"].createElement(_Grid["default"], {
    item: true,
    xs: 12,
    className: classes.item
  }, _react["default"].createElement(_Typography["default"], {
    className: classes.label
  }, "Description"), _react["default"].createElement(_Typography["default"], {
    className: classes.text
  }, description)));
};

Content.propTypes = {
  classes: _propTypes["default"].instanceOf(Object).isRequired,
  event: _propTypes["default"].instanceOf(Object).isRequired
};
var _default = Content;
exports["default"] = _default;