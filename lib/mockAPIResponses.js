"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var mockUsageRecords = exports.mockUsageRecords = {
  "odata.metadata": "http://api.teksavvy.com/web/Usage/$metadata#UsageRecords",
  "value": [{
    "Date": "2018-08-01T00:00:00",
    "OID": "1168543",
    "OnPeakDownload": 1.28,
    "OnPeakUpload": 0.09,
    "OffPeakDownload": 0.34,
    "OffPeakUpload": 0.03
  }, {
    "Date": "2018-08-02T00:00:00",
    "OID": "1168543",
    "OnPeakDownload": 0.96,
    "OnPeakUpload": 0.08,
    "OffPeakDownload": 0.57,
    "OffPeakUpload": 0.02
  }, {
    "Date": "2018-08-03T00:00:00",
    "OID": "1168543",
    "OnPeakDownload": 1.25,
    "OnPeakUpload": 0.08,
    "OffPeakDownload": 0.19,
    "OffPeakUpload": 0.01
  }, {
    "Date": "2018-08-04T00:00:00",
    "OID": "1168543",
    "OnPeakDownload": 0,
    "OnPeakUpload": 0,
    "OffPeakDownload": 0,
    "OffPeakUpload": 0
  }]
};

var mockUsageSummaryRecords = exports.mockUsageSummaryRecords = {
  "odata.metadata": "http://api.teksavvy.com/web/Usage/$metadata#UsageSummaryRecords",
  "value": [{
    "StartDate": "2018-08-01T00:00:00",
    "EndDate": "2018-08-31T00:00:00",
    "OID": "1168543",
    "IsCurrent": false,
    "OnPeakDownload": 72.57,
    "OnPeakUpload": 4.37,
    "OffPeakDownload": 8.71,
    "OffPeakUpload": 0.69
  }, {
    "StartDate": "2018-09-01T00:00:00",
    "EndDate": "2018-09-30T00:00:00",
    "OID": "1168543",
    "IsCurrent": false,
    "OnPeakDownload": 78.6,
    "OnPeakUpload": 10.09,
    "OffPeakDownload": 7.28,
    "OffPeakUpload": 0.83
  }, {
    "StartDate": "2018-10-01T00:00:00",
    "EndDate": "2018-10-07T00:00:00",
    "OID": "1168543",
    "IsCurrent": true,
    "OnPeakDownload": 30.54,
    "OnPeakUpload": 2.18,
    "OffPeakDownload": 14.39,
    "OffPeakUpload": 1.39
  }]
};