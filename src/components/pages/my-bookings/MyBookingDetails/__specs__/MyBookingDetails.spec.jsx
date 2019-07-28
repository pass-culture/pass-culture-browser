import { shallow } from 'enzyme'
import React from 'react'

import MyBookingDetails from '../MyBookingDetails'

describe('src | components | pages | MyBookings | MyBookingDetails', () => {
  it('should match snapshot', () => {
    // given
    const props = {
      booking: {},
      match: { params: {} },
      recommendation: {},
      requestGetBooking: jest.fn()
    }

    // when
    const wrapper = shallow(<MyBookingDetails {...props} />)

    // then
    expect(wrapper).toBeDefined()
    expect(wrapper).toMatchSnapshot()
  })
})
