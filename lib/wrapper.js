'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _Exceptions = require('./Exceptions');

var _ODataQueryBuilder = require('./ODataQueryBuilder');

var _ODataQueryBuilder2 = _interopRequireDefault(_ODataQueryBuilder);

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TeksavvyAPIWrapper = function TeksavvyAPIWrapper(apiKey) {
  var _this = this;

  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck3.default)(this, TeksavvyAPIWrapper);

  this._getDefaultHeaders = function () {
    if (!_this._key) {
      throw new _Exceptions.MissingAPIKeyError();
    }

    return {
      'Teksavvy-APIKey': _this._key
    };
  };

  this._getTargetURL = function (format) {
    if (format === _constants2.default.formats.USAGE_RECORDS) {
      return _constants2.default.urls.USAGE_RECORDS;
    } else if (format === _constants2.default.formats.USAGE_SUMMARY) {
      return _constants2.default.urls.USAGE_SUMMARY;
    }
  };

  this._updateHistory = function (stamp) {
    var threshold = Date.now() - 60000;
    _this._history = _this._history.filter(function (historyStamp) {
      return historyStamp >= threshold;
    });

    if (_this._isBelowRateLimit()) {
      _this._history.push(stamp);
      return true;
    } else {
      return false;
    }
  };

  this._formatResponse = function (response, format) {
    var totalCount = response.data['odata.count'];
    var requestTime = Date.now();
    var datapoints = response.data.value.map(function (datum) {
      var commonProps = {
        download: {
          onPeak: datum.OnPeakDownload,
          offPeak: datum.OffPeakDownload
        },
        upload: {
          onPeak: datum.OnPeakUpload,
          offPeak: datum.OffPeakUpload
        }
      };
      if (format === _constants2.default.formats.USAGE_SUMMARY) {
        var additionalProps = {
          start: datum.StartDate,
          end: datum.EndDate,
          isCurrent: datum.IsCurrent
        };

        return (0, _assign2.default)(commonProps, additionalProps);
      } else if (format === _constants2.default.formats.USAGE_RECORDS) {
        var _additionalProps = {
          date: datum.Date
        };

        return (0, _assign2.default)(commonProps, _additionalProps);
      }
    });

    var formattedResults = {
      requestTime: requestTime,
      datapoints: datapoints
    };

    if (totalCount) formattedResults.totalCount = totalCount;

    return formattedResults;
  };

  this._isBelowRateLimit = function () {
    if (_this._rateLimit == 0) {
      console.warn('WARN: Rate limiting is turned off.');
      return true;
    } else {
      return _this._history.length < _this._rateLimit;
    }
  };

  this.usageRecords = function () {
    var operator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var format = _constants2.default.formats.USAGE_RECORDS;
    var url = _this._getTargetURL(format);
    var headers = _this._getDefaultHeaders();
    var requestTime = Date.now();
    var params = operator ? _this._queryBuilder.compose(operator) : null;

    if (!_this._updateHistory(requestTime)) {
      throw new _Exceptions.RateLimitExceededError('Limit of ' + _this._rateLimit + ' per minute reached.');
    }

    return _axios2.default.get(url, { headers: headers, params: params }).then(function (response) {
      _this._lastRequest = requestTime;
      _this._requestCount++;

      return _this._formatResponse(response, format);
    }).catch(function (reason) {
      return reason;
    });
  };

  this.usageSummaries = function () {
    var operator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var format = _constants2.default.formats.USAGE_SUMMARY;
    var url = _this._getTargetURL(format);
    var headers = _this._getDefaultHeaders();
    var requestTime = Date.now();
    var params = operator ? _this._queryBuilder.compose(operator) : null;

    if (!_this._updateHistory(requestTime)) {
      throw new _Exceptions.RateLimitExceededError('Limit of ' + _this._rateLimit + ' per minute reached.');
    }

    return _axios2.default.get(url, { headers: headers, params: params }).then(function (response) {
      _this._lastRequest = requestTime;
      _this._requestCount++;

      return _this._formatResponse(response, format);
    }).catch(function (reason) {
      return reason;
    });
  };

  this._key = apiKey;
  this._queryBuilder = new _ODataQueryBuilder2.default();
  this._requestCount = 0;
  this._lastRequest = null;
  this._rateLimit = options.hasOwnProperty('rateLimit') ? options.rateLimit : 30;
  this._history = [];
};

exports.default = TeksavvyAPIWrapper;