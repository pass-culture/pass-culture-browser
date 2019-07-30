import React from 'react'
import { shallow } from 'enzyme'

import Verso from '../Verso'
import VersoContentOfferContainer from '../verso-content/verso-content-offer/VersoContentOfferContainer'
import VersoContentTuto from '../verso-content/VersoContentTuto'
import VersoControls from '../verso-controls/VersoControls'

const backgroundColor = '#ACE539'
const props = {
  areDetailsVisible: true,
  backgroundColor,
  contentInlineStyle: { backgroundColor, backgroundImage: 'any/image' },
  extraClassName: 'extra-classname',
  forceDetailsVisible: false,
  mediationId: 'AAA',
  offerName: 'Offer title',
  offerVenueNameOrPublicName: 'Offer subtitle',
  recommendation: {
    mediation: {},
    thumbUrl: 'https://example.net/tuto/image.png',
  },
}

describe('src | components | verso | Verso', () => {
  it('should match snapshot', () => {
    // when
    const wrapper = shallow(<Verso {...props} />)

    // then
    expect(wrapper).toBeDefined()
    expect(wrapper).toMatchSnapshot()
  })

  it('should show offer view when is not tuto', () => {
    // when
    const wrapper = shallow(<Verso {...props} />)
    const infos = wrapper.find(VersoContentOfferContainer)
    const tuto = wrapper.find(VersoContentTuto)
    const controls = wrapper.find(VersoControls)

    // then
    expect(tuto).toHaveLength(0)
    expect(infos).toHaveLength(1)
    expect(controls).toHaveLength(1)
  })

  it('should show tuto view when is tuto', () => {
    // given
    props.recommendation.mediation.tutoIndex = 3

    // when
    const wrapper = shallow(<Verso {...props} />)
    const infos = wrapper.find(VersoContentOfferContainer)
    const tuto = wrapper.find(VersoContentTuto)
    const controls = wrapper.find(VersoControls)

    // then
    expect(tuto).toHaveLength(1)
    expect(tuto.props()).toHaveProperty('imageURL', 'https://example.net/tuto/image.png')
    expect(infos).toHaveLength(0)
    expect(controls).toHaveLength(0)
  })
})
