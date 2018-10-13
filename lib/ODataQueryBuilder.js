'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _Exceptions = require('./Exceptions');

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ODataQueryBuilder = function ODataQueryBuilder() {
  var _this = this;

  (0, _classCallCheck3.default)(this, ODataQueryBuilder);

  this.compose = function (operatorObj) {
    var params = {};

    (0, _keys2.default)(operatorObj).forEach(function (operator) {
      var operatorValue = operatorObj[operator];

      if (!_constants2.default.supportedOperators.includes(operator)) {
        throw new _Exceptions.UnsupportedOperatorError(operator + ' is not supported.');
      }

      if (operator === _constants2.default.operatorIdentifiers.TOP) {
        if (operatorValue <= 0) {
          throw new RangeError('Operator TOP must be strictly positive');
        }
        params[_constants2.default.operators.TOP] = operatorValue;
      } else if (operator === _constants2.default.operatorIdentifiers.COUNT) {
        if (operatorValue) {
          params[_constants2.default.operators.COUNT] = 'allpages';
        }
      } else if (operator === _constants2.default.operatorIdentifiers.SKIP) {
        if (operatorValue < 0) {
          throw new RangeError('Operator SKIP must be positive or zero');
        }
        params[_constants2.default.operators.SKIP] = operatorValue;
      } else if (operator === _constants2.default.operatorIdentifiers.FILTER) {
        params[_constants2.default.operators.FILTER] = _this._formatFilters(operatorValue);
      }
    });

    return params;
  };

  this._formatFilters = function (filters) {
    if (filters instanceof String) return filters;else if (filters instanceof Array) {
      if (filters.length == 0) return;

      var filterSegments = filters.map(function (filter) {
        var comparator = filter.compare;
        var key = filter.key;
        var value = filter.value;

        if (!_constants2.default.supportedFilterComparators.includes(comparator)) {
          throw new _Exceptions.UnsupportedComparatorError(comparator + ' is not a supported comparison operator');
        }

        if (!(0, _keys2.default)(_constants2.default.allowedCompareKeysMap).includes(key)) {
          throw new _Exceptions.InvalidKeyError(key + ' is not a valid key to filter on');
        }

        var mappedKey = _constants2.default.allowedCompareKeysMap[key];
        var mappedComparator = _constants2.default.filterComparatorMap[comparator];
        return mappedKey + ' ' + mappedComparator + ' ' + value;
      });

      return filterSegments.join(' and ');
    } else {
      throw new _Exceptions.MalformedFilterParameters('Filter parameter must be a string or array');
    }
  };
};

exports.default = ODataQueryBuilder;