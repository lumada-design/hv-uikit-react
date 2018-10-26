"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createPalette = _interopRequireDefault(require("@material-ui/core/styles/createPalette"));

var _theme = _interopRequireDefault(require("@hv-ui/themes/dist/theme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var palette = (0, _createPalette.default)({
  common: _theme.default.palette.common,
  primary: {
    light: _theme.default.palette.primary.light,
    main: _theme.default.palette.primary.main
  },
  secondary: {
    light: _theme.default.palette.secondary.light,
    main: _theme.default.palette.secondary.main
  },
  status: _theme.default.palette.status,
  support: _theme.default.palette.support
});
palette.grey = _objectSpread({}, palette.grey, _theme.default.palette.grey);
var _default = palette;
exports.default = _default;