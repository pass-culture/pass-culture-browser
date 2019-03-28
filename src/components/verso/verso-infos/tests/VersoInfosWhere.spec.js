// jest --env=jsdom ./src/components/verso/verso-infos/tests/VersoInfosWhere.spec --watch
import React from 'react'
import set from 'lodash.set'
import { shallow } from 'enzyme'
import VersoInfosWhere from '../VersoInfosWhere'

describe('src | components | VersoInfosWhere', () => {
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
      set(recommendation, 'distance', '100')
      set(recommendation, 'offer.venue', venue)
      const props = { recommendation }
      // when
      const wrapper = shallow(<VersoInfosWhere {...props} />)
      // then
      expect(wrapper).toBeDefined()
      expect(wrapper).toMatchSnapshot()
    })
  })
})
