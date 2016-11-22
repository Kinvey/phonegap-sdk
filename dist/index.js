'use strict';

var _kinveyHtml5Sdk = require('kinvey-html5-sdk');

var _kinveyHtml5Sdk2 = _interopRequireDefault(_kinveyHtml5Sdk);

var _push = require('./push');

var _push2 = _interopRequireDefault(_push);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Add Push module to Kinvey
_kinveyHtml5Sdk2.default.Push = _push2.default;

// Export
module.exports = _kinveyHtml5Sdk2.default;