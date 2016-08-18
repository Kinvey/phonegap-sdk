'use strict';

var _kinvey = require('./kinvey');

var _errors = require('kinvey-javascript-sdk-core/dist/errors');

var _rack = require('kinvey-javascript-sdk-core/dist/rack');

var _cache = require('./cache');

var _http = require('kinvey-html5-sdk/dist/http');

var _popup = require('./popup');

var _device = require('./device');

// Swap Cache Middelware
var cacheRack = _rack.KinveyRackManager.cacheRack;
cacheRack.swap(_rack.CacheMiddleware, new _cache.CacheMiddleware());

// Swap Http middleware
var networkRack = _rack.KinveyRackManager.networkRack;
networkRack.swap(_rack.HttpMiddleware, new _http.HttpMiddleware());

// Check that the cordova device plugin is installed
_device.Device.ready().then(function () {
  if (typeof global.device === 'undefined') {
    throw new _errors.KinveyError('Cordova Device Plugin is not installed.' + ' Please refer to devcenter.kinvey.com/phonegap-v3.0/guides/getting-started for help with' + ' setting up your project.');
  }
});

// Expose some globals
global.KinveyDevice = _device.Device;
global.KinveyPopup = _popup.Popup;

// Export
module.exports = _kinvey.Kinvey;