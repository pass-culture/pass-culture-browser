import React from 'react'
import set from 'lodash.set'
import { shallow } from 'enzyme'
import { createBrowserHistory } from 'history'

import Discovery from '../Discovery'

const createRequiredProps = enhancer => {
  const match = {}
  set(match, 'params.view', 'verso')
  const props = {
    dispatch: jest.fn(),
    fromPassword: true,
    history: createBrowserHistory(),
    location: {},
    match,
    shouldLoadRecommendations: true,
    ...enhancer,
  }
  return props
}

describe('src | components | pages | discovery | Discovery', () => {
  describe('snapshot', () => {
    it('should match snapshot with required props only', () => {
      // given
      const props = createRequiredProps()

      // when
      const wrapper = shallow(<Discovery {...props} />)

      // then
      expect(wrapper).toBeDefined()
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('constructor', () => {
    it('should initialize state correctly', () => {
      // given
      const props = createRequiredProps()

      // when
      const wrapper = shallow(<Discovery {...props} />)
      const expected = {
        atWorldsEnd: false,
        hasError: false,
        isEmpty: null,
        isLoading: true,
      }

      // then
      expect(wrapper.state()).toEqual(expected)
    })
  })

  describe('handleDataRequest', () => {
    describe('One case', () => {
      const mockHandleFail = jest.fn()
      const mockHandleSuccess = jest.fn()
      const expectedRequestDataAction = {
        config: {
          apiPath: '/recommendations?',
          body: {
            readRecommendations: null,
            seenRecommendationIds: null,
          },
          handleFail: mockHandleFail,
          handleSuccess: mockHandleSuccess,
          method: 'PUT',
          normalizer: {
            bookings: 'bookings',
          },
        },
        type: 'REQUEST_DATA_PUT_/RECOMMENDATIONS?',
      }

      it('should first dispatch requestData when main component is rendered for the first time', () => {
        // given
        const dispatchMock = jest.fn()
        const enhancer = {
          dispatch: dispatchMock,
          shouldLoadRecommendations: true,
        }
        const props = createRequiredProps(enhancer)

        // when
        shallow(<Discovery {...props} />)

        // then
        const { calls } = dispatchMock.mock
        expect(calls.length).toBe(2)

        const requestedDataAction = { ...calls[0][0] }
        set(requestedDataAction, 'config.handleFail', mockHandleFail)
        set(requestedDataAction, 'config.handleSuccess', mockHandleSuccess)
        expect(requestedDataAction).toEqual(expectedRequestDataAction)
      })

      it('should not dispatch requestData when main component is rendered for and recommendations has already been loaded', () => {
        // given
        const dispatchMock = jest.fn()
        const enhancer = {
          dispatch: dispatchMock,
          shouldLoadRecommendations: false,
        }
        const props = createRequiredProps(enhancer)

        // when
        shallow(<Discovery {...props} />)

        // then
        const { calls } = dispatchMock.mock
        expect(calls.length).toBe(0)
      })
    })
  })
})
