// ./node_modules/.bin/jest --env=jsdom ./path/to/file.spec.js --watch
import React from 'react'
import { shallow } from 'enzyme'
import VersoInfosWhere from '../VersoInfosWhere'

describe('src | components | VersoInfosWhere', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      // given
      const props = { errors: {} }
      // when
      const wrapper = shallow(<VersoInfosWhere {...props} />)
      // then
      expect(wrapper).toBeDefined()
      expect(wrapper).toMatchSnapshot()
    })
  })
})
