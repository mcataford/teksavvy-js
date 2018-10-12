'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _mockAPIResponses = require('./mockAPIResponses');

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var _wrapper = require('./wrapper');

var _wrapper2 = _interopRequireDefault(_wrapper);

var _Exceptions = require('./Exceptions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('TeksavvyAPIWrapper', function () {
  var mockKey = 'ABCDE';

  afterEach(function () {
    jest.restoreAllMocks();
  });

  describe('Wrapper object setup', function () {
    it('Default headers contain the API key', function () {
      var wrapper = new _wrapper2.default(mockKey);
      var headers = wrapper._getDefaultHeaders();

      var expectedHeaders = {
        'Teksavvy-APIKey': mockKey
      };

      expect(headers).toEqual(expectedHeaders);
    });

    it('throws an MissingAPIKeyError is the defaults headers are generated without an API key', function () {
      var wrapper = new _wrapper2.default();

      expect(function () {
        return wrapper._getDefaultHeaders();
      }).toThrow(_Exceptions.MissingAPIKeyError);
    });
  });

  describe('Building query from query operators', function () {
    var wrapper = new _wrapper2.default(mockKey);

    it('an invalid operator throws an UnsupportedOperatorError', function () {
      var malformedOperator = {
        invalidOp: 1
      };
      expect(function () {
        return wrapper._buildOperatorParam(malformedOperator);
      }).toThrow(_Exceptions.UnsupportedOperatorError);
    });

    describe('TOP', function () {
      var mockOperatorObj = (0, _defineProperty3.default)({}, _constants2.default.operatorIdentifiers.TOP, 5);

      it('builds a query parameter object', function () {
        var queryParams = wrapper._buildOperatorParam(mockOperatorObj);
        var expectedParams = (0, _defineProperty3.default)({}, _constants2.default.operators.TOP, mockOperatorObj.top);

        expect(queryParams).toEqual(expectedParams);
      });

      it('a zero or negative value throws a RangeError', function () {
        var malformedOperatorObj = (0, _defineProperty3.default)({}, _constants2.default.operatorIdentifiers.TOP, -1);

        expect(function () {
          return wrapper._buildOperatorParam(malformedOperatorObj);
        }).toThrow(RangeError);
      });
    });

    describe('COUNT', function () {
      it('builds a query parameter object if the value of "count" is truthy', function () {
        var mockOperatorObj = (0, _defineProperty3.default)({}, _constants2.default.operatorIdentifiers.COUNT, true);

        var queryParams = wrapper._buildOperatorParam(mockOperatorObj);
        var expectedParams = (0, _defineProperty3.default)({}, _constants2.default.operators.COUNT, 'allpages');
        expect(queryParams).toEqual(expectedParams);
      });

      it('does not add anything to the query parameter object of the value of "count" is false', function () {
        var mockOperatorObj = (0, _defineProperty3.default)({}, _constants2.default.operatorIdentifiers.COUNT, false);

        var queryParams = wrapper._buildOperatorParam(mockOperatorObj);
        var expectedParams = {};
        expect(queryParams).toEqual(expectedParams);
      });
    });

    describe('SKIP', function () {
      it('builds a query parameter object', function () {
        var mockSkip = 5;
        var mockOperatorObj = (0, _defineProperty3.default)({}, _constants2.default.operatorIdentifiers.SKIP, mockSkip);

        var queryParams = wrapper._buildOperatorParam(mockOperatorObj);
        var expectedParams = (0, _defineProperty3.default)({}, _constants2.default.operators.SKIP, mockSkip);
        expect(queryParams).toEqual(expectedParams);
      });

      it('throws a RangeError if the value given is negative', function () {
        var malformedOperator = (0, _defineProperty3.default)({}, _constants2.default.operatorIdentifiers.SKIP, -5);

        expect(function () {
          return wrapper._buildOperatorParam(malformedOperator);
        }).toThrow(RangeError);
      });
    });

    describe('Multiple operators at once', function () {
      it('produces a query parameter object with multiple operators', function () {
        var _mockOperatorObj5, _expectedParams4;

        var mockSkip = 5;
        var mockTop = 2;
        var mockOperatorObj = (_mockOperatorObj5 = {}, (0, _defineProperty3.default)(_mockOperatorObj5, _constants2.default.operatorIdentifiers.TOP, mockTop), (0, _defineProperty3.default)(_mockOperatorObj5, _constants2.default.operatorIdentifiers.SKIP, mockSkip), (0, _defineProperty3.default)(_mockOperatorObj5, _constants2.default.operatorIdentifiers.COUNT, true), _mockOperatorObj5);

        var queryParams = wrapper._buildOperatorParam(mockOperatorObj);
        var expectedParams = (_expectedParams4 = {}, (0, _defineProperty3.default)(_expectedParams4, _constants2.default.operators.TOP, mockTop), (0, _defineProperty3.default)(_expectedParams4, _constants2.default.operators.SKIP, mockSkip), (0, _defineProperty3.default)(_expectedParams4, _constants2.default.operators.COUNT, 'allpages'), _expectedParams4);

        expect(queryParams).toEqual(expectedParams);
      });
    });
  });

  describe('Wrapper gets usage records', function () {
    var axiosSpy = null;
    var APIWrapper = new _wrapper2.default(mockKey);

    beforeEach(function () {
      axiosSpy = jest.spyOn(_axios2.default, 'get').mockImplementation(function () {
        return _promise2.default.resolve().then(function () {
          return _mockAPIResponses.mockUsageRecords;
        });
      });
    });

    afterEach(function () {
      jest.restoreAllMocks();
    });

    it('usageRecords makes a GET request to the Teksavvy API', function () {
      APIWrapper.usageRecords();

      var expectedURL = _constants2.default.urls.USAGE_RECORDS;
      var expectedHeaders = APIWrapper._getDefaultHeaders();

      expect(axiosSpy).toHaveBeenCalledWith(expectedURL, {
        headers: expectedHeaders,
        params: {}
      });
    });

    it('usageRecords cannot make requests that would exceed the rate limit', function () {
      var requests = 0;

      var mockRequestLimit = 5;
      var rateLimitedWrapper = new _wrapper2.default(mockKey, { rateLimit: mockRequestLimit });

      while (requests++ < mockRequestLimit) {
        rateLimitedWrapper.usageSummaries();
      }

      expect(function () {
        return rateLimitedWrapper.usageRecords();
      }).toThrow(_Exceptions.RateLimitExceededError);
    });

    it('a rate limit of 0 disables the limit', function () {
      var consoleSpy = jest.spyOn(console, 'warn').mockImplementation(function () {});
      var requests = 0;

      var callCount = 100;

      var mockRequestLimit = 0;
      var rateLimitedWrapper = new _wrapper2.default(mockKey, { rateLimit: mockRequestLimit });

      while (requests++ < callCount) {
        rateLimitedWrapper.usageRecords();
      }

      expect(function () {
        return rateLimitedWrapper.usageRecords();
      }).not.toThrow(_Exceptions.RateLimitExceededError);
      expect(consoleSpy).toHaveBeenNthCalledWith(callCount + 1, 'WARN: Rate limiting is turned off.');
    });
  });

  describe('Wrapper gets usage summary records', function () {
    var axiosSpy = null;
    var APIWrapper = new _wrapper2.default(mockKey);

    beforeEach(function () {
      axiosSpy = jest.spyOn(_axios2.default, 'get').mockImplementation(function () {
        return _promise2.default.resolve().then(function () {
          return _mockAPIResponses.mockUsageSummaryRecords;
        });
      });
    });

    afterEach(function () {
      jest.restoreAllMocks();
    });

    it('usageSummaries makes a GET request to the Teksavvy API', function () {
      APIWrapper.usageSummaries();

      var expectedURL = _constants2.default.urls.USAGE_SUMMARY;
      var expectedHeaders = APIWrapper._getDefaultHeaders();

      expect(axiosSpy).toHaveBeenCalledWith(expectedURL, {
        headers: expectedHeaders,
        params: {}
      });
    });

    it('usageSummaries cannot make requests that would exceed the rate limit', function () {
      var requests = 0;

      var mockRequestLimit = 5;
      var rateLimitedWrapper = new _wrapper2.default(mockKey, { rateLimit: mockRequestLimit });

      while (requests++ < mockRequestLimit) {
        rateLimitedWrapper.usageSummaries();
      }

      expect(function () {
        return rateLimitedWrapper.usageSummaries();
      }).toThrow(_Exceptions.RateLimitExceededError);
    });

    it('a rate limit of 0 disables the limit', function () {
      var consoleSpy = jest.spyOn(console, 'warn').mockImplementation(function () {});
      var requests = 0;
      var callCount = 100;

      var mockRequestLimit = 0;
      var rateLimitedWrapper = new _wrapper2.default(mockKey, { rateLimit: mockRequestLimit });

      while (requests++ < callCount) {
        rateLimitedWrapper.usageSummaries();
      }

      expect(function () {
        return rateLimitedWrapper.usageRecords();
      }).not.toThrow(_Exceptions.RateLimitExceededError);
      expect(consoleSpy).toHaveBeenNthCalledWith(callCount + 1, 'WARN: Rate limiting is turned off.');
    });
  });
});