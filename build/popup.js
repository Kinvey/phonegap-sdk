'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopupAdapter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bind = require('lodash/bind');

var _bind2 = _interopRequireDefault(_bind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @private
 */

var PopupAdapter = exports.PopupAdapter = function () {
  function PopupAdapter() {
    _classCallCheck(this, PopupAdapter);
  }

  _createClass(PopupAdapter, [{
    key: 'open',
    value: function open() {
      var _this = this;

      this.eventListeners = {
        loadHandler: (0, _bind2.default)(this.loadHandler, this),
        closeHandler: (0, _bind2.default)(this.closeHandler, this)
      };

      var promise = new Promise(function (resolve, reject) {
        _this.popup = global.open(_this.url, '_blank', 'location=yes');

        if (_this.popup) {
          _this.popup.addEventListener('loadstart', _this.eventListeners.loadHandler);
          _this.popup.addEventListener('exit', _this.eventListeners.closeHandler);
        } else {
          return reject(new Error('The popup was blocked.'));
        }

        return resolve(_this);
      });
      return promise;
    }
  }, {
    key: 'close',
    value: function close() {
      var _this2 = this;

      var promise = new Promise(function (resolve) {
        _this2.popup.close();
        resolve();
      });
      return promise;
    }
  }, {
    key: 'loadHandler',
    value: function loadHandler(event) {
      this.emit('loaded', event.url);
    }
  }, {
    key: 'clickHandler',
    value: function clickHandler() {
      this.close();
    }
  }, {
    key: 'closeHandler',
    value: function closeHandler() {
      this.popup.removeEventListener('loadstart', this.eventListeners.loadHandler);
      this.popup.removeEventListener('exit', this.eventListeners.closeHander);
      this.emit('closed');
    }
  }]);

  return PopupAdapter;
}();