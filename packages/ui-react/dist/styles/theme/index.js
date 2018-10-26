"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styles = require("@material-ui/core/styles");

var _typography = _interopRequireDefault(require("./typography"));

var _palette = _interopRequireDefault(require("./palette"));

var _theme = _interopRequireDefault(require("@hv-ui/themes/dist/theme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var muiTheme = (0, _styles.createMuiTheme)({
  shadows: Array(25).fill("none"),
  palette: _palette.default,
  typography: _typography.default,
  borderRadius: 0
});
muiTheme.spacing = _objectSpread({}, muiTheme.spacing, _theme.default.spacing);

var _default = Object.assign({}, muiTheme, {
  hv: _theme.default
});

exports.default = _default;