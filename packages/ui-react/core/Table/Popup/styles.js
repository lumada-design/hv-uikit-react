"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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
    paper: {
      border: "solid 1px ".concat(theme.palette.grey.plain),
      padding: "".concat(theme.spacing.xs, "px"),
      marginTop: "5px"
    },
    moreVertContainer: {
      height: "100%"
    },
    moreVertBtn: {
      width: "100%",
      height: "100%",
      minWidth: "32px",
      padding: "0",
      "&:hover": {
        background: "".concat(theme.palette.grey.inspire),
        color: "".concat(theme.palette.common.white)
      }
    },
    activated: {
      background: "".concat(theme.palette.grey.inspire),
      color: "".concat(theme.palette.common.white)
    },
    actionBtn: {
      display: "block",
      width: "100%",
      color: "".concat(theme.palette.primary.main)
    }
  };
};

var _default = styles;
exports.default = _default;
//# sourceMappingURL=styles.js.map