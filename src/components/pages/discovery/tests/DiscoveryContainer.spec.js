import React from 'react'
import set from 'lodash.set'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'

import DiscoveryContainer, { mapStateToProps } from '../DiscoveryContainer'
import { withRedirectToSigninWhenNotAuthenticated } from '../../../hocs'

jest.mock('../../../hocs', () => ({
  withRedirectToSigninWhenNotAuthenticated: jest.fn(() => ''),
}))

describe('src | components | pages | discovery | DiscoveryContainer', () => {
  it('should redirect to login page when user is not already logged in', () => {
    // given
    const middlewares = []
    const mockStore = configureStore(middlewares)
    const initialState = {}
    const store = mockStore(initialState)

    // when
    shallow(<DiscoveryContainer />, { context: { store } })

    // then
    expect(withRedirectToSigninWhenNotAuthenticated).toHaveBeenCalled()
  })

  describe('mapStateToProps', () => {
    it('should returns exact props object', () => {
      // given
      const reco1 = {}
      set(reco1, 'offerId', 'AAAA')
      set(reco1, 'offer.eventId', '1234')
      set(reco1, 'mediationId', 'BBBB')
      set(reco1, 'geolocation.latitude', 0)
      set(reco1, 'geolocation.longitude', 0)
      const reco2 = {}
      set(reco2, 'offerId', 'CCCC')
      set(reco2, 'offer.eventId', '5678')
      set(reco2, 'mediationId', 'DDDD')
      set(reco2, 'geolocation.latitude', 0)
      set(reco2, 'geolocation.longitude', 0)
      const recommendations = [reco2, reco2]
      const readRecommendations = []

      const state = {}
      set(state, 'geolocation.latitude', 0)
      set(state, 'geolocation.longitude', 0)
      set(state, 'data.readRecommendations', [])
      set(state, 'data.recommendations', recommendations)
      set(state, 'lastRecommendationsRequestTimestamp', 0)

      const ownprops = {}
      set(ownprops, 'location.search', '?from=password')
      set(ownprops, 'match.params.offerId', 'CCCC')
      set(ownprops, 'match.params.mediationId', 'DDDD')

      // when
      const result = mapStateToProps(state, ownprops)

      // then
      const fromPassword = true
      const shouldLoadRecommendations = true
      const expected = {
        fromPassword,
        readRecommendations,
        recommendations,
        shouldLoadRecommendations,
      }
      expect(result).toStrictEqual(expected)
    })

    it('should not load new recommendations', () => {
      // given
      const state = {}
      set(state, 'lastRecommendationsRequestTimestamp', Date.now())

      const ownprops = {}
      set(ownprops, 'location.search', '?from=password')
      set(ownprops, 'match.params.offerId', 'CCCC')
      set(ownprops, 'match.params.mediationId', 'DDDD')

      // when
      const result = mapStateToProps(state, ownprops)

      // then
      const expected = false
      expect(result.shouldLoadRecommendations).toBe(expected)
    })
  })
})
