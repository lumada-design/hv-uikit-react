"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _palette = _interopRequireDefault(require("../palette"));

/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */
var muiAppBar = {
  root: {
    borderTop: "4px solid ".concat(_palette.default.hitachi.main),
    "@media (min-width: 600px)": {
      height: "50px"
    }
  },
  colorDefault: {
    backgroundColor: _palette.default.common.white,
    contrastText: _palette.default.grey.inspire
  }
};
var _default = muiAppBar;
exports.default = _default;
//# sourceMappingURL=muiAppBar.js.map