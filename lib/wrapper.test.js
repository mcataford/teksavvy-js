'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _mockAPIResponses = require('./mockAPIResponses');

var _wrapperConstants = require('./constants/wrapperConstants');

var _wrapperConstants2 = _interopRequireDefault(_wrapperConstants);

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

      var expectedURL = _wrapperConstants2.default.urls.USAGE_RECORDS;
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

      var expectedURL = _wrapperConstants2.default.urls.USAGE_SUMMARY;
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