import React from 'react'
import { mount, shallow } from 'enzyme'

import Details from '../Details'
import BookingContainer from '../../Booking/BookingContainer'
import VersoContainer from '../../Verso/VersoContainer'
import RectoContainer from '../../Recto/RectoContainer'

describe('src | components | layout | Details', () => {
  let props

  beforeEach(() => {
    props = {
      hasReceivedData: false,
      history: {
        push: jest.fn(),
        replace: jest.fn()
      },
      location: {
        pathname: '',
        search: ''
      },
      match: {
        params: {
          details: undefined
        }
      },
      needsToRequestGetData: jest.fn(),
      requestGetData: jest.fn()
    }
  })

  it('should match snapshot', () => {
    // when
    const wrapper = shallow(<Details {...props} />)

    // then
    expect(wrapper).toBeDefined()
    expect(wrapper).toMatchSnapshot()
  })
})
