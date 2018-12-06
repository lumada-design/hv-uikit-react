"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _moment = _interopRequireDefault(require("moment"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _DayPickerInput = _interopRequireDefault(require("react-day-picker/DayPickerInput"));

var _reactDayPicker = require("react-day-picker");

require("react-day-picker/lib/style.css");

require("./styles.css");

/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */
var INITIAL_STATE = {
  from: null,
  to: null
};

var HvDatePicker =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(HvDatePicker, _React$Component);

  function HvDatePicker(props) {
    var _this;

    (0, _classCallCheck2.default)(this, HvDatePicker);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(HvDatePicker).call(this, props));
    _this.handleDayChange = _this.handleDayChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleReset = _this.handleReset.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.state = INITIAL_STATE;
    return _this;
  }

  (0, _createClass2.default)(HvDatePicker, [{
    key: "handleDayChange",
    value: function handleDayChange(day) {
      var range = _reactDayPicker.DateUtils.addDayToRange(day, this.state);

      var handleDateChange = this.props.handleDateChange;
      this.setState(range);
      handleDateChange(range);
    }
  }, {
    key: "handleReset",
    value: function handleReset() {
      var handleDateChange = this.props.handleDateChange;
      this.setState(INITIAL_STATE);
      handleDateChange(INITIAL_STATE);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          from = _this$state.from,
          to = _this$state.to;
      var _this$props = this.props,
          classes = _this$props.classes,
          label = _this$props.label,
          numberOfMonths = _this$props.numberOfMonths;
      var modifiers = {
        start: from,
        end: to
      };
      var dateFormat = "MM/DD/YY";
      var rangeFrom = from ? (0, _moment.default)(from).format(dateFormat) : "";
      var rangeEnd = to ? (0, _moment.default)(to).format(dateFormat) : "";
      var range = from === to ? rangeFrom : "".concat(rangeFrom, " - ").concat(rangeEnd);

      var Label = function Label() {
        return _react.default.createElement(_Typography.default, {
          variant: "subtitle2",
          className: (0, _classnames.default)([classes.label])
        }, label);
      };

      var Controls = function Controls() {
        return _react.default.createElement(_Typography.default, {
          variant: "subtitle2",
          onClick: _this2.handleReset,
          className: (0, _classnames.default)([classes.reset])
        }, "x");
      };

      return _react.default.createElement("div", {
        className: classes.wrapper
      }, _react.default.createElement(Controls, null), label ? _react.default.createElement(Label, {
        label: label
      }) : "", _react.default.createElement("div", {
        className: "DayPickerWrapper"
      }, _react.default.createElement(_DayPickerInput.default, {
        value: range,
        onDayChange: this.handleDayChange,
        dayPickerProps: {
          selectedDays: [from, {
            from: from,
            to: to
          }],
          modifiers: modifiers,
          numberOfMonths: numberOfMonths,
          month: new Date()
        },
        hideOnDayClick: false,
        placeholder: "Select range..."
      })));
    }
  }]);
  return HvDatePicker;
}(_react.default.Component);

(0, _defineProperty2.default)(HvDatePicker, "defaultProps", {
  numberOfMonths: 1
});
HvDatePicker.propTypes = {
  classes: _propTypes.default.instanceOf(Object).isRequired,
  handleDateChange: _propTypes.default.func,
  label: _propTypes.default.string,
  numberOfMonths: _propTypes.default.number
};
HvDatePicker.defaultProps = {
  handleDateChange: function handleDateChange() {},
  label: ""
};
var _default = HvDatePicker;
exports.default = _default;
//# sourceMappingURL=DatePicker.js.map