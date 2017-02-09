'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var deviceReady = void 0;

var Device = function () {
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
    key: 'isiOS',
    value: function isiOS() {
      return typeof global.device !== 'undefined' && global.device.platform.toLowerCase() === 'ios';
    }
  }, {
    key: 'isAndroid',
    value: function isAndroid() {
      return typeof global.device !== 'undefined' && global.device.platform.toLowerCase() === 'android';
    }
  }, {
    key: 'ready',
    value: function ready() {
      if (typeof deviceReady === 'undefined') {
        if (this.isPhoneGap()) {
          deviceReady = new Promise(function (resolve) {
            var onDeviceReady = function onDeviceReady() {
              document.removeEventListener('deviceready', onDeviceReady);
              resolve();
            };

            document.addEventListener('deviceready', onDeviceReady, false);
          });
        } else {
          deviceReady = Promise.resolve();
        }
      }

      return deviceReady;
    }
  }]);

  return Device;
}();

// Check that cordova plugins are installed


exports.default = Device;
if (Device.isPhoneGap()) {
  Device.ready().then(function () {
    if (typeof global.device === 'undefined') {
      throw new Error('Cordova Device Plugin is not installed.' + ' Please refer to https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-device/index.html for help with' + ' installing the Cordova Device Plugin.');
    }
  });
}