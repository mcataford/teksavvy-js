'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _ODataQueryBuilder = require('./ODataQueryBuilder');

var _ODataQueryBuilder2 = _interopRequireDefault(_ODataQueryBuilder);

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var _Exceptions = require('./Exceptions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ODataQueryBuilder', function () {
  var queryBuilder = new _ODataQueryBuilder2.default();

  it('an invalid operator throws an UnsupportedOperatorError', function () {
    var malformedOperator = {
      invalidOp: 1
    };
    expect(function () {
      return queryBuilder.compose(malformedOperator);
    }).toThrow(_Exceptions.UnsupportedOperatorError);
  });

  describe('TOP', function () {
    var mockOperatorObj = (0, _defineProperty3.default)({}, _constants2.default.operatorIdentifiers.TOP, 5);

    it('builds a query parameter object', function () {
      var queryParams = queryBuilder.compose(mockOperatorObj);
      var expectedParams = (0, _defineProperty3.default)({}, _constants2.default.operators.TOP, mockOperatorObj.top);

      expect(queryParams).toEqual(expectedParams);
    });

    it('a zero or negative value throws a RangeError', function () {
      var malformedOperatorObj = (0, _defineProperty3.default)({}, _constants2.default.operatorIdentifiers.TOP, -1);

      expect(function () {
        return queryBuilder.compose(malformedOperatorObj);
      }).toThrow(RangeError);
    });
  });

  describe('COUNT', function () {
    it('builds a query parameter object if the value of "count" is truthy', function () {
      var mockOperatorObj = (0, _defineProperty3.default)({}, _constants2.default.operatorIdentifiers.COUNT, true);

      var queryParams = queryBuilder.compose(mockOperatorObj);
      var expectedParams = (0, _defineProperty3.default)({}, _constants2.default.operators.COUNT, 'allpages');
      expect(queryParams).toEqual(expectedParams);
    });

    it('does not add anything to the query parameter object of the value of "count" is false', function () {
      var mockOperatorObj = (0, _defineProperty3.default)({}, _constants2.default.operatorIdentifiers.COUNT, false);

      var queryParams = queryBuilder.compose(mockOperatorObj);
      var expectedParams = {};
      expect(queryParams).toEqual(expectedParams);
    });
  });

  describe('SKIP', function () {
    it('builds a query parameter object', function () {
      var mockSkip = 5;
      var mockOperatorObj = (0, _defineProperty3.default)({}, _constants2.default.operatorIdentifiers.SKIP, mockSkip);

      var queryParams = queryBuilder.compose(mockOperatorObj);
      var expectedParams = (0, _defineProperty3.default)({}, _constants2.default.operators.SKIP, mockSkip);
      expect(queryParams).toEqual(expectedParams);
    });

    it('throws a RangeError if the value given is negative', function () {
      var malformedOperator = (0, _defineProperty3.default)({}, _constants2.default.operatorIdentifiers.SKIP, -5);

      expect(function () {
        return queryBuilder.compose(malformedOperator);
      }).toThrow(RangeError);
    });
  });

  describe('Multiple operators at once', function () {
    it('produces a query parameter object with multiple operators', function () {
      var _mockOperatorObj5, _expectedParams4;

      var mockSkip = 5;
      var mockTop = 2;
      var mockOperatorObj = (_mockOperatorObj5 = {}, (0, _defineProperty3.default)(_mockOperatorObj5, _constants2.default.operatorIdentifiers.TOP, mockTop), (0, _defineProperty3.default)(_mockOperatorObj5, _constants2.default.operatorIdentifiers.SKIP, mockSkip), (0, _defineProperty3.default)(_mockOperatorObj5, _constants2.default.operatorIdentifiers.COUNT, true), _mockOperatorObj5);

      var queryParams = queryBuilder.compose(mockOperatorObj);
      var expectedParams = (_expectedParams4 = {}, (0, _defineProperty3.default)(_expectedParams4, _constants2.default.operators.TOP, mockTop), (0, _defineProperty3.default)(_expectedParams4, _constants2.default.operators.SKIP, mockSkip), (0, _defineProperty3.default)(_expectedParams4, _constants2.default.operators.COUNT, 'allpages'), _expectedParams4);

      expect(queryParams).toEqual(expectedParams);
    });
  });
});