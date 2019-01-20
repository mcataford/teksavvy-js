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
    operatorIdentifiers.TOP,
    operatorIdentifiers.COUNT,
    operatorIdentifiers.SKIP,
    operatorIdentifiers.FILTER,
    operatorIdentifiers.ORDERBY,
]

const supportedFilterComparators = ['=']

const filterComparatorMap = {
    '=': 'eq',
}

const allowedCompareKeysMap = {
    isCurrent: 'IsCurrent',
}

const APIResponseKeys = [
    'IsCurrent',
    'StartDate',
    'EndDate',
    'OnPeakDownload',
    'OffPeakDownload',
    'OnPeakUpload',
    'OffPeakUpload',
    'OID',
]

export default {
    operators,
    operatorIdentifiers,
    supportedOperators,
    supportedFilterComparators,
    filterComparatorMap,
    allowedCompareKeysMap,
    APIResponseKeys,
}
