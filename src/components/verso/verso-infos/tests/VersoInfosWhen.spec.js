// jest --env=jsdom ./src/components/verso/tests/VersoInfosWhen.spec.js --watch
import React from 'react'
import { shallow } from 'enzyme'
import VersoInfosWhen from '../VersoInfosWhen'

describe('src | components | VersoInfosWhen', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      // given
      const props = {}
      // when
      const wrapper = shallow(<VersoInfosWhen {...props} />)
      // then
      expect(wrapper).toBeDefined()
      expect(wrapper).toMatchSnapshot()
    })
  })
})
