
import {
  InvalidKeyError,
  UnsupportedComparatorError,
  UnsupportedOperatorError,
  MalformedFilterParameters,
} from './Exceptions'

import constants from './constants/queryBuilderConstants'

export default class ODataQueryBuilder {
  compose = operatorObj => {
    const params = {}

    Object.keys(operatorObj).forEach(operator => {
      const operatorValue = operatorObj[operator]

      if (!constants.supportedOperators.includes(operator)) {
        throw new UnsupportedOperatorError(`${operator} is not supported.`)
      }

      if (this._isTop(operator)) {
        if (operatorValue <= 0) {
          throw new RangeError('Operator TOP must be strictly positive')
        }
        params[constants.operators.TOP] = operatorValue
      } else if (this._isCount(operator)) {
        if (operatorValue) {
          params[constants.operators.COUNT] = 'allpages'
        }
      } else if (this._isSkip(operator)) {
        if (operatorValue < 0) {
          throw new RangeError('Operator SKIP must be positive or zero')
        }
        params[constants.operators.SKIP] = operatorValue
      } else if (this._isFilter(operator)) {
        params[constants.operators.FILTER] = this._formatFilters(operatorValue)
      }
    })

    return params
  }

  _isTop = operator => operator === constants.operatorIdentifiers.TOP

  _isCount = operator => operator === constants.operatorIdentifiers.COUNT

  _isSkip = operator => operator === constants.operatorIdentifiers.SKIP

  _isFilter = operator => operator === constants.operatorIdentifiers.FILTER

  _isFreeFormFilter = filters => filters instanceof String

  _formatFilters = filters => {
    if (this._isFreeFormFilter(filters)) {
      return filters
    } else if (filters instanceof Array) {
      if (filters.length == 0) return

      const filterSegments = filters.map(filter => {
        const comparator = filter.compare
        const key = filter.key
        const value = filter.value

        if (!constants.supportedFilterComparators.includes(comparator)) {
          throw new UnsupportedComparatorError(`${comparator} is not a supported comparison operator`)
        }

        if (!Object.keys(constants.allowedCompareKeysMap).includes(key)) {
          throw new InvalidKeyError(`${key} is not a valid key to filter on`)
        }

        const mappedKey = constants.allowedCompareKeysMap[key]
        const mappedComparator = constants.filterComparatorMap[comparator]
        return `${mappedKey} ${mappedComparator} ${value}`
      })

      return filterSegments.join(' and ')
    } else {
      throw new MalformedFilterParameters('Filter parameter must be a string or array')
    }
  }
}