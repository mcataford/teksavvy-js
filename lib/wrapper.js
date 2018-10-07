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

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TeksavvyAPIWrapper = function TeksavvyAPIWrapper(apiKey) {
  var _this = this;

  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck3.default)(this, TeksavvyAPIWrapper);

  this._getDefaultHeaders = function () {
    return {
      'Teksavvy-APIKey': _this._key
    };
  };

  this._getTargetURL = function () {
    return _constants2.default.urls.USAGE_SUMMARY;
  };

  this._sendRequest = function (url, headers) {
    return _axios2.default.get(url, { headers: headers });
  };

  this._formatResponse = function (response, format) {
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

    return {
      requestTime: requestTime,
      datapoints: datapoints
    };
  };

  this.usageRecords = function () {
    var url = _this._getTargetURL();
    var headers = _this._getDefaultHeaders();

    return _this._sendRequest(url, headers).then(function (response) {
      return _this._formatResponse(response, _constants2.default.formats.USAGE_SUMMARY);
    });
  };

  this._key = apiKey;

  this._requestCount = 0;
  this._lastRequest = null;
};

exports.default = TeksavvyAPIWrapper;