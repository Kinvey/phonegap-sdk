'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhoneGapDevice = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PhoneGapDevice = exports.PhoneGapDevice = function () {
  function PhoneGapDevice() {
    _classCallCheck(this, PhoneGapDevice);
  }

  _createClass(PhoneGapDevice, null, [{
    key: 'isPhoneGap',
    value: function isPhoneGap() {
      return document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
    }
  }, {
    key: 'isBrowser',
    value: function isBrowser() {
      return document.URL.indexOf('http://') !== -1 || document.URL.indexOf('https://') !== -1;
    }
  }, {
    key: 'isiOS',
    value: function isiOS() {
      return typeof global.device !== 'undefined' && global.device.platform === 'iOS';
    }
  }, {
    key: 'isAndroid',
    value: function isAndroid() {
      return typeof global.device !== 'undefined' && global.device.platform === 'Android';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      var json = {
        device: {},
        platform: {
          name: 'phonegap'
        },
        os: {},
        kinveySDK: {
          name: _package2.default.name,
          version: _package2.default.version
        }
      };

      if (PhoneGapDevice.isBrowser()) {
        var userAgent = global.navigator.userAgent.toLowerCase();
        var rChrome = /(chrome)\/([\w]+)/;
        var rFirefox = /(firefox)\/([\w.]+)/;
        var rIE = /(msie) ([\w.]+)/i;
        var rOpera = /(opera)(?:.*version)?[ \/]([\w.]+)/;
        var rSafari = /(safari)\/([\w.]+)/;
        var rAppleWebkit = /(applewebkit)\/([\w.]+)/;
        var browser = rChrome.exec(userAgent) || rFirefox.exec(userAgent) || rIE.exec(userAgent) || rOpera.exec(userAgent) || rSafari.exec(userAgent) || rAppleWebkit.exec(userAgent) || [];

        json.device.model = global.navigator.userAgent;
        json.os.name = browser[1];
        json.os.version = browser[2];
      } else if (typeof global.device !== 'undefined') {
        json.device.model = global.device.model;
        json.platform.version = global.device.cordova;
        json.os.name = global.device.platform;
        json.os.version = global.device.version;
      }

      return json;
    }
  }]);

  return PhoneGapDevice;
}();