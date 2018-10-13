import axios from 'axios'

import {
  mockUsageRecords,
  mockUsageSummaryRecords,
} from './mockAPIResponses'

import constants from './constants/wrapperConstants'

import TeksavvyAPIWrapper from './wrapper'
import {
  RateLimitExceededError,
  MissingAPIKeyError,
  UnsupportedOperatorError,
} from './Exceptions';

describe('TeksavvyAPIWrapper', () => {
  const mockKey = 'ABCDE'

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('Wrapper object setup', () => {
    it('Default headers contain the API key', () => {
      const wrapper = new TeksavvyAPIWrapper(mockKey)
      const headers = wrapper._getDefaultHeaders()

      const expectedHeaders = {
        'Teksavvy-APIKey': mockKey,
      }

      expect(headers).toEqual(expectedHeaders)
    })

    it('throws an MissingAPIKeyError is the defaults headers are generated without an API key', () => {
      const wrapper = new TeksavvyAPIWrapper()
      
      expect(() => wrapper._getDefaultHeaders()).toThrow(MissingAPIKeyError)
    })
  })

  describe('Wrapper gets usage records', () => {
    let axiosSpy = null
    const APIWrapper = new TeksavvyAPIWrapper(mockKey)

    beforeEach(() => {
      axiosSpy = jest.spyOn(axios, 'get')
          .mockImplementation(
            () => Promise.resolve().then(() => mockUsageRecords),
          )
    })

    afterEach(() => {
      jest.restoreAllMocks()
    })

    it('usageRecords makes a GET request to the Teksavvy API', () => {
      APIWrapper.usageRecords()

      const expectedURL = constants.urls.USAGE_RECORDS
      const expectedHeaders = APIWrapper._getDefaultHeaders()

      expect(axiosSpy).toHaveBeenCalledWith(expectedURL, {
        headers: expectedHeaders,
        params: {},
      })
    })

    it('usageRecords cannot make requests that would exceed the rate limit', () => {
      let requests = 0

      const mockRequestLimit = 5
      const rateLimitedWrapper = new TeksavvyAPIWrapper(mockKey, { rateLimit: mockRequestLimit })

      while (requests++ < mockRequestLimit) {
        rateLimitedWrapper.usageSummaries()
      }

      expect(() => rateLimitedWrapper.usageRecords()).toThrow(RateLimitExceededError)
    })

    it('a rate limit of 0 disables the limit', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
      let requests = 0

      const callCount = 100

      const mockRequestLimit = 0
      const rateLimitedWrapper = new TeksavvyAPIWrapper(mockKey, { rateLimit: mockRequestLimit })

      while (requests++ < callCount) {
        rateLimitedWrapper.usageRecords()
      }

      expect(() => rateLimitedWrapper.usageRecords()).not.toThrow(RateLimitExceededError)
      expect(consoleSpy)
        .toHaveBeenNthCalledWith(callCount + 1, 'WARN: Rate limiting is turned off.')
    })
  })

  describe('Wrapper gets usage summary records', () => {
    let axiosSpy = null
    const APIWrapper = new TeksavvyAPIWrapper(mockKey)

    beforeEach(() => {
      axiosSpy = jest.spyOn(axios, 'get')
          .mockImplementation(
            () => Promise.resolve().then(() => mockUsageSummaryRecords),
          )
    })

    afterEach(() => {
      jest.restoreAllMocks()
    })

    it('usageSummaries makes a GET request to the Teksavvy API', () => {
      APIWrapper.usageSummaries()

      const expectedURL = constants.urls.USAGE_SUMMARY
      const expectedHeaders = APIWrapper._getDefaultHeaders()

      expect(axiosSpy).toHaveBeenCalledWith(expectedURL, {
        headers: expectedHeaders,
        params: {},
      })
    })

    it('usageSummaries cannot make requests that would exceed the rate limit', () => {
      let requests = 0

      const mockRequestLimit = 5
      const rateLimitedWrapper = new TeksavvyAPIWrapper(mockKey, { rateLimit: mockRequestLimit })

      while (requests++ < mockRequestLimit) {
        rateLimitedWrapper.usageSummaries()
      }

      expect(() => rateLimitedWrapper.usageSummaries()).toThrow(RateLimitExceededError)
    })

    it('a rate limit of 0 disables the limit', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
      let requests = 0
      const callCount = 100

      const mockRequestLimit = 0
      const rateLimitedWrapper = new TeksavvyAPIWrapper(mockKey, { rateLimit: mockRequestLimit })

      while (requests++ < callCount) {
        rateLimitedWrapper.usageSummaries()
      }

      expect(() => rateLimitedWrapper.usageRecords()).not.toThrow(RateLimitExceededError)
      expect(consoleSpy)
        .toHaveBeenNthCalledWith(callCount + 1, 'WARN: Rate limiting is turned off.')
    })
  })
})