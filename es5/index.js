'use strict';

var _kinveyJavascriptSdkCore = require('kinvey-javascript-sdk-core');

var _rack = require('kinvey-javascript-sdk-core/es5/rack/rack');

var _http = require('kinvey-javascript-sdk-core/es5/rack/middleware/http');

var _http2 = require('./http');

var _push = require('./push');

// Add Http middleware
var networkRack = _rack.NetworkRack.sharedInstance();
networkRack.swap(_http.KinveyHttpMiddleware, new _http2.HttpMiddleware());

var _init = _kinveyJavascriptSdkCore.Kinvey.init;
_kinveyJavascriptSdkCore.Kinvey.init = function (options) {
  // Initialize Kinvey
  var client = _init(options);

  // Add Push module to Kinvey
  _kinveyJavascriptSdkCore.Kinvey.Push = new _push.Push();

  // Return the client
  return client;
};

// Export
module.exports = _kinveyJavascriptSdkCore.Kinvey;