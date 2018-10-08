import axios from 'axios'

import {
  RateLimitExceededError,
  MissingAPIKeyError,
  UnsupportedOperatorError,
} from './Exceptions'

import constants from './constants'

export default class TeksavvyAPIWrapper {
  constructor(apiKey, options = {}) {
    this._key = apiKey

    this._requestCount = 0
    this._lastRequest = null
    this._rateLimit = options.hasOwnProperty('rateLimit') ? options.rateLimit : 30
    this._history = []
  }

  _getDefaultHeaders = () => {
    if (!this._key) {
      throw new MissingAPIKeyError()
    }

    return ({
      'Teksavvy-APIKey': this._key,
    })
  }

  _getTargetURL = format => {
    if (format === constants.formats.USAGE_RECORDS) {
      return constants.urls.USAGE_RECORDS
    } else if (format === constants.formats.USAGE_SUMMARY) {
      return constants.urls.USAGE_SUMMARY
    }
  }

  _updateHistory = stamp => {
    const threshold = Date.now() - 60000
    this._history = this._history.filter(historyStamp => historyStamp >= threshold)

    if (this._isBelowRateLimit()) {
      this._history.push(stamp)
      return true
    } else {
      return false
    }
  }

  _buildOperatorParam = operatorObj => {
    const params = {}

    Object.keys(operatorObj).forEach(operator => {
      const operatorName = operator.name
      
      if (!constants.supportedOperators.includes(operatorName)) {
        throw new UnsupportedOperatorError(`${operatorName} is not supported.`)
      }

      if (operatorName === constants.operatorIdentifiers.TOP) {
        if (operator.value <= 0) {
          throw new RangeError('Operator TOP must be strictly positive')
        }
        params[constants.operators.TOP] = operator.value
      } else if (operatorName === constants.operatorIdentifiers.COUNT) {
        params[constants.operators.COUNT] = 'allpages' 
      } else if (operatorName === constants.operatorIdentifiers.SKIP) {
        if (operator.value <= 0) {
          throw new RangeError('Operator SKIP must be positive or zero')
        }

        params[constants.operators.SKIP] = operator.value
      }
    })

    return params
  }

  _formatResponse = (response, format) => {
    const requestTime = Date.now()
    const datapoints = response.data.value.map(datum => {
      const commonProps = {
        download: {
          onPeak: datum.OnPeakDownload,
          offPeak: datum.OffPeakDownload,
        },
        upload: {
          onPeak: datum.OnPeakUpload,
          offPeak: datum.OffPeakUpload,
        },
      }
      if (format === constants.formats.USAGE_SUMMARY) {
        const additionalProps = {
          start: datum.StartDate,
          end: datum.EndDate,
          isCurrent: datum.IsCurrent,
        }

        return Object.assign(commonProps, additionalProps)
      } else if (format === constants.formats.USAGE_RECORDS) {
        const additionalProps = {
          date: datum.Date
        }

        return Object.assign(commonProps, additionalProps)
      }
    })

    return {
      requestTime,
      datapoints,
    }
  }

  _isBelowRateLimit = () => {
    if (this._rateLimit == 0) {
      console.warn('WARN: Rate limiting is turned off.')
      return true
    } else {
      return this._history.length < this._rateLimit
    }
  }

  usageRecords = (operator = {}) => {
    const format = constants.formats.USAGE_RECORDS
    const url = this._getTargetURL(format)
    const headers = this._getDefaultHeaders()
    const requestTime = Date.now()
    const params = operator ? this._buildOperatorParam(operator) : null

    if (!this._updateHistory(requestTime)) {
      throw new RateLimitExceededError(`Limit of ${this._rateLimit} per minute reached.`)
    }

    return axios.get(url, { headers, params })
        .then(response => {
          this._lastRequest = requestTime
          this._requestCount++

          return this._formatResponse(response, format)
        })
        .catch(reason => {
          return reason
        })
  }

  usageSummaries = (operator = {}) => {
    const format = constants.formats.USAGE_SUMMARY
    const url = this._getTargetURL(format)
    const headers = this._getDefaultHeaders()
    const requestTime = Date.now()
    const params = operator ? this._buildOperatorParam(operator) : null

    if (!this._updateHistory(requestTime)) {
      throw new RateLimitExceededError(`Limit of ${this._rateLimit} per minute reached.`)
    }

    return axios.get(url, { headers, params })
        .then(response => {
          this._lastRequest = requestTime
          this._requestCount++

          return this._formatResponse(response, format)
        }).catch(reason => {
          return reason
        })
  }
}