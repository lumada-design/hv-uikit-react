"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _reactTable = _interopRequireWildcard(require("react-table"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Pagination = _interopRequireDefault(require("../Pagination"));

var _sortAsc = _interopRequireDefault(require("react-icons/lib/fa/sort-asc"));

var _sortDesc = _interopRequireDefault(require("react-icons/lib/fa/sort-desc"));

require("react-table/react-table.css");

var _styles = _interopRequireDefault(require("./styles.js"));

/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */
var HvTable =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(HvTable, _React$Component);

  function HvTable(props) {
    var _this;

    (0, _classCallCheck2.default)(this, HvTable);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(HvTable).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "getSortedComponent", function (id) {
      var sorted = _this.state.sorted;
      var sortInfo = sorted.filter(function (item) {
        return item.id === id;
      });

      if (sortInfo.length) {
        if (sortInfo[0].desc === true) return _react.default.createElement(_sortDesc.default, null);
        if (sortInfo[0].desc === false) return _react.default.createElement(_sortAsc.default, null);
      }

      return false;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onFetchDataInternal", function (tableState) {
      var onFetchData = _this.props.onFetchData;
      var _this$state = _this.state,
          initiallyLoaded = _this$state.initiallyLoaded,
          sortedFromState = _this$state.sorted;
      var pageSize = tableState.pageSize,
          page = tableState.page,
          sorted = tableState.sorted;

      if (initiallyLoaded) {
        var cursor = "".concat(page * pageSize);

        if (sortedFromState[0] !== sorted[0]) {
          cursor = "0";
        }

        onFetchData(cursor, pageSize, sorted);
      }
    });
    _this.state = {
      sorted: props.defaultSorted || [],
      pages: null,
      initiallyLoaded: false
    };
    return _this;
  }

  (0, _createClass2.default)(HvTable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var initiallyLoaded = this.state.initiallyLoaded;

      if (!initiallyLoaded) {
        this.state.initiallyLoaded = true;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          classes = _this$props.classes,
          cellHeight = _this$props.cellHeight,
          columns = _this$props.columns,
          data = _this$props.data,
          defaultPageSize = _this$props.defaultPageSize,
          defaultSorted = _this$props.defaultSorted,
          headerHeight = _this$props.headerHeight,
          resizable = _this$props.resizable,
          onPageSizeChange = _this$props.onPageSizeChange,
          pages = _this$props.pages;
      var composedStyles = (0, _styles.default)(this.props.theme);
      var ColumnSettings = (0, _objectSpread2.default)({}, _reactTable.ReactTableDefaults.column, {
        style: {
          height: cellHeight
        },
        headerStyle: {
          height: headerHeight
        },
        Header: function Header(props) {
          var Sorted = _this2.getSortedComponent(props.column.id);

          return _react.default.createElement(_react.default.Fragment, null, Sorted && _react.default.createElement("span", {
            className: classes.rtSortIcon
          }, Sorted), _react.default.createElement("span", null, props.column.headerText));
        }
      });
      Object.assign(_reactTable.ReactTableDefaults, {
        column: ColumnSettings,
        resizable: resizable,
        defaultPageSize: defaultPageSize
      });
      return _react.default.createElement(_reactTable.default, (0, _extends2.default)({}, composedStyles, {
        data: data,
        onSortedChange: function onSortedChange(sorted) {
          return _this2.setState({
            sorted: sorted
          });
        },
        columns: columns,
        className: "-highlight",
        PaginationComponent: _Pagination.default,
        manual: true,
        onFetchData: this.onFetchDataInternal,
        onPageSizeChange: onPageSizeChange,
        pages: pages,
        defaultSorted: defaultSorted
      }));
    }
  }]);
  return HvTable;
}(_react.default.Component);

HvTable.propTypes = {
  columns: _propTypes.default.instanceOf(Object).isRequired,
  data: _propTypes.default.instanceOf(Object).isRequired,
  defaultPageSize: _propTypes.default.number,
  resizable: _propTypes.default.bool,
  pageText: _propTypes.default.string
};
HvTable.defaultProps = {
  columns: [],
  data: [],
  defaultPageSize: 10,
  resizable: true,
  pageText: ""
};
var _default = HvTable;
exports.default = _default;
//# sourceMappingURL=Main.js.map