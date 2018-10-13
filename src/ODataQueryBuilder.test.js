import QueryBuilder from './ODataQueryBuilder'
import constants from './constants'
import {
  UnsupportedOperatorError,
} from './Exceptions'

describe('ODataQueryBuilder', () => {
  const queryBuilder = new QueryBuilder()

  it('an invalid operator throws an UnsupportedOperatorError', () => {
    const malformedOperator = {
      invalidOp: 1,
    }
    expect(() => queryBuilder.compose(malformedOperator)).toThrow(UnsupportedOperatorError)
  })

  describe('TOP', () => {
    const mockOperatorObj = {
      [constants.operatorIdentifiers.TOP]: 5,
    }

    it('builds a query parameter object', () => {
      const queryParams = queryBuilder.compose(mockOperatorObj)
      const expectedParams = {
        [constants.operators.TOP]: mockOperatorObj.top,
      }

      expect(queryParams).toEqual(expectedParams)
    })

    it('a zero or negative value throws a RangeError', () => {
      const malformedOperatorObj = {
        [constants.operatorIdentifiers.TOP]: -1,
      }

      expect(() => queryBuilder.compose(malformedOperatorObj)).toThrow(RangeError)
    })
  })

  describe('COUNT', () => {
    it('builds a query parameter object if the value of "count" is truthy', () => {
      const mockOperatorObj = {
        [constants.operatorIdentifiers.COUNT]: true,
      }

      const queryParams = queryBuilder.compose(mockOperatorObj)
      const expectedParams = {
        [constants.operators.COUNT]: 'allpages',
      }
      expect(queryParams).toEqual(expectedParams)
    })

    it('does not add anything to the query parameter object of the value of "count" is false', () => {
      const mockOperatorObj = {
        [constants.operatorIdentifiers.COUNT]: false,
      }

      const queryParams = queryBuilder.compose(mockOperatorObj)
      const expectedParams = {}
      expect(queryParams).toEqual(expectedParams)
    })
  })

  describe('SKIP', () => {
    it('builds a query parameter object', () => {
      const mockSkip = 5
      const mockOperatorObj = {
        [constants.operatorIdentifiers.SKIP]: mockSkip,
      }

      const queryParams = queryBuilder.compose(mockOperatorObj)
      const expectedParams = {
        [constants.operators.SKIP]: mockSkip,
      }
      expect(queryParams).toEqual(expectedParams)
    })

    it('throws a RangeError if the value given is negative', () => {
      const malformedOperator = {
        [constants.operatorIdentifiers.SKIP]: -5,
      }

      expect(() => queryBuilder.compose(malformedOperator)).toThrow(RangeError)
    })
  })

  describe('Multiple operators at once', () => {
    it('produces a query parameter object with multiple operators', () => {
      const mockSkip = 5
      const mockTop = 2
      const mockOperatorObj = {
        [constants.operatorIdentifiers.TOP]: mockTop,
        [constants.operatorIdentifiers.SKIP]: mockSkip,
        [constants.operatorIdentifiers.COUNT]: true,
      }

      const queryParams = queryBuilder.compose(mockOperatorObj)
      const expectedParams = {
        [constants.operators.TOP]: mockTop,
        [constants.operators.SKIP]: mockSkip,
        [constants.operators.COUNT]: 'allpages',
      }

      expect(queryParams).toEqual(expectedParams)
    })
  })
})