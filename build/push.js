'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Push = undefined;

var _errors = require('kinvey-javascript-sdk-core/build/errors');

var _events = require('events');

var _dataStore = require('kinvey-javascript-sdk-core/build/stores/dataStore');

var _enums = require('kinvey-javascript-sdk-core/build/enums');

var _user = require('kinvey-javascript-sdk-core/build/user');

var _network = require('kinvey-javascript-sdk-core/build/requests/network');

var _client = require('kinvey-javascript-sdk-core/build/client');

var _query = require('kinvey-javascript-sdk-core/build/query');

var _utils = require('./utils');

var _assign = require('lodash/assign');

var _assign2 = _interopRequireDefault(_assign);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pushNamespace = process.env.KINVEY_PUSH_NAMESPACE || 'push';
var notificationEvent = process.env.KINVEY_NOTIFICATION_EVENT || 'notification';
var deviceCollectionName = process.env.KINVEY_DEVICE_COLLECTION_NAME || 'kinvey_device';
var emitter = new _events.EventEmitter();

var Push = exports.Push = {
  listeners: function listeners() {
    return emitter.listeners(notificationEvent);
  },
  onNotification: function onNotification(listener) {
    return emitter.on(notificationEvent, listener);
  },
  onceNotification: function onceNotification(listener) {
    return emitter.once(notificationEvent, listener);
  },
  removeListener: function removeListener(listener) {
    return emitter.removeListener(notificationEvent, listener);
  },
  removeAllListeners: function removeAllListeners() {
    return emitter.removeAllListeners(notificationEvent);
  },
  init: function init() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    if (!(0, _utils.isiOS)() && !(0, _utils.isAndroid)()) {
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
      },
      force: false
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
        Push.emit(notificationEvent, data);
      });

      push.on('error', function (error) {
        reject(new _errors.KinveyError('An error occurred registering this device for push notifications.', error));
      });

      return push;
    }).then(function (deviceId) {
      if (!deviceId) {
        throw new _errors.KinveyError('Unable to retrieve the device id to register this device for push notifications.');
      }

      var store = _dataStore.DataStore.getInstance(deviceCollectionName, _dataStore.DataStoreType.Sync);
      store.disableSync();
      return store.findById(deviceId).then(function (entity) {
        if (options.force !== true) {
          return entity;
        }

        var user = _user.User.getActiveUser();
        var client = _client.Client.sharedInstance();
        var request = new _network.NetworkRequest({
          method: _enums.HttpMethod.POST,
          url: _url2.default.format({
            protocol: client.protocol,
            host: client.host,
            pathname: '/' + pushNamespace + '/' + client.appKey + '/register-device'
          }),
          properties: options.properties,
          auth: user ? client.sessionAuth() : client.masterAuth(),
          data: {
            platform: global.device.platform,
            framework: 'phonegap',
            deviceId: deviceId,
            userId: user ? null : options.userId
          },
          timeout: options.timeout
        });
        return request.execute().then(function () {
          return store.save({ _id: deviceId, registered: true });
        });
      });
    });

    return promise;
  },
  unregister: function unregister() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    if (!(0, _utils.isiOS)() && !(0, _utils.isAndroid)()) {
      return Promise.reject(new _errors.KinveyError('Kinvey currently only supports ' + 'push notifications on iOS and Android platforms.'));
    }

    var store = _dataStore.DataStore.getInstance(deviceCollectionName, _dataStore.DataStoreType.Sync);
    store.disableSync();
    var query = new _query.Query();
    query.equalsTo('registered', true);
    var promise = store.find(query).then(function (data) {
      if (data.length === 1) {
        return data[0]._id;
      }

      return undefined;
    }).then(function (deviceId) {
      if (!deviceId) {
        throw new _errors.KinveyError('This device has not been registered.');
      }

      var user = _user.User.getActiveUser();
      var client = _client.Client.sharedInstance();
      var request = new _network.NetworkRequest({
        method: _enums.HttpMethod.POST,
        url: _url2.default.format({
          protocol: client.protocol,
          host: client.host,
          pathname: '/' + pushNamespace + '/' + client.appKey + '/unregister-device'
        }),
        properties: options.properties,
        auth: user ? client.sessionAuth() : client.masterAuth(),
        data: {
          platform: global.device.platform,
          framework: 'phonegap',
          deviceId: deviceId,
          userId: user ? null : options.userId
        },
        timeout: options.timeout
      });
      return request.execute().then(function (response) {
        return store.removeById(deviceId).then(function () {
          return response.data;
        });
      });
    });

    return promise;
  }
};