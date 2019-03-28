// jest --env=jsdom ./src/components/verso/verso-infos/tests/VersoInfosWhat.spec.js --watch
import React from 'react'
import { shallow } from 'enzyme'
import VersoInfosWhat from '../VersoInfosWhat'

describe('src | components | VersoInfosWhat', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      // given
      const props = {
        description: 'Lorem ipsum dolor sit amet',
      }
      // when
      const wrapper = shallow(<VersoInfosWhat {...props} />)
      // then
      expect(wrapper).toBeDefined()
      expect(wrapper).toMatchSnapshot()
    })
  })
})
