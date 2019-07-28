import { shallow } from 'enzyme'
import React from 'react'

import MyBookings from '../MyBookings'
import LoaderContainer from '../../../layout/Loader/LoaderContainer'
import PageHeader from '../../../layout/Header/PageHeader'

describe('src | components | pages | my-bookings | MyBookings', () => {
  let props

  beforeEach(() => {
    props = {
      match: {
        params: {}
      },
      location: {
        pathname: '/reservations',
        search: ''
      },
      myBookings: [
        {
          id: 1,
        },
      ],
      requestGetBookings: jest.fn(),
      resetRecommendationsAndBookings: jest.fn(),
      soonBookings: [
        {
          id: 2,
        },
      ],
    }
  })

  describe('handleFail()', () => {
    it('should handle fail', () => {
      // given
      const wrapper = shallow(<MyBookings {...props} />)

      // when
      wrapper.instance().handleFail()

      // then
      expect(wrapper.state('hasError')).toBe(true)
      expect(wrapper.state('isLoading')).toBe(true)
    })
  })

  describe('handleSuccess()', () => {
    it('should handle success', () => {
      // given
      const wrapper = shallow(<MyBookings {...props} />)

      // when
      wrapper.instance().handleSuccess({}, { payload: { data: [] } })

      // then
      expect(wrapper.state('isEmpty')).toBe(true)
      expect(wrapper.state('isLoading')).toBe(false)
    })
  })

  describe('render()', () => {
    it('should render page header', () => {
      // when
      const wrapper = shallow(<MyBookings {...props} />)
      wrapper.setState({ isLoading: false })

      // then
      const pageHeader = wrapper.find(PageHeader)
      expect(pageHeader).toHaveLength(1)
    })

    it('should render the Loader when there is something wrong with API', () => {
      // when
      const wrapper = shallow(<MyBookings {...props} />)

      // then
      const loaderContainer = wrapper.find(LoaderContainer)
      expect(loaderContainer).toHaveLength(1)
    })
  })
})
