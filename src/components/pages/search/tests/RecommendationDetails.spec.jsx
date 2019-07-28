import { shallow } from 'enzyme'
import React from 'react'
import { Route } from 'react-router-dom'

import RecommendationDetails from '../RecommendationDetails'
import BookingContainer from '../../../booking/BookingContainer'
import Recto from '../../../recto/Recto'
import Verso from '../../../verso/Verso'

describe('src | components | pages | search | RecommendationDetails', () => {
  let props

  beforeEach(() => {
    props = {
      dispatch: jest.fn(),
      match: {
        params: {
          category: 'Applaudir',
          mediationId: 'DU',
          offerId: 'EA',
        },
      },
      recommendation: {
        id: 'EA',
      },
      requestGetRecommendation: jest.fn()
    }
  })

  it('should match the snapshot', () => {
    // when
    const wrapper = shallow(<RecommendationDetails {...props} />)

    // then
    expect(wrapper).toBeDefined()
    expect(wrapper).toMatchSnapshot()
  })

  describe('handleForceDetailsVisible()', () => {
    it('should force the details to be visible', () => {
      // given
      const wrapper = shallow(<RecommendationDetails {...props} />)

      // when
      wrapper.instance().handleMountDetails()

      // then
      setTimeout(() =>
        expect(wrapper.state(['forceDetailsVisible'])).toBe(true))
    })
  })

  describe('render()', () => {
    it('should have one Booking when I want details', () => {
      // given
      const state = { forceDetailsVisible: true }
      const routeProps = {
        path: '/recherche/resultats/:option?/details/:offerId([A-Z0-9]+)/:mediationId(vide|[A-Z0-9]+)?/:bookings(reservations)/:bookingId?/:cancellation(annulation)?/:confirmation(confirmation)?',
      }
      const wrapper = shallow(<RecommendationDetails {...props} />)

      // then
      expect(wrapper.find(Route)).toHaveLength(0)
      wrapper.setState(state)
      const route = wrapper.find(routeProps)
      const renderRoute = route.props()
      expect(renderRoute.render().type).toBe(BookingContainer)
    })

    it('should have no Recto and Verso when there is no recommendation', () => {
      // given
      props.recommendation = null
      const wrapper = shallow(<RecommendationDetails {...props} />)

      // when
      const rectoWrapper = wrapper.find(Recto)
      const versoWrapper = wrapper.find(Verso)

      // then
      expect(rectoWrapper).toHaveLength(0)
      expect(versoWrapper).toHaveLength(0)
    })

    it('should have one Recto and one Verso by default', () => {
      // given
      const wrapper = shallow(<RecommendationDetails {...props} />)

      // when
      const rectoWrapper = wrapper.find(Recto)
      const versoWrapper = wrapper.find(Verso)

      // then
      setTimeout(() => {
        expect(rectoWrapper).toHaveLength(1)
        expect(versoWrapper).toHaveLength(1)
      })
    })
  })
})
