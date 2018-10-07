'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var URL_BASE = 'https://api.teksavvy.com/web/Usage';
var URL_USAGE_RECORDS = URL_BASE + '/UsageRecords';
var URL_USAGE_SUMMARY = URL_BASE + '/UsageSummaryRecords';
var urls = {
  USAGE_RECORDS: URL_USAGE_RECORDS,
  USAGE_SUMMARY: URL_USAGE_SUMMARY
};

var FORMAT_USAGE_RECORDS = 'USAGE_RECORDS';
var FORMAT_USAGE_SUMMARY = 'USAGE_SUMMARY';
var formats = {
  USAGE_RECORDS: FORMAT_USAGE_RECORDS,
  USAGE_SUMMARY: FORMAT_USAGE_SUMMARY
};

exports.default = {
  urls: urls,
  formats: formats
};