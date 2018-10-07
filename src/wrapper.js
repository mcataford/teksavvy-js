import axios from 'axios'

import {
  RateLimitExceededError,
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
    this._history.push(stamp)
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

  _isBelowRateLimit = () => this._history.length < this._rateLimit

  usageRecords = () => {
    const format = constants.formats.USAGE_RECORDS
    const url = this._getTargetURL(format)
    const headers = this._getDefaultHeaders()
    const requestTime = Date.now()

    if (!this._isBelowRateLimit()) {
      throw new RateLimitExceededError(`Limit of ${this._rateLimit} per minute reached.`)
    }

    this._updateHistory(requestTime)

    return axios.get(url, { headers })
        .then(response => {
          this._lastRequest = requestTime
          this._requestCount++

          return this._formatResponse(response, format)
        })
        .catch(reason => {
          return reason
        })
  }

  usageSummaries = () => {
    const format = constants.formats.USAGE_SUMMARY
    const url = this._getTargetURL(format)
    const headers = this._getDefaultHeaders()
    const requestTime = Date.now()

    if (!this._isBelowRateLimit()) {
      throw new RateLimitExceededError(`Limit of ${this._rateLimit} per minute reached.`)
    }

    this._updateHistory(requestTime)

    return axios.get(url, { headers })
        .then(response => {
          this._lastRequest = requestTime
          this._requestCount++

          return this._formatResponse(response, format)
        }).catch(reason => {
          return reason
        })
  }
}