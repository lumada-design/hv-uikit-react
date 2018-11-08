"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _Input = _interopRequireDefault(require("@material-ui/core/Input"));

var _InputLabel = _interopRequireDefault(require("@material-ui/core/InputLabel"));

var _CircularProgress = _interopRequireDefault(require("@material-ui/core/CircularProgress"));

var _InputAdornment = _interopRequireDefault(require("@material-ui/core/InputAdornment"));

var _Lock = _interopRequireDefault(require("@material-ui/icons/Lock"));

var _Person = _interopRequireDefault(require("@material-ui/icons/Person"));

var _withStyles = _interopRequireDefault(require("@material-ui/core/styles/withStyles"));

var _styles = _interopRequireDefault(require("./styles"));

/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */
var SpinnerAdornment = (0, _withStyles["default"])(_styles["default"])(function (props) {
  var classes = props.classes;
  return _react["default"].createElement(_CircularProgress["default"], {
    style: {
      color: "white"
    },
    className: classes.spinner,
    size: 15
  });
});

var Form =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(Form, _React$Component);

  function Form() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, Form);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(Form)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])((0, _assertThisInitialized2["default"])(_this)), "state", {
      username: "",
      password: "",
      isLogging: false
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])((0, _assertThisInitialized2["default"])(_this)), "handleSubmit",
    /*#__PURE__*/
    function () {
      var _ref = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function () {
        function _callee(e) {
          var _this$state, username, password, login;

          return _regenerator["default"].wrap(function () {
            function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    e.preventDefault();
                    _this$state = _this.state, username = _this$state.username, password = _this$state.password;
                    login = _this.props.login;

                    _this.setState({
                      isLogging: true
                    });

                    _context.prev = 4;
                    _context.next = 7;
                    return login({
                      username: username,
                      password: password
                    });

                  case 7:
                    _context.next = 11;
                    break;

                  case 9:
                    _context.prev = 9;
                    _context.t0 = _context["catch"](4);

                  case 11:
                    _this.setState({
                      isLogging: false
                    });

                  case 12:
                  case "end":
                    return _context.stop();
                }
              }
            }

            return _callee$;
          }(), _callee, this, [[4, 9]]);
        }

        return _callee;
      }()));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])((0, _assertThisInitialized2["default"])(_this)), "handleInputChange", function (name) {
      return function (event) {
        _this.setState((0, _defineProperty2["default"])({}, name, event.target.value));
      };
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])((0, _assertThisInitialized2["default"])(_this)), "checkInput", function () {
      var _this$state2 = _this.state,
          username = _this$state2.username,
          password = _this$state2.password;
      return username.length === 0 || password.length === 0;
    });
    return _this;
  }

  (0, _createClass2["default"])(Form, [{
    key: "render",
    value: function () {
      function render() {
        var _this2 = this;

        var classes = this.props.classes;
        var _this$state3 = this.state,
            showPassword = _this$state3.showPassword,
            username = _this$state3.username,
            password = _this$state3.password,
            isLogging = _this$state3.isLogging;
        return _react["default"].createElement("form", {
          className: classes.root,
          onSubmit: function () {
            function onSubmit(e) {
              return _this2.handleSubmit(e);
            }

            return onSubmit;
          }()
        }, _react["default"].createElement(_InputLabel["default"], {
          className: classes.label
        }, "Username"), _react["default"].createElement(_Input["default"], {
          autoFocus: true,
          type: "text",
          value: username,
          onChange: this.handleInputChange("username"),
          className: classes.input,
          inputProps: {
            name: "username"
          },
          startAdornment: _react["default"].createElement(_InputAdornment["default"], {
            position: "start"
          }, _react["default"].createElement(_Person["default"], {
            style: {
              fontSize: 19
            }
          }))
        }), _react["default"].createElement(_InputLabel["default"], {
          className: classes.label
        }, "Password"), _react["default"].createElement(_Input["default"], {
          type: showPassword ? "text" : "password",
          value: password,
          className: classes.input,
          onChange: this.handleInputChange("password"),
          inputProps: {
            name: "password"
          },
          startAdornment: _react["default"].createElement(_InputAdornment["default"], {
            position: "start"
          }, _react["default"].createElement(_Lock["default"], {
            style: {
              fontSize: 19
            }
          }))
        }), _react["default"].createElement(_Button["default"], {
          type: "submit",
          color: "primary",
          variant: "contained",
          className: classes.button,
          disabled: this.checkInput()
        }, isLogging ? _react["default"].createElement(SpinnerAdornment, null) : "Log in"));
      }

      return render;
    }()
  }]);
  return Form;
}(_react["default"].Component);

Form.displayName = "Form";
Form.propTypes = {
  classes: _propTypes["default"].instanceOf(Object).isRequired,
  login: _propTypes["default"].instanceOf(Function).isRequired
};
var _default = Form;
exports["default"] = _default;