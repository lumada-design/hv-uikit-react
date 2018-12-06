"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ChevronDown = _interopRequireDefault(require("./assets/ChevronDown.svg"));

var _ChevronUp = _interopRequireDefault(require("./assets/ChevronUp.svg"));

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
    selectRoot: {
      display: "flex",
      flexWrap: "wrap",
      margin: 0,
      background: theme.palette.grey.smokey
    },
    selectGridLabel: {
      paddingBottom: 0
    },
    selectGridLabelText: {
      lineHeight: "12px"
    },
    selectGridContent: {
      paddingTop: theme.spacing.xs
    },
    selectGridContentElement: {
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.body1.fontSize,
      color: theme.palette.text.primary,
      background: theme.palette.common.white,
      borderColor: theme.palette.grey.plain
    },
    chevron: {
      width: "16px",
      height: "16px",
      background: "url(".concat(_ChevronUp.default, ")")
    },
    chevronUp: {
      background: "url(".concat(_ChevronUp.default, ")")
    },
    chevronDown: {
      background: "url(".concat(_ChevronDown.default, ")")
    }
  };
};

var _default = styles;
exports.default = _default;
//# sourceMappingURL=styles.js.map