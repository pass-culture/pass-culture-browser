import React from 'react'
import { shallow } from 'enzyme'

import SearchByOfferType from '../SearchByOfferType'

describe('src | components | pages | SearchByOfferType', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      // given
      const props = {
        handleQueryParamsChange: jest.fn(),
        title: 'fake Title',
      }

      // when
      const wrapper = shallow(<SearchByOfferType {...props} />)

      // then
      expect(wrapper).toBeDefined()
      expect(wrapper).toMatchSnapshot()
    })
  })
})
