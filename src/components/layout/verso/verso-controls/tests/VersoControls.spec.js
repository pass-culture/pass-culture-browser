import React from 'react'
import { shallow } from 'enzyme'
import VersoControls from '../VersoControls'

import Finishable from '../../../Finishable'
import CancelButton from '../booking/cancel-this-link/CancelThisLinkContainer'
import BookThisButton from '../booking/book-this-link/BookThisLinkContainer'

describe('src | components | verso | verso-controls | VersoControls', () => {
  it('should render component with a bookable offer', () => {
    // given
    const props = {
      booking: null,
      recommendation: {
        offerId: 'AE',
        offer: {
          id: 'AE',
          isFinished: false,
        },
      },
    }

    // when
    const wrapper = shallow(<VersoControls {...props} />)
    const finishable = wrapper.find(Finishable)
    const cancel = wrapper.find(CancelButton)
    const bookThis = wrapper.find(BookThisButton)

    // then
    expect(finishable).toHaveLength(1)
    expect(finishable.prop('finished')).toBe(false)
    expect(cancel).toHaveLength(0)
    expect(bookThis).toHaveLength(1)
  })

  it('should render component with a already booked/cancellable offer', () => {
    // given
    const props = {
      booking: {},
      recommendation: {
        offerId: 'AE',
        offer: {
          id: 'AE',
          isFinished: false,
        },
      },
    }

    // when
    const wrapper = shallow(<VersoControls {...props} />)
    const finishable = wrapper.find(Finishable)
    const cancel = wrapper.find(CancelButton)
    const bookthis = wrapper.find(BookThisButton)

    // then
    expect(finishable).toHaveLength(1)
    expect(finishable.prop('finished')).toBe(false)
    expect(cancel).toHaveLength(1)
    expect(bookthis).toHaveLength(0)
  })

  it('should render component with a already booked/cancellable offer (réécrire)', () => {
    // given
    const props = {
      booking: {},
      recommendation: {
        offerId: 'AE',
        offer: {
          id: 'AE',
          isFinished: true,
        },
      },
    }

    // when
    const wrapper = shallow(<VersoControls {...props} />)
    const finishable = wrapper.find(Finishable)
    const cancel = wrapper.find(CancelButton)
    const bookthis = wrapper.find(BookThisButton)

    // then
    expect(finishable).toHaveLength(1)
    expect(finishable.prop('finished')).toBe(true)
    expect(cancel).toHaveLength(1)
    expect(bookthis).toHaveLength(0)
  })
})
