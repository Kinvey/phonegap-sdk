'use strict';

var _kinveyJavascriptSdkCore = require('kinvey-javascript-sdk-core');

var _rack = require('kinvey-javascript-sdk-core/build/rack/rack');

var _serialize = require('kinvey-javascript-sdk-core/build/rack/middleware/serialize');

var _http = require('./http');

var _push = require('./push');

// Add Http middleware
var networkRack = _rack.NetworkRack.sharedInstance();
networkRack.useAfter(_serialize.SerializeMiddleware, new _http.HttpMiddleware());

// Add Push module
_kinveyJavascriptSdkCore.Kinvey.Push = _push.Push;

// Export
module.exports = _kinveyJavascriptSdkCore.Kinvey;