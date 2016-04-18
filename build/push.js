'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Push = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _push = require('kinvey-javascript-sdk-core/build/push');

var _errors = require('kinvey-javascript-sdk-core/build/errors');

var _utils = require('./utils');

var _assign = require('lodash/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var notificationEvent = process.env.KINVEY_NOTIFICATION_EVENT || 'notification';

var Push = exports.Push = function (_CorePush) {
  _inherits(Push, _CorePush);

  function Push() {
    _classCallCheck(this, Push);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Push).apply(this, arguments));
  }

  _createClass(Push, [{
    key: 'getDeviceId',
    value: function getDeviceId() {
      var _this2 = this;

      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      if (!Push.isSupported()) {
        return Promise.reject(new _errors.KinveyError('Kinvey currently only supports ' + 'push notifications on iOS and Android platforms.'));
      }

      options = (0, _assign2.default)({
        android: {
          senderID: undefined
        },
        ios: {
          alert: true,
          badge: true,
          sound: true
        }
      }, options);

      var promise = new Promise(function (resolve, reject) {
        if (typeof global.PushNotification === 'undefined') {
          return reject(new _errors.KinveyError('PhoneGap Push Notification Plugin is not installed.', 'Please refer to http://devcenter.kinvey.com/phonegap/guides/push#ProjectSetUp for ' + 'setting up your project.'));
        }

        var push = global.PushNotification.init(options);

        push.on('registration', function (data) {
          resolve(data);
        });

        push.on('notification', function (data) {
          _this2.emit(notificationEvent, data);
        });

        push.on('error', function (error) {
          reject(new _errors.KinveyError('An error occurred registering this device for push notifications.', error));
        });

        return push;
      });

      return promise;
    }
  }], [{
    key: 'isSupported',
    value: function isSupported() {
      return (0, _utils.isiOS)() || (0, _utils.isAndroid)();
    }
  }]);

  return Push;
}(_push.Push);