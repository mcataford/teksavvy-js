
import {
  InvalidKeyError,
  UnsupportedComparatorError,
  UnsupportedOperatorError,
  MalformedFilterParameters,
} from './Exceptions'

import constants from './constants'

export default class ODataQueryBuilder {

  compose = operatorObj => {
    const params = {}

    Object.keys(operatorObj).forEach(operator => {
      const operatorValue = operatorObj[operator]

      if (!constants.supportedOperators.includes(operator)) {
        throw new UnsupportedOperatorError(`${operator} is not supported.`)
      }

      if (operator === constants.operatorIdentifiers.TOP) {
        if (operatorValue <= 0) {
          throw new RangeError('Operator TOP must be strictly positive')
        }
        params[constants.operators.TOP] = operatorValue
      } else if (operator === constants.operatorIdentifiers.COUNT) {
        if (operatorValue) {
          params[constants.operators.COUNT] = 'allpages'
        }
      } else if (operator === constants.operatorIdentifiers.SKIP) {
        if (operatorValue < 0) {
          throw new RangeError('Operator SKIP must be positive or zero')
        }
        params[constants.operators.SKIP] = operatorValue
      } else if (operator === constants.operatorIdentifiers.FILTER) {
        params[constants.operators.FILTER] = this._formatFilters(operatorValue)
      }
    })

    return params
  }

  _formatFilters = filters => {
    if (filters instanceof String) return filters
    else if (filters instanceof Array) {
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