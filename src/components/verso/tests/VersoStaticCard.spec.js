import React from 'react'
import { shallow } from 'enzyme'

import VersoStaticCard from '../VersoStaticCard'
import { THUMBS_URL } from '../../../utils/config'

describe('src | verso | VersoStaticCard', () => {
  describe('snapshot', () => {
    it('match snapshot with an image as content', () => {
      // given
      const props = { mediationId: '1234' }
      // when
      const wrapper = shallow(<VersoStaticCard {...props} />)
      // then
      expect(wrapper).toBeDefined()
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('render', () => {
    it('should contains an element with a defined classname', () => {
      // given
      const mediationId = 1234
      const props = { mediationId }
      // when
      const wrapper = shallow(<VersoStaticCard {...props} />)
      const imageElt = wrapper.find('img')
      // then
      expect(imageElt).toHaveLength(1)
      expect(imageElt.hasClass('verso-tuto-mediation')).toBe(true)
    })
    it('should contains an element with a defined classname', () => {
      // given
      const mediationId = 1234
      const props = { mediationId }
      const expectedSrc = `${THUMBS_URL}/mediations/${mediationId}_1`
      // when
      const wrapper = shallow(<VersoStaticCard {...props} />)
      const imageElt = wrapper.find('img')
      // then
      expect(imageElt).toHaveLength(1)
      expect(imageElt.first().props().src).toEqual(expectedSrc)
    })
  })
})
