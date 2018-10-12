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

var OPERATOR_FILTER = '$filter';
var OPERATOR_ORDERBY = '$orderby';
var OPERATOR_TOP = '$top';
var OPERATOR_COUNT = '$inlinecount';
var OPERATOR_SKIP = '$skip';
var OPERATOR_SELECT = '$select';
var operators = {
  FILTER: OPERATOR_FILTER,
  ORDERBY: OPERATOR_ORDERBY,
  TOP: OPERATOR_TOP,
  COUNT: OPERATOR_COUNT,
  SKIP: OPERATOR_SKIP,
  SELECT: OPERATOR_SELECT
};
var operatorIdentifiers = {
  FILTER: 'filter',
  ORDERBY: 'orderby',
  TOP: 'top',
  COUNT: 'count',
  SKIP: 'skip',
  SELECT: 'select'
};

var supportedOperators = ['top', 'count', 'skip'];

exports.default = {
  urls: urls,
  formats: formats,
  operators: operators,
  operatorIdentifiers: operatorIdentifiers,
  supportedOperators: supportedOperators
};