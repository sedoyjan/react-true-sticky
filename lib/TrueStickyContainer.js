"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var contentStyles = {
  position: 'absolute',
  bottom: 0,
  right: 0,
  left: 0,
  top: 0,
  overflow: 'auto'
};
var wrapperStyles = {
  position: 'relative',
  overflow: 'hidden'
};
var bucketStyles = {
  position: 'absolute',
  right: 0,
  left: 0,
  top: 0,
  height: 0,
  overflow: 'hidden'
};
hideScrollbar();

var TrueStickyContainer =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(TrueStickyContainer, _PureComponent);

  function TrueStickyContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TrueStickyContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TrueStickyContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "stickyRefMap", {});

    _defineProperty(_assertThisInitialized(_this), "stickyCloneRefMap", {});

    _defineProperty(_assertThisInitialized(_this), "refMap", {});

    _defineProperty(_assertThisInitialized(_this), "isSticky", false);

    _defineProperty(_assertThisInitialized(_this), "setRef", function (id, clb) {
      return function (r) {
        if (r) {
          _this.refMap[id] = r;

          if (clb) {
            clb(r);
          }
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "setListeners", function (content) {
      content.addEventListener('scroll', _this.onSmthChanged);
    });

    _defineProperty(_assertThisInitialized(_this), "onSmthChanged", function () {
      var content = _this.refMap['content'];
      var bucket = _this.refMap['bucket'];

      for (var key in _this.stickyRefMap) {
        var sticky = _this.stickyRefMap[key];
        var stickyClone = _this.stickyCloneRefMap[key];
        var stickyTop = stickyClone.offsetHeight + sticky.offsetTop;
        var top = content.scrollTop - sticky.offsetTop;

        if (top > stickyClone.offsetHeight) {
          top = stickyClone.offsetHeight;
        }

        if (top < 0) {
          top = 0;
        }

        if (top >= 0) {
          sticky.style.height = "".concat(stickyClone.offsetHeight - top / 2, "px");
        }

        if (top === stickyClone.offsetHeight && !_this.isSticky) {
          _this.isSticky = true;
        }

        if (top === 0 && _this.isSticky) {
          _this.isSticky = false;
        }

        content.style.top = "".concat(top, "px");
        bucket.style.height = "".concat(top, "px");
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderItems", function () {
      return _react["default"].Children.map(_this.props.children, function (item) {
        if (item.props.isSticky) {
          return _react["default"].createElement("div", {
            ref: function ref(r) {
              if (r) {
                _this.stickyRefMap[item.props.id] = r;
              }
            }
          }, item);
        } else {
          return item;
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderSticky", function () {
      var sticky = [];

      _react["default"].Children.map(_this.props.children, function (item) {
        if (item.props.isSticky) {
          sticky.push(_react["default"].createElement("div", {
            key: "Clone".concat(item.props.id),
            ref: function ref(r) {
              if (r) {
                _this.stickyCloneRefMap[item.props.id] = r;
              }
            }
          }, item));
        }
      });

      return sticky;
    });

    return _this;
  }

  _createClass(TrueStickyContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('resize', this.onSmthChanged);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.onSmthChanged);

      if (this.refMap['content']) {
        this.refMap['content'].removeEventListener('scroll', this.onSmthChanged);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var className = this.props.className ? this.props.className : '';
      return _react["default"].createElement("div", {
        className: "".concat(className),
        style: wrapperStyles,
        ref: this.setRef('wrapper')
      }, _react["default"].createElement("div", {
        style: bucketStyles,
        ref: this.setRef('bucket')
      }, this.renderSticky()), _react["default"].createElement("div", {
        style: contentStyles,
        className: 'no-scrollbar',
        ref: this.setRef('content', this.setListeners)
      }, this.renderItems()));
    }
  }]);

  return TrueStickyContainer;
}(_react.PureComponent);

var _default = TrueStickyContainer;
exports["default"] = _default;

function hideScrollbar() {
  var css = '.no-scrollbar::-webkit-scrollbar {width: 0;}.no-scrollbar {-ms-overflow-style: none;}.no-scrollbar {overflow: -moz-scrollbars-none;}';
  var style = document.createElement('style');

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  document.getElementsByTagName('head')[0].appendChild(style);
}