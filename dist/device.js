'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Device = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _promise = require('core-js/es6/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var deviceReady = void 0;

var Device = exports.Device = function () {
  function Device() {
    _classCallCheck(this, Device);
  }

  _createClass(Device, null, [{
    key: 'isPhoneGap',
    value: function isPhoneGap() {
      if (typeof document !== 'undefined') {
        return document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
      }

      return false;
    }
  }, {
    key: 'ready',
    value: function ready() {
      if (!deviceReady) {
        if (this.isPhoneGap()) {
          deviceReady = new _promise2.default(function (resolve) {
            var onDeviceReady = function onDeviceReady() {
              document.removeEventListener('deviceready', onDeviceReady);
              resolve();
            };

            document.addEventListener('deviceready', onDeviceReady, false);
          });
        } else {
          deviceReady = _promise2.default.resolve();
        }
      }

      return deviceReady;
    }
  }]);

  return Device;
}();

// Check that cordova plugins are installed


if (Device.isPhoneGap()) {
  Device.ready().then(function () {
    if (typeof global.device === 'undefined') {
      throw new Error('Cordova Device Plugin is not installed.' + ' Please refer to devcenter.kinvey.com/phonegap-v3.0/guides/getting-started for help with' + ' setting up your project.');
    }
  });
}