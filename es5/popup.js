'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhoneGapPopup = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('events');

var _device = require('./device');

var _bind = require('lodash/bind');

var _bind2 = _interopRequireDefault(_bind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PhoneGapPopup = exports.PhoneGapPopup = function (_EventEmitter) {
  _inherits(PhoneGapPopup, _EventEmitter);

  function PhoneGapPopup() {
    _classCallCheck(this, PhoneGapPopup);

    // Create some event listeners

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PhoneGapPopup).call(this));

    _this.eventListeners = {
      loadStopCallback: (0, _bind2.default)(_this.loadStopCallback, _this),
      loadErrorCallback: (0, _bind2.default)(_this.loadErrorCallback, _this),
      exitCallback: (0, _bind2.default)(_this.exitCallback, _this)
    };

    // Listen fro the deviceready event
    if (_device.PhoneGapDevice.isPhoneGap()) {
      _this.deviceReady = new Promise(function (resolve) {
        var onDeviceReady = (0, _bind2.default)(function () {
          document.removeEventListener('deviceready', onDeviceReady);
          resolve();
        }, _this);

        document.addEventListener('deviceready', onDeviceReady, false);
      });
    } else {
      _this.deviceReady = Promise.resolve();
    }
    return _this;
  }

  _createClass(PhoneGapPopup, [{
    key: 'open',
    value: function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        var url = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.deviceReady;

              case 2:
                if (!_device.PhoneGapDevice.isPhoneGap()) {
                  _context.next = 15;
                  break;
                }

                if (!(global.cordova && !global.cordova.InAppBrowser)) {
                  _context.next = 5;
                  break;
                }

                throw new Error('PhoneGap InAppBrowser Plugin is not installed.', 'Please refer to http://http://devcenter.kinvey.com/phonegap/guides/getting-started for help with ' + 'setting up your project.');

              case 5:

                // Open the popup
                this.popup = global.open(url, '_blank', 'location=yes');

                // Listen for popup events

                if (!this.popup) {
                  _context.next = 12;
                  break;
                }

                this.popup.addEventListener('loadstop', this.eventListeners.loadStopCallback);
                this.popup.addEventListener('loaderror', this.eventListeners.loadErrorCallback);
                this.popup.addEventListener('exit', this.eventListeners.exitCallback);
                _context.next = 13;
                break;

              case 12:
                throw new Error('The popup was blocked.');

              case 13:
                _context.next = 21;
                break;

              case 15:
                // Open the popup
                this.popup = global.open(url, '_blank', 'toolbar=no,location=no');

                if (!this.popup) {
                  _context.next = 20;
                  break;
                }

                // Check if the popup is closed or redirect every 100ms
                this.interval = setInterval(function () {
                  if (_this2.popup.closed) {
                    _this2.exitCallback();
                  } else {
                    try {
                      _this2.loadStopCallback({
                        url: _this2.popup.location.href
                      });
                    } catch (error) {
                      // Just catch the error
                    }
                  }
                }, 100);
                _context.next = 21;
                break;

              case 20:
                throw new Error('The popup was blocked.');

              case 21:
                return _context.abrupt('return', this);

              case 22:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function open(_x) {
        return ref.apply(this, arguments);
      }

      return open;
    }()
  }, {
    key: 'close',
    value: function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.popup) {
                  this.popup.close();
                }

                return _context2.abrupt('return', this);

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function close() {
        return ref.apply(this, arguments);
      }

      return close;
    }()
  }, {
    key: 'loadStopCallback',
    value: function loadStopCallback(event) {
      this.emit('loaded', event.url);
    }
  }, {
    key: 'loadErrorCallback',
    value: function loadErrorCallback(event) {
      this.emit('error', event.message);
    }
  }, {
    key: 'exitCallback',
    value: function exitCallback() {
      clearInterval(this.interval);

      if (_device.PhoneGapDevice.isPhoneGap()) {
        this.popup.removeEventListener('loadstop', this.eventListeners.loadStopCallback);
        this.popup.removeEventListener('loaderror', this.eventListeners.loadErrorCallback);
        this.popup.removeEventListener('exit', this.eventListeners.exitCallback);
      }

      this.emit('closed');
    }
  }]);

  return PhoneGapPopup;
}(_events.EventEmitter);