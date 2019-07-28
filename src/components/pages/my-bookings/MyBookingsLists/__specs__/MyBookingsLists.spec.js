import { shallow } from 'enzyme'
import React from 'react'

import BookingsList from '../BookingsList/BookingsList'
import MyBookingsLists from '../MyBookingsLists'
import NoBookings from '../NoBookings'
import RelativeFooterContainer from '../../../../layout/RelativeFooter/RelativeFooterContainer'

describe('src | components | pages | my-bookings | MyBookingsLists', () => {
  let props

  beforeEach(() => {
    props = {
      isEmpty: false,
      myBookings: [
        {
          id: 1,
        },
      ],
      soonBookings: [
        {
          id: 2,
        },
      ],
    }
  })

  describe('render()', () => {
    it('should render my soon or not bookings', () => {
      // when
      const wrapper = shallow(<MyBookingsLists {...props} />)

      // then
      const bookingsListContainerWrapper = wrapper.find(BookingsList)
      const relativeFooter = wrapper.find(RelativeFooterContainer)
      expect(bookingsListContainerWrapper).toHaveLength(2)
      expect(relativeFooter).toHaveLength(1)
    })

    it('should not render my bookings when there are no bookings', () => {
      // given
      props.isEmpty = true
      props.myBookings = []
      props.soonBookings = []

      // when
      const wrapper = shallow(<MyBookingsLists {...props} />)

      // then
      const noBookings = wrapper.find(NoBookings)
      expect(noBookings).toHaveLength(1)
    })
  })
})
