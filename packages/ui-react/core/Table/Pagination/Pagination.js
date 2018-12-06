"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var ReactTablePagination =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ReactTablePagination, _Component);

  function ReactTablePagination(props) {
    var _this;

    (0, _classCallCheck2.default)(this, ReactTablePagination);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ReactTablePagination).call(this));
    _this.getSafePage = _this.getSafePage.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.changePage = _this.changePage.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.applyPage = _this.applyPage.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.state = {
      page: props.page
    };
    return _this;
  }

  (0, _createClass2.default)(ReactTablePagination, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.page !== nextProps.page) {
        this.setState({
          page: nextProps.page
        });
      }
    }
  }, {
    key: "getSafePage",
    value: function getSafePage(page) {
      if (Number.isNaN(page)) {
        page = this.props.page;
      }

      return Math.min(Math.max(page, 0), this.props.pages - 1);
    }
  }, {
    key: "changePage",
    value: function changePage(page) {
      page = this.getSafePage(page);
      this.setState({
        page: page
      });

      if (this.props.page !== page) {
        this.props.onPageChange(page);
      }
    }
  }, {
    key: "applyPage",
    value: function applyPage(e) {
      if (e) {
        e.preventDefault();
      }

      var page = this.state.page;
      this.changePage(page === "" ? this.props.page : page);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var defaultButton = function defaultButton(_ref) {
        var className = _ref.className,
            props = (0, _objectWithoutProperties2.default)(_ref, ["className"]);
        return _react.default.createElement("div", (0, _extends2.default)({
          className: (0, _classnames.default)(classes.paginationBtn, className)
        }, props));
      };

      var _this$props = this.props,
          pages = _this$props.pages,
          page = _this$props.page,
          classes = _this$props.classes,
          showPageSizeOptions = _this$props.showPageSizeOptions,
          pageSizeOptions = _this$props.pageSizeOptions,
          pageSize = _this$props.pageSize,
          showPageJump = _this$props.showPageJump,
          canPrevious = _this$props.canPrevious,
          canNext = _this$props.canNext,
          onPageSizeChange = _this$props.onPageSizeChange,
          className = _this$props.className,
          _this$props$PreviousC = _this$props.PreviousComponent,
          PreviousComponent = _this$props$PreviousC === void 0 ? defaultButton : _this$props$PreviousC,
          _this$props$NextCompo = _this$props.NextComponent,
          NextComponent = _this$props$NextCompo === void 0 ? defaultButton : _this$props$NextCompo,
          _this$props$FirstPage = _this$props.FirstPageComponent,
          FirstPageComponent = _this$props$FirstPage === void 0 ? defaultButton : _this$props$FirstPage,
          _this$props$LastPageC = _this$props.LastPageComponent,
          LastPageComponent = _this$props$LastPageC === void 0 ? defaultButton : _this$props$LastPageC;
      return _react.default.createElement("div", {
        className: (0, _classnames.default)(className, classes.paginationContainer)
      }, _react.default.createElement("div", {
        className: classes.pageSizeOptions
      }, showPageSizeOptions && _react.default.createElement("span", {
        className: "select-wrap -pageSizeOptions"
      }, _react.default.createElement("select", {
        className: classes.pageSizeOptionsSelect,
        "aria-label": this.props.rowsSelectorText,
        onChange: function onChange(e) {
          return onPageSizeChange(Number(e.target.value));
        },
        value: pageSize
      }, pageSizeOptions.map(function (option, i) {
        return (// eslint-disable-next-line react/no-array-index-key
          _react.default.createElement("option", {
            key: i,
            value: option
          }, "".concat(option))
        );
      })), _react.default.createElement("span", {
        className: classes.rowText
      }, "rows"))), _react.default.createElement("div", {
        className: classes.pageNavigator
      }, _react.default.createElement(FirstPageComponent, {
        className: !canPrevious ? classes.arrowFirstDisabled : classes.arrowFirst,
        onClick: function onClick() {
          if (!canPrevious) return;

          _this2.changePage(0);
        }
      }), _react.default.createElement(PreviousComponent, {
        className: !canPrevious ? classes.arrowLeftDisabled : classes.arrowLeft,
        onClick: function onClick() {
          if (!canPrevious) return;

          _this2.changePage(page - 1);
        },
        disabled: !canPrevious
      }), _react.default.createElement("span", {
        className: classes.pageInfo
      }, this.props.pageText, " ", showPageJump ? _react.default.createElement("div", {
        className: classes.pageJump
      }, _react.default.createElement("input", {
        className: classes.pageJumpInput,
        "aria-label": this.props.pageJumpText,
        type: "text",
        onChange: function onChange(e) {
          var val = e.target.value;
          var page = val - 1;

          if (val === "") {
            return _this2.setState({
              page: val
            });
          }

          _this2.setState({
            page: _this2.getSafePage(page)
          });
        },
        value: this.state.page === "" ? "" : this.state.page + 1,
        onBlur: this.applyPage,
        onKeyPress: function onKeyPress(e) {
          if (e.which === 13 || e.keyCode === 13) {
            _this2.applyPage();
          }
        }
      })) : _react.default.createElement("span", {
        className: "-currentPage"
      }, page + 1), " ", this.props.ofText, " ", _react.default.createElement("span", {
        className: "-totalPages"
      }, pages || 1)), _react.default.createElement(NextComponent, {
        className: !canNext ? classes.arrowRightDisabled : classes.arrowRight,
        onClick: function onClick() {
          if (!canNext) return;

          _this2.changePage(page + 1);
        }
      }), _react.default.createElement(LastPageComponent, {
        className: !canNext ? classes.arrowLastDisabled : classes.arrowLast,
        onClick: function onClick() {
          if (!canNext) return;

          _this2.changePage(pages - 1);
        }
      })));
    }
  }]);
  return ReactTablePagination;
}(_react.Component);

exports.default = ReactTablePagination;
//# sourceMappingURL=Pagination.js.map