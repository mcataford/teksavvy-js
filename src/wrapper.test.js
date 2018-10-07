import axios from 'axios'

import {
  mockUsageRecords,
  mockUsageSummaryRecords,
} from './mockAPIResponses'

import constants from './constants'

import TeksavvyAPIWrapper from './wrapper'

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
      })
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
      })
    })
  })
})