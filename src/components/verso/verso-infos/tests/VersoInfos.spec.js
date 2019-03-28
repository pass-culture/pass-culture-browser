// jest --env=jsdom ./src/components/verso/verso-infos/tests/VersoInfos.spec.js --watch
import React from 'react'
import set from 'lodash.set'
import { render } from 'enzyme'
import { VersoInfos } from '../VersoInfos'

describe('src | components | verso | verso-infos | VersoInfos', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      // given
      const description = 'Lorem ipsum dolor sit amet'
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
      set(recommendation, 'offer.eventOrThing.description', description)
      const props = {
        isFinished: false,
        recommendation,
      }
      // when
      const wrapper = render(<VersoInfos {...props} />)
      // then
      expect(wrapper).toBeDefined()
      expect(wrapper).toMatchSnapshot()
    })
  })
})
