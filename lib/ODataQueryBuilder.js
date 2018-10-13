'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _Exceptions = require('./Exceptions');

var _queryBuilderConstants = require('./constants/queryBuilderConstants');

var _queryBuilderConstants2 = _interopRequireDefault(_queryBuilderConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ODataQueryBuilder = function ODataQueryBuilder() {
  var _this = this;

  (0, _classCallCheck3.default)(this, ODataQueryBuilder);

  this.compose = function (operatorObj) {
    var params = {};

    (0, _keys2.default)(operatorObj).forEach(function (operator) {
      var operatorValue = operatorObj[operator];

      if (_this._isTop(operator)) {
        if (operatorValue <= 0) {
          throw new RangeError('Operator TOP must be strictly positive');
        }
        params[_queryBuilderConstants2.default.operators.TOP] = operatorValue;
      } else if (_this._isCount(operator)) {
        if (operatorValue) {
          params[_queryBuilderConstants2.default.operators.COUNT] = 'allpages';
        }
      } else if (_this._isSkip(operator)) {
        if (operatorValue < 0) {
          throw new RangeError('Operator SKIP must be positive or zero');
        }
        params[_queryBuilderConstants2.default.operators.SKIP] = operatorValue;
      } else if (_this._isFilter(operator)) {
        params[_queryBuilderConstants2.default.operators.FILTER] = _this._formatFilters(operatorValue);
      } else if (_this._isOrderBy(operator)) {
        if (_this._isValidKey(operatorValue)) {
          params[_queryBuilderConstants2.default.operators.ORDERBY] = operatorValue;
        } else {
          throw new _Exceptions.InvalidKeyError(operatorValue + ' is not a valid key');
        }
      } else {
        throw new _Exceptions.UnsupportedOperatorError(operator + ' is not supported.');
      }
    });

    return params;
  };

  this._isTop = function (operator) {
    return operator === _queryBuilderConstants2.default.operatorIdentifiers.TOP;
  };

  this._isCount = function (operator) {
    return operator === _queryBuilderConstants2.default.operatorIdentifiers.COUNT;
  };

  this._isSkip = function (operator) {
    return operator === _queryBuilderConstants2.default.operatorIdentifiers.SKIP;
  };

  this._isFilter = function (operator) {
    return operator === _queryBuilderConstants2.default.operatorIdentifiers.FILTER;
  };

  this._isOrderBy = function (operator) {
    return operator === _queryBuilderConstants2.default.operatorIdentifiers.ORDERBY;
  };

  this._isFreeFormFilter = function (filters) {
    return filters instanceof String;
  };

  this._isValidKey = function (key) {
    return _queryBuilderConstants2.default.APIResponseKeys.includes(key);
  };

  this._formatFilters = function (filters) {
    if (_this._isFreeFormFilter(filters)) {
      return filters;
    } else if (filters instanceof Array) {
      if (filters.length == 0) return;

      var filterSegments = filters.map(function (filter) {
        var comparator = filter.compare;
        var key = filter.key;
        var value = filter.value;

        if (!_queryBuilderConstants2.default.supportedFilterComparators.includes(comparator)) {
          throw new _Exceptions.UnsupportedComparatorError(comparator + ' is not a supported comparison operator');
        }

        if (!(0, _keys2.default)(_queryBuilderConstants2.default.allowedCompareKeysMap).includes(key)) {
          throw new _Exceptions.InvalidKeyError(key + ' is not a valid key to filter on');
        }

        var mappedKey = _queryBuilderConstants2.default.allowedCompareKeysMap[key];
        var mappedComparator = _queryBuilderConstants2.default.filterComparatorMap[comparator];
        return mappedKey + ' ' + mappedComparator + ' ' + value;
      });

      return filterSegments.join(' and ');
    } else {
      throw new _Exceptions.MalformedFilterParameters('Filter parameter must be a string or array');
    }
  };
};

exports.default = ODataQueryBuilder;