'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

var supportedOperators = [operatorIdentifiers.TOP, operatorIdentifiers.COUNT, operatorIdentifiers.SKIP, operatorIdentifiers.FILTER, operatorIdentifiers.ORDERBY];

var supportedFilterComparators = ['='];

var filterComparatorMap = {
  '=': 'eq'
};

var allowedCompareKeysMap = {
  'isCurrent': 'IsCurrent'
};

var APIResponseKeys = ['IsCurrent', 'StartDate', 'EndDate', 'OnPeakDownload', 'OffPeakDownload', 'OnPeakUpload', 'OffPeakUpload'];

exports.default = {
  operators: operators,
  operatorIdentifiers: operatorIdentifiers,
  supportedOperators: supportedOperators,
  supportedFilterComparators: supportedFilterComparators,
  filterComparatorMap: filterComparatorMap,
  allowedCompareKeysMap: allowedCompareKeysMap,
  APIResponseKeys: APIResponseKeys
};