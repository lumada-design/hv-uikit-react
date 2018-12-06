"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _ChevronDown = _interopRequireDefault(require("../assets/ChevronDown.svg"));

var _ArrowFirst = _interopRequireDefault(require("../assets/ArrowFirst.svg"));

var _ArrowLeft = _interopRequireDefault(require("../assets/ArrowLeft.svg"));

var _ArrowRight = _interopRequireDefault(require("../assets/ArrowRight.svg"));

var _ArrowLast = _interopRequireDefault(require("../assets/ArrowLast.svg"));

var _ArrowFirstDisabled = _interopRequireDefault(require("../assets/ArrowFirstDisabled.svg"));

var _ArrowLeftDisabled = _interopRequireDefault(require("../assets/ArrowLeftDisabled.svg"));

var _ArrowRightDisabled = _interopRequireDefault(require("../assets/ArrowRightDisabled.svg"));

var _ArrowLastDisabled = _interopRequireDefault(require("../assets/ArrowLastDisabled.svg"));

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
    paginationContainer: {
      position: "relative",
      zIndex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "stretch",
      flexWrap: "wrap",
      padding: "3px",
      margin: "".concat(theme.spacing.md, "px 0")
    },
    paginationBtn: {
      width: "32px",
      padding: "0",
      height: "100%"
    },
    pageSizeOptions: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      left: "0"
    },
    pageSizeOptionsSelect: (0, _defineProperty2.default)({
      "-webkit-appearance": "none",
      "-webkit-border-radius": "0px",
      background: "#fff",
      padding: "5px 7px",
      fontSize: "inherit",
      fontWeight: "normal",
      outline: "none",
      textIndent: "".concat(theme.spacing.sm, "px"),
      width: "78px",
      textAlign: "center",
      border: "solid 1px ".concat(theme.palette.grey.plain)
    }, "background", "url(".concat(_ChevronDown.default, ") no-repeat right")),
    pageNavigator: {
      display: "flex",
      alignItems: "stretch"
    },
    pageInfo: {
      display: "inline-block",
      margin: "3px ".concat(theme.spacing.xs, "px"),
      whiteSpace: "nowrap"
    },
    pageJump: {
      display: "inline-block"
    },
    rowText: (0, _objectSpread2.default)({}, theme.hv.typography.normalText, {
      marginLeft: "".concat(theme.spacing.xs, "px")
    }),
    pageJumpInput: (0, _objectSpread2.default)({}, theme.hv.typography.normalText, {
      width: "50px",
      textAlign: "right",
      margin: "0 ".concat(theme.spacing.xs, "px"),
      padding: "5px",
      borderRadius: "0",
      border: "solid 1px ".concat(theme.palette.grey.plain)
    }),
    arrowFirst: {
      background: "url(".concat(_ArrowFirst.default, ")"),
      cursor: "pointer"
    },
    arrowLeft: {
      background: "url(".concat(_ArrowLeft.default, ")"),
      cursor: "pointer"
    },
    arrowRight: {
      background: "url(".concat(_ArrowRight.default, ")"),
      cursor: "pointer"
    },
    arrowLast: {
      background: "url(".concat(_ArrowLast.default, ")"),
      cursor: "pointer"
    },
    arrowFirstDisabled: {
      background: "url(".concat(_ArrowFirstDisabled.default, ")")
    },
    arrowLeftDisabled: {
      background: "url(".concat(_ArrowLeftDisabled.default, ")")
    },
    arrowRightDisabled: {
      background: "url(".concat(_ArrowRightDisabled.default, ")")
    },
    arrowLastDisabled: {
      background: "url(".concat(_ArrowLastDisabled.default, ")")
    }
  };
};

var _default = styles;
exports.default = _default;
//# sourceMappingURL=styles.js.map