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

export default {
  urls,
  formats,
}
