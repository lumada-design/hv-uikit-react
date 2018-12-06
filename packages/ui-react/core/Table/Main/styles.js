"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */
var styles = function styles(theme) {
  return {
    getProps: function getProps() {
      return {
        style: (0, _objectSpread2.default)({}, theme.hv.typography.normalText, {
          fontFamily: theme.hv.typography.fontFamily,
          textAlign: "right",
          border: "none"
        })
      };
    },
    getTableProps: function getTableProps() {
      return {
        style: {
          border: "solid 1px ".concat(theme.palette.grey.plain),
          borderBottom: "none"
        }
      };
    },
    getTheadProps: function getTheadProps() {
      return {
        style: {
          background: theme.palette.grey.rainy,
          textAlign: "right",
          borderBottom: "solid 1px ".concat(theme.palette.grey.plain),
          boxShadow: "none"
        }
      };
    },
    getTrGroupProps: function getTrGroupProps() {
      return {
        style: {
          borderBottom: "solid 1px ".concat(theme.palette.grey.plain)
        }
      };
    },
    getTdProps: function getTdProps() {
      return {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          border: "none"
        }
      };
    },
    getTheadThProps: function getTheadThProps() {
      return {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          border: "none",
          boxShadow: "none"
        }
      };
    },
    rtSortIcon: {
      marginRight: "".concat(theme.spacing.xs, "px")
    }
  };
};

var _default = styles;
exports.default = _default;
//# sourceMappingURL=styles.js.map