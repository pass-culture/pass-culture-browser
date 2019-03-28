// jest --env=jsdom ./src/components/verso/verso-infos/tests/VersoInfosWhere.spec --watch
import React from 'react'
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
      const distance = '100 Km'
      const props = { distance, venue }
      // when
      const wrapper = shallow(<VersoInfosWhere {...props} />)
      // then
      expect(wrapper).toBeDefined()
      expect(wrapper).toMatchSnapshot()
    })
  })
})
