'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Push = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = require('kinvey-node-sdk/dist/request');

var _client = require('kinvey-node-sdk/dist/client');

var _entity = require('kinvey-node-sdk/dist/entity');

var _utils = require('kinvey-node-sdk/dist/utils');

var _errors = require('kinvey-node-sdk/dist/errors');

var _device = require('./device');

var _device2 = _interopRequireDefault(_device);

var _events = require('events');

var _localStorage = require('local-storage');

var _localStorage2 = _interopRequireDefault(_localStorage);

var _es6Promise = require('es6-promise');

var _es6Promise2 = _interopRequireDefault(_es6Promise);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var pushNamespace = process && process.env && process.env.KINVEY_PUSH_NAMESPACE || 'push' || 'push';
var notificationEvent = process && process.env && process.env.KINVEY_NOTIFICATION_EVENT || 'notification' || 'notification';

var Push = function (_EventEmitter) {
  _inherits(Push, _EventEmitter);

  function Push() {
    _classCallCheck(this, Push);

    return _possibleConstructorReturn(this, (Push.__proto__ || Object.getPrototypeOf(Push)).apply(this, arguments));
  }

  _createClass(Push, [{
    key: 'isSupported',
    value: function isSupported() {
      return _device2.default.isPhoneGap() && (_device2.default.isiOS() || _device2.default.isAndroid());
    }
  }, {
    key: 'onNotification',
    value: function onNotification(listener) {
      return this.on(notificationEvent, listener);
    }
  }, {
    key: 'onceNotification',
    value: function onceNotification(listener) {
      return this.once(notificationEvent, listener);
    }
  }, {
    key: 'register',
    value: function register() {
      var _this2 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return _device2.default.ready().then(function () {
        if (_this2.isSupported() === false) {
          throw new _errors.KinveyError('Kinvey currently only supports push notifications on iOS and Android platforms.');
        }

        if ((0, _utils.isDefined)(global.device) === false) {
          throw new _errors.KinveyError('Cordova Device Plugin is not installed.', 'Please refer to http://devcenter.kinvey.com/phonegap/guides/push#ProjectSetUp for help with' + ' setting up your project.');
        }

        if ((0, _utils.isDefined)(global.PushNotification) === false) {
          throw new _errors.KinveyError('PhoneGap Push Notification Plugin is not installed.', 'Please refer to http://devcenter.kinvey.com/phonegap/guides/push#ProjectSetUp for help with' + ' setting up your project.');
        }

        return _this2.unregister(options).catch(function () {
          return null;
        });
      }).then(function () {
        return new _es6Promise2.default(function (resolve, reject) {
          _this2.phonegapPush = global.PushNotification.init(options);

          _this2.phonegapPush.on(notificationEvent, function (data) {
            _this2.emit(notificationEvent, data);
          });

          _this2.phonegapPush.on('registration', function (data) {
            resolve(data.registrationId);
          });

          _this2.phonegapPush.on('error', function (error) {
            reject(new _errors.KinveyError('An error occurred registering this device for push notifications.', error));
          });
        });
      }).then(function (deviceId) {
        if ((0, _utils.isDefined)(deviceId) === false) {
          throw new _errors.KinveyError('Unable to retrieve the device id to register this device for push notifications.');
        }

        var user = _entity.User.getActiveUser(_this2.client);
        var request = new _request.KinveyRequest({
          method: _request.RequestMethod.POST,
          url: _url2.default.format({
            protocol: _this2.client.protocol,
            host: _this2.client.host,
            pathname: _this2.pathname + '/register-device'
          }),
          properties: options.properties,
          authType: user ? _request.AuthType.Session : _request.AuthType.Master,
          data: {
            platform: global.device.platform.toLowerCase(),
            framework: 'phonegap',
            deviceId: deviceId,
            userId: user ? undefined : options.userId
          },
          timeout: options.timeout,
          client: _this2.client
        });
        return request.execute().then(function (response) {
          return response.data;
        }).then(function (data) {
          var key = user ? _this2.pathname + '_' + user._id : _this2.pathname + '_' + options.userId;
          _localStorage2.default.set(key, { deviceId: deviceId });
          return data;
        });
      });
    }
  }, {
    key: 'unregister',
    value: function unregister() {
      var _this3 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return _device2.default.ready().then(function () {
        if (_this3.isSupported() === false) {
          return null;
        }

        return new _es6Promise2.default(function (resolve) {
          if (_this3.phonegapPush) {
            return _this3.phonegapPush.unregister(function () {
              _this3.phonegapPush = null;
              resolve();
            }, function () {
              resolve();
            });
          }

          return resolve();
        });
      }).then(function () {
        var user = _entity.User.getActiveUser(_this3.client);
        var key = user ? _this3.pathname + '_' + user._id : _this3.pathname + '_' + options.userId;
        return _localStorage2.default.get(key);
      }).then(function (pushConfig) {
        var deviceId = void 0;

        if ((0, _utils.isDefined)(pushConfig)) {
          deviceId = pushConfig.deviceId;
        }

        if ((0, _utils.isDefined)(deviceId) === false) {
          return null;
        }

        var user = _entity.User.getActiveUser(_this3.client);
        var request = new _request.KinveyRequest({
          method: _request.RequestMethod.POST,
          url: _url2.default.format({
            protocol: _this3.client.protocol,
            host: _this3.client.host,
            pathname: _this3.pathname + '/unregister-device'
          }),
          properties: options.properties,
          authType: user ? _request.AuthType.Session : _request.AuthType.Master,
          data: {
            platform: global.device.platform.toLowerCase(),
            framework: 'phonegap',
            deviceId: deviceId,
            userId: user ? undefined : options.userId
          },
          timeout: options.timeout,
          client: _this3.client
        });
        return request.execute().then(function (response) {
          return response.data;
        });
      }).then(function (data) {
        var user = _entity.User.getActiveUser(_this3.client);
        var key = user ? _this3.pathname + '_' + user._id : _this3.pathname + '_' + options.userId;
        _localStorage2.default.remove(key);
        return data;
      });
    }
  }, {
    key: 'pathname',
    get: function get() {
      return '/' + pushNamespace + '/' + this.client.appKey;
    }
  }, {
    key: 'client',
    get: function get() {
      if (!this._client) {
        return _client.Client.sharedInstance();
      }

      return this._client;
    },
    set: function set(client) {
      if (!(client instanceof _client.Client)) {
        throw new Error('client must be an instance of Client.');
      }

      this._client = client;
    }
  }]);

  return Push;
}(_events.EventEmitter);

// Export


exports.Push = Push;
exports.default = new Push();