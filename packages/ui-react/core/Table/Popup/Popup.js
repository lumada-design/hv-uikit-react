"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _Popover = _interopRequireDefault(require("@material-ui/core/Popover"));

var _MoreVert = _interopRequireDefault(require("@material-ui/icons/MoreVert"));

/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */
var Popup =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Popup, _React$Component);

  function Popup() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Popup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Popup)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      anchorEl: null
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleClick", function (event) {
      _this.setState({
        anchorEl: event.currentTarget
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleClose", function () {
      _this.setState({
        anchorEl: null
      });
    });
    return _this;
  }

  (0, _createClass2.default)(Popup, [{
    key: "render",
    value: function render() {
      var classes = this.props.classes;
      var anchorEl = this.state.anchorEl;
      var open = Boolean(anchorEl);
      return _react.default.createElement("div", {
        className: classes.moreVertContainer
      }, _react.default.createElement(_Button.default, {
        "aria-owns": open ? "simple-popper" : undefined,
        "aria-haspopup": "true",
        onClick: this.handleClick,
        className: (0, _classnames.default)(classes.moreVertBtn, (0, _defineProperty2.default)({}, classes.activated, anchorEl))
      }, _react.default.createElement(_MoreVert.default, null)), _react.default.createElement(_Popover.default, {
        id: "simple-popper",
        classes: {
          paper: classes.paper
        },
        open: open,
        anchorEl: anchorEl,
        onClose: this.handleClose,
        anchorOrigin: {
          vertical: "top",
          horizontal: "left"
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "right"
        }
      }, _react.default.createElement(_Button.default, {
        className: classes.actionBtn
      }, "View"), _react.default.createElement(_Button.default, {
        className: classes.actionBtn
      }, "Dismiss")));
    }
  }]);
  return Popup;
}(_react.default.Component);

var _default = Popup;
exports.default = _default;
//# sourceMappingURL=Popup.js.map