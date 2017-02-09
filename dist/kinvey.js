'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _kinveyHtml5Sdk = require('kinvey-html5-sdk');

var _kinveyHtml5Sdk2 = _interopRequireDefault(_kinveyHtml5Sdk);

var _export = require('kinvey-node-sdk/dist/export');

var _middleware = require('./middleware');

var _push = require('./push');

var _push2 = _interopRequireDefault(_push);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Setup racks
_kinveyHtml5Sdk2.default.NetworkRack.reset();
_kinveyHtml5Sdk2.default.NetworkRack.use(new _export.SerializeMiddleware());
_kinveyHtml5Sdk2.default.NetworkRack.use(new _middleware.HttpMiddleware());
_kinveyHtml5Sdk2.default.NetworkRack.use(new _export.ParseMiddleware());

// Add Push module to Kinvey
_kinveyHtml5Sdk2.default.Push = _push2.default;

// Export
exports.default = _kinveyHtml5Sdk2.default;