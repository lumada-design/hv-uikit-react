"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _theme = _interopRequireDefault(require("@hv-ui/themes/dist/theme"));

/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */
var muiToolbar = {
  root: {
    alignItems: "center",
    "@media (min-width: 600px)": {
      minHeight: "46px"
    }
  },
  gutters: {
    paddingLeft: "".concat(_theme.default.spacing.sm, "px"),
    paddingRight: "".concat(_theme.default.spacing.sm, "px"),
    "@media (min-width:600px)": {
      paddingLeft: "".concat(_theme.default.spacing.sm, "px"),
      paddingRight: "".concat(_theme.default.spacing.sm, "px")
    }
  },
  dense: {
    minHeight: "46px"
  }
};
var _default = muiToolbar;
exports.default = _default;
//# sourceMappingURL=muiToolbar.js.map