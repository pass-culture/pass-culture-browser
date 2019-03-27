// jest --env=jsdom ./src/components/verso/offer-infos/tests/index --watch
import React from 'react'
import set from 'lodash.set'
import { render } from 'enzyme'
import { RawVersoOfferInfos } from '../index'

describe('src | components | VersoOfferInfos', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      // given
      const venue = {
        address: 'Rue Valois',
        city: 'Aurillac',
        latitude: '42',
        longitude: 12,
        name: 'Bastille',
        postalCode: 34000,
      }
      const recommendation = {}
      set(recommendation, 'offer.venue.managingOfferer', 'Fnac')
      set(recommendation, 'offer.thingId', 'ABC')
      set(recommendation, 'offer.distance', '100')
      set(recommendation, 'offer.venue', venue)
      const props = {
        isFinished: false,
        recommendation,
      }
      // when
      const wrapper = render(<RawVersoOfferInfos {...props} />)
      // then
      expect(wrapper).toBeDefined()
      expect(wrapper).toMatchSnapshot()
    })
  })
})
