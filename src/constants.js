const URL_BASE = 'https://api.teksavvy.com/web/Usage'
const URL_USAGE_RECORDS = `${URL_BASE}/UsageRecords`
const URL_USAGE_SUMMARY = `${URL_BASE}/UsageSummaryRecords`
const urls = {
  USAGE_RECORDS: URL_USAGE_RECORDS,
  USAGE_SUMMARY: URL_USAGE_SUMMARY,
}

const FORMAT_USAGE_RECORDS = 'USAGE_RECORDS'
const FORMAT_USAGE_SUMMARY = 'USAGE_SUMMARY'
const formats = {
  USAGE_RECORDS: FORMAT_USAGE_RECORDS,
  USAGE_SUMMARY: FORMAT_USAGE_SUMMARY,
}

const OPERATOR_FILTER = '$filter'
const OPERATOR_ORDERBY = '$orderby'
const OPERATOR_TOP = '$top'
const OPERATOR_COUNT = '$inlinecount'
const OPERATOR_SKIP = '$skip'
const OPERATOR_SELECT = '$select'
const operators = {
  FILTER: OPERATOR_FILTER,
  ORDERBY: OPERATOR_ORDERBY,
  TOP: OPERATOR_TOP,
  COUNT: OPERATOR_COUNT,
  SKIP: OPERATOR_SKIP,
  SELECT: OPERATOR_SELECT,
}
const operatorIdentifiers = {
  FILTER: 'filter',
  ORDERBY: 'orderby',
  TOP: 'top',
  COUNT: 'count',
  SKIP: 'skip',
  SELECT: 'select',
}

const supportedOperators = [
  'top', 'count', 'skip',
]

export default {
  urls,
  formats,
  operators,
  operatorIdentifiers,
  supportedOperators,
}
