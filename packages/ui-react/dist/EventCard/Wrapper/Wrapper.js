"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Card = _interopRequireDefault(require("@material-ui/core/Card"));

var _Header = _interopRequireDefault(require("../Header"));

var _Content = _interopRequireDefault(require("../Content"));

var _Footer = _interopRequireDefault(require("../Footer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Wrapper = function Wrapper(props) {
  var classes = props.classes,
      event = props.event;
  var criticality = event.criticality || "";
  var status = (0, _classnames.default)(_defineProperty({}, classes["".concat(criticality.toLowerCase())], criticality));
  return _react.default.createElement(_Card.default, {
    className: (0, _classnames.default)(classes.root, status)
  }, _react.default.createElement(_Header.default, {
    event: event
  }), _react.default.createElement(_Content.default, {
    event: event
  }), _react.default.createElement(_Footer.default, {
    event: event
  }));
};

Wrapper.propTypes = {
  classes: _propTypes.default.instanceOf(Object).isRequired,
  event: _propTypes.default.instanceOf(Object).isRequired
};
var _default = Wrapper;
exports.default = _default;