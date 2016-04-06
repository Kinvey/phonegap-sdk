'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isiOS = isiOS;
exports.isAndroid = isAndroid;
function isiOS() {
  var platform = global.device.platform;
  return platform === 'iOS';
}

function isAndroid() {
  var platform = global.device.platform;
  return platform === 'Android';
}