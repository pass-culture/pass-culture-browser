import { shallow } from 'enzyme'
import React from 'react'

import MyBookings from '../MyBookings'
import MyBookingsListsContainer from '../MyBookingsLists/MyBookingsListsContainer'
import LoaderContainer from '../../../layout/Loader/LoaderContainer'
import PageHeader from '../../../layout/Header/PageHeader'

describe('src | components | pages | my-bookings | MyBookings', () => {
  let props

  beforeEach(() => {
    props = {
      match: {
        params: {},
      },
      location: {
        pathname: '/reservations',
        search: '',
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

  it('should match the snapshot', () => {
    // when
    const wrapper = shallow(<MyBookings {...props} />)

    // then
    expect(wrapper).toMatchSnapshot()
  })

  describe('handleFail()', () => {
    it('should set hasError and isLoading to true in component state', () => {
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
    it('should set isLoading to false in component state', () => {
      // given
      const wrapper = shallow(<MyBookings {...props} />)

      // when
      wrapper.instance().handleSuccess({}, { payload: { data: [] } })

      // then
      expect(wrapper.state('isLoading')).toBe(false)
    })
  })

  describe('render()', () => {
    it('should render content', () => {
      // when
      const wrapper = shallow(<MyBookings {...props} />)
      wrapper.setState({ isLoading: false })

      // then
      const pageHeader = wrapper.find(PageHeader)
      const pageContent = wrapper.find(MyBookingsListsContainer)
      expect(pageHeader).toHaveLength(1)
      expect(pageContent).toHaveLength(1)
    })

    describe('when there is something wrong with API', () => {
      it('should render the Loader', () => {
        // when
        const wrapper = shallow(<MyBookings {...props} />)

        // then
        const loaderContainer = wrapper.find(LoaderContainer)
        expect(loaderContainer).toHaveLength(1)
      })
    })
  })
})
