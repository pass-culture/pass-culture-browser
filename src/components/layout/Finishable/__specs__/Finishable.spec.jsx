import { shallow } from 'enzyme'
import React from 'react'

import Finishable from '../Finishable'
import Icon from '../../Icon/Icon'

describe('src | components | layout | Finishable', () => {
  const finishableClass = '.finishable'
  let props

  beforeEach(() => {
    props = {
      children: <div className="content">{'cette offre n’est pas terminée'}</div>,
      isFinished: true,
    }
  })

  it('should match the snapshot', () => {
    // when
    const wrapper = shallow(<Finishable {...props} />)

    // then
    expect(wrapper).toMatchSnapshot()
  })

  it('should not contains finishable element', () => {
    // given
    props.isFinished = false
    const wrapper = shallow(<Finishable {...props} />)

    // when
    const content = wrapper.find('.content')
    const icon = wrapper.find(Icon)
    const finishable = wrapper.find(finishableClass)

    // then
    expect(content).toHaveLength(1)
    expect(icon).toHaveLength(0)
    expect(finishable).toHaveLength(0)
  })

  it('should contains finishable element', () => {
    // given
    const wrapper = shallow(<Finishable {...props} />)

    // when
    const content = wrapper.find('.content')
    const icon = wrapper.find(Icon)
    const finishable = wrapper.find(finishableClass)

    // then
    expect(content).toHaveLength(1)
    expect(icon).toHaveLength(1)
    expect(finishable).toHaveLength(1)
  })
})
