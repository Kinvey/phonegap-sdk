'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PushMock = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _push = require('./push');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PushMock = function (_Push) {
  _inherits(PushMock, _Push);

  function PushMock() {
    _classCallCheck(this, PushMock);

    return _possibleConstructorReturn(this, (PushMock.__proto__ || Object.getPrototypeOf(PushMock)).apply(this, arguments));
  }

  _createClass(PushMock, [{
    key: 'isSupported',
    value: function isSupported() {
      return true;
    }
  }]);

  return PushMock;
}(_push.Push);

// Export


exports.PushMock = PushMock;
exports.default = new PushMock();