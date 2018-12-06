"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _withStyles = _interopRequireDefault(require("@material-ui/core/styles/withStyles"));

var _styles = _interopRequireDefault(require("./styles"));

var _Content = _interopRequireDefault(require("./Content"));

/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */
var _default = (0, _withStyles.default)(_styles.default, {
  withTheme: true
})(_Content.default);

exports.default = _default;
//# sourceMappingURL=index.js.map