'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MissingAPIKeyError = exports.RateLimitExceededError = undefined;

var _setPrototypeOf = require('babel-runtime/core-js/object/set-prototype-of');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extendableBuiltin3(cls) {
  function ExtendableBuiltin() {
    cls.apply(this, arguments);
  }

  ExtendableBuiltin.prototype = (0, _create2.default)(cls.prototype, {
    constructor: {
      value: cls,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (_setPrototypeOf2.default) {
    (0, _setPrototypeOf2.default)(ExtendableBuiltin, cls);
  } else {
    ExtendableBuiltin.__proto__ = cls;
  }

  return ExtendableBuiltin;
}

function _extendableBuiltin(cls) {
  function ExtendableBuiltin() {
    cls.apply(this, arguments);
  }

  ExtendableBuiltin.prototype = (0, _create2.default)(cls.prototype, {
    constructor: {
      value: cls,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (_setPrototypeOf2.default) {
    (0, _setPrototypeOf2.default)(ExtendableBuiltin, cls);
  } else {
    ExtendableBuiltin.__proto__ = cls;
  }

  return ExtendableBuiltin;
}

var RateLimitExceededError = exports.RateLimitExceededError = function (_extendableBuiltin2) {
  (0, _inherits3.default)(RateLimitExceededError, _extendableBuiltin2);

  function RateLimitExceededError(message) {
    (0, _classCallCheck3.default)(this, RateLimitExceededError);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RateLimitExceededError.__proto__ || (0, _getPrototypeOf2.default)(RateLimitExceededError)).call(this, message));

    _this.name = 'RateLimitExceededError';
    return _this;
  }

  return RateLimitExceededError;
}(_extendableBuiltin(Error));

var MissingAPIKeyError = exports.MissingAPIKeyError = function (_extendableBuiltin4) {
  (0, _inherits3.default)(MissingAPIKeyError, _extendableBuiltin4);

  function MissingAPIKeyError(message) {
    (0, _classCallCheck3.default)(this, MissingAPIKeyError);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (MissingAPIKeyError.__proto__ || (0, _getPrototypeOf2.default)(MissingAPIKeyError)).call(this, message));

    _this2.name = 'MissingAPIKeyError';
    return _this2;
  }

  return MissingAPIKeyError;
}(_extendableBuiltin3(Error));