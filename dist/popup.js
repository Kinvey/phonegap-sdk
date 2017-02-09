'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _popup = require('kinvey-html5-sdk/dist/popup');

var _popup2 = _interopRequireDefault(_popup);

var _device = require('./device');

var _device2 = _interopRequireDefault(_device);

var _bind = require('lodash/bind');

var _bind2 = _interopRequireDefault(_bind);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Popup = function (_HTML5Popup) {
  _inherits(Popup, _HTML5Popup);

  function Popup() {
    _classCallCheck(this, Popup);

    return _possibleConstructorReturn(this, (Popup.__proto__ || Object.getPrototypeOf(Popup)).apply(this, arguments));
  }

  _createClass(Popup, [{
    key: 'open',
    value: function open() {
      var _this2 = this;

      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';

      if (_device2.default.isPhoneGap() === false) {
        return _get(Popup.prototype.__proto__ || Object.getPrototypeOf(Popup.prototype), 'open', this).call(this, url);
      }

      var interval = void 0;
      var eventListeners = void 0;
      var popupWindow = void 0;

      // Check that the InAppBrowser plugin is installed if this is a PhoneGap environment
      if (typeof global.cordova !== 'undefined' && typeof global.cordova.InAppBrowser === 'undefined') {
        throw new Error('Cordova InAppBrowser Plugin is not installed.' + ' Please refer to https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-inappbrowser/index.html' + ' for help with installing the Cordova InAppBrowser Plugin.');
      }

      // loadStartCallback
      var loadStartCallback = function loadStartCallback(event) {
        _this2.emit('loadstart', event);
      };

      // loadStopCallback
      var loadStopCallback = function loadStopCallback(event) {
        _this2.emit('loadstop', event);
      };

      // loadErrorCallback
      var loadErrorCallback = function loadErrorCallback(event) {
        _this2.emit('error', event);
      };

      // exitCallback
      var exitCallback = function exitCallback() {
        // Clear the interval
        clearInterval(interval);

        // Close the popup
        popupWindow.close();
        _this2.popupWindow = null;

        // Remove event listeners
        if (popupWindow && (0, _isFunction2.default)(popupWindow.removeEventListener)) {
          popupWindow.removeEventListener('loadstart', eventListeners.loadStopCallback);
          popupWindow.removeEventListener('loadstop', eventListeners.loadStopCallback);
          popupWindow.removeEventListener('loaderror', eventListeners.loadErrorCallback);
          popupWindow.removeEventListener('exit', eventListeners.exitCallback);
        }

        // Emit closed
        _this2.emit('exit');
      };

      // Bind event listeners
      eventListeners = {
        loadStartCallback: (0, _bind2.default)(loadStartCallback, this),
        loadStopCallback: (0, _bind2.default)(loadStopCallback, this),
        loadErrorCallback: (0, _bind2.default)(loadErrorCallback, this),
        exitCallback: (0, _bind2.default)(exitCallback, this)
      };

      // Open the popup
      popupWindow = global.open(url, '_blank', 'location=yes');

      if (popupWindow) {
        if ((0, _isFunction2.default)(popupWindow.addEventListener)) {
          popupWindow.addEventListener('loadstart', eventListeners.loadStartCallback);
          popupWindow.addEventListener('loadstop', eventListeners.loadStopCallback);
          popupWindow.addEventListener('loaderror', eventListeners.loadErrorCallback);
          popupWindow.addEventListener('exit', eventListeners.exitCallback);
        }
      } else {
        throw new Error('The popup was blocked.');
      }

      // Set the popupWindow instance
      this.popupWindow = popupWindow;

      // Return this
      return this;
    }
  }, {
    key: 'close',
    value: function close() {
      if (this.popupWindow) {
        this.popupWindow.close();
      }

      return this;
    }
  }]);

  return Popup;
}(_popup2.default);

exports.default = Popup;