'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _device = require('./device');

Object.keys(_device).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _device[key];
    }
  });
});

var _kinvey = require('./kinvey');

Object.keys(_kinvey).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _kinvey[key];
    }
  });
});

var _popup = require('./popup');

Object.keys(_popup).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _popup[key];
    }
  });
});

var _push = require('./push');

Object.keys(_push).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _push[key];
    }
  });
});