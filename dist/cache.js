'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CacheMiddleware = exports.DB = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _cache = require('kinvey-html5-sdk/dist/cache');

var _errors = require('kinvey-javascript-sdk-core/dist/errors');

var _log = require('kinvey-javascript-sdk-core/dist/log');

var _webstorage = require('kinvey-html5-sdk/dist/webstorage');

var _indexeddb = require('kinvey-html5-sdk/dist/indexeddb');

var _websql = require('kinvey-html5-sdk/dist/websql');

var _device = require('./device');

var _forEach = require('lodash/forEach');

var _forEach2 = _interopRequireDefault(_forEach);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dbCache = {};

var DB = exports.DB = function (_Html5DB) {
  _inherits(DB, _Html5DB);

  function DB() {
    var name = arguments.length <= 0 || arguments[0] === undefined ? 'kinvey' : arguments[0];
    var adapters = arguments.length <= 1 || arguments[1] === undefined ? [_cache.DBAdapter.WebSQL, _cache.DBAdapter.IndexedDB, _cache.DBAdapter.LocalStorage, _cache.DBAdapter.SessionStorage] : arguments[1];

    _classCallCheck(this, DB);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DB).call(this, name));

    if (!(0, _isArray2.default)(adapters)) {
      adapters = [adapters];
    }

    (0, _forEach2.default)(adapters, function (adapter) {
      switch (adapter) {
        case _cache.DBAdapter.IndexedDB:
          if (_indexeddb.IndexedDB.isSupported()) {
            _this.adapter = new _indexeddb.IndexedDB(name);
            return false;
          }

          break;
        case _cache.DBAdapter.LocalStorage:
          if (_webstorage.LocalStorage.isSupported()) {
            _this.adapter = new _webstorage.LocalStorage(name);
            return false;
          }

          break;
        case _cache.DBAdapter.SessionStorage:
          if (_webstorage.SessionStorage.isSupported()) {
            _this.adapter = new _webstorage.SessionStorage(name);
            return false;
          }

          break;
        case _cache.DBAdapter.WebSQL:
          if (_websql.WebSQL.isSupported()) {
            _this.adapter = new _websql.WebSQL(name);
            return false;
          }

          break;
        default:
          _log.Log.warn('The ' + adapter + ' adapter is is not recognized.');
      }

      return true;
    });
    return _this;
  }

  return DB;
}(_cache.DB);

var CacheMiddleware = exports.CacheMiddleware = function (_Html5CacheMiddelware) {
  _inherits(CacheMiddleware, _Html5CacheMiddelware);

  function CacheMiddleware() {
    var name = arguments.length <= 0 || arguments[0] === undefined ? 'PhoneGap Cache Middleware' : arguments[0];

    _classCallCheck(this, CacheMiddleware);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(CacheMiddleware).call(this, name));
  }

  _createClass(CacheMiddleware, [{
    key: 'openDatabase',
    value: function openDatabase(name) {
      var adapters = arguments.length <= 1 || arguments[1] === undefined ? [_cache.DBAdapter.WebSQL, _cache.DBAdapter.IndexedDB, _cache.DBAdapter.LocalStorage, _cache.DBAdapter.SessionStorage] : arguments[1];

      if (!name) {
        throw new _errors.KinveyError('A name is required to open a database.');
      }

      var db = dbCache[name];

      if (!db) {
        db = new DB(name, adapters);
      }

      return db;
    }
  }, {
    key: 'handle',
    value: function handle(request) {
      var _this3 = this;

      return _device.Device.ready().then(function () {
        return _get(Object.getPrototypeOf(CacheMiddleware.prototype), 'handle', _this3).call(_this3, request);
      });
    }
  }]);

  return CacheMiddleware;
}(_cache.CacheMiddleware);