'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Push = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _export = require('kinvey-node-sdk/dist/export');

var _device = require('./device');

var _device2 = _interopRequireDefault(_device);

var _events = require('events');

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var APP_DATA_NAMESPACE = process && process.env && process.env.KINVEY_DATASTORE_NAMESPACE || undefined || 'appdata';
var PUSH_NAMESPACE = process && process.env && process.env.KINVEY_PUSH_NAMESPACE || 'push' || 'push';
var NOTIFICATION_EVENT = process && process.env && process.env.KINVEY_NOTIFICATION_EVENT || 'notification' || 'notification';
var DEVICE_COLLECTION = '__device';
var phonegapPush = void 0;

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
      return this.on(NOTIFICATION_EVENT, listener);
    }
  }, {
    key: 'onceNotification',
    value: function onceNotification(listener) {
      return this.once(NOTIFICATION_EVENT, listener);
    }
  }, {
    key: 'register',
    value: function register() {
      var _this2 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return _device2.default.ready().then(function () {
        if (_this2.isSupported() === false) {
          throw new _export.KinveyError('Kinvey currently only supports push notifications on iOS and Android platforms.');
        }

        if ((0, _export.isDefined)(global.device) === false) {
          throw new _export.KinveyError('Cordova Device Plugin is not installed.', 'Please refer to http://devcenter.kinvey.com/phonegap/guides/push#ProjectSetUp for help with' + ' setting up your project.');
        }

        if ((0, _export.isDefined)(global.PushNotification) === false) {
          throw new _export.KinveyError('PhoneGap Push Notification Plugin is not installed.', 'Please refer to http://devcenter.kinvey.com/phonegap/guides/push#ProjectSetUp for help with' + ' setting up your project.');
        }

        return new Promise(function (resolve) {
          if (phonegapPush) {
            return phonegapPush.unregister(function () {
              resolve();
            }, function () {
              resolve();
            });
          }

          return resolve();
        });
      }).then(function () {
        return new Promise(function (resolve, reject) {
          phonegapPush = global.PushNotification.init(options);

          phonegapPush.on(NOTIFICATION_EVENT, function (data) {
            _this2.emit(NOTIFICATION_EVENT, data);
          });

          phonegapPush.on('registration', function (data) {
            resolve(data.registrationId);
          });

          phonegapPush.on('error', function (error) {
            reject(new _export.KinveyError('An error occurred registering this device for push notifications.', error));
          });
        });
      }).then(function (deviceId) {
        var user = _export.User.getActiveUser(_this2.client);

        if ((0, _export.isDefined)(deviceId) === false) {
          throw new _export.KinveyError('Unable to retrieve the device id to register this device for push notifications.');
        }

        if ((0, _export.isDefined)(user) === false && (0, _export.isDefined)(options.userId) === false) {
          throw new _export.KinveyError('Unable to register this device for push notifications.', 'You must login a user or provide a userId to assign the device token.');
        }

        var request = new _export.KinveyRequest({
          method: _export.RequestMethod.POST,
          url: _url2.default.format({
            protocol: _this2.client.protocol,
            host: _this2.client.host,
            pathname: _this2.pathname + '/register-device'
          }),
          properties: options.properties,
          authType: user ? _export.AuthType.Session : _export.AuthType.Master,
          data: {
            platform: global.device.platform.toLowerCase(),
            framework: 'phonegap',
            deviceId: deviceId,
            userId: user ? undefined : options.userId
          },
          timeout: options.timeout,
          client: _this2.client
        });
        return request.execute().then(function () {
          return deviceId;
        });
      }).then(function (deviceId) {
        var user = _export.User.getActiveUser(_this2.client);
        var _id = options.userId;

        if ((0, _export.isDefined)(user)) {
          _id = user._id;
        }

        var request = new _export.CacheRequest({
          method: _export.RequestMethod.PUT,
          url: _url2.default.format({
            protocol: _this2.client.protocol,
            host: _this2.client.host,
            pathname: '/' + APP_DATA_NAMESPACE + '/' + _this2.client.appKey + '/' + DEVICE_COLLECTION
          }),
          data: {
            _id: _id,
            deviceId: deviceId
          },
          client: _this2.client
        });
        return request.execute().then(function () {
          return deviceId;
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

        return new Promise(function (resolve) {
          if (phonegapPush) {
            return phonegapPush.unregister(function () {
              resolve();
            }, function () {
              resolve();
            });
          }

          return resolve();
        });
      }).then(function () {
        var user = _export.User.getActiveUser(_this3.client);
        var _id = options.userId;

        if ((0, _export.isDefined)(user) === false && (0, _export.isDefined)(options.userId) === false) {
          throw new _export.KinveyError('Unable to unregister this device for push notificaitons.', 'You must login a user or provide a userId to unassign the device token.');
        }

        if ((0, _export.isDefined)(user)) {
          _id = user._id;
        }

        var request = new _export.CacheRequest({
          method: _export.RequestMethod.GET,
          url: _url2.default.format({
            protocol: _this3.client.protocol,
            host: _this3.client.host,
            pathname: '/' + APP_DATA_NAMESPACE + '/' + _this3.client.appKey + '/' + DEVICE_COLLECTION + '/' + _id
          }),
          client: _this3.client
        });
        return request.execute().catch(function (error) {
          if (error instanceof _export.NotFoundError) {
            return {};
          }

          throw error;
        }).then(function (response) {
          if ((0, _export.isDefined)(response)) {
            return response.data;
          }

          return null;
        });
      }).then(function (device) {
        var user = _export.User.getActiveUser(_this3.client);
        var deviceId = void 0;

        if ((0, _export.isDefined)(device)) {
          deviceId = device.deviceId;
        }

        if ((0, _export.isDefined)(deviceId) === false) {
          return null;
        }

        var request = new _export.KinveyRequest({
          method: _export.RequestMethod.POST,
          url: _url2.default.format({
            protocol: _this3.client.protocol,
            host: _this3.client.host,
            pathname: _this3.pathname + '/unregister-device'
          }),
          properties: options.properties,
          authType: user ? _export.AuthType.Session : _export.AuthType.Master,
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
      }).then(function () {
        var user = _export.User.getActiveUser(_this3.client);
        var _id = options.userId;

        if ((0, _export.isDefined)(user)) {
          _id = user._id;
        }

        var request = new _export.CacheRequest({
          method: _export.RequestMethod.DELETE,
          url: _url2.default.format({
            protocol: _this3.client.protocol,
            host: _this3.client.host,
            pathname: '/' + APP_DATA_NAMESPACE + '/' + _this3.client.appKey + '/' + DEVICE_COLLECTION + '/' + _id
          }),
          client: _this3.client
        });

        return request.execute().catch(function (error) {
          if (error instanceof _export.NotFoundError) {
            return {};
          }

          throw error;
        }).then(function () {
          return null;
        });
      });
    }
  }, {
    key: 'pathname',
    get: function get() {
      return '/' + PUSH_NAMESPACE + '/' + this.client.appKey;
    }
  }, {
    key: 'client',
    get: function get() {
      if (!this._client) {
        return _export.Client.sharedInstance();
      }

      return this._client;
    },
    set: function set(client) {
      if (!(client instanceof _export.Client)) {
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