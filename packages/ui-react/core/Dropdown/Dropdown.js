"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

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

var _reactSelect = _interopRequireWildcard(require("react-select"));

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */
var HvDropdown =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(HvDropdown, _React$Component);

  function HvDropdown(props) {
    var _this;

    (0, _classCallCheck2.default)(this, HvDropdown);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(HvDropdown).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "styles", {
      dropdownIndicator: function dropdownIndicator(base, theme) {
        var _ref = theme || {},
            _ref$palette = _ref.palette;

        _ref$palette = _ref$palette === void 0 ? {
          grey: {}
        } : _ref$palette;
        var greyInspire = _ref$palette.grey.inspire;
        return (0, _objectSpread2.default)({}, base, {
          padding: "5px",
          color: greyInspire
        });
      },
      control: function control(base, state, theme, dropdownExpanded) {
        var _ref2 = theme || {},
            _ref2$palette = _ref2.palette;

        _ref2$palette = _ref2$palette === void 0 ? {
          primary: {},
          grey: {}
        } : _ref2$palette;
        var primaryMain = _ref2$palette.primary.main,
            _ref2$palette$grey = _ref2$palette.grey,
            greyPlain = _ref2$palette$grey.plain,
            greyInspire = _ref2$palette$grey.inspire;
        return (0, _objectSpread2.default)({}, base, {
          borderColor: dropdownExpanded ? greyInspire : greyPlain,
          borderBottomColor: dropdownExpanded ? "transparent" : "inherit",
          boxShadow: "none",
          "&:hover": {
            borderColor: dropdownExpanded ? greyInspire : primaryMain,
            borderBottomColor: dropdownExpanded ? "transparent" : primaryMain,
            cursor: "pointer"
          }
        });
      },
      menu: function menu(base, theme) {
        var _ref3 = theme || {},
            _ref3$palette = _ref3.palette;

        _ref3$palette = _ref3$palette === void 0 ? {
          grey: {}
        } : _ref3$palette;
        var greyInspire = _ref3$palette.grey.inspire;
        return (0, _objectSpread2.default)({}, base, {
          marginTop: "-1px",
          boxShadow: "none",
          border: "solid 1px ".concat(greyInspire),
          borderTop: "transparent"
        });
      },
      menuList: function menuList(base, theme) {
        var _ref4 = theme || {},
            _ref4$spacing = _ref4.spacing;

        _ref4$spacing = _ref4$spacing === void 0 ? {} : _ref4$spacing;
        var spacingXs = _ref4$spacing.xs;
        return (0, _objectSpread2.default)({}, base, {
          margin: spacingXs,
          padding: "0px"
        });
      },
      option: function option(base, state, theme) {
        var _ref5 = theme || {},
            _ref5$palette = _ref5.palette;

        _ref5$palette = _ref5$palette === void 0 ? {
          grey: {},
          common: {}
        } : _ref5$palette;
        var _ref5$palette$grey = _ref5$palette.grey,
            greyClear = _ref5$palette$grey.clear,
            greyRainy = _ref5$palette$grey.rainy,
            greyInspire = _ref5$palette$grey.inspire,
            commonWhite = _ref5$palette.common.white,
            _ref5$spacing = _ref5.spacing;
        _ref5$spacing = _ref5$spacing === void 0 ? {} : _ref5$spacing;
        var spacingXs = _ref5$spacing.xs;
        return (0, _objectSpread2.default)({}, base, {
          padding: spacingXs,
          lineHeight: "12px",
          background: state.isSelected ? greyRainy : commonWhite,
          color: greyInspire,
          "&:hover": {
            background: greyClear,
            cursor: "pointer"
          }
        });
      }
    });
    _this.state = {
      dropdownExpanded: false,
      selectedOption: props.value
    };
    return _this;
  }

  (0, _createClass2.default)(HvDropdown, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          theme = _this$props.theme,
          classes = _this$props.classes,
          label = _this$props.label,
          options = _this$props.options,
          disabled = _this$props.disabled,
          onChange = _this$props.onChange;
      var _this$state = this.state,
          dropdownExpanded = _this$state.dropdownExpanded,
          selectedOption = _this$state.selectedOption;
      var reactSelectTheme = (0, _objectSpread2.default)({}, _reactSelect.defaultTheme, {
        borderRadius: 0,
        spacing: {
          controlHeight: 32,
          baseUnit: 4,
          menuGutter: 0
        }
      });
      var reactSelectStyles = {
        dropdownIndicator: function dropdownIndicator(base) {
          return _this2.styles.dropdownIndicator(base, theme);
        },
        control: function control(base, state) {
          return _this2.styles.control(base, state, theme, dropdownExpanded);
        },
        menu: function menu(base) {
          return _this2.styles.menu(base, theme);
        },
        menuList: function menuList(base) {
          return _this2.styles.menuList(base, theme);
        },
        option: function option(base, state) {
          return _this2.styles.option(base, state, theme);
        }
      };

      var getLabelText = function getLabelText(l) {
        return _react.default.createElement(_Grid.default, {
          item: true,
          xs: 12,
          className: classes.selectGridLabel
        }, _react.default.createElement(_Typography.default, {
          variant: "subtitle2",
          className: classes.selectGridLabelText
        }, l));
      };

      var HvChevron = function HvChevron() {
        var _classNames;

        return _react.default.createElement("div", {
          className: (0, _classnames.default)(classes.chevron, (_classNames = {}, (0, _defineProperty2.default)(_classNames, classes.chevronUp, dropdownExpanded), (0, _defineProperty2.default)(_classNames, classes.chevronDown, !dropdownExpanded), _classNames))
        });
      };

      var IndicatorSeparator = null;

      var DropdownIndicator = function DropdownIndicator(props) {
        return _reactSelect.components.DropdownIndicator && _react.default.createElement(_reactSelect.components.DropdownIndicator, props, _react.default.createElement(HvChevron, null));
      };

      var selectGridContentStyles = (0, _classnames.default)((0, _defineProperty2.default)({}, classes.selectGridContent, label !== null));
      return _react.default.createElement(_Grid.default, {
        container: true
      }, label !== null ? getLabelText(label) : null, _react.default.createElement(_Grid.default, {
        item: true,
        xs: 12,
        className: selectGridContentStyles
      }, _react.default.createElement(_reactSelect.default, {
        value: selectedOption,
        className: classes.selectGridContentElement,
        components: {
          IndicatorSeparator: IndicatorSeparator,
          DropdownIndicator: DropdownIndicator
        },
        options: options,
        menuIsOpen: dropdownExpanded,
        onMenuOpen: function onMenuOpen() {
          return _this2.setState({
            dropdownExpanded: true
          });
        },
        onMenuClose: function onMenuClose() {
          return _this2.setState({
            dropdownExpanded: false
          });
        },
        theme: reactSelectTheme,
        styles: reactSelectStyles,
        isDisabled: disabled,
        onChange: onChange
      })));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      return (0, _objectSpread2.default)({}, state, {
        selectedOption: props.value
      });
    }
  }]);
  return HvDropdown;
}(_react.default.Component);

HvDropdown.propTypes = {
  classes: _propTypes.default.instanceOf(Object).isRequired,
  options: _propTypes.default.instanceOf(Array),
  value: _propTypes.default.instanceOf(Object),
  label: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  onChange: _propTypes.default.instanceOf(Function)
};
HvDropdown.defaultProps = {
  label: null,
  options: [],
  value: null,
  disabled: false,
  onChange: function onChange() {}
};
var _default = HvDropdown;
exports.default = _default;
//# sourceMappingURL=Dropdown.js.map